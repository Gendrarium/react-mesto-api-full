import { useAppSelector } from "@redux/store";
import { selectLoggedIn, selectAuthChecking } from "@redux/user/selectors";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const loggedIn = useAppSelector(selectLoggedIn);
  const authChecking = useAppSelector(selectAuthChecking);

  return authChecking ? (
    <></>
  ) : loggedIn ? (
    children
  ) : (
    <Navigate to="/sign-in" />
  );
};

export default ProtectedRoute;
