'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  direction?: 'horizontal' | 'vertical';
  disabled?: boolean;
  className?: string;
}

const dotVariants = {
  checked: { scale: 1, opacity: 1 },
  unchecked: { scale: 0, opacity: 0 },
};

const RadioGroup: React.FC<RadioGroupProps> = ({ name, options, value, onChange, label, direction = 'vertical', disabled, className }) => {
  return (
    <fieldset className={cn(className)} disabled={disabled}>
      {label && <legend className="text-sm font-medium text-surface-700 mb-2">{label}</legend>}
      <div className={cn(
        'flex gap-4',
        direction === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'
      )}>
        {options.map((option) => {
          const isSelected = value === option.value;
          const id = `${name}-${option.value}`;
          return (
            <label
              key={option.value}
              htmlFor={id}
              className={cn(
                'inline-flex items-center gap-2.5',
                disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              )}
            >
              <motion.button
                id={id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                disabled={disabled}
                onClick={() => !disabled && onChange(option.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onChange(option.value); } }}
                className={cn(
                  'relative w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30 focus-visible:ring-offset-2',
                  isSelected ? 'border-primary-500' : disabled ? 'border-surface-200' : 'border-surface-300 hover:border-surface-400'
                )}
                animate={isSelected ? { borderColor: '#1a365d' } : { borderColor: disabled ? '#e4e7f0' : '#cdd1e0' }}
                transition={{ duration: 0.15 }}
              >
                <motion.div
                  className="w-2.5 h-2.5 bg-primary-500 rounded-full"
                  variants={dotVariants}
                  initial="unchecked"
                  animate={isSelected ? 'checked' : 'unchecked'}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                />
              </motion.button>
              <span className="text-sm font-medium text-surface-700 select-none">{option.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
};

export { RadioGroup as Radio, RadioGroup, type RadioGroupProps, type RadioOption };
