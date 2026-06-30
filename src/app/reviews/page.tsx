'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, MessageSquare, X, Send } from 'lucide-react';
import {
  Button, Card, CardContent, Avatar, Modal, Input, EmptyState, Badge,
} from '@/components/ui';
import StarRating from '@/components/ui/stars';
import { testimonials } from '@/lib/data';
import AnimatedSection from '@/lib/animation/AnimatedSection';
import { staggerContainer, fadeUp } from '@/lib/animation/variants';

const ratingOptions = [
  { id: 'all', label: 'All Reviews' },
  { id: '5', label: '5 Stars' },
  { id: '4', label: '4 Stars' },
  { id: '3', label: '3 Stars' },
  { id: '2', label: '2 Stars' },
  { id: '1', label: '1 Star' },
];

export default function ReviewsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showWriteModal, setShowWriteModal] = useState(false);

  const avgRating = useMemo(
    () => testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length,
    []
  );

  const distribution = useMemo(() => {
    const counts = [0, 0, 0, 0, 0];
    testimonials.forEach((t) => {
      if (t.rating >= 1 && t.rating <= 5) counts[5 - t.rating]++;
    });
    return counts.map((count, i) => ({
      stars: 5 - i,
      count,
      percentage: (count / testimonials.length) * 100,
    }));
  }, []);

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return testimonials;
    return testimonials.filter((t) => t.rating === Number(activeFilter));
  }, [activeFilter]);

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-primary py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/40 to-primary-500/70" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <motion.span className="mb-4 inline-block rounded-full bg-accent-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-400">
              Testimonials
            </motion.span>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <h1 className="font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Client Reviews
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              See what our clients say about their experience with Legacy Legal Partners.
            </p>
          </AnimatedSection>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="-mt-8 pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection variant="fadeUp" delay={300}>
            <Card variant="elevated" padding="lg" className="mb-8">
              <CardContent>
                <div className="flex flex-col items-center gap-8 sm:flex-row">
                  <div className="text-center sm:w-48">
                    <div className="font-serif text-6xl font-bold text-primary-500">
                      {avgRating.toFixed(1)}
                    </div>
                    <StarRating rating={Math.round(avgRating)} size={20} showValue={false} />
                    <p className="mt-1 text-sm text-surface-500">
                      {testimonials.length} reviews
                    </p>
                  </div>
                  <div className="flex-1 space-y-2">
                    {distribution.map((item) => (
                      <div key={item.stars} className="flex items-center gap-3">
                        <span className="w-12 text-sm font-medium text-surface-600">
                          {item.stars} ★
                        </span>
                        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-100">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.percentage}%` }}
                            transition={{ duration: 0.8, delay: 0.3 + item.stars * 0.1 }}
                            className="h-full rounded-full bg-accent-500"
                          />
                        </div>
                        <span className="w-8 text-right text-sm text-surface-500">
                          {item.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          <AnimatedSection variant="fadeUp" delay={400}>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {ratingOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setActiveFilter(opt.id)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                      activeFilter === opt.id
                        ? 'bg-primary-500 text-white shadow-md'
                        : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <Button
                variant="primary"
                onClick={() => setShowWriteModal(true)}
                iconLeft={<MessageSquare className="h-4 w-4" />}
              >
                Write a Review
              </Button>
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
                  icon={<Star className="h-10 w-10" />}
                  title="No reviews match this filter"
                  description="Try selecting a different rating filter."
                />
              </motion.div>
            ) : (
              <motion.div
                key={activeFilter}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid gap-6 sm:grid-cols-2"
              >
                {filtered.map((t, i) => (
                  <motion.div key={t.id} variants={fadeUp}>
                    <Card variant="interactive" padding="lg" className="h-full">
                      <CardContent>
                        <div className="mb-3 flex items-start justify-between">
                          <StarRating rating={t.rating} size={14} />
                          <Quote className="h-5 w-5 text-accent-300" />
                        </div>
                        <p className="mb-4 text-sm leading-relaxed text-surface-600 italic">
                          &ldquo;{t.content}&rdquo;
                        </p>
                        <div className="flex items-center gap-3 border-t border-surface-100 pt-4">
                          <Avatar name={t.name} size="md" />
                          <div>
                            <p className="text-sm font-semibold text-surface-800">{t.name}</p>
                            <p className="text-xs text-surface-500">{t.role}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Modal
        isOpen={showWriteModal}
        onClose={() => setShowWriteModal(false)}
        title="Write a Review"
        size="md"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert('Thank you for your review! It will be published after moderation.');
            setShowWriteModal(false);
          }}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-surface-700">
              Your Rating
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      true
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-surface-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <Input label="Your Name" placeholder="Enter your full name" required />
          <Input label="Email" type="email" placeholder="your@email.com" required />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-surface-700">
              Your Review
              <span className="ml-0.5 text-danger-500">*</span>
            </label>
            <textarea
              rows={4}
              className="w-full rounded-lg border border-surface-200 bg-white px-4 py-3 text-sm text-surface-900 placeholder:text-surface-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              placeholder="Share your experience with us..."
              required
            />
          </div>
          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={() => setShowWriteModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              <Send className="mr-2 h-4 w-4" />
              Submit Review
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
