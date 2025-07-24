
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
    name: 'Silver Plan Top-up',
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
    cta: 'Contact Admin',
  },
];

export const faqItems = [
  {
    question: "How do I make a payment?",
    answer: "We only accept cryptocurrency payments. Manual top-up is required via our admin on Telegram."
  },
  {
    question: "How do I top-up or purchase a plan?",
    answer: "Please contact our admin on Telegram: @AF3092 for all purchases and top-ups. Please do not use the top-up section inside the spoofing bot, as that service is discontinued."
  },
  {
    question: "Do you offer a free trial or demo?",
    answer: "We do not offer free trials. However, you can view demo videos of our service on our official Telegram channel: https://t.me/+Eg-SFpyzbpM0YzM1"
  },
  {
    question: "What is call spoofing?",
    answer: "Call spoofing is a service that allows you to change the Caller ID to any number you want. It's useful for privacy, business, and other professional use cases."
  },
  {
    question: "Is this service legal to use?",
    answer: "The legality depends on your location and how you use the service. It is your responsibility to use our services in compliance with all applicable laws. We do not condone any illegal activities."
  },
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
