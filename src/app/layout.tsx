import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Navbar, Footer, MobileNav } from '@/components/layout';
import ChatWidget from '@/components/ChatWidget';
import { ProgressIndicator } from '@/lib/animation';
import { Toast } from '@/components/ui/toast';
import PageTransition from '@/lib/animation/PageTransition';
import CookiesConsent from '@/components/CookiesConsent';

export const metadata: Metadata = {
  title: 'Legacy Legal Partners | Premier Law Firm',
  description: 'Comprehensive legal services across corporate, criminal, civil, family, immigration, and more. Expert attorneys, proven results.',
  keywords: 'law firm, legal services, corporate law, criminal law, divorce lawyer, property law, immigration, intellectual property',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1a365d',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen overflow-x-hidden">
        <ProgressIndicator />
        <Navbar />
        <main className="flex-1 pt-20">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer className="mb-16 lg:mb-0" />
        <ChatWidget />
        <MobileNav />
        <Toast />
        <CookiesConsent />
      </body>
    </html>
  );
}
