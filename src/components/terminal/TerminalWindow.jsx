import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import TitleBar from "./TitleBar";
import StatusLine from "./StatusLine";

export default function TerminalWindow({
  children,
  className,
  windowState = "normal",
  onClose,
  onMinimize,
  onMaximize,
  onRestore,
}) {
  const isMaximized = windowState === "maximized";
  const isMinimized = windowState === "minimized";

  // Animation variants for different states
  const variants = {
    normal: {
      opacity: 1,
      y: 0,
      scale: 1,
      height: "85vh",
      width: "100%",
      borderRadius: "12px",
    },
    maximized: {
      opacity: 1,
      y: 0,
      scale: 1,
      height: "100vh",
      width: "100vw",
      borderRadius: "0px",
    },
    minimized: {
      opacity: 1,
      y: 0,
      scale: 1,
      height: "48px",
      width: "300px",
      borderRadius: "12px",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={variants[windowState]}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
        height: { duration: 0.3 },
        width: { duration: 0.3 },
        borderRadius: { duration: 0.2 },
      }}
      className={cn(
        "relative flex flex-col",
        "bg-[var(--background)] overflow-hidden",
        "terminal-glow border border-[var(--foreground-dim)]/20",
        isMaximized ? "fixed inset-0 z-50 max-w-none" : "max-w-5xl",
        isMinimized && "cursor-pointer",
        className
      )}
      onClick={isMinimized ? onRestore : undefined}
    >
      {/* Scanlines effect overlay */}
      <div className="absolute inset-0 pointer-events-none scanlines opacity-50" />

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

      <TitleBar
        onClose={onClose}
        onMinimize={onMinimize}
        onMaximize={onMaximize}
        isMaximized={isMaximized}
      />

      {/* Only show content when not minimized */}
      {!isMinimized && (
        <>
          <div className="flex-1 overflow-hidden flex flex-col relative">
            {children}
          </div>
          <StatusLine />
        </>
      )}

      {/* Minimized hint */}
      {isMinimized && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <span className="text-xs text-[var(--foreground-dim)] ml-20">
            Click to restore
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}
