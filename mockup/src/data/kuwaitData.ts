// Realistic Kuwait data for the intelligence platform

export interface Platform {
  id: string;
  name: string;
  nameArabic: string;
  layer: 'truth' | 'speed' | 'depth';
  tier: number;
  cost: number;
  icon: string;
  color: string;
  position: [number, number, number];
}

export interface TVChannel {
  id: string;
  name: string;
  nameArabic: string;
}

export interface GovernmentSource {
  id: string;
  name: string;
  nameArabic: string;
  type: 'ministry' | 'agency';
}

export interface StockCompany {
  id: string;
  ticker: string;
  name: string;
  nameArabic: string;
  sector: string;
  price: number;
}

export interface TwitterAccount {
  handle: string;
  name: string;
  nameArabic?: string;
  type: 'government' | 'influencer' | 'news' | 'business';
  followers: number;
}

export interface Newspaper {
  id: string;
  name: string;
  nameArabic: string;
  type: 'digital' | 'print';
  language: 'arabic' | 'english' | 'both';
}

export interface Podcast {
  id: string;
  name: string;
  nameArabic: string;
  category: string;
  host: string;
}

export interface RadioStation {
  id: string;
  name: string;
  nameArabic: string;
  frequency: string;
}

// 8 Platform Definitions
export const platforms: Platform[] = [
  {
    id: 'tv',
    name: 'TV Broadcasting',
    nameArabic: 'البث التلفزيوني',
    layer: 'speed',
    tier: 1,
    cost: 2200,
    icon: '📺',
    color: '#3b82f6',
    position: [0, 2, -4],
  },
  {
    id: 'government',
    name: 'Government Sources',
    nameArabic: 'المصادر الحكومية',
    layer: 'truth',
    tier: 1,
    cost: 150,
    icon: '🏛️',
    color: '#10b981',
    position: [-4, -2, 0],
  },
  {
    id: 'stock',
    name: 'Kuwait Stock Exchange',
    nameArabic: 'بورصة الكويت',
    layer: 'truth',
    tier: 1,
    cost: 0,
    icon: '📈',
    color: '#10b981',
    position: [4, -2, 0],
  },
  {
    id: 'twitter',
    name: 'Twitter/X',
    nameArabic: 'تويتر',
    layer: 'speed',
    tier: 1,
    cost: 10600,
    icon: '📱',
    color: '#3b82f6',
    position: [-3, 2, 2],
  },
  {
    id: 'digital-news',
    name: 'Digital Newspapers',
    nameArabic: 'الصحف الرقمية',
    layer: 'depth',
    tier: 2,
    cost: 1055,
    icon: '📰',
    color: '#a855f7',
    position: [3, 4, 2],
  },
  {
    id: 'podcasts',
    name: 'Podcasts',
    nameArabic: 'البودكاست',
    layer: 'depth',
    tier: 2,
    cost: 600,
    icon: '🎙️',
    color: '#a855f7',
    position: [-3, 4, -2],
  },
  {
    id: 'radio',
    name: 'Radio Stations',
    nameArabic: 'محطات الراديو',
    layer: 'speed',
    tier: 3,
    cost: 450,
    icon: '📻',
    color: '#3b82f6',
    position: [3, 2, -2],
  },
  {
    id: 'print',
    name: 'Print Newspapers',
    nameArabic: 'الصحف المطبوعة',
    layer: 'truth',
    tier: 3,
    cost: 650,
    icon: '📄',
    color: '#10b981',
    position: [0, -2, 4],
  },
];

// TV Channels
export const tvChannels: TVChannel[] = [
  { id: 'aljazeera', name: 'Al Jazeera', nameArabic: 'الجزيرة' },
  { id: 'alarabiya', name: 'Al Arabiya', nameArabic: 'العربية' },
  { id: 'kuwait-tv', name: 'Kuwait TV', nameArabic: 'تلفزيون الكويت' },
  { id: 'bbc-arabic', name: 'BBC Arabic', nameArabic: 'بي بي سي عربي' },
  { id: 'sky-news-arabia', name: 'Sky News Arabia', nameArabic: 'سكاي نيوز عربية' },
  { id: 'france24', name: 'France 24', nameArabic: 'فرانس 24' },
];

