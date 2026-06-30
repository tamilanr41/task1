// AI Service Integration for Legal Firm Platform

export interface AIMessage { role: 'user' | 'assistant' | 'system'; content: string; }

export interface AIIntakeData {
  summary: string;
  parties: string[];
  incidentType: string;
  date: string;
  location: string;
  desiredOutcome: string;
  urgency: 'low' | 'medium' | 'high';
  recommendedAction: string;
}

export interface AIDocumentSummary {
  summary: string;
  keyClauses: { clause: string; explanation: string; }[];
  risks: { risk: string; severity: 'low' | 'medium' | 'high'; }[];
  missingTerms: string[];
}

export interface AIContractReview {
  risks: { clause: string; issue: string; recommendation: string; }[];
  missingClauses: string[];
  unusualObligations: string[];
  expiryDates: string[];
  liabilityIssues: string[];
}

export interface AICasePrediction {
  estimatedTimeline: string;
  estimatedCost: string;
  similarPrecedents: { caseName: string; court: string; outcome: string; }[];
  successProbability: string;
  disclaimer: string;
}

export interface AILegalResearch {
  statutes: string[];
  caseLaw: { name: string; citation: string; relevance: string; }[];
  regulations: string[];
  keyJudgments: { title: string; summary: string; }[];
}

// Mock AI service - In production, replace with Gemini/OpenAI API calls
export class LegalAIService {
  private apiKey: string;
  private useMock: boolean;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.GEMINI_API_KEY || '';
    this.useMock = !this.apiKey;
  }

  async chat(messages: AIMessage[]): Promise<string> {
    if (this.useMock) return this.mockChatResponse(messages);
    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + this.apiKey, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: messages.map(m => ({ parts: [{ text: m.content }], role: m.role === 'assistant' ? 'model' : 'user' })) }),
      });
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || 'I apologize, I am unable to process your request at this time.';
    } catch (error) {
      return this.mockChatResponse(messages);
    }
  }

  async generateIntake(transcript: string): Promise<AIIntakeData> {
    return {
      summary: 'Client seeks legal advice regarding a business contract dispute.',
      parties: ['Client', 'ABC Corp'],
      incidentType: 'Contract Breach',
      date: '2026-06-15',
      location: 'Bengaluru, Karnataka',
      desiredOutcome: 'Compensation for breach of contract',
      urgency: 'medium',
      recommendedAction: 'Send legal notice and initiate mediation',
    };
  }

  async summarizeDocument(text: string): Promise<AIDocumentSummary> {
    return {
      summary: text.slice(0, 200) + '...',
      keyClauses: [{ clause: 'Indemnification', explanation: 'Party A agrees to indemnify Party B against all losses.' }],
      risks: [{ risk: 'Unlimited liability clause', severity: 'high' }],
      missingTerms: ['Dispute resolution mechanism', 'Termination clause'],
    };
  }

  async reviewContract(text: string): Promise<AIContractReview> {
    return {
      risks: [{ clause: 'Section 5.2', issue: 'Unlimited liability exposure', recommendation: 'Cap liability to contract value' }],
      missingClauses: ['Force Majeure', 'Non-Compete', 'Data Protection'],
      unusualObligations: ['Exclusive jurisdiction in foreign court'],
      expiryDates: ['Agreement expires Dec 31, 2027'],
      liabilityIssues: ['No limitation of liability clause'],
    };
  }

  async predictCase(caseDetails: string): Promise<AICasePrediction> {
    return {
      estimatedTimeline: '12-18 months for resolution',
      estimatedCost: '₹2,00,000 - ₹5,00,000 in legal fees',
      similarPrecedents: [{ caseName: 'XYZ vs State', court: 'Supreme Court', outcome: 'Ruled in favor of plaintiff' }],
      successProbability: '65-70% based on similar precedents',
      disclaimer: 'This is an AI-generated estimate for informational purposes only and does not constitute a legal guarantee or prediction of actual outcomes.',
    };
  }

  async research(query: string): Promise<AILegalResearch> {
    return {
      statutes: ['Indian Contract Act, 1872', 'Specific Relief Act, 1963'],
      caseLaw: [{ name: 'ABC vs DEF', citation: '(2020) 5 SCC 123', relevance: 'Directly applicable precedent' }],
      regulations: ['Legal Services Authority Regulations'],
      keyJudgments: [{ title: 'Landmark Contract Case', summary: 'Established principle of reasonable contract interpretation.' }],
    };
  }

  async generateDraft(template: string, variables: Record<string, string>): Promise<string> {
    let draft = template;
    for (const [key, value] of Object.entries(variables)) {
      draft = draft.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }
    return draft;
  }

  private mockChatResponse(messages: AIMessage[]): string {
    const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';
    if (lastMessage.includes('divorce')) {
      return 'Based on Indian divorce law, you can file for divorce under the Hindu Marriage Act, 1955 or Special Marriage Act, 1954. The process involves:\n\n1. **Consultation** - Book a consultation with our family law expert\n2. **Documentation** - Marriage certificate, income proof, etc.\n3. **Filing** - Petition filing in family court\n4. **Mediation** - Court-mandated reconciliation attempt\n5. **Resolution** - Decree of divorce\n\n**Required Documents:**\n- Marriage Certificate\n- Address Proof\n- Income Statements\n- Evidence (if contested)\n\nWould you like to book a consultation with our divorce lawyer?';
    }
    if (lastMessage.includes('case status') || lastMessage.includes('my case')) {
      return 'To check your case status, please log in to your client portal or provide your case number. I can help track the progress of your legal matter.';
    }
    if (lastMessage.includes('fee') || lastMessage.includes('cost') || lastMessage.includes('charge')) {
      return 'Our consultation fees range from ₹1,800 to ₹3,500 depending on the lawyer. For specific case fees, please schedule a consultation for a detailed quote.';
    }
    return 'Thank you for your query. I am AI Legal Assistant and can help with:\n- General legal information\n- Required documents for legal matters\n- Estimated timelines\n- Booking consultations with our lawyers\n\nPlease note: I provide general information only and not legal advice. For specific legal advice, please consult one of our experienced lawyers.';
  }
}

export const aiService = new LegalAIService();
