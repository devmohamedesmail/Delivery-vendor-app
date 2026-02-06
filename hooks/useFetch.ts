import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { config } from "@/constants/config";
import { useAuth } from "./useAuth";

const useFetch = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const { auth } = useAuth();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${config.URL}${url}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`
        }
      });
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (url) fetchData();
  }, [url, fetchData]);

  const refetch = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
};

export default useFetch;


















