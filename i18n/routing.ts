import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'tr', 'es', 'ru'],
  
  // Used when no locale matches
  defaultLocale: 'en',
  
  // Prefix configuration - 'as-needed' means English has no prefix
  localePrefix: 'as-needed',
  
  // Define pathnames for different locales
  pathnames: {
    '/': '/',
    '/analyze': '/analyze',
    '/how-to-use': '/how-to-use'
  }
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing); 