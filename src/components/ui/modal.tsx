
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import React from 'react';

/**
 * Modal Component
 * A reusable, animated modal dialog.
 */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, description, children }: ModalProps) {
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
            className="relative w-full max-w-md m-4 p-6 bg-card rounded-2xl shadow-2xl border border-border"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <div className='flex justify-between items-start'>
                <div className='space-y-1.5'>
                    <h2 className="text-xl font-bold text-foreground">{title}</h2>
                    {description && <p className="text-sm text-muted-foreground">{description}</p>}
                </div>
                <button
                    onClick={onClose}
                    className="text-muted-foreground hover:text-foreground transition-colors -mt-1 -mr-1"
                    aria-label="Close modal"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>
            
            <div className="mt-4">{children}</div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
