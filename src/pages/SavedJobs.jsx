import { getSavedJobs } from "@/api/jobs.api";
import { useAuth } from "@/components/auth-provider";
import JobCard from "@/components/job-card";
import useFetch from "@/hooks/useFetch";
// import { useEffect } from "react";
import { BarLoader } from "react-spinners";

const SavedJobsPage = () => {
  const {user} = useAuth();

  const {
    loading: loadingSavedJobs,
    data: savedJobs,
    error,
  } = useFetch(getSavedJobs);

  if (loadingSavedJobs) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Saved Jobs
      </h1>

      {loadingSavedJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedJobs?.length ? (
            savedJobs?.map((saved) => {
              return (
                <JobCard
                  key={saved.id}
                  job={saved?.job}
                  onJobAction={fnSavedJobs}
                  savedInit={true}
                />
              );
            })
          ) : (
            <div>No Saved Jobs Found 👀</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SavedJobsPage;