'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTheme } from 'next-themes';

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export function AccessScreen({ onSuccess }: { onSuccess: (planName: string) => void }) {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const { theme } = useTheme();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  if (!RECAPTCHA_SITE_KEY) {
    return (
        <div className="w-full max-w-md p-8 text-center bg-card rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-destructive">System Error</h2>
            <p className="mt-2 text-muted-foreground">The access portal is currently unavailable.</p>
        </div>
    );
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    shaking: { x: [-10, 10, -10, 10, 0], transition: { duration: 0.5 } }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (code.length < 5 || isLoading || !recaptchaToken) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/validate-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, recaptchaToken }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        onSuccess(data.planName);
      } else {
        setError(data.error || 'Invalid code.');
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
        setCode('');
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
      }
    } catch (err) {
      setError('Connection failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="w-full max-w-md"
      variants={cardVariants}
      animate={isShaking ? "shaking" : "visible"}
      initial="hidden"
      exit={{ opacity: 0, y: -50 }}
    >
      <div className="relative rounded-2xl bg-card/60 dark:bg-card/40 backdrop-blur-xl border-2 border-primary/40 transform-gpu transition-all shadow-glow">
        <div className="p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Enter Access Code</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                ref={inputRef}
                type={isPasswordVisible ? 'text' : 'password'}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className={cn(
                  'block w-full px-4 pr-12 py-3 text-lg bg-background/50 rounded-lg border-2 transition-all',
                  error ? 'border-destructive' : 'border-muted-foreground/30 focus:border-primary'
                )}
                placeholder="Access Code"
              />
              <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)} className="absolute inset-y-0 right-0 pr-4 text-muted-foreground">
                {isPasswordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <div className="flex justify-center">
              <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} onChange={setRecaptchaToken} theme={theme === 'dark' ? 'dark' : 'light'} />
            </div>
            <Button type="submit" disabled={code.length < 5 || isLoading || !recaptchaToken} className="w-full py-6 text-lg bg-gradient-to-r from-primary to-accent">
              {isLoading ? <Loader2 className="animate-spin h-6 w-6" /> : 'Continue'}
            </Button>
          </form>
          <AnimatePresence>{error && <motion.p className="text-destructive text-center mt-4">{error}</motion.p>}</AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}