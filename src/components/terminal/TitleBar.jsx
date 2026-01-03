import { useState } from "react";
import { motion } from "framer-motion";
import { X, Minus, Maximize2 } from "lucide-react";

export default function TitleBar({ onClose, onMinimize, onMaximize, isMaximized }) {
  const [hovered, setHovered] = useState(null);

  const buttons = [
    { 
      color: "bg-[#f38ba8]", 
      label: "close", 
      icon: X,
      onClick: onClose 
    },
    { 
      color: "bg-[#f9e2af]", 
      label: "minimize", 
      icon: Minus,
      onClick: onMinimize 
    },
    { 
      color: "bg-[#a6e3a1]", 
      label: "maximize", 
      icon: Maximize2,
      onClick: onMaximize 
    },
  ];

  return (
    <div
      className="flex items-center gap-4 px-4 py-3 bg-[var(--background-secondary)] border-b border-[var(--foreground-dim)]/10"
      onMouseLeave={() => setHovered(null)}
    >
      {/* Window Controls */}
      <div className="flex items-center gap-2">
        {buttons.map((btn, i) => (
          <motion.button
            key={btn.label}
            className={`window-control w-3 h-3 rounded-full ${btn.color} cursor-pointer transition-all duration-200 flex items-center justify-center !min-h-0 !min-w-0`}
            onMouseEnter={() => setHovered(i)}
            onClick={btn.onClick}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            style={{
              opacity: hovered !== null ? (hovered === i ? 1 : 0.5) : 0.8,
            }}
            title={btn.label.charAt(0).toUpperCase() + btn.label.slice(1)}
          >
            {hovered === i && (
              <btn.icon 
                size={8} 
                className="text-[var(--background-tertiary)]" 
                strokeWidth={3}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Title */}
      <div className="flex-1 flex items-center justify-center">
        <div className="flex items-center gap-2 text-[var(--foreground-muted)] text-sm">
          <span className="text-[var(--primary)]">~/</span>
          <span>ayomide</span>
          <span className="text-[var(--foreground-dim)]">—</span>
          <span className="text-[var(--accent)]">portfolio</span>
          {isMaximized && (
            <span className="text-[var(--foreground-dim)] text-xs ml-2">(fullscreen)</span>
          )}
        </div>
      </div>

      {/* Spacer for balance */}
      <div className="w-14" />
    </div>
  );
}
