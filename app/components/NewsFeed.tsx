import { useState, useEffect } from 'react';
import type { NewsData } from '../lib/types';

interface NewsFeedProps {
  news: NewsData;
}

export function NewsFeed({ news }: NewsFeedProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (news.items.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.items.length);
    }, 5000); // Change story every 5 seconds

    return () => clearInterval(interval);
  }, [news.items.length]);

  if (news.isLoading) {
    return (
      <div className="flex items-center space-x-2 text-green-600 text-xs">
        <span className="animate-pulse">News</span>
        <span>Loading news...</span>
      </div>
    );
  }

  if (news.items.length === 0) {
    return null; // Don't show anything if no news items
  }

  const currentItem = news.items[currentIndex];

  return (
    <div className="flex items-center space-x-2 text-green-600 text-xs">
      <div className="flex-1 min-w-0">
        <a
          href={currentItem.link}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-400 transition-colors truncate block"
          title={currentItem.title}
        >
          {currentItem.title}
        </a>
      </div>
    </div>
  );
}
