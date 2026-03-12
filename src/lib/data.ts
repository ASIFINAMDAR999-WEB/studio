
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
    isCustom?: boolean;
};

export const plans: Plan[] = [
  {
    name: 'Platinum Plan',
    priceString: '$180',
    duration: '/month',
    description: '1 Month Unlimited Calling — For New Clients Only',
    features: [
      'Unlock Advanced Call Spoofing',
      'Access the Premium Voice Changer',
      'Utilize Enhanced Routing Capabilities',
      'Routes recognized by all major banks',
      'DTMF Tone Detection & Control',
      'Receive Priority Customer Support',
      'Gain Access to the Advanced OTP Bot',
      'Full Access to Website, Web Application & Telegram Bot',
      'Utilize Email & SMS Spoofing Features',
      'Implement a Professional IVR System',
      'Spoof Premium Toll-Free Numbers',
      'Leverage Premium SIP Trunk Access (inbound & outbound)',
    ],
    cta: 'Choose Plan',
    bonus: 'New Client Offer: Get 7 extra days of service absolutely FREE!',
    isHot: true,
  },
  {
    name: 'Gold Plan',
    priceString: '$150',
    duration: '/month',
    description: '1 Month Unlimited Calling — no per-minute charges',
    features: [
      'Full Access to Call Spoofing',
      'Use the Standard Voice Changer',
      'Full Access to Website, Web Application & Telegram Bot',
    ],
    cta: 'Choose Plan',
    bonus: 'New Client Offer: Get 7 extra days of service absolutely FREE!',
  },
  {
    name: 'Diamond Plan',
    priceString: '$260',
    duration: '/2 months',
    description: '2 Months Unlimited Calling — no per-minute charges',
    features: [
      'Unlock Advanced Call Spoofing',
      'Access the Premium Voice Changer',
      'Utilize Enhanced Call Routing',
      'Routes recognized by all major banks',
      'DTMF Tone Detection & Control',
      'Gain Access to the Advanced OTP Bot',
      'Full Access to Website, Web Application & Telegram Bot',
      'Utilize Email & SMS Spoofing Features',
      'Implement a Professional IVR System',
      'Spoof Toll-Free Numbers',
      'Standard SIP Trunk Access (inbound & outbound)',
    ],
    cta: 'Choose Plan',
    bonus: 'New Client Offer: Get 15 extra days of service (a $90 value) absolutely FREE!',
    isHot: true,
  },
  {
    name: 'Platinum Pro Plan',
    priceString: '$400',
    duration: '/3 months',
    description: '3 Months Unlimited Calling — no per-minute charges',
    features: [
      'Unlock Advanced Call Spoofing',
      'Access the Premium Voice Changer',
      'Utilize Enhanced Routing Capabilities',
      'Routes recognized by all major banks',
      'DTMF Tone Detection & Control',
      'Receive Priority Customer Support',
      'Gain Access to the Advanced OTP Bot',
      'Full API & Custom Integration Support',
      'Full Access to Website, Web Application & Telegram Bot',
      'Utilize Email & SMS Spoofing Features',
      'Implement a Professional IVR System',
      'Spoof Premium Toll-Free Numbers',
      'Leverage Premium SIP Trunk Access (inbound & outbound)',
    ],
    cta: 'Choose Plan',
    bonus: 'New Client Offer: Get 30 extra days of service (a $180 value) absolutely FREE!',
    isHot: true,
  },
  {
    name: 'Platinum Max Plan',
    priceString: '$1200',
    duration: '/year',
    description: 'The Ultimate Annual Plan — Unbeatable value and features',
    features: [
      'Unlock Advanced Call Spoofing',
      'Access the Premium Voice Changer',
      'Utilize Enhanced Routing Capabilities',
      'Routes recognized by all major banks',
      'DTMF Tone Detection & Control',
      'Receive Priority Customer Support',
      'Gain Access to the Advanced OTP Bot',
      'Full API & Custom Integration Support',
      'Full Access to Website, Web Application & Telegram Bot',
      'Utilize Email & SMS Spoofing Features',
      'Implement a Professional IVR System',
      'Spoof Premium Toll-Free Numbers',
      'Leverage Premium SIP Trunk Access (inbound & outbound)',
      'Call Recording & Storage',
      'Voicemail-to-Text Transcription',
      'Advanced Analytics Dashboard',
      'Included Bundle of Virtual Numbers',
      'Dedicated Account Manager',
      'Early Access to New Features',
    ],
    cta: 'Choose Plan',
    bonus: 'New Client Offer: Get 2 extra months of service (a $360 value) absolutely FREE!',
    isHot: true,
  },
  {
    name: 'Platinum Plan (15 Days)',
    priceString: '$90',
    duration: '/15 days',
    description: 'A special 15-day offer for the Platinum Plan.',
    features: [
      'Unlock Advanced Call Spoofing',
      'Access the Premium Voice Changer',
      'Utilize Enhanced Routing Capabilities',
      'Routes recognized by all major banks',
      'DTMF Tone Detection & Control',
      'Receive Priority Customer Support',
      'Gain Access to the Advanced OTP Bot',
      'Full Access to Website, Web Application & Telegram Bot',
      'Utilize Email & SMS Spoofing Features',
      'Implement a Professional IVR System',
      'Spoof Premium Toll-Free Numbers',
      'Leverage Premium SIP Trunk Access (inbound & outbound)',
    ],
    cta: 'Choose Plan',
    isCustom: true,
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
    answer: "Purchasing a plan is simple and secure. First, browse our plans and select the one that best fits your needs. Next, choose your preferred cryptocurrency for payment. Our system will provide you with a unique wallet address for the transaction. After sending the exact amount, please send a screenshot of the transaction confirmation to our admin on Telegram (@CSG555). Your plan will typically be activated within 5-10 minutes of confirmation."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We exclusively accept cryptocurrency to ensure client privacy and security. We support a wide range of popular coins, including USDT (TRC-20, ERC-20, BEP-20), Bitcoin (BTC), Ethereum (ETH), Litecoin (LTC), Solana (SOL), Tron (TRX), TON, and Ripple (XRP). This allows for fast, anonymous, and secure transactions from anywhere in the world."
  },
  {
    question: "Why is there an extra $5 fee for some crypto payments?",
    answer: "We add a small $5 fee to payments made with non-stable cryptocurrencies like Bitcoin (BTC) and Ethereum (ETH). This fee helps cover the network transaction costs and protects against price volatility that can occur between the time of payment and transaction confirmation. This ensures we receive the full required amount to activate your plan. Payments made with stablecoins, such as USDT and USDC, do not have this extra fee as their value is pegged to the US dollar."
  },
  {
    question: "What is the 'New Client Offer' and how do I get it?",
    answer: "Our 'New Client Offer' is an exclusive welcome bonus for first-time customers purchasing our Diamond or Platinum Pro plans. When you buy the Diamond Plan, you receive 15 extra days of service free. If you choose the Platinum Pro Plan, you get a full 30 extra days free. The bonus is automatically applied to your account after your first purchase—no special code is required."
  },
  {
    question: "How do I get support if I have an issue?",
    answer: "Our dedicated support team is available to assist you. The most effective way to get help is by contacting our admin directly on Telegram at @CSG555. Whether you have questions about our services, need help with a payment, or encounter a technical issue, our team is ready to provide prompt and knowledgeable assistance. For automated services, you can also use one of our official bots listed on the 'Bots' page."
  },
  {
    question: "Are there any contracts or hidden fees?",
    answer: "No, we believe in full transparency. The price you see listed for each plan is the total price you pay for the specified service duration. There are no recurring charges, hidden fees, or long-term contracts. Your payment is a one-time purchase for the access period you've selected."
  },
  {
    question: "Can I use my own softphone software?",
    answer: "Yes, absolutely. Since a premium SIP account is included with every plan, you can use your credentials with any third-party softphone application that supports the SIP protocol. This includes popular choices like Zoiper, 3CX, MicroSIP, PortSIP, and many others, giving you the flexibility to manage your calls from your preferred application on any device."
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
      quote: "The reliability is insane. Our lines are recognized by major banks like Wells Fargo without a single issue, which is critical for our operations. REDArmor is the only service we trust for this level of performance.",
      name: "Alex S."
    },
    {
      quote: "The premium voice changer is incredibly realistic. It's an essential tool for my work, and the sheer number of voice options available is impressive. REDArmor has exceeded all my expectations for quality and performance.",
      name: "Marcus T."
    },
    {
      quote: "I was up and running in minutes. The process of paying with Bitcoin was seamless, and the support admin was incredibly fast in setting up my account. The level of customer service is as top-tier as the technology itself.",
      name: "Chen L."
    },
    {
      quote: "The IVR system is a game-changer for my business. It gives my small operation the professional feel of a large enterprise. The DTMF controls are precise and reliable, allowing for complex interactions. Highly recommended.",
      name: "Sofia G."
    },
    {
      quote: "I rely on the SIP trunk access for both inbound and outbound calls, and the quality is consistently flawlessly. No dropped calls, no latency—just a crystal-clear connection every single time. It's the backbone of my communications.",
      name: "David K."
    },
    {
      quote: "The unlimited calling model is what sold me. I make international calls daily, and not having to worry about per-minute charges has saved me a fortune. It’s liberating to have that kind of freedom and predictability.",
      name: "Fatima A."
    },
    {
      quote: "As a security professional, the ability to use cryptocurrency for payments and the encrypted nature of the service are non-negotiable. REDArmor delivers on its promise of privacy and security without compromising on features.",
      name: "Isabelle R."
    }
  ];

