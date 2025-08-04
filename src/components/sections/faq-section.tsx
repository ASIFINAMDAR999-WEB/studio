
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from '@/lib/data';
import type { FAQPage, WithContext } from 'schema-dts';

export function FaqSection() {
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

  return (
    <section id="faq" className="py-20 md:py-28" aria-labelledby="faq-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
       <div className="container px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in-up">
              <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
              <p className="mt-4 text-muted-foreground">
                 Have questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
              </p>
          </div>
          <div className="max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <Accordion type="single" collapsible className="w-full space-y-3">
              {faqItems.map((item, index) => (
                <AccordionItem value={`item-${index+1}`} key={index} className="bg-card border rounded-lg transition-all duration-300 hover:shadow-lg hover:bg-muted/30">
                  <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline px-6 py-4">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground px-6 pb-4">
                    <p className="border-t pt-4">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
       </div>
    </section>
  );
}
