import AuthProvider from '@/context/auth-provider'
import { NetworkProvider } from '@/context/network-provider'
import ProfileProvider from '@/context/profile-provider';
import { ThemeProvider } from '@/context/theme-provider'
import React from 'react'
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from "react-native-gesture-handler";


export default function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
             <ThemeProvider>
            <NetworkProvider>
                <AuthProvider>
                    <ProfileProvider>
                        {children}
                    </ProfileProvider>
                    <Toast />
                </AuthProvider>
            </NetworkProvider>
        </ThemeProvider>
        </GestureHandlerRootView>
       
    )
}
