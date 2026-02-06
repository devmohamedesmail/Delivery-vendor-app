import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Ionicons } from '@expo/vector-icons'
import { Link, useRouter } from 'expo-router'
import ButtonIcon from './button-icon'
import BackButton from './back-button'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { io, Socket } from "socket.io-client";
import { useStore } from '@/hooks/useStore'


export default function Header({ title, backButton = true }: { title?: string, backButton?: boolean }) {
  const { t } = useTranslation()
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const router = useRouter()
  const {store}=useStore();

  useEffect(() => {
  const s = io("https://tawsila-app.onrender.com");

  setSocket(s);

  s.on("connect", () => {
    setIsConnected(true);
    if (store?.id) {
      s.emit("join_store", store.id);
    }
  });

  s.on("disconnect", () => {
    setIsConnected(false);
  });

  return () => {
    s.disconnect();
  };
}, [store?.id]);

console.log(isConnected);

  return (
    <View className="bg-black px-6 py-7 shadow-sm pt-18 ">
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
            count={1} icon={<Ionicons name="notifications-outline" size={20} color="white" />} onPress={() => router.push('/notifications')} />
          <ButtonIcon icon={<FontAwesome name="user-o" size={20} color="white" />} onPress={() => router.push('/account')} />
        </View>
      </View>
    </View>
  )
}
