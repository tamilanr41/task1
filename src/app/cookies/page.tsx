'use client';
import AnimatedSection from '@/lib/animation/AnimatedSection';

export default function CookiesPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-primary py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/40 to-primary-500/70" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection delay={100}>
            <h1 className="font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">Cookie Policy</h1>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">How we use cookies and similar tracking technologies.</p>
          </AnimatedSection>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="space-y-6 text-surface-600">
              <h2 className="text-xl font-bold text-primary-500">1. What Are Cookies</h2>
              <p>Cookies are small text files stored on your device when you visit a website. They help us improve your browsing experience.</p>
              <h2 className="text-xl font-bold text-primary-500">2. How We Use Cookies</h2>
              <p>We use essential cookies for website functionality, analytics cookies to understand usage patterns, and preference cookies to remember your settings.</p>
              <h2 className="text-xl font-bold text-primary-500">3. Managing Cookies</h2>
              <p>You can control cookies through your browser settings. Disabling certain cookies may affect website functionality.</p>
              <h2 className="text-xl font-bold text-primary-500">4. Third-Party Cookies</h2>
              <p>We may use third-party services that set their own cookies. We do not control these cookies.</p>
              <p className="text-sm text-surface-400 mt-8">Last updated: June 2026</p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
