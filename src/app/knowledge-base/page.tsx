'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen, FileText, Scale, Shield, Home, Heart,
  Users, Building, Lightbulb, Clock, Search, Star,
  ArrowRight, ChevronRight, BookmarkPlus, Bookmark
} from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { SearchBar } from '@/components/ui/search-bar';
import { EmptyState } from '@/components/ui/empty-state';
import { AnimatedSection } from '@/lib/animation';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured: boolean;
  views: number;
  tags: string[];
}

interface KnowledgeCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  articleCount: number;
}

const categories: KnowledgeCategory[] = [
  { id: 'corporate', title: 'Corporate Law', description: 'Business law, compliance, M&A', icon: <Building className="w-6 h-6" />, color: 'bg-blue-50 text-blue-600 border-blue-200', articleCount: 24 },
  { id: 'criminal', title: 'Criminal Law', description: 'Defense, bail, appeals', icon: <Shield className="w-6 h-6" />, color: 'bg-red-50 text-red-600 border-red-200', articleCount: 18 },
  { id: 'civil', title: 'Civil Litigation', description: 'Disputes, contracts, property', icon: <Scale className="w-6 h-6" />, color: 'bg-purple-50 text-purple-600 border-purple-200', articleCount: 21 },
  { id: 'family', title: 'Family Law', description: 'Divorce, custody, adoption', icon: <Heart className="w-6 h-6" />, color: 'bg-rose-50 text-rose-600 border-rose-200', articleCount: 15 },
  { id: 'property', title: 'Property Law', description: 'Registration, disputes, RERA', icon: <Home className="w-6 h-6" />, color: 'bg-amber-50 text-amber-600 border-amber-200', articleCount: 19 },
  { id: 'ip', title: 'Intellectual Property', description: 'Trademarks, patents, copyright', icon: <Lightbulb className="w-6 h-6" />, color: 'bg-cyan-50 text-cyan-600 border-cyan-200', articleCount: 12 },
];

const allArticles: Article[] = [
  { id: 'a1', title: 'Complete Guide to Divorce Process in India (2026)', excerpt: 'Understanding the divorce process under Indian law. From filing to final decree.', category: 'Family Law', author: 'Adv. Priya Patel', date: '2026-05-15', readTime: '12 min', featured: true, views: 15420, tags: ['divorce', 'family law'] },
  { id: 'a2', title: 'Trademark Registration: A Step-by-Step Guide', excerpt: 'Protect your brand identity. Complete guide to trademark registration in India.', category: 'Intellectual Property', author: 'Adv. Arun Krishnan', date: '2026-05-12', readTime: '8 min', featured: true, views: 12350, tags: ['trademark', 'IP'] },
  { id: 'a3', title: 'Common GST Issues Faced by Businesses', excerpt: 'Navigating GST compliance can be challenging. Here are common issues and solutions.', category: 'Tax Law', author: 'Adv. Arun Krishnan', date: '2026-05-10', readTime: '10 min', featured: true, views: 9870, tags: ['GST', 'tax'] },
  { id: 'a4', title: 'Bail Procedures in Indian Criminal Law', excerpt: 'Understanding bail, anticipatory bail, and regular bail procedures under CrPC.', category: 'Criminal Law', author: 'Adv. Priya Patel', date: '2026-05-08', readTime: '7 min', featured: false, views: 8760, tags: ['bail', 'criminal'] },
  { id: 'a5', title: 'Essential Legal Checklist for Indian Startups', excerpt: 'From incorporation to compliance, every startup needs this legal checklist.', category: 'Corporate Law', author: 'Adv. Rajesh Sharma', date: '2026-05-05', readTime: '15 min', featured: true, views: 7650, tags: ['startup', 'compliance'] },
  { id: 'a6', title: 'Know Your Consumer Rights: A Complete Guide', excerpt: 'Consumer protection laws in India explained. What to do when you receive defective products.', category: 'Consumer Law', author: 'Adv. Vikram Desai', date: '2026-05-03', readTime: '9 min', featured: false, views: 6540, tags: ['consumer', 'rights'] },
  { id: 'a7', title: 'Property Registration Process in India', excerpt: 'Step-by-step guide to registering property and understanding stamp duty.', category: 'Property Law', author: 'Adv. Vikram Desai', date: '2026-04-28', readTime: '11 min', featured: false, views: 5430, tags: ['property', 'registration'] },
  { id: 'a8', title: 'Understanding Mutual Consent Divorce', excerpt: 'Everything you need to know about mutual consent divorce under the Hindu Marriage Act.', category: 'Family Law', author: 'Adv. Sneha Kapoor', date: '2026-04-25', readTime: '6 min', featured: false, views: 4320, tags: ['divorce', 'mutual consent'] },
];

