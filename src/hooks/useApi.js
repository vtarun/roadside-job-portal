import { useState, useEffect } from 'react';

const useApi = (initialUrl, options = {}, immediate = true) => {
  const [url, setUrl] = useState(initialUrl); 
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const fetchData = async (overrideOptions = {}) => {
    if (!url) return; // Prevent fetching if URL is empty
    setLoading(true);
    try {
      const response = await fetch(url, {
        ...options,
        ...overrideOptions, // Allow overriding method, body, etc.
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          ...options.headers,
          ...overrideOptions.headers,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch data");

      const result = await response.json();
      setData(result);
      return result; // Return for further processing (like navigation)
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) fetchData();
  }, []);

  const updateUrl = (newUrl, overrideOptions = {}) => {
    setUrl(newUrl);
    fetchData(overrideOptions);
  };

  return { data, loading, error, fetchData, updateUrl };
};

export default useApi;
