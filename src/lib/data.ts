// Static data for the legal firm platform
import { practiceAreasList } from './utils';
export { practiceAreasList };

export const siteConfig = {
  name: 'Legacy Legal Partners',
  tagline: 'Excellence in Legal Practice',
  description: 'Premier law firm offering comprehensive legal services across corporate, criminal, civil, family, and immigration law with a team of experienced attorneys.',
  phone: '+91 1800 123 4567',
  emergencyPhone: '+91 9999 888 777',
  whatsapp: '9182768591',
  email: 'contact@legacylegal.in',
  address: 'No. 42, Kasturba Road, MG Road, Bengaluru, Karnataka 560001',
  social: {
    facebook: '#', twitter: '#', linkedin: '#', instagram: '#', youtube: '#',
  },
};

export const lawyersData = [
  {
    id: 'l1', name: 'Adv. Rajesh Sharma', experience: 18, bio: 'Senior Partner specializing in Corporate Law and Litigation with over 18 years of experience.',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
    consultationFee: 2500, rating: 4.9, reviewCount: 127,
    languages: ['English', 'Hindi', 'Kannada'], courtMemberships: ['Supreme Court', 'Karnataka High Court'],
    certifications: ['Certified Corporate Lawyer', 'CIPR (UK)'],
    education: ['LLB - NLSIU Bangalore', 'B.Com - St. Xavier\'s Kolkata'],
    practiceAreas: ['corporate-law', 'civil-litigation', 'startup-legal'],
    availability: ['Mon-Fri 9AM-6PM', 'Sat 10AM-2PM'],
  },
  {
    id: 'l2', name: 'Adv. Priya Patel', experience: 14, bio: 'Expert in Criminal Law and Family Law. Known for her compassionate approach and strong courtroom presence.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    consultationFee: 2000, rating: 4.8, reviewCount: 98,
    languages: ['English', 'Hindi', 'Gujarati'], courtMemberships: ['Delhi High Court', 'Supreme Court'],
    certifications: ['Criminal Law Specialist', 'Mediation Certified'],
    education: ['LLB - Campus Law Centre, Delhi', 'BA (Hons) - LSR Delhi'],
    practiceAreas: ['criminal-law', 'family-law', 'divorce'],
    availability: ['Mon-Fri 10AM-5PM', 'Sat 11AM-3PM'],
  },
  {
    id: 'l3', name: 'Adv. Arun Krishnan', experience: 22, bio: 'Leading expert in Intellectual Property and Tax Law. Handled 500+ IP registrations.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    consultationFee: 3500, rating: 4.9, reviewCount: 156,
    languages: ['English', 'Malayalam', 'Tamil', 'Hindi'], courtMemberships: ['Supreme Court', 'Kerala High Court', 'Madras High Court'],
    certifications: ['IP Attorney (USPTO)', 'Chartered Tax Consultant'],
    education: ['LLM - Harvard Law School', 'LLB - NALSAR Hyderabad', 'B.Tech - IIT Madras'],
    practiceAreas: ['intellectual-property', 'tax-law', 'corporate-law'],
    availability: ['Mon-Fri 10AM-7PM', 'Sat By Appointment'],
  },
  {
    id: 'l4', name: 'Adv. Sneha Kapoor', experience: 10, bio: 'Dedicated Family Law and Divorce attorney. Committed to protecting family rights and interests.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
    consultationFee: 1800, rating: 4.7, reviewCount: 84,
    languages: ['English', 'Hindi', 'Punjabi'], courtMemberships: ['Punjab & Haryana High Court'],
    certifications: ['Family Law Specialist', 'Child Rights Advocate'],
    education: ['LLB - Panjab University', 'BA - Jesus & Mary College'],
    practiceAreas: ['family-law', 'divorce', 'civil-litigation'],
    availability: ['Mon-Sat 9AM-6PM'],
  },
  {
    id: 'l5', name: 'Adv. Vikram Desai', experience: 15, bio: 'Expert in Property Law and Consumer Law with extensive experience in land disputes.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    consultationFee: 2200, rating: 4.8, reviewCount: 112,
    languages: ['English', 'Hindi', 'Gujarati', 'Marathi'], courtMemberships: ['Gujarat High Court'],
    certifications: ['Property Law Specialist', 'RERA Consultant'],
    education: ['LLB - Government Law College, Mumbai', 'B.Com - MSU Baroda'],
    practiceAreas: ['property-law', 'consumer-law', 'civil-litigation'],
    availability: ['Mon-Fri 9:30AM-6:30PM', 'Sat 10AM-1PM'],
  },
  {
    id: 'l6', name: 'Adv. Maria D\'Souza', experience: 8, bio: 'Immigration Law expert helping clients with visas, green cards, and citizenship worldwide.',
    avatar: 'https://images.unsplash.com/photo-1594741154714-ee5a51b31e79?w=400&h=400&fit=crop',
    consultationFee: 3000, rating: 4.6, reviewCount: 73,
    languages: ['English', 'Hindi', 'Konkani', 'French'], courtMemberships: ['Bombay High Court'],
    certifications: ['Immigration Law Certified', 'Global Mobility Specialist'],
    education: ['LLM - University of Toronto', 'LLB - ILS Pune'],
    practiceAreas: ['immigration', 'corporate-law'],
    availability: ['Mon-Fri 10AM-6PM', 'Sat 10AM-2PM'],
  },
];

