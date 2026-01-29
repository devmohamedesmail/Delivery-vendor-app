import AuthProvider from '@/context/auth-provider'
import { NetworkProvider } from '@/context/network-provider'
import { ThemeProvider } from '@/context/theme-provider'
import React from 'react'
import Toast from 'react-native-toast-message';


export default function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <NetworkProvider>
                <AuthProvider>
                    {children}
                    <Toast />
                </AuthProvider>

            </NetworkProvider>
        </ThemeProvider>
    )
}
