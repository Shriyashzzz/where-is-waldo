import { useEffect, useState } from "react";
import { apiUrl } from "../util/api";

export function useFetch<T = unknown>(url: string, options = {}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<String | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(apiUrl(url), { ...options, signal });
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const json = await response.json();
        setData(json);
        setError(null);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message || "Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [url]);
  return { data, loading, error };
}
