import { config } from '@/constants/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';




type AuthContextType = {
    user: any;
    login: (identifier: string, password: string, method: 'email' | 'phone') => Promise<any>;
    register: (
        name: string,
        identifier: string,
        password: string,
        role_id: string,
        method: 'email' | 'phone'
    ) => Promise<any>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
    social_login: (
        email: string,
        name: string,
        avatar: string,
        provider: 'google' | 'facebook',
        provider_id: string,
    ) => Promise<any>;
};


export const AuthContext = createContext<any>(null);

const STORAGE_KEY = 'user';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [auth, setAuth] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user from AsyncStorage on app start
    useEffect(() => {
        const loadUser = async () => {
            try {
                const userData = await AsyncStorage.getItem('user');
                if (userData) {
                    setAuth(JSON.parse(userData));
                }
            } catch (error: any) {
                console.log('Error loading user:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadUser();
    }, []);

    const login = async (identifier: string, password: string, method: 'email' | 'phone') => {
        try {
            const payload: any = {
                password,
            };

            if (method === 'email') {
                payload.email = identifier;
            } else {
                payload.phone = identifier;
            }
            const response = await axios.post(`${config.URL}/auth/login`, payload);
            const user = response.data;
            await AsyncStorage.setItem('user', JSON.stringify(user));
            setAuth(user);
            return {
                success: true,
                data: user
            };
        } catch (error: any) {

            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    // handle register user
    const register = async (name: string, identifier: string, password: string, role_id: string, method: 'email' | 'phone') => {
        try {
            const payload: any = {
                name,
                password,
                role_id,
            };

            if (method === 'email') {
                payload.email = identifier;
            } else {
                payload.phone = identifier;
            }
            const response = await axios.post(`${config.URL}/auth/register`, payload);

            const user = response.data;
            await AsyncStorage.setItem('user', JSON.stringify(user));
            setAuth(user);
            return { success: true, data: user };
        } catch (error: any) {
            return { success: false, message: error.response?.data?.message || 'Registration failed' };
        }
    };

    /*
    * handle google sign in
    */
    const social_login = async ({
        email,
        name,
        avatar,
        provider,
        provider_id,
        role_id,
    }: {
        email: string;
        name?: string;
        avatar?: string;
        provider: 'google' | 'facebook';
        provider_id: string;
        role_id: string;
    }) => {
        try {
            const payload = {
                email,
                name,
                avatar,
                provider,
                provider_id,
                role_id,
            };
           

            const response = await axios.post(
                `${config.URL}/auth/social-login`,
                payload
            );

            const data = response.data;

            // save user + token
            await AsyncStorage.setItem('user', JSON.stringify(data));
            setAuth(data);

            return {
                success: true,
                data,
            };

        } catch (error: any) {
            return { success: false, message: error.response?.data?.message || 'Google sign in failed' };
        }
    };


    /**
     * handle logout user
     * @returns 
     * 
     */
    const logout = async () => {
        try {
            await AsyncStorage.removeItem('user');
            setAuth(null);
        } catch (error: any) {
            console.log('Error logging out', error.message);
        }
    };

    return (
        <AuthContext.Provider value={{
            auth,
            isLoading,
            login,
            register,
            logout,
            user: auth?.user || auth,
            isAuthenticated: !!auth,
            social_login,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// export { AuthProvider };
export default AuthProvider;