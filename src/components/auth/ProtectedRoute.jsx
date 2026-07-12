import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // check if my magic ticket exists
  const ticket = localStorage.getItem("token");

  // no ticke, kick back to login
  if (!ticket) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
