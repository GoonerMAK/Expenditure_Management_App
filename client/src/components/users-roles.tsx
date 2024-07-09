import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';

import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "./ui/collapsible"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Input } from "../components/ui/input";
import { toast } from "sonner";
import { Toaster } from './ui/sonner';

interface Role{
    id: string;
    role_name: string;
}

const UserRoles = () => {
    const [roles, setRoles] = useState<Role[]>([]);

  const form = useForm<Role>({
    defaultValues: {
        role_name: '',
    },
    mode: 'onSubmit',
  });

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get<Role[]>('http://localhost:4000/api/roles', { withCredentials: true });
        setRoles(response.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchRoles();
  }, []);


  const onSubmit = async (data: Role) => {
    try {
      const response = await axios.post('http://localhost:4000/api/roles', data, { withCredentials: true });
      console.log('Server response:', response.data);
      setRoles(prevRoles => [...prevRoles, response.data]); 

      toast.success('Successfully created Role');
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error: any) {
      toast.error('Error Creating Role');
      console.error('Error response:', error.response.data.message);
    }
  };

  return (
    <div className="flex space-x-6 p-12 ml-10">
      <div className="w-1/3">
      <Toaster/>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex-col space-y-6">
            <FormField
              control={form.control}
              name="role_name"
              rules={{ required: 'Role name is required', minLength: { value: 2, message: 'Role name must be at least two character long' } }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter role name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name of the role.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>

              
      <Table className="ml-60 w-1/2">
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center text-xl">A list of your existing Roles</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id}>
                    <Collapsible>
                      <CollapsibleTrigger><TableCell>{role.role_name}</TableCell></CollapsibleTrigger>
                      <CollapsibleContent>
                        <Table>
                            <TableBody>
                                <TableRow className='flex flex-col'>
                                  <TableHead className="text-center text-s">List of users under this role</TableHead>
                                  <TableCell className="py-1">MAK</TableCell>
                                  <TableCell className="py-1">MAK 2</TableCell>
                                  <TableCell className="py-1">MAK 3</TableCell>
                                </TableRow>
                            </TableBody>
                            <br></br>
                        </Table>
                      </CollapsibleContent>
                    </Collapsible>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserRoles;
