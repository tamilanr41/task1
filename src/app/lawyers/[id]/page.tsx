'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Award, BookOpen, Globe, Calendar, Phone, Mail,
  ChevronRight, CheckCircle, Star, Clock, MessageCircle, GraduationCap,
} from 'lucide-react';
import {
  Button, Card, CardContent, Badge, Avatar, Tabs,
} from '@/components/ui';
import StarRating from '@/components/ui/stars';
import { lawyersData, practiceAreasList, siteConfig } from '@/lib/data';
import AnimatedSection from '@/lib/animation/AnimatedSection';
import { staggerContainer, fadeUp } from '@/lib/animation/variants';

const reviewData = [
  { name: 'Rahul Mehta', rating: 5, comment: 'Exceptional legal counsel. Very thorough and professional throughout the process.', date: '2026-05-15', role: 'CEO, TechStart Pvt Ltd' },
  { name: 'Anita Sharma', rating: 5, comment: 'Highly knowledgeable and responsive. Achieved the best possible outcome for my case.', date: '2026-04-20', role: 'Homeowner' },
  { name: 'Vikram Singh', rating: 4, comment: 'Great experience overall. The team was diligent and kept me informed at every step.', date: '2026-03-10', role: 'Business Owner' },
  { name: 'Sunita Reddy', rating: 5, comment: 'Professional, empathetic, and effective. I would recommend them to anyone.', date: '2026-02-18', role: 'Startup Founder' },
];

const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

