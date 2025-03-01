import React from 'react';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

interface ClockProps {
  riskScore: number;
}

const ClockContainer = styled('div')({
  position: 'relative',
  width: '500px',
  height: '500px',
  margin: '0 auto',
  padding: '20px',
});

const ClockFace = styled('div')({
  position: 'relative',
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  border: '18px solid #444',
  background: '#222',
  boxShadow: '0 0 30px rgba(0, 0, 0, 0.3), inset 0 0 30px rgba(0, 0, 0, 0.3)',
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '24px',
    height: '24px',
    background: '#ff0000',
    borderRadius: '50%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 2,
  },
});

const Hand = styled(motion.div)({
  position: 'absolute',
  bottom: '50%',
  left: '50%',
  transformOrigin: 'bottom center',
  background: 'linear-gradient(to top, #ff0000, #ff4444)',
  height: '45%',
  width: '8px',
  boxShadow: '0 0 10px rgba(255, 0, 0, 0.5)',
  borderRadius: '3px',
  zIndex: 1,
});

// Define a type for the clock positions
type ClockPosition = '12' | '3' | '6' | '9';

// Create a custom interface for the ClockNumber component
interface ClockNumberProps {
  clockPosition: ClockPosition;
  variant: 'h6';
  children: React.ReactNode;
}

// Create the styled component with the custom props
const ClockNumber = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'clockPosition',
})<{ clockPosition: ClockPosition }>(({ clockPosition }) => {
  const positions = {
    '12': { top: '10%', left: '50%', transform: 'translateX(-50%)' },
    '3': { top: '50%', right: '10%', transform: 'translateY(-50%)' },
    '6': { bottom: '10%', left: '50%', transform: 'translateX(-50%)' },
    '9': { top: '50%', left: '10%', transform: 'translateY(-50%)' }
  };
  
  return {
    position: 'absolute',
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: '32px',
    ...positions[clockPosition]
  };
});

const Clock: React.FC<ClockProps> = ({ riskScore }) => {
  // Calculate hand rotation based on risk
  // At low risk (0), hand is at 9 o'clock (270 degrees)
  // At high risk (100), hand is at 12 o'clock (360/0 degrees)
  const rotation = 270 + (riskScore / 100 * 90);

  return (
    <ClockContainer>
      <ClockFace>
        <ClockNumber clockPosition="12" variant="h6">12</ClockNumber>
        <ClockNumber clockPosition="3" variant="h6">3</ClockNumber>
        <ClockNumber clockPosition="6" variant="h6">6</ClockNumber>
        <ClockNumber clockPosition="9" variant="h6">9</ClockNumber>
        <Hand
          animate={{ rotate: rotation }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
        />
      </ClockFace>
    </ClockContainer>
  );
};

export default Clock;
