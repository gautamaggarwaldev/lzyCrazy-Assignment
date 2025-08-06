
"use client";

import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { getAISuggestions } from '@/app/actions';
import { Sparkles, Loader2 } from 'lucide-react';
import React from 'react';

const formSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters long.' }),
  description: z.string().min(20, { message: 'Description must be at least 20 characters long.' }),
  price: z.coerce.number().min(1, { message: 'Price must be at least 1.' }),
  keywords: z.string().min(3, { message: 'At least one keyword is required.' }),
  location: z.string().min(2, { message: 'Location is required.' }),
  contact: z.string().email({ message: 'A valid contact email is required.' }),
});

type SellFormValues = z.infer<typeof formSchema>;

interface SellFormProps {
    category: string;
    subcategory?: string;
}

export function SellForm({ category, subcategory }: SellFormProps) {
  const { toast } = useToast();
  
  const form = useForm<SellFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      keywords: '',
      location: '',
      contact: '',
    },
  });

  function onSubmit(values: SellFormValues) {
    const fullValues = {
        ...values,
        category,
        subcategory,
    }
    console.log(fullValues);
    toast({
      title: 'Listing Submitted!',
      description: "Your item is now live (demo). Check the console for data.",
    });
    form.reset();
  }

  return (
    <Card>
        <CardHeader>
            <CardTitle>Enter item details</CardTitle>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField control={form.control} name="title" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl><Input placeholder="e.g., Vintage Leather Sofa" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="description" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl><Textarea placeholder="Describe your item in detail..." {...field} rows={6} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    
                    <FormField control={form.control} name="price" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price (INR)</FormLabel>
                            <FormControl><Input type="number" placeholder="e.g., 35000" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    
                    <FormField control={form.control} name="keywords" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Keywords</FormLabel>
                            <FormControl><Input placeholder="e.g., sofa, leather, vintage" {...field} /></FormControl>
                            <FormDescription>Separate keywords with a comma.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                       <FormField control={form.control} name="location" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl><Input placeholder="e.g., Mumbai, MH" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="contact" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contact Email</FormLabel>
                                <FormControl><Input type="email" placeholder="e.g., you@example.com" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    
                    <Button type="submit" className="w-full sm:w-auto" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? "Submitting..." : "Submit Listing"}
                    </Button>
                </form>
            </Form>
        </CardContent>
    </Card>
  );
}
