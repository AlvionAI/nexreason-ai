'use client';

import { useState, useEffect } from 'react';
import { UserProfile } from '@/types';

interface SmartProfilingNotificationProps {
  detectedProfile: Partial<UserProfile>;
  onAccept: () => void;
  onDismiss: () => void;
}

export default function SmartProfilingNotification({ 
  detectedProfile, 
  onAccept, 
  onDismiss 
}: SmartProfilingNotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleAccept = () => {
    onAccept();
    setIsVisible(false);
  };

  const handleDismiss = () => {
    onDismiss();
    setIsVisible(false);
  };

  const getProfileSummary = () => {
    const items = [];
    if (detectedProfile.age) items.push(`${detectedProfile.age} yaşında`);
    if (detectedProfile.profession) items.push(detectedProfile.profession);
    if (detectedProfile.lifeStage) {
      const stageMap = {
        student: 'Öğrenci',
        early_career: 'Erken Kariyer',
        mid_career: 'Orta Kariyer',
        senior: 'Kıdemli',
        retired: 'Emekli'
      };
      items.push(stageMap[detectedProfile.lifeStage] || detectedProfile.lifeStage);
    }
    if (detectedProfile.interests && detectedProfile.interests.length > 0) {
      items.push(`İlgi: ${detectedProfile.interests.slice(0, 2).join(', ')}`);
    }
    return items.join(' • ');
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 animate-slide-up">
      <div className="bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-sm border border-white/20 rounded-2xl p-4 shadow-xl">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <h4 className="text-white font-semibold text-sm">🤖 Akıllı Profilleme</h4>
              <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-full">Yeni</span>
            </div>
            
            <p className="text-white/90 text-sm mb-2">
              Sorularınızdan profilinizi otomatik olarak tespit ettik:
            </p>
            
            <div className="bg-white/10 rounded-lg p-2 mb-3">
              <p className="text-white text-xs font-medium">
                {getProfileSummary()}
              </p>
            </div>
            
            <p className="text-white/80 text-xs mb-3">
              Bu bilgileri kullanarak daha kişiselleştirilmiş analizler sunabiliriz.
            </p>
            
            <div className="flex space-x-2">
              <button
                onClick={handleAccept}
                className="flex-1 px-3 py-2 bg-white/20 text-white text-sm rounded-lg hover:bg-white/30 transition-colors"
              >
                ✅ Kabul Et
              </button>
              <button
                onClick={handleDismiss}
                className="px-3 py-2 bg-white/10 text-white/70 text-sm rounded-lg hover:bg-white/20 transition-colors"
              >
                ❌
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 