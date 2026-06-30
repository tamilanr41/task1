'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Users, Briefcase, Star, Shield,
  UserCog, Layers, CreditCard, FileText, BarChart3, Settings,
  Bell, BookOpen, MessageSquare, Activity, HardDrive,
  Zap, ArrowUpRight, ArrowDownRight, ChevronRight,
  Gavel, DollarSign
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Avatar, Button } from '@/components/ui';
import { cn } from '@/lib/utils';

/* ───── Staggered animation variants ───── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

const scaleVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
};

/* ───── Data ───── */
interface Stat {
  label: string; value: string; icon: React.ElementType; trend: 'up' | 'down' | 'neutral';
  trendLabel: string; accent: string; bgAccent: string;
}

const stats: Stat[] = [
  { label: 'Total Lawyers', value: '25', icon: Gavel, trend: 'up', trendLabel: '+3 this month', accent: 'text-primary-500', bgAccent: 'bg-primary-50' },
  { label: 'Active Cases', value: '128', icon: Briefcase, trend: 'up', trendLabel: '+12 this week', accent: 'text-success-500', bgAccent: 'bg-success-50' },
  { label: 'Total Clients', value: '1,842', icon: Users, trend: 'up', trendLabel: '98% active', accent: 'text-accent-500', bgAccent: 'bg-accent-50' },
  { label: 'Revenue (MTD)', value: '₹42.5L', icon: DollarSign, trend: 'up', trendLabel: '+15% vs last month', accent: 'text-primary-500', bgAccent: 'bg-primary-50' },
  { label: 'Pending Reviews', value: '8', icon: MessageSquare, trend: 'down', trendLabel: '4 flagged', accent: 'text-warning-500', bgAccent: 'bg-warning-50' },
  { label: 'Staff Members', value: '15', icon: Shield, trend: 'neutral', trendLabel: 'All active', accent: 'text-surface-500', bgAccent: 'bg-surface-100' },
];

interface Module {
  label: string; href: string; icon: React.ElementType; desc: string; color: string; gradient: string;
}

const modules: Module[] = [
    { label: 'Lawyers', href: '/lawyers', icon: Gavel, desc: 'Manage profiles, verification, assignments', color: 'text-primary-500', gradient: 'from-primary-50 to-primary-100' },
    { label: 'Staff', href: '/lawyers', icon: UserCog, desc: 'Roles, permissions, staff oversight', color: 'text-surface-600', gradient: 'from-surface-50 to-surface-100' },
    { label: 'Clients', href: '/portal', icon: Users, desc: 'Client management, case history', color: 'text-success-600', gradient: 'from-success-50 to-success-100' },
    { label: 'Cases', href: '/portal', icon: Layers, desc: 'All cases, status, assignments', color: 'text-purple-600', gradient: 'from-purple-50 to-purple-100' },
    { label: 'Payments', href: '/payments', icon: CreditCard, desc: 'Invoices, payments, trust accounting', color: 'text-primary-500', gradient: 'from-primary-50 to-primary-100' },
    { label: 'Content', href: '/practice-areas', icon: FileText, desc: 'Website content, practice areas', color: 'text-orange-600', gradient: 'from-orange-50 to-orange-100' },
    { label: 'Blog', href: '/blog', icon: BookOpen, desc: 'Blog posts, knowledge base', color: 'text-emerald-600', gradient: 'from-emerald-50 to-emerald-100' },
    { label: 'Reviews', href: '/reviews', icon: Star, desc: 'Client reviews, moderation', color: 'text-warning-600', gradient: 'from-warning-50 to-warning-100' },
    { label: 'Analytics', href: '/admin/analytics', icon: BarChart3, desc: 'Reports, insights, metrics', color: 'text-primary-500', gradient: 'from-primary-50 to-primary-100' },
    { label: 'Settings', href: '/settings', icon: Settings, desc: 'System configuration', color: 'text-surface-600', gradient: 'from-surface-50 to-surface-100' },
  ];

interface Activity {
  user: string; action: string; target: string; time: string;
}

const activities: Activity[] = [
  { user: 'Adv. Rajesh Sharma', action: 'created new case', target: 'Sharma Property Dispute', time: '2 hours ago' },
  { user: 'System', action: 'payment received', target: '₹25,000 from Rahul Mehta', time: '4 hours ago' },
  { user: 'Adv. Priya Patel', action: 'updated case status', target: 'Patel Divorce → Hearing Scheduled', time: '5 hours ago' },
  { user: 'Admin', action: 'approved lawyer profile', target: "Adv. Maria D'Souza", time: '1 day ago' },
  { user: 'System', action: 'new client registered', target: 'Suresh Gupta +3 more', time: '1 day ago' },
];

const quickStats = [
  { label: 'System Uptime', value: '99.97%', icon: Activity, color: 'text-success-500', bg: 'bg-success-50' },
  { label: 'Active Users Now', value: '18', icon: Users, color: 'text-primary-500', bg: 'bg-primary-50' },
  { label: 'Storage Used', value: '64%', icon: HardDrive, color: 'text-accent-500', bg: 'bg-accent-50' },
  { label: 'API Calls Today', value: '2,847', icon: Zap, color: 'text-purple-500', bg: 'bg-purple-50' },
];

