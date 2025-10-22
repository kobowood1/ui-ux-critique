import type React from 'react';

export enum AnalysisType {
  Accessibility = 'ACCESSIBILITY',
  UISuggestions = 'UI_SUGGESTIONS',
  ColorPalette = 'COLOR_PALETTE',
}

export interface AnalysisOption {
  id: AnalysisType;
  label: string;
  description: string;
  icon: React.ReactNode;
  prompt: string;
}
