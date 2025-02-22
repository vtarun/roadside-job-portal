import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Download } from 'lucide-react'

const ApplicationCard = ({application, isCandidate=false}) => {
    
    const handleDownload =() => {
        
    }

    return (
    <div>
      <Card>
        <CardHeader>
            <CardTitle className="flex justify-between font-bold">
                {isCandidate 
                    ? `${application?.job?.title} at ${application?.job?.company?.name}` 
                    : application?.name
                }

                <Download 
                    size={18}
                    onCLick={handleDownload}
                    className='bg-white text-black rounded-full h-8 w-8 p-1.5 cursor-pointer'
                />
            </CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  )
}

export default ApplicationCard
