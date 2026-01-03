import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle2, AlertCircle, Info, Terminal } from 'lucide-react';

export default function OutputMessage({ message, isLatest }) {
  const { type, content, command } = message;

  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle2 size={14} className="text-[var(--success)]" />;
      case 'error': return <AlertCircle size={14} className="text-[var(--danger)]" />;
      case 'info': return <Info size={14} className="text-[var(--info)]" />;
      case 'command': return <ChevronRight size={14} className="text-[var(--accent)]" />;
      default: return <Terminal size={14} className="text-[var(--foreground-muted)]" />;
    }
  };

  const variants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2 }}
      className="space-y-1"
    >
      {/* Show command if it was a user input */}
      {command && (
        <div className="flex items-center gap-2 text-sm text-[var(--foreground-muted)]">
          <span className="text-[var(--success)]">visitor</span>
          <span className="text-[var(--foreground-dim)]">@</span>
          <span className="text-[var(--primary)]">portfolio</span>
          <ChevronRight size={14} className="text-[var(--accent)]" />
          <span className="text-[var(--foreground)]">{command}</span>
        </div>
      )}

      {/* Content */}
      <div className="pl-0">
        {typeof content === 'string' ? (
          <div className="flex items-start gap-2">
            {type !== 'output' && <span className="mt-0.5">{getIcon()}</span>}
            <pre className="text-sm whitespace-pre-wrap font-mono text-[var(--foreground)]">
              {content}
            </pre>
          </div>
        ) : (
          <div className={isLatest ? 'animate-fade-in-up' : ''}>
            {content}
          </div>
        )}
      </div>
    </motion.div>
  );
}

