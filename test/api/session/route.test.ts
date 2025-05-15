// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
global.Request = class extends Object {};
global.Response = class extends Object {};

import { GET, POST } from '../../../src/app/api/session/route';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/session';

jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));
jest.mock('@/lib/session', () => ({
  decrypt: jest.fn(),
}));
jest.spyOn(NextResponse, 'json').mockImplementation((data) => {
  return {
    json: async () => data,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;
});

describe('api/session/route', () => {
  describe('GET', () => {
    it('should return loggedIn: true if sessionPayload exists', async () => {
      const mockCookieStore = {
        get: jest.fn().mockReturnValue({ value: 'token' }),
      };
      (cookies as jest.Mock).mockResolvedValueOnce(mockCookieStore);
      (decrypt as jest.Mock).mockResolvedValueOnce({ user: 'test' });

      const response = await GET();
      const json = await response.json();
      expect(json).toEqual({ loggedIn: true });
    });

    it('should return loggedIn: false if sessionPayload does not exist', async () => {
      const mockCookieStore = {
        get: jest.fn().mockReturnValue({ value: 'token' }),
      };
      (cookies as jest.Mock).mockResolvedValueOnce(mockCookieStore);
      (decrypt as jest.Mock).mockResolvedValueOnce(undefined);

      const response = await GET();
      const json = await response.json();
      expect(json).toEqual({ loggedIn: false });
    });
  });

  describe('POST', () => {
    it('should delete session cookie and return success', async () => {
      const mockCookieStore = {
        delete: jest.fn(),
      };
      (cookies as jest.Mock).mockResolvedValueOnce(mockCookieStore);

      const response = await POST();
      expect(mockCookieStore.delete).toHaveBeenCalledWith('session');
      const json = await response.json();
      expect(json).toEqual({ success: true });
    });
  });
});
