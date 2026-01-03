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
  // Use window.innerHeight for better mobile support
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const variants = {
    normal: {
      opacity: 1,
      y: 0,
      scale: 1,
      height: isMobile ? "90dvh" : "85dvh",
      width: "100%",
      borderRadius: isMobile ? "8px" : "12px",
    },
    maximized: {
      opacity: 1,
      y: 0,
      scale: 1,
      height: "100dvh",
      width: "100vw",
      borderRadius: "0px",
    },
    minimized: {
      opacity: 1,
      y: 0,
      scale: 1,
      height: "48px",
      width: isMobile ? "200px" : "300px",
      borderRadius: "12px",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={variants[windowState]}
      transition={{
        duration: 0.25,
        ease: "easeInOut",
        height: { duration: 0.2 },
        width: { duration: 0.2 },
        borderRadius: { duration: 0.15 },
      }}
      className={cn(
        "relative flex flex-col gpu-accelerated",
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
