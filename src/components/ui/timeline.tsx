'use client';
import { motion } from 'framer-motion';
import { Check, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

type TimelineStatus = 'completed' | 'current' | 'pending';

interface TimelineItem {
  title: string;
  description?: string;
  date?: string;
  status: TimelineStatus;
  icon?: React.ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
  variant?: 'default' | 'alternating';
  className?: string;
}

const statusColors: Record<TimelineStatus, { dot: string; line: string; text: string }> = {
  completed: { dot: 'bg-success-500 border-success-500', line: 'bg-success-200', text: 'text-surface-600' },
  current: { dot: 'bg-primary-500 border-primary-500', line: 'bg-primary-200', text: 'text-surface-900 font-medium' },
  pending: { dot: 'bg-surface-200 border-surface-300', line: 'bg-surface-200', text: 'text-surface-400' },
};

const TimelineItemComponent: React.FC<{
  item: TimelineItem;
  index: number;
  isLast: boolean;
  variant: 'default' | 'alternating';
}> = ({ item, index, isLast, variant }) => {
  const colors = statusColors[item.status];
  const isLeft = variant === 'alternating' && index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
      className={cn(
        'relative flex gap-4 pb-8',
        variant === 'alternating' && (isLeft ? 'flex-row' : 'flex-row-reverse text-right'),
        isLast && 'pb-0'
      )}
    >
      <div className={cn('flex flex-col items-center', variant === 'alternating' && (isLeft ? 'order-1' : 'order-1'))}>
        <div className={cn(
          'w-10 h-10 rounded-full flex items-center justify-center border-2 shrink-0',
          colors.dot,
          item.status === 'current' && 'shadow-lg shadow-primary-500/30'
        )}>
          {item.status === 'completed' ? (
            <Check className="w-5 h-5 text-white" />
          ) : item.icon ? (
            <span className="w-5 h-5">{item.icon}</span>
          ) : (
            <Circle className={cn('w-2.5 h-2.5', item.status === 'pending' ? 'text-surface-400' : 'text-white')} />
          )}
        </div>
        {!isLast && <div className={cn('w-0.5 flex-1 min-h-[2rem]', colors.line)} />}
      </div>
      <div className={cn('flex-1 pb-4', variant === 'alternating' && (isLeft ? 'text-left pr-8' : 'text-right pl-8'))}>
        <div className="bg-white rounded-xl p-4 shadow-card border border-surface-100 hover:shadow-card-hover transition-shadow">
          <h4 className={cn('text-sm', colors.text)}>{item.title}</h4>
          {item.description && <p className="text-xs text-surface-500 mt-1">{item.description}</p>}
          {item.date && <p className="text-2xs text-surface-400 mt-1.5">{item.date}</p>}
        </div>
      </div>
    </motion.div>
  );
};

const Timeline: React.FC<TimelineProps> = ({ items, variant = 'default', className }) => {
  return (
    <div className={cn('relative', className)}>
      {items.map((item, index) => (
        <TimelineItemComponent key={index} item={item} index={index} isLast={index === items.length - 1} variant={variant} />
      ))}
    </div>
  );
};

export { Timeline, type TimelineProps, type TimelineItem, type TimelineStatus };
