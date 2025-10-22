import React from 'react';

interface ResultDisplayProps {
  result: string | null;
  isLoading: boolean;
  error: string | null;
}

const Loader: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full text-center">
    <svg className="animate-spin h-10 w-10 text-sky-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <p className="text-slate-400 font-medium">Analyzing your code...</p>
    <p className="text-slate-500 text-sm mt-1">This may take a moment.</p>
  </div>
);

const InitialState: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full text-center p-8">
    <div className="bg-sky-500/10 p-4 rounded-full mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c.252 0 .487.13.626.351l4.49 6.442a2.25 2.25 0 010 2.704l-4.49 6.442a2.25 2.25 0 01-1.252.603H5.25c-.933 0-1.68-.746-1.68-1.666V4.77c0-.92.747-1.666 1.68-1.666h4.5z" />
        </svg>
    </div>
    <h3 className="text-xl font-bold text-slate-200">AI-Powered UI/UX Critique</h3>
    <p className="text-slate-400 mt-2 max-w-md">
      Use the panel on the left to get code from the current page or paste your own snippet. Choose an analysis type and let Gemini provide expert feedback.
    </p>
  </div>
);


const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, isLoading, error }) => {
  return (
    <div className="bg-slate-950/50 border border-slate-800 rounded-lg h-full overflow-hidden flex flex-col">
       <div className="bg-slate-800/50 px-4 py-2 border-b border-slate-800">
        <h2 className="text-sm font-medium text-slate-300">Analysis Result</h2>
      </div>
      <div className="flex-grow p-1 overflow-y-auto">
        <div className="p-4 h-full">
            {isLoading ? (
            <Loader />
            ) : error ? (
            <div className="text-red-400 whitespace-pre-wrap">{error}</div>
            ) : result ? (
            <pre className="text-slate-300 text-sm whitespace-pre-wrap font-sans">
                {result}
            </pre>
            ) : (
              <InitialState />
            )}
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
