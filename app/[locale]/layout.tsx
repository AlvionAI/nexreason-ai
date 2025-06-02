import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navigation from '@/components/Navigation';
import Analytics, { PerformanceTracker } from '@/components/Analytics';
import Script from 'next/script';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <>
      {/* Google Analytics - Only with valid measurement ID */}
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                page_title: 'NexReason - AI Decision Analysis',
                page_location: window.location.href,
                content_group1: 'AI Tools',
                content_group2: 'Decision Making',
                custom_map: {
                  'custom_parameter_1': 'analysis_mode',
                  'custom_parameter_2': 'language'
                }
              });
            `}
          </Script>
        </>
      )}

      {/* Google AdSense - Only in production with valid client ID */}
      {process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID && (
        <>
          <Script
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
            strategy="afterInteractive"
            crossOrigin="anonymous"
          />
          <Script id="adsense-init" strategy="afterInteractive">
            {`
              // Prevent duplicate AdSense initialization
              if (typeof window !== 'undefined' && !window.adsbygoogleInitialized) {
                try {
                  (adsbygoogle = window.adsbygoogle || []).push({
                    google_ad_client: "${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}",
                    enable_page_level_ads: true
                  });
                  window.adsbygoogleInitialized = true;
                } catch (e) {
                  console.warn('AdSense initialization failed:', e);
                }
              }
            `}
          </Script>
        </>
      )}

      {/* Main Content */}
      <NextIntlClientProvider messages={messages}>
        <Analytics />
        <PerformanceTracker />
        <Navigation />
        <main>{children}</main>
        <footer className="border-t border-white/10 bg-slate-900/90 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-white/60 text-sm">
                © 2025 NexReason. All rights reserved.
              </div>
              <div className="flex items-center space-x-2 text-white/60 text-sm">
                <span>Powered by</span>
                <span className="font-bold text-purple-400 hover:text-purple-300 transition-colors">Alvion AI</span>
                <span className="text-purple-400">⚡</span>
              </div>
            </div>
          </div>
        </footer>
      </NextIntlClientProvider>
    </>
  );
} 