import { useState, useEffect, useCallback, useRef } from 'react';

interface PerformanceMetrics {
  requestStart: number;
  requestEnd?: number;
  responseSize?: number;
  cacheHit?: boolean;
}

interface UsePerformanceReturn {
  metrics: PerformanceMetrics | null;
  isLoading: boolean;
  startTiming: () => void;
  endTiming: (responseSize?: number, cacheHit?: boolean) => void;
  optimizedFetch: (url: string, options?: RequestInit) => Promise<Response>;
}

export function usePerformance(): UsePerformanceReturn {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const currentMetrics = useRef<PerformanceMetrics | null>(null);

  const startTiming = useCallback(() => {
    const newMetrics: PerformanceMetrics = {
      requestStart: performance.now()
    };
    currentMetrics.current = newMetrics;
    setIsLoading(true);
  }, []);

  const endTiming = useCallback((responseSize?: number, cacheHit?: boolean) => {
    if (currentMetrics.current) {
      const endTime = performance.now();
      const finalMetrics: PerformanceMetrics = {
        ...currentMetrics.current,
        requestEnd: endTime,
        responseSize,
        cacheHit
      };
      
      setMetrics(finalMetrics);
      setIsLoading(false);
      
      // Log performance metrics
      const duration = endTime - currentMetrics.current.requestStart;
      console.log('⚡ Client Performance:', {
        duration: `${Math.round(duration)}ms`,
        responseSize: responseSize ? `${Math.round(responseSize / 1024)}KB` : 'Unknown',
        cacheHit: cacheHit || false,
        performance: duration < 1000 ? 'Excellent' : duration < 3000 ? 'Good' : 'Needs Improvement'
      });
    }
  }, []);

  const optimizedFetch = useCallback(async (url: string, options?: RequestInit): Promise<Response> => {
    startTiming();
    
    try {
      // Add performance headers
      const optimizedOptions: RequestInit = {
        ...options,
        headers: {
          ...options?.headers,
          'Accept-Encoding': 'gzip, deflate, br',
          'Cache-Control': 'max-age=300', // 5 minutes client cache
        }
      };

      const response = await fetch(url, optimizedOptions);
      
      // Calculate response size
      const contentLength = response.headers.get('content-length');
      const responseSize = contentLength ? parseInt(contentLength) : undefined;
      
      // Check if response was cached
      const cacheHit = response.headers.get('x-cache') === 'HIT';
      
      endTiming(responseSize, cacheHit);
      
      return response;
    } catch (error) {
      endTiming();
      throw error;
    }
  }, [startTiming, endTiming]);

  return {
    metrics,
    isLoading,
    startTiming,
    endTiming,
    optimizedFetch
  };
}

// Hook for debouncing user input to reduce API calls
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Hook for lazy loading components
export function useLazyLoad(threshold: number = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

// Hook for monitoring memory usage
export function useMemoryMonitor() {
  const [memoryInfo, setMemoryInfo] = useState<{
    used: number;
    total: number;
    percentage: number;
  } | null>(null);

  useEffect(() => {
    const updateMemoryInfo = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const used = Math.round(memory.usedJSHeapSize / 1024 / 1024); // MB
        const total = Math.round(memory.totalJSHeapSize / 1024 / 1024); // MB
        const percentage = Math.round((memory.usedJSHeapSize / memory.totalJSHeapSize) * 100);
        
        setMemoryInfo({ used, total, percentage });
        
        if (percentage > 80) {
          console.warn('⚠️ High client memory usage:', { used, total, percentage });
        }
      }
    };

    // Update immediately
    updateMemoryInfo();
    
    // Update every 30 seconds
    const interval = setInterval(updateMemoryInfo, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return memoryInfo;
} 