export const testimonials = [
  { id: 't1', name: 'Rahul Mehta', role: 'CEO, TechStart Pvt Ltd', content: 'Exceptional legal counsel. They handled our company acquisition flawlessly. Highly professional team.', rating: 5 },
  { id: 't2', name: 'Anita Sharma', role: 'Homeowner', content: 'Best property law firm in town. They resolved my 5-year-old land dispute in just 6 months.', rating: 5 },
  { id: 't3', name: 'Vikram Singh', role: 'Business Owner', content: 'Their divorce mediation was handled with great sensitivity. Fair settlement achieved without long court battles.', rating: 5 },
  { id: 't4', name: 'Sunita Reddy', role: 'Startup Founder', content: 'From incorporation to fundraising, they guided us through every step. Invaluable for any startup.', rating: 5 },
  { id: 't5', name: 'Dr. Karan Joshi', role: 'Physician', content: 'Faced a medical malpractice suit. Their criminal defense team was outstanding. Case dismissed.', rating: 5 },
  { id: 't6', name: 'Meera Nair', role: 'HR Director', content: 'We rely on them for all our corporate compliance. Trusted partners for over a decade.', rating: 4 },
];

export const caseResults = [
  { title: 'TechStart Acquisition', category: 'Corporate Law', result: '₹50Cr Deal Closed', description: 'Successfully negotiated and closed a landmark acquisition deal for a SaaS startup.' },
  { title: 'Landmark Property Verdict', category: 'Property Law', result: 'Title Restored', description: 'Won a complex property title dispute in the Supreme Court involving 3 generations of claimants.' },
  { title: 'White-Collar Defense', category: 'Criminal Law', result: 'All Charges Dropped', description: 'Secured discharge for a CFO accused of financial fraud. All 12 charges dismissed.' },
];

export const blogPosts = [
  { slug: 'divorce-process-india', title: 'Complete Guide to Divorce Process in India (2026)', excerpt: 'Understanding the divorce process under Indian law. From filing to final decree, here\'s everything you need to know.', category: 'Family Law', author: 'Adv. Priya Patel', image: '', tags: ['divorce', 'family law'], views: 15420 },
  { slug: 'trademark-registration-guide', title: 'Trademark Registration: A Step-by-Step Guide', excerpt: 'Protect your brand identity. Complete guide to trademark registration process in India.', category: 'Intellectual Property', author: 'Adv. Arun Krishnan', image: '', tags: ['trademark', 'IP'], views: 12350 },
  { slug: 'gst-issues-business', title: 'Common GST Issues Faced by Businesses & Solutions', excerpt: 'Navigating GST compliance can be challenging. Here are common issues and expert solutions.', category: 'Tax Law', author: 'Adv. Arun Krishnan', image: '', tags: ['GST', 'tax'], views: 9870 },
  { slug: 'bail-procedures-criminal', title: 'Bail Procedures in Indian Criminal Law', excerpt: 'Understanding bail, anticipatory bail, and regular bail procedures under CrPC.', category: 'Criminal Law', author: 'Adv. Priya Patel', image: '', tags: ['bail', 'criminal'], views: 8760 },
  { slug: 'startup-legal-checklist', title: 'Essential Legal Checklist for Indian Startups in 2026', excerpt: 'From incorporation to compliance, every startup needs this legal checklist.', category: 'Startup Legal', author: 'Adv. Rajesh Sharma', image: '', tags: ['startup', 'compliance'], views: 7650 },
  { slug: 'consumer-rights-india', title: 'Know Your Consumer Rights: A Complete Guide', excerpt: 'Consumer protection laws in India explained. What to do when you receive defective products or poor services.', category: 'Consumer Law', author: 'Adv. Vikram Desai', image: '', tags: ['consumer', 'rights'], views: 6540 },
];

