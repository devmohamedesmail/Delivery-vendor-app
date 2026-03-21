import Header from '@/components/ui/header'
import Layout from '@/components/ui/layout'
import { config } from '@/constants/config'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View, FlatList, ActivityIndicator } from 'react-native'
import DailyOrderCard from '@/components/screens/orders/daily-order-card'
import NoOrders from '@/components/screens/orders/no-orders'
import colors from '@/constants/colors'

export default function DailyOrders() {
    const { t } = useTranslation();
    const { data, isLoading } = useQuery({
        queryKey: ["orders"],
        queryFn: () => axios.get(`${config.URL}/orders/dialy/orders`).then((res) => res.data),
    })

    return (
        <Layout>
            <Header title={t('orders.dailyOrders')} />

            {isLoading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color={colors.light.tint} />
                </View>
            ) : (
                <FlatList
                    data={data?.data || []}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <DailyOrderCard item={item} />}
                    ListEmptyComponent={<NoOrders />}
                    contentContainerStyle={{ paddingVertical: 16 }}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </Layout>
    )
}