export default function LawyerProfilePage() {
  const { id } = useParams<{ id: string }>();
  const lawyer = lawyersData.find((l) => l.id === id);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const stats = useMemo(() => {
    if (!lawyer) return [];
    return [
      { label: 'Years Experience', value: lawyer.experience, icon: Award },
      { label: 'Cases Won', value: `${Math.round(lawyer.reviewCount * 0.92)}+`, icon: CheckCircle },
      { label: 'Client Rating', value: lawyer.rating, icon: Star },
      { label: 'Client Satisfaction', value: '98%', icon: MessageCircle },
    ];
  }, [lawyer]);

  if (!lawyer) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <GraduationCap className="mx-auto h-16 w-16 text-surface-300" />
          <h1 className="mt-4 font-serif text-2xl font-bold text-surface-900">Lawyer Not Found</h1>
          <Link href="/lawyers">
            <Button variant="primary" className="mt-6">View All Lawyers</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-primary py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=1920')] bg-cover bg-center opacity-[0.07]" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/30 to-primary-500/80" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection variant="fadeUp">
            <Link href="/lawyers" className="mb-6 inline-flex items-center gap-1 text-sm text-white/70 transition-colors hover:text-white">
              <ChevronRight className="h-3 w-3 rotate-180" />
              Back to Lawyers
            </Link>
            <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
              <Avatar src={lawyer.avatar} name={lawyer.name} size="2xl" bordered className="shrink-0 ring-4 ring-white/20" />
              <div className="text-center md:text-left">
                <h1 className="font-serif text-3xl font-bold text-white md:text-4xl">{lawyer.name}</h1>
                <p className="mt-1 text-lg text-accent-400">{lawyer.experience} Years of Experience</p>
                <div className="mt-2 flex items-center justify-center gap-2 md:justify-start">
                  <StarRating rating={lawyer.rating} size={16} />
                  <span className="text-sm text-white/70">({lawyer.reviewCount} reviews)</span>
                </div>
                <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
                  {lawyer.practiceAreas.map((pa) => {
                    const a = practiceAreasList.find((p) => p.slug === pa);
                    return a ? (
                      <Badge key={pa} variant="accent" size="md">
                        {a.title}
                      </Badge>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="-mt-8 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              <AnimatedSection variant="fadeUp">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {stats.map((stat) => (
                    <Card key={stat.label} variant="bordered" padding="md" className="text-center">
                      <CardContent>
                        <stat.icon className="mx-auto h-6 w-6 text-accent-500" />
                        <div className="mt-2 text-2xl font-bold text-primary-500">
                          {typeof stat.value === 'number' ? stat.value.toFixed(1) : stat.value}
                        </div>
                        <div className="mt-0.5 text-xs text-surface-500">{stat.label}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection variant="fadeUp">
                <Card variant="elevated" padding="lg">
                  <CardContent>
                    <h2 className="mb-3 font-serif text-xl font-bold text-primary-500">About</h2>
                    <p className="leading-relaxed text-surface-600">{lawyer.bio}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <div className="grid gap-6 sm:grid-cols-2">
                <AnimatedSection variant="slideLeft">
                  <Card variant="interactive" padding="lg" className="h-full">
                    <CardContent>
                      <div className="mb-4 flex items-center gap-2 text-accent-500">
                        <GraduationCap className="h-5 w-5" />
                        <h3 className="font-semibold text-surface-900">Education</h3>
                      </div>
                      <div className="space-y-3">
                        {lawyer.education.map((e: string, i: number) => (
                          <div key={i} className="flex items-start gap-2">
                            <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent-500" />
                            <span className="text-sm text-surface-600">{e}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
                <AnimatedSection variant="slideRight">
                  <Card variant="interactive" padding="lg" className="h-full">
                    <CardContent>
                      <div className="mb-4 flex items-center gap-2 text-accent-500">
                        <Award className="h-5 w-5" />
                        <h3 className="font-semibold text-surface-900">Certifications</h3>
                      </div>
                      <div className="space-y-3">
                        {lawyer.certifications.map((c: string, i: number) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-success-500" />
                            <span className="text-sm text-surface-600">{c}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <AnimatedSection variant="slideLeft" delay={100}>
                  <Card variant="interactive" padding="lg" className="h-full">
                    <CardContent>
                      <div className="mb-4 flex items-center gap-2 text-accent-500">
                        <Globe className="h-5 w-5" />
                        <h3 className="font-semibold text-surface-900">Court Memberships</h3>
                      </div>
                      <div className="space-y-3">
                        {lawyer.courtMemberships.map((c: string, i: number) => (
                          <div key={i} className="flex items-start gap-2">
                            <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary-500" />
                            <span className="text-sm text-surface-600">{c}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
                <AnimatedSection variant="slideRight" delay={100}>
                  <Card variant="interactive" padding="lg" className="h-full">
                    <CardContent>
                      <div className="mb-4 flex items-center gap-2 text-accent-500">
                        <MessageCircle className="h-5 w-5" />
                        <h3 className="font-semibold text-surface-900">Languages</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {lawyer.languages.map((l: string) => (
                          <Badge key={l} variant="default" size="md">
                            {l}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              </div>

              <AnimatedSection variant="fadeUp">
                <Card variant="elevated" padding="lg">
                  <CardContent>
                    <h2 className="mb-6 font-serif text-xl font-bold text-primary-500">Client Reviews</h2>
                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                      className="space-y-4"
                    >
                      {reviewData.map((r, i) => (
                        <motion.div key={i} variants={fadeUp}>
                          <Card variant="bordered" padding="md">
                            <CardContent>
                              <div className="mb-2 flex items-center justify-between">
                                <StarRating rating={r.rating} size={14} showValue={false} />
                                <span className="text-xs text-surface-400">{r.date}</span>
                              </div>
                              <p className="text-sm leading-relaxed text-surface-600">&ldquo;{r.comment}&rdquo;</p>
                              <div className="mt-3 flex items-center gap-2">
                                <Avatar name={r.name} size="sm" />
                                <div>
                                  <p className="text-sm font-medium text-surface-800">{r.name}</p>
                                  <p className="text-xs text-surface-500">{r.role}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>

            <div>
              <div className="sticky top-28 space-y-6">
                <AnimatedSection variant="slideRight">
                  <Card variant="elevated" padding="lg">
                    <CardContent className="space-y-5">
                      <div className="text-center">
                        <p className="text-sm text-surface-500">Consultation Fee</p>
                        <p className="text-3xl font-bold text-accent-500">
                          &#8377;{lawyer.consultationFee}
                        </p>
                      </div>
                      <div className="h-px bg-surface-100" />
                      <div>
                        <p className="mb-2 text-sm font-semibold text-surface-700">Availability</p>
                        {lawyer.availability.map((a: string, i: number) => (
                          <p key={i} className="flex items-center gap-2 text-sm text-surface-500">
                            <Clock className="h-3.5 w-3.5" />
                            {a}
                          </p>
                        ))}
                      </div>
                      <div className="h-px bg-surface-100" />
                      <div>
                        <p className="mb-3 text-sm font-semibold text-surface-700">Book a Time Slot</p>
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="mb-3 w-full rounded-lg border border-surface-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          {timeSlots.map((t) => (
                            <button
                              key={t}
                              onClick={() => setSelectedTime(t)}
                              className={`rounded-lg border px-2 py-1.5 text-xs font-medium transition-all ${
                                selectedTime === t
                                  ? 'border-primary-500 bg-primary-500 text-white'
                                  : 'border-surface-200 text-surface-600 hover:border-primary-300 hover:bg-primary-50'
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                      <Link
                        href={`/booking?lawyer=${lawyer.id}&date=${selectedDate}&time=${selectedTime}`}
                      >
                        <Button className="w-full" size="lg" disabled={!selectedDate || !selectedTime}>
                          <Calendar className="mr-2 h-4 w-4" />
                          Book Appointment
                        </Button>
                      </Link>
                      <div className="flex gap-3">
                        <a href={`tel:${process.env.NEXT_PUBLIC_PHONE || '+9118001234567'}`} className="flex-1">
                          <Button variant="outline" className="w-full" size="sm">
                            <Phone className="mr-1.5 h-3.5 w-3.5" />
                            Call
                          </Button>
                        </a>
                        <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL || 'contact@legacylegal.in'}`} className="flex-1">
                          <Button variant="outline" className="w-full" size="sm">
                            <Mail className="mr-1.5 h-3.5 w-3.5" />
                            Email
                          </Button>
                        </a>
                        <a
                          href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Hi, I'm interested in consulting with ${lawyer.name}. Please share more details.`)}`}
                          target="_blank"
                          className="flex-1"
                        >
                          <Button variant="primary" className="w-full" size="sm">
                            <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
                            WhatsApp
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
