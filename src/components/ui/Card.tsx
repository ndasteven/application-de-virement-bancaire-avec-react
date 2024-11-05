import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: 'default' | 'purple' | 'blue' | 'green';
}

export function Card({ children, className = '', gradient = 'default' }: CardProps) {
  const gradientClasses = {
    default: 'bg-white',
    purple: 'bg-gradient-to-br from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100',
    blue: 'bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100',
    green: 'bg-gradient-to-br from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100',
  };

  return (
    <div className={`
      rounded-xl shadow-sm p-6 transition-all duration-300 ease-in-out
      hover:shadow-md ${gradientClasses[gradient]} ${className}
    `}>
      {children}
    </div>
  );
}