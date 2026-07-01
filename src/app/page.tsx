'use client';

import Link from 'next/link';
import {
  Scale, Gavel, FileText, Landmark, Star, Phone, MessageCircle, Calendar,
  ChevronRight, Shield, Building, Heart, Users, Home, Plane, Calculator,
  Lightbulb, Rocket, ShoppingCart, ArrowRight, Award, Clock, ThumbsUp,
  Mail, MapPin, CheckCircle, Quote,
} from 'lucide-react';
import { Button, Card, CardContent, Badge } from '@/components/ui';
import LegalAISearch from '@/components/home/LegalAISearch';
import LawyerProfileShowcase from '@/components/home/LawyerProfileShowcase';
import TestimonialSlider from '@/components/home/TestimonialSlider';
import FloatingStats from '@/components/home/FloatingStats';
import { siteConfig, lawyersData, testimonials, caseResults } from '@/lib/data';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AnimatedSection, AnimatedItem, CountUp, RippleButton,
  HeroContainer, HeroLine, HeroImage, FloatingIcon,
  staggerContainer, fadeUp, scaleIn, slideLeft, slideRight,
  easeOutExpo, easeOutCubic,
} from '@/lib/animation';
import { cn } from '@/lib/utils';

const icons: Record<string, any> = {
  building: Building, shield: Shield, scale: Scale, heart: Heart,
  users: Users, home: Home, plane: Plane, calculator: Calculator,
  lightbulb: Lightbulb, rocket: Rocket, 'shopping-cart': ShoppingCart,
};

const floatingIcons = [
  { Icon: Scale, x: '8%', y: '15%', delay: 0, size: 90 },
  { Icon: Gavel, x: '88%', y: '10%', delay: 1.2, size: 80 },
  { Icon: FileText, x: '92%', y: '72%', delay: 2.4, size: 70 },
  { Icon: Landmark, x: '6%', y: '78%', delay: 1.8, size: 85 },
];

const trustItems = [
  { icon: ThumbsUp, label: 'Trusted by 5000+ Clients', sub: 'Since 2005' },
  { icon: Award, label: 'Top-Rated Firm', sub: '4.9/5 Rating' },
  { icon: Clock, label: '25+ Years Experience', sub: 'Since 2000' },
  { icon: Scale, label: 'Expert Attorneys', sub: 'Supreme Court' },
];

const counterStats = [
  { end: 5000, suffix: '+', label: 'Cases Handled' },
  { end: 25, suffix: '+', label: 'Years Experience' },
  { end: 98, suffix: '%', label: 'Success Rate' },
  { end: 1842, suffix: '+', label: 'Happy Clients' },
];

const contactItems = [
  { icon: Phone, label: 'Phone', value: siteConfig.phone, sub: 'Emergency: ' + siteConfig.emergencyPhone, href: 'tel:+9118001234567' },
  { icon: Mail, label: 'Email', value: siteConfig.email, sub: 'We reply within 24 hours', href: 'mailto:' + siteConfig.email },
  { icon: MapPin, label: 'Office', value: 'Bengaluru, Karnataka', sub: siteConfig.address, href: '#' },
  { icon: MessageCircle, label: 'Live Chat', value: 'Available 24/7', sub: 'Instant responses', href: '#' },
];

const heroStats = [
  { num: '5000+', label: 'Cases' },
  { num: '98%', label: 'Success' },
  { num: '25+', label: 'Lawyers' },
];

