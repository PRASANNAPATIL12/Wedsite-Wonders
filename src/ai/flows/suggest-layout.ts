// src/ai/flows/suggest-layout.ts
'use server';

/**
 * @fileOverview AI flow to suggest a wedding website layout based on user's answers.
 *
 * - suggestLayout - The main function to trigger the layout suggestion flow.
 * - SuggestLayoutInput - Input type for the suggestLayout function.
 * - SuggestLayoutOutput - Output type for the suggestLayout function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestLayoutInputSchema = z.object({
  style: z
    .string()
    .describe('The overall style of the wedding (e.g., classic, modern, rustic).'),
  colors: z
    .string()
    .describe('The color scheme for the wedding (e.g., pastels, bold, neutral).'),
  numberOfGuests: z
    .number()
    .describe('The approximate number of guests attending the wedding.'),
  specialRequests: z
    .string()
    .optional()
    .describe('Any special requests or specific elements to include in the layout.'),
});
export type SuggestLayoutInput = z.infer<typeof SuggestLayoutInputSchema>;

const SuggestLayoutOutputSchema = z.object({
  layoutSuggestion: z
    .string()
    .describe('A suggested layout for the wedding website based on the provided answers.'),
  templateSuggestion: z
    .string()
    .describe(
      'A suggested template name that best fits the description of the requested website, from the list classic, modern, rustic, garden, vintage, beach.'
    ),
});
export type SuggestLayoutOutput = z.infer<typeof SuggestLayoutOutputSchema>;

export async function suggestLayout(input: SuggestLayoutInput): Promise<SuggestLayoutOutput> {
  return suggestLayoutFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestLayoutPrompt',
  input: {schema: SuggestLayoutInputSchema},
  output: {schema: SuggestLayoutOutputSchema},
  prompt: `You are a wedding website layout expert. Based on the user's answers to the following questions, suggest a layout for their wedding website and what template style best fits their request.

Style: {{{style}}}
Colors: {{{colors}}}
Number of Guests: {{{numberOfGuests}}}
Special Requests: {{{specialRequests}}}

Ensure that the templateSuggestion is one of these acceptable values: classic, modern, rustic, garden, vintage, beach.

Layout Suggestion:`,
});

const suggestLayoutFlow = ai.defineFlow(
  {
    name: 'suggestLayoutFlow',
    inputSchema: SuggestLayoutInputSchema,
    outputSchema: SuggestLayoutOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
