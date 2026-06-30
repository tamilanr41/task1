'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: 'underline' | 'pills' | 'buttons';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeStyles = {
  sm: 'text-sm gap-1',
  md: 'text-sm gap-1',
  lg: 'text-base gap-2',
};

const tabSizeStyles = {
  sm: 'px-3 py-1.5',
  md: 'px-4 py-2',
  lg: 'px-5 py-2.5',
};

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange, variant = 'underline', size = 'md', className }) => {
  return (
    <div
      className={cn(
        'flex',
        variant === 'underline' ? 'border-b border-surface-200' : '',
        variant === 'pills' ? 'bg-surface-100 rounded-xl p-1' : '',
        variant === 'buttons' ? 'gap-1' : '',
        sizeStyles[size],
        className
      )}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative flex items-center gap-2 font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30 rounded-lg whitespace-nowrap',
              tabSizeStyles[size],
              variant === 'underline' && 'border-b-2 -mb-px',
              variant === 'underline' && isActive ? 'border-primary-500 text-primary-500' : 'border-transparent text-surface-500 hover:text-surface-700',
              variant === 'pills' && isActive ? 'bg-white text-primary-500 shadow-soft' : 'text-surface-500 hover:text-surface-700',
              variant === 'buttons' && isActive ? 'bg-primary-500 text-white shadow-button' : 'bg-white text-surface-500 border border-surface-200 hover:border-surface-300 hover:text-surface-700'
            )}
          >
            {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={cn(
                'inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 text-2xs font-semibold rounded-full',
                isActive ? 'bg-primary-100 text-primary-700' : 'bg-surface-100 text-surface-600'
              )}>
                {tab.count}
              </span>
            )}
            {variant === 'underline' && isActive && (
              <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
            )}
            {variant === 'pills' && isActive && (
              <motion.div layoutId="tab-pill" className="absolute inset-0 bg-white rounded-xl shadow-soft" transition={{ type: 'spring', stiffness: 400, damping: 30 }} style={{ zIndex: -1 }} />
            )}
          </button>
        );
      })}
    </div>
  );
};

export { Tabs, type TabsProps, type Tab };
