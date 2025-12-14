import React from 'react';
import { Database, Copy, Check } from 'lucide-react';

interface SchemaViewerProps {
  schema: string;
}

export const SchemaViewer: React.FC<SchemaViewerProps> = ({ schema }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(schema);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!schema) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center">
        <Database size={64} className="mb-4 opacity-20" />
        <h3 className="text-xl font-semibold mb-2">No Schema Generated Yet</h3>
        <p>Go to the Chat tab and describe your system to generate a MySQL schema.</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-slate-900 text-slate-300">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 bg-slate-800">
        <div className="flex items-center gap-2">
          <Database className="text-brand-500" size={20} />
          <span className="font-mono text-sm font-semibold text-white">schema.sql</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md bg-slate-700 hover:bg-slate-600 text-white transition-colors"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy SQL'}
        </button>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <pre className="font-mono text-sm leading-relaxed text-blue-100">
          {schema}
        </pre>
      </div>
    </div>
  );
};