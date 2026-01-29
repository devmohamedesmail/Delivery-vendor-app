import { AuthContext } from "@/context/auth-provider";
import React, { useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { Link, Redirect, router } from "expo-router";
import Loading from "@/components/ui/loading";
import { useTranslation } from "react-i18next";
import Layout from "@/components/ui/layout";

export default function Home() {
  const { auth, isLoading } = useContext(AuthContext);
  const { t } = useTranslation();


  useEffect(() => {
    if (!auth) return;
    if (auth?.user?.role?.role === "store_owner") {
      router.replace("/(store)/index");
    }
  }, [auth]);

  if (isLoading) {
    return <Loading />;
  }

  if (!auth) {
    return <Redirect href="/auth/login" />;
  }

  return (
    <Layout>
      <View>
        <Text className="text-lg text-center mb-4">
          {t("auth.noauthvarified")}
        </Text>
        <Text className="text-lg text-center mb-4">
          {auth.user?.email}
        </Text>
        <Link
          href="/auth/login"
          className="bg-primary text-white text-center px-10 py-3 rounded-full"
        >
          {t("auth.signIn")}
        </Link>
      </View>
    </Layout>
  );
}