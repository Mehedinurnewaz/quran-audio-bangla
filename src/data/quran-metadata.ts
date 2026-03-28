export interface SuraInfo {
  number: number;
  nameArabic: string;
  nameBangla: string;
  nameEnglish: string;
  ayatCount: number;
  revelationType: 'মাক্কী' | 'মাদানী';
}

export const AUDIO_BASE_URL = 'https://media.githubusercontent.com/media/Mehedinurnewaz/quran-audio-bangla/main/bangla-audio';

export function getAudioUrl(sura: number, ayat: number): string {
  if (ayat === 0) return `${AUDIO_BASE_URL}/1-0.mp3`;
  return `${AUDIO_BASE_URL}/${sura}-${ayat}.mp3`;
}

export function getAppUrl(sura: number, ayat: number): string {
  return `/sura/${sura}/ayat/${ayat}`;
}

// Para (Juz) mapping: each para's start sura:ayat and end sura:ayat
export interface ParaInfo {
  number: number;
  nameBangla: string;
  startSura: number;
  startAyat: number;
  endSura: number;
  endAyat: number;
}

export const paraList: ParaInfo[] = [
  { number: 1, nameBangla: 'আলিফ লাম মীম', startSura: 1, startAyat: 1, endSura: 2, endAyat: 141 },
  { number: 2, nameBangla: 'সাইয়াকূল', startSura: 2, startAyat: 142, endSura: 2, endAyat: 252 },
  { number: 3, nameBangla: 'তিলকার রুসুল', startSura: 2, startAyat: 253, endSura: 3, endAyat: 92 },
  { number: 4, nameBangla: 'লান তানালু', startSura: 3, startAyat: 93, endSura: 4, endAyat: 23 },
  { number: 5, nameBangla: 'ওয়াল মুহসানাত', startSura: 4, startAyat: 24, endSura: 4, endAyat: 147 },
  { number: 6, nameBangla: 'লা ইউহিব্বুল্লাহ', startSura: 4, startAyat: 148, endSura: 5, endAyat: 81 },
  { number: 7, nameBangla: 'ওয়া ইযা সামিউ', startSura: 5, startAyat: 82, endSura: 6, endAyat: 110 },
  { number: 8, nameBangla: 'ওয়া লাও আন্নানা', startSura: 6, startAyat: 111, endSura: 7, endAyat: 87 },
  { number: 9, nameBangla: 'কালাল মালাউ', startSura: 7, startAyat: 88, endSura: 8, endAyat: 40 },
  { number: 10, nameBangla: 'ওয়া\'লামু', startSura: 8, startAyat: 41, endSura: 9, endAyat: 92 },
  { number: 11, nameBangla: 'ইয়া\'তাযিরূন', startSura: 9, startAyat: 93, endSura: 11, endAyat: 5 },
  { number: 12, nameBangla: 'ওয়া মা মিন দাব্বাতিন', startSura: 11, startAyat: 6, endSura: 12, endAyat: 52 },
  { number: 13, nameBangla: 'ওয়া মা উবাররিউ', startSura: 12, startAyat: 53, endSura: 14, endAyat: 52 },
  { number: 14, nameBangla: 'রুবামা', startSura: 15, startAyat: 1, endSura: 16, endAyat: 128 },
  { number: 15, nameBangla: 'সুবহানাল্লাযী', startSura: 17, startAyat: 1, endSura: 18, endAyat: 74 },
  { number: 16, nameBangla: 'কালা আলাম', startSura: 18, startAyat: 75, endSura: 20, endAyat: 135 },
  { number: 17, nameBangla: 'ইকতারাবা', startSura: 21, startAyat: 1, endSura: 22, endAyat: 78 },
  { number: 18, nameBangla: 'কাদ আফলাহা', startSura: 23, startAyat: 1, endSura: 25, endAyat: 20 },
  { number: 19, nameBangla: 'ওয়া কালাল্লাযীনা', startSura: 25, startAyat: 21, endSura: 27, endAyat: 55 },
  { number: 20, nameBangla: 'আম্মান খালাকা', startSura: 27, startAyat: 56, endSura: 29, endAyat: 45 },
  { number: 21, nameBangla: 'উতলু মা উহিয়া', startSura: 29, startAyat: 46, endSura: 33, endAyat: 30 },
  { number: 22, nameBangla: 'ওয়া মাইঁ ইয়াকনুত', startSura: 33, startAyat: 31, endSura: 36, endAyat: 27 },
  { number: 23, nameBangla: 'ওয়া মালিয়া', startSura: 36, startAyat: 28, endSura: 39, endAyat: 31 },
  { number: 24, nameBangla: 'ফামান আযলামু', startSura: 39, startAyat: 32, endSura: 41, endAyat: 46 },
  { number: 25, nameBangla: 'ইলাইহি ইউরাদ্দু', startSura: 41, startAyat: 47, endSura: 45, endAyat: 37 },
  { number: 26, nameBangla: 'হা-মীম', startSura: 46, startAyat: 1, endSura: 51, endAyat: 30 },
  { number: 27, nameBangla: 'কালা ফামা খাতবুকুম', startSura: 51, startAyat: 31, endSura: 57, endAyat: 29 },
  { number: 28, nameBangla: 'কাদ সামিআল্লাহ', startSura: 58, startAyat: 1, endSura: 66, endAyat: 12 },
  { number: 29, nameBangla: 'তাবারাকাল্লাযী', startSura: 67, startAyat: 1, endSura: 77, endAyat: 50 },
  { number: 30, nameBangla: 'আম্মা ইয়াতাসাআলূন', startSura: 78, startAyat: 1, endSura: 114, endAyat: 6 },
];

