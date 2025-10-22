import { GoogleGenAI } from "@google/genai";
import { AnalysisType } from '../types';
import { ANALYSIS_OPTIONS } from '../constants';

declare const chrome: any;

const getApiKey = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(['apiKey'], (result: { apiKey?: string }) => {
        if (result.apiKey) {
          resolve(result.apiKey);
        } else {
          reject(new Error("Gemini API key not found. Please set it in the extension's options page."));
        }
      });
    } else {
       reject(new Error("This does not seem to be a Chrome extension environment. API key cannot be retrieved."));
    }
  });
};

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

  const apiKey = await getApiKey();
  const ai = new GoogleGenAI({ apiKey });

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
        // Prepend a user-friendly message to potentially technical API errors.
        throw new Error(`An error occurred with the Gemini API: ${error.message}`);
    }
    throw new Error("An unknown error occurred while analyzing the code.");
  }
};