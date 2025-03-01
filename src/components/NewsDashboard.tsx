import React from 'react';
import { Box, Card, CardContent, Typography, Link, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { NewsArticle } from '../types';
import moment from 'moment';

interface NewsDashboardProps {
  articles: NewsArticle[];
}

const DashboardContainer = styled(Paper)(({ theme }) => ({
  maxHeight: '500px',
  overflowY: 'auto',
  padding: '1.5rem',
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '15px',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '4px',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.3)',
    },
  },
}));

const NewsCard = styled(Card)(({ theme }) => ({
  marginBottom: '1rem',
  background: 'rgba(255, 255, 255, 0.07)',
  backdropFilter: 'blur(10px)',
  borderRadius: '10px',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
}));

const NewsTitle = styled(Typography)({
  color: '#fff',
  fontWeight: 600,
  lineHeight: 1.4,
  marginBottom: '0.5rem',
  '& a': {
    color: 'inherit',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    '&:hover': {
      color: '#ff4444',
    },
  },
});

const NewsSource = styled(Typography)({
  color: 'rgba(255, 255, 255, 0.6)',
  fontSize: '0.875rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  '&::before': {
    content: '""',
    display: 'inline-block',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#ff4444',
  },
});

const NewsDescription = styled(Typography)({
  color: 'rgba(255, 255, 255, 0.8)',
  fontSize: '0.95rem',
  lineHeight: 1.6,
  marginTop: '1rem',
});

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const NewsDashboard: React.FC<NewsDashboardProps> = ({ articles }) => {
  return (
    <DashboardContainer>
      <Box
        component={motion.div}
        variants={container}
        initial="hidden"
        animate="show"
      >
        {articles.map((article, index) => (
          <motion.div key={index} variants={item}>
            <NewsCard>
              <CardContent>
                <NewsTitle variant="h6">
                  <Link href={article.url} target="_blank" rel="noopener noreferrer">
                    {article.title}
                  </Link>
                </NewsTitle>
                <NewsSource>
                  {article.source.name} • {moment(article.publishedAt).fromNow()}
                </NewsSource>
                <NewsDescription>
                  {article.description}
                </NewsDescription>
              </CardContent>
            </NewsCard>
          </motion.div>
        ))}
      </Box>
    </DashboardContainer>
  );
};

export default NewsDashboard;
