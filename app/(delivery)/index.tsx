import Header from '@/components/ui/header';
import Layout from '@/components/ui/layout';
import useVehicle from '@/hooks/delivery/useVehicle'
import { Link, useRouter } from 'expo-router'
import React from 'react'
import { Text, View, ScrollView, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
import Button from '@/components/ui/button'
import colors from '@/constants/colors'
import Loading from '@/components/ui/loading';


const InfoRow = ({ icon, label, value }: { icon: any, label: string, value: string }) => (
    <View className="flex-row items-center justify-between p-4">
        <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-700/50 items-center justify-center mr-3">
                <Ionicons name={icon} size={18} color="#6b7280" />
            </View>
            <Text className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</Text>
        </View>
        <Text className="text-sm font-semibold text-gray-900 dark:text-white">{value}</Text>
    </View>
);

export default function DeliveryIndex() {
    const { vehicle, isLoading, getVehicle } = useVehicle();
    const { t } = useTranslation();
    const router = useRouter();
    const [reload, setReload] = React.useState(false);
    const handleReload = async () => {
        setReload(true);
        await getVehicle();
        setReload(false);
    }
    
    return (
        <Layout>
            <Header title="Delivery" />
            <View className='flex-1 items-center justify-center'>
                {/* <Text>DeliveryIndex</Text>
                <Link href="/(delivery)/create">Create Vehicle</Link> */}
                {isLoading ? (
                    <Loading />
                ) : (

                    <>
                        {vehicle ? (
                            <ScrollView showsVerticalScrollIndicator={false} className="flex-1 w-full bg-gray-50 dark:bg-gray-900">
                                <View className="p-4">
                                    {/* Image Section */}
                                    <View className="mb-6 rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
                                        <Image
                                            source={{ uri: vehicle.image }}
                                            className="w-full h-56"
                                            resizeMode="cover"
                                        />
                                    </View>

                                    {/* Title and Badges Section */}
                                    <View className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                                        <View className="flex-row justify-between items-center mb-4">
                                            <Text className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1 flex-1 mr-2">
                                                {vehicle.model} ({vehicle.type})
                                            </Text>
                                            <View className={`px-3 py-1 rounded-full ${vehicle.is_active ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                                                <Text className={`text-xs font-medium ${vehicle.is_active ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                                                    {vehicle.is_active ? t('common.active') : t('common.inactive')}
                                                </Text>
                                            </View>
                                        </View>

                                        <View className="flex-row flex-wrap gap-2">
                                              <View className={`flex-row items-center px-3 py-1.5 rounded-full ${vehicle.is_available ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-700'}`}>
                                                  <Ionicons name="location-outline" size={14} color={vehicle.is_available ? '#3b82f6' : '#6b7280'} className="mr-1" />
                                                  <Text className={`text-xs font-medium ml-1 ${vehicle.is_available ? 'text-blue-700 dark:text-blue-400' : 'text-gray-700 dark:text-gray-400'}`}>
                                                      {vehicle.is_available ? t('driver.available') : t('driver.unavailable')}
                                                  </Text>
                                              </View>

                                              <View className={`flex-row items-center px-3 py-1.5 rounded-full ${vehicle.is_verified ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-amber-100 dark:bg-amber-900/30'}`}>
                                                  <Ionicons name={vehicle.is_verified ? 'checkmark-circle-outline' : 'time-outline'} size={14} color={vehicle.is_verified ? '#10b981' : '#d97706'} className="mr-1" />
                                                  <Text className={`text-xs font-medium ml-1 ${vehicle.is_verified ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'}`}>
                                                      {vehicle.is_verified ? t('common.verified') : t('common.unverified')}
                                                  </Text>
                                              </View>
                                        </View>
                                    </View>

                                    {/* Vehicle Details */}
                                    <View className="mb-6">
                                        <Text className="text-lg font-bold text-gray-900 dark:text-white mb-3 px-1">{t('vehicle.information')}</Text>
                                        <View className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                                            
                                            <InfoRow icon="barcode-outline" label={t('vehicle.plateNumber')} value={vehicle.plateNumber} />
                                            <View className="h-[1px] bg-gray-100 dark:bg-gray-700" />
                                            <InfoRow icon="car-sport-outline" label={t('vehicle.model')} value={vehicle.model} />
                                            <View className="h-[1px] bg-gray-100 dark:bg-gray-700" />
                                            <InfoRow icon="color-palette-outline" label={t('vehicle.color')} value={vehicle.color} />
                                            <View className="h-[1px] bg-gray-100 dark:bg-gray-700" />
                                            <InfoRow icon="people-outline" label={t('vehicle.capacity')} value={vehicle.capacity.toString()} />
                                            
                                        </View>
                                    </View>

                                    {/* License & Insurance Details */}
                                    <View className="mb-6">
                                        <Text className="text-lg font-bold text-gray-900 dark:text-white mb-3 px-1">{t('vehicle.licenseAndInsurance')}</Text>
                                        <View className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                                            
                                            <InfoRow icon="card-outline" label={t('vehicle.license')} value={vehicle.license} />
                                            <View className="h-[1px] bg-gray-100 dark:bg-gray-700" />
                                            <InfoRow icon="shield-checkmark-outline" label={t('vehicle.insurance')} value={vehicle.insurance} />
                                            <View className="h-[1px] bg-gray-100 dark:bg-gray-700" />
                                            <InfoRow icon="calendar-outline" label={t('vehicle.insuranceDate')} value={new Date(vehicle.insurance_date).toLocaleDateString()} />
                                            
                                        </View>
                                    </View>

                                </View>
                            </ScrollView>
                        ) : (
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
                        )}
                    </>
                )}
            </View>
        </Layout>
    )
}
