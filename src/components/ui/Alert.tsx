import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface AlertProps {
  message: string;
  type?: 'error' | 'success';
  onClose: () => void;
}

export function Alert({ message, type = 'error', onClose }: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLeaving(true);
      setTimeout(onClose, 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const baseClasses = `
    fixed top-4 right-4 p-4 rounded-lg shadow-lg
    flex items-center gap-3 max-w-md
    transform transition-all duration-300 ease-in-out
    ${isLeaving ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'}
  `;

  const typeClasses = {
    error: 'bg-red-50 text-red-800 border border-red-200',
    success: 'bg-green-50 text-green-800 border border-green-200',
  };

  if (!isVisible) return null;

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      <span className="flex-1">{message}</span>
      <button
        onClick={() => {
          setIsLeaving(true);
          setTimeout(onClose, 300);
        }}
        className="text-gray-500 hover:text-gray-700"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}