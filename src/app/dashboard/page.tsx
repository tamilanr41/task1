'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Briefcase, Calendar, Clock, CreditCard, FileText, MessageCircle,
  Search, TrendingUp, ArrowUpRight, ChevronRight, Plus, Zap,
  Scale, Upload, BookOpen, CheckCircle2, AlertCircle, Activity,
} from 'lucide-react';
import { Button, Badge, Card, CardContent, CardHeader, CardTitle, Avatar, Table, Input } from '@/components/ui';
import { cn, formatCurrency, formatDate } from '@/lib/utils';
import { AnimatedSection, CountUp, staggerContainer, easeOutExpo } from '@/lib/animation';

type EventType = 'court' | 'hearing' | 'meeting' | 'deadline';
type CaseStatus = 'Active' | 'Pending' | 'Closed' | 'Draft';
type Priority = 'High' | 'Medium' | 'Low';
type SortDir = 'asc' | 'desc';

interface TodayEvent {
  time: string;
  title: string;
  type: EventType;
  lawyer: string;
}

interface ActiveCase {
  id: string;
  title: string;
  client: string;
  status: CaseStatus;
  nextDate: string;
  priority: Priority;
}

interface TimeEntry {
  task: string;
  hours: number;
  date: string;
  billable: boolean;
}

interface Deadline {
  title: string;
  date: string;
  caseId: string;
}

interface ActivityItem {
  action: string;
  detail: string;
  time: string;
  type: 'case' | 'document' | 'message' | 'invoice';
}

const todayEvents: TodayEvent[] = [
  { time: '09:00 AM', title: 'Criminal Bail Hearing - State v. Mehta', type: 'court', lawyer: 'Adv. Rajesh Sharma' },
  { time: '10:30 AM', title: 'Client Conference - Sharma Property', type: 'meeting', lawyer: 'Adv. Rajesh Sharma' },
  { time: '02:00 PM', title: 'Mediation - Patel Divorce', type: 'hearing', lawyer: 'Adv. Rajesh Sharma' },
  { time: '05:00 PM', title: 'Document Filing Deadline - TechStart Merger', type: 'deadline', lawyer: 'Adv. Rajesh Sharma' },
];

const activeCases: ActiveCase[] = [
  { id: 'LF/2026/A1B2C3', title: 'Sharma Property Dispute', client: 'Rahul Sharma', status: 'Active', nextDate: '2026-08-15', priority: 'High' },
  { id: 'LF/2026/D4E5F6', title: 'Patel Divorce Case', client: 'Anita Patel', status: 'Active', nextDate: '2026-08-20', priority: 'Medium' },
  { id: 'LF/2026/G7H8I9', title: 'TechStart Merger & Acquisition', client: 'TechStart Ltd', status: 'Pending', nextDate: '2026-09-01', priority: 'High' },
  { id: 'LF/2026/J0K1L2', title: 'Consumer Complaint - Gupta Electronics', client: 'Suresh Gupta', status: 'Active', nextDate: '2026-08-10', priority: 'Low' },
  { id: 'LF/2026/M3N4O5', title: 'Property Registration - Kumar Estate', client: 'Anil Kumar', status: 'Pending', nextDate: '2026-08-28', priority: 'Medium' },
  { id: 'LF/2026/P6Q7R8', title: 'Corporate Compliance - ABC Corp', client: 'ABC Corporation', status: 'Active', nextDate: '2026-08-12', priority: 'High' },
];

const recentTimeEntries: TimeEntry[] = [
  { task: 'Case Research - Sharma Property Dispute', hours: 2.5, date: '2026-06-28', billable: true },
  { task: 'Court Appearance - Patel Divorce Hearing', hours: 4.0, date: '2026-06-27', billable: true },
  { task: 'Document Drafting - TechStart Merger Agreement', hours: 3.0, date: '2026-06-26', billable: true },
  { task: 'Client Consultation - New Intake Verma', hours: 1.5, date: '2026-06-25', billable: true },
  { task: 'Legal Research - Precedent Analysis', hours: 2.0, date: '2026-06-24', billable: false },
];

