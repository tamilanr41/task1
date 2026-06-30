'use client';
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Upload, AlertTriangle, CheckCircle, Info,
  Download, File, FileSpreadsheet, BookOpen, Shield,
  X, ChevronDown, Scale, Search
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Button, Card, CardContent, CardHeader, CardTitle,
  Badge, Alert, FileUpload, Skeleton, Tabs
} from '@/components/ui';
import AnimatedSection from '@/lib/animation/AnimatedSection';

interface KeyClause {
  clause: string;
  explanation: string;
  importance: 'high' | 'medium' | 'low';
}

interface Risk {
  risk: string;
  severity: 'high' | 'medium' | 'low';
  detail?: string;
}

interface SummaryResult {
  title: string;
  type: string;
  pages: number;
  wordCount: number;
  summary: string;
  keyClauses: KeyClause[];
  risks: Risk[];
  missingTerms: string[];
  recommendations: string[];
  parties: string[];
  effectiveDate: string;
  jurisdiction: string;
}

const mockResult: SummaryResult = {
  title: 'Software Development Agreement',
  type: 'Contract',
  pages: 12,
  wordCount: 3450,
  summary: 'This is a Software Development Agreement between TechCorp Solutions Pvt Ltd ("Client") and DevSolutions Inc ("Developer") for the development of a mobile application. The agreement covers project scope, deliverables, payment terms of ?25,00,000, IP rights transfer, confidentiality obligations, termination clauses, and governing law. The contract appears heavily weighted in favor of the Developer with several high-risk clauses requiring attention.',
  keyClauses: [
    { clause: 'Payment Terms (Section 2)', explanation: '50% upfront on signing, 50% on completion. No milestone-based payments.', importance: 'high' },
    { clause: 'IP Ownership (Section 3)', explanation: 'All IP rights transfer to Client upon full payment. No license back to Developer.', importance: 'high' },
    { clause: 'Confidentiality (Section 4)', explanation: 'Both parties bound by 3-year confidentiality. Standard scope.', importance: 'medium' },
    { clause: 'Termination (Section 5)', explanation: '30-day notice required. Early termination penalty of 100% remaining amount.', importance: 'high' },
    { clause: 'Liability (Section 6)', explanation: 'Unlimited liability clause - Developer liable for all damages without cap.', importance: 'high' },
    { clause: 'Governing Law (Section 7)', explanation: 'Governed by laws of India. No choice of venue specified.', importance: 'medium' },
    { clause: 'Force Majeure', explanation: 'No force majeure clause present in the agreement.', importance: 'high' },
    { clause: 'Dispute Resolution', explanation: 'No dispute resolution or arbitration clause specified.', importance: 'high' },
  ],
  risks: [
    { risk: 'Unlimited liability clause in Section 6 exposes Developer to potentially catastrophic claims without any cap', severity: 'high', detail: 'Standard practice is to cap liability at total contract value and exclude consequential damages.' },
    { risk: '100% early termination penalty may be unenforceable as a penalty under Indian Contract Act, 1872', severity: 'high', detail: 'Section 74 of Indian Contract Act treats such clauses as penalties if they are not genuine pre-estimates of damage.' },
    { risk: 'No force majeure clause leaves parties exposed to unforeseen events', severity: 'medium', detail: 'Without force majeure, parties may be liable for delays caused by events outside their control.' },
    { risk: 'Ambiguous scope of work with no measurable deliverables or acceptance criteria', severity: 'low', detail: 'Scope defined as "as per specifications provided" without reference to any attached SOW.' },
    { risk: 'No data protection obligations in light of DPDP Act, 2023', severity: 'medium', detail: 'Agreement lacks data processing terms, breach notification, and data protection compliance.' },
  ],
  missingTerms: [
    'Dispute Resolution / Arbitration Clause',
    'Force Majeure Clause',
    'Data Protection Agreement (DPA)',
    'Service Level Agreement (SLA)',
    'Warranty & Post-Support',
    'Non-Solicitation Clause',
    'Indemnification Provisions',
    'Assignment Clause',
  ],
  recommendations: [
    'Cap liability to total contract value with mutual exclusion of consequential and indirect damages',
    'Replace unlimited termination penalty with tiered compensation based on work completed percentage',
    'Add force majeure clause covering natural disasters, government actions, and pandemics',
    'Include arbitration clause with seat in Mumbai and language as English',
    'Define scope with measurable KPIs, deliverables, milestones, and acceptance testing criteria',
    'Add data protection obligations compliant with DPDP Act, 2023 and IT Act, 2000',
    'Include mutual indemnification for IP infringement, breach of confidentiality, and statutory non-compliance',
  ],
  parties: ['TechCorp Solutions Pvt Ltd', 'DevSolutions Inc'],
  effectiveDate: 'Not specified',
  jurisdiction: 'India',
};

