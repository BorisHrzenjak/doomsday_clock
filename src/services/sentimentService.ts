import axios from 'axios';
import { NewsArticle, SentimentAnalysis } from '../types';

const MISTRAL_API_KEY = process.env.REACT_APP_MISTRAL_API_KEY;
const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions';

export const analyzeSentiment = async (articles: NewsArticle[]): Promise<SentimentAnalysis> => {
  const headlines = articles.map(article => article.title).join('\n');
  
  try {
    const response = await axios.post(
      MISTRAL_API_URL,
      {
        model: 'mistral-small',
        messages: [
          {
            role: 'system',
            content: 'You are an expert at analyzing global risk levels based on news headlines. Analyze the following headlines and return a risk score between 0 (minimal risk) and 100 (extreme risk), along with a sentiment assessment.'
          },
          {
            role: 'user',
            content: headlines
          }
        ],
        temperature: 0.3,
      },
      {
        headers: {
          'Authorization': `Bearer ${MISTRAL_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const content = response.data.choices[0].message.content;
    const score = parseFloat(content.match(/\d+/)[0]);
    
    return {
      score: Math.min(Math.max(score, 0), 100),
      sentiment: content,
    };
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    throw error;
  }
};
