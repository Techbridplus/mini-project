import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { currentProfile } from '@/lib/current-profile';

export async function GET(req: NextRequest, { params }: { params: { serverId: string } }) {
  const profile = await currentProfile();
  if (!profile) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { serverId } = params;

  if (!serverId) return NextResponse.json({ message: 'Server ID is required' }, { status: 400 });

  const member = await db.member.findFirst({
    where: {
      userId: profile.id,
      serverId: serverId,
    },
    select: {
      role: true,
    },
  });

  if (!member) return NextResponse.json({ message: 'Member not found' }, { status: 404 });

  return NextResponse.json({ role: member.role }, { status: 200 });
}