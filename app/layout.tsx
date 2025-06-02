import './globals.css';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'NexReason - AI-Powered Decision Analysis',
  description: 'Transform complex decisions into clear insights with intelligent analysis across multiple thinking frameworks. Powered by Alvion AI.',
  keywords: 'AI decision making, decision analysis, analytical thinking, emotional intelligence, creative solutions, multilingual AI, business decisions, personal decisions',
  authors: [{ name: 'Alvion AI' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    title: 'NexReason - AI-Powered Decision Analysis',
    description: 'Transform complex decisions into clear insights with intelligent analysis across multiple thinking frameworks. Powered by Alvion AI.',
    siteName: 'NexReason',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NexReason - AI-Powered Decision Analysis',
    description: 'Make better decisions with AI-powered insights. Analytical, emotional, and creative thinking approaches.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#8B5CF6',
};

// Root layout required by Next.js App Router
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://generativelanguage.googleapis.com" />
      </head>
      <body className="gradient-bg min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
} 