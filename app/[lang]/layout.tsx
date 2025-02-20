import '../globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Language } from '@/lib/translations';
import { inter } from '@/lib/fonts';
import { Suspense } from 'react';
import { Loading } from '@/components/loading';

export const metadata: Metadata = {
  title: 'Investment Calculator Suite',
  description: 'Professional investment calculator tools for portfolio management',
};

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'he' }];
}

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Language };
}) {
  return (
    <html lang={lang} suppressHydrationWarning className={inter.variable}>
      <body className="font-sans">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <Suspense fallback={<Loading />}>
              <main className="flex-1">{children}</main>
            </Suspense>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}