'use client';
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, AlertTriangle, CheckCircle, XCircle, FileText,
  ChevronDown, Scale, Gavel, Download, RotateCcw
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Button, Card, CardContent, CardHeader, CardTitle,
  Badge, Tabs, Alert, FileUpload, Skeleton
} from '@/components/ui';
import AnimatedSection from '@/lib/animation/AnimatedSection';

interface RiskItem {
  clause: string;
  issue: string;
  severity: 'high' | 'medium' | 'low';
  suggestion: string;
  detail: string;
}

interface AnalysisResult {
  overallRisk: 'low' | 'medium' | 'high';
  riskScore: number;
  issues: RiskItem[];
  missingClauses: string[];
  recommendations: string[];
  summary: string;
  documentType: string;
  jurisdiction: string;
}

const sampleContract = `AGREEMENT OF SOFTWARE DEVELOPMENT

This Agreement is made on [Date] between:

Party A: TechCorp Solutions Pvt Ltd (hereinafter "Client")
Party B: DevSolutions Inc (hereinafter "Developer")

1. SCOPE OF WORK
Developer agrees to develop a mobile application as per specifications provided.

2. PAYMENT TERMS
Client shall pay Developer ?25,00,000 as total consideration.
Payment schedule: 50% upon signing, 50% upon completion.

3. INTELLECTUAL PROPERTY
All IP rights shall be transferred to Client upon full payment.

4. CONFIDENTIALITY
Both parties shall maintain confidentiality for 3 years.

5. TERMINATION
Either party may terminate with 30 days notice.
In case of early termination, Client shall pay 100% of remaining amount.

6. LIMITATION OF LIABILITY
Developer's liability shall be unlimited in all cases.

7. GOVERNING LAW
This agreement shall be governed by the laws of India.`;

const mockResult: AnalysisResult = {
  overallRisk: 'high',
  riskScore: 78,
  documentType: 'Software Development Agreement',
  jurisdiction: 'India',
  summary: 'This agreement heavily favors the Developer with unbalanced liability, termination, and payment terms. Multiple critical clauses expose the Client to significant financial and legal risk.',
  issues: [
    {
      clause: 'Section 5 - Termination',
      issue: 'Unlimited early termination penalty',
      severity: 'high',
      suggestion: 'Cap early termination compensation to 20-30% of remaining contract value',
      detail: 'Requiring 100% payment of remaining amount upon early termination is unconscionable and likely unenforceable under Indian Contract Act, 1872. Courts may treat this as a penalty rather than genuine pre-estimate of damages.'
    },
    {
      clause: 'Section 6 - Limitation of Liability',
      issue: 'Unlimited liability clause',
      severity: 'high',
      suggestion: 'Cap liability to contract value or 12 months fees, exclude consequential damages',
      detail: 'Unlimited liability exposes Developer to potentially catastrophic claims. Standard practice is to cap liability at total contract value and exclude consequential, indirect, and special damages.'
    },
    {
      clause: 'Section 2 - Payment Terms',
      issue: 'No milestone-based payments',
      severity: 'medium',
      suggestion: 'Add 3-4 milestone payments linked to deliverables with acceptance criteria',
      detail: '50% upfront payment with 50% on completion creates significant risk. Recommend milestone-linked payments (e.g., 20% signing, 30% design approval, 30% development complete, 20% final acceptance).'
    },
    {
      clause: 'Section 1 - Scope of Work',
      issue: 'Undefined scope with no measurable deliverables',
      severity: 'medium',
      suggestion: 'Attach detailed Statement of Work with timelines, specs, and acceptance criteria',
      detail: 'Scope defined as "as per specifications provided" is ambiguous. This leads to scope creep and disputes. Attach a detailed SOW with technical specifications, milestones, and acceptance testing criteria.'
    },
    {
      clause: 'Section 3 - IP Transfer',
      issue: 'IP transfer contingent on full payment only',
      severity: 'low',
      suggestion: 'Add immediate IP vesting with license back until full payment',
      detail: 'IP should vest upon creation with a license to Developer until full payment, rather than a single lump transfer at the end.'
    }
  ],
  missingClauses: [
    'Force Majeure',
    'Dispute Resolution / Arbitration',
    'Data Protection Agreement (DPA)',
    'Service Level Agreement (SLA)',
    'Warranty & Support',
    'Non-Solicitation',
    'Indemnification',
    'Assignment'
  ],
  recommendations: [
    'Cap liability to total contract value with mutual exclusion of consequential damages',
    'Replace unlimited termination penalty with tiered compensation based on work completed',
    'Add force majeure clause covering pandemics, government actions, and natural disasters',
    'Include arbitration clause (seat: Mumbai, language: English)',
    'Define scope with measurable KPIs, deliverables, and acceptance criteria',
    'Add data protection obligations compliant with DPDP Act, 2023',
    'Include mutual indemnification for IP infringement and breach',
    'Specify warranty period of 90 days post-acceptance with support SLA'
  ]
};

