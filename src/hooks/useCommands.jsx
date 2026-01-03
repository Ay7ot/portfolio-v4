import { useCallback } from "react";
import WelcomeSection from "../components/sections/WelcomeSection";
import AboutSection from "../components/sections/AboutSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import SkillsSection from "../components/sections/SkillsSection";
import ContactSection from "../components/sections/ContactSection";
import HelpSection from "../components/sections/HelpSection";
import MatrixEffect from "../components/ui/MatrixEffect";
import aboutData from "../data/about.json";

const devQuotes = [
  '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." - Martin Fowler',
  '"First, solve the problem. Then, write the code." - John Johnson',
  '"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
  "\"Programming isn't about what you know; it's about what you can figure out.\" - Chris Pine",
  '"The best error message is the one that never shows up." - Thomas Fuchs',
  '"Simplicity is the soul of efficiency." - Austin Freeman',
  '"Make it work, make it right, make it fast." - Kent Beck',
  '"Clean code always looks like it was written by someone who cares." - Robert C. Martin',
  "\"It's not a bug – it's an undocumented feature.\" - Anonymous",
  '"Talk is cheap. Show me the code." - Linus Torvalds',
];

const jokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
  "A SQL query walks into a bar, walks up to two tables and asks... 'Can I join you?'",
  "Why do Java developers wear glasses? Because they can't C#! 👓",
  "There are only 10 types of people in the world: those who understand binary and those who don't.",
  "A programmer's wife tells him: 'Go to the store and buy a loaf of bread. If they have eggs, buy a dozen.' He comes home with 12 loaves of bread.",
  "Why was the JavaScript developer sad? Because he didn't Node how to Express himself! 😢",
  "What's a programmer's favorite hangout place? Foo Bar! 🍺",
  "How many programmers does it take to change a light bulb? None, that's a hardware problem!",
  "Why do programmers always mix up Halloween and Christmas? Because Oct 31 == Dec 25! 🎃🎄",
  "['hip', 'hip'] // hooray!",
  "A programmer puts two glasses on his bedside table before going to sleep. A full one, in case he gets thirsty, and an empty one, in case he doesn't.",
  "What's the object-oriented way to become wealthy? Inheritance! 💰",
];

const hackerPhrases = [
  "Initializing kernel bypass...",
  "Decrypting mainframe access codes...",
  "Bypassing firewall protocols...",
  "Injecting SQL into the Gibson...",
  "Accessing NSA backdoor...",
  "Downloading more RAM...",
  "Hacking the planet...",
  "Entering the Matrix...",
  "Triangulating IP address...",
  "Cracking SHA-256 encryption...",
  "Uploading virus.exe...",
  "Access granted! Just kidding 😄",
];

