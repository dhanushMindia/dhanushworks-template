export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation'
import { auth, signIn } from '@/lib/auth'

export default async function LoginPage() {
  const session = await auth()

  if (session?.user) {
    redirect('/admin')
  }

  async function handleLogin(formData: FormData) {
    'use server'

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        throw new Error("Invalid email or password.")
      }
    } catch (error: any) {
      if (error.message?.includes("NEXT_REDIRECT")) {
        throw error;
      }
      throw error;
    }

    redirect('/admin')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] px-4 py-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] mb-3">Private Portal</p>
          <h1 className="text-4xl font-serif font-semibold text-[var(--text-main)] mb-3">
            Sign In
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            Access your portfolio administration console
          </p>
        </div>

        <div className="bg-[var(--bg-secondary)]/20 border border-[var(--border-structural)] p-8 shadow-sm">
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

          <div className="mt-6 pt-6 border-t border-[var(--border-structural)] text-center">
            <p className="font-mono text-[10px] text-[var(--text-faint)] uppercase tracking-wider">
              Protected authentication gateway
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
