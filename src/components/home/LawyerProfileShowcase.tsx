'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Star, Award, Phone, Calendar, Mail, BadgeCheck,
  GraduationCap, Globe, Scale, TrendingUp, ArrowUpRight,
  ChevronLeft, ChevronRight, BookOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { practiceAreasList } from '@/lib/data';

interface Lawyer {
  id: string; name: string; experience: number; bio: string;
  avatar: string; consultationFee: number; rating: number; reviewCount: number;
  languages: string[]; courtMemberships: string[]; certifications: string[];
  education: string[]; practiceAreas: string[]; availability: string[];
}

const roles = ['Senior Partner', 'Partner', 'Managing Partner', 'Associate Partner', 'Senior Advocate', 'Lead Counsel'];

const successRates = [98, 96, 99, 94, 95, 92];
const achievements = [
  ['Handled 500+ Corporate Deals', 'Top Rated Lawyer 2024', 'NLSIU Alumni'],
  ['500+ Criminal Cases Won', 'Pro Bono Award 2023', 'Supreme Court Advocate'],
  ['500+ IP Registrations', 'Harvard LLM Graduate', 'Patent Specialist'],
  ['300+ Family Cases Resolved', 'Child Rights Advocate', 'Mediation Certified'],
  ['400+ Property Cases Won', 'RERA Consultant', 'Title Expert'],
  ['200+ Visa Approvals', 'Global Mobility Expert', 'Multilingual Counsel'],
];

function ProgressRing({ duration, active }: { duration: number; active: boolean }) {
  const circumference = 2 * Math.PI * 10;

  return (
    <svg className="w-6 h-6 -rotate-90" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" className="text-surface-200" />
      <motion.circle
        cx="12" cy="12" r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-accent-500"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={active ? { strokeDashoffset: 0 } : { strokeDashoffset: circumference }}
        transition={{ duration, ease: 'linear', repeat: active ? Infinity : 0 }}
        strokeLinecap="round"
      />
    </svg>
  );
}

interface MainProfileProps {
  lawyer: Lawyer;
  index: number;
}

