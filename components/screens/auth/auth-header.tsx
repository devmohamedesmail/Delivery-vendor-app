import Logo from '@/components/ui/logo'
import { useSetting } from '@/hooks/useSetting'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'

export default function AuthHeader({ title, description }: { title?: string, description?: string }) {
    const { t, i18n } = useTranslation()
    const { settings } = useSetting();
    return (
        <View className="pt-5 pb-8 px-6 bg-black">

            {/* Logo/Brand Section */}
            <View className="flex flex-row justify-between items-center mb-8 pt-10">

                <View className="bg-white p-4 rounded-full overflow-hidden">
                    <Logo />
                </View>
                <View className='flex flex-1 flex-col justify-center items-center'>
                    <Text className="text-6xl  text-white font-extrabold mt-4 mb-2" >
                        {i18n.language === 'ar' ? settings?.name_ar : settings?.name_en}
                    </Text>
                    <Text className="text-xl  text-white font-extrabold mt-4 mb-2" >
                        {title}
                    </Text>
                </View>


            </View>
        </View>
    )
}
