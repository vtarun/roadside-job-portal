// import { getJobs } from '@/api/apiJobs';
// import { useSession } from '@clerk/clerk-react';
import useFetch from '@/hooks/useFetch';
import React, {useState, useEffect } from 'react';
import { BarLoader } from 'react-spinners';

import googleLogo from "./../../public/companies/google.webp";
import microsoftLogo from "./../../public/companies/microsoft.webp";
import JobCard from '@/components/job-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectValue, SelectItem } from '@/components/ui/select';
import { State } from 'country-state-city';

const JobListingPage = () => {

  // const { session } = useSession();
  const loading = false;
  const [searchTitle, setSerachTitle] = useState('');
  const [location, setLocation] = useState('');
  const [company_id, setCompany_id] = useState('');
  const companies = [{id: 1, name: "Google"}, {id: 2, name: "Microsoft"}, {id: 3, name: "Amazon"}];
  const jobs = [{
    id: 1,
    title: 'Frontend Developer',
    company: {
      id: '1',
      logo_url: googleLogo
    },
    location: 'Delhi',
    description: 'Google is looking for a frontend developer to build intuitive and responsive user interfaces for web applications that scale to millions of users.'
  },
  {
    id: 2,
    title: 'Backend Developer',
    company: {
      id: '1',
      logo_url: microsoftLogo
    },
    location: 'Chennai',
    description: 'Microsoft is looking for a Backend developer to build intuitive apis for web applications that scale to millions of users.'
  },
  {
    id: 3,
    title: 'Frontend Developer',
    company: {
      id: '1',
      logo_url: googleLogo
    },
    location: 'Delhi',
    description: 'Google is looking for a frontend developer to build intuitive and responsive user interfaces for web applications that scale to millions of users.'
  }];
  
  const clearSearch = () => {
    setSerachTitle('');
    setLocation('');
    setCompany_id('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const searchQuery = fd.get('search-query');
    if(searchQuery){
      console.log(searchQuery);
    }
  }
    // const {data:jobs, loading = true, error } = useFetch('http://localhost:4000/api/jobs', {
    //   method: 'GET', 
    //   headers: { 
    //     "Content-Type": "application/json",
    //     'Authorization': `Bearer ${localStorage.getItem("token")}`
    //   }
    // });

    // console.log(jobs);
  

  if(loading) {
    return <BarLoader className="mb-4" width={"100%"} color="red" />;
  }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>

      <form onSubmit={handleSubmit} className="h-14 flex w-full gap-2 items-center mb-3">
        <Input 
          type="text" 
          value={searchTitle}
          placeholder="Search Jobs by Title.."
          name="search-query"
          className="h-full flex-1 px-4 text-md"
          onChange={(e) => setSerachTitle(e.target.value)}
        />
        <Button type="submit" className="h-full sm:w-28" variant="blue">
          Search
        </Button>
      </form>

      <div className="flex flex-col sm:flex-row gap-2">
        <Select 
          value={location} 
          onValueChange={(value) => setLocation(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry('IN').map(({name}) => {
                return (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                )
              })}             
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={company_id} 
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
            {companies.map(({name, id}) => {
                return (
                  <SelectItem key={id} value={id}>
                    {name}
                  </SelectItem>
                )
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button variant='destructive' className="sm:w-1/2" onClick={clearSearch}>
          Clear Filters
        </Button>
      </div>

      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs?.length ? (jobs.map(job => {
          return <JobCard key={job.id} job={job} />
        })) : <div>No Jobs found!</div>}
      </div>
    </div>
  )
}

export default JobListingPage
