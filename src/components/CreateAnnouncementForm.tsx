"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUser } from '@/hooks/useUser';
import { addAnnouncement } from '@/lib/data';
import { analyzeImageForMaliciousContent, AnalyzeImageForMaliciousContentOutput } from '@/ai/flows/analyze-image-for-malicious-content';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, ShieldAlert, ShieldCheck, XCircle } from 'lucide-react';
import type { AnnouncementCategory } from '@/lib/types';

const FormSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  content: z.string().min(10, 'Content must be at least 10 characters.'),
  link: z.string().url('Please enter a valid URL.').optional().or(z.literal('')),
  category: z.enum(['Job', 'Product', 'Event'], { required_error: 'Please select a category.' }),
});

export function CreateAnnouncementForm() {
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeImageForMaliciousContentOutput | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      content: '',
      link: '',
    },
  });

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImagePreview(null);
    setAnalysisResult(null);
    setIsAnalyzing(true);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const dataUri = reader.result as string;
      setImagePreview(dataUri);

      try {
        const result = await analyzeImageForMaliciousContent({ photoDataUri: dataUri });
        setAnalysisResult(result);
        if (result.isMalicious) {
          toast({
            variant: "destructive",
            title: "Image Moderation Failed",
            description: result.reason,
          });
        }
      } catch (error) {
        console.error("Image analysis failed:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not analyze the image. Please try another one.",
        });
        setImagePreview(null);
      } finally {
        setIsAnalyzing(false);
      }
    };
  };

  const removeImage = () => {
    setImagePreview(null);
    setAnalysisResult(null);
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!user) {
      toast({ variant: "destructive", title: "You must be logged in." });
      return;
    }
    if (analysisResult?.isMalicious) {
      toast({ variant: "destructive", title: "Cannot submit with a malicious image." });
      return;
    }

    setIsSubmitting(true);
    
    try {
      addAnnouncement({
        ...data,
        businessName: user.businessName,
        city: user.city,
        category: data.category as AnnouncementCategory,
        imageUrl: imagePreview || undefined,
      });

      toast({
        title: "Success!",
        description: "Your announcement has been posted.",
      });
      router.push('/');
    } catch (error) {
      console.error("Failed to submit announcement:", error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "Something went wrong. Please try again.",
      });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Create a New Announcement</CardTitle>
        <CardDescription>Share your latest news with the local community.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl><Input placeholder="e.g., Grand Opening!" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl><Textarea placeholder="Tell everyone what's happening..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
             <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                 <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Job">Job Opening</SelectItem>
                            <SelectItem value="Product">New Product</SelectItem>
                            <SelectItem value="Event">Event</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website Link (Optional)</FormLabel>
                        <FormControl><Input placeholder="https://example.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
             </div>
             
             <FormItem>
                <FormLabel>Image (Optional)</FormLabel>
                <FormControl>
                    <Input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} className="file:text-primary file:font-semibold"/>
                </FormControl>
                <FormDescription>An image for your announcement. It will be scanned for malicious content.</FormDescription>
             </FormItem>
             
             {isAnalyzing && (
                <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /><span>Analyzing image...</span></div>
             )}

             {analysisResult && imagePreview && (
                analysisResult.isMalicious ? (
                    <Alert variant="destructive">
                        <ShieldAlert className="h-4 w-4" />
                        <AlertTitle>Image Blocked</AlertTitle>
                        <AlertDescription>{analysisResult.reason}</AlertDescription>
                    </Alert>
                ) : (
                    <Alert variant="default" className="border-green-500 bg-green-50 text-green-800 dark:border-green-700 dark:bg-green-950 dark:text-green-300">
                        <ShieldCheck className="h-4 w-4 text-green-500" />
                        <AlertTitle>Image Approved</AlertTitle>
                        <AlertDescription>This image looks safe to post.</AlertDescription>
                    </Alert>
                )
             )}

             {imagePreview && (
                <div className="relative w-full h-64 overflow-hidden rounded-md border">
                    <Image src={imagePreview} alt="Image preview" fill className="object-cover" />
                    <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 h-8 w-8 rounded-full" onClick={removeImage}>
                        <XCircle className="h-5 w-5" />
                        <span className="sr-only">Remove image</span>
                    </Button>
                </div>
             )}

            <Button type="submit" disabled={isSubmitting || isAnalyzing || analysisResult?.isMalicious} className="w-full">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Post Announcement
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
