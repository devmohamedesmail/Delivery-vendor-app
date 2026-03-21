import EmptyNotification from '@/components/ui/empty-notification';
import Header from '@/components/ui/header';
import Layout from '@/components/ui/layout';
import NotificationItem from '@/components/ui/notification-item';
import { config } from '@/constants/config';
import { useAuth } from '@/hooks/useAuth';
import useFetch from '@/hooks/useFetch';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, View } from 'react-native';



export default function Notifications() {
  const { t } = useTranslation();
  const { notifiable_id, notifiable_type } = useLocalSearchParams();
  const { auth } = useAuth()
  // const { data, loading } = useFetch(
  //   `/notifications?target_type=store&target_id=${notifiable_id}`
  // );


  const target_type =
    auth?.user?.role?.role === "store_owner"
      ? "store"
      : auth?.user?.role?.role === "delivery_man"
        ? "delivery_man"
        : null;

  const target_id = auth?.user?.id;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => axios.get(`${config.URL}/notifications?target_type=${target_type}&target_id=${target_id}`).then(res => res.data),
  })

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
