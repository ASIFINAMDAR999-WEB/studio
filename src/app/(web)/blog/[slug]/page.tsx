

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Calendar, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { CtaSection } from '@/components/sections/cta-section';
import type { Metadata } from 'next';

const posts: { [key: string]: any } = {
    'understanding-call-spoofing-technology': {
      title: 'Understanding Call Spoofing Technology',
      author: 'REDArmor v0.2 Team',
      date: 'October 26, 2023',
      summary: 'A deep dive into the technology behind call spoofing, its legitimate use cases in professional fields, and how it works.',
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
    },
    'top-5-spoof-call-apps-2025': {
      title: 'Top 5 Spoof Call Apps in 2025',
      author: 'REDArmor v0.2 Team',
      date: 'October 20, 2023',
      summary: 'Discover the leading applications for call spoofing and how they stack up against each other in terms of features, reliability, and user experience.',
      content: `<p>As technology evolves, so do the tools available for privacy and professional communication. Here, we review the top 5 spoof call applications making waves in 2025, evaluating them on features, ease of use, and reliability for users in the USA and Europe.</p>`
    },
    'is-call-spoofing-legal-usa-uk': {
        title: 'Is Call Spoofing Legal in USA/UK?',
        author: 'Legal Team',
        date: 'October 15, 2023',
        summary: 'A deep dive into the legal landscape of call spoofing in the United States and the United Kingdom. Understand the regulations to use the service responsibly.',
        content: `<p>The legality of call spoofing is a common question. This article breaks down the legal frameworks in the United States and the United Kingdom, such as the Truth in Caller ID Act, to help you understand the boundaries of lawful use.</p>`
    },
    'how-our-call-spoofing-service-works': {
      title: 'How Our Call Spoofing Service Works',
      author: 'REDArmor v0.2 Team',
      date: 'November 2, 2023',
      summary: 'A transparent, step-by-step guide to how our service operates, from choosing a plan and making a payment to getting activated and making your first call.',
      content: `
        <p>We believe in transparency and empowering our clients. Understanding how our service operates is key to using it effectively and legally. Here’s a step-by-step breakdown of the process from purchase to making your first call.</p>
        <h3 class="text-2xl font-bold mt-8 mb-4">Step 1: Choose Your Plan</h3>
        <p>We offer a range of plans tailored to different needs, from monthly subscriptions to top-up options. Select the one that best fits your usage requirements on our pricing page.</p>
        <h3 class="text-2xl font-bold mt-8 mb-4">Step 2: Secure Payment with Cryptocurrency</h3>
        <p>To protect your privacy, we exclusively accept cryptocurrency payments. Follow the instructions on the payment page to send the correct amount to the specified wallet address.</p>
        <h3 class="text-2xl font-bold mt-8 mb-4">Step 3: Contact Admin for Activation</h3>
        <p>Once your payment is complete, send a screenshot of the transaction to our admin on Telegram (@AF3092). This allows us to verify the payment and prepare your account.</p>
        <h3 class="text-2xl font-bold mt-8 mb-4">Step 4: Receive Your Credentials</h3>
        <p>Our admin will provide you with the necessary credentials and instructions to access our service, either through our web application or mobile app. Your account will be activated and ready to use.</p>
        <h3 class="text-2xl font-bold mt-8 mb-4">Step 5: Make Your First Spoofed Call</h3>
        <p>Log in to the platform, enter the number you wish to call, specify the Caller ID you want to display, and initiate the call. Our powerful infrastructure handles the rest, ensuring a clear and stable connection.</p>
        <p class="mt-4">Our process is designed to be secure, private, and straightforward. If you have any questions at any step, our 24/7 support team is available on Telegram to assist you.</p>
      `
    }
  };

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = posts[params.slug] || {};
  const { title, summary } = post;
  const pageTitle = title ? `${title} | REDArmor v0.2 Blog` : 'REDArmor v0.2 Blog';

  return {
    title: pageTitle,
    description: summary,
    openGraph: {
      title: pageTitle,
      description: summary,
      type: 'article',
      url: `https://callspoofing.shop/blog/${params.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: summary,
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = posts[params.slug] || posts['understanding-call-spoofing-technology'];

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <div className="py-16 md:py-24">
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
        </div>
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
