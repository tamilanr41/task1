'use client';
import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  href?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 focus-visible:ring-primary-500/30 shadow-button',
  secondary: 'bg-accent-500 text-white hover:bg-accent-600 focus-visible:ring-accent-500/30 shadow-button-accent',
  outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50 focus-visible:ring-primary-500/30',
  ghost: 'text-surface-700 hover:bg-surface-100 focus-visible:ring-surface-400/30',
  danger: 'bg-danger-500 text-white hover:bg-danger-600 focus-visible:ring-danger-500/30',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-8 py-3 text-base gap-2.5',
};

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(({
  variant = 'primary', size = 'md', loading, icon, iconLeft, iconRight, fullWidth, className, children, href, disabled, type = 'button', ...props
}, ref) => {
  const classes = cn(
    'relative inline-flex items-center justify-center font-semibold rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none overflow-hidden',
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && 'w-full',
    loading && 'cursor-wait',
    className
  );

  const content = (
    <>
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : icon || iconLeft}
      {children && <span>{children}</span>}
      {!loading && iconRight}
    </>
  );

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 17 },
  };

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        {...motionProps}
        {...(props as any)}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type as 'button' | 'submit' | 'reset'}
      className={classes}
      disabled={disabled || loading}
      {...motionProps}
      {...(props as any)}
    >
      {content}
    </motion.button>
  );
});

Button.displayName = 'Button';
export { Button, type ButtonProps, type ButtonVariant, type ButtonSize };
