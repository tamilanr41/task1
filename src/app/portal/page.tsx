'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Scale, FileText, MessageCircle, CreditCard, Calendar,
  LogIn, Eye, Shield, ChevronRight, Bell, Menu, X, Upload,
  GitBranch, ChevronDown, Bot, Home, Settings,
  DollarSign, Download, Play, ArrowRight, FileSignature,
  Video, MapPin, Users,
} from 'lucide-react';
import {
  Button, Badge, Card, CardContent, CardHeader, CardTitle,
  Input, Avatar, Modal,
} from '@/components/ui';
import { cn, formatCurrency, formatDate } from '@/lib/utils';
import { AnimatedSection } from '@/lib/animation';

type DashboardTab = 'overview' | 'cases' | 'documents' | 'payments' | 'appointments' | 'messages' | 'settings';

interface CaseData {
  id: string;
  title: string;
  status: 'active' | 'pending' | 'closed' | 'intake';
  stage: number;
  totalStages: number;
  nextHearing: string;
  lawyer: string;
  practiceArea: string;
}

interface AppointmentData {
  date: string;
  time: string;
  lawyer: string;
  type: 'in-person' | 'video';
  location?: string;
}

interface DocumentData {
  name: string;
  type: 'pdf' | 'doc' | 'image' | 'spreadsheet';
  date: string;
  status: 'verified' | 'draft' | 'submitted' | 'reviewed';
  size: string;
}

interface InvoiceData {
  id: string;
  amount: number;
  date: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  description: string;
}

// --- Demo Data ---
const DEMO_CREDENTIALS = [
  { email: 'client@demo.com', password: 'pass123', role: 'Client', name: 'Rajesh Kumar' },
  { email: 'lawyer@demo.com', password: 'pass123', role: 'Lawyer', name: 'Adv. Priya Sharma' },
];

const CLIENT_INFO = {
  name: 'Rajesh Kumar',
  email: 'rajesh.kumar@example.com',
  phone: '+91 98765 43210',
  firm: 'Kumar Enterprises Pvt. Ltd.',
};

const QUICK_STATS = [
  { label: 'Active Cases', value: 3, icon: Scale, change: '+1 this month' },
  { label: 'Upcoming Appointments', value: 2, icon: Calendar, change: 'Next: Jul 5' },
  { label: 'Unread Messages', value: 5, icon: MessageCircle, change: '3 urgent' },
  { label: 'Pending Payments', value: 1, icon: CreditCard, change: '\u20B9 35,000 due' },
];

const CASES: CaseData[] = [
  { id: 'LF/2026/A3B2C1', title: 'Property Dispute Resolution', status: 'active', stage: 4, totalStages: 7, nextHearing: '2026-07-15', lawyer: 'Adv. Priya Sharma', practiceArea: 'Property Law' },
  { id: 'LF/2026/D4E5F6', title: 'Corporate Compliance Filing', status: 'active', stage: 2, totalStages: 7, nextHearing: '2026-07-22', lawyer: 'Adv. Vikram Patel', practiceArea: 'Corporate Law' },
  { id: 'LF/2026/G7H8I9', title: 'Family Settlement Agreement', status: 'intake', stage: 1, totalStages: 5, nextHearing: 'TBD', lawyer: 'Adv. Ananya Gupta', practiceArea: 'Family Law' },
];

const APPOINTMENTS: AppointmentData[] = [
  { date: '2026-07-05', time: '10:00 AM', lawyer: 'Adv. Priya Sharma', type: 'in-person', location: 'Chamber No. 4, District Court' },
  { date: '2026-07-12', time: '2:30 PM', lawyer: 'Adv. Vikram Patel', type: 'video' },
  { date: '2026-07-19', time: '11:00 AM', lawyer: 'Adv. Ananya Gupta', type: 'in-person', location: 'Mediation Centre, Family Court' },
];

