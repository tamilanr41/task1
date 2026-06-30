'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Scale, Users, TrendingUp } from 'lucide-react';

const stats = [
  { icon: Users, value: 25, suffix: '+', label: 'Expert Lawyers', desc: 'Across all practice areas' },
  { icon: Scale, value: 15, suffix: 'K+', label: 'Cases Won', desc: 'Proven track record' },
  { icon: Award, value: 98, suffix: '%', label: 'Client Satisfaction', desc: 'Based on 2K+ reviews' },
  { icon: TrendingUp, value: 20, suffix: '+', label: 'Years Experience', desc: 'Since 2004' },
];

function CountUp({ end, suffix = '', duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const animatedRef = useRef<HTMLSpanElement>(null);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span
        ref={animatedRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3 }}
        >
          <AnimatedNumber end={end} isInView={isInView} duration={duration} />
        </motion.span>
        {suffix}
      </motion.span>
    </span>
  );
}

function AnimatedNumber({ end, isInView, duration = 2 }: { end: number; isInView: boolean; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  if (isInView && !startedRef.current) {
    startedRef.current = true;
    const start = 0;
    const step = Math.max(1, Math.floor(end / (duration * 60)));
    let current = start;
    const interval = setInterval(() => {
      current += step;
      if (current >= end) {
        current = end;
        clearInterval(interval);
      }
      if (ref.current) ref.current.textContent = current.toLocaleString();
    }, 16);
  }

  return <span ref={ref}>0</span>;
}

export default function FloatingStats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className="relative py-16 md:py-20">
      <div className="container-page">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
            hidden: {},
          }}
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={{
                  visible: { opacity: 1, y: 0, scale: 1 },
                  hidden: { opacity: 0, y: 30, scale: 0.95 },
                }}
                transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                className="relative bg-white rounded-2xl border border-surface-200/80 p-6 shadow-soft text-center group hover:shadow-card transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-50 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-primary-500 group-hover:text-accent-600 transition-colors duration-300" />
                </div>
                <div className="text-3xl md:text-4xl font-bold font-serif text-primary-500 mb-1">
                  <CountUp end={stat.value} suffix={stat.suffix} duration={2} />
                </div>
                <p className="text-sm font-semibold text-surface-700">{stat.label}</p>
                <p className="text-xs text-surface-400 mt-1">{stat.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
