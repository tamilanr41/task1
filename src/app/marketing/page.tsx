'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Mail, Share2, FileText, Layout, BookOpen,
  Send, Video, BarChart3, TrendingUp, Users,
  MousePointerClick, Eye, ThumbsUp, Zap, ArrowUpRight,
  Globe, MessageSquare, PieChart, Target, Award
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AnimatedSection } from '@/lib/animation';

interface MarketingFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  status: 'active' | 'coming-soon';
  stats?: { label: string; value: string };
  gradient: string;
}

interface QuickStat {
  label: string;
  value: string;
  change: string;
  changeUp: boolean;
  icon: React.ReactNode;
}

const features: MarketingFeature[] = [
  {
    id: 'seo', title: 'SEO Tools', description: 'Optimize your firm\'s website for search engines. Keyword research, meta tags, and performance tracking.',
    icon: <Search className="w-6 h-6" />, color: 'text-blue-600 bg-blue-50', status: 'active',
    stats: { label: 'Keywords tracked', value: '156' }, gradient: 'from-blue-500 to-blue-600',
  },
  {
    id: 'email', title: 'Email Campaigns', description: 'Design and send professional email campaigns to clients and prospects with analytics.',
    icon: <Mail className="w-6 h-6" />, color: 'text-purple-600 bg-purple-50', status: 'active',
    stats: { label: 'Open rate', value: '42.5%' }, gradient: 'from-purple-500 to-purple-600',
  },
  {
    id: 'social', title: 'Social Media', description: 'Schedule, publish, and monitor social media content across LinkedIn, Twitter, and Instagram.',
    icon: <Share2 className="w-6 h-6" />, color: 'text-cyan-600 bg-cyan-50', status: 'active',
    stats: { label: 'Followers', value: '12.5K' }, gradient: 'from-cyan-500 to-cyan-600',
  },
  {
    id: 'blog', title: 'Blog Management', description: 'Create, edit, and publish legal blog posts with built-in SEO optimization and analytics.',
    icon: <FileText className="w-6 h-6" />, color: 'text-green-600 bg-green-50', status: 'active',
    stats: { label: 'Monthly views', value: '45.2K' }, gradient: 'from-green-500 to-green-600',
  },
  {
    id: 'landing', title: 'Landing Pages', description: 'Build high-converting landing pages for practice areas and lead generation campaigns.',
    icon: <Layout className="w-6 h-6" />, color: 'text-amber-600 bg-amber-50', status: 'active',
    stats: { label: 'Conversion rate', value: '8.2%' }, gradient: 'from-amber-500 to-amber-600',
  },
  {
    id: 'case-studies', title: 'Case Studies', description: 'Showcase your firm\'s successes with professionally designed case study templates.',
    icon: <BookOpen className="w-6 h-6" />, color: 'text-rose-600 bg-rose-50', status: 'active',
    stats: { label: 'Published', value: '24' }, gradient: 'from-rose-500 to-rose-600',
  },
  {
    id: 'newsletter', title: 'Newsletter', description: 'Create and send regular newsletters to keep clients informed about legal updates.',
    icon: <Send className="w-6 h-6" />, color: 'text-indigo-600 bg-indigo-50', status: 'coming-soon',
    gradient: 'from-indigo-500 to-indigo-600',
  },
  {
    id: 'webinars', title: 'Webinars', description: 'Host and manage legal webinars with registration, recording, and attendee management.',
    icon: <Video className="w-6 h-6" />, color: 'text-orange-600 bg-orange-50', status: 'coming-soon',
    gradient: 'from-orange-500 to-orange-600',
  },
  {
    id: 'analytics', title: 'Marketing Analytics', description: 'Comprehensive dashboard with ROI tracking, campaign performance, and client acquisition metrics.',
    icon: <BarChart3 className="w-6 h-6" />, color: 'text-teal-600 bg-teal-50', status: 'coming-soon',
    gradient: 'from-teal-500 to-teal-600',
  },
];

