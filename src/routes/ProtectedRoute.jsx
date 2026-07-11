import { Navigate } from "react-router-dom";
import Spinner from "../components/loader/Spinner";
import useAuth from "../hooks/useAuth";

// ProtectedRoute gates access to authenticated pages.
// It waits for the session check (loading) before deciding to render or
// redirect, preventing a flash-redirect to / on page reload while the
// /api/auth/me request is still in-flight.
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    console.log("loading");
    // Render nothing (or a spinner) while the session check is in-flight.
    // DO NOT redirect here — the cookie-based session may still be valid.
    return <Spinner />;
  }

  return user ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
