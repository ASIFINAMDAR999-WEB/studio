
'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// The valid access code. In a real app, this would be validated on a server.
const VALID_CODE = 'loginaccess:9383';

/**
 * AccessScreen Component
 * This component handles the UI and logic for access code validation.
 * It includes an input field, a submit button, loading and error states, and animations.
 */
export function AccessScreen({ onSuccess }: { onSuccess: () => void }) {
  // State for the input code, loading status, and error messages.
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input field on component mount.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // --- Animation Variants for Framer Motion ---
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: 'easeIn' } },
  };

  const shakeAnimation = {
    x: [-10, 10, -10, 10, 0],
    transition: { duration: 0.5 },
  };

  /**
   * Handles form submission.
   * Validates the code and manages loading/error states.
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (code.length < 5 || isLoading) return;

    setIsLoading(true);
    setError(null);

    // Simulate a 1-second network delay for validation.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Validate the code.
    if (code === VALID_CODE) {
      onSuccess(); // Trigger the success callback to switch screens.
    } else {
      // On failure, set an error message and trigger the shake animation.
      setError('Invalid code. Please try again.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500); // Reset shake animation
      setCode(''); // Clear input on error
    }

    setIsLoading(false);
  };

  return (
    <motion.div
      className="w-full max-w-md"
      variants={cardVariants}
      initial="hidden"
      animate={["visible", isShaking ? "shaking" : ""]}
      exit="exit"
      custom={{ shake: shakeAnimation }}
      // Apply shake animation if isShaking is true
      variants={{
        ...cardVariants,
        shaking: shakeAnimation,
      }}
    >
      <div className="relative rounded-2xl shadow-2xl bg-card/60 dark:bg-card/40 backdrop-blur-xl border border-white/10">
        <div className="p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-8">
            Enter Access Code
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* --- Floating Label Input --- */}
            <div className="relative group">
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
                  'block w-full px-4 py-3 text-lg bg-background/50 rounded-lg border-2 peer transition-all duration-300',
                  'focus:outline-none focus:ring-4 focus:ring-primary/20',
                  error
                    ? 'border-destructive focus:border-destructive'
                    : 'border-muted-foreground/30 focus:border-primary',
                  'placeholder-transparent'
                )}
                placeholder="Enter your access code"
              />
              <label
                htmlFor="access-code"
                className={cn(
                  'absolute left-4 transition-all duration-300 pointer-events-none text-muted-foreground',
                  'peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base',
                  'peer-focus:-top-2 peer-focus:text-sm',
                  'peer-focus:px-1 peer-focus:bg-card/60 dark:peer-focus:bg-card/40',
                  code ? '-top-2 text-sm px-1 bg-card/60 dark:bg-card/40' : '',
                  error ? 'text-destructive' : 'peer-focus:text-primary'
                )}
              >
                Enter your access code
              </label>
            </div>

            {/* --- Submit Button --- */}
            <motion.button
              type="submit"
              disabled={code.length < 5 || isLoading}
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

          {/* --- Error Message --- */}
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
