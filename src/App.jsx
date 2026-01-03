import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Terminal from "./components/terminal/Terminal";
import { RotateCcw } from "lucide-react";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [isLoading, setIsLoading] = useState(true);
  const [windowState, setWindowState] = useState("normal"); // normal, minimized, maximized, closed

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleWindowStateChange = (newState) => {
    setWindowState(newState);
  };

  const handleReopen = () => {
    setWindowState("normal");
  };

  return (
    <div
      className={`min-h-[100dvh] bg-[var(--background-tertiary)] flex items-center justify-center transition-all duration-300 ${
        windowState === "maximized" ? "p-0" : "p-2 sm:p-4 md:p-8"
      }`}
    >
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Gradient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[var(--primary)] rounded-full blur-[120px] opacity-10" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[var(--accent)] rounded-full blur-[120px] opacity-10" />
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : windowState === "closed" ? (
          <ClosedState key="closed" onReopen={handleReopen} />
        ) : (
          <motion.main
            key="terminal"
            className={`relative z-10 w-full flex items-center justify-center ${
              windowState === "maximized" ? "" : "max-w-5xl mx-auto"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Terminal
              theme={theme}
              setTheme={setTheme}
              windowState={windowState}
              onWindowStateChange={handleWindowStateChange}
            />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

function ClosedState({ onReopen }) {
  // Keyboard listener for reopening
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        onReopen();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [onReopen]);

  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-8 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      {/* Terminal Icon */}
      <motion.div
        className="w-24 h-24 rounded-2xl bg-[var(--background)] border border-[var(--foreground-dim)]/20 flex items-center justify-center terminal-glow"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#f38ba8] opacity-60" />
          <div className="w-3 h-3 rounded-full bg-[#f9e2af] opacity-60" />
          <div className="w-3 h-3 rounded-full bg-[#a6e3a1] opacity-60" />
        </div>
      </motion.div>

      {/* Message */}
      <motion.div
        className="space-y-2"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          Terminal Closed
        </h2>
        <p className="text-[var(--foreground-muted)] text-sm">
          Thanks for visiting! Click below to reopen the terminal.
        </p>
      </motion.div>

      {/* Reopen Button */}
      <motion.button
        onClick={onReopen}
        className="flex items-center gap-2 px-6 py-3 bg-[var(--primary)] text-[var(--background)] rounded-lg font-medium hover:opacity-90 transition-all duration-200"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <RotateCcw size={18} />
        Reopen Terminal
      </motion.button>

      {/* Keyboard hint */}
      <motion.p
        className="text-xs text-[var(--foreground-dim)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Press{" "}
        <kbd className="px-1.5 py-0.5 bg-[var(--background-secondary)] rounded text-[var(--foreground-muted)]">
          Space
        </kbd>{" "}
        or{" "}
        <kbd className="px-1.5 py-0.5 bg-[var(--background-secondary)] rounded text-[var(--foreground-muted)]">
          Enter
        </kbd>{" "}
        to reopen
      </motion.p>
    </motion.div>
  );
}

function LoadingScreen() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* ASCII Logo */}
      <motion.pre
        className="text-[var(--accent)] text-[0.4rem] sm:text-[0.6rem] leading-tight font-bold"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {`
   █████╗ ██╗   ██╗ ██████╗ ███╗   ███╗██╗██████╗ ███████╗
  ██╔══██╗╚██╗ ██╔╝██╔═══██╗████╗ ████║██║██╔══██╗██╔════╝
  ███████║ ╚████╔╝ ██║   ██║██╔████╔██║██║██║  ██║█████╗  
  ██╔══██║  ╚██╔╝  ██║   ██║██║╚██╔╝██║██║██║  ██║██╔══╝  
  ██║  ██║   ██║   ╚██████╔╝██║ ╚═╝ ██║██║██████╔╝███████╗
  ╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝     ╚═╝╚═╝╚═════╝ ╚══════╝
`}
      </motion.pre>

      {/* Loading Bar */}
      <div className="w-64 h-1 bg-[var(--background-secondary)] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[var(--primary)]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </div>

      {/* Loading Text */}
      <motion.p
        className="text-[var(--foreground-muted)] text-sm font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <span className="text-[var(--success)]">$</span> Initializing portfolio
        {dots}
      </motion.p>
    </motion.div>
  );
}