export default function useCommands({
  setMessages,
  setTheme,
  theme,
  clearMessages,
}) {
  const addMessage = useCallback(
    (content, type = "output", command = null) => {
      const newMessage = {
        id: Date.now() + Math.random(),
        type,
        content,
        command,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMessage]);
      return newMessage;
    },
    [setMessages]
  );

  const executeCommand = useCallback(
    (input) => {
      const parts = input.trim().toLowerCase().split(/\s+/);
      const command = parts[0];
      const args = parts.slice(1);

      // Add the command to output
      addMessage(null, "command", input);

      switch (command) {
        case "help":
        case "?":
          addMessage(<HelpSection />);
          break;

        case "about":
        case "whoami":
          if (command === "whoami") {
            addMessage(
              `You are currently using Ayomide's interactive portfolio terminal.
Built with React, Framer Motion, and TailwindCSS.
Inspired by Claude Code - Anthropic's agentic coding tool.

Type 'about' to learn more about me, or 'help' for available commands.`,
              "info"
            );
          } else {
            addMessage(<AboutSection />);
          }
          break;

        case "projects":
          const filter = args.length > 0 ? args.join(" ") : null;
          addMessage(<ProjectsSection filter={filter} />);
          break;

        case "project":
          if (args.length === 0) {
            addMessage(
              'Usage: project [id]\nExample: project invoyce\n\nType "projects" to see all available projects.',
              "warning"
            );
          } else {
            addMessage(<ProjectsSection projectId={args.join(" ")} />);
          }
          break;

        case "skills":
          addMessage(<SkillsSection />);
          break;

        case "contact":
          addMessage(<ContactSection />);
          break;

        case "clear":
        case "cls":
          clearMessages();
          addMessage(<WelcomeSection />);
          break;

        case "theme":
          const newTheme = args[0] || (theme === "dark" ? "light" : "dark");
          if (newTheme === "dark" || newTheme === "light") {
            setTheme(newTheme);
            addMessage(`✓ Theme switched to ${newTheme} mode`, "success");
          } else {
            addMessage(
              "Usage: theme [dark|light]\nExample: theme dark",
              "warning"
            );
          }
          break;

        case "github":
          window.open(aboutData.social.github, "_blank");
          addMessage(`✓ Opening GitHub profile...`, "success");
          break;

        case "linkedin":
          window.open(aboutData.social.linkedin, "_blank");
          addMessage(`✓ Opening LinkedIn profile...`, "success");
          break;

        case "email":
          navigator.clipboard?.writeText(aboutData.social.email);
          addMessage(
            `✓ Email copied to clipboard: ${aboutData.social.email}`,
            "success"
          );
          break;

        case "resume":
        case "cv":
          addMessage(
            `📄 Resume download feature coming soon!\nFor now, contact me at ${aboutData.social.email}`,
            "info"
          );
          break;

        case "matrix":
          addMessage(<MatrixEffect />);
          break;

        case "fortune":
          const quote = devQuotes[Math.floor(Math.random() * devQuotes.length)];
          addMessage(`🔮 ${quote}`, "info");
          break;

        case "history":
          addMessage(
            "Use ↑/↓ arrow keys to navigate through command history",
            "info"
          );
          break;

        case "date":
        case "time":
          const now = new Date();
          addMessage(
            `📅 ${now.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}`,
            "info"
          );
          break;

        case "echo":
          if (args.length > 0) {
            addMessage(args.join(" "));
          }
          break;

        case "cowsay":
          const text = args.length > 0 ? args.join(" ") : "Moo!";
          const bubble = `
 ${"_".repeat(text.length + 2)}
< ${text} >
 ${"-".repeat(text.length + 2)}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
`;
          addMessage(
            <pre className="text-[var(--foreground)] text-xs">{bubble}</pre>
          );
          break;

        case "ls":
          addMessage(
            `
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
        `,
            "info"
          );
          break;

        case "pwd":
          addMessage("~/ayomide/portfolio", "info");
          break;

        case "sudo":
          addMessage(
            "Nice try! 😏 But you don't need sudo powers here.",
            "warning"
          );
          break;

        case "exit":
        case "quit":
          addMessage(
            "Thanks for visiting! Refresh the page to start again. 👋",
            "info"
          );
          break;

        case "hello":
        case "hi":
        case "hey":
          addMessage(
            `Hello there! 👋 Welcome to my portfolio. Type 'help' to see what you can do.`,
            "info"
          );
          break;

        case "joke":
          const joke = jokes[Math.floor(Math.random() * jokes.length)];
          addMessage(`😂 ${joke}`, "info");
          break;

        case "neofetch":
        case "sysinfo":
          const neofetchOutput = `
                   .                    user@portfolio
                  / \\                   ---------------
                 /   \\                  OS: Portfolio OS v4.0
                /^.   \\                 Host: Ayomide's Terminal
               /  .-.  \\                Kernel: React 18.x
              /  (   ) _\\               Uptime: Since you arrived
             / _.~   ~._^\\              Packages: npm (many)
            /.^ \\     /.^.\\             Shell: portfolio-shell
                                        Terminal: Claude Code Inspired
   ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀         Theme: ${theme}
   ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄         CPU: Your Brain @ ∞ GHz
                                        Memory: Unlimited Creativity
`;
          addMessage(
            <pre className="text-xs font-mono">
              <span className="text-[var(--primary)]">{neofetchOutput}</span>
            </pre>
          );
          break;

        case "coffee":
        case "brew":
          const coffeeArt = `
        ( (
         ) )
      ........
      |      |]
      \\      /
       \`----'
    
  ☕ Here's your coffee!
  Keep coding! 💪
`;
          addMessage(
            <pre className="text-[var(--warning)] text-xs">{coffeeArt}</pre>
          );
          break;

        case "flip":
        case "tableflip":
          addMessage(`(╯°□°)╯︵ ┻━┻`, "info");
          break;

        case "unflip":
          addMessage(`┬─┬ノ( º _ ºノ)`, "info");
          break;

        case "shrug":
          addMessage(`¯\\_(ツ)_/¯`, "info");
          break;

        case "lenny":
          addMessage(`( ͡° ͜ʖ ͡°)`, "info");
          break;

        case "hack":
        case "hacker":
          // Simulate hacking animation
          const hackSequence = async () => {
            for (let i = 0; i < 5; i++) {
              const phrase =
                hackerPhrases[Math.floor(Math.random() * hackerPhrases.length)];
              addMessage(`[${">".repeat(i + 1)}] ${phrase}`, "warning");
              await new Promise((r) => setTimeout(r, 400));
            }
            addMessage(
              "✓ Just kidding! This is just a portfolio 😄",
              "success"
            );
          };
          hackSequence();
          break;

        case "weather":
          const weatherIcons = ["☀️", "⛅", "🌧️", "❄️", "🌈"];
          const temps = [72, 68, 75, 65, 80, 55, 60];
          const conditions = [
            "Sunny",
            "Partly Cloudy",
            "Rainy",
            "Snowy",
            "Perfect Coding Weather",
          ];
          const icon =
            weatherIcons[Math.floor(Math.random() * weatherIcons.length)];
          const temp = temps[Math.floor(Math.random() * temps.length)];
          const condition =
            conditions[Math.floor(Math.random() * conditions.length)];
          addMessage(
            `${icon} Weather Report
━━━━━━━━━━━━━━━━━━
Location: Your Computer
Temp: ${temp}°F / ${Math.round(((temp - 32) * 5) / 9)}°C
Condition: ${condition}
Humidity: Perfect for coding
Forecast: 100% chance of productivity`,
            "info"
          );
          break;

        case "cat":
          const catArt = `
    /\\_/\\  
   ( o.o ) 
    > ^ <
   /|   |\\
  (_|   |_)

  Meow! 🐱
`;
          addMessage(
            <pre className="text-[var(--accent)] text-xs">{catArt}</pre>
          );
          break;

        case "dog":
          const dogArt = `
      / \\__
     (    @\\___
     /         O
    /   (_____/
   /_____/   U

  Woof! 🐕
`;
          addMessage(
            <pre className="text-[var(--warning)] text-xs">{dogArt}</pre>
          );
          break;

        case "parrot":
        case "party":
          addMessage(
            `🦜 Party Parrot says: Keep coding and stay awesome!
            
░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░▄▀▀▀▀▀▀░░░
░░░░░░░░░░░░█░░░░░░░░░░
░░░░░░░░░░░█░░▀█▀░▀░░░░
░░░░░░░░░░░█░░░░░░░░░░░
░░░░░░░░░░░░▀▄▄▄▄▄▄░░░░
░░░░░░░░░░░░░░░░░░░░░░░`,
            "info"
          );
          break;

        case "rickroll":
        case "rick":
          addMessage(
            `🎵 Never gonna give you up,
Never gonna let you down,
Never gonna run around and desert you!

You've been rickrolled! 🕺
Check out my projects instead: type 'projects'`,
            "info"
          );
          break;

        case "snake":
        case "game":
          addMessage(
            `🎮 Games coming soon!

For now, try these fun commands:
• matrix    - The Matrix rain effect
• cowsay    - Make a cow say something
• fortune   - Get a dev quote
• joke      - Hear a programming joke
• hack      - Feel like a hacker
• coffee    - Get some virtual coffee`,
            "info"
          );
          break;

        case "zen":
          const zenPrinciples = [
            "Beautiful is better than ugly.",
            "Explicit is better than implicit.",
            "Simple is better than complex.",
            "Complex is better than complicated.",
            "Flat is better than nested.",
            "Sparse is better than dense.",
            "Readability counts.",
            "Special cases aren't special enough to break the rules.",
            "Errors should never pass silently.",
            "In the face of ambiguity, refuse the temptation to guess.",
            "Now is better than never.",
            "If the implementation is hard to explain, it's a bad idea.",
          ];
          const zen =
            zenPrinciples[Math.floor(Math.random() * zenPrinciples.length)];
          addMessage(`🧘 The Zen of Programming:\n\n"${zen}"`, "info");
          break;

        case "ascii":
          if (args.length === 0) {
            addMessage("Usage: ascii [text]\nExample: ascii hello", "warning");
          } else {
            const text = args.join(" ").toUpperCase();
            addMessage(
              `
╔${"═".repeat(text.length + 4)}╗
║  ${text}  ║
╚${"═".repeat(text.length + 4)}╝
`,
              "info"
            );
          }
          break;

        case "love":
        case "heart":
          addMessage(
            `
    ❤️  ❤️
  ❤️❤️❤️❤️❤️❤️
 ❤️❤️❤️❤️❤️❤️❤️
❤️❤️❤️❤️❤️❤️❤️❤️
 ❤️❤️❤️❤️❤️❤️❤️
  ❤️❤️❤️❤️❤️❤️
   ❤️❤️❤️❤️❤️
    ❤️❤️❤️
     ❤️

Thanks for visiting! 💕`,
            "info"
          );
          break;

        case "secret":
        case "konami":
          addMessage(
            `🎮 You found a secret!

↑ ↑ ↓ ↓ ← → ← → B A

Try these hidden commands:
• neofetch  - System info
• hack      - Hacker mode
• rickroll  - You know what this does
• zen       - Programming wisdom
• party     - Party parrot!`,
            "success"
          );
          break;

        case "credits":
          addMessage(
            `
╔════════════════════════════════════╗
║           CREDITS                  ║
╠════════════════════════════════════╣
║  Developer: Ayomide Ibiteye        ║
║  Design: Claude Code Inspired      ║
║  Built with: React + TailwindCSS   ║
║  Animations: Framer Motion         ║
║  Year: 2025                        ║
╚════════════════════════════════════╝

Thanks for checking out my portfolio! 🙏`,
            "info"
          );
          break;

        case "b":
          addMessage(`🅱️`, "info");
          break;

        default:
          addMessage(
            `Command not found: ${command}
Type 'help' to see available commands.`,
            "error"
          );
      }
    },
    [addMessage, clearMessages, setTheme, theme]
  );

  return { executeCommand, addMessage };
}