export const faqs = [
  { category: 'general', items: [
    { q: 'What should I bring to my first consultation?', a: 'Please bring any relevant documents, identification, and a brief written timeline of events related to your legal matter.' },
    { q: 'How are legal fees calculated?', a: 'Fees vary based on complexity. We offer fixed fees for routine matters and hourly billing for complex litigation. Consultations are charged separately.' },
    { q: 'How long does a typical case take?', a: 'Timelines vary by case type. Simple matters like trademark registration take 3-6 months. Litigation can take 1-3 years depending on court backlog.' },
  ]},
  { category: 'corporate-law', items: [
    { q: 'What is the process for company incorporation?', a: 'Incorporation involves DIN application, name approval, MOA/AOA drafting, PAN/TAN registration, and GST registration. Complete in 7-10 days.' },
    { q: 'What are the compliance requirements for private companies?', a: 'Annual filings with MCA, board meetings, AGM, tax returns, and maintaining statutory registers.' },
  ]},
  { category: 'divorce', items: [
    { q: 'What is the difference between mutual consent and contested divorce?', a: 'Mutual consent divorce requires both parties to agree on terms and takes 6-12 months. Contested divorce can take 2-5 years.' },
    { q: 'How is alimony calculated?', a: 'Alimony depends on factors like marriage duration, lifestyle, income, and earning capacity of both parties.' },
  ]},
];

