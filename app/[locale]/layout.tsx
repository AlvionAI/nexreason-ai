import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';
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
    <html lang={locale}>
      <head>
        {/* Essential Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="NexReason - AI-powered decision analysis platform. Make better decisions with analytical, emotional, and creative thinking approaches. Multilingual support for English, Turkish, Spanish, and Russian." />
        <meta name="keywords" content="AI decision making, decision analysis, analytical thinking, emotional intelligence, creative solutions, multilingual AI, business decisions, personal decisions" />
        <meta name="author" content="Alvion AI" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="NexReason - AI-Powered Decision Analysis" />
        <meta property="og:description" content="Transform complex decisions into clear insights with intelligent analysis across multiple thinking frameworks. Powered by Alvion AI." />
        <meta property="og:site_name" content="NexReason" />
        <meta property="og:locale" content={locale} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="NexReason - AI-Powered Decision Analysis" />
        <meta name="twitter:description" content="Make better decisions with AI-powered insights. Analytical, emotional, and creative thinking approaches." />
        
        {/* Mobile Optimization */}
        <meta name="theme-color" content="#8B5CF6" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="NexReason" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://nexreason.com/${locale}`} />
        
        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://generativelanguage.googleapis.com" />

        {/* Google Analytics 4 */}
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

        {/* Google AdSense */}
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script id="adsense-init" strategy="afterInteractive">
          {`
            (adsbygoogle = window.adsbygoogle || []).push({
              google_ad_client: "${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}",
              enable_page_level_ads: true
            });
          `}
        </Script>
      </head>
      <body className="gradient-bg min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <Analytics />
          <PerformanceTracker />
          <Navigation />
          <main>{children}</main>
          <footer className="border-t border-white/10 bg-slate-900/90 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-4 py-6">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-white/60 text-sm">
                  © 2024 NexReason. All rights reserved.
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
      </body>
    </html>
  );
} 