// Google Analytics 4 utilities for NexReason

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Initialize Google Analytics
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const event = (action: string, parameters?: any) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, parameters);
  }
};

// Specific tracking functions for NexReason
export const trackDecisionAnalysis = (mode: string, locale: string, questionLength: number) => {
  event('decision_analysis', {
    event_category: 'engagement',
    event_label: mode,
    custom_parameters: {
      analysis_mode: mode,
      language: locale,
      question_length: questionLength,
      timestamp: new Date().toISOString()
    }
  });
};

export const trackAnalysisComplete = (mode: string, locale: string, responseTime: number) => {
  event('analysis_complete', {
    event_category: 'conversion',
    event_label: mode,
    value: Math.round(responseTime / 1000), // Convert to seconds
    custom_parameters: {
      analysis_mode: mode,
      language: locale,
      response_time_ms: responseTime,
      timestamp: new Date().toISOString()
    }
  });
};

export const trackLanguageChange = (fromLocale: string, toLocale: string) => {
  event('language_change', {
    event_category: 'engagement',
    event_label: `${fromLocale}_to_${toLocale}`,
    custom_parameters: {
      from_language: fromLocale,
      to_language: toLocale,
      timestamp: new Date().toISOString()
    }
  });
};

export const trackModeChange = (fromMode: string, toMode: string) => {
  event('mode_change', {
    event_category: 'engagement',
    event_label: `${fromMode}_to_${toMode}`,
    custom_parameters: {
      from_mode: fromMode,
      to_mode: toMode,
      timestamp: new Date().toISOString()
    }
  });
};

export const trackProfileSetup = (profileFields: string[]) => {
  event('profile_setup', {
    event_category: 'engagement',
    event_label: 'user_profile',
    value: profileFields.length,
    custom_parameters: {
      fields_completed: profileFields.length,
      profile_fields: profileFields.join(','),
      timestamp: new Date().toISOString()
    }
  });
};

export const trackHowToUseVisit = (locale: string) => {
  event('how_to_use_visit', {
    event_category: 'engagement',
    event_label: 'help_content',
    custom_parameters: {
      language: locale,
      timestamp: new Date().toISOString()
    }
  });
};

export const trackError = (errorType: string, errorMessage: string, context?: string) => {
  event('error_occurred', {
    event_category: 'error',
    event_label: errorType,
    custom_parameters: {
      error_type: errorType,
      error_message: errorMessage,
      context: context || 'unknown',
      timestamp: new Date().toISOString()
    }
  });
};

export const trackPerformance = (metric: string, value: number, context?: string) => {
  event('performance_metric', {
    event_category: 'performance',
    event_label: metric,
    value: Math.round(value),
    custom_parameters: {
      metric_name: metric,
      metric_value: value,
      context: context || 'general',
      timestamp: new Date().toISOString()
    }
  });
};

// Track user engagement metrics
export const trackUserEngagement = (action: string, details?: any) => {
  event('user_engagement', {
    event_category: 'engagement',
    event_label: action,
    custom_parameters: {
      action_type: action,
      details: details ? JSON.stringify(details) : null,
      timestamp: new Date().toISOString()
    }
  });
};

// Track monetization events (for future AdSense optimization)
export const trackAdInteraction = (adType: string, action: string) => {
  event('ad_interaction', {
    event_category: 'monetization',
    event_label: `${adType}_${action}`,
    custom_parameters: {
      ad_type: adType,
      interaction_type: action,
      timestamp: new Date().toISOString()
    }
  });
};

// Enhanced ecommerce tracking (for future premium features)
export const trackConversion = (conversionType: string, value?: number) => {
  event('conversion', {
    event_category: 'conversion',
    event_label: conversionType,
    value: value || 1,
    custom_parameters: {
      conversion_type: conversionType,
      conversion_value: value || 1,
      timestamp: new Date().toISOString()
    }
  });
}; 