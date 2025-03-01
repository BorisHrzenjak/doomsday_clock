import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

interface RiskIndicatorProps {
  severity: string;
  color: string;
}

const IndicatorContainer = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
  padding: '1.5rem',
  background: 'rgba(0, 0, 0, 0.7)',
  borderRadius: '15px',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  border: '1px solid rgba(255, 0, 0, 0.2)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'linear-gradient(90deg, transparent, rgba(255, 0, 0, 0.8), transparent)',
  },
}));

const ColorIndicator = styled(motion.div)<{ color: string }>(({ color }) => ({
  width: '120px',
  height: '120px',
  borderRadius: '50%',
  background: `radial-gradient(circle at 30% 30%, ${color}, rgba(0, 0, 0, 0.7))`,
  boxShadow: `0 0 30px ${color}80`,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '10%',
    left: '10%',
    width: '20%',
    height: '20%',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.3)',
    filter: 'blur(2px)',
  },
}));

const SeverityText = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  letterSpacing: '2px',
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
  background: 'linear-gradient(45deg, #fff, #aaa)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

// Warning triangles for decoration
const WarningTriangle = styled('div')<{ rotation: number }>(({ rotation }) => ({
  position: 'absolute',
  width: 0,
  height: 0,
  borderLeft: '8px solid transparent',
  borderRight: '8px solid transparent',
  borderBottom: '14px solid rgba(255, 204, 0, 0.6)',
  transform: `rotate(${rotation}deg)`,
  '&::after': {
    content: '"!"',
    position: 'absolute',
    color: 'black',
    fontSize: '10px',
    fontWeight: 'bold',
    top: '2px',
    left: '-2px',
  }
}));

const RiskIndicator: React.FC<RiskIndicatorProps> = ({ severity, color }) => {
  // Determine pulse speed based on severity
  const getPulseSpeed = () => {
    switch(severity) {
      case 'critical': return 0.8;
      case 'high': return 1.2;
      case 'moderate': return 1.8;
      default: return 2.5;
    }
  };

  // Get warning message based on severity
  const getWarningMessage = () => {
    switch(severity) {
      case 'critical': return 'IMMEDIATE ACTION REQUIRED';
      case 'high': return 'SEVERE GLOBAL THREAT';
      case 'moderate': return 'INCREASING TENSIONS';
      default: return 'SITUATION STABLE';
    }
  };

  return (
    <IndicatorContainer elevation={3}>
      {/* Decorative warning triangles */}
      <WarningTriangle rotation={0} style={{ top: '10px', right: '15px' }} />
      <WarningTriangle rotation={120} style={{ bottom: '10px', right: '25px' }} />
      <WarningTriangle rotation={240} style={{ bottom: '10px', left: '25px' }} />
      
      <ColorIndicator 
        color={color}
        animate={{ 
          scale: [1, 1.05, 1],
          boxShadow: [
            `0 0 30px ${color}80`,
            `0 0 50px ${color}`,
            `0 0 30px ${color}80`
          ]
        }}
        transition={{
          duration: getPulseSpeed(),
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <SeverityText variant="h5">
        {severity} Risk Level
      </SeverityText>
      
      <Typography 
        variant="caption" 
        sx={{ 
          color: color,
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          marginTop: '-5px',
          textShadow: `0 0 5px ${color}`
        }}
      >
        {getWarningMessage()}
      </Typography>
      
      {/* Countdown-like timer effect */}
      <Box 
        sx={{ 
          display: 'flex', 
          gap: '5px', 
          marginTop: '10px',
          fontFamily: 'monospace'
        }}
      >
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "linear"
            }}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: color,
              boxShadow: `0 0 5px ${color}`
            }}
          />
        ))}
      </Box>
    </IndicatorContainer>
  );
};

export default RiskIndicator;