export default function KnowledgeBasePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set(['a1', 'a5']));

  const featuredArticles = allArticles.filter(a => a.featured);
  const recentArticles = [...allArticles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  const filteredArticles = useMemo(() => {
    let articles = allArticles;
    if (activeCategory) {
      articles = articles.filter(a => a.category.toLowerCase().includes(activeCategory));
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      articles = articles.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some(t => t.includes(q))
      );
    }
    return articles;
  }, [activeCategory, searchQuery]);

  const toggleBookmark = (id: string) => {
    setBookmarked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="text-3xl font-bold text-surface-900 font-serif">Knowledge Base</h1>
            <p className="text-surface-500">Legal guides, articles, and resources for your practice</p>
            <div className="max-w-xl mx-auto">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search knowledge base..."
              />
            </div>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {categories.map((cat, idx) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              className={cn(
                'flex flex-col items-center text-center gap-3 p-5 rounded-2xl border-2 transition-all',
                activeCategory === cat.id
                  ? 'border-primary-500 bg-primary-50 shadow-soft'
                  : 'border-surface-200 bg-white hover:border-surface-300 hover:shadow-soft'
              )}
            >
              <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center border-2', cat.color)}>
                {cat.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-surface-900">{cat.title}</p>
                <p className="text-xs text-surface-500 mt-1">{cat.description}</p>
              </div>
              <Badge variant={activeCategory === cat.id ? 'primary' : 'default'} size="sm">
                {cat.articleCount} articles
              </Badge>
            </motion.button>
          ))}
        </div>

        {!searchQuery && !activeCategory && (
          <>
            <AnimatedSection>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-accent-500 fill-accent-500" />
                  <h2 className="text-xl font-semibold text-surface-900">Featured Articles</h2>
                </div>
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {featuredArticles.map((article, idx) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                  >
                    <Card variant="interactive" padding="md" className="h-full flex flex-col group">
                      <CardContent className="flex flex-col h-full">
                        <div className="flex items-start justify-between mb-3">
                          <Badge variant="accent" size="sm">{article.category}</Badge>
                          <button onClick={() => toggleBookmark(article.id)} className="text-surface-300 hover:text-accent-500 transition-colors">
                            <Bookmark className={cn('w-4 h-4', bookmarked.has(article.id) && 'fill-accent-500 text-accent-500')} />
                          </button>
                        </div>
                        <h3 className="text-base font-semibold text-surface-900 group-hover:text-primary-500 transition-colors leading-snug flex-1">
                          {article.title}
                        </h3>
                        <p className="text-sm text-surface-500 mt-2 line-clamp-2">{article.excerpt}</p>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-surface-100">
                          <div>
                            <p className="text-xs font-medium text-surface-700">{article.author}</p>
                            <p className="text-2xs text-surface-400">{article.readTime} read</p>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-surface-400">
                            <span>{formatDate(article.date, 'short')}</span>
                            <ChevronRight className="w-3 h-3" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-surface-400" />
                    <CardTitle>Recent Updates</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="divide-y divide-surface-100">
                    {recentArticles.map((article) => (
                      <div key={article.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0 group cursor-pointer">
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-surface-300 group-hover:text-primary-500 transition-colors" />
                          <div>
                            <p className="text-sm font-medium text-surface-900 group-hover:text-primary-500 transition-colors">{article.title}</p>
                            <p className="text-xs text-surface-400">{article.category} &middot; {article.author}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-surface-400">
                          <span>{formatDate(article.date, 'short')}</span>
                          <span>{article.readTime}</span>
                          <ChevronRight className="w-3 h-3" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </>
        )}

        {(searchQuery || activeCategory) && (
          <AnimatedSection>
            {filteredArticles.length === 0 ? (
              <EmptyState
                icon={<BookOpen className="w-10 h-10" />}
                title="No articles found"
                description={searchQuery ? 'Try a different search term' : 'No articles in this category'}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredArticles.map((article, idx) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Card variant="interactive" padding="md" className="h-full group">
                      <CardContent className="flex flex-col h-full">
                        <div className="flex items-start justify-between mb-3">
                          <Badge variant="primary" size="sm">{article.category}</Badge>
                          <button onClick={() => toggleBookmark(article.id)} className="text-surface-300 hover:text-accent-500 transition-colors">
                            <Bookmark className={cn('w-4 h-4', bookmarked.has(article.id) && 'fill-accent-500 text-accent-500')} />
                          </button>
                        </div>
                        <h3 className="text-base font-semibold text-surface-900 group-hover:text-primary-500 transition-colors leading-snug flex-1">
                          {article.title}
                        </h3>
                        <p className="text-sm text-surface-500 mt-2 line-clamp-2">{article.excerpt}</p>
                        <div className="flex items-center gap-3 mt-3 flex-wrap">
                          {article.tags.map(tag => (
                            <Badge key={tag} variant="default" size="sm">{tag}</Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-surface-100 text-xs text-surface-400">
                          <span>{formatDate(article.date, 'short')}</span>
                          <span>{article.readTime}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatedSection>
        )}
      </div>
    </div>
  );
}
