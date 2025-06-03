import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Locale } from '@/types';

export default function AboutPage() {
  const t = useTranslations('about');
  const locale = useLocale() as Locale;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(156, 146, 172, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(156, 146, 172, 0.1) 0%, transparent 50%)`
        }}></div>
      </div>

      <div className="relative z-10 min-h-screen p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 animate-fade-in">
            <Link href="/" className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors mb-6">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {t('backToHome')}
            </Link>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">{t('title')}</h1>
            <p className="text-white/60 text-xl">{t('subtitle')}</p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            
            {/* Mission Section */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">{t('mission.title')}</h2>
              </div>
              <p className="text-white/90 text-lg leading-relaxed">{t('mission.content')}</p>
            </div>

            {/* What We Do Section */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">{t('whatWeDo.title')}</h2>
              </div>
              <p className="text-white/90 text-lg leading-relaxed mb-6">{t('whatWeDo.intro')}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-400 mb-2">{t('whatWeDo.features.analytical.title')}</h3>
                  <p className="text-white/80 text-sm">{t('whatWeDo.features.analytical.description')}</p>
                </div>
                <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4">
                  <h3 className="font-semibold text-pink-400 mb-2">{t('whatWeDo.features.emotional.title')}</h3>
                  <p className="text-white/80 text-sm">{t('whatWeDo.features.emotional.description')}</p>
                </div>
                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
                  <h3 className="font-semibold text-cyan-400 mb-2">{t('whatWeDo.features.creative.title')}</h3>
                  <p className="text-white/80 text-sm">{t('whatWeDo.features.creative.description')}</p>
                </div>
              </div>
            </div>

            {/* Technology Section */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">{t('technology.title')}</h2>
              </div>
              <p className="text-white/90 text-lg leading-relaxed mb-6">{t('technology.content')}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <span className="text-white font-bold">AI</span>
                  </div>
                  <p className="text-white/80 text-sm">{t('technology.stack.ai')}</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                    <span className="text-white font-bold">ML</span>
                  </div>
                  <p className="text-white/80 text-sm">{t('technology.stack.ml')}</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
                    <span className="text-white font-bold">NLP</span>
                  </div>
                  <p className="text-white/80 text-sm">{t('technology.stack.nlp')}</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                    <span className="text-white font-bold">🔒</span>
                  </div>
                  <p className="text-white/80 text-sm">{t('technology.stack.security')}</p>
                </div>
              </div>
            </div>

            {/* Team Section */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">{t('team.title')}</h2>
              </div>
              <p className="text-white/90 text-lg leading-relaxed">{t('team.content')}</p>
            </div>

            {/* Contact Section */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">{t('contact.title')}</h2>
              </div>
              <p className="text-white/90 text-lg leading-relaxed mb-6">{t('contact.content')}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-400 mb-2">{t('contact.general.title')}</h3>
                  <p className="text-white/80">info@nexreasonai.com</p>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-400 mb-2">{t('contact.support.title')}</h3>
                  <p className="text-white/80">support@nexreasonai.com</p>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Link href="/contact" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg">
                  {t('contact.button')}
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
} 