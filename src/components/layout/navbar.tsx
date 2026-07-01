'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Menu, X, Phone, MessageCircle, ChevronDown, Scale,
  Building2, Gavel, Scale as ScaleIcon, Heart, Users, Home,
  Plane, Calculator, Lightbulb, Rocket, ShoppingCart, ArrowRight,
  UserRound, Shield
} from 'lucide-react';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import {
  motion, AnimatePresence, useScroll, useMotionValueEvent
} from 'framer-motion';

const practiceAreas = [
  { label: 'Corporate Law', href: '/practice-areas/corporate-law', icon: Building2 },
  { label: 'Criminal Law', href: '/practice-areas/criminal-law', icon: Shield },
  { label: 'Civil Litigation', href: '/practice-areas/civil-litigation', icon: ScaleIcon },
  { label: 'Divorce', href: '/practice-areas/divorce', icon: Heart },
  { label: 'Family Law', href: '/practice-areas/family-law', icon: Users },
  { label: 'Property Law', href: '/practice-areas/property-law', icon: Home },
  { label: 'Immigration', href: '/practice-areas/immigration', icon: Plane },
  { label: 'Tax Law', href: '/practice-areas/tax-law', icon: Calculator },
  { label: 'Intellectual Property', href: '/practice-areas/intellectual-property', icon: Lightbulb },
  { label: 'Startup Legal', href: '/practice-areas/startup-legal', icon: Rocket },
  { label: 'Consumer Law', href: '/practice-areas/consumer-law', icon: ShoppingCart },
];

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Practice Areas', href: '/practice-areas', children: practiceAreas },
  { label: 'Lawyers', href: '/lawyers' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const staggerLink = (i: number) => ({
  initial: { opacity: 0, y: -12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.4 + i * 0.05, ease: [0.16, 1, 0.3, 1] } },
});

const mobileStagger = (i: number) => ({
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.35, delay: 0.1 + i * 0.04, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, x: -10, transition: { duration: 0.2, delay: i * 0.02 } },
});

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 20);
  });

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
    >
      <motion.div
        className="border-b"
        animate={{
          backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'blur(0px)',
          background: scrolled ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,1)',
          borderColor: scrolled ? 'rgba(229,231,235,0.4)' : 'rgba(229,231,235,1)',
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.06)' : '0 0px 0px rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex items-center justify-between"
            animate={{ height: scrolled ? 56 : 80 }}
            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            >
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="relative">
                  <Scale className="w-7 h-7 text-accent-500 transition-transform duration-300 group-hover:scale-110" />
                  <motion.div
                    className="absolute -inset-1 bg-accent-500/10 rounded-full"
                    initial={false}
                    whileHover={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <div>
                  <span className="text-xl font-bold text-primary-500 font-serif tracking-tight">Legacy Legal</span>
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 -mt-0.5">Partners</span>
                </div>
              </Link>
            </motion.div>

            <div className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="relative"
                  {...staggerLink(i)}
                  onMouseEnter={() => { setActiveDropdown(item.label); if (!item.children) setActiveDropdown(null); }}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'relative px-3.5 py-2 text-sm font-medium rounded-lg flex items-center gap-1 group transition-colors duration-200',
                      activeDropdown === item.label ? 'text-primary-500' : 'text-gray-700 hover:text-primary-500'
                    )}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {item.children && (
                      <ChevronDown className={cn(
                        'w-3.5 h-3.5 transition-transform duration-300 relative z-10',
                        activeDropdown === item.label && 'rotate-180'
                      )} />
                    )}
                    <span className={cn(
                      'absolute inset-x-2.5 bottom-0.5 h-0.5 bg-primary-500 rounded-full transition-transform duration-300 origin-left',
                      activeDropdown === item.label ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    )} />
                  </Link>

                  {item.children && (
                    <AnimatePresence>
                      {activeDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.22, ease: [0.33, 1, 0.68, 1] }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[640px] bg-white rounded-2xl shadow-dropdown border border-gray-100 p-6"
                        >
                          <div className="grid grid-cols-2 gap-1">
                            {item.children.map((child) => {
                              const Icon = child.icon;
                              return (
                                <Link
                                  key={child.label}
                                  href={child.href}
                                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-primary-50/80 group transition-all duration-200"
                                >
                                  <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center shrink-0 group-hover:bg-primary-100 transition-colors">
                                    <Icon className="w-4.5 h-4.5 text-primary-600" />
                                  </div>
                                  <span className="text-sm font-medium text-gray-700 group-hover:text-primary-600 transition-colors">
                                    {child.label}
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-xs text-gray-400">Comprehensive legal solutions across 11 practice areas</span>
                            <Link
                              href="/practice-areas"
                              className="text-xs font-medium text-accent-500 hover:text-accent-600 flex items-center gap-1 group"
                            >
                              View All Areas
                              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              className="hidden lg:flex items-center gap-2.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link
                href="tel:+9118001234567"
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary-500 transition-colors px-2 py-1.5 rounded-lg hover:bg-primary-50/50"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="font-medium">1800-123-4567</span>
              </Link>
              <Link
                href="https://wa.me/919999888777"
                target="_blank"
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              >
                <MessageCircle className="w-4.5 h-4.5" />
              </Link>
              <Link href="/booking">
                <Button variant="primary" size="sm" className="shadow-button">
                  Book Consultation
                </Button>
              </Link>
              <Link href="/portal">
                <Button variant="outline" size="sm" iconLeft={<UserRound className="w-3.5 h-3.5" />}>
                  Client Portal
                </Button>
              </Link>
            </motion.div>

            <button
              className="lg:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
            </button>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-[57px] bg-white z-40 lg:hidden overflow-y-auto"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item, i) => (
                <motion.div key={item.label} {...mobileStagger(i)}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() => setMobileSubOpen(!mobileSubOpen)}
                        className="w-full flex items-center justify-between px-3 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-primary-50 transition-colors"
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={cn('w-4 h-4 transition-transform duration-300', mobileSubOpen && 'rotate-180')} />
                      </button>
                      <AnimatePresence>
                        {mobileSubOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 pb-2 pt-1 space-y-0.5">
                              {item.children.map((child) => {
                                const Icon = child.icon;
                                return (
                                  <Link
                                    key={child.label}
                                    href={child.href}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50/80 rounded-xl transition-all"
                                  >
                                    <Icon className="w-4 h-4 text-primary-500" />
                                    {child.label}
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-3 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all"
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              className="px-4 py-4 space-y-3 border-t border-gray-100"
              {...mobileStagger(navItems.length)}
            >
              <div className="flex items-center gap-3 mb-3">
                <Link href="tel:+9118001234567" className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-500 transition-colors">
                  <Phone className="w-4 h-4" />
                  <span className="font-medium">1800-123-4567</span>
                </Link>
                <Link href="https://wa.me/919999888777" target="_blank" className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </Link>
              </div>
              <Link href="/booking" onClick={() => setIsOpen(false)}>
                <Button variant="primary" fullWidth size="md">
                  Book Consultation
                </Button>
              </Link>
              <Link href="/portal" onClick={() => setIsOpen(false)}>
                <Button variant="outline" fullWidth size="md">
                  Client Portal
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

