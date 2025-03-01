import React from 'react';
import { Box, Container, Typography, ThemeProvider, createTheme, CircularProgress, Divider } from '@mui/material';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Clock from './components/Clock';
import RiskIndicator from './components/RiskIndicator';
import NewsDashboard from './components/NewsDashboard';
import { fetchNewsHeadlines } from './services/newsService';
import { analyzeSentiment } from './services/sentimentService';
import { RiskAssessment } from './types';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#111111',
    },
    primary: {
      main: '#ff4444',
    },
  },
  typography: {
    fontFamily: "'Roboto Mono', monospace",
    h2: {
      fontWeight: 700,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
    },
    h4: {
      fontWeight: 600,
      letterSpacing: '0.1em',
      color: 'rgba(255, 255, 255, 0.9)',
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: '2rem',
          paddingBottom: '2rem',
        },
      },
    },
  },
});

const queryClient = new QueryClient();

const LoadingSpinner = () => (
  <Box
    sx={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <CircularProgress color="primary" size={60} />
  </Box>
);

// Radiation symbol SVG component
const RadiationSymbol = ({ size = 40, color = '#ff0000', style = {} }) => (
  <Box
    component="svg"
    width={size}
    height={size}
    viewBox="0 0 100 100"
    sx={{ ...style }}
  >
    <circle cx="50" cy="50" r="20" fill={color} />
    <path
      d="M50,30 L50,10 A40,40 0 0,1 83.66,65 L66.83,57.5 A20,20 0 0,0 50,30"
      fill={color}
    />
    <path
      d="M50,30 L50,10 A40,40 0 0,0 16.34,65 L33.17,57.5 A20,20 0 0,1 50,30"
      fill={color}
      transform="rotate(120 50 50)"
    />
    <path
      d="M50,30 L50,10 A40,40 0 0,0 16.34,65 L33.17,57.5 A20,20 0 0,1 50,30"
      fill={color}
      transform="rotate(240 50 50)"
    />
  </Box>
);

// Nuclear warning tape component
const WarningTape = () => (
  <Box
    sx={{
      height: '30px',
      width: '100%',
      background: `repeating-linear-gradient(
        45deg,
        #000000,
        #000000 10px,
        #ffdd00 10px,
        #ffdd00 20px
      )`,
      marginBottom: '20px',
      marginTop: '20px',
    }}
  />
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            minHeight: '100vh',
            bgcolor: 'background.default',
            background: `
              radial-gradient(circle at 50% 50%, #222222 0%, #111111 100%),
              url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ff0000' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")
            `,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(255, 0, 0, 0.03)',
              pointerEvents: 'none',
              zIndex: 1,
            },
          }}
        >
          <WarningTape />
          <DoomsdayClock />
          <WarningTape />
        </Box>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

// Pulse animation for radiation elements
const pulse = {
  scale: [1, 1.05, 1],
  opacity: [0.7, 1, 0.7],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

function DoomsdayClock() {
  const { data: riskAssessment, isLoading, error } = useQuery<RiskAssessment>({
    queryKey: ['riskAssessment'],
    queryFn: async () => {
      const articles = await fetchNewsHeadlines();
      const sentiment = await analyzeSentiment(articles);
      
      const getRiskLevel = (score: number): RiskAssessment => {
        if (score < 25) return { score, severity: 'low', color: '#4caf50', articles };
        if (score < 50) return { score, severity: 'moderate', color: '#ff9800', articles };
        if (score < 75) return { score, severity: 'high', color: '#f44336', articles };
        return { score, severity: 'critical', color: '#b71c1c', articles };
      };

      return getRiskLevel(sentiment.score);
    },
    refetchInterval: 3 * 60 * 60 * 1000, // Refetch every 3 hours
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <Typography color="error">Error loading data</Typography>;
  if (!riskAssessment) return null;

  return (
    <Container 
      maxWidth="lg" 
      component={motion.div}
      variants={container}
      initial="hidden"
      animate="show"
      sx={{
        position: 'relative',
        zIndex: 2,
      }}
    >
      {/* Decorative radiation symbols */}
      <motion.div 
        style={{ 
          position: 'absolute', 
          top: '20px', 
          left: '20px',
          zIndex: 1,
        }}
        animate={pulse}
      >
        <RadiationSymbol size={60} color="rgba(255, 0, 0, 0.5)" />
      </motion.div>
      
      <motion.div 
        style={{ 
          position: 'absolute', 
          bottom: '40px', 
          right: '40px',
          zIndex: 1,
        }}
        animate={pulse}
      >
        <RadiationSymbol size={80} color="rgba(255, 0, 0, 0.3)" />
      </motion.div>

      <motion.div variants={item}>
        <Typography 
          variant="h2" 
          align="center" 
          gutterBottom
          sx={{
            mb: 6,
            background: 'linear-gradient(45deg, #fff, #666)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '-15px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '120px',
              height: '5px',
              background: 'linear-gradient(90deg, transparent, #ff0000, transparent)',
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-15px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '120px',
              height: '5px',
              background: 'linear-gradient(90deg, transparent, #ff0000, transparent)',
            },
          }}
        >
          Doomsday Clock
        </Typography>
      </motion.div>
      
      <motion.div variants={item}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          gap: { xs: 4, md: 6 },
          mb: 6
        }}>
          <Box sx={{ flex: '0 0 auto' }}>
            <Clock riskScore={riskAssessment.score} />
          </Box>
          <Box sx={{ 
            flex: '0 0 auto',
            maxWidth: '300px',
            width: '100%'
          }}>
            <RiskIndicator 
              severity={riskAssessment.severity} 
              color={riskAssessment.color} 
            />
          </Box>
        </Box>
      </motion.div>
      
      <motion.div variants={item}>
        <Box 
          sx={{ 
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '2px',
              height: '40px',
              background: 'rgba(255, 0, 0, 0.5)',
            }
          }}
        >
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              mb: 3,
              textAlign: 'center',
              position: 'relative',
              display: 'inline-block',
              padding: '0 20px',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '-40px',
                width: '30px',
                height: '2px',
                background: 'rgba(255, 0, 0, 0.5)',
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                right: '-40px',
                width: '30px',
                height: '2px',
                background: 'rgba(255, 0, 0, 0.5)',
              },
            }}
          >
            Contributing Headlines
          </Typography>
        </Box>
        <NewsDashboard articles={riskAssessment.articles} />
      </motion.div>

      {/* Footer with warning message */}
      <motion.div 
        variants={item}
        style={{ marginTop: '40px' }}
      >
        <Divider 
          sx={{ 
            mb: 3, 
            '&::before, &::after': { 
              borderColor: 'rgba(255, 0, 0, 0.3)' 
            } 
          }}
        />
        <Typography 
          variant="body2" 
          align="center" 
          sx={{ 
            color: 'rgba(255, 255, 255, 0.7)',
            fontStyle: 'italic',
            '& span': {
              color: '#ff4444',
              fontWeight: 'bold',
            }
          }}
        >
          The Doomsday Clock is a symbol that represents the likelihood of a human-made global catastrophe.
          <br />
          <span>Current status: {riskAssessment.severity.toUpperCase()} RISK</span>
        </Typography>
      </motion.div>
    </Container>
  );
}

export default App;
