import React from 'react';

const Input = ({ label, type = 'text', name, value, onChange, placeholder, required = false }) => {
  return (
    <div className="mb-4 text-left">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={name}>
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
      />
    </div>
  );
};

export default Input;