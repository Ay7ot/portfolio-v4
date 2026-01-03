import { motion } from "framer-motion";

export default function WelcomeSection() {
  const asciiArt = `
   █████╗ ██╗   ██╗ ██████╗ ███╗   ███╗██╗██████╗ ███████╗
  ██╔══██╗╚██╗ ██╔╝██╔═══██╗████╗ ████║██║██╔══██╗██╔════╝
  ███████║ ╚████╔╝ ██║   ██║██╔████╔██║██║██║  ██║█████╗  
  ██╔══██║  ╚██╔╝  ██║   ██║██║╚██╔╝██║██║██║  ██║██╔══╝  
  ██║  ██║   ██║   ╚██████╔╝██║ ╚═╝ ██║██║██████╔╝███████╗
  ╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝     ╚═╝╚═╝╚═════╝ ╚══════╝
`;

  return (
    <div className="space-y-6">
      {/* ASCII Art Logo */}
      <motion.pre
        className="text-[var(--accent)] text-[0.5rem] sm:text-xs leading-tight font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {asciiArt}
      </motion.pre>

      {/* Welcome Message */}
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <p className="text-[var(--foreground)] text-sm">
          Welcome to my interactive portfolio terminal! 👋
        </p>
        <p className="text-[var(--foreground-muted)] text-sm">
          I'm{" "}
          <span className="text-[var(--primary)] font-semibold">
            Ayomide Ibiteye
          </span>
          , a Frontend Developer crafting exceptional digital experiences.
        </p>
      </motion.div>

      {/* Quick Start Commands */}
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <p className="text-[var(--foreground-dim)] text-xs uppercase tracking-wider">
          Quick Commands
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {["about", "projects", "skills", "contact"].map((cmd, i) => (
            <motion.div
              key={cmd}
              className="px-3 py-2 bg-[var(--background-secondary)] rounded-lg border border-[var(--foreground-dim)]/10 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <code className="text-[var(--primary)] text-sm">{cmd}</code>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Hint */}
      <motion.p
        className="text-[var(--foreground-dim)] text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        Type{" "}
        <code className="text-[var(--warning)] bg-[var(--background-secondary)] px-1.5 py-0.5 rounded">
          help
        </code>{" "}
        to see all available commands
      </motion.p>
    </div>
  );
}
