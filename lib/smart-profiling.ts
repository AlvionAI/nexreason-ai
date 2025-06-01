import { UserProfile, DecisionCategory, Locale } from '@/types';

export class SmartProfilingEngine {
  
  /**
   * Kullanıcının sorularından otomatik profil çıkarımı yapar
   */
  static inferProfileFromQuestions(questions: string[], locale: Locale): Partial<UserProfile> {
    const inferredProfile: Partial<UserProfile> = {};
    
    // Yaş çıkarımı
    const ageClues = this.extractAgeClues(questions, locale);
    if (ageClues.length > 0) {
      inferredProfile.age = this.estimateAge(ageClues);
    }
    
    // Meslek çıkarımı
    const professionClues = this.extractProfessionClues(questions, locale);
    if (professionClues.length > 0) {
      inferredProfile.profession = this.estimateProfession(professionClues);
    }
    
    // Yaşam evresi çıkarımı
    const lifeStageClues = this.extractLifeStageClues(questions, locale);
    if (lifeStageClues.length > 0) {
      inferredProfile.lifeStage = this.estimateLifeStage(lifeStageClues);
    }
    
    // Aile durumu çıkarımı
    const familyClues = this.extractFamilyClues(questions, locale);
    if (familyClues.length > 0) {
      inferredProfile.familyStatus = this.estimateFamilyStatus(familyClues);
    }
    
    // İlgi alanları çıkarımı
    const interestClues = this.extractInterestClues(questions, locale);
    if (interestClues.length > 0) {
      inferredProfile.interests = interestClues;
    }
    
    // Risk toleransı çıkarımı
    const riskClues = this.extractRiskToleranceClues(questions, locale);
    if (riskClues.length > 0) {
      inferredProfile.riskTolerance = this.estimateRiskTolerance(riskClues);
    }
    
    return inferredProfile;
  }
  
  /**
   * Yaş ipuçlarını çıkarır
   */
  private static extractAgeClues(questions: string[], locale: Locale): string[] {
    const agePatterns = {
      en: [
        /(\d+)\s*years?\s*old/i,
        /age\s*(\d+)/i,
        /born\s*in\s*(\d{4})/i,
        /graduate\s*student/i, // ~22-26
        /fresh\s*graduate/i, // ~22-24
        /senior\s*position/i, // ~35+
        /retirement/i, // ~60+
        /college/i, // ~18-22
        /university/i, // ~18-25
        /first\s*job/i, // ~22-25
        /career\s*change/i, // ~30+
        /mid\s*career/i, // ~35-50
      ],
      tr: [
        /(\d+)\s*yaşında/i,
        /yaşım\s*(\d+)/i,
        /(\d{4})\s*doğumlu/i,
        /yeni\s*mezun/i, // ~22-24
        /lisans\s*öğrenci/i, // ~18-22
        /üniversite\s*öğrenci/i, // ~18-25
        /ilk\s*iş/i, // ~22-25
        /kariyer\s*değişim/i, // ~30+
        /emeklilik/i, // ~60+
        /kıdemli\s*pozisyon/i, // ~35+
        /orta\s*kariyer/i, // ~35-50
      ],
      es: [
        /(\d+)\s*años/i,
        /edad\s*(\d+)/i,
        /nacido\s*en\s*(\d{4})/i,
        /recién\s*graduado/i, // ~22-24
        /estudiante\s*universitario/i, // ~18-25
        /primer\s*trabajo/i, // ~22-25
        /cambio\s*de\s*carrera/i, // ~30+
        /jubilación/i, // ~60+
        /posición\s*senior/i, // ~35+
      ],
      ru: [
        /(\d+)\s*лет/i,
        /возраст\s*(\d+)/i,
        /родился\s*в\s*(\d{4})/i,
        /недавний\s*выпускник/i, // ~22-24
        /студент\s*университета/i, // ~18-25
        /первая\s*работа/i, // ~22-25
        /смена\s*карьеры/i, // ~30+
        /пенсия/i, // ~60+
        /старшая\s*позиция/i, // ~35+
      ]
    };
    
    const patterns = agePatterns[locale] || agePatterns.en;
    const clues: string[] = [];
    
    questions.forEach(question => {
      patterns.forEach(pattern => {
        const match = question.match(pattern);
        if (match) {
          clues.push(match[0]);
        }
      });
    });
    
    return clues;
  }
  
