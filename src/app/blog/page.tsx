
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

// Placeholder data - this will be replaced with real data from Markdown files in the next step.
const placeholderPosts = [
  {
    slug: 'understanding-call-spoofing-technology',
    title: 'Understanding Call Spoofing Technology',
    summary: 'A deep dive into the technology behind call spoofing, its legitimate use cases in professional fields, and how it works.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'network abstract'
  },
  {
    slug: 'top-5-spoof-call-apps-2025',
    title: 'Top 5 Spoof Call Apps in 2025',
    summary: 'Discover the leading applications for call spoofing and how they stack up against each other in terms of features, reliability, and user experience.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'technology security'
  },
  {
    slug: 'is-call-spoofing-legal-usa-uk',
    title: 'Is Call Spoofing Legal in USA/UK?',
    summary: 'A deep dive into the legal landscape of call spoofing in the United States and the United Kingdom. Understand the regulations to use the service responsibly.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'legal gavel'
  },
];

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              The REDArmor Blog
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Insights on privacy, security, and communication technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up [animation-delay:200ms]">
            {placeholderPosts.map((post) => (
              <Card key={post.slug} className="group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <CardHeader className="p-0">
                  <div className="overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint={post.dataAiHint}
                    />
                  </div>
                </CardHeader>
                <CardContent className="flex-1 p-6">
                  <CardTitle className="text-xl font-semibold mb-2 leading-snug">{post.title}</CardTitle>
                  <p className="text-muted-foreground text-sm">{post.summary}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                    <Link href={`/blog/${post.slug}`}>
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
