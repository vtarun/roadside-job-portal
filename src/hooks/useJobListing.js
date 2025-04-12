import { useState, useEffect } from "react";
import { getAllJobs, deleteJob, saveOrRemoveJob as updateSavedJobs } from "@/api/jobs.api";
import { getCompanies } from "@/api/companies.api";

const useJobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [filters, setFilters] = useState({ search: "", location: "", company_id: "" });
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [loadingCompanies, setLoadingCompanies] = useState(false);
  const [search, setSearch] = useState(false);
  const [error, setError] = useState(null);

  // Fetch jobs based on filters
  const fetchJobs = async () => {
    setLoadingJobs(true);
    setError(null);
    try {
      const data = await getAllJobs(filters);
      setJobs(data.jobs || []);
    } catch (err) {
      setError(err.message || "Failed to fetch jobs");
    } finally {
      setLoadingJobs(false);
    }
  };

  const deleteJobById = async (jobId) => {
    setLoadingJobs(true);
    setError(null);
    try {
      const remainingJobs = await deleteJob(jobId);
      if(response.error){
        return;
      }
      setJobs(remainingJobs.jobs || []);
    } catch (err) {
      setError(err.message || "Failed to delete job");
    } finally {
      setLoadingJobs(false);
    }
  };

  // Fetch companies
  const fetchCompanies = async () => {
    setLoadingCompanies(true);
    setError(null);
    try {
      const data = await getCompanies();
      setCompanies(data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch companies");
    }finally{
        setLoadingCompanies(false);
    }
  };
  
  const updateFilterOnSearch  = (searchValue) => {
    if(search !== searchValue){
      setSearch(searchValue);
      setFilters(prev => ({...prev, search: searchValue }));
    }    
  };

  // const saveOrRemoveJob = async (jobId) => {
  //   setError(null);
  //   try {
  //     const savedJobs = await updateSavedJobs(jobId);
  //     setJobs(savedJobs.jobs || []);
  //   } catch (err) {
  //     setError(err.message || "Failed to wishlist job");
  //   }
  // };

  // Clear filters
  const clearFilters = () => {
    setFilters({search: "", location: "", company_id: "" });
  };

  // Fetch jobs whenever filters change
  useEffect(() => {
    fetchJobs();
  }, [filters]);

  // Fetch companies only once when the component mounts
  useEffect(() => {
    fetchCompanies();
  }, []);

  const loading = loadingJobs || loadingCompanies;

  return { jobs, companies, filters, setFilters, updateFilterOnSearch, deleteJobById, loading, error, clearFilters };
};

export default useJobListing;