'use client';
import Link from 'next/link';
import {
  Scale, Phone, Mail, MapPin, MessageCircle, ArrowUpRight,
  Facebook, Twitter, Linkedin, Instagram, Youtube,
  Building2, Gavel, Heart, Users, Home, Plane, Lightbulb,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/lib/data';

const practiceAreas = [
  { label: 'Corporate Law', href: '/practice-areas/corporate-law', icon: Building2 },
  { label: 'Criminal Law', href: '/practice-areas/criminal-law', icon: Gavel },
  { label: 'Civil Litigation', href: '/practice-areas/civil-litigation', icon: Scale },
  { label: 'Family Law', href: '/practice-areas/family-law', icon: Users },
  { label: 'Property Law', href: '/practice-areas/property-law', icon: Home },
  { label: 'Immigration', href: '/practice-areas/immigration', icon: Plane },
  { label: 'Intellectual Property', href: '/practice-areas/intellectual-property', icon: Lightbulb },
];

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Our Lawyers', href: '/lawyers' },
  { label: 'Blog & Insights', href: '/blog' },
  { label: 'FAQs', href: '/faq' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Client Portal', href: '/portal' },
  { label: 'Careers', href: '/careers' },
];

const supportLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
  { label: 'Disclaimer', href: '/disclaimer' },
  { label: 'Sitemap', href: '/sitemap' },
];

const socialLinks = [
  { label: 'Facebook', icon: Facebook, href: '#', hoverColor: 'hover:text-blue-500 hover:bg-blue-500/10' },
  { label: 'Twitter', icon: Twitter, href: '#', hoverColor: 'hover:text-sky-400 hover:bg-sky-400/10' },
  { label: 'LinkedIn', icon: Linkedin, href: '#', hoverColor: 'hover:text-blue-600 hover:bg-blue-600/10' },
  { label: 'Instagram', icon: Instagram, href: '#', hoverColor: 'hover:text-pink-500 hover:bg-pink-500/10' },
  { label: 'YouTube', icon: Youtube, href: '#', hoverColor: 'hover:text-red-500 hover:bg-red-500/10' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function Footer({ className = '' }: { className?: string }) {
  return (
    <footer className={'bg-dark-900 text-gray-300 relative overflow-hidden ' + className}>
      <div className="absolute inset-0 bg-gradient-to-b from-dark-800/50 to-dark-900 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <Link href="/" className="flex items-center gap-2.5 mb-5 group">
              <Scale className="w-8 h-8 text-accent-500 transition-transform duration-300 group-hover:scale-110" />
              <div>
                <span className="text-xl font-bold text-white font-serif tracking-tight">Legacy Legal</span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 -mt-0.5">Partners</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
              Premier law firm offering comprehensive legal services with a team of experienced attorneys dedicated to excellence, integrity, and client success since 2010.
            </p>
            <div className="space-y-3">
              <a href="tel:+9118001234567" className="flex items-center gap-3 text-sm text-gray-400 hover:text-accent-500 transition-colors duration-200 group">
                <span className="w-8 h-8 rounded-lg bg-gray-800/80 flex items-center justify-center group-hover:bg-accent-500/20 transition-colors">
                  <Phone className="w-4 h-4 text-accent-500" />
                </span>
                1800-123-4567 (Toll Free)
              </a>
              <a href="mailto:contact@legacylegal.in" className="flex items-center gap-3 text-sm text-gray-400 hover:text-accent-500 transition-colors duration-200 group">
                <span className="w-8 h-8 rounded-lg bg-gray-800/80 flex items-center justify-center group-hover:bg-accent-500/20 transition-colors">
                  <Mail className="w-4 h-4 text-accent-500" />
                </span>
                contact@legacylegal.in
              </a>
              <div className="flex items-start gap-3 text-sm text-gray-400 group">
                <span className="w-8 h-8 rounded-lg bg-gray-800/80 flex items-center justify-center shrink-0 group-hover:bg-accent-500/20 transition-colors">
                  <MapPin className="w-4 h-4 text-accent-500 mt-0.5" />
                </span>
                <span>
                  No. 42, Kasturba Road, MG Road,<br />
                  Bengaluru, Karnataka 560001
                </span>
              </div>
            </div>
            <div className="flex gap-2.5 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'w-9 h-9 rounded-lg bg-gray-800/60 flex items-center justify-center text-gray-400 transition-all duration-300',
                      social.hoverColor
                    )}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold text-sm mb-5 tracking-wide uppercase">Practice Areas</h3>
            <ul className="space-y-2.5">
              {practiceAreas.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-accent-500 transition-all duration-200 flex items-center gap-2 group"
                    >
                      <Icon className="w-3.5 h-3.5 text-gray-600 group-hover:text-accent-500 transition-colors shrink-0" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold text-sm mb-5 tracking-wide uppercase">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-accent-500 transition-all duration-200 flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-accent-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold text-sm mb-5 tracking-wide uppercase">Support</h3>
            <ul className="space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-accent-500 transition-all duration-200 flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-accent-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-12 lg:mt-16 pt-8 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-sm text-gray-500 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Legacy Legal Partners. All rights reserved.
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-green-500 transition-colors group"
            >
              <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>WhatsApp</span>
            </a>
            <span className="text-gray-700 text-xs">|</span>
            <a
              href="#"
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-accent-500 transition-colors group"
            >
              <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Live Chat</span>
            </a>
            <span className="text-gray-700 hidden sm:inline text-xs">|</span>
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-accent-500 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-gray-500 hover:text-accent-500 transition-colors">
              Terms
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
