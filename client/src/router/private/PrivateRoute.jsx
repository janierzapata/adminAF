import { Navigate } from "react-router-dom";
import { authStore } from "../../store/auth/authState";

export const PrivateRoute = ({ children }) => {
  const { session } = authStore((state) => state);
  return session.isLoggedIn ? children : <Navigate to="/" />;
};