// Government Sources
export const governmentSources: GovernmentSource[] = [
  { id: 'kuna', name: 'Kuwait News Agency (KUNA)', nameArabic: 'وكالة الأنباء الكويتية', type: 'agency' },
  { id: 'mof', name: 'Ministry of Finance', nameArabic: 'وزارة المالية', type: 'ministry' },
  { id: 'moci', name: 'Ministry of Commerce & Industry', nameArabic: 'وزارة التجارة والصناعة', type: 'ministry' },
  { id: 'cbk', name: 'Central Bank of Kuwait', nameArabic: 'بنك الكويت المركزي', type: 'agency' },
  { id: 'parliament', name: 'National Assembly', nameArabic: 'مجلس الأمة', type: 'agency' },
  { id: 'moi', name: 'Ministry of Interior', nameArabic: 'وزارة الداخلية', type: 'ministry' },
  { id: 'health', name: 'Ministry of Health', nameArabic: 'وزارة الصحة', type: 'ministry' },
  { id: 'education', name: 'Ministry of Education', nameArabic: 'وزارة التربية', type: 'ministry' },
  { id: 'oil', name: 'Ministry of Oil', nameArabic: 'وزارة النفط', type: 'ministry' },
  { id: 'mofa', name: 'Ministry of Foreign Affairs', nameArabic: 'وزارة الخارجية', type: 'ministry' },
  { id: 'mod', name: 'Ministry of Defense', nameArabic: 'وزارة الدفاع', type: 'ministry' },
  { id: 'justice', name: 'Ministry of Justice', nameArabic: 'وزارة العدل', type: 'ministry' },
];

// Kuwait Stock Exchange Companies
export const kseCompanies: StockCompany[] = [
  { id: 'nbk', ticker: 'NBK', name: 'National Bank of Kuwait', nameArabic: 'بنك الكويت الوطني', sector: 'Banking', price: 0.850 },
  { id: 'kfh', ticker: 'KFH', name: 'Kuwait Finance House', nameArabic: 'بيت التمويل الكويتي', sector: 'Banking', price: 0.720 },
  { id: 'zain', ticker: 'ZAIN', name: 'Zain Kuwait', nameArabic: 'زين الكويت', sector: 'Telecom', price: 0.620 },
  { id: 'ooredoo', ticker: 'OOREDOO', name: 'Ooredoo Kuwait', nameArabic: 'أوريدو الكويت', sector: 'Telecom', price: 0.480 },
  { id: 'agility', ticker: 'AGLTY', name: 'Agility Public Warehousing', nameArabic: 'أجيليتي', sector: 'Logistics', price: 0.650 },
  { id: 'humansoft', ticker: 'HMNSFT', name: 'Humansoft Holding', nameArabic: 'هيومن سوفت القابضة', sector: 'Technology', price: 0.295 },
  { id: 'emanagement', ticker: 'EMNGMT', name: 'eManagement Solutions', nameArabic: 'الإدارة الإلكترونية', sector: 'Technology', price: 0.180 },
  { id: 'kamco', ticker: 'KAMCO', name: 'KAMCO Investment Company', nameArabic: 'كامكو للاستثمار', sector: 'Investment', price: 0.142 },
  { id: 'boursa', ticker: 'BOURSA', name: 'Boursa Kuwait Securities', nameArabic: 'بورصة الكويت للأوراق المالية', sector: 'Financial Services', price: 0.195 },
  { id: 'gbk', ticker: 'GBK', name: 'Gulf Bank', nameArabic: 'بنك الخليج', sector: 'Banking', price: 0.290 },
  { id: 'abk', ticker: 'ABK', name: 'Al Ahli Bank of Kuwait', nameArabic: 'بنك الأهلي الكويتي', sector: 'Banking', price: 0.320 },
  { id: 'kib', ticker: 'KIB', name: 'Kuwait International Bank', nameArabic: 'بنك الكويت الدولي', sector: 'Banking', price: 0.285 },
  { id: 'warba', ticker: 'WARBA', name: 'Warba Bank', nameArabic: 'بنك وربة', sector: 'Banking', price: 0.105 },
  { id: 'koc', ticker: 'KOC', name: 'Kuwait Oil Company', nameArabic: 'شركة نفط الكويت', sector: 'Oil & Gas', price: 1.250 },
  { id: 'kpc', ticker: 'KPC', name: 'Kuwait Petroleum Corporation', nameArabic: 'مؤسسة البترول الكويتية', sector: 'Oil & Gas', price: 2.100 },
  { id: 'tamdeen', ticker: 'TAMDEEN', name: 'Tamdeen Real Estate', nameArabic: 'تمدين العقارية', sector: 'Real Estate', price: 0.425 },
  { id: 'mabanee', ticker: 'MABANEE', name: 'Mabanee Company', nameArabic: 'شركة مباني', sector: 'Real Estate', price: 0.580 },
  { id: 'ncinema', ticker: 'NCNMA', name: 'National Cinema Company', nameArabic: 'شركة السينما الوطنية', sector: 'Entertainment', price: 0.185 },
  { id: 'alimtiaz', ticker: 'ALMTAZ', name: 'Alimtiaz Investment Group', nameArabic: 'مجموعة الامتياز للاستثمار', sector: 'Investment', price: 0.092 },
  { id: 'nib', ticker: 'NIB', name: 'National Industries Group', nameArabic: 'مجموعة الصناعات الوطنية', sector: 'Manufacturing', price: 0.168 },
];

