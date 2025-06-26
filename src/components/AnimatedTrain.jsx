import React, { useState, useEffect, useRef } from 'react';
import './AnimatedTrain.css';

const AnimatedTrain = () => {
  const [isDerailed, setIsDerailed] = useState(false);
  const [animationPhase, setAnimationPhase] = useState('moving'); // 'moving', 'derailing', 'derailed'
  const trainRef = useRef(null);
  
  useEffect(() => {
    const checkPosition = () => {
      if (!trainRef.current) return;
      
      const trainRect = trainRef.current.getBoundingClientRect();
      const screenWidth = window.innerWidth;
      const locomotivePosition = trainRect.left + 100; // Locomotive is 100px from left edge of train element
      
      // Check if locomotive is near the middle of the screen
      if (locomotivePosition > screenWidth * 0.48 && locomotivePosition < screenWidth * 0.52 && animationPhase === 'moving') {
        setAnimationPhase('derailing');
        setIsDerailed(true);
        
        // After derailing animation, set to final state
        setTimeout(() => {
          setAnimationPhase('derailed');
        }, 300);
      }
      
      // Reset when train goes off screen (left side)
      if (trainRect.right < 0) {
        setIsDerailed(false);
        setAnimationPhase('moving');
      }
    };
    
    const interval = setInterval(checkPosition, 50);
    return () => clearInterval(interval);
  }, [animationPhase]);
  
  return (
    <div className="train-container">
      <div 
        ref={trainRef}
        className={`train ${isDerailed ? 'derailed' : ''} ${animationPhase}`}
      >
        {/* Engine */}
        <div className="engine">
          <div className="cabin"></div>
          <div className="chimney"></div>
          <div className="front"></div>
        </div>
        
        {/* Cars */}
        <div className="car car-1"></div>
        <div className="car car-2"></div>
        <div className="car car-3"></div>
        
        {/* Wheels */}
        <div className="wheels">
          <div className="wheel"></div>
          <div className="wheel"></div>
          <div className="wheel"></div>
          <div className="wheel"></div>
          <div className="wheel"></div>
          <div className="wheel"></div>
          <div className="wheel"></div>
          <div className="wheel"></div>
        </div>
      </div>
      
      {/* Track */}
      <div className="track"></div>
    </div>
  );
};

export default AnimatedTrain;