const DOCUMENTS: DocumentData[] = [
  { name: 'Property Deed - Plot No. 42', type: 'pdf', date: '2026-06-28', status: 'verified', size: '2.4 MB' },
  { name: 'Legal Notice - Response Draft', type: 'doc', date: '2026-06-25', status: 'draft', size: '156 KB' },
  { name: 'Income Tax Returns FY 2025-26', type: 'pdf', date: '2026-06-20', status: 'submitted', size: '4.1 MB' },
  { name: 'Witness Statement - Annexure A', type: 'pdf', date: '2026-06-18', status: 'reviewed', size: '892 KB' },
];

const INVOICES: InvoiceData[] = [
  { id: 'INV-2026-0042', amount: 25000, date: '2026-06-01', dueDate: '2026-06-30', status: 'paid', description: 'Legal Consultation - Property Dispute' },
  { id: 'INV-2026-0043', amount: 15000, date: '2026-06-15', dueDate: '2026-07-15', status: 'pending', description: 'Documentation & Filing - Corporate Compliance' },
  { id: 'INV-2026-0044', amount: 35000, date: '2026-05-20', dueDate: '2026-06-20', status: 'overdue', description: 'Court Representation - Hearing Fee' },
];

const QUICK_ACTIONS = [
  { icon: Upload, label: 'Upload Document', desc: 'Share case files securely', color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50' },
  { icon: Calendar, label: 'Book Appointment', desc: 'Schedule with your lawyer', color: 'from-purple-500 to-purple-600', bg: 'bg-purple-50' },
  { icon: MessageCircle, label: 'Send Message', desc: 'Secure communication', color: 'from-green-500 to-green-600', bg: 'bg-green-50' },
  { icon: CreditCard, label: 'Make Payment', desc: 'Pay invoices online', color: 'from-amber-500 to-amber-600', bg: 'bg-amber-50' },
  { icon: GitBranch, label: 'Case Timeline', desc: 'View case progress', color: 'from-rose-500 to-rose-600', bg: 'bg-rose-50' },
];

const SIDEBAR_LINKS: { icon: React.ElementType; label: string; id: DashboardTab }[] = [
  { icon: Home, label: 'Dashboard', id: 'overview' },
  { icon: Scale, label: 'My Cases', id: 'cases' },
  { icon: FileText, label: 'Documents', id: 'documents' },
  { icon: CreditCard, label: 'Payments', id: 'payments' },
  { icon: Calendar, label: 'Appointments', id: 'appointments' },
  { icon: MessageCircle, label: 'Messages', id: 'messages' },
  { icon: Settings, label: 'Settings', id: 'settings' },
];

// --- Helpers ---
function statusToBadgeVariant(status: string): 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'default' {
  const map: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'default'> = {
    active: 'success', pending: 'warning', closed: 'default', intake: 'info',
    paid: 'success', overdue: 'danger', verified: 'success', draft: 'warning',
    submitted: 'info', reviewed: 'primary', confirmed: 'success', cancelled: 'danger',
    'in-person': 'primary', video: 'info',
  };
  return map[status.toLowerCase()] || 'default';
}

function getDocumentIcon(type: string) {
  switch (type) {
    case 'pdf': return FileSignature;
    case 'doc': return FileText;
    case 'image': return FileText;
    case 'spreadsheet': return FileText;
    default: return FileText;
  }
}

function getStageLabels(): string[] {
  return ['Consultation', 'Documentation', 'Filing', 'Hearing', 'Arguments', 'Judgment', 'Resolution'];
}

// --- Login View ---
function LoginView({ onLogin }: { onLogin: (name: string) => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'client' | 'lawyer'>('client');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) { setError('Please fill in all fields.'); return; }
    if (!isLogin && password !== confirmPassword) { setError('Passwords do not match.'); return; }

    setLoading(true);
    setTimeout(() => {
      const match = DEMO_CREDENTIALS.find(c => c.email === email && c.password === password);
      if (match) {
        onLogin(match.name);
      } else {
        setError('Invalid credentials. Try client@demo.com / pass123');
      }
      setLoading(false);
    }, 800);
  };

  const fillDemo = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-white to-surface-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        <AnimatedSection variant="slideLeft" className="hidden lg:block">
          <div className="pr-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/20">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold font-serif text-primary-500">LexForge</span>
                <p className="text-xs text-surface-500">Client Portal</p>
              </div>
            </div>
            <h1 className="text-4xl font-bold font-serif text-primary-500 mb-4 leading-tight">
              Your Case,<br />Your Control
            </h1>
            <p className="text-surface-600 mb-8 text-lg leading-relaxed">
              Secure client portal to track cases, view documents, communicate with your lawyer, make payments, and more.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Eye, label: 'Track Cases', desc: 'Real-time progress' },
                { icon: MessageCircle, label: 'Secure Chat', desc: 'Message your lawyer' },
                { icon: FileText, label: 'Documents', desc: 'Upload & download' },
                { icon: CreditCard, label: 'Payments', desc: 'Pay invoices online' },
                { icon: Calendar, label: 'Schedule', desc: 'Book appointments' },
                { icon: Shield, label: 'Encrypted', desc: 'End-to-end secure' },
              ].map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
                  className="flex items-start gap-3 p-3 bg-white rounded-xl shadow-soft border border-surface-100"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary-50 text-primary-500 flex items-center justify-center shrink-0">
                    <f.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-surface-900">{f.label}</p>
                    <p className="text-xs text-surface-500">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-4 text-sm text-surface-400">
              <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> 256-bit encrypted</span>
              <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> 500+ firms trust us</span>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection variant="slideRight">
          <Card variant="elevated" className="w-full max-w-md mx-auto">
            <CardContent className="p-8">
              <div className="flex gap-2 mb-6 bg-surface-100 rounded-xl p-1">
                <button
                  onClick={() => setIsLogin(true)}
                  className={cn(
                    'flex-1 py-2.5 text-center font-semibold text-sm rounded-lg transition-all duration-200',
                    isLogin ? 'bg-white text-primary-500 shadow-soft' : 'text-surface-500 hover:text-surface-700'
                  )}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={cn(
                    'flex-1 py-2.5 text-center font-semibold text-sm rounded-lg transition-all duration-200',
                    !isLogin ? 'bg-white text-primary-500 shadow-soft' : 'text-surface-500 hover:text-surface-700'
                  )}
                >
                  Register
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  leftIcon={<MailIcon />}
                />
                <Input
                  label="Password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Your password"
                  required
                />
                {!isLogin && (
                  <>
                    <Input
                      label="Confirm Password"
                      type="password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      required
                    />
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-surface-700">I am a</label>
                      <div className="flex gap-2">
                        {(['client', 'lawyer'] as const).map(r => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => setRole(r)}
                            className={`flex-1 py-2.5 text-center font-semibold text-sm rounded-lg transition-all duration-200 ${
                              role === r
                                ? 'bg-primary-500 text-white shadow-md'
                                : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                            }`}
                          >
                            {r === 'client' ? 'Client' : 'Lawyer'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <AnimatePresence mode="wait">
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="text-sm text-danger-500 bg-danger-50 px-3 py-2 rounded-lg"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <Button type="submit" fullWidth loading={loading}>
                  {isLogin ? 'Sign In' : 'Create Account'}
                </Button>

                {isLogin && (
                  <p className="text-center text-sm text-surface-500">
                    <a href="#" className="text-primary-500 hover:underline font-medium">Forgot password?</a>
                  </p>
                )}
              </form>

              <div className="mt-6 pt-6 border-t border-surface-100">
                <p className="text-xs text-surface-400 mb-3 text-center font-medium uppercase tracking-wider">Demo Credentials</p>
                <div className="flex flex-col gap-2">
                  {DEMO_CREDENTIALS.map(c => (
                    <button
                      key={c.email}
                      type="button"
                      onClick={() => fillDemo(c.email, c.password)}
                      className="flex items-center justify-between px-3 py-2 rounded-lg bg-surface-50 hover:bg-surface-100 transition-colors text-left"
                    >
                      <div>
                        <p className="text-xs font-medium text-surface-700">{c.name}</p>
                        <p className="text-2xs text-surface-400">{c.email}</p>
                      </div>
                      <Badge variant={c.role === 'Client' ? 'primary' : 'accent'} size="sm">{c.role}</Badge>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  );
}

function MailIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

// --- Dashboard View ---
function DashboardView({ clientName, onLogout }: { clientName: string; onLogout: () => void }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [expandedCase, setExpandedCase] = useState<string | null>(null);
  const [showAiModal, setShowAiModal] = useState(false);

  const totalOutstanding = INVOICES.filter(i => i.status !== 'paid').reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="min-h-screen bg-surface-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-surface-100 flex flex-col',
          'lg:translate-x-0 transition-transform duration-300'
        )}
      >
        <div className="p-5 border-b border-surface-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-sm">
                <Scale className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-sm font-bold font-serif text-primary-500">LexForge</span>
                <p className="text-2xs text-surface-400">Client Portal</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 rounded-lg hover:bg-surface-100 text-surface-400 lg:hidden"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-4 border-b border-surface-100">
          <div className="flex items-center gap-3">
            <Avatar name={clientName} size="md" status="online" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-surface-900 truncate">{clientName}</p>
              <p className="text-2xs text-surface-500 truncate">{CLIENT_INFO.email}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {SIDEBAR_LINKS.map(link => (
            <button
              key={link.id}
              onClick={() => { setActiveTab(link.id); setSidebarOpen(false); }}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                activeTab === link.id
                  ? 'bg-primary-50 text-primary-600 shadow-sm'
                  : 'text-surface-600 hover:bg-surface-50 hover:text-surface-900'
              )}
            >
              <link.icon className={cn('w-4 h-4', activeTab === link.id ? 'text-primary-500' : 'text-surface-400')} />
              <span>{link.label}</span>
              {link.id === 'messages' && (
                <span className="ml-auto w-5 h-5 rounded-full bg-danger-500 text-white text-2xs flex items-center justify-center font-semibold">
                  5
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-surface-100">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-surface-600 hover:bg-surface-50 hover:text-danger-500 transition-all duration-200"
          >
            <LogIn className="w-4 h-4 rotate-180" />
            <span>Sign Out</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-surface-100">
          <div className="flex items-center justify-between px-4 lg:px-8 h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-xl hover:bg-surface-100 text-surface-500 lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="hidden sm:flex items-center gap-2 text-sm text-surface-500">
                <span className="text-surface-900 font-medium">Portal</span>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="capitalize">{activeTab}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="relative p-2 rounded-xl hover:bg-surface-100 text-surface-500 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger-500 ring-2 ring-white" />
              </button>
              <span className="hidden sm:block text-sm text-surface-500">{CLIENT_INFO.firm}</span>
              <Avatar name={clientName} size="sm" />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 lg:p-8 max-w-7xl mx-auto space-y-8">
          {/* 1. Page Header with Stats */}
          <AnimatedSection variant="fadeUp">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800 p-6 lg:p-8">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                  <div>
                    <p className="text-primary-100 text-sm font-medium mb-1">Welcome back</p>
                    <h1 className="text-2xl lg:text-3xl font-bold font-serif text-white">{clientName}</h1>
                    <p className="text-primary-200 text-sm mt-1">Here&apos;s an overview of your legal matters</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm" icon={<Calendar className="w-4 h-4" />}>
                      Book Appointment
                    </Button>
                    <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {QUICK_STATS.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/15 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <stat.icon className="w-5 h-5 text-accent-300" />
                        <span className="text-2xl font-bold text-white">{stat.value}</span>
                      </div>
                      <p className="text-xs text-primary-200 font-medium">{stat.label}</p>
                      <p className="text-2xs text-primary-300 mt-0.5">{stat.change}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content Area (2/3) */}
            <div className="lg:col-span-2 space-y-8">
              {/* 2. Active Cases Section */}
              <AnimatedSection variant="fadeUp">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-bold font-serif text-surface-900">Active Cases</h2>
                    <p className="text-sm text-surface-500">{CASES.length} matters in progress</p>
                  </div>
                  <Button variant="ghost" size="sm" iconRight={<ArrowRight className="w-3.5 h-3.5" />}>
                    View All
                  </Button>
                </div>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {CASES.map((c, i) => (
                    <motion.div
                      key={c.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * i }}
                    >
                      <Card
                        variant="interactive"
                        padding="md"
                        className="h-full"
                        onClick={() => setExpandedCase(expandedCase === c.id ? null : c.id)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <Badge variant={statusToBadgeVariant(c.status)} size="sm">
                            {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                          </Badge>
                          <Badge variant="default" size="sm">{c.practiceArea}</Badge>
                        </div>
                        <p className="text-2xs text-surface-400 font-mono mb-1">{c.id}</p>
                        <p className="text-sm font-semibold text-surface-900 mb-3 leading-snug">{c.title}</p>
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-2xs text-surface-500 mb-1.5">
                            <span>Stage {c.stage} of {c.totalStages}</span>
                            <span>{Math.round((c.stage / c.totalStages) * 100)}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-surface-100 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(c.stage / c.totalStages) * 100}%` }}
                              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                              className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-400"
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-2xs text-surface-500">
                          <Calendar className="w-3 h-3" />
                          <span>Next: {c.nextHearing === 'TBD' ? 'TBD' : formatDate(c.nextHearing, 'short')}</span>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-surface-100">
                          <div className="flex items-center gap-2">
                            <Avatar name={c.lawyer} size="xs" />
                            <span className="text-2xs text-surface-600">{c.lawyer}</span>
                          </div>
                          <motion.div
                            animate={{ rotate: expandedCase === c.id ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="w-4 h-4 text-surface-400" />
                          </motion.div>
                        </div>
                        <AnimatePresence>
                          {expandedCase === c.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="pt-3 mt-3 border-t border-surface-100 space-y-2">
                                <div className="flex items-center justify-between text-2xs">
                                  <span className="text-surface-500">Next Hearing</span>
                                  <span className="text-surface-900 font-medium">{c.nextHearing === 'TBD' ? 'Not scheduled' : formatDate(c.nextHearing, 'short')}</span>
                                </div>
                                <div className="flex items-center justify-between text-2xs">
                                  <span className="text-surface-500">Assigned Lawyer</span>
                                  <span className="text-surface-900 font-medium">{c.lawyer}</span>
                                </div>
                                <div className="flex items-center justify-between text-2xs">
                                  <span className="text-surface-500">Case Stage</span>
                                  <span className="text-surface-900 font-medium">{getStageLabels()[c.stage - 1]}</span>
                                </div>
                                <Button variant="outline" size="sm" fullWidth className="mt-2">
                                  <Eye className="w-3.5 h-3.5" /> View Case Details
                                </Button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>

              {/* 3. Upcoming Appointments */}
              <AnimatedSection variant="fadeUp">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-bold font-serif text-surface-900">Upcoming Appointments</h2>
                    <p className="text-sm text-surface-500">Your scheduled meetings</p>
                  </div>
                  <Button variant="primary" size="sm">
                    <Calendar className="w-4 h-4" /> Book New
                  </Button>
                </div>
                <div className="space-y-3">
                  {APPOINTMENTS.map((apt, i) => (
                    <motion.div
                      key={`${apt.date}-${apt.time}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                    >
                      <Card variant="default" padding="md">
                        <div className="flex items-center gap-4">
                          <div className="hidden sm:flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-primary-50 text-primary-600 shrink-0">
                            <span className="text-lg font-bold leading-none">{new Date(apt.date).getDate()}</span>
                            <span className="text-2xs font-medium uppercase leading-tight">
                              {new Date(apt.date).toLocaleString('en-IN', { month: 'short' })}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-semibold text-surface-900">{formatDate(apt.date, 'short')}</span>
                              <span className="text-xs text-surface-400">at {apt.time}</span>
                              <Badge
                                variant={statusToBadgeVariant(apt.type)}
                                size="sm"
                                dot
                              >
                                {apt.type === 'in-person' ? 'In Person' : 'Video Call'}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-surface-500">
                              <Avatar name={apt.lawyer} size="xs" />
                              <span>{apt.lawyer}</span>
                              {apt.location && (
                                <>
                                  <span className="text-surface-300">|</span>
                                  <MapPin className="w-3 h-3" />
                                  <span className="truncate">{apt.location}</span>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-1 shrink-0">
                            <Button variant="ghost" size="sm">
                              <Video className="w-3.5 h-3.5" />
                            </Button>
                            <Button variant="outline" size="sm">
                              Details
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>

              {/* 4. Recent Documents */}
              <AnimatedSection variant="fadeUp">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-bold font-serif text-surface-900">Recent Documents</h2>
                    <p className="text-sm text-surface-500">Recently uploaded case files</p>
                  </div>
                  <Button variant="ghost" size="sm" iconRight={<ArrowRight className="w-3.5 h-3.5" />}>
                    View All
                  </Button>
                </div>
                <Card variant="default" padding="none">
                  <div className="divide-y divide-surface-100">
                    {DOCUMENTS.map((doc, i) => {
                      const DocIcon = getDocumentIcon(doc.type);
                      return (
                        <motion.div
                          key={doc.name}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.05 * i }}
                          className="flex items-center gap-4 p-4 hover:bg-surface-50 transition-colors cursor-pointer"
                        >
                          <div className={cn(
                            'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
                            doc.type === 'pdf' ? 'bg-danger-50 text-danger-500' :
                            doc.type === 'doc' ? 'bg-blue-50 text-blue-500' : 'bg-surface-100 text-surface-500'
                          )}>
                            <DocIcon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-surface-900 truncate">{doc.name}</p>
                            <p className="text-2xs text-surface-500">
                              {formatDate(doc.date, 'short')} &middot; {doc.size}
                            </p>
                          </div>
                          <Badge variant={statusToBadgeVariant(doc.status)} size="sm">
                            {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      );
                    })}
                  </div>
                </Card>
              </AnimatedSection>

              {/* 5. Quick Actions */}
              <AnimatedSection variant="fadeUp">
                <h2 className="text-lg font-bold font-serif text-surface-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {QUICK_ACTIONS.map((action, i) => (
                    <motion.button
                      key={action.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * i }}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white border border-surface-100 shadow-sm hover:shadow-md transition-all text-center"
                    >
                      <div className={cn(
                        'w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br text-white shadow-sm',
                        action.color
                      )}>
                        <action.icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold text-surface-900">{action.label}</span>
                      <span className="text-2xs text-surface-500 leading-tight">{action.desc}</span>
                    </motion.button>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* Right Sidebar (1/3) */}
            <div className="space-y-6">
              {/* 6. Invoice Summary */}
              <AnimatedSection variant="slideRight">
                <Card variant="default" padding="md">
                  <CardHeader>
                    <CardTitle className="text-base font-serif">Invoice Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-surface-100">
                      <div>
                        <p className="text-2xs text-surface-500 uppercase tracking-wider font-medium">Total Outstanding</p>
                        <p className="text-2xl font-bold text-surface-900">{formatCurrency(totalOutstanding)}</p>
                      </div>
                      <div className={cn(
                        'w-12 h-12 rounded-xl flex items-center justify-center',
                        totalOutstanding > 0 ? 'bg-warning-50 text-warning-600' : 'bg-success-50 text-success-600'
                      )}>
                        <DollarSign className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      {INVOICES.map(inv => (
                        <div key={inv.id} className="flex items-center justify-between">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <p className="text-xs font-medium text-surface-900 truncate">{inv.id}</p>
                              <Badge variant={statusToBadgeVariant(inv.status)} size="sm">
                                {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-2xs text-surface-500 truncate">{inv.description}</p>
                          </div>
                          <div className="text-right shrink-0 ml-3">
                            <p className="text-xs font-semibold text-surface-900">{formatCurrency(inv.amount)}</p>
                            <p className="text-2xs text-surface-400">Due {formatDate(inv.dueDate, 'short')}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-surface-100 space-y-2">
                      <Button variant="secondary" size="sm" fullWidth>
                        <CreditCard className="w-4 h-4" /> Pay Outstanding
                      </Button>
                      <Button variant="ghost" size="sm" fullWidth>
                        View All Invoices
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>

              {/* 7. AI Assistant Quick Access */}
              <AnimatedSection variant="slideRight" delay={100}>
                <Card variant="interactive" padding="md" onClick={() => setShowAiModal(true)}>
                  <CardContent>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-surface-900">AI Legal Assistant</h3>
                        <p className="text-2xs text-surface-500">Powered by LexForge AI</p>
                      </div>
                    </div>
                    <p className="text-xs text-surface-600 mb-4">Need help? Ask our AI Legal Assistant about your cases, documents, or schedule.</p>
                    <div className="space-y-2">
                      {[
                        { q: "What's my case status?", icon: Scale },
                        { q: 'When is my next hearing?', icon: Calendar },
                        { q: 'How to upload documents?', icon: Upload },
                      ].map((item, i) => (
                        <motion.button
                          key={item.q}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i }}
                          whileHover={{ x: 3 }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-50 hover:bg-surface-100 transition-colors text-left"
                        >
                          <item.icon className="w-3.5 h-3.5 text-accent-500 shrink-0" />
                          <span className="text-xs text-surface-700">{item.q}</span>
                          <ChevronRight className="w-3 h-3 text-surface-400 ml-auto shrink-0" />
                        </motion.button>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-surface-100">
                      <span className="text-xs text-accent-600 font-medium flex items-center gap-1">
                        Ask AI Assistant <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>

              {/* Quick Info */}
              <AnimatedSection variant="slideRight" delay={150}>
                <Card variant="default" padding="md">
                  <CardContent>
                    <h3 className="text-sm font-bold font-serif text-surface-900 mb-3">Your Team</h3>
                    <div className="space-y-3">
                      {[
                        { name: 'Adv. Priya Sharma', role: 'Lead Counsel - Property', status: 'online' as const },
                        { name: 'Adv. Vikram Patel', role: 'Corporate Law Specialist', status: 'away' as const },
                        { name: 'Adv. Ananya Gupta', role: 'Family Law Associate', status: 'offline' as const },
                      ].map((member, i) => (
                        <div key={member.name} className="flex items-center gap-2.5">
                          <Avatar name={member.name} size="sm" status={member.status} />
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-surface-900">{member.name}</p>
                            <p className="text-2xs text-surface-500 truncate">{member.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </main>
      </div>

      {/* AI Assistant Modal */}
      <Modal isOpen={showAiModal} onClose={() => setShowAiModal(false)} title="AI Legal Assistant" size="lg">
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-accent-50">
            <Bot className="w-8 h-8 text-accent-600" />
            <div>
              <p className="text-sm font-semibold text-surface-900">How can I help you today?</p>
              <p className="text-xs text-surface-500">Ask me anything about your cases, documents, or legal matters.</p>
            </div>
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {[
              { role: 'ai', message: 'Hello! I\'m your AI Legal Assistant. I can help you track case progress, find documents, schedule appointments, and more.' },
              { role: 'user', message: 'What\'s the status of my property dispute case?' },
              { role: 'ai', message: 'Your property dispute case (LF/2026/A3B2C1) is currently at Stage 4 - Hearing. The next hearing is scheduled for July 15, 2026. Your lead counsel Adv. Priya Sharma is handling the arguments.' },
            ].map((msg, i) => (
              <div key={i} className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                <div className={cn(
                  'max-w-[80%] px-4 py-2.5 rounded-xl text-sm',
                  msg.role === 'user'
                    ? 'bg-primary-500 text-white rounded-br-sm'
                    : 'bg-surface-100 text-surface-800 rounded-bl-sm'
                )}>
                  {msg.message}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 pt-2">
            <Input placeholder="Type your question..." inputSize="md" />
            <Button size="md"><Play className="w-4 h-4" /></Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// --- Main Export ---
export default function PortalPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clientName, setClientName] = useState('');

  const handleLogin = (name: string) => {
    setClientName(name);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setClientName('');
  };

  return (
    <AnimatePresence mode="wait">
      {isLoggedIn ? (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DashboardView clientName={clientName} onLogout={handleLogout} />
        </motion.div>
      ) : (
        <motion.div
          key="login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <LoginView onLogin={handleLogin} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
