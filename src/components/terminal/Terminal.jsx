import { useState, useEffect, useCallback } from 'react';
import TerminalWindow from './TerminalWindow';
import OutputArea from './OutputArea';
import InputLine from './InputLine';
import WelcomeSection from '../sections/WelcomeSection';
import useCommands from '../../hooks/useCommands';

export default function Terminal({ theme, setTheme }) {
  const [messages, setMessages] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const { executeCommand, addMessage } = useCommands({
    setMessages,
    setTheme,
    theme,
    clearMessages
  });

  // Initialize with welcome message
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([{
        id: 'welcome',
        type: 'output',
        content: <WelcomeSection />,
        timestamp: new Date()
      }]);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleCommand = useCallback(async (input) => {
    // Add to history
    setCommandHistory(prev => [...prev, input]);
    
    // Execute command
    setIsProcessing(true);
    
    // Small delay for effect
    await new Promise(resolve => setTimeout(resolve, 100));
    
    executeCommand(input);
    
    setIsProcessing(false);
  }, [executeCommand]);

  return (
    <TerminalWindow>
      <OutputArea messages={messages} />
      <InputLine 
        onCommand={handleCommand}
        commandHistory={commandHistory}
        disabled={isProcessing}
      />
    </TerminalWindow>
  );
}

