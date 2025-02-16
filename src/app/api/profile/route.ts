import { NextResponse } from 'next/server';
import { currentProfile } from '@/lib/current-profile';

export async function PATCH(req: Request) {
    try {
        const profile = await currentProfile();
        if (!profile) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
        return NextResponse.json(profile, { status: 200 });
    } catch (error) {
        console.error('Failed to fetch profile:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}