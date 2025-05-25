import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_BASE } from '../utility';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const checkAuthStatus = useCallback(async () => {
        try {
            const response = await axios.get(`${API_BASE}/checkAuth`,
                { withCredentials: true });
            if (response.data.user) {
                setIsAuthenticated(true);
                setUser(response.data.user);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        } catch (error) {
            setIsAuthenticated(false);
            setUser(null);
        }
        finally {
            setIsLoading(false)
        }
    }, []);
    const resetAuth = () => {
        setIsAuthenticated(false);
        setUser(null);
    };
    useEffect(() => {
        checkAuthStatus();
    }, []);
    return { isAuthenticated, user, isLoading, resetAuth };
};