const upcomingDeadlines: Deadline[] = [
  { title: 'File Written Submission - Sharma Case', date: '2026-07-05', caseId: 'LF/2026/A1B2C3' },
  { title: 'Mediation Report - Patel Divorce', date: '2026-07-10', caseId: 'LF/2026/D4E5F6' },
  { title: 'Due Diligence Report - TechStart Merger', date: '2026-07-15', caseId: 'LF/2026/G7H8I9' },
  { title: 'Consumer Court Appearance - Gupta', date: '2026-07-18', caseId: 'LF/2026/J0K1L2' },
];

const recentActivity: ActivityItem[] = [
  { action: 'Case Updated', detail: 'Sharma Property Dispute - New evidence filed', time: '2 hours ago', type: 'case' },
  { action: 'Document Uploaded', detail: 'Patel Divorce - Financial affidavit received', time: '4 hours ago', type: 'document' },
  { action: 'Message Received', detail: 'TechStart Ltd - Request for contract amendment', time: '5 hours ago', type: 'message' },
  { action: 'Invoice Paid', detail: 'Invoice #INV-2026-0042 - ₹25,000 received', time: '1 day ago', type: 'invoice' },
  { action: 'Case Updated', detail: 'Gupta Electronics - Next hearing scheduled', time: '1 day ago', type: 'case' },
  { action: 'Document Uploaded', detail: 'Kumar Estate - Title deed verification complete', time: '2 days ago', type: 'document' },
];

const eventTypeConfig: Record<EventType, { dot: string; bg: string; label: string }> = {
  court: { dot: 'bg-danger-500', bg: 'bg-danger-50', label: 'Court' },
  hearing: { dot: 'bg-warning-500', bg: 'bg-warning-50', label: 'Hearing' },
  meeting: { dot: 'bg-blue-500', bg: 'bg-blue-50', label: 'Meeting' },
  deadline: { dot: 'bg-accent-500', bg: 'bg-accent-50', label: 'Deadline' },
};

const statusBadgeVariant: Record<CaseStatus, 'success' | 'warning' | 'info' | 'default'> = {
  Active: 'success', Pending: 'warning', Closed: 'info', Draft: 'default',
};

const priorityBadgeConfig: Record<Priority, { variant: 'danger' | 'warning' | 'info'; label: string }> = {
  High: { variant: 'danger', label: 'High' },
  Medium: { variant: 'warning', label: 'Medium' },
  Low: { variant: 'info', label: 'Low' },
};

const quickActions = [
  { label: 'Add Time Entry', icon: Clock, color: 'bg-primary-500' },
  { label: 'Create Invoice', icon: CreditCard, color: 'bg-accent-500' },
  { label: 'New Case', icon: Briefcase, color: 'bg-success-500' },
  { label: 'Send Message', icon: MessageCircle, color: 'bg-blue-500' },
  { label: 'Upload Document', icon: Upload, color: 'bg-purple-500' },
  { label: 'Research Tool', icon: BookOpen, color: 'bg-warning-500' },
];

const activityIcons: Record<ActivityItem['type'], React.ReactNode> = {
  case: <Scale className="w-4 h-4" />,
  document: <FileText className="w-4 h-4" />,
  message: <MessageCircle className="w-4 h-4" />,
  invoice: <CreditCard className="w-4 h-4" />,
};

