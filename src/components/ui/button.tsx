import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const Button: React.FC<ButtonProps> = ({ 
  children,
  variant = 'default',
  size = 'default',
  className = '',
  ...props 
}) => {
  return (
    <button
      className={`button ${variant} ${size} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};