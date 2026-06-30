'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileSignature, Download, CheckCircle, Clock, AlertCircle,
  Eye, Send, Pen, Type, RotateCcw, ChevronRight, Shield,
  UserCheck, FileText
} from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Tabs, type Tab } from '@/components/ui/tabs';
import { EmptyState } from '@/components/ui/empty-state';
import { AnimatedSection } from '@/lib/animation';

interface EsignDocument {
  id: string;
  title: string;
  sender: string;
  sentAt: string;
  status: 'pending' | 'signed' | 'declined' | 'expired';
  signedAt?: string;
  parties: string[];
}

const pendingDocs: EsignDocument[] = [
  { id: 'es-001', title: 'NDA - TechStart Acquisition', sender: 'Adv. Rajesh Sharma', sentAt: '2026-05-20T10:00:00', status: 'pending', parties: ['TechStart Pvt Ltd', 'Sharma Enterprises'] },
  { id: 'es-002', title: 'Employment Contract - Senior Associate', sender: 'HR Department', sentAt: '2026-05-19T14:30:00', status: 'pending', parties: ['Legacy Legal Partners', 'Rahul Verma'] },
  { id: 'es-003', title: 'Settlement Agreement - Patel Case', sender: 'Adv. Priya Patel', sentAt: '2026-05-18T09:15:00', status: 'pending', parties: ['Anita Patel', 'Vikram Singh'] },
];

const completedDocs: EsignDocument[] = [
  { id: 'es-004', title: 'Retainer Agreement - Mehta Holdings', sender: 'Adv. Rajesh Sharma', sentAt: '2026-05-15T11:00:00', status: 'signed', signedAt: '2026-05-16T15:30:00', parties: ['Mehta Holdings', 'Legacy Legal Partners'] },
  { id: 'es-005', title: 'Confidentiality Agreement - Global Corp', sender: 'Adv. Arun Krishnan', sentAt: '2026-05-12T16:00:00', status: 'signed', signedAt: '2026-05-13T10:20:00', parties: ['Global Corp India', 'Legacy Legal Partners'] },
  { id: 'es-006', title: 'Power of Attorney - Sharma Family Trust', sender: 'Adv. Sneha Kapoor', sentAt: '2026-05-10T08:45:00', status: 'signed', signedAt: '2026-05-11T14:10:00', parties: ['Sharma Family Trust', 'Legacy Legal Partners'] },
  { id: 'es-007', title: 'Lease Agreement - Office Space', sender: 'Admin', sentAt: '2026-04-28T13:00:00', status: 'declined', signedAt: '2026-04-29T09:00:00', parties: ['Legacy Legal Partners', 'Sigma Properties'] },
];

const auditTrail = [
  { action: 'Document Created', user: 'Adv. Rajesh Sharma', time: '2026-05-20T10:00:00', ip: '192.168.1.101' },
  { action: 'Email Sent to Recipient', user: 'System', time: '2026-05-20T10:01:00', ip: '-' },
  { action: 'Document Viewed', user: 'Rahul Mehta (TechStart)', time: '2026-05-20T11:30:00', ip: '203.0.113.45' },
  { action: 'Signature Applied', user: 'Rahul Mehta (TechStart)', time: '2026-05-20T11:35:00', ip: '203.0.113.45' },
  { action: 'Signature Applied', user: 'Adv. Rajesh Sharma', time: '2026-05-20T14:20:00', ip: '192.168.1.101' },
  { action: 'Document Completed', user: 'System', time: '2026-05-20T14:21:00', ip: '-' },
];

