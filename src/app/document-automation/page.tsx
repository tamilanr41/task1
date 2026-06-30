'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, FileSignature, FileCheck, ScrollText, Scale,
  Download, Eye, ChevronLeft, Loader2, CheckCircle,
  Shield, Users, Building, Home, Heart
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { Stepper, type Step } from '@/components/ui/stepper';
import { AnimatedSection } from '@/lib/animation';

interface Template {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  fields: FormField[];
  popular: boolean;
}

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'date' | 'select' | 'textarea';
  required: boolean;
  options?: string[];
  placeholder?: string;
}

const templates: Template[] = [
  {
    id: 'nda',
    title: 'Non-Disclosure Agreement',
    description: 'Standard mutual NDA for business confidentiality',
    icon: <Shield className="w-6 h-6" />,
    color: 'bg-blue-50 text-blue-600 border-blue-200',
    popular: true,
    fields: [
      { id: 'party1', label: 'Disclosing Party Name', type: 'text', required: true, placeholder: 'Full legal name' },
      { id: 'party2', label: 'Receiving Party Name', type: 'text', required: true, placeholder: 'Full legal name' },
      { id: 'effectiveDate', label: 'Effective Date', type: 'date', required: true },
      { id: 'term', label: 'Term (months)', type: 'text', required: true, placeholder: '24' },
      { id: 'jurisdiction', label: 'Jurisdiction', type: 'select', required: true, options: ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Other'] },
      { id: 'purpose', label: 'Purpose of Disclosure', type: 'textarea', required: true, placeholder: 'Describe the purpose...' },
    ],
  },
  {
    id: 'employment',
    title: 'Employment Contract',
    description: 'Comprehensive employment agreement template',
    icon: <Users className="w-6 h-6" />,
    color: 'bg-green-50 text-green-600 border-green-200',
    popular: true,
    fields: [
      { id: 'employeeName', label: 'Employee Name', type: 'text', required: true, placeholder: 'Full name' },
      { id: 'employerName', label: 'Employer/Company Name', type: 'text', required: true, placeholder: 'Company name' },
      { id: 'position', label: 'Position/Title', type: 'text', required: true, placeholder: 'e.g. Senior Associate' },
      { id: 'startDate', label: 'Start Date', type: 'date', required: true },
      { id: 'salary', label: 'Annual Salary (INR)', type: 'text', required: true, placeholder: 'e.g. 1200000' },
      { id: 'employmentType', label: 'Employment Type', type: 'select', required: true, options: ['Full-time', 'Part-time', 'Contract', 'Probation'] },
      { id: 'noticePeriod', label: 'Notice Period (days)', type: 'text', required: true, placeholder: '90' },
    ],
  },
  {
    id: 'lease',
    title: 'Lease Agreement',
    description: 'Residential and commercial lease agreement',
    icon: <Building className="w-6 h-6" />,
    color: 'bg-purple-50 text-purple-600 border-purple-200',
    popular: false,
    fields: [
      { id: 'landlord', label: 'Landlord Name', type: 'text', required: true, placeholder: 'Full name' },
      { id: 'tenant', label: 'Tenant Name', type: 'text', required: true, placeholder: 'Full name' },
      { id: 'property', label: 'Property Address', type: 'textarea', required: true, placeholder: 'Full property address' },
      { id: 'startDate', label: 'Lease Start Date', type: 'date', required: true },
      { id: 'endDate', label: 'Lease End Date', type: 'date', required: true },
      { id: 'rent', label: 'Monthly Rent (INR)', type: 'text', required: true, placeholder: 'e.g. 50000' },
      { id: 'securityDeposit', label: 'Security Deposit (INR)', type: 'text', required: true, placeholder: 'e.g. 100000' },
      { id: 'propertyType', label: 'Property Type', type: 'select', required: true, options: ['Residential', 'Commercial', 'Industrial'] },
    ],
  },
  {
    id: 'will',
    title: 'Last Will & Testament',
    description: 'Standard will for estate planning',
    icon: <Heart className="w-6 h-6" />,
    color: 'bg-rose-50 text-rose-600 border-rose-200',
    popular: false,
    fields: [
      { id: 'testator', label: 'Testator Name', type: 'text', required: true, placeholder: 'Full legal name' },
      { id: 'executor', label: 'Executor Name', type: 'text', required: true, placeholder: 'Executor full name' },
      { id: 'beneficiary1', label: 'Primary Beneficiary', type: 'text', required: true, placeholder: 'Name of beneficiary' },
      { id: 'beneficiary2', label: 'Secondary Beneficiary', type: 'text', required: false, placeholder: 'Optional' },
      { id: 'date', label: 'Date of Execution', type: 'date', required: true },
      { id: 'witness1', label: 'Witness 1 Name', type: 'text', required: true, placeholder: 'Full name' },
      { id: 'witness2', label: 'Witness 2 Name', type: 'text', required: true, placeholder: 'Full name' },
    ],
  },
  {
    id: 'poa',
    title: 'Power of Attorney',
    description: 'General power of attorney document',
    icon: <ScrollText className="w-6 h-6" />,
    color: 'bg-amber-50 text-amber-600 border-amber-200',
    popular: false,
    fields: [
      { id: 'principal', label: 'Principal Name', type: 'text', required: true, placeholder: 'Full legal name' },
      { id: 'agent', label: 'Agent/Attorney Name', type: 'text', required: true, placeholder: 'Full legal name' },
      { id: 'effectiveDate', label: 'Effective Date', type: 'date', required: true },
      { id: 'expiryDate', label: 'Expiry Date', type: 'date', required: false },
      { id: 'scope', label: 'Scope of Authority', type: 'textarea', required: true, placeholder: 'Describe the powers granted...' },
      { id: 'jurisdiction', label: 'Jurisdiction', type: 'select', required: true, options: ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'All India'] },
    ],
  },
];

