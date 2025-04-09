import { BarLoader } from "react-spinners";
import JobCard from "./job-card";
import { getCreatedJobs, saveOrRemoveJob } from "@/api/jobs.api";
import useFetch from "@/hooks/useFetch";

const CreatedJobs = () => {  
  const {
    loading: loadingCreatedJobs,
    data: createdJobs,
    error,
  } = useFetch(getCreatedJobs);

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
                  onDeleteJob={() => {}}
                  onJobSaved={saveOrRemoveJob}
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