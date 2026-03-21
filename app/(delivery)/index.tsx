import Header from '@/components/ui/header';
import Layout from '@/components/ui/layout';
import useVehicle from '@/hooks/delivery/useVehicle'
import { useRouter } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
import Button from '@/components/ui/button'
import colors from '@/constants/colors'
import Loading from '@/components/ui/loading';
import VehicleInfo from '@/components/screens/delivery/vehicle-info';
import NoVehicle from '@/components/screens/delivery/no-vehicle';




export default function DeliveryIndex() {
    const { vehicle, isLoading, getVehicle } = useVehicle();
    const { t } = useTranslation();
  

    return (
        <Layout>
            <Header title="Delivery" />
            <View className='flex-1 items-center justify-center'>
                {isLoading ? (
                    <Loading />
                ) : (

                    <>
                        {vehicle ? (
                            <VehicleInfo vehicle={vehicle} />
                        ) : (
                          <NoVehicle getVehicle={getVehicle} />
                        )}
                    </>
                )}
            </View>
        </Layout>
    )
}
