import React from 'react'
import { Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
import Button from '@/components/ui/button'
import colors from '@/constants/colors'
import { useRouter } from 'expo-router'

export default function NoVehicle({ getVehicle }: { getVehicle: () => Promise<void> }) {
    const { t } = useTranslation()
    const router = useRouter()

    const [reload, setReload] = React.useState(false);
    const handleReload = async () => {
        setReload(true);
        await getVehicle();
        setReload(false);
    }
    return (
        <View className="flex-1 justify-center items-center p-6 bg-gray-50 dark:bg-gray-900">
            <Ionicons name="car-outline" size={64} color="#9ca3af" />
            <Text className="text-xl font-bold text-gray-900 dark:text-gray-100 text-center mt-4">
                {t('vehicle.noVehicleTitle')}
            </Text>
            <Text className="text-sm mb-4 text-gray-500 dark:text-gray-400 text-center mt-2">
                {t('vehicle.noVehicleMessage')}
            </Text>

            <View className="flex-row gap-2">
                <Button
                    title={t('vehicle.create')}
                    onPress={() => router.push('/(delivery)/create')}
                    icon={<Ionicons name="add" size={20} color={colors.light.tabIconSelected} />}
                />
                <Button

                    disabled={reload}
                    icon={<Ionicons name="refresh" size={20} color={colors.light.tabIconSelected} />}
                    variant="outline"
                    title={t('common.refresh')}
                    onPress={handleReload} />
            </View>
        </View>
    )
}
