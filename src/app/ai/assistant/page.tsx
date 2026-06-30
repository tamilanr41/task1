'use client';
import { useState, useRef, useEffect } from 'react';
import {
  Bot, User, Send, Sparkles, MessageSquare, Plus, History,
  Scale, FileText, Shield, Gavel, ScrollText, ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card, CardContent, Input, Avatar, Badge } from '@/components/ui';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface Conversation {
  id: string;
  title: string;
  preview: string;
  timestamp: Date;
}

const mockConversations: Conversation[] = [
  { id: '1', title: 'Tenant Rights Query', preview: 'What are my rights as a tenant...', timestamp: new Date(Date.now() - 1000 * 60 * 30) },
  { id: '2', title: 'Divorce Proceedings', preview: 'How do I file for divorce...', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) },
  { id: '3', title: 'Contract Drafting', preview: 'I need to draft a contract...', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) },
  { id: '4', title: 'Trademark Registration', preview: 'What is the process for trademark...', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2) },
  { id: '5', title: 'Employment Law', preview: 'Can my employer terminate...', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3) },
];

const mockResponses: Record<string, string> = {
  tenant: `**Understanding Your Rights as a Tenant in India**

Under the **Rent Control Act** (applicable state-specific) and the **Transfer of Property Act, 1882**, tenants in India are entitled to several fundamental rights:

**1. Right to a Written Agreement**
A rental agreement is mandatory, outlining terms of tenancy, rent amount, deposit, and duration. Ensure the agreement is registered if the lease exceeds 11 months.

**2. Protection Against Unlawful Eviction**
A landlord cannot evict a tenant without following due process of law. Grounds for eviction typically include:
- Default in payment of rent for more than 2 months
- Subletting without the landlord's consent
- Use of premises for illegal activities
- Reasonable requirement of the premises by the landlord

**3. Right to Basic Amenities**
The landlord is obligated to maintain the property in habitable condition, including:
- Adequate water supply and sanitation
- Electrical wiring and safety
- Structural repairs (roof, walls, plumbing)
- Pest control (varies by agreement)

**4. Rent Control Protections**
In states with active rent control laws, the landlord cannot:
- Demand rent above the standard rate
- Increase rent arbitrarily (typically capped at 5-10% per annum)
- Demand deposit exceeding 2-3 months' rent (varies by state)

**5. Right to Receipt**
Every rent payment must be acknowledged with a signed receipt, which serves as evidence of tenancy.

**Recommended Next Steps:**
- Review your rental agreement for specific terms
- Document any communication with your landlord
- Contact our Tenant Advocacy Team at **1800-123-4567** for personalized assistance

*This information is for educational purposes and does not constitute legal advice. Laws vary by state and specific circumstances.*`,

  divorce: `**Divorce Filing Process Under Indian Law**

Divorce in India is governed primarily by the **Hindu Marriage Act, 1955** (for Hindus), **Special Marriage Act, 1954** (for inter-faith/inter-caste marriages), and **Indian Divorce Act, 1869** (for Christians).

**Types of Divorce:**

**A. Mutual Consent Divorce (Section 13B)**
- Both parties agree to dissolve the marriage amicably
- **Timeline:** Minimum 6 months cooling-off period (may be waived by the court), typically 6-12 months
- **Documents Required:** Marriage certificate, joint petition, settlement agreement (alimony, child custody, property division)

**B. Contested Divorce (Section 13)**
Filed on specific grounds including:
- Adultery
- Cruelty (physical or mental)
- Desertion for 2+ years
- Conversion to another religion
- Mental disorder
- Venereal disease
- Renunciation of the world

**Step-by-Step Process:**
1. **Consultation** — Meet with a family law specialist to assess grounds and strategy
2. **Documentation** — Gather marriage certificate, income proofs, property documents, evidence of grounds
3. **Filing** — File the petition in the appropriate Family Court having jurisdiction
4. **Mediation** — Court may refer parties to mediation (mandatory in many jurisdictions)
5. **Trial** — Evidence recording, cross-examination, arguments
6. **Judgment** — Court decree dissolving the marriage

**Financial Considerations:**
- **Alimony:** Determined based on earning capacity, standard of living, marriage duration
- **Child Support:** Typically paid until majority or completion of education
- **Property Division:** Matrimonial property divided based on contribution

**Estimated Costs:**
- Filing fees: ₹500 – ₹5,000 (varies by state)
- Legal fees: ₹50,000 – ₹2,00,000+ (depending on complexity)
- Mediation costs: ₹5,000 – ₹20,000 per session

**Would you like to schedule a consultation with our Family Law Practice?** Click the "Book a Consultation" button to proceed.`,

  contract: `**Contract Drafting Assistance**

A legally sound contract is the foundation of any business relationship. Below is a comprehensive guide to drafting enforceable contracts under Indian law.

**Essential Elements of a Valid Contract (Section 10, Indian Contract Act, 1872):**
1. **Offer and Acceptance** — Clear, unambiguous, and communicated
2. **Lawful Consideration** — Something of value exchanged
3. **Competency of Parties** — Age of majority, sound mind, not disqualified by law
4. **Free Consent** — Not obtained by coercion, undue influence, fraud, misrepresentation, or mistake
5. **Lawful Object** — Not forbidden by law or against public policy
6. **Writing and Registration** — Required for certain contracts (sale of immovable property, lease >11 months)

**Common Contract Clauses You Should Include:**
| Clause | Purpose |
|--------|---------|
| **Recitals** | Background and intent of the parties |
| **Definitions** | Clear meaning of key terms |
| **Scope of Work** | Detailed description of obligations |
| **Payment Terms** | Amount, schedule, mode, late payment penalties |
| **Term and Termination** | Duration, notice period, grounds for termination |
| **Confidentiality** | Protection of sensitive information |
| **Indemnification** | Allocation of risk between parties |
| **Dispute Resolution** | Arbitration, mediation, or litigation |
| **Force Majeure** | Relief from performance due to unforeseen events |
| **Governing Law** | Jurisdiction and applicable law |

**Recommendations for Your Situation:**
I can draft a custom contract tailored to your specific needs. Please provide:
- The nature of the agreement (employment, service, partnership, sale, etc.)
- Key commercial terms
- Any special conditions or requirements

**Next Steps:** Use the **Document Automation** tool in your portal or contact our Contracts Practice Group to proceed with drafting.`,

  trademark: `**Trademark Registration Process in India**

Trademark registration in India is governed by the **Trade Marks Act, 1999** and administered by the **Controller General of Patents, Designs and Trade Marks**.

**Step-by-Step Process:**

**Step 1: Trademark Search (1-2 days)**
- Conduct a public search on the IP India website to ensure the mark is available
- Check for identical or deceptively similar existing marks
- **Cost:** ₹2,000 (professional search report)

**Step 2: File Application (TM-A)**
- File Form TM-A with the Trade Marks Registry
- Choose the appropriate class(s) under the **Nice Classification** (45 classes total)
- Specify whether the mark is: Word mark, Device mark, Logo, or a Combination
- **Fee:** ₹9,000 per class (e-filing for individual/startup), ₹10,000 for others

**Step 3: Examination (3-6 months)**
- The Registrar examines the application for absolute and relative grounds of refusal
- Objections, if any, must be responded to within 1 month (extendable to 3 months)
- Hearing may be scheduled if objections are not resolved in writing

**Step 4: Publication (4 months)**
- If accepted, the mark is published in the **Trade Marks Journal**
- Third parties have 4 months to file opposition
- If opposed, opposition proceedings commence before the Registrar

**Step 5: Registration & Certificate**
- If no opposition, or opposition is decided in your favor, the mark proceeds to registration
- Certificate of Registration is issued
- **Total Timeline:** 6-12 months (unopposed); 18-24 months (opposed)

**Post-Registration:**
- **Validity:** 10 years from the date of application
- **Renewal:** Every 10 years (fee: ₹9,000 per class)
- **Use Requirement:** Must use the mark within 5 years of registration to avoid cancellation
- **Monitoring:** Watch for potential infringement and unauthorized use

**Additional Protections:**
- File a **Copyright Application** for logo protection
- Apply for **International Registration** under the Madrid Protocol (₹20,000+ per class)
- Consider **Domain Name Registration** in relevant TLDs

**Ready to proceed?** Our Intellectual Property team handles the complete registration lifecycle. Use the booking feature to schedule a consultation.`,

  default: `Thank you for reaching out to Legacy Legal Partners' AI Legal Assistant.

I understand your question requires careful consideration of applicable laws and facts. Based on the information provided, I recommend the following course of action:

**1. Preliminary Assessment**
Your matter appears to fall within the purview of established legal principles. I would need additional details to provide a more targeted analysis.

**2. Recommended Next Steps**
- **Document Collection:** Gather all relevant documents, agreements, correspondence, and evidence pertaining to your matter
- **Legal Research:** Our team can conduct a comprehensive legal research on your specific issue
- **Consultation:** Schedule a face-to-face consultation with our specialized attorneys

**3. How We Can Help**
Legacy Legal Partners offers end-to-end legal services across all practice areas. Our team of 50+ attorneys with over 500+ years of combined experience is ready to assist you.

**Would you like to:**
- A) Schedule a consultation with a specialist attorney
- B) Receive a detailed written opinion
- C) Have one of our paralegals reach out to gather more information

Please let me know how you would like to proceed, or feel free to ask a more specific question.

*Disclaimer: This response is generated by an AI system for informational purposes only and does not constitute legal advice or create an attorney-client relationship.*`,
};

