'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, Search, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  searchable?: boolean;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  label, options, value, onChange, placeholder = 'Select...', error, disabled, searchable, className
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const id = label?.toLowerCase().replace(/\s+/g, '-');

  const filtered = searchable ? options.filter(o => o.label.toLowerCase().includes(search.toLowerCase())) : options;
  const selected = options.find(o => o.value === value);

  const handleClose = useCallback(() => {
    setOpen(false);
    setSearch('');
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) handleClose();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClose]);

  useEffect(() => {
    if (open && searchable) setTimeout(() => searchRef.current?.focus(), 50);
  }, [open, searchable]);

  return (
    <div ref={containerRef} className={cn('w-full', className)}>
      {label && (
        <label
          htmlFor={id}
          className={cn('block text-sm font-medium mb-1.5 transition-colors duration-200', error ? 'text-danger-500' : focused ? 'text-primary-500' : 'text-surface-700')}
        >
          {label}
        </label>
      )}
      <button
        type="button"
        id={id}
        onClick={() => { if (!disabled) setOpen(!open); }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={disabled}
        className={cn(
          'w-full flex items-center justify-between rounded-lg border bg-white px-4 py-2.5 text-sm transition-all duration-200 focus:outline-none focus:ring-2',
          error ? 'border-danger-500 focus:ring-danger-500/20' : 'border-surface-200 focus:ring-primary-500/20 focus:border-primary-500',
          disabled && 'opacity-50 cursor-not-allowed bg-surface-50',
          open && 'ring-2 ring-primary-500/20 border-primary-500'
        )}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-invalid={!!error}
      >
        <span className={cn(selected ? 'text-surface-900' : 'text-surface-400')}>{selected ? selected.label : placeholder}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-surface-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="absolute z-50 mt-1 w-full bg-white rounded-xl shadow-dropdown border border-surface-100 overflow-hidden"
            style={{ minWidth: '200px' }}
            role="listbox"
          >
            {searchable && (
              <div className="p-2 border-b border-surface-100">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-surface-400" />
                  <input
                    ref={searchRef}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                    className="w-full pl-8 pr-3 py-1.5 text-sm border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  />
                </div>
              </div>
            )}
            <div className="max-h-60 overflow-y-auto py-1">
              {filtered.length === 0 ? (
                <div className="px-4 py-3 text-sm text-surface-400 text-center">No results found</div>
              ) : filtered.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => { onChange(option.value); handleClose(); }}
                  className={cn(
                    'w-full flex items-center gap-2 px-4 py-2.5 text-sm text-left transition-colors hover:bg-surface-50',
                    option.value === value && 'bg-primary-50 text-primary-700 font-medium'
                  )}
                  role="option"
                  aria-selected={option.value === value}
                >
                  <span className="flex-1">{option.label}</span>
                  {option.value === value && <Check className="w-4 h-4 text-primary-500" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {error && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-1 text-xs text-danger-500 mt-1.5" role="alert">
          <AlertCircle className="w-3 h-3" /> {error}
        </motion.p>
      )}
    </div>
  );
};

export { Select, type SelectProps, type SelectOption };
