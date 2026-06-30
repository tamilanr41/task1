'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle, Calendar, Clock, User, FileText, ChevronRight,
  ArrowLeft, Phone, Video, Building,
} from 'lucide-react';
import {
  Button, Card, CardContent, CardHeader, CardTitle, Input, Stepper, Badge,
} from '@/components/ui';
import { practiceAreasList, lawyersData } from '@/lib/data';
import AnimatedSection from '@/lib/animation/AnimatedSection';
import { fadeUp } from '@/lib/animation/variants';

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
];

const meetingTypes = [
  { id: 'in-person', label: 'In-Person', desc: 'Visit our office', icon: Building },
  { id: 'video', label: 'Video Call', desc: 'Zoom / Google Meet', icon: Video },
  { id: 'phone', label: 'Phone Call', desc: 'Direct phone consultation', icon: Phone },
];

const steps = [
  { title: 'Practice Area', description: 'Select your legal area' },
  { title: 'Choose Lawyer', description: 'Pick an expert' },
  { title: 'Date & Time', description: 'Schedule your slot' },
  { title: 'Your Details', description: 'Tell us about you' },
  { title: 'Confirmation', description: 'Review & confirm' },
];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedLawyer, setSelectedLawyer] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [meetingType, setMeetingType] = useState('video');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', notes: '' });

  const availableLawyers = useMemo(() => {
    if (!selectedArea) return [];
    return lawyersData.filter((l) => l.practiceAreas.includes(selectedArea));
  }, [selectedArea]);

  const selectedLawyerData = useMemo(
    () => lawyersData.find((l) => l.id === selectedLawyer),
    [selectedLawyer]
  );

  const handleNext = () => setStep((s) => Math.min(s + 1, 5));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const stepStatus = (index: number) => {
    if (step > index + 1) return 'completed';
    if (step === index + 1) return 'current';
    return 'pending';
  };

  const stepperSteps = steps.map((s, i) => ({
    ...s,
    status: stepStatus(i) as 'completed' | 'current' | 'pending',
  }));

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-5"
          >
            <div className="mb-2">
              <h2 className="font-serif text-xl font-bold text-primary-500">
                Select Practice Area
              </h2>
              <p className="text-sm text-surface-500">
                Choose the legal area that best describes your matter.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {practiceAreasList.map((area) => (
                <button
                  key={area.slug}
                  type="button"
                  onClick={() => { setSelectedArea(area.slug); setSelectedLawyer(''); }}
                  className={`flex items-start gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                    selectedArea === area.slug
                      ? 'border-primary-500 bg-primary-50 shadow-md'
                      : 'border-surface-200 hover:border-primary-300 hover:bg-surface-50'
                  }`}
                >
                  <div className={`rounded-lg p-2 transition-colors ${
                    selectedArea === area.slug ? 'bg-primary-500 text-white' : 'bg-surface-100 text-surface-500'
                  }`}>
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-surface-900">{area.title}</p>
                    <p className="text-xs text-surface-500 mt-0.5 line-clamp-1">{area.description}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex justify-end">
              <Button onClick={handleNext} disabled={!selectedArea}>
                Continue <ChevronRight className="ml-1.5 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-5"
          >
            <div className="mb-2">
              <h2 className="font-serif text-xl font-bold text-primary-500">
                Choose Your Lawyer
              </h2>
              <p className="text-sm text-surface-500">
                Select from our expert attorneys specializing in this area.
              </p>
            </div>
            {availableLawyers.length === 0 ? (
              <div className="rounded-xl bg-surface-50 p-8 text-center">
                <User className="mx-auto h-10 w-10 text-surface-300" />
                <p className="mt-3 font-medium text-surface-600">
                  No lawyers available for this area
                </p>
                <Button variant="outline" className="mt-3" onClick={handleBack}>
                  Choose a different area
                </Button>
              </div>
            ) : (
              <div className="grid gap-3">
                {availableLawyers.map((lawyer) => (
                  <button
                    key={lawyer.id}
                    type="button"
                    onClick={() => { setSelectedLawyer(lawyer.id); }}
                    className={`flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${
                      selectedLawyer === lawyer.id
                        ? 'border-primary-500 bg-primary-50 shadow-md'
                        : 'border-surface-200 hover:border-primary-300 hover:bg-surface-50'
                    }`}
                  >
                    <img
                      src={lawyer.avatar}
                      alt={lawyer.name}
                      className="h-14 w-14 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-surface-900">{lawyer.name}</p>
                      <p className="text-xs text-surface-500">
                        {lawyer.experience} yrs exp &middot; {lawyer.practiceAreas.length} areas
                      </p>
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {lawyer.languages.slice(0, 2).map((l) => (
                          <Badge key={l} variant="default" size="sm">{l}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-accent-500">&#8377;{lawyer.consultationFee}</p>
                      <p className="text-2xs text-surface-400">per session</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="mr-1.5 h-4 w-4" /> Back
              </Button>
              <Button onClick={handleNext} disabled={!selectedLawyer}>
                Continue <ChevronRight className="ml-1.5 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-5"
          >
            <div className="mb-2">
              <h2 className="font-serif text-xl font-bold text-primary-500">
                Select Date & Time
              </h2>
              <p className="text-sm text-surface-500">
                Choose when you would like to schedule your consultation.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-surface-700">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full rounded-lg border border-surface-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-surface-700">
                  Available Time Slots
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedTime(t)}
                      className={`rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                        selectedTime === t
                          ? 'border-primary-500 bg-primary-500 text-white shadow-md'
                          : 'border-surface-200 text-surface-600 hover:border-primary-300 hover:bg-primary-50'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <label className="mb-3 block text-sm font-medium text-surface-700">
                Meeting Type
              </label>
              <div className="grid gap-3 sm:grid-cols-3">
                {meetingTypes.map((m) => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMeetingType(m.id)}
                      className={`rounded-xl border-2 p-4 text-center transition-all ${
                        meetingType === m.id
                          ? 'border-primary-500 bg-primary-50 shadow-md'
                          : 'border-surface-200 hover:border-primary-300'
                      }`}
                    >
                      <Icon className="mx-auto h-6 w-6 text-primary-500" />
                      <p className="mt-1 font-medium text-sm text-surface-900">{m.label}</p>
                      <p className="text-xs text-surface-500">{m.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="mr-1.5 h-4 w-4" /> Back
              </Button>
              <Button onClick={handleNext} disabled={!selectedDate || !selectedTime}>
                Continue <ChevronRight className="ml-1.5 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step4"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-5"
          >
            <div className="mb-2">
              <h2 className="font-serif text-xl font-bold text-primary-500">
                Your Details
              </h2>
              <p className="text-sm text-surface-500">
                Provide your contact information so we can confirm the appointment.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                label="Full Name"
                placeholder="Your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                label="Email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <Input
                label="Phone"
                type="tel"
                placeholder="Your phone number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
              <div>
                <label className="mb-1.5 block text-sm font-medium text-surface-700">
                  Practice Area
                </label>
                <div className="h-10 flex items-center rounded-lg border border-surface-200 bg-surface-50 px-4 text-sm text-surface-600">
                  {practiceAreasList.find((a) => a.slug === selectedArea)?.title || 'Not selected'}
                </div>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-surface-700">
                Notes (Optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full rounded-lg border border-surface-200 bg-white px-4 py-3 text-sm text-surface-900 placeholder:text-surface-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                placeholder="Brief description of your legal matter..."
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="mr-1.5 h-4 w-4" /> Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!formData.name || !formData.email || !formData.phone}
              >
                Review Booking <ChevronRight className="ml-1.5 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            key="step5"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-5"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success-100"
              >
                <CheckCircle className="h-8 w-8 text-success-500" />
              </motion.div>
              <h2 className="font-serif text-2xl font-bold text-primary-500">
                Almost Done!
              </h2>
              <p className="mt-1 text-sm text-surface-500">
                Please review your booking details before confirming.
              </p>
            </div>

            <Card variant="bordered" padding="md">
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-surface-500">Practice Area</span>
                  <span className="font-medium text-surface-800">
                    {practiceAreasList.find((a) => a.slug === selectedArea)?.title}
                  </span>
                </div>
                <div className="h-px bg-surface-100" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-surface-500">Lawyer</span>
                  <span className="font-medium text-surface-800">
                    {selectedLawyerData?.name}
                  </span>
                </div>
                <div className="h-px bg-surface-100" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-surface-500">Date</span>
                  <span className="font-medium text-surface-800">{selectedDate}</span>
                </div>
                <div className="h-px bg-surface-100" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-surface-500">Time</span>
                  <span className="font-medium text-surface-800">{selectedTime}</span>
                </div>
                <div className="h-px bg-surface-100" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-surface-500">Meeting Type</span>
                  <span className="font-medium text-surface-800">
                    {meetingTypes.find((m) => m.id === meetingType)?.label}
                  </span>
                </div>
                <div className="h-px bg-surface-100" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-surface-500">Name</span>
                  <span className="font-medium text-surface-800">{formData.name}</span>
                </div>
                <div className="h-px bg-surface-100" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-surface-500">Email</span>
                  <span className="font-medium text-surface-800">{formData.email}</span>
                </div>
                <div className="h-px bg-surface-100" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-surface-500">Phone</span>
                  <span className="font-medium text-surface-800">{formData.phone}</span>
                </div>
                {formData.notes && (
                  <>
                    <div className="h-px bg-surface-100" />
                    <div className="text-sm">
                      <span className="text-surface-500">Notes</span>
                      <p className="mt-1 text-surface-700">{formData.notes}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <div className="rounded-xl bg-primary-50 p-4 text-sm text-primary-700">
              <div className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-success-500" />
                <div>
                  <p className="font-medium">You will receive:</p>
                  <ul className="mt-1 list-inside list-disc text-primary-600 space-y-0.5">
                    <li>Confirmation email with meeting details</li>
                    <li>Calendar invite (Google / Outlook)</li>
                    <li>Reminder 24 hours before</li>
                    <li>Video meeting link (if applicable)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={handleBack} className="flex-1">
                <ArrowLeft className="mr-1.5 h-4 w-4" /> Edit Details
              </Button>
              <Button onClick={() => setStep(6)} className="flex-1">
                <CheckCircle className="mr-2 h-4 w-4" /> Confirm & Book
              </Button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (step === 6) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="w-full max-w-lg"
        >
          <Card variant="elevated" padding="lg" className="text-center">
            <CardContent>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.2 }}
                className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success-100"
              >
                <CheckCircle className="h-10 w-10 text-success-500" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="font-serif text-2xl font-bold text-primary-500">
                  Consultation Booked!
                </h2>
                <p className="mt-2 text-sm text-surface-500">
                  Your consultation has been confirmed. Check your email for the meeting
                  details and calendar invite.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-6 space-y-2 rounded-xl bg-surface-50 p-4 text-left text-sm"
              >
                <div className="flex justify-between">
                  <span className="text-surface-500">Lawyer</span>
                  <span className="font-medium">{selectedLawyerData?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-surface-500">Date</span>
                  <span className="font-medium">{selectedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-surface-500">Time</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-surface-500">Meeting</span>
                  <span className="font-medium">
                    {meetingTypes.find((m) => m.id === meetingType)?.label}
                  </span>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-6"
              >
                <Link href="/">
                  <Button variant="outline" className="w-full">
                    Back to Home
                  </Button>
                </Link>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-surface-50 py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection variant="fadeUp">
          <div className="mb-8 text-center">
            <motion.span className="mb-3 inline-block rounded-full bg-accent-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-600">
              Schedule
            </motion.span>
            <h1 className="font-serif text-3xl font-bold text-primary-500 md:text-4xl">
              Book a Consultation
            </h1>
            <p className="mt-2 text-surface-500">
              Schedule a consultation with our expert legal team in just a few steps.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection variant="fadeUp" delay={100}>
          <div className="mb-8">
            <Stepper steps={stepperSteps} currentStep={step} />
          </div>
        </AnimatedSection>

        <AnimatedSection variant="fadeUp" delay={200}>
          <Card variant="elevated" padding="lg" className="min-h-[400px]">
            <CardContent>
              <AnimatePresence mode="wait">
                {renderStep()}
              </AnimatePresence>
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection variant="fadeUp" delay={300}>
          <div className="mt-8 text-center text-xs text-surface-400">
            <p>By booking, you agree to our Terms of Service and Privacy Policy.</p>
            <p className="mt-1">
              Your information is kept confidential and secure.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
