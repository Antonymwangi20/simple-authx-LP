'use client';
import { useState, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export default function VersionSwitcher() {
  const [versions, setVersions] = useState<string[]>([]);
  const [currentVersion, setCurrentVersion] = useState('2.0.6');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchVersions() {
      try {
        const response = await fetch('/api/versions');
        const data = await response.json();
        setVersions(data.versions || []);
        setCurrentVersion(data.current || '2.0.6');
      } catch (error) {
        console.error('Error fetching versions:', error);
      }
    }
    fetchVersions();
  }, []);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-dark-secondary hover:bg-gray-800 px-4 py-2 rounded-md text-white"
      >
        <span>v{currentVersion}</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-dark-secondary z-10">
          {versions.map((version) => (
            <button
              key={version}
              onClick={() => {
                setCurrentVersion(version);
                setIsOpen(false);
                // Navigate to version-specific docs
                window.location.href = `/docs?version=${version}`;
              }}
              className="w-full flex items-center justify-between px-4 py-2 text-white hover:bg-gray-800"
            >
              <span>v{version}</span>
              {version === currentVersion && <Check size={16} className="text-secondary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
