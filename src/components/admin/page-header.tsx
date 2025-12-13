
'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <motion.div
      className={cn(
        'relative mb-8 overflow-hidden rounded-lg border bg-card/50 p-6 shadow-sm',
        className
      )}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="relative z-10">
        <motion.h1
          variants={itemVariants}
          className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            variants={itemVariants}
            className="mt-2 text-sm text-muted-foreground sm:text-base"
          >
            {description}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
