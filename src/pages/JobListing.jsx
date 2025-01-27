import { getJobs } from '@/api/apiJobs';
import { useSession } from '@clerk/clerk-react';
import React, { useEffect } from 'react';

const JobListingPage = () => {

  const { session } = useSession();

  const fetchJobs = async () => {
    // console.log(session);
    // const supabaseAccessToken = await session?.getToken({
    //   template: "supabase",

    // });
    const supabaseAccessToken = "eyJhbGciOiJSUzI1NiIsImNhdCI6ImNsX0I3ZDRQRDExMUFBQSIsImtpZCI6Imluc18ycndsajVheUFGWUNtelFuemNscnN0UUUxejQiLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJodHRwOi8vbG9jYWxob3N0OjUxNzMiLCJleHAiOjE3Mzc4NzUwODIsImZ2YSI6Wy0xLC0xXSwiaWF0IjoxNzM3ODc1MDIyLCJpc3MiOiJodHRwczovL2NoZWVyZnVsLXN0aW5rYnVnLTk0LmNsZXJrLmFjY291bnRzLmRldiIsIm5iZiI6MTczNzg3NTAxMiwic2lkIjoic2Vzc18yczlqbkNySGIydXdPYmhKSzFtUFNldnZrSkIiLCJzdWIiOiJ1c2VyXzJzOWpuOFczQ05oREFLR3JsOE02TkJ3aWF4TyJ9.ltp6RQNek3h1JPqRhekayren_W28aepz0kXQ9J7w1VgkLJwdco6GMfFMNvx074mLCyHDl4YdyuIn9VBo-UQgPEjFKsO_VNdu3u_JI3yhBMLBY41Yoi7-IsMsDvj0hdU7ob4reokfvNHCB4zeVgYDX79kgPH0w1lotbE2uiyrc3q-0Q_aOPUDBuIWa0CSiGErk8OSyvOkJR2f4lxdVFthDEs30aHvCizai5lbQY5wxLLSyoKq-yZSvkSvcVvb6bU08x3igx6arR79acIDspRyqObs7O5CG-FQI8oNrEUYaxdF-UghRNoWnRPSACENZdqK4UzcsbT4NsW9LjXEr4kxOg";

    const data = await getJobs(supabaseAccessToken);
    console.log(data);
  };

  useEffect(()=>{

    fetchJobs();
  },[]);

  return (
    <div>
      JobListingPage
    </div>
  )
}

export default JobListingPage
