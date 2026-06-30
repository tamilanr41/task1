'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

type TooltipSide = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: TooltipSide;
  delay?: number;
  className?: string;
}

const sideVariants: Record<TooltipSide, Variants> = {
  top: { initial: { opacity: 0, y: 4, scale: 0.96 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 4, scale: 0.96 } },
  bottom: { initial: { opacity: 0, y: -4, scale: 0.96 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -4, scale: 0.96 } },
  left: { initial: { opacity: 0, x: 4, scale: 0.96 }, animate: { opacity: 1, x: 0, scale: 1 }, exit: { opacity: 0, x: 4, scale: 0.96 } },
  right: { initial: { opacity: 0, x: -4, scale: 0.96 }, animate: { opacity: 1, x: 0, scale: 1 }, exit: { opacity: 0, x: -4, scale: 0.96 } },
};

const Tooltip: React.FC<TooltipProps> = ({ content, children, side = 'top', delay = 300, className }) => {
  const [show, setShow] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleEnter = () => {
    timeoutRef.current = setTimeout(() => setShow(true), delay);
  };
  const handleLeave = () => {
    clearTimeout(timeoutRef.current);
    setShow(false);
  };

  const variants = sideVariants[side];

  return (
    <div className="relative inline-flex" onMouseEnter={handleEnter} onMouseLeave={handleLeave} onFocus={handleEnter} onBlur={handleLeave}>
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={cn(
              'absolute z-[100] px-2.5 py-1.5 bg-surface-900 text-white text-xs font-medium rounded-lg shadow-dropdown whitespace-nowrap pointer-events-none',
              side === 'top' ? 'bottom-full left-1/2 -translate-x-1/2 mb-2' :
              side === 'bottom' ? 'top-full left-1/2 -translate-x-1/2 mt-2' :
              side === 'left' ? 'right-full top-1/2 -translate-y-1/2 mr-2' :
              'left-full top-1/2 -translate-y-1/2 ml-2',
              className
            )}
            role="tooltip"
          >
            {content}
            <div className={cn(
              'absolute w-2 h-2 bg-surface-900 rotate-45',
              side === 'top' ? 'top-full left-1/2 -translate-x-1/2 -mt-1' :
              side === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 -mb-1' :
              side === 'left' ? 'left-full top-1/2 -translate-y-1/2 -ml-1' :
              'right-full top-1/2 -translate-y-1/2 -mr-1'
            )} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { Tooltip, type TooltipProps, type TooltipSide };
