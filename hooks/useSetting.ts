import { useContext } from 'react'

import { SettingContext } from '@/context/setting-provider'
import { SettingContextType } from '@/types'

export const useSetting = (): SettingContextType => {
  const context = useContext(SettingContext)
  if (!context) {
    throw new Error('useSetting must be used within a SettingProvider')
  }

  return context
}