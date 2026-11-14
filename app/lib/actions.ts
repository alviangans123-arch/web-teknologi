'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    // Arahkan ke /dashboard setelah login, supaya URL tidak tertinggal di /login
    formData.set('redirectTo', '/dashboard');
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
        case 'CallbackRouteError':
          return 'Email atau kata sandi salah.';
        default:
          return 'Terjadi kesalahan. Coba lagi.';
      }
    }
    // Wajib dilempar ulang: redirect Next.js bekerja lewat throw
    throw error;
  }
}