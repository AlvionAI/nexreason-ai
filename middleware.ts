import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIP, getSecurityHeaders } from './lib/security';

// Create the internationalization middleware
const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Get client IP
  const clientIP = getClientIP(request);
  
  // Apply rate limiting to all requests (more lenient for pages)
  const isApiRequest = request.nextUrl.pathname.startsWith('/api/');
  const rateLimitResult = checkRateLimit(clientIP, isApiRequest);
  
  if (!rateLimitResult.allowed) {
    const resetTime = new Date(rateLimitResult.resetTime || 0).toISOString();
    
    if (isApiRequest) {
      // Strict rate limiting for API
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded. Please try again later.',
          resetTime 
        },
        { 
          status: 429,
          headers: {
            ...getSecurityHeaders(),
            'Retry-After': Math.ceil((rateLimitResult.resetTime || 0 - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': '20',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': resetTime,
          }
        }
      );
    } else {
      // More lenient for pages - just add headers
      const response = intlMiddleware(request);
      if (response) {
        response.headers.set('X-RateLimit-Warning', 'Rate limit approaching');
        response.headers.set('X-RateLimit-Reset', resetTime);
      }
      return response;
    }
  }

  // Security checks for suspicious requests
  const userAgent = request.headers.get('user-agent') || '';
  const suspiciousPatterns = [
    /googlebot/i,
    /bingbot/i,
    /slurp/i,
    /duckduckbot/i,
    /baiduspider/i,
    /yandexbot/i,
    /facebookexternalhit/i,
    /twitterbot/i,
    /linkedinbot/i,
    /whatsapp/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
    /wget/i,
    /python-requests/i,
    /php/i,
    /java/i,
    /go-http-client/i,
  ];

  // Block suspicious user agents from API endpoints (but allow curl for testing)
  if (isApiRequest && suspiciousPatterns.some(pattern => pattern.test(userAgent))) {
    console.log(`🚫 Blocked suspicious request from ${clientIP}: ${userAgent}`);
    return NextResponse.json(
      { error: 'Access denied' },
      { 
        status: 403,
        headers: getSecurityHeaders()
      }
    );
  }

  // Check for common attack patterns in URL
  const url = request.nextUrl.pathname + request.nextUrl.search;
  const attackPatterns = [
    /\.\./,  // Directory traversal
    /<script/i,  // XSS attempts
    /union.*select/i,  // SQL injection
    /javascript:/i,  // JavaScript protocol
    /vbscript:/i,  // VBScript protocol
    /data:/i,  // Data protocol
  ];

  if (attackPatterns.some(pattern => pattern.test(url))) {
    console.log(`🚫 Blocked malicious request from ${clientIP}: ${url}`);
    return NextResponse.json(
      { error: 'Request blocked for security reasons' },
      { 
        status: 400,
        headers: getSecurityHeaders()
      }
    );
  }

  // For API requests, just add security headers and continue
  if (isApiRequest) {
    const response = NextResponse.next();
    const securityHeaders = getSecurityHeaders();
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    
    // Add rate limit headers
    response.headers.set('X-RateLimit-Limit', '20');
    response.headers.set('X-RateLimit-Remaining', (rateLimitResult.remaining || 0).toString());
    response.headers.set('X-RateLimit-Reset', new Date(rateLimitResult.resetTime || 0).toISOString());
    
    return response;
  }

  // Apply internationalization middleware for non-API requests
  const response = intlMiddleware(request);
  
  // Add security headers to all responses
  if (response) {
    const securityHeaders = getSecurityHeaders();
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    
    // Add rate limit headers
    response.headers.set('X-RateLimit-Limit', '100');
    response.headers.set('X-RateLimit-Remaining', (rateLimitResult.remaining || 0).toString());
    response.headers.set('X-RateLimit-Reset', new Date(rateLimitResult.resetTime || 0).toISOString());
  }
  
  return response;
}

export const config = {
  matcher: [
    '/',
    '/(tr|es|ru)/:path*',
    '/api/:path*',
    '/((?!_next|_vercel|.*\\..*).*)' 
  ]
}; 