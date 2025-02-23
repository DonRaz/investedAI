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

// This generates all the static paths for the site
export async function generateStaticParams() {
  const routes = [
    '',
    '/tax',
    '/pension',
    '/compound',
    '/loan-vs-sell'
  ];

  const locales = ['en', 'he'];
  
  return locales.flatMap(lang => 
    routes.map(route => ({
      lang,
      // Remove leading slash and handle empty string for root path
      slug: route.split('/').filter(Boolean)
    }))
  );
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
      <body className="font-sans bg-gradient-to-br from-zinc-100 via-zinc-200 to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
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