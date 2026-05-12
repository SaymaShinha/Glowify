import { Navigate } from "react-router";

const AdminProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("role");

  if (isAdmin !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminProtectedRoute;