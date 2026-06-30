'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X, Cookie, Check } from 'lucide-react';

export default function CookiesConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-surface-200/80 shadow-elevated p-5 md:p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center shrink-0 mt-0.5">
                <Cookie className="w-5 h-5 text-accent-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-primary-500">Cookie Preferences</h3>
                    <p className="text-xs text-surface-500 mt-1 leading-relaxed">
                      We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By clicking &ldquo;Accept All&rdquo;, you consent to our use of cookies.
                    </p>
                  </div>
                  <button onClick={() => setVisible(false)} className="w-8 h-8 rounded-full bg-surface-100 flex items-center justify-center text-surface-400 hover:text-surface-600 hover:bg-surface-200 transition-all shrink-0">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <AnimatePresence>
                  {showDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 mt-3 border-t border-surface-100">
                        <div className="grid sm:grid-cols-2 gap-3">
                          {[
                            { label: 'Essential', desc: 'Required for basic site functions', always: true },
                            { label: 'Analytics', desc: 'Help us improve with usage data' },
                            { label: 'Preferences', desc: 'Remember your settings' },
                            { label: 'Marketing', desc: 'Personalized content & ads' },
                          ].map((c) => (
                            <div key={c.label} className="flex items-center justify-between p-3 bg-surface-50 rounded-xl">
                              <div>
                                <span className="text-xs font-semibold text-primary-500">{c.label}</span>
                                <p className="text-2xs text-surface-400">{c.desc}</p>
                              </div>
                              {c.always ? (
                                <span className="text-2xs text-surface-400 font-medium">Always On</span>
                              ) : (
                                <div className="w-8 h-5 rounded-full bg-accent-500 relative cursor-pointer">
                                  <div className="w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 right-0.5 shadow-sm" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-surface-100">
                  <button
                    onClick={accept}
                    className="px-5 py-2.5 bg-accent-500 hover:bg-accent-600 text-white text-xs font-semibold rounded-xl shadow-button transition-all inline-flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" /> Accept All
                  </button>
                  <button
                    onClick={decline}
                    className="px-5 py-2.5 bg-white text-primary-500 text-xs font-semibold rounded-xl border border-surface-200 hover:border-surface-300 transition-all"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="px-5 py-2.5 text-surface-500 text-xs font-medium hover:text-primary-500 transition-all"
                  >
                    {showDetails ? 'Hide Details' : 'Customize'}
                  </button>
                  <Link href="/cookies" className="text-2xs text-surface-400 hover:text-accent-500 transition-all underline-offset-2 hover:underline ml-auto">
                    Cookie Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
