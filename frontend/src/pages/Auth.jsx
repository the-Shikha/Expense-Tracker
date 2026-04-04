import { useState } from 'react';
import { ShieldCheck, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';

export function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password, role);
      } else {
        await signIn(email, password);
      }
    } catch (err) {
      setError(err?.message || 'Authentication Protocol Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center p-6 relative overflow-hidden">
      
     
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-rose-500/10 blur-[120px] rounded-full animate-pulse delay-700" />

      <div className="relative w-full max-w-md">
        
      
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-3xl border border-gray-100 dark:border-white/5 rounded-[3rem] p-10 md:p-12 shadow-2xl shadow-black/20">
          
         
          <div className="flex flex-col items-center mb-10">
            <div className="relative group mb-6">
              <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative bg-gray-950 dark:bg-white rounded-2xl p-4 shadow-xl">
                <ShieldCheck className="w-8 h-8 text-white dark:text-black" strokeWidth={2.5} />
              </div>
            </div>

            <div className="text-center space-y-1">
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-indigo-500">Secure Gateway</span>
              <h1 className="text-3xl font-bold tracking-tighter text-gray-950 dark:text-white uppercase">
                Terminal V3
              </h1>
              <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                {isSignUp ? 'Initialize New Identity' : 'Verify Credentials'}
              </p>
            </div>
          </div>

         
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="email"
              label="System Identity (Email)"
              placeholder="id_001@network.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              type="password"
              label="Access Code"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />

            {isSignUp && (
              <Select
                label="Clearance Level"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                options={[
                  { value: 'admin', label: 'Lvl 02: Administrative' },
                  { value: 'viewer', label: 'Lvl 01: Read-Only' },
                ]}
              />
            )}

            {error && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 animate-in shake duration-500">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="stealth"
              className="w-full py-5 group"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                  Synchronizing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  {isSignUp ? 'Create Identity' : 'Authorize Access'}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>

       
          <div className="mt-10 pt-8 border-t border-gray-100 dark:border-white/5 text-center">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              className="group text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-indigo-500 transition-colors"
            >
              {isSignUp
                ? 'Back to Secure Login'
                : "Need clearance? Initialize Account"}
              <div className="h-px w-0 group-hover:w-full bg-indigo-500 transition-all duration-300 mx-auto mt-1" />
            </button>
          </div>

        </div>

        
        <p className="mt-8 text-center text-[9px] font-black text-gray-400 uppercase tracking-[0.5em] opacity-40">
          Encrypted Data Stream v4.2.0
        </p>
      </div>
    </div>
  );
}