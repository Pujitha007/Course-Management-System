import React from 'react';
import { Tab } from '../types';
import { MessageSquare, Database, FileCode, LayoutDashboard, GraduationCap } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const navItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'chat', label: 'Architect Chat', icon: <MessageSquare size={20} /> },
    { id: 'schema', label: 'MySQL Schema', icon: <Database size={20} /> },
    { id: 'code', label: 'Java Code', icon: <FileCode size={20} /> },
    { id: 'preview', label: 'CMS Preview', icon: <LayoutDashboard size={20} /> },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-700 flex items-center gap-3">
          <GraduationCap className="text-brand-500" size={32} />
          <div>
            <h1 className="font-bold text-lg leading-tight">CMS Forge</h1>
            <p className="text-xs text-slate-400">Java & MySQL Architect</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                activeTab === item.id
                  ? 'bg-brand-600 text-white shadow-lg'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
          Powered by Gemini 2.5
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {children}
      </main>
    </div>
  );
};