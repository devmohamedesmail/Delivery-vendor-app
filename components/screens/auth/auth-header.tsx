import React from 'react'
import { View, Text } from 'react-native'
import { useTranslation } from 'react-i18next'
// import Logo from '@/components/common/logo'

export default function AuthHeader({ title, description }: { title?: string, description?: string }) {
    const { t } = useTranslation()
    return (
        <View className="pt-5 pb-8 px-6 bg-black">

            {/* Logo/Brand Section */}
            <View className="items-center mb-8 pt-10">

                <View className="bg-white p-4 rounded-full overflow-hidden">
                    {/* <Logo /> */}
                </View>
                <Text className="text-3xl  text-white font-extrabold mt-4 mb-2" >
                    {title}
                </Text>
                <Text className="text-md  text-white font-extrabold mt-4 mb-2" >

                    {description}
                </Text>

            </View>
        </View>
    )
}
