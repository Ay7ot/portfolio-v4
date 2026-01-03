import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function InputLine({ onCommand, commandHistory, disabled }) {
  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);

  useEffect(() => {
    // Auto-focus input
    if (inputRef.current && !disabled) {
      inputRef.current.focus();
    }
  }, [disabled]);

  // Keep focus on input when clicking anywhere in terminal
  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current && !disabled) {
        inputRef.current.focus();
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [disabled]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onCommand(input.trim());
      setInput("");
      setHistoryIndex(-1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex < commandHistory.length - 1
            ? historyIndex + 1
            : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Simple tab completion
      const commands = [
        "help",
        "about",
        "projects",
        "skills",
        "contact",
        "clear",
        "theme",
        "github",
        "linkedin",
        "resume",
      ];
      const match = commands.find((cmd) => cmd.startsWith(input.toLowerCase()));
      if (match) {
        setInput(match);
      }
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 px-4 py-3 bg-[var(--background-secondary)]/50 border-t border-[var(--foreground-dim)]/10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      {/* Prompt - Claude Code style */}
      <div className="flex items-center gap-1 text-sm shrink-0 font-mono">
        <span className="text-[var(--foreground-muted)]">[</span>
        <span className="text-[var(--success)]">user</span>
        <span className="text-[var(--foreground-muted)]">@</span>
        <span className="text-[var(--primary)]">portfolio</span>
        <span className="text-[var(--foreground-muted)] hidden sm:inline">
          {" "}
          ~
        </span>
        <span className="text-[var(--foreground-muted)]">]$</span>
      </div>

      {/* Input */}
      <div className="flex-1 flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="w-full bg-transparent text-[var(--foreground)] text-xs sm:text-base outline-none caret-[var(--accent)] placeholder:text-[var(--foreground-dim)]/50"
          placeholder={
            disabled ? "Processing..." : 'Type a command... (try "help")'
          }
          autoComplete="off"
          spellCheck="false"
        />
      </div>
    </motion.form>
  );
}
