'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from '@/lib/data';
import type { FAQPage, WithContext } from 'schema-dts';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import { useState } from "react";

export function FaqSection() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const faqSchema: WithContext<FAQPage> = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <section id="faq" className="py-20 md:py-28" aria-labelledby="faq-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
       <div className="container px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-in fade-in-up">
              <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
              <p className="mt-4 text-muted-foreground">
                 Have questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
              </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion 
              type="single" 
              collapsible 
              className="w-full space-y-3"
              onValueChange={setOpenItem}
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="space-y-3"
              >
                {faqItems.map((item, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <AccordionItem 
                      value={`item-${index+1}`} 
                      className={cn(
                        "bg-card border rounded-lg transition-all duration-300 hover:border-primary/50",
                        openItem === `item-${index+1}` ? "shadow-glow border-primary/50" : "hover:shadow-lg"
                      )}
                    >
                      <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline px-6 py-4">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground px-6 pb-4">
                        <p className="border-t pt-4">{item.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </motion.div>
            </Accordion>
          </div>
       </div>
    </section>
  );
}