const activityIconBg: Record<ActivityItem['type'], string> = {
  case: 'bg-primary-100 text-primary-600',
  document: 'bg-accent-100 text-accent-600',
  message: 'bg-blue-100 text-blue-600',
  invoice: 'bg-success-100 text-success-600',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

function getDaysRemaining(dateStr: string): number {
  const now = new Date();
  const target = new Date(dateStr);
  const diff = target.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function getDaysColor(days: number): string {
  if (days <= 2) return 'text-danger-500';
  if (days <= 7) return 'text-warning-500';
  return 'text-success-500';
}

export default function LawyerDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<CaseStatus | 'All'>('All');
  const [sortBy, setSortBy] = useState<string>('priority');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const handleSort = (key: string) => {
    if (sortBy === key) { setSortDir(prev => prev === 'asc' ? 'desc' : 'asc'); }
    else { setSortBy(key); setSortDir('asc'); }
  };

  const filteredCases = useMemo(() => {
    let result = [...activeCases];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c => c.title.toLowerCase().includes(q) || c.client.toLowerCase().includes(q) || c.id.toLowerCase().includes(q));
    }
    if (statusFilter !== 'All') { result = result.filter(c => c.status === statusFilter); }
    const priorityOrder: Record<Priority, number> = { High: 3, Medium: 2, Low: 1 };
    result.sort((a, b) => {
      let cmp = 0;
      if (sortBy === 'priority') cmp = priorityOrder[a.priority] - priorityOrder[b.priority];
      else if (sortBy === 'status') cmp = a.status.localeCompare(b.status);
      else if (sortBy === 'nextDate') cmp = new Date(a.nextDate).getTime() - new Date(b.nextDate).getTime();
      else cmp = String(a[sortBy as keyof ActiveCase]).localeCompare(String(b[sortBy as keyof ActiveCase]));
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return result;
  }, [searchQuery, statusFilter, sortBy, sortDir]);

  const totalBillable = recentTimeEntries.filter(e => e.billable).reduce((s, e) => s + e.hours, 0);
  const totalNonBillable = recentTimeEntries.filter(e => !e.billable).reduce((s, e) => s + e.hours, 0);
  const billablePct = totalBillable + totalNonBillable > 0 ? (totalBillable / (totalBillable + totalNonBillable)) * 100 : 0;

  const casesWon = 4;
  const casesLost = 1;
  const totalCasesResolved = casesWon + casesLost;
  const wonPct = totalCasesResolved > 0 ? (casesWon / totalCasesResolved) * 100 : 0;

  const revenueThisMonth = 340000;

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="page-header relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent-500/10 to-transparent" />
        <div className="container-page py-6 md:py-8 lg:py-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={easeOutExpo}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
          >
            <Avatar name="Rajesh Sharma" size="xl" shape="circle" bordered />
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold font-serif text-white">Welcome back, Adv. Rajesh Sharma</h1>
              <p className="text-white/70 mt-1 flex items-center gap-2">
                <span>Senior Advocate • High Court</span>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span>Member since 2012</span>
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link href="/booking">
                <Button variant="secondary" size="sm">
                  <Calendar className="w-4 h-4" />
                  <span className="hidden sm:inline">Schedule</span>
                </Button>
              </Link>
              <Link href="/portal">
                <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                  <Briefcase className="w-4 h-4" />
                  <span className="hidden sm:inline">All Cases</span>
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container-page py-6 lg:py-8 space-y-6 lg:space-y-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
        >
          {[
            { label: 'Active Cases', value: activeCases.filter(c => c.status === 'Active').length, icon: Briefcase, accent: 'primary', change: '+2 this month', format: false },
            { label: 'Upcoming Hearings', value: '4', icon: Calendar, accent: 'accent', change: 'Next: Aug 15', format: false },
            { label: 'Billable Hours', value: totalBillable, icon: Clock, accent: 'success', change: 'This month', format: true },
            { label: 'Pending Invoices', value: 128000, icon: CreditCard, accent: 'warning', change: '3 unpaid', format: 'currency' as const },
          ].map((stat) => {
            const cardAccentMap: Record<string, string> = {
              primary: 'bg-primary-500',
              accent: 'bg-accent-500',
              success: 'bg-success-500',
              warning: 'bg-warning-500',
            };
            const iconBgMap: Record<string, string> = {
              primary: 'bg-primary-50 text-primary-600',
              accent: 'bg-accent-50 text-accent-600',
              success: 'bg-success-50 text-success-600',
              warning: 'bg-warning-50 text-warning-600',
            };
            return (
            <motion.div key={stat.label} variants={itemVariants}>
              <Card variant="default" padding="md" className="relative overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                <div className={cn(
                  'absolute top-0 right-0 w-24 h-24 -translate-y-8 translate-x-8 rounded-full opacity-5',
                  cardAccentMap[stat.accent],
                )} />
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-surface-500 uppercase tracking-wider">{stat.label}</span>
                    <div className={cn(
                      'w-9 h-9 rounded-xl flex items-center justify-center',
                      iconBgMap[stat.accent],
                    )}>
                      <stat.icon className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    {stat.format === 'currency' ? (
                      <CountUp end={stat.value as number} prefix="₹" className="text-2xl font-bold text-surface-900" decimals={0} />
                    ) : stat.format ? (
                      <CountUp end={stat.value as number} suffix="h" className="text-2xl font-bold text-surface-900" decimals={1} />
                    ) : (
                      <CountUp end={stat.value as number} className="text-2xl font-bold text-surface-900" decimals={0} />
                    )}
                  </div>
                  <p className="text-xs text-surface-500">{stat.change}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <AnimatedSection variant="fadeUp">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Calendar className="w-4 h-4 text-primary-500 inline mr-2" />
                    Today&apos;s Schedule
                  </CardTitle>
                  <Link href="/booking" className="text-xs font-medium text-primary-500 hover:text-primary-600 transition-colors inline-flex items-center gap-1">
                    View Full Calendar <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </CardHeader>
                <CardContent className="space-y-1">
                  {todayEvents.map((event, i) => {
                    const cfg = eventTypeConfig[event.type];
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.3 }}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-50 transition-colors group cursor-pointer"
                      >
                        <div className="flex flex-col items-center w-16 shrink-0">
                          <span className="text-xs font-semibold text-surface-900">{event.time.split(' ')[0]}</span>
                          <span className="text-2xs text-surface-500">{event.time.split(' ')[1]}</span>
                        </div>
                        <div className={cn('w-0.5 h-10 rounded-full', cfg.dot)} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-surface-900 truncate">{event.title}</p>
                          <p className="text-xs text-surface-500 truncate">{event.lawyer}</p>
                        </div>
                        <Badge variant={event.type === 'court' ? 'danger' : event.type === 'meeting' ? 'info' : event.type === 'hearing' ? 'warning' : 'accent'} size="sm">
                          {cfg.label}
                        </Badge>
                      </motion.div>
                    );
                  })}
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection variant="fadeUp" delay={100}>
              <Card>
                <CardHeader>
                  <div>
                    <CardTitle>
                      <Briefcase className="w-4 h-4 text-primary-500 inline mr-2" />
                      Active Cases
                    </CardTitle>
                    <p className="text-xs text-surface-500 mt-0.5">{filteredCases.length} case{filteredCases.length !== 1 ? 's' : ''} found</p>
                  </div>
                  <Link href="/booking">
                    <Button variant="primary" size="sm">
                      <Plus className="w-4 h-4" />
                      <span className="hidden sm:inline">New Case</span>
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                      <Input
                        placeholder="Search cases by title, client, or ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
                      {(['All', 'Active', 'Pending', 'Closed', 'Draft'] as const).map((s) => (
                        <button
                          key={s}
                          onClick={() => setStatusFilter(s)}
                          className={cn(
                            'px-3 py-1.5 text-xs font-medium rounded-lg border transition-all whitespace-nowrap',
                            statusFilter === s
                              ? 'bg-primary-500 text-white border-primary-500 shadow-sm'
                              : 'bg-white text-surface-600 border-surface-200 hover:border-primary-300 hover:text-primary-600',
                          )}
                        >
                          {s === 'All' ? 'All' : s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="hidden md:block">
                    <Table
                      columns={[
                        {
                          key: 'id', label: 'Case #', sortable: true,
                          render: (item: ActiveCase) => (
                            <span className="font-mono text-xs text-surface-500">{item.id}</span>
                          ),
                        },
                        {
                          key: 'title', label: 'Title', sortable: true,
                          render: (item: ActiveCase) => (
                            <div>
                              <p className="font-medium text-surface-900">{item.title}</p>
                              <p className="text-xs text-surface-500">{item.client}</p>
                            </div>
                          ),
                        },
                        {
                          key: 'status', label: 'Status', sortable: true, className: 'w-24',
                          render: (item: ActiveCase) => (
                            <Badge variant={statusBadgeVariant[item.status]} size="sm" dot>
                              {item.status}
                            </Badge>
                          ),
                        },
                        {
                          key: 'nextDate', label: 'Next Date', sortable: true, className: 'w-28',
                          render: (item: ActiveCase) => (
                            <span className="text-xs text-surface-600">{formatDate(item.nextDate, 'short')}</span>
                          ),
                        },
                        {
                          key: 'priority', label: 'Priority', sortable: true, className: 'w-20',
                          render: (item: ActiveCase) => {
                            const cfg = priorityBadgeConfig[item.priority];
                            return <Badge variant={cfg.variant} size="sm">{cfg.label}</Badge>;
                          },
                        },
                        {
                          key: 'action', label: '', className: 'w-12',
                          render: (item: ActiveCase) => (
                            <Link
                              href={`/case/${item.id}`}
                              className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-surface-400 hover:text-primary-500 hover:bg-primary-50 transition-all"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </Link>
                          ),
                        },
                      ]}
                      data={filteredCases as any}
                      onSort={handleSort}
                      sortBy={sortBy}
                      sortDir={sortDir}
                      rowKey={(item: any) => item.id}
                    />
                  </div>

                  <div className="md:hidden space-y-2">
                    {filteredCases.map((c) => (
                      <Link
                        key={c.id}
                        href={`/case/${c.id}`}
                        className="flex items-center justify-between p-3 rounded-xl bg-white border border-surface-100 hover:border-primary-200 hover:shadow-sm transition-all group"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant={priorityBadgeConfig[c.priority].variant} size="sm">
                              {c.priority}
                            </Badge>
                            <Badge variant={statusBadgeVariant[c.status]} size="sm" dot>
                              {c.status}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium text-surface-900 truncate">{c.title}</p>
                          <p className="text-xs text-surface-500">{c.client} • {formatDate(c.nextDate, 'short')}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-surface-300 group-hover:text-primary-500 transition-colors shrink-0" />
                      </Link>
                    ))}
                    {filteredCases.length === 0 && (
                      <div className="text-center py-8 text-sm text-surface-400">No cases match your search criteria.</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection variant="fadeUp" delay={150}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Clock className="w-4 h-4 text-primary-500 inline mr-2" />
                    Recent Time Entries
                  </CardTitle>
                  <Button variant="primary" size="sm">
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Add Time Entry</span>
                  </Button>
                </CardHeader>
                <CardContent className="space-y-1">
                  {recentTimeEntries.map((entry, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.25 }}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-50 transition-colors group"
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className={cn(
                          'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                          entry.billable ? 'bg-success-50 text-success-600' : 'bg-surface-100 text-surface-500',
                        )}>
                          {entry.billable ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-surface-900 truncate">{entry.task}</p>
                          <p className="text-xs text-surface-500">{formatDate(entry.date, 'short')}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <Badge variant={entry.billable ? 'success' : 'default'} size="sm">
                          {entry.billable ? 'Billable' : 'Non-billable'}
                        </Badge>
                        <span className="text-sm font-semibold text-surface-900 tabular-nums">{entry.hours}h</span>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>

          <div className="space-y-6">
            <AnimatedSection variant="slideRight" delay={50}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <AlertCircle className="w-4 h-4 text-primary-500 inline mr-2" />
                    Upcoming Deadlines
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  {upcomingDeadlines.map((d, i) => {
                    const days = getDaysRemaining(d.date);
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.3 }}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-50 transition-colors group cursor-pointer"
                      >
                        <div className={cn(
                          'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold',
                          days <= 2 ? 'bg-danger-50 text-danger-600' : days <= 7 ? 'bg-warning-50 text-warning-600' : 'bg-primary-50 text-primary-600',
                        )}>
                          {days}d
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-surface-900 truncate">{d.title}</p>
                          <p className="text-xs text-surface-500">{formatDate(d.date, 'short')}</p>
                        </div>
                        <span className={cn('text-2xs font-semibold shrink-0', getDaysColor(days))}>
                          {days === 0 ? 'Due today' : days === 1 ? 'Tomorrow' : `${days} days left`}
                        </span>
                      </motion.div>
                    );
                  })}
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection variant="slideRight" delay={100}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Zap className="w-4 h-4 text-primary-500 inline mr-2" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action, i) => (
                      <motion.button
                        key={action.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.04, duration: 0.2 }}
                        whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}
                        whileTap={{ scale: 0.96 }}
                        className="flex flex-col items-center gap-2 p-3 md:p-4 rounded-xl bg-white border border-surface-100 hover:border-primary-200 transition-all text-surface-700 hover:text-primary-600"
                      >
                        <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center text-white', action.color)}>
                          <action.icon className="w-4 h-4" />
                        </div>
                        <span className="text-2xs md:text-xs font-medium text-center leading-tight">{action.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection variant="slideRight" delay={150}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <TrendingUp className="w-4 h-4 text-primary-500 inline mr-2" />
                    Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-surface-600">Billable Hours</span>
                      <span className="text-xs text-surface-500">{totalBillable.toFixed(1)}h / {(totalBillable + totalNonBillable).toFixed(1)}h</span>
                    </div>
                    <div className="h-2 bg-surface-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${billablePct}%` }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                        className="h-full bg-success-500 rounded-full"
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-2xs text-success-600">Billable: {totalBillable.toFixed(1)}h</span>
                      <span className="text-2xs text-surface-500">Non-billable: {totalNonBillable.toFixed(1)}h</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-surface-600">Cases Won/Lost</span>
                      <span className="text-xs text-surface-500">{casesWon}W / {casesLost}L</span>
                    </div>
                    <div className="h-2 bg-surface-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${wonPct}%` }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                        className="h-full bg-primary-500 rounded-full"
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-2xs text-primary-600">Won: {casesWon}</span>
                      <span className="text-2xs text-danger-500">Lost: {casesLost}</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-surface-600">Revenue (This Month)</span>
                    </div>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                      className="text-2xl font-bold text-surface-900"
                    >
                      {formatCurrency(revenueThisMonth)}
                    </motion.p>
                    <p className="text-xs text-success-600 flex items-center gap-1 mt-1">
                      <ArrowUpRight className="w-3 h-3" />
                      12% from last month
                    </p>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>

        <AnimatedSection variant="fadeUp" delay={200}>
          <Card>
            <CardHeader>
              <CardTitle>
                <Activity className="w-4 h-4 text-primary-500 inline mr-2" />
                Recent Activity
              </CardTitle>
              <Button variant="ghost" size="sm">View All</Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-surface-100">
                {recentActivity.map((activity, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                    className="flex items-start gap-4 px-6 py-4 hover:bg-surface-50 transition-colors"
                  >
                    <div className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                      activityIconBg[activity.type],
                    )}>
                      {activityIcons[activity.type]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-surface-900">{activity.action}</p>
                      <p className="text-xs text-surface-500 truncate">{activity.detail}</p>
                    </div>
                    <span className="text-2xs text-surface-400 shrink-0">{activity.time}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  );
}


