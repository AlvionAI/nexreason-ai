// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Security configuration
export const SECURITY_CONFIG = {
  // Rate limiting
  RATE_LIMIT: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_REQUESTS: 100, // requests per window
    API_MAX_REQUESTS: process.env.NODE_ENV === 'development' ? 200 : 20, // More requests in development for testing
  },
  
  // Input validation
  INPUT_LIMITS: {
    MAX_QUESTION_LENGTH: 2000,
    MIN_QUESTION_LENGTH: 10,
    MAX_PROFILE_FIELD_LENGTH: 200,
  },
  
  // Content Security Policy
  CSP_DIRECTIVES: {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://www.googletagmanager.com", "https://pagead2.googlesyndication.com"],
    'style-src': ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    'img-src': ["'self'", "data:", "https:", "http:"],
    'font-src': ["'self'", "https://fonts.gstatic.com"],
    'connect-src': ["'self'", "https://generativelanguage.googleapis.com", "https://www.google-analytics.com", "https://www.googletagmanager.com"],
    'frame-ancestors': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
  },
};

/**
 * Sanitize user input to prevent XSS attacks (Edge Runtime compatible)
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') {
    throw new Error('Input must be a string');
  }
  
  // Remove HTML tags and dangerous content
  let sanitized = input
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove script content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove style content
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    // Remove javascript: protocol
    .replace(/javascript:/gi, '')
    // Remove vbscript: protocol
    .replace(/vbscript:/gi, '')
    // Remove data: protocol (except safe data URLs)
    .replace(/data:(?!image\/[a-z]+;base64,)[^;,]*[;,]/gi, '')
    // Remove event handlers
    .replace(/on\w+\s*=/gi, '')
    // Remove expression() CSS
    .replace(/expression\s*\(/gi, '')
    // Remove eval()
    .replace(/eval\s*\(/gi, '')
    // Remove any remaining angle brackets
    .replace(/[<>]/g, '')
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    .trim();
  
  return sanitized;
}

/**
 * Validate question input
 */
