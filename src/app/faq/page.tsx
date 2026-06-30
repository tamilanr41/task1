'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, HelpCircle, MessageCircle, ChevronRight } from 'lucide-react';
import { Accordion, Button, EmptyState } from '@/components/ui';
import { faqs, siteConfig } from '@/lib/data';
import AnimatedSection from '@/lib/animation/AnimatedSection';
import { staggerContainer, fadeUp } from '@/lib/animation/variants';

const categoryTabs = [
  { id: 'all', label: 'All Questions' },
  { id: 'general', label: 'General' },
  { id: 'corporate-law', label: 'Corporate' },
  { id: 'divorce', label: 'Divorce' },
];

export default function FAQPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const allItems = useMemo(
    () => faqs.flatMap((f) => f.items.map((i) => ({ ...i, category: f.category }))),
    []
  );

  const filtered = useMemo(() => {
    return allItems.filter((item) => {
      const matchesSearch =
        item.q.toLowerCase().includes(search.toLowerCase()) ||
        item.a.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory, allItems]);

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-primary py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/40 to-primary-500/70" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <motion.span className="mb-4 inline-block rounded-full bg-accent-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-400">
              Help Center
            </motion.span>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <h1 className="font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Frequently Asked Questions
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              Find answers to common legal questions. Can&apos;t find what you&apos;re looking for?
              Reach out to our team.
            </p>
          </AnimatedSection>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="-mt-8 pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection variant="fadeUp" delay={300}>
            <div className="mb-8 rounded-2xl bg-white p-4 shadow-elevated">
              <div className="mb-4 flex flex-wrap gap-2">
                {categoryTabs.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                      activeCategory === cat.id
                        ? 'bg-primary-500 text-white shadow-md'
                        : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search FAQs..."
                  className="w-full rounded-xl border border-surface-200 bg-white py-2.5 pl-10 pr-4 text-sm text-surface-900 placeholder:text-surface-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                />
              </div>
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
                  icon={<HelpCircle className="h-10 w-10" />}
                  title="No matching questions"
                  description="Try different keywords or browse by category."
                />
              </motion.div>
            ) : (
              <motion.div
                key={activeCategory + search}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <Accordion
                  items={filtered.map((item, i) => ({
                    id: `faq-${i}`,
                    title: item.q,
                    icon: <HelpCircle className="h-4 w-4" />,
                    content: (
                      <div className="space-y-3">
                        <p className="text-surface-600 leading-relaxed">{item.a}</p>
                        <Link href="/contact">
                          <Button size="sm" variant="outline">
                            Need more details? Contact us
                          </Button>
                        </Link>
                      </div>
                    ),
                  }))}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatedSection variant="fadeUp" className="mt-12">
            <div className="rounded-2xl bg-gradient-primary p-8 text-center shadow-elevated sm:p-12">
              <MessageCircle className="mx-auto h-12 w-12 text-accent-400" />
              <h2 className="mt-4 font-serif text-2xl font-bold text-white">
                Still Have Questions?
              </h2>
              <p className="mx-auto mt-2 max-w-md text-white/70">
                Our legal team is ready to help. Reach out for personalized assistance
                with your specific legal matter.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <Button variant="secondary" size="lg">
                    Contact Us
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <a href={`tel:${siteConfig.phone}`}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    Call {siteConfig.phone}
                  </Button>
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
