export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';
import { auth, signIn } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const session = await auth();
  if (session?.user) {
    redirect('/admin');
  }

  const params = await searchParams;
  const userCount = await prisma.user.count();
  const isFirstTime = userCount === 0;

  async function handleLogin(formData: FormData) {
    'use server';

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await signIn('credentials', {
        email,
        password,
        redirectTo: '/admin',
      });
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            redirect('/login?error=Invalid+email+or+password');
          default:
            redirect('/login?error=Authentication+failed');
        }
      }
      throw error;
    }
  }

  async function handleSetup(formData: FormData) {
    'use server';

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!name || !email || !password) {
      redirect('/login?error=All+fields+are+required');
    }

    const currentCount = await prisma.user.count();
    if (currentCount > 0) {
      redirect('/login?error=Setup+already+completed');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    await prisma.profile.create({
      data: {
        name,
        tagline: 'Portfolio & Journal Administrator',
        bio: 'Welcome to my portfolio workspace.',
        currentRole: 'Administrator',
        email,
        theme: 'editorial',
      },
    });

    try {
      await signIn('credentials', {
        email,
        password,
        redirectTo: '/admin',
      });
    } catch (error) {
      if (error instanceof AuthError) {
        redirect('/login?error=Setup+complete+please+sign+in');
      }
      throw error;
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] px-4 py-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] mb-3">
            {isFirstTime ? 'Initial Configuration' : 'Private Portal'}
          </p>
          <h1 className="text-4xl font-serif font-semibold text-[var(--text-main)] mb-3">
            {isFirstTime ? 'Setup Admin Account' : 'Sign In'}
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            {isFirstTime
              ? 'Configure your administrator credentials for this portfolio instance.'
              : 'Access your portfolio administration console'}
          </p>
        </div>

        {params.error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-mono">
            {decodeURIComponent(params.error)}
          </div>
        )}

        <div className="bg-[var(--bg-secondary)]/20 border border-[var(--border-structural)] p-8 shadow-sm">
          {isFirstTime ? (
            <form action={handleSetup} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] mb-2"
                >
                  Administrator Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-2.5 bg-[var(--bg-primary)] border border-[var(--border-structural)] text-[var(--text-main)] placeholder:text-[var(--text-faint)] focus:outline-none focus:border-[var(--accent)] transition-all text-sm"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-2.5 bg-[var(--bg-primary)] border border-[var(--border-structural)] text-[var(--text-main)] placeholder:text-[var(--text-faint)] focus:outline-none focus:border-[var(--accent)] transition-all text-sm"
                  placeholder="admin@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full px-4 py-2.5 bg-[var(--bg-primary)] border border-[var(--border-structural)] text-[var(--text-main)] placeholder:text-[var(--text-faint)] focus:outline-none focus:border-[var(--accent)] transition-all text-sm"
                  placeholder="At least 8 characters"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[var(--text-main)] hover:bg-[var(--accent)] text-[var(--bg-primary)] font-mono text-xs uppercase tracking-wider py-3 px-4 transition-colors focus:outline-none"
              >
                Initialize Admin Account &rarr;
              </button>
            </form>
          ) : (
            <form action={handleLogin} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] mb-2"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-2.5 bg-[var(--bg-primary)] border border-[var(--border-structural)] text-[var(--text-main)] placeholder:text-[var(--text-faint)] focus:outline-none focus:border-[var(--accent)] transition-all text-sm"
                  placeholder="admin@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-2.5 bg-[var(--bg-primary)] border border-[var(--border-structural)] text-[var(--text-main)] placeholder:text-[var(--text-faint)] focus:outline-none focus:border-[var(--accent)] transition-all text-sm"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[var(--text-main)] hover:bg-[var(--accent)] text-[var(--bg-primary)] font-mono text-xs uppercase tracking-wider py-3 px-4 transition-colors focus:outline-none"
              >
                Sign In to Console
              </button>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-[var(--border-structural)] text-center">
            <p className="font-mono text-[10px] text-[var(--text-faint)] uppercase tracking-wider">
              {isFirstTime ? 'First-time setup workflow active' : 'Protected authentication gateway'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
