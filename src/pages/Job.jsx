import React, {useState} from 'react'
import { useParams } from 'react-router-dom';
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from 'lucide-react';
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectValue, SelectItem } from '@/components/ui/select';
import MDEditor from '@uiw/react-md-editor';
import ApplyJobDrawer from '@/components/apply-job';
import { BarLoader } from 'react-spinners';
import { useAuth } from '@/components/auth-provider';
import useJobApi from '@/hooks/useJobApi';
import ApplicationCard from '@/components/application-card';

const API_URL = import.meta.env.VITE_JOB_PORTAL_API_URL || "http://localhost:4000"

const JobPage = () => {

  const {user} = useAuth();
  const {id: jobId} = useParams();
  const { data: job, loading, error, fetchData, updateJobStatus } = useJobApi(jobId);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const handleStatusChange = async (value) => {
    const isOpen = value === 'open';
    setIsUpdatingStatus(true);
    try{
      await updateJobStatus(isOpen);
    } catch(err){
      console.error("Error updating job status: ", err);
    } finally{
      setIsUpdatingStatus(false);
    }
  }

  if(loading) {
    return <BarLoader className="mb-4" width={"100%"} color="red" />;
  }

  if (error) {
    return <div className="text-red-500 text-center">Failed to load data. Please try again later.</div>;
  }


  return (
    <div className="flex flex-col gap-8 mt-5">
      <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
        <h1 className="gradient-title font-extrabold pb-3 text-4xl sm:text-6xl">
          {job?.title}
        </h1>
        <img src={`${API_URL}${job?.company_id?.logo_url}`} className="h-12"  alt={job?.title}/>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <MapPinIcon />{job?.location}
        </div>
        <div className="flex gap-2">
          <Briefcase/> {job?.applications?.length} Applicants
        </div>
        <div className="flex gap-2">
          {job?.isOpen ? <><DoorOpen /> Open</> : <><DoorClosed />Closed</>}
        </div>
      </div>
    {/*TODO: add loading status */}
    {job?.recruiter_id === user?.user_id && 
      <Select onValueChange={handleStatusChange} disabled={isUpdatingStatus}>
          <SelectTrigger className={`w-full ${job?.isOpen ? "bg-green-950" : "bg-red-950"}`}>
            <SelectValue placeholder={"Hiring Status " + (job?.isOpen ? "( Open )": "( Closed )")} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="close">Close</SelectItem>           
            </SelectGroup>
          </SelectContent>
        </Select>
      }

      <h2 className='text-2xl sm:text-3xl font-bold'>
        About the job
      </h2>
      <p className='sm:text-lg'>{job?.description}</p>

      <h2 className='text-2xl sm:text-3xl font-bold'>
        What we are looking for
      </h2>
      <MDEditor.Markdown source={job?.requirements} className='bg-transparent sm:text-lg'/>


      {/* render application */}
      {job?.recruiter_id !== user?.user_id && <ApplyJobDrawer job={job} user={user} fetchJob={fetchData} applied={job?.applications?.find((ap) => ap.candidate_id._id === user.user_id)}/>}
    
      {job?.applications?.length > 0 && job?.recruiter_id === user?.user_id && (
        <div className='flex flex-col gap-2'>
          <h2 className='text-2xl sm:text-3xl font-bold'>Applications</h2>
          {job?.applications.map((ap) => {
            return <ApplicationCard key={ap.id} application={ap}/>
          })}
        </div>
      )}

    </div>
  )
}

export default JobPage
