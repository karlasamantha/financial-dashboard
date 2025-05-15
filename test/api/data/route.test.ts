// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
global.Request = class extends Object {};
global.Response = class extends Object {};

import { GET } from '../../../src/app/api/data/route';
import { NextResponse } from 'next/server';
import fs from 'fs/promises';

jest.mock('fs/promises');
jest.spyOn(NextResponse, 'json').mockImplementation((data) => {
  return {
    json: async () => data,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;
});

const mockData = [
  {
    date: 20240515,
    amount: '100.00',
    transaction_type: 'deposit',
    currency: 'USD',
    account: 'Checking',
    industry: 'Tech',
    state: 'CA',
  },
];

describe('GET', () => {
  it('should return data from transactions.json as JSON', async () => {
    (fs.readFile as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockData));

    const response = await GET();
    const json = await response.json();
    expect(json).toEqual({ data: mockData });
  });

  it('should throw if file read fails', async () => {
    (fs.readFile as jest.Mock).mockRejectedValueOnce(new Error('File not found'));
    await expect(GET()).rejects.toThrow('File not found');
  });
});
