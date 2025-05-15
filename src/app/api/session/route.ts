import { decrypt } from '@/lib/session';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  const sessionPayload = await decrypt(session);
  return NextResponse.json({ loggedIn: !!sessionPayload });
}
