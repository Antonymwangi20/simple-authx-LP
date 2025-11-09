'use client';
import { useEffect, useState } from 'react';
import { 
  Download, Github, Search, Menu, X, ChevronRight,
  FileText, GitBranch, Shield, Code, Zap, ArrowLeft
} from 'lucide-react';
import MarkdownRenderer from '@/components/MarkdownRenderer';

interface DocsSection {
  id: string;
  title: string;
  icon: any;
  content: string;
}

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [docsContent, setDocsContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDocs() {
      try {
        const response = await fetch('/api/docs');
        const data = await response.json();
        setDocsContent(data);
      } catch (error) {
        console.error('Error fetching docs:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchDocs();
  }, []);

  const sections: DocsSection[] = [
    { id: 'getting-started', title: 'Getting Started', icon: Zap, content: docsContent?.readme || '' },
    { id: 'changelog', title: 'Changelog', icon: GitBranch, content: docsContent?.changelog || '' },
    { id: 'migration', title: 'Migration Guide', icon: Code, content: docsContent?.migration || '' },
    { id: 'contributing', title: 'Contributing', icon: FileText, content: docsContent?.contributing || '' },
    { id: 'security', title: 'Security', icon: Shield, content: docsContent?.security || '' },
  ];

  const filteredSections = sections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Scroll handler to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100; // offset
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [docsContent]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-dark-bg text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-dark-secondary/90 border-b border-gray-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-1 text-gray-300 hover:text-white">
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </a>
          <h1 className="text-lg font-semibold">Documentation</h1>
        </div>
        <div className="flex items-center gap-4">
          {docsContent?.packageInfo && <span className="text-gray-400">v{docsContent.packageInfo.version}</span>}
          <a
            href="https://github.com/Antonymwangi20/simple-authx"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-gray-400 hover:text-white"
          >
            <Github size={18} />
            <span>GitHub</span>
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`
            lg:w-64 lg:sticky lg:top-24 lg:self-start
            ${mobileMenuOpen ? 'block' : 'hidden lg:block'}
          `}
        >
          {/* Search Bar */}
          <div className="p-4 relative">
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-dark-secondary border border-gray-800 rounded-lg px-10 py-2 text-white"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <nav className="bg-dark-secondary rounded-lg p-4 space-y-2">
            {filteredSections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                    ${activeSection === section.id
                      ? 'bg-secondary text-dark font-semibold'
                      : 'text-gray-300 hover:bg-gray-800'
                    }
                  `}
                >
                  <Icon size={18} />
                  <span>{section.title}</span>
                </button>
              );
            })}

            <div className="mt-4">
              <h3 className="text-gray-400 font-semibold mb-2">Quick Links</h3>
              <div className="flex flex-col gap-2">
                <a
                  href="https://www.npmjs.com/package/simple-authx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-gray-300 hover:text-white"
                >
                  <Download size={14} /> npm Package
                </a>
                <a
                  href="https://github.com/Antonymwangi20/simple-authx/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-gray-300 hover:text-white"
                >
                  <Github size={14} /> Report Issue
                </a>
                <a
                  href="https://github.com/Antonymwangi20/simple-authx/tree/main/examples"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-gray-300 hover:text-white"
                >
                  <Code size={14} /> Examples
                </a>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-4">
          {loading ? (
            <div>Loading documentation...</div>
          ) : (
            sections.map((section) => (
              <div key={section.id} id={section.id} className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <section.icon className="text-secondary" />
                  <h2 className="text-2xl font-semibold">{section.title}</h2>
                </div>
                <MarkdownRenderer content={section.content} />
              </div>
            ))
          )}

          {docsContent?.lastUpdated && (
            <div className="mt-4 text-gray-400 text-sm">
              Last updated: {new Date(docsContent.lastUpdated).toLocaleString()}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
