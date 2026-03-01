import React from 'react';

export const Button = React.forwardRef(({ className = '', variant = 'default', size = 'md', ...props }, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    default: 'bg-[#00B99E] text-white hover:bg-[#00a88e] focus:ring-[#00B99E]',
    outline: 'border-2 text-gray-900 hover:bg-gray-50 focus:ring-gray-500',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantStyle = variants[variant] || variants.default;
  const sizeStyle = sizes[size] || sizes.md;

  return (
    <button
      ref={ref}
      className={`${baseStyles} ${variantStyle} ${sizeStyle} ${className}`}
      {...props}
    />
  );
});

Button.displayName = 'Button';
