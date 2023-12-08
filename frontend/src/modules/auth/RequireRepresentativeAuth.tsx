import { Outlet, useLocation, Navigate } from "react-router";
import useUser from "../../hooks/useUser";
import useAuth from "../../modules/auth/useAuth";

const RequireRepresentativeAuth = () => {
  const { auth }: any = useAuth();
  const location = useLocation();
  const { user }: any = useUser();

  const canAccess =
    auth?.idToken && (user.role === "representative" || user.role === "admin");

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

export default RequireRepresentativeAuth;
