import React from 'react'
import { Text, View } from 'react-native'
import { Link } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/hooks/useAuth'

export default function NoAuthorized() {
    const { t } = useTranslation()
    const { auth } = useAuth()
  return (
     <View className="flex-1 justify-center items-center px-6">
        {/* Icon Container */}
        <View className="w-24 h-24 bg-yellow-100 dark:bg-yellow-900/30 rounded-full items-center justify-center mb-6">
          <Text className="text-5xl">⚠️</Text>
        </View>

        {/* Title */}
        <Text className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-3">
          {t("auth.noauthvarified")}
        </Text>

        {/* Description */}
        <Text className="text-base text-gray-600 dark:text-gray-400 text-center mb-6 px-4">
          Please verify your account to continue
        </Text>

        {/* Email Badge */}
        <View className="bg-gray-100 dark:bg-gray-800 px-6 py-4 rounded-2xl mb-8">
          <Text className="text-sm text-gray-500 dark:text-gray-400 mb-1 text-center">
            Account Email
          </Text>
          <Text className="text-base font-semibold text-gray-900 dark:text-white text-center">
            {auth.user?.email}
          </Text>
        </View>

        {/* Sign In Button */}
        <Link
          href="/auth/login"
          className="bg-primary text-white text-center px-12 py-4 rounded-full font-semibold text-base shadow-lg shadow-primary/30"
        >
          {t("auth.signIn")}
        </Link>

        {/* Helper Text */}
        <Text className="text-sm text-gray-500 dark:text-gray-500 text-center mt-6 px-8">
          Need help? Contact support
        </Text>
      </View>
  )
}
