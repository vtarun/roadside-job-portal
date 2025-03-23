import { useState, useEffect, useCallback } from "react";

const useFetch = (apiFunction) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiFunction();

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  // Auto-fetch if enabled
  useEffect(() => {
      fetchData()
  }, [fetchData]);

  return { data, loading, error };
};

export default useFetch;
