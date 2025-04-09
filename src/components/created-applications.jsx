import useFetch from "@/hooks/useFetch";
import ApplicationCard from "./application-card";
import { BarLoader } from "react-spinners";
import { getAppliedJobs } from "@/api/jobs.api";

const CreatedApplications = () => {    
    const {
      loading,
      data: applications,
      error,
    } = useFetch(getAppliedJobs);
  
    if(error){
      return <div className="text-red-500 text-center">Failed to load data. Please try again later.</div>;
    }

  if (loading) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col gap-2">
      {applications?.map((application) => {
        return (
          <ApplicationCard
            key={application._id}
            application={application}
            isCandidate={true}
          />
        );
      })}
    </div>
  );
};

export default CreatedApplications;