'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type CardVariant = 'default' | 'interactive' | 'glass' | 'bordered' | 'elevated';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  className?: string;
  as?: 'div' | 'article' | 'section';
  onClick?: () => void;
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-white shadow-card border border-surface-100',
  interactive: 'bg-white shadow-card border border-surface-100 cursor-pointer',
  glass: 'bg-white/70 backdrop-blur-xl shadow-glass border border-white/20',
  bordered: 'bg-white border-2 border-surface-100',
  elevated: 'bg-white shadow-elevated border border-surface-50',
};

const paddingStyles: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const Card: React.FC<CardProps> = ({ children, variant = 'default', padding = 'md', className, as: Tag = 'div', onClick }) => {
  if (variant === 'interactive') {
    return (
      <motion.div
        onClick={onClick}
        whileHover={{ y: -2, boxShadow: '0 12px 40px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.03)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={cn('rounded-2xl transition-colors duration-200', variantStyles[variant], paddingStyles[padding], className)}
      >
        {children}
      </motion.div>
    );
  }
  return (
    <Tag className={cn('rounded-2xl', variantStyles[variant], paddingStyles[padding], className)}>
      {children}
    </Tag>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

const CardHeader: React.FC<CardHeaderProps> = ({ children, className, action }) => (
  <div className={cn('flex items-center justify-between gap-4 pb-4 mb-4 border-b border-surface-100', className)}>
    <div className="flex-1">{children}</div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
);

const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn(className)}>{children}</div>
);

const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn('flex items-center gap-3 pt-4 mt-4 border-t border-surface-100', className)}>{children}</div>
);

const CardTitle: React.FC<{ children: React.ReactNode; className?: string; as?: 'h1' | 'h2' | 'h3' | 'h4' }> = ({ children, className, as: Tag = 'h3' }) => (
  <Tag className={cn('text-lg font-semibold text-surface-900', className)}>{children}</Tag>
);

const CardDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <p className={cn('text-sm text-surface-500 mt-0.5', className)}>{children}</p>
);

export { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription, type CardProps, type CardVariant, type CardPadding };
