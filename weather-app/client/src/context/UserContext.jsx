
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isSignedIn, setIsSignedIn] = useState(false);

    const checkAuthStatus = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/api/google-authorize', { withCredentials: true });
            setCurrentUser(data);
            setIsSignedIn(true);
        } catch (error) {
            setCurrentUser(null);
            setIsSignedIn(false);
        }
    };

    useEffect(() => {

        checkAuthStatus();
    }, []);

    const login = async (tokenId) => {
        try {
            const response = await axios.post(
                'http://localhost:3000/api/google-login',
                { token: tokenId },
                { withCredentials: true }
            );
            if (response.data) {
                checkAuthStatus(); // Refresh user data
            }
        } catch (error) {
            console.error('Server error during login:', error);
        }
    };

    const logout = async () => {
        try {
            const response = await axios.post(
                'http://localhost:3000/api/google-logout',
                null,
                { withCredentials: true }
            );
            if (response.status === 204) {
                setCurrentUser(null);
                setIsSignedIn(false);
            }
        } catch (error) {
            console.error('Server error during logout:', error);
        }
    };

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser, isSignedIn, setIsSignedIn, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);