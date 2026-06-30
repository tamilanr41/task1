'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell, CheckCheck, Mail, CreditCard, Calendar, Settings,
  AlertCircle, CheckCircle, X, ArrowRight, Shield, DollarSign,
  UserPlus, FileText, MessageSquare, Star
} from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, type Tab } from '@/components/ui/tabs';
import { EmptyState } from '@/components/ui/empty-state';
import { AnimatedSection } from '@/lib/animation';

interface Notification {
  id: string;
  type: 'case' | 'payment' | 'appointment' | 'system' | 'document' | 'message';
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionable?: boolean;
}

const initialNotifications: Notification[] = [
  { id: 'n1', type: 'case', title: 'Case Update: TechStart vs Sharma', message: 'New hearing scheduled for June 15, 2026 at 10:00 AM', time: '2026-05-28T09:30:00', read: false },
  { id: 'n2', type: 'payment', title: 'Payment Received: ₹1,50,000', message: 'Invoice INV-2026-0001 has been paid via UPI', time: '2026-05-28T08:15:00', read: false },
  { id: 'n3', type: 'appointment', title: 'Consultation Reminder', message: 'Meeting with Mr. Rajesh Mehta at 3:00 PM tomorrow', time: '2026-05-27T14:00:00', read: false },
  { id: 'n4', type: 'system', title: 'System Update Complete', message: 'Platform updated to v3.2.0 with new features', time: '2026-05-27T06:00:00', read: true },
  { id: 'n5', type: 'document', title: 'Document Signed: NDA Agreement', message: 'NDA for TechStart acquisition has been e-signed by all parties', time: '2026-05-26T16:45:00', read: true },
  { id: 'n6', type: 'message', title: 'New Message from Adv. Priya Patel', message: 'Regarding the Sharma property documents review', time: '2026-05-26T11:20:00', read: false },
  { id: 'n7', type: 'case', title: 'Case Closed: Patel Property Dispute', message: 'The property dispute has been resolved with a favorable verdict', time: '2026-05-25T17:00:00', read: true },
  { id: 'n8', type: 'payment', title: 'Invoice Overdue: INV-2026-0003', message: 'Payment of ₹2,50,000 is overdue by 7 days', time: '2026-05-25T09:00:00', read: false },
  { id: 'n9', type: 'appointment', title: 'Court Appearance Confirmed', message: 'Karnataka High Court - June 2 at 10:30 AM for State vs Kumar', time: '2026-05-24T15:30:00', read: true },
  { id: 'n10', type: 'system', title: 'Storage Alert: 85% Full', message: 'Document storage is nearing capacity. Consider archiving old files.', time: '2026-05-24T08:00:00', read: true },
  { id: 'n11', type: 'case', title: 'New Evidence Uploaded', message: 'Financial statements uploaded for case TechStart vs Sharma', time: '2026-05-23T13:10:00', read: true },
  { id: 'n12', type: 'document', title: 'Contract Expiring Soon', message: 'Employment contract for Senior Associate expires in 30 days', time: '2026-05-23T10:00:00', read: false },
];

const notificationIcons: Record<string, React.ReactNode> = {
  case: <Shield className="w-5 h-5" />,
  payment: <DollarSign className="w-5 h-5" />,
  appointment: <Calendar className="w-5 h-5" />,
  system: <Settings className="w-5 h-5" />,
  document: <FileText className="w-5 h-5" />,
  message: <MessageSquare className="w-5 h-5" />,
};

