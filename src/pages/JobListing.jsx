import { BarLoader } from 'react-spinners';

import JobCard from '@/components/job-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectValue, SelectItem } from '@/components/ui/select';
import { State } from 'country-state-city';
import useJobListing from '@/hooks/useJobListing';

const JobListingPage = () => {

  const { jobs, companies, filters, setFilters, loading, error, clearFilters } = useJobListing();

  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const searchQuery = fd.get('search-query');
    setFilters((prev) => ({ ...prev, search: searchQuery }));
  }
  
  if(loading) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  if (error) {
    return <div className="text-red-500 text-center">Failed to load data. Please try again later.</div>;
  }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>

      <form onSubmit={handleSubmit} className="h-14 flex w-full gap-2 items-center mb-3">
        <Input 
          type="text" 
          value={filters.search}
          placeholder="Search Jobs by Title.."
          name="search-query"
          className="h-full flex-1 px-4 text-md"
          onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
        />
        <Button type="submit" className="h-full sm:w-28" variant="blue">
          Search
        </Button>
      </form>

      <div className="flex flex-col sm:flex-row gap-2">
        <Select 
          value={filters.location} 
          onValueChange={(value) => setFilters((prev) => ({ ...prev, location: value }))}
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
          value={filters.company_id} 
          onValueChange={(value) => setFilters((prev) => ({ ...prev, company_id: value }))}
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
        <Button variant='destructive' className="sm:w-1/2" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>

      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs?.length ? (jobs?.map(job => {
          return <JobCard key={job._id} job={job} />
        })) : <div>No Jobs found!</div>}
      </div>
    </div>
  )
}

export default JobListingPage
