import Button from "@/components/ui/button";
import Layout from "@/components/ui/layout";
import Splash from "@/components/ui/splash";
import { useAuth } from "@/hooks/useAuth";
import { Link, router } from "expo-router";
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
    if (auth?.user?.role?.role === "delivery_man" || auth?.user?.role?.role === "delivery_man") {
      router.replace("/(delivery)");
      return;
    }
    if (auth?.user?.role?.role === "user" || auth?.user?.role?.role === "user") {
      router.replace("/account");
      return;
    }

    router.replace("/auth/no-authorized");
  }, [auth, isLoading, minTimePassed]);

  return (
    <Layout>
      {/* <Splash /> */}
      
    
      <Button
        variant="primary"
        size='lg'
        title="account"
        onPress={() => router.push('/account')}
      />
      <Link href="/account">account fgfsgfdg</Link>
    </Layout>
  );
}