const quickStats: QuickStat[] = [
  { label: 'Total Leads', value: '2,847', change: '+18.5%', changeUp: true, icon: <Users className="w-5 h-5" /> },
  { label: 'Conversion Rate', value: '38.6%', change: '+5.2%', changeUp: true, icon: <TrendingUp className="w-5 h-5" /> },
  { label: 'Email Open Rate', value: '42.5%', change: '+3.8%', changeUp: true, icon: <Mail className="w-5 h-5" /> },
  { label: 'Social Followers', value: '12,546', change: '+22.1%', changeUp: true, icon: <ThumbsUp className="w-5 h-5" /> },
];

export default function MarketingPage() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-surface-900 font-serif">Marketing Tools</h1>
            <p className="text-surface-500 mt-2">Grow your legal practice with powerful marketing and lead generation tools</p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickStats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
            >
              <Card variant="elevated" padding="sm">
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-surface-500 font-medium">{stat.label}</p>
                    <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-primary-500">
                      {stat.icon}
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-surface-900">{stat.value}</p>
                  <span className={cn('inline-flex items-center gap-0.5 text-xs font-medium', stat.changeUp ? 'text-success-600' : 'text-danger-600')}>
                    <ArrowUpRight className={cn('w-3 h-3', !stat.changeUp && 'rotate-90')} />
                    {stat.change} vs last month
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card
                variant={activeFeature === feature.id ? 'elevated' : 'interactive'}
                padding="md"
                onClick={() => setActiveFeature(activeFeature === feature.id ? null : feature.id)}
                className={cn(
                  'h-full group relative overflow-hidden transition-all duration-300',
                  activeFeature === feature.id && 'ring-2 ring-primary-500'
                )}
              >
                <CardContent className="flex flex-col h-full gap-4">
                  <div className="flex items-start justify-between">
                    <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center', feature.color)}>
                      {feature.icon}
                    </div>
                    <Badge variant={feature.status === 'active' ? 'success' : 'warning'} size="sm">
                      {feature.status === 'active' ? 'Active' : 'Coming Soon'}
                    </Badge>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-surface-900">{feature.title}</h3>
                    <p className="text-sm text-surface-500 mt-2 leading-relaxed">{feature.description}</p>
                  </div>
                  {feature.stats && (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-surface-50 border border-surface-100">
                      <span className="text-xs text-surface-500">{feature.stats.label}</span>
                      <span className="text-sm font-bold text-surface-900">{feature.stats.value}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    {feature.status === 'active' ? (
                      <>
                        <Button variant="primary" size="sm" className="flex-1">
                          <Zap className="w-4 h-4" /> Open
                        </Button>
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </>
                    ) : (
                      <Button variant="outline" size="sm" disabled fullWidth className="opacity-60">
                        <Award className="w-4 h-4" /> Coming Soon
                      </Button>
                    )}
                  </div>
                </CardContent>
                {activeFeature === feature.id && (
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-500 to-accent-500" />
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        <AnimatedSection>
          <Card variant="elevated">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-1 space-y-4">
                  <Badge variant="accent" size="lg">Premium</Badge>
                  <h2 className="text-2xl font-bold text-surface-900 font-serif">Supercharge Your Practice Growth</h2>
                  <p className="text-surface-500">Get access to all marketing tools, advanced analytics, and priority support with our Enterprise plan.</p>
                  <div className="flex items-center gap-4">
                    <Button variant="primary" size="lg">
                      <Target className="w-4 h-4" /> Upgrade to Enterprise
                    </Button>
                    <Button variant="outline" size="lg">
                      View Pricing
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Active Campaigns', value: '12', icon: <Zap className="w-4 h-4" /> },
                    { label: 'Total Leads', value: '2,847', icon: <Users className="w-4 h-4" /> },
                    { label: 'Email Sent', value: '48.5K', icon: <Send className="w-4 h-4" /> },
                    { label: 'ROI', value: '384%', icon: <BarChart3 className="w-4 h-4" /> },
                  ].map((item) => (
                    <div key={item.label} className="text-center p-4 rounded-xl bg-surface-50 border border-surface-100">
                      <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center text-primary-500 mx-auto mb-2">
                        {item.icon}
                      </div>
                      <p className="text-lg font-bold text-surface-900">{item.value}</p>
                      <p className="text-xs text-surface-500">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  );
}
