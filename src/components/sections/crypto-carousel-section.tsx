
'use client';

import * as React from 'react';
import Image from 'next/image';

const cryptoLogos = [
  { name: 'USDT (Tether)', icon: "https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/tether-usdt-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS90ZXRoZXItdXNkdC1sb2dvLnBuZyIsImlhdCI6MTc1NTI1OTM5NSwiZXhwIjoyMDcwNjE5Mzk1fQ.fhb_pip8tRWXjPLa_mbSk128SkA3Xbc-Sug3aOKCVwg" },
  { name: 'USDC', icon: "https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/IMG_0235.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9JTUdfMDIzNS5wbmciLCJpYXQiOjE3NjQzMjQ4NjcsImV4cCI6MjA3OTY4NDg2N30.1God1vSavtFKl_G9ZkHYK703kjXvZAPvglBpWj1RaBo" },
  { name: 'Bitcoin (BTC)', icon: "https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/bitcoin-btc-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9iaXRjb2luLWJ0Yy1sb2dvLnBuZyIsImlhdCI6MTc1NTI1OTE2MCwiZXhwIjoyMDcwNjE5MTYwfQ.QtuR1mtG7tW2m96dEa_nZDGhTFeumN7_tfgdwO8MdkI" },
  { name: 'Ethereum (ETH)', icon: "https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/ethereum-eth-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9ldGhlcmV1bS1ldGgtbG9nby5wbmciLCJpYXQiOjE3NTUyNTkyNjQsImV4cCI6MjA3MDYxOTI2NH0.KkVoeQcTEQUMsT4wHsA0iMhKJAgBjHUmFz8HWLEti7Y" },
  { name: 'Litecoin (LTC)', icon: "https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/litecoin-ltc-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9saXRlY29pbi1sdGMtbG9nby5wbmciLCJpYXQiOjE3NTUyNTk1NjAsImV4cCI6MjA3MDYxOTU2MH0.4eQEtvcguQQRC4IDejgvR_qLDuENYcXMV_SU7yaI5uM" },
  { name: 'Ripple (XRP)', icon: "https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/xrp-xrp-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS94cnAteHJwLWxvZ28ucG5nIiwiaWF0IjoxNzU1MjU5MzM0LCJleHAiOjIwNzA2MTkzMzR9.LHrbZ3gBHxc8aLUyt1Vx55DiPikExzSemO_veMgkbKs" },
  { name: 'Solana (SOL)', icon: "https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/solana-sol-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9zb2xhbmEtc29sLWxvZ28ucG5nIiwiaWF0IjoxNzU1MjU5NDQ4LCJleHAiOjIwNzA2MTk0NDh9.3HAAdmK-pMBVFhQzlPPBSNmCPArTezd-BmaCnzobmzw" },
  { name: 'Tron (TRX)', icon: "https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/tron-trx-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS90cm9uLXRyeC1sb2dvLnBuZyIsImlhdCI6MTc1NTI1OTQ5OCwiZXhwIjoyMDcwNjE5NDk4fQ.FvrK49yFNZ0l9G1vuvXy5wCTfQtJB83rcVLfobZgoe8" },
  { name: 'TON', icon: "https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/toncoin-ton-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS90b25jb2luLXRvbi1sb2dvLnBuZyIsImlhdCI6MTc1NTI1OTYwMiwiZXhwIjoyMDcwNjE5NjAyfQ.QW-O_jKeo3LYkKHWPxlzHAXpZyukPdRCr5afBIIy7Ao" },
];


export function CryptoCarouselSection() {
  return (
    <section id="crypto-carousel" className="w-full py-16 md:py-20 bg-background relative" aria-labelledby="crypto-heading">
        <div 
        className="absolute inset-0 z-0 opacity-50 dark:opacity-60"
        style={{
          background: `radial-gradient(circle at 50% 30%, hsl(var(--primary) / 0.1), transparent 70%)`,
        }}
      />
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div
          className="text-center max-w-3xl mx-auto space-y-4 mb-12 animate-in fade-in-up"
        >
          <h2 id="crypto-heading" className="text-3xl md:text-4xl font-bold font-headline">
            Cryptocurrencies We Accept
          </h2>
          <p className="mt-4 text-md text-muted-foreground">
            We support a wide range of popular cryptocurrencies for fast, private, and secure payments.
          </p>
        </div>

        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
          <div
            className="marquee flex"
          >
            <div className="marquee-group">
              {cryptoLogos.map((logo, index) => (
                <div key={`a-${index}`} className="logo-card">
                  <div className="logo-img">
                    <Image
                      src={logo.icon}
                      alt={logo.name}
                      width={56}
                      height={56}
                      className="object-contain"
                      loading="lazy"
                    />
                  </div>
                  <p className="logo-text">
                    {logo.name.split('(')[0].trim()}
                  </p>
                </div>
              ))}
            </div>

            <div className="marquee-group" aria-hidden="true">
              {cryptoLogos.map((logo, index) => (
                <div key={`b-${index}`} className="logo-card">
                  <div className="logo-img">
                    <Image
                      src={logo.icon}
                      alt={logo.name}
                      width={56}
                      height={56}
                      className="object-contain"
                      loading="lazy"
                    />
                  </div>
                  <p className="logo-text">
                    {logo.name.split('(')[0].trim()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee {
          width: max-content;
          animation: scroll 30s linear infinite;
        }

        .marquee:hover {
          animation-play-state: paused;
        }

        .marquee-group {
          display: flex;
          align-items: center;
        }

        .logo-card {
          min-width: 150px;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 24px;
          transition: transform 0.3s ease;
        }

        .logo-card:hover {
            transform: scale(1.1);
        }

        .logo-img {
          width: 56px;
          height: 56px;
        }

        .logo-text {
          font-size: 12px;
          margin-top: 8px;
          color: hsl(var(--muted-foreground));
          text-align: center;
        }

        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        
        @media (max-width: 640px) {
          .logo-card {
            min-width: 120px;
            margin: 0 16px;
          }
          .marquee {
            animation-duration: 25s;
          }
        }
      `}</style>
    </section>
  );
}
