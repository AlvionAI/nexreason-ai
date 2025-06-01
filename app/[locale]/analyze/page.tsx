'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { DecisionMode, DecisionAnalysis, Locale, UserProfile, PersonalizationContext } from '@/types';

import UserProfileModal from '@/components/UserProfileModal';
import { SmartProfilingEngine } from '@/lib/smart-profiling';
import SmartProfilingNotification from '@/components/SmartProfilingNotification';
import { 
  trackDecisionAnalysis, 
  trackAnalysisComplete, 
  trackModeChange, 
  trackProfileSetup,
  trackError,
  trackUserEngagement 
} from '@/lib/analytics';

export default function AnalyzePage() {
  // Validate locale
  const locale = useLocale() as Locale;
  if (!['en', 'tr', 'es', 'ru'].includes(locale)) {
    notFound();
  }

  const t = useTranslations('analyze');
  const tHome = useTranslations('home');
  const searchParams = useSearchParams();
  const [question, setQuestion] = useState('');
  const [mode, setMode] = useState<DecisionMode>('analytical');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<DecisionAnalysis | null>(null);
  const [showTyping, setShowTyping] = useState(false);
  const [messages, setMessages] = useState<Array<{type: 'user' | 'ai', content: string, timestamp: number}>>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Performance tracking
  const [analysisStartTime, setAnalysisStartTime] = useState<number>(0);
  
  // Kişiselleştirme state'leri
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [sessionContext, setSessionContext] = useState({
    currentMood: 'confident' as const,
    timeConstraint: 'moderate' as const,
    stakeholders: [] as string[],
    budget: 'moderate' as const
  });
  
  // Akıllı profilleme için soru geçmişi
  const [questionHistory, setQuestionHistory] = useState<string[]>([]);
  const [smartProfileDetected, setSmartProfileDetected] = useState<Partial<UserProfile> | null>(null);
  const [showSmartProfileNotification, setShowSmartProfileNotification] = useState(false);
  
  // UI yardımcı bileşenler için state'ler
  const [showProfileTooltip, setShowProfileTooltip] = useState(false);

  useEffect(() => {
    const modeParam = searchParams.get('mode') as DecisionMode;
    if (modeParam && ['analytical', 'emotional', 'creative'].includes(modeParam)) {
      setMode(modeParam);
    }
    
    // LocalStorage'dan kullanıcı profilini yükle
    const savedProfile = localStorage.getItem('nexreason_user_profile');
    const savedQuestions = localStorage.getItem('nexreason_question_history');
    
    if (savedProfile) {
      try {
        setUserProfile(JSON.parse(savedProfile));
      } catch (error) {
        console.error('Error loading user profile:', error);
      }
    }
    
    if (savedQuestions) {
      try {
        setQuestionHistory(JSON.parse(savedQuestions));
      } catch (error) {
        console.error('Error loading question history:', error);
      }
    }

    // Track page visit
    trackUserEngagement('analyze_page_visit', { mode: modeParam || 'analytical', locale });
  }, [searchParams, locale]);

  const handleAnalyze = async () => {
    if (!question.trim()) return;
    
    // Track analysis start
    const startTime = Date.now();
    setAnalysisStartTime(startTime);
    trackDecisionAnalysis(mode, locale, question.length);
    
    // Add user message
    const userMessage = {
      type: 'user' as const,
      content: question,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Soru geçmişini güncelle ve akıllı profilleme yap
    const updatedQuestionHistory = [...questionHistory, question];
    setQuestionHistory(updatedQuestionHistory);
    localStorage.setItem('nexreason_question_history', JSON.stringify(updatedQuestionHistory));
    
    // Akıllı profilleme ile profili güncelle
    if (!userProfile || Object.keys(userProfile).length < 5) {
      const smartProfile = SmartProfilingEngine.updateProfileWithInferences(
        userProfile || {}, 
        updatedQuestionHistory, 
        locale
      );
      
      if (Object.keys(smartProfile).length > 0) {
        setSmartProfileDetected(smartProfile);
        setShowSmartProfileNotification(true);
        console.log('🤖 Akıllı profilleme tespit edildi:', smartProfile);
      }
    }
    
    setIsAnalyzing(true);
    setShowTyping(true);
    setQuestion('');
    
    // Scroll to bottom
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    
    try {
      // Simulate typing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Kişiselleştirme bağlamını oluştur
      const personalizationContext: PersonalizationContext = {
        userProfile: userProfile || undefined,
        sessionContext,
        culturalContext: {
          country: locale === 'tr' ? 'Turkey' : locale === 'es' ? 'Spain' : locale === 'ru' ? 'Russia' : 'United States',
          culturalValues: locale === 'tr' ? ['Aile', 'Saygı', 'Misafirperverlik'] : 
                         locale === 'es' ? ['Familia', 'Respeto', 'Tradición'] :
                         locale === 'ru' ? ['Семья', 'Уважение', 'Традиции'] :
                         ['Independence', 'Innovation', 'Efficiency']
        }
      };
      
      // Call the API endpoint
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: userMessage.content,
          mode,
          locale,
          personalizationContext
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      setAnalysis(result);
      
      // Track successful analysis completion
      const responseTime = Date.now() - startTime;
      trackAnalysisComplete(mode, locale, responseTime);
      
      // Add AI response message
      const aiMessage = {
        type: 'ai' as const,
        content: 'analysis_complete',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, aiMessage]);
      
    } catch (error) {
      console.error('Analysis failed:', error);
      
      // Track error
      trackError('analysis_failed', error instanceof Error ? error.message : 'Unknown error', mode);
      
      const errorMessage = {
        type: 'ai' as const,
        content: t('common.error'),
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsAnalyzing(false);
      setShowTyping(false);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const resetAnalysis = () => {
    setAnalysis(null);
    setQuestion('');
    setMessages([]);
    
    // Track new analysis start
    trackUserEngagement('new_analysis_started', { mode, locale });
  };

  const handleModeChange = (newMode: DecisionMode) => {
    const oldMode = mode;
    setMode(newMode);
    
    // Track mode change
    trackModeChange(oldMode, newMode);
    trackUserEngagement('mode_changed', { from: oldMode, to: newMode, locale });
  };

  const handleProfileSave = (profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem('nexreason_user_profile', JSON.stringify(profile));
    setShowProfileModal(false);
    
    // Track profile setup
    const profileFields = Object.keys(profile).filter(key => profile[key as keyof UserProfile]);
    trackProfileSetup(profileFields);
    trackUserEngagement('profile_updated', { fieldsCount: profileFields.length, locale });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showTyping]);

  if (analysis) {
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
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-12 animate-fade-in">
              <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg animate-pulse-glow mb-3 sm:mb-0 sm:mr-4">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">{t('results.title')}</h1>
                  <p className="text-white/60 text-sm sm:text-base">{t('results.subtitle')}</p>
                </div>
              </div>
              
              <button
                onClick={resetAnalysis}
                className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm sm:text-base rounded-full hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
              >
                <svg className="mr-1 sm:mr-2 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
{t('results.newAnalysis')}
              </button>
            </div>

            {/* Pros & Cons Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
              <div className="bg-white/5 backdrop-blur-sm border border-green-400/20 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl animate-slide-up">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center mr-3 sm:mr-4">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-green-400">{t('results.advantages')}</h3>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {analysis.pros.map((pro, index) => (
                    <div key={index} className="flex items-start p-3 sm:p-4 bg-green-400/10 rounded-xl border border-green-400/20">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-white/90 leading-relaxed text-sm sm:text-base">{pro}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-red-400/20 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl animate-slide-up">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-red-400 to-rose-500 flex items-center justify-center mr-3 sm:mr-4">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-red-400">{t('results.considerations')}</h3>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {analysis.cons.map((con, index) => (
                    <div key={index} className="flex items-start p-3 sm:p-4 bg-red-400/10 rounded-xl border border-red-400/20">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-white/90 leading-relaxed text-sm sm:text-base">{con}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Analysis Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
              <div className="bg-white/5 backdrop-blur-sm border border-purple-400/20 rounded-2xl p-8 shadow-xl animate-slide-up">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-violet-500 flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-purple-400">{t('results.emotionalInsight')}</h3>
                </div>
                <p className="text-white/90 leading-relaxed text-lg">{analysis.emotional_reasoning}</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-blue-400/20 rounded-2xl p-8 shadow-xl animate-slide-up">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-400">{t('results.logicalAnalysis')}</h3>
                </div>
                <p className="text-white/90 leading-relaxed text-lg">{analysis.logical_reasoning}</p>
              </div>
            </div>

            {/* Recommendation & Summary */}
            <div className="space-y-8">
              <div className="bg-white/5 backdrop-blur-sm border border-yellow-400/20 rounded-2xl p-8 shadow-xl animate-slide-up">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-yellow-400">{t('results.recommendation')}</h3>
                </div>
                <p className="text-white/90 leading-relaxed text-lg">{analysis.suggestion}</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-cyan-400/20 rounded-2xl p-8 shadow-xl animate-slide-up">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-teal-500 flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-cyan-400">{t('results.summary')}</h3>
                </div>
                <p className="text-white/90 leading-relaxed text-lg">{analysis.summary}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="text-center mt-12 animate-fade-in">
              <div className="flex justify-center space-x-4">
                <button
                  onClick={resetAnalysis}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg font-semibold"
                >
{t('results.analyzeAnother')}
                </button>
                <Link
                  href="/"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full hover:bg-white/20 transition-all transform hover:scale-105 shadow-lg font-semibold"
                >
{t('results.backToHome')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(156, 146, 172, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(156, 146, 172, 0.1) 0%, transparent 50%)`
        }}></div>
      </div>
      
      {/* Chat Container */}
      <div className="flex flex-col h-screen max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 border-b border-white/10 backdrop-blur-sm bg-white/5 relative z-10 space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg animate-pulse-glow">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full border-2 border-slate-900"></div>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-white">{t('appName')}</h1>
              <p className="text-xs sm:text-sm text-white/60">{t('appSubtitle')}</p>
            </div>
          </div>

          {/* Mode Selector */}
          <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto">
            <span className="text-white/60 text-xs sm:text-sm font-medium hidden sm:block">{t('modeLabel')}</span>
            <div className="flex rounded-full bg-white/10 p-1 backdrop-blur-sm flex-1 sm:flex-none">
              {(['analytical', 'emotional', 'creative'] as DecisionMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    console.log('Mode clicked:', m, 'Current mode:', mode);
                    handleModeChange(m);
                  }}
                  className={`px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs font-semibold transition-all duration-300 flex-1 sm:flex-none ${
                    mode === m
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="block sm:hidden">
                    {m === 'analytical' && '🧠'} 
                    {m === 'emotional' && '💖'} 
                    {m === 'creative' && '🎨'}
                  </span>
                  <span className="hidden sm:block">
                    {m === 'analytical' && '🧠'} 
                    {m === 'emotional' && '💖'} 
                    {m === 'creative' && '🎨'} 
                    {tHome(`modes.${m}.title`)}
                  </span>
                </button>
              ))}
            </div>
            <button 
              onClick={() => setShowProfileModal(true)}
              className="p-2 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all mr-2"
              title="Profil Ayarları"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            <Link href="/" className="p-2 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
          {messages.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 px-4">{t('welcomeTitle')}</h3>
              <p className="text-white/60 max-w-md mx-auto text-sm sm:text-base px-4">
                {t('welcomeDescription', { mode: tHome(`modes.${mode}.title`).toLowerCase() })}
              </p>
            </div>
          )}

          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
              <div className={`flex items-start space-x-3 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user' 
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500' 
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse-glow'
                }`}>
                  {message.type === 'user' ? (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`relative max-w-2xl ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                    : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white'
                } rounded-2xl px-6 py-4 shadow-xl`}>
                  {message.content === 'analysis_complete' ? (
                    <div className="text-center py-2">
                      <div className="flex items-center justify-center space-x-2 text-green-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">{t('analysisComplete')}</span>
                      </div>
                      <p className="text-white/70 text-sm mt-1">{t('analysisReady')}</p>
                    </div>
                  ) : (
                    <p className="leading-relaxed">{message.content}</p>
                  )}
                  
                  {/* Tail */}
                  <div className={`absolute top-4 ${
                    message.type === 'user' 
                      ? '-right-2 border-l-8 border-l-blue-500 border-t-8 border-t-transparent border-b-8 border-b-transparent' 
                      : '-left-2 border-r-8 border-r-white/10 border-t-8 border-t-transparent border-b-8 border-b-transparent'
                  } w-0 h-0`}></div>
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {showTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="flex items-start space-x-3 max-w-3xl">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center animate-pulse-glow">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 shadow-xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <p className="text-white/70 text-xs mt-2">{t('analyzingMessage')}</p>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-white/10 backdrop-blur-sm bg-white/5">
          <div className="flex items-end space-x-4">
            <div className="flex-1">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleAnalyze();
                  }
                }}
                placeholder={t('placeholder')}
                className="w-full min-h-[60px] max-h-[120px] p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none transition-all"
                disabled={isAnalyzing}
              />
            </div>
            <button
              onClick={handleAnalyze}
              disabled={!question.trim() || isAnalyzing}
              className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
            >
              {isAnalyzing ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </div>
          <p className="text-white/40 text-xs mt-2 text-center">{t('inputHint')}</p>
        </div>
      </div>

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onSave={handleProfileSave}
        currentProfile={userProfile || undefined}
      />

      {/* Smart Profiling Notification */}
      {showSmartProfileNotification && smartProfileDetected && (
        <SmartProfilingNotification
          detectedProfile={smartProfileDetected}
          onAccept={() => {
            const enhancedProfile: UserProfile = {
              id: userProfile?.id || `smart_${Date.now()}`,
              ...userProfile,
              ...smartProfileDetected,
              interests: smartProfileDetected.interests || userProfile?.interests || [],
              personalityTraits: smartProfileDetected.personalityTraits || userProfile?.personalityTraits || [],
              goals: smartProfileDetected.goals || userProfile?.goals || [],
              values: smartProfileDetected.values || userProfile?.values || [],
              previousDecisions: userProfile?.previousDecisions || [],
              createdAt: userProfile?.createdAt || new Date(),
              updatedAt: new Date()
            } as UserProfile;
            
            setUserProfile(enhancedProfile);
            localStorage.setItem('nexreason_user_profile', JSON.stringify(enhancedProfile));
            setShowSmartProfileNotification(false);
            setSmartProfileDetected(null);
          }}
          onDismiss={() => {
            setShowSmartProfileNotification(false);
            setSmartProfileDetected(null);
          }}
        />
      )}
    </div>
  );
} 