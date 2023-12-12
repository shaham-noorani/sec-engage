import { useEffect, useMemo } from "react";
import { AxiosPrivateClient } from "../utils/axios";
import useRefreshToken from "../modules/auth/useRefreshToken";
import useAuth from "../modules/auth/useAuth";

const useAxiosPrivate = () => {
  const { auth } = useAuth();
  const refresh = useRefreshToken();

  // Memoize the refresh function to prevent unnecessary re-renders
  const memoizedRefresh = useMemo(() => refresh, [refresh]);

  useEffect(() => {
    const requestInterceptor = AxiosPrivateClient.interceptors.request.use(
      async config => {
        if (auth?.idToken) {
          config.headers["Authorization"] = `Bearer ${auth.idToken}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    const responseInterceptor = AxiosPrivateClient.interceptors.response.use(
      response => response,
      async error => {
        const prevRequest = error.config;

        const requestWasUnauthorized =
          error.response?.status === 401 && !prevRequest._retry;

        if (requestWasUnauthorized) {
          const refreshedIdToken = await memoizedRefresh();
          prevRequest.headers["Authorization"] = `Bearer ${refreshedIdToken}`;

          return AxiosPrivateClient(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      AxiosPrivateClient.interceptors.request.eject(requestInterceptor);
      AxiosPrivateClient.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, memoizedRefresh]);

  return AxiosPrivateClient;
};

export default useAxiosPrivate;
