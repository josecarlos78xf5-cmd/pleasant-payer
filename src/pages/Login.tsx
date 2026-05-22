import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { lovable } from '@/integrations/lovable';
import { useToast } from '@/hooks/use-toast';
import { CircleDollarSign } from 'lucide-react';
import loginBg from '@/assets/login-bg.mp4.asset.json';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { user, loading, signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && user) {
      navigate('/', { replace: true });
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await signIn(email, password);
    setIsLoading(false);
    if (error) {
      toast({ title: 'Sign in failed', description: error.message, variant: 'destructive' });
    } else {
      navigate('/');
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth('google', {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        toast({ title: 'Google sign in failed', description: String(result.error), variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Google sign in failed', description: 'An unexpected error occurred', variant: 'destructive' });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-background font-sans">
      {/* Left: Auth Form */}
      <div className="flex w-full flex-col justify-center px-8 sm:px-12 lg:w-[540px] lg:px-20 bg-card border-r border-border/60">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-10">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <CircleDollarSign className="h-5 w-5" strokeWidth={2.25} />
            </div>
            <h1 className="mt-6 text-2xl font-semibold tracking-tight text-foreground font-display">
              ExpenseDesk
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to manage your workspace expenses
            </p>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
            className="flex w-full items-center justify-center gap-3 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted disabled:opacity-60"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.64l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.12c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.1H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.9l3.66-2.78z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.1l3.66 2.84c.87-2.6 3.3-4.56 6.16-4.56z" fill="#EA4335"/>
            </svg>
            {isGoogleLoading ? 'Signing in…' : 'Continue with Google'}
          </button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-border/70" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest">
              <span className="bg-card px-3 text-muted-foreground/80 font-medium">or continue with email</span>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="block w-full rounded-md border border-border bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 shadow-[0_1px_2px_rgba(15,23,42,0.04)] outline-none transition-all focus:border-ring focus:ring-2 focus:ring-ring/10"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Password
                </label>
                <a href="#" className="text-xs font-medium text-foreground/70 hover:text-foreground hover:underline">
                  Forgot?
                </a>
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="block w-full rounded-md border border-border bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 shadow-[0_1px_2px_rgba(15,23,42,0.04)] outline-none transition-all focus:border-ring focus:ring-2 focus:ring-ring/10"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-60"
            >
              {isLoading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-foreground hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>

      {/* Right: Visual Panel */}
      <div className="relative hidden flex-1 flex-col justify-end p-16 lg:flex bg-[hsl(218_23%_23%)] overflow-hidden">
        <video
          src={loginBg.url}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(218_23%_15%)]/90 via-[hsl(218_23%_23%)]/50 to-transparent" aria-hidden="true" />
        <div className="relative max-w-lg">
          <div className="mb-8 h-px w-24 bg-gradient-to-r from-white/40 to-transparent" />
          <h2 className="text-4xl font-semibold leading-tight text-white font-display tracking-tight">
            Streamline your expense management
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/70 font-light">
            Submit, track, and approve expenses — all in one place. Built for teams that value speed and precision.
          </p>

          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-3">
              <div className="h-10 w-10 rounded-full border-2 border-[hsl(218_23%_23%)] bg-slate-400" />
              <div className="h-10 w-10 rounded-full border-2 border-[hsl(218_23%_23%)] bg-slate-500" />
              <div className="h-10 w-10 rounded-full border-2 border-[hsl(218_23%_23%)] bg-slate-600" />
            </div>
            <p className="text-xs font-medium text-white/60 uppercase tracking-widest">Trusted by 500+ teams</p>
          </div>
        </div>
      </div>
    </div>
  );
}
