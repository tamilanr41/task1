'use client';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, DollarSign } from 'lucide-react';
import { Button, Card, CardContent, Badge } from '@/components/ui';
import AnimatedSection from '@/lib/animation/AnimatedSection';

const openings = [
  { title: 'Senior Corporate Lawyer', type: 'Full-time', dept: 'Corporate Law', location: 'Bengaluru', exp: '8-12 yrs' },
  { title: 'Criminal Defense Attorney', type: 'Full-time', dept: 'Criminal Law', location: 'Mumbai', exp: '5-10 yrs' },
  { title: 'Family Law Associate', type: 'Full-time', dept: 'Family Law', location: 'Bengaluru', exp: '3-6 yrs' },
  { title: 'Legal Researcher', type: 'Contract', dept: 'Research', location: 'Remote', exp: '2-4 yrs' },
  { title: 'Paralegal', type: 'Full-time', dept: 'Litigation', location: 'Delhi', exp: '2-5 yrs' },
  { title: 'IP Law Specialist', type: 'Full-time', dept: 'IP', location: 'Bengaluru', exp: '5-8 yrs' },
];

export default function CareersPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-primary py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920')] bg-cover bg-center opacity-[0.07]" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/40 to-primary-500/70" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <span className="mb-4 inline-block rounded-full bg-accent-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-400">Join Our Team</span>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <h1 className="font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">Careers at Legacy Legal</h1>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">Build your career at one of India's premier law firms.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-10 text-center">
            <h2 className="font-serif text-3xl font-bold text-primary-500">Open Positions</h2>
            <p className="mt-2 text-surface-500">Current opportunities at Legacy Legal Partners</p>
          </AnimatedSection>
          <div className="grid gap-4 md:grid-cols-2">
            {openings.map((job, i) => (
              <motion.div key={job.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}>
                <Card variant="interactive" padding="md">
                  <CardContent>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-surface-900">{job.title}</h3>
                        <p className="text-sm text-surface-500">{job.dept}</p>
                      </div>
                      <Badge variant="primary" size="sm">{job.type}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs text-surface-500">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                      <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{job.exp}</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-surface-100">
                      <Button variant="outline" size="sm">Apply Now</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
