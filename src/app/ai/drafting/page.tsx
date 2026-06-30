'use client';
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Download, Copy, CheckCircle, RefreshCw, File,
  FileSignature, ScrollText, Send, Book, Pen, FileBadge,
  FileSpreadsheet, ChevronRight, Eye, EyeOff, AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Button, Card, CardContent, CardHeader, CardTitle,
  Badge, Input, Alert, Tabs, Modal
} from '@/components/ui';
import AnimatedSection from '@/lib/animation/AnimatedSection';

interface Template {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  fields: { key: string; label: string; type: 'text' | 'textarea' | 'date' | 'select'; required?: boolean; options?: string[] }[];
}

const templates: Template[] = [
  {
    id: 'nda', label: 'Non-Disclosure Agreement', description: 'Protect confidential information between parties',
    icon: <Shield className="w-5 h-5" />, category: 'Contracts',
    fields: [
      { key: 'disclosingParty', label: 'Disclosing Party Name', type: 'text', required: true },
      { key: 'receivingParty', label: 'Receiving Party Name', type: 'text', required: true },
      { key: 'effectiveDate', label: 'Effective Date', type: 'date', required: true },
      { key: 'jurisdiction', label: 'Jurisdiction', type: 'text', required: true },
      { key: 'term', label: 'Confidentiality Term (years)', type: 'text', required: true },
      { key: 'purpose', label: 'Purpose of Disclosure', type: 'textarea', required: true },
    ]
  },
  {
    id: 'employment', label: 'Employment Contract', description: 'Standard employment agreement',
    icon: <FileBadge className="w-5 h-5" />, category: 'Contracts',
    fields: [
      { key: 'employeeName', label: 'Employee Name', type: 'text', required: true },
      { key: 'employerName', label: 'Employer Name', type: 'text', required: true },
      { key: 'position', label: 'Position / Title', type: 'text', required: true },
      { key: 'salary', label: 'Annual Salary', type: 'text', required: true },
      { key: 'startDate', label: 'Start Date', type: 'date', required: true },
      { key: 'location', label: 'Work Location', type: 'text', required: true },
      { key: 'probationPeriod', label: 'Probation Period (months)', type: 'text' },
    ]
  },
  {
    id: 'service', label: 'Service Agreement', description: 'Agreement for professional services',
    icon: <FileSignature className="w-5 h-5" />, category: 'Agreements',
    fields: [
      { key: 'serviceProvider', label: 'Service Provider', type: 'text', required: true },
      { key: 'client', label: 'Client', type: 'text', required: true },
      { key: 'serviceDescription', label: 'Service Description', type: 'textarea', required: true },
      { key: 'paymentTerms', label: 'Payment Terms', type: 'text', required: true },
      { key: 'startDate', label: 'Start Date', type: 'date', required: true },
      { key: 'endDate', label: 'End Date', type: 'date' },
    ]
  },
  {
    id: 'legalNotice', label: 'Legal Notice', description: 'Formal legal notice to opposing party',
    icon: <ScrollText className="w-5 h-5" />, category: 'Letters',
    fields: [
      { key: 'senderName', label: 'Sender Name', type: 'text', required: true },
      { key: 'senderAddress', label: 'Sender Address', type: 'textarea', required: true },
      { key: 'recipientName', label: 'Recipient Name', type: 'text', required: true },
      { key: 'recipientAddress', label: 'Recipient Address', type: 'textarea', required: true },
      { key: 'date', label: 'Date', type: 'date', required: true },
      { key: 'subject', label: 'Subject', type: 'text', required: true },
      { key: 'description', label: 'Description of Claim', type: 'textarea', required: true },
      { key: 'demand', label: 'Demand / Relief Sought', type: 'textarea', required: true },
    ]
  },
  {
    id: 'petition', label: 'Civil Petition Draft', description: 'Draft petition for civil litigation',
    icon: <Pen className="w-5 h-5" />, category: 'Petitions',
    fields: [
      { key: 'court', label: 'Court Name', type: 'text', required: true },
      { key: 'petitioner', label: 'Petitioner Name', type: 'text', required: true },
      { key: 'respondent', label: 'Respondent Name', type: 'text', required: true },
      { key: 'caseType', label: 'Case Type', type: 'text', required: true },
      { key: 'facts', label: 'Facts of the Case', type: 'textarea', required: true },
      { key: 'grounds', label: 'Grounds for Petition', type: 'textarea', required: true },
      { key: 'prayer', label: 'Prayer / Relief Sought', type: 'textarea', required: true },
    ]
  },
  {
    id: 'termination', label: 'Termination Letter', description: 'Employment termination notice',
    icon: <Send className="w-5 h-5" />, category: 'Letters',
    fields: [
      { key: 'employeeName', label: 'Employee Name', type: 'text', required: true },
      { key: 'employerName', label: 'Employer Name', type: 'text', required: true },
      { key: 'terminationDate', label: 'Termination Date', type: 'date', required: true },
      { key: 'lastWorkingDay', label: 'Last Working Day', type: 'date', required: true },
      { key: 'reason', label: 'Reason for Termination', type: 'textarea', required: true },
      { key: 'severance', label: 'Severance Details', type: 'textarea' },
    ]
  },
  {
    id: 'partnership', label: 'Partnership Agreement', description: 'Business partnership deed',
    icon: <Book className="w-5 h-5" />, category: 'Agreements',
    fields: [
      { key: 'partner1', label: 'Partner 1 Name', type: 'text', required: true },
      { key: 'partner2', label: 'Partner 2 Name', type: 'text', required: true },
      { key: 'firmName', label: 'Firm Name', type: 'text', required: true },
      { key: 'businessType', label: 'Nature of Business', type: 'text', required: true },
      { key: 'capitalContribution1', label: 'Partner 1 Contribution', type: 'text', required: true },
      { key: 'capitalContribution2', label: 'Partner 2 Contribution', type: 'text', required: true },
      { key: 'profitRatio', label: 'Profit Sharing Ratio', type: 'text', required: true },
    ]
  },
  {
    id: 'rental', label: 'Rental Agreement', description: 'Residential rental agreement',
    icon: <FileSpreadsheet className="w-5 h-5" />, category: 'Contracts',
    fields: [
      { key: 'landlord', label: 'Landlord Name', type: 'text', required: true },
      { key: 'tenant', label: 'Tenant Name', type: 'text', required: true },
      { key: 'propertyAddress', label: 'Property Address', type: 'textarea', required: true },
      { key: 'rentAmount', label: 'Monthly Rent', type: 'text', required: true },
      { key: 'securityDeposit', label: 'Security Deposit', type: 'text', required: true },
      { key: 'leaseStart', label: 'Lease Start Date', type: 'date', required: true },
      { key: 'leaseEnd', label: 'Lease End Date', type: 'date', required: true },
    ]
  },
  {
    id: 'wills', label: 'Last Will & Testament', description: 'Simple will for estate planning',
    icon: <File className="w-5 h-5" />, category: 'Petitions',
    fields: [
      { key: 'testatorName', label: 'Testator Name', type: 'text', required: true },
      { key: 'testatorAddress', label: 'Testator Address', type: 'textarea', required: true },
      { key: 'executorName', label: 'Executor Name', type: 'text', required: true },
      { key: 'beneficiary1', label: 'Primary Beneficiary', type: 'text', required: true },
      { key: 'bequest1', label: 'Bequest to Primary Beneficiary', type: 'textarea', required: true },
      { key: 'beneficiary2', label: 'Alternate Beneficiary', type: 'text' },
      { key: 'bequest2', label: 'Bequest to Alternate', type: 'textarea' },
    ]
  },
  {
    id: 'consent', label: 'Consent Letter', description: 'Legal consent form for various purposes',
    icon: <FileSignature className="w-5 h-5" />, category: 'Letters',
    fields: [
      { key: 'consentingParty', label: 'Consenting Party', type: 'text', required: true },
      { key: 'recipient', label: 'To Whom It Concerns', type: 'text', required: true },
      { key: 'purpose', label: 'Purpose of Consent', type: 'textarea', required: true },
      { key: 'date', label: 'Date', type: 'date', required: true },
      { key: 'duration', label: 'Duration of Consent', type: 'text' },
    ]
  },
  {
    id: 'affidavit', label: 'Affidavit Draft', description: 'Sworn affidavit for court filing',
    icon: <FileText className="w-5 h-5" />, category: 'Petitions',
    fields: [
      { key: 'deponentName', label: 'Deponent Name', type: 'text', required: true },
      { key: 'deponentAddress', label: 'Deponent Address', type: 'textarea', required: true },
      { key: 'courtName', label: 'Court Name', type: 'text', required: true },
      { key: 'caseNumber', label: 'Case Number', type: 'text' },
      { key: 'statement', label: 'Statement on Oath', type: 'textarea', required: true },
      { key: 'date', label: 'Date of Swearing', type: 'date', required: true },
    ]
  },
  {
    id: 'noticePeriod', label: 'Notice Period Letter', description: 'Resignation notice letter',
    icon: <Send className="w-5 h-5" />, category: 'Notices',
    fields: [
      { key: 'employeeName', label: 'Employee Name', type: 'text', required: true },
      { key: 'employerName', label: 'Employer / Company Name', type: 'text', required: true },
      { key: 'position', label: 'Position Held', type: 'text', required: true },
      { key: 'lastWorkingDay', label: 'Last Working Day', type: 'date', required: true },
      { key: 'reason', label: 'Reason for Leaving', type: 'textarea' },
    ]
  },
];

