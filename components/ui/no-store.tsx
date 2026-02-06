import React from 'react'
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
import Button from './button'
import { useRouter } from 'expo-router'

export default function NoStore() {
    const { t } = useTranslation()
    const router = useRouter()
    return (
        <View className="flex-1 justify-center items-center p-6 bg-gray-50 dark:bg-gray-900">
            <Ionicons name="storefront-outline" size={64} color="#9ca3af" />
            <Text className="text-xl font-bold text-gray-900 dark:text-gray-100 text-center mt-4">
                {t('store.noStoreTitle')}
            </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
                {t('store.noStoreMessage')}
            </Text>
            <Button title={t('store.createStore')} onPress={() => router.push('/(store)/create')} />
        </View>
    )
}
