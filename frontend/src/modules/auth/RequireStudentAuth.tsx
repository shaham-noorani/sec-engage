import { Outlet, useLocation, Navigate } from "react-router";
import useUser from "../../hooks/useUser";
import useAuth from "./useAuth";

const RequireStudentAuth = () => {
  const { auth }: any = useAuth();
  const location = useLocation();
  const { user }: any = useUser();

  const canAccess =
    auth?.idToken && (user.role === "student" || user.role === "admin");

  return canAccess ? (
    <Outlet />
  ) : (
    <Navigate
      to='/login'
      state={{ from: location.pathname }}
      replace
    />
  );
};

export default RequireStudentAuth;
