import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Select, SelectTrigger, SelectContent, SelectGroup, SelectValue, SelectItem } from '@/components/ui/select';
import { State } from "country-state-city";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import AddCompanyDrawer from "@/components/add-company-drawer";
import { Button } from "@/components/ui/button";
import { BarLoader } from "react-spinners";
import { useAuth } from "@/components/auth-provider";
import { getCompanies } from "@/api/companies.api";
import { postJob } from "@/api/jobs.api";


const schema = z.object({
  title: z.string().min(1, {message: "Title is required"}),
  description: z.string().min(1, {message: "Description is required"}),
  location: z.string().min(1, {message: "Select a location"}),
  company_id: z.string().min(1, {message: "Select or Add a new Company"}),
  requirements: z.string().min(1, {message: "requirements are required"}),
})
const PostJobPage = () => {
  const {user, token} = useAuth();
  const [creatJobLoading, setCreateJobLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [loadingCompany, setLoadingCompany] = useState(false);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    control,
    formState: {errors},
    reset
  } = useForm({
    resolver: zodResolver(schema)
  });

  // const {data: companies, loading: loadingCompany} = useFetch(getCompanies);

  const fetchCompanies = async () => {
    setLoadingCompany(true);
    try{
      const response = await getCompanies();
      setCompanies(response);
    } catch(err){
      console.error("Error fetching companies:", error);
    }finally{
      setLoadingCompany(false)
    }
  };

  useEffect(() => {
    fetchCompanies();
  },[])

  if(user?.role !== 'recruiter'){
    return <Navigate to="/jobs"/>
  }

  const onSubmit = async (data) => {
    data.recruiter_id = user.user_id;
    setCreateJobLoading(true);
    console.log(data);
    try{
      await postJob(data);
      navigate("/jobs");
    } catch(err){
      console.log(err)
    } finally{
      setCreateJobLoading(false);
    }    
  }

  if(loadingCompany) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-5xl sm:text-7xl text-center pb-8">
        Post a Job
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 pb-0">
        <Input placeholder="Job Title" {...register("title")} />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        <Textarea placeholder="Job Description" {...register("description")} />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        <div className="flex gap-4 items-center">
        <Controller
          name="location"
          control={control}
          render={({field}) => (
            <Select 
              value={field.value} 
              onValueChange={field.onChange}
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
          )}           
        />
          
          <Controller
            name="company_id"
            control={control}
            render={({field}) => (          
              <Select
                value={field.value} 
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Company">
                    {field.value ? companies.find((com) => com._id === Number(field.value))?.name : 'Company'}
                  </SelectValue>
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
            )} 
          />
          <AddCompanyDrawer fetchCompanies={setCompanies} />
        </div>
        {errors.location && <p className="text-red-500">{errors.location.message}</p>}
        {errors.company_id && <p className="text-red-500">{errors.company_id.message}</p>}
        
        <Controller        
          name="requirements"
          control={control}
          render={({field}) => (
            <MDEditor value={field.value}  onChange={field.onChange} className="bg-gray-950 text-white"/>
          )}
        />        
        {errors.requirements && <p className="text-red-500">{errors.requirements.message}</p>}
        {creatJobLoading && <BarLoader  width={"100%"} color="#36d7b7" />}
        
        <Button type="submit" variant="blue" size="lg" className="mt-2">Submit</Button>
      </form>
    </div>
  )
}

export default PostJobPage