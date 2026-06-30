'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard, Wallet, Building2, Smartphone, Apple, Chrome,
  Strikethrough, DollarSign, Banknote, ArrowUpRight, Calendar,
  CheckCircle, Clock, AlertTriangle, Download, Plus,
  ChevronRight, Shield, MoreHorizontal
} from 'lucide-react';
import { cn, formatCurrency, formatDate, getStatusColor } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, type Column } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { Tabs, type Tab } from '@/components/ui/tabs';
import { EmptyState } from '@/components/ui/empty-state';
import { Skeleton } from '@/components/ui/skeleton';
import { Pagination } from '@/components/ui/pagination';
import { AnimatedSection } from '@/lib/animation';

interface Invoice {
  id: string;
  number: string;
  client: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'draft';
  dueDate: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  enabled: boolean;
}

interface Transaction {
  id: string;
  invoice: string;
  client: string;
  amount: number;
  method: string;
  date: string;
  status: 'completed' | 'failed' | 'refunded';
}

interface Subscription {
  id: string;
  plan: string;
  amount: number;
  billing: string;
  nextBilling: string;
  status: 'active' | 'paused' | 'cancelled';
}

const invoices: Invoice[] = [
  { id: 'inv-001', number: 'INV-2026-0001', client: 'TechStart Pvt Ltd', amount: 150000, status: 'paid', dueDate: '2026-05-15' },
  { id: 'inv-002', number: 'INV-2026-0002', client: 'Sharma Enterprises', amount: 75000, status: 'pending', dueDate: '2026-06-01' },
  { id: 'inv-003', number: 'INV-2026-0003', client: 'Global Corp India', amount: 250000, status: 'overdue', dueDate: '2026-04-20' },
  { id: 'inv-004', number: 'INV-2026-0004', client: 'Patel & Sons', amount: 45000, status: 'paid', dueDate: '2026-05-10' },
  { id: 'inv-005', number: 'INV-2026-0005', client: 'Krishnan Industries', amount: 185000, status: 'draft', dueDate: '2026-06-15' },
  { id: 'inv-006', number: 'INV-2026-0006', client: 'Desai Legal Services', amount: 92000, status: 'pending', dueDate: '2026-06-10' },
  { id: 'inv-007', number: 'INV-2026-0007', client: 'Mehta Holdings', amount: 310000, status: 'paid', dueDate: '2026-05-25' },
  { id: 'inv-008', number: 'INV-2026-0008', client: 'Nair Consultancy', amount: 68000, status: 'overdue', dueDate: '2026-04-30' },
];

const paymentMethods: PaymentMethod[] = [
  { id: 'card', name: 'Credit / Debit Card', icon: <CreditCard className="w-6 h-6" />, description: 'Visa, Mastercard, RuPay', enabled: true },
  { id: 'upi', name: 'UPI', icon: <Smartphone className="w-6 h-6" />, description: 'Google Pay, PhonePe, Paytm', enabled: true },
  { id: 'netbanking', name: 'Net Banking', icon: <Building2 className="w-6 h-6" />, description: 'All major banks', enabled: true },
  { id: 'apple-pay', name: 'Apple Pay', icon: <Apple className="w-6 h-6" />, description: 'Pay with Apple', enabled: true },
  { id: 'google-pay', name: 'Google Pay', icon: <Chrome className="w-6 h-6" />, description: 'GPay integration', enabled: false },
  { id: 'stripe', name: 'Stripe', icon: <Strikethrough className="w-6 h-6" />, description: 'Global payments', enabled: true },
  { id: 'razorpay', name: 'Razorpay', icon: <Banknote className="w-6 h-6" />, description: 'Indian payments', enabled: true },
  { id: 'paypal', name: 'PayPal', icon: <DollarSign className="w-6 h-6" />, description: 'International', enabled: false },
];

const transactions: Transaction[] = [
  { id: 'tx-001', invoice: 'INV-2026-0001', client: 'TechStart Pvt Ltd', amount: 150000, method: 'UPI', date: '2026-05-15T10:30:00', status: 'completed' },
  { id: 'tx-002', invoice: 'INV-2026-0004', client: 'Patel & Sons', amount: 45000, method: 'Card', date: '2026-05-10T14:15:00', status: 'completed' },
  { id: 'tx-003', invoice: 'INV-2026-0007', client: 'Mehta Holdings', amount: 310000, method: 'Net Banking', date: '2026-05-25T09:45:00', status: 'completed' },
  { id: 'tx-004', invoice: 'INV-2026-0002', client: 'Sharma Enterprises', amount: 75000, method: 'UPI', date: '2026-05-28T16:20:00', status: 'failed' },
  { id: 'tx-005', invoice: 'INV-2026-0003', client: 'Global Corp India', amount: 50000, method: 'Stripe', date: '2026-05-20T11:00:00', status: 'refunded' },
];

