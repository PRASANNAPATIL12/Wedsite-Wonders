'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { suggestLayout, type SuggestLayoutInput, type SuggestLayoutOutput } from '@/ai/flows/suggest-layout';
import { Loader2, WandSparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  style: z.string().min(3, 'Style is required and should be at least 3 characters.'),
  colors: z.string().min(3, 'Colors are required and should be at least 3 characters.'),
  numberOfGuests: z.coerce.number().min(1, 'Number of guests must be at least 1.'),
  specialRequests: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function AiLayoutToolSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<SuggestLayoutOutput | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setSuggestion(null);
    try {
      const result = await suggestLayout(data as SuggestLayoutInput);
      setSuggestion(result);
      toast({
        title: "Layout Suggestion Ready!",
        description: "Our AI has crafted a layout for you.",
      });
    } catch (error) {
      console.error('Error fetching layout suggestion:', error);
      toast({
        title: "Error",
        description: "Failed to get layout suggestion. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-tool" className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12 md:mb-16">
          <WandSparkles className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-neutral-900">
            AI-Powered Layout Assistant
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Let our AI help you design the perfect wedding website layout based on your preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Tell Us About Your Wedding</CardTitle>
              <CardDescription>Provide a few details, and our AI will suggest a layout.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="style" className="font-medium">Overall Style</Label>
                  <Input
                    id="style"
                    placeholder="e.g., Classic, Modern, Rustic"
                    {...register('style')}
                    className={errors.style ? 'border-destructive' : ''}
                  />
                  {errors.style && <p className="text-sm text-destructive mt-1">{errors.style.message}</p>}
                </div>

                <div>
                  <Label htmlFor="colors" className="font-medium">Color Scheme</Label>
                  <Input
                    id="colors"
                    placeholder="e.g., Pastels, Bold, Neutral"
                    {...register('colors')}
                    className={errors.colors ? 'border-destructive' : ''}
                  />
                  {errors.colors && <p className="text-sm text-destructive mt-1">{errors.colors.message}</p>}
                </div>

                <div>
                  <Label htmlFor="numberOfGuests" className="font-medium">Approx. Number of Guests</Label>
                  <Input
                    id="numberOfGuests"
                    type="number"
                    placeholder="e.g., 150"
                    {...register('numberOfGuests')}
                    className={errors.numberOfGuests ? 'border-destructive' : ''}
                  />
                  {errors.numberOfGuests && <p className="text-sm text-destructive mt-1">{errors.numberOfGuests.message}</p>}
                </div>

                <div>
                  <Label htmlFor="specialRequests" className="font-medium">Special Requests (Optional)</Label>
                  <Textarea
                    id="specialRequests"
                    placeholder="e.g., Include a section for travel information, highlight our engagement story"
                    {...register('specialRequests')}
                    rows={3}
                  />
                </div>
                <div className="flex space-x-2">
                   <Button type="submit" disabled={isLoading} className="w-full md:w-auto bg-primary hover:bg-pink-400 text-primary-foreground text-lg px-8 py-3">
                    {isLoading ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                      <WandSparkles className="mr-2 h-5 w-5" />
                    )}
                    Get Suggestion
                  </Button>
                  <Button type="button" variant="outline" onClick={() => { reset(); setSuggestion(null); }} disabled={isLoading} className="w-full md:w-auto text-lg px-8 py-3">
                    Reset
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="shadow-xl sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">AI Suggestion</CardTitle>
              <CardDescription>Here's what our AI came up with based on your input.</CardDescription>
            </CardHeader>
            <CardContent className="min-h-[200px]">
              {isLoading && (
                <div className="flex flex-col items-center justify-center h-full">
                  <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                  <p className="text-muted-foreground">Generating your layout...</p>
                </div>
              )}
              {!isLoading && !suggestion && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <WandSparkles className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">Your personalized layout suggestion will appear here.</p>
                </div>
              )}
              {suggestion && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg text-primary mb-2">Suggested Layout:</h3>
                    <p className="text-foreground/90 whitespace-pre-line">{suggestion.layoutSuggestion}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-accent mb-2">Suggested Template Style:</h3>
                    <p className="text-foreground/90 capitalize font-medium text-xl">{suggestion.templateSuggestion}</p>
                  </div>
                </div>
              )}
            </CardContent>
             {suggestion && (
                <CardFooter>
                    <Button variant="link" className="text-primary p-0">Explore {suggestion.templateSuggestion} templates &rarr;</Button>
                </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
