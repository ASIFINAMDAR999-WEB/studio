
'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

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
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false, stopOnHover: true })
  )

  return (
    <section id="crypto-carousel" className="py-16 md:py-20 bg-background" aria-labelledby="crypto-heading">
      <div className="container px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 id="crypto-heading" className="text-2xl md:text-3xl font-bold">Cryptocurrencies We Accept</h2>
          <p className="mt-3 text-muted-foreground">
            We support a wide range of popular cryptocurrencies for fast, private, and secure payments.
          </p>
        </div>
        
        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent>
            {cryptoLogos.map((logo, index) => (
              <CarouselItem key={index} className="basis-1/4 sm:basis-1/5 md:basis-1/6 lg:basis-1/8 flex flex-col items-center justify-center">
                <div className="p-4 flex flex-col items-center justify-center gap-2">
                  <Image
                    src={logo.icon}
                    alt={`${logo.name} logo`}
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                  />
                  <p className="text-xs text-muted-foreground text-center h-8">{logo.name.split('(')[0].trim()}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
