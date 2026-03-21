import React, { useState, useEffect } from 'react'
import { Stack } from 'expo-router'
import AppProviders from '@/providers'
import '../i18n/i18n'
import '../global.css'
import { initI18n } from '@/i18n/i18n';
import usePushNotifications from '@/hooks/usePushNotifications';
import useLocationTracking from '@/hooks/useLocationTracking';
import { startLocationTracking } from '@/services/locationService'
import * as Location from "expo-location";
import LOCATION_TASK from '@/tasks/locationTask'
import { config } from '@/constants/config'
import { useAuth } from '@/hooks/useAuth'
import { Platform } from 'react-native'

export default function RootLayout() {
 const { expoPushToken } = usePushNotifications();
    const [ready, setReady] = useState(false);


    useEffect(() => {
        initI18n().then(() => setReady(true));
    }, []);

    if (!ready) return null;






    return (

        <AppProviders>
            {/* <Stack screenOptions={{ headerShown: false }} /> */}
            <RootNavigation />
        </AppProviders>
    )
}


function RootNavigation() {
    const { expoPushToken } = usePushNotifications();
    const { auth } = useAuth();
    useLocationTracking();
    startLocationTracking();
    
    useEffect(() => {
        if (!expoPushToken) return;

        fetch(`${config.URL}/devices/devices/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth?.token}`,
            },
            body: JSON.stringify({
                pushToken: expoPushToken,
                platform: Platform.OS,
            }),

        });
        console.log(auth?.token)
    }, [expoPushToken]);
    return <Stack screenOptions={{ headerShown: false }} />;
}
