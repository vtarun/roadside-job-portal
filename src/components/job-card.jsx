import React from 'react'
import { CardHeader, CardTitle, CardContent, Card, CardFooter } from './ui/card'
import { Heart, MapPinIcon, Trash2Icon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button';

const API_URL = import.meta.env.VITE_JOB_PORTAL_API_URL || "http://localhost:4000"

const JobCard = ({
    job,
    isMyJob = false,
    savedInit = false,
    onJobSaved = () => {},
    onDeleteJob= () => {}
}) => {
    
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
            {job.title}

            {isMyJob && (
                <Trash2Icon 
                  fill="red" 
                  size={18}
                  className="text-red-300 cursor-pointer"
                  onClick={() => onDeleteJob(job._id)}
                />
            )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className='flex justify-between'>
            {job.company_id && <img src={`${API_URL}${job.company_id.logo_url}`} className='h-6'/>}
            <div className='flex gap-2 items-center'>
                <MapPinIcon size={15} /> {job.location}
            </div>
        </div>
        <hr />
        {job.description.substring(0, job.description.indexOf('.'))}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link to={`/job/${job._id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            More Details
          </Button>
        </Link>
        {!isMyJob && (
            <Button variant="outline" className="w-15" onClick={() => onJobSaved(job._id)}>
                {savedInit ? <Heart size={20} stroke="red" fill="red"/> : <Heart size={20} />}
            </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default JobCard
