// src/components/common/Input.jsx
import React from 'react';

const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  className = '',
  icon: Icon,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
           onWheel={(e) => e.target.blur()}
          className={`
            w-full px-4 py-2.5 rounded-lg border
            ${Icon ? 'pl-10' : 'pl-4'}
            ${error
              ? 'border-red-300 dark:border-red-600 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent'
            }
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-white
            placeholder-gray-500 dark:placeholder-gray-400
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors duration-200
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default Input;