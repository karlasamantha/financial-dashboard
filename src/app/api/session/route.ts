import { decrypt } from '@/lib/session';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  const sessionPayload = await decrypt(session);
  return NextResponse.json({ loggedIn: !!sessionPayload });
}

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  return NextResponse.json({ success: true });
}