// Twitter Accounts
export const twitterAccounts: TwitterAccount[] = [
  { handle: '@KUNA_ar', name: 'Kuwait News Agency', nameArabic: 'وكالة الأنباء الكويتية', type: 'government', followers: 580000 },
  { handle: '@MOFinance_Kw', name: 'Ministry of Finance KW', nameArabic: 'وزارة المالية الكويتية', type: 'government', followers: 125000 },
  { handle: '@MOIKuwait', name: 'Ministry of Interior', nameArabic: 'وزارة الداخلية', type: 'government', followers: 890000 },
  { handle: '@CBKuwait', name: 'Central Bank of Kuwait', nameArabic: 'بنك الكويت المركزي', type: 'government', followers: 95000 },
  { handle: '@almessryoon', name: 'Abdullah AlMesryoon', nameArabic: 'عبدالله المصريون', type: 'influencer', followers: 450000 },
  { handle: '@faisalaljaber', name: 'Faisal AlJaber', nameArabic: 'فيصل الجابر', type: 'influencer', followers: 320000 },
  { handle: '@qabas', name: 'Al Qabas', nameArabic: 'القبس', type: 'news', followers: 1200000 },
  { handle: '@alraimedia', name: 'Al Rai', nameArabic: 'الراي', type: 'news', followers: 980000 },
  { handle: '@KuwaitTimesNews', name: 'Kuwait Times', type: 'news', followers: 215000 },
  { handle: '@NBKGroup', name: 'National Bank of Kuwait', nameArabic: 'بنك الكويت الوطني', type: 'business', followers: 185000 },
  { handle: '@KuwaitZain', name: 'Zain Kuwait', nameArabic: 'زين الكويت', type: 'business', followers: 425000 },
  { handle: '@AgilityLogistics', name: 'Agility Logistics', nameArabic: 'أجيليتي', type: 'business', followers: 95000 },
  { handle: '@dralazmi', name: 'Dr. Abdulaziz Alazmi', nameArabic: 'د. عبدالعزيز العازمي', type: 'influencer', followers: 280000 },
  { handle: '@meshaalhamed', name: 'Meshaal AlHamed', nameArabic: 'مشعل الهامد', type: 'influencer', followers: 520000 },
  { handle: '@bensalamah', name: 'Bader AlSalamah', nameArabic: 'بدر السلامة', type: 'business', followers: 175000 },
  { handle: '@fahadk', name: 'Fahad AlKandari', nameArabic: 'فهد الكندري', type: 'influencer', followers: 390000 },
  { handle: '@KAMCO_invest', name: 'KAMCO Investment', nameArabic: 'كامكو للاستثمار', type: 'business', followers: 45000 },
  { handle: '@BoursaKuwait', name: 'Boursa Kuwait', nameArabic: 'بورصة الكويت', type: 'business', followers: 125000 },
  { handle: '@shuaiba_in', name: 'Shuaiba Industrial', nameArabic: 'الشعيبة الصناعية', type: 'business', followers: 32000 },
  { handle: '@KuwaitStartups', name: 'Kuwait Startups', type: 'business', followers: 68000 },
];

