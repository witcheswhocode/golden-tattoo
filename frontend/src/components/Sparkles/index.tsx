import React, { useEffect } from 'react';

const Sparkles: React.FC = () => {
  useEffect(() => {
    const sparklesContainer = document.createElement('div');
    sparklesContainer.style.position = 'fixed';
    sparklesContainer.style.top = '0';
    sparklesContainer.style.left = '0';
    sparklesContainer.style.width = '100%';
    sparklesContainer.style.height = '100%';
    sparklesContainer.style.pointerEvents = 'none';
    sparklesContainer.style.zIndex = '9999'; 
    sparklesContainer.style.visibility = 'hidden'; 
    document.body.appendChild(sparklesContainer);

    const createSparkle = () => {
      const sparkle = document.createElement('div');
      sparkle.textContent = '✨';
      sparkle.style.position = 'absolute';
      sparkle.style.left = `${Math.random() * 100}vw`;
      sparkle.style.top = `${Math.random() * 100}vh`;
      sparkle.style.fontSize = `${Math.random() * 24 + 12}px`;
      sparkle.style.animation = 'sparkle-animation 2s linear'; 
      sparklesContainer.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 2000);
    };

    setTimeout(() => {
      sparklesContainer.style.visibility = 'visible'; 
      for (let i = 0; i < 50; i++) {
        createSparkle();
      }
    }, 0);

    return () => {
      document.body.removeChild(sparklesContainer);
    };
  }, []);

  return null;
};

export default Sparkles;
