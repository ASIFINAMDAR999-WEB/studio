
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from '@/lib/data';

export function FaqSection() {
  return (
    <section id="faq" className="py-20 md:py-28">
       <div className="container px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
              <p className="mt-4 text-muted-foreground">
                 Have questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
              </p>
          </div>
          <div className="max-w-3xl mx-auto animate-fade-in-up [animation-delay:200ms]">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem value={`item-${index+1}`} key={index} className="rounded-lg mb-2 px-4 transition-all duration-300 hover:shadow-lg">
                  <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
       </div>
    </section>
  );
}
