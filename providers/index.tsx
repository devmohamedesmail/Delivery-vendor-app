import AuthProvider from '@/context/auth-provider';
import { NetworkProvider } from '@/context/network-provider';

import SettingProvider from '@/context/setting-provider';
import StoreProvider from '@/context/store-provider';
import { ThemeProvider } from '@/context/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from 'react-native-toast-message';


export default function AppProviders({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient();
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <SettingProvider>
                        <NetworkProvider>
                            <AuthProvider>
                                    <StoreProvider>
                                        {children}
                                    </StoreProvider>
                                <Toast />
                            </AuthProvider>
                        </NetworkProvider>
                    </SettingProvider>
                </ThemeProvider>
            </QueryClientProvider>
        </GestureHandlerRootView>

    )
}
