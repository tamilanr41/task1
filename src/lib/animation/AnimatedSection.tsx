'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { fadeUp, fadeIn, scaleIn, slideLeft, slideRight, staggerContainer } from './variants';

type AnimationVariant = 'fadeUp' | 'fadeIn' | 'scaleIn' | 'slideLeft' | 'slideRight' | 'stagger';

const variantMap = {
  fadeUp, fadeIn, scaleIn, slideLeft, slideRight, stagger: staggerContainer,
};

interface Props {
  children: ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  className?: string;
  once?: boolean;
  as?: 'div' | 'section' | 'article';
}

export default function AnimatedSection({
  children, variant = 'fadeUp', delay = 0, className = '', once = true, as = 'div',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-60px 0px -60px 0px' });
  const v = variantMap[variant];
  const Component = motion[as];

  return (
    <Component
      ref={ref}
      variants={v}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
      style={variant === 'stagger' ? {} : { transitionDelay: `${delay}ms` }}
    >
      {children}
    </Component>
  );
}

export function AnimatedItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}
