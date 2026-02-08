import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Animated, Easing, Image, Pressable, Text } from 'react-native';

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import Toast from 'react-native-toast-message';


export default function GoogleLogin() {
  const { t } = useTranslation();
  const [state, setState] = useState<any>(null);
  const router = useRouter();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { social_login } = useAuth();

  // Animation values
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const dotsAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const configureGoogle = async () => {
      try {
        await GoogleSignin.configure({
          webClientId:
            "771400966764-p1ul7kjogadievs9dfmr1dk58vb0aue4.apps.googleusercontent.com",
          offlineAccess: false,
          hostedDomain: "",
          forceCodeForRefreshToken: true,
          accountName: "",
          iosClientId: "",
          googleServicePlistPath: "",
          openIdRealm: "",
          profileImageSize: 120,
        });
        console.log("Google Sign-In configured successfully");
      } catch (error) {
        console.error("Failed to configure Google Sign-In:", error);
      }
    };

    configureGoogle();
  }, []);

  // Animation effect for loading state
  useEffect(() => {
    if (isGoogleLoading) {
      // Rotation animation
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();

      // Pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 600,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 600,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Dots animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(dotsAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(dotsAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      rotateAnim.setValue(0);
      pulseAnim.setValue(1);
      dotsAnim.setValue(0);
    }
  }, [isGoogleLoading]);

  const signIn = async () => {
    try {
      setIsGoogleLoading(true);
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response)) {
        setState({ userInfo: response.data });
        const userData = response.data.user;

        const result = await social_login({
          email: userData.email,
          name: userData.name,
          avatar: userData.photo,
          provider: 'google',
          provider_id: userData.id,
          role_id: 3,
        });

        if (result.success) {
          Toast.show({
            type: "success",
            text1: t("auth.registration_success"),
            position: "top",
            visibilityTime: 1000,
          });

          setTimeout(() => {
            router.push("/(store)");
          }, 3000);
        } else {
          Toast.show({
            type: "error",
            text1: t("auth.registration_failed"),
            position: "top",
            visibilityTime: 3000,
          });
        }

      } else {
        Toast.show({
          type: "info",
          text1: t("auth.registration_failed"),
          position: "top",
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      setIsGoogleLoading(false);
      console.error("Error during Google sign in:", error);

      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            console.log("Sign in operation already in progress");
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.log("Play Services not available or outdated");
            Alert.alert("Error", "Google Play Services not available");
            break;
          case statusCodes.SIGN_IN_CANCELLED:
            console.log("Sign in was cancelled by user");
            Alert.alert("Cancelled", "Sign-in was cancelled");
            break;
          case statusCodes.SIGN_IN_REQUIRED:
            console.log("User needs to sign in");
            break;
          default:
            console.log("Unknown error occurred:", error);
            Alert.alert(
              "Error",
              `Failed to sign in: ${(error as any).message || "Unknown error"}`
            );
        }
      } else {
        Toast.show({
          type: "error",
          text1: t("auth.registration_failed"),
          position: "top",
          visibilityTime: 3000,
        });
      }
    }
  };



  // Interpolate rotation value
  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Interpolate dots opacity
  const dotsOpacity = dotsAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  return (
    <Animated.View
      style={{
        transform: [{ scale: isGoogleLoading ? pulseAnim : 1 }],
      }}
    >
      <Pressable
        onPress={signIn}
        disabled={isGoogleLoading}
        className={`flex-row items-center justify-center rounded-xl py-4 px-6 shadow-lg ${isGoogleLoading
            ? 'bg-blue-500 dark:bg-blue-600'
            : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700'
          }`}
        style={{
          opacity: isGoogleLoading ? 0.95 : 1,
        }}
      >
        {isGoogleLoading ? (
          <>
            {/* Animated Google Icon with Rotation */}
            <Animated.Image
              source={require('@/assets/icons/google.png')}
              className="w-8 h-8 mr-3"
              resizeMode="contain"
              style={{
                transform: [{ rotate: spin }],
              }}
            />

            {/* Loading Text */}
            <Text className="text-white font-semibold text-base">
              {t('auth.signingIn')}
            </Text>

            {/* Animated Dots */}
            <Animated.Text
              className="text-white font-bold text-base ml-1"
              style={{ opacity: dotsOpacity }}
            >
              ...
            </Animated.Text>
          </>
        ) : (
          <>
            <Image
              source={require('@/assets/icons/google.png')}
              className="w-10 h-10 mr-3"
              resizeMode="contain"
            />
            <Text className="text-gray-800 dark:text-white font-semibold text-base">
              {t('auth.continueWithGoogle')}
            </Text>
          </>
        )}
      </Pressable>
    </Animated.View>
  )
}
