import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getAuthUser, unauthorized } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const payload = await getAuthUser(req);
  if (!payload) return unauthorized();

  const user = await prisma.user.findUnique({
    where: { id: payload.id },
    include: { client: true, lawyer: true, staff: true },
  });
  if (!user) return unauthorized();

  return NextResponse.json({
    id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar, phone: user.phone,
    client: user.client, lawyer: user.lawyer, staff: user.staff,
  });
}
