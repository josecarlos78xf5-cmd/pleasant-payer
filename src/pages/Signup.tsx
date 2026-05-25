import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { CircleDollarSign, CheckCircle2 } from 'lucide-react';

const DEPARTMENTS = ['Engineering', 'Marketing', 'Sales', 'Finance', 'HR', 'Operations', 'General'];

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [department, setDepartment] = useState('General');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { signUp } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await signUp(email, password, fullName, department);
    setIsLoading(false);
    if (error) {
      toast({ title: 'Sign up failed', description: error.message, variant: 'destructive' });
    } else {
      setSuccess(true);
    }
  };

  const inputClass =
    'block w-full rounded-md border border-border bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 shadow-[0_1px_2px_rgba(15,23,42,0.04)] outline-none transition-all focus:border-ring focus:ring-2 focus:ring-ring/10';
  const labelClass = 'block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5';

  return (
    <div className="flex min-h-screen w-full bg-background font-sans">
      <div className="flex w-full flex-col justify-center px-8 sm:px-12 lg:w-[540px] lg:px-20 bg-card border-r border-border/60">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-10">
            <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${success ? 'bg-success' : 'bg-primary'} text-primary-foreground shadow-sm`}>
              {success ? <CheckCircle2 className="h-5 w-5" /> : <CircleDollarSign className="h-5 w-5" strokeWidth={2.25} />}
            </div>
            <h1 className="mt-6 text-2xl font-semibold tracking-tight text-foreground font-display">
              {success ? 'Check your email' : 'Create your account'}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {success
                ? `We've sent a confirmation link to ${email}. Verify it to continue.`
                : 'Join PetixOps to manage your team expenses.'}
            </p>
          </div>

          {success ? (
            <Link to="/login" className="text-sm font-medium text-foreground hover:underline">
              ← Back to sign in
            </Link>
          ) : (
            <>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="fullName" className={labelClass}>Full name</label>
                  <input id="fullName" required value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Jane Doe" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>Email</label>
                  <input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="password" className={labelClass}>Password</label>
                  <input id="password" type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 6 characters" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Department</label>
                  <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger className="h-[42px] rounded-md border-border bg-card text-sm"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {DEPARTMENTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 disabled:opacity-60"
                >
                  {isLoading ? 'Creating account…' : 'Create account'}
                </button>
              </form>
              <p className="mt-8 text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-foreground hover:underline">Sign in</Link>
              </p>
            </>
          )}
        </div>
      </div>

      <div className="relative hidden flex-1 flex-col justify-end p-16 lg:flex bg-[hsl(218_23%_23%)] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '24px 24px' }}
          aria-hidden="true"
        />
        <div className="relative max-w-lg">
          <div className="mb-8 h-px w-24 bg-gradient-to-r from-white/40 to-transparent" />
          <h2 className="text-4xl font-semibold leading-tight text-white font-display tracking-tight">
            Built for finance teams that ship.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/70 font-light">
            From draft to reimbursement in a single, auditable workflow. Set up in minutes.
          </p>
        </div>
      </div>
    </div>
  );
}
