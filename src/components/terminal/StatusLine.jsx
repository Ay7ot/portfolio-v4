import { useState, useEffect } from 'react';
import { GitBranch, Clock, Terminal, Zap } from 'lucide-react';
import { formatDate } from '../../lib/utils';

export default function StatusLine() {
  const [time, setTime] = useState(formatDate());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(formatDate());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-[var(--background-secondary)] border-t border-[var(--foreground-dim)]/10 text-xs">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-[var(--success)]">
          <Terminal size={12} />
          <span>portfolio</span>
        </div>
        <div className="flex items-center gap-1.5 text-[var(--primary)]">
          <GitBranch size={12} />
          <span>main</span>
        </div>
      </div>

      {/* Center */}
      <div className="flex items-center gap-1.5 text-[var(--accent)]">
        <Zap size={12} />
        <span>Claude Code Inspired</span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-[var(--foreground-muted)]">
          <Clock size={12} />
          <span>{time}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse" />
          <span className="text-[var(--foreground-dim)]">ready</span>
        </div>
      </div>
    </div>
  );
}

