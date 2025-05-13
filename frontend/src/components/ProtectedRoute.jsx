import { useAuth } from './useAuth';
import { Navigate, Outlet } from 'react-router';

export const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading authentication...</div>; // Or a custom loader/spinner
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};
