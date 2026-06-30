'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { staggerContainer, fadeUp } from './variants';

interface Props {
  children: ReactNode;
  className?: string;
}

export function HeroContainer({ children, className = '' }: Props) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
}

export function HeroLine({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

export function HeroImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      animate={{ clipPath: 'inset(0 0 0 0)' }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        initial={{ scale: 1.3, filter: 'blur(8px)' }}
        animate={{ scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      />
    </motion.div>
  );
}

export function FloatingIcon({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -12, 0],
        rotate: [0, 3, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}
