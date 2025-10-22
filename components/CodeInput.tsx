import React from 'react';

interface CodeInputProps {
  value: string;
  onChange: (value: string) => void;
  onAnalyzePage: () => void;
  isLoading: boolean;
}

const CodeInput: React.FC<CodeInputProps> = ({ value, onChange, onAnalyzePage, isLoading }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-2">
        <label htmlFor="code-input" className="text-sm font-medium text-slate-300">
          HTML & CSS Code
        </label>
        <button 
          onClick={onAnalyzePage}
          disabled={isLoading}
          className="text-xs font-semibold text-sky-400 hover:text-sky-300 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
          </svg>
          Get code from current page
        </button>
      </div>
      <textarea
        id="code-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your HTML and CSS here, or get it from the current page."
        className="flex-grow w-full bg-slate-950 text-slate-300 font-mono text-sm p-4 rounded-lg border border-slate-700 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors resize-none"
        spellCheck="false"
      />
    </div>
  );
};

export default CodeInput;
