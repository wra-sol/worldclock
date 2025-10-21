import { useState, useEffect } from 'react';
import type { NewsData, NewsItem } from '../types';

export function useNews() {
  const [news, setNews] = useState<NewsData>({
    items: [],
    isLoading: true,
  });

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setNews(prev => ({ ...prev, isLoading: true, error: undefined }));
        
        // Fetch CBC Canada RSS feed using RSS2JSON proxy
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent('https://www.cbc.ca/webfeed/rss/rss-canada'));
        if (!response.ok) throw new Error('Failed to fetch news');
        
        const data = await response.json();
        
        if (!data.status || data.status !== 'ok') {
          throw new Error('Failed to parse news feed');
        }
        
        const items = (data.items || []).slice(0, 5).map((item: any) => ({
          title: item.title || '',
          link: item.link || '',
          description: item.description || '',
          pubDate: item.pubDate || '',
          category: item.categories ? item.categories.join(', ') : '',
        } as NewsItem));
        
        setNews({
          items,
          isLoading: false,
        });
      } catch (error) {
        console.error('News fetch error:', error);
        setNews(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to load news',
        }));
      }
    };

    fetchNews();
  }, []);

  return news;
}
