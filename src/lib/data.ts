
export type Plan = {
    name: string;
    priceString: string;
    duration: string;
    description: string;
    features: string[];
    cta: string;
    priceOptions?: string[];
    bonus?: string;
    isHot?: boolean;
};

export const plans: Plan[] = [
  {
    name: 'Platinum 1-Month',
    priceString: '$150',
    duration: '/month',
    description: '1 Month Unlimited Calling — For New Clients Only',
    features: [
      'Unlock Advanced Call Spoofing',
      'Access the Premium Voice Changer',
      'Utilize Enhanced Routing Capabilities',
      'DTMF Tone Detection & Control',
      'Receive Priority Customer Support',
      'Gain Access to the Advanced OTP Bot',
      'Full Access to Website, Web Application & Telegram Bot',
      'Utilize Email & SMS Spoofing Features',
      'Implement a Professional IVR System',
      'Spoof Premium Toll-Free Numbers',
      'Leverage Premium SIP Trunk Access',
    ],
    cta: 'Choose Plan',
    isHot: true,
  },
  {
    name: 'Gold Plan',
    priceString: '$120',
    duration: '/month',
    description: '1 Month Unlimited Calling — no per-minute charges',
    features: [
      'Full Access to Call Spoofing',
      'Use the Standard Voice Changer',
      'Full Access to Website, Web Application & Telegram Bot',
    ],
    cta: 'Choose Plan',
  },
  {
    name: 'Diamond Plan',
    priceString: '$220',
    duration: '/2 months',
    description: '2 Months Unlimited Calling — no per-minute charges',
    features: [
      'Unlock Advanced Call Spoofing',
      'Access the Premium Voice Changer',
      'Utilize Enhanced Call Routing',
      'DTMF Tone Detection & Control',
      'Gain Access to the Advanced OTP Bot',
      'Full Access to Website, Web Application & Telegram Bot',
      'Utilize Email & SMS Spoofing Features',
      'Implement a Professional IVR System',
      'Spoof Toll-Free Numbers',
      'Standard SIP Trunk Access (inbound & outbound)',
    ],
    cta: 'Choose Plan',
    bonus: 'Welcome Bonus: New clients receive an extra 15 days of service, completely free.',
    isHot: true,
  },
  {
    name: 'Platinum Plan',
    priceString: '$320',
    duration: '/3 months',
    description: '3 Months Unlimited Calling — no per-minute charges',
    features: [
      'Unlock Advanced Call Spoofing',
      'Access the Premium Voice Changer',
      'Utilize Enhanced Routing Capabilities',
      'DTMF Tone Detection & Control',
      'Receive Priority Customer Support',
      'Gain Access to the Advanced OTP Bot',
      'Full API & Custom Integration Support',
      'Full Access to Website, Web Application & Telegram Bot',
      'Utilize Email & SMS Spoofing Features',
      'Implement a Professional IVR System',
      'Spoof Premium Toll-Free Numbers',
      'Leverage Premium SIP Trunk Access',
    ],
    cta: 'Choose Plan',
    bonus: 'Welcome Bonus: New clients receive an entire extra month of service, completely free.',
    isHot: true,
  },
  {
    name: 'Silver Plan',
    priceString: '',
    duration: '',
    description: 'Top-up credit for Virtual Numbers (DIDs) and eSIM services.',
    features: [
        "Purchase and extend Virtual Numbers (DIDs)",
        "Top-up and manage your eSIM data plans",
        "Credits do not apply to call spoofing plans",
    ],
    cta: '', // CTA is handled by the price options now
    priceOptions: ['$50', '$100', '$250', '$500'],
  },
];

