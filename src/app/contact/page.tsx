'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone, Mail, MapPin, Clock, MessageCircle,
  Send, Facebook, Twitter, Linkedin, Instagram, Youtube, AlertCircle,
} from 'lucide-react';
import { Button, Card, CardContent, Input, Alert } from '@/components/ui';
import { siteConfig } from '@/lib/data';
import AnimatedSection from '@/lib/animation/AnimatedSection';
import { staggerContainer, fadeUp } from '@/lib/animation/variants';

const offices = [
  {
    name: 'Bengaluru (HQ)',
    address: 'No. 42, Kasturba Road, MG Road, Bengaluru - 560001',
    phone: '+91 80 4567 8900',
    email: 'bangalore@legacylegal.in',
    hours: 'Mon-Fri 9AM-7PM',
  },
  {
    name: 'Mumbai Office',
    address: '7th Floor, Maker Tower, Nariman Point, Mumbai - 400021',
    phone: '+91 22 6789 0123',
    email: 'mumbai@legacylegal.in',
    hours: 'Mon-Fri 9:30AM-6:30PM',
  },
  {
    name: 'Delhi Office',
    address: 'K-17, Connaught Place, New Delhi - 110001',
    phone: '+91 11 3456 7890',
    email: 'delhi@legacylegal.in',
    hours: 'Mon-Fri 10AM-6PM',
  },
];

