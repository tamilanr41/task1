'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, CheckCircle, AlertTriangle, AlertCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

const variantStyles: Record<AlertVariant, { container: string; icon: string; border: string }> = {
  info: { container: 'bg-blue-50', icon: 'text-blue-500', border: 'border-l-blue-500' },
  success: { container: 'bg-success-50', icon: 'text-success-500', border: 'border-l-success-500' },
  warning: { container: 'bg-warning-50', icon: 'text-warning-500', border: 'border-l-warning-500' },
  danger: { container: 'bg-danger-50', icon: 'text-danger-500', border: 'border-l-danger-500' },
};

const defaultIcons: Record<AlertVariant, React.ReactNode> = {
  info: <Info className="w-5 h-5" />,
  success: <CheckCircle className="w-5 h-5" />,
  warning: <AlertTriangle className="w-5 h-5" />,
  danger: <AlertCircle className="w-5 h-5" />,
};

const Alert: React.FC<AlertProps> = ({ variant = 'info', title, message, dismissible, onDismiss, icon, action, className }) => {
  const [visible, setVisible] = useState(true);

  const handleDismiss = () => {
    setVisible(false);
    onDismiss?.();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -8, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -8, height: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            'flex gap-3 px-4 py-3.5 rounded-xl border-l-4 shadow-soft',
            variantStyles[variant].container,
            variantStyles[variant].border,
            className
          )}
          role="alert"
        >
          <div className={cn('shrink-0 mt-0.5', variantStyles[variant].icon)}>
            {icon || defaultIcons[variant]}
          </div>
          <div className="flex-1 min-w-0">
            {title && <h4 className="text-sm font-semibold text-surface-900 mb-0.5">{title}</h4>}
            <p className="text-sm text-surface-600">{message}</p>
            {action && <div className="mt-2">{action}</div>}
          </div>
          {dismissible && (
            <button
              type="button"
              onClick={handleDismiss}
              className="shrink-0 p-1 rounded-lg text-surface-400 hover:text-surface-700 hover:bg-white/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30"
              aria-label="Dismiss alert"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { Alert, type AlertProps, type AlertVariant };
