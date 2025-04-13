import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import JobCard from "./job-card";
import { getCreatedJobs, deleteJob } from "@/api/jobs.api";
import useFetch from "@/hooks/useFetch";

const CreatedJobs = () => {  
  const {
    loading: loadingCreatedJobs,
    data,
    error,
  } = useFetch(getCreatedJobs);

  const [createdJobs, setJobs] = useState(data?.jobs || []);

  useEffect(() => {
    if (data?.jobs) {
      setJobs(data.jobs);
    }
  }, [data]);

  const handleDeleteJob = async (jobId) => {
    try {
      await deleteJob(jobId);
      // toast.success("Job deleted successfully!");
      // Update the local state to remove the deleted job
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (err) {
      if (err.response && err.response.status === 403) {
        // toast.error("You are not authorized to delete this job.");
      } else {
        // toast.error("Failed to delete job. Please try again.");
      }
    }
  };


  if(error){
    return <div className="text-red-500 text-center">Failed to load data. Please try again later.</div>;
  }

  return (
    <div>
      {loadingCreatedJobs ? (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      ) : (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {createdJobs?.length ? (
            createdJobs.map((job) => {
              return (
                <JobCard
                  key={job._id}
                  job={job}
                  onDeleteJob={handleDeleteJob}
                  isMyJob={true}
                />
              );
            })
          ) : (
            <div>No Jobs Found 😢</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreatedJobs;