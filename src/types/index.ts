export interface PracticeAreaType {
  id: string; slug: string; title: string; description: string; icon: string;
  content?: string; order: number; faqs: FAQType[]; articles: ArticleType[]; requiredDocuments: string[];
}
export interface LawyerType {
  id: string; userId: string; name: string; email: string; phone?: string; avatar?: string;
  barNumber?: string; experience: number; bio?: string; consultationFee: number;
  availability: Record<string, any>; languages: string[]; courtMemberships: string[];
  certifications: string[]; education: string[]; isVerified: boolean;
  rating: number; reviewCount: number; practiceAreas: string[];
}
export interface CaseType {
  id: string; caseNumber: string; title: string; description?: string; type?: string;
  status: string; stage: string; court?: string; opponent?: string; matterType?: string;
  budget?: number; priority: string; clientId: string; lawyerId: string;
  milestones: MilestoneType[]; documents: DocumentType[];
  appointments: any[]; timeEntries: any[]; invoices: any[];
  createdAt: string; updatedAt: string;
}
export interface MilestoneType {
  id: string; caseId: string; title: string; description?: string; order: number;
  isCompleted: boolean; completedAt?: string;
}
export interface DocumentType {
  id: string; caseId?: string; clientId: string; name: string; type: string;
  size: number; url: string; category: string; isVerified: boolean; ocrText?: string;
  uploadedAt: string;
}
export interface InvoiceType {
  id: string; invoiceNo: string; clientId: string; caseId?: string; amount: number;
  tax: number; total: number; status: string; dueDate?: string; paidAt?: string;
  description?: string; items: InvoiceItem[];
}
export interface InvoiceItem { description: string; quantity: number; rate: number; amount: number; }
export interface AppointmentType {
  id: string; clientId: string; lawyerId: string; caseId?: string; title: string;
  description?: string; date: string; duration: number; status: string;
  meetingUrl?: string; meetingType: string;
}
export interface FAQType { id: string; question: string; answer: string; category?: string; order: number; }
export interface ArticleType { id: string; title: string; content: string; author?: string; createdAt: string; }
export interface PaymentType { id: string; invoiceId: string; amount: number; method: string; transactionId?: string; status: string; createdAt: string; }
export interface TimeEntryType { id: string; title: string; hours: number; rate: number; billable: boolean; date: string; description?: string; }
export interface LeadType { id: string; name: string; email?: string; phone?: string; source?: string; status: string; notes?: string; createdAt: string; }
export interface BlogPostType { id: string; slug: string; title: string; excerpt?: string; content: string; author?: string; category?: string; tags: string[]; image?: string; published: boolean; views: number; createdAt: string; }
export interface ReviewType { id: string; clientId: string; lawyerId?: string; clientName: string; rating: number; comment?: string; isVerified: boolean; createdAt: string; }
export interface MessageType { id: string; senderId: string; receiverId: string; caseId?: string; content: string; attachment?: string; read: boolean; createdAt: string; }
export interface NotificationType { id: string; title: string; message: string; type: string; link?: string; read: boolean; createdAt: string; }
export interface AnalyticsType { totalRevenue: number; activeCases: number; winRate: number; avgResolutionDays: number; clientSatisfaction: number; leadSources: Record<string, number>; conversionRate: number; monthlyRevenue: number[]; casesByType: Record<string, number>; }
