import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
  type?: 'success' | 'error';
}

const Toast: React.FC<ToastProps> = ({ message, onClose, type }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2900);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`flex text-right items-end justify-end w-full max-w-xs p-4 mb-4 border rounded-lg shadow-lg animate-slide-in-out ${type === 'success' ? 'bg-blue-500/40 border-blue-600 dark:border-blue-400 text-black' : 'bg-red-500/40 border-red-600 dark:border-red-400 text-black'}`} role="alert">
      <div className="ms-3 text-sm font-normal">{message}</div>
    </div>
  );
};

export default Toast;
