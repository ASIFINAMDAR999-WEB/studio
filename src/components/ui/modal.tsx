
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';

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
  className?: string;
}

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: {
    y: 30,
    scale: 0.95,
    opacity: 0,
  },
  visible: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30,
      staggerChildren: 0.05,
    },
  },
  exit: {
    y: 30,
    scale: 0.95,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    },
  },
};

export function Modal({ isOpen, onClose, title, description, children, className }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              "relative w-[90%] max-w-md m-4 p-6 bg-card/80 dark:bg-card/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 transform-gpu",
              className
            )}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <div className='flex justify-between items-start'>
                <div className='space-y-1.5'>
                    <motion.h2 variants={modalVariants} className="text-xl font-bold text-foreground">{title}</motion.h2>
                    {description && <motion.p variants={modalVariants} className="text-sm text-muted-foreground">{description}</motion.p>}
                </div>
                <button
                    onClick={onClose}
                    className="text-muted-foreground hover:text-foreground transition-colors -mt-1 -mr-1"
                    aria-label="Close modal"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>
            
            <motion.div variants={modalVariants} className="mt-4">{children}</motion.div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