function RiskScoreCard({ result }: { result: AnalysisResult }) {
  const scoreColor = result.overallRisk === 'high' ? 'text-red-500' : result.overallRisk === 'medium' ? 'text-yellow-500' : 'text-green-500';
  const scoreBg = result.overallRisk === 'high' ? 'bg-red-50 border-red-200' : result.overallRisk === 'medium' ? 'bg-yellow-50 border-yellow-200' : 'bg-green-50 border-green-200';
  const icon = result.overallRisk === 'high' ? XCircle : result.overallRisk === 'medium' ? AlertTriangle : CheckCircle;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <Card className={cn('border-2', scoreBg)}>
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <motion.div
              initial={{ rotate: -20, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
              className={cn('w-14 h-14 rounded-2xl flex items-center justify-center shrink-0', scoreBg)}
            >
              {icon({ className: cn('w-7 h-7', scoreColor) })}
            </motion.div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className={cn('text-lg font-bold capitalize', scoreColor)}>
                    {result.overallRisk} Risk
                  </p>
                  <p className="text-sm text-surface-500">{result.issues.length} issues found &middot; {result.missingClauses.length} clauses missing</p>
                </div>
                <div className="text-right">
                  <div className={cn('text-3xl font-bold', scoreColor)}>{result.riskScore}%</div>
                  <p className="text-2xs text-surface-400">Risk Score</p>
                </div>
              </div>
              <div className="mt-3 h-2 bg-surface-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${result.riskScore}%` }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                  className={cn(
                    'h-full rounded-full',
                    result.overallRisk === 'high' ? 'bg-red-500' : result.overallRisk === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  )}
                />
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4 text-xs text-surface-500 border-t border-surface-100 pt-4">
            <span className="flex items-center gap-1"><FileText className="w-3 h-3" />{result.documentType}</span>
            <span className="flex items-center gap-1"><Gavel className="w-3 h-3" />{result.jurisdiction}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function IssueCard({ issue, index }: { issue: RiskItem; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const severityColor = issue.severity === 'high' ? 'danger' : issue.severity === 'medium' ? 'warning' : 'info';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 200, damping: 20 }}
    >
      <Card variant="interactive" className="border-l-4 border-l-transparent hover:border-l-primary-500" onClick={() => setExpanded(!expanded)}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className={cn(
              'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
              issue.severity === 'high' ? 'bg-red-50' : issue.severity === 'medium' ? 'bg-yellow-50' : 'bg-blue-50'
            )}>
              <AlertTriangle className={cn(
                'w-4 h-4',
                issue.severity === 'high' ? 'text-red-500' : issue.severity === 'medium' ? 'text-yellow-500' : 'text-blue-500'
              )} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-medium text-surface-500">{issue.clause}</p>
                  <p className="text-sm font-semibold text-surface-900 mt-0.5">{issue.issue}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant={severityColor} size="sm">{issue.severity}</Badge>
                  <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-4 h-4 text-surface-400" />
                  </motion.div>
                </div>
              </div>
              <p className="text-xs text-surface-500 mt-1">Suggestion: {issue.suggestion}</p>
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 mt-3 border-t border-surface-100">
                      <div className="flex items-start gap-2 p-3 bg-surface-50 rounded-lg">
                        <Scale className="w-4 h-4 text-primary-500 mt-0.5 shrink-0" />
                        <p className="text-xs text-surface-600 leading-relaxed">{issue.detail}</p>
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

export default function AIContractReviewPage() {
  const [activeTab, setActiveTab] = useState('paste');
  const [contractText, setContractText] = useState(sampleContract);
  const [reviewing, setReviewing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFiles = useCallback((files: File[]) => {
    setUploadedFiles(files);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) setContractText(e.target.result as string);
    };
    if (files[0]) reader.readAsText(files[0]);
  }, []);

  const handleReview = () => {
    if (!contractText.trim()) return;
    setReviewing(true);
    setResult(null);
    setTimeout(() => {
      setResult(mockResult);
      setReviewing(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-surface-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/20">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-serif text-primary-500">AI Contract Review</h1>
              <p className="text-surface-500 mt-1">Analyze contracts for risks, missing clauses, and unusual obligations</p>
            </div>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8">
          <AnimatedSection variant="slideLeft" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Input Contract</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs
                  tabs={[
                    { id: 'paste', label: 'Paste Text', icon: <FileText className="w-4 h-4" /> },
                    { id: 'upload', label: 'Upload Document', icon: <FileText className="w-4 h-4" /> }
                  ]}
                  activeTab={activeTab}
                  onChange={setActiveTab}
                  variant="pills"
                  size="sm"
                  className="mb-4"
                />

                <AnimatePresence mode="wait">
                  {activeTab === 'paste' ? (
                    <motion.div
                      key="paste"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <textarea
                        value={contractText}
                        onChange={(e) => setContractText(e.target.value)}
                        className="w-full h-[360px] px-4 py-3 border border-surface-200 rounded-xl text-sm font-mono text-surface-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-none transition-all duration-200 placeholder:text-surface-400"
                        placeholder="Paste your contract text here..."
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="upload"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FileUpload
                        onFiles={handleFiles}
                        accept=".txt,.doc,.docx,.pdf"
                        multiple={false}
                        maxSize={10 * 1024 * 1024}
                      />
                      {uploadedFiles.length > 0 && (
                        <Alert variant="success" message="Document loaded. Click Analyze to review." className="mt-4" />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-center gap-3 mt-4">
                  <Button
                    onClick={handleReview}
                    loading={reviewing}
                    size="lg"
                    className="flex-1"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Analyze Contract
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => { setContractText(sampleContract); setResult(null); }}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Load Sample
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          <AnimatedSection variant="slideRight" className="space-y-4">
            <AnimatePresence mode="wait">
              {reviewing ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <Card>
                    <CardContent className="p-8">
                      <div className="flex flex-col items-center justify-center py-8">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                          className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mb-4"
                        >
                          <Shield className="w-7 h-7 text-white" />
                        </motion.div>
                        <h3 className="text-lg font-semibold text-surface-900 mb-2">Analyzing Contract</h3>
                        <p className="text-sm text-surface-500 text-center max-w-xs">
                          Reviewing clauses, identifying risks, checking compliance against legal standards
                        </p>
                        <div className="flex gap-1 mt-6">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ y: [0, -8, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                              className="w-2 h-2 rounded-full bg-primary-500"
                            />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} variant="card" className="h-24" />
                    ))}
                  </div>
                </motion.div>
              ) : result ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <RiskScoreCard result={result} />

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        Identified Issues
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {result.issues.map((issue, i) => (
                        <IssueCard key={i} issue={issue} index={i} />
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <XCircle className="w-5 h-5 text-red-500" />
                        Missing Clauses
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {result.missingClauses.map((clause, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <Badge variant="danger" size="md">
                              {clause}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-50/50 border-green-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-700">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {result.recommendations.map((rec, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-start gap-2 text-sm text-surface-700"
                          >
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                            {rec}
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <div className="flex items-center gap-2 p-4 bg-surface-100 rounded-xl">
                    <Download className="w-4 h-4 text-surface-500" />
                    <Button variant="ghost" size="sm">Download Report (PDF)</Button>
                    <Button variant="ghost" size="sm">Export as DOCX</Button>
                  </div>
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
                      <div className="flex flex-col items-center justify-center py-16 text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                          className="w-20 h-20 rounded-2xl bg-surface-100 flex items-center justify-center mb-6"
                        >
                          <Scale className="w-10 h-10 text-surface-400" />
                        </motion.div>
                        <h3 className="text-lg font-semibold text-surface-900 mb-2">Ready to Review</h3>
                        <p className="text-sm text-surface-500 max-w-sm">
                          Paste a contract or upload a document, then click "Analyze Contract" to get started
                        </p>
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
