'use client';

import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Scale, Shield, Gavel, Heart, Users, Home, Plane,
  Calculator, Lightbulb, Rocket, ShoppingCart,
  ArrowRight, Star, Clock, FileText, BadgeCheck,
  Search, Sparkles, ChevronRight, X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const placeholders = [
  'Describe your legal issue...',
  'I need help with divorce...',
  'I want to register my company...',
  'I have a property dispute...',
  'I need GST legal advice...',
  'I want trademark registration...',
  'I received a legal notice...',
  'I need a consumer complaint...',
  'Help with family settlement...',
];

const services = [
  {
    id: 'family-law', slug: 'family-law',
    title: 'Family Law', icon: Heart,
    description: 'Expert guidance on marriage, divorce, child custody, adoption, and family settlements with compassion and confidentiality.',
    duration: '45 min consultation',
    documents: ['Marriage Certificate', 'Income Proof', 'Property Statements', 'Identity Proof'],
    process: ['Initial consultation & case assessment', 'Document collection & verification', 'Legal strategy planning', 'Filing & representation'],
    timeline: '3-18 months depending on case type',
    lawyer: 'Adv. Sneha Kapoor',
    fee: '₹1,800',
    successRate: 95,
    color: 'accent',
  },
  {
    id: 'corporate-law', slug: 'corporate-law',
    title: 'Corporate Law', icon: Shield,
    description: 'Complete corporate legal solutions from company incorporation to mergers, compliance, and board advisory.',
    duration: '1 hour consultation',
    documents: ['Director IDs (DIN)', 'Registered Office Proof', 'MOA & AOA', 'Digital Signatures'],
    process: ['Business structure advisory', 'Incorporation filing', 'Compliance setup', 'Ongoing advisory'],
    timeline: '7-10 days for incorporation',
    lawyer: 'Adv. Rajesh Sharma',
    fee: '₹2,500',
    successRate: 98,
    color: 'primary',
  },
  {
    id: 'criminal-law', slug: 'criminal-law',
    title: 'Criminal Law', icon: Gavel,
    description: 'Aggressive criminal defense representation for bail, appeals, white-collar crimes, and criminal complaints.',
    duration: '45 min consultation',
    documents: ['FIR Copy', 'Bail Orders', 'Charge Sheet', 'Witness Statements'],
    process: ['Case review & defense strategy', 'Bail application filing', 'Evidence analysis', 'Court representation'],
    timeline: '1-3 years for trial',
    lawyer: 'Adv. Priya Patel',
    fee: '₹3,500',
    successRate: 92,
    color: 'accent',
  },
  {
    id: 'property-law', slug: 'property-law',
    title: 'Property Law', icon: Home,
    description: 'Secure your property rights with expert legal assistance for registration, disputes, RERA, and land matters.',
    duration: '1 hour consultation',
    documents: ['Title Deeds', 'Encumbrance Certificate', 'Sale Agreement', 'Tax Receipts'],
    process: ['Title verification & due diligence', 'Documentation drafting', 'Registration & stamp duty', 'Dispute resolution'],
    timeline: '1-6 months for registration',
    lawyer: 'Adv. Vikram Desai',
    fee: '₹2,200',
    successRate: 94,
    color: 'primary',
  },
  {
    id: 'tax-law', slug: 'tax-law',
    title: 'Tax Law', icon: Calculator,
    description: 'Strategic tax planning, GST compliance, income tax filing, notice response, and appeals.',
    duration: '1 hour consultation',
    documents: ['PAN Card', 'Income Statements', 'Bank Statements', 'Previous Tax Returns'],
    process: ['Tax liability assessment', 'Return preparation & filing', 'Notice drafting & response', 'Appeal representation'],
    timeline: 'Ongoing compliance',
    lawyer: 'Adv. Arun Krishnan',
    fee: '₹3,000',
    successRate: 96,
    color: 'accent',
  },
  {
    id: 'immigration', slug: 'immigration',
    title: 'Immigration', icon: Plane,
    description: 'Comprehensive immigration services for visas, green cards, citizenship, and global mobility solutions.',
    duration: '1 hour consultation',
    documents: ['Passport', 'Educational Documents', 'Employment Letters', 'Financial Statements'],
    process: ['Visa eligibility assessment', 'Application preparation', 'Document verification', 'Submission & follow-up'],
    timeline: '3-12 months by country',
    lawyer: 'Adv. Maria D\'Souza',
    fee: '₹3,000',
    successRate: 91,
    color: 'primary',
  },
  {
    id: 'startup-legal', slug: 'startup-legal',
    title: 'Startup Legal', icon: Rocket,
    description: 'End-to-end legal support for startups from incorporation to fundraising, contracts, and compliance.',
    duration: '1 hour consultation',
    documents: ['Founder IDs', 'Business Plan', 'Address Proof', 'Founder Agreements'],
    process: ['Incorporation & structuring', 'Founders agreement drafting', 'Fundraising support', 'Compliance management'],
    timeline: '5-7 days for incorporation',
    lawyer: 'Adv. Rajesh Sharma',
    fee: '₹2,500',
    successRate: 97,
    color: 'accent',
  },
  {
    id: 'intellectual-property', slug: 'intellectual-property',
    title: 'Intellectual Property', icon: Lightbulb,
    description: 'Protect your innovations with trademark registration, patent filing, copyright, and IP litigation.',
    duration: '1 hour consultation',
    documents: ['Brand/Logo Details', 'Applicant Information', 'Proof of Use', 'Specification Documents'],
    process: ['IP search & clearance', 'Application preparation', 'Filing & prosecution', 'Portfolio management'],
    timeline: '6-12 months for trademark',
    lawyer: 'Adv. Arun Krishnan',
    fee: '₹3,500',
    successRate: 99,
    color: 'primary',
  },
];

