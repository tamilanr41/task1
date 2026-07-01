'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { Star, Quote, BadgeCheck, Clock, TrendingUp } from 'lucide-react';

interface Testimonial {
  id: string; name: string; role: string; content: string; rating: number;
}

const enrich = [
  { company: 'TechStart Pvt Ltd', caseType: 'Corporate Acquisition', timeline: '3 months', result: '₹50Cr Deal Closed', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop' },
  { company: 'Self', caseType: 'Property Dispute', timeline: '6 months', result: 'Title Restored', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop' },
  { company: 'Singh Enterprises', caseType: 'Divorce Mediation', timeline: '2 months', result: 'Settlement Reached', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop' },
  { company: 'Reddy Tech Labs', caseType: 'Startup Funding', timeline: '4 months', result: '₹8Cr Raised', photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop' },
  { company: 'Joshi Clinic', caseType: 'Malpractice Defense', timeline: '8 months', result: 'Case Dismissed', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop' },
  { company: 'Nair Associates', caseType: 'Corporate Compliance', timeline: 'Ongoing', result: 'Fully Compliant', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop' },
];

export default function TestimonialSlider({ items }: { items: Testimonial[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const allItems = [...items, ...items, ...items, ...items];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    tweenRef.current = gsap.to(el, {
      x: '-50%',
      duration: 90,
      ease: 'none',
      repeat: -1,
    });

    return () => { if (tweenRef.current) tweenRef.current.kill(); };
  }, []);

  useEffect(() => {
    if (!tweenRef.current) return;
    isPaused ? tweenRef.current.pause() : tweenRef.current.resume();
  }, [isPaused]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute inset-y-0 left-0 w-20 sm:w-40 bg-gradient-to-r from-surface-50 via-surface-50/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 sm:w-40 bg-gradient-to-l from-surface-50 via-surface-50/80 to-transparent z-10 pointer-events-none" />

      <div
        ref={trackRef}
        className="flex gap-6 py-4"
        style={{ width: 'max-content', willChange: 'transform' }}
      >
        {allItems.map((t, idx) => {
          const meta = enrich[idx % items.length];
          return (
            <motion.div
              key={`${t.id}-${idx}`}
              className="group relative w-[85vw] sm:w-[380px] lg:w-[420px] bg-white rounded-2xl border border-surface-200/80 p-6 shrink-0 shadow-soft hover:shadow-elevated transition-all duration-500"
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
            >
              <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-accent-50 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Quote className="w-5 h-5 text-accent-500" />
                </motion.div>
              </div>

              <div className="flex items-center gap-4 mb-5">
                <div className="relative shrink-0">
                  <img src={meta.photo} alt={t.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-accent-500/20 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-accent-500 flex items-center justify-center ring-2 ring-white">
                    <BadgeCheck className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-semibold text-primary-500 truncate">{t.name}</h4>
                  <p className="text-xs text-surface-400 truncate">{meta.company}</p>
                </div>
                <div className="flex gap-0.5 shrink-0">
                  {Array.from({ length: t.rating }).map((_, r) => (
                    <Star key={r} size={14} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                <span className="px-2.5 py-1 bg-accent-50 text-accent-700 text-xs font-medium rounded-full">
                  {meta.caseType}
                </span>
                <span className="px-2.5 py-1 bg-surface-50 text-surface-500 text-xs font-medium rounded-full flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {meta.timeline}
                </span>
              </div>

              <p className="text-sm text-surface-600 leading-relaxed mb-5 italic line-clamp-3">
                &ldquo;{t.content}&rdquo;
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-surface-100">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-success-500" />
                  <span className="text-sm font-semibold text-success-700">{meta.result}</span>
                </div>
                <span className="text-2xs text-surface-400">Verified Client</span>
              </div>

              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-surface-200 group-hover:ring-accent-500/20 transition-all duration-500 pointer-events-none" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