export default function HomePage() {
  return (
    <div>
      {/* ===== 1. HERO SECTION ===== */}
      <section className="relative overflow-hidden gradient-primary min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/95 via-primary-600/92 to-primary-800/95" />

        <motion.div
          className="absolute inset-0 opacity-25"
          style={{
            background: 'linear-gradient(135deg, transparent 0%, rgba(194,151,77,0.12) 40%, transparent 70%)',
            backgroundSize: '200% 200%',
          }}
          animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        />

        {floatingIcons.map(({ Icon, x, y, delay, size }) => (
          <motion.div
            key={delay}
            className="absolute text-white/[0.04] hidden lg:block pointer-events-none"
            style={{ left: x, top: y }}
            animate={{ y: [0, -24, 0], rotate: [0, 6, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay }}
          >
            <Icon size={size} strokeWidth={1.2} />
          </motion.div>
        ))}

        <div className="relative container-page py-20 md:py-32 w-full z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <HeroContainer>
                <HeroLine>
                  <motion.div
                    className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm mb-6 border border-white/10"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Award className="w-4 h-4 text-accent-500" />
                    <span>Top-Rated Law Firm in Bengaluru</span>
                    <span className="text-accent-500 ml-1">&#9733;</span>
                  </motion.div>
                </HeroLine>

                <HeroLine>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif text-white leading-[1.1] mb-6">
                    <span className="inline-block overflow-hidden">
                      <motion.span
                        className="inline-block"
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      >
                        Expert Legal
                      </motion.span>
                    </span>
                    <br />
                    <span className="inline-block overflow-hidden">
                      <motion.span
                        className="inline-block"
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <span className="text-accent-500">Solutions</span>{' '}
                        <span className="text-white">You Can Trust</span>
                      </motion.span>
                    </span>
                  </h1>
                </HeroLine>

                <HeroLine>
                  <motion.p
                    className="text-lg md:text-xl text-white/75 max-w-xl mb-8 leading-relaxed font-light"
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  >
                    Legacy Legal Partners delivers exceptional legal counsel across corporate, criminal, civil, and family law. Our experienced attorneys are committed to protecting your rights and achieving the best outcomes.
                  </motion.p>
                </HeroLine>

                <HeroLine>
                  <motion.div
                    className="flex flex-wrap gap-4"
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link href="/booking">
                      <motion.button
                        className="px-7 py-3.5 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-xl shadow-lg shadow-accent-500/30 flex items-center gap-2 relative overflow-hidden group"
                        whileHover={{ scale: 1.04, boxShadow: '0 16px 48px rgba(194,151,77,0.4)' }}
                        whileTap={{ scale: 0.96 }}
                      >
                        <Calendar className="w-5 h-5" />
                        <span>Book Consultation</span>
                        <motion.span
                          className="absolute inset-0 bg-white/10"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.5 }}
                        />
                      </motion.button>
                    </Link>
                    <Link href="tel:+9118001234567">
                      <motion.button
                        className="px-7 py-3.5 border-2 border-white/30 text-white hover:bg-white/10 font-medium rounded-xl flex items-center gap-2"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <Phone className="w-5 h-5" /> Call Now
                      </motion.button>
                    </Link>
                    <Link href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank">
                      <motion.button
                        className="px-7 py-3.5 border-2 border-white/30 text-white hover:bg-white/10 font-medium rounded-xl flex items-center gap-2"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <MessageCircle className="w-5 h-5" /> WhatsApp
                      </motion.button>
                    </Link>
                  </motion.div>
                </HeroLine>

                <HeroLine>
                  <motion.div
                    className="flex items-center gap-8 mt-12 pt-8 border-t border-white/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                  >
                    {heroStats.map(({ num, label }) => (
                      <div key={label} className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-white">
                          <CountUp end={parseInt(num)} duration={2.2} suffix={num.includes('+') ? '+' : '%'} />
                        </div>
                        <div className="text-white/60 text-xs uppercase tracking-wider mt-1">{label}</div>
                      </div>
                    ))}
                  </motion.div>
                </HeroLine>
              </HeroContainer>
            </div>

            {/* Right side image gallery */}
            <div className="hidden lg:block relative h-[650px]">
              <motion.div
                className="absolute top-0 right-0 w-[85%] h-[85%] rounded-2xl overflow-hidden shadow-2xl"
                initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
                animate={{ clipPath: 'inset(0 0 0 0)', opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              >
                <motion.img
                  src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=700&h=500&fit=crop"
                  alt="Law Firm Office"
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.4, filter: 'blur(10px)' }}
                  animate={{ scale: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                />
              </motion.div>

              <motion.div
                className="absolute bottom-8 left-0 w-[55%] h-[55%] rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
                initial={{ clipPath: 'inset(100% 0 0 0)', opacity: 0 }}
                animate={{ clipPath: 'inset(0 0 0 0)', opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              >
                <motion.img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=400&fit=crop"
                  alt="Senior Attorney"
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.3, filter: 'blur(8px)' }}
                  animate={{ scale: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                />
              </motion.div>

              <motion.div
                className="absolute top-[45%] right-[2%] w-[40%] h-[30%] rounded-2xl overflow-hidden shadow-xl border-4 border-white z-10"
                initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
                animate={{ clipPath: 'inset(0 0 0 0)', opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
              >
                <motion.img
                  src="https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=400&h=300&fit=crop"
                  alt="Justice Statue"
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.3, filter: 'blur(8px)' }}
                  animate={{ scale: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
                />
              </motion.div>

              <motion.div
                className="absolute top-[6%] right-[1%] bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-xl z-20"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 1.3 }}
              >
                <div className="flex items-center gap-2.5">
                  <span className="relative flex w-2.5 h-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                  </span>
                  <span className="text-xs font-semibold text-gray-800">Available 24/7</span>
                </div>
                <p className="text-[10px] text-gray-500 mt-0.5 pl-5">Emergency consultations</p>
              </motion.div>

              <motion.div
                className="absolute bottom-[10%] right-[4%] bg-accent-500/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-xl z-20"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 1.5 }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} size={12} className="fill-white text-white" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-white">4.9/5 Rating</span>
                </div>
                <p className="text-[10px] text-white/75 mt-0.5">500+ Google Reviews</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. TRUST BAR ===== */}
      <section className="bg-gray-50 border-y border-gray-100 py-8">
        <div className="container-page">
          <motion.div
            className="flex flex-wrap justify-center gap-8 md:gap-16 text-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-20px' }}
          >
            {trustItems.map((item) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                className="flex items-center gap-3 group"
              >
                <div className="w-12 h-12 rounded-full bg-accent-50 flex items-center justify-center group-hover:bg-accent-100 transition-colors duration-300">
                  <item.icon className="w-6 h-6 text-accent-500" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <LegalAISearch />

      <FloatingStats />

      {/* ===== 4. ATTORNEY SHOWCASE - LAWYER SHOWCASE ===== */}
      <section className="section-padding bg-white overflow-hidden">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
            className="text-center mb-16"
          >
            <span className="text-accent-500 font-medium text-sm uppercase tracking-[0.25em]">Our Team</span>
            <h2 className="section-title mt-4 mb-4">Meet Our Legal Experts</h2>
            <p className="section-subtitle mx-auto">
              Highly qualified attorneys with decades of combined experience across diverse practice areas, committed to protecting your interests.
            </p>
          </motion.div>

          <LawyerProfileShowcase items={lawyersData} />
        </div>
      </section>

      {/* ===== 5. SUCCESS STORIES ===== */}
      <section className="section-padding">
        <div className="container-page">
          <AnimatedSection variant="fadeUp">
            <div className="text-center mb-14">
              <span className="text-accent-500 font-medium text-sm uppercase tracking-[0.2em]">Results</span>
              <h2 className="section-title mt-3">Success Stories</h2>
              <p className="section-subtitle max-w-2xl mx-auto">
                Real results that demonstrate our commitment to excellence and our track record of achieving favorable outcomes for our clients.
              </p>
            </div>
          </AnimatedSection>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {caseResults.map((result, i) => (
              <motion.div key={i} variants={i % 2 === 0 ? slideLeft : slideRight}>
                <motion.div
                  className="bg-white rounded-xl border border-gray-100 border-l-4 border-l-accent-500 overflow-hidden h-full"
                  whileHover={{ y: -5, boxShadow: '0 16px 48px rgba(26,54,93,0.08)' }}
                  transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                >
                  <CardContent className="p-7">
                    <Badge variant="accent" className="mb-3">
                      {result.category}
                    </Badge>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{result.title}</h3>
                    <p className="text-accent-500 font-bold text-lg mb-3">{result.result}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{result.description}</p>
                  </CardContent>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== 6. COUNTER STATS ===== */}
      <section className="py-20 gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920')] bg-cover bg-center opacity-5" />
        <motion.div
          className="absolute inset-0 opacity-15"
          style={{
            background: 'linear-gradient(135deg, transparent 0%, rgba(194,151,77,0.10) 50%, transparent 100%)',
            backgroundSize: '200% 200%',
          }}
          animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />
        <div className="relative container-page">
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {counterStats.map((stat) => (
              <motion.div key={stat.label} variants={fadeUp} className="text-white">
                <div className="text-5xl md:text-6xl font-bold mb-2">
                  <CountUp end={stat.end} suffix={stat.suffix} duration={2.5} />
                </div>
                <p className="text-white/75 text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== 7. TESTIMONIALS - SUCCESS STORIES SLIDER ===== */}
      <section className="section-padding bg-gradient-to-b from-white via-surface-50 to-white overflow-hidden">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
            className="text-center mb-16"
          >
            <span className="text-accent-500 font-medium text-sm uppercase tracking-[0.25em]">Testimonials</span>
            <h2 className="section-title mt-4 mb-4">What Our Clients Say</h2>
            <p className="section-subtitle mx-auto">
              Hear from clients who have experienced our legal expertise firsthand and trust us with their most important legal matters.
            </p>
          </motion.div>

          <TestimonialSlider items={testimonials} />
        </div>
      </section>

      {/* ===== 8. CTA SECTION ===== */}
      <section className="py-24 gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920')] bg-cover bg-center opacity-5" />
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.06) 40%, transparent 70%)',
            backgroundSize: '200% 200%',
          }}
          animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
        <div className="relative container-page text-center">
          <AnimatedSection variant="scaleIn">
            <span className="text-accent-500 font-medium text-sm uppercase tracking-[0.2em]">Get In Touch</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-white mb-4 mt-3">
              Ready to Resolve Your Legal Matter?
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              Schedule a consultation with our expert attorneys today. We are here to guide you every step of the way with personalized legal solutions.
            </p>
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Link href="/booking">
                <motion.button
                  className="px-8 py-3.5 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-xl shadow-lg shadow-accent-500/30 flex items-center gap-2 relative overflow-hidden group"
                  variants={fadeUp}
                  whileHover={{ scale: 1.04, boxShadow: '0 16px 48px rgba(194,151,77,0.4)' }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book a Consultation</span>
                  <motion.span
                    className="absolute inset-0 bg-white/10"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.button>
              </Link>
              <Link href="tel:+9118001234567">
                <motion.button
                  className="px-8 py-3.5 border-2 border-white/30 text-white hover:bg-white/10 font-medium rounded-xl flex items-center gap-2"
                  variants={fadeUp}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Phone className="w-5 h-5" /> Call 1800-123-4567
                </motion.button>
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== 9. CONTACT INFO CARDS ===== */}
      <section className="section-padding">
        <div className="container-page">
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-30px' }}
          >
            {contactItems.map((item) => (
              <motion.div key={item.label} variants={fadeUp}>
                <Link href={item.href}>
                  <motion.div
                    className="rounded-xl border border-gray-100 bg-white text-center p-6 h-full"
                    whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(26,54,93,0.08)' }}
                    transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
                  >
                    <div className="w-14 h-14 rounded-full bg-primary-50 text-primary-500 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary-100 transition-colors duration-300">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1.5">{item.label}</h3>
                    <p className="text-primary-500 font-medium text-sm">{item.value}</p>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">{item.sub}</p>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
