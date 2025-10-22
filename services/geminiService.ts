import { GoogleGenAI } from "@google/genai";
import { AnalysisType } from '../types';
import { ANALYSIS_OPTIONS } from '../constants';

const getPrompt = (analysisType: AnalysisType, code: string): string => {
  const option = ANALYSIS_OPTIONS.find(opt => opt.id === analysisType);
  if (!option) {
    throw new Error('Invalid analysis type');
  }

  return `${option.prompt}
  
Here is the code to analyze. It might contain HTML, CSS in a style tag, or both:
\`\`\`html
${code}
\`\`\`
  `;
}

export const analyzeCode = async (analysisType: AnalysisType, code: string): Promise<string> => {
  if (!code.trim()) {
    throw new Error("Please enter some HTML and/or CSS code to analyze.");
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const prompt = getPrompt(analysisType, code);
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`An error occurred while analyzing the code: ${error.message}`);
    }
    throw new Error("An unknown error occurred while analyzing the code.");
  }
};
