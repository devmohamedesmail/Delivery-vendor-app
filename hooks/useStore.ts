import { useProfile } from './useProfile';
export const useStore = () =>{
    const { profile ,loading, refetch}:any = useProfile()
    const store = profile?.store;  
    return { store,loading,refetch };
}