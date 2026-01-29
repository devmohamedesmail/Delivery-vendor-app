import Header from '@/components/ui/header'
import Layout from '@/components/ui/layout'
import { useAuth } from '@/hooks/useAuth'
import { useStore } from '@/hooks/useStore'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native'

export default function Home() {
  const { t } = useTranslation();
  const { store, loading } = useStore();
  const { auth, isLoading: authLoading } = useAuth();

  if (loading || authLoading) {
    return (
      <Layout>
        <Header title={t('common.home')} />
        <View className="flex-1 justify-center items-center bg-gray-50 dark:bg-gray-900">
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text className="mt-4 text-gray-600 dark:text-gray-400">{t('common.loading')}</Text>
        </View>
      </Layout>
    );
  }

  if (!store) {
    return (
      <Layout>
        <Header title={t('common.home')} />
        <View className="flex-1 justify-center items-center p-6 bg-gray-50 dark:bg-gray-900">
          <Ionicons name="storefront-outline" size={64} color="#9ca3af" />
          <Text className="text-xl font-bold text-gray-900 dark:text-gray-100 text-center mt-4">
            {t('store.noStoreTitle')}
          </Text>
          <Text className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
            {t('store.noStoreMessage')}
          </Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <Header title={t('common.home')} />
      <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900 ">
        {/* Store Banner */}
        {store.banner && (
          <View className="relative">
            <Image
              source={{ uri: store.banner }}
              className="w-full h-48"
              resizeMode="cover"
            />
            <View className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
          </View>
        )}

        <View className="px-4 pb-6 pt-20">
          {/* Store Logo & Name Card */}
          <View className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg -mt-16 mb-4 overflow-hidden">
            <View className="p-6">
              <View className="flex-row items-center mb-4">
                {store.logo && (
                  <View className="mr-4 shadow-md">
                    <Image
                      source={{ uri: store.logo }}
                      className="w-20 h-20 rounded-xl border-4 border-white dark:border-gray-700"
                      resizeMode="cover"
                    />
                  </View>
                )}
                <View className="flex-1">
                  <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {store.name}
                  </Text>
                  <View className="flex-row items-center">
                    <Ionicons name="star" size={16} color="#fbbf24" />
                    <Text className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                      {store.rating || 0} ({store.reviews?.length || 0} reviews)
                    </Text>
                  </View>
                </View>
              </View>

              {/* Status Badges */}
              <View className="flex-row flex-wrap gap-2">
                <View className={`flex-row items-center px-3 py-1.5 rounded-full ${store.is_active
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                  }`}>
                  <Ionicons
                    name={store.is_active ? "checkmark-circle" : "close-circle"}
                    size={14}
                    color={store.is_active ? "#10b981" : "#ef4444"}
                  />
                  <Text className={`text-xs font-semibold ml-1 ${store.is_active ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'
                    }`}>
                    {store.is_active ? 'Active' : 'Inactive'}
                  </Text>
                </View>

                {store.is_verified && (
                  <View className="flex-row items-center px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                    <Ionicons name="shield-checkmark" size={14} color="#3b82f6" />
                    <Text className="text-xs font-semibold text-blue-700 dark:text-blue-400 ml-1">
                      Verified
                    </Text>
                  </View>
                )}

                {store.is_featured && (
                  <View className="flex-row items-center px-3 py-1.5 rounded-full bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                    <Ionicons name="star" size={14} color="#a855f7" />
                    <Text className="text-xs font-semibold text-purple-700 dark:text-purple-400 ml-1">
                      Featured
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* Contact Information Card */}
          <View className="bg-white dark:bg-gray-800 rounded-2xl shadow-md mb-4 p-6">
            <Text className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
              Contact Information
            </Text>

            {/* Address */}
            <View className="flex-row mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">
              <View className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 items-center justify-center mr-3">
                <Ionicons name="location" size={20} color="#3b82f6" />
              </View>
              <View className="flex-1">
                <Text className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">
                  {t('store.storeAddress')}
                </Text>
                <Text className="text-base text-gray-900 dark:text-gray-100 leading-5">
                  {store.address}
                </Text>
              </View>
            </View>

            {/* Phone */}
            <View className="flex-row">
              <View className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 items-center justify-center mr-3">
                <Ionicons name="call" size={20} color="#10b981" />
              </View>
              <View className="flex-1">
                <Text className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">
                  {t('store.storePhone')}
                </Text>
                <Text className="text-base text-gray-900 dark:text-gray-100 font-medium">
                  {store.phone}
                </Text>
              </View>
            </View>
          </View>

          {/* Operating Hours Card */}
          <View className="bg-white dark:bg-gray-800 rounded-2xl shadow-md mb-4 p-6">
            <Text className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('store.operatingHours')}
            </Text>

            <View className="flex-row items-center mb-3">
              <View className="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-900/20 items-center justify-center mr-3">
                <Ionicons name="time" size={20} color="#f97316" />
              </View>
              <View className="flex-1">
                <Text className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">
                  Business Hours
                </Text>
                <Text className="text-base text-gray-900 dark:text-gray-100 font-semibold">
                  {store.start_time} - {store.end_time}
                </Text>
              </View>
            </View>

            {store.devlivery_time && (
              <View className="flex-row items-center pt-3 border-t border-gray-100 dark:border-gray-700">
                <View className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/20 items-center justify-center mr-3">
                  <Ionicons name="bicycle" size={20} color="#a855f7" />
                </View>
                <View className="flex-1">
                  <Text className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">
                    {t('store.deliveryTime')}
                  </Text>
                  <Text className="text-base text-gray-900 dark:text-gray-100 font-semibold">
                    {store.devlivery_time} minutes
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* Store Details Card */}
          <View className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
            <Text className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
              Store Details
            </Text>

            {/* Store ID */}
            <View className="flex-row justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
              <Text className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Store ID
              </Text>
              <Text className="text-sm text-gray-900 dark:text-gray-100 font-semibold">
                #{store.id}
              </Text>
            </View>

            {/* Created At */}
            <View className="flex-row justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
              <Text className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Created At
              </Text>
              <Text className="text-sm text-gray-900 dark:text-gray-100 font-semibold">
                {new Date(store.createdAt).toLocaleDateString()}
              </Text>
            </View>

            {/* Last Updated */}
            <View className="flex-row justify-between items-center py-3">
              <Text className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Last Updated
              </Text>
              <Text className="text-sm text-gray-900 dark:text-gray-100 font-semibold">
                {new Date(store.updatedAt).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  )
}
