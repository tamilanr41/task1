'use client';
import AnimatedSection from '@/lib/animation/AnimatedSection';

export default function PrivacyPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-primary py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/40 to-primary-500/70" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection delay={100}>
            <h1 className="font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">Privacy Policy</h1>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">How we collect, use, and protect your information.</p>
          </AnimatedSection>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="prose prose-surface max-w-none space-y-6 text-surface-600">
              <h2 className="text-xl font-bold text-primary-500">1. Information We Collect</h2>
              <p>We collect information you provide directly, including your name, email, phone number, and case details when you use our services or contact us.</p>
              <h2 className="text-xl font-bold text-primary-500">2. How We Use Your Information</h2>
              <p>Your information is used to provide legal services, communicate with you, process payments, and improve our services.</p>
              <h2 className="text-xl font-bold text-primary-500">3. Data Protection</h2>
              <p>We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, or disclosure.</p>
              <h2 className="text-xl font-bold text-primary-500">4. Third-Party Sharing</h2>
              <p>We do not sell your personal information. Data may be shared with trusted partners only as necessary to provide our legal services.</p>
              <h2 className="text-xl font-bold text-primary-500">5. Your Rights</h2>
              <p>You have the right to access, correct, or delete your personal data. Contact us to exercise these rights.</p>
              <h2 className="text-xl font-bold text-primary-500">6. Contact</h2>
              <p>For privacy-related inquiries, contact us at privacy@legacylegal.in</p>
              <p className="text-sm text-surface-400 mt-8">Last updated: June 2026</p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
