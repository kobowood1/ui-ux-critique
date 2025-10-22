
import React from 'react';
import { AnalysisType, AnalysisOption } from './types';

const AccessibilityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const SuggestionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);

const PaletteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
);

export const ANALYSIS_OPTIONS: AnalysisOption[] = [
  {
    id: AnalysisType.Accessibility,
    label: 'Accessibility',
    description: 'Scan for WCAG compliance issues.',
    icon: <AccessibilityIcon />,
    prompt: 'Analyze the following HTML and CSS code for accessibility issues according to WCAG 2.1 AA standards. List any issues found, explain why they are a problem, and suggest specific code improvements. Format the output as Markdown with clear headings, lists, and code blocks. Provide code examples for fixes. If no issues are found, state that the code looks good from an accessibility perspective.',
  },
  {
    id: AnalysisType.UISuggestions,
    label: 'UI/UX Suggestions',
    description: 'Get recommendations for improvements.',
    icon: <SuggestionIcon />,
    prompt: 'Act as a senior UI/UX designer. Critique the following HTML and CSS code. Provide actionable suggestions for improving layout, spacing, typography, and overall user experience. Be specific and provide examples where possible. Format the output as Markdown with clear headings, lists, and code blocks.',
  },
  {
    id: AnalysisType.ColorPalette,
    label: 'Color Palettes',
    description: 'Generate new color scheme ideas.',
    icon: <PaletteIcon />,
    prompt: 'Act as a professional color theorist. Generate 3 distinct and aesthetically pleasing alternative color palettes based on the provided HTML and CSS code. For each palette, provide hex codes for primary, secondary, accent, text, and background colors. Also, give each palette a name and a brief description of the mood or theme it conveys. Format the output as Markdown with clear headings and lists.',
  },
];

export const PLACEHOLDER_CODE = `<!-- A simple card component to analyze -->
<div class="card">
  <img src="https://picsum.photos/300/200" alt="">
  <h2>Card Title</h2>
  <p>This is some descriptive text for the card. It provides more details about the content.</p>
  <button>Learn More</button>
</div>

<style>
.card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  padding: 16px;
  max-width: 300px;
  font-family: sans-serif;
}
.card img {
  width: 100%;
  border-radius: 4px;
}
.card h2 {
  font-size: 1.25rem;
  margin-top: 12px;
  color: #333;
}
.card p {
  color: #666;
  margin-top: 8px;
}
.card button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  margin-top: 16px;
  cursor: pointer;
}
</style>
`;
