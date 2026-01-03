import { useState, useEffect, useCallback } from "react";
import TerminalWindow from "./TerminalWindow";
import OutputArea from "./OutputArea";
import InputLine from "./InputLine";
import WelcomeSection from "../sections/WelcomeSection";
import useCommands from "../../hooks/useCommands";

export default function Terminal({
  theme,
  setTheme,
  windowState,
  onWindowStateChange,
}) {
  const [messages, setMessages] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const { executeCommand } = useCommands({
    setMessages,
    setTheme,
    theme,
    clearMessages,
  });

  // Initialize with welcome message
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([
        {
          id: "welcome",
          type: "output",
          content: <WelcomeSection />,
          timestamp: new Date(),
        },
      ]);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleCommand = useCallback(
    async (input) => {
      // Add to history
      setCommandHistory((prev) => [...prev, input]);

      // Show thinking indicator - Claude Code style
      setIsProcessing(true);

      // Add a "thinking" message
      const thinkingId = `thinking-${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        {
          id: thinkingId,
          type: "thinking",
          content: "Processing...",
          command: input,
          timestamp: new Date(),
        },
      ]);

      // Small delay for effect
      await new Promise((resolve) => setTimeout(resolve, 150));

      // Remove thinking message and execute command
      setMessages((prev) => prev.filter((m) => m.id !== thinkingId));
      executeCommand(input);

      setIsProcessing(false);
    },
    [executeCommand]
  );

  const handleClose = useCallback(() => {
    onWindowStateChange("closed");
  }, [onWindowStateChange]);

  const handleMinimize = useCallback(() => {
    onWindowStateChange(windowState === "minimized" ? "normal" : "minimized");
  }, [onWindowStateChange, windowState]);

  const handleMaximize = useCallback(() => {
    onWindowStateChange(windowState === "maximized" ? "normal" : "maximized");
  }, [onWindowStateChange, windowState]);

  const handleRestore = useCallback(() => {
    onWindowStateChange("normal");
  }, [onWindowStateChange]);

  return (
    <TerminalWindow
      windowState={windowState}
      onClose={handleClose}
      onMinimize={handleMinimize}
      onMaximize={handleMaximize}
      onRestore={handleRestore}
    >
      <OutputArea messages={messages} />
      <InputLine
        onCommand={handleCommand}
        commandHistory={commandHistory}
        disabled={isProcessing}
      />
    </TerminalWindow>
  );
}