function FileFormatBadge({ format }: { format: string }) {
  const colorMap: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
    PDF: { bg: 'bg-red-50', text: 'text-red-700', icon: <FileText className="w-3 h-3" /> },
    DOCX: { bg: 'bg-blue-50', text: 'text-blue-700', icon: <FileSpreadsheet className="w-3 h-3" /> },
    TXT: { bg: 'bg-surface-100', text: 'text-surface-700', icon: <File className="w-3 h-3" /> },
  };
  const c = colorMap[format] || colorMap.TXT;
  return (
    <span className={cn('inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-2xs font-semibold', c.bg, c.text)}>
      {c.icon} {format}
    </span>
  );
}

function ClauseCard({ clause, index }: { clause: KeyClause; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const impColor = clause.importance === 'high' ? 'danger' : clause.importance === 'medium' ? 'warning' : 'info';
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
    >
      <div
        className="flex items-start gap-3 p-4 bg-white border border-surface-100 rounded-xl cursor-pointer hover:border-primary-200 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="w-8 h-8 rounded-lg bg-surface-50 flex items-center justify-center shrink-0">
          <BookOpen className="w-4 h-4 text-primary-500" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-medium text-surface-900">{clause.clause}</p>
            <Badge variant={impColor} size="sm">{clause.importance}</Badge>
          </div>
          <p className="text-xs text-surface-500 mt-1">{clause.explanation}</p>
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="mt-2 pt-2 border-t border-surface-100">
                  <p className="text-2xs text-surface-400">
                    This clause affects the overall risk profile of the document.
                    {clause.importance === 'high' ? ' Consider legal review before signing.' : ' Standard industry language.'}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-surface-400 shrink-0" />
        </motion.div>
      </div>
    </motion.div>
  );
}

