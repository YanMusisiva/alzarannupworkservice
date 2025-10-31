"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { User } from '@/lib/types';
import { AnnLogo } from './AnnLogo';
import { MapPin } from 'lucide-react';

const FormSchema = z.object({
  businessName: z.string().min(2, 'Business name must be at least 2 characters.'),
  city: z.string().min(2, 'City name must be at least 2 characters.'),
});

interface CitySelectionProps {
  onCitySelect: (user: User) => void;
}

export function CitySelection({ onCitySelect }: CitySelectionProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      businessName: '',
      city: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    onCitySelect({
      businessName: data.businessName,
      city: data.city,
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cover bg-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <AnnLogo className="h-12 w-auto" />
          </div>
          <CardTitle className="font-headline text-3xl">Welcome to the Buzz</CardTitle>
          <CardDescription>Enter your business details to see local announcements.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., The Daily Grind" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your City</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Springfield" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full font-bold">
                <MapPin className="mr-2 h-4 w-4" />
                Start Browsing
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
