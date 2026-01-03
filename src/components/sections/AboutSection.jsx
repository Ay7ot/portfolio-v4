import { motion } from 'framer-motion';
import { User, MapPin, Mail, Github, Linkedin, Twitter } from 'lucide-react';
import aboutData from '../../data/about.json';

export default function AboutSection() {
  const iconMap = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    email: Mail
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--primary)] flex items-center justify-center overflow-hidden">
          <img 
            src="/ayomide.jpg" 
            alt="Ayomide" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<span class="text-2xl">👨‍💻</span>';
            }}
          />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[var(--foreground)]">{aboutData.name}</h2>
          <p className="text-[var(--primary)]">{aboutData.title}</p>
          <div className="flex items-center gap-1 text-[var(--foreground-dim)] text-sm">
            <MapPin size={12} />
            <span>{aboutData.location}</span>
          </div>
        </div>
      </motion.div>

      {/* Divider */}
      <div className="border-t border-[var(--foreground-dim)]/20" />

      {/* Bio */}
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {aboutData.bio.map((paragraph, i) => (
          <motion.p 
            key={i}
            className="text-sm text-[var(--foreground-muted)] leading-relaxed"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
          >
            {paragraph}
          </motion.p>
        ))}
      </motion.div>

      {/* Highlights */}
      <motion.div 
        className="space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-xs uppercase tracking-wider text-[var(--foreground-dim)]">Highlights</h3>
        <div className="grid gap-2">
          {aboutData.highlights.map((highlight, i) => (
            <motion.div
              key={i}
              className="px-3 py-2 bg-[var(--background-secondary)] rounded-lg border border-[var(--foreground-dim)]/10 text-sm"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.05 }}
            >
              {highlight}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Social Links */}
      <motion.div 
        className="space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-xs uppercase tracking-wider text-[var(--foreground-dim)]">Connect</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(aboutData.social).map(([key, value]) => {
            const Icon = iconMap[key] || User;
            return (
              <a
                key={key}
                href={key === 'email' ? `mailto:${value}` : value}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-[var(--background-secondary)] rounded-lg border border-[var(--foreground-dim)]/10 text-sm text-[var(--foreground-muted)] hover:text-[var(--primary)] hover:border-[var(--primary)]/30 transition-all duration-200"
              >
                <Icon size={14} />
                <span className="capitalize">{key}</span>
              </a>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

