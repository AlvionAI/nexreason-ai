import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  try {
    return {
      locale,
      messages: (await import(`../messages/${locale}/common.json`)).default
    };
  } catch (error) {
    // Fallback to English if the locale messages are not found
    return {
      locale: routing.defaultLocale,
      messages: (await import(`../messages/en/common.json`)).default
    };
  }
}); 