'use server';

/**
 * @fileOverview Provides suggestions for listing details like categories and keywords based on the listing title and description.
 *
 * - suggestListingDetails - A function that suggests relevant categories and keywords for a product listing.
 * - SuggestListingDetailsInput - The input type for the suggestListingDetails function.
 * - SuggestListingDetailsOutput - The return type for the suggestListingDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestListingDetailsInputSchema = z.object({
  title: z.string().describe('The title of the product listing.'),
  description: z.string().describe('The description of the product listing.'),
});
export type SuggestListingDetailsInput = z.infer<typeof SuggestListingDetailsInputSchema>;

const SuggestListingDetailsOutputSchema = z.object({
  suggestedCategories: z.array(z.string()).describe('An array of suggested categories for the listing.'),
  suggestedKeywords: z.array(z.string()).describe('An array of suggested keywords for the listing.'),
});
export type SuggestListingDetailsOutput = z.infer<typeof SuggestListingDetailsOutputSchema>;

export async function suggestListingDetails(input: SuggestListingDetailsInput): Promise<SuggestListingDetailsOutput> {
  return suggestListingDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestListingDetailsPrompt',
  input: {schema: SuggestListingDetailsInputSchema},
  output: {schema: SuggestListingDetailsOutputSchema},
  prompt: `You are an expert at suggesting categories and keywords for product listings.

  Given the title and description of a product listing, suggest relevant categories and keywords to improve its discoverability.
  Return the categories and keywords as arrays of strings.

  Title: {{{title}}}
  Description: {{{description}}}`,
});

const suggestListingDetailsFlow = ai.defineFlow(
  {
    name: 'suggestListingDetailsFlow',
    inputSchema: SuggestListingDetailsInputSchema,
    outputSchema: SuggestListingDetailsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
