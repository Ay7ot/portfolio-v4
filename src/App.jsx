import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Terminal from "./components/terminal/Terminal";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="min-h-screen bg-[var(--background-tertiary)] p-4 sm:p-8 flex items-center justify-center">
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
        ) : (
          <motion.main
            key="terminal"
            className="relative z-10 w-full max-w-5xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Terminal theme={theme} setTheme={setTheme} />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
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
