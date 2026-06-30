'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  CheckCircle, Clock, FileText, Calendar, DollarSign,
  ChevronRight, ArrowRight, Shield,
} from 'lucide-react';
import {
  Button, Card, CardContent, Badge, Alert, Accordion,
} from '@/components/ui';
import { practiceAreasList, practiceAreaDetails, blogPosts } from '@/lib/data';
import AnimatedSection from '@/lib/animation/AnimatedSection';
import { staggerContainer, fadeUp } from '@/lib/animation/variants';
import { motion } from 'framer-motion';

export default function PracticeAreaDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const area = practiceAreasList.find((a) => a.slug === slug);
  const details = slug ? practiceAreaDetails[slug] : undefined;

  const relatedArticles = useMemo(() => {
    if (!area) return [];
    return blogPosts
      .filter(
        (p) =>
          p.tags.some((t) => area.title.toLowerCase().includes(t.toLowerCase())) ||
          area.title.toLowerCase().includes(p.category.toLowerCase())
      )
      .slice(0, 3);
  }, [area]);

  if (!area || !details) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <Shield className="mx-auto h-16 w-16 text-surface-300" />
          <h1 className="mt-4 font-serif text-2xl font-bold text-surface-900">
            Practice Area Not Found
          </h1>
          <p className="mt-2 text-surface-500">
            The page you are looking for does not exist.
          </p>
          <Link href="/practice-areas">
            <Button variant="primary" className="mt-6">
              View All Practice Areas
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const processSteps = [
    { step: '01', title: 'Initial Consultation', desc: 'Discuss your case with our expert attorneys.' },
    { step: '02', title: 'Case Assessment', desc: 'We analyze facts, documents, and legal standing.' },
    { step: '03', title: 'Strategy Planning', desc: 'Develop a tailored legal strategy for your situation.' },
    { step: '04', title: 'Execution', desc: 'Diligent representation through every legal stage.' },
    { step: '05', title: 'Resolution', desc: 'Achieve the best possible outcome for your case.' },
  ];

  const areaFaqs = [
    { q: `What does ${area.title} cover?`, a: `Our ${area.title} practice handles a comprehensive range of matters under this domain. We bring deep expertise and proven results.` },
    { q: `How much does ${area.title} cost?`, a: `Pricing varies by complexity. For detailed pricing, ${details.pricing}` },
    { q: `How long does a typical ${area.title.toLowerCase()} case take?`, a: details.timeline },
    { q: `What documents do I need for ${area.title.toLowerCase()}?`, a: `Typically, you will need ${details.requiredDocuments.slice(0, 3).join(', ')}, among others relevant to your matter.` },
  ];

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-primary py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920')] bg-cover bg-center opacity-[0.07]" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/30 to-primary-500/80" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection variant="fadeUp">
            <Link
              href="/practice-areas"
              className="mb-6 inline-flex items-center gap-1 text-sm text-white/70 transition-colors hover:text-white"
            >
              <ChevronRight className="h-3 w-3 rotate-180" />
              Back to Practice Areas
            </Link>
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h1 className="font-serif text-4xl font-bold text-white md:text-5xl">
                  {area.title}
                </h1>
                <p className="mt-4 text-lg leading-relaxed text-white/80">
                  {area.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/booking">
                    <Button size="lg" variant="secondary">
                      Book a Consultation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={`tel:${process.env.NEXT_PUBLIC_PHONE || '+9118001234567'}`}>
                    <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      Call Us
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Services', value: details.services.length },
                      { label: 'Avg. Timeline', value: details.timeline.split('.')[0] },
                      { label: 'Success Rate', value: '98%' },
                      { label: 'Expert Lawyers', value: '10+' },
                    ].map((stat) => (
                      <div key={stat.label} className="rounded-xl bg-white/10 p-4 text-center">
                        <div className="text-2xl font-bold text-accent-400">{stat.value}</div>
                        <div className="mt-1 text-xs text-white/60">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="-mt-8 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="space-y-12 lg:col-span-2">
              <AnimatedSection variant="fadeUp">
                <div>
                  <h2 className="mb-6 font-serif text-2xl font-bold text-primary-500">
                    Our Services
                  </h2>
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid gap-3 sm:grid-cols-2"
                  >
                    {details.services.map((s: string) => (
                      <motion.div
                        key={s}
                        variants={fadeUp}
                        className="flex items-start gap-3 rounded-xl bg-surface-50 p-4 transition-colors hover:bg-primary-50"
                      >
                        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-success-500" />
                        <span className="text-sm font-medium text-surface-700">{s}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </AnimatedSection>

              <AnimatedSection variant="fadeUp">
                <div>
                  <h2 className="mb-6 font-serif text-2xl font-bold text-primary-500">
                    Our Process
                  </h2>
                  <div className="relative">
                    <div className="absolute left-6 top-0 h-full w-0.5 bg-surface-200" />
                    <div className="space-y-8">
                      {processSteps.map((step, i) => (
                        <motion.div
                          key={step.step}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1, duration: 0.5 }}
                          className="relative flex gap-6"
                        >
                          <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-500 text-sm font-bold text-white shadow-lg shadow-accent-500/20">
                            {step.step}
                          </div>
                          <div className="pt-2">
                            <h4 className="font-semibold text-surface-900">{step.title}</h4>
                            <p className="mt-1 text-sm text-surface-500">{step.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection variant="fadeUp">
                <div>
                  <h2 className="mb-6 font-serif text-2xl font-bold text-primary-500">
                    Required Documents
                  </h2>
                  <Card variant="bordered" padding="md">
                    <CardContent>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {details.requiredDocuments.map((d: string) => (
                          <div
                            key={d}
                            className="flex items-center gap-3 rounded-lg bg-surface-50 p-3"
                          >
                            <FileText className="h-5 w-5 shrink-0 text-primary-500" />
                            <span className="text-sm text-surface-700">{d}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </AnimatedSection>

              <AnimatedSection variant="fadeUp">
                <div>
                  <h2 className="mb-6 font-serif text-2xl font-bold text-primary-500">
                    Frequently Asked Questions
                  </h2>
                  <Accordion
                    items={areaFaqs.map((faq, i) => ({
                      id: `faq-${i}`,
                      title: faq.q,
                      content: <p>{faq.a}</p>,
                    }))}
                  />
                </div>
              </AnimatedSection>

              {relatedArticles.length > 0 && (
                <AnimatedSection variant="fadeUp">
                  <div>
                    <h2 className="mb-6 font-serif text-2xl font-bold text-primary-500">
                      Related Articles
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {relatedArticles.map((article) => (
                        <Link key={article.slug} href="/blog" className="group block">
                          <Card variant="interactive" padding="md">
                            <CardContent>
                              <Badge variant="accent" size="sm">
                                {article.category}
                              </Badge>
                              <h3 className="mt-2 font-semibold text-surface-900 transition-colors group-hover:text-primary-500">
                                {article.title}
                              </h3>
                              <p className="mt-1 text-xs text-surface-500">
                                {article.views.toLocaleString()} views
                              </p>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              )}
            </div>

            <div>
              <div className="sticky top-28 space-y-6">
                <AnimatedSection variant="slideRight">
                  <Card variant="elevated" padding="lg">
                    <CardContent className="space-y-5">
                      <div>
                        <div className="mb-1 flex items-center gap-2 text-accent-500">
                          <DollarSign className="h-5 w-5" />
                          <span className="font-semibold">Pricing</span>
                        </div>
                        <p className="text-sm leading-relaxed text-surface-600">
                          {details.pricing}
                        </p>
                      </div>
                      <div className="h-px bg-surface-100" />
                      <div>
                        <div className="mb-1 flex items-center gap-2 text-primary-500">
                          <Clock className="h-5 w-5" />
                          <span className="font-semibold">Timeline</span>
                        </div>
                        <p className="text-sm leading-relaxed text-surface-600">
                          {details.timeline}
                        </p>
                      </div>
                      <div className="h-px bg-surface-100" />
                      <div>
                        <div className="mb-1 flex items-center gap-2 text-primary-500">
                          <FileText className="h-5 w-5" />
                          <span className="font-semibold">Documents Needed</span>
                        </div>
                        <p className="text-sm text-surface-600">
                          {details.requiredDocuments.length} documents required
                        </p>
                      </div>
                      <div className="h-px bg-surface-100" />
                      <Link href="/booking">
                        <Button className="w-full" size="lg">
                          <Calendar className="mr-2 h-4 w-4" />
                          Book Consultation
                        </Button>
                      </Link>
                      <Link href={`tel:${process.env.NEXT_PUBLIC_PHONE || '+9118001234567'}`}>
                        <Button variant="outline" className="w-full">
                          Call 1800-123-4567
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </AnimatedSection>

                <AnimatedSection variant="slideRight" delay={100}>
                  <Alert
                    variant="info"
                    title="Need urgent help?"
                    message="Our team is available 24/7 for emergency legal assistance."
                    icon={<Calendar className="h-5 w-5" />}
                    action={
                      <Link href="tel:+919999888777">
                        <Button size="sm" variant="primary">
                          Call Emergency Hotline
                        </Button>
                      </Link>
                    }
                  />
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
