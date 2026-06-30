'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Card, CardContent, Badge } from '@/components/ui';
import { caseStages } from '@/lib/utils';

export default function PortalCaseDetailPage() {
  const { id } = useParams();
  const caseData = { caseNumber: 'LF/2026/AB12CD', title: 'Property Dispute - Sharma vs. Verma', status: 'Active', stage: 'Legal Notice Sent', type: 'Property Law', court: 'Karnataka High Court', opponent: 'Mr. Verma', nextHearing: '2026-08-15', lawyer: 'Adv. Vikram Desai' };
  const currentIndex = caseStages.indexOf(caseData.stage);

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container-page max-w-4xl">
        <Link href="/portal" className="text-sm text-gray-500 hover:text-primary-500 mb-4 inline-block">← Back to Portal</Link>
        <div className="flex items-center justify-between mb-6">
          <div><h1 className="text-2xl font-bold font-serif text-primary-500">{caseData.title}</h1><p className="text-gray-500 text-sm">Case #{caseData.caseNumber}</p></div>
          <Badge variant="success">{caseData.status}</Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card><CardContent className="p-6">
              <h2 className="font-semibold mb-4">Case Progress</h2>
              <div className="relative">
                {caseStages.map((stage, i) => (
                  <div key={stage} className="flex items-start gap-3 pb-4">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold z-10 shrink-0 ${i <= currentIndex ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-400'}`}>{i <= currentIndex ? '✓' : i + 1}</div>
                    <div><p className={`text-sm font-medium ${i === currentIndex ? 'text-primary-500' : 'text-gray-900'}`}>{stage}</p>{i === currentIndex && <p className="text-xs text-gray-500">In progress</p>}</div>
                  </div>
                ))}
              </div>
            </CardContent></Card>

            <Card><CardContent className="p-6">
              <h2 className="font-semibold mb-4">Case Details</h2>
              <div className="grid grid-cols-2 gap-3">
                {[{ label: 'Assigned Lawyer', value: caseData.lawyer }, { label: 'Case Type', value: caseData.type }, { label: 'Court', value: caseData.court }, { label: 'Opponent', value: caseData.opponent }, { label: 'Next Hearing', value: caseData.nextHearing }].map(item => (
                  <div key={item.label} className="p-3 bg-gray-50 rounded-lg"><p className="text-xs text-gray-500">{item.label}</p><p className="font-medium text-sm">{item.value}</p></div>
                ))}
              </div>
            </CardContent></Card>
          </div>

          <div className="space-y-3">
            {[{ label: 'Documents', href: '/portal' }, { label: 'Messages', href: '/portal' }, { label: 'Invoices', href: '/portal' }, { label: 'Schedule Meeting', href: '/booking' }].map(item => (
              <Link key={item.label} href={item.href}><Card className="hover:shadow-md transition"><CardContent className="p-4 text-sm font-medium text-primary-500">{item.label}</CardContent></Card></Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
