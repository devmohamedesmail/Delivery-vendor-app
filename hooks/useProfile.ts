import { ProfileContext } from "@/context/profile-provider";
import { useContext } from "react";


export const useProfile = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useProfile must be used within ProfileProvider");
  }

  return context;
};
