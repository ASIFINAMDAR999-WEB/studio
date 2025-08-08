
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

/**
 * Modal Component
 * A reusable, animated modal dialog.
 */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

export function Modal({ isOpen, onClose, title, description }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative w-full max-w-md m-4 p-8 bg-card rounded-2xl shadow-2xl border border-border"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">{title}</h2>
            <p className="text-muted-foreground mb-6">{description}</p>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>
            <button
              onClick={onClose}
              className="w-full text-lg font-bold py-3 px-6 rounded-lg text-primary-foreground transition-all duration-300 bg-primary hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/50"
            >
              Got it
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
