import React from 'react'
import { CardHeader, CardTitle, CardContent, Card, CardFooter } from './ui/card'
import { Heart, MapPinIcon, Trash2Icon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'

const JobCard = ({
    job,
    isMyJob = false,
    savedInit = false,
    onJobSaved = () => {},
}) => {
    const loadingSavedJob = false; //TODO:  get this value from useFetch
    function handleSaveJob() {
        
    }
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
            {job.title}

            {!isMyJob && (
                <Trash2Icon 
                fill="red" 
                size={18}
                className="text-red-300 cursor-pointer"
                />
            )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className='flex justify-between'>
            {job.company && <img src={job.company.logo_url} className='h-6'/>}
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
            <Button variant="outline" className="w-15" onClick={handleSaveJob} disabled={loadingSavedJob}>
                {savedInit ? <Heart size={20} stroke="red" fill="red"/> : <Heart size={20} />}
            </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default JobCard