const bubbles = [
  { id: 'b1', service: services[0], x: 5, y: 12, delay: 0 },
  { id: 'b2', service: services[1], x: 82, y: 8, delay: 0.5 },
  { id: 'b3', service: services[2], x: 88, y: 45, delay: 1.0 },
  { id: 'b4', service: services[3], x: 3, y: 52, delay: 1.5 },
  { id: 'b5', service: services[4], x: 10, y: 78, delay: 0.8 },
  { id: 'b6', service: services[5], x: 85, y: 80, delay: 1.3 },
];

const TypingPlaceholder = memo(function TypingPlaceholder({ placeholders }: { placeholders: string[] }) {
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = placeholders[textIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && charIndex < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 40 + Math.random() * 30);
    } else if (!isDeleting && charIndex >= current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, 20 + Math.random() * 15);
    } else if (isDeleting && charIndex <= 0) {
      setIsDeleting(false);
      setTextIndex((textIndex + 1) % placeholders.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, placeholders]);

  return (
    <span className="text-base md:text-lg text-surface-400">
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
        className="text-accent-500 font-light"
      >
        |
      </motion.span>
    </span>
  );
});

const Bubble = memo(function Bubble({
  service,
  x,
  y,
  delay,
  onSelect,
}: {
  service: typeof services[number];
  x: number;
  y: number;
  delay: number;
  onSelect: (s: typeof services[number]) => void;
}) {
  const Icon = service.icon;
  return (
    <motion.button
      className="absolute z-10 hidden lg:flex items-center gap-2 px-4 py-2.5 bg-white rounded-full border border-surface-200/60 shadow-soft cursor-pointer group whitespace-nowrap"
      style={{ left: `${x}%`, top: `${y}%`, willChange: 'transform' }}
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.33, 1, 0.68, 1] }}
      whileHover={{
        scale: 1.08,
        boxShadow: '0 12px 40px rgba(26,54,93,0.12)',
        borderColor: 'rgba(194,151,77,0.4)',
      }}
      onClick={() => onSelect(service)}
    >
      <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center group-hover:bg-accent-50 transition-colors duration-300">
        <motion.div whileHover={{ rotate: 10 }} transition={{ duration: 0.2 }}>
          <Icon className="w-4 h-4 text-primary-500 group-hover:text-accent-600 transition-colors duration-300" />
        </motion.div>
      </div>
      <span className="text-sm font-medium text-primary-500 group-hover:text-accent-600 transition-colors duration-300">
        {service.title}
      </span>
    </motion.button>
  );
});

