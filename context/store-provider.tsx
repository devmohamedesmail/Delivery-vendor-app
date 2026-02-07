import React, { createContext, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { config } from "@/constants/config";


interface StoreContextType {
    store: any;
    getStore: () => Promise<void>;
}
export const StoreContext = createContext<StoreContextType | null>(null);



export default function StoreProvider({ children }: { children: React.ReactNode }) {
    const [store, setStore] = useState<any>(null);
    const { auth } = useAuth();


    const getStore = async () => {
        try {
            const response = await axios.get(`${config.URL}/auth/get-profile`, {
                headers: {
                    Authorization: `Bearer ${auth?.token}`,
                },
            });
            setStore(response.data?.data?.store);
   
        } catch (error: any) {
            console.log('Error getting store', error.message);
        }
    };

    useEffect(() => {
        getStore();
    }, [auth]);

    return (
        <StoreContext.Provider value={{ store, getStore }}>
            {children}
        </StoreContext.Provider>
    );
}
