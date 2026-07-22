import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white shadow-lg rounded-xl p-8 w-full max-w-md ${className}`}>
      {children}
    </div>
  );
};

export default Card;