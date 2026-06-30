'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, FileText, Users, File, Briefcase, Landmark, Calendar,
  X, Clock, Filter, SlidersHorizontal, ChevronDown, ArrowRight,
  BookOpen, Scale, Shield, Home, Heart, User, Building
} from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, type Tab } from '@/components/ui/tabs';
import { EmptyState } from '@/components/ui/empty-state';
import { AnimatedSection } from '@/lib/animation';

interface SearchResult {
  id: string;
  type: 'case' | 'client' | 'document' | 'lawyer' | 'court' | 'hearing';
  title: string;
  description: string;
  url: string;
  category?: string;
  date?: string;
  status?: string;
}

const allResults: SearchResult[] = [
  { id: 'r1', type: 'case', title: 'TechStart vs Sharma Enterprises', description: 'Corporate litigation - Breach of contract dispute', url: '/case/c1', category: 'Corporate Law', date: '2026-05-10', status: 'Active' },
  { id: 'r2', type: 'case', title: 'Patel Property Dispute', description: 'Property law - Title verification and ownership dispute', url: '/case/c2', category: 'Property Law', date: '2026-04-22', status: 'Pending' },
  { id: 'r3', type: 'client', title: 'Rajesh Sharma', description: 'CEO, TechStart Pvt Ltd - Corporate client since 2024', url: '/clients/c1', category: 'Corporate' },
  { id: 'r4', type: 'client', title: 'Anita Patel', description: 'Individual client - Family law matters', url: '/clients/c2', category: 'Individual' },
  { id: 'r5', type: 'document', title: 'NDA - TechStart Acquisition', description: 'Non-disclosure agreement for M&A deal', url: '/documents/d1', category: 'Contract', date: '2026-05-01' },
  { id: 'r6', type: 'document', title: 'Employment Contract - Senior Associate', description: 'Employment agreement for new hire', url: '/documents/d2', category: 'Employment', date: '2026-05-15' },
  { id: 'r7', type: 'lawyer', title: 'Adv. Rajesh Sharma', description: 'Senior Partner - Corporate & Civil Litigation', url: '/lawyers/l1', category: 'Corporate Law' },
  { id: 'r8', type: 'lawyer', title: 'Adv. Priya Patel', description: 'Partner - Criminal & Family Law', url: '/lawyers/l2', category: 'Criminal Law' },
  { id: 'r9', type: 'court', title: 'Supreme Court of India', description: 'New Delhi - Constitutional matters & appeals', url: '/courts/sc1' },
  { id: 'r10', type: 'court', title: 'Karnataka High Court', description: 'Bengaluru - Civil & criminal jurisdiction', url: '/courts/hc1' },
  { id: 'r11', type: 'hearing', title: 'TechStart vs Sharma - Hearing #3', description: 'Arguments on evidence admissibility', url: '/hearings/h1', date: '2026-06-15', status: 'Scheduled' },
  { id: 'r12', type: 'hearing', title: 'Patel Property - Status Conference', description: 'Case management conference', url: '/hearings/h2', date: '2026-06-20', status: 'Scheduled' },
];

const typeIcons: Record<string, React.ReactNode> = {
  case: <Scale className="w-5 h-5" />,
  client: <Users className="w-5 h-5" />,
  document: <FileText className="w-5 h-5" />,
  lawyer: <User className="w-5 h-5" />,
  court: <Landmark className="w-5 h-5" />,
  hearing: <Calendar className="w-5 h-5" />,
};

