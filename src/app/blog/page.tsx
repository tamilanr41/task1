'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, TrendingUp, Clock, ArrowRight, Search } from 'lucide-react';
import {
  Card, CardContent, Badge, Pagination, EmptyState,
} from '@/components/ui';
import { blogPosts } from '@/lib/data';
import AnimatedSection from '@/lib/animation/AnimatedSection';
import { staggerContainer, fadeUp } from '@/lib/animation/variants';

const ITEMS_PER_PAGE = 6;

const categories = [
  { id: 'all', label: 'All Articles' },
  { id: 'Family Law', label: 'Family Law' },
  { id: 'Intellectual Property', label: 'IP Law' },
  { id: 'Tax Law', label: 'Tax Law' },
  { id: 'Criminal Law', label: 'Criminal' },
  { id: 'Startup Legal', label: 'Startup' },
  { id: 'Consumer Law', label: 'Consumer' },
];

export default function BlogPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = blogPosts.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === 'all' || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
    return result;
  }, [search, activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    setPage(1);
  };

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-primary py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504711434969-e33886168d2c?w=1920')] bg-cover bg-center opacity-[0.07]" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/40 to-primary-500/70" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <motion.span className="mb-4 inline-block rounded-full bg-accent-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-400">
              Knowledge Base
            </motion.span>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <h1 className="font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Legal Blog & Insights
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              Expert legal articles, guides, and insights from our attorneys to keep you informed.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection variant="fadeUp" delay={300}>
            <div className="mb-8 rounded-2xl bg-white p-4 shadow-elevated">
              <div className="mb-4 flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
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
                  placeholder="Search articles..."
                  className="w-full rounded-xl border border-surface-200 bg-white py-2.5 pl-10 pr-4 text-sm text-surface-900 placeholder:text-surface-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                />
              </div>
            </div>
          </AnimatedSection>

          <AnimatePresence mode="popLayout">
            {paginated.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <EmptyState
                  icon={<TrendingUp className="h-10 w-10" />}
                  title="No articles found"
                  description="Try adjusting your search or category filter."
                />
              </motion.div>
            ) : (
              <motion.div
                key={activeCategory + search + page}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                layout
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {paginated.map((post) => (
                  <motion.div key={post.slug} variants={fadeUp}>
                    <Card variant="interactive" padding="none" className="group h-full overflow-hidden">
                      <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-br from-primary-100 to-primary-50">
                        <TrendingUp className="h-16 w-16 text-primary-200 transition-all duration-500 group-hover:scale-110 group-hover:text-primary-300" />
                        <Badge
                          variant="accent"
                          size="md"
                          className="absolute left-4 top-4 shadow-lg"
                        >
                          {post.category}
                        </Badge>
                      </div>
                      <CardContent className="p-5">
                        <h3 className="mb-2 font-serif text-lg font-bold text-surface-900 transition-colors group-hover:text-primary-500 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="mb-4 text-sm leading-relaxed text-surface-500 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between border-t border-surface-100 pt-4">
                          <div className="flex items-center gap-2 text-xs text-surface-400">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-surface-400">
                            <TrendingUp className="h-3.5 w-3.5" />
                            <span>{post.views.toLocaleString()} views</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {totalPages > 1 && (
            <AnimatedSection variant="fadeUp" className="mt-10">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </AnimatedSection>
          )}
        </div>
      </section>
    </div>
  );
}
