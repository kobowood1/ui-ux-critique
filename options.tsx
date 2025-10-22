import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom/client';

declare const chrome: any;

const Options: React.FC = () => {
    const [apiKey, setApiKey] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        // Load the saved API key when the component mounts
        chrome.storage.local.get(['apiKey'], (result: { apiKey?: string }) => {
            if (result.apiKey) {
                setApiKey(result.apiKey);
            }
        });
    }, []);

    const handleSave = useCallback(() => {
        chrome.storage.local.set({ apiKey: apiKey }, () => {
            setStatus('API Key saved successfully!');
            setTimeout(() => setStatus(''), 2000); // Clear status after 2 seconds
        });
    }, [apiKey]);

    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans flex items-center justify-center">
            <div className="max-w-md w-full p-8 bg-slate-800 rounded-lg shadow-2xl">
                <h1 className="text-3xl font-bold text-slate-100 mb-2">Settings</h1>
                <p className="text-slate-400 mb-6">Configure your AI UI/UX Critique extension.</p>
                
                <div className="space-y-4">
                    <div>
                        <label htmlFor="apiKey" className="block text-sm font-medium text-slate-300 mb-1">
                            Gemini API Key
                        </label>
                        <input
                            type="password"
                            id="apiKey"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="Enter your Gemini API Key"
                            className="w-full bg-slate-900 text-slate-300 px-3 py-2 rounded-md border border-slate-600 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                        />
                        <p className="text-xs text-slate-500 mt-2">
                            You can get your API key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">Google AI Studio</a>. The key is stored locally and securely in your browser.
                        </p>
                    </div>

                    <button
                        onClick={handleSave}
                        className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                        Save Key
                    </button>

                    {status && <p className="text-sm text-green-400 text-center">{status}</p>}
                </div>
            </div>
        </div>
    );
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>
);
