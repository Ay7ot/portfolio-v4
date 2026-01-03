import { useCallback } from 'react';
import WelcomeSection from '../components/sections/WelcomeSection';
import AboutSection from '../components/sections/AboutSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import SkillsSection from '../components/sections/SkillsSection';
import ContactSection from '../components/sections/ContactSection';
import HelpSection from '../components/sections/HelpSection';
import MatrixEffect from '../components/ui/MatrixEffect';
import aboutData from '../data/about.json';

const devQuotes = [
  "\"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.\" - Martin Fowler",
  "\"First, solve the problem. Then, write the code.\" - John Johnson",
  "\"Code is like humor. When you have to explain it, it's bad.\" - Cory House",
  "\"Programming isn't about what you know; it's about what you can figure out.\" - Chris Pine",
  "\"The best error message is the one that never shows up.\" - Thomas Fuchs",
  "\"Simplicity is the soul of efficiency.\" - Austin Freeman",
  "\"Make it work, make it right, make it fast.\" - Kent Beck",
  "\"Clean code always looks like it was written by someone who cares.\" - Robert C. Martin",
  "\"It's not a bug – it's an undocumented feature.\" - Anonymous",
  "\"Talk is cheap. Show me the code.\" - Linus Torvalds"
];

export default function useCommands({ setMessages, setTheme, theme, clearMessages }) {
  
  const addMessage = useCallback((content, type = 'output', command = null) => {
    const newMessage = {
      id: Date.now() + Math.random(),
      type,
      content,
      command,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  }, [setMessages]);

  const executeCommand = useCallback((input) => {
    const parts = input.trim().toLowerCase().split(/\s+/);
    const command = parts[0];
    const args = parts.slice(1);

    // Add the command to output
    addMessage(null, 'command', input);

    switch (command) {
      case 'help':
      case '?':
        addMessage(<HelpSection />);
        break;

      case 'about':
      case 'whoami':
        if (command === 'whoami') {
          addMessage(
            `You are currently using Ayomide's interactive portfolio terminal.
Built with React, Framer Motion, and TailwindCSS.
Inspired by Claude Code - Anthropic's agentic coding tool.

Type 'about' to learn more about me, or 'help' for available commands.`,
            'info'
          );
        } else {
          addMessage(<AboutSection />);
        }
        break;

      case 'projects':
        const filter = args.length > 0 ? args.join(' ') : null;
        addMessage(<ProjectsSection filter={filter} />);
        break;

      case 'project':
        if (args.length === 0) {
          addMessage('Usage: project [id]\nExample: project invoyce\n\nType "projects" to see all available projects.', 'warning');
        } else {
          addMessage(<ProjectsSection projectId={args.join(' ')} />);
        }
        break;

      case 'skills':
        addMessage(<SkillsSection />);
        break;

      case 'contact':
        addMessage(<ContactSection />);
        break;

      case 'clear':
      case 'cls':
        clearMessages();
        addMessage(<WelcomeSection />);
        break;

      case 'theme':
        const newTheme = args[0] || (theme === 'dark' ? 'light' : 'dark');
        if (newTheme === 'dark' || newTheme === 'light') {
          setTheme(newTheme);
          addMessage(`✓ Theme switched to ${newTheme} mode`, 'success');
        } else {
          addMessage('Usage: theme [dark|light]\nExample: theme dark', 'warning');
        }
        break;

      case 'github':
        window.open(aboutData.social.github, '_blank');
        addMessage(`✓ Opening GitHub profile...`, 'success');
        break;

      case 'linkedin':
        window.open(aboutData.social.linkedin, '_blank');
        addMessage(`✓ Opening LinkedIn profile...`, 'success');
        break;

      case 'email':
        navigator.clipboard?.writeText(aboutData.social.email);
        addMessage(`✓ Email copied to clipboard: ${aboutData.social.email}`, 'success');
        break;

      case 'resume':
      case 'cv':
        addMessage(`📄 Resume download feature coming soon!\nFor now, contact me at ${aboutData.social.email}`, 'info');
        break;

      case 'matrix':
        addMessage(<MatrixEffect />);
        break;

      case 'fortune':
        const quote = devQuotes[Math.floor(Math.random() * devQuotes.length)];
        addMessage(`🔮 ${quote}`, 'info');
        break;

      case 'history':
        addMessage('Use ↑/↓ arrow keys to navigate through command history', 'info');
        break;

      case 'date':
      case 'time':
        const now = new Date();
        addMessage(`📅 ${now.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })}`, 'info');
        break;

      case 'echo':
        if (args.length > 0) {
          addMessage(args.join(' '));
        }
        break;

      case 'cowsay':
        const text = args.length > 0 ? args.join(' ') : 'Moo!';
        const bubble = `
 ${'_'.repeat(text.length + 2)}
< ${text} >
 ${'-'.repeat(text.length + 2)}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
`;
        addMessage(<pre className="text-[var(--foreground)] text-xs">{bubble}</pre>);
        break;

      case 'ls':
        addMessage(`
📁 portfolio/
├── 📄 about.md
├── 📁 projects/
│   ├── 📄 invoyce
│   ├── 📄 dotzee
│   ├── 📄 gastracka
│   └── ... (${13} more)
├── 📁 skills/
│   └── 📄 tech-stack.json
└── 📄 contact.md

Use 'about', 'projects', 'skills', or 'contact' to explore.
        `, 'info');
        break;

      case 'pwd':
        addMessage('~/ayomide/portfolio', 'info');
        break;

      case 'sudo':
        addMessage('Nice try! 😏 But you don\'t need sudo powers here.', 'warning');
        break;

      case 'exit':
      case 'quit':
        addMessage('Thanks for visiting! Refresh the page to start again. 👋', 'info');
        break;

      case 'hello':
      case 'hi':
      case 'hey':
        addMessage(`Hello there! 👋 Welcome to my portfolio. Type 'help' to see what you can do.`, 'info');
        break;

      default:
        addMessage(
          `Command not found: ${command}
Type 'help' to see available commands.`,
          'error'
        );
    }
  }, [addMessage, clearMessages, setTheme, theme]);

  return { executeCommand, addMessage };
}

