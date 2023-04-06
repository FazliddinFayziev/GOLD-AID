import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useGlobalContext } from "../context/context";

const RequireAuth = ({ check }) => {
    const { user } = useGlobalContext();
    const location = useLocation();

    return (
        (user?.isAdmin === check)
            ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;