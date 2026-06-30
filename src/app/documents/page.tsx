'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, File, Image, FileSpreadsheet, Film, Archive,
  Folder, Upload, Download, Search, Grid3X3, List,
  Clock, MoreHorizontal, Star, Trash2, Share2, Plus,
  FileSignature, FileCheck, AlertCircle
} from 'lucide-react';
import { cn, formatDate, truncate, formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, type Tab } from '@/components/ui/tabs';
import { EmptyState } from '@/components/ui/empty-state';
import { FileUpload } from '@/components/ui/file-upload';
import { Modal } from '@/components/ui/modal';
import { SearchBar } from '@/components/ui/search-bar';
import { AnimatedSection } from '@/lib/animation';

type ViewMode = 'grid' | 'list';

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'xls' | 'img' | 'video' | 'zip' | 'other';
  category: string;
  size: number;
  uploadedAt: string;
  status: 'final' | 'draft' | 'review' | 'archived';
  starred: boolean;
  tags: string[];
}

const allDocuments: Document[] = [
  { id: 'd1', name: 'NDA - TechStart Acquisition.pdf', type: 'pdf', category: 'Contracts', size: 2450000, uploadedAt: '2026-05-15T10:30:00', status: 'final', starred: true, tags: ['nda', 'corporate'] },
  { id: 'd2', name: 'Employment Contract - Senior Associate.docx', type: 'doc', category: 'Employment', size: 1800000, uploadedAt: '2026-05-14T14:00:00', status: 'draft', starred: false, tags: ['employment'] },
  { id: 'd3', name: 'Case Brief - State vs Kumar.pdf', type: 'pdf', category: 'Litigation', size: 3200000, uploadedAt: '2026-05-13T09:15:00', status: 'final', starred: true, tags: ['criminal', 'brief'] },
  { id: 'd4', name: 'Property Title Deed - Sharma.pdf', type: 'pdf', category: 'Property', size: 5600000, uploadedAt: '2026-05-12T16:45:00', status: 'final', starred: false, tags: ['property', 'deed'] },
  { id: 'd5', name: 'Financial Statements Q1 2026.xlsx', type: 'xls', category: 'Financial', size: 980000, uploadedAt: '2026-05-11T11:30:00', status: 'review', starred: false, tags: ['finance'] },
  { id: 'd6', name: 'Evidence Photos - Crime Scene.zip', type: 'zip', category: 'Evidence', size: 45000000, uploadedAt: '2026-05-10T08:00:00', status: 'final', starred: false, tags: ['evidence'] },
  { id: 'd7', name: 'Client Intake Form - Patel.pdf', type: 'pdf', category: 'Forms', size: 1200000, uploadedAt: '2026-05-09T13:20:00', status: 'final', starred: true, tags: ['intake'] },
  { id: 'd8', name: 'Court Order - June 2026.pdf', type: 'pdf', category: 'Legal', size: 890000, uploadedAt: '2026-05-08T15:45:00', status: 'final', starred: false, tags: ['court'] },
  { id: 'd9', name: 'Meeting Notes - Client Consultation.docx', type: 'doc', category: 'Notes', size: 650000, uploadedAt: '2026-05-07T10:00:00', status: 'draft', starred: false, tags: ['meeting'] },
  { id: 'd10', name: 'Invoice Template - Legal Services.xlsx', type: 'xls', category: 'Templates', size: 450000, uploadedAt: '2026-05-06T09:30:00', status: 'final', starred: false, tags: ['invoice'] },
];

const categories = [
  { id: 'all', label: 'All Documents', count: allDocuments.length, icon: <Folder className="w-4 h-4" /> },
  { id: 'Contracts', label: 'Contracts', count: allDocuments.filter(d => d.category === 'Contracts').length, icon: <FileSignature className="w-4 h-4" /> },
  { id: 'Litigation', label: 'Litigation', count: allDocuments.filter(d => d.category === 'Litigation').length, icon: <FileCheck className="w-4 h-4" /> },
  { id: 'Employment', label: 'Employment', count: allDocuments.filter(d => d.category === 'Employment').length, icon: <FileText className="w-4 h-4" /> },
  { id: 'Property', label: 'Property', count: allDocuments.filter(d => d.category === 'Property').length, icon: <Folder className="w-4 h-4" /> },
  { id: 'Financial', label: 'Financial', count: allDocuments.filter(d => d.category === 'Financial').length, icon: <FileSpreadsheet className="w-4 h-4" /> },
  { id: 'Evidence', label: 'Evidence', count: allDocuments.filter(d => d.category === 'Evidence').length, icon: <Archive className="w-4 h-4" /> },
  { id: 'Forms', label: 'Forms', count: allDocuments.filter(d => d.category === 'Forms').length, icon: <File className="w-4 h-4" /> },
];

