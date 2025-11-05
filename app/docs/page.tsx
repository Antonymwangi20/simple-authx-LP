'use client';

import { useState } from 'react';
import { 
  Shield, Lock, Zap, Package, Code, CheckCircle, Copy, 
  Github, BookOpen, Server, Database, Key, Cookie, RefreshCw, 
  FileCode, Terminal, Settings, AlertCircle, ChevronRight,
  Menu, X, Search, Home, Users, Layers
} from 'lucide-react';

export default function DocsPage() {
  const [copied, setCopied] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('introduction');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(''), 2000);
  };

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: Home },
    { id: 'installation', title: 'Installation', icon: Package },
    { id: 'quick-start', title: 'Quick Start', icon: Zap },
    { id: 'configuration', title: 'Configuration', icon: Settings },
    { id: 'authentication', title: 'Authentication', icon: Lock },
    { id: 'storage', title: 'Storage Adapters', icon: Database },
    { id: 'mfa', title: 'MFA/2FA', icon: Key },
    { id: 'middleware', title: 'Middleware', icon: Layers },
    { id: 'api-reference', title: 'API Reference', icon: Code },
    { id: 'examples', title: 'Examples', icon: FileCode },
  ];

  interface CodeBlockProps {
    code: string;
    language?: string;
    id: string;
  }

  const CodeBlock = ({ code, language = 'typescript', id }: CodeBlockProps) => (
    <div className="relative group">
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button
          onClick={() => copyToClipboard(code, id)}
          className="bg-secondary/20 hover:bg-secondary/30 p-2 rounded text-white"
        >
          {copied === id ? <CheckCircle size={16} /> : <Copy size={16} />}
        </button>
      </div>
      <pre className="bg-dark-secondary p-4 rounded-lg overflow-x-auto border border-gray-800">
        <code className="text-sm text-gray-300">{code}</code>
      </pre>
    </div>
  );

  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-dark-secondary/95 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src="/icon.png" alt="Simple AuthX" className="w-8 h-8" />
            <div>
              <h1 className="text-xl font-bold gradient-text">Simple AuthX</h1>
              <p className="text-xs text-gray-400">Documentation</p>
            </div>
          </a>
          <div className="flex items-center gap-4">
            <a href="/" className="text-sm hover:text-secondary transition-colors hidden sm:block">
              Home
            </a>
            <a href="https://github.com/Antonymwangi20/simple-authx" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-secondary transition-colors">
              <Github size={20} />
            </a>
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 flex gap-8">
        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-20 left-0 h-[calc(100vh-5rem)] w-64 
          bg-dark-secondary lg:bg-transparent border-r border-gray-800 lg:border-0
          transition-transform duration-300 z-40 overflow-y-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <nav className="p-4 lg:p-0 space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${
                    activeSection === section.id
                      ? 'bg-secondary/20 text-secondary'
                      : 'hover:bg-gray-800 text-gray-300'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{section.title}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content - You would copy all the content sections from the artifact above */}
        <main className="flex-1 max-w-4xl">
          {/* Copy all the section content from the artifact above */}
          {activeSection === 'introduction' && (
            <div className="space-y-6">
              {/* Introduction content - see artifact above for full implementation */}
              <h1 className="text-4xl font-bold mb-4 gradient-text">Welcome to Simple AuthX</h1>
              {/* Rest of content... */}
            </div>
          )}
          {/* Add all other sections similarly */}
        </main>
      </div>

      {/* Footer - copy from artifact above */}
    </div>
  );
}