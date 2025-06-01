'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter, usePathname } from '@/i18n/routing';

type LocaleCode = 'en' | 'tr' | 'es' | 'ru';

export default function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale() as LocaleCode;
  const router = useRouter();
  const pathname = usePathname();
  
  // Analiz sayfasında mı kontrol et
  const isAnalyzePage = pathname === '/analyze';
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en' as LocaleCode, name: 'English', flag: '🇬🇧' },
    { code: 'tr' as LocaleCode, name: 'Türkçe', flag: '🇹🇷' },
    { code: 'es' as LocaleCode, name: 'Español', flag: '🇪🇸' },
    { code: 'ru' as LocaleCode, name: 'Русский', flag: '🇷🇺' }
  ];

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  const handleLanguageChange = (newLocale: LocaleCode) => {
    // Dropdown'u kapat
    setIsDropdownOpen(false);
    
    // Eğer zaten aynı dildeyse, hiçbir şey yapma
    if (newLocale === locale) {
      return;
    }
    
    try {
      // next-intl router ile doğru locale'e yönlendir
      router.replace(pathname, { locale: newLocale });
    } catch (error) {
      console.error('Language change error:', error);
      // Fallback olarak window.location kullan
      const newUrl = newLocale === 'en' ? '/' : `/${newLocale}`;
      window.location.href = newUrl;
    }
  };

  // Dropdown otomatik kapanması için
  useEffect(() => {
    if (isDropdownOpen) {
      const timer = setTimeout(() => {
        setIsDropdownOpen(false);
      }, 5000); // 5 saniye sonra otomatik kapat

      return () => clearTimeout(timer);
    }
  }, [isDropdownOpen]);

  // Dropdown'u dışına tıklandığında kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <nav className="p-3 sm:p-4 border-b border-white/10 backdrop-blur-sm relative z-[100] bg-slate-900/90">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl sm:text-2xl font-bold text-white hover:text-blue-300 transition-colors">
          NexReason
        </Link>
        
        <div className="flex items-center space-x-3 sm:space-x-6">
          {/* Desktop Navigation */}
          <Link 
            href="/" 
            className="text-white/80 hover:text-white transition-colors text-sm sm:text-base hidden sm:block"
          >
            {t('home')}
          </Link>
          <Link 
            href="/analyze" 
            className="text-white/80 hover:text-white transition-colors text-sm sm:text-base hidden sm:block"
          >
            {t('analyze')}
          </Link>
          <Link 
            href="/how-to-use" 
            className="text-white/80 hover:text-white transition-colors text-sm sm:text-base hidden sm:block"
          >
            {t('howToUse')}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="sm:hidden p-2 text-white/80 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Dil Seçici */}
          <div className="relative" ref={dropdownRef}>
            {isAnalyzePage ? (
              /* Analiz sayfasında sadece mevcut dili göster */
              <div className="text-white/80 flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-2 rounded-lg bg-white/10">
                <span className="text-base sm:text-lg">{currentLanguage.flag}</span>
                <span className="text-xs sm:text-sm hidden sm:block">{currentLanguage.name}</span>
              </div>
            ) : (
              /* Ana sayfada tam dil seçici */
              <>
                <button 
                  onClick={() => {
                    setIsDropdownOpen(!isDropdownOpen);
                  }}
                  className="text-white/80 hover:text-white transition-colors flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-2 rounded-lg hover:bg-white/10 focus:outline-none relative z-20"
                >
                  <span className="text-base sm:text-lg">{currentLanguage.flag}</span>
                  <span className="text-sm sm:text-base hidden sm:block">{currentLanguage.name}</span>
                  <svg 
                    className={`w-3 h-3 sm:w-4 sm:h-4 transform transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown Menü */}
                {isDropdownOpen && (
                  <div 
                    className="absolute right-0 top-full mt-2 w-40 sm:w-48 opacity-100 visible transform translate-y-0 z-[110]"
                    style={{ zIndex: 110 }}
                  >
                    <div className="gradient-card rounded-lg border border-white/20 shadow-xl overflow-hidden">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm transition-colors flex items-center space-x-2 sm:space-x-3 hover:bg-white/10 cursor-pointer ${
                            locale === lang.code 
                              ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border-l-2 border-purple-400' 
                              : 'text-white/80 hover:text-white'
                          }`}
                          type="button"
                        >
                          <span className="text-base sm:text-lg">{lang.flag}</span>
                          <span className="text-xs sm:text-sm">{lang.name}</span>
                          {locale === lang.code && (
                            <span className="ml-auto text-purple-400">
                              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden border-t border-white/10 bg-slate-900/95 backdrop-blur-sm">
          <div className="px-4 py-3 space-y-2">
            <Link 
              href="/" 
              className="block text-white/80 hover:text-white transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('home')}
            </Link>
            <Link 
              href="/analyze" 
              className="block text-white/80 hover:text-white transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('analyze')}
            </Link>
            <Link 
              href="/how-to-use" 
              className="block text-white/80 hover:text-white transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('howToUse')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 