'use client';

import { useState } from 'react';
import { UserProfile, PersonalizationContext } from '@/types';
import { useTranslations } from 'next-intl';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (profile: UserProfile) => void;
  currentProfile?: UserProfile;
}

export default function UserProfileModal({ isOpen, onClose, onSave, currentProfile }: UserProfileModalProps) {
  const t = useTranslations('profile');
  
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    age: currentProfile?.age || undefined,
    profession: currentProfile?.profession || '',
    location: currentProfile?.location || '',
    interests: currentProfile?.interests || [],
    riskTolerance: currentProfile?.riskTolerance || 'medium',
    decisionStyle: currentProfile?.decisionStyle || 'thorough',
    lifeStage: currentProfile?.lifeStage || 'early_career',
    familyStatus: currentProfile?.familyStatus || 'single',
    financialSituation: currentProfile?.financialSituation || 'comfortable',
    personalityTraits: currentProfile?.personalityTraits || [],
    goals: currentProfile?.goals || [],
    values: currentProfile?.values || []
  });

  const [newInterest, setNewInterest] = useState('');
  const [newGoal, setNewGoal] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newTrait, setNewTrait] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    const fullProfile: UserProfile = {
      id: currentProfile?.id || `user_${Date.now()}`,
      ...profile,
      interests: profile.interests || [],
      personalityTraits: profile.personalityTraits || [],
      goals: profile.goals || [],
      values: profile.values || [],
      previousDecisions: currentProfile?.previousDecisions || [],
      createdAt: currentProfile?.createdAt || new Date(),
      updatedAt: new Date()
    } as UserProfile;
    
    onSave(fullProfile);
    onClose();
  };

  const addToArray = (field: keyof UserProfile, value: string, setter: (value: string) => void) => {
    if (value.trim()) {
      const currentArray = (profile[field] as string[]) || [];
      setProfile(prev => ({
        ...prev,
        [field]: [...currentArray, value.trim()]
      }));
      setter('');
    }
  };

  const removeFromArray = (field: keyof UserProfile, index: number) => {
    const currentArray = (profile[field] as string[]) || [];
    setProfile(prev => ({
      ...prev,
      [field]: currentArray.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">👤 {t('title')}</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            {/* Temel Bilgiler */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">📊 {t('basicInfo')}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">{t('age')}</label>
                  <input
                    type="number"
                    value={profile.age || ''}
                    onChange={(e) => setProfile(prev => ({ ...prev, age: parseInt(e.target.value) || undefined }))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder={t('placeholders.age')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">{t('profession')}</label>
                  <input
                    type="text"
                    value={profile.profession || ''}
                    onChange={(e) => setProfile(prev => ({ ...prev, profession: e.target.value }))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder={t('placeholders.profession')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">{t('location')}</label>
                  <input
                    type="text"
                    value={profile.location || ''}
                    onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder={t('placeholders.location')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">{t('riskTolerance')}</label>
                  <select
                    value={profile.riskTolerance || 'medium'}
                    onChange={(e) => setProfile(prev => ({ ...prev, riskTolerance: e.target.value as any }))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="low">{t('riskToleranceOptions.low')}</option>
                    <option value="medium">{t('riskToleranceOptions.medium')}</option>
                    <option value="high">{t('riskToleranceOptions.high')}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Karar Verme Tarzı */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">🎯 {t('decisionStyle')}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">{t('decisionStyleLabel')}</label>
                  <select
                    value={profile.decisionStyle || 'thorough'}
                    onChange={(e) => setProfile(prev => ({ ...prev, decisionStyle: e.target.value as any }))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="quick">{t('decisionStyleOptions.quick')}</option>
                    <option value="thorough">{t('decisionStyleOptions.thorough')}</option>
                    <option value="collaborative">{t('decisionStyleOptions.collaborative')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">{t('lifeStage')}</label>
                  <select
                    value={profile.lifeStage || 'early_career'}
                    onChange={(e) => setProfile(prev => ({ ...prev, lifeStage: e.target.value as any }))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="student">{t('lifeStageOptions.student')}</option>
                    <option value="early_career">{t('lifeStageOptions.early_career')}</option>
                    <option value="mid_career">{t('lifeStageOptions.mid_career')}</option>
                    <option value="senior">{t('lifeStageOptions.senior')}</option>
                    <option value="retired">{t('lifeStageOptions.retired')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">{t('familyStatus')}</label>
                  <select
                    value={profile.familyStatus || 'single'}
                    onChange={(e) => setProfile(prev => ({ ...prev, familyStatus: e.target.value as any }))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="single">{t('familyStatusOptions.single')}</option>
                    <option value="relationship">{t('familyStatusOptions.relationship')}</option>
                    <option value="married">{t('familyStatusOptions.married')}</option>
                    <option value="parent">{t('familyStatusOptions.parent')}</option>
                    <option value="caregiver">{t('familyStatusOptions.caregiver')}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* İlgi Alanları */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">🎨 {t('interests')}</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addToArray('interests', newInterest, setNewInterest)}
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder={t('placeholders.interests')}
                />
                <button
                  onClick={() => addToArray('interests', newInterest, setNewInterest)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  {t('add')}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(profile.interests || []).map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm flex items-center gap-2"
                  >
                    {interest}
                    <button
                      onClick={() => removeFromArray('interests', index)}
                      className="text-purple-400 hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Hedefler */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">🎯 {t('goals')}</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addToArray('goals', newGoal, setNewGoal)}
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder={t('placeholders.goals')}
                />
                <button
                  onClick={() => addToArray('goals', newGoal, setNewGoal)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t('add')}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(profile.goals || []).map((goal, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm flex items-center gap-2"
                  >
                    {goal}
                    <button
                      onClick={() => removeFromArray('goals', index)}
                      className="text-blue-400 hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Değerler */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">💎 {t('values')}</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addToArray('values', newValue, setNewValue)}
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder={t('placeholders.values')}
                />
                <button
                  onClick={() => addToArray('values', newValue, setNewValue)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  {t('add')}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(profile.values || []).map((value, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-600/20 text-green-300 rounded-full text-sm flex items-center gap-2"
                  >
                    {value}
                    <button
                      onClick={() => removeFromArray('values', index)}
                      className="text-green-400 hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
            >
              {t('cancel')}
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors"
            >
              {t('save')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 