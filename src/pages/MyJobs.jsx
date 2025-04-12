import { useAuth } from "@/components/auth-provider";
import CreatedApplications from "@/components/created-applications";
import CreatedJobs from "@/components/created-jobs";
import { BarLoader } from "react-spinners";

const MyJobsPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-5xl sm:text-7xl text-center pb-8">
        {user?.role === "candidate"
          ? "My Applications"
          : "My Jobs"}
      </h1>
      {user?.role === "candidate" ? (
        <CreatedApplications />
      ) : (
        <CreatedJobs />
      )}
    </div>
  );
};

export default MyJobsPage;