export const keypad = [
    { digit: '1', letters: '' }, { digit: '2', letters: 'ABC' }, { digit: '3', letters: 'DEF' },
    { digit: '4', letters: 'GHI' }, { digit: '5', letters: 'JKL' }, { digit: '6', letters: 'MNO' },
    { digit: '7', letters: 'PQRS' }, { digit: '8', letters: 'TUV' }, { digit: '9', letters: 'WXYZ' },
    { digit: '*', letters: '' }, { digit: '0', letters: '+' }, { digit: '#', letters: '' },
];

interface CryptoDetail {
  displayName: string;
  networkName: string;
  address: string;
  apiId: string;
  symbol: string;
  precision: number;
  qrCode: string;
}

export const cryptoDetails: Record<string, CryptoDetail> = {
  usdt_trc20: { displayName: 'USDT (Tether)', networkName: 'USDT TRC-20 (Tron Network)', address: 'TV7fLNY67ZEanyENTmFx6fVRwnVwcz5K3E', apiId: 'tether', symbol: 'USDT', precision: 6, qrCode: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/IMG_1846.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9JTUdfMTg0Ni5qcGVnIiwiaWF0IjoxNzczMzQ1MzMzLCJleHAiOjIwODg3MDUzMzN9.ar9CVeFyjfte2SrOy8WKW0eiwAjgvZ2bgVj_NxvCAes' },
  usdt_erc20: { displayName: 'USDT (Tether)', networkName: 'USDT ERC-20 (Ethereum Network)', address: '0x6647ea4e92473E66F0Df76c3b543fA9A869748bA', apiId: 'tether', symbol: 'USDT', precision: 6, qrCode: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/IMG_1842.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9JTUdfMTg0Mi5qcGVnIiwiaWF0IjoxNzczMzQ1MDU0LCJleHAiOjIwODg3MDUwNTR9.WyCHXC8YnDn_yXLKD90Np9O9tv8PyukOLIytjJfZz1k' },
  usdt_bep20: { displayName: 'USDT (Tether)', networkName: 'USDT BEP-20 (Binance Smart Chain)', address: '0x6647ea4e92473E66F0Df76c3b543fA9A869748bA', apiId: 'tether', symbol: 'USDT', precision: 6, qrCode: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/IMG_1842%20(1).jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9JTUdfMTg0MiAoMSkuanBlZyIsImlhdCI6MTc3MzM0NTY4MywiZXhwIjoyMDg4NzA1NjgzfQ.KOkT2AI823DnzKgz2tZeyS5W2h9adBphmKqw0BHgvoA' },
  btc: { displayName: 'Bitcoin (BTC)', networkName: 'Bitcoin (BTC) Network', address: 'bc1q4mhzxgwwmsnhu5xs05r2ee2vtmzedluj90ph7x', apiId: 'bitcoin', symbol: 'BTC', precision: 8, qrCode: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/IMG_1841.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9JTUdfMTg0MS5qcGVnIiwiaWF0IjoxNzczMzQ0OTgyLCJleHAiOjIwODg3MDQ5ODJ9.c-ma9BuMZRXRCYmXdWA6E_YY_Qi9YTUghSPW2mzpMIE' },
  eth: { displayName: 'Ethereum (ETH)', networkName: 'Ethereum (ETH) Network', address: '0x6647ea4e92473E66F0Df76c3b543fA9A869748bA', apiId: 'ethereum', symbol: 'ETH', precision: 8, qrCode: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/IMG_1842.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9JTUdfMTg0Mi5qcGVnIiwiaWF0IjoxNzczMzQ1MDU0LCJleHAiOjIwODg3MDUwNTR9.WyCHXC8YnDn_yXLKD90Np9O9tv8PyukOLIytjJfZz1k' },
  ltc: { displayName: 'Litecoin (LTC)', networkName: 'Litecoin (LTC) Network', address: 'ltc1qmpuhmyyy697cpr7dts7mmt60tdyvjcq3qt6pw4', apiId: 'litecoin', symbol: 'LTC', precision: 8, qrCode: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/IMG_1843.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9JTUdfMTg0My5qcGVnIiwiaWF0IjoxNzczMzQ1MTM1LCJleHAiOjIwODg3MDUxMzV9.73B38vlFwWVFCgPgMl6w2HjNjexnPn8Nu27riRsa_bM' },
  xrp: { displayName: 'Ripple (XRP)', networkName: 'Ripple (XRP) Network', address: 'rseUsi6eHGGUqS59bmCZ7SHoqMqr8tvjnz', apiId: 'ripple', symbol: 'XRP', precision: 6, qrCode: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/IMG_1844.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9JTUdfMTg0NC5qcGVnIiwiaWF0IjoxNzczMzQ1MjA0LCJleHAiOjIwODg3MDUyMDR9.PHhrypKGczPWr7rtdFgFrJWir0juhuzPhSfoePcslt4' },
  sol: { displayName: 'Solana (SOL)', networkName: 'Solana (SOL) Native Network', address: '4yghZh47h7onuNpUSWmX6s3ocfjENPyWautU9Zf6uGtD', apiId: 'solana', symbol: 'SOL', precision: 8, qrCode: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/IMG_1845.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9JTUdfMTg0NS5qcGVnIiwiaWF0IjoxNzczMzQ1Mjc1LCJleHAiOjIwODg3MDUyNzV9.zeYIPHR4mURiZIYuki16K8_eFGeGAyptnV40hyHsrT4' },
  sol_bep20: { displayName: 'Solana (SOL)', networkName: 'Solana BEP-20 (Binance Smart Chain)', address: '0x6647ea4e92473E66F0Df76c3b543fA9A869748bA', apiId: 'solana', symbol: 'SOL', precision: 8, qrCode: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/IMG_1842%20(1).jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9JTUdfMTg0MiAoMSkuanBlZyIsImlhdCI6MTc3MzM0NTY4MywiZXhwIjoyMDg4NzA1NjgzfQ.KOkT2AI823DnzKgz2tZeyS5W2h9adBphmKqw0BHgvoA' },
  trx: { displayName: 'Tron (TRX)', networkName: 'Tron (TRX) TRC-20 Network', address: 'TV7fLNY67ZEanyENTmFx6fVRwnVwcz5K3E', apiId: 'tron', symbol: 'TRX', precision: 6, qrCode: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/IMG_1846.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9JTUdfMTg0Ni5qcGVnIiwiaWF0IjoxNzczMzQ1MzMzLCJleHAiOjIwODg3MDUzMzN9.ar9CVeFyjfte2SrOy8WKW0eiwAjgvZ2bgVj_NxvCAes' },
  ton: { displayName: 'TON', networkName: 'TON', address: 'UQAqBWr7Swhk587GJt6-YWKl-varF1Siy0NTKIMhXiajUYhT', apiId: 'the-open-network', symbol: 'TON', precision: 6, qrCode: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/IMG_1847.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9JTUdfMTg0Ny5qcGVnIiwiaWF0IjoxNzczMzQ1NDA2LCJleHAiOjIwODg3MDU0MDZ9.TXSvK0Lzn5qvZExXoadX7_rwkDn1KVOqcPIS_CHhm-M' },
  usdc_erc20: { displayName: 'USDC', networkName: 'USDC ERC-20 (Ethereum Network)', address: '0x6647ea4e92473E66F0Df76c3b543fA9A869748bA', apiId: 'usd-coin', symbol: 'USDC', precision: 6, qrCode: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/IMG_1842.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9JTUdfMTg0Mi5qcGVnIiwiaWF0IjoxNzczMzQ1MDU0LCJleHAiOjIwODg3MDUwNTR9.WyCHXC8YnDn_yXLKD90Np9O9tv8PyukOLIytjJfZz1k' },
  usdc_trc20: { displayName: 'USDC', networkName: 'USDC TRC-20 (Tron Network)', address: 'TV7fLNY67ZEanyENTmFx6fVRwnVwcz5K3E', apiId: 'usd-coin', symbol: 'USDC', precision: 6, qrCode: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/IMG_1846.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9JTUdfMTg0Ni5qcGVnIiwiaWF0IjoxNzczMzQ1MzMzLCJleHAiOjIwODg3MDUzMzN9.ar9CVeFyjfte2SrOy8WKW0eiwAjgvZ2bgVj_NxvCAes' },
};
