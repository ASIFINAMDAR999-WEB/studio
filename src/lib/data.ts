
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
    question: "What is the process to purchase a plan?",
    answer: "Purchasing a plan is simple. Just follow these steps: 1. Select the plan that best fits your needs from our pricing section. 2. Choose your preferred cryptocurrency for payment. 3. Send the exact amount to the provided wallet address. 4. Send a screenshot of the transaction to our admin on Telegram (@AF3092). Your plan will be activated within 5 minutes of confirmation."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We exclusively accept cryptocurrency to ensure privacy and security. You can pay with USDT (TRC-20, ERC-20, BEP-20), Bitcoin (BTC), Ethereum (ETH), Litecoin (LTC), and Ripple (XRP). This allows for fast, anonymous, and secure transactions."
  },
  {
    question: "How do I get support if I have an issue?",
    answer: "Our primary support channel is Telegram. You can contact our admin directly at @AF3092 for any questions, payment confirmations, or technical issues. We also have a list of official bots on our 'Bots' page for automated services."
  },
  {
    question: "Are there any contracts or hidden fees?",
    answer: "No. Our pricing is transparent and straightforward. The price you see is the price you pay. Our plans are based on a one-time payment for the specified duration (e.g., 1, 2, or 3 months) with no recurring charges or hidden fees."
  },
  {
    question: "Can I try the service before I buy?",
    answer: "We do not offer free trials to maintain the quality and integrity of our service. However, you can view demo videos on our official Telegram channel (https://t.me/+Eg-SFpyzbpM0YzM1) to see our features in action before making a purchase."
  },
  {
    question: "Is using a call spoofing service legal?",
    answer: "The legality of call spoofing varies significantly by jurisdiction. It is your sole responsibility to ensure that your use of our Services complies with all applicable local, state, national, and international laws, including but not limited to those in the United States, United Kingdom, and all European countries. You shall not use the Service for any fraudulent, harassing, or illegal activity."
  }
];

export const testimonials = [
    {
      quote: "The best service for spoofing calls. The voice changer is amazing and the connection is always stable. Highly recommended for anyone looking for privacy and features!",
      name: "John D.",
      role: "Verified Customer"
    },
    {
      quote: "I've tried other services, but this one is by far the most reliable and feature-rich. The customer support is also top-notch, always ready to help.",
      name: "Jane S.",
      role: "Verified Customer"
    },
    {
        quote: "The setup was incredibly easy, and I was making calls in minutes. The premium voice changer is a game-changer for my business.",
        name: "Alex J.",
        role: "Verified Customer"
    },
    {
        quote: "I was skeptical at first, but the quality of the calls is crystal clear. The Platinum Plan is worth every penny for the advanced features.",
        name: "Samantha L.",
        role: "Verified Customer"
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
      role: "Verified Customer"
    },
    {
      quote: "Unmatched reliability and privacy. I have full confidence in their infrastructure and their commitment to client anonymity. Worth every cent.",
      name: "Olivia B.",
      role: "Verified Customer"
    },
    {
      quote: "As a security consultant, I need tools that are both powerful and discreet. REDArmor delivers on all fronts. The OTP bot is particularly impressive.",
      name: "Ben G.",
      role: "Verified Customer"
    }
];
