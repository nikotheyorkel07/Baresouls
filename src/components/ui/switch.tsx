import React from 'react';

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Switch: React.FC<SwitchProps> = ({ 
  checked,
  onCheckedChange,
  className = '',
  ...props 
}) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
      className={`switch ${className}`}
      {...props}
    />
  );
};