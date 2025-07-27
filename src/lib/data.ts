
export type Plan = {
    name: string;
    priceString: string;
    duration: string;
    description: string;
    features: string[];
    highlight: boolean;
    cta: string;
    isHot?: boolean;
    priceOptions?: string[];
};

export const plans: Plan[] = [
  {
    name: 'Platinum 1-Month',
    priceString: '$100',
    duration: '/month',
    description: '1 Month Unlimited Calling — For New Clients Only',
    features: [
      'Unlock Advanced Call Spoofing',
      'Access the Premium Voice Changer',
      'Utilize Enhanced Routing Capabilities',
      'Receive Priority Customer Support',
      'Gain Access to the Advanced OTP Bot',
      'Full Access to Website & Application',
      'Utilize Email & SMS Spoofing Features',
      'Implement a Professional IVR System',
      'Spoof Premium Toll-Free Numbers',
      'Leverage Premium SIP Trunk Access',
    ],
    highlight: true,
    isHot: true,
    cta: 'Choose Plan',
  },
  {
    name: 'Gold Plan',
    priceString: '$90',
    duration: '/month',
    description: '1 Month Unlimited Calling — no per-minute charges',
    features: [
      'Full Access to Call Spoofing',
      'Use the Standard Voice Changer',
      'Full Access to Website & Application',
    ],
    highlight: false,
    isHot: false,
    cta: 'Choose Plan',
  },
  {
    name: 'Diamond Plan',
    priceString: '$200',
    duration: '/2 months',
    description: '2 Months Unlimited Calling — no per-minute charges',
    features: [
      'Unlock Advanced Call Spoofing',
      'Access the Premium Voice Changer',
      'Utilize Enhanced Call Routing',
      'Gain Access to the Advanced OTP Bot',
      'Full Access to Website & Application',
      'Utilize Email & SMS Spoofing Features',
      'Implement a Professional IVR System',
      'Spoof Toll-Free Numbers',
      'Standard SIP Trunk Access (inbound & outbound)',
    ],
    highlight: false,
    isHot: false,
    cta: 'Choose Plan',
  },
  {
    name: 'Platinum Plan',
    priceString: '$300',
    duration: '/3 months',
    description: '3 Months Unlimited Calling — no per-minute charges',
    features: [
      'Unlock Advanced Call Spoofing',
      'Access the Premium Voice Changer',
      'Utilize Enhanced Routing Capabilities',
      'Receive Priority Customer Support',
      'Gain Access to the Advanced OTP Bot',
      'Full API & Custom Integration Support',
      'Full Access to Website & Application',
      'Utilize Email & SMS Spoofing Features',
      'Implement a Professional IVR System',
      'Spoof Premium Toll-Free Numbers',
      'Leverage Premium SIP Trunk Access',
    ],
    highlight: false,
    isHot: false,
    cta: 'Choose Plan',
  },
  {
    name: 'Silver Plan',
    priceString: '',
    priceOptions: ['$50', '$100', '$250', '$500'],
    duration: '',
    description: 'For virtual numbers and eSIMs',
    features: [
        'Manual top-up via Admin: @AF3092',
        'Service for virtual numbers and eSIMs only'
    ],
    highlight: false,
    isHot: false,
    cta: '', // CTA is handled by the price options now
  },
];

export const faqItems = [
  {
    question: "How do I purchase a plan?",
    answer: "To purchase or top-up a plan, please contact our admin directly on Telegram at @AF3092. We accept payments through various cryptocurrencies, including USDT, BTC, ETH, LTC, and XRP."
  },
  {
    question: "What does 'top-up' mean?",
    answer: "A 'top-up' refers to adding credit or funds to your account. For our service, this is done by purchasing one of the available plans (e.g., Silver, Gold, Platinum) through our Telegram admin."
  },
  {
    question: "Can I see a demo of the service?",
    answer: "Yes, we have demo videos available. You can view them on our official Telegram channel here: https://t.me/+Eg-SFpyzbpM0YzM1. We do not offer free trials at this time."
  },
  {
    question: "What features are included in the plans?",
    answer: "Our plans offer a range of features, including advanced call spoofing, premium voice changers, OTP bots, SMS spoofing, and more. Please check the 'Our Plans' section for a detailed list of features for each specific plan."
  },
  {
    question: "Is it legal to use these services?",
    answer: "The legality of services like call spoofing depends on your jurisdiction and how you use the service. It is your responsibility to comply with all local, state, and national laws. Use for fraudulent or harassing purposes is strictly forbidden, as stated in our Terms of Service."
  },
];

export const testimonials = [
    {
      quote: "The best service for spoofing calls. The voice changer is amazing and the connection is always stable. Highly recommended for anyone looking for privacy and features!",
      name: "John D.",
      role: "USA Customer"
    },
    {
      quote: "I've tried other services, but this one is by far the most reliable and feature-rich. The customer support is also top-notch, always ready to help.",
      name: "Jane S.",
      role: "UK Customer"
    },
    {
        quote: "The setup was incredibly easy, and I was making calls in minutes. The premium voice changer is a game-changer for my business.",
        name: "Alex J.",
        role: "EU Customer"
    },
    {
        quote: "I was skeptical at first, but the quality of the calls is crystal clear. The Platinum Plan is worth every penny for the advanced features.",
        name: "Samantha L.",
        role: "USA Customer"
    },
    {
        quote: "The crypto payment option is a huge plus for me. It's fast, secure, and private. The service itself is flawless.",
        name: "Michael C.",
        role: "Verified Customer"
    },
    {
        quote: "Their support team is fantastic. I had a question about the SIP trunk access, and they were incredibly knowledgeable and helpful.",
        name: "Emily R.",
        role: "Verified Customer"
    },
    {
      quote: "The IVR system is a professional touch that sets this service apart. It has streamlined my client communications significantly. A+ service.",
      name: "David P.",
      role: "USA Customer"
    },
    {
      quote: "Unmatched reliability and privacy. I have full confidence in their infrastructure and their commitment to client anonymity. Worth every cent.",
      name: "Olivia B.",
      role: "UK Customer"
    },
    {
      quote: "As a security consultant, I need tools that are both powerful and discreet. CallCraft delivers on all fronts. The OTP bot is particularly impressive.",
      name: "Ben G.",
      role: "EU Customer"
    }
];
