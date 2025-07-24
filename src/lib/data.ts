
export type Plan = {
    name: string;
    priceString: string;
    duration: string;
    description: string;
    features: string[];
    highlight: boolean;
    cta: string;
    isHot?: boolean;
};

export const plans: Plan[] = [
  {
    name: 'Platinum 1-Month',
    priceString: '$100',
    duration: '/month',
    description: '1 Month Unlimited Calling — no per-minute charges',
    features: [
      'Comprehensive Call Spoofing Capabilities',
      'Access to Premium Voice Changer Library',
      'Optimized Call Routing for Peak Performance',
      '24/7 Priority Customer Support',
      'Advanced OTP Bot Integration',
      'Full Access to Web and Mobile Platforms',
      'Integrated Email & SMS Spoofing Tools',
      'Interactive Voice Response (IVR) System',
      'Premium Toll-Free Number Spoofing',
      'Dedicated Premium SIP Trunk Access',
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
      'Complete Call Spoofing Functionality',
      'Standard Voice Changer Options',
      'Full Access to Web and Mobile Platforms',
    ],
    highlight: false,
    isHot: false,
    cta: 'Choose Plan',
  },
  {
    name: 'Diamond Plan',
    priceString: '$200',
    duration: '/2 months',
    description: '2Months Unlimited Calling — no per-minute charges',
    features: [
      'Advanced Call Spoofing Suite',
      'Access to Premium Voice Changer Library',
      'Enhanced Call Routing Infrastructure',
      'Advanced OTP Bot Integration',
      'Full Access to Web and Mobile Platforms',
      'Integrated Email & SMS Spoofing Tools',
      'Interactive Voice Response (IVR) System',
      'Standard Toll-Free Number Spoofing',
      'Reliable SIP Trunk Access',
    ],
    highlight: false,
    isHot: false,
    cta: 'Choose Plan',
  },
  {
    name: 'Platinum Plan',
    priceString: '$300',
    duration: '/3 months',
    description: '3Months Unlimited Calling — no per-minute charges',
    features: [
      'Advanced Call Spoofing Suite',
      'Access to Premium Voice Changer Library',
      'Optimized Call Routing for Peak Performance',
      '24/7 Priority Customer Support',
      'Advanced OTP Bot Integration',
      'Full API Access for Custom Integrations',
      'Full Access to Web and Mobile Platforms',
      'Integrated Email & SMS Spoofing Tools',
      'Interactive Voice Response (IVR) System',
      'Premium Toll-Free Number Spoofing',
      'Dedicated Premium SIP Trunk Access',
    ],
    highlight: false,
    isHot: false,
    cta: 'Choose Plan',
  },
  {
    name: 'Silver Plan Top-up',
    priceString: '$50-$500',
    duration: '',
    description: 'Manual top-up',
    features: ["On-demand credit for virtual numbers & eSIMs", "Personalized top-up service via Telegram"],
    highlight: false,
    isHot: false,
    cta: 'Choose Plan',
  },
];

export const faqItems = [
  {
    question: "What is call spoofing?",
    answer: "Call spoofing is a service that allows you to change the Caller ID to any number you want. It's useful for privacy, business, and pranking."
  },
  {
    question: "Is this service legal to use?",
    answer: "The legality depends on your location and how you use the service. It is your responsibility to use our services in compliance with all applicable laws. We do not condone any illegal activities."
  },
  {
    question: "How do I make a payment?",
    answer: "We accept various cryptocurrencies for payment. Once you select a plan, you will be guided through the secure payment process."
  },
  {
    question: "Can I change my plan later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Please contact our support team to assist you with the process."
  },
  {
    question: "Do you offer a free trial?",
    answer: "We do not offer free trials due to the nature of the service. However, we have various plans to suit different budgets and needs."
  }
];

export const testimonials = [
    {
      quote: "The best service for spoofing calls. The voice changer is amazing and the connection is always stable. Highly recommended for anyone looking for privacy and features!",
      name: "John Doe",
      role: "Verified Customer"
    },
    {
      quote: "I've tried other services, but this one is by far the most reliable and feature-rich. The customer support is also top-notch, always ready to help.",
      name: "Jane Smith",
      role: "Verified Customer"
    },
    {
        quote: "The setup was incredibly easy, and I was making calls in minutes. The premium voice changer is a game-changer for my business.",
        name: "Alex Johnson",
        role: "Verified Customer"
    },
    {
        quote: "I was skeptical at first, but the quality of the calls is crystal clear. The Platinum Plan is worth every penny for the advanced features.",
        name: "Samantha Lee",
        role: "Verified Customer"
    },
    {
        quote: "The crypto payment option is a huge plus for me. It's fast, secure, and private. The service itself is flawless.",
        name: "Michael Chen",
        role: "Verified Customer"
    },
    {
        quote: "Their support team is fantastic. I had a question about the SIP trunk access, and they were incredibly knowledgeable and helpful.",
        name: "Emily Rodriguez",
        role: "Verified Customer"
    }
];
