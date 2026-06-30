'use client';
import { forwardRef, useState, type InputHTMLAttributes, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type InputSize = 'sm' | 'md' | 'lg';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  inputSize?: InputSize;
}

const sizeStyles: Record<InputSize, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-5 text-base',
};

const Input = forwardRef<HTMLInputElement, InputProps>(({
  className, label, error, helperText, leftIcon, rightIcon, type, id, inputSize = 'md', placeholder, onFocus, onBlur, ...props
}, ref) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label && (
        <motion.label
          htmlFor={inputId}
          className="block text-sm font-medium text-surface-700 mb-1.5"
          animate={{ color: error ? '#ef4444' : focused ? '#1a365d' : '#374151' }}
          transition={{ duration: 0.2 }}
        >
          {label}
          {props.required && <span className="text-danger-500 ml-0.5">*</span>}
        </motion.label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400 pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          ref={ref}
          type={isPassword && showPassword ? 'text' : type}
          placeholder={placeholder || (label ? `Enter ${label.toLowerCase()}` : '')}
          className={cn(
            'w-full rounded-lg border bg-white transition-all duration-200 placeholder:text-surface-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-50',
            sizeStyles[inputSize],
            leftIcon && 'pl-10',
            (rightIcon || isPassword) && 'pr-10',
            error
              ? 'border-danger-500 focus:ring-2 focus:ring-danger-500/20'
              : 'border-surface-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500',
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          onFocus={(e) => { setFocused(true); onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); onBlur?.(e); }}
          {...props}
        />
        {(rightIcon || isPassword) && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {isPassword ? (
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-surface-400 hover:text-surface-600 transition-colors focus:outline-none" aria-label={showPassword ? 'Hide password' : 'Show password'} tabIndex={-1}>
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            ) : rightIcon}
          </div>
        )}
      </div>
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            id={`${inputId}-error`}
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1 text-xs text-danger-500 mt-1.5"
            role="alert"
          >
            <AlertCircle className="w-3 h-3" /> {error}
          </motion.p>
        )}
        {!error && helperText && (
          <motion.p
            id={`${inputId}-helper`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-surface-500 mt-1.5"
          >
            {helperText}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
});

Input.displayName = 'Input';
export { Input, type InputProps, type InputSize };
