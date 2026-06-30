'use client';
import { useState, createElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot, ArrowRight, ArrowLeft, CheckCircle, Send, User,
  Scale, FileText, AlertCircle, Target, ClipboardList, Calendar,
  MapPin, Phone, Mail, Building, Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Button, Card, CardContent, CardHeader, CardTitle,
  Input, Select, Badge, Avatar, Alert
} from '@/components/ui';
import AnimatedSection from '@/lib/animation/AnimatedSection';

interface IntakeData {
  fullName: string;
  email: string;
  phone: string;
  caseType: string;
  incidentDescription: string;
  incidentDate: string;
  incidentLocation: string;
  opposingName: string;
  opposingRepresentative: string;
  opposingContact: string;
  desiredOutcome: string;
  additionalNotes: string;
}

const initialData: IntakeData = {
  fullName: '', email: '', phone: '',
  caseType: '',
  incidentDescription: '', incidentDate: '', incidentLocation: '',
  opposingName: '', opposingRepresentative: '', opposingContact: '',
  desiredOutcome: '', additionalNotes: ''
};

const caseTypeOptions = [
  { value: 'corporate', label: 'Corporate Law' },
  { value: 'criminal', label: 'Criminal Law' },
  { value: 'civil', label: 'Civil Litigation' },
  { value: 'divorce', label: 'Divorce & Family Law' },
  { value: 'property', label: 'Property Law' },
  { value: 'immigration', label: 'Immigration' },
  { value: 'tax', label: 'Tax Law' },
  { value: 'ip', label: 'Intellectual Property' },
  { value: 'consumer', label: 'Consumer Law' },
  { value: 'startup', label: 'Startup Legal' },
  { value: 'employment', label: 'Employment Law' },
  { value: 'other', label: 'Other' }
];

const steps = [
  { id: 1, title: 'Personal Info', subtitle: 'Your contact details', icon: User },
  { id: 2, title: 'Case Type', subtitle: 'Practice area', icon: Scale },
  { id: 3, title: 'Incident Details', subtitle: 'What happened', icon: FileText },
  { id: 4, title: 'Opposing Party', subtitle: 'Other party info', icon: Building },
  { id: 5, title: 'Desired Outcome', subtitle: 'What you want', icon: Target },
  { id: 6, title: 'Review & Submit', subtitle: 'Final review', icon: ClipboardList },
];

const stepVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -300 : 300, opacity: 0 }),
};

function StepperIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center gap-0">
      {steps.map((step, i) => {
        const isCompleted = i < currentStep;
        const isCurrent = i === currentStep;
        const isLast = i === steps.length - 1;
        return (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center relative">
              <motion.div
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                  backgroundColor: isCompleted ? '#16a34a' : isCurrent ? '#1a365d' : '#e4e7f0',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center relative z-10',
                  isCurrent && 'shadow-lg shadow-primary-500/30'
                )}
              >
                {isCompleted ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <CheckCircle className="w-5 h-5 text-white" />
                  </motion.div>
                ) : (
                  <step.icon className={cn('w-4 h-4', isCurrent ? 'text-white' : 'text-surface-400')} />
                )}
              </motion.div>
              <p className={cn(
                'text-2xs font-medium mt-1.5 whitespace-nowrap',
                isCurrent ? 'text-primary-500' : isCompleted ? 'text-green-600' : 'text-surface-400'
              )}>
                {step.title}
              </p>
            </div>
            {!isLast && (
              <div className="flex-1 h-0.5 mx-2 mb-5 bg-surface-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: isCompleted ? '100%' : isCurrent ? '0%' : '0%' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full bg-primary-500 rounded-full"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function StepPersonalInfo({
  data, onChange, onNext
}: {
  data: IntakeData; onChange: (k: keyof IntakeData, v: string) => void; onNext: () => void;
}) {
  const valid = data.fullName && data.email && data.phone;
  return (
    <div className="space-y-5">
      <Input label="Full Name" value={data.fullName} onChange={(e) => onChange('fullName', e.target.value)} placeholder="John Doe" leftIcon={<User className="w-4 h-4" />} required />
      <Input label="Email Address" type="email" value={data.email} onChange={(e) => onChange('email', e.target.value)} placeholder="john@example.com" leftIcon={<Mail className="w-4 h-4" />} required />
      <Input label="Phone Number" type="tel" value={data.phone} onChange={(e) => onChange('phone', e.target.value)} placeholder="+91 98765 43210" leftIcon={<Phone className="w-4 h-4" />} required />
      <div className="flex justify-end pt-2">
        <Button onClick={onNext} disabled={!valid}>
          Next <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

function StepCaseType({
  data, onChange, onNext, onPrev
}: {
  data: IntakeData; onChange: (k: keyof IntakeData, v: string) => void; onNext: () => void; onPrev: () => void;
}) {
  return (
    <div className="space-y-5">
      <Select
        label="Case Type / Practice Area"
        options={caseTypeOptions}
        value={data.caseType}
        onChange={(v) => onChange('caseType', v)}
        placeholder="Select a practice area..."
        searchable
      />
      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={onPrev}><ArrowLeft className="w-4 h-4 mr-2" /> Previous</Button>
        <Button onClick={onNext} disabled={!data.caseType}>
          Next <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

function StepIncidentDetails({
  data, onChange, onNext, onPrev
}: {
  data: IntakeData; onChange: (k: keyof IntakeData, v: string) => void; onNext: () => void; onPrev: () => void;
}) {
  const valid = data.incidentDescription && data.incidentDate && data.incidentLocation;
  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-surface-700 mb-1.5">Describe What Happened <span className="text-danger-500">*</span></label>
        <textarea
          value={data.incidentDescription}
          onChange={(e) => onChange('incidentDescription', e.target.value)}
          placeholder="Provide a detailed description of the incident or legal matter..."
          className="w-full h-32 px-4 py-3 border border-surface-200 rounded-xl text-sm text-surface-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-none transition-all duration-200 placeholder:text-surface-400"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Date of Incident" type="date" value={data.incidentDate} onChange={(e) => onChange('incidentDate', e.target.value)} leftIcon={<Calendar className="w-4 h-4" />} required />
        <Input label="Location" value={data.incidentLocation} onChange={(e) => onChange('incidentLocation', e.target.value)} placeholder="City, State" leftIcon={<MapPin className="w-4 h-4" />} required />
      </div>
      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={onPrev}><ArrowLeft className="w-4 h-4 mr-2" /> Previous</Button>
        <Button onClick={onNext} disabled={!valid}>
          Next <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

function StepOpposingParty({
  data, onChange, onNext, onPrev
}: {
  data: IntakeData; onChange: (k: keyof IntakeData, v: string) => void; onNext: () => void; onPrev: () => void;
}) {
  return (
    <div className="space-y-5">
      <Input label="Opposing Party Name" value={data.opposingName} onChange={(e) => onChange('opposingName', e.target.value)} placeholder="Name of person or entity" leftIcon={<Building className="w-4 h-4" />} />
      <Input label="Legal Representative (if known)" value={data.opposingRepresentative} onChange={(e) => onChange('opposingRepresentative', e.target.value)} placeholder="Lawyer or representative name" leftIcon={<Shield className="w-4 h-4" />} />
      <Input label="Opposing Party Contact" value={data.opposingContact} onChange={(e) => onChange('opposingContact', e.target.value)} placeholder="Email or phone" leftIcon={<Phone className="w-4 h-4" />} />
      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={onPrev}><ArrowLeft className="w-4 h-4 mr-2" /> Previous</Button>
        <Button onClick={onNext}>Next <ArrowRight className="w-4 h-4 ml-2" /></Button>
      </div>
    </div>
  );
}

function StepDesiredOutcome({
  data, onChange, onNext, onPrev
}: {
  data: IntakeData; onChange: (k: keyof IntakeData, v: string) => void; onNext: () => void; onPrev: () => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-surface-700 mb-1.5">What outcome are you seeking? <span className="text-danger-500">*</span></label>
        <textarea
          value={data.desiredOutcome}
          onChange={(e) => onChange('desiredOutcome', e.target.value)}
          placeholder="Describe the resolution or outcome you are hoping to achieve..."
          className="w-full h-28 px-4 py-3 border border-surface-200 rounded-xl text-sm text-surface-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-none transition-all duration-200 placeholder:text-surface-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-surface-700 mb-1.5">Additional Notes</label>
        <textarea
          value={data.additionalNotes}
          onChange={(e) => onChange('additionalNotes', e.target.value)}
          placeholder="Any other information you'd like to share..."
          className="w-full h-24 px-4 py-3 border border-surface-200 rounded-xl text-sm text-surface-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-none transition-all duration-200 placeholder:text-surface-400"
        />
      </div>
      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={onPrev}><ArrowLeft className="w-4 h-4 mr-2" /> Previous</Button>
        <Button onClick={onNext} disabled={!data.desiredOutcome}>
          Review <ClipboardList className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

function StepReview({
  data, onPrev, onSubmit
}: {
  data: IntakeData; onPrev: () => void; onSubmit: () => void;
}) {
  const sections = [
    { title: 'Personal Information', items: [
      { label: 'Full Name', value: data.fullName },
      { label: 'Email', value: data.email },
      { label: 'Phone', value: data.phone },
    ]},
    { title: 'Case Type', items: [
      { label: 'Practice Area', value: caseTypeOptions.find(o => o.value === data.caseType)?.label || data.caseType },
    ]},
    { title: 'Incident Details', items: [
      { label: 'Description', value: data.incidentDescription },
      { label: 'Date', value: data.incidentDate },
      { label: 'Location', value: data.incidentLocation },
    ]},
    { title: 'Opposing Party', items: [
      { label: 'Name', value: data.opposingName || 'Not provided' },
      { label: 'Representative', value: data.opposingRepresentative || 'Not provided' },
      { label: 'Contact', value: data.opposingContact || 'Not provided' },
    ]},
    { title: 'Desired Outcome', items: [
      { label: 'Outcome', value: data.desiredOutcome },
      { label: 'Additional Notes', value: data.additionalNotes || 'None' },
    ]},
  ];

  return (
    <div className="space-y-6">
      {sections.map((section, si) => (
        <motion.div
          key={si}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: si * 0.08 }}
        >
          <h4 className="text-sm font-semibold text-primary-500 mb-2 flex items-center gap-2">
            <span className="w-1 h-4 bg-primary-500 rounded-full" />
            {section.title}
          </h4>
          <div className="bg-surface-50 rounded-xl p-4 space-y-2">
            {section.items.map((item, ii) => (
              <div key={ii} className="flex justify-between text-sm">
                <span className="text-surface-500">{item.label}</span>
                <span className="text-surface-900 font-medium text-right max-w-[60%]">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={onPrev}><ArrowLeft className="w-4 h-4 mr-2" /> Previous</Button>
        <Button onClick={onSubmit} size="lg">
          <Send className="w-4 h-4 mr-2" /> Submit Intake
        </Button>
      </div>
    </div>
  );
}

function SummaryScreen({ data }: { data: IntakeData }) {
  return (
    <AnimatedSection className="mx-auto max-w-2xl">
      <Card className="text-center overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-500" />
        <CardContent className="p-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
            className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-green-500" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold font-serif text-surface-900 mb-2">Intake Complete</h2>
            <p className="text-surface-500 mb-6 max-w-md mx-auto">
              Thank you, {data.fullName}. Your case has been recorded and assigned a case number. A lawyer will review and follow up within 24 hours.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-surface-50 rounded-2xl p-6 mb-6 text-left"
          >
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-surface-200">
              <span className="text-sm font-medium text-surface-700">Case Number</span>
              <span className="text-sm font-bold text-primary-500 font-mono">
                LF/{new Date().getFullYear()}/{Math.random().toString(36).substring(2, 8).toUpperCase()}
              </span>
            </div>
            <div className="space-y-3 text-sm">
              {[
                { label: 'Name', value: data.fullName },
                { label: 'Case Type', value: caseTypeOptions.find(o => o.value === data.caseType)?.label || data.caseType },
                { label: 'Filed On', value: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) },
              ].map((item, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-surface-500">{item.label}</span>
                  <span className="text-surface-900 font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Alert variant="info" title="What happens next?" message="A case manager will contact you within 24 hours to schedule a consultation with the appropriate lawyer." />
          </motion.div>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
}

export default function AIIntakeInterviewPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [data, setData] = useState<IntakeData>(initialData);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (key: keyof IntakeData, value: string) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const goNext = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    }
  };

  const goPrev = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) return <SummaryScreen data={data} />;

  return (
    <div className="min-h-screen bg-surface-50 py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-accent-500/20">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-serif text-primary-500">AI Intake Interview</h1>
              <p className="text-surface-500 mt-1">Guided step-by-step case intake</p>
            </div>
          </div>
          <StepperIndicator currentStep={currentStep} />
        </AnimatedSection>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                    {createElement(steps[currentStep].icon, { className: 'w-5 h-5 text-primary-500' })}
                  </div>
                  <div>
                    <CardTitle className="text-surface-900">
                      Step {currentStep + 1}: {steps[currentStep].title}
                    </CardTitle>
                    <p className="text-sm text-surface-500 mt-0.5">{steps[currentStep].subtitle}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {currentStep === 0 && <StepPersonalInfo data={data} onChange={updateField} onNext={goNext} />}
                {currentStep === 1 && <StepCaseType data={data} onChange={updateField} onNext={goNext} onPrev={goPrev} />}
                {currentStep === 2 && <StepIncidentDetails data={data} onChange={updateField} onNext={goNext} onPrev={goPrev} />}
                {currentStep === 3 && <StepOpposingParty data={data} onChange={updateField} onNext={goNext} onPrev={goPrev} />}
                {currentStep === 4 && <StepDesiredOutcome data={data} onChange={updateField} onNext={goNext} onPrev={goPrev} />}
                {currentStep === 5 && <StepReview data={data} onPrev={goPrev} onSubmit={handleSubmit} />}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        <p className="text-center text-2xs text-surface-400 mt-4">
          Your information is protected and confidential
        </p>
      </div>
    </div>
  );
}
