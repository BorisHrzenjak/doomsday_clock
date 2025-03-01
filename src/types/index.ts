export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

export interface RiskAssessment {
  score: number;
  severity: 'low' | 'moderate' | 'high' | 'critical';
  color: string;
  articles: NewsArticle[];
}

export interface SentimentAnalysis {
  score: number;
  sentiment: string;
}
