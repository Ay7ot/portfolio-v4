import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function MatrixEffect() {
  const canvasRef = useRef(null);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = 200;

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontSize = 12;
    const columns = canvas.width / fontSize;

    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    let animationId;
    const draw = () => {
      ctx.fillStyle = 'rgba(30, 30, 46, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#a6e3a1';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    // Auto-stop after 5 seconds
    const timeout = setTimeout(() => {
      setIsRunning(false);
      cancelAnimationFrame(animationId);
    }, 5000);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(timeout);
    };
  }, [isRunning]);

  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <p className="text-[var(--success)] text-sm">🔋 Initiating Matrix rain...</p>
      <div className="relative rounded-lg overflow-hidden border border-[var(--foreground-dim)]/20">
        <canvas 
          ref={canvasRef} 
          className="w-full h-[200px] bg-[var(--background-tertiary)]"
        />
        {!isRunning && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--background)]/80">
            <button
              onClick={() => setIsRunning(true)}
              className="px-4 py-2 bg-[var(--success)] text-[var(--background)] rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Run Again
            </button>
          </div>
        )}
      </div>
      <p className="text-xs text-[var(--foreground-dim)]">
        The Matrix has you... (auto-stops after 5 seconds)
      </p>
    </motion.div>
  );
}

