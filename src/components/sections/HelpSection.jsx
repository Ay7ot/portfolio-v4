import { motion } from "framer-motion";

export default function HelpSection() {
  const commands = [
    {
      category: "Navigation",
      items: [
        { cmd: "about", desc: "Show information about me" },
        { cmd: "projects", desc: "List all projects" },
        {
          cmd: "projects [filter]",
          desc: "Filter projects (e.g., projects fintech)",
        },
        { cmd: "project [id]", desc: "View specific project details" },
        { cmd: "skills", desc: "Display technical skills" },
        { cmd: "contact", desc: "Open contact form" },
      ],
    },
    {
      category: "Utilities",
      items: [
        { cmd: "resume", desc: "Download resume" },
        { cmd: "github", desc: "Open GitHub profile" },
        { cmd: "linkedin", desc: "Open LinkedIn profile" },
        { cmd: "email", desc: "Copy email address" },
        { cmd: "theme [dark|light]", desc: "Switch color theme" },
        { cmd: "clear", desc: "Clear terminal" },
        { cmd: "history", desc: "Show command history" },
      ],
    },
    {
      category: "Fun",
      items: [
        { cmd: "matrix", desc: "Matrix rain animation" },
        { cmd: "fortune", desc: "Get a random dev quote" },
        { cmd: "joke", desc: "Programming jokes" },
        { cmd: "cowsay [text]", desc: "Make a cow say something" },
        { cmd: "neofetch", desc: "System info display" },
        { cmd: "coffee", desc: "Get some virtual coffee" },
        { cmd: "hack", desc: "Feel like a hacker" },
        { cmd: "weather", desc: "Check the weather" },
        { cmd: "secret", desc: "???" },
      ],
    },
  ];

  return (
    <div className="space-y-3 font-mono text-sm">
      {/* Header - Claude Code style */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-2"
      >
        <span className="text-[var(--success)]">◆</span>
        <span className="text-[var(--foreground)]">Available Commands</span>
      </motion.div>

      {/* Command Categories */}
      {commands.map((category, catIndex) => (
        <motion.div
          key={category.category}
          className="space-y-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: catIndex * 0.05 }}
        >
          <div className="text-[var(--foreground-dim)] text-xs uppercase tracking-wider">
            ─ {category.category}
          </div>
          <div className="space-y-0.5 pl-2">
            {category.items.map((item, itemIndex) => (
              <motion.div
                key={item.cmd}
                className="flex items-start gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: catIndex * 0.05 + itemIndex * 0.02 }}
              >
                <span className="text-[var(--primary)] w-36 shrink-0">
                  {item.cmd}
                </span>
                <span className="text-[var(--foreground-dim)]">→</span>
                <span className="text-[var(--foreground-muted)]">
                  {item.desc}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Shortcuts - Claude Code style */}
      <motion.div
        className="pt-2 border-t border-[var(--foreground-dim)]/10 text-xs text-[var(--foreground-dim)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <span>
            <span className="text-[var(--foreground-muted)]">↑↓</span> history
          </span>
          <span>
            <span className="text-[var(--foreground-muted)]">Tab</span>{" "}
            autocomplete
          </span>
          <span>
            <span className="text-[var(--foreground-muted)]">Ctrl+C</span>{" "}
            cancel
          </span>
          <span>
            <span className="text-[var(--warning)]">clear</span> reset
          </span>
        </div>
      </motion.div>
    </div>
  );
}
