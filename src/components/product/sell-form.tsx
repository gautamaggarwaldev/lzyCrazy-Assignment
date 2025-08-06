
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
  price: z.coerce.number().min(1, { message: 'Price must be at least $1.' }),
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
  const [isSuggesting, setIsSuggesting] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState<{ categories: string[]; keywords: string[] }>({ categories: [], keywords: [] });

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

  const { title, description } = useWatch({ control: form.control });

  const handleSuggestion = async () => {
    if (!title || !description) {
      toast({
        variant: 'destructive',
        title: 'Title and Description needed',
        description: 'Please fill in the title and description to get AI suggestions.',
      });
      return;
    }
    setIsSuggesting(true);
    setSuggestions({ categories: [], keywords: [] });
    const result = await getAISuggestions({ title, description });
    if (result.success && result.data) {
        setSuggestions({
            categories: result.data.suggestedCategories,
            keywords: result.data.suggestedKeywords,
        });
    } else {
        toast({
            variant: 'destructive',
            title: 'Suggestion Failed',
            description: result.error || 'Could not fetch suggestions.',
        });
    }
    setIsSuggesting(false);
  };
  
  const addKeyword = (keyword: string) => {
    const currentKeywords = form.getValues('keywords');
    const keywordSet = new Set(currentKeywords.split(',').map(k => k.trim()).filter(Boolean));
    keywordSet.add(keyword);
    form.setValue('keywords', Array.from(keywordSet).join(', '), { shouldValidate: true });
  }

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
    setSuggestions({ categories: [], keywords: [] });
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
        <Card className="md:col-span-2">
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
                                <FormLabel>Price ($)</FormLabel>
                                <FormControl><Input type="number" placeholder="e.g., 450" {...field} /></FormControl>
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
                                    <FormControl><Input placeholder="e.g., New York, NY" {...field} /></FormControl>
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
        
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles className="text-primary" /> AI Suggestions
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                        Fill in your title and description, then click the button below to get AI-powered suggestions.
                    </p>
                    <Button onClick={handleSuggestion} disabled={isSuggesting || !title || !description} className="w-full">
                        {isSuggesting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Suggesting...</> : 'Suggest Details'}
                    </Button>

                    {suggestions.keywords.length > 0 && (
                        <div className="mt-6 space-y-4">
                             <div>
                                <h4 className="font-semibold text-sm mb-2">Suggested Keywords:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {suggestions.keywords.map(kw => (
                                        <Button key={kw} size="sm" variant="outline" onClick={() => addKeyword(kw)}>
                                            {kw}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
