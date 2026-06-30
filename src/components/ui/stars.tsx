import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function StarRating({ rating, size = 16, showValue = true }: { rating: number; size?: number; showValue?: boolean }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={size} className={cn('transition-colors', i <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300')} />
      ))}
      {showValue && <span className="ml-1 text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>}
    </div>
  );
}
