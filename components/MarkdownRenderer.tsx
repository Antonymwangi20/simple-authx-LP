'use client';

import { useEffect, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

interface CodeBlock {
  id: string;
  code: string;
  lang: string;
}

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  const [htmlSegments, setHtmlSegments] = useState<(string | CodeBlock)[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  // Parse markdown into segments (text and code blocks)
  useEffect(() => {
    const segments: (string | CodeBlock)[] = [];
    const regex = /```(\w+)?\n([\s\S]*?)```/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(content)) !== null) {
      const textBefore = content.slice(lastIndex, match.index);
      if (textBefore.trim()) segments.push(textBefore);

      const id = Math.random().toString(36).substr(2, 9);
      segments.push({ 
        id, 
        lang: match[1] || 'javascript', 
        code: match[2].trim() 
      });

      lastIndex = match.index + match[0].length;
    }

    const remaining = content.slice(lastIndex);
    if (remaining.trim()) segments.push(remaining);

    setHtmlSegments(segments);
  }, [content]);

  // Copy code handler
  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  // Simple inline markdown parser for text segments
  const renderTextSegment = (text: string) => {
    let html = text
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-6 mb-3">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-10 mb-6">$1</h1>')
      // Bold and Italic
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-secondary">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      // Inline code (fixed regex)
      .replace(/`([^`]+)`/g, '<code class="bg-dark-secondary text-secondary px-2 py-1 rounded text-sm font-mono">$1</code>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-secondary hover:text-primary underline" target="_blank" rel="noopener noreferrer">$1</a>')
      // Lists
      .replace(/^\* (.*$)/gim, '<li class="ml-6 mb-1">$1</li>')
      .replace(/^- (.*$)/gim, '<li class="ml-6 mb-1">$1</li>')
      // Paragraphs
      .split('\n\n')
      .map(para => {
        if (para.includes('<h') || para.includes('<li')) {
          return para;
        }
        return `<p class="mb-4 text-gray-300 leading-relaxed">${para}</p>`;
      })
      .join('');

    return (
      <div 
        className="markdown-content"
        dangerouslySetInnerHTML={{ __html: html }} 
      />
    );
  };

  return (
    <div className={`prose prose-invert max-w-none ${className}`}>
      {htmlSegments.map((segment, i) => {
        if (typeof segment === 'string') {
          return <div key={i}>{renderTextSegment(segment)}</div>;
        }

        // Code block
        return (
          <div key={segment.id} className="my-6 rounded-lg overflow-hidden border border-gray-800 bg-dark-secondary">
            <div className="flex justify-between items-center bg-gray-800 px-4 py-2">
              <span className="text-sm font-mono text-gray-300">{segment.lang}</span>
              <button
                className="flex items-center gap-2 text-gray-400 hover:text-secondary transition-colors"
                onClick={() => handleCopy(segment.id, segment.code)}
                aria-label="Copy code"
              >
                {copied === segment.id ? (
                  <>
                    <Check className="w-4 h-4 text-secondary" />
                    <span className="text-xs">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span className="text-xs">Copy</span>
                  </>
                )}
              </button>
            </div>
            <SyntaxHighlighter 
              language={segment.lang} 
              style={tomorrow}
              customStyle={{ 
                margin: 0,
                padding: '1rem',
                fontSize: '0.875rem',
                lineHeight: '1.5',
                backgroundColor: '#1f1f1f'
              }}
              showLineNumbers
            >
              {segment.code}
            </SyntaxHighlighter>
          </div>
        );
      })}
    </div>
  );
}