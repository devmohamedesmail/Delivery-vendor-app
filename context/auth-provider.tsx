import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { config } from '@/constants/config';

export const AuthContext = createContext<any>(null);

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

    const login = async (identifier: string, password: string,method: 'email' | 'phone') => {
        try {
            const response = await axios.post(`${config.URL}/auth/login`, {
                email: identifier,
                password: password
            });
            const user = response.data;
            await AsyncStorage.setItem('user', JSON.stringify(user));
            setAuth(user);
            return { 
                success: true, 
                data: user 
            };
        } catch (error: any) {
            console.log(error);
            return { 
                success: false, 
                message: error.response?.data?.message || 'Login failed'
             };
        }
    };

    // handle register user
    const register = async (name: string, identifier: string, password: string, role_id: string) => {
        try {
            console.log(name, identifier, password, role_id);
            const response = await axios.post(`${config.URL}/auth/register`, {
                name,
                email:identifier,
                password,
                role_id
            });
            
            const user = response.data;
            await AsyncStorage.setItem('user', JSON.stringify(user));
            setAuth(user);
            return { success: true, data: user };
        } catch (error: any) {
            return { success: false, message: error.response?.data?.message || 'Registration failed' };
        }
    };

    // logout user
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
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
export default AuthProvider;