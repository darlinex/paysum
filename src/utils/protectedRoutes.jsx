import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = () => {
    const token = localStorage.getItem("ACCESS_TOKEN");

    const isAuthenticated = () => {
        if (!token) return false;

        try {
            const decodedToken = jwtDecode(token);
            return decodedToken.exp * 1000 > Date.now(); // Check expiration
        } catch (error) {
            return false;
        }
    };

    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
