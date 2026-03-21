import colors from '@/constants/colors';
import { config } from '@/constants/config';
import { AntDesign, FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

const statusConfig = {
    pending: {
        light: {
            color: 'bg-amber-100',
            textColor: 'text-amber-700',
            borderColor: 'border-amber-200'
        },
        dark: {
            color: 'bg-amber-900/30',
            textColor: 'text-amber-300',
            borderColor: 'border-amber-800'
        }
    },
    accepted: {
        light: {
            color: 'bg-blue-100',
            textColor: 'text-blue-700',
            borderColor: 'border-blue-200'
        },
        dark: {
            color: 'bg-blue-900/30',
            textColor: 'text-blue-300',
            borderColor: 'border-blue-800'
        }
    },
    preparing: {
        light: {
            color: 'bg-purple-100',
            textColor: 'text-purple-700',
            borderColor: 'border-purple-200'
        },
        dark: {
            color: 'bg-purple-900/30',
            textColor: 'text-purple-300',
            borderColor: 'border-purple-800'
        }
    },
    on_the_way: {
        light: {
            color: 'bg-indigo-100',
            textColor: 'text-indigo-700',
            borderColor: 'border-indigo-200'
        },
        dark: {
            color: 'bg-indigo-900/30',
            textColor: 'text-indigo-300',
            borderColor: 'border-indigo-800'
        }
    },
    delivered: {
        light: {
            color: 'bg-green-100',
            textColor: 'text-green-700',
            borderColor: 'border-green-200'
        },
        dark: {
            color: 'bg-green-900/30',
            textColor: 'text-green-300',
            borderColor: 'border-green-800'
        }
    },
    cancelled: {
        light: {
            color: 'bg-red-600',
            textColor: 'text-white',
            borderColor: 'border-red-600'
        },
        dark: {
            color: 'bg-red-900/50',
            textColor: 'text-red-200',
            borderColor: 'border-red-800'
        }
    },
};

interface DailyOrderProps {
    item: any;
}

export default function DailyOrderCard({ item }: DailyOrderProps) {
    const { t, i18n } = useTranslation();
    const { colorScheme } = useColorScheme();

    const currentTheme = colorScheme === 'dark' ? 'dark' : 'light';
    const statusStyle = statusConfig[item.status as keyof typeof statusConfig]?.[currentTheme] || statusConfig.pending[currentTheme];

    return (
        <View className="bg-white dark:bg-gray-800 mx-4 mb-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            {/* Header */}
            <View className="p-4 border-b border-gray-100 dark:border-gray-700">
                <View className="flex-row justify-between items-start mb-2">
                    <View className="flex-1">
                        <Text className="text-gray-500 dark:text-gray-400 text-xs mb-1">
                            {t('orders.orderId')}
                        </Text>
                        <Text className="text-gray-900 dark:text-gray-100 font-bold text-lg">
                            #{item.id}
                        </Text>
                    </View>
                    <View className={`${statusStyle.color} px-3 py-2 rounded-full border ${statusStyle.borderColor}`}>
                        <Text className={`${statusStyle.textColor} font-semibold text-xs`}>
                            {t(`orders.${item.status === 'on_the_way' ? 'onTheWay' : item.status}`)}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Order Items */}
            <View className="p-4 border-b border-gray-100 dark:border-gray-700">
                <Text className="text-gray-700 dark:text-gray-300 font-semibold mb-3">
                    {t('orders.items')} ({item.order?.length || 0})
                </Text>
                {item.order?.map((orderItem: any, index: number) => (
                    <View key={index} className="flex-row justify-between items-center mb-2">
                        <View className="flex-row items-center flex-1">
                            <View className="bg-gray-100 dark:bg-gray-700 w-8 h-8 rounded-lg justify-center items-center mr-3">
                                <Text className="text-gray-600 dark:text-gray-300 font-bold text-xs">
                                    {orderItem.quantity}x
                                </Text>
                            </View>
                            <View className="flex-1">
                                <Text className="text-gray-700 dark:text-gray-300 font-medium" numberOfLines={1}>
                                    {orderItem.name}
                                </Text>
                                {orderItem.store_name && (
                                    <Text className="text-gray-400 dark:text-gray-500 text-xs" numberOfLines={1}>
                                        {orderItem.store_name}
                                    </Text>
                                )}
                            </View>
                        </View>
                        <Text className="text-gray-900 dark:text-gray-100 font-semibold ml-2">
                            {config.CURRENCY} {orderItem.price}
                        </Text>
                    </View>
                ))}
            </View>

            {/* Footer */}
            <View className="p-4">
                <View className={`flex-row justify-between items-center mb-4 ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <Text className="text-gray-600 dark:text-gray-400 font-medium">
                        {t('orders.totalAmount')}
                    </Text>
                    <Text className="text-gray-900 dark:text-gray-100 font-bold text-xl">
                        {config.CURRENCY} {item.total_price}
                    </Text>
                </View>

                {item.customer_name && (
                    <View className="flex-row items-center mb-3">
                        <FontAwesome
                            name="user"
                            size={18}
                            color={colorScheme === 'dark' ? colors.dark.tabIconSelected : colors.light.tabIconSelected}
                        />
                        <Text className="text-gray-600 dark:text-gray-400 text-sm ml-2 flex-1" numberOfLines={1}>
                            {item.customer_name}
                        </Text>
                    </View>
                )}

                {item.delivery_address && (
                    <View className="flex-row items-center mb-3">
                        <FontAwesome6
                            name="location-dot"
                            size={18}
                            color={colorScheme === 'dark' ? colors.dark.tabIconSelected : colors.light.tabIconSelected}
                        />
                        <Text className="text-gray-600 dark:text-gray-400 text-sm ml-2 flex-1" numberOfLines={1}>
                            {item.delivery_address}
                        </Text>
                    </View>
                )}

                {item.phone && (
                    <View className="flex-row items-center mb-4">
                        <AntDesign
                            name="phone"
                            size={18}
                            color={colorScheme === 'dark' ? colors.dark.tabIconSelected : colors.light.tabIconSelected}
                        />
                        <Text className="text-gray-600 dark:text-gray-400 text-sm ml-2 flex-1" numberOfLines={1}>
                            {item.phone}
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
}
