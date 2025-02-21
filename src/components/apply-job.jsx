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

const schema = z.object({
    
});

const ApplyJobDrawer = ({user, job, applied=false, fetchJob}) => {
  return (
    <div>
      <Drawer open={applied ? false : undefined} onOpenChange={()=> {}}>
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

            <form className="flex flex-col gap-4 p-4 pb-0">
                <Input 
                    type="number"
                    placeholder="Years of Experience"
                    className="flex-1"
                />

                <RadioGroup defaultValue="option-one">
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
                <Input
                    type="file"
                    accept=".pdf, .doc, .docx"
                    className="flex-1 file:text-gray-500"
                />
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
