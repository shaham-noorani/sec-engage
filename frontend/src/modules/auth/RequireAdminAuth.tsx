import { Outlet, useLocation, Navigate } from "react-router";
import useUser from "../../hooks/useUser";
import useAuth from "../../modules/auth/useAuth";

const RequireAdminAuth = () => {
  const { auth }: any = useAuth();
  const location = useLocation();
  const { user }: any = useUser();

  return auth?.idToken && user.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate
      to='/login'
      state={{ from: location.pathname }}
      replace
    />
  );
};

export default RequireAdminAuth;