const typeColors: Record<string, string> = {
  case: 'bg-blue-50 text-blue-600',
  client: 'bg-green-50 text-green-600',
  document: 'bg-amber-50 text-amber-600',
  lawyer: 'bg-purple-50 text-purple-600',
  court: 'bg-rose-50 text-rose-600',
  hearing: 'bg-cyan-50 text-cyan-600',
};

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [recentSearches] = useState<string[]>(['Corporate merger case', 'Employment NDA template', 'Supreme Court hearings', 'Property dispute documents']);
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const tabs: Tab[] = [
    { id: 'all', label: 'All', count: allResults.length },
    { id: 'case', label: 'Cases', icon: <Scale className="w-3.5 h-3.5" />, count: allResults.filter(r => r.type === 'case').length },
    { id: 'client', label: 'Clients', icon: <Users className="w-3.5 h-3.5" />, count: allResults.filter(r => r.type === 'client').length },
    { id: 'document', label: 'Documents', icon: <FileText className="w-3.5 h-3.5" />, count: allResults.filter(r => r.type === 'document').length },
    { id: 'lawyer', label: 'Lawyers', icon: <User className="w-3.5 h-3.5" />, count: allResults.filter(r => r.type === 'lawyer').length },
    { id: 'court', label: 'Courts', icon: <Landmark className="w-3.5 h-3.5" />, count: allResults.filter(r => r.type === 'court').length },
    { id: 'hearing', label: 'Hearings', icon: <Calendar className="w-3.5 h-3.5" />, count: allResults.filter(r => r.type === 'hearing').length },
  ];

  const filteredResults = useMemo(() => {
    let results = allResults;
    if (query) {
      const q = query.toLowerCase();
      results = results.filter(r =>
        r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q) || r.category?.toLowerCase().includes(q)
      );
    }
    if (activeTab !== 'all') results = results.filter(r => r.type === activeTab);
    return results;
  }, [query, activeTab]);

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="text-3xl font-bold text-surface-900 font-serif">Global Search</h1>
            <p className="text-surface-500">Search across cases, clients, documents, lawyers, courts, and hearings</p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className={cn(
                'flex items-center gap-3 px-5 py-4 rounded-2xl border-2 bg-white transition-all duration-200 shadow-card',
                query ? 'border-primary-500 ring-4 ring-primary-500/10' : 'border-surface-200 hover:border-surface-300'
              )}>
                <Search className="w-6 h-6 text-surface-400 shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for cases, clients, documents, lawyers..."
                  className="flex-1 text-lg bg-transparent border-none outline-none text-surface-900 placeholder:text-surface-400"
                  autoFocus
                />
                {query && (
                  <button onClick={() => setQuery('')} className="p-1 rounded-lg text-surface-400 hover:text-surface-700 hover:bg-surface-100 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                )}
                <div className="hidden md:flex items-center gap-1 px-2 py-1 rounded-lg border border-surface-200 text-xs text-surface-400 font-mono">
                  <span>⌘</span><span>K</span>
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
                  <Filter className="w-4 h-4" />
                  Filters
                  <ChevronDown className={cn('w-3 h-3 transition-transform', showFilters && 'rotate-180')} />
                </Button>
              </div>

              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -8, height: 0 }}
                    className="mt-3 bg-white rounded-2xl border border-surface-200 shadow-dropdown overflow-hidden"
                  >
                    <div className="p-5 grid grid-cols-1 sm:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-2">Date Range</p>
                        <div className="flex flex-wrap gap-2">
                          {['all', 'today', 'week', 'month', 'year'].map((d) => (
                            <button key={d} onClick={() => setDateRange(d)} className={cn(
                              'px-3 py-1.5 text-xs rounded-lg font-medium transition-colors',
                              dateRange === d ? 'bg-primary-500 text-white' : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                            )}>{d.charAt(0).toUpperCase() + d.slice(1)}</button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-2">Status</p>
                        <div className="flex flex-wrap gap-2">
                          {['all', 'active', 'pending', 'closed', 'scheduled'].map((s) => (
                            <button key={s} onClick={() => setStatusFilter(s)} className={cn(
                              'px-3 py-1.5 text-xs rounded-lg font-medium transition-colors',
                              statusFilter === s ? 'bg-primary-500 text-white' : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                            )}>{s.charAt(0).toUpperCase() + s.slice(1)}</button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-2">Category</p>
                        <div className="flex flex-wrap gap-2">
                          {['all', 'corporate', 'criminal', 'property', 'family'].map((c) => (
                            <button key={c} onClick={() => setCategoryFilter(c)} className={cn(
                              'px-3 py-1.5 text-xs rounded-lg font-medium transition-colors',
                              categoryFilter === c ? 'bg-primary-500 text-white' : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                            )}>{c.charAt(0).toUpperCase() + c.slice(1)}</button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-2">Practice Area</p>
                        <select className="w-full px-3 py-2 text-sm rounded-lg border border-surface-200 bg-white text-surface-700 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none">
                          <option>All Practice Areas</option>
                          <option>Corporate Law</option>
                          <option>Criminal Law</option>
                          <option>Civil Litigation</option>
                          <option>Family Law</option>
                          <option>Property Law</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="pills" />
        </AnimatedSection>

        {!query ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <AnimatedSection className="lg:col-span-2">
              <Card>
                <CardContent className="p-0">
                  <div className="px-6 py-4 border-b border-surface-100">
                    <div className="flex items-center gap-2 text-surface-500">
                      <SlidersHorizontal className="w-4 h-4" />
                      <span className="text-sm font-medium">Browse by Type</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6">
                    {tabs.filter(t => t.id !== 'all').map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => { setActiveTab(tab.id); setQuery(' '); }}
                        className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-surface-50 border border-surface-100 hover:bg-surface-100 hover:border-surface-200 transition-all group"
                      >
                        <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', typeColors[tab.id])}>
                          {tab.icon}
                        </div>
                        <span className="text-sm font-medium text-surface-700">{tab.label}</span>
                        <span className="text-xs text-surface-400">{tab.count} items</span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection>
              <Card>
                <CardContent className="p-0">
                  <div className="px-6 py-4 border-b border-surface-100">
                    <div className="flex items-center gap-2 text-surface-500">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">Recent Searches</span>
                    </div>
                  </div>
                  <div className="p-2">
                    {recentSearches.map((search, idx) => (
                      <button
                        key={idx}
                        onClick={() => setQuery(search)}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface-50 transition-colors text-left"
                      >
                        <Clock className="w-4 h-4 text-surface-400 shrink-0" />
                        <span className="text-sm text-surface-700 truncate">{search}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-surface-300 ml-auto shrink-0" />
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        ) : filteredResults.length === 0 ? (
          <AnimatedSection>
            <EmptyState
              icon={<Search className="w-10 h-10" />}
              title="No results found"
              description={`No results match "${query}". Try a different search term or adjust your filters.`}
              action={{ label: 'Clear Search', onClick: () => setQuery('') }}
            />
          </AnimatedSection>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            <p className="text-sm text-surface-500 mb-2">{filteredResults.length} result{filteredResults.length !== 1 && 's'} found</p>
            <AnimatePresence>
              {filteredResults.map((result, idx) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  layout
                >
                  <Card variant="interactive" padding="md" className="group">
                    <div className="flex items-start gap-4">
                      <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center shrink-0', typeColors[result.type])}>
                        {typeIcons[result.type]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base font-semibold text-surface-900 group-hover:text-primary-500 transition-colors">{result.title}</h3>
                          <Badge variant={result.type === 'case' ? 'primary' : result.type === 'client' ? 'success' : result.type === 'document' ? 'warning' : 'info'} size="sm">
                            {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-surface-500 mt-1">{result.description}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-surface-400">
                          {result.category && <span>{result.category}</span>}
                          {result.date && <span>{formatDate(result.date, 'short')}</span>}
                          {result.status && <Badge variant={result.status === 'Active' ? 'success' : result.status === 'Scheduled' ? 'info' : 'default'} size="sm">{result.status}</Badge>}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
