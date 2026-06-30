'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type SwitchSize = 'sm' | 'md' | 'lg';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: SwitchSize;
  labelPosition?: 'left' | 'right';
  className?: string;
}

const sizeStyles: Record<SwitchSize, { track: string; thumb: string; translateX: number }> = {
  sm: { track: 'w-8 h-4.5', thumb: 'w-3.5 h-3.5', translateX: 14 },
  md: { track: 'w-11 h-6', thumb: 'w-5 h-5', translateX: 20 },
  lg: { track: 'w-14 h-7', thumb: 'w-6 h-6', translateX: 28 },
};

const Switch: React.FC<SwitchProps> = ({ checked, onChange, label, disabled, size = 'md', labelPosition = 'right', className }) => {
  const styles = sizeStyles[size];
  const id = `switch-${label?.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <label htmlFor={id} className={cn(
      'inline-flex items-center gap-3',
      labelPosition === 'left' ? 'flex-row-reverse' : 'flex-row',
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      className
    )}>
      <motion.button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onChange(!checked); } }}
        className={cn(
          'relative rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30 focus-visible:ring-offset-2',
          styles.track,
          checked ? 'bg-primary-500' : 'bg-surface-200'
        )}
        animate={{ backgroundColor: checked ? '#1a365d' : '#e4e7f0' }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className={cn(
            'absolute top-0.5 left-0.5 rounded-full bg-white shadow-soft',
            styles.thumb
          )}
          animate={{ x: checked ? styles.translateX : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </motion.button>
      {label && (
        <span className="text-sm font-medium text-surface-700 select-none">{label}</span>
      )}
    </label>
  );
};

export { Switch, type SwitchProps, type SwitchSize };
