import axios from 'axios';
import { NewsArticle } from '../types';

export const fetchNewsHeadlines = async (): Promise<NewsArticle[]> => {
  try {
    // Use relative URL in production, fallback to direct API in development
    const isProduction = process.env.NODE_ENV === 'production';
    const apiUrl = isProduction 
      ? '/api/news' 
      : 'https://newsapi.org/v2/everything';
    
    if (isProduction) {
      // Call our serverless function in production
      const response = await axios.get(apiUrl);
      return response.data;
    } else {
      // In development, continue using the direct API call
      const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY;
      const topics = [
        'nuclear weapons',
        'global conflict',
        'climate crisis',
        'international tensions'
      ].join(' OR ');

      const response = await axios.get(apiUrl, {
        params: {
          q: topics,
          sortBy: 'publishedAt',
          language: 'en',
          pageSize: 100,
          apiKey: NEWS_API_KEY,
        },
      });

      return response.data.articles;
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};
