import Layout from '@/components/ui/layout'
import React from 'react'
import { View } from 'react-native'
import { useStore } from '@/hooks/useStore'
import { useAuth } from '@/hooks/useAuth'
import { useTranslation } from 'react-i18next'

export default function Home() {
  const { t } = useTranslation();
  const { store, loading } = useStore();
  const { isLoading: authLoading } = useAuth();
  console.log(store);
  return (
    <Layout>
     <View></View> 
    </Layout>
  )
}