const RecommendationPanel = memo(function RecommendationPanel({
  service,
  onClose,
}: {
  service: typeof services[number];
  onClose: () => void;
}) {
  const Icon = service.icon;
  const colors = service.color === 'accent'
    ? { bg: 'bg-accent-50', text: 'text-accent-600', iconBg: 'bg-accent-100', border: 'border-accent-200', btn: 'bg-accent-500 hover:bg-accent-600', shadow: 'shadow-accent-500/30' }
    : { bg: 'bg-primary-50', text: 'text-primary-600', iconBg: 'bg-primary-100', border: 'border-primary-200', btn: 'bg-primary-500 hover:bg-primary-600', shadow: 'shadow-primary-500/30' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.97 }}
      transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
      className="relative bg-white rounded-2xl border border-surface-200/80 shadow-elevated overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent-500 via-primary-500 to-accent-500" />

      <div className="p-6 md:p-8">
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-100 flex items-center justify-center text-surface-400 hover:text-surface-600 hover:bg-surface-200 transition-all">
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Left: icon + main info */}
          <div className="shrink-0">
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
              className={cn('w-16 h-16 rounded-2xl flex items-center justify-center', colors.bg)}
            >
              <motion.div
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Icon className={cn('w-8 h-8', colors.text)} />
              </motion.div>
            </motion.div>
          </div>

          {/* Center: details */}
          <div className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-bold text-primary-500">{service.title}</h3>
                <span className={cn('px-2.5 py-1 rounded-full text-2xs font-bold', colors.bg, colors.text)}>
                  {service.successRate}% Success
                </span>
              </div>
              <p className="text-sm text-surface-500 leading-relaxed mb-5">{service.description}</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
                className="bg-surface-50 rounded-xl p-4"
              >
                <span className="text-2xs text-surface-400 uppercase tracking-wider font-medium">Consultation</span>
                <p className="text-sm font-semibold text-primary-500 mt-1 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-accent-500" /> {service.duration}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="bg-surface-50 rounded-xl p-4"
              >
                <span className="text-2xs text-surface-400 uppercase tracking-wider font-medium">Fee Starts At</span>
                <p className="text-sm font-semibold text-primary-500 mt-1">{service.fee}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="bg-surface-50 rounded-xl p-4"
              >
                <span className="text-2xs text-surface-400 uppercase tracking-wider font-medium">Timeline</span>
                <p className="text-sm font-semibold text-primary-500 mt-1">{service.timeline}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="bg-surface-50 rounded-xl p-4"
              >
                <span className="text-2xs text-surface-400 uppercase tracking-wider font-medium">Recommended Lawyer</span>
                <p className="text-sm font-semibold text-primary-500 mt-1">{service.lawyer}</p>
              </motion.div>
            </div>

            {/* Required documents */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              className="mb-6"
            >
              <span className="text-xs font-semibold text-surface-600 mb-2 block">Required Documents</span>
              <div className="flex flex-wrap gap-2">
                {service.documents.map((doc) => (
                  <span key={doc} className="px-3 py-1.5 bg-surface-50 text-surface-600 text-xs rounded-lg border border-surface-100">
                    {doc}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Legal process */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="mb-6"
            >
              <span className="text-xs font-semibold text-surface-600 mb-2 block">Expected Legal Process</span>
              <div className="space-y-2">
                {service.process.map((step, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className={cn('w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5', colors.bg)}>
                      <span className={cn('text-2xs font-bold', colors.text)}>{i + 1}</span>
                    </div>
                    <span className="text-sm text-surface-600">{step}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.55 }}
              className="flex flex-wrap gap-3 pt-6 border-t border-surface-100"
            >
              <Link href="/booking">
                <motion.button
                  className={cn('px-6 py-3 text-white font-semibold rounded-xl shadow-lg inline-flex items-center gap-2', colors.btn, colors.shadow)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <BadgeCheck className="w-5 h-5" />
                  Book Consultation <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
              <Link href={`/practice-areas/${service.slug}`}>
                <motion.button
                  className="px-6 py-3 bg-white text-primary-500 font-semibold rounded-xl border border-surface-200 hover:border-primary-300 hover:bg-primary-50 transition-all inline-flex items-center gap-2 shadow-soft"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FileText className="w-5 h-5" />
                  Talk to Expert
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-surface-200 pointer-events-none" />
    </motion.div>
  );
});

const chipLabels = [
  { label: 'Family Law', id: 'family-law' },
  { label: 'Criminal Law', id: 'criminal-law' },
  { label: 'Corporate Law', id: 'corporate-law' },
  { label: 'Property Law', id: 'property-law' },
  { label: 'Tax Law', id: 'tax-law' },
  { label: 'Immigration', id: 'immigration' },
  { label: 'Startup Legal', id: 'startup-legal' },
  { label: 'Consumer Law', id: 'consumer-law' },
  { label: 'Employment Law', id: 'employment-law' },
  { label: 'Trademark', id: 'intellectual-property' },
  { label: 'Intellectual Property', id: 'intellectual-property' },
];

export default function LegalAISearch() {
  const [selectedService, setSelectedService] = useState<typeof services[number] | null>(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const handleChipClick = useCallback((id: string) => {
    const svc = services.find((s) => s.id === id);
    if (svc) setSelectedService(svc);
  }, []);

  return (
    <section className="section-padding bg-gradient-to-b from-white via-surface-50 to-white overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-500/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary-500/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-page relative z-[2]">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent-50 text-accent-600 text-xs font-semibold rounded-full mb-4"
          >
            <Sparkles className="w-4 h-4" />
            AI-Powered Legal Assistant
          </motion.span>
          <h2 className="section-title mt-2 mb-4">Find the Right Legal Solution</h2>
          <p className="section-subtitle max-w-xl mx-auto">
            Tell us your legal issue and we&apos;ll guide you to the right legal service in seconds.
          </p>
        </motion.div>

        {/* Floating bubbles */}
        <div className="relative">
          <div className="relative min-h-[400px] md:min-h-[520px] flex flex-col items-center justify-start md:justify-center">
            {bubbles.map((b) => (
              <Bubble
                key={b.id}
                service={b.service}
                x={b.x}
                y={b.y}
                delay={b.delay}
                onSelect={setSelectedService}
              />
            ))}

            {/* Main search area */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
              className="w-full max-w-2xl mx-auto z-20"
            >
              {/* Search box */}
              <motion.div
                className={cn(
                  'relative bg-white rounded-2xl border-2 transition-all duration-400 shadow-soft',
                  searchFocused ? 'border-accent-500/40 shadow-elevated' : 'border-surface-200/80'
                )}
                whileHover={{ boxShadow: '0 20px 60px rgba(26,54,93,0.08)' }}
              >
                <div className="flex items-center gap-3 px-5 py-4">
                  <motion.div
                    animate={searchFocused ? { rotate: 0, scale: 1 } : { rotate: -5, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Search className={cn('w-6 h-6 transition-colors duration-300', searchFocused ? 'text-accent-500' : 'text-surface-400')} />
                  </motion.div>
                  <div className="flex-1 relative">
                    <input
                      ref={searchRef}
                      type="text"
                      className="w-full bg-transparent border-none outline-none text-base md:text-lg text-primary-500 placeholder-transparent focus:ring-0 p-0"
                      onFocus={() => setSearchFocused(true)}
                      onBlur={() => setSearchFocused(false)}
                      onChange={(e) => {
                        const val = e.target.value;
                        const match = services.find((s) =>
                          s.title.toLowerCase().includes(val.toLowerCase())
                        );
                        if (match && val.length > 0) setSelectedService(match);
                      }}
                    />
                    {/* Animated placeholder overlay */}
                    <div className="absolute inset-0 pointer-events-none flex items-center" aria-hidden>
                      <TypingPlaceholder placeholders={placeholders} />
                    </div>
                  </div>
                  <motion.button
                    className="w-10 h-10 rounded-xl bg-accent-500 flex items-center justify-center text-white shadow-button shrink-0"
                    whileHover={{ scale: 1.06, rotate: 90 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => {
                      if (searchRef.current?.value) {
                        const match = services.find((s) =>
                          s.title.toLowerCase().includes(searchRef.current!.value.toLowerCase())
                        );
                        if (match) setSelectedService(match);
                      }
                    }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>

              {/* Suggestion chips */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: { transition: { staggerChildren: 0.03, delayChildren: 0.5 } },
                  hidden: {},
                }}
                className="flex flex-wrap justify-center gap-2 mt-5"
              >
                {chipLabels.map((chip) => (
                  <motion.button
                    key={chip.id + chip.label}
                    variants={{
                      visible: { opacity: 1, y: 0, scale: 1 },
                      hidden: { opacity: 0, y: 10, scale: 0.9 },
                    }}
                    transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
                    className={cn(
                      'px-3.5 py-1.5 rounded-xl text-xs font-medium border transition-all duration-300 whitespace-nowrap',
                      selectedService?.id === chip.id
                        ? 'bg-accent-500 text-white border-accent-500 shadow-sm'
                        : 'bg-white text-surface-500 border-surface-200 hover:border-accent-300 hover:text-accent-600 hover:bg-accent-50/50'
                    )}
                    whileHover={{ scale: 1.04, y: -1 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleChipClick(chip.id)}
                  >
                    {chip.label}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Recommendation panel */}
          <AnimatePresence mode="wait">
            {selectedService && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-8 max-w-3xl mx-auto"
              >
                <RecommendationPanel
                  service={selectedService}
                  onClose={() => setSelectedService(null)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom hint */}
          {!selectedService && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center mt-8"
            >
              <p className="text-xs text-surface-400">
                Or browse our{' '}
                <Link href="/practice-areas" className="text-accent-500 hover:text-accent-600 font-medium underline-offset-2 hover:underline">
                  all practice areas
                </Link>
                {' '}· Your information stays confidential
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
