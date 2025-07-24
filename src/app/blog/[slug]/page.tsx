
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import Image from 'next/image';
import { Calendar, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

// This component will display a single blog post.
// In the next step, we'll fetch real content from Markdown files based on the 'slug' parameter.

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // Placeholder content
  const post = {
    title: 'Understanding Call Spoofing Technology',
    author: 'REDArmor Team',
    date: 'October 26, 2023',
    image: 'https://placehold.co/1200x600.png',
    dataAiHint: 'network abstract',
    content: `
      <p>Call spoofing is a technology that allows a caller to change the Caller ID to any number they choose. This practice, while sometimes associated with misuse, has numerous legitimate and legal applications in various professional fields.</p>
      <h3 class="text-2xl font-bold mt-8 mb-4">How Does It Work?</h3>
      <p>The technology works by leveraging Voice over IP (VoIP), which allows for greater control over the data sent during a call. When a call is placed through a VoIP service, the user can specify the phone number they want to be displayed as the Caller ID. This information is then sent through the telephone network to the recipient's phone.</p>
      <h3 class="text-2xl font-bold mt-8 mb-4">Legitimate Use Cases</h3>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li><strong>Protecting Personal Privacy:</strong> Doctors, lawyers, and other professionals can call clients from their personal phones without revealing their private numbers.</li>
        <li><strong>Business Branding:</strong> A business can display its main customer service number, regardless of which extension or department is making the call.</li>
        <li><strong>Enhancing Answer Rates:</strong> Sales and marketing teams can display a local number when calling potential clients, which can significantly increase the likelihood of the call being answered.</li>
      </ul>
      <p>It's crucial to understand the legalities surrounding call spoofing in your jurisdiction. In many countries, spoofing is legal as long as it's not done with the intent to defraud, cause harm, or wrongly obtain anything of value.</p>
    `
  };

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <article className="max-w-4xl mx-auto">
            <header className="mb-8 text-center animate-fade-in-up">
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">{post.title}</h1>
              <div className="flex justify-center items-center gap-6 text-muted-foreground text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time>{post.date}</time>
                </div>
              </div>
            </header>

            <Card className="overflow-hidden shadow-xl mb-12 animate-fade-in-up [animation-delay:200ms]">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={1200}
                  height={600}
                  className="w-full object-cover"
                  priority
                  data-ai-hint={post.dataAiHint}
                />
            </Card>

            <Card className="shadow-lg animate-fade-in-up [animation-delay:400ms]">
                <CardContent className="py-8">
                    <div
                    className="prose prose-lg dark:prose-invert max-w-none mx-auto text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </CardContent>
            </Card>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
