import React from 'react';

const Stars3: React.FC = () => {
  const starPositions: { top: number; left: number, delay: number }[] = [
    { top: 88, left: 162, delay: 500 },
    { top: 128, left: 42, delay: 900 },
    { top: 21, left: 162, delay: 1600 }
    // Add more star positions as needed
  ];

  return (
    <div className="fixed w-full h-full">
      {starPositions.map((position, index) => (
        <div
          key={index}

          className={`absolute w-1 h-1 bg-white rounded-full animate-glowing-stars`}
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
            animationDelay: `${position.delay}ms`
          }}
        />
      ))}
    </div>
  );
};

export default Stars3;
