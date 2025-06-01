'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useEffect } from 'react';
import { trackHowToUseVisit, trackUserEngagement } from '@/lib/analytics';

export default function HowToUsePage() {
  const t = useTranslations('howToUse');
  const locale = useLocale();

  useEffect(() => {
    // Track how-to-use page visit
    trackHowToUseVisit(locale);
    trackUserEngagement('help_page_visit', { locale, page: 'how-to-use' });
  }, [locale]);

  const handleSectionClick = (section: string) => {
    trackUserEngagement('help_section_click', { section, locale });
  };

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
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg animate-pulse-glow mr-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">{t('title')}</h1>
                <p className="text-white/60 text-lg">{t('subtitle')}</p>
              </div>
            </div>
            
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
            >
              <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {t('backToHome')}
            </Link>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            {/* Getting Started */}
            <section 
              className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 sm:p-8 shadow-xl animate-slide-up"
              onClick={() => handleSectionClick('getting-started')}
            >
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-green-400">{t('gettingStarted.title')}</h2>
              </div>
              <div className="space-y-4 text-white/90">
                <p className="leading-relaxed">{t('gettingStarted.description')}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-green-400/10 rounded-xl p-4 border border-green-400/20">
                    <div className="text-2xl mb-2">1️⃣</div>
                    <h3 className="font-semibold text-green-400 mb-2">{t('gettingStarted.step1.title')}</h3>
                    <p className="text-sm text-white/70">{t('gettingStarted.step1.description')}</p>
                  </div>
                  <div className="bg-green-400/10 rounded-xl p-4 border border-green-400/20">
                    <div className="text-2xl mb-2">2️⃣</div>
                    <h3 className="font-semibold text-green-400 mb-2">{t('gettingStarted.step2.title')}</h3>
                    <p className="text-sm text-white/70">{t('gettingStarted.step2.description')}</p>
                  </div>
                  <div className="bg-green-400/10 rounded-xl p-4 border border-green-400/20">
                    <div className="text-2xl mb-2">3️⃣</div>
                    <h3 className="font-semibold text-green-400 mb-2">{t('gettingStarted.step3.title')}</h3>
                    <p className="text-sm text-white/70">{t('gettingStarted.step3.description')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Decision Modes */}
            <section 
              className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 sm:p-8 shadow-xl animate-slide-up"
              onClick={() => handleSectionClick('decision-modes')}
            >
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-purple-400">{t('decisionModes.title')}</h2>
              </div>
              <div className="space-y-6 text-white/90">
                <p className="leading-relaxed">{t('decisionModes.description')}</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="bg-purple-400/10 rounded-xl p-6 border border-purple-400/20">
                    <div className="text-4xl mb-4">🧠</div>
                    <h3 className="text-xl font-bold text-purple-400 mb-3">{t('decisionModes.analytical.title')}</h3>
                    <p className="text-white/70 mb-4">{t('decisionModes.analytical.description')}</p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-purple-300">{t('decisionModes.analytical.bestFor')}</h4>
                      <ul className="text-sm text-white/60 space-y-1">
                        <li>• {t('decisionModes.analytical.useCase1')}</li>
                        <li>• {t('decisionModes.analytical.useCase2')}</li>
                        <li>• {t('decisionModes.analytical.useCase3')}</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-cyan-400/10 rounded-xl p-6 border border-cyan-400/20">
                    <div className="text-4xl mb-4">💖</div>
                    <h3 className="text-xl font-bold text-cyan-400 mb-3">{t('decisionModes.emotional.title')}</h3>
                    <p className="text-white/70 mb-4">{t('decisionModes.emotional.description')}</p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-cyan-300">{t('decisionModes.emotional.bestFor')}</h4>
                      <ul className="text-sm text-white/60 space-y-1">
                        <li>• {t('decisionModes.emotional.useCase1')}</li>
                        <li>• {t('decisionModes.emotional.useCase2')}</li>
                        <li>• {t('decisionModes.emotional.useCase3')}</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-pink-400/10 rounded-xl p-6 border border-pink-400/20">
                    <div className="text-4xl mb-4">🎨</div>
                    <h3 className="text-xl font-bold text-pink-400 mb-3">{t('decisionModes.creative.title')}</h3>
                    <p className="text-white/70 mb-4">{t('decisionModes.creative.description')}</p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-pink-300">{t('decisionModes.creative.bestFor')}</h4>
                      <ul className="text-sm text-white/60 space-y-1">
                        <li>• {t('decisionModes.creative.useCase1')}</li>
                        <li>• {t('decisionModes.creative.useCase2')}</li>
                        <li>• {t('decisionModes.creative.useCase3')}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Tips for Better Results */}
            <section 
              className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 sm:p-8 shadow-xl animate-slide-up"
              onClick={() => handleSectionClick('tips')}
            >
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-yellow-400">{t('tips.title')}</h2>
              </div>
              <div className="space-y-4 text-white/90">
                <p className="leading-relaxed">{t('tips.description')}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="space-y-4">
                    <div className="bg-yellow-400/10 rounded-xl p-4 border border-yellow-400/20">
                      <h3 className="font-semibold text-yellow-400 mb-2">💡 {t('tips.tip1.title')}</h3>
                      <p className="text-sm text-white/70">{t('tips.tip1.description')}</p>
                    </div>
                    <div className="bg-yellow-400/10 rounded-xl p-4 border border-yellow-400/20">
                      <h3 className="font-semibold text-yellow-400 mb-2">🎯 {t('tips.tip2.title')}</h3>
                      <p className="text-sm text-white/70">{t('tips.tip2.description')}</p>
                    </div>
                    <div className="bg-yellow-400/10 rounded-xl p-4 border border-yellow-400/20">
                      <h3 className="font-semibold text-yellow-400 mb-2">📝 {t('tips.tip3.title')}</h3>
                      <p className="text-sm text-white/70">{t('tips.tip3.description')}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-yellow-400/10 rounded-xl p-4 border border-yellow-400/20">
                      <h3 className="font-semibold text-yellow-400 mb-2">⏰ {t('tips.tip4.title')}</h3>
                      <p className="text-sm text-white/70">{t('tips.tip4.description')}</p>
                    </div>
                    <div className="bg-yellow-400/10 rounded-xl p-4 border border-yellow-400/20">
                      <h3 className="font-semibold text-yellow-400 mb-2">🔄 {t('tips.tip5.title')}</h3>
                      <p className="text-sm text-white/70">{t('tips.tip5.description')}</p>
                    </div>
                    <div className="bg-yellow-400/10 rounded-xl p-4 border border-yellow-400/20">
                      <h3 className="font-semibold text-yellow-400 mb-2">🎭 {t('tips.tip6.title')}</h3>
                      <p className="text-sm text-white/70">{t('tips.tip6.description')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Examples */}
            <section 
              className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 sm:p-8 shadow-xl animate-slide-up"
              onClick={() => handleSectionClick('examples')}
            >
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-blue-400">{t('examples.title')}</h2>
              </div>
              <div className="space-y-6 text-white/90">
                <p className="leading-relaxed">{t('examples.description')}</p>
                
                <div className="space-y-4">
                  <div className="bg-blue-400/10 rounded-xl p-6 border border-blue-400/20">
                    <h3 className="font-semibold text-blue-400 mb-3">🏢 {t('examples.career.title')}</h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-blue-300 mb-1">{t('examples.career.question')}</h4>
                        <p className="text-sm text-white/70 italic">&ldquo;{t('examples.career.example')}&rdquo;</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-300 mb-1">{t('examples.career.whyGood')}</h4>
                        <p className="text-sm text-white/70">{t('examples.career.explanation')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-400/10 rounded-xl p-6 border border-blue-400/20">
                    <h3 className="font-semibold text-blue-400 mb-3">💰 {t('examples.financial.title')}</h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-blue-300 mb-1">{t('examples.financial.question')}</h4>
                        <p className="text-sm text-white/70 italic">&ldquo;{t('examples.financial.example')}&rdquo;</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-300 mb-1">{t('examples.financial.whyGood')}</h4>
                        <p className="text-sm text-white/70">{t('examples.financial.explanation')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-400/10 rounded-xl p-6 border border-blue-400/20">
                    <h3 className="font-semibold text-blue-400 mb-3">❤️ {t('examples.personal.title')}</h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-blue-300 mb-1">{t('examples.personal.question')}</h4>
                        <p className="text-sm text-white/70 italic">&ldquo;{t('examples.personal.example')}&rdquo;</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-300 mb-1">{t('examples.personal.whyGood')}</h4>
                        <p className="text-sm text-white/70">{t('examples.personal.explanation')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Profile Settings */}
            <section 
              className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 sm:p-8 shadow-xl animate-slide-up"
              onClick={() => handleSectionClick('profile-settings')}
            >
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-indigo-400">{t('profileSettings.title')}</h2>
              </div>
              <div className="space-y-4 text-white/90">
                <p className="leading-relaxed">{t('profileSettings.description')}</p>
                
                <div className="bg-indigo-400/10 rounded-xl p-6 border border-indigo-400/20">
                  <h3 className="font-semibold text-indigo-400 mb-4">{t('profileSettings.benefits.title')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-medium text-indigo-300">{t('profileSettings.benefits.personalized.title')}</h4>
                          <p className="text-sm text-white/70">{t('profileSettings.benefits.personalized.description')}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-medium text-indigo-300">{t('profileSettings.benefits.cultural.title')}</h4>
                          <p className="text-sm text-white/70">{t('profileSettings.benefits.cultural.description')}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-medium text-indigo-300">{t('profileSettings.benefits.relevant.title')}</h4>
                          <p className="text-sm text-white/70">{t('profileSettings.benefits.relevant.description')}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-medium text-indigo-300">{t('profileSettings.benefits.learning.title')}</h4>
                          <p className="text-sm text-white/70">{t('profileSettings.benefits.learning.description')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-400/10 rounded-xl p-6 border border-indigo-400/20">
                  <h3 className="font-semibold text-indigo-400 mb-4">{t('profileSettings.howToSetup.title')}</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                      <p className="text-white/70">{t('profileSettings.howToSetup.step1')}</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                      <p className="text-white/70">{t('profileSettings.howToSetup.step2')}</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                      <p className="text-white/70">{t('profileSettings.howToSetup.step3')}</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                      <p className="text-white/70">{t('profileSettings.howToSetup.step4')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12 animate-fade-in">
            <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-4">{t('cta.title')}</h2>
              <p className="text-white/70 mb-6 max-w-2xl mx-auto">{t('cta.description')}</p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  href="/analyze"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg font-semibold"
                  onClick={() => trackUserEngagement('cta_analyze_click', { source: 'how-to-use', locale })}
                >
                  <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {t('cta.startAnalyzing')}
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full hover:bg-white/20 transition-all transform hover:scale-105 shadow-lg font-semibold"
                  onClick={() => trackUserEngagement('cta_home_click', { source: 'how-to-use', locale })}
                >
                  <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  {t('cta.backToHome')}
                </Link>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 animate-fade-in">
            <div className="flex items-center justify-center space-x-2 text-white/40 text-sm">
              <span>Powered by</span>
              <span className="font-bold text-purple-400">Alvion AI</span>
              <span className="text-purple-400">⚡</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 