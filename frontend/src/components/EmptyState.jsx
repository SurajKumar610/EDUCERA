export default function EmptyState({ icon = '📋', title, message, action, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
      <div className="text-6xl mb-4 animate-bounce-in">{icon}</div>
      <h3 className="text-lg font-semibold text-dark-700 mb-2">{title}</h3>
      <p className="text-sm text-dark-400 max-w-sm mb-6">{message}</p>
      {action && (
        <button onClick={onAction} className="btn-primary text-sm">
          {action}
        </button>
      )}
    </div>
  );
}
