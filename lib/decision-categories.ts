import { DecisionCategory, DecisionCategoryInfo, Locale } from '@/types';

export const DECISION_CATEGORIES: DecisionCategoryInfo[] = [
  {
    key: 'career',
    name: {
      en: 'Career Decision',
      tr: 'Kariyer Kararı',
      es: 'Decisión de Carrera',
      ru: 'Карьерное Решение'
    },
    description: {
      en: 'Job changes, promotions, career transitions, professional development',
      tr: 'İş değişiklikleri, terfiler, kariyer geçişleri, mesleki gelişim',
      es: 'Cambios de trabajo, promociones, transiciones profesionales, desarrollo profesional',
      ru: 'Смена работы, продвижение по службе, карьерные переходы, профессиональное развитие'
    },
    keywords: {
      en: ['job', 'career', 'work', 'promotion', 'salary', 'boss', 'company', 'profession', 'employment', 'interview', 'resume', 'workplace', 'colleague', 'office', 'business', 'industry', 'skill', 'training', 'certification', 'freelance', 'remote work', 'startup', 'corporate', 'manager', 'leadership', 'team', 'project', 'deadline', 'performance', 'review', 'raise', 'bonus', 'benefits', 'vacation', 'sick leave', 'retirement', 'pension'],
      tr: ['iş', 'kariyer', 'çalışma', 'terfi', 'maaş', 'patron', 'şirket', 'meslek', 'istihdam', 'mülakat', 'özgeçmiş', 'işyeri', 'meslektaş', 'ofis', 'işletme', 'sektör', 'beceri', 'eğitim', 'sertifika', 'serbest çalışma', 'uzaktan çalışma', 'girişim', 'kurumsal', 'müdür', 'liderlik', 'takım', 'proje', 'son tarih', 'performans', 'değerlendirme', 'zam', 'ikramiye', 'yan haklar', 'tatil', 'hastalık izni', 'emeklilik', 'emekli maaşı'],
      es: ['trabajo', 'carrera', 'empleo', 'promoción', 'salario', 'jefe', 'empresa', 'profesión', 'empleo', 'entrevista', 'currículum', 'lugar de trabajo', 'colega', 'oficina', 'negocio', 'industria', 'habilidad', 'capacitación', 'certificación', 'freelance', 'trabajo remoto', 'startup', 'corporativo', 'gerente', 'liderazgo', 'equipo', 'proyecto', 'fecha límite', 'rendimiento', 'revisión', 'aumento', 'bono', 'beneficios', 'vacaciones', 'licencia por enfermedad', 'jubilación', 'pensión'],
      ru: ['работа', 'карьера', 'трудоустройство', 'продвижение', 'зарплата', 'начальник', 'компания', 'профессия', 'занятость', 'собеседование', 'резюме', 'рабочее место', 'коллега', 'офис', 'бизнес', 'индустрия', 'навык', 'обучение', 'сертификация', 'фриланс', 'удаленная работа', 'стартап', 'корпоративный', 'менеджер', 'лидерство', 'команда', 'проект', 'дедлайн', 'производительность', 'обзор', 'повышение', 'бонус', 'льготы', 'отпуск', 'больничный', 'пенсия', 'пенсионный']
    }
  },
  {
    key: 'relationship',
    name: {
      en: 'Relationship',
      tr: 'İlişki Kararı',
      es: 'Relación Personal',
      ru: 'Вопросы Отношений'
    },
    description: {
      en: 'Marriage, dating, breakups, family relationships, friendships',
      tr: 'Evlilik, flört, ayrılık, aile ilişkileri, arkadaşlıklar',
      es: 'Matrimonio, citas, rupturas, relaciones familiares, amistades',
      ru: 'Брак, свидания, расставания, семейные отношения, дружба'
    },
    keywords: {
      en: ['marriage', 'wedding', 'divorce', 'dating', 'relationship', 'love', 'partner', 'boyfriend', 'girlfriend', 'husband', 'wife', 'family', 'children', 'kids', 'parents', 'mother', 'father', 'sibling', 'brother', 'sister', 'friend', 'friendship', 'breakup', 'engagement', 'proposal', 'commitment', 'trust', 'communication', 'conflict', 'argument', 'intimacy', 'romance', 'affection', 'support', 'loyalty', 'jealousy', 'cheating', 'infidelity'],
      tr: ['evlilik', 'düğün', 'boşanma', 'flört', 'ilişki', 'aşk', 'partner', 'erkek arkadaş', 'kız arkadaş', 'koca', 'eş', 'aile', 'çocuklar', 'çocuk', 'ebeveynler', 'anne', 'baba', 'kardeş', 'erkek kardeş', 'kız kardeş', 'arkadaş', 'arkadaşlık', 'ayrılık', 'nişan', 'evlilik teklifi', 'bağlılık', 'güven', 'iletişim', 'çatışma', 'tartışma', 'yakınlık', 'romantizm', 'sevgi', 'destek', 'sadakat', 'kıskançlık', 'aldatma', 'sadakatsizlik'],
      es: ['matrimonio', 'boda', 'divorcio', 'citas', 'relación', 'amor', 'pareja', 'novio', 'novia', 'esposo', 'esposa', 'familia', 'niños', 'hijos', 'padres', 'madre', 'padre', 'hermano', 'hermana', 'amigo', 'amistad', 'ruptura', 'compromiso', 'propuesta', 'compromiso', 'confianza', 'comunicación', 'conflicto', 'discusión', 'intimidad', 'romance', 'afecto', 'apoyo', 'lealtad', 'celos', 'engaño', 'infidelidad'],
      ru: ['брак', 'свадьба', 'развод', 'свидания', 'отношения', 'любовь', 'партнер', 'парень', 'девушка', 'муж', 'жена', 'семья', 'дети', 'ребенок', 'родители', 'мать', 'отец', 'брат', 'сестра', 'друг', 'дружба', 'расставание', 'помолвка', 'предложение', 'обязательство', 'доверие', 'общение', 'конфликт', 'спор', 'близость', 'романтика', 'привязанность', 'поддержка', 'верность', 'ревность', 'измена', 'неверность']
    }
  },
  {
    key: 'relocation',
    name: {
      en: 'Moving / Relocation',
      tr: 'Taşınma / Göç Kararı',
      es: 'Mudanza / Relocalización',
      ru: 'Переезд / Миграция'
    },
    description: {
      en: 'Moving to new city, country, immigration, housing decisions',
      tr: 'Yeni şehir, ülke taşınması, göç, konut kararları',
      es: 'Mudanza a nueva ciudad, país, inmigración, decisiones de vivienda',
      ru: 'Переезд в новый город, страну, иммиграция, жилищные решения'
    },
    keywords: {
      en: ['move', 'moving', 'relocation', 'relocate', 'immigration', 'emigration', 'visa', 'passport', 'city', 'country', 'house', 'apartment', 'rent', 'buy', 'mortgage', 'neighborhood', 'community', 'school district', 'commute', 'transportation', 'cost of living', 'culture', 'language', 'climate', 'weather', 'distance', 'family', 'friends', 'job market', 'opportunities', 'lifestyle', 'safety', 'crime', 'healthcare', 'education', 'taxes'],
      tr: ['taşınma', 'taşınmak', 'yer değiştirme', 'göç', 'göç etmek', 'vize', 'pasaport', 'şehir', 'ülke', 'ev', 'daire', 'kira', 'satın alma', 'ipotek', 'mahalle', 'topluluk', 'okul bölgesi', 'işe gidiş', 'ulaşım', 'yaşam maliyeti', 'kültür', 'dil', 'iklim', 'hava durumu', 'mesafe', 'aile', 'arkadaşlar', 'iş piyasası', 'fırsatlar', 'yaşam tarzı', 'güvenlik', 'suç', 'sağlık hizmetleri', 'eğitim', 'vergiler'],
      es: ['mudanza', 'mudarse', 'reubicación', 'reubicar', 'inmigración', 'emigración', 'visa', 'pasaporte', 'ciudad', 'país', 'casa', 'apartamento', 'alquiler', 'comprar', 'hipoteca', 'vecindario', 'comunidad', 'distrito escolar', 'viaje al trabajo', 'transporte', 'costo de vida', 'cultura', 'idioma', 'clima', 'tiempo', 'distancia', 'familia', 'amigos', 'mercado laboral', 'oportunidades', 'estilo de vida', 'seguridad', 'crimen', 'atención médica', 'educación', 'impuestos'],
      ru: ['переезд', 'переезжать', 'перемещение', 'иммиграция', 'эмиграция', 'виза', 'паспорт', 'город', 'страна', 'дом', 'квартира', 'аренда', 'покупка', 'ипотека', 'район', 'сообщество', 'школьный округ', 'дорога на работу', 'транспорт', 'стоимость жизни', 'культура', 'язык', 'климат', 'погода', 'расстояние', 'семья', 'друзья', 'рынок труда', 'возможности', 'образ жизни', 'безопасность', 'преступность', 'здравоохранение', 'образование', 'налоги']
    }
  },
  {
    key: 'education',
    name: {
      en: 'Education',
      tr: 'Eğitim / Üniversite Seçimi',
      es: 'Educación',
      ru: 'Образование'
    },
    description: {
      en: 'University choice, degree programs, courses, academic decisions',
      tr: 'Üniversite seçimi, lisans programları, kurslar, akademik kararlar',
      es: 'Elección universitaria, programas de grado, cursos, decisiones académicas',
      ru: 'Выбор университета, программы обучения, курсы, академические решения'
    },
    keywords: {
      en: ['university', 'college', 'school', 'education', 'degree', 'bachelor', 'master', 'phd', 'doctorate', 'course', 'class', 'major', 'minor', 'program', 'curriculum', 'tuition', 'scholarship', 'loan', 'student', 'professor', 'teacher', 'grade', 'exam', 'test', 'study', 'research', 'thesis', 'dissertation', 'graduation', 'diploma', 'certificate', 'online learning', 'distance education', 'campus', 'dormitory', 'library', 'laboratory'],
      tr: ['üniversite', 'kolej', 'okul', 'eğitim', 'derece', 'lisans', 'yüksek lisans', 'doktora', 'ders', 'sınıf', 'ana dal', 'yan dal', 'program', 'müfredat', 'öğrenim ücreti', 'burs', 'kredi', 'öğrenci', 'profesör', 'öğretmen', 'not', 'sınav', 'test', 'çalışma', 'araştırma', 'tez', 'mezuniyet', 'diploma', 'sertifika', 'çevrimiçi öğrenme', 'uzaktan eğitim', 'kampüs', 'yurt', 'kütüphane', 'laboratuvar'],
      es: ['universidad', 'colegio', 'escuela', 'educación', 'grado', 'licenciatura', 'maestría', 'doctorado', 'curso', 'clase', 'especialidad', 'programa', 'currículo', 'matrícula', 'beca', 'préstamo', 'estudiante', 'profesor', 'maestro', 'calificación', 'examen', 'prueba', 'estudio', 'investigación', 'tesis', 'graduación', 'diploma', 'certificado', 'aprendizaje en línea', 'educación a distancia', 'campus', 'dormitorio', 'biblioteca', 'laboratorio'],
      ru: ['университет', 'колледж', 'школа', 'образование', 'степень', 'бакалавр', 'магистр', 'докторантура', 'курс', 'класс', 'специальность', 'программа', 'учебный план', 'плата за обучение', 'стипендия', 'кредит', 'студент', 'профессор', 'учитель', 'оценка', 'экзамен', 'тест', 'учеба', 'исследование', 'диссертация', 'выпуск', 'диплом', 'сертификат', 'онлайн обучение', 'дистанционное образование', 'кампус', 'общежитие', 'библиотека', 'лаборатория']
    }
  },
  {
    key: 'entrepreneurship',
    name: {
      en: 'Entrepreneurship',
      tr: 'Girişimcilik Kararı',
      es: 'Emprendimiento',
      ru: 'Предпринимательство'
    },
    description: {
      en: 'Starting business, startup decisions, business partnerships',
      tr: 'İş kurma, girişim kararları, iş ortaklıkları',
      es: 'Iniciar negocio, decisiones de startup, asociaciones comerciales',
      ru: 'Начало бизнеса, решения стартапа, деловые партнерства'
    },
    keywords: {
      en: ['business', 'startup', 'entrepreneur', 'company', 'venture', 'investment', 'funding', 'capital', 'investor', 'partnership', 'co-founder', 'product', 'service', 'market', 'customer', 'client', 'revenue', 'profit', 'loss', 'risk', 'competition', 'competitor', 'strategy', 'plan', 'business plan', 'marketing', 'sales', 'growth', 'scale', 'expansion', 'innovation', 'technology', 'patent', 'trademark', 'license', 'legal', 'contract', 'agreement'],
      tr: ['işletme', 'girişim', 'girişimci', 'şirket', 'yatırım', 'finansman', 'sermaye', 'yatırımcı', 'ortaklık', 'kurucu ortak', 'ürün', 'hizmet', 'pazar', 'müşteri', 'gelir', 'kar', 'zarar', 'risk', 'rekabet', 'rakip', 'strateji', 'plan', 'iş planı', 'pazarlama', 'satış', 'büyüme', 'ölçeklendirme', 'genişleme', 'inovasyon', 'teknoloji', 'patent', 'marka', 'lisans', 'hukuki', 'sözleşme', 'anlaşma'],
      es: ['negocio', 'startup', 'emprendedor', 'empresa', 'inversión', 'financiamiento', 'capital', 'inversionista', 'sociedad', 'cofundador', 'producto', 'servicio', 'mercado', 'cliente', 'ingresos', 'ganancia', 'pérdida', 'riesgo', 'competencia', 'competidor', 'estrategia', 'plan', 'plan de negocios', 'marketing', 'ventas', 'crecimiento', 'escala', 'expansión', 'innovación', 'tecnología', 'patente', 'marca', 'licencia', 'legal', 'contrato', 'acuerdo'],
      ru: ['бизнес', 'стартап', 'предприниматель', 'компания', 'инвестиции', 'финансирование', 'капитал', 'инвестор', 'партнерство', 'соучредитель', 'продукт', 'услуга', 'рынок', 'клиент', 'доход', 'прибыль', 'убыток', 'риск', 'конкуренция', 'конкурент', 'стратегия', 'план', 'бизнес-план', 'маркетинг', 'продажи', 'рост', 'масштаб', 'расширение', 'инновации', 'технология', 'патент', 'торговая марка', 'лицензия', 'правовой', 'контракт', 'соглашение']
    }
  },
  {
    key: 'investment',
    name: {
      en: 'Financial Investment',
      tr: 'Yatırım Kararı',
      es: 'Inversión Financiera',
      ru: 'Финансовые Инвестиции'
    },
    description: {
      en: 'Stock market, real estate, savings, financial planning',
      tr: 'Borsa, emlak, tasarruf, finansal planlama',
      es: 'Mercado de valores, bienes raíces, ahorros, planificación financiera',
      ru: 'Фондовый рынок, недвижимость, сбережения, финансовое планирование'
    },
    keywords: {
      en: ['investment', 'money', 'finance', 'stock', 'bond', 'mutual fund', 'etf', 'portfolio', 'diversification', 'risk', 'return', 'profit', 'loss', 'savings', 'retirement', 'pension', 'real estate', 'property', 'house', 'apartment', 'mortgage', 'loan', 'credit', 'debt', 'bank', 'interest', 'dividend', 'capital gains', 'tax', 'financial advisor', 'broker', 'trading', 'market', 'economy', 'inflation', 'recession'],
      tr: ['yatırım', 'para', 'finans', 'hisse senedi', 'tahvil', 'yatırım fonu', 'portföy', 'çeşitlendirme', 'risk', 'getiri', 'kar', 'zarar', 'tasarruf', 'emeklilik', 'emekli maaşı', 'emlak', 'mülk', 'ev', 'daire', 'ipotek', 'kredi', 'borç', 'banka', 'faiz', 'temettü', 'sermaye kazancı', 'vergi', 'finansal danışman', 'broker', 'ticaret', 'pazar', 'ekonomi', 'enflasyon', 'durgunluk'],
      es: ['inversión', 'dinero', 'finanzas', 'acción', 'bono', 'fondo mutuo', 'cartera', 'diversificación', 'riesgo', 'retorno', 'ganancia', 'pérdida', 'ahorros', 'jubilación', 'pensión', 'bienes raíces', 'propiedad', 'casa', 'apartamento', 'hipoteca', 'préstamo', 'crédito', 'deuda', 'banco', 'interés', 'dividendo', 'ganancias de capital', 'impuesto', 'asesor financiero', 'corredor', 'comercio', 'mercado', 'economía', 'inflación', 'recesión'],
      ru: ['инвестиции', 'деньги', 'финансы', 'акция', 'облигация', 'взаимный фонд', 'портфель', 'диверсификация', 'риск', 'доходность', 'прибыль', 'убыток', 'сбережения', 'пенсия', 'недвижимость', 'собственность', 'дом', 'квартира', 'ипотека', 'кредит', 'долг', 'банк', 'процент', 'дивиденд', 'прирост капитала', 'налог', 'финансовый консультант', 'брокер', 'торговля', 'рынок', 'экономика', 'инфляция', 'рецессия']
    }
  },
  {
    key: 'family',
    name: {
      en: 'Family Decision',
      tr: 'Aileyle İlgili Karar',
      es: 'Decisión Familiar',
      ru: 'Семейное Решение'
    },
    description: {
      en: 'Having children, parenting, family planning, eldercare',
      tr: 'Çocuk sahibi olma, ebeveynlik, aile planlaması, yaşlı bakımı',
      es: 'Tener hijos, crianza, planificación familiar, cuidado de ancianos',
      ru: 'Рождение детей, воспитание, планирование семьи, уход за пожилыми'
    },
    keywords: {
      en: ['family', 'children', 'kids', 'baby', 'pregnancy', 'parenting', 'mother', 'father', 'parent', 'child', 'son', 'daughter', 'adoption', 'fertility', 'childcare', 'daycare', 'school', 'education', 'discipline', 'behavior', 'development', 'growth', 'health', 'medical', 'doctor', 'pediatrician', 'elderly', 'aging', 'care', 'nursing home', 'assisted living', 'inheritance', 'will', 'estate', 'guardian', 'custody'],
      tr: ['aile', 'çocuklar', 'çocuk', 'bebek', 'hamilelik', 'ebeveynlik', 'anne', 'baba', 'ebeveyn', 'oğul', 'kız', 'evlat edinme', 'doğurganlık', 'çocuk bakımı', 'kreş', 'okul', 'eğitim', 'disiplin', 'davranış', 'gelişim', 'büyüme', 'sağlık', 'tıbbi', 'doktor', 'çocuk doktoru', 'yaşlı', 'yaşlanma', 'bakım', 'huzurevi', 'destekli yaşam', 'miras', 'vasiyet', 'emlak', 'vasi', 'velayet'],
      es: ['familia', 'niños', 'hijos', 'bebé', 'embarazo', 'crianza', 'madre', 'padre', 'hijo', 'hija', 'adopción', 'fertilidad', 'cuidado infantil', 'guardería', 'escuela', 'educación', 'disciplina', 'comportamiento', 'desarrollo', 'crecimiento', 'salud', 'médico', 'doctor', 'pediatra', 'anciano', 'envejecimiento', 'cuidado', 'hogar de ancianos', 'vida asistida', 'herencia', 'testamento', 'patrimonio', 'tutor', 'custodia'],
      ru: ['семья', 'дети', 'ребенок', 'младенец', 'беременность', 'воспитание', 'мать', 'отец', 'родитель', 'сын', 'дочь', 'усыновление', 'фертильность', 'уход за детьми', 'детский сад', 'школа', 'образование', 'дисциплина', 'поведение', 'развитие', 'рост', 'здоровье', 'медицинский', 'врач', 'педиатр', 'пожилой', 'старение', 'уход', 'дом престарелых', 'дом с уходом', 'наследство', 'завещание', 'имущество', 'опекун', 'опека']
    }
  },
  {
    key: 'personal_growth',
    name: {
      en: 'Personal Growth',
      tr: 'Kişisel Gelişim Kararı',
      es: 'Crecimiento Personal',
      ru: 'Личностный Рост'
    },
    description: {
      en: 'Self-improvement, habits, therapy, personal development',
      tr: 'Kendini geliştirme, alışkanlıklar, terapi, kişisel gelişim',
      es: 'Automejora, hábitos, terapia, desarrollo personal',
      ru: 'Самосовершенствование, привычки, терапия, личностное развитие'
    },
    keywords: {
      en: ['personal growth', 'self improvement', 'development', 'therapy', 'counseling', 'psychology', 'mental health', 'mindfulness', 'meditation', 'spirituality', 'religion', 'faith', 'belief', 'values', 'goals', 'habits', 'routine', 'discipline', 'motivation', 'inspiration', 'confidence', 'self esteem', 'anxiety', 'depression', 'stress', 'wellness', 'fitness', 'exercise', 'diet', 'nutrition', 'sleep', 'rest', 'recovery', 'healing', 'transformation', 'change', 'growth'],
      tr: ['kişisel gelişim', 'kendini geliştirme', 'gelişim', 'terapi', 'danışmanlık', 'psikoloji', 'ruh sağlığı', 'farkındalık', 'meditasyon', 'maneviyat', 'din', 'inanç', 'değerler', 'hedefler', 'alışkanlıklar', 'rutin', 'disiplin', 'motivasyon', 'ilham', 'güven', 'öz saygı', 'kaygı', 'depresyon', 'stres', 'sağlık', 'fitness', 'egzersiz', 'diyet', 'beslenme', 'uyku', 'dinlenme', 'iyileşme', 'şifa', 'dönüşüm', 'değişim', 'büyüme'],
      es: ['crecimiento personal', 'automejora', 'desarrollo', 'terapia', 'consejería', 'psicología', 'salud mental', 'atención plena', 'meditación', 'espiritualidad', 'religión', 'fe', 'creencia', 'valores', 'metas', 'hábitos', 'rutina', 'disciplina', 'motivación', 'inspiración', 'confianza', 'autoestima', 'ansiedad', 'depresión', 'estrés', 'bienestar', 'fitness', 'ejercicio', 'dieta', 'nutrición', 'sueño', 'descanso', 'recuperación', 'sanación', 'transformación', 'cambio', 'crecimiento'],
      ru: ['личностный рост', 'самосовершенствование', 'развитие', 'терапия', 'консультирование', 'психология', 'психическое здоровье', 'осознанность', 'медитация', 'духовность', 'религия', 'вера', 'убеждения', 'ценности', 'цели', 'привычки', 'рутина', 'дисциплина', 'мотивация', 'вдохновение', 'уверенность', 'самооценка', 'тревога', 'депрессия', 'стресс', 'благополучие', 'фитнес', 'упражнения', 'диета', 'питание', 'сон', 'отдых', 'восстановление', 'исцеление', 'трансформация', 'изменение', 'рост']
    }
  },
  {
    key: 'lifestyle_health',
    name: {
      en: 'Lifestyle / Health',
      tr: 'Sağlık ve Yaşam Tarzı',
      es: 'Estilo de Vida / Salud',
      ru: 'Образ Жизни и Здоровье'
    },
    description: {
      en: 'Health decisions, lifestyle changes, medical treatments',
      tr: 'Sağlık kararları, yaşam tarzı değişiklikleri, tıbbi tedaviler',
      es: 'Decisiones de salud, cambios de estilo de vida, tratamientos médicos',
      ru: 'Решения о здоровье, изменения образа жизни, медицинские процедуры'
    },
    keywords: {
      en: ['health', 'medical', 'doctor', 'hospital', 'treatment', 'surgery', 'medication', 'medicine', 'therapy', 'diagnosis', 'symptoms', 'illness', 'disease', 'condition', 'chronic', 'acute', 'prevention', 'screening', 'checkup', 'lifestyle', 'diet', 'nutrition', 'exercise', 'fitness', 'weight', 'obesity', 'smoking', 'drinking', 'alcohol', 'addiction', 'recovery', 'mental health', 'stress', 'anxiety', 'depression', 'sleep', 'insomnia', 'gym', 'yoga', 'pilates', 'workout', 'training', 'sport', 'sports', 'running', 'jogging', 'swimming', 'cycling', 'weightlifting', 'cardio', 'strength', 'flexibility', 'wellness', 'physical activity'],
      tr: ['sağlık', 'tıbbi', 'doktor', 'hastane', 'tedavi', 'ameliyat', 'ilaç', 'tıp', 'terapi', 'teşhis', 'semptomlar', 'hastalık', 'durum', 'kronik', 'akut', 'önleme', 'tarama', 'kontrol', 'yaşam tarzı', 'diyet', 'beslenme', 'egzersiz', 'fitness', 'kilo', 'obezite', 'sigara', 'içme', 'alkol', 'bağımlılık', 'iyileşme', 'ruh sağlığı', 'stres', 'kaygı', 'depresyon', 'uyku', 'uykusuzluk', 'spor salonu', 'yoga', 'pilates', 'antrenman', 'egzersiz', 'spor', 'koşu', 'yüzme', 'bisiklet', 'ağırlık kaldırma', 'kardiyovasküler', 'güç', 'esneklik', 'sağlıklı yaşam', 'fiziksel aktivite'],
      es: ['salud', 'médico', 'doctor', 'hospital', 'tratamiento', 'cirugía', 'medicamento', 'medicina', 'terapia', 'diagnóstico', 'síntomas', 'enfermedad', 'condición', 'crónico', 'agudo', 'prevención', 'detección', 'chequeo', 'estilo de vida', 'dieta', 'nutrición', 'ejercicio', 'fitness', 'peso', 'obesidad', 'fumar', 'beber', 'alcohol', 'adicción', 'recuperación', 'salud mental', 'estrés', 'ansiedad', 'depresión', 'sueño', 'insomnio', 'gimnasio', 'yoga', 'pilates', 'entrenamiento', 'ejercicio', 'deporte', 'deportes', 'correr', 'natación', 'ciclismo', 'levantamiento de pesas', 'cardio', 'fuerza', 'flexibilidad', 'bienestar', 'actividad física'],
      ru: ['здоровье', 'медицинский', 'врач', 'больница', 'лечение', 'операция', 'лекарство', 'медицина', 'терапия', 'диагноз', 'симптомы', 'болезнь', 'состояние', 'хронический', 'острый', 'профилактика', 'скрининг', 'осмотр', 'образ жизни', 'диета', 'питание', 'упражнения', 'фитнес', 'вес', 'ожирение', 'курение', 'питье', 'алкоголь', 'зависимость', 'выздоровление', 'психическое здоровье', 'стресс', 'тревога', 'депрессия', 'сон', 'бессонница', 'спортзал', 'спорт зал', 'йога', 'пилатес', 'тренировка', 'упражнения', 'спорт', 'бег', 'плавание', 'велосипед', 'тяжелая атлетика', 'кардио', 'сила', 'гибкость', 'благополучие', 'физическая активность']
    }
  },
  {
    key: 'travel',
    name: {
      en: 'Travel',
      tr: 'Seyahat Kararı',
      es: 'Viaje',
      ru: 'Путешествия'
    },
    description: {
      en: 'Vacation planning, travel destinations, trip decisions',
      tr: 'Tatil planlaması, seyahat destinasyonları, gezi kararları',
      es: 'Planificación de vacaciones, destinos de viaje, decisiones de viaje',
      ru: 'Планирование отпуска, направления путешествий, решения о поездках'
    },
    keywords: {
      en: ['travel', 'trip', 'vacation', 'holiday', 'destination', 'flight', 'hotel', 'accommodation', 'booking', 'reservation', 'passport', 'visa', 'tourism', 'tourist', 'sightseeing', 'adventure', 'backpacking', 'cruise', 'resort', 'beach', 'mountain', 'city', 'country', 'culture', 'language', 'food', 'restaurant', 'budget', 'cost', 'expense', 'itinerary', 'schedule', 'plan', 'guide', 'tour', 'group', 'solo', 'family', 'friends'],
      tr: ['seyahat', 'gezi', 'tatil', 'destinasyon', 'uçuş', 'otel', 'konaklama', 'rezervasyon', 'pasaport', 'vize', 'turizm', 'turist', 'gezi', 'macera', 'sırt çantalı', 'kruvaziyer', 'tatil köyü', 'plaj', 'dağ', 'şehir', 'ülke', 'kültür', 'dil', 'yemek', 'restoran', 'bütçe', 'maliyet', 'gider', 'güzergah', 'program', 'plan', 'rehber', 'tur', 'grup', 'tek başına', 'aile', 'arkadaşlar'],
      es: ['viaje', 'vacaciones', 'destino', 'vuelo', 'hotel', 'alojamiento', 'reserva', 'pasaporte', 'visa', 'turismo', 'turista', 'turismo', 'aventura', 'mochilero', 'crucero', 'resort', 'playa', 'montaña', 'ciudad', 'país', 'cultura', 'idioma', 'comida', 'restaurante', 'presupuesto', 'costo', 'gasto', 'itinerario', 'horario', 'plan', 'guía', 'tour', 'grupo', 'solo', 'familia', 'amigos'],
      ru: ['путешествие', 'поездка', 'отпуск', 'каникулы', 'направление', 'рейс', 'отель', 'размещение', 'бронирование', 'паспорт', 'виза', 'туризм', 'турист', 'осмотр достопримечательностей', 'приключение', 'рюкзак', 'круиз', 'курорт', 'пляж', 'гора', 'город', 'страна', 'культура', 'язык', 'еда', 'ресторан', 'бюджет', 'стоимость', 'расход', 'маршрут', 'расписание', 'план', 'гид', 'тур', 'группа', 'один', 'семья', 'друзья']
    }
  },
  {
    key: 'work_life_balance',
    name: {
      en: 'Work-Life Balance',
      tr: 'İş-yaşam dengesi',
      es: 'Equilibrio vida-trabajo',
      ru: 'Баланс работы и жизни'
    },
    description: {
      en: 'Balancing professional and personal life, time management, stress reduction',
      tr: 'Mesleki ve kişisel yaşam dengesini kurma, zaman yönetimi, stres azaltma',
      es: 'Equilibrar la vida profesional y personal, gestión del tiempo, reducción del estrés',
      ru: 'Баланс между профессиональной и личной жизнью, управление временем, снижение стресса'
    },
    keywords: {
      en: ['work life balance', 'work-life', 'balance', 'time management', 'stress', 'burnout', 'overtime', 'workload', 'flexibility', 'remote work', 'schedule', 'priorities', 'boundaries', 'personal time', 'family time', 'leisure', 'vacation', 'break', 'rest', 'wellness', 'productivity', 'efficiency', 'delegation', 'saying no', 'self care'],
      tr: ['iş yaşam dengesi', 'iş-yaşam', 'denge', 'zaman yönetimi', 'stres', 'tükenmişlik', 'fazla mesai', 'iş yükü', 'esneklik', 'uzaktan çalışma', 'program', 'öncelikler', 'sınırlar', 'kişisel zaman', 'aile zamanı', 'boş zaman', 'tatil', 'mola', 'dinlenme', 'sağlık', 'verimlilik', 'etkinlik', 'yetki devri', 'hayır deme', 'öz bakım'],
      es: ['equilibrio vida trabajo', 'vida-trabajo', 'equilibrio', 'gestión del tiempo', 'estrés', 'agotamiento', 'horas extras', 'carga de trabajo', 'flexibilidad', 'trabajo remoto', 'horario', 'prioridades', 'límites', 'tiempo personal', 'tiempo familiar', 'ocio', 'vacaciones', 'descanso', 'bienestar', 'productividad', 'eficiencia', 'delegación', 'decir no', 'autocuidado'],
      ru: ['баланс работы и жизни', 'работа-жизнь', 'баланс', 'управление временем', 'стресс', 'выгорание', 'сверхурочные', 'рабочая нагрузка', 'гибкость', 'удаленная работа', 'расписание', 'приоритеты', 'границы', 'личное время', 'семейное время', 'досуг', 'отпуск', 'перерыв', 'отдых', 'благополучие', 'продуктивность', 'эффективность', 'делегирование', 'говорить нет', 'забота о себе']
    }
  },
  {
    key: 'social_circle',
    name: {
      en: 'Social Circle',
      tr: 'Sosyal çevre değişikliği',
      es: 'Círculo social',
      ru: 'Социальное окружение'
    },
    description: {
      en: 'Changing social environment, making new friends, social connections',
      tr: 'Sosyal çevreyi değiştirme, yeni arkadaşlıklar kurma, sosyal bağlantılar',
      es: 'Cambiar el entorno social, hacer nuevos amigos, conexiones sociales',
      ru: 'Изменение социального окружения, новые знакомства, социальные связи'
    },
    keywords: {
      en: ['social circle', 'friends', 'friendship', 'social life', 'networking', 'community', 'social group', 'peer group', 'social connections', 'social activities', 'meetup', 'club', 'organization', 'social skills', 'introvert', 'extrovert', 'social anxiety', 'loneliness', 'isolation', 'social support', 'social events', 'party', 'gathering', 'social media', 'online friends'],
      tr: ['sosyal çevre', 'arkadaşlar', 'arkadaşlık', 'sosyal yaşam', 'ağ kurma', 'topluluk', 'sosyal grup', 'akran grubu', 'sosyal bağlantılar', 'sosyal aktiviteler', 'buluşma', 'kulüp', 'organizasyon', 'sosyal beceriler', 'içe dönük', 'dışa dönük', 'sosyal kaygı', 'yalnızlık', 'izolasyon', 'sosyal destek', 'sosyal etkinlikler', 'parti', 'toplantı', 'sosyal medya', 'çevrimiçi arkadaşlar'],
      es: ['círculo social', 'amigos', 'amistad', 'vida social', 'networking', 'comunidad', 'grupo social', 'grupo de pares', 'conexiones sociales', 'actividades sociales', 'encuentro', 'club', 'organización', 'habilidades sociales', 'introvertido', 'extrovertido', 'ansiedad social', 'soledad', 'aislamiento', 'apoyo social', 'eventos sociales', 'fiesta', 'reunión', 'redes sociales', 'amigos en línea'],
      ru: ['социальный круг', 'друзья', 'дружба', 'социальная жизнь', 'нетворкинг', 'сообщество', 'социальная группа', 'группа сверстников', 'социальные связи', 'социальные активности', 'встреча', 'клуб', 'организация', 'социальные навыки', 'интроверт', 'экстраверт', 'социальная тревога', 'одиночество', 'изоляция', 'социальная поддержка', 'социальные события', 'вечеринка', 'собрание', 'социальные сети', 'онлайн друзья']
    }
  },
  {
    key: 'retirement_planning',
    name: {
      en: 'Retirement Planning',
      tr: 'Emeklilik planlaması',
      es: 'Planificación de jubilación',
      ru: 'Планирование пенсии'
    },
    description: {
      en: 'Retirement savings, pension planning, post-career life decisions',
      tr: 'Emeklilik tasarrufları, emekli maaşı planlaması, kariyer sonrası yaşam kararları',
      es: 'Ahorros para la jubilación, planificación de pensiones, decisiones de vida post-carrera',
      ru: 'Пенсионные накопления, планирование пенсии, решения о жизни после карьеры'
    },
    keywords: {
      en: ['retirement', 'pension', 'retirement planning', 'retirement savings', '401k', 'IRA', 'social security', 'retirement age', 'early retirement', 'financial independence', 'FIRE', 'retirement fund', 'annuity', 'retirement income', 'post-career', 'senior living', 'retirement community', 'healthcare costs', 'long-term care', 'estate planning', 'will', 'inheritance', 'legacy'],
      tr: ['emeklilik', 'emekli maaşı', 'emeklilik planlaması', 'emeklilik tasarrufları', 'bireysel emeklilik', 'sosyal güvenlik', 'emeklilik yaşı', 'erken emeklilik', 'finansal bağımsızlık', 'emeklilik fonu', 'gelir sigortası', 'emeklilik geliri', 'kariyer sonrası', 'yaşlı yaşamı', 'emeklilik topluluğu', 'sağlık maliyetleri', 'uzun süreli bakım', 'emlak planlaması', 'vasiyet', 'miras', 'miras bırakma'],
      es: ['jubilación', 'pensión', 'planificación de jubilación', 'ahorros de jubilación', 'plan de pensiones', 'seguridad social', 'edad de jubilación', 'jubilación anticipada', 'independencia financiera', 'fondo de jubilación', 'anualidad', 'ingresos de jubilación', 'post-carrera', 'vida de adulto mayor', 'comunidad de jubilados', 'costos de atención médica', 'cuidado a largo plazo', 'planificación patrimonial', 'testamento', 'herencia', 'legado'],
      ru: ['пенсия', 'пенсионное планирование', 'пенсионные накопления', 'пенсионный фонд', 'социальное обеспечение', 'пенсионный возраст', 'досрочная пенсия', 'финансовая независимость', 'пенсионный доход', 'жизнь после карьеры', 'жизнь пожилых', 'пенсионное сообщество', 'медицинские расходы', 'долгосрочный уход', 'планирование наследства', 'завещание', 'наследство', 'наследие']
    }
  },
  {
    key: 'parenting',
    name: {
      en: 'Parenting',
      tr: 'Ebeveynlik / çocuk yetiştirme',
      es: 'Crianza de hijos',
      ru: 'Родительство'
    },
    description: {
      en: 'Child-rearing decisions, parenting styles, education choices for children',
      tr: 'Çocuk yetiştirme kararları, ebeveynlik tarzları, çocuklar için eğitim seçimleri',
      es: 'Decisiones de crianza, estilos de crianza, opciones educativas para niños',
      ru: 'Решения по воспитанию детей, стили воспитания, образовательный выбор для детей'
    },
    keywords: {
      en: ['parenting', 'child rearing', 'parenting style', 'discipline', 'child development', 'school choice', 'education', 'daycare', 'babysitter', 'nanny', 'childcare', 'extracurricular', 'activities', 'screen time', 'bedtime', 'nutrition', 'pediatrician', 'vaccination', 'safety', 'child behavior', 'tantrums', 'potty training', 'breastfeeding', 'formula', 'sleep training'],
      tr: ['ebeveynlik', 'çocuk yetiştirme', 'ebeveynlik tarzı', 'disiplin', 'çocuk gelişimi', 'okul seçimi', 'eğitim', 'kreş', 'bebek bakıcısı', 'dadı', 'çocuk bakımı', 'ders dışı', 'aktiviteler', 'ekran süresi', 'yatma saati', 'beslenme', 'çocuk doktoru', 'aşı', 'güvenlik', 'çocuk davranışı', 'öfke nöbetleri', 'tuvalet eğitimi', 'emzirme', 'mama', 'uyku eğitimi'],
      es: ['crianza', 'crianza de niños', 'estilo de crianza', 'disciplina', 'desarrollo infantil', 'elección de escuela', 'educación', 'guardería', 'niñera', 'cuidado infantil', 'extracurricular', 'actividades', 'tiempo de pantalla', 'hora de dormir', 'nutrición', 'pediatra', 'vacunación', 'seguridad', 'comportamiento infantil', 'berrinches', 'entrenamiento para ir al baño', 'lactancia', 'fórmula', 'entrenamiento del sueño'],
      ru: ['воспитание', 'воспитание детей', 'стиль воспитания', 'дисциплина', 'развитие ребенка', 'выбор школы', 'образование', 'детский сад', 'няня', 'уход за детьми', 'внеклассные', 'активности', 'экранное время', 'время сна', 'питание', 'педиатр', 'вакцинация', 'безопасность', 'поведение ребенка', 'истерики', 'приучение к горшку', 'грудное вскармливание', 'смесь', 'обучение сну']
    }
  },
  {
    key: 'technology_adoption',
    name: {
      en: 'Technology Adoption',
      tr: 'Yeni teknoloji/araçlara geçiş',
      es: 'Adopción tecnológica',
      ru: 'Принятие технологий'
    },
    description: {
      en: 'Adopting new technologies, digital transformation, tech upgrades',
      tr: 'Yeni teknolojileri benimseme, dijital dönüşüm, teknoloji yükseltmeleri',
      es: 'Adoptar nuevas tecnologías, transformación digital, actualizaciones tecnológicas',
      ru: 'Принятие новых технологий, цифровая трансформация, технологические обновления'
    },
    keywords: {
      en: ['technology', 'tech adoption', 'digital transformation', 'software', 'hardware', 'upgrade', 'new technology', 'innovation', 'automation', 'AI', 'artificial intelligence', 'cloud computing', 'mobile app', 'platform', 'system', 'tool', 'device', 'gadget', 'smartphone', 'computer', 'laptop', 'tablet', 'smart home', 'IoT', 'cybersecurity', 'data privacy'],
      tr: ['teknoloji', 'teknoloji benimseme', 'dijital dönüşüm', 'yazılım', 'donanım', 'yükseltme', 'yeni teknoloji', 'inovasyon', 'otomasyon', 'yapay zeka', 'bulut bilişim', 'mobil uygulama', 'platform', 'sistem', 'araç', 'cihaz', 'gadget', 'akıllı telefon', 'bilgisayar', 'dizüstü', 'tablet', 'akıllı ev', 'nesnelerin interneti', 'siber güvenlik', 'veri gizliliği'],
      es: ['tecnología', 'adopción tecnológica', 'transformación digital', 'software', 'hardware', 'actualización', 'nueva tecnología', 'innovación', 'automatización', 'IA', 'inteligencia artificial', 'computación en la nube', 'aplicación móvil', 'plataforma', 'sistema', 'herramienta', 'dispositivo', 'gadget', 'teléfono inteligente', 'computadora', 'portátil', 'tableta', 'hogar inteligente', 'IoT', 'ciberseguridad', 'privacidad de datos'],
      ru: ['технология', 'принятие технологий', 'цифровая трансформация', 'программное обеспечение', 'аппаратное обеспечение', 'обновление', 'новая технология', 'инновации', 'автоматизация', 'ИИ', 'искусственный интеллект', 'облачные вычисления', 'мобильное приложение', 'платформа', 'система', 'инструмент', 'устройство', 'гаджет', 'смартфон', 'компьютер', 'ноутбук', 'планшет', 'умный дом', 'интернет вещей', 'кибербезопасность', 'конфиденциальность данных']
    }
  },
  {
    key: 'housing_decision',
    name: {
      en: 'Housing Decision',
      tr: 'Konut seçimi / ev alma',
      es: 'Decisión de vivienda',
      ru: 'Выбор жилья'
    },
    description: {
      en: 'Buying vs renting, home selection, housing market decisions',
      tr: 'Satın alma vs kiralama, ev seçimi, konut piyasası kararları',
      es: 'Comprar vs alquilar, selección de hogar, decisiones del mercado inmobiliario',
      ru: 'Покупка против аренды, выбор дома, решения рынка недвижимости'
    },
    keywords: {
      en: ['housing', 'home', 'house', 'apartment', 'condo', 'buy', 'rent', 'mortgage', 'down payment', 'real estate', 'property', 'housing market', 'home buying', 'home selling', 'realtor', 'agent', 'inspection', 'appraisal', 'neighborhood', 'location', 'commute', 'schools', 'amenities', 'HOA', 'property tax', 'utilities', 'maintenance', 'renovation'],
      tr: ['konut', 'ev', 'daire', 'apartman', 'satın alma', 'kiralama', 'ipotek', 'peşinat', 'emlak', 'mülk', 'konut piyasası', 'ev alma', 'ev satma', 'emlakçı', 'acente', 'inceleme', 'ekspertiz', 'mahalle', 'konum', 'ulaşım', 'okullar', 'olanaklar', 'site yönetimi', 'emlak vergisi', 'faturalar', 'bakım', 'tadilat'],
      es: ['vivienda', 'hogar', 'casa', 'apartamento', 'condominio', 'comprar', 'alquilar', 'hipoteca', 'pago inicial', 'bienes raíces', 'propiedad', 'mercado inmobiliario', 'compra de casa', 'venta de casa', 'agente inmobiliario', 'inspección', 'tasación', 'vecindario', 'ubicación', 'viaje al trabajo', 'escuelas', 'amenidades', 'administración', 'impuesto predial', 'servicios públicos', 'mantenimiento', 'renovación'],
      ru: ['жилье', 'дом', 'квартира', 'кондоминиум', 'покупка', 'аренда', 'ипотека', 'первоначальный взнос', 'недвижимость', 'собственность', 'рынок жилья', 'покупка дома', 'продажа дома', 'риэлтор', 'агент', 'осмотр', 'оценка', 'район', 'местоположение', 'дорога на работу', 'школы', 'удобства', 'управляющая компания', 'налог на недвижимость', 'коммунальные услуги', 'обслуживание', 'ремонт']
    }
  },
  {
    key: 'mental_wellbeing',
    name: {
      en: 'Mental Well-being',
      tr: 'Ruhsal iyilik hali',
      es: 'Bienestar mental',
      ru: 'Психологическое благополучие'
    },
    description: {
      en: 'Mental health decisions, therapy choices, psychological well-being',
      tr: 'Ruh sağlığı kararları, terapi seçimleri, psikolojik iyilik hali',
      es: 'Decisiones de salud mental, opciones de terapia, bienestar psicológico',
      ru: 'Решения о психическом здоровье, выбор терапии, психологическое благополучие'
    },
    keywords: {
      en: ['mental health', 'mental wellbeing', 'therapy', 'counseling', 'psychologist', 'psychiatrist', 'depression', 'anxiety', 'stress', 'trauma', 'PTSD', 'bipolar', 'medication', 'antidepressant', 'mindfulness', 'meditation', 'self-care', 'emotional health', 'psychological support', 'mental illness', 'stigma', 'recovery', 'resilience', 'coping strategies', 'support group'],
      tr: ['ruh sağlığı', 'ruhsal iyilik', 'terapi', 'danışmanlık', 'psikolog', 'psikiyatrist', 'depresyon', 'kaygı', 'stres', 'travma', 'PTSD', 'bipolar', 'ilaç', 'antidepresan', 'farkındalık', 'meditasyon', 'öz bakım', 'duygusal sağlık', 'psikolojik destek', 'ruhsal hastalık', 'damgalama', 'iyileşme', 'dayanıklılık', 'başa çıkma stratejileri', 'destek grubu'],
      es: ['salud mental', 'bienestar mental', 'terapia', 'consejería', 'psicólogo', 'psiquiatra', 'depresión', 'ansiedad', 'estrés', 'trauma', 'TEPT', 'bipolar', 'medicación', 'antidepresivo', 'atención plena', 'meditación', 'autocuidado', 'salud emocional', 'apoyo psicológico', 'enfermedad mental', 'estigma', 'recuperación', 'resistencia', 'estrategias de afrontamiento', 'grupo de apoyo'],
      ru: ['психическое здоровье', 'психологическое благополучие', 'терапия', 'консультирование', 'психолог', 'психиатр', 'депрессия', 'тревога', 'стресс', 'травма', 'ПТСР', 'биполярное расстройство', 'лекарства', 'антидепрессант', 'осознанность', 'медитация', 'забота о себе', 'эмоциональное здоровье', 'психологическая поддержка', 'психическое заболевание', 'стигма', 'выздоровление', 'устойчивость', 'стратегии преодоления', 'группа поддержки']
    }
  },
  {
    key: 'career_pivot',
    name: {
      en: 'Career Pivot',
      tr: 'Meslek değişikliği',
      es: 'Cambio de carrera',
      ru: 'Смена профессии'
    },
    description: {
      en: 'Major career changes, industry transitions, professional pivots',
      tr: 'Büyük kariyer değişiklikleri, sektör geçişleri, mesleki dönüşümler',
      es: 'Cambios importantes de carrera, transiciones de industria, pivotes profesionales',
      ru: 'Кардинальные изменения карьеры, переходы между отраслями, профессиональные повороты'
    },
    keywords: {
      en: ['career change', 'career pivot', 'career transition', 'industry change', 'professional change', 'new career', 'career switch', 'retraining', 'reskilling', 'career break', 'sabbatical', 'mid-life crisis', 'passion project', 'calling', 'purpose', 'career counseling', 'career coach', 'networking', 'transferable skills', 'career exploration'],
      tr: ['kariyer değişikliği', 'meslek değişikliği', 'kariyer geçişi', 'sektör değişikliği', 'mesleki değişim', 'yeni kariyer', 'kariyer değişimi', 'yeniden eğitim', 'beceri geliştirme', 'kariyer molası', 'izin', 'orta yaş krizi', 'tutku projesi', 'çağrı', 'amaç', 'kariyer danışmanlığı', 'kariyer koçu', 'ağ kurma', 'aktarılabilir beceriler', 'kariyer keşfi'],
      es: ['cambio de carrera', 'pivote de carrera', 'transición de carrera', 'cambio de industria', 'cambio profesional', 'nueva carrera', 'cambio de carrera', 'reentrenamiento', 'recapacitación', 'pausa en la carrera', 'sabático', 'crisis de mediana edad', 'proyecto de pasión', 'llamado', 'propósito', 'consejería de carrera', 'coach de carrera', 'networking', 'habilidades transferibles', 'exploración de carrera'],
      ru: ['смена карьеры', 'поворот карьеры', 'переход карьеры', 'смена отрасли', 'профессиональное изменение', 'новая карьера', 'смена карьеры', 'переподготовка', 'переквалификация', 'карьерный перерыв', 'творческий отпуск', 'кризис среднего возраста', 'проект страсти', 'призвание', 'цель', 'карьерное консультирование', 'карьерный коуч', 'нетворкинг', 'переносимые навыки', 'исследование карьеры']
    }
  },
  {
    key: 'partnership_cofounder',
    name: {
      en: 'Partnership / Co-Founder',
      tr: 'Ortak seçimi / ekip kurma',
      es: 'Selección de socio / equipo',
      ru: 'Выбор партнёра / команды'
    },
    description: {
      en: 'Choosing business partners, co-founders, team building decisions',
      tr: 'İş ortağı seçimi, kurucu ortaklar, ekip kurma kararları',
      es: 'Elegir socios comerciales, cofundadores, decisiones de formación de equipos',
      ru: 'Выбор деловых партнёров, соучредителей, решения по формированию команды'
    },
    keywords: {
      en: ['partnership', 'co-founder', 'business partner', 'team building', 'collaboration', 'joint venture', 'equity', 'shares', 'partnership agreement', 'co-founding', 'startup team', 'founding team', 'business relationship', 'trust', 'compatibility', 'skills complement', 'shared vision', 'commitment', 'responsibility', 'decision making', 'conflict resolution'],
      tr: ['ortaklık', 'kurucu ortak', 'iş ortağı', 'ekip kurma', 'işbirliği', 'ortak girişim', 'hisse', 'pay', 'ortaklık anlaşması', 'ortak kurma', 'girişim ekibi', 'kurucu ekip', 'iş ilişkisi', 'güven', 'uyumluluk', 'beceri tamamlama', 'ortak vizyon', 'bağlılık', 'sorumluluk', 'karar verme', 'çatışma çözümü'],
      es: ['sociedad', 'cofundador', 'socio comercial', 'formación de equipos', 'colaboración', 'empresa conjunta', 'capital', 'acciones', 'acuerdo de sociedad', 'cofundación', 'equipo de startup', 'equipo fundador', 'relación comercial', 'confianza', 'compatibilidad', 'complemento de habilidades', 'visión compartida', 'compromiso', 'responsabilidad', 'toma de decisiones', 'resolución de conflictos'],
      ru: ['партнёрство', 'соучредитель', 'деловой партнёр', 'формирование команды', 'сотрудничество', 'совместное предприятие', 'капитал', 'акции', 'соглашение о партнёрстве', 'соучреждение', 'команда стартапа', 'команда основателей', 'деловые отношения', 'доверие', 'совместимость', 'дополнение навыков', 'общее видение', 'обязательство', 'ответственность', 'принятие решений', 'разрешение конфликтов']
    }
  },
  {
    key: 'legal_bureaucratic',
    name: {
      en: 'Legal / Bureaucratic',
      tr: 'Hukuki/bürokratik kararlar',
      es: 'Decisiones legales',
      ru: 'Юридические вопросы'
    },
    description: {
      en: 'Legal decisions, bureaucratic processes, regulatory compliance',
      tr: 'Hukuki kararlar, bürokratik süreçler, mevzuat uyumu',
      es: 'Decisiones legales, procesos burocráticos, cumplimiento regulatorio',
      ru: 'Юридические решения, бюрократические процессы, соблюдение требований'
    },
    keywords: {
      en: ['legal', 'law', 'lawyer', 'attorney', 'legal advice', 'lawsuit', 'litigation', 'contract', 'agreement', 'legal document', 'bureaucracy', 'government', 'regulation', 'compliance', 'permit', 'license', 'certification', 'legal issue', 'court', 'judge', 'legal rights', 'legal obligation', 'legal process', 'legal consultation', 'legal representation'],
      tr: ['hukuki', 'hukuk', 'avukat', 'hukuk müşaviri', 'hukuki tavsiye', 'dava', 'yargılama', 'sözleşme', 'anlaşma', 'hukuki belge', 'bürokrasi', 'devlet', 'düzenleme', 'uyumluluk', 'izin', 'lisans', 'sertifikasyon', 'hukuki sorun', 'mahkeme', 'hakim', 'hukuki haklar', 'hukuki yükümlülük', 'hukuki süreç', 'hukuki danışmanlık', 'hukuki temsil'],
      es: ['legal', 'ley', 'abogado', 'asesor legal', 'consejo legal', 'demanda', 'litigio', 'contrato', 'acuerdo', 'documento legal', 'burocracia', 'gobierno', 'regulación', 'cumplimiento', 'permiso', 'licencia', 'certificación', 'problema legal', 'tribunal', 'juez', 'derechos legales', 'obligación legal', 'proceso legal', 'consulta legal', 'representación legal'],
      ru: ['юридический', 'право', 'юрист', 'адвокат', 'юридическая консультация', 'иск', 'судебный процесс', 'контракт', 'соглашение', 'юридический документ', 'бюрократия', 'правительство', 'регулирование', 'соответствие', 'разрешение', 'лицензия', 'сертификация', 'юридическая проблема', 'суд', 'судья', 'юридические права', 'юридическое обязательство', 'юридический процесс', 'юридическая консультация', 'юридическое представительство']
    }
  }
];

