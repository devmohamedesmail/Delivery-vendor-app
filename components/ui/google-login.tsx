import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Alert, Image, Pressable, Text, View } from 'react-native';

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import colors from "@/constants/colors";


export default function GoogleLogin() {
  const { t } = useTranslation();
  const [state, setState] = useState<any>(null);
  const router = useRouter();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { social_login } = useAuth();

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

      } catch (error) {
        console.log("Failed to configure Google Sign-In:", error);
      }
    };

    configureGoogle();
  }, []);

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


  return (
    <View>
      <Pressable
        onPress={signIn}
        disabled={isGoogleLoading}
        className={`flex-row items-center justify-center rounded-xl py-4 px-6 ${isGoogleLoading
          ? 'bg-gray-100 dark:bg-gray-700'
          : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700'
          }`}
      >
        {isGoogleLoading ? (
          <>
            <ActivityIndicator size="small" color={colors.light.tabIconSelected} className="mr-3" />
            <Text className="text-gray-800 dark:text-white font-semibold text-base">
              {t('auth.signingIn')}
            </Text>
          </>
        ) : (
          <>
            <Image
              source={require('@/assets/icons/google.png')}
              className="w-6 h-6 mr-3"
              resizeMode="contain"
            />
            <Text className="text-gray-800 dark:text-white font-semibold text-base">
              {t('auth.continueWithGoogle')}
            </Text>
          </>
        )}
      </Pressable>
    </View>
  )
}
