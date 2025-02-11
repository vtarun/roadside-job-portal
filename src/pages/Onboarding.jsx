import React, { useEffect } from 'react';
import { BarLoader } from 'react-spinners';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import useFetch from '@/hooks/useFetch';

const OnboardingPage = () => {
  const {data, loading } = useFetch('http://localhost:4000/api/user', {
      method: 'GET', 
      headers: { 
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("token")}`
       }
  });
  const navigate = useNavigate();

  const navigateUser = (role) => {
    navigate(role === 'recruiter' ? "/post-job" : "/jobs");
  }

  const handleSelection = async (role) => {
    fetch('http://localhost:4000/api/user', {
      method: 'PUT', 
      headers: { "Content-Type": "application/json" , 'Authorization': `Bearer ${localStorage.getItem("token")}`}
    })
    .then((response) => {
      navigateUser(response?.role);
    })
    .catch((err) => {
      console.error("Error updating role:", err);
    })
  };

  useEffect(() => {
    if (data?.role) {
      navigateUser(user.role);
    }
  }, [data]);

  if(loading) {
    return <BarLoader className="mb-4" width={"100%"} color="red" />;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-32">
      <h2 className='gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter'>
        I am a...
      </h2>

      <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
        <Button
          variant="blue"
          className="h-36 text-2xl"
          onClick={() => handleSelection('candidate')}
        >Candidate</Button>

        <Button
          variant="destructive"
          className="h-36 text-2xl"
          onClick={() => handleSelection('recruiter')}
        >Recruiter</Button>
      </div>
    </div>
  )
}

export default OnboardingPage;
