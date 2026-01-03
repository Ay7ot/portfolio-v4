import { motion } from 'framer-motion';

export default function HelpSection() {
  const commands = [
    {
      category: 'Navigation',
      items: [
        { cmd: 'about', desc: 'Show information about me' },
        { cmd: 'projects', desc: 'List all projects' },
        { cmd: 'projects [filter]', desc: 'Filter projects (e.g., projects fintech)' },
        { cmd: 'project [id]', desc: 'View specific project details' },
        { cmd: 'skills', desc: 'Display technical skills' },
        { cmd: 'contact', desc: 'Open contact form' },
      ]
    },
    {
      category: 'Utilities',
      items: [
        { cmd: 'resume', desc: 'Download resume' },
        { cmd: 'github', desc: 'Open GitHub profile' },
        { cmd: 'linkedin', desc: 'Open LinkedIn profile' },
        { cmd: 'email', desc: 'Copy email address' },
        { cmd: 'theme [dark|light]', desc: 'Switch color theme' },
        { cmd: 'clear', desc: 'Clear terminal' },
        { cmd: 'history', desc: 'Show command history' },
      ]
    },
    {
      category: 'Fun',
      items: [
        { cmd: 'matrix', desc: 'Matrix rain animation' },
        { cmd: 'fortune', desc: 'Get a random dev quote' },
        { cmd: 'whoami', desc: 'About this terminal' },
      ]
    }
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <pre className="text-[var(--foreground)] text-sm">
Available Commands:
        </pre>
        <pre className="text-[var(--foreground-dim)] text-xs">
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        </pre>
      </motion.div>

      {/* Command Categories */}
      {commands.map((category, catIndex) => (
        <motion.div
          key={category.category}
          className="space-y-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: catIndex * 0.1 }}
        >
          <h3 className="text-sm font-semibold text-[var(--primary)]">
            {category.category}:
          </h3>
          <div className="space-y-1 pl-2">
            {category.items.map((item, itemIndex) => (
              <motion.div
                key={item.cmd}
                className="flex items-start gap-4 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: catIndex * 0.1 + itemIndex * 0.03 }}
              >
                <code className="text-[var(--warning)] w-32 shrink-0">{item.cmd}</code>
                <span className="text-[var(--foreground-muted)]">{item.desc}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Divider */}
      <pre className="text-[var(--foreground-dim)] text-xs">
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      </pre>

      {/* Tips */}
      <motion.div
        className="text-xs text-[var(--foreground-dim)] space-y-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p>💡 Tips:</p>
        <p>  • Use <span className="text-[var(--primary)]">↑/↓</span> to navigate command history</p>
        <p>  • Press <span className="text-[var(--primary)]">Tab</span> for auto-completion</p>
        <p>  • Type any command followed by <span className="text-[var(--warning)]">--help</span> for more info</p>
      </motion.div>
    </div>
  );
}

