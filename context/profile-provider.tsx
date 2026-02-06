import React, { createContext } from "react";
import useFetch from "@/hooks/useFetch";
import { useAuth } from "@/hooks/useAuth";


interface ProfileContextType {
  profile: any;
  loading: boolean;
  error: any;
  refetch: () => Promise<void>;
}
export const ProfileContext = createContext<ProfileContextType | null>(null);



export default function ProfileProvider({ children }: { children: React.ReactNode }) {

  const { auth } = useAuth();
  const { data, loading, error, refetch } = useFetch(`/users/profile/${auth?.user?.id}`);
  // const { data, loading, error, refetch } = useFetch(`/auth/get-profile`);
  const profile = data?.data || null;

  return (
    <ProfileContext.Provider value={{ profile, loading, error, refetch }}>
      {children}
    </ProfileContext.Provider>
  );
}


