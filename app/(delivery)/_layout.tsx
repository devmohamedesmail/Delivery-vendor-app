import React from 'react'
import { Stack, Tabs } from 'expo-router'
import colors from '@/constants/colors'
import { useColorScheme } from 'nativewind'
import { Ionicons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'

export default function Layout() {
    const { colorScheme } = useColorScheme()
    const { t } = useTranslation();
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: colors.light.tabIconSelected,
            tabBarInactiveTintColor: colors.light.tabIconDefault,
            tabBarStyle: {
                backgroundColor: colorScheme === "dark" ? '#000' : '#fff',
                borderTopWidth: 1,
                borderTopColor: colorScheme === "dark" ? '#000' : '#e5e7eb',

                // paddingTop: 8,
                // paddingBottom: 10,
                // height: 70,
            },
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    tabBarLabel: t('common.home'),
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name={focused ? 'home' : 'home-outline'}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="orders/index"
                options={{
                    tabBarLabel: t('orders.orders'),
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name={focused ? 'receipt' : 'receipt-outline'}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />


           

            {/* hidden tabs */}
            <Tabs.Screen name="create/index" options={{ href: null }} />
            <Tabs.Screen name="update/index" options={{ href: null }} />

        </Tabs>
    )
}