function MainProfile({ lawyer, index }: MainProfileProps) {
  const Icon = Scale;
  const role = roles[index % roles.length];
  const rate = successRates[index % successRates.length];
  const achievementsList = achievements[index % achievements.length];
  const areaTitles = lawyer.practiceAreas
    .map((slug) => practiceAreasList.find((a) => a.slug === slug)?.title || slug)
    .slice(0, 3);

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
      {/* Left: Portrait */}
      <motion.div
        initial={{ opacity: 0, x: -40, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 40, scale: 0.95 }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        className="lg:w-[42%] shrink-0"
      >
        <div className="relative group">
          <motion.div
            className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-surface-100 shadow-soft group-hover:shadow-elevated transition-shadow duration-500"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img
              src={lawyer.avatar}
              alt={lawyer.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-5 h-5 text-accent-500 drop-shadow" />
                <span className="text-white text-xs font-medium drop-shadow">Verified Attorney</span>
              </div>
            </div>
          </motion.div>
          <div className="absolute -bottom-3 -right-3 w-16 h-16 rounded-2xl bg-accent-500 flex flex-col items-center justify-center text-white shadow-lg">
            <span className="text-lg font-bold leading-none">{rate}%</span>
            <span className="text-2xs font-medium opacity-90">Success</span>
          </div>
        </div>
      </motion.div>

      {/* Right: Details */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
        className="flex-1 min-w-0"
      >
        <div className="flex items-start gap-3 mb-1">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-primary-500">{lawyer.name}</h3>
            <p className="text-accent-600 font-medium text-sm">{role}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-3 mb-5">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, r) => (
              <Star key={r} className={cn('w-4 h-4', r < Math.floor(lawyer.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-surface-300')} />
            ))}
          </div>
          <span className="text-sm text-surface-500">{lawyer.rating} ({lawyer.reviewCount} reviews)</span>
        </div>

        <p className="text-sm text-surface-600 leading-relaxed mb-6">{lawyer.bio}</p>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <InfoItem icon={Award} label="Experience" value={`${lawyer.experience}+ years`} />
          <InfoItem icon={BookOpen} label="Practice Areas" value={areaTitles.join(', ')} />
          <InfoItem icon={GraduationCap} label="Education" value={lawyer.education[0]} />
          <InfoItem icon={Globe} label="Languages" value={lawyer.languages.join(', ')} />
        </div>

        {/* Achievements */}
        <div className="mb-6">
          <span className="text-xs font-semibold text-surface-600 uppercase tracking-wider mb-2 block">Key Achievements</span>
          <div className="flex flex-wrap gap-2">
            {achievementsList.map((a) => (
              <span key={a} className="px-3 py-1.5 bg-accent-50 text-accent-700 text-xs rounded-lg font-medium">{a}</span>
            ))}
          </div>
        </div>

        {/* Court & Fee */}
        <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-surface-50 rounded-xl">
          <div className="flex items-center gap-2 text-sm text-surface-600">
            <Scale className="w-4 h-4 text-accent-500" />
            {lawyer.courtMemberships[0]}
          </div>
          <div className="w-px h-6 bg-surface-200" />
          <div className="flex items-center gap-2 text-sm text-surface-600">
            <TrendingUp className="w-4 h-4 text-accent-500" />
            Fee: <span className="font-bold text-accent-600">₹{lawyer.consultationFee}</span>
          </div>
          <div className="w-px h-6 bg-surface-200" />
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, r) => (
              <Star key={r} className={cn('w-3 h-3', r < Math.floor(lawyer.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-surface-300')} />
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3">
          <Link href="/booking">
            <motion.button
              className="px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-xl shadow-lg shadow-accent-500/30 inline-flex items-center gap-2 transition-all"
              whileHover={{ scale: 1.03, boxShadow: '0 12px 40px rgba(194,151,77,0.4)' }}
              whileTap={{ scale: 0.97 }}
            >
              <Calendar className="w-5 h-5" /> Book Consultation
            </motion.button>
          </Link>
          <Link href={`tel:+9118001234567`}>
            <motion.button
              className="px-6 py-3 bg-white text-primary-500 font-semibold rounded-xl border border-surface-200 hover:border-primary-300 hover:bg-primary-50 transition-all inline-flex items-center gap-2 shadow-soft"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone className="w-5 h-5" /> Call
            </motion.button>
          </Link>
          <Link href={`mailto:contact@legacylegal.in`}>
            <motion.button
              className="px-6 py-3 bg-white text-primary-500 font-semibold rounded-xl border border-surface-200 hover:border-primary-300 hover:bg-primary-50 transition-all inline-flex items-center gap-2 shadow-soft"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Mail className="w-5 h-5" /> Email
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-primary-500" />
      </div>
      <div className="min-w-0">
        <span className="text-2xs text-surface-400 uppercase tracking-wider font-medium">{label}</span>
        <p className="text-sm font-medium text-primary-500">{value}</p>
      </div>
    </div>
  );
}

export default function LawyerProfileShowcase({ items }: { items: Lawyer[] }) {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const goNext = useCallback(() => {
    setActive((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const goTo = useCallback((i: number) => {
    setActive(i);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(goNext, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPaused, goNext]);

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-accent-500 font-medium text-sm uppercase tracking-[0.25em]">Our Team</span>
          <h2 className="section-title mt-4 mb-4">Meet the Minds Behind Every Victory</h2>
          <p className="section-subtitle mx-auto max-w-xl">
            Highly qualified attorneys with decades of combined experience across diverse practice areas, committed to protecting your interests.
          </p>
        </motion.div>

        <div
          ref={containerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main profile area */}
          <div className="relative mb-10">
            <AnimatePresence mode="wait">
              <MainProfile key={items[active].id} lawyer={items[active]} index={active} />
            </AnimatePresence>
          </div>

          {/* Thumbnail strip */}
          <div className="relative">
            <div className="flex items-center justify-center gap-3 md:gap-4">
              {items.map((lawyer, i) => (
                <motion.button
                  key={lawyer.id}
                  onClick={() => goTo(i)}
                  className="relative group outline-none"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={cn(
                    'relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 transition-all duration-400',
                    i === active
                      ? 'border-accent-500 shadow-lg shadow-accent-500/20 scale-110'
                      : 'border-surface-200 hover:border-accent-300'
                  )}>
                    <img src={lawyer.avatar} alt={lawyer.name} className="w-full h-full object-cover" />
                    <div className={cn(
                      'absolute inset-0 transition-opacity duration-300',
                      i === active ? 'opacity-0' : 'opacity-0 group-hover:opacity-0'
                    )} />
                  </div>
                  {/* Active indicator ring */}
                  {i === active && (
                    <motion.div
                      layoutId="active-ring"
                      className="absolute -inset-1.5 rounded-full border-2 border-accent-500/30"
                      transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                    />
                  )}
                  {/* Progress indicator on active */}
                  {i === active && (
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                      <ProgressRing duration={5} active={!isPaused} />
                    </div>
                  )}
                  {/* Name tooltip */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-primary-500 text-white text-2xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none shadow-md">
                    {lawyer.name.split(' ').slice(1).join(' ')}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary-500 rotate-45" />
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Nav arrows */}
            <button
              onClick={() => setActive((prev) => (prev - 1 + items.length) % items.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-soft border border-surface-200 flex items-center justify-center text-surface-500 hover:text-primary-500 hover:border-primary-200 transition-all -ml-4"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-soft border border-surface-200 flex items-center justify-center text-surface-500 hover:text-primary-500 hover:border-primary-200 transition-all -mr-4"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
