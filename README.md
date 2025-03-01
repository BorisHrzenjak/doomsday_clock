# Doomsday Clock

A React-based web application that monitors global risk levels through news analysis and sentiment assessment.

## Features

- Fetches real-time news headlines about global conflicts, nuclear threats, climate change, and international tensions
- Performs sentiment analysis using Mistral AI to generate risk assessment scores
- Visualizes global risk through:
  - A dynamic clock face that moves closer to midnight as risk increases
  - Color-coded risk indicator
  - Real-time dashboard of contributing headlines
- Auto-updates every 3 hours

## Setup

1. Clone the repository
2. Create a `.env` file in the root directory with the following variables:
   ```
   REACT_APP_NEWS_API_KEY=your_newsapi_key_here
   REACT_APP_MISTRAL_API_KEY=your_mistral_api_key_here
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm start
   ```
   or alternatively:
   ```
   npm run dev
   ```

## Deployment to Vercel

1. Create a Vercel account if you don't have one already
2. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```
3. Login to Vercel:
   ```
   vercel login
   ```
4. Add your NewsAPI key as a secret in Vercel:
   ```
   vercel secrets add news_api_key your_newsapi_key_here
   ```
5. Deploy your application:
   ```
   vercel
   ```
6. For production deployment:
   ```
   vercel --prod
   ```
> **Note:** The free tier of NewsAPI doesn't allow direct browser requests in production environments. This project uses a serverless function to proxy the requests in production.

## Technologies Used

- React with TypeScript
- Material-UI for styling
- React Query for data fetching
- Framer Motion for animations
- NewsAPI.org for news headlines
- Mistral AI for sentiment analysis

## Note

You'll need to obtain API keys from:
- [NewsAPI.org](https://newsapi.org/)
- [Mistral AI](https://mistral.ai/)
