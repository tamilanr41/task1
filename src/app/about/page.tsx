'use client';
import { motion } from 'framer-motion';
import { Scale, Award, Users, TrendingUp, Shield, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui';
import AnimatedSection from '@/lib/animation/AnimatedSection';

const stats = [
  { value: '15+', label: 'Years of Excellence', icon: Award },
  { value: '500+', label: 'Cases Won', icon: TrendingUp },
  { value: '25+', label: 'Expert Lawyers', icon: Users },
  { value: '10K+', label: 'Clients Served', icon: Shield },
];

const values = [
  { title: 'Integrity', desc: 'Uncompromising ethical standards in every case we handle.' },
  { title: 'Excellence', desc: 'Top-tier legal expertise with a track record of success.' },
  { title: 'Client First', desc: 'Your interests are our priority, always.' },
  { title: 'Innovation', desc: 'Leveraging technology for better legal outcomes.' },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-primary py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920')] bg-cover bg-center opacity-[0.07]" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/40 to-primary-500/70" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <span className="mb-4 inline-block rounded-full bg-accent-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-400">Our Story</span>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <h1 className="font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">About Legacy Legal Partners</h1>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">Premier law firm committed to justice, excellence, and client success since 2010.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} className="text-center">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50">
                  <s.icon className="h-7 w-7 text-primary-500" />
                </div>
                <p className="text-3xl font-bold text-primary-500">{s.value}</p>
                <p className="text-sm text-surface-500">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <h2 className="font-serif text-3xl font-bold text-primary-500">Our Values</h2>
            <p className="mt-2 text-surface-500">The principles that guide everything we do</p>
          </AnimatedSection>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 100}>
                <Card variant="interactive" padding="lg" className="h-full text-center">
                  <CardContent>
                    <h3 className="mb-2 font-serif text-lg font-bold text-primary-500">{v.title}</h3>
                    <p className="text-sm text-surface-500">{v.desc}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <Scale className="mx-auto mb-4 h-12 w-12 text-accent-500" />
            <h2 className="font-serif text-3xl font-bold text-primary-500">Committed to Justice</h2>
            <p className="mt-4 text-surface-600 leading-relaxed">
              At Legacy Legal Partners, we believe every client deserves exceptional legal representation. Our team of experienced attorneys brings decades of combined expertise across multiple practice areas, ensuring you receive the highest quality legal services tailored to your unique needs.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
