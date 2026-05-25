import React from 'react';

const Spinner = ({ size = 'md', color = 'primary' }) => {
  const sizeMap = {
    sm: '16px',
    md: '24px',
    lg: '40px'
  };

  return (
    <div 
      className="spinner" 
      style={{ 
        width: sizeMap[size], 
        height: sizeMap[size],
        borderTopColor: color === 'primary' ? 'var(--primary-color)' : 'white'
      }}
    ></div>
  );
};

export default Spinner;
