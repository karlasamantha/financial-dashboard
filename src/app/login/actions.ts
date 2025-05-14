'use server';

import { createSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const mockUser = {
  id: '1',
  email: 'test@example.com',
  password: '123456',
};

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }).trim(),
  password: z
    .string()
    .min(3, { message: 'Password must be at least 3 characters long' })
    .trim(),
});

export async function login(prevState: unknown, formData: FormData) {
  const result = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!result.success) {
    return { error: result.error.flatten().fieldErrors };
  }

  const { email, password } = result.data;

  if (email !== mockUser.email || password !== mockUser.password) {
    return { error: { email: ['Invalid email or password'] } };
  }

  await createSession(mockUser.id);

  redirect('/dashboard');
}

export async function logout() {}
