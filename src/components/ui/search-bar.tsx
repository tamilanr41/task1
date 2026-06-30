'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Loader2, Clock, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  loading?: boolean;
  recentSearches?: string[];
  onClear?: () => void;
  filters?: React.ReactNode;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value, onChange, onSearch, placeholder = 'Search...', loading, recentSearches = [],
  onClear, filters, className
}) => {
  const [focused, setFocused] = useState(false);
  const [showRecent, setShowRecent] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    onSearch?.(value);
    setShowRecent(false);
  };

  const handleClose = useCallback(() => {
    setShowRecent(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) handleClose();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClose]);

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <form onSubmit={handleSubmit} className="relative">
        <div className={cn(
          'flex items-center gap-2 px-4 py-2.5 rounded-xl border bg-white transition-all duration-200',
          focused ? 'ring-2 ring-primary-500/20 border-primary-500 shadow-soft' : 'border-surface-200 hover:border-surface-300',
          loading && 'opacity-70'
        )}>
          <Search className="w-4 h-4 text-surface-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => { setFocused(true); if (recentSearches.length > 0) setShowRecent(true); }}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            className="flex-1 text-sm bg-transparent border-none outline-none text-surface-900 placeholder:text-surface-400"
            aria-label={placeholder}
            onKeyDown={(e) => { if (e.key === 'Escape') { inputRef.current?.blur(); setShowRecent(false); } }}
          />
          <div className="hidden md:flex items-center gap-1 px-1.5 py-0.5 rounded border border-surface-200 text-2xs text-surface-400 font-mono">
            <span>⌘</span><span>K</span>
          </div>
          {loading ? (
            <Loader2 className="w-4 h-4 text-primary-500 animate-spin shrink-0" />
          ) : value ? (
            <button
              type="button"
              onClick={() => { onChange(''); onClear?.(); inputRef.current?.focus(); }}
              className="p-0.5 rounded text-surface-400 hover:text-surface-700 transition-colors focus:outline-none"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}
          {filters && (
            <div className="pl-2 border-l border-surface-200">
              {filters}
            </div>
          )}
        </div>
      </form>
      <AnimatePresence>
        {showRecent && recentSearches.length > 0 && !focused && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-dropdown border border-surface-100 overflow-hidden z-50"
          >
            <div className="px-4 py-2 text-2xs font-semibold text-surface-400 uppercase tracking-wider">Recent</div>
            {recentSearches.map((search, i) => (
              <button
                key={i}
                type="button"
                onClick={() => { onChange(search); onSearch?.(search); setShowRecent(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left text-surface-700 hover:bg-surface-50 transition-colors"
              >
                <Clock className="w-3.5 h-3.5 text-surface-400 shrink-0" />
                <span className="truncate">{search}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { SearchBar, type SearchBarProps };
