'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DropdownItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  divider?: boolean;
  danger?: boolean;
}

interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'start' | 'end';
  className?: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ trigger, items, align = 'start', className }) => {
  const [open, setOpen] = useState(false);
  const [focusIdx, setFocusIdx] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleClose = useCallback(() => {
    setOpen(false);
    setFocusIdx(-1);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) handleClose();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClose]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const enabledIndices = items.map((item, i) => !item.divider ? i : -1).filter(i => i !== -1);
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusIdx(prev => {
          const idx = enabledIndices.indexOf(prev);
          const next = enabledIndices[(idx + 1) % enabledIndices.length];
          itemRefs.current[next]?.focus();
          return next;
        });
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusIdx(prev => {
          const idx = enabledIndices.indexOf(prev);
          const next = enabledIndices[(idx - 1 + enabledIndices.length) % enabledIndices.length];
          itemRefs.current[next]?.focus();
          return next;
        });
        break;
      case 'Escape':
        e.preventDefault();
        handleClose();
        break;
    }
  };

  return (
    <div ref={containerRef} className={cn('relative inline-flex', className)} onKeyDown={handleKeyDown}>
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className={cn(
              'absolute top-full mt-1 min-w-[200px] bg-white rounded-xl shadow-dropdown border border-surface-100 overflow-hidden z-50',
              align === 'end' ? 'right-0' : 'left-0'
            )}
            role="menu"
          >
            <div className="py-1">
              {items.map((item, index) => (
                item.divider ? (
                  <div key={index} className="my-1 mx-2 h-px bg-surface-100" />
                ) : (
                  <button
                    key={index}
                    ref={el => { itemRefs.current[index] = el; }}
                    type="button"
                    role="menuitem"
                    onClick={() => { item.onClick(); handleClose(); }}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors focus:outline-none',
                      item.danger ? 'text-danger-600 hover:bg-danger-50' : 'text-surface-700 hover:bg-surface-50'
                    )}
                  >
                    {item.icon && <span className={cn('w-4 h-4', item.danger ? 'text-danger-400' : 'text-surface-400')}>{item.icon}</span>}
                    <span>{item.label}</span>
                  </button>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { DropdownMenu, type DropdownMenuProps, type DropdownItem };
