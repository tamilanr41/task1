'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, Scale, Award, Clock, Heart, RefreshCw,
  Download, Calendar, DollarSign, ArrowUpRight, ArrowDownRight,
  PieChart, BarChart3, Users
} from 'lucide-react';
import { cn, formatCurrency, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, type Column } from '@/components/ui/table';
import { AnimatedSection } from '@/lib/animation';

interface MetricCard {
  label: string;
  value: string;
  change: string;
  changeUp: boolean;
  icon: React.ReactNode;
  color: string;
}

interface MonthlyRevenue {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

interface CaseType {
  type: string;
  count: number;
  percentage: number;
  color: string;
}

interface LeadSource {
  source: string;
  leads: number;
  conversion: number;
  cost: number;
  revenue: number;
}

interface ClientGrowth {
  year: string;
  clients: number;
  retention: number;
}

const metrics: MetricCard[] = [
  { label: 'Total Revenue', value: '₹2.45 Cr', change: '+18.5%', changeUp: true, icon: <DollarSign className="w-5 h-5" />, color: 'bg-green-50 text-green-600' },
  { label: 'Active Cases', value: '186', change: '+12.3%', changeUp: true, icon: <Scale className="w-5 h-5" />, color: 'bg-blue-50 text-blue-600' },
  { label: 'Win Rate', value: '94.2%', change: '+3.1%', changeUp: true, icon: <Award className="w-5 h-5" />, color: 'bg-purple-50 text-purple-600' },
  { label: 'Avg Resolution Days', value: '42', change: '-8.5%', changeUp: true, icon: <Clock className="w-5 h-5" />, color: 'bg-amber-50 text-amber-600' },
  { label: 'Client Satisfaction', value: '4.8/5', change: '+2.4%', changeUp: true, icon: <Heart className="w-5 h-5" />, color: 'bg-rose-50 text-rose-600' },
  { label: 'Conversion Rate', value: '38.6%', change: '+5.2%', changeUp: true, icon: <RefreshCw className="w-5 h-5" />, color: 'bg-cyan-50 text-cyan-600' },
];

const monthlyRevenue: MonthlyRevenue[] = [
  { month: 'Jan', revenue: 1850000, expenses: 920000, profit: 928000 },
  { month: 'Feb', revenue: 2100000, expenses: 1050000, profit: 1050000 },
  { month: 'Mar', revenue: 1950000, expenses: 980000, profit: 970000 },
  { month: 'Apr', revenue: 2400000, expenses: 1150000, profit: 1250000 },
  { month: 'May', revenue: 2250000, expenses: 1100000, profit: 1150000 },
  { month: 'Jun', revenue: 2650000, expenses: 1200000, profit: 1450000 },
];

const casesByType: CaseType[] = [
  { type: 'Corporate Law', count: 52, percentage: 28, color: 'bg-primary-500' },
  { type: 'Criminal Law', count: 38, percentage: 20, color: 'bg-accent-500' },
  { type: 'Civil Litigation', count: 31, percentage: 17, color: 'bg-success-500' },
  { type: 'Family Law', count: 27, percentage: 15, color: 'bg-warning-500' },
  { type: 'Property Law', count: 22, percentage: 12, color: 'bg-danger-500' },
  { type: 'Others', count: 16, percentage: 8, color: 'bg-surface-400' },
];

const leadSources: LeadSource[] = [
  { source: 'Referrals', leads: 145, conversion: 42, cost: 0, revenue: 8500000 },
  { source: 'Website', leads: 98, conversion: 28, cost: 45000, revenue: 3200000 },
  { source: 'Social Media', leads: 67, conversion: 22, cost: 35000, revenue: 2100000 },
  { source: 'Google Ads', leads: 52, conversion: 18, cost: 85000, revenue: 1800000 },
  { source: 'Legal Directories', leads: 41, conversion: 15, cost: 25000, revenue: 1200000 },
  { source: 'Events & Webinars', leads: 33, conversion: 12, cost: 55000, revenue: 950000 },
];

const clientGrowth: ClientGrowth[] = [
  { year: '2021', clients: 120, retention: 82 },
  { year: '2022', clients: 185, retention: 85 },
  { year: '2023', clients: 245, retention: 88 },
  { year: '2024', clients: 320, retention: 90 },
  { year: '2025', clients: 410, retention: 92 },
  { year: '2026', clients: 520, retention: 94 },
];

const maxRevenue = Math.max(...monthlyRevenue.map(m => m.revenue));
const maxClients = Math.max(...clientGrowth.map(c => c.clients));

const leadColumns: Column<LeadSource>[] = [
  { key: 'source', label: 'Source', render: (s) => <span className="font-medium text-surface-900">{s.source}</span> },
  { key: 'leads', label: 'Leads', render: (s) => <span className="font-semibold">{s.leads}</span> },
  {
    key: 'conversion', label: 'Conversion %', render: (s) => (
      <div className="flex items-center gap-2">
        <div className="flex-1 max-w-[100px] h-2 bg-surface-100 rounded-full overflow-hidden">
          <div className="h-full bg-success-500 rounded-full" style={{ width: `${s.conversion}%` }} />
        </div>
        <span className="text-sm font-medium">{s.conversion}%</span>
      </div>
    ),
  },
  { key: 'cost', label: 'Cost', render: (s) => <span>{formatCurrency(s.cost)}</span> },
  { key: 'revenue', label: 'Revenue', render: (s) => <span className="font-semibold text-success-600">{formatCurrency(s.revenue)}</span> },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('year');

  const dateRanges = [
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: 'quarter', label: 'Quarter' },
    { id: 'year', label: 'Year' },
  ];

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <AnimatedSection>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-surface-900 font-serif">Analytics & Insights</h1>
              <p className="text-surface-500 mt-1">Data-driven insights for your legal practice</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex bg-white rounded-xl border border-surface-200 p-1 gap-1">
                {dateRanges.map((dr) => (
                  <button
                    key={dr.id}
                    onClick={() => setDateRange(dr.id)}
                    className={cn(
                      'px-3 py-1.5 text-xs font-medium rounded-lg transition-colors',
                      dateRange === dr.id ? 'bg-primary-500 text-white' : 'text-surface-600 hover:text-surface-900'
                    )}
                  >
                    {dr.label}
                  </button>
                ))}
              </div>
              <Button variant="outline" size="md">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {metrics.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card variant="elevated" padding="sm">
                <CardContent className="space-y-3">
                  <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', metric.color)}>
                    {metric.icon}
                  </div>
                  <div>
                    <p className="text-sm text-surface-500">{metric.label}</p>
                    <p className="text-xl font-bold text-surface-900 mt-0.5">{metric.value}</p>
                    <span className={cn(
                      'inline-flex items-center gap-0.5 text-xs font-medium',
                      metric.changeUp ? 'text-success-600' : 'text-danger-600'
                    )}>
                      {metric.changeUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {metric.change} vs last period
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AnimatedSection className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue</CardTitle>
                <CardDescription>Revenue vs expenses for the current year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2 h-44">
                  {monthlyRevenue.map((m) => (
                    <div key={m.month} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                      <span className="text-2xs text-surface-400 font-medium">{formatCurrency(m.revenue, 'INR').replace(/₹/, '₹')}</span>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(m.revenue / maxRevenue) * 100}%` }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full max-w-[40px] bg-primary-500 rounded-t-lg relative group cursor-pointer"
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface-900 text-white text-2xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {formatCurrency(m.revenue)}
                        </div>
                      </motion.div>
                      <span className="text-2xs text-surface-500 mt-1">{m.month}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-6 text-sm text-surface-500">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-primary-500" /> Revenue</div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-success-400" /> Profit</div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          <AnimatedSection>
            <Card>
              <CardHeader>
                <CardTitle>Cases by Type</CardTitle>
                <CardDescription>Distribution of active cases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {casesByType.map((ct) => (
                    <div key={ct.type}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className={cn('w-3 h-3 rounded', ct.color)} />
                          <span className="text-sm text-surface-700">{ct.type}</span>
                        </div>
                        <span className="text-sm font-semibold text-surface-900">{ct.count}</span>
                      </div>
                      <div className="h-2 bg-surface-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${ct.percentage}%` }}
                          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className={cn('h-full rounded-full', ct.color)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatedSection>
            <Card>
              <CardHeader>
                <CardTitle>Lead Sources</CardTitle>
                <CardDescription>Conversion and ROI by channel</CardDescription>
              </CardHeader>
              <CardContent>
                <Table columns={leadColumns} data={leadSources} rowKey={(s) => s.source} />
              </CardContent>
            </Card>
          </AnimatedSection>

          <AnimatedSection>
            <Card>
              <CardHeader>
                <CardTitle>Client Growth</CardTitle>
                <CardDescription>Year-over-year client acquisition and retention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-3 h-44">
                  {clientGrowth.map((c) => (
                    <div key={c.year} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(c.clients / maxClients) * 100}%` }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full max-w-[50px] bg-gradient-to-t from-primary-500 to-primary-400 rounded-t-lg relative group cursor-pointer"
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface-900 text-white text-2xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {c.clients} clients
                        </div>
                      </motion.div>
                      <span className="text-2xs text-surface-500 mt-1">{c.year}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4">
                  {clientGrowth.slice(-3).map((c) => (
                    <div key={c.year} className="text-center p-3 rounded-xl bg-surface-50">
                      <p className="text-lg font-bold text-surface-900">{c.year}</p>
                      <p className="text-sm text-surface-500">{c.clients} clients</p>
                      <Badge variant="success" size="sm">{c.retention}% retention</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
