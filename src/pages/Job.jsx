import React from 'react'
import { useParams } from 'react-router-dom';
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from 'lucide-react';
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectValue, SelectItem } from '@/components/ui/select';
import MDEditor from '@uiw/react-md-editor';
import ApplyJobDrawer from '@/components/apply-job';
import useApi from '@/hooks/useApi';
import { BarLoader } from 'react-spinners';

const JobPage = () => {

  const user = {id: 1};
  const params = useParams();
  const { data, loading: loadingJob } = useApi(`http://localhost:4000/jobs/get-job/${params.id}`);
// use effect to fech job based on id
  const job = data?.job;
  const handleStatusChange = (value) => {
    const isOpen = value === 'open';
    console.log(isOpen);
  }

  if(loadingJob) {
    return <BarLoader className="mb-4" width={"100%"} color="red" />;
  }


  return (
    <div className="flex flex-col gap-8 mt-5">
      <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
        <h1 className="gradient-title font-extrabold pb-3 text-4xl sm:text-6xl">
          {job?.title}
        </h1>
        <img src={job?.company?.logo_url} className="h-12"  alt={job?.title}/>
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
    {job?.recruiter_id === user?.id && 
      <Select onValueChange={handleStatusChange}>
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
      {job?.recruiter_id !== user?.id && <ApplyJobDrawer job={job} user={user} fetchJob={()=> {}} applied={job?.applications?.find((ap) => ap.candidate_id === user.id)}/>}
    
      {job?.applications?.length > 0 && job?.recruiter_id === user?.id && (
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
