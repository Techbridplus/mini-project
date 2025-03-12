import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { currentProfile } from '@/lib/current-profile';

export async function GET(req: NextRequest) {
    const profile = await currentProfile();
    if (!profile) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get('serverId');

    const member = await db.member.findFirst({
        where: {
            userId: profile.id,
            serverId: serverId as string,
        },
    });

    return NextResponse.json({ isMember: !!member }, { status: 200 });
}