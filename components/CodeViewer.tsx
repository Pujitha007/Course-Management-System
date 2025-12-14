import React, { useState } from 'react';
import { FileCode, Copy, Check, ChevronRight } from 'lucide-react';
import { JavaFile } from '../types';

interface CodeViewerProps {
  files: JavaFile[];
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ files }) => {
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (files.length > 0) {
      navigator.clipboard.writeText(files[activeFileIndex].content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!files || files.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center">
        <FileCode size={64} className="mb-4 opacity-20" />
        <h3 className="text-xl font-semibold mb-2">No Java Code Generated Yet</h3>
        <p>Go to the Chat tab and describe your system to generate Spring Boot entities and controllers.</p>
      </div>
    );
  }

  const activeFile = files[activeFileIndex];

  return (
    <div className="h-full flex overflow-hidden bg-slate-50">
      {/* File Explorer */}
      <div className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-100 font-semibold text-sm text-slate-700">
          Project Files
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          {files.map((file, index) => (
            <button
              key={index}
              onClick={() => setActiveFileIndex(index)}
              className={`w-full text-left px-4 py-2 text-sm font-mono flex items-center gap-2 transition-colors ${
                activeFileIndex === index
                  ? 'bg-brand-50 text-brand-600 border-r-2 border-brand-500'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <FileCode size={14} className={activeFileIndex === index ? 'opacity-100' : 'opacity-50'} />
              {file.name}
            </button>
          ))}
        </div>
      </div>

      {/* Code Editor Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-900">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 bg-slate-800">
          <div className="flex items-center gap-2 text-slate-400 text-sm">
             <span>src</span>
             <ChevronRight size={14} />
             <span>main</span>
             <ChevronRight size={14} />
             <span>java</span>
             <ChevronRight size={14} />
             <span className="text-white font-mono">{activeFile.name}</span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md bg-slate-700 hover:bg-slate-600 text-white transition-colors"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        
        <div className="flex-1 overflow-auto p-6">
          <pre className="font-mono text-sm leading-relaxed text-blue-100 whitespace-pre-wrap">
            {activeFile.content}
          </pre>
        </div>
      </div>
    </div>
  );
};