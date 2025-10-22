import React, { useState, useCallback } from 'react';
import { AnalysisType } from './types';
import { ANALYSIS_OPTIONS, PLACEHOLDER_CODE } from './constants';
import { analyzeCode } from './services/geminiService';
import CodeInput from './components/CodeInput';
import ResultDisplay from './components/ResultDisplay';

// FIX: Add type declaration for the `chrome` object to resolve TypeScript errors.
declare const chrome: any;

const App: React.FC = () => {
  const [htmlCode, setHtmlCode] = useState<string>(PLACEHOLDER_CODE);
  const [analysisType, setAnalysisType] = useState<AnalysisType>(AnalysisType.Accessibility);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyzeCurrentPage = useCallback(async () => {
    if (typeof chrome === 'undefined' || !chrome.tabs) {
      setError("This feature is only available in the Chrome extension.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab && tab.id) {
        // In Chrome extensions, you must use chrome.tabs.sendMessage with a callback or promise.
        // Awaiting the result is the modern approach.
        const response = await chrome.tabs.sendMessage(tab.id, { action: "getPageContent" });
        if (response) {
          const fullCode = `<!-- Content from ${tab.url} -->\n${response.html}\n\n<style>\n${response.css}\n</style>`;
          setHtmlCode(fullCode);
        } else {
           setError("Could not get page content. The content script might not be running on this page (e.g., internal Chrome pages).");
        }
      } else {
        setError("Could not find active tab.");
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(`Error fetching page content: ${e.message}. Try reloading the page and the extension.`);
      } else {
        setError("An unknown error occurred while fetching page content.");
      }
    } finally {
        setIsLoading(false);
    }
  }, []);

  const handleAnalyze = useCallback(async () => {
    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await analyzeCode(analysisType, htmlCode);
      setResult(response);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unknown error occurred.');
      }
    }

    setIsLoading(false);
  }, [analysisType, htmlCode]);

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-screen-2xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-100">
            AI UI/UX <span className="text-sky-400">Critique</span>
          </h1>
          <p className="mt-2 text-lg text-slate-400">
            Get instant design and accessibility feedback powered by Gemini.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-150px)] min-h-[600px]">
          {/* Left Panel: Input */}
          <div className="flex flex-col gap-6">
            <div className="flex-grow flex flex-col min-h-0">
              <CodeInput 
                value={htmlCode} 
                onChange={setHtmlCode} 
                onAnalyzePage={handleAnalyzeCurrentPage}
                isLoading={isLoading} 
              />
            </div>

            <div className="flex-shrink-0">
              <h2 className="text-sm font-medium text-slate-300 mb-2">Analysis Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {ANALYSIS_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setAnalysisType(option.id)}
                    className={`p-4 rounded-lg text-left transition-all duration-200 border-2 ${
                      analysisType === option.id
                        ? 'bg-sky-500/10 border-sky-500 shadow-lg shadow-sky-500/10'
                        : 'bg-slate-800 border-slate-700 hover:bg-slate-700/50 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                        <div className={`flex-shrink-0 ${analysisType === option.id ? 'text-sky-400' : 'text-slate-400'}`}>{option.icon}</div>
                        <div>
                            <p className="font-semibold text-slate-100">{option.label}</p>
                            <p className="text-xs text-slate-400">{option.description}</p>
                        </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="w-full bg-sky-600 hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center shadow-lg shadow-sky-600/20"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </>
              ) : (
                'Analyze Code'
              )}
            </button>
          </div>

          {/* Right Panel: Output */}
          <div className="min-h-0">
            <ResultDisplay result={result} isLoading={isLoading} error={error} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;