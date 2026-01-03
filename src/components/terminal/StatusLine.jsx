import { useState, useEffect } from 'react';
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
    <div className="flex items-center justify-between px-3 py-1.5 bg-[var(--background-secondary)] border-t border-[var(--foreground-dim)]/10 text-xs font-mono">
      {/* Left side - Mode indicator */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-[var(--foreground-muted)]">
          <span className="text-[var(--success)]">●</span>
          <span>NORMAL</span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-[var(--foreground-dim)]">
          <span>⎇</span>
          <span className="text-[var(--primary)]">main</span>
        </div>
      </div>

      {/* Center - Model info like Claude Code */}
      <div className="flex items-center gap-1.5 text-[var(--accent)]">
        <span>◆</span>
        <span className="hidden sm:inline">claude-portfolio</span>
        <span className="sm:hidden">v4</span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 text-[var(--foreground-dim)]">
        <span className="hidden sm:inline">{time}</span>
        <div className="flex items-center gap-1">
          <span className="text-[var(--success)]">↑↓</span>
          <span>history</span>
        </div>
        <div className="hidden sm:flex items-center gap-1">
          <span className="text-[var(--warning)]">⇥</span>
          <span>tab</span>
        </div>
      </div>
    </div>
  );
}