export function validateQuestion(question: string): { isValid: boolean; error?: string } {
  if (!question || typeof question !== 'string') {
    return { isValid: false, error: 'Question is required and must be a string' };
  }
  
  const sanitized = sanitizeInput(question);
  
  if (sanitized.length < SECURITY_CONFIG.INPUT_LIMITS.MIN_QUESTION_LENGTH) {
    return { isValid: false, error: `Question must be at least ${SECURITY_CONFIG.INPUT_LIMITS.MIN_QUESTION_LENGTH} characters long` };
  }
  
  if (sanitized.length > SECURITY_CONFIG.INPUT_LIMITS.MAX_QUESTION_LENGTH) {
    return { isValid: false, error: `Question must not exceed ${SECURITY_CONFIG.INPUT_LIMITS.MAX_QUESTION_LENGTH} characters` };
  }
  
  // Check for suspicious patterns
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /vbscript:/i,
    /onload=/i,
    /onerror=/i,
    /eval\(/i,
    /expression\(/i,
    /document\./i,
    /window\./i,
    /alert\(/i,
    /confirm\(/i,
    /prompt\(/i,
    // SQL Injection patterns
    /union.*select/i,
    /drop.*table/i,
    /delete.*from/i,
    /insert.*into/i,
    /update.*set/i,
    /exec\(/i,
    /execute\(/i,
    /sp_/i,
    /xp_/i,
    /--/,
    /\/\*/,
    /\*\//,
    // Additional XSS patterns
    /on\w+\s*=/i,
    /href\s*=\s*["']javascript:/i,
    /src\s*=\s*["']javascript:/i,
  ];
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(question)) {
      return { isValid: false, error: 'Question contains potentially harmful content' };
    }
  }
  
  return { isValid: true };
}

/**
 * Rate limiting implementation
 */
export function checkRateLimit(
  identifier: string, 
  isApiRequest: boolean = false
): { allowed: boolean; resetTime?: number; remaining?: number } {
  const now = Date.now();
  const maxRequests = isApiRequest 
    ? SECURITY_CONFIG.RATE_LIMIT.API_MAX_REQUESTS 
    : SECURITY_CONFIG.RATE_LIMIT.MAX_REQUESTS;
  
  const windowMs = SECURITY_CONFIG.RATE_LIMIT.WINDOW_MS;
  const resetTime = now + windowMs;
  
  // Clean up expired entries
  Array.from(rateLimitStore.entries()).forEach(([key, value]) => {
    if (value.resetTime <= now) {
      rateLimitStore.delete(key);
    }
  });
  
  const current = rateLimitStore.get(identifier);
  
  if (!current) {
    // First request
    rateLimitStore.set(identifier, { count: 1, resetTime });
    return { allowed: true, resetTime, remaining: maxRequests - 1 };
  }
  
  if (current.resetTime <= now) {
    // Window expired, reset
    rateLimitStore.set(identifier, { count: 1, resetTime });
    return { allowed: true, resetTime, remaining: maxRequests - 1 };
  }
  
  if (current.count >= maxRequests) {
    // Rate limit exceeded
    return { allowed: false, resetTime: current.resetTime, remaining: 0 };
  }
  
  // Increment count
  current.count++;
  rateLimitStore.set(identifier, current);
  
  return { 
    allowed: true, 
    resetTime: current.resetTime, 
    remaining: maxRequests - current.count 
  };
}

/**
 * Get client IP address for rate limiting
 */
export function getClientIP(request: Request): string {
  // Check various headers for the real IP
  const headers = request.headers;
  
  const xForwardedFor = headers.get('x-forwarded-for');
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0].trim();
  }
  
  const xRealIP = headers.get('x-real-ip');
  if (xRealIP) {
    return xRealIP;
  }
  
  const cfConnectingIP = headers.get('cf-connecting-ip');
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  // Fallback to a default identifier
  return 'unknown';
}

/**
 * Generate Content Security Policy header value
 */
export function generateCSPHeader(): string {
  const directives = Object.entries(SECURITY_CONFIG.CSP_DIRECTIVES)
    .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
    .join('; ');
  
  return directives;
}

/**
 * Security headers for responses
 */
export function getSecurityHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    // Prevent MIME type sniffing
    'X-Content-Type-Options': 'nosniff',
    
    // Prevent clickjacking
    'X-Frame-Options': 'DENY',
    
    // XSS Protection
    'X-XSS-Protection': '1; mode=block',
    
    // Referrer Policy
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    
    // Permissions Policy
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  };

  // Only add CSP and HSTS in production for easier development
  if (process.env.NODE_ENV === 'production') {
    headers['Content-Security-Policy'] = generateCSPHeader();
    headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains; preload';
  }

  return headers;
}

/**
 * Validate and sanitize profile data
 */
export function validateProfileData(data: any): { isValid: boolean; sanitized?: any; error?: string } {
  if (!data || typeof data !== 'object') {
    return { isValid: false, error: 'Profile data must be an object' };
  }
  
  const sanitized: any = {};
  const maxLength = SECURITY_CONFIG.INPUT_LIMITS.MAX_PROFILE_FIELD_LENGTH;
  
  // Validate and sanitize each field
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      const sanitizedValue = sanitizeInput(value);
      
      if (sanitizedValue.length > maxLength) {
        return { isValid: false, error: `Field '${key}' exceeds maximum length of ${maxLength} characters` };
      }
      
      sanitized[key] = sanitizedValue;
    } else if (typeof value === 'number' && Number.isFinite(value)) {
      sanitized[key] = value;
    } else if (Array.isArray(value)) {
      // Sanitize array elements
      sanitized[key] = value
        .filter(item => typeof item === 'string')
        .map(item => sanitizeInput(item))
        .filter(item => item.length <= maxLength);
    }
  }
  
  return { isValid: true, sanitized };
} 