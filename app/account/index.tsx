import Header from '@/components/ui/header'
import Layout from '@/components/ui/layout'
import React, { useState, useRef } from 'react'
import { View, ScrollView, Text } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'expo-router'
import OptionButton from '@/components/screens/account/option-button'
import BottomPaper from '@/components/ui/bottom-paper'
import Button from '@/components/ui/button'
import BottomSheet from '@gorhom/bottom-sheet';
import Toast from 'react-native-toast-message'
import { useColorScheme } from 'nativewind'
import colors from '@/constants/colors'
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import {Linking} from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

export default function Account() {
    const { t } = useTranslation()
    const { auth, logout } = useAuth()
    const router = useRouter()
    const [loadding, setLoading] = useState(false)
    const bottomSheetRef = useRef<BottomSheet>(null);
    const { colorScheme , toggleColorScheme } = useColorScheme()

    const handleLogout = async () => {

        try {
            setLoading(true)
            await logout()

            Toast.show({
                type: 'success',
                text1: t('account.logout_successful'),
            })
            setTimeout(() => {
                setLoading(false)
                router.replace('/auth/login')
            }, 3000);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: t('account.logout_failed'),
            })
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }
    return (
        <Layout>
            <Header title={t('account.account')} />


            <ScrollView className="flex-1">
                {/* Profile Section */}
                <View className="mx-4 mt-4 rounded-xl">
                    <View className="p-6 items-center border-b">
                        <View className="w-20 h-20 bg-primary rounded-full items-center justify-center mb-3">
                            <Text className="text-white text-2xl font-bold" style={{ fontFamily: 'Cairo_700Bold' }}>
                                {auth?.user?.name?.charAt(0).toUpperCase() || 'U'}
                            </Text>
                        </View>
                        <Text className="text-lg font-bold text-black dark:text-white"> {auth?.user?.name}</Text>
                        <Text className="mt-1 text-black dark:text-white"> {auth?.user?.email || auth?.user?.phone}
                        </Text>
                        <View className="mt-2 bg-primary px-3 py-1 rounded-full">
                            <Text className="text-black dark:text-white text-sm font-medium">
                                {auth?.user?.role?.role === "store_owner" ? t('account.store_owner') : ''}
                                {auth?.user?.role?.role === "driver" ? t('account.driver') : ''}
                            </Text>
                        </View>
                    </View>


                </View>



                <View className='px-5'>
                    <OptionButton
                        title={t('account.theme')}
                        onPress={toggleColorScheme}
                        icon={<Ionicons name={colorScheme === 'dark' ? "moon" : "sunny"} size={20} color='red' />}
                    />
                    <OptionButton
                        title={t('account.whatsup_support')}
                        onPress={() => Linking.openURL('https://wa.me/+971589107126')}
                        icon={<AntDesign name="whats-app" size={20} color='red' />}
                    />

                    <OptionButton
                        title={t('account.phone_support')}
                        onPress={() => Linking.openURL('tel:+971589107126')}
                        icon={<AntDesign name="phone" size={20} color='red' />}
                    />

                    <View className='mt-2'>
                        <OptionButton
                            title={t('account.logout')}
                            onPress={() => bottomSheetRef.current?.expand()}
                            icon={<SimpleLineIcons name="logout" size={16} color='red' />}
                        />
                    </View>







                </View>
                {/* App Version */}
                <View className="items-center py-8">
                    <Text
                        className="text-sm"
                        style={{ fontFamily: 'Cairo_400Regular', color: colorScheme === 'dark' ? '#6b7280' : '#9ca3af' }}
                    >
                        {t('account.app_version')} 1.0.0
                    </Text>
                </View>


            </ScrollView>


            <BottomPaper ref={bottomSheetRef} snapPoints={['40%']}>
                <View className="p-5 mt-5">
                    <Text
                        className='text-center font-bold mb-4 text-xl'
                        style={{ fontFamily: 'Cairo_600SemiBold', color: colorScheme === 'dark' ? '#fff' : '#000' }}
                    >
                        {t('account.logout_confirmation')}
                    </Text>
                    <View className='flex flex-row justify-center gap-4 mt-6'>
                        <Button
                            title={loadding ? t('account.logging_out') : t('account.logout')}
                            onPress={handleLogout}
                            className='bg-red-500 px-4 py-3 w-44'
                            textClassName='text-white'
                            style={{ backgroundColor: 'red' }}
                        />
                        <Button
                            title={t('auth.cancel')}
                            onPress={() => bottomSheetRef.current?.close()}
                            className='px-4 py-3 w-44'
                            textClassName={colorScheme === 'dark' ? 'text-white' : 'text-gray-800'}
                            style={{ backgroundColor: colorScheme === 'dark' ? '#333' : colors.light.tabIconSelected }}

                        />
                    </View>

                </View>
            </BottomPaper>

        </Layout>
    )
}
