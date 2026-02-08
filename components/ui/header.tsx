import useFetch from '@/hooks/useFetch'
import { useStore } from '@/hooks/useStore'
import { Ionicons } from '@expo/vector-icons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'
import { io, Socket } from "socket.io-client"
import BackButton from './back-button'
import ButtonIcon from './button-icon'
import usePushNotifications from '@/hooks/usePushNotifications';
import * as Notifications from 'expo-notifications';


export default function Header({ title, backButton = true }: { title?: string, backButton?: boolean }) {
  const { t } = useTranslation()
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const router = useRouter()
  const { store } = useStore();
  // const { data, refetch } = useFetch(`/notifications?target_type=store&target_id=${store?.id}`)

  const { data, refetch } = useFetch(
    store?.id ? `/notifications?target_type=store&target_id=${store.id}` : null
  );
  const notificationCount = data?.data?.length || 0;


  useEffect(() => {
    const s = io("https://tawsila-app.onrender.com");

    setSocket(s);

    s.on("connect", () => {
      setIsConnected(true);
      if (store?.id) {
        s.emit("join_store", store.id);
        s.on("new_order", async (data) => {
          refetch();
          // to send notification to all users in the store
          await Notifications.scheduleNotificationAsync({
          content: {
            title: t(data.notification.title),
            body: t(data.notification.message, { order_id: data.order_id }),
            sound: 'default',
            data: { type: 'new_order', order: data },
          },
          trigger: null, // فوراً بدون تأخير
        });
        });
      }
    });

    s.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      s.disconnect();
    };
  }, [store?.id]);



  return (
    <View className="bg-black px-6 py-7 shadow-sm pt-20 ">
      <View className="flex-row justify-between items-center">
        {backButton && <BackButton />}

        <Text
          className="text-xl font-bold text-white"
        >
          {title}
        </Text>

        <View className="flex-row items-center gap-5">
          <ButtonIcon
            notificationIndicator={isConnected}
            count={notificationCount}
            icon={<Ionicons name="notifications-outline" size={20} color="white" />}
            onPress={() => router.push({
              pathname: '/notifications',
              params: {
                notifiable_id: store?.id,
                notifiable_type: 'store'
              }
            })} />





          <ButtonIcon icon={<FontAwesome name="user-o" size={20} color="white" />} onPress={() => router.push('/account')} />
        </View>
      </View>
    </View>
  )
}