  /**
   * Meslek ipuçlarını çıkarır
   */
  private static extractProfessionClues(questions: string[], locale: Locale): string[] {
    const professionPatterns = {
      en: [
        /software\s*engineer/i,
        /developer/i,
        /programmer/i,
        /doctor/i,
        /teacher/i,
        /lawyer/i,
        /manager/i,
        /consultant/i,
        /designer/i,
        /analyst/i,
        /marketing/i,
        /sales/i,
        /finance/i,
        /accounting/i,
        /nurse/i,
        /engineer/i,
        /architect/i,
        /startup/i,
        /freelancer/i,
        /entrepreneur/i,
      ],
      tr: [
        /yazılım\s*mühendis/i,
        /geliştirici/i,
        /programcı/i,
        /doktor/i,
        /öğretmen/i,
        /avukat/i,
        /müdür/i,
        /danışman/i,
        /tasarımcı/i,
        /analist/i,
        /pazarlama/i,
        /satış/i,
        /finans/i,
        /muhasebe/i,
        /hemşire/i,
        /mühendis/i,
        /mimar/i,
        /girişim/i,
        /serbest\s*çalışan/i,
        /girişimci/i,
      ],
      es: [
        /ingeniero\s*de\s*software/i,
        /desarrollador/i,
        /programador/i,
        /médico/i,
        /profesor/i,
        /abogado/i,
        /gerente/i,
        /consultor/i,
        /diseñador/i,
        /analista/i,
        /marketing/i,
        /ventas/i,
        /finanzas/i,
        /contabilidad/i,
        /enfermero/i,
        /ingeniero/i,
        /arquitecto/i,
        /startup/i,
        /freelancer/i,
        /emprendedor/i,
      ],
      ru: [
        /программист/i,
        /разработчик/i,
        /врач/i,
        /учитель/i,
        /юрист/i,
        /менеджер/i,
        /консультант/i,
        /дизайнер/i,
        /аналитик/i,
        /маркетинг/i,
        /продажи/i,
        /финансы/i,
        /бухгалтерия/i,
        /медсестра/i,
        /инженер/i,
        /архитектор/i,
        /стартап/i,
        /фрилансер/i,
        /предприниматель/i,
      ]
    };
    
    const patterns = professionPatterns[locale] || professionPatterns.en;
    const clues: string[] = [];
    
    questions.forEach(question => {
      patterns.forEach(pattern => {
        const match = question.match(pattern);
        if (match) {
          clues.push(match[0]);
        }
      });
    });
    
    return clues;
  }
  
  /**
   * Yaşam evresi ipuçlarını çıkarır
   */
  private static extractLifeStageClues(questions: string[], locale: Locale): string[] {
    const lifeStagePatterns = {
      en: [
        /student/i,
        /college/i,
        /university/i,
        /graduate/i,
        /first\s*job/i,
        /entry\s*level/i,
        /junior/i,
        /senior/i,
        /manager/i,
        /director/i,
        /retirement/i,
        /pension/i,
        /career\s*change/i,
        /mid\s*career/i,
      ],
      tr: [
        /öğrenci/i,
        /üniversite/i,
        /mezun/i,
        /ilk\s*iş/i,
        /giriş\s*seviye/i,
        /junior/i,
        /senior/i,
        /müdür/i,
        /direktör/i,
        /emeklilik/i,
        /emekli\s*maaş/i,
        /kariyer\s*değişim/i,
        /orta\s*kariyer/i,
      ],
      es: [
        /estudiante/i,
        /universidad/i,
        /graduado/i,
        /primer\s*trabajo/i,
        /nivel\s*inicial/i,
        /junior/i,
        /senior/i,
        /gerente/i,
        /director/i,
        /jubilación/i,
        /pensión/i,
        /cambio\s*de\s*carrera/i,
        /carrera\s*media/i,
      ],
      ru: [
        /студент/i,
        /университет/i,
        /выпускник/i,
        /первая\s*работа/i,
        /начальный\s*уровень/i,
        /младший/i,
        /старший/i,
        /менеджер/i,
        /директор/i,
        /пенсия/i,
        /смена\s*карьеры/i,
        /средняя\s*карьера/i,
      ]
    };
    
    const patterns = lifeStagePatterns[locale] || lifeStagePatterns.en;
    const clues: string[] = [];
    
    questions.forEach(question => {
      patterns.forEach(pattern => {
        const match = question.match(pattern);
        if (match) {
          clues.push(match[0]);
        }
      });
    });
    
    return clues;
  }
  
