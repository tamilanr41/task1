import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getAuthUser, unauthorized } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const payload = await getAuthUser(req);
  if (!payload) return unauthorized();

  const { searchParams } = new URL(req.url);
  const caseId = searchParams.get('caseId');

  const where: any = {};
  if (caseId) where.caseId = caseId;
  if (payload.role === 'CLIENT') where.client = { userId: payload.id };

  const documents = await prisma.document.findMany({
    where, include: { case: { select: { title: true, caseNumber: true } }, client: { include: { user: { select: { name: true } } } } },
    orderBy: { uploadedAt: 'desc' },
  });

  return NextResponse.json(documents);
}

export async function POST(req: NextRequest) {
  const payload = await getAuthUser(req);
  if (!payload) return unauthorized();

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const caseId = formData.get('caseId') as string;
    const category = formData.get('category') as string || 'general';

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

    // In production: upload to S3/cloud storage
    const fileUrl = `/uploads/${Date.now()}_${file.name}`;

    const client = await prisma.client.findUnique({ where: { userId: payload.id } });
    if (!client) return NextResponse.json({ error: 'Client profile not found' }, { status: 400 });

    const document = await prisma.document.create({
      data: {
        name: file.name, type: file.type, size: file.size, url: fileUrl,
        category, clientId: client.id, caseId: caseId || null,
      },
    });

    return NextResponse.json(document);
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
