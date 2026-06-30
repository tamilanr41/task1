export interface AIChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
}

export interface AIIntakeSession {
  id: string;
  status: 'in-progress' | 'completed';
  currentStep: number;
  steps: IntakeStep[];
  summary?: string;
  createdAt: Date;
}

export interface IntakeStep {
  id: number;
  question: string;
  answer?: string;
  field: string;
}

export interface DocumentAnalysisResult {
  type: 'contract' | 'agreement' | 'court-order' | 'other';
  summary: string;
  keyClauses: { text: string; importance: 'high' | 'medium' | 'low' }[];
  risks: { description: string; severity: 'high' | 'medium' | 'low' }[];
  recommendations: string[];
}

export interface ContractReviewResult {
  overallRisk: 'low' | 'medium' | 'high';
  issues: ContractIssue[];
  missingClauses: string[];
  recommendations: string[];
}

export interface ContractIssue {
  clause: string;
  type: 'risk' | 'missing' | 'unusual' | 'expiry' | 'liability';
  description: string;
  severity: 'low' | 'medium' | 'high';
  suggestion: string;
}
