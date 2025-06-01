import { UserProfile, PersonalizationContext, DecisionCategory, DecisionMode, Locale, DecisionHistory } from '@/types';

export class PersonalizationEngine {
  
  /**
   * Kullanıcı profilini analiz ederek kişiselleştirilmiş prompt ekleri oluşturur
   */
  static generatePersonalizedPromptAdditions(
    question: string,
    context: PersonalizationContext,
    detectedLanguage: Locale
  ): string {
    const additions: string[] = [];
    
    // Unique session marker for this specific analysis
    const sessionMarker = `PERSONALIZED_ANALYSIS_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    
    const texts = {
      en: {
        header: "🎯 CRITICAL PERSONALIZATION DIRECTIVE:",
        mandate: "This analysis MUST be uniquely tailored to the user's specific profile and context below.",
        uniqueId: "Unique Analysis ID"
      },
      tr: {
        header: "🎯 KRİTİK KİŞİSELLEŞTİRME TALİMATI:",
        mandate: "Bu analiz aşağıdaki kullanıcının özel profili ve bağlamına MUTLAKA özgü olarak uyarlanmalıdır.",
        uniqueId: "Benzersiz Analiz Kimliği"
      },
      es: {
        header: "🎯 DIRECTIVA CRÍTICA DE PERSONALIZACIÓN:",
        mandate: "Este análisis DEBE ser adaptado únicamente al perfil específico del usuario y contexto a continuación.",
        uniqueId: "ID de Análisis Único"
      },
      ru: {
        header: "🎯 КРИТИЧЕСКАЯ ДИРЕКТИВА ПЕРСОНАЛИЗАЦИИ:",
        mandate: "Этот анализ ДОЛЖЕН быть уникально адаптирован к конкретному профилю пользователя и контексту ниже.",
        uniqueId: "Уникальный ID Анализа"
      }
    };
    
    const t = texts[detectedLanguage] || texts.en;
    
    additions.push(`${t.header}
${t.mandate}
🆔 ${t.uniqueId}: ${sessionMarker}`);
    
    // Kullanıcı profili bazlı kişiselleştirme
    if (context.userProfile) {
      additions.push(this.generateProfileBasedContext(context.userProfile, detectedLanguage));
    }
    
    // Geçmiş kararlar bazlı kişiselleştirme
    if (context.recentDecisions && context.recentDecisions.length > 0) {
      additions.push(this.generateHistoryBasedContext(context.recentDecisions, detectedLanguage));
    }
    
    // Oturum bağlamı bazlı kişiselleştirme
    if (context.sessionContext) {
      additions.push(this.generateSessionBasedContext(context.sessionContext, detectedLanguage));
    }
    
    // Kültürel bağlam bazlı kişiselleştirme
    if (context.culturalContext) {
      additions.push(this.generateCulturalContext(context.culturalContext, detectedLanguage));
    }
    
    // Add specific instructions for using this personalization
    const instructionTexts = {
      en: {
        instructions: "🚨 MANDATORY PERSONALIZATION REQUIREMENTS:",
        requirements: [
          "Reference the user's specific age, profession, and location in your analysis",
          "Tailor recommendations to their risk tolerance and decision-making style",
          "Consider their life stage and family situation in all suggestions",
          "Incorporate their interests and goals into the analysis",
          "Make this analysis completely unique to their profile - NO generic responses"
        ]
      },
      tr: {
        instructions: "🚨 ZORUNLU KİŞİSELLEŞTİRME GEREKSİNİMLERİ:",
        requirements: [
          "Analizinizde kullanıcının özel yaşını, mesleğini ve konumunu referans alın",
          "Önerileri risk toleransı ve karar verme tarzına göre uyarlayın",
          "Tüm önerilerde yaşam evresi ve aile durumunu göz önünde bulundurun",
          "İlgi alanları ve hedeflerini analize dahil edin",
          "Bu analizi profiline tamamen özgü yapın - jenerik cevap YOK"
        ]
      },
      es: {
        instructions: "🚨 REQUISITOS OBLIGATORIOS DE PERSONALIZACIÓN:",
        requirements: [
          "Referencie la edad específica, profesión y ubicación del usuario en su análisis",
          "Adapte las recomendaciones a su tolerancia al riesgo y estilo de toma de decisiones",
          "Considere su etapa de vida y situación familiar en todas las sugerencias",
          "Incorpore sus intereses y objetivos en el análisis",
          "Haga este análisis completamente único a su perfil - NO respuestas genéricas"
        ]
      },
      ru: {
        instructions: "🚨 ОБЯЗАТЕЛЬНЫЕ ТРЕБОВАНИЯ ПЕРСОНАЛИЗАЦИИ:",
        requirements: [
          "Ссылайтесь на конкретный возраст, профессию и местоположение пользователя в вашем анализе",
          "Адаптируйте рекомендации к их толерантности к риску и стилю принятия решений",
          "Учитывайте их жизненный этап и семейное положение во всех предложениях",
          "Включите их интересы и цели в анализ",
          "Сделайте этот анализ полностью уникальным для их профиля - НЕТ общих ответов"
        ]
      }
    };
    
    const instrText = instructionTexts[detectedLanguage] || instructionTexts.en;
    const requirementsList = instrText.requirements.map((req, index) => `${index + 1}. ${req}`).join('\n');
    
    additions.push(`${instrText.instructions}
${requirementsList}`);
    
    return additions.filter(Boolean).join('\n\n');
  }
  
  /**
   * Kullanıcı profili bazlı bağlam oluşturur
   */
  private static generateProfileBasedContext(profile: UserProfile, locale: Locale): string {
    const contextParts: string[] = [];
    
    const texts = {
      en: {
        userContext: "🎯 USER PERSONALIZATION CONTEXT:",
        age: "Age group",
        profession: "Professional background",
        location: "Location",
        riskTolerance: "Risk tolerance",
        decisionStyle: "Decision-making style",
        lifeStage: "Life stage",
        familyStatus: "Family situation",
        financialSituation: "Financial situation",
        interests: "Key interests",
        goals: "Personal goals",
        values: "Core values",
        personalityTraits: "Personality traits"
      },
      tr: {
        userContext: "🎯 KULLANICI KİŞİSELLEŞTİRME BAĞLAMI:",
        age: "Yaş grubu",
        profession: "Mesleki geçmiş",
        location: "Konum",
        riskTolerance: "Risk toleransı",
        decisionStyle: "Karar verme tarzı",
        lifeStage: "Yaşam evresi",
        familyStatus: "Aile durumu",
        financialSituation: "Mali durum",
        interests: "Ana ilgi alanları",
        goals: "Kişisel hedefler",
        values: "Temel değerler",
        personalityTraits: "Kişilik özellikleri"
      },
      es: {
        userContext: "🎯 CONTEXTO DE PERSONALIZACIÓN DEL USUARIO:",
        age: "Grupo de edad",
        profession: "Antecedentes profesionales",
        location: "Ubicación",
        riskTolerance: "Tolerancia al riesgo",
        decisionStyle: "Estilo de toma de decisiones",
        lifeStage: "Etapa de vida",
        familyStatus: "Situación familiar",
        financialSituation: "Situación financiera",
        interests: "Intereses principales",
        goals: "Objetivos personales",
        values: "Valores fundamentales",
        personalityTraits: "Rasgos de personalidad"
      },
      ru: {
        userContext: "🎯 КОНТЕКСТ ПЕРСОНАЛИЗАЦИИ ПОЛЬЗОВАТЕЛЯ:",
        age: "Возрастная группа",
        profession: "Профессиональный опыт",
        location: "Местоположение",
        riskTolerance: "Толерантность к риску",
        decisionStyle: "Стиль принятия решений",
        lifeStage: "Жизненный этап",
        familyStatus: "Семейное положение",
        financialSituation: "Финансовое положение",
        interests: "Основные интересы",
        goals: "Личные цели",
        values: "Основные ценности",
        personalityTraits: "Черты личности"
      }
    };
    
    const t = texts[locale] || texts.en;
    contextParts.push(t.userContext);
    
    if (profile.age) {
      contextParts.push(`📊 ${t.age}: ${this.getAgeGroupDescription(profile.age, locale)}`);
    }
    
    if (profile.profession) {
      contextParts.push(`💼 ${t.profession}: ${profile.profession}`);
    }
    
    if (profile.location) {
      contextParts.push(`📍 ${t.location}: ${profile.location}`);
    }
    
    if (profile.riskTolerance) {
      contextParts.push(`⚖️ ${t.riskTolerance}: ${this.translateRiskTolerance(profile.riskTolerance, locale)}`);
    }
    
    if (profile.decisionStyle) {
      contextParts.push(`🎯 ${t.decisionStyle}: ${this.translateDecisionStyle(profile.decisionStyle, locale)}`);
    }
    
    if (profile.lifeStage) {
      contextParts.push(`🌱 ${t.lifeStage}: ${this.translateLifeStage(profile.lifeStage, locale)}`);
    }
    
    if (profile.familyStatus) {
      contextParts.push(`👨‍👩‍👧‍👦 ${t.familyStatus}: ${this.translateFamilyStatus(profile.familyStatus, locale)}`);
    }
    
    if (profile.financialSituation) {
      contextParts.push(`💰 ${t.financialSituation}: ${this.translateFinancialSituation(profile.financialSituation, locale)}`);
    }
    
    if (profile.interests && profile.interests.length > 0) {
      contextParts.push(`🎨 ${t.interests}: ${profile.interests.join(', ')}`);
    }
    
    if (profile.goals && profile.goals.length > 0) {
      contextParts.push(`🎯 ${t.goals}: ${profile.goals.join(', ')}`);
    }
    
    if (profile.values && profile.values.length > 0) {
      contextParts.push(`💎 ${t.values}: ${profile.values.join(', ')}`);
    }
    
    if (profile.personalityTraits && profile.personalityTraits.length > 0) {
      contextParts.push(`🧠 ${t.personalityTraits}: ${profile.personalityTraits.join(', ')}`);
    }
    
    return contextParts.join('\n');
  }
  
  /**
   * Geçmiş kararlar bazlı bağlam oluşturur
   */
  private static generateHistoryBasedContext(decisions: DecisionHistory[], locale: Locale): string {
    const texts = {
      en: {
        historyContext: "📚 DECISION HISTORY INSIGHTS:",
        recentPatterns: "Recent decision patterns",
        preferredCategories: "Frequently analyzed categories",
        successfulOutcomes: "Previous successful decisions",
        learningPoints: "Key learning points from past decisions"
      },
      tr: {
        historyContext: "📚 KARAR GEÇMİŞİ İÇGÖRÜLERİ:",
        recentPatterns: "Son karar kalıpları",
        preferredCategories: "Sık analiz edilen kategoriler",
        successfulOutcomes: "Önceki başarılı kararlar",
        learningPoints: "Geçmiş kararlardan önemli öğrenme noktaları"
      },
      es: {
        historyContext: "📚 PERSPECTIVAS DEL HISTORIAL DE DECISIONES:",
        recentPatterns: "Patrones de decisiones recientes",
        preferredCategories: "Categorías analizadas frecuentemente",
        successfulOutcomes: "Decisiones exitosas anteriores",
        learningPoints: "Puntos clave de aprendizaje de decisiones pasadas"
      },
      ru: {
        historyContext: "📚 АНАЛИЗ ИСТОРИИ РЕШЕНИЙ:",
        recentPatterns: "Недавние паттерны решений",
        preferredCategories: "Часто анализируемые категории",
        successfulOutcomes: "Предыдущие успешные решения",
        learningPoints: "Ключевые моменты обучения из прошлых решений"
      }
    };
    
    const t = texts[locale] || texts.en;
    const contextParts: string[] = [t.historyContext];
    
    // Kategori analizi
    const categoryCount = this.analyzeCategoryFrequency(decisions);
    if (Object.keys(categoryCount).length > 0) {
      const topCategories = Object.entries(categoryCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
        .map(([category]) => category);
      contextParts.push(`📊 ${t.preferredCategories}: ${topCategories.join(', ')}`);
    }
    
    // Başarılı kararlar
    const successfulDecisions = decisions.filter(d => 
      d.userFeedback && d.userFeedback.helpful && d.userFeedback.rating >= 4
    );
    if (successfulDecisions.length > 0) {
      contextParts.push(`✅ ${t.successfulOutcomes}: ${successfulDecisions.length} positive outcomes`);
    }
    
    return contextParts.join('\n');
  }
  
  /**
   * Oturum bağlamı bazlı kişiselleştirme
   */
  private static generateSessionBasedContext(sessionContext: any, locale: Locale): string {
    const texts = {
      en: {
        sessionContext: "⏰ CURRENT SESSION CONTEXT:",
        mood: "Current mood",
        timeConstraint: "Time constraint",
        stakeholders: "Key stakeholders",
        budget: "Budget consideration"
      },
      tr: {
        sessionContext: "⏰ MEVCUT OTURUM BAĞLAMI:",
        mood: "Mevcut ruh hali",
        timeConstraint: "Zaman kısıtı",
        stakeholders: "Ana paydaşlar",
        budget: "Bütçe değerlendirmesi"
      },
      es: {
        sessionContext: "⏰ CONTEXTO DE SESIÓN ACTUAL:",
        mood: "Estado de ánimo actual",
        timeConstraint: "Restricción de tiempo",
        stakeholders: "Partes interesadas clave",
        budget: "Consideración presupuestaria"
      },
      ru: {
        sessionContext: "⏰ КОНТЕКСТ ТЕКУЩЕЙ СЕССИИ:",
        mood: "Текущее настроение",
        timeConstraint: "Временные ограничения",
        stakeholders: "Ключевые заинтересованные стороны",
        budget: "Бюджетные соображения"
      }
    };
    
    const t = texts[locale] || texts.en;
    const contextParts: string[] = [t.sessionContext];
    
    if (sessionContext.currentMood) {
      contextParts.push(`😊 ${t.mood}: ${this.translateMood(sessionContext.currentMood, locale)}`);
    }
    
    if (sessionContext.timeConstraint) {
      contextParts.push(`⏱️ ${t.timeConstraint}: ${this.translateTimeConstraint(sessionContext.timeConstraint, locale)}`);
    }
    
    if (sessionContext.stakeholders && sessionContext.stakeholders.length > 0) {
      contextParts.push(`👥 ${t.stakeholders}: ${sessionContext.stakeholders.join(', ')}`);
    }
    
    if (sessionContext.budget) {
      contextParts.push(`💵 ${t.budget}: ${this.translateBudget(sessionContext.budget, locale)}`);
    }
    
    return contextParts.join('\n');
  }
  
  /**
   * Kültürel bağlam oluşturur
   */
  private static generateCulturalContext(culturalContext: any, locale: Locale): string {
    const texts = {
      en: {
        culturalContext: "🌍 CULTURAL CONTEXT:",
        country: "Country/Region",
        culturalValues: "Cultural values",
        localFactors: "Local considerations"
      },
      tr: {
        culturalContext: "🌍 KÜLTÜREL BAĞLAM:",
        country: "Ülke/Bölge",
        culturalValues: "Kültürel değerler",
        localFactors: "Yerel faktörler"
      },
      es: {
        culturalContext: "🌍 CONTEXTO CULTURAL:",
        country: "País/Región",
        culturalValues: "Valores culturales",
        localFactors: "Consideraciones locales"
      },
      ru: {
        culturalContext: "🌍 КУЛЬТУРНЫЙ КОНТЕКСТ:",
        country: "Страна/Регион",
        culturalValues: "Культурные ценности",
        localFactors: "Местные соображения"
      }
    };
    
    const t = texts[locale] || texts.en;
    const contextParts: string[] = [t.culturalContext];
    
    if (culturalContext.country) {
      contextParts.push(`🏛️ ${t.country}: ${culturalContext.country}`);
    }
    
    if (culturalContext.culturalValues && culturalContext.culturalValues.length > 0) {
      contextParts.push(`💫 ${t.culturalValues}: ${culturalContext.culturalValues.join(', ')}`);
    }
    
    if (culturalContext.localFactors && culturalContext.localFactors.length > 0) {
      contextParts.push(`📍 ${t.localFactors}: ${culturalContext.localFactors.join(', ')}`);
    }
    
    return contextParts.join('\n');
  }
  
  /**
   * Kişiselleştirme skorunu hesaplar
   */
  static calculatePersonalizationScore(context: PersonalizationContext): number {
    let score = 0;
    let maxScore = 0;
    
    // Kullanıcı profili (40 puan)
    if (context.userProfile) {
      maxScore += 40;
      if (context.userProfile.age) score += 5;
      if (context.userProfile.profession) score += 8;
      if (context.userProfile.location) score += 3;
      if (context.userProfile.riskTolerance) score += 6;
      if (context.userProfile.decisionStyle) score += 6;
      if (context.userProfile.lifeStage) score += 4;
      if (context.userProfile.familyStatus) score += 4;
      if (context.userProfile.financialSituation) score += 4;
    }
    
    // Geçmiş kararlar (30 puan)
    if (context.recentDecisions) {
      maxScore += 30;
      score += Math.min(context.recentDecisions.length * 5, 30);
    }
    
    // Oturum bağlamı (20 puan)
    if (context.sessionContext) {
      maxScore += 20;
      if (context.sessionContext.currentMood) score += 5;
      if (context.sessionContext.timeConstraint) score += 5;
      if (context.sessionContext.stakeholders) score += 5;
      if (context.sessionContext.budget) score += 5;
    }
    
    // Kültürel bağlam (10 puan)
    if (context.culturalContext) {
      maxScore += 10;
      if (context.culturalContext.country) score += 5;
      if (context.culturalContext.culturalValues) score += 3;
      if (context.culturalContext.localFactors) score += 2;
    }
    
    return maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  }
  
  // Yardımcı çeviri metodları
  private static getAgeGroupDescription(age: number, locale: Locale): string {
    const ageGroups = {
      en: {
        young: "Young adult (18-25)",
        earlyCareer: "Early career (26-35)",
        midCareer: "Mid-career (36-50)",
        senior: "Senior professional (51-65)",
        retired: "Retired (65+)"
      },
      tr: {
        young: "Genç yetişkin (18-25)",
        earlyCareer: "Erken kariyer (26-35)",
        midCareer: "Orta kariyer (36-50)",
        senior: "Kıdemli profesyonel (51-65)",
        retired: "Emekli (65+)"
      },
      es: {
        young: "Adulto joven (18-25)",
        earlyCareer: "Carrera temprana (26-35)",
        midCareer: "Carrera media (36-50)",
        senior: "Profesional senior (51-65)",
        retired: "Jubilado (65+)"
      },
      ru: {
        young: "Молодой взрослый (18-25)",
        earlyCareer: "Ранняя карьера (26-35)",
        midCareer: "Средняя карьера (36-50)",
        senior: "Старший профессионал (51-65)",
        retired: "Пенсионер (65+)"
      }
    };
    
    const groups = ageGroups[locale] || ageGroups.en;
    
    if (age <= 25) return groups.young;
    if (age <= 35) return groups.earlyCareer;
    if (age <= 50) return groups.midCareer;
    if (age <= 65) return groups.senior;
    return groups.retired;
  }
  
  private static translateRiskTolerance(risk: string, locale: Locale): string {
    const translations = {
      en: { low: "Conservative", medium: "Moderate", high: "Aggressive" },
      tr: { low: "Muhafazakar", medium: "Orta", high: "Agresif" },
      es: { low: "Conservador", medium: "Moderado", high: "Agresivo" },
      ru: { low: "Консервативный", medium: "Умеренный", high: "Агрессивный" }
    };
    return translations[locale]?.[risk as keyof typeof translations.en] || risk;
  }
  
  private static translateDecisionStyle(style: string, locale: Locale): string {
    const translations = {
      en: { quick: "Quick decision maker", thorough: "Thorough analyzer", collaborative: "Collaborative approach" },
      tr: { quick: "Hızlı karar verici", thorough: "Kapsamlı analizci", collaborative: "İşbirlikçi yaklaşım" },
      es: { quick: "Decisor rápido", thorough: "Analizador exhaustivo", collaborative: "Enfoque colaborativo" },
      ru: { quick: "Быстрый принимающий решения", thorough: "Тщательный аналитик", collaborative: "Совместный подход" }
    };
    return translations[locale]?.[style as keyof typeof translations.en] || style;
  }
  
  private static translateLifeStage(stage: string, locale: Locale): string {
    const translations = {
      en: { 
        student: "Student", 
        early_career: "Early career", 
        mid_career: "Mid-career", 
        senior: "Senior professional", 
        retired: "Retired" 
      },
      tr: { 
        student: "Öğrenci", 
        early_career: "Erken kariyer", 
        mid_career: "Orta kariyer", 
        senior: "Kıdemli profesyonel", 
        retired: "Emekli" 
      },
      es: { 
        student: "Estudiante", 
        early_career: "Carrera temprana", 
        mid_career: "Carrera media", 
        senior: "Profesional senior", 
        retired: "Jubilado" 
      },
      ru: { 
        student: "Студент", 
        early_career: "Ранняя карьера", 
        mid_career: "Средняя карьера", 
        senior: "Старший профессионал", 
        retired: "Пенсионер" 
      }
    };
    return translations[locale]?.[stage as keyof typeof translations.en] || stage;
  }
  
  private static translateFamilyStatus(status: string, locale: Locale): string {
    const translations = {
      en: { 
        single: "Single", 
        relationship: "In relationship", 
        married: "Married", 
        parent: "Parent", 
        caregiver: "Caregiver" 
      },
      tr: { 
        single: "Bekar", 
        relationship: "İlişkide", 
        married: "Evli", 
        parent: "Ebeveyn", 
        caregiver: "Bakıcı" 
      },
      es: { 
        single: "Soltero", 
        relationship: "En relación", 
        married: "Casado", 
        parent: "Padre/Madre", 
        caregiver: "Cuidador" 
      },
      ru: { 
        single: "Холост", 
        relationship: "В отношениях", 
        married: "Женат", 
        parent: "Родитель", 
        caregiver: "Опекун" 
      }
    };
    return translations[locale]?.[status as keyof typeof translations.en] || status;
  }
  
  private static translateFinancialSituation(situation: string, locale: Locale): string {
    const translations = {
      en: { tight: "Tight budget", comfortable: "Comfortable", wealthy: "Wealthy" },
      tr: { tight: "Sıkı bütçe", comfortable: "Rahat", wealthy: "Varlıklı" },
      es: { tight: "Presupuesto ajustado", comfortable: "Cómodo", wealthy: "Adinerado" },
      ru: { tight: "Ограниченный бюджет", comfortable: "Комфортный", wealthy: "Богатый" }
    };
    return translations[locale]?.[situation as keyof typeof translations.en] || situation;
  }
  
  private static translateMood(mood: string, locale: Locale): string {
    const translations = {
      en: { stressed: "Stressed", confident: "Confident", uncertain: "Uncertain", excited: "Excited" },
      tr: { stressed: "Stresli", confident: "Kendinden emin", uncertain: "Belirsiz", excited: "Heyecanlı" },
      es: { stressed: "Estresado", confident: "Confiado", uncertain: "Incierto", excited: "Emocionado" },
      ru: { stressed: "Напряженный", confident: "Уверенный", uncertain: "Неопределенный", excited: "Взволнованный" }
    };
    return translations[locale]?.[mood as keyof typeof translations.en] || mood;
  }
  
  private static translateTimeConstraint(constraint: string, locale: Locale): string {
    const translations = {
      en: { urgent: "Urgent decision needed", moderate: "Moderate timeline", flexible: "Flexible timing" },
      tr: { urgent: "Acil karar gerekli", moderate: "Orta zaman dilimi", flexible: "Esnek zamanlama" },
      es: { urgent: "Decisión urgente necesaria", moderate: "Cronograma moderado", flexible: "Tiempo flexible" },
      ru: { urgent: "Срочное решение необходимо", moderate: "Умеренные сроки", flexible: "Гибкие сроки" }
    };
    return translations[locale]?.[constraint as keyof typeof translations.en] || constraint;
  }
  
  private static translateBudget(budget: string, locale: Locale): string {
    const translations = {
      en: { limited: "Limited budget", moderate: "Moderate budget", flexible: "Flexible budget" },
      tr: { limited: "Sınırlı bütçe", moderate: "Orta bütçe", flexible: "Esnek bütçe" },
      es: { limited: "Presupuesto limitado", moderate: "Presupuesto moderado", flexible: "Presupuesto flexible" },
      ru: { limited: "Ограниченный бюджет", moderate: "Умеренный бюджет", flexible: "Гибкий бюджет" }
    };
    return translations[locale]?.[budget as keyof typeof translations.en] || budget;
  }
  
  private static analyzeCategoryFrequency(decisions: DecisionHistory[]): Record<string, number> {
    const categoryCount: Record<string, number> = {};
    decisions.forEach(decision => {
      categoryCount[decision.category] = (categoryCount[decision.category] || 0) + 1;
    });
    return categoryCount;
  }
} 