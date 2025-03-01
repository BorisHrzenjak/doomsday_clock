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
