'use client';
import AnimatedSection from '@/lib/animation/AnimatedSection';

export default function TermsPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-primary py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/40 to-primary-500/70" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection delay={100}>
            <h1 className="font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">Terms of Service</h1>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">Terms and conditions governing the use of our services.</p>
          </AnimatedSection>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="space-y-6 text-surface-600">
              <h2 className="text-xl font-bold text-primary-500">1. Acceptance of Terms</h2>
              <p>By accessing and using our services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
              <h2 className="text-xl font-bold text-primary-500">2. Legal Services</h2>
              <p>Our legal services are provided by qualified attorneys. The attorney-client relationship is established only upon signing a formal engagement agreement.</p>
              <h2 className="text-xl font-bold text-primary-500">3. Use of Website</h2>
              <p>You agree to use our website for lawful purposes only. You must not misuse our platform or engage in any activity that disrupts our services.</p>
              <h2 className="text-xl font-bold text-primary-500">4. Limitation of Liability</h2>
              <p>Legacy Legal Partners shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.</p>
              <h2 className="text-xl font-bold text-primary-500">5. Governing Law</h2>
              <p>These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of Bengaluru courts.</p>
              <p className="text-sm text-surface-400 mt-8">Last updated: June 2026</p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
