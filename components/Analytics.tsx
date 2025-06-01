'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { pageview } from '@/lib/analytics';

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      pageview(url);
    }
  }, [pathname, searchParams]);

  return null;
}

// Performance tracking component
export function PerformanceTracker() {
  useEffect(() => {
    // Track Core Web Vitals
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Track page load time
      window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        if (window.gtag) {
          window.gtag('event', 'page_load_time', {
            event_category: 'performance',
            value: Math.round(loadTime),
            custom_parameters: {
              load_time_ms: loadTime,
              page: window.location.pathname
            }
          });
        }
      });

      // Track First Contentful Paint (FCP)
      if ('PerformanceObserver' in window) {
        try {
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (entry.name === 'first-contentful-paint') {
                if (window.gtag) {
                  window.gtag('event', 'first_contentful_paint', {
                    event_category: 'performance',
                    value: Math.round(entry.startTime),
                    custom_parameters: {
                      fcp_time: entry.startTime,
                      page: window.location.pathname
                    }
                  });
                }
              }
            }
          });
          observer.observe({ entryTypes: ['paint'] });
        } catch (error) {
          console.warn('Performance Observer not supported:', error);
        }
      }
    }
  }, []);

  return null;
} 