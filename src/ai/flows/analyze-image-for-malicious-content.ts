'use server';

/**
 * @fileOverview Analyzes an image for malicious content using AI.
 *
 * - analyzeImageForMaliciousContent - A function that handles the image analysis process.
 * - AnalyzeImageForMaliciousContentInput - The input type for the analyzeImageForMaliciousContent function.
 * - AnalyzeImageForMaliciousContentOutput - The return type for the analyzeImageForMaliciousContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeImageForMaliciousContentInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo to analyze for malicious content, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeImageForMaliciousContentInput = z.infer<typeof AnalyzeImageForMaliciousContentInputSchema>;

const AnalyzeImageForMaliciousContentOutputSchema = z.object({
  isMalicious: z
    .boolean()
    .describe('Whether or not the image is determined to be malicious.'),
  reason: z
    .string()
    .describe('The reason the image was determined to be malicious, if applicable.'),
});
export type AnalyzeImageForMaliciousContentOutput = z.infer<typeof AnalyzeImageForMaliciousContentOutputSchema>;

export async function analyzeImageForMaliciousContent(
  input: AnalyzeImageForMaliciousContentInput
): Promise<AnalyzeImageForMaliciousContentOutput> {
  return analyzeImageForMaliciousContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeImageForMaliciousContentPrompt',
  input: {schema: AnalyzeImageForMaliciousContentInputSchema},
  output: {schema: AnalyzeImageForMaliciousContentOutputSchema},
  prompt: `You are an AI expert in image analysis and security.

You will analyze the image and determine if it contains any malicious content.  Malicious content can include:

*   Explicit content
*   Violent content
*   Hateful symbols or imagery
*   Illegal activity

Return isMalicious as true if the image contains any of these things.  Otherwise, return isMalicious as false.

If isMalicious is true, explain the reason in the reason field.

Image: {{media url=photoDataUri}}`,
});

const analyzeImageForMaliciousContentFlow = ai.defineFlow(
  {
    name: 'analyzeImageForMaliciousContentFlow',
    inputSchema: AnalyzeImageForMaliciousContentInputSchema,
    outputSchema: AnalyzeImageForMaliciousContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
