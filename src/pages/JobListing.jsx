// import { getJobs } from '@/api/apiJobs';
// import { useSession } from '@clerk/clerk-react';
import useFetch from '@/hooks/useFetch';
import React, {useState, useEffect } from 'react';
import { BarLoader } from 'react-spinners';

import JobCard from '@/components/job-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectValue, SelectItem } from '@/components/ui/select';
import { State } from 'country-state-city';

const JobListingPage = () => {
  const [searchTitle, setSerachTitle] = useState('');
  const [location, setLocation] = useState('');
  const [company_id, setCompany_id] = useState('');
  const {data: companies, loading: loadingCompany} = useFetch('http://localhost:4000/companies/get-companies', {
    method: 'GET', 
    headers: { 
      "Content-Type": "application/json",
      'Authorization': `Bearer ${localStorage.getItem("token")}`
     }
  });

  const {data: { jobs }, loading: loadingJobs} = useFetch('http://localhost:4000/jobs/get-jobs', {
    method: 'GET', 
    headers: { 
      "Content-Type": "application/json",
      'Authorization': `Bearer ${localStorage.getItem("token")}`
     }
  });

  const fetchJobs = async (filterQuery) => {
    try{

      const response = await fetch(`http://localhost:4000/jobs/get-jobs?${filterQuery}`, {
      method: 'GET', 
      headers: { 
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
      });

      const responseData = await response.json();
    } catch(err){

    } finally{
      
    }
  };


  useEffect(()=> {
    let query="";
    if(location){
      query += "location="+location;
    }

    if(company_id){
      query += "company_id="+company_id;
    }
    fetchJobs(query);
  }, [location, company_id]);

  
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
  

  if(loadingJobs || loadingCompany) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
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
            {companies.map(({name, _id}) => {
                return (
                  <SelectItem key={_id} value={_id}>
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
          return <JobCard key={job._id} job={job} />
        })) : <div>No Jobs found!</div>}
      </div>
    </div>
  )
}

export default JobListingPage
