
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

export function TestimonialSection() {
  return (
    <section id="testimonial" className="py-20 md:py-28 bg-card">
       <div className="container px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in-up">
             <h2 className="text-3xl md:text-4xl font-bold">What Our Customers Say</h2>
          </div>
          <Card className="max-w-2xl mx-auto shadow-lg bg-background animate-fade-in-up [animation-delay:200ms]">
             <CardContent className="pt-6">
                <blockquote className="text-lg italic text-center text-muted-foreground border-l-4 border-primary pl-6">
                   "The best service for spoofing calls. The voice changer is amazing and the connection is always stable. Highly recommended for anyone looking for privacy and features!"
                </blockquote>
                <div className="flex items-center justify-center mt-6">
                    <Avatar>
                       <AvatarImage src="https://placehold.co/40x40.png" alt="@johndoe" data-ai-hint="man" />
                       <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 text-left">
                       <p className="font-semibold">John Doe</p>
                       <p className="text-sm text-muted-foreground">Freelancer</p>
                    </div>
                </div>
             </CardContent>
          </Card>
       </div>
    </section>
  );
}
