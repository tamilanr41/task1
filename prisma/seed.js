const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('pass123', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@legacylegal.in' },
    update: {},
    create: { email: 'admin@legacylegal.in', passwordHash: hashedPassword, name: 'Admin User', role: 'SUPER_ADMIN', isActive: true },
  });

  const clientUser = await prisma.user.upsert({
    where: { email: 'client@demo.com' },
    update: {},
    create: { email: 'client@demo.com', passwordHash: hashedPassword, name: 'Rahul Sharma', role: 'CLIENT', phone: '+91 98765 43210' },
  });
  const client = await prisma.client.upsert({
    where: { userId: clientUser.id },
    update: {},
    create: { userId: clientUser.id },
  });

  const lawyerUser = await prisma.user.upsert({
    where: { email: 'lawyer@demo.com' },
    update: {},
    create: { email: 'lawyer@demo.com', passwordHash: hashedPassword, name: 'Adv. Rajesh Sharma', role: 'LAWYER', phone: '+91 99887 76655' },
  });
  const lawyer = await prisma.lawyer.upsert({
    where: { userId: lawyerUser.id },
    update: {},
    create: {
      userId: lawyerUser.id, experience: 18, consultationFee: 2500, rating: 4.9, reviewCount: 127,
      languages: JSON.stringify(['English', 'Hindi', 'Kannada']),
      courtMemberships: JSON.stringify(['Supreme Court', 'Karnataka High Court']),
      certifications: JSON.stringify(['Certified Corporate Lawyer']),
      education: JSON.stringify(['LLB - NLSIU Bangalore']),
      practiceAreas: JSON.stringify(['corporate-law', 'civil-litigation']),
      bio: 'Senior Partner specializing in Corporate Law and Litigation with over 18 years of experience.',
    },
  });

  const caseData = await prisma.case.create({
    data: {
      caseNumber: 'LF/2026/AB12CD', title: 'Property Dispute - Sharma vs. Verma',
      description: 'Land title dispute regarding ancestral property.', type: 'Property Law',
      status: 'ACTIVE', stage: 'Legal Notice Sent', court: 'Karnataka High Court',
      opponent: 'Mr. Verma', clientId: client.id, lawyerId: lawyer.id, priority: 'high',
    },
  });

  const stages = ['Consultation Completed', 'Documents Received', 'Legal Notice Sent', 'Court Filing', 'Hearing Scheduled', 'Awaiting Judgment', 'Closed'];
  for (let i = 0; i < stages.length; i++) {
    await prisma.milestone.create({
      data: { caseId: caseData.id, title: stages[i], order: i + 1, isCompleted: i <= 2 },
    });
  }

  console.log('Seed completed successfully');
  console.log('Demo accounts:');
  console.log('  Admin:  admin@legacylegal.in / pass123');
  console.log('  Client: client@demo.com / pass123');
  console.log('  Lawyer: lawyer@demo.com / pass123');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
