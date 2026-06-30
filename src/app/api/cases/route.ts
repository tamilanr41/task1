import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getAuthUser, unauthorized } from '@/lib/auth';
import { generateCaseNumber } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const payload = await getAuthUser(req);
  if (!payload) return unauthorized();

  const cases = await prisma.case.findMany({
    where: payload.role === 'CLIENT' ? { client: { userId: payload.id } }
      : payload.role === 'LAWYER' ? { lawyer: { userId: payload.id } }
      : {},
    include: { client: { include: { user: true } }, lawyer: { include: { user: true } }, milestones: true, documents: true, appointments: true },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  return NextResponse.json(cases);
}

export async function POST(req: NextRequest) {
  const payload = await getAuthUser(req);
  if (!payload || (payload.role !== 'LAWYER' && payload.role !== 'ADMIN' && payload.role !== 'SUPER_ADMIN')) return unauthorized();

  const data = await req.json();
  const caseNum = generateCaseNumber();

  const caseData = await prisma.case.create({
    data: {
      caseNumber: caseNum, title: data.title, description: data.description, type: data.type,
      clientId: data.clientId, lawyerId: data.lawyerId, court: data.court, opponent: data.opponent,
      matterType: data.matterType, budget: data.budget, priority: data.priority || 'normal',
    },
  });

  // Create default milestones
  const defaultStages = ['Consultation Completed', 'Documents Received', 'Legal Notice Sent', 'Court Filing', 'Hearing Scheduled', 'Awaiting Judgment', 'Closed'];
  await prisma.milestone.createMany({
    data: defaultStages.map((title, index) => ({
      caseId: caseData.id, title, order: index + 1, isCompleted: index === 0,
    })),
  });

  return NextResponse.json(caseData);
}
