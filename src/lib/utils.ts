import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

export function formatCurrency(amount: number, currency = 'INR'): string {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
}

export function formatDate(date: string | Date, style: 'short' | 'long' | 'full' = 'long'): string {
  const d = new Date(date);
  const opts: Intl.DateTimeFormatOptions = style === 'short' ? { day: 'numeric', month: 'short', year: 'numeric' }
    : style === 'full' ? { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }
    : { day: 'numeric', month: 'long', year: 'numeric' };
  return d.toLocaleDateString('en-IN', opts);
}

export function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

export function truncate(str: string, length = 100): string {
  return str.length > length ? str.slice(0, length) + '...' : str;
}

export function slugify(str: string): string {
  return str.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

export function generateCaseNumber(): string {
  const year = new Date().getFullYear();
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `LF/${year}/${rand}`;
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    active: 'bg-green-100 text-green-800', closed: 'bg-gray-100 text-gray-800',
    pending: 'bg-yellow-100 text-yellow-800', intake: 'bg-blue-100 text-blue-800',
    draft: 'bg-gray-100 text-gray-800', sent: 'bg-blue-100 text-blue-800',
    paid: 'bg-green-100 text-green-800', overdue: 'bg-red-100 text-red-800',
    confirmed: 'bg-green-100 text-green-800', cancelled: 'bg-red-100 text-red-800',
    completed: 'bg-green-100 text-green-800', new: 'bg-blue-100 text-blue-800',
  };
  return map[status.toLowerCase()] || 'bg-gray-100 text-gray-800';
}

export const practiceAreasList = [
  { slug: 'corporate-law', title: 'Corporate Law', icon: 'building', description: 'Business formation, compliance, mergers & acquisitions, corporate governance.' },
  { slug: 'criminal-law', title: 'Criminal Law', icon: 'shield', description: 'Criminal defense, bail, appeals, white-collar crime representation.' },
  { slug: 'civil-litigation', title: 'Civil Litigation', icon: 'scale', description: 'Dispute resolution, contracts, property disputes, tort claims.' },
  { slug: 'divorce', title: 'Divorce', icon: 'heart', description: 'Divorce proceedings, alimony, child custody, mutual consent divorce.' },
  { slug: 'family-law', title: 'Family Law', icon: 'users', description: 'Marriage, adoption, guardianship, domestic violence, inheritance.' },
  { slug: 'property-law', title: 'Property Law', icon: 'home', description: 'Property registration, title verification, land disputes, RERA.' },
  { slug: 'immigration', title: 'Immigration', icon: 'plane', description: 'Visa applications, green cards, citizenship, deportation defense.' },
  { slug: 'tax-law', title: 'Tax Law', icon: 'calculator', description: 'Income tax, GST, tax planning, notices, appeals.' },
  { slug: 'intellectual-property', title: 'Intellectual Property', icon: 'lightbulb', description: 'Trademarks, patents, copyrights, IP litigation, licensing.' },
  { slug: 'startup-legal', title: 'Startup Legal', icon: 'rocket', description: 'Incorporation, fundraising, contracts, compliance, ESOPs.' },
  { slug: 'consumer-law', title: 'Consumer Law', icon: 'shopping-cart', description: 'Consumer complaints, product liability, refunds, unfair trade.' },
];

export const caseStages = [
  'Consultation Completed', 'Documents Received', 'Legal Notice Sent',
  'Court Filing', 'Hearing Scheduled', 'Awaiting Judgment', 'Closed'
];
