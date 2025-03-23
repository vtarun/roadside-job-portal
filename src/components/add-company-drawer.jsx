/* eslint-disable react/prop-types */
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer";
 
  import { z } from "zod";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { useForm } from "react-hook-form";
  // import { BarLoader } from "react-spinners";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useAuth } from "./auth-provider";
import { useState } from "react";
import { createCompany } from "@/api/companies.api";
//   import { useEffect } from "react";
  
  const schema = z.object({
    name: z.string().min(1, { message: "Company name is required" }),
    logo: z
      .any()
      .refine(
        (file) =>
          file[0] &&
          (file[0].type === "image/png" || file[0].type === "image/jpeg"),
        {
          message: "Only Images are allowed",
        }
      ),
  });
  
  const AddCompanyDrawer = ({ fetchCompanies }) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(schema),
    });

    const [open, setOpen] = useState(false);
  
    const onSubmit = async (data) => {

      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('logo', data.logo[0]);
      try{
        const response = await createCompany(formData);
        fetchCompanies(response);
        setOpen(false);
      }catch(err){
        console.error("Error creating company:", err);
      }
      // fetch('http://localhost:4000/companies/create', {
      //   method: 'POST', 
      //   headers: { 'Authorization': `Bearer ${token}`},
      //   body: formData
      // })
      // .then(response =>  response.json())
      // .then((response) => {
      //   fetchCompanies(response);
      //   setOpen(false);
      // })
      // .catch((err) => {
      //   console.error("Error updating role:", err);
      // });

    };
 
  
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button type="button" size="sm" variant="secondary">
            Add Company
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Add a New Company</DrawerTitle>
          </DrawerHeader>
          <form className="flex gap-2 p-4 pb-0">
            {/* Company Name */}
            <Input placeholder="Company name" {...register("name")} />
  
            {/* Company Logo */}
            <Input
              type="file"
              accept="image/*"
              className=" file:text-gray-500"
              {...register("logo")}
            />
  
            {/* Add Button */}
            <Button
              type="button"
              onClick={handleSubmit(onSubmit)}
              variant="destructive"
              className="w-40"
            >
              Add
            </Button>
          </form>
          <DrawerFooter>
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            {errors.logo && <p className="text-red-500">{errors.logo.message}</p>}
            {/* {errorAddCompany?.message && (
              <p className="text-red-500">{errorAddCompany?.message}</p>
            )} */}
            {/* {loadingAddCompany && <BarLoader width={"100%"} color="#36d7b7" />} */}
            <DrawerClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  };
  
  export default AddCompanyDrawer;