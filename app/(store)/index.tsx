import Header from '@/components/ui/header'
import Layout from '@/components/ui/layout'
import { useAuth } from '@/hooks/useAuth'
import { useStore } from '@/hooks/useStore'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Loading from '@/components/ui/loading'
import NoStore from '@/components/ui/no-store'
import StoreInfo from '@/components/ui/store-info'
import usePushNotifications from '@/hooks/usePushNotifications'
import { Button, Text, View } from 'react-native'

export default function Home() {
  const { t } = useTranslation();
  const { store, loading } = useStore();
  const { auth, isLoading: authLoading } = useAuth();


  return (
    <Layout>
      <Header backButton={false} title={t('common.home')} />

      {loading || authLoading ? <Loading /> : (
        <>{!store ? (<NoStore />) : (
          <StoreInfo />
        )}</>


      )}
    </Layout>
  )
}
