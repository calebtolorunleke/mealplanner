import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

// useAuth provides access to the auth state (user, loading) and actions
// (login, logout) exposed by AuthContext. Must be used inside <AuthProvider>.
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an <AuthProvider>");
  }
  return context;
};

export default useAuth;