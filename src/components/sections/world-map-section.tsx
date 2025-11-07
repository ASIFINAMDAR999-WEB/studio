
import Image from 'next/image';

export function WorldMapSection() {
  return (
    <section className="py-10 md:py-16 bg-background">
      <div className="container px-4 sm:px-6">
        <div 
          className="relative max-w-5xl mx-auto animate-fade-in-up"
          style={{ animationDelay: '300ms' }}
        >
          <div className="relative rounded-xl overflow-hidden aspect-[16/7] shadow-lg">
            <Image
              src="https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/Picsart_25-09-10_19-47-45-483.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9QaWNzYXJ0XzI1LTA5LTEwXzE5LTQ3LTQ1LTQ4My5wbmciLCJpYXQiOjE3NTc1MTM5OTcsImV4cCI6MjA3Mjg3Mzk5N30.VkMQ0YzgMTKXPqI06HIz9e2z1RKGtVJTjJt6GtmLnCs"
              alt="World map illustrating global service reach"
              layout="fill"
              objectFit="cover"
              className="transform-gpu"
              data-ai-hint="world map"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#a0a0a0]/15 dark:to-[#6a0dad]/20"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
