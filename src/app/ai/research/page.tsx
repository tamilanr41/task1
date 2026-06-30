'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, BookOpen, Scale, FileText, ExternalLink, AlertCircle,
  Filter, SlidersHorizontal, ChevronDown, Gavel, Calendar,
  Clock, Landmark, Bookmark, Download, X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Button, Card, CardContent, CardHeader, CardTitle,
  Badge, Input, Tabs, Alert, EmptyState, Skeleton
} from '@/components/ui';
import AnimatedSection from '@/lib/animation/AnimatedSection';

interface CaseLawResult {
  name: string;
  citation: string;
  relevance: string;
  year: number;
  court: string;
  summary: string;
  judge: string;
}

interface StatuteResult {
  name: string;
  year: number;
  description: string;
  sections: string[];
}

interface RegulationResult {
  name: string;
  year: number;
  authority: string;
  description: string;
}

interface JudgmentResult {
  title: string;
  summary: string;
  date: string;
  court: string;
  citation: string;
  ratio: string;
}

interface ResearchResults {
  statutes: StatuteResult[];
  caseLaw: CaseLawResult[];
  regulations: RegulationResult[];
  keyJudgments: JudgmentResult[];
}

const mockResults: ResearchResults = {
  statutes: [
    { name: 'Indian Contract Act, 1872', year: 1872, description: 'The law relating to contracts in India. Governs formation, performance, enforceability, and breach of contracts.', sections: ['Section 73 - Compensation for breach', 'Section 74 - Penalty', 'Section 56 - Doctrine of Frustration'] },
    { name: 'Specific Relief Act, 1963', year: 1963, description: 'Provides remedies for breach of contract including specific performance and injunctions.', sections: ['Section 10 - Specific performance', 'Section 14 - Contracts not specifically enforceable', 'Section 38 - Perpetual injunction'] },
    { name: 'Limitation Act, 1963', year: 1963, description: 'Prescribes time limits for filing suits and legal proceedings.', sections: ['Article 18 - Three years for contract breach', 'Article 113 - Three years from date of knowledge'] },
    { name: 'Indian Evidence Act, 1872', year: 1872, description: 'Governs admissibility, relevance, and weight of evidence in legal proceedings.', sections: ['Section 65 - Secondary evidence', 'Section 91 - Evidence of terms of contract'] },
  ],
  caseLaw: [
    { name: 'ABC Constructions Ltd. vs. State of Maharashtra', citation: '(2020) 5 SCC 123', relevance: 'Directly applicable - government contract breach', year: 2020, court: 'Supreme Court of India', summary: 'Held that delay in payment by government entities entitles contractor to interest at 18% per annum. Established principle that government contracts must be interpreted strictly.', judge: 'CJI S.A. Bobde' },
    { name: 'XYZ Corporation vs. Union of India', citation: '(2018) 12 SCC 456', relevance: 'Similar facts - public procurement contracts', year: 2018, court: 'Supreme Court of India', summary: 'Ruled that arbitration clauses in government contracts are valid and binding. Courts cannot interfere with arbitral awards unless patently illegal.', judge: 'Justice R.F. Nariman' },
    { name: 'Ramesh Kumar & Associates vs. State of Karnataka', citation: '2021 SCC Online SC 789', relevance: 'Leading precedent on damages calculation', year: 2021, court: 'Supreme Court of India', summary: 'Established the method for calculating consequential damages in infrastructure projects. Loss of profit can be claimed if within reasonable contemplation of parties.', judge: 'Justice D.Y. Chandrachud' },
    { name: 'TechSolutions Pvt. Ltd. vs. Global Services Inc.', citation: '(2019) 8 SCC 234', relevance: 'IT contract dispute precedent', year: 2019, court: 'Supreme Court of India', summary: 'Held that limitation of liability clauses are enforceable unless they offend public policy. Capped liability at contract value held valid.', judge: 'Justice K.M. Joseph' },
  ],
  regulations: [
    { name: 'MSME Development Act, 2006', year: 2006, authority: 'Ministry of MSME', description: 'Provides framework for facilitation, promotion, and development of micro, small and medium enterprises. Mandates timely payment within 45 days.' },
    { name: 'Arbitration and Conciliation Act, 1996', year: 1996, authority: 'Ministry of Law & Justice', description: 'Governs domestic and international arbitration in India. Part I applies to domestic, Part II to international commercial arbitration.' },
    { name: 'Information Technology Act, 2000', year: 2000, authority: 'Ministry of Electronics & IT', description: 'Provides legal recognition for electronic transactions, digital signatures, and addresses cyber crimes and data protection.' },
  ],
  keyJudgments: [
    { title: 'Venture Global vs. Satyam Computers (2010)', summary: 'Supreme Court held that arbitration clauses survive termination of contract. The doctrine of separability ensures arbitration agreements are independent.', date: '15 March 2010', court: 'Supreme Court of India', citation: '(2010) 8 SCC 660', ratio: 'Arbitration agreement survives contract termination; separability doctrine applies.' },
    { title: 'State of Gujarat vs. Amber Builders (2020)', summary: 'Established that government entities cannot unilaterally impose penalties without contractual provision. Principles of natural justice must be followed.', date: '12 November 2020', court: 'Supreme Court of India', citation: '2020 SCC Online SC 891', ratio: 'No unilateral penalty without contract clause; hearing must be given.' },
  ],
};

