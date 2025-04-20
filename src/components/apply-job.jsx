import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "./ui/input";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { BarLoader } from "react-spinners";

const schema = z.object({
    experience: z  
        .number()
        .min(0, {message: "Experience must be at least 0" })
        .int(),
    skills: z.string().min(1, { message: "Skills are required" }),
    education: z.enum(["Intermediate", "Graduate", "Post Graduate"], {
        message: "Education is required",
    }),
    resume: z
        .any()
        .refine(
            (file)=> 
                file[0] && 
                (file[0].type === "application/pdf" || file[0].type === "application/msword"), 
            {message: "Only PDF or Word documents are allowed"}
        )
});

const ApplyJobDrawer = ({user, job, applied=false, fetchJob}) => {
    const {
        register, 
        handleSubmit, 
        control, 
        formState: {errors}, 
        reset
    } = useForm({
        resolver: zodResolver(schema),
    });

    const loadingApply = false; // TODO: for Job apply loading

    const onSubmit = (data) => {
        const updatedData = {
            ...data,
            job_id: job._id,
            candidate_id: user.user_id,
            name: user?.firstname + " " +user?.lastname,
            status: 'applied',
            resume: data.resume[0]
        };
        const formData = new FormData();
        Object.keys(updatedData).map(item => {
            formData.append(item, updatedData[item]);
        })
        fetch(`http://localhost:4000/applications/apply-job`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: formData,
            }
        ).then((response) => response.json())
         .then((response) =>{
            console.log(response);
            fetchJob();
            reset();
        })
        .catch(err => {
            console.log(err);
        })        
    }

  return (
    <div>
      <Drawer open={applied ? false : undefined}>
        <DrawerTrigger asChild>
            <Button size="lg" variant={job?.isOpen && !applied ? "blue" : "destructive"} disabled={!job?.isOpen || applied}>
                {job?.isOpen ? (applied ? "Applied" : "Apply") : "Hiring Closed"}
            </Button>
        </DrawerTrigger>
        <DrawerContent>
            <DrawerHeader>
                <DrawerTitle>Apply for {job?.title} at {job?.company?.name}</DrawerTitle>
                <DrawerDescription>Please fill the form below.</DrawerDescription>
            </DrawerHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 pb-0">
                <Input 
                    {...register("experience", {
                        valueAsNumber: true,
                      })}
                    type="number"
                    placeholder="Years of Experience"
                    className="flex-1"
                />

                {errors.experience && (<p className="text-red-500">{errors.experience.message}</p>)}

                <Input 
                {...register("skills")}
                    type="text"
                    placeholder="Skills (Comma Separated)"
                    className="flex-1"
                />
                {errors.skills && (<p className="text-red-500">{errors.skills.message}</p>)}
                <Controller
                    name="education"
                    control={control}
                    render={({field}) => (

                        <RadioGroup onValueChange={field.onChange} {...field}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Intermediate" id="intermediate" />
                                <Label htmlFor="intermediate">Intermediate</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Graduate" id="graduate" />
                                <Label htmlFor="graduate">Graduate</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Post Graduate" id="post-graduate" />
                                <Label htmlFor="post-graduate">Post Graduate</Label>
                            </div>
                        </RadioGroup>
                    )}
                />
                {errors.education && (<p className="text-red-500">{errors.education.message}</p>)}

                <Input
                    {...register("resume")}
                    type="file"
                    accept=".pdf, .doc, .docx"
                    className="flex-1 file:text-gray-500"
                />

                {errors.resume && (<p className="text-red-500">{errors.resume.message}</p>)}  
                {/* form submit error apply */}
                {/* {errorsApply?.message && (<p className="text-red-500">{errorsApply?.message}</p>)}   */}
                
                {loadingApply && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
                <Button type="submit" variant="blue" size="lg">Apply</Button>
            </form>

            <DrawerFooter>
            
            <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
            </DrawerClose>
            </DrawerFooter>
        </DrawerContent>
        </Drawer>
    </div>
  )
}

export default ApplyJobDrawer
