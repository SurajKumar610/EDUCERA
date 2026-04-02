import { useState, useEffect } from 'react';

export default function Toast({ message, type = 'success', onClose, duration = 4000 }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const styles = {
    success: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    error: 'bg-red-50 text-red-800 border border-red-200',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200',
    info: 'bg-blue-50 text-blue-800 border border-blue-200',
  };

  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
  };

  return (
    <div className={`
      notification-toast ${styles[type]}
      ${isVisible ? 'animate-slide-in-right' : 'opacity-0 translate-x-6'}
      transition-all duration-300 flex items-center gap-3
    `}>
      <span className="text-lg">{icons[type]}</span>
      <span className="text-sm">{message}</span>
      <button
        onClick={() => { setIsVisible(false); setTimeout(onClose, 300); }}
        className="ml-4 opacity-60 hover:opacity-100 transition-opacity text-lg"
      >
        ×
      </button>
    </div>
  );
}
