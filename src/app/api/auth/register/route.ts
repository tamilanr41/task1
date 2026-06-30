import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, phone, role } = await req.json();
    if (!name || !email || !password) return NextResponse.json({ error: 'Name, email and password required' }, { status: 400 });

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return NextResponse.json({ error: 'Email already registered' }, { status: 400 });

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: { name, email, passwordHash, phone, role: role || 'CLIENT' },
    });

    if (user.role === 'CLIENT') {
      await prisma.client.create({ data: { userId: user.id } });
    } else if (user.role === 'LAWYER') {
      await prisma.lawyer.create({ data: { userId: user.id } });
    }

    return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