export function detectDecisionCategory(question: string, locale: Locale): DecisionCategory {
  const lowerQuestion = question.toLowerCase();
  
  // Score each category based on keyword matches
  const categoryScores: { [key in DecisionCategory]: number } = {
    career: 0,
    relationship: 0,
    relocation: 0,
    education: 0,
    entrepreneurship: 0,
    investment: 0,
    family: 0,
    personal_growth: 0,
    lifestyle_health: 0,
    travel: 0,
    work_life_balance: 0,
    social_circle: 0,
    retirement_planning: 0,
    parenting: 0,
    technology_adoption: 0,
    housing_decision: 0,
    mental_wellbeing: 0,
    career_pivot: 0,
    partnership_cofounder: 0,
    legal_bureaucratic: 0,
    general: 0
  };

  // Check each category for keyword matches
  DECISION_CATEGORIES.forEach(category => {
    const keywords = category.keywords[locale] || category.keywords.en;
    keywords.forEach(keyword => {
      if (lowerQuestion.includes(keyword.toLowerCase())) {
        categoryScores[category.key] += 1;
        // Give extra weight to longer, more specific keywords
        if (keyword.length > 6) {
          categoryScores[category.key] += 1;
        }
      }
    });
  });

  // Find the category with the highest score
  let maxScore = 0;
  let detectedCategory: DecisionCategory = 'general';
  
  Object.entries(categoryScores).forEach(([category, score]) => {
    if (score > maxScore) {
      maxScore = score;
      detectedCategory = category as DecisionCategory;
    }
  });

  // If no specific category detected with sufficient confidence, return general
  return maxScore >= 1 ? detectedCategory : 'general';
}

export function getCategoryInfo(category: DecisionCategory): DecisionCategoryInfo | undefined {
  return DECISION_CATEGORIES.find(cat => cat.key === category);
}

export function getCategoryName(category: DecisionCategory, locale: Locale): string {
  const categoryInfo = getCategoryInfo(category);
  return categoryInfo?.name[locale] || categoryInfo?.name.en || 'General Decision';
}

export function getCategoryDescription(category: DecisionCategory, locale: Locale): string {
  const categoryInfo = getCategoryInfo(category);
  return categoryInfo?.description[locale] || categoryInfo?.description.en || 'General decision analysis';
} 