export const practiceAreaDetails: Record<string, any> = {
  'corporate-law': {
    services: ['Company Incorporation', 'Board & Compliance Advisory', 'Mergers & Acquisitions', 'Due Diligence', 'Corporate Governance', 'Joint Ventures', 'Contract Drafting & Review', 'FDI & Cross-Border Investments'],
    pricing: '₹15,000 onwards for incorporation. M&A deals billed at 1-2% of transaction value.',
    timeline: 'Incorporation: 7-10 days. M&A: 3-6 months.',
    requiredDocuments: ['Director IDs (DIN)', 'Registered Office Proof', 'Identity & Address Proof', 'Digital Signatures (DSC)', 'MOA & AOA'],
  },
  'criminal-law': {
    services: ['Criminal Defense', 'Bail Applications', 'Anticipatory Bail', 'Appeals', 'White-Collar Crime', 'Criminal Complaints', 'Quashing Petitions', 'Negotiation & Settlement'],
    pricing: '₹25,000 - ₹2,00,000 depending on case complexity and court.',
    timeline: 'Varies by case. Bail: 1-4 weeks. Trial: 1-3 years.',
    requiredDocuments: ['FIR Copy', 'Arrest/Remand Order', 'Charge Sheet', 'Witness Statements', 'Evidence Documents'],
  },
  'civil-litigation': {
    services: ['Contract Disputes', 'Property Disputes', 'Recovery Suits', 'Injunction Applications', 'Specific Performance', 'Civil Appeals', 'Arbitration & Mediation', 'Negotiable Instrument Cases'],
    pricing: '₹30,000 upwards. Billed on a case-by-case basis.',
    timeline: '6 months to 3 years depending on court.',
    requiredDocuments: ['Agreement/Contract', 'Notice Exchange', 'Evidence Documents', 'Witness List', 'Property Documents'],
  },
  'divorce': {
    services: ['Mutual Consent Divorce', 'Contested Divorce', 'Alimony & Maintenance', 'Child Custody', '财产 Division', 'Domestic Violence Cases', 'Mediation & Counselling', 'Divorce by Foreign Decree'],
    pricing: '₹20,000 - ₹1,00,000. Mutual consent starts at ₹25,000.',
    timeline: 'Mutual consent: 6-12 months. Contested: 2-5 years.',
    requiredDocuments: ['Marriage Certificate', 'Income Proof', 'Property Statements', 'Child Documents', 'Evidence of Cruelty/Adultery (if contested)'],
  },
  'family-law': {
    services: ['Marriage Registration', 'Adoption', 'Guardianship', 'Succession & Inheritance', 'Maintenance Cases', 'Domestic Violence', 'Prenuptial Agreements', 'Child Welfare'],
    pricing: '₹15,000 - ₹75,000 depending on matter.',
    timeline: '3-12 months for most matters.',
    requiredDocuments: ['Relationship Proof', 'Identity Documents', 'Property Documents', 'Income Statements'],
  },
  'property-law': {
    services: ['Property Registration', 'Title Verification', 'Land Disputes', 'RERA Complaints', 'Stamp Duty Advisory', 'Sale & Purchase Agreements', 'Lease Deeds', 'Property Tax Appeals'],
    pricing: '₹20,000 - ₹1,50,000. Registration fees extra as per government rates.',
    timeline: 'Registration: 1-2 weeks. Disputes: 6-24 months.',
    requiredDocuments: ['Title Deeds', 'Encumbrance Certificate', 'Property Tax Receipts', 'Sale Agreement', 'Parent Documents (30 years)'],
  },
  'immigration': {
    services: ['Work Visas', 'Business Visas', 'Student Visas', 'Permanent Residency', 'Citizenship Applications', 'Green Card Processing', 'Appeals & Waivers', 'Global Mobility'],
    pricing: '₹50,000 - ₹3,00,000 depending on country and visa type.',
    timeline: '3-12 months depending on country and visa type.',
    requiredDocuments: ['Passport', 'Educational Documents', 'Employment Letters', 'Financial Statements', 'Medical Reports', 'Police Clearance'],
  },
  'tax-law': {
    services: ['Income Tax Filing', 'GST Compliance', 'Tax Planning', 'Tax Notices & Appeals', 'International Taxation', 'Transfer Pricing', 'Tax Audits', 'Wealth Management'],
    pricing: '₹10,000 - ₹1,00,000. Annual retainers available.',
    timeline: 'Ongoing compliance. Notice responses: 30 days.',
    requiredDocuments: ['PAN Card', 'Income Statements', 'Bank Statements', 'Investment Details', 'Previous Returns', 'GST Returns'],
  },
  'intellectual-property': {
    services: ['Trademark Registration', 'Patent Filing', 'Copyright Registration', 'Design Registration', 'IP Licensing', 'IP Litigation', 'Brand Protection', 'IP Portfolio Management'],
    pricing: '₹9,000 for trademark. ₹25,000 onwards for patent.',
    timeline: 'Trademark: 6-12 months. Patent: 2-5 years.',
    requiredDocuments: ['Brand/Logo Details', 'Applicant Details', 'Proof of Use', 'Description of Goods/Services', 'Patent Specification'],
  },
  'startup-legal': {
    services: ['Business Incorporation', 'Founders\' Agreement', 'ESOP Plans', 'Fundraising (Term Sheets)', 'Investor Agreements', 'IP Assignment', 'Regulatory Compliance', 'Exit Strategies'],
    pricing: '₹25,000 for incorporation. Fundraising at 2-5% of raise amount.',
    timeline: 'Incorporation: 5-7 days. Fundraising: 2-4 months.',
    requiredDocuments: ['Founder IDs', 'Business Plan', 'Address Proof', 'Investment Terms', 'Founder Agreements'],
  },
  'consumer-law': {
    services: ['Consumer Complaints', 'Product Liability', 'Service Complaints', 'Refund Claims', 'Online Shopping Disputes', 'Insurance Claims', 'Banking Complaints', 'Real Estate Complaints'],
    pricing: '₹10,000 - ₹50,000 per matter.',
    timeline: 'Consumer Forum: 3-12 months. Appeals: additional 6-12 months.',
    requiredDocuments: ['Purchase Invoice', 'Warranty Card', 'Complaint History', 'Evidence Photos/Videos', 'Notice Copy'],
  },
};
