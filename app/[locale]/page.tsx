import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { DecisionMode } from '@/types';

export default function HomePage() {
  const t = useTranslations('home');

  const modes: { key: DecisionMode; icon: string; gradient: string; glowColor: string }[] = [
    { 
      key: 'analytical', 
      icon: '🧠', 
      gradient: 'from-purple-500 via-pink-500 to-purple-600',
      glowColor: 'shadow-purple-500/25'
    },
    { 
      key: 'emotional', 
      icon: '💖', 
      gradient: 'from-cyan-400 via-blue-500 to-cyan-600',
      glowColor: 'shadow-cyan-500/25'
    },
    { 
      key: 'creative', 
      icon: '🎨', 
      gradient: 'from-pink-400 via-purple-500 to-pink-600',
      glowColor: 'shadow-pink-500/25'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Neural Network Lines */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-cyan-400 rounded-full animate-pulse opacity-70 floating-element">
          <div className="absolute top-1/2 left-1/2 w-32 h-px bg-gradient-to-r from-cyan-400/50 to-transparent transform -translate-y-1/2 rotate-45"></div>
        </div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-pink-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-50 floating-element" style={{ animationDelay: '2s' }}>
          <div className="absolute top-1/2 left-1/2 w-24 h-px bg-gradient-to-l from-purple-400/40 to-transparent transform -translate-y-1/2 -rotate-45"></div>
        </div>
        <div className="absolute bottom-20 right-40 w-2 h-2 bg-cyan-300 rounded-full animate-ping opacity-70" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-60 left-1/4 w-1 h-1 bg-pink-300 rounded-full animate-pulse opacity-80"></div>
        <div className="absolute top-80 right-1/3 w-2 h-2 bg-purple-300 rounded-full animate-ping opacity-60" style={{ animationDelay: '3s' }}></div>
        
        {/* AI Brain Connections */}
        <div className="absolute top-1/4 left-1/3 w-1 h-20 bg-gradient-to-b from-cyan-400/30 to-transparent animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-1 h-16 bg-gradient-to-t from-pink-400/30 to-transparent animate-pulse" style={{ animationDelay: '2.5s' }}></div>
        
        {/* Floating AI Elements */}
        <div className="sparkle sparkle-1">🤖</div>
        <div className="sparkle sparkle-2">⚡</div>
        <div className="sparkle sparkle-3">🧠</div>
        <div className="sparkle sparkle-4">✨</div>
      </div>

      <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] p-4 sm:p-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-12 sm:mb-16 animate-fade-in">
            {/* Logo/Brand */}
            <div className="flex items-center justify-center mb-6 sm:mb-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/30 animate-pulse-glow">
                <span className="text-lg sm:text-2xl font-bold text-white">N</span>
              </div>
              <span className="ml-2 sm:ml-3 text-2xl sm:text-3xl font-bold text-white tracking-wide">NexReason</span>
            </div>

            {/* Brand Slogan */}
            <div className="mb-6 sm:mb-8">
              <span className="inline-block px-4 sm:px-6 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 rounded-full text-cyan-300 text-xs sm:text-sm font-medium tracking-wide uppercase backdrop-blur-sm">
                {t('slogan')}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-4 sm:px-0">
              <span className="text-white">{t('headline').split('AI')[0]}</span>
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                AI{t('headline').split('AI')[1]}
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-3 sm:mb-4 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              {t('subheading')}
            </p>
            
            {/* Description */}
            <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto px-4 sm:px-0">
              {t('approaches')}
            </p>
          </div>

          {/* Decision Modes Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12 px-4 sm:px-0">
            {modes.map((mode, index) => (
              <Link
                key={mode.key}
                href={{ pathname: '/analyze', query: { mode: mode.key } }}
                className="group relative animate-slide-up block"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Card Glow Background */}
                <div className={`absolute inset-0 bg-gradient-to-r ${mode.gradient} rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                
                {/* Card Content */}
                <div className={`relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 sm:p-8 h-full transition-all duration-300 hover:scale-105 hover:bg-white/15 ${mode.glowColor} hover:shadow-2xl cursor-pointer enhanced-card`}>
                  {/* Icon with AI Glow */}
                  <div className="relative text-5xl sm:text-6xl lg:text-7xl mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    <div className="absolute inset-0 blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-300">
                      {mode.icon}
                    </div>
                    <div className="relative">{mode.icon}</div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                    {t(`modes.${mode.key}.title`)}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-white/70 leading-relaxed mb-4 sm:mb-6 text-base sm:text-lg">
                    {t(`modes.${mode.key}.description`)}
                  </p>
                  
                  {/* Call to Action */}
                  <div className="mt-4 sm:mt-6">
                    <span className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-white/20 to-white/10 text-white rounded-full text-xs sm:text-sm font-medium group-hover:scale-110 transition-transform border border-white/30 group-hover:border-white/50">
                      {t('getStarted')}
                      <svg className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                  
                  {/* Hover indicator */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/30 transition-colors duration-300"></div>
                </div>
              </Link>
            ))}
          </div>

          {/* Get Started Button */}
          <div className="animate-bounce-gentle px-4 sm:px-0">
            <Link
              href="/analyze"
              className="inline-flex items-center px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white text-lg sm:text-xl font-bold rounded-full hover:scale-110 transition-all duration-300 shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 group glow-button"
            >
              <span>{t('getStartedMain')}</span>
              <svg className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Footer tagline */}
          <div className="mt-12 sm:mt-16 animate-fade-in px-4 sm:px-0" style={{ animationDelay: '1s' }}>
            <p className="text-white/40 text-xs sm:text-sm italic">
              &quot;{t('quote')}&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 