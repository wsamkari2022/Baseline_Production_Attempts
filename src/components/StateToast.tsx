import React, { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface StateToastProps {
  message: string;
  type: 'warning' | 'info' | 'error';
  isVisible: boolean;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

const StateToast: React.FC<StateToastProps> = ({
  message,
  type,
  isVisible,
  onClose,
  autoClose = true,
  duration = 3000
}) => {
  useEffect(() => {
    if (isVisible && autoClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, autoClose, duration, onClose]);

  if (!isVisible) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
      <div className={`max-w-sm p-4 rounded-lg border shadow-lg ${getTypeStyles()}`}>
        <div className="flex items-start gap-3">
          <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-current hover:opacity-70"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StateToast;