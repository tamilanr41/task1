'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function PremiumCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);

  const springX = useSpring(cursorX, { stiffness: 200, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHoverStart = () => { setIsHovering(true); };
    const handleHoverEnd = () => { setIsHovering(false); };

    document.addEventListener('mousemove', move);
    document.querySelectorAll('a, button, input, select, textarea, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    return () => {
      document.removeEventListener('mousemove', move);
      document.querySelectorAll('a, button, input, select, textarea, [data-cursor]').forEach(el => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, [cursorX, cursorY]);

  if (typeof window === 'undefined') return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        background: 'rgba(255,255,255,0.8)',
        transition: 'width 0.2s, height 0.2s',
      }}
      animate={{
        width: isHovering ? 48 : 24,
        height: isHovering ? 48 : 24,
      }}
    />
  );
}