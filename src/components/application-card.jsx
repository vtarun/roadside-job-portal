import React from 'react'
import { toast } from "react-toastify";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Boxes, BriefcaseBusiness, Download, School } from 'lucide-react';
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectValue, SelectItem } from '@/components/ui/select';
import { updateApplicationStatus } from '@/api/applications.api';

const ApplicationCard = ({application, isCandidate=false}) => {
    
    const handleDownload = () => {
      var link = document.createElement("a");
      const baseUrl = import.meta.env.VITE_JOB_PORTAL_API_URL;
      link.href = `${baseUrl}/${application?.resume}`;
      link.target = "_blank";
      link.click();
    }

    const handleStatusChange = async (status) => {
      try{        
        await updateApplicationStatus(status, application._id);
        application.status = status
        toast.success("Application status updated successfully!");
      }catch(err){
        if (err.response && err.response.status === 403) {
          toast.error("You are not authorized to update the status.");
        } else {
          toast.error("Failed to update application status. Please try again.");
        }
      }

      
    }

    return (
    <div>
      <Card>
        <CardHeader>
            <CardTitle className="flex justify-between font-bold">
                {isCandidate 
                    ? `${application?.job_id?.title} at ${application?.job_id?.company_id?.name}` 
                    : application?.name
                }

                <Download 
                    size={18}
                    onClick={handleDownload}
                    className='bg-white text-black rounded-full h-8 w-8 p-1.5 cursor-pointer'
                />
            </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col flex-1 gap-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex gap-2 items-center">
              <BriefcaseBusiness size={15} /> {application?.experience} years of experience
            </div>
            <div className="flex gap-2 items-center">
              <School size={15} /> {application?.education}
            </div>
            <div className="flex gap-2 items-center">
              <Boxes size={15} /> Skills:  {application?.skills}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <span>{new Date(application?.created_at).toLocaleDateString()}</span>
          {isCandidate ? <span className='capitalize font-bold'>Status: {application?.status}</span> : (
            <Select onValueChange={handleStatusChange} defaultValue={application.status}>
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Application status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="interviewing">Interviewing</SelectItem> 
                <SelectItem value="hired">Hired</SelectItem> 
                <SelectItem value="rejected">Rejected</SelectItem> 
            </SelectContent>
          </Select>
          )
          }
        </CardFooter>
      </Card>
    </div>
  )
}

export default ApplicationCard
