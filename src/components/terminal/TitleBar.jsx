import { useState } from 'react';
import { motion } from 'framer-motion';

export default function TitleBar() {
  const [hovered, setHovered] = useState(null);

  const buttons = [
    { color: 'bg-[#f38ba8]', hoverColor: 'bg-[#f38ba8]', label: 'close' },
    { color: 'bg-[#f9e2af]', hoverColor: 'bg-[#f9e2af]', label: 'minimize' },
    { color: 'bg-[#a6e3a1]', hoverColor: 'bg-[#a6e3a1]', label: 'maximize' },
  ];

  return (
    <div 
      className="flex items-center gap-4 px-4 py-3 bg-[var(--background-secondary)] border-b border-[var(--foreground-dim)]/10"
      onMouseLeave={() => setHovered(null)}
    >
      {/* Window Controls */}
      <div className="flex items-center gap-2">
        {buttons.map((btn, i) => (
          <motion.div
            key={btn.label}
            className={`w-3 h-3 rounded-full ${btn.color} cursor-pointer transition-all duration-200`}
            onMouseEnter={() => setHovered(i)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              opacity: hovered !== null ? (hovered === i ? 1 : 0.5) : 0.8
            }}
          />
        ))}
      </div>

      {/* Title */}
      <div className="flex-1 flex items-center justify-center">
        <div className="flex items-center gap-2 text-[var(--foreground-muted)] text-sm">
          <span className="text-[var(--primary)]">~/</span>
          <span>ayomide</span>
          <span className="text-[var(--foreground-dim)]">—</span>
          <span className="text-[var(--accent)]">portfolio</span>
        </div>
      </div>

      {/* Spacer for balance */}
      <div className="w-14" />
    </div>
  );
}

