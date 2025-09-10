
import Image from 'next/image';
import { ShieldCheck, Zap, Coins, Headset, Globe } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />,
      title: 'Encrypted & Secure',
      description: 'Your privacy is our priority. All communications are fully encrypted.',
    },
    {
      icon: <Zap className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />,
      title: 'Fast and Effective',
      description: 'Our powerful infrastructure ensures your calls connect instantly.',
    },
    {
      icon: <Coins className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />,
      title: 'Crypto Payments',
      description: 'We accept various cryptocurrencies for anonymous and secure payments.',
    },
    {
      icon: <Headset className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />,
      title: '24/7 Live Support',
      description: 'Our dedicated support team is always here to help you out.',
    },
    {
      icon: <Globe className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />,
      title: 'Global Service Reach',
      description: 'Our services are available to clients worldwide, with no geographical restrictions.',
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28 bg-card relative overflow-hidden" aria-labelledby="features-heading">
      <div className="absolute inset-0 flex items-center justify-center -z-0">
        <Image
          src="https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/Picsart_25-09-10_19-47-45-483.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9QaWNzYXJ0XzI1LTA5LTEwXzE5LTQ3LTQ1LTQ4My5wbmciLCJpYXQiOjE3NTc1MTM5OTcsImV4cCI6MjA3Mjg3Mzk5N30.VkMQ0YzgMTKXPqI06HIz9e2z1RKGtVJTjJt6GtmLnCs"
          alt="World Map"
          width={1200}
          height={600}
          className="w-full max-w-6xl h-auto object-contain opacity-5 dark:opacity-100 dark:filter dark:grayscale dark:invert-[15%] dark:brightness-50 dark:saturate-[5] dark:hue-rotate-[200deg] dark:blur-sm dark:animate-pulse"
          style={{
            maskImage: 'radial-gradient(ellipse at center, white 30%, transparent 70%)',
          }}
          data-ai-hint="world map background"
        />
      </div>
      <div className="container px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h2 id="features-heading" className="text-3xl md:text-4xl font-bold">Why Choose Us?</h2>
          <p className="mt-4 text-muted-foreground">
            We provide a robust set of features to ensure you have the best experience.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 justify-center">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-4 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto mb-4 group">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
