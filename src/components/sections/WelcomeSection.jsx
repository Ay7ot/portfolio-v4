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

  const commands = [
    { cmd: "about", desc: "Learn about me" },
    { cmd: "projects", desc: "View my work" },
    { cmd: "skills", desc: "Technical skills" },
    { cmd: "contact", desc: "Get in touch" },
  ];
  return (
    <div className="space-y-4 font-mono">
      {/* ASCII Art Logo */}
      <motion.pre
        className="text-[var(--accent)] text-[0.45rem] sm:text-[0.55rem] md:text-xs leading-tight overflow-x-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {asciiArt}
      </motion.pre>

      {/* Welcome Message - Claude Code style */}
      <motion.div
        className="space-y-2 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <p className="text-[var(--foreground)]">
          <span className="text-[var(--success)]">✓</span> Session initialized
        </p>
        <p className="text-[var(--foreground-muted)]">
          Welcome! I'm{" "}
          <span className="text-[var(--primary)]">Ayomide Ibiteye</span>, a
          Software Engineer.
        </p>
      </motion.div>

      {/* Available Commands - Terminal style */}
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-[var(--foreground-dim)] text-xs">
          Available commands:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm">
          {commands.map((item, i) => (
            <motion.div
              key={item.cmd}
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
            >
              <span className="text-[var(--primary)]">{item.cmd}</span>
              <span className="text-[var(--foreground-dim)]">-</span>
              <span className="text-[var(--foreground-muted)]">
                {item.desc}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Hint - Claude Code style */}
      <motion.div
        className="text-xs text-[var(--foreground-dim)] pt-2 border-t border-[var(--foreground-dim)]/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-[var(--warning)]">→</span> Type{" "}
        <span className="text-[var(--warning)]">help</span> for all commands |{" "}
        <span className="text-[var(--foreground-muted)]">↑↓</span> history |{" "}
        <span className="text-[var(--foreground-muted)]">Tab</span> autocomplete
      </motion.div>
    </div>
  );
}
