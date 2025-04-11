import { getJobById, updateJobStatus as updateJobCurrentStatus } from '@/api/jobs.api';
import { useState, useEffect } from 'react';

const useJobApi = (jobId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getJobById(jobId);
      setData(response.job);
    } catch (err) {
      setError(err.message || "Failed to fetch job details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateJobStatus = async (isOpen) => {
    setLoading(true);
    try {
      const response = await updateJobCurrentStatus(jobId, isOpen);
      setData(response.job);
    } catch (err) {
      setError(err.message || "Failed to fetch job details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

 

  return { data, loading, error, fetchData, updateJobStatus };
};

export default useJobApi;
