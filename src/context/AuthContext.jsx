import { createContext, useEffect, useState } from "react";

// AuthContext holds the authenticated user object (or null).
// The actual session token lives in an HttpOnly cookie set by the backend —
// it is never accessible to JavaScript, which prevents XSS token theft.
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // Start as true so ProtectedRoute waits for the /me check before redirecting.
  const [loading, setLoading] = useState(true);

  // On mount, ask the backend "who is the current user?" using the HttpOnly
  // cookie that was set at login. If the cookie is missing/expired the backend
  // returns 401 and we leave user as null.
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/auth/me", {
          // credentials:"include" sends the HttpOnly cookie automatically.
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch {
        // Network error — treat as unauthenticated.
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  // Expose a login helper that calls the backend. The backend sets the
  // HttpOnly cookie — we just update React state with the returned user object.
  const login = async (email, password) => {
    const res = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // IMPORTANT: credentials:"include" is required so the browser accepts
      // and stores the Set-Cookie header from the backend.
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Invalid email or password");
    }

    // The JWT now lives inside an HttpOnly cookie — not in JS memory.
    // We only keep the non-sensitive user profile in React state.
    setUser(data.data.user);
    return;
  };

  // Logout: tell the backend to clear the HttpOnly cookie (Max-Age=0),
  // then wipe local React state and trigger a full navigation to remove
  // any cached in-memory state.
  const logout = async () => {
    try {
      await fetch("http://localhost:4000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // Even on network failure, clear local state.
    } finally {
      setUser(null);
      // Full page reload to flush any cached state.
      window.location.href = "/";
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
