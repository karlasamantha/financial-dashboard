import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export const dynamic = 'force-static';
export const revalidate = 3600; // 1 hour of ISR

export async function GET(request: Request) {
  const url = new URL(request.url);
  const qp = url.searchParams;

  const startDateParam = qp.get('startDate');
  const endDateParam = qp.get('endDate');
  const account = qp.get('account');
  const industry = qp.get('industry');
  const state = qp.get('state');

  const startDate = startDateParam ? Number(startDateParam) : null;
  const endDate = endDateParam ? Number(endDateParam) : null;

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

  const filtered = allData.filter((item) => {
    if (startDate !== null && item.date < startDate) return false;
    if (endDate !== null && item.date > endDate) return false;
    if (account && item.account !== account) return false;
    if (industry && item.industry !== industry) return false;
    if (state && item.state !== state) return false;
    return true;
  });

  return NextResponse.json({
    data: filtered,
    total: filtered.length,
  });
}
