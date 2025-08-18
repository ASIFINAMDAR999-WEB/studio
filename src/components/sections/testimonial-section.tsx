
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

export function TestimonialSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  return (
    <section id="testimonial" className="py-20 md:py-28 bg-card" aria-labelledby="testimonial-heading">
       <div className="container px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in-up">
             <h2 id="testimonial-heading" className="text-3xl md:text-4xl font-bold">What Our Client's Say</h2>
          </div>
          <div className="max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
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
                       <Card className="shadow-lg bg-background h-full flex flex-col justify-between">
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
          </div>
       </div>
    </section>
  );
}