export const faqItems = [
  {
    question: "What is the process to purchase a plan?",
    answer: "Purchasing a plan is simple and secure. First, browse our plans and select the one that best fits your needs. Next, choose your preferred cryptocurrency for payment. Our system will provide you with a unique wallet address for the transaction. After sending the exact amount, please send a screenshot of the transaction confirmation to our admin on Telegram (@AF3092). Your plan will typically be activated within 5-10 minutes of confirmation."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We exclusively accept cryptocurrency to ensure client privacy and security. We support a wide range of popular coins, including USDT (TRC-20, ERC-20, BEP-20), Bitcoin (BTC), Ethereum (ETH), Litecoin (LTC), Solana (SOL), Tron (TRX), TON, and Ripple (XRP). This allows for fast, anonymous, and secure transactions from anywhere in the world."
  },
  {
    question: "How do I get support if I have an issue?",
    answer: "Our dedicated support team is available to assist you. The most effective way to get help is by contacting our admin directly on Telegram at @AF3092. Whether you have questions about our services, need help with a payment, or encounter a technical issue, our team is ready to provide prompt and knowledgeable assistance. For automated services, you can also use one of our official bots listed on the 'Bots' page."
  },
  {
    question: "Are there any contracts or hidden fees?",
    answer: "No, we believe in full transparency. The price you see listed for each plan is the total price you pay for the specified service duration. There are no recurring charges, hidden fees, or long-term contracts. Your payment is a one-time purchase for the access period you've selected."
  },
  {
    question: "Can I try the service before I buy?",
    answer: "To maintain the highest quality of service and prevent misuse, we do not offer free trials. However, we provide extensive demo videos on our official Telegram channel (https://t.me/+Eg-SFpyzbpM0YzM1), which showcase our features and their functionality. This allows you to see our service in action before making a commitment."
  },
  {
    question: "Is using a call spoofing service legal?",
    answer: "The legality of call spoofing varies significantly depending on your jurisdiction and how you use the service. It is your sole responsibility to understand and comply with all applicable local, state, national, and international laws. Our services are intended for lawful purposes only. We strictly prohibit any fraudulent, harassing, or illegal activities, and misuse will result in immediate service termination."
  },
  {
    question: "Can I spoof victim caller id / Mobile Number and call bank ?",
    answer: "Yes of course you can spoof victim caller ID / Mobile Number and call Bank and collect the info and all stuff our many clients use our service for this type of work."
  }
];

export const testimonials = [
    {
      quote: "The reliability of REDArmor is unmatched. I rely on the premium voice changer and enhanced call routing daily, and the connection is always crystal-clear and stable. It's an essential tool for my privacy needs.",
      name: "Alex J.",
      role: "Security Consultant"
    },
    {
      quote: "As a business owner, the professional IVR system and premium SIP trunk access have been game-changers. It has elevated our client interaction while ensuring total anonymity. The 24/7 support is also incredibly responsive.",
      name: "Samantha L.",
      role: "Business Owner"
    },
    {
        quote: "I've tried other services, but none compare to REDArmor 2.0. The setup was instant after my crypto payment. The OTP bot and DTMF controls are advanced features that you just don't find elsewhere.",
        name: "Michael C.",
        role: "IT Specialist"
    },
    {
        quote: "The Platinum Plan is worth every penny. Full API access allowed for a seamless integration into our existing workflow. The service is powerful, flexible, and the commitment to privacy is evident in every feature.",
        name: "Emily R.",
        role: "Lead Developer"
    },
    {
        quote: "From SMS spoofing to securing virtual numbers, this platform covers all bases. The user interface is intuitive, and the global service reach means I can operate from anywhere without a hitch. A truly comprehensive solution.",
        name: "David P.",
        role: "Global Operations Manager"
    },
    {
        quote: "Their support team is fantastic. I had a complex question about SIP trunking, and they were not only knowledgeable but also genuinely helpful. It's rare to find this level of expertise and customer care.",
        name: "Olivia B.",
        role: "Telecom Analyst"
    }
];

export const keypad = [
    { digit: '1', letters: '' }, { digit: '2', letters: 'ABC' }, { digit: '3', letters: 'DEF' },
    { digit: '4', letters: 'GHI' }, { digit: '5', letters: 'JKL' }, { digit: '6', letters: 'MNO' },
    { digit: '7', letters: 'PQRS' }, { digit: '8', letters: 'TUV' }, { digit: '9', letters: 'WXYZ' },
    { digit: '*', letters: '' }, { digit: '0', letters: '+' }, { digit: '#', letters: '' },
];
