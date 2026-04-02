export default function LoadingSpinner({ size = 'md', text = '' }) {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <div className={`${sizes[size]} relative`}>
        <div className={`${sizes[size]} border-3 border-dark-200 border-t-primary-500 rounded-full animate-spin`}
             style={{ borderWidth: size === 'sm' ? '2px' : '3px' }} />
      </div>
      {text && <p className="text-sm text-dark-400 animate-pulse">{text}</p>}
    </div>
  );
}
