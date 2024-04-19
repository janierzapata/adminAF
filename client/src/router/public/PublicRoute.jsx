import { Navigate } from "react-router-dom";
import { authStore } from "../../store/auth/authState";

export const PublicRoute = ({children}) => {
  const { session } = authStore((state) => state);
  return session.isLoggedIn ? <Navigate to="/negro" /> : children;
};
