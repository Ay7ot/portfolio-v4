import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Github, Linkedin, Twitter, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import aboutData from '../../data/about.json';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    setStatus('sending');
    
    // Simulate sending (replace with actual email service)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For now, just show success - integrate with actual service later
    setStatus('success');
    
    // Open mailto as fallback
    const mailtoLink = `mailto:${aboutData.social.email}?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${formData.name} (${formData.email})`;
    window.open(mailtoLink, '_blank');
    
    setTimeout(() => {
      setStatus('idle');
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: aboutData.social.github, color: 'var(--foreground)' },
    { name: 'LinkedIn', icon: Linkedin, href: aboutData.social.linkedin, color: '#0077b5' },
    { name: 'Twitter', icon: Twitter, href: aboutData.social.twitter, color: '#1da1f2' },
    { name: 'Email', icon: Mail, href: `mailto:${aboutData.social.email}`, color: 'var(--accent)' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-lg font-bold text-[var(--foreground)] flex items-center gap-2">
          <span className="text-[var(--accent)]">📧</span>
          Let's get in touch!
        </h2>
        <p className="text-sm text-[var(--foreground-dim)] mt-1">
          Have a project in mind? Let's work together.
        </p>
      </motion.div>

      {/* Contact Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {/* Name Field */}
        <div className="space-y-1">
          <label className="text-xs text-[var(--foreground-dim)] uppercase tracking-wider">
            Name
          </label>
          <div className={`flex items-center gap-2 p-3 bg-[var(--background-secondary)] rounded-lg border transition-colors ${
            focusedField === 'name' ? 'border-[var(--primary)]' : 'border-[var(--foreground-dim)]/10'
          }`}>
            <span className="text-[var(--primary)]">$</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              placeholder="John Doe"
              className="flex-1 bg-transparent text-base text-[var(--foreground)] outline-none placeholder:text-[var(--foreground-dim)]"
              disabled={status === 'sending'}
            />
            {focusedField === 'name' && (
              <span className="text-[var(--accent)] cursor-blink">▊</span>
            )}
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-1">
          <label className="text-xs text-[var(--foreground-dim)] uppercase tracking-wider">
            Email
          </label>
          <div className={`flex items-center gap-2 p-3 bg-[var(--background-secondary)] rounded-lg border transition-colors ${
            focusedField === 'email' ? 'border-[var(--primary)]' : 'border-[var(--foreground-dim)]/10'
          }`}>
            <span className="text-[var(--primary)]">$</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              placeholder="john@example.com"
              className="flex-1 bg-transparent text-base text-[var(--foreground)] outline-none placeholder:text-[var(--foreground-dim)]"
              disabled={status === 'sending'}
            />
            {focusedField === 'email' && (
              <span className="text-[var(--accent)] cursor-blink">▊</span>
            )}
          </div>
        </div>

        {/* Message Field */}
        <div className="space-y-1">
          <label className="text-xs text-[var(--foreground-dim)] uppercase tracking-wider">
            Message
          </label>
          <div className={`p-3 bg-[var(--background-secondary)] rounded-lg border transition-colors ${
            focusedField === 'message' ? 'border-[var(--primary)]' : 'border-[var(--foreground-dim)]/10'
          }`}>
            <div className="flex items-start gap-2">
              <span className="text-[var(--primary)]">$</span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                placeholder="Tell me about your project..."
                rows={4}
                className="flex-1 bg-transparent text-base text-[var(--foreground)] outline-none placeholder:text-[var(--foreground-dim)] resize-none"
                disabled={status === 'sending'}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={status === 'sending' || !formData.name || !formData.email || !formData.message}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--background)] rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            {status === 'sending' ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Sending...
              </>
            ) : status === 'success' ? (
              <>
                <CheckCircle size={16} />
                Sent!
              </>
            ) : status === 'error' ? (
              <>
                <XCircle size={16} />
                Error
              </>
            ) : (
              <>
                <Send size={16} />
                Send Message
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setFormData({ name: '', email: '', message: '' })}
            className="px-4 py-2 text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
          >
            Cancel
          </button>
        </div>
      </motion.form>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 border-t border-[var(--foreground-dim)]/20" />
        <span className="text-xs text-[var(--foreground-dim)]">or connect directly</span>
        <div className="flex-1 border-t border-[var(--foreground-dim)]/20" />
      </div>

      {/* Social Links */}
      <motion.div 
        className="flex flex-wrap gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {socialLinks.map((link, i) => (
          <motion.a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-[var(--background-secondary)] rounded-lg border border-[var(--foreground-dim)]/10 text-[var(--foreground-muted)] hover:text-[var(--primary)] hover:border-[var(--primary)]/30 transition-all duration-200"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.05 }}
          >
            <link.icon size={16} />
            <span className="text-sm">{link.name}</span>
          </motion.a>
        ))}
      </motion.div>

      {/* Email Hint */}
      <p className="text-xs text-[var(--foreground-dim)]">
        💡 Tip: You can also run <code className="text-[var(--warning)]">email</code> to copy my email address
      </p>
    </div>
  );
}