export function getParasForSura(suraNumber: number): number[] {
  return paraList
    .filter(p => suraNumber >= p.startSura && suraNumber <= p.endSura)
    .map(p => p.number);
}

export function getSurasInPara(paraNumber: number): number[] {
  const para = paraList.find(p => p.number === paraNumber);
  if (!para) return [];
  const suras: number[] = [];
  for (let i = para.startSura; i <= para.endSura; i++) {
    suras.push(i);
  }
  return suras;
}

export const suraList: SuraInfo[] = [
  { number: 1, nameArabic: 'الفاتحة', nameBangla: 'আল-ফাতিহা', nameEnglish: 'Al-Fatiha', ayatCount: 7, revelationType: 'মাক্কী' },
  { number: 2, nameArabic: 'البقرة', nameBangla: 'আল-বাকারা', nameEnglish: 'Al-Baqarah', ayatCount: 286, revelationType: 'মাদানী' },
  { number: 3, nameArabic: 'آل عمران', nameBangla: 'আলে ইমরান', nameEnglish: 'Aal-E-Imran', ayatCount: 200, revelationType: 'মাদানী' },
  { number: 4, nameArabic: 'النساء', nameBangla: 'আন-নিসা', nameEnglish: 'An-Nisa', ayatCount: 176, revelationType: 'মাদানী' },
  { number: 5, nameArabic: 'المائدة', nameBangla: 'আল-মায়িদা', nameEnglish: 'Al-Maidah', ayatCount: 120, revelationType: 'মাদানী' },
  { number: 6, nameArabic: 'الأنعام', nameBangla: 'আল-আনআম', nameEnglish: 'Al-Anam', ayatCount: 165, revelationType: 'মাক্কী' },
  { number: 7, nameArabic: 'الأعراف', nameBangla: 'আল-আরাফ', nameEnglish: 'Al-Araf', ayatCount: 206, revelationType: 'মাক্কী' },
  { number: 8, nameArabic: 'الأنفال', nameBangla: 'আল-আনফাল', nameEnglish: 'Al-Anfal', ayatCount: 75, revelationType: 'মাদানী' },
  { number: 9, nameArabic: 'التوبة', nameBangla: 'আত-তওবা', nameEnglish: 'At-Tawbah', ayatCount: 129, revelationType: 'মাদানী' },
  { number: 10, nameArabic: 'يونس', nameBangla: 'ইউনুস', nameEnglish: 'Yunus', ayatCount: 109, revelationType: 'মাক্কী' },
  { number: 11, nameArabic: 'هود', nameBangla: 'হুদ', nameEnglish: 'Hud', ayatCount: 123, revelationType: 'মাক্কী' },
  { number: 12, nameArabic: 'يوسف', nameBangla: 'ইউসুফ', nameEnglish: 'Yusuf', ayatCount: 111, revelationType: 'মাক্কী' },
  { number: 13, nameArabic: 'الرعد', nameBangla: 'আর-রাদ', nameEnglish: 'Ar-Rad', ayatCount: 43, revelationType: 'মাদানী' },
  { number: 14, nameArabic: 'ابراهيم', nameBangla: 'ইবরাহীম', nameEnglish: 'Ibrahim', ayatCount: 52, revelationType: 'মাক্কী' },
  { number: 15, nameArabic: 'الحجر', nameBangla: 'আল-হিজর', nameEnglish: 'Al-Hijr', ayatCount: 99, revelationType: 'মাক্কী' },
  { number: 16, nameArabic: 'النحل', nameBangla: 'আন-নাহল', nameEnglish: 'An-Nahl', ayatCount: 128, revelationType: 'মাক্কী' },
  { number: 17, nameArabic: 'الإسراء', nameBangla: 'আল-ইসরা', nameEnglish: 'Al-Isra', ayatCount: 111, revelationType: 'মাক্কী' },
  { number: 18, nameArabic: 'الكهف', nameBangla: 'আল-কাহফ', nameEnglish: 'Al-Kahf', ayatCount: 110, revelationType: 'মাক্কী' },
  { number: 19, nameArabic: 'مريم', nameBangla: 'মারইয়াম', nameEnglish: 'Maryam', ayatCount: 98, revelationType: 'মাক্কী' },
  { number: 20, nameArabic: 'طه', nameBangla: 'তা-হা', nameEnglish: 'Ta-Ha', ayatCount: 135, revelationType: 'মাক্কী' },
  { number: 21, nameArabic: 'الأنبياء', nameBangla: 'আল-আম্বিয়া', nameEnglish: 'Al-Anbiya', ayatCount: 112, revelationType: 'মাক্কী' },
  { number: 22, nameArabic: 'الحج', nameBangla: 'আল-হজ্জ', nameEnglish: 'Al-Hajj', ayatCount: 78, revelationType: 'মাদানী' },
  { number: 23, nameArabic: 'المؤمنون', nameBangla: 'আল-মুমিনুন', nameEnglish: 'Al-Muminun', ayatCount: 118, revelationType: 'মাক্কী' },
  { number: 24, nameArabic: 'النور', nameBangla: 'আন-নূর', nameEnglish: 'An-Nur', ayatCount: 64, revelationType: 'মাদানী' },
  { number: 25, nameArabic: 'الفرقان', nameBangla: 'আল-ফুরকান', nameEnglish: 'Al-Furqan', ayatCount: 77, revelationType: 'মাক্কী' },
  { number: 26, nameArabic: 'الشعراء', nameBangla: 'আশ-শুআরা', nameEnglish: 'Ash-Shuara', ayatCount: 227, revelationType: 'মাক্কী' },
  { number: 27, nameArabic: 'النمل', nameBangla: 'আন-নামল', nameEnglish: 'An-Naml', ayatCount: 93, revelationType: 'মাক্কী' },
  { number: 28, nameArabic: 'القصص', nameBangla: 'আল-কাসাস', nameEnglish: 'Al-Qasas', ayatCount: 88, revelationType: 'মাক্কী' },
  { number: 29, nameArabic: 'العنكبوت', nameBangla: 'আল-আনকাবুত', nameEnglish: 'Al-Ankabut', ayatCount: 69, revelationType: 'মাক্কী' },
  { number: 30, nameArabic: 'الروم', nameBangla: 'আর-রূম', nameEnglish: 'Ar-Rum', ayatCount: 60, revelationType: 'মাক্কী' },
  { number: 31, nameArabic: 'لقمان', nameBangla: 'লুকমান', nameEnglish: 'Luqman', ayatCount: 34, revelationType: 'মাক্কী' },
  { number: 32, nameArabic: 'السجدة', nameBangla: 'আস-সাজদা', nameEnglish: 'As-Sajdah', ayatCount: 30, revelationType: 'মাক্কী' },
  { number: 33, nameArabic: 'الأحزاب', nameBangla: 'আল-আহযাব', nameEnglish: 'Al-Ahzab', ayatCount: 73, revelationType: 'মাদানী' },
  { number: 34, nameArabic: 'سبإ', nameBangla: 'সাবা', nameEnglish: 'Saba', ayatCount: 54, revelationType: 'মাক্কী' },
  { number: 35, nameArabic: 'فاطر', nameBangla: 'ফাতির', nameEnglish: 'Fatir', ayatCount: 45, revelationType: 'মাক্কী' },
  { number: 36, nameArabic: 'يس', nameBangla: 'ইয়াসীন', nameEnglish: 'Ya-Sin', ayatCount: 83, revelationType: 'মাক্কী' },
  { number: 37, nameArabic: 'الصافات', nameBangla: 'আস-সাফফাত', nameEnglish: 'As-Saffat', ayatCount: 182, revelationType: 'মাক্কী' },
  { number: 38, nameArabic: 'ص', nameBangla: 'সোয়াদ', nameEnglish: 'Sad', ayatCount: 88, revelationType: 'মাক্কী' },
  { number: 39, nameArabic: 'الزمر', nameBangla: 'আয-যুমার', nameEnglish: 'Az-Zumar', ayatCount: 75, revelationType: 'মাক্কী' },
  { number: 40, nameArabic: 'غافر', nameBangla: 'গাফির', nameEnglish: 'Ghafir', ayatCount: 85, revelationType: 'মাক্কী' },
  { number: 41, nameArabic: 'فصلت', nameBangla: 'ফুসসিলাত', nameEnglish: 'Fussilat', ayatCount: 54, revelationType: 'মাক্কী' },
  { number: 42, nameArabic: 'الشورى', nameBangla: 'আশ-শূরা', nameEnglish: 'Ash-Shura', ayatCount: 53, revelationType: 'মাক্কী' },
  { number: 43, nameArabic: 'الزخرف', nameBangla: 'আয-যুখরুফ', nameEnglish: 'Az-Zukhruf', ayatCount: 89, revelationType: 'মাক্কী' },
  { number: 44, nameArabic: 'الدخان', nameBangla: 'আদ-দুখান', nameEnglish: 'Ad-Dukhan', ayatCount: 59, revelationType: 'মাক্কী' },
  { number: 45, nameArabic: 'الجاثية', nameBangla: 'আল-জাসিয়া', nameEnglish: 'Al-Jathiyah', ayatCount: 37, revelationType: 'মাক্কী' },
  { number: 46, nameArabic: 'الأحقاف', nameBangla: 'আল-আহকাফ', nameEnglish: 'Al-Ahqaf', ayatCount: 35, revelationType: 'মাক্কী' },
  { number: 47, nameArabic: 'محمد', nameBangla: 'মুহাম্মাদ', nameEnglish: 'Muhammad', ayatCount: 38, revelationType: 'মাদানী' },
  { number: 48, nameArabic: 'الفتح', nameBangla: 'আল-ফাতহ', nameEnglish: 'Al-Fath', ayatCount: 29, revelationType: 'মাদানী' },
  { number: 49, nameArabic: 'الحجرات', nameBangla: 'আল-হুজুরাত', nameEnglish: 'Al-Hujurat', ayatCount: 18, revelationType: 'মাদানী' },
  { number: 50, nameArabic: 'ق', nameBangla: 'কাফ', nameEnglish: 'Qaf', ayatCount: 45, revelationType: 'মাক্কী' },
  { number: 51, nameArabic: 'الذاريات', nameBangla: 'আয-যারিয়াত', nameEnglish: 'Adh-Dhariyat', ayatCount: 60, revelationType: 'মাক্কী' },
  { number: 52, nameArabic: 'الطور', nameBangla: 'আত-তূর', nameEnglish: 'At-Tur', ayatCount: 49, revelationType: 'মাক্কী' },
  { number: 53, nameArabic: 'النجم', nameBangla: 'আন-নাজম', nameEnglish: 'An-Najm', ayatCount: 62, revelationType: 'মাক্কী' },
  { number: 54, nameArabic: 'القمر', nameBangla: 'আল-কামার', nameEnglish: 'Al-Qamar', ayatCount: 55, revelationType: 'মাক্কী' },
  { number: 55, nameArabic: 'الرحمن', nameBangla: 'আর-রাহমান', nameEnglish: 'Ar-Rahman', ayatCount: 78, revelationType: 'মাদানী' },
  { number: 56, nameArabic: 'الواقعة', nameBangla: 'আল-ওয়াকিয়া', nameEnglish: 'Al-Waqiah', ayatCount: 96, revelationType: 'মাক্কী' },
  { number: 57, nameArabic: 'الحديد', nameBangla: 'আল-হাদীদ', nameEnglish: 'Al-Hadid', ayatCount: 29, revelationType: 'মাদানী' },
  { number: 58, nameArabic: 'المجادلة', nameBangla: 'আল-মুজাদালা', nameEnglish: 'Al-Mujadila', ayatCount: 22, revelationType: 'মাদানী' },
  { number: 59, nameArabic: 'الحشر', nameBangla: 'আল-হাশর', nameEnglish: 'Al-Hashr', ayatCount: 24, revelationType: 'মাদানী' },
  { number: 60, nameArabic: 'الممتحنة', nameBangla: 'আল-মুমতাহিনা', nameEnglish: 'Al-Mumtahinah', ayatCount: 13, revelationType: 'মাদানী' },
  { number: 61, nameArabic: 'الصف', nameBangla: 'আস-সফ', nameEnglish: 'As-Saf', ayatCount: 14, revelationType: 'মাদানী' },
  { number: 62, nameArabic: 'الجمعة', nameBangla: 'আল-জুমুআ', nameEnglish: 'Al-Jumuah', ayatCount: 11, revelationType: 'মাদানী' },
  { number: 63, nameArabic: 'المنافقون', nameBangla: 'আল-মুনাফিকুন', nameEnglish: 'Al-Munafiqun', ayatCount: 11, revelationType: 'মাদানী' },
  { number: 64, nameArabic: 'التغابن', nameBangla: 'আত-তাগাবুন', nameEnglish: 'At-Taghabun', ayatCount: 18, revelationType: 'মাদানী' },
  { number: 65, nameArabic: 'الطلاق', nameBangla: 'আত-তালাক', nameEnglish: 'At-Talaq', ayatCount: 12, revelationType: 'মাদানী' },
  { number: 66, nameArabic: 'التحريم', nameBangla: 'আত-তাহরীম', nameEnglish: 'At-Tahrim', ayatCount: 12, revelationType: 'মাদানী' },
  { number: 67, nameArabic: 'الملك', nameBangla: 'আল-মুলক', nameEnglish: 'Al-Mulk', ayatCount: 30, revelationType: 'মাক্কী' },
  { number: 68, nameArabic: 'القلم', nameBangla: 'আল-কালাম', nameEnglish: 'Al-Qalam', ayatCount: 52, revelationType: 'মাক্কী' },
  { number: 69, nameArabic: 'الحاقة', nameBangla: 'আল-হাক্কা', nameEnglish: 'Al-Haqqah', ayatCount: 52, revelationType: 'মাক্কী' },
  { number: 70, nameArabic: 'المعارج', nameBangla: 'আল-মাআরিজ', nameEnglish: 'Al-Maarij', ayatCount: 44, revelationType: 'মাক্কী' },
  { number: 71, nameArabic: 'نوح', nameBangla: 'নূহ', nameEnglish: 'Nuh', ayatCount: 28, revelationType: 'মাক্কী' },
  { number: 72, nameArabic: 'الجن', nameBangla: 'আল-জিন', nameEnglish: 'Al-Jinn', ayatCount: 28, revelationType: 'মাক্কী' },
  { number: 73, nameArabic: 'المزمل', nameBangla: 'আল-মুযযাম্মিল', nameEnglish: 'Al-Muzzammil', ayatCount: 20, revelationType: 'মাক্কী' },
  { number: 74, nameArabic: 'المدثر', nameBangla: 'আল-মুদ্দাসসির', nameEnglish: 'Al-Muddathir', ayatCount: 56, revelationType: 'মাক্কী' },
  { number: 75, nameArabic: 'القيامة', nameBangla: 'আল-কিয়ামা', nameEnglish: 'Al-Qiyamah', ayatCount: 40, revelationType: 'মাক্কী' },
  { number: 76, nameArabic: 'الانسان', nameBangla: 'আল-ইনসান', nameEnglish: 'Al-Insan', ayatCount: 31, revelationType: 'মাদানী' },
  { number: 77, nameArabic: 'المرسلات', nameBangla: 'আল-মুরসালাত', nameEnglish: 'Al-Mursalat', ayatCount: 50, revelationType: 'মাক্কী' },
  { number: 78, nameArabic: 'النبإ', nameBangla: 'আন-নাবা', nameEnglish: 'An-Naba', ayatCount: 40, revelationType: 'মাক্কী' },
  { number: 79, nameArabic: 'النازعات', nameBangla: 'আন-নাযিয়াত', nameEnglish: 'An-Naziat', ayatCount: 46, revelationType: 'মাক্কী' },
  { number: 80, nameArabic: 'عبس', nameBangla: 'আবাসা', nameEnglish: 'Abasa', ayatCount: 42, revelationType: 'মাক্কী' },
  { number: 81, nameArabic: 'التكوير', nameBangla: 'আত-তাকভীর', nameEnglish: 'At-Takwir', ayatCount: 29, revelationType: 'মাক্কী' },
  { number: 82, nameArabic: 'الإنفطار', nameBangla: 'আল-ইনফিতার', nameEnglish: 'Al-Infitar', ayatCount: 19, revelationType: 'মাক্কী' },
  { number: 83, nameArabic: 'المطففين', nameBangla: 'আল-মুতাফফিফীন', nameEnglish: 'Al-Mutaffifin', ayatCount: 36, revelationType: 'মাক্কী' },
  { number: 84, nameArabic: 'الانشقاق', nameBangla: 'আল-ইনশিকাক', nameEnglish: 'Al-Inshiqaq', ayatCount: 25, revelationType: 'মাক্কী' },
  { number: 85, nameArabic: 'البروج', nameBangla: 'আল-বুরূজ', nameEnglish: 'Al-Buruj', ayatCount: 22, revelationType: 'মাক্কী' },
  { number: 86, nameArabic: 'الطارق', nameBangla: 'আত-তারিক', nameEnglish: 'At-Tariq', ayatCount: 17, revelationType: 'মাক্কী' },
  { number: 87, nameArabic: 'الأعلى', nameBangla: 'আল-আলা', nameEnglish: 'Al-Ala', ayatCount: 19, revelationType: 'মাক্কী' },
  { number: 88, nameArabic: 'الغاشية', nameBangla: 'আল-গাশিয়া', nameEnglish: 'Al-Ghashiyah', ayatCount: 26, revelationType: 'মাক্কী' },
  { number: 89, nameArabic: 'الفجر', nameBangla: 'আল-ফজর', nameEnglish: 'Al-Fajr', ayatCount: 30, revelationType: 'মাক্কী' },
  { number: 90, nameArabic: 'البلد', nameBangla: 'আল-বালাদ', nameEnglish: 'Al-Balad', ayatCount: 20, revelationType: 'মাক্কী' },
  { number: 91, nameArabic: 'الشمس', nameBangla: 'আশ-শামস', nameEnglish: 'Ash-Shams', ayatCount: 15, revelationType: 'মাক্কী' },
  { number: 92, nameArabic: 'الليل', nameBangla: 'আল-লাইল', nameEnglish: 'Al-Lail', ayatCount: 21, revelationType: 'মাক্কী' },
  { number: 93, nameArabic: 'الضحى', nameBangla: 'আদ-দুহা', nameEnglish: 'Ad-Duha', ayatCount: 11, revelationType: 'মাক্কী' },
  { number: 94, nameArabic: 'الشرح', nameBangla: 'আল-ইনশিরাহ', nameEnglish: 'Ash-Sharh', ayatCount: 8, revelationType: 'মাক্কী' },
  { number: 95, nameArabic: 'التين', nameBangla: 'আত-তীন', nameEnglish: 'At-Tin', ayatCount: 8, revelationType: 'মাক্কী' },
  { number: 96, nameArabic: 'العلق', nameBangla: 'আল-আলাক', nameEnglish: 'Al-Alaq', ayatCount: 19, revelationType: 'মাক্কী' },
  { number: 97, nameArabic: 'القدر', nameBangla: 'আল-কদর', nameEnglish: 'Al-Qadr', ayatCount: 5, revelationType: 'মাক্কী' },
  { number: 98, nameArabic: 'البينة', nameBangla: 'আল-বাইয়্যিনা', nameEnglish: 'Al-Bayyinah', ayatCount: 8, revelationType: 'মাদানী' },
  { number: 99, nameArabic: 'الزلزلة', nameBangla: 'আয-যিলযাল', nameEnglish: 'Az-Zalzalah', ayatCount: 8, revelationType: 'মাদানী' },
  { number: 100, nameArabic: 'العاديات', nameBangla: 'আল-আদিয়াত', nameEnglish: 'Al-Adiyat', ayatCount: 11, revelationType: 'মাক্কী' },
  { number: 101, nameArabic: 'القارعة', nameBangla: 'আল-কারিআ', nameEnglish: 'Al-Qariah', ayatCount: 11, revelationType: 'মাক্কী' },
  { number: 102, nameArabic: 'التكاثر', nameBangla: 'আত-তাকাসুর', nameEnglish: 'At-Takathur', ayatCount: 8, revelationType: 'মাক্কী' },
  { number: 103, nameArabic: 'العصر', nameBangla: 'আল-আসর', nameEnglish: 'Al-Asr', ayatCount: 3, revelationType: 'মাক্কী' },
  { number: 104, nameArabic: 'الهمزة', nameBangla: 'আল-হুমাযা', nameEnglish: 'Al-Humazah', ayatCount: 9, revelationType: 'মাক্কী' },
  { number: 105, nameArabic: 'الفيل', nameBangla: 'আল-ফীল', nameEnglish: 'Al-Fil', ayatCount: 5, revelationType: 'মাক্কী' },
  { number: 106, nameArabic: 'قريش', nameBangla: 'কুরাইশ', nameEnglish: 'Quraysh', ayatCount: 4, revelationType: 'মাক্কী' },
  { number: 107, nameArabic: 'الماعون', nameBangla: 'আল-মাউন', nameEnglish: 'Al-Maun', ayatCount: 7, revelationType: 'মাক্কী' },
  { number: 108, nameArabic: 'الكوثر', nameBangla: 'আল-কাউসার', nameEnglish: 'Al-Kawthar', ayatCount: 3, revelationType: 'মাক্কী' },
  { number: 109, nameArabic: 'الكافرون', nameBangla: 'আল-কাফিরূন', nameEnglish: 'Al-Kafirun', ayatCount: 6, revelationType: 'মাক্কী' },
  { number: 110, nameArabic: 'النصر', nameBangla: 'আন-নাসর', nameEnglish: 'An-Nasr', ayatCount: 3, revelationType: 'মাদানী' },
  { number: 111, nameArabic: 'المسد', nameBangla: 'আল-মাসাদ', nameEnglish: 'Al-Masad', ayatCount: 5, revelationType: 'মাক্কী' },
  { number: 112, nameArabic: 'الإخلاص', nameBangla: 'আল-ইখলাস', nameEnglish: 'Al-Ikhlas', ayatCount: 4, revelationType: 'মাক্কী' },
  { number: 113, nameArabic: 'الفلق', nameBangla: 'আল-ফালাক', nameEnglish: 'Al-Falaq', ayatCount: 5, revelationType: 'মাক্কী' },
  { number: 114, nameArabic: 'الناس', nameBangla: 'আন-নাস', nameEnglish: 'An-Nas', ayatCount: 6, revelationType: 'মাক্কী' },
];
