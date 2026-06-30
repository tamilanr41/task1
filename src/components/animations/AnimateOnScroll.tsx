'use client';
import { useRef, useEffect, useState } from 'react';

type AnimationType = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';

interface Props {
  children: React.ReactNode;
  type?: AnimationType;
  delay?: number;
  className?: string;
  once?: boolean;
}

const classMap: Record<AnimationType, string> = {
  up: 'animate-on-scroll',
  down: 'animate-on-scroll',
  left: 'animate-on-scroll-left',
  right: 'animate-on-scroll-right',
  scale: 'animate-on-scroll-scale',
  fade: 'animate-on-scroll',
};

export default function AnimateOnScroll({ children, type = 'up', delay = 0, className = '', once = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={`${classMap[type]} ${visible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
