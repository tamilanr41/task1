'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { CheckCircle, Clock, ArrowRight, Calendar, FileText, MessageCircle } from 'lucide-react';
import { Button, Card, CardContent, Badge } from '@/components/ui';
import { caseStages } from '@/lib/utils';

export default function CaseTrackingPage() {
  const { id } = useParams();

  const caseData = {
    caseNumber: 'LF/2026/AB12CD',
    title: 'Property Dispute - Sharma vs. Verma',
    status: 'Active',
    stage: 'Legal Notice Sent',
    type: 'Property Law',
    court: 'Karnataka High Court',
    opponent: 'Mr. Verma',
    nextHearing: '2026-08-15',
  };

  const currentIndex = caseStages.indexOf(caseData.stage);

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container-page max-w-4xl">
        <div className="mb-8">
          <Link href="/portal" className="text-sm text-gray-500 hover:text-primary-500 mb-2 inline-block">← Back to Dashboard</Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold font-serif text-primary-500">{caseData.title}</h1>
              <p className="text-gray-600 mt-1">Case #{caseData.caseNumber}</p>
            </div>
            <Badge variant={caseData.status === 'Active' ? 'success' : 'default'}>{caseData.status}</Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Courier-style tracking */}
            <Card><CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-6">Case Progress</h2>
              <div className="relative">
                {caseStages.map((stage, i) => (
                  <div key={stage} className="flex items-start gap-4 pb-6 relative">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold z-10 ${i <= currentIndex ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                        {i < currentIndex ? <CheckCircle className="w-5 h-5" /> : i === currentIndex ? <Clock className="w-4 h-4" /> : i + 1}
                      </div>
                      {i < caseStages.length - 1 && <div className={`w-0.5 h-full absolute top-8 ${i < currentIndex ? 'bg-primary-500' : 'bg-gray-200'}`} />}
                    </div>
                    <div className={`pb-4 ${i <= currentIndex ? '' : 'opacity-50'}`}>
                      <p className={`font-medium ${i === currentIndex ? 'text-primary-500' : 'text-gray-900'}`}>{stage}</p>
                      {i === currentIndex && <p className="text-sm text-gray-500 mt-1">In progress...</p>}
                      {i < currentIndex && <p className="text-sm text-green-600 mt-1">Completed</p>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent></Card>

            {/* Case Details */}
            <Card><CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Case Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[{ label: 'Case Type', value: caseData.type }, { label: 'Court', value: caseData.court }, { label: 'Opponent', value: caseData.opponent }, { label: 'Next Hearing', value: caseData.nextHearing }].map(item => (
                  <div key={item.label} className="p-3 bg-gray-50 rounded-lg"><p className="text-xs text-gray-500">{item.label}</p><p className="font-medium text-sm mt-0.5">{item.value}</p></div>
                ))}
              </div>
            </CardContent></Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card><CardContent className="p-4 space-y-3">
              <Link href="/portal"><Button variant="outline" className="w-full justify-start"><FileText className="w-4 h-4 mr-2" /> View Documents</Button></Link>
              <Link href="/portal"><Button variant="outline" className="w-full justify-start"><MessageCircle className="w-4 h-4 mr-2" /> Send Message</Button></Link>
              <Link href="/portal"><Button variant="outline" className="w-full justify-start">View Invoices</Button></Link>
              <Link href={`/case/${id}`}><Button variant="outline" className="w-full justify-start"><Calendar className="w-4 h-4 mr-2" /> Schedule Hearing</Button></Link>
            </CardContent></Card>
          </div>
        </div>
      </div>
    </div>
  );
}
