'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionItem {
  id: string;
  title: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultExpanded?: string[];
  className?: string;
}

const Accordion: React.FC<AccordionProps> = ({ items, allowMultiple = false, defaultExpanded = [], className }) => {
  const [expanded, setExpanded] = useState<string[]>(defaultExpanded);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setExpanded(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    } else {
      setExpanded(prev => prev.includes(id) ? [] : [id]);
    }
  };

  return (
    <div className={cn('divide-y divide-surface-100 border border-surface-200 rounded-2xl overflow-hidden', className)}>
      {items.map((item) => {
        const isOpen = expanded.includes(item.id);
        return (
          <div key={item.id} className="bg-white">
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className="w-full flex items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-surface-50 focus:outline-none focus-visible:bg-surface-50"
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
            >
              {item.icon && <span className="w-5 h-5 text-primary-500 shrink-0">{item.icon}</span>}
              <span className="flex-1 font-medium text-surface-900 text-sm">{item.title}</span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <ChevronDown className="w-4 h-4 text-surface-400" />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`accordion-content-${item.id}`}
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4 text-sm text-surface-600 leading-relaxed">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export { Accordion, type AccordionProps, type AccordionItem };
