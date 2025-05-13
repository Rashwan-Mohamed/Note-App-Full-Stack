import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8888/checkAuth', { withCredentials: true })
            .then(response => {
                if (response.data.authenticated) {
                    setIsAuthenticated(true);
                    setUser(response.data.user);
                } else {
                    setIsAuthenticated(false);
                    setUser(null);
                }
            })
            .catch(() => {
                setIsAuthenticated(false);
                setUser(null);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return { isAuthenticated, user, isLoading };
};
