import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import TitleBar from "./TitleBar";
import StatusLine from "./StatusLine";

export default function TerminalWindow({ children, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "relative flex flex-col w-full max-w-5xl",
        "bg-[var(--background)] rounded-xl overflow-hidden",
        "terminal-glow border border-[var(--foreground-dim)]/20",
        "h-[85vh]",
        className
      )}
    >
      {/* Scanlines effect overlay */}
      <div className="absolute inset-0 pointer-events-none scanlines opacity-50" />

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

      <TitleBar />

      <div className="flex-1 overflow-hidden flex flex-col relative">
        {children}
      </div>

      <StatusLine />
    </motion.div>
  );
}
