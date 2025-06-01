'use client';

import { useEffect } from 'react';

interface AdSenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  adLayout?: string;
  className?: string;
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdSense({ 
  adSlot, 
  adFormat = 'auto', 
  adLayout,
  className = '',
  style = {}
}: AdSenseProps) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <div className={`adsense-container ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-ad-layout={adLayout}
        data-full-width-responsive="true"
      />
    </div>
  );
}

// Specialized ad components for different placements
export function HeaderAd() {
  return (
    <AdSense
      adSlot="1234567890" // Replace with your actual ad slot
      adFormat="horizontal"
      className="mb-4"
      style={{ minHeight: '90px' }}
    />
  );
}

export function SidebarAd() {
  return (
    <AdSense
      adSlot="1234567891" // Replace with your actual ad slot
      adFormat="vertical"
      className="sticky top-4"
      style={{ minHeight: '250px', width: '300px' }}
    />
  );
}

export function ContentAd() {
  return (
    <AdSense
      adSlot="1234567892" // Replace with your actual ad slot
      adFormat="rectangle"
      className="my-6 mx-auto"
      style={{ minHeight: '250px', maxWidth: '336px' }}
    />
  );
}

export function FooterAd() {
  return (
    <AdSense
      adSlot="1234567893" // Replace with your actual ad slot
      adFormat="horizontal"
      className="mt-8"
      style={{ minHeight: '90px' }}
    />
  );
}

// Native ad for better integration
export function NativeAd({ title }: { title?: string }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 my-6">
      {title && (
        <h3 className="text-white/60 text-sm font-medium mb-4 text-center">
          {title}
        </h3>
      )}
      <AdSense
        adSlot="1234567894" // Replace with your actual ad slot
        adFormat="auto"
        adLayout="in-article"
        style={{ minHeight: '200px' }}
      />
    </div>
  );
} 