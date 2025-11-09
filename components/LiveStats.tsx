'use client';

import { useEffect, useState } from 'react';
import { Star, GitFork, Eye, AlertCircle } from 'lucide-react';

export default function LiveStats() {
  const [stats, setStats] = useState({
    stars: 0,
    forks: 0,
    watchers: 0,
    openIssues: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/stats');
        const data = await response.json();
        setStats(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setLoading(false);
      }
    }

    fetchStats();

    // Refresh every 5 minutes
    const interval = setInterval(fetchStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-dark-secondary px-4 py-2 rounded-lg w-24 h-10">
            <div className="h-4 bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
      <div className="bg-dark-secondary px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 hover:scale-105 transition-transform">
        <Star size={14} className="text-yellow-500 sm:w-4 sm:h-4" />
        <span className="text-xs sm:text-sm">{stats.stars} Stars</span>
      </div>
      <div className="bg-dark-secondary px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 hover:scale-105 transition-transform">
        <GitFork size={14} className="text-secondary sm:w-4 sm:h-4" />
        <span className="text-xs sm:text-sm">{stats.forks} Forks</span>
      </div>
      <div className="bg-dark-secondary px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 hover:scale-105 transition-transform">
        <Eye size={14} className="text-primary sm:w-4 sm:h-4" />
        <span className="text-xs sm:text-sm">{stats.watchers} Watching</span>
      </div>
      <div className="bg-dark-secondary px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 hover:scale-105 transition-transform">
        <AlertCircle size={14} className="text-blue-500 sm:w-4 sm:h-4" />
        <span className="text-xs sm:text-sm">{stats.openIssues} Issues</span>
      </div>
    </div>
  );
}