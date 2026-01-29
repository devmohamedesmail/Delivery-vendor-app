
import { useContext } from 'react';
import { ProfileContext } from '@/context/profile-provider';
import { useProfile } from './useProfile';



export const useStore = () =>{
    const { profile ,loading, refetch}:any = useProfile()
    console.log("use store profile",profile);
    // const store = profile?.store;
    const store = profile?.store;
    
    return { store,loading,refetch };
}