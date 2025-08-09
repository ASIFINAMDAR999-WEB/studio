
'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import ReCAPTCHA from 'react-google-recaptcha';

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const VALID_CODES: Record<string, string> = {
  'platinum:1111': 'Platinum 1-Month',
  'gold:2222': 'Gold Plan',
  'diamond:3333': 'Diamond Plan',
  'platinum3m:4444': 'Platinum Plan',
};

export function AccessScreen({ onSuccess }: { onSuccess: (planName: string) => void }) {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  if (!RECAPTCHA_SITE_KEY) {
    return (
        <div className="w-full max-w-md p-8 text-center bg-card rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-destructive">reCAPTCHA Not Configured</h2>
            <p className="mt-2 text-muted-foreground">
                Please add your reCAPTCHA v2 Site Key to your environment variables as <code>NEXT_PUBLIC_RECAPTCHA_SITE_KEY</code>.
            </p>
        </div>
    );
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: 'easeIn' } },
    shaking: {
      x: [-10, 10, -10, 10, 0],
      transition: { duration: 0.5 },
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (code.length < 5 || isLoading || !recaptchaToken) return;

    setIsLoading(true);
    setError(null);

    // **IMPORTANT**: In a real application, you would send the `recaptchaToken`
    // and the `code` to your backend (e.g., a Firebase Function) for verification.
    // The backend would verify the reCAPTCHA token with Google using your SECRET KEY
    // and then validate the access code.

    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const planName = VALID_CODES[code];

    if (planName) {
      onSuccess(planName);
    } else {
      setError('Invalid code. Please try again.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setCode('');
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
    }

    setIsLoading(false);
  };

  return (
    <motion.div
      className="w-full max-w-md"
      variants={cardVariants}
      animate={isShaking ? "shaking" : "visible"}
      initial="hidden"
      exit="exit"
    >
      <div className="relative rounded-2xl shadow-2xl bg-card/60 dark:bg-card/40 backdrop-blur-xl border border-white/10">
        <div className="p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-8">
            Enter Access Code
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
               <label htmlFor="access-code" className="sr-only">Access Code</label>
              <input
                ref={inputRef}
                type="text"
                id="access-code"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  if (error) setError(null);
                }}
                disabled={isLoading}
                className={cn(
                  'block w-full px-4 py-3 text-lg bg-background/50 rounded-lg border-2 transition-all duration-300',
                  'focus:outline-none focus:ring-4 focus:ring-primary/20',
                  error
                    ? 'border-destructive focus:border-destructive'
                    : 'border-muted-foreground/30 focus:border-primary'
                )}
                placeholder="Enter your access code"
              />
            </div>

            <div className="flex justify-center">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={(token) => setRecaptchaToken(token)}
                onExpired={() => setRecaptchaToken(null)}
                theme="dark"
              />
            </div>

            <motion.button
              type="submit"
              disabled={code.length < 5 || isLoading || !recaptchaToken}
              className={cn(
                'w-full text-lg font-bold py-4 px-6 rounded-lg text-white transition-all duration-300 overflow-hidden relative group/button',
                'bg-gradient-to-r from-primary to-accent',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1',
                'focus:outline-none focus:ring-4 focus:ring-primary/50'
              )}
              whileTap={{ scale: 0.98 }}
            >
              <span className="absolute inset-0 bg-black/10 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300"></span>
              <span className="relative">
                 {isLoading ? (
                    <div className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    <span>Validating...</span>
                    </div>
                ) : (
                    'Continue'
                )}
              </span>
            </motion.button>
          </form>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-destructive text-center mt-4 font-medium"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
