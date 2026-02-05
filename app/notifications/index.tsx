import Header from '@/components/ui/header';
import Layout from '@/components/ui/layout';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Text, View } from 'react-native';

// Mock notification data - replace with actual API call later
const mockNotifications = [
  {
    id: '1',
    type: 'order',
    title: 'notifications.new_order',
    message: 'notifications.new_order_message',
    time: '5m',
    read: false,
  },
  {
    id: '2',
    type: 'order',
    title: 'notifications.order_completed',
    message: 'notifications.order_completed_message',
    time: '1h',
    read: false,
  },
  {
    id: '3',
    type: 'system',
    title: 'notifications.system_update',
    message: 'notifications.system_update_message',
    time: '2h',
    read: true,
  },
  {
    id: '4',
    type: 'order',
    title: 'notifications.order_cancelled',
    message: 'notifications.order_cancelled_message',
    time: '1d',
    read: true,
  },
];

export default function Notifications() {
  const { t } = useTranslation();

  const getIconName = (type: string) => {
    switch (type) {
      case 'order':
        return 'receipt';
      case 'system':
        return 'information-circle';
      default:
        return 'notifications';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'order':
        return '#10b981';
      case 'system':
        return '#3b82f6';
      default:
        return '#6b7280';
    }
  };

  const renderNotification = ({ item }: { item: any }) => (
    <View
      className={`mb-3 p-4 rounded-xl border ${item.read ? 'bg-white border-gray-200' : 'bg-blue-50 border-blue-200'
        }`}
    >
      <View className="flex-row items-start">
        {/* Icon */}
        <View
          className="w-10 h-10 rounded-full items-center justify-center mr-3"
          style={{ backgroundColor: `${getIconColor(item.type)}20` }}
        >
          <Ionicons
            name={getIconName(item.type) as any}
            size={20}
            color={getIconColor(item.type)}
          />
        </View>

        {/* Content */}
        <View className="flex-1">
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-base font-semibold text-gray-900">
              {t(item.title)}
            </Text>
            {!item.read && (
              <View className="w-2 h-2 rounded-full bg-blue-500" />
            )}
          </View>

          <Text className="text-sm text-gray-600 mb-2">
            {t(item.message)}
          </Text>

          <Text className="text-xs text-gray-400">{item.time}</Text>
        </View>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View className="flex-1 items-center justify-center py-20">
      <View className="w-20 h-20 rounded-full bg-gray-100 items-center justify-center mb-4">
        <Ionicons name="notifications-outline" size={40} color="#9ca3af" />
      </View>
      <Text className="text-lg font-semibold text-gray-900 mb-2">
        {t('notifications.no_notifications')}
      </Text>
      <Text className="text-sm text-gray-500 text-center px-8">
        {t('notifications.no_notifications_description')}
      </Text>
    </View>
  );

  return (
    <Layout>
      <Header title={t('notifications.title')} />

      <View className="flex-1 px-4 py-4">
        {mockNotifications.length > 0 ? (
          <FlatList
            data={mockNotifications}
            renderItem={renderNotification}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        ) : (
          renderEmptyState()
        )}
      </View>
    </Layout>
  );
}
