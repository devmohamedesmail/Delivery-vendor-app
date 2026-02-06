import EmptyNotification from '@/components/ui/empty-notification';
import Header from '@/components/ui/header';
import Layout from '@/components/ui/layout';
import NotificationItem from '@/components/ui/notification-item';
import useFetch from '@/hooks/useFetch';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, View } from 'react-native';



export default function Notifications() {
  const { t } = useTranslation();
  const { notifiable_id, notifiable_type } = useLocalSearchParams();
  const { data, loading } = useFetch(
    `/notifications/?notifiable_id=${notifiable_id}&notifiable_type=${notifiable_type}`
  );

  const notifications = data?.data || [];
  
  return (
    <Layout>
      <Header title={t('notifications.title')} />

      <View className="flex-1 px-4 py-4">
        {notifications.length > 0 ? (
          <FlatList
            data={notifications}
            renderItem={({ item }) => <NotificationItem item={item} />}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        ) : (
          <EmptyNotification />
        )}
      </View>
    </Layout>
  );
}
