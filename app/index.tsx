import Layout from "@/components/ui/layout";
import Splash from "@/components/ui/splash";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";

export default function Home() {
  const { auth, isLoading } = useAuth();
  const hasRedirected = useRef(false);
  const [minTimePassed, setMinTimePassed] = useState(false);



  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimePassed(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    if (isLoading) return;
    if (!minTimePassed) return;
    if (hasRedirected.current) return;

    hasRedirected.current = true;

    if (!auth) {
      router.replace("/auth/login");
      return;
    }

    if (auth?.user?.role?.role === "store_owner" || auth?.user?.role?.role === "admin") {
      router.replace("/(store)");
      return;
    }

    router.replace("/auth/no-authorized");
  }, [auth, isLoading, minTimePassed]);

  return (
    <Layout>
      <Splash />
    </Layout>
  );
}

