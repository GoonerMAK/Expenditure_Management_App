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


interface CategoryFormValues {
  category_name: string;
}

interface Category {
  id: string;
  category_name: string;
  created_at: string;
  updated_at: string;
}

const AddCategoryForm = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const form = useForm<CategoryFormValues>({
    defaultValues: {
      category_name: '',
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>('http://localhost:4000/api/categories', { withCredentials: true });
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      const response = await axios.post('http://localhost:4000/api/categories', data, { withCredentials: true });
      console.log('Server response:', response.data);
      setCategories(prevCategories => [...prevCategories, response.data]); 

      toast.success('Successfully created Category');
      setTimeout(() => {
        window.location.reload();
      }, 4000);
    } catch (error: any) {
      console.error('Error response:', error.response);
      toast.error('Error Creating Category');
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
              name="category_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name of the category.
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
            <TableHead className="text-center text-xl">A list of your existing Categories</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.category_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AddCategoryForm;