  /**
   * Aile durumu ipuçlarını çıkarır
   */
  private static extractFamilyClues(questions: string[], locale: Locale): string[] {
    const familyPatterns = {
      en: [
        /married/i,
        /wife/i,
        /husband/i,
        /spouse/i,
        /partner/i,
        /children/i,
        /kids/i,
        /baby/i,
        /family/i,
        /single/i,
        /dating/i,
        /relationship/i,
        /parents/i,
        /mother/i,
        /father/i,
      ],
      tr: [
        /evli/i,
        /eş/i,
        /karı/i,
        /koca/i,
        /partner/i,
        /çocuk/i,
        /bebek/i,
        /aile/i,
        /bekar/i,
        /flört/i,
        /ilişki/i,
        /ebeveyn/i,
        /anne/i,
        /baba/i,
      ],
      es: [
        /casado/i,
        /esposa/i,
        /esposo/i,
        /pareja/i,
        /hijos/i,
        /niños/i,
        /bebé/i,
        /familia/i,
        /soltero/i,
        /citas/i,
        /relación/i,
        /padres/i,
        /madre/i,
        /padre/i,
      ],
      ru: [
        /женат/i,
        /замужем/i,
        /жена/i,
        /муж/i,
        /партнер/i,
        /дети/i,
        /ребенок/i,
        /семья/i,
        /холост/i,
        /свидания/i,
        /отношения/i,
        /родители/i,
        /мать/i,
        /отец/i,
      ]
    };
    
    const patterns = familyPatterns[locale] || familyPatterns.en;
    const clues: string[] = [];
    
    questions.forEach(question => {
      patterns.forEach(pattern => {
        const match = question.match(pattern);
        if (match) {
          clues.push(match[0]);
        }
      });
    });
    
    return clues;
  }
  
  /**
   * İlgi alanları ipuçlarını çıkarır
   */
  private static extractInterestClues(questions: string[], locale: Locale): string[] {
    const interestPatterns = {
      en: [
        /technology/i, /tech/i, /programming/i, /coding/i,
        /sports/i, /fitness/i, /gym/i, /running/i,
        /music/i, /art/i, /design/i, /creative/i,
        /travel/i, /traveling/i, /vacation/i,
        /reading/i, /books/i, /learning/i,
        /cooking/i, /food/i, /restaurant/i,
        /gaming/i, /games/i, /video games/i,
        /photography/i, /photo/i,
        /business/i, /entrepreneurship/i, /startup/i,
        /investment/i, /finance/i, /money/i,
      ],
      tr: [
        /teknoloji/i, /programlama/i, /kodlama/i,
        /spor/i, /fitness/i, /koşu/i, /egzersiz/i,
        /müzik/i, /sanat/i, /tasarım/i, /yaratıcı/i,
        /seyahat/i, /tatil/i, /gezi/i,
        /okuma/i, /kitap/i, /öğrenme/i,
        /yemek/i, /aşçılık/i, /restoran/i,
        /oyun/i, /video oyun/i, /gaming/i,
        /fotoğraf/i, /fotoğrafçılık/i,
        /iş/i, /girişimcilik/i, /startup/i,
        /yatırım/i, /finans/i, /para/i,
      ],
      es: [
        /tecnología/i, /programación/i, /codificación/i,
        /deportes/i, /fitness/i, /gimnasio/i, /correr/i,
        /música/i, /arte/i, /diseño/i, /creativo/i,
        /viajes/i, /viajar/i, /vacaciones/i,
        /lectura/i, /libros/i, /aprendizaje/i,
        /cocina/i, /comida/i, /restaurante/i,
        /juegos/i, /videojuegos/i, /gaming/i,
        /fotografía/i, /foto/i,
        /negocio/i, /emprendimiento/i, /startup/i,
        /inversión/i, /finanzas/i, /dinero/i,
      ],
      ru: [
        /технология/i, /программирование/i, /кодирование/i,
        /спорт/i, /фитнес/i, /тренажерный зал/i, /бег/i,
        /музыка/i, /искусство/i, /дизайн/i, /творческий/i,
        /путешествия/i, /отпуск/i, /поездки/i,
        /чтение/i, /книги/i, /обучение/i,
        /готовка/i, /еда/i, /ресторан/i,
        /игры/i, /видеоигры/i, /гейминг/i,
        /фотография/i, /фото/i,
        /бизнес/i, /предпринимательство/i, /стартап/i,
        /инвестиции/i, /финансы/i, /деньги/i,
      ]
    };
    
    const patterns = interestPatterns[locale] || interestPatterns.en;
    const clues: string[] = [];
    
    questions.forEach(question => {
      patterns.forEach(pattern => {
        const match = question.match(pattern);
        if (match) {
          clues.push(match[0]);
        }
      });
    });
    
    return Array.from(new Set(clues)); // Remove duplicates
  }
  
