'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  indeterminate?: boolean;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}

const checkPathVariants = {
  checked: { pathLength: 1, opacity: 1 },
  unchecked: { pathLength: 0, opacity: 0 },
};

const indeterminatePathVariants = {
  checked: { opacity: 1, scaleX: 1 },
  unchecked: { opacity: 0, scaleX: 0 },
};

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label, indeterminate, disabled, error, className }) => {
  const isActive = checked || indeterminate;
  const id = `checkbox-${label?.toLowerCase().replace(/\s+/g, '-') || Math.random().toString(36).slice(2, 8)}`;

  return (
    <label htmlFor={id} className={cn(
      'inline-flex items-center gap-2.5',
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      className
    )}>
      <motion.button
        id={id}
        type="button"
        role="checkbox"
        aria-checked={indeterminate ? 'mixed' : checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onChange(!checked); } }}
        className={cn(
          'relative w-4.5 h-4.5 rounded border-2 flex items-center justify-center transition-colors duration-200 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30 focus-visible:ring-offset-2',
          isActive ? 'bg-primary-500 border-primary-500' : error ? 'border-danger-500' : 'border-surface-300 hover:border-surface-400'
        )}
        animate={isActive ? { backgroundColor: '#1a365d', borderColor: '#1a365d' } : error ? { backgroundColor: 'transparent', borderColor: '#ef4444' } : { backgroundColor: 'transparent', borderColor: '#cdd1e0' }}
        transition={{ duration: 0.15 }}
      >
        {indeterminate ? (
          <motion.div
            className="w-2.5 h-0.5 bg-white rounded-full"
            variants={indeterminatePathVariants}
            initial="unchecked"
            animate={checked ? 'checked' : 'unchecked'}
            transition={{ duration: 0.2 }}
          />
        ) : (
          <motion.svg
            viewBox="0 0 12 12"
            className="w-3 h-3"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.path
              d="M2 6l3 3 5-5"
              variants={checkPathVariants}
              initial="unchecked"
              animate={checked ? 'checked' : 'unchecked'}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.svg>
        )}
      </motion.button>
      {label && <span className="text-sm font-medium text-surface-700 select-none">{label}</span>}
    </label>
  );
};

export { Checkbox, type CheckboxProps };
