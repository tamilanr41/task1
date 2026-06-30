'use client';
import { cn, getInitials } from '@/lib/utils';
import { motion } from 'framer-motion';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type AvatarStatus = 'online' | 'offline' | 'away' | 'busy';
type AvatarShape = 'circle' | 'square';

interface AvatarProps {
  src?: string;
  name: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  shape?: AvatarShape;
  bordered?: boolean;
  className?: string;
}

const sizeStyles: Record<AvatarSize, { container: string; text: string }> = {
  xs: { container: 'w-6 h-6', text: 'text-2xs' },
  sm: { container: 'w-8 h-8', text: 'text-xs' },
  md: { container: 'w-10 h-10', text: 'text-sm' },
  lg: { container: 'w-14 h-14', text: 'text-lg' },
  xl: { container: 'w-20 h-20', text: 'text-2xl' },
  '2xl': { container: 'w-28 h-28', text: 'text-4xl' },
};

const statusColors: Record<AvatarStatus, string> = {
  online: 'bg-success-500',
  offline: 'bg-surface-400',
  away: 'bg-warning-500',
  busy: 'bg-danger-500',
};

const statusSizes: Record<AvatarSize, string> = {
  xs: 'w-1.5 h-1.5 ring-1',
  sm: 'w-2 h-2 ring-1',
  md: 'w-2.5 h-2.5 ring-2',
  lg: 'w-3 h-3 ring-2',
  xl: 'w-3.5 h-3.5 ring-2',
  '2xl': 'w-4 h-4 ring-2',
};

const gradients = [
  'from-primary-400 to-primary-600',
  'from-accent-400 to-accent-600',
  'from-purple-400 to-purple-600',
  'from-blue-400 to-cyan-500',
  'from-rose-400 to-pink-600',
  'from-emerald-400 to-teal-600',
];

const Avatar: React.FC<AvatarProps> = ({ src, name, size = 'md', status, shape = 'circle', bordered, className }) => {
  const initials = getInitials(name);
  const gradientIndex = initials.charCodeAt(0) % gradients.length;
  const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-lg';

  return (
    <div className="relative inline-flex shrink-0">
      {src ? (
        <img
          src={src}
          alt={name}
          className={cn(sizeStyles[size].container, shapeClass, 'object-cover', bordered && 'ring-2 ring-white shadow-soft', className)}
        />
      ) : (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className={cn(
            sizeStyles[size].container,
            shapeClass,
            'bg-gradient-to-br flex items-center justify-center font-semibold text-white',
            gradients[gradientIndex],
            bordered && 'ring-2 ring-white shadow-soft',
            className
          )}
          aria-label={name}
        >
          <span className={cn('leading-none', sizeStyles[size].text)}>{initials}</span>
        </motion.div>
      )}
      {status && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          className={cn(
            'absolute bottom-0 right-0 rounded-full ring-white',
            shape === 'square' ? '-bottom-0.5 -right-0.5' : '',
            statusColors[status],
            statusSizes[size]
          )}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
};

export { Avatar, type AvatarProps, type AvatarSize, type AvatarStatus, type AvatarShape };