function Shield({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

const categories = ['All', 'Contracts', 'Agreements', 'Letters', 'Petitions', 'Notices'];

function generateDraftContent(template: Template, variables: Record<string, string>): string {
  const d = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const t = template;
  const v = variables;

  const header = `${t.label}\n${'='.repeat(60)}\nDate: ${v.date || v.effectiveDate || v.startDate || v.leaseStart || d}\n\n`;

  const partySection = (() => {
    if (t.id === 'nda') return `THIS NON-DISCLOSURE AGREEMENT is made on ${v.effectiveDate || d} BETWEEN:\n\n${v.disclosingParty || '[Disclosing Party]'} ("Disclosing Party")\nAND\n${v.receivingParty || '[Receiving Party]'} ("Receiving Party")\n\n`;
    if (t.id === 'employment') return `THIS EMPLOYMENT CONTRACT is made on ${v.startDate || d} BETWEEN:\n\n${v.employerName || '[Employer]'} ("Employer")\nAND\n${v.employeeName || '[Employee]'} ("Employee")\n\n`;
    if (t.id === 'service') return `THIS SERVICE AGREEMENT is made on ${v.startDate || d} BETWEEN:\n\n${v.client || '[Client]'} ("Client")\nAND\n${v.serviceProvider || '[Service Provider]'} ("Service Provider")\n\n`;
    if (t.id === 'legalNotice') return `LEGAL NOTICE\n\nDate: ${v.date || d}\n\nFROM:\n${v.senderName || '[Sender]'}\n${v.senderAddress || '[Address]'}\n\nTO:\n${v.recipientName || '[Recipient]'}\n${v.recipientAddress || '[Address]'}\n\nSUBJECT: ${v.subject || '[Subject]'}\n\n`;
    if (t.id === 'petition') return `IN THE ${v.court || '[Court Name]'}\n\nBEFORE THE HON'BLE JUDGE\n\nCase Type: ${v.caseType || '[Case Type]'}\n\nPETITIONER:\n${v.petitioner || '[Petitioner]'}\n\nRESPONDENT:\n${v.respondent || '[Respondent]'}\n\n`;
    if (t.id === 'termination') return `TERMINATION LETTER\n\nDate: ${v.terminationDate || d}\n\nTO:\n${v.employeeName || '[Employee Name]'}\n\nFROM:\n${v.employerName || '[Employer Name]'}\n\nSUBJECT: Termination of Employment\n\n`;
    if (t.id === 'partnership') return `PARTNERSHIP DEED\n\nThis Deed of Partnership is made on ${d} BETWEEN:\n\n${v.partner1 || '[Partner 1]'}\nAND\n${v.partner2 || '[Partner 2]'}\n\n`;
    if (t.id === 'rental') return `RENTAL AGREEMENT\n\nThis Rental Agreement is made on ${v.leaseStart || d} BETWEEN:\n\n${v.landlord || '[Landlord]'} ("Landlord")\nAND\n${v.tenant || '[Tenant]'} ("Tenant")\n\n`;
    if (t.id === 'wills') return `LAST WILL AND TESTAMENT\n\nI, ${v.testatorName || '[Testator]'}, residing at ${v.testatorAddress || '[Address]'}, do hereby make, publish, and declare this to be my Last Will and Testament.\n\n`;
    if (t.id === 'consent') return `CONSENT LETTER\n\nDate: ${v.date || d}\n\nI, ${v.consentingParty || '[Consenting Party]'}, hereby give my consent for the following purpose:\n\n`;
    if (t.id === 'affidavit') return `AFFIDAVIT\n\nIN THE ${v.courtName || '[Court Name]'}\n\nCase No: ${v.caseNumber || '[Case Number]'}\n\nI, ${v.deponentName || '[Deponent]'}, aged about [Age] years, residing at ${v.deponentAddress || '[Address]'}, do hereby solemnly state on oath as follows:\n\n`;
    if (t.id === 'noticePeriod') return `RESIGNATION LETTER\n\nDate: ${d}\n\nTO:\n${v.employerName || '[Employer Name]'}\n\nFROM:\n${v.employeeName || '[Employee Name]'}\nPosition: ${v.position || '[Position]'}\n\nSUBJECT: Resignation - Notice Period\n\n`;
    return '';
  })();

  const bodySection = `1. TERMS AND CONDITIONS\n\n${Object.entries(v).filter(([k]) => !['date', 'effectiveDate', 'startDate', 'endDate', 'leaseStart', 'leaseEnd', 'terminationDate', 'lastWorkingDay'].includes(k)).map(([k, val]) => `${k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}: ${val || '[To be filled]'}`).join('\n')}\n\n2. GOVERNING LAW\nThis ${t.label} shall be governed by and construed in accordance with the laws of India.\n\n3. JURISDICTION\nThe courts of [City, State] shall have exclusive jurisdiction over any disputes arising under this ${t.label}.\n\n4. ENTIRE AGREEMENT\nThis document constitutes the entire agreement between the parties and supersedes all prior discussions and understandings.\n\n5. SIGNATURES\n\n______________________        ______________________\n[Party 1]                           [Party 2]\n\n`;

  const footer = `\n${'='.repeat(60)}\nThis is an AI-generated draft. It must be reviewed and customized by a qualified legal professional before use. This does not constitute legal advice.\n`;

  return header + partySection + bodySection + footer;
}

export default function AIDraftingPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [draft, setDraft] = useState('');
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [preview, setPreview] = useState(true);
  const [showTemplateSelector, setShowTemplateSelector] = useState(true);

  const filteredTemplates = activeCategory === 'All'
    ? templates
    : templates.filter(t => t.category === activeCategory);

  const selectTemplate = useCallback((tmpl: Template) => {
    setSelectedTemplate(tmpl);
    setVariables({});
    setDraft('');
    setCopied(false);
    setShowTemplateSelector(false);
  }, []);

  const handleGenerate = () => {
    if (!selectedTemplate) return;
    setGenerating(true);
    setTimeout(() => {
      const content = generateDraftContent(selectedTemplate, variables);
      setDraft(content);
      setGenerating(false);
      setPreview(true);
    }, 1500);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(draft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (format: string) => {
    const blob = new Blob([draft], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedTemplate?.id || 'draft'}.${format === 'txt' ? 'txt' : 'md'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-surface-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center shadow-lg shadow-accent-500/20">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-serif text-primary-500">AI Draft Generator</h1>
              <p className="text-surface-500 mt-1">Generate professional legal documents and contracts</p>
            </div>
          </div>

          {!showTemplateSelector && selectedTemplate && (
            <div className="flex items-center gap-2 text-sm text-surface-500">
              <button onClick={() => { setShowTemplateSelector(true); setSelectedTemplate(null); setDraft(''); }} className="text-primary-500 hover:underline">
                Templates
              </button>
              <ChevronRight className="w-3 h-3" />
              <span className="text-surface-700 font-medium">{selectedTemplate.label}</span>
            </div>
          )}
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              {showTemplateSelector ? (
                <motion.div
                  key="selector"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Select Template</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Tabs
                        tabs={categories.map(c => ({ id: c, label: c }))}
                        activeTab={activeCategory}
                        onChange={setActiveCategory}
                        variant="pills"
                        size="sm"
                        className="mb-4"
                      />
                      <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                        {filteredTemplates.map((tmpl) => (
                          <motion.button
                            key={tmpl.id}
                            layout
                            onClick={() => selectTemplate(tmpl)}
                            className="w-full flex items-center gap-3 p-3 rounded-xl border border-surface-200 bg-white text-left hover:border-primary-300 hover:bg-primary-50/30 transition-all duration-200 group"
                            whileHover={{ x: 4 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          >
                            <div className="w-10 h-10 rounded-lg bg-surface-100 flex items-center justify-center text-primary-500 group-hover:bg-primary-50 transition-colors">
                              {tmpl.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-surface-900">{tmpl.label}</p>
                              <p className="text-2xs text-surface-500 mt-0.5">{tmpl.description}</p>
                            </div>
                            <Badge variant="default" size="sm">{tmpl.category}</Badge>
                          </motion.button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : selectedTemplate ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {selectedTemplate.icon}
                        {selectedTemplate.label}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedTemplate.fields.map((field) => (
                          <div key={field.key}>
                            {field.type === 'textarea' ? (
                              <div>
                                <label className="block text-sm font-medium text-surface-700 mb-1.5">
                                  {field.label} {field.required && <span className="text-danger-500">*</span>}
                                </label>
                                <textarea
                                  value={variables[field.key] || ''}
                                  onChange={(e) => setVariables(prev => ({ ...prev, [field.key]: e.target.value }))}
                                  placeholder={`Enter ${field.label.toLowerCase()}`}
                                  rows={3}
                                  className="w-full px-4 py-3 border border-surface-200 rounded-xl text-sm text-surface-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-none transition-all duration-200 placeholder:text-surface-400"
                                />
                              </div>
                            ) : field.type === 'select' ? (
                              <div>
                                <label className="block text-sm font-medium text-surface-700 mb-1.5">
                                  {field.label} {field.required && <span className="text-danger-500">*</span>}
                                </label>
                                <select
                                  value={variables[field.key] || ''}
                                  onChange={(e) => setVariables(prev => ({ ...prev, [field.key]: e.target.value }))}
                                  className="w-full px-4 py-2.5 border border-surface-200 rounded-lg text-sm text-surface-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                                >
                                  <option value="">Select...</option>
                                  {field.options?.map(o => <option key={o} value={o}>{o}</option>)}
                                </select>
                              </div>
                            ) : (
                              <Input
                                label={field.label}
                                required={field.required}
                                type={field.type}
                                value={variables[field.key] || ''}
                                onChange={(e) => setVariables(prev => ({ ...prev, [field.key]: e.target.value }))}
                                placeholder={`Enter ${field.label.toLowerCase()}`}
                              />
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-3 mt-6">
                        <Button onClick={handleGenerate} loading={generating} className="flex-1" size="lg">
                          <RefreshCw className="w-4 h-4 mr-2" /> Generate Draft
                        </Button>
                        <Button variant="outline" onClick={() => { setSelectedTemplate(null); setShowTemplateSelector(true); setDraft(''); }}>
                          Change
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {generating ? (
                <motion.div
                  key="generating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Card>
                    <CardContent className="p-12">
                      <div className="flex flex-col items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center mb-6"
                        >
                          <FileText className="w-8 h-8 text-white" />
                        </motion.div>
                        <h3 className="text-lg font-semibold text-surface-900 mb-2">Generating Draft</h3>
                        <p className="text-sm text-surface-500 text-center max-w-sm">
                          AI is drafting your {selectedTemplate?.label} based on the provided information
                        </p>
                        <div className="flex gap-1 mt-6">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ y: [0, -8, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                              className="w-2 h-2 rounded-full bg-accent-500"
                            />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : draft ? (
                <motion.div
                  key="draft"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-accent-500" />
                          Generated Draft
                        </CardTitle>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setPreview(!preview)}
                          >
                            {preview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCopy}
                          >
                            {copied ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDownload('txt')}>
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {preview ? (
                        <div className="bg-white border border-surface-200 rounded-xl p-6 min-h-[400px] max-h-[600px] overflow-y-auto">
                          <pre className="whitespace-pre-wrap font-sans text-sm text-surface-800 leading-relaxed">{draft}</pre>
                        </div>
                      ) : (
                        <textarea
                          value={draft}
                          onChange={(e) => setDraft(e.target.value)}
                          className="w-full min-h-[400px] max-h-[600px] px-4 py-3 border border-surface-200 rounded-xl text-sm font-mono text-surface-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-y"
                        />
                      )}
                    </CardContent>
                  </Card>

                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleDownload('txt')}>
                        <Download className="w-4 h-4 mr-1" /> TXT
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDownload('docx')}>
                        <Download className="w-4 h-4 mr-1" /> DOCX
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDownload('pdf')}>
                        <Download className="w-4 h-4 mr-1" /> PDF
                      </Button>
                    </div>
                    <Alert variant="warning" message="This is an AI-generated draft. Review with a qualified lawyer before use." className="flex-1" />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty-preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-12">
                      <div className="flex flex-col items-center justify-center py-16 text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                          className="w-20 h-20 rounded-2xl bg-surface-100 flex items-center justify-center mb-6"
                        >
                          <FileText className="w-10 h-10 text-surface-400" />
                        </motion.div>
                        <h3 className="text-lg font-semibold text-surface-900 mb-2">No Draft Yet</h3>
                        <p className="text-sm text-surface-500 max-w-sm">
                          Select a template from the left, fill in the details, and generate your legal document
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