function RiskCard({ risk, index }: { risk: Risk; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const sevColor = risk.severity === 'high' ? 'danger' : risk.severity === 'medium' ? 'warning' : 'info';
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06 }}
    >
      <div
        className="flex items-start gap-3 p-3 bg-red-50/50 rounded-xl border border-red-100 cursor-pointer hover:border-red-200 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="text-xs text-red-800 font-medium">{risk.risk}</p>
            <Badge variant={sevColor} size="sm">{risk.severity}</Badge>
          </div>
          <AnimatePresence>
            {expanded && risk.detail && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="text-2xs text-red-600 mt-2 pt-2 border-t border-red-200">{risk.detail}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {risk.detail && (
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-3 h-3 text-red-400 shrink-0" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function AIDocumentSummarizationPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<SummaryResult | null>(null);
  const [activeTab, setActiveTab] = useState('summary');

  const handleFiles = useCallback((files: File[]) => {
    if (files[0]) {
      setUploadedFile(files[0]);
      setProcessing(true);
      setResult(null);
      setTimeout(() => {
        setResult(mockResult);
        setProcessing(false);
      }, 2500);
    }
  }, []);

  const handleReset = () => {
    setUploadedFile(null);
    setProcessing(false);
    setResult(null);
    setActiveTab('summary');
  };

  return (
    <div className="min-h-screen bg-surface-50 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/20">
              <Search className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-serif text-primary-500">AI Document Summarization</h1>
              <p className="text-surface-500 mt-1">Upload legal documents for AI-powered analysis and summarization</p>
            </div>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8">
          <AnimatedSection variant="slideLeft" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Document</CardTitle>
              </CardHeader>
              <CardContent>
                {!uploadedFile ? (
                  <FileUpload
                    onFiles={handleFiles}
                    accept=".pdf,.docx,.doc,.txt"
                    multiple={false}
                    maxSize={50 * 1024 * 1024}
                  />
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
                      <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-green-800 truncate">{uploadedFile.name}</p>
                        <p className="text-2xs text-green-600">{(uploadedFile.size / 1024 / 1024).toFixed(1)} MB</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={handleReset}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex gap-2">
                      <FileFormatBadge format="PDF" />
                      <FileFormatBadge format="DOCX" />
                      <FileFormatBadge format="TXT" />
                      <span className="text-2xs text-surface-400 ml-auto self-center">Max 50 MB</span>
                    </div>

                    {!processing && !result && (
                      <Button onClick={() => { setProcessing(true); setTimeout(() => { setResult(mockResult); setProcessing(false); }, 2500); }} className="w-full">
                        <Upload className="w-4 h-4 mr-2" /> Process Document
                      </Button>
                    )}
                  </motion.div>
                )}

                <AnimatePresence>
                  {processing && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 overflow-hidden"
                    >
                      <div className="flex flex-col items-center py-6">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                          className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mb-4"
                        >
                          <FileText className="w-7 h-7 text-white" />
                        </motion.div>
                        <h3 className="text-sm font-semibold text-surface-900 mb-1">Analyzing Document</h3>
                        <p className="text-xs text-surface-500 text-center max-w-xs">
                          Extracting text, identifying clauses, assessing risks, and generating summary
                        </p>
                        <div className="w-full max-w-xs mt-4 h-1.5 bg-surface-200 rounded-full overflow-hidden">
                          <motion.div
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                            className="w-1/3 h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                          />
                        </div>
                        <div className="flex gap-1 mt-4">
                          {[0, 1, 2, 3].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ y: [0, -6, 0] }}
                              transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12 }}
                              className="w-1.5 h-1.5 rounded-full bg-primary-500"
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </AnimatedSection>

          <AnimatedSection variant="slideRight">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <Card>
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                          <FileText className="w-6 h-6 text-primary-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-surface-900">{result.title}</h3>
                          <div className="flex items-center gap-3 mt-1 text-2xs text-surface-500">
                            <Badge variant="primary" size="sm">{result.type}</Badge>
                            <span>{result.pages} pages</span>
                            <span>{result.wordCount.toLocaleString()} words</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Tabs
                    tabs={[
                      { id: 'summary', label: 'Summary', icon: <FileText className="w-4 h-4" /> },
                      { id: 'clauses', label: 'Key Clauses', icon: <BookOpen className="w-4 h-4" />, count: result.keyClauses.length },
                      { id: 'risks', label: 'Risks', icon: <AlertTriangle className="w-4 h-4" />, count: result.risks.length },
                      { id: 'missing', label: 'Missing Terms', icon: <Info className="w-4 h-4" /> },
                    ]}
                    activeTab={activeTab}
                    onChange={setActiveTab}
                    variant="pills"
                    size="sm"
                    className="mb-4"
                  />

                  <AnimatePresence mode="wait">
                    {activeTab === 'summary' && (
                      <motion.div
                        key="summary"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Card>
                          <CardContent className="p-5">
                            <div className="flex items-center gap-2 mb-4">
                              <FileText className="w-5 h-5 text-primary-500" />
                              <h3 className="font-semibold text-surface-900">Document Summary</h3>
                            </div>
                            <p className="text-sm text-surface-700 leading-relaxed">{result.summary}</p>
                            <div className="mt-4 pt-4 border-t border-surface-100">
                              <div className="grid grid-cols-2 gap-3 text-sm">
                                <div className="p-3 bg-surface-50 rounded-lg">
                                  <p className="text-2xs text-surface-500">Parties</p>
                                  <p className="text-xs font-medium text-surface-800 mt-0.5">{result.parties.join(' vs ')}</p>
                                </div>
                                <div className="p-3 bg-surface-50 rounded-lg">
                                  <p className="text-2xs text-surface-500">Effective Date</p>
                                  <p className="text-xs font-medium text-surface-800 mt-0.5">{result.effectiveDate}</p>
                                </div>
                                <div className="p-3 bg-surface-50 rounded-lg">
                                  <p className="text-2xs text-surface-500">Jurisdiction</p>
                                  <p className="text-xs font-medium text-surface-800 mt-0.5">{result.jurisdiction}</p>
                                </div>
                                <div className="p-3 bg-surface-50 rounded-lg">
                                  <p className="text-2xs text-surface-500">Document Type</p>
                                  <p className="text-xs font-medium text-surface-800 mt-0.5">{result.type}</p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}

                    {activeTab === 'clauses' && (
                      <motion.div
                        key="clauses"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-2"
                      >
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <BookOpen className="w-5 h-5 text-primary-500" />
                              Key Clauses & Provisions
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {result.keyClauses.map((c, i) => (
                              <ClauseCard key={i} clause={c} index={i} />
                            ))}
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}

                    {activeTab === 'risks' && (
                      <motion.div
                        key="risks"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <AlertTriangle className="w-5 h-5 text-red-500" />
                              Risks Identified
                              <span className="text-xs font-normal text-surface-400 ml-1">({result.risks.filter(r => r.severity === 'high').length} high)</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            {result.risks.map((r, i) => (
                              <RiskCard key={i} risk={r} index={i} />
                            ))}
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}

                    {activeTab === 'missing' && (
                      <motion.div
                        key="missing"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Info className="w-5 h-5 text-yellow-500" />
                              Missing Terms & Recommendations
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2 mb-6">
                              {result.missingTerms.map((term, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: i * 0.04 }}
                                >
                                  <Badge variant="warning" size="md">{term}</Badge>
                                </motion.div>
                              ))}
                            </div>

                            <div className="border-t border-surface-100 pt-4">
                              <h4 className="text-sm font-semibold text-surface-900 mb-3 flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                Recommendations
                              </h4>
                              <ul className="space-y-2">
                                {result.recommendations.map((rec, i) => (
                                  <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.04 }}
                                    className="flex items-start gap-2 text-sm text-surface-700"
                                  >
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                    {rec}
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center gap-2 p-4 bg-surface-100 rounded-xl">
                    <Button variant="outline" size="sm" onClick={() => {
                      const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `${result.title.replace(/\s+/g, '_')}_Summary.json`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}>
                      <Download className="w-4 h-4 mr-1" /> Download Summary
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleReset}>
                      <Upload className="w-4 h-4 mr-1" /> Analyze Another
                    </Button>
                  </div>
                </motion.div>
              ) : !processing && uploadedFile ? (
                <motion.div
                  key="ready"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-8">
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                          className="w-20 h-20 rounded-2xl bg-surface-100 flex items-center justify-center mb-6"
                        >
                          <Upload className="w-10 h-10 text-surface-400" />
                        </motion.div>
                        <h3 className="text-lg font-semibold text-surface-900 mb-2">Ready to Process</h3>
                        <p className="text-sm text-surface-500 max-w-sm">
                          Click "Process Document" to analyze your uploaded file
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-8">
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                          className="w-20 h-20 rounded-2xl bg-surface-100 flex items-center justify-center mb-6"
                        >
                          <FileText className="w-10 h-10 text-surface-400" />
                        </motion.div>
                        <h3 className="text-lg font-semibold text-surface-900 mb-2">Upload a Document</h3>
                        <p className="text-sm text-surface-500 max-w-sm">
                          Upload a PDF, DOCX, or TXT file to get an AI-powered summary, key clauses, risks, and recommendations
                        </p>
                        <div className="flex items-center gap-2 mt-6">
                          <FileFormatBadge format="PDF" />
                          <FileFormatBadge format="DOCX" />
                          <FileFormatBadge format="TXT" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
