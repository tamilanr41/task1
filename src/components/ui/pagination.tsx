'use client';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
}

function getPageRange(current: number, total: number, siblings: number): (number | 'ellipsis')[] {
  const totalNumbers = siblings * 2 + 5;
  if (total <= totalNumbers) return Array.from({ length: total }, (_, i) => i + 1);

  const leftSibling = Math.max(current - siblings, 1);
  const rightSibling = Math.min(current + siblings, total);
  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < total - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftCount = 3 + 2 * siblings;
    const leftRange = Array.from({ length: leftCount }, (_, i) => i + 1);
    return [...leftRange, 'ellipsis', total];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightCount = 3 + 2 * siblings;
    const rightRange = Array.from({ length: rightCount }, (_, i) => total - rightCount + i + 1);
    return [1, 'ellipsis', ...rightRange];
  }

  return [1, 'ellipsis', ...Array.from({ length: rightSibling - leftSibling + 1 }, (_, i) => leftSibling + i), 'ellipsis', total];
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, siblingCount = 1, className }) => {
  const pages = useMemo(() => getPageRange(currentPage, totalPages, siblingCount), [currentPage, totalPages, siblingCount]);

  if (totalPages <= 1) return null;

  return (
    <nav className={cn('flex items-center justify-center gap-1', className)} aria-label="Pagination">
      <button
        type="button"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg text-surface-400 hover:text-surface-700 hover:bg-surface-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30"
        aria-label="First page"
      >
        <ChevronsLeft className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg text-surface-400 hover:text-surface-700 hover:bg-surface-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <div className="flex items-center gap-1">
        {pages.map((page, idx) =>
          page === 'ellipsis' ? (
            <span key={`ellipsis-${idx}`} className="w-9 h-9 flex items-center justify-center text-sm text-surface-400">
              ...
            </span>
          ) : (
            <motion.button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'relative w-9 h-9 flex items-center justify-center text-sm font-medium rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30',
                page === currentPage
                  ? 'text-white'
                  : 'text-surface-600 hover:bg-surface-100'
              )}
              aria-current={page === currentPage ? 'page' : undefined}
              aria-label={`Page ${page}`}
            >
              {page === currentPage && (
                <motion.span
                  layoutId="pagination-active"
                  className="absolute inset-0 bg-primary-500 rounded-lg"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{page}</span>
            </motion.button>
          )
        )}
      </div>
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg text-surface-400 hover:text-surface-700 hover:bg-surface-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30"
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg text-surface-400 hover:text-surface-700 hover:bg-surface-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30"
        aria-label="Last page"
      >
        <ChevronsRight className="w-4 h-4" />
      </button>
    </nav>
  );
};

export { Pagination, type PaginationProps };
