// Performance optimization utilities for NexReason

// Simple in-memory cache for API responses (in production, use Redis)
const responseCache = new Map<string, { data: any; timestamp: number; ttl: number }>();

// Performance monitoring
export interface PerformanceMetrics {
  requestStart: number;
  apiCallStart?: number;
  apiCallEnd?: number;
  requestEnd?: number;
  cacheHit?: boolean;
}

/**
 * Generate cache key for API responses
 */
export function generateCacheKey(question: string, mode: string, locale: string): string {
  // Create a hash-like key from the inputs
  const input = `${question.toLowerCase().trim()}-${mode}-${locale}`;
  return Buffer.from(input).toString('base64').substring(0, 32);
}

/**
 * Check if response is cached and still valid
 */
export function getCachedResponse(cacheKey: string): any | null {
  const cached = responseCache.get(cacheKey);
  
  if (!cached) {
    return null;
  }
  
  const now = Date.now();
  if (now - cached.timestamp > cached.ttl) {
    // Cache expired, remove it
    responseCache.delete(cacheKey);
    return null;
  }
  
  return cached.data;
}

/**
 * Cache API response
 */
export function setCachedResponse(cacheKey: string, data: any, ttlMinutes: number = 60): void {
  const ttl = ttlMinutes * 60 * 1000; // Convert to milliseconds
  
  responseCache.set(cacheKey, {
    data,
    timestamp: Date.now(),
    ttl
  });
  
  // Clean up old cache entries (keep cache size manageable)
  if (responseCache.size > 1000) {
    const now = Date.now();
    Array.from(responseCache.entries()).forEach(([key, value]) => {
      if (now - value.timestamp > value.ttl) {
        responseCache.delete(key);
      }
    });
  }
}

/**
 * Optimize Gemini API request
 */
export function optimizeGeminiRequest(prompt: string): string {
  // Remove unnecessary whitespace and optimize prompt length
  return prompt
    .replace(/\s+/g, ' ')
    .trim()
    // Limit prompt length to optimize API performance
    .substring(0, 8000);
}

/**
 * Performance monitoring wrapper
 */
export function createPerformanceMonitor(): PerformanceMetrics {
  return {
    requestStart: Date.now()
  };
}

/**
 * Log performance metrics
 */
export function logPerformanceMetrics(metrics: PerformanceMetrics, operation: string): void {
  const totalTime = metrics.requestEnd ? metrics.requestEnd - metrics.requestStart : 0;
  const apiTime = metrics.apiCallEnd && metrics.apiCallStart 
    ? metrics.apiCallEnd - metrics.apiCallStart 
    : 0;
  
  console.log(`⚡ Performance [${operation}]:`, {
    totalTime: `${totalTime}ms`,
    apiTime: apiTime ? `${apiTime}ms` : 'N/A',
    cacheHit: metrics.cacheHit || false,
    efficiency: apiTime && totalTime ? `${Math.round((apiTime / totalTime) * 100)}% API` : 'N/A'
  });
}

/**
 * Compress response data for faster transmission
 */
export function compressResponse(data: any): any {
  // Remove unnecessary whitespace from string fields
  const compressed = { ...data };
  
  if (compressed.pros) {
    compressed.pros = compressed.pros.map((pro: string) => pro.trim());
  }
  
  if (compressed.cons) {
    compressed.cons = compressed.cons.map((con: string) => con.trim());
  }
  
  if (compressed.emotional_reasoning) {
    compressed.emotional_reasoning = compressed.emotional_reasoning.trim();
  }
  
  if (compressed.logical_reasoning) {
    compressed.logical_reasoning = compressed.logical_reasoning.trim();
  }
  
  if (compressed.suggestion) {
    compressed.suggestion = compressed.suggestion.trim();
  }
  
  if (compressed.summary) {
    compressed.summary = compressed.summary.trim();
  }
  
  return compressed;
}

/**
 * Batch multiple requests for better performance
 */
export class RequestBatcher {
  private queue: Array<{
    resolve: (value: any) => void;
    reject: (error: any) => void;
    request: any;
  }> = [];
  
  private batchTimeout: NodeJS.Timeout | null = null;
  private readonly batchSize = 3;
  private readonly batchDelay = 100; // ms
  
  add<T>(request: any): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push({ resolve, reject, request });
      
      if (this.queue.length >= this.batchSize) {
        this.processBatch();
      } else if (!this.batchTimeout) {
        this.batchTimeout = setTimeout(() => {
          this.processBatch();
        }, this.batchDelay);
      }
    });
  }
  
  private processBatch(): void {
    if (this.batchTimeout) {
      clearTimeout(this.batchTimeout);
      this.batchTimeout = null;
    }
    
    const batch = this.queue.splice(0, this.batchSize);
    
    // Process batch items individually for now
    // In a real implementation, you might batch API calls
    batch.forEach(({ resolve, reject, request }) => {
      try {
        // Process individual request
        resolve(request);
      } catch (error) {
        reject(error);
      }
    });
  }
}

/**
 * Memory usage monitoring
 */
export function getMemoryUsage(): { used: number; total: number; percentage: number } {
  if (typeof process !== 'undefined' && process.memoryUsage) {
    const usage = process.memoryUsage();
    const used = Math.round(usage.heapUsed / 1024 / 1024); // MB
    const total = Math.round(usage.heapTotal / 1024 / 1024); // MB
    const percentage = Math.round((usage.heapUsed / usage.heapTotal) * 100);
    
    return { used, total, percentage };
  }
  
  return { used: 0, total: 0, percentage: 0 };
}

/**
 * Clean up expired cache entries
 */
export function cleanupCache(): void {
  const now = Date.now();
  let cleaned = 0;
  
  Array.from(responseCache.entries()).forEach(([key, value]) => {
    if (now - value.timestamp > value.ttl) {
      responseCache.delete(key);
      cleaned++;
    }
  });
  
  if (cleaned > 0) {
    console.log(`🧹 Cache cleanup: Removed ${cleaned} expired entries`);
  }
}

// Auto cleanup every 10 minutes
setInterval(cleanupCache, 10 * 60 * 1000); 