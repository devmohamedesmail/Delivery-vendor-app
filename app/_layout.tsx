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

export default function RootLayout() {
    const { expoPushToken } = usePushNotifications();
    const [ready, setReady] = useState(false);
    useLocationTracking();
    startLocationTracking()

    useEffect(() => {
        initI18n().then(() => setReady(true));
    }, []);

    if (!ready) return null;


    return (

        <AppProviders>
            <Stack screenOptions={{ headerShown: false }} />
        </AppProviders>
    )
}
