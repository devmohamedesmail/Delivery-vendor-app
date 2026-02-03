import { config } from "@/constants/config"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { useColorScheme } from "nativewind"
import { ReactNode, useEffect, useState } from "react"


const THEME_KEY = "APP_THEME"

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { colorScheme, setColorScheme } = useColorScheme()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    async function loadTheme() {
      // const { data } = await axios.get(`${config.URL}/settings`)

      // setCustomProperty('--color-background', data.data.background_color)
      // setCustomProperty('--color-background-dark', data.data.background_color_dark)


      // setCustomProperty('--color-text', data.data.text_color)
      // setCustomProperty('--color-text-dark', data.data.text_color_dark)


      // setCustomProperty('--color-primary', data.data.primary_color)
      // setCustomProperty('--color-primary-dark', data.data.primary_color_dark)


      // setCustomProperty('--color-card', data.data.card_color)
      // setCustomProperty('--color-card-dark', data.data.card_color_dark)

      // setCustomProperty('--color-border', data.data.border_color)
      // setCustomProperty('--color-border-dark', data.data.border_color_dark)


      // setCustomProperty('--color-primary', data.data.primary_color)
      // setCustomProperty('--color-secondary', data.secondary)
      // setCustomProperty('--color-bg', data.background)
      // setCustomProperty('--color-text', data.text)




      const savedTheme = await AsyncStorage.getItem(THEME_KEY)

      if (savedTheme === "light" || savedTheme === "dark") {
        setColorScheme(savedTheme)
      }

      setReady(true)
    }

    loadTheme()
  }, [])

  useEffect(() => {
    if (!colorScheme) return
    AsyncStorage.setItem(THEME_KEY, colorScheme)
  }, [colorScheme])

  if (!ready) return null // أو Splash Screen

  return children
}