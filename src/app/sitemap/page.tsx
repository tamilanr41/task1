'use client';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import AnimatedSection from '@/lib/animation/AnimatedSection';

const sections = [
  {
    title: 'Home',
    links: [{ label: 'Home', href: '/' }],
  },
  {
    title: 'Practice Areas',
    links: [
      { label: 'All Practice Areas', href: '/practice-areas' },
      { label: 'Corporate Law', href: '/practice-areas/corporate-law' },
      { label: 'Criminal Law', href: '/practice-areas/criminal-law' },
      { label: 'Civil Litigation', href: '/practice-areas/civil-litigation' },
      { label: 'Family Law', href: '/practice-areas/family-law' },
      { label: 'Property Law', href: '/practice-areas/property-law' },
      { label: 'Immigration', href: '/practice-areas/immigration' },
      { label: 'Intellectual Property', href: '/practice-areas/intellectual-property' },
    ],
  },
  {
    title: 'Our Team',
    links: [
      { label: 'Our Lawyers', href: '/lawyers' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog & Insights', href: '/blog' },
      { label: 'FAQs', href: '/faq' },
      { label: 'Knowledge Base', href: '/knowledge-base' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'AI Legal Assistant', href: '/ai/assistant' },
      { label: 'AI Contract Review', href: '/ai/contract-review' },
      { label: 'AI Research', href: '/ai/research' },
      { label: 'AI Draft Generator', href: '/ai/drafting' },
      { label: 'Document Automation', href: '/document-automation' },
      { label: 'E-Signature', href: '/esignature' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Client Portal', href: '/portal' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Disclaimer', href: '/disclaimer' },
    ],
  },
];

export default function SitemapPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-primary py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/40 to-primary-500/70" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection delay={100}>
            <h1 className="font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">Sitemap</h1>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">Complete site navigation at your fingertips.</p>
          </AnimatedSection>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => (
              <AnimatedSection key={section.title}>
                <h2 className="mb-3 font-serif text-lg font-bold text-primary-500">{section.title}</h2>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="flex items-center gap-1.5 text-sm text-surface-600 hover:text-primary-500 transition-colors">
                        <ChevronRight className="h-3 w-3 text-surface-400" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
