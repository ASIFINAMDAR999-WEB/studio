
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
    name: 'Platinum Plan',
    priceString: '$180',
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
      'Leverage Premium SIP Trunk Access (inbound & outbound)',
    ],
    cta: 'Choose Plan',
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
    bonus: 'New Client Offer: Get 30 extra days of service (a $179 value) absolutely FREE!',
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
    bonus: 'New Client Offer: Get 2 extra months of service (a $358 value) absolutely FREE!',
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
    quote: "The reliability of REDArmor is unmatched. The premium voice changer and enhanced call routing are essential for my privacy, and the connection is always crystal-clear. It's a professional-grade tool that has never let me down.",
    name: "Alex J."
  },
  {
    quote: "As a business owner, the professional IVR system and premium SIP trunk access have been game-changers. It has elevated our client interaction while ensuring total anonymity. The 24/7 support is also incredibly responsive and knowledgeable.",
    name: "Samantha L."
  },
  {
    quote: "I've tried other services, but none compare to REDArmor 2.0. The setup was instant after my crypto payment. The advanced OTP bot and DTMF controls are features you just don't find elsewhere—truly top-tier.",
    name: "Michael C."
  },
  {
    quote: "The Platinum Plan is worth every penny. Full API access allowed for a seamless integration into our existing workflow. The service is powerful, flexible, and their commitment to privacy is evident in every feature.",
    name: "Emily R."
  },
  {
    quote: "From SMS spoofing to securing virtual numbers, this platform covers all bases. The user interface on both the web app and Telegram bot is intuitive, and the global service reach means I can operate from anywhere without a hitch.",
    name: "David P."
  },
  {
    quote: "Their support team is fantastic. I had a complex question about SIP trunking, and they were not only knowledgeable but also genuinely helpful. It's rare to find this level of expertise and dedicated customer care.",
    name: "Olivia B."
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
  usdt_trc20: { displayName: 'USDT (Tether)', networkName: 'USDT TRC-20 (Tron Network)', address: 'TWZ3Hm2dHGm89DiwhQiYcaFJjET9GEQd43', apiId: 'tether', symbol: 'USDT', precision: 6, qrCode: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/IMG_0247.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9JTUdfMDI0Ny5qcGVnIiwiaWF0IjoxNzY0MzI4NTU5LCJleHAiOjIwNzk2ODg1NTl9.SBEBF0fafl5rrR39LW_rzMyCp_PGjdov3akw70uSV48' },
  usdt_erc20: { displayName: 'USDT (Tether)', networkName: 'USDT ERC-20 (Ethereum Network)', address: '0x7C7bA0bc477d6a3A2537Ae31f4C20041285d6D33', apiId: 'tether', symbol: 'USDT', precision: 6, qrCode: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/IMG_0246.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9JTUdfMDI0Ni5qcGVnIiwiaWF0IjoxNzY0MzI4MzIxLCJleHAiOjIwNzk2ODgzMjF9.Cq6rPCfuI5oi_EG1_SwGqUdqWrz_eyAtYfTljdaJp9w' },
  usdt_bep20: { displayName: 'USDT (Tether)', networkName: 'USDT BEP-20 (Binance Smart Chain)', address: '0x7C7bA0bc477d6a3A2537Ae31f4C20041285d6D33', apiId: 'tether', symbol: 'USDT', precision: 6, qrCode: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/IMG_0248.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9JTUdfMDI0OC5qcGVnIiwiaWF0IjoxNzY0MzI4Nzk2LCJleHAiOjIwNzk2ODg3OTZ9.6QiBxhzaAuUqjKSwbXjIk9v3ISi0DoFbfYrmhIBxdc8' },
  btc: { displayName: 'Bitcoin (BTC)', networkName: 'Bitcoin (BTC) Network', address: 'bc1qu2n89ewls4vavkkycruldddl9a0vv5anhll335', apiId: 'bitcoin', symbol: 'BTC', precision: 8, qrCode: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/IMG_0237.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9JTUdfMDIzNy5qcGVnIiwiaWF0IjoxNzY0MzI1NjA1LCJleHAiOjIwNzk2ODU2MDV9.FusCZL0C9cpoZL9eTO7SYFpbJkJRviHgBwzIp3MYJtU' },
  eth: { displayName: 'Ethereum (ETH)', networkName: 'Ethereum (ETH) Network', address: '0x7C7bA0bc477d6a3A2537Ae31f4C20041285d6D33', apiId: 'ethereum', symbol: 'ETH', precision: 8, qrCode: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/IMG_0238.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9JTUdfMDIzOC5qcGVnIiwiaWF0IjoxNzY0MzI1OTYxLCJleHAiOjIwNzk2ODU5NjF9.JVaVtLEFux2tgG2RN4a-RRdZTT6u7ibrL9NFkX0tRR0' },
  ltc: { displayName: 'Litecoin (LTC)', networkName: 'Litecoin (LTC) Network', address: 'ltc1q3rt0qrkhx345z8p4ywwy7tgyg7qnap637qldtr', apiId: 'litecoin', symbol: 'LTC', precision: 8, qrCode: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/IMG_0240.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9JTUdfMDI0MC5qcGVnIiwiaWF0IjoxNzY0MzI2NTM1LCJleHAiOjIwNzk2ODY1MzV9.PGwr-b4N4md8WeiMV7PzZWQu_YOhvS-H_WZ_nGVOTag' },
  xrp: { displayName: 'Ripple (XRP)', networkName: 'Ripple (XRP) Network', address: 'rGZ2q9ZqiSmVVY7hRgjTsUUVt5ENvD6LA8', apiId: 'ripple', symbol: 'XRP', precision: 6, qrCode: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/IMG_0239.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9JTUdfMDIzOS5qcGVnIiwiaWF0IjoxNzY0MzI2MjU3LCJleHAiOjIwNzk2ODYyNTd9.2TeaIV4fh4PamtriuS5IcurgJlIG1wkjeWOzl3oW-q8' },
  sol: { displayName: 'Solana (SOL)', networkName: 'Solana (SOL) Network', address: 'bwsBf16YnxBZqHx21AnBkr51VvxpKEYbax9wf9q4tJh', apiId: 'solana', symbol: 'SOL', precision: 8, qrCode: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/IMG_0242.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9JTUdfMDI0Mi5qcGVnIiwiaWF0IjoxNzY0MzI3MDI5LCJleHAiOjIwNzk2ODcwMjl9.N3AeshU0m7n8ATzAWFpS9cPiaUjqjJ1dw4xMknnKAE0' },
  trx: { displayName: 'Tron (TRX)', networkName: 'Tron (TRX) TRC-20 Network', address: 'TWZ3Hm2dHGm89DiwhQiYcaFJjET9GEQd43', apiId: 'tron', symbol: 'TRX', precision: 6, qrCode: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/IMG_0241.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9JTUdfMDI0MS5qcGVnIiwiaWF0IjoxNzY0MzI2ODAxLCJleHAiOjIwNzk2ODY4MDF9.aYMz0dQZd7FYRLbQT80I6x5-RME2l3a-aRthMFiN9i4' },
  ton: { displayName: 'TON', networkName: 'TON', address: 'UQDM6ugfIQm_-QOaeMPsc8VeuU78-wVEafeol-x-T76Hmh6Z', apiId: 'the-open-network', symbol: 'TON', precision: 6, qrCode: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/IMG_0243.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9JTUdfMDI0My5qcGVnIiwiaWF0IjoxNzY4MzI3MjkxLCJleHAiOjIwNzk2ODcyOTF9._GFJPlro3lzsTbPWpWYfw7qMX5R62ppIkw5HVFjAaHI' },
  usdc_erc20: { displayName: 'USDC', networkName: 'USDC ERC-20 (Ethereum Network)', address: '0x7C7bA0bc477d6a3A2537Ae31f4C20041285d6D33', apiId: 'usd-coin', symbol: 'USDC', precision: 6, qrCode: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/IMG_0244.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9JTUdfMDI0NC5qcGVnIiwiaWF0IjoxNzY0MzI3NTc3LCJleHAiOjIwNzk2ODc1Nzd9.SIa86pTJ20QGsQYX1KJ-_KrE0jfS86hBL7ORZI97KLA' },
  usdc_trc20: { displayName: 'USDC', networkName: 'USDC TRC-20 (Tron Network)', address: 'TWZ3Hm2dHGm89DiwhQiYcaFJjET9GEQd43', apiId: 'usd-coin', symbol: 'USDC', precision: 6, qrCode: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/IMG_0245.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9JTUdfMDI0NS5qcGVnIiwiaWF0IjoxNzY0MzI3NzI5LCJleHAiOjIwNzk2ODc3Mjl9.2f4R2BnxZE0w9-Jq343KvEjoHnDEbhVKaZUQBO_-ugQ' },
};