const jurisdictions = ['Supreme Court of India', 'High Court of Delhi', 'High Court of Bombay', 'High Court of Madras', 'High Court of Calcutta', 'High Court of Karnataka'];
const categories = ['Contract Law', 'Corporate Law', 'Civil Litigation', 'Constitutional Law', 'Tax Law', 'Criminal Law', 'Family Law', 'Property Law'];
const courts = ['Supreme Court', 'High Court', 'Tribunal', 'District Court', 'All'];

function SearchSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} variant="card" className="h-32" />
      ))}
    </div>
  );
}

function StatuteCard({ statute, index }: { statute: StatuteResult; index: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <Card variant="interactive" onClick={() => setExpanded(!expanded)}>
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-primary-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold text-surface-900">{statute.name}</h3>
                  <p className="text-xs text-surface-500 mt-0.5">{statute.description}</p>
                </div>
                <Badge variant="primary" size="sm">{statute.year}</Badge>
              </div>
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 pt-3 border-t border-surface-100">
                      <p className="text-2xs font-medium text-surface-500 mb-2">Key Sections</p>
                      <div className="flex flex-wrap gap-1.5">
                        {statute.sections.map((s, i) => (
                          <span key={i} className="px-2 py-1 bg-surface-100 text-surface-700 rounded-md text-2xs font-mono">{s}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="w-4 h-4 text-surface-400" />
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function CaseLawCard({ caseLaw, index }: { caseLaw: CaseLawResult; index: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <Card variant="interactive" onClick={() => setExpanded(!expanded)}>
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center shrink-0">
              <Gavel className="w-5 h-5 text-accent-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold text-surface-900">{caseLaw.name}</h3>
                  <p className="text-2xs text-surface-400 font-mono mt-0.5">{caseLaw.citation}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant="accent" size="sm">{caseLaw.year}</Badge>
                  <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-4 h-4 text-surface-400" />
                  </motion.div>
                </div>
              </div>
              <p className="text-xs text-surface-500 mt-1">
                <span className="text-primary-500 font-medium">Relevance:</span> {caseLaw.relevance}
              </p>
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 pt-3 border-t border-surface-100 space-y-2">
                      <p className="text-xs text-surface-600 leading-relaxed">{caseLaw.summary}</p>
                      <div className="flex items-center gap-3 text-2xs text-surface-400">
                        <span className="flex items-center gap-1"><Landmark className="w-3 h-3" />{caseLaw.court}</span>
                        <span className="flex items-center gap-1"><Scale className="w-3 h-3" />{caseLaw.judge}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function RegulationCard({ regulation, index }: { regulation: RegulationResult; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <Card>
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-blue-500" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold text-surface-900">{regulation.name}</h3>
                  <p className="text-2xs text-surface-400 mt-0.5">{regulation.authority}</p>
                </div>
                <Badge variant="info" size="sm">{regulation.year}</Badge>
              </div>
              <p className="text-xs text-surface-500 mt-2">{regulation.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function JudgmentCard({ judgment, index }: { judgment: JudgmentResult; index: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <Card variant="interactive" onClick={() => setExpanded(!expanded)}>
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
              <Bookmark className="w-5 h-5 text-purple-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold text-surface-900">{judgment.title}</h3>
                <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-4 h-4 text-surface-400 shrink-0" />
                </motion.div>
              </div>
              <p className="text-xs text-surface-500 mt-1">{judgment.summary}</p>
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 pt-3 border-t border-surface-100 space-y-2">
                      <div className="p-3 bg-surface-50 rounded-lg">
                        <p className="text-2xs font-medium text-surface-500 mb-1">Ratio Decidendi</p>
                        <p className="text-xs text-surface-700">{judgment.ratio}</p>
                      </div>
                      <div className="flex items-center gap-3 text-2xs text-surface-400">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{judgment.date}</span>
                        <span className="flex items-center gap-1"><Landmark className="w-3 h-3" />{judgment.court}</span>
                        <span className="font-mono">{judgment.citation}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function AIResearchPage() {
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<ResearchResults | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    jurisdiction: '',
    category: '',
    court: '',
    dateFrom: '',
    dateTo: '',
  });

  const handleSearch = () => {
    if (!query.trim()) return;
    setSearching(true);
    setResults(null);
    setTimeout(() => {
      setResults(mockResults);
      setSearching(false);
    }, 2000);
  };

  const clearFilters = () => {
    setFilters({ jurisdiction: '', category: '', court: '', dateFrom: '', dateTo: '' });
  };

  const hasFilters = Object.values(filters).some(v => v);

  return (
    <div className="min-h-screen bg-surface-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/20">
              <Search className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-serif text-primary-500">AI Legal Research</h1>
              <p className="text-surface-500 mt-1">Search statutes, case law, regulations, and judgments</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search for legal topics, cases, statutes, regulations..."
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-surface-200 rounded-xl text-sm text-surface-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200 placeholder:text-surface-400 shadow-soft"
              />
            </div>
            <Button onClick={handleSearch} loading={searching} size="lg">
              <Search className="w-4 h-4 mr-2" /> Search
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowFilters(!showFilters)}
              className={cn(showFilters && 'bg-primary-50 border-primary-500 text-primary-500')}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" /> Filters
              {hasFilters && <span className="ml-1.5 w-2 h-2 rounded-full bg-primary-500" />}
            </Button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-4 p-5 bg-white border border-surface-200 rounded-2xl shadow-soft">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-surface-900 flex items-center gap-2">
                      <Filter className="w-4 h-4 text-primary-500" /> Filters
                    </h3>
                    {hasFilters && (
                      <button onClick={clearFilters} className="text-xs text-primary-500 hover:underline flex items-center gap-1">
                        <X className="w-3 h-3" /> Clear all
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-2xs font-medium text-surface-500 mb-1">Jurisdiction</label>
                      <select
                        value={filters.jurisdiction}
                        onChange={(e) => setFilters(f => ({ ...f, jurisdiction: e.target.value }))}
                        className="w-full px-3 py-2 border border-surface-200 rounded-lg text-sm text-surface-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                      >
                        <option value="">All Jurisdictions</option>
                        {jurisdictions.map(j => <option key={j} value={j}>{j}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-2xs font-medium text-surface-500 mb-1">Category</label>
                      <select
                        value={filters.category}
                        onChange={(e) => setFilters(f => ({ ...f, category: e.target.value }))}
                        className="w-full px-3 py-2 border border-surface-200 rounded-lg text-sm text-surface-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                      >
                        <option value="">All Categories</option>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-2xs font-medium text-surface-500 mb-1">Court</label>
                      <select
                        value={filters.court}
                        onChange={(e) => setFilters(f => ({ ...f, court: e.target.value }))}
                        className="w-full px-3 py-2 border border-surface-200 rounded-lg text-sm text-surface-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                      >
                        <option value="">All Courts</option>
                        {courts.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-2xs font-medium text-surface-500 mb-1">Date Range</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="date"
                          value={filters.dateFrom}
                          onChange={(e) => setFilters(f => ({ ...f, dateFrom: e.target.value }))}
                          className="w-full px-3 py-2 border border-surface-200 rounded-lg text-sm text-surface-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                          placeholder="From"
                        />
                        <span className="text-surface-400 text-xs">to</span>
                        <input
                          type="date"
                          value={filters.dateTo}
                          onChange={(e) => setFilters(f => ({ ...f, dateTo: e.target.value }))}
                          className="w-full px-3 py-2 border border-surface-200 rounded-lg text-sm text-surface-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                          placeholder="To"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </AnimatedSection>

        <AnimatePresence mode="wait">
          {searching ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <Skeleton variant="card" className="h-16" />
              <SearchSkeleton />
              <SearchSkeleton />
            </motion.div>
          ) : results ? (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-surface-500">
                  Showing <span className="font-semibold text-surface-900">{results.statutes.length + results.caseLaw.length + results.regulations.length + results.keyJudgments.length}</span> results for "{query}"
                </p>
                <Button variant="ghost" size="sm"><Download className="w-4 h-4 mr-1" /> Export Results</Button>
              </div>

              <AnimatedSection variant="stagger">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-primary-500" />
                      Relevant Statutes
                      <Badge variant="primary" size="sm" className="ml-2">{results.statutes.length}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {results.statutes.map((s, i) => (
                      <StatuteCard key={i} statute={s} index={i} />
                    ))}
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Gavel className="w-5 h-5 text-accent-500" />
                      Case Law / Precedents
                      <Badge variant="accent" size="sm" className="ml-2">{results.caseLaw.length}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {results.caseLaw.map((c, i) => (
                      <CaseLawCard key={i} caseLaw={c} index={i} />
                    ))}
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-500" />
                        Regulations
                        <Badge variant="info" size="sm" className="ml-2">{results.regulations.length}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {results.regulations.map((r, i) => (
                        <RegulationCard key={i} regulation={r} index={i} />
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bookmark className="w-5 h-5 text-purple-500" />
                        Key Judgments
                        <Badge variant="default" size="sm" className="ml-2">{results.keyJudgments.length}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {results.keyJudgments.map((j, i) => (
                        <JudgmentCard key={i} judgment={j} index={i} />
                      ))}
                    </CardContent>
                  </Card>
                </div>

                <Alert
                  variant="warning"
                  icon={<AlertCircle className="w-5 h-5" />}
                  title="Important Disclaimer"
                  message="AI research is for informational purposes only. Always verify with primary legal sources and consult qualified legal professionals before relying on any results."
                  className="mt-6"
                />
              </AnimatedSection>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <EmptyState
                icon={<Search className="w-10 h-10" />}
                title="Search Legal Databases"
                description="Enter a legal topic, case name, statute, or keyword to search across statutes, case law, regulations, and judgments."
                action={{ label: 'Browse Practice Areas', onClick: () => setQuery('contract law') }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
