'use client';
import { cn } from '@/lib/utils';

type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'card';

interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  count?: number;
  className?: string;
}

const variantStyles: Record<SkeletonVariant, string> = {
  text: 'h-4 rounded-md w-full',
  circular: 'rounded-full',
  rectangular: 'rounded-xl',
  card: 'rounded-2xl h-40 w-full',
};

const Skeleton: React.FC<SkeletonProps> = ({ variant = 'text', width, height, count = 1, className }) => {
  const baseClass = cn(
    'relative overflow-hidden bg-surface-100',
    variantStyles[variant],
    className
  );

  const style: React.CSSProperties = {
    ...(width ? { width: typeof width === 'number' ? `${width}px` : width } : {}),
    ...(height ? { height: typeof height === 'number' ? `${height}px` : height } : {}),
  };

  const renderItem = (key: number) => (
    <div key={key} className={baseClass} style={style}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
    </div>
  );

  if (variant === 'text') {
    const widths = ['100%', '92%', '85%', '78%', '95%'];
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className={cn(baseClass)} style={{ width: widths[i % widths.length], height: style.height || undefined }}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {Array.from({ length: count }).map((_, i) => renderItem(i))}
    </>
  );
};

export { Skeleton, type SkeletonProps, type SkeletonVariant };
