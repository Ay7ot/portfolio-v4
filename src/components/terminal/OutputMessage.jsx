import { motion } from 'framer-motion';

export default function OutputMessage({ message, isLatest }) {
  const { type, content, command } = message;

  // Claude Code style indicators - text symbols instead of icons
  const getIndicator = () => {
    switch (type) {
      case 'success': return <span className="text-[var(--success)]">✓</span>;
      case 'error': return <span className="text-[var(--danger)]">✗</span>;
      case 'warning': return <span className="text-[var(--warning)]">⚠</span>;
      case 'info': return <span className="text-[var(--info)]">ℹ</span>;
      case 'navigate': return <span className="text-[var(--primary)]">→</span>;
      case 'thinking': return <span className="text-[var(--accent)] animate-pulse">◐</span>;
      default: return null;
    }
  };

  const variants = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 }
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.15 }}
      className="space-y-2"
    >
      {/* Show command if it was a user input - Claude Code prompt style */}
      {command && (
        <div className="flex items-center gap-1 text-sm font-mono">
          <span className="text-[var(--foreground-muted)]">[</span>
          <span className="text-[var(--success)]">user</span>
          <span className="text-[var(--foreground-muted)]">@</span>
          <span className="text-[var(--primary)]">portfolio</span>
          <span className="text-[var(--foreground-muted)]"> ~]$</span>
          <span className="text-[var(--foreground)] ml-2">{command}</span>
        </div>
      )}

      {/* Content */}
      <div className="pl-0">
        {typeof content === 'string' ? (
          <div className="flex items-start gap-2 text-sm font-mono">
            {getIndicator() && <span className="mt-0.5 w-4 text-center">{getIndicator()}</span>}
            <pre className="whitespace-pre-wrap text-[var(--foreground)] flex-1">
              {content}
            </pre>
          </div>
        ) : (
          <div className={`${isLatest ? 'animate-fade-in-up' : ''} ml-0`}>
            {/* Assistant response indicator for component content */}
            {type === 'output' && (
              <div className="flex items-center gap-2 mb-2 text-xs text-[var(--foreground-dim)] font-mono">
                <span className="text-[var(--accent)]">◆</span>
                <span>claude-portfolio</span>
              </div>
            )}
            {content}
          </div>
        )}
      </div>
    </motion.div>
  );
}

