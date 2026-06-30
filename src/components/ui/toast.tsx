'use client';
import { useState, useEffect, useCallback, createContext, useContext, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type ToastVariant = 'info' | 'success' | 'warning' | 'danger';

interface ToastData {
  id: string;
  message: string;
  description?: string;
  variant: ToastVariant;
  duration?: number;
}

interface ToastContextType {
  addToast: (toast: Omit<ToastData, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

let toastCounter = 0;
const toastListeners: Set<(data: Omit<ToastData, 'id'>) => void> = new Set();

export function toast(message: string, opts?: { description?: string; variant?: ToastVariant; duration?: number }) {
  const data = { message, description: opts?.description, variant: opts?.variant || 'info' as ToastVariant, duration: opts?.duration };
  toastListeners.forEach(fn => fn(data));
}

const variantStyles: Record<ToastVariant, { container: string; icon: string; progress: string }> = {
  info: { container: 'bg-white border-l-4 border-l-blue-500', icon: 'text-blue-500', progress: 'bg-blue-500' },
  success: { container: 'bg-white border-l-4 border-l-success-500', icon: 'text-success-500', progress: 'bg-success-500' },
  warning: { container: 'bg-white border-l-4 border-l-warning-500', icon: 'text-warning-500', progress: 'bg-warning-500' },
  danger: { container: 'bg-white border-l-4 border-l-danger-500', icon: 'text-danger-500', progress: 'bg-danger-500' },
};

const defaultIcons: Record<ToastVariant, React.ReactNode> = {
  info: <Info className="w-5 h-5" />,
  success: <CheckCircle className="w-5 h-5" />,
  warning: <AlertTriangle className="w-5 h-5" />,
  danger: <AlertCircle className="w-5 h-5" />,
};

const ToastItem: React.FC<{ toast: ToastData; onRemove: (id: string) => void }> = ({ toast, onRemove }) => {
  const [progress, setProgress] = useState(100);
  const styles = variantStyles[toast.variant];
  const duration = toast.duration || 4000;

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining <= 0) onRemove(toast.id);
    }, 50);
    return () => clearInterval(interval);
  }, [duration, toast.id, onRemove]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn('relative w-80 rounded-xl shadow-dropdown overflow-hidden pointer-events-auto', styles.container)}
      role="alert"
    >
      <div className="flex gap-3 p-4">
        <div className={cn('shrink-0', styles.icon)}>{defaultIcons[toast.variant]}</div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-surface-900">{toast.message}</p>
          {toast.description && <p className="text-xs text-surface-500 mt-0.5">{toast.description}</p>}
        </div>
        <button type="button" onClick={() => onRemove(toast.id)} className="shrink-0 p-1 rounded-lg text-surface-400 hover:text-surface-700 hover:bg-surface-100 transition-colors focus:outline-none" aria-label="Dismiss">
          <X className="w-4 h-4" />
        </button>
      </div>
      <motion.div className={cn('h-0.5', styles.progress)} style={{ width: `${progress}%` }} transition={{ duration: 0.05 }} />
    </motion.div>
  );
};

const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const counterRef = useRef(0);

  useEffect(() => {
    const listener = (data: Omit<ToastData, 'id'>) => {
      counterRef.current += 1;
      const id = `toast-${counterRef.current}`;
      setToasts(prev => [...prev, { ...data, id }]);
    };
    toastListeners.add(listener);
    return () => { toastListeners.delete(listener); };
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addToast = useCallback((data: Omit<ToastData, 'id'>) => {
    counterRef.current += 1;
    const id = `toast-${counterRef.current}`;
    setToasts(prev => [...prev, { ...data, id }]);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      <div aria-live="polite" className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none" style={{ maxWidth: 'calc(100vw - 2rem)' }}>
        <AnimatePresence mode="popLayout">
          {toasts.map(t => (
            <ToastItem key={t.id} toast={t} onRemove={removeToast} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export { ToastContainer as Toast, ToastContext, type ToastData, type ToastVariant };