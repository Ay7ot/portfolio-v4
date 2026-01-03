import { motion } from 'framer-motion';
import skillsData from '../../data/skills.json';

export default function SkillsSection() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-lg font-bold text-[var(--foreground)] flex items-center gap-2">
          <span className="text-[var(--accent)]">⚡</span>
          Technical Skills
        </h2>
        <p className="text-sm text-[var(--foreground-dim)] mt-1">
          Technologies and tools I work with
        </p>
      </motion.div>

      {/* Divider */}
      <pre className="text-[var(--foreground-dim)] text-xs">
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      </pre>

      {/* Skill Categories */}
      <div className="space-y-6">
        {skillsData.categories.map((category, catIndex) => (
          <motion.div
            key={category.name}
            className="space-y-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: catIndex * 0.1 }}
          >
            <h3 className="text-sm font-semibold text-[var(--primary)]">
              {category.name}
            </h3>
            <div className="space-y-2">
              {category.skills.map((skill, skillIndex) => (
                <SkillBar 
                  key={skill.name} 
                  skill={skill} 
                  delay={catIndex * 0.1 + skillIndex * 0.05}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Divider */}
      <pre className="text-[var(--foreground-dim)] text-xs">
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      </pre>
    </div>
  );
}

function SkillBar({ skill, delay }) {
  const filledBlocks = Math.round(skill.level / 5);
  const emptyBlocks = 20 - filledBlocks;

  return (
    <motion.div
      className="flex items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {/* Icon & Name */}
      <div className="flex items-center gap-2 w-32 shrink-0">
        <span className="text-sm">{skill.icon}</span>
        <span className="text-sm text-[var(--foreground-muted)]">{skill.name}</span>
      </div>

      {/* Progress Bar */}
      <div className="flex-1 flex items-center gap-2">
        <motion.div 
          className="flex-1 font-mono text-xs"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: delay + 0.1, duration: 0.5 }}
        >
          <span className="text-[var(--success)]">{'█'.repeat(filledBlocks)}</span>
          <span className="text-[var(--foreground-dim)]/30">{'░'.repeat(emptyBlocks)}</span>
        </motion.div>
        
        {/* Percentage */}
        <motion.span 
          className="text-xs text-[var(--foreground-dim)] w-10 text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.3 }}
        >
          {skill.level}%
        </motion.span>
      </div>
    </motion.div>
  );
}

