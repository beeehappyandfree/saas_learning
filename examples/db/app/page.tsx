'use client';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormItem,
  FormMessage
} from "@/components/ui/form"
import { Input } from '@/components/ui/input';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required'
  })
});


export default function Home() {


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      const response = await axios.post('api/courses', values)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='container'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                  <Input {...field} placeholder="Course Title" />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          Submit
        </Button>
        </form>
      </Form>

    </div>
  )
}