const notificationColors: Record<string, string> = {
  case: 'bg-blue-50 text-blue-600',
  payment: 'bg-green-50 text-green-600',
  appointment: 'bg-purple-50 text-purple-600',
  system: 'bg-amber-50 text-amber-600',
  document: 'bg-cyan-50 text-cyan-600',
  message: 'bg-rose-50 text-rose-600',
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [activeTab, setActiveTab] = useState('all');
  const [animatingIds, setAnimatingIds] = useState<Set<string>>(new Set());

  const unreadCount = notifications.filter(n => !n.read).length;

  const tabs: Tab[] = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'unread', label: 'Unread', count: unreadCount },
    { id: 'case', label: 'Cases', icon: <Shield className="w-3.5 h-3.5" /> },
    { id: 'payment', label: 'Payments', icon: <DollarSign className="w-3.5 h-3.5" /> },
    { id: 'appointment', label: 'Appointments', icon: <Calendar className="w-3.5 h-3.5" /> },
    { id: 'system', label: 'System', icon: <Settings className="w-3.5 h-3.5" /> },
  ];

  const filteredNotifications = useMemo(() => {
    if (activeTab === 'all') return notifications;
    if (activeTab === 'unread') return notifications.filter(n => !n.read);
    return notifications.filter(n => n.type === activeTab);
  }, [notifications, activeTab]);

  const markAllAsRead = () => {
    const unreadIds = notifications.filter(n => !n.read).map(n => n.id);
    setAnimatingIds(new Set(unreadIds));
    setTimeout(() => {
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setAnimatingIds(new Set());
    }, 400);
  };

  const markAsRead = (id: string) => {
    setAnimatingIds(prev => new Set(prev).add(id));
    setTimeout(() => {
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
      setAnimatingIds(prev => { const next = new Set(prev); next.delete(id); return next; });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <AnimatedSection>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-surface-900 font-serif">Notifications</h1>
              <p className="text-surface-500 mt-1">
                {unreadCount > 0
                  ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`
                  : 'All caught up!'}
              </p>
            </div>
            {unreadCount > 0 && (
              <Button variant="outline" size="md" onClick={markAllAsRead}>
                <CheckCheck className="w-4 h-4" />
                Mark all as read
              </Button>
            )}
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="pills" />
        </AnimatedSection>

        <AnimatePresence mode="wait">
          {filteredNotifications.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <EmptyState
                icon={<Bell className="w-10 h-10" />}
                title={activeTab === 'unread' ? 'No unread notifications' : 'No notifications'}
                description={activeTab === 'unread' ? 'You\'ve read all your notifications' : 'You don\'t have any notifications in this category'}
              />
            </motion.div>
          ) : (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
              {filteredNotifications.map((notification, idx) => {
                const isAnimating = animatingIds.has(notification.id);
                return (
                  <motion.div
                    key={notification.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      backgroundColor: isAnimating ? 'rgba(26, 54, 93, 0.04)' : 'transparent',
                    }}
                    exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                    transition={{ delay: idx * 0.02, duration: 0.3 }}
                    onClick={() => !notification.read && markAsRead(notification.id)}
                    className={cn(
                      'relative flex items-start gap-4 p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-300 group',
                      !notification.read
                        ? 'bg-primary-50/30 border border-primary-100 hover:bg-primary-50/50'
                        : 'bg-white border border-transparent hover:bg-surface-50 hover:border-surface-200'
                    )}
                  >
                    {!notification.read && (
                      <motion.span
                        layoutId={`dot-${notification.id}`}
                        className="absolute top-5 right-5 w-2 h-2 rounded-full bg-primary-500"
                      />
                    )}
                    <div className={cn(
                      'w-11 h-11 rounded-xl flex items-center justify-center shrink-0',
                      notificationColors[notification.type]
                    )}>
                      {notificationIcons[notification.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className={cn('text-sm', !notification.read ? 'font-semibold text-surface-900' : 'font-medium text-surface-700')}>
                            {notification.title}
                          </h4>
                          <p className="text-sm text-surface-500 mt-0.5 line-clamp-2">{notification.message}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-surface-400">{formatDate(notification.time, 'full')}</span>
                        <Badge variant={notification.type === 'payment' ? 'success' : notification.type === 'system' ? 'default' : 'primary'} size="sm">
                          {notification.type}
                        </Badge>
                        {!notification.read && (
                          <span className="text-xs font-medium text-primary-500">New</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {notification.actionable && (
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      )}
                      <button
                        onClick={(e) => { e.stopPropagation(); markAsRead(notification.id); }}
                        className="p-1.5 rounded-lg text-surface-300 hover:text-surface-500 hover:bg-surface-100 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
