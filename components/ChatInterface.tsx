import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { generateSystemArchitecture, chatWithArchitect } from '../services/geminiService';
import { GeneratedArtifacts, Tab } from '../types';

interface ChatInterfaceProps {
  onArtifactsGenerated: (artifacts: GeneratedArtifacts) => void;
  onSwitchTab: (tab: Tab) => void;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onArtifactsGenerated, onSwitchTab }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hello! I'm your CMS Architect. Describe the Course Management System you want to build (e.g., 'A university system with students, professors, and grading'), and I'll generate the Java backend code, MySQL schema, and a dashboard preview for you." }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setLoading(true);
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);

    try {
      // We assume if the user asks to "build" or "generate", they want the artifacts.
      // Simple heuristic for demo purposes.
      const isGenerationRequest = /build|create|generate|make|system|code/i.test(userMsg);

      if (isGenerationRequest) {
        setMessages(prev => [...prev, { role: 'model', text: "Analyzing requirements and Architecting your CMS... This may take a few seconds." }]);
        
        const artifacts = await generateSystemArchitecture(userMsg);
        onArtifactsGenerated(artifacts);
        
        setMessages(prev => [...prev, { 
          role: 'model', 
          text: "I've generated the system architecture for you! Check the Schema, Code, and Preview tabs to see the results." 
        }]);
      } else {
        // Normal chat
        const history = messages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }));
        
        const responseText = await chatWithArchitect(history, userMsg);
        setMessages(prev => [...prev, { role: 'model', text: responseText }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error generating the response. Please check your API key and try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'model' && (
              <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
                <Bot size={18} className="text-brand-600" />
              </div>
            )}
            
            <div className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-brand-600 text-white rounded-br-none' 
                : 'bg-slate-100 text-slate-800 rounded-bl-none'
            }`}>
              {msg.text}
            </div>

            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                <User size={18} className="text-slate-600" />
              </div>
            )}
          </div>
        ))}
        {loading && (
           <div className="flex gap-4 justify-start">
             <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center shrink-0 animate-pulse">
                <Bot size={18} className="text-brand-600" />
             </div>
             <div className="bg-slate-50 text-slate-500 rounded-2xl rounded-bl-none px-5 py-3 text-sm flex items-center gap-2">
                <Loader2 className="animate-spin" size={16} />
                Thinking...
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-100 bg-white">
        <div className="max-w-4xl mx-auto relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe your CMS requirements..."
            className="w-full pl-4 pr-12 py-4 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 focus:outline-none transition-all shadow-sm text-sm"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="absolute right-2 top-2 p-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? <Sparkles className="animate-pulse" size={20} /> : <Send size={20} />}
          </button>
        </div>
        <div className="text-center mt-2">
           <p className="text-xs text-slate-400">Try: "Build a CMS for a coding bootcamp with instructors, students, and project submissions."</p>
        </div>
      </div>
    </div>
  );
};