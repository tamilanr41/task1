'use client';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (item: T, index: number) => React.ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onSort?: (key: string) => void;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
  rowKey?: (item: T, index: number) => string;
}

function SkeletonRow({ columns }: { columns: number }) {
  return (
    <tr className="animate-pulse">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 bg-surface-100 rounded w-3/4" />
        </td>
      ))}
    </tr>
  );
}

function Table<T extends Record<string, any>>({
  columns, data, onSort, sortBy, sortDir, loading, emptyMessage = 'No data available', className, rowKey
}: TableProps<T>) {
  const getSortIcon = (key: string) => {
    if (sortBy !== key) return <ChevronsUpDown className="w-3.5 h-3.5 text-surface-300" />;
    return sortDir === 'asc' ? <ChevronUp className="w-3.5 h-3.5 text-primary-500" /> : <ChevronDown className="w-3.5 h-3.5 text-primary-500" />;
  };

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-surface-100">
      <table className="w-full text-sm" role="table">
        <thead>
          <tr className="border-b border-surface-100 bg-surface-50/50">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  'px-4 py-3.5 text-left text-xs font-semibold text-surface-600 uppercase tracking-wider',
                  col.sortable && 'cursor-pointer select-none hover:text-surface-900 transition-colors',
                  col.className
                )}
                onClick={() => col.sortable && onSort?.(col.key)}
                scope="col"
                aria-sort={sortBy === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : undefined}
              >
                <div className="flex items-center gap-1.5">
                  <span>{col.label}</span>
                  {col.sortable && <span>{getSortIcon(col.key)}</span>}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-50">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} columns={columns.length} />)
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-12 text-center text-surface-400">
                {emptyMessage}
              </td>
            </tr>
          ) : data.map((item, index) => (
            <motion.tr
              key={rowKey ? rowKey(item, index) : index}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.02, duration: 0.2 }}
              className="hover:bg-surface-50/50 transition-colors group"
            >
              {columns.map((col) => (
                <td key={col.key} className={cn('px-4 py-3 text-surface-700', col.className)}>
                  {col.render ? col.render(item, index) : String(item[col.key] ?? '')}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { Table, type TableProps, type Column };
