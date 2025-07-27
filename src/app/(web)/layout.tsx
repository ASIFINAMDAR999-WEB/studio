import { Providers } from '@/app/providers';

export default function WebLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Providers>{children}</Providers>;
}
