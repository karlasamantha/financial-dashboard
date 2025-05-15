import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export const dynamic = 'force-static';
export const revalidate = 3600; // 1 hour of ISR

export async function GET() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'transactions.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const allData: Array<{
    date: number;
    amount: string;
    transaction_type: string;
    currency: string;
    account: string;
    industry: string;
    state: string;
  }> = JSON.parse(fileContents);

  return NextResponse.json({
    data: allData,
  });
}
