import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "./store/hook";

export const ProtectedRoute = () => {

    const { token } = useAppSelector((state) => state.auth)

  return token && token['accessToken'] ? <Outlet /> : <Navigate to="/login" replace />;
};