/* ───── Helper components ───── */

function TrendBadge({ trend }: { trend: 'up' | 'down' | 'neutral' }) {
  if (trend === 'neutral') return null;
  const Icon = trend === 'up' ? ArrowUpRight : ArrowDownRight;
  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={cn(
        'inline-flex items-center gap-0.5 text-2xs font-semibold px-1.5 py-0.5 rounded-full',
        trend === 'up' ? 'bg-success-50 text-success-600' : 'bg-danger-50 text-danger-600'
      )}
    >
      <Icon className="w-2.5 h-2.5" />
    </motion.span>
  );
}

function ActivityRow({ activity, index }: { activity: Activity; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ x: 4, backgroundColor: 'rgba(26,54,93,0.02)' }}
      className="group flex items-center gap-3 p-3 rounded-xl transition-colors cursor-default"
    >
      <Avatar name={activity.user} size="sm" />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-surface-700">
          <span className="font-semibold text-surface-900">{activity.user}</span>
          {' '}{activity.action}:{' '}
          <span className="text-primary-500 font-medium">{activity.target}</span>
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-2xs text-surface-400">{activity.time}</span>
        <ChevronRight className="w-3.5 h-3.5 text-surface-300 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  );
}

/* ───── Page ───── */
export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-surface-50/50">
      {/* ── Header ── */}
      <header className="relative overflow-hidden bg-gradient-to-br from-primary-500 via-primary-500 to-primary-700">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif tracking-tight">
                  Admin Dashboard
                </h1>
                <Badge variant="success" size="sm" dot>
                  All Systems Active
                </Badge>
              </div>
              <p className="text-primary-100 text-sm sm:text-base">
                Full control over your legal practice
              </p>
            </div>
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-danger-500 border-2 border-primary-500 rounded-full text-2xs font-bold flex items-center justify-center text-white">
                  3
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* ── 1. Key Metrics ── */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {stats.map((s) => (
              <motion.div key={s.label} variants={itemVariants}>
                <Card variant="interactive" padding="sm" className="h-full">
                  <CardContent className="p-4 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xs font-semibold text-surface-500 uppercase tracking-wider">{s.label}</span>
                      <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center', s.bgAccent)}>
                        <s.icon className={cn('w-4 h-4', s.accent)} />
                      </div>
                    </div>
                    <div className="mt-auto">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xl font-bold text-surface-900">{s.value}</span>
                        <TrendBadge trend={s.trend} />
                      </div>
                      <p className="text-2xs text-surface-400 mt-0.5">{s.trendLabel}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── 2. Management Modules ── */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-semibold text-surface-900 font-serif">Management Modules</h2>
              <p className="text-sm text-surface-500">Quick access to every section of the platform</p>
            </div>
            <Badge variant="primary" size="sm">{modules.length} modules</Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {modules.map((m, i) => (
              <motion.div key={m.label} variants={itemVariants} custom={i}>
                <Link href={m.href} className="block h-full group">
                  <Card variant="interactive" padding="none" className="h-full overflow-hidden">
                    <CardContent className="p-5 relative">
                      <div className={cn(
                        'w-11 h-11 rounded-xl flex items-center justify-center mb-3.5 bg-gradient-to-br transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3',
                        m.gradient
                      )}>
                        <m.icon className={cn('w-5 h-5', m.color)} />
                      </div>
                      <h3 className="font-semibold text-sm text-surface-900 group-hover:text-primary-500 transition-colors">
                        {m.label}
                      </h3>
                      <p className="text-2xs text-surface-400 mt-1 leading-relaxed">{m.desc}</p>
                      <div className="flex items-center gap-1 mt-3 text-2xs font-medium text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Open</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── 3. Recent Activity + Quick Stats ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <motion.section
            className="lg:col-span-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            <Card variant="default" padding="none" className="overflow-hidden">
              <CardHeader className="px-6 pt-6 pb-0">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary-500" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="divide-y divide-surface-50">
                  {activities.map((a, i) => (
                    <ActivityRow key={i} activity={a} index={i} />
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="mt-2 pt-2 border-t border-surface-50"
                >
                  <Button variant="ghost" size="sm" fullWidth iconRight={<ChevronRight className="w-3.5 h-3.5" />}>
                    View All Activity
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Quick System Stats */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            <Card variant="default" padding="none" className="overflow-hidden h-full">
              <CardHeader className="px-6 pt-6 pb-0">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-accent-500" />
                  System Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-1 gap-3">
                  {quickStats.map((qs, i) => (
                    <motion.div
                      key={qs.label}
                      variants={scaleVariants}
                      custom={i}
                      whileHover={{ scale: 1.02 }}
                      className={cn(
                        'flex items-center gap-3 p-3.5 rounded-xl border border-surface-100 transition-colors',
                        'hover:border-surface-200 hover:bg-surface-50/50'
                      )}
                    >
                      <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', qs.bg)}>
                        <qs.icon className={cn('w-5 h-5', qs.color)} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-surface-500">{qs.label}</p>
                        <p className="text-base font-bold text-surface-900">{qs.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.section>
        </div>
      </main>

      {/* ── Subtle footer separator ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="h-px bg-gradient-to-r from-transparent via-surface-200 to-transparent" />
      </div>
    </div>
  );
}
