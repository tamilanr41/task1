'use client';
import AnimatedSection from '@/lib/animation/AnimatedSection';

export default function DisclaimerPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-primary py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/40 to-primary-500/70" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection delay={100}>
            <h1 className="font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">Disclaimer</h1>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">Important legal information regarding our website and services.</p>
          </AnimatedSection>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="space-y-6 text-surface-600">
              <h2 className="text-xl font-bold text-primary-500">General Information</h2>
              <p>The content on this website is for informational purposes only and does not constitute legal advice. No attorney-client relationship is formed by viewing this website.</p>
              <h2 className="text-xl font-bold text-primary-500">No Guarantee of Results</h2>
              <p>Past case results do not guarantee future outcomes. Each legal matter is unique and depends on its specific facts and circumstances.</p>
              <h2 className="text-xl font-bold text-primary-500">Accuracy</h2>
              <p>While we strive to keep information accurate and up-to-date, we make no representations or warranties about the completeness or accuracy of the content.</p>
              <h2 className="text-xl font-bold text-primary-500">Third-Party Links</h2>
              <p>Our website may contain links to third-party sites. We are not responsible for the content or practices of these websites.</p>
              <h2 className="text-xl font-bold text-primary-500">Contact</h2>
              <p>For questions about this disclaimer, please contact us at info@legacylegal.in</p>
              <p className="text-sm text-surface-400 mt-8">Last updated: June 2026</p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
