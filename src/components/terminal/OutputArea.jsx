import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OutputMessage from "./OutputMessage";

export default function OutputArea({ messages }) {
  const containerRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto p-4 space-y-4 smooth-scroll"
      style={{
        WebkitOverflowScrolling: "touch",
        scrollBehavior: "smooth",
        willChange: "scroll-position",
      }}
    >
      <AnimatePresence mode="popLayout">
        {messages.map((message, index) => (
          <OutputMessage
            key={message.id || index}
            message={message}
            isLatest={index === messages.length - 1}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
