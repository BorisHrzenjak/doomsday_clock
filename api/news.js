const axios = require('axios');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  // Get API key from environment variable
  const NEWS_API_KEY = process.env.NEWS_API_KEY;
  
  if (!NEWS_API_KEY) {
    return res.status(500).json({ 
      error: 'Server configuration error: Missing API key' 
    });
  }

  try {
    const topics = [
      'nuclear weapons',
      'global conflict',
      'climate crisis',
      'international tensions'
    ].join(' OR ');

    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: topics,
        sortBy: 'publishedAt',
        language: 'en',
        pageSize: 100,
        apiKey: NEWS_API_KEY,
      },
    });

    // Return the articles directly
    return res.status(200).json(response.data.articles);
  } catch (error) {
    console.error('Error fetching news:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch news', 
      message: error.message 
    });
  }
};
