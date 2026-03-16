import React, { useState, useEffect } from 'react'
import ButtonIcon from './button-icon'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useStore } from '@/hooks/useStore'
import useFetch from '@/hooks/useFetch'
import { io, Socket } from "socket.io-client"
import * as Notifications from 'expo-notifications'
import { useTranslation } from 'react-i18next'


export default function NotificationIcon() {
    const router = useRouter()
    const { store } = useStore()
    const [isConnected, setIsConnected] = useState(false);
    const [socket, setSocket] = useState<Socket | null>(null);
    const { t } = useTranslation();

    const { data, refetch } = useFetch(
        store?.id ? `/notifications?target_type=store&target_id=${store.id}` : null
    );
    const notificationCount = data?.data?.length || 0;


    // useEffect(() => {
    //     const s = io("https://tawsila-app.onrender.com");

    //     setSocket(s);

    //     s.on("connect", () => {
    //         setIsConnected(true);
    //         if (store?.id) {
    //             s.emit("join_store", store.id);
    //             s.on("new_order", async (data) => {
    //                 refetch();

    //                 await Notifications.scheduleNotificationAsync({
    //                     content: {
    //                         title: t(data.notification.title),
    //                         body: t(data.notification.message, { order_id: data.order_id }),
    //                         sound: 'default',
    //                         data: { type: 'new_order', order: data },
    //                     },
    //                     trigger: null, 
    //                 });
    //             });
    //         }
    //     });

    //     s.on("disconnect", () => {
    //         setIsConnected(false);
    //     });

    //     return () => {
    //         s.disconnect();
    //     };
    // }, [store?.id]);

    useEffect(() => {
        const s = io("https://tawsila-app.onrender.com");

        if (store?.id) {
            s.emit("join_store", store.id);
        }

        s.on("new_order", async (data) => {
            refetch();

            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "New Order",
                    body: `Order #${data.order_id}`,
                    sound: true,
                },
                trigger: null,
            });
        });

        return () => {
            s.disconnect();
        };
    }, [store?.id]);


    return (
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


    )
}