const subscriptions: Subscription[] = [
  { id: 'sub-001', plan: 'Enterprise Suite', amount: 24999, billing: 'Monthly', nextBilling: '2026-07-01', status: 'active' },
  { id: 'sub-002', plan: 'Document Automation', amount: 9999, billing: 'Monthly', nextBilling: '2026-07-01', status: 'active' },
];

const summaryCards = [
  { label: 'Total Outstanding', value: 530000, icon: <Wallet className="w-5 h-5" />, trend: '+12%', trendUp: true },
  { label: 'Paid this Month', value: 505000, icon: <CheckCircle className="w-5 h-5" />, trend: '+8%', trendUp: true },
  { label: 'Pending Invoices', value: 167000, icon: <Clock className="w-5 h-5" />, trend: '-3%', trendUp: false },
];

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const tabs: Tab[] = [
    { id: 'all', label: 'All Invoices', count: invoices.length },
    { id: 'paid', label: 'Paid', count: invoices.filter(i => i.status === 'paid').length },
    { id: 'pending', label: 'Pending', count: invoices.filter(i => i.status === 'pending').length },
    { id: 'overdue', label: 'Overdue', count: invoices.filter(i => i.status === 'overdue').length },
  ];

  const filteredInvoices = useMemo(() => {
    if (activeTab === 'all') return invoices;
    return invoices.filter(i => i.status === activeTab);
  }, [activeTab]);

  const paginatedInvoices = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredInvoices.slice(start, start + pageSize);
  }, [filteredInvoices, currentPage]);

  const totalPages = Math.ceil(filteredInvoices.length / pageSize);

  const columns: Column<Invoice>[] = [
    { key: 'number', label: 'Invoice #', render: (inv) => <span className="font-medium text-surface-900">{inv.number}</span> },
    { key: 'client', label: 'Client', render: (inv) => <span className="text-surface-600">{inv.client}</span> },
    {
      key: 'amount', label: 'Amount', render: (inv) => (
        <span className="font-semibold text-surface-900">{formatCurrency(inv.amount)}</span>
      ),
    },
    {
      key: 'status', label: 'Status', render: (inv) => (
        <Badge variant={inv.status === 'paid' ? 'success' : inv.status === 'overdue' ? 'danger' : inv.status === 'pending' ? 'warning' : 'default'} size="sm">
          {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
        </Badge>
      ),
    },
    { key: 'dueDate', label: 'Due Date', render: (inv) => <span className="text-surface-500">{formatDate(inv.dueDate, 'short')}</span> },
    {
      key: 'action', label: '', render: () => (
        <Button variant="ghost" size="sm" icon={<ChevronRight className="w-4 h-4" />} />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <AnimatedSection>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-surface-900 font-serif">Payments & Billing</h1>
              <p className="text-surface-500 mt-1">Manage invoices, payments, and subscriptions</p>
            </div>
            <Button variant="primary" size="lg" onClick={() => setShowPaymentModal(true)}>
              <Plus className="w-4 h-4" />
              Make a Payment
            </Button>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {summaryCards.map((card, idx) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card variant="elevated">
                <CardContent className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-surface-500">{card.label}</p>
                    <p className="text-2xl font-bold text-surface-900 mt-1">{formatCurrency(card.value)}</p>
                    <span className={cn('inline-flex items-center gap-1 text-xs font-medium mt-2', card.trendUp ? 'text-success-600' : 'text-danger-600')}>
                      {card.trend}
                      <ArrowUpRight className={cn('w-3 h-3', !card.trendUp && 'rotate-90')} />
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-500">
                    {card.icon}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <AnimatedSection>
          <Card>
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
              <Tabs tabs={tabs} activeTab={activeTab} onChange={(id) => { setActiveTab(id); setCurrentPage(1); }} variant="pills" size="sm" />
            </CardHeader>
            <CardContent>
              <Table columns={columns} data={paginatedInvoices} rowKey={(inv) => inv.id} />
              {totalPages > 1 && (
                <div className="mt-4">
                  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </div>
              )}
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection>
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Configure how you receive payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {paymentMethods.map((method, idx) => (
                  <motion.button
                    key={method.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => setSelectedMethod(method.id)}
                    className={cn(
                      'relative flex flex-col items-center gap-3 p-5 rounded-2xl border-2 text-left transition-all duration-200',
                      selectedMethod === method.id
                        ? 'border-primary-500 bg-primary-50/30 shadow-soft'
                        : 'border-surface-200 bg-white hover:border-surface-300 hover:shadow-soft'
                    )}
                  >
                    <div className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center transition-colors',
                      selectedMethod === method.id ? 'bg-primary-500 text-white' : 'bg-surface-100 text-surface-500'
                    )}>
                      {method.icon}
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-surface-900">{method.name}</p>
                      <p className="text-xs text-surface-500 mt-0.5">{method.description}</p>
                    </div>
                    {!method.enabled && (
                      <Badge variant="warning" size="sm">Coming Soon</Badge>
                    )}
                    {selectedMethod === method.id && (
                      <motion.div layoutId="method-check" className="absolute top-3 right-3">
                        <CheckCircle className="w-5 h-5 text-primary-500" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection>
          <Card>
            <CardHeader>
              <CardTitle>Active Subscriptions</CardTitle>
              <CardDescription>Your current service subscriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subscriptions.map((sub) => (
                  <div key={sub.id} className="flex items-center justify-between p-4 rounded-xl bg-surface-50 border border-surface-100">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-surface-900">{sub.plan}</p>
                        <p className="text-xs text-surface-500">{sub.billing} &middot; Next: {formatDate(sub.nextBilling, 'short')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-surface-900">{formatCurrency(sub.amount)}<span className="text-xs text-surface-500 font-normal">/mo</span></span>
                      <Badge variant={sub.status === 'active' ? 'success' : sub.status === 'paused' ? 'warning' : 'danger'}>{sub.status}</Badge>
                      <Button variant="ghost" size="sm" icon={<MoreHorizontal className="w-4 h-4" />} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection>
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest payment activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transactions.map((tx, idx) => (
                  <motion.div
                    key={tx.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'w-9 h-9 rounded-lg flex items-center justify-center',
                        tx.status === 'completed' ? 'bg-success-50 text-success-600' :
                        tx.status === 'failed' ? 'bg-danger-50 text-danger-600' : 'bg-warning-50 text-warning-600'
                      )}>
                        {tx.status === 'completed' ? <CheckCircle className="w-4 h-4" /> :
                         tx.status === 'failed' ? <AlertTriangle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-surface-900">{tx.invoice}</p>
                        <p className="text-xs text-surface-500">{tx.client} &middot; {tx.method}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-surface-900">{formatCurrency(tx.amount)}</p>
                      <p className="text-xs text-surface-400">{formatDate(tx.date, 'short')}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>

      <Modal isOpen={showPaymentModal} onClose={() => setShowPaymentModal(false)} title="Make a Payment" size="lg">
        <div className="space-y-6">
          <div>
            <Input
              label="Payment Amount"
              type="number"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              placeholder="Enter amount"
              leftIcon={<DollarSign className="w-4 h-4" />}
            />
          </div>
          <div>
            <p className="text-sm font-medium text-surface-700 mb-3">Select Payment Method</p>
            <div className="grid grid-cols-2 gap-3">
              {paymentMethods.filter(m => m.enabled).map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-xl border-2 transition-all',
                    selectedMethod === method.id ? 'border-primary-500 bg-primary-50' : 'border-surface-200 hover:border-surface-300'
                  )}
                >
                  <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', selectedMethod === method.id ? 'bg-primary-500 text-white' : 'bg-surface-100 text-surface-500')}>
                    {method.icon}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-surface-900">{method.name}</p>
                    <p className="text-xs text-surface-500">{method.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="bg-surface-50 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm text-surface-600"><span>Amount</span><span className="font-semibold text-surface-900">{formatCurrency(Number(paymentAmount) || 0)}</span></div>
            <div className="flex justify-between text-sm text-surface-600"><span>Processing Fee</span><span className="font-semibold text-surface-900">Free</span></div>
            <div className="border-t border-surface-200 pt-2 flex justify-between text-sm"><span className="font-semibold text-surface-900">Total</span><span className="font-bold text-primary-500 text-lg">{formatCurrency(Number(paymentAmount) || 0)}</span></div>
          </div>
          <Button variant="primary" size="lg" fullWidth onClick={() => { setShowPaymentModal(false); }}>
            Process Payment
          </Button>
        </div>
      </Modal>
    </div>
  );
}
