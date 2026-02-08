import NoAuthorized from "@/components/screens/auth/no-authorized";
import Layout from "@/components/ui/layout";
import Loading from "@/components/ui/loading";
import { useAuth } from "@/hooks/useAuth";
import { Link, Redirect, router } from "expo-router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function Home() {
  const { auth, isLoading } = useAuth()
  const { t } = useTranslation();


  


  useEffect(() => {
    if (!auth) return;
    if (auth?.user?.role?.role === "store_owner") {
      router.replace("/(store)");
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
     <NoAuthorized />
    </Layout>
  );
}

