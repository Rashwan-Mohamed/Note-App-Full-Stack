import { useAuth } from '../hooks/useAuth.jsx';
import { Navigate, Outlet } from 'react-router';
import Spinner from './Spinner.jsx';

export const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div className="loading-container"><Spinner /> Loading Data...</div>;
        ;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};