const socialLinks = [
  { icon: Facebook, href: siteConfig.social.facebook, label: 'Facebook' },
  { icon: Twitter, href: siteConfig.social.twitter, label: 'Twitter' },
  { icon: Linkedin, href: siteConfig.social.linkedin, label: 'LinkedIn' },
  { icon: Instagram, href: siteConfig.social.instagram, label: 'Instagram' },
  { icon: Youtube, href: siteConfig.social.youtube, label: 'YouTube' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-primary py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920')] bg-cover bg-center opacity-[0.07]" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/40 to-primary-500/70" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <motion.span className="mb-4 inline-block rounded-full bg-accent-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-400">
              Get In Touch
            </motion.span>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <h1 className="font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Contact Us
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              We are here to help. Reach out to us for any legal assistance or to schedule a consultation.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-5">
            <div className="lg:col-span-3 lg:sticky lg:top-28 lg:self-start">
              <AnimatedSection variant="slideLeft">
                <Card variant="elevated" padding="lg">
                  <CardContent>
                    <h2 className="mb-6 font-serif text-2xl font-bold text-primary-500">
                      Send Us a Message
                    </h2>
                    {submitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <Alert
                          variant="success"
                          title="Message Sent!"
                          message="Thank you for reaching out. Our team will get back to you within 24 hours."
                          dismissible
                        />
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid gap-5 sm:grid-cols-2">
                          <Input
                            label="Full Name"
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            required
                          />
                          <Input
                            label="Email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            required
                          />
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2">
                          <Input
                            label="Phone"
                            type="tel"
                            placeholder="Your phone number"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                            required
                          />
                          <div>
                            <label className="mb-1.5 block text-sm font-medium text-surface-700">
                              Subject
                              <span className="ml-0.5 text-danger-500">*</span>
                            </label>
                            <select
                              value={formData.subject}
                              onChange={(e) =>
                                setFormData({ ...formData, subject: e.target.value })
                              }
                              className="h-10 w-full rounded-lg border border-surface-200 bg-white px-4 text-sm text-surface-700 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                              required
                            >
                              <option value="">Select practice area</option>
                              <option value="Corporate Law">Corporate Law</option>
                              <option value="Criminal Law">Criminal Law</option>
                              <option value="Civil Litigation">Civil Litigation</option>
                              <option value="Divorce">Divorce</option>
                              <option value="Family Law">Family Law</option>
                              <option value="Property Law">Property Law</option>
                              <option value="Immigration">Immigration</option>
                              <option value="Tax Law">Tax Law</option>
                              <option value="Intellectual Property">Intellectual Property</option>
                              <option value="Startup Legal">Startup Legal</option>
                              <option value="Consumer Law">Consumer Law</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-surface-700">
                            Message
                            <span className="ml-0.5 text-danger-500">*</span>
                          </label>
                          <textarea
                            value={formData.message}
                            onChange={(e) =>
                              setFormData({ ...formData, message: e.target.value })
                            }
                            rows={5}
                            className="w-full rounded-lg border border-surface-200 bg-white px-4 py-3 text-sm text-surface-900 placeholder:text-surface-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                            placeholder="Describe your legal matter in detail..."
                            required
                          />
                        </div>
                        <Button type="submit" size="lg" className="w-full">
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>

            <div className="space-y-6 lg:col-span-2">
              <AnimatedSection variant="slideRight">
                <Card variant="elevated" padding="lg">
                  <CardContent>
                    <h3 className="mb-4 flex items-center gap-2 font-serif text-lg font-bold text-primary-500">
                      <MapPin className="h-5 w-5 text-accent-500" />
                      Our Offices
                    </h3>
                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                      className="space-y-4"
                    >
                      {offices.map((office) => (
                        <motion.div
                          key={office.name}
                          variants={fadeUp}
                          className="rounded-xl bg-surface-50 p-4 transition-colors hover:bg-primary-50"
                        >
                          <p className="font-semibold text-surface-900">{office.name}</p>
                          <p className="mt-1 text-sm text-surface-500">{office.address}</p>
                          <div className="mt-2 flex items-center gap-3 text-xs text-surface-500">
                            <a href={`tel:${office.phone}`} className="flex items-center gap-1 text-primary-500 hover:underline">
                              <Phone className="h-3 w-3" />
                              {office.phone}
                            </a>
                            <a href={`mailto:${office.email}`} className="flex items-center gap-1 text-primary-500 hover:underline">
                              <Mail className="h-3 w-3" />
                              Email
                            </a>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection variant="slideRight" delay={100}>
                <Card variant="bordered" padding="lg">
                  <CardContent>
                    <h3 className="mb-4 flex items-center gap-2 font-serif text-lg font-bold text-primary-500">
                      <Clock className="h-5 w-5 text-accent-500" />
                      Business Hours
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between rounded-lg bg-surface-50 px-4 py-2.5">
                        <span className="text-surface-600">Monday - Friday</span>
                        <span className="font-medium text-surface-800">9:00 AM - 7:00 PM</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-surface-50 px-4 py-2.5">
                        <span className="text-surface-600">Saturday</span>
                        <span className="font-medium text-surface-800">10:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-danger-50 px-4 py-2.5">
                        <span className="text-surface-600">Sunday</span>
                        <span className="font-medium text-danger-600">Closed</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection variant="slideRight" delay={200}>
                <Card variant="bordered" padding="lg" className="border-danger-200 bg-danger-50">
                  <CardContent>
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-6 w-6 shrink-0 text-danger-500" />
                      <div>
                        <h3 className="font-semibold text-danger-700">24/7 Emergency</h3>
                        <p className="mt-1 text-sm text-danger-600">
                          For urgent legal matters, call our emergency hotline.
                        </p>
                        <a
                          href={`tel:${siteConfig.emergencyPhone}`}
                          className="mt-3 inline-flex items-center gap-2 rounded-lg bg-danger-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-danger-600"
                        >
                          <Phone className="h-4 w-4" />
                          {siteConfig.emergencyPhone}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection variant="slideRight" delay={300}>
                <Card variant="bordered" padding="lg">
                  <CardContent>
                    <h3 className="mb-4 font-serif text-lg font-bold text-primary-500">
                      Follow Us
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {socialLinks.map((social) => (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-100 text-surface-500 transition-all hover:bg-primary-500 hover:text-white hover:shadow-lg"
                          aria-label={social.label}
                        >
                          <social.icon className="h-5 w-5" />
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection variant="slideRight" delay={350}>
                <Card variant="bordered" padding="lg">
                  <CardContent>
                    <div className="flex h-40 items-center justify-center rounded-xl bg-surface-100">
                      <div className="text-center">
                        <MapPin className="mx-auto h-8 w-8 text-surface-400" />
                        <p className="mt-2 text-sm text-surface-500">Map Placeholder</p>
                        <p className="text-xs text-surface-400">Interactive map integration</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
