import axios from 'axios';
import { NewsArticle } from '../types';

const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

export const fetchNewsHeadlines = async (): Promise<NewsArticle[]> => {
  const topics = [
    'nuclear weapons',
    'global conflict',
    'climate crisis',
    'international tensions'
  ].join(' OR ');

  try {
    const response = await axios.get(`${NEWS_API_BASE_URL}/everything`, {
      params: {
        q: topics,
        sortBy: 'publishedAt',
        language: 'en',
        pageSize: 100,
        apiKey: NEWS_API_KEY,
      },
    });

    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};
