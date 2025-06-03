import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Locale } from '@/types';

export default function PrivacyPage() {
  const t = useTranslations('privacy');
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
            <p className="text-white/60 text-lg">{t('lastUpdated')}: December 2, 2024</p>
          </div>

          {/* Content */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl">
            <div className="prose prose-invert prose-purple max-w-none">
              
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">{t('overview.title')}</h2>
                <p className="text-white/90 mb-4">{t('overview.content')}</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">{t('dataCollection.title')}</h2>
                <p className="text-white/90 mb-4">{t('dataCollection.intro')}</p>
                <ul className="list-disc pl-6 text-white/90 space-y-2">
                  <li>{t('dataCollection.items.personal')}</li>
                  <li>{t('dataCollection.items.usage')}</li>
                  <li>{t('dataCollection.items.device')}</li>
                  <li>{t('dataCollection.items.cookies')}</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">{t('dataUsage.title')}</h2>
                <ul className="list-disc pl-6 text-white/90 space-y-2">
                  <li>{t('dataUsage.items.service')}</li>
                  <li>{t('dataUsage.items.improve')}</li>
                  <li>{t('dataUsage.items.support')}</li>
                  <li>{t('dataUsage.items.analytics')}</li>
                  <li>{t('dataUsage.items.advertising')}</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">{t('thirdParty.title')}</h2>
                <p className="text-white/90 mb-4">{t('thirdParty.intro')}</p>
                <ul className="list-disc pl-6 text-white/90 space-y-2">
                  <li><strong>Google Analytics:</strong> {t('thirdParty.google.analytics')}</li>
                  <li><strong>Google AdSense:</strong> {t('thirdParty.google.adsense')}</li>
                  <li><strong>Google AI:</strong> {t('thirdParty.google.ai')}</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">{t('cookies.title')}</h2>
                <p className="text-white/90 mb-4">{t('cookies.content')}</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">{t('userRights.title')}</h2>
                <ul className="list-disc pl-6 text-white/90 space-y-2">
                  <li>{t('userRights.items.access')}</li>
                  <li>{t('userRights.items.correct')}</li>
                  <li>{t('userRights.items.delete')}</li>
                  <li>{t('userRights.items.restrict')}</li>
                  <li>{t('userRights.items.portability')}</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">{t('security.title')}</h2>
                <p className="text-white/90 mb-4">{t('security.content')}</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">{t('contact.title')}</h2>
                <p className="text-white/90 mb-4">{t('contact.content')}</p>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                  <p className="text-white/90">
                    <strong>{t('contact.email')}</strong> privacy@nexreasonai.com<br />
                    <strong>{t('contact.address')}</strong> {t('contact.addressValue')}
                  </p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 