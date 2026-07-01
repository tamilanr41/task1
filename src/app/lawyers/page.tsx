'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Star, ArrowUpDown, MessageCircle } from 'lucide-react';
import {
  Button, Card, CardContent, Avatar, Badge, Input, EmptyState,
} from '@/components/ui';
import StarRating from '@/components/ui/stars';
import { lawyersData, practiceAreasList, siteConfig } from '@/lib/data';
import AnimatedSection from '@/lib/animation/AnimatedSection';
import { staggerContainer, fadeUp } from '@/lib/animation/variants';

export default function LawyersPage() {
  const [search, setSearch] = useState('');
  const [areaFilter, setAreaFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'rating' | 'experience'>('rating');

  const filtered = useMemo(() => {
    let result = lawyersData.filter((l) => {
      const matchesSearch =
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.bio.toLowerCase().includes(search.toLowerCase());
      const matchesArea =
        areaFilter === 'all' || l.practiceAreas.includes(areaFilter);
      return matchesSearch && matchesArea;
    });

    result.sort((a, b) =>
      sortBy === 'rating' ? b.rating - a.rating : b.experience - a.experience
    );

    return result;
  }, [search, areaFilter, sortBy]);

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-primary py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=1920')] bg-cover bg-center opacity-[0.07]" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/40 to-primary-500/70" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <motion.span className="mb-4 inline-block rounded-full bg-accent-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-400">
              Our Team
            </motion.span>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <h1 className="font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Our Lawyers
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              Experienced, dedicated, and ready to fight for your rights. Meet our team of
              premier legal professionals.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection variant="fadeUp" delay={300}>
            <div className="mb-8 rounded-2xl bg-white p-4 shadow-elevated">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search lawyers by name or expertise..."
                    className="w-full rounded-xl border border-surface-200 bg-white py-2.5 pl-10 pr-4 text-sm text-surface-900 placeholder:text-surface-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  />
                </div>
                <div className="flex gap-3">
                  <select
                    value={areaFilter}
                    onChange={(e) => setAreaFilter(e.target.value)}
                    className="rounded-xl border border-surface-200 bg-white px-4 py-2.5 text-sm text-surface-700 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  >
                    <option value="all">All Areas</option>
                    {practiceAreasList.map((a) => (
                      <option key={a.slug} value={a.slug}>
                        {a.title}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() =>
                      setSortBy((s) => (s === 'rating' ? 'experience' : 'rating'))
                    }
                    className="inline-flex items-center gap-2 rounded-xl border border-surface-200 bg-white px-4 py-2.5 text-sm font-medium text-surface-700 transition-colors hover:bg-surface-50"
                  >
                    <ArrowUpDown className="h-4 w-4" />
                    {sortBy === 'rating' ? 'Top Rated' : 'Most Experienced'}
                  </button>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {filtered.length === 0 ? (
            <EmptyState
              icon={<Search className="h-10 w-10" />}
              title="No lawyers found"
              description="Try adjusting your search or filter criteria."
            />
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((lawyer) => (
                <motion.div key={lawyer.id} variants={fadeUp}>
                  <Card variant="interactive" padding="none" className="h-full overflow-hidden">
                    <div className="bg-gradient-primary px-6 pb-16 pt-8 text-center">
                      <Avatar
                        src={lawyer.avatar}
                        name={lawyer.name}
                        size="2xl"
                        bordered
                        className="mx-auto"
                      />
                      <h3 className="mt-4 font-serif text-xl font-bold text-white">
                        {lawyer.name}
                      </h3>
                      <p className="mt-1 text-sm text-accent-400">
                        {lawyer.experience} Years Experience
                      </p>
                      <div className="mt-2 flex items-center justify-center gap-1">
                        <StarRating rating={lawyer.rating} size={14} />
                        <span className="text-xs text-white/60">
                          ({lawyer.reviewCount})
                        </span>
                      </div>
                    </div>
                    <CardContent className="relative -mt-10 rounded-t-2xl bg-white px-6 pt-6 pb-6">
                      <div className="mb-4 flex flex-wrap gap-1.5">
                        {lawyer.practiceAreas.map((pa) => {
                          const a = practiceAreasList.find((p) => p.slug === pa);
                          return a ? (
                            <Badge key={pa} variant="primary" size="sm">
                              {a.title}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                      <p className="mb-5 text-sm leading-relaxed text-surface-600 line-clamp-2">
                        {lawyer.bio}
                      </p>
                      <div className="flex gap-2">
                        <Link href={`/lawyers/${lawyer.id}`} className="flex-1">
                          <Button variant="outline" className="w-full" size="sm">
                            View Profile
                          </Button>
                        </Link>
                        <Link href={`/booking?lawyer=${lawyer.id}`} className="flex-1">
                          <Button className="w-full" size="sm">
                            Book Now
                          </Button>
                        </Link>
                        <Link
                          href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Hi, I'm interested in consulting with ${lawyer.name}. Please share more details.`)}`}
                          target="_blank"
                          className="inline-flex items-center justify-center rounded-lg bg-green-500 px-3 text-white hover:bg-green-600 transition-colors shrink-0"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
