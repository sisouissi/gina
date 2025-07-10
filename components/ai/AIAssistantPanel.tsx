import React, { useState, useRef, useEffect } from 'react';
import { useUIState } from '../../contexts/UIStateContext';
import { useAIAssistant } from '../../hooks/useAIAssistant';
import Button from '../ui/Button';
import { Sparkles, Send, XCircle, MessageCircle } from 'lucide-react';
import MarkdownRenderer from '../ui/MarkdownRenderer';

const AIAssistantPanel: React.FC = () => {
  const { isAIPanelOpen, closeAIPanel } = useUIState();
  const { messages, isLoading, error, sendMessage } = useAIAssistant();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };
  
  if (!isAIPanelOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-40 flex items-center justify-center p-4 transition-opacity duration-300"
      onClick={closeAIPanel}
      aria-hidden="true"
    >
        <div 
            className="w-full max-w-2xl max-h-[90vh] bg-slate-50 shadow-2xl rounded-lg z-50 flex flex-col transform transition-all duration-300"
            onClick={e => e.stopPropagation()}
        >
            <header className="flex items-center justify-between p-4 bg-slate-900 text-white rounded-t-lg border-b border-slate-700">
                <div className="flex items-center">
                    <MessageCircle size={24} className="text-violet-400 mr-3" />
                    <div>
                        <h2 className="text-lg font-semibold">Ask the Expert</h2>
                        <p className="text-xs text-slate-400">Your guide to the GINA 2025 document</p>
                    </div>
                </div>
                <Button variant="ghost" onClick={closeAIPanel} size="sm" className="!p-2 text-white hover:bg-slate-700" aria-label="Close panel">
                    <XCircle size={20} />
                </Button>
            </header>

            <div className="flex-grow p-4 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                        {msg.role === 'model' && <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0"><MessageCircle size={20} className="text-white"/></div>}
                        <div className={`p-3 rounded-2xl max-w-lg shadow-md ${msg.role === 'user' ? 'bg-sky-600 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}>
                            <MarkdownRenderer content={msg.parts[0].text} />
                        </div>
                    </div>
                ))}
                {isLoading && messages[messages.length - 1]?.role === 'model' && (
                     <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0"><MessageCircle size={20} className="text-white"/></div>
                        <div className="p-3 rounded-lg bg-white text-slate-700 border border-slate-200">
                            <div className="flex items-center space-x-1">
                               <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                               <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                               <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                )}
                {error && (
                     <div className="p-3 rounded-lg bg-red-100 text-red-700 border border-red-200 text-sm">
                        {error}
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <footer className="p-4 border-t border-slate-200 bg-white rounded-b-lg">
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask a question about the GINA guide..."
                        className="flex-grow px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none text-sm"
                        disabled={isLoading}
                    />
                    <Button type="submit" disabled={isLoading || !inputValue.trim()} size="md" className="!py-2.5">
                        <Send size={18} />
                    </Button>
                </form>
            </footer>
        </div>
    </div>
  );
};

export default AIAssistantPanel;