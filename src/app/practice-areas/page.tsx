'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Scale, Building, Shield, Heart, Users, Home, Plane,
  Calculator, Lightbulb, Rocket, ShoppingCart, ChevronRight,
} from 'lucide-react';
import { Card, CardContent, Tabs, SearchBar, EmptyState } from '@/components/ui';
import { practiceAreasList } from '@/lib/data';
import { staggerContainer, fadeUp } from '@/lib/animation/variants';
import AnimatedSection from '@/lib/animation/AnimatedSection';

const iconMap: Record<string, React.ElementType> = {
  building: Building, shield: Shield, scale: Scale, heart: Heart,
  users: Users, home: Home, plane: Plane, calculator: Calculator,
  lightbulb: Lightbulb, rocket: Rocket, 'shopping-cart': ShoppingCart,
};

const categories = [
  { id: 'all', label: 'All Practice Areas' },
  { id: 'corporate', label: 'Corporate & Tax' },
  { id: 'litigation', label: 'Litigation' },
  { id: 'family', label: 'Family & Divorce' },
  { id: 'property', label: 'Property & Consumer' },
  { id: 'specialized', label: 'Specialized' },
];

const categoryMap: Record<string, string[]> = {
  corporate: ['corporate-law', 'tax-law', 'startup-legal'],
  litigation: ['civil-litigation', 'criminal-law'],
  family: ['family-law', 'divorce'],
  property: ['property-law', 'consumer-law'],
  specialized: ['immigration', 'intellectual-property'],
};

export default function PracticeAreasPage() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filtered = useMemo(() => {
    return practiceAreasList.filter((area) => {
      const matchesSearch =
        area.title.toLowerCase().includes(search.toLowerCase()) ||
        area.description.toLowerCase().includes(search.toLowerCase());
      const matchesTab =
        activeTab === 'all' ||
        (categoryMap[activeTab] && categoryMap[activeTab].includes(area.slug));
      return matchesSearch && matchesTab;
    });
  }, [search, activeTab]);

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-primary py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920')] bg-cover bg-center opacity-[0.07]" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/40 via-transparent to-primary-500/60" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <motion.span className="mb-4 inline-block rounded-full bg-accent-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-400">
              Our Expertise
            </motion.span>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <h1 className="font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Practice Areas
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              Comprehensive legal expertise across every major area of law, delivered by
              experienced specialists dedicated to protecting your interests.
            </p>
          </AnimatedSection>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="relative -mt-16 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection variant="fadeUp" delay={300}>
            <div className="mb-8 rounded-2xl bg-white p-4 shadow-elevated">
              <Tabs
                tabs={categories}
                activeTab={activeTab}
                onChange={setActiveTab}
                variant="pills"
                size="md"
                className="mb-4 flex-wrap"
              />
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search practice areas..."
              />
            </div>
          </AnimatedSection>

          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <EmptyState
                  icon={<Scale className="h-10 w-10" />}
                  title="No practice areas found"
                  description="Try adjusting your search or filter to find what you're looking for."
                />
              </motion.div>
            ) : (
              <motion.div
                key={activeTab + search}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filtered.map((area, i) => {
                  const Icon = iconMap[area.icon] || Scale;
                  return (
                    <motion.div key={area.slug} variants={fadeUp} custom={i}>
                      <Link href={`/practice-areas/${area.slug}`} className="group block h-full">
                        <Card variant="interactive" padding="lg" className="h-full">
                          <CardContent>
                            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50 text-primary-500 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary-500 group-hover:text-white">
                              <Icon className="h-7 w-7" />
                            </div>
                            <h3 className="mb-2 font-serif text-xl font-bold text-surface-900 transition-colors group-hover:text-primary-500">
                              {area.title}
                            </h3>
                            <p className="mb-5 text-sm leading-relaxed text-surface-500">
                              {area.description}
                            </p>
                            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-500 transition-all group-hover:gap-3">
                              Learn More
                              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </span>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
