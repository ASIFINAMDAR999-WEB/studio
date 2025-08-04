
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
    <section id="features" className="py-20 md:py-28 bg-card" aria-labelledby="features-heading">
      <div className="container px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h2 id="features-heading" className="text-3xl md:text-4xl font-bold">Why Choose Us?</h2>
          <p className="mt-4 text-muted-foreground">
            We provide a robust set of features to ensure you have the best experience.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
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