  /**
   * Risk toleransı ipuçlarını çıkarır
   */
  private static extractRiskToleranceClues(questions: string[], locale: Locale): string[] {
    const riskPatterns = {
      en: [
        /safe/i, /secure/i, /stable/i, /conservative/i, // Low risk
        /risky/i, /aggressive/i, /bold/i, /adventurous/i, // High risk
        /startup/i, /entrepreneur/i, /investment/i, // High risk
        /guaranteed/i, /certain/i, /sure/i, // Low risk
      ],
      tr: [
        /güvenli/i, /güvenilir/i, /istikrarlı/i, /muhafazakar/i, // Low risk
        /riskli/i, /agresif/i, /cesur/i, /maceracı/i, // High risk
        /girişim/i, /girişimci/i, /yatırım/i, // High risk
        /garantili/i, /kesin/i, /emin/i, // Low risk
      ],
      es: [
        /seguro/i, /estable/i, /conservador/i, // Low risk
        /arriesgado/i, /agresivo/i, /audaz/i, /aventurero/i, // High risk
        /startup/i, /emprendedor/i, /inversión/i, // High risk
        /garantizado/i, /cierto/i, /seguro/i, // Low risk
      ],
      ru: [
        /безопасный/i, /стабильный/i, /консервативный/i, // Low risk
        /рискованный/i, /агрессивный/i, /смелый/i, /авантюрный/i, // High risk
        /стартап/i, /предприниматель/i, /инвестиции/i, // High risk
        /гарантированный/i, /определенный/i, /уверенный/i, // Low risk
      ]
    };
    
    const patterns = riskPatterns[locale] || riskPatterns.en;
    const clues: string[] = [];
    
    questions.forEach(question => {
      patterns.forEach(pattern => {
        const match = question.match(pattern);
        if (match) {
          clues.push(match[0]);
        }
      });
    });
    
    return clues;
  }
  
  // Estimation methods
  private static estimateAge(clues: string[]): number {
    // Simple age estimation logic
    for (const clue of clues) {
      const ageMatch = clue.match(/(\d+)/);
      if (ageMatch) {
        return parseInt(ageMatch[1]);
      }
      
      // Context-based estimation
      if (/student|college|university/i.test(clue)) return 21;
      if (/graduate|first.*job/i.test(clue)) return 24;
      if (/senior|manager/i.test(clue)) return 35;
      if (/retirement/i.test(clue)) return 62;
    }
    return 28; // Default
  }
  
  private static estimateProfession(clues: string[]): string {
    // Return the most specific profession found
    const professionMap: Record<string, string> = {
      'software': 'Yazılım Mühendisi',
      'developer': 'Yazılım Geliştirici',
      'programmer': 'Programcı',
      'doctor': 'Doktor',
      'teacher': 'Öğretmen',
      'lawyer': 'Avukat',
      'manager': 'Müdür',
      'consultant': 'Danışman',
      'designer': 'Tasarımcı',
      'engineer': 'Mühendis',
    };
    
    for (const clue of clues) {
      for (const [key, value] of Object.entries(professionMap)) {
        if (clue.toLowerCase().includes(key)) {
          return value;
        }
      }
    }
    
    return clues[0] || 'Profesyonel';
  }
  
  private static estimateLifeStage(clues: string[]): 'student' | 'early_career' | 'mid_career' | 'senior' | 'retired' {
    for (const clue of clues) {
      if (/student|college|university/i.test(clue)) return 'student';
      if (/first.*job|entry|junior|graduate/i.test(clue)) return 'early_career';
      if (/senior|manager|director/i.test(clue)) return 'mid_career';
      if (/retirement|pension/i.test(clue)) return 'retired';
    }
    return 'early_career';
  }
  
  private static estimateFamilyStatus(clues: string[]): 'single' | 'relationship' | 'married' | 'parent' | 'caregiver' {
    for (const clue of clues) {
      if (/married|wife|husband|spouse/i.test(clue)) return 'married';
      if (/children|kids|baby|parent/i.test(clue)) return 'parent';
      if (/partner|relationship|dating/i.test(clue)) return 'relationship';
      if (/single/i.test(clue)) return 'single';
    }
    return 'single';
  }
  
  private static estimateRiskTolerance(clues: string[]): 'low' | 'medium' | 'high' {
    let riskScore = 0;
    
    for (const clue of clues) {
      if (/safe|secure|stable|conservative|guaranteed|certain/i.test(clue)) {
        riskScore -= 1;
      }
      if (/risky|aggressive|bold|adventurous|startup|entrepreneur/i.test(clue)) {
        riskScore += 1;
      }
    }
    
    if (riskScore <= -1) return 'low';
    if (riskScore >= 1) return 'high';
    return 'medium';
  }
  
  /**
   * Mevcut profili akıllı çıkarımlarla günceller
   */
  static updateProfileWithInferences(
    currentProfile: Partial<UserProfile>, 
    questions: string[], 
    locale: Locale
  ): Partial<UserProfile> {
    const inferences = this.inferProfileFromQuestions(questions, locale);
    
    // Sadece boş olan alanları doldur
    const updatedProfile = { ...currentProfile };
    
    Object.entries(inferences).forEach(([key, value]) => {
      if (value && !currentProfile[key as keyof UserProfile]) {
        (updatedProfile as any)[key] = value;
      }
    });
    
    return updatedProfile;
  }
} 