const typeIcons: Record<string, React.ReactNode> = {
  pdf: <FileText className="w-5 h-5" />,
  doc: <FileText className="w-5 h-5" />,
  xls: <FileSpreadsheet className="w-5 h-5" />,
  img: <Image className="w-5 h-5" />,
  video: <Film className="w-5 h-5" />,
  zip: <Archive className="w-5 h-5" />,
  other: <File className="w-5 h-5" />,
};

const typeColors: Record<string, string> = {
  pdf: 'text-danger-500 bg-danger-50',
  doc: 'text-blue-500 bg-blue-50',
  xls: 'text-success-500 bg-success-50',
  img: 'text-purple-500 bg-purple-50',
  video: 'text-cyan-500 bg-cyan-50',
  zip: 'text-amber-500 bg-amber-50',
  other: 'text-surface-500 bg-surface-100',
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function DocumentsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const filteredDocs = useMemo(() => {
    let docs = allDocuments;
    if (activeCategory !== 'all') docs = docs.filter(d => d.category === activeCategory);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      docs = docs.filter(d => d.name.toLowerCase().includes(q) || d.tags.some(t => t.includes(q)));
    }
    return docs;
  }, [activeCategory, searchQuery]);

  const recentDocs = useMemo(() => {
    return [...allDocuments].sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()).slice(0, 4);
  }, []);

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <AnimatedSection>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-surface-900 font-serif">Document Vault</h1>
              <p className="text-surface-500 mt-1">Manage, organize, and access all your legal documents</p>
            </div>
            <Button variant="primary" size="lg" onClick={() => setShowUploadModal(true)}>
              <Upload className="w-4 h-4" />
              Upload Document
            </Button>
          </div>
        </AnimatedSection>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-56 shrink-0">
            <div className="hidden lg:block space-y-1">
              <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-surface-400 uppercase tracking-wider">
                <Folder className="w-3.5 h-3.5" />
                Categories
              </div>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all text-left',
                    activeCategory === cat.id
                      ? 'bg-primary-50 text-primary-700 font-semibold'
                      : 'text-surface-600 hover:bg-surface-100'
                  )}
                >
                  <span className={cn('w-4 h-4', activeCategory === cat.id ? 'text-primary-500' : 'text-surface-400')}>{cat.icon}</span>
                  <span className="flex-1">{cat.label}</span>
                  <span className={cn(
                    'text-xs px-1.5 py-0.5 rounded-full',
                    activeCategory === cat.id ? 'bg-primary-100 text-primary-600' : 'bg-surface-100 text-surface-500'
                  )}>{cat.count}</span>
                </button>
              ))}
            </div>

            <div className="lg:hidden">
              <Tabs
                tabs={categories.map(c => ({ id: c.id, label: c.label, count: c.count }))}
                activeTab={activeCategory}
                onChange={setActiveCategory}
                variant="pills"
                size="sm"
              />
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1 w-full">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search documents by name or tag..."
                />
              </div>
              <div className="flex items-center gap-2 bg-white rounded-xl border border-surface-200 p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn('p-2 rounded-lg transition-colors', viewMode === 'grid' ? 'bg-primary-500 text-white' : 'text-surface-400 hover:text-surface-600')}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn('p-2 rounded-lg transition-colors', viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-surface-400 hover:text-surface-600')}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {filteredDocs.length === 0 ? (
              <EmptyState
                icon={<FileText className="w-10 h-10" />}
                title="No documents found"
                description={searchQuery ? 'Try adjusting your search query' : 'Upload your first document to get started'}
                action={!searchQuery ? { label: 'Upload Document', onClick: () => setShowUploadModal(true) } : undefined}
              />
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredDocs.map((doc, idx) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                  >
                    <Card variant="interactive" padding="none" className="group">
                      <div className="p-5 space-y-4">
                        <div className="flex items-start justify-between">
                          <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', typeColors[doc.type])}>
                            {typeIcons[doc.type]}
                          </div>
                          <button className="text-surface-300 hover:text-accent-500 transition-colors">
                            <Star className={cn('w-4 h-4', doc.starred && 'fill-accent-500 text-accent-500')} />
                          </button>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-surface-900 line-clamp-2 leading-snug">{doc.name}</p>
                          <div className="flex items-center gap-2 mt-2 text-xs text-surface-400">
                            <span>{formatFileSize(doc.size)}</span>
                            <span>&middot;</span>
                            <span>{formatDate(doc.uploadedAt, 'short')}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge variant={doc.status === 'final' ? 'success' : doc.status === 'draft' ? 'warning' : doc.status === 'review' ? 'info' : 'default'} size="sm">
                            {doc.status}
                          </Badge>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 rounded-lg text-surface-400 hover:text-surface-700 hover:bg-surface-100"><Download className="w-3.5 h-3.5" /></button>
                            <button className="p-1.5 rounded-lg text-surface-400 hover:text-surface-700 hover:bg-surface-100"><Share2 className="w-3.5 h-3.5" /></button>
                            <button className="p-1.5 rounded-lg text-surface-400 hover:text-danger-500 hover:bg-danger-50"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredDocs.map((doc, idx) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.02 }}
                    className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-surface-100 hover:shadow-soft transition-shadow group"
                  >
                    <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', typeColors[doc.type])}>
                      {typeIcons[doc.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-surface-900 truncate">{doc.name}</p>
                        <Badge variant={doc.status === 'final' ? 'success' : doc.status === 'draft' ? 'warning' : 'info'} size="sm">{doc.status}</Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-surface-400 mt-0.5">
                        <span>{formatFileSize(doc.size)}</span>
                        <span>&middot;</span>
                        <span>{doc.category}</span>
                        <span>&middot;</span>
                        <span>{formatDate(doc.uploadedAt, 'short')}</span>
                        {doc.tags.map(tag => (
                          <Badge key={tag} variant="default" size="sm">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 rounded-lg text-surface-400 hover:text-accent-500"><Star className={cn('w-4 h-4', doc.starred && 'fill-accent-500 text-accent-500')} /></button>
                      <button className="p-2 rounded-lg text-surface-400 hover:text-surface-700 hover:bg-surface-100"><Download className="w-4 h-4" /></button>
                      <button className="p-2 rounded-lg text-surface-400 hover:text-surface-700 hover:bg-surface-100"><MoreHorizontal className="w-4 h-4" /></button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            <AnimatedSection>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Documents</CardTitle>
                  <CardDescription>Latest additions to your vault</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {recentDocs.map((doc) => (
                      <div key={doc.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-50 transition-colors cursor-pointer">
                        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', typeColors[doc.type])}>
                          {typeIcons[doc.type]}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-surface-900 truncate">{doc.name}</p>
                          <p className="text-xs text-surface-400">{formatDate(doc.uploadedAt, 'short')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </div>

      <Modal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} title="Upload Document" size="lg">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-surface-700 mb-2">Category</p>
              <select className="w-full px-3 py-2.5 text-sm rounded-lg border border-surface-200 bg-white text-surface-700 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none">
                <option>Contracts</option>
                <option>Litigation</option>
                <option>Employment</option>
                <option>Property</option>
                <option>Financial</option>
                <option>Evidence</option>
                <option>Forms</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <p className="text-sm font-medium text-surface-700 mb-2">Tags</p>
              <Input placeholder="e.g. nda, corporate" />
            </div>
          </div>
          <FileUpload
            onFiles={(files) => console.log(files)}
            accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.zip"
            maxSize={50 * 1024 * 1024}
            multiple
          />
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowUploadModal(false)}>Cancel</Button>
            <Button variant="primary">Upload Files</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
