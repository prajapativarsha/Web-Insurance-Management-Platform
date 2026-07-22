import React from 'react';

const Button = ({ children, onClick, type = 'button', disabled = false, className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full bg-primary text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;