const emptyStateFeatures = [
  { icon: Scale, title: 'Legal Research', description: 'Search statutes, case law, and legal precedents' },
  { icon: FileText, title: 'Document Review', description: 'Analyze contracts and legal documents' },
  { icon: Shield, title: 'Rights Information', description: 'Understand your legal rights and protections' },
  { icon: Gavel, title: 'Case Strategy', description: 'Get insights on legal strategy and procedure' },
  { icon: ScrollText, title: 'Compliance', description: 'Navigate regulatory and compliance requirements' },
  { icon: MessageSquare, title: 'General Counsel', description: 'Ask any legal question, get expert guidance' },
];

const suggestedPrompts = [
  'What are my rights as a tenant?',
  'How do I file for divorce?',
  'I need to draft a contract',
  'What is the process for trademark registration?',
];

function formatRelativeTime(date: Date): string {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 60) return `${mins}m ago`;
  if (hrs < 24) return `${hrs}h ago`;
  return `${days}d ago`;
}

function TypingIndicator() {
  return (
    <div className="flex gap-3 items-start">
      <Avatar name="AI Assistant" size="sm" className="mt-1" />
      <div className="bg-surface-100 rounded-2xl rounded-tl-none px-5 py-4">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-2.5 h-2.5 bg-surface-400 rounded-full"
              animate={{ y: [0, -6, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn('flex gap-3 items-start', isUser && 'flex-row-reverse')}
    >
      {isUser ? (
        <Avatar name="You" size="sm" className="mt-1 shrink-0" />
      ) : (
        <div className="shrink-0 mt-1">
          <Avatar name="AI Assistant" size="sm" />
        </div>
      )}
      <div className={cn('max-w-[75%] min-w-0', isUser && 'items-end flex flex-col')}>
        {!isUser && (
          <span className="text-xs font-semibold text-surface-500 mb-1.5 block font-sans">
            AI Legal Assistant
          </span>
        )}
        <div
          className={cn(
            'rounded-2xl px-5 py-3.5 text-sm leading-relaxed whitespace-pre-wrap',
            isUser
              ? 'bg-primary-500 text-white rounded-tr-none'
              : 'bg-surface-100 text-surface-800 rounded-tl-none'
          )}
        >
          {message.content}
        </div>
      </div>
    </motion.div>
  );
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [conversations] = useState<Conversation[]>(mockConversations);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasMessages = messages.length > 0;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const getResponse = (query: string): string => {
    const lower = query.toLowerCase();
    if (lower.includes('tenant') || lower.includes('rent') || lower.includes('landlord')) return mockResponses.tenant;
    if (lower.includes('divorce') || lower.includes('marriage') || lower.includes('separat')) return mockResponses.divorce;
    if (lower.includes('contract') || lower.includes('draft') || lower.includes('agreement')) return mockResponses.contract;
    if (lower.includes('trademark') || lower.includes('tm') || lower.includes('brand') || lower.includes('logo')) return mockResponses.trademark;
    return mockResponses.default;
  };

  const handleSend = async (text?: string) => {
    const content = (text || input).trim();
    if (!content) return;
    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    if (!activeChat) setActiveChat('new');
    await new Promise((r) => setTimeout(r, 1500 + Math.random() * 1000));
    const reply: Message = { id: crypto.randomUUID(), role: 'assistant', content: getResponse(content) };
    setMessages((prev) => [...prev, reply]);
    setLoading(false);
  };

  const handleSuggested = (prompt: string) => {
    handleSend(prompt);
  };

  const startNewChat = () => {
    setMessages([]);
    setActiveChat(null);
    setInput('');
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-surface-50 flex flex-col">
      {/* Page Header */}
      <section className="page-header">
        <div className="page-header-content py-10 md:py-14">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center shrink-0 border border-white/10">
                <Sparkles className="w-7 h-7 text-accent-400" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-serif text-white leading-tight">
                  AI Legal Assistant
                </h1>
                <p className="text-white/70 text-sm mt-1 max-w-xl">
                  Your intelligent legal research and guidance companion, powered by advanced AI
                </p>
              </div>
            </div>
            <Badge variant="accent" size="lg" className="shrink-0 self-start md:self-center">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Powered by Gemini AI
            </Badge>
          </div>
        </div>
      </section>

      {/* Chat Interface */}
      <section className="flex-1 flex container-page max-w-7xl py-6 gap-6">
        {/* Sidebar - Conversation History */}
        <aside className="hidden lg:flex flex-col w-72 shrink-0">
          <Card className="flex-1 flex flex-col" padding="none">
            <div className="p-4 border-b border-surface-100">
              <Button
                variant="primary"
                size="sm"
                fullWidth
                iconLeft={<Plus className="w-4 h-4" />}
                onClick={startNewChat}
              >
                New Conversation
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto scrollbar-thin p-2 space-y-1">
              {conversations.map((chat) => (
                <motion.button
                  key={chat.id}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveChat(chat.id)}
                  className={cn(
                    'w-full text-left p-3 rounded-xl transition-colors duration-200 group',
                    activeChat === chat.id
                      ? 'bg-primary-50 border border-primary-200'
                      : 'hover:bg-surface-50 border border-transparent'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5',
                      activeChat === chat.id
                        ? 'bg-primary-100 text-primary-600'
                        : 'bg-surface-100 text-surface-500'
                    )}>
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={cn(
                        'text-sm font-medium truncate',
                        activeChat === chat.id ? 'text-primary-700' : 'text-surface-800'
                      )}>
                        {chat.title}
                      </p>
                      <p className="text-xs text-surface-400 truncate mt-0.5">{chat.preview}</p>
                      <p className="text-2xs text-surface-300 mt-0.5">
                        {formatRelativeTime(chat.timestamp)}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
            <div className="p-3 border-t border-surface-100">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-50 text-xs text-surface-500">
                <History className="w-3.5 h-3.5 shrink-0" />
                <span>Last 30 days of conversations</span>
              </div>
            </div>
          </Card>
        </aside>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <Card className="flex-1 flex flex-col" padding="none">
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto scrollbar-thin p-4 md:p-6">
              <AnimatePresence mode="wait">
                {!hasMessages && !loading ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center text-center py-12 px-4"
                  >
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center mb-6 shadow-soft">
                      <Sparkles className="w-10 h-10 text-primary-500" />
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-primary-500 mb-2">
                      How can I help you today?
                    </h2>
                    <p className="text-surface-500 text-sm max-w-md mb-8">
                      Ask any legal question or explore one of the practice areas below to get started with your AI-powered legal assistant.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl">
                      {emptyStateFeatures.map((feature, i) => (
                        <motion.div
                          key={feature.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.06, type: 'spring', stiffness: 300, damping: 22 }}
                        >
                          <Card variant="interactive" padding="sm" className="text-left" onClick={() => handleSuggested(suggestedPrompts[i % suggestedPrompts.length])}>
                            <CardContent className="flex items-start gap-3">
                              <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                                <feature.icon className="w-4.5 h-4.5 text-primary-500" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-surface-800">{feature.title}</p>
                                <p className="text-2xs text-surface-500 mt-0.5 leading-relaxed">{feature.description}</p>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="messages"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-5"
                  >
                    {messages.map((msg) => (
                      <MessageBubble key={msg.id} message={msg} />
                    ))}
                    {loading && <TypingIndicator />}
                    <div ref={bottomRef} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input Area */}
            <div className="border-t border-surface-100 p-4 md:p-6">
              {/* Suggested Prompts */}
              {!hasMessages && !loading && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {suggestedPrompts.map((prompt) => (
                    <motion.button
                      key={prompt}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleSuggested(prompt)}
                      className="px-4 py-2 rounded-xl bg-surface-50 hover:bg-primary-50 hover:text-primary-700 border border-surface-200 text-sm text-surface-600 transition-colors duration-200 font-medium"
                    >
                      {prompt}
                    </motion.button>
                  ))}
                </div>
              )}

              {hasMessages && !loading && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {suggestedPrompts.map((prompt) => (
                    <motion.button
                      key={prompt}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleSuggested(prompt)}
                      className="px-3 py-1.5 rounded-lg bg-surface-50 hover:bg-primary-50 hover:text-primary-700 border border-surface-200 text-xs text-surface-500 transition-colors duration-200"
                    >
                      {prompt}
                    </motion.button>
                  ))}
                </div>
              )}

              <div className="flex gap-3 items-end">
                <div className="flex-1 relative">
                  <Input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Type your legal question here..."
                    inputSize="lg"
                    className="pr-12 bg-white"
                    disabled={loading}
                  />
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => handleSend()}
                    disabled={loading || !input.trim()}
                    size="lg"
                    icon={<Send className="w-4 h-4" />}
                    className="px-5"
                  />
                </motion.div>
              </div>
              <p className="text-2xs text-surface-400 mt-2 text-center">
                AI responses are for informational purposes only and do not constitute legal advice.
                {' '}Always consult a qualified lawyer for your specific situation.
              </p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
