import React, { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { BarLoader } from 'react-spinners';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const OnboardingPage = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const navigateUser = (role) => {
    navigate(role === 'recruiter' ? "/post-job" : "/jobs");
  }

  const handleSelection = async (role) => {
    await user.update({
      unsafeMetadata: { role },
    })
    .then(() => {
      navigateUser(role);
    })
    .catch((err) => {
      console.error("Error updating role:", err);
    })
  };

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigateUser(user.unsafeMetadata.role);
    }
  }, [user]);

  if(!isLoaded) {
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
