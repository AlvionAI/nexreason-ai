import { NextRequest, NextResponse } from 'next/server';
import { analyzeDecision } from '@/lib/gemini';
import { DecisionMode, Locale, PersonalizationContext } from '@/types';
import { 
  validateQuestion, 
  validateProfileData, 
  checkRateLimit, 
  getClientIP, 
  getSecurityHeaders,
  sanitizeInput 
} from '@/lib/security';
import {
  generateCacheKey,
  getCachedResponse,
  setCachedResponse,
  createPerformanceMonitor,
  logPerformanceMetrics,
  compressResponse,
  getMemoryUsage
} from '@/lib/performance';

export async function POST(request: NextRequest) {
  const performanceMetrics = createPerformanceMonitor();
  
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(request);
    
    // Check rate limit
    const rateLimitResult = checkRateLimit(clientIP, true);
    if (!rateLimitResult.allowed) {
      const resetTime = new Date(rateLimitResult.resetTime || 0).toISOString();
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
    }

    // Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { 
          status: 400,
          headers: getSecurityHeaders()
        }
      );
    }

    const { question, mode, locale, personalizationContext } = body;

    // Validate required fields
    if (!question || !mode || !locale) {
      return NextResponse.json(
        { error: 'Missing required fields: question, mode, locale' },
        { 
          status: 400,
          headers: getSecurityHeaders()
        }
      );
    }

    // Validate and sanitize question
    const questionValidation = validateQuestion(question);
    if (!questionValidation.isValid) {
      return NextResponse.json(
        { error: questionValidation.error },
        { 
          status: 400,
          headers: getSecurityHeaders()
        }
      );
    }

    // Sanitize question
    const sanitizedQuestion = sanitizeInput(question);

    // Validate mode
    const validModes: DecisionMode[] = ['analytical', 'emotional', 'creative'];
    if (!validModes.includes(mode)) {
      return NextResponse.json(
        { error: 'Invalid mode. Must be one of: analytical, emotional, creative' },
        { 
          status: 400,
          headers: getSecurityHeaders()
        }
      );
    }

    // Validate locale
    const validLocales: Locale[] = ['en', 'tr', 'es', 'ru'];
    if (!validLocales.includes(locale)) {
      return NextResponse.json(
        { error: 'Invalid locale. Must be one of: en, tr, es, ru' },
        { 
          status: 400,
          headers: getSecurityHeaders()
        }
      );
    }

    // Validate and sanitize personalization context if provided
    let sanitizedPersonalizationContext: PersonalizationContext | undefined;
    if (personalizationContext) {
      const profileValidation = validateProfileData(personalizationContext);
      if (!profileValidation.isValid) {
        return NextResponse.json(
          { error: `Invalid profile data: ${profileValidation.error}` },
          { 
            status: 400,
            headers: getSecurityHeaders()
          }
        );
      }
      sanitizedPersonalizationContext = profileValidation.sanitized as PersonalizationContext;
    }

    // Check cache first
    const cacheKey = generateCacheKey(sanitizedQuestion, mode, locale);
    const cachedResponse = getCachedResponse(cacheKey);
    
    if (cachedResponse) {
      performanceMetrics.cacheHit = true;
      performanceMetrics.requestEnd = Date.now();
      
      console.log('🚀 Cache hit for question:', sanitizedQuestion.substring(0, 50) + '...');
      logPerformanceMetrics(performanceMetrics, 'API_CACHED');
      
      return NextResponse.json(cachedResponse, {
        headers: {
          ...getSecurityHeaders(),
          'X-RateLimit-Limit': '20',
          'X-RateLimit-Remaining': (rateLimitResult.remaining || 0).toString(),
          'X-RateLimit-Reset': new Date(rateLimitResult.resetTime || 0).toISOString(),
          'X-Cache': 'HIT',
          'X-Cache-TTL': '3600'
        }
      });
    }

    console.log('🔍 API Request received:', {
      question: sanitizedQuestion.substring(0, 50) + '...',
      mode,
      locale,
      hasPersonalization: !!sanitizedPersonalizationContext,
      clientIP: clientIP.substring(0, 8) + '...',
      cacheKey: cacheKey.substring(0, 16) + '...'
    });

    // Call the Gemini analysis function with sanitized inputs
    performanceMetrics.apiCallStart = Date.now();
    const analysis = await analyzeDecision(
      sanitizedQuestion,
      mode as DecisionMode,
      locale as Locale,
      sanitizedPersonalizationContext
    );
    performanceMetrics.apiCallEnd = Date.now();

    // Compress response for better performance
    const compressedAnalysis = compressResponse(analysis);

    // Cache the response for future requests (1 hour TTL)
    setCachedResponse(cacheKey, compressedAnalysis, 60);

    performanceMetrics.requestEnd = Date.now();
    
    console.log('✅ API Response ready:', {
      prosCount: compressedAnalysis.pros?.length,
      consCount: compressedAnalysis.cons?.length,
      hasEmotionalReasoning: !!compressedAnalysis.emotional_reasoning,
      hasLogicalReasoning: !!compressedAnalysis.logical_reasoning,
      cached: true
    });

    // Log performance metrics
    logPerformanceMetrics(performanceMetrics, 'API_FRESH');
    
    // Log memory usage periodically
    const memUsage = getMemoryUsage();
    if (memUsage.percentage > 80) {
      console.warn('⚠️ High memory usage:', memUsage);
    }

    // Return response with security headers and rate limit info
    return NextResponse.json(compressedAnalysis, {
      headers: {
        ...getSecurityHeaders(),
        'X-RateLimit-Limit': '20',
        'X-RateLimit-Remaining': (rateLimitResult.remaining || 0).toString(),
        'X-RateLimit-Reset': new Date(rateLimitResult.resetTime || 0).toISOString(),
        'X-Cache': 'MISS',
        'X-Response-Time': `${performanceMetrics.requestEnd - performanceMetrics.requestStart}ms`,
        'X-API-Time': `${(performanceMetrics.apiCallEnd || 0) - (performanceMetrics.apiCallStart || 0)}ms`
      }
    });

  } catch (error) {
    performanceMetrics.requestEnd = Date.now();
    logPerformanceMetrics(performanceMetrics, 'API_ERROR');
    
    console.error('❌ API Error:', error);
    
    // Don't expose internal error details in production
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    return NextResponse.json(
      { 
        error: 'Internal server error during analysis',
        ...(isDevelopment && { 
          details: error instanceof Error ? error.message : 'Unknown error' 
        })
      },
      { 
        status: 500,
        headers: getSecurityHeaders()
      }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to analyze decisions.' },
    { 
      status: 405,
      headers: {
        ...getSecurityHeaders(),
        'Allow': 'POST'
      }
    }
  );
}

// Handle other unsupported methods
export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to analyze decisions.' },
    { 
      status: 405,
      headers: {
        ...getSecurityHeaders(),
        'Allow': 'POST'
      }
    }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to analyze decisions.' },
    { 
      status: 405,
      headers: {
        ...getSecurityHeaders(),
        'Allow': 'POST'
      }
    }
  );
} 