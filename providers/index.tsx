import AuthProvider from '@/context/auth-provider'
import { NetworkProvider } from '@/context/network-provider'
import { ThemeProvider } from '@/context/theme-provider'
import React from 'react'


export default function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <NetworkProvider>
                <AuthProvider>
                    {children}
                </AuthProvider>

            </NetworkProvider>
        </ThemeProvider>
    )
}