export default function DocumentAutomationPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [generating, setGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [generated, setGenerated] = useState(false);

  const steps: Step[] = [
    { title: 'Select Template', description: 'Choose a document template', status: step >= 0 ? (step > 0 ? 'completed' : 'current') : 'pending' },
    { title: 'Fill Details', description: 'Enter required information', status: step >= 1 ? (step > 1 ? 'completed' : 'current') : 'pending' },
    { title: 'Review & Generate', description: 'Preview and download', status: step >= 2 ? (step > 2 ? 'completed' : 'current') : 'pending' },
  ];

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setStep(1);
    setFormData({});
    setGenerated(false);
  };

  const handleFieldChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
      setStep(2);
      setShowPreview(true);
    }, 2000);
  };

  const handleBack = () => {
    if (step === 1) {
      setSelectedTemplate(null);
      setStep(0);
    } else if (step === 2) {
      setStep(1);
      setShowPreview(false);
    }
  };

  const isFormValid = selectedTemplate
    ? selectedTemplate.fields.filter(f => f.required).every(f => formData[f.id]?.trim())
    : false;

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <AnimatedSection>
          <div className="flex items-center gap-4">
            {selectedTemplate && (
              <button onClick={handleBack} className="p-2 rounded-xl hover:bg-surface-100 transition-colors">
                <ChevronLeft className="w-5 h-5 text-surface-500" />
              </button>
            )}
            <div>
              <h1 className="text-3xl font-bold text-surface-900 font-serif">Document Automation</h1>
              <p className="text-surface-500 mt-1">Generate legal documents instantly from smart templates</p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <Stepper steps={steps} currentStep={step} orientation="horizontal" variant="numbers" />
        </AnimatedSection>

        {step === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {templates.map((template, idx) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
              >
                <Card
                  variant="interactive"
                  padding="md"
                  onClick={() => handleSelectTemplate(template)}
                  className="h-full flex flex-col"
                >
                  <CardContent className="flex flex-col items-center text-center gap-4 h-full">
                    <div className={cn('w-16 h-16 rounded-2xl flex items-center justify-center border-2', template.color)}>
                      {template.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base">{template.title}</CardTitle>
                      <CardDescription className="mt-1">{template.description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="default" size="sm">{template.fields.length} fields</Badge>
                      {template.popular && <Badge variant="accent" size="sm">Popular</Badge>}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {selectedTemplate && step >= 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatedSection>
              <Card>
                <CardHeader>
                  <CardTitle>{selectedTemplate.title}</CardTitle>
                  <CardDescription>Fill in the required information below</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    {selectedTemplate.fields.map((field) => (
                      field.type === 'textarea' ? (
                        <div key={field.id}>
                          <label className="block text-sm font-medium text-surface-700 mb-1.5">
                            {field.label}
                            {field.required && <span className="text-danger-500 ml-0.5">*</span>}
                          </label>
                          <textarea
                            value={formData[field.id] || ''}
                            onChange={(e) => handleFieldChange(field.id, e.target.value)}
                            placeholder={field.placeholder}
                            rows={3}
                            className="w-full px-4 py-2.5 text-sm rounded-lg border border-surface-200 bg-white text-surface-900 placeholder:text-surface-400 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all resize-none"
                          />
                        </div>
                      ) : field.type === 'select' ? (
                        <div key={field.id}>
                          <label className="block text-sm font-medium text-surface-700 mb-1.5">
                            {field.label}
                            {field.required && <span className="text-danger-500 ml-0.5">*</span>}
                          </label>
                          <select
                            value={formData[field.id] || ''}
                            onChange={(e) => handleFieldChange(field.id, e.target.value)}
                            className="w-full px-4 py-2.5 text-sm rounded-lg border border-surface-200 bg-white text-surface-700 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none"
                          >
                            <option value="">Select...</option>
                            {field.options?.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <Input
                          key={field.id}
                          label={field.label}
                          type={field.type}
                          value={formData[field.id] || ''}
                          onChange={(e) => handleFieldChange(field.id, e.target.value)}
                          placeholder={field.placeholder}
                          required={field.required}
                        />
                      )
                    ))}
                  </div>
                  <div className="flex gap-3 mt-8">
                    <Button variant="outline" onClick={handleBack}>Back</Button>
                    <Button variant="primary" size="lg" fullWidth onClick={handleGenerate} loading={generating} disabled={!isFormValid}>
                      {generating ? 'Generating...' : 'Generate Document'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Document Preview</CardTitle>
                  <CardDescription>Preview of the generated document</CardDescription>
                </CardHeader>
                <CardContent>
                  {generated ? (
                    <div className="space-y-4">
                      <div className="bg-white rounded-xl border border-surface-200 p-6 min-h-[400px] shadow-soft">
                        <div className="text-center mb-6 pb-6 border-b border-surface-100">
                          <h2 className="text-xl font-bold text-surface-900 font-serif">{selectedTemplate.title}</h2>
                          <p className="text-sm text-surface-500 mt-1">Generated on {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>
                        <div className="space-y-3 text-sm text-surface-700 leading-relaxed">
                          {Object.entries(formData).map(([key, value]) => (
                            <p key={key}><span className="font-semibold text-surface-900">{key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}:</span> {value}</p>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button variant="primary" size="lg" fullWidth>
                          <Download className="w-4 h-4" />
                          Download as PDF
                        </Button>
                        <Button variant="outline" size="lg">
                          <Download className="w-4 h-4" />
                          DOCX
                        </Button>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm text-success-600 bg-success-50 rounded-xl p-3">
                        <CheckCircle className="w-4 h-4" />
                        Document generated successfully
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                      <FileText className="w-16 h-16 text-surface-200 mb-4" />
                      <p className="text-surface-400">Fill in the fields and click</p>
                      <p className="text-surface-400">Generate to preview your document</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        )}
      </div>
    </div>
  );
}
