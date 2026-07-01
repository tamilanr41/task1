'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Home, Scale, Users, UserRound, Phone, LayoutDashboard
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const tabs = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Practice', href: '/practice-areas', icon: Scale },
  { label: 'Lawyers', href: '/lawyers', icon: Users },
  { label: 'Portal', href: '/portal', icon: UserRound },
  { label: 'Contact', href: '/contact', icon: Phone },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-200/80 lg:hidden pb-[env(safe-area-inset-bottom,0px)]">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href || pathname.startsWith(tab.href + '/');

          return (
            <Link
              key={tab.label}
              href={tab.href}
              className={cn(
                'relative flex flex-col items-center justify-center gap-0.5 py-1 px-3 rounded-xl transition-colors duration-200',
                isActive ? 'text-primary-500' : 'text-gray-400 hover:text-gray-600'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary-500 rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium leading-none">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
