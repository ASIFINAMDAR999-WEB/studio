
'use client';
import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { testimonials } from '@/lib/data';
import Autoplay from "embla-carousel-autoplay"
import { motion } from 'framer-motion';

export function TestimonialSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <motion.section 
      id="testimonial" 
      className="py-20 md:py-28 bg-card" 
      aria-labelledby="testimonial-heading"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
       <div className="container px-4 sm:px-6">
          <motion.div className="text-center max-w-3xl mx-auto mb-12" variants={itemVariants}>
             <h2 id="testimonial-heading" className="text-3xl md:text-4xl font-bold">What Our Client's Say</h2>
          </motion.div>
          <motion.div className="max-w-4xl mx-auto" variants={itemVariants}>
            <Carousel
              plugins={[plugin.current]}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-4 h-full">
                       <Card className="shadow-lg bg-background h-full flex flex-col justify-between group rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 border border-transparent hover:border-primary/50">
                         <CardContent className="pt-6">
                            <blockquote className="text-lg italic text-muted-foreground border-l-4 border-primary pl-6">
                               {testimonial.quote}
                            </blockquote>
                            <div className="mt-6 text-right">
                               <p className="font-semibold">{testimonial.name}</p>
                               <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                            </div>
                         </CardContent>
                       </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:inline-flex" />
              <CarouselNext className="hidden md:inline-flex" />
            </Carousel>
          </motion.div>
       </div>
    </motion.section>
  );
}