// Digital & Print Newspapers
export const newspapers: Newspaper[] = [
  { id: 'qabas-digital', name: 'Al Qabas', nameArabic: 'القبس', type: 'digital', language: 'arabic' },
  { id: 'rai-digital', name: 'Al Rai', nameArabic: 'الراي', type: 'digital', language: 'arabic' },
  { id: 'kuwait-times', name: 'Kuwait Times', nameArabic: 'كويت تايمز', type: 'digital', language: 'english' },
  { id: 'arab-times', name: 'Arab Times', nameArabic: 'عرب تايمز', type: 'digital', language: 'english' },
  { id: 'aljarida', name: 'Al Jarida', nameArabic: 'الجريدة', type: 'digital', language: 'arabic' },
  { id: 'alanba', name: 'Al Anba', nameArabic: 'الأنباء', type: 'digital', language: 'arabic' },
  { id: 'alseyassah', name: 'Al Seyassah', nameArabic: 'السياسة', type: 'digital', language: 'arabic' },
  { id: 'alwatan', name: 'Al Watan', nameArabic: 'الوطن', type: 'digital', language: 'arabic' },
  { id: 'qabas-print', name: 'Al Qabas Print', nameArabic: 'القبس المطبوعة', type: 'print', language: 'arabic' },
  { id: 'rai-print', name: 'Al Rai Print', nameArabic: 'الراي المطبوعة', type: 'print', language: 'arabic' },
  { id: 'jarida-print', name: 'Al Jarida Print', nameArabic: 'الجريدة المطبوعة', type: 'print', language: 'arabic' },
  { id: 'gazette', name: 'Kuwait Official Gazette', nameArabic: 'الجريدة الرسمية', type: 'print', language: 'both' },
];

// Podcasts
export const podcasts: Podcast[] = [
  { id: 'business-q8', name: 'Business Q8', nameArabic: 'بزنس الكويت', category: 'Business', host: 'Fahad AlGhanim' },
  { id: 'startup-kuwait', name: 'Startup Kuwait', nameArabic: 'ستارت اب الكويت', category: 'Technology', host: 'Sarah AlMutairi' },
  { id: 'tech-talks-kw', name: 'Tech Talks Kuwait', nameArabic: 'حوارات تقنية', category: 'Technology', host: 'Ahmad AlShemari' },
  { id: 'politics-today', name: 'Kuwait Politics Today', nameArabic: 'السياسة اليوم', category: 'Politics', host: 'Dr. Abdullah AlNibari' },
  { id: 'economics-explained', name: 'Economics Explained KW', nameArabic: 'الاقتصاد ببساطة', category: 'Economics', host: 'Maha AlKhalifa' },
  { id: 'invest-smart', name: 'Invest Smart Kuwait', nameArabic: 'استثمار ذكي', category: 'Investment', host: 'Khalid AlRashid' },
  { id: 'future-vision', name: 'Future Vision', nameArabic: 'رؤية المستقبل', category: 'Strategy', host: 'Layla AlQatami' },
  { id: 'market-pulse', name: 'Market Pulse', nameArabic: 'نبض السوق', category: 'Finance', host: 'Yousef AlBahar' },
  { id: 'digital-transformation', name: 'Digital Transformation KW', nameArabic: 'التحول الرقمي', category: 'Technology', host: 'Nasser AlHajri' },
  { id: 'entrepreneur-stories', name: 'Entrepreneur Stories', nameArabic: 'قصص رواد الأعمال', category: 'Business', host: 'Reem AlAwadhi' },
];

// Radio Stations
export const radioStations: RadioStation[] = [
  { id: 'marina-fm', name: 'Marina FM', nameArabic: 'مارينا اف ام', frequency: '88.8 FM' },
  { id: 'kuwait-fm', name: 'Kuwait FM', nameArabic: 'الكويت اف ام', frequency: '99.7 FM' },
  { id: 'radio-kuwait', name: 'Radio Kuwait', nameArabic: 'إذاعة الكويت', frequency: '93.3 FM' },
  { id: 'super-station', name: 'Super Station', nameArabic: 'سوبر ستيشن', frequency: '99.5 FM' },
  { id: 'kuwait-arabic', name: 'Kuwait Arabic Radio', nameArabic: 'إذاعة الكويت العربية', frequency: '96.7 FM' },
];

export const getTotalCost = (): number => {
  return platforms.reduce((sum, p) => sum + p.cost, 0);
};

export const getCostByLayer = () => {
  const truth = platforms.filter(p => p.layer === 'truth').reduce((sum, p) => sum + p.cost, 0);
  const speed = platforms.filter(p => p.layer === 'speed').reduce((sum, p) => sum + p.cost, 0);
  const depth = platforms.filter(p => p.layer === 'depth').reduce((sum, p) => sum + p.cost, 0);
  return { truth, speed, depth };
};

export const getCostByTier = () => {
  const tier1 = platforms.filter(p => p.tier === 1).reduce((sum, p) => sum + p.cost, 0);
  const tier2 = platforms.filter(p => p.tier === 2).reduce((sum, p) => sum + p.cost, 0);
  const tier3 = platforms.filter(p => p.tier === 3).reduce((sum, p) => sum + p.cost, 0);
  return { tier1, tier2, tier3 };
};