export default function EsignaturePage() {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedDoc, setSelectedDoc] = useState<EsignDocument | null>(null);
  const [signMode, setSignMode] = useState<'draw' | 'type'>('draw');
  const [typedSignature, setTypedSignature] = useState('');
  const [showSignModal, setShowSignModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [pdfView, setPdfView] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const tabs: Tab[] = [
    { id: 'pending', label: 'Pending', count: pendingDocs.length },
    { id: 'completed', label: 'Completed', count: completedDocs.length },
  ];

  useEffect(() => {
    if (signMode === 'draw' && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#1a365d';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, [signMode, showSignModal]);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <AnimatedSection>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-surface-900 font-serif">E-Signatures</h1>
              <p className="text-surface-500 mt-1">Digitally sign and manage documents securely</p>
            </div>
            <Button variant="primary" size="lg" onClick={() => setShowRequestModal(true)}>
              <Send className="w-4 h-4" />
              Request Signature
            </Button>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="pills" />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'pending' && pendingDocs.length === 0 && (
              <EmptyState icon={<FileSignature className="w-10 h-10" />} title="No pending documents" description="All documents have been signed" />
            )}
            {activeTab === 'completed' && completedDocs.length === 0 && (
              <EmptyState icon={<FileSignature className="w-10 h-10" />} title="No completed documents" description="Signed documents will appear here" />
            )}

            <AnimatePresence mode="wait">
              <div className="space-y-3">
                {(activeTab === 'pending' ? pendingDocs : completedDocs).map((doc, idx) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white rounded-2xl border border-surface-100 p-5 hover:shadow-soft transition-shadow cursor-pointer group"
                    onClick={() => { setSelectedDoc(doc); setPdfView(true); }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className={cn(
                          'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
                          doc.status === 'signed' ? 'bg-success-50 text-success-600' :
                          doc.status === 'pending' ? 'bg-warning-50 text-warning-600' :
                          doc.status === 'declined' ? 'bg-danger-50 text-danger-600' : 'bg-surface-100 text-surface-500'
                        )}>
                          {doc.status === 'signed' ? <CheckCircle className="w-6 h-6" /> :
                           doc.status === 'pending' ? <Clock className="w-6 h-6" /> :
                           doc.status === 'declined' ? <AlertCircle className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                        </div>
                        <div>
                          <h3 className="font-semibold text-surface-900">{doc.title}</h3>
                          <p className="text-sm text-surface-500 mt-1">From: {doc.sender}</p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-surface-400">
                            <span>Sent: {formatDate(doc.sentAt, 'short')}</span>
                            <span>&middot;</span>
                            <span>{doc.parties.length} parties</span>
                            {doc.signedAt && (
                              <>
                                <span>&middot;</span>
                                <span className="text-success-600">Signed: {formatDate(doc.signedAt, 'short')}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Badge variant={
                          doc.status === 'signed' ? 'success' :
                          doc.status === 'pending' ? 'warning' :
                          doc.status === 'declined' ? 'danger' : 'default'
                        } size="sm">{doc.status}</Badge>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="sm" icon={<ChevronRight className="w-4 h-4" />} />
                        </div>
                      </div>
                    </div>
                    {doc.status === 'pending' && (
                      <div className="mt-4 pt-4 border-t border-surface-100 flex gap-2">
                        <Button variant="primary" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedDoc(doc); setShowSignModal(true); }}>
                          <FileSignature className="w-4 h-4" />
                          Sign Now
                        </Button>
                        <Button variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </div>

          <div className="space-y-6">
            <AnimatedSection>
              <Card>
                <CardHeader>
                  <CardTitle>Signature Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {auditTrail.slice(0, 4).map((entry, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary-500 mt-1.5 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-surface-700">{entry.action}</p>
                          <p className="text-xs text-surface-400">{entry.user} &middot; {formatDate(entry.time, 'full')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection>
              <Card variant="default" className="bg-primary-50 border-primary-100">
                <CardContent className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-primary-900">Aadhaar-compliant eSign</p>
                    <p className="text-xs text-primary-700 mt-1">All signatures are legally binding under the Indian IT Act, 2000</p>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </div>

      <Modal isOpen={showSignModal} onClose={() => setShowSignModal(false)} title="Sign Document" size="xl">
        <div className="space-y-6">
          {selectedDoc && (
            <div className="bg-surface-50 rounded-xl p-4">
              <p className="font-semibold text-surface-900">{selectedDoc.title}</p>
              <p className="text-sm text-surface-500">Parties: {selectedDoc.parties.join(', ')}</p>
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={() => setSignMode('draw')}
              className={cn('flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors', signMode === 'draw' ? 'bg-primary-500 text-white' : 'bg-surface-100 text-surface-600')}
            >
              <Pen className="w-4 h-4" /> Draw
            </button>
            <button
              onClick={() => setSignMode('type')}
              className={cn('flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors', signMode === 'type' ? 'bg-primary-500 text-white' : 'bg-surface-100 text-surface-600')}
            >
              <Type className="w-4 h-4" /> Type
            </button>
          </div>

          {signMode === 'draw' ? (
            <div className="space-y-3">
              <div className="border-2 border-dashed border-surface-300 rounded-2xl overflow-hidden bg-white">
                <canvas
                  ref={canvasRef}
                  className="w-full h-40 cursor-crosshair touch-none"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
              </div>
              <Button variant="ghost" size="sm" onClick={clearCanvas}>
                <RotateCcw className="w-4 h-4" /> Clear
              </Button>
            </div>
          ) : (
            <Input
              value={typedSignature}
              onChange={(e) => setTypedSignature(e.target.value)}
              placeholder="Type your full name as signature"
              className="font-serif text-lg"
            />
          )}

          <div className="bg-surface-50 rounded-xl p-4">
            <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-3">Audit Trail</p>
            <div className="space-y-2">
              {auditTrail.map((entry, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-1 shrink-0" />
                  <div>
                    <span className="font-medium text-surface-700">{entry.action}</span>
                    <span className="text-surface-400"> by {entry.user} ({entry.ip}) at {formatDate(entry.time, 'full')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" fullWidth onClick={() => setShowSignModal(false)}>Cancel</Button>
            <Button variant="primary" fullWidth onClick={() => { setShowSignModal(false); }}>
              <FileSignature className="w-4 h-4" />
              Apply Signature
            </Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showRequestModal} onClose={() => setShowRequestModal(false)} title="Request Signature" size="lg">
        <div className="space-y-5">
          <div>
            <Input label="Recipient Name" placeholder="Full name of signer" required />
          </div>
          <div>
            <Input label="Recipient Email" type="email" placeholder="email@example.com" required />
          </div>
          <div>
            <p className="text-sm font-medium text-surface-700 mb-1.5">Document</p>
            <div className="border-2 border-dashed border-surface-200 rounded-xl p-8 text-center">
              <FileText className="w-10 h-10 text-surface-300 mx-auto mb-3" />
              <p className="text-sm text-surface-500">Drag and drop a document, or <span className="text-primary-500 font-medium">browse</span></p>
              <p className="text-xs text-surface-400 mt-1">PDF, DOCX up to 50MB</p>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" fullWidth onClick={() => setShowRequestModal(false)}>Cancel</Button>
            <Button variant="primary" fullWidth onClick={() => setShowRequestModal(false)}>
              <Send className="w-4 h-4" />
              Send for Signature
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
