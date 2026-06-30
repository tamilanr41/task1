'use client';
import { useRef, useState, ReactNode, ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface Ripple {
  x: number;
  y: number;
  id: number;
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'outline' | 'ghost';
}

export default function RippleButton({ children, className = '', variant = 'primary', ...props }: Props) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const ref = useRef<HTMLButtonElement>(null);
  const idRef = useRef(0);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = idRef.current++;
    setRipples(prev => [...prev, { x, y, id }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 800);
    props.onClick?.(e);
  };

  const base = 'relative overflow-hidden inline-flex items-center justify-center gap-2 font-medium text-sm rounded-xl transition-all duration-300';
  const variants = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 shadow-lg shadow-primary-500/20 hover:shadow-xl hover:-translate-y-0.5',
    outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50 hover:-translate-y-0.5',
    ghost: 'text-gray-600 hover:bg-gray-100',
  };

  return (
    <button
      ref={ref}
      className={`${base} ${variants[variant]} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
      {ripples.map(r => (
        <motion.span
          key={r.id}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          initial={{ width: 0, height: 0, x: r.x, y: r.y, opacity: 0.5 }}
          animate={{ width: 300, height: 300, x: r.x - 150, y: r.y - 150, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </button>
  );
}
