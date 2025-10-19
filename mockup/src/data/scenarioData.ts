// $500M Technology Fund Scenario - Real-world timeline from SUMMARY.md

export interface ScenarioEvent {
  id: string;
  time: string;
  timestamp: number; // minutes from start
  platformId: string;
  title: string;
  titleArabic: string;
  description: string;
  sentiment: number; // -1 to 1
  impact: 'low' | 'medium' | 'high' | 'critical';
  data?: any;
}

export interface ScenarioInsight {
  id: string;
  time: string;
  timestamp: number;
  type: 'validation' | 'gap' | 'correlation' | 'warning' | 'success';
  title: string;
  description: string;
  platforms: string[];
}

// Timeline: Government announces $500M technology fund
export const techFundScenario: ScenarioEvent[] = [
  // 9:00 AM - Government Announcement (FIRST TO KNOW)
  {
    id: 'gov-1',
    time: '9:00 AM',
    timestamp: 0,
    platformId: 'government',
    title: 'Government Announces $500M Technology Fund',
    titleArabic: 'الحكومة تعلن عن صندوق تكنولوجيا بقيمة 500 مليون دولار',
    description: 'KUNA: Ministry of Finance announces new $500M fund to support technology startups and digital transformation initiatives in Kuwait.',
    sentiment: 1.0,
    impact: 'critical',
    data: {
      source: 'KUNA',
      ministry: 'Ministry of Finance',
      amount: 500000000,
      currency: 'USD',
    },
  },
  
  // 9:30 AM - Stock Market Reaction (MARKET VALIDATES)
  {
    id: 'stock-1',
    time: '9:30 AM',
    timestamp: 30,
    platformId: 'stock',
    title: 'Tech Stocks Rally on Fund News',
    titleArabic: 'أسهم التكنولوجيا ترتفع بعد إعلان الصندوق',
    description: 'Technology sector stocks surge following fund announcement. Humansoft +3.2%, eManagement +2.8%, KAMCO +1.9%',
    sentiment: 0.9,
    impact: 'high',
    data: {
      sectorGain: 2.1,
      topMovers: [
        { ticker: 'HMNSFT', name: 'Humansoft', change: 3.2 },
        { ticker: 'EMNGMT', name: 'eManagement', change: 2.8 },
        { ticker: 'KAMCO', name: 'KAMCO Investment', change: 1.9 },
      ],
      volumeIncrease: 185,
      marketCapAdded: 85000000,
    },
  },

  // 11:00 AM - TV Coverage Begins (MASS AMPLIFICATION)
  {
    id: 'tv-1',
    time: '11:00 AM',
    timestamp: 120,
    platformId: 'tv',
    title: 'Major TV Coverage: Tech Fund Initiative',
    titleArabic: 'تغطية إعلامية واسعة لمبادرة الصندوق التقني',
    description: 'All 6 channels cover the announcement. Kuwait TV interviews Minister of Finance. Al Jazeera features tech entrepreneur perspectives.',
    sentiment: 0.92,
    impact: 'high',
    data: {
      channels: 6,
      segments: 12,
      guestExperts: 4,
      averageSentiment: 0.92,
      reach: '2.5M viewers',
    },
  },

  {
    id: 'tv-2',
    time: '11:15 AM',
    timestamp: 135,
    platformId: 'tv',
    title: 'Minister Interview: "Supporting Innovation"',
    titleArabic: 'مقابلة الوزير: "دعم الابتكار"',
    description: 'Minister of Finance explains fund goals: "We aim to fund 30-40 startups in Year 1, focusing on AI, fintech, and digital services."',
    sentiment: 1.0,
    impact: 'high',
  },

  // 11:30 AM - Digital News Analysis (HEALTHY SCRUTINY)
  {
    id: 'news-1',
    time: '11:30 AM',
    timestamp: 150,
    platformId: 'digital-news',
    title: 'Questions Emerge on Selection Process',
    titleArabic: 'تساؤلات حول عملية الاختيار',
    description: 'Al Qabas: "Who Will Decide Fund Recipients?" Article raises questions about transparency and selection criteria.',
    sentiment: 0.6,
    impact: 'medium',
    data: {
      outlet: 'Al Qabas',
      concerns: ['transparency', 'selection criteria', 'accountability'],
    },
  },

  {
    id: 'news-2',
    time: '11:45 AM',
    timestamp: 165,
    platformId: 'digital-news',
    title: 'Kuwait Times: International Comparison',
    titleArabic: 'كويت تايمز: مقارنة دولية',
    description: 'Kuwait Times compares with UAE and Saudi tech funds, notes Kuwait allocating similar per-capita amounts.',
    sentiment: 0.7,
    impact: 'medium',
  },

  // 3:00 PM - Twitter Reaction (SENTIMENT GAP DETECTED!)
  {
    id: 'twitter-1',
    time: '3:00 PM',
    timestamp: 360,
    platformId: 'twitter',
    title: 'Mixed Twitter Sentiment: 60% Positive',
    titleArabic: 'ردود فعل متباينة على تويتر: 60٪ إيجابية',
    description: '50,000+ tweets analyzed. 60% positive ("Great initiative!"), 40% skeptical ("Where will money go?", "Who benefits?")',
    sentiment: 0.2,
    impact: 'high',
    data: {
      totalTweets: 52430,
      positiveSentiment: 0.60,
      negativeSentiment: 0.15,
      neutralSentiment: 0.25,
      topHashtags: ['#TechFundKuwait', '#Innovation', '#StartupKW'],
      concerns: ['transparency', 'fairness', 'application process'],
    },
  },

  {
    id: 'twitter-2',
    time: '3:30 PM',
    timestamp: 390,
    platformId: 'twitter',
    title: 'Influencers Weigh In',
    titleArabic: 'المؤثرون يعلقون',
    description: '@almessryoon: "Good step, but need clear process" (450K followers). @fahadk: "Hope it reaches real innovators" (390K followers)',
    sentiment: 0.5,
    impact: 'medium',
  },

  // 6:00 PM - Radio Call-ins (INFORMATION GAP)
  {
    id: 'radio-1',
    time: '6:00 PM',
    timestamp: 540,
    platformId: 'radio',
    title: 'Radio Listeners Ask: "How Do I Apply?"',
    titleArabic: 'مستمعو الراديو يسألون: "كيف أتقدم بطلب؟"',
    description: 'Marina FM drive-time show flooded with calls. Most common question: "How do I apply?" Information gap detected.',
    sentiment: 0.7,
    impact: 'high',
    data: {
      station: 'Marina FM',
      calls: 145,
      topQuestions: [
        'How to apply?',
        'Eligibility criteria?',
        'When does it open?',
        'Can individuals apply or only companies?',
      ],
    },
  },

  {
    id: 'radio-2',
    time: '6:20 PM',
    timestamp: 560,
    platformId: 'radio',
    title: 'Small Business Owners Express Hope',
    titleArabic: 'أصحاب الأعمال الصغيرة يعبرون عن الأمل',
    description: 'Kuwait FM: Small business owners call in expressing excitement but concern about competing with larger companies.',
    sentiment: 0.65,
    impact: 'medium',
  },

  // Next Day 8:00 AM - Print Analysis (IN-DEPTH)
  {
    id: 'print-1',
    time: 'Day 2, 8:00 AM',
    timestamp: 1380, // Next day
    platformId: 'print',
    title: 'Print Edition: Deep Analysis',
    titleArabic: 'الصحف المطبوعة: تحليل معمق',
    description: 'Al Qabas Print: Full-page analysis comparing with international tech funds. Includes expert economist opinions.',
    sentiment: 0.75,
    impact: 'high',
    data: {
      pageCount: 2,
      experts: 3,
      comparisons: ['UAE Khalifa Fund', 'Saudi Misk Foundation', 'Qatar Science & Tech Park'],
    },
  },

  {
    id: 'print-2',
    time: 'Day 2, 8:00 AM',
    timestamp: 1380,
    platformId: 'print',
    title: 'Official Gazette: Legal Framework',
    titleArabic: 'الجريدة الرسمية: الإطار القانوني',
    description: 'Kuwait Official Gazette publishes legal decree establishing fund structure and governance framework.',
    sentiment: 0.8,
    impact: 'critical',
  },

  // Day 2, 10:00 AM - Podcast Expert Analysis
  {
    id: 'podcast-1',
    time: 'Day 2, 10:00 AM',
    timestamp: 1500,
    platformId: 'podcasts',
    title: 'Expert Predicts 30-40 Startups Year 1',
    titleArabic: 'خبير يتوقع 30-40 شركة ناشئة في السنة الأولى',
    description: 'Business Q8 Podcast: VC expert Fahad AlGhanim analyzes fund structure, predicts 30-40 startups funded in Year 1 with $10-15M average.',
    sentiment: 0.85,
    impact: 'high',
    data: {
      podcast: 'Business Q8',
      expert: 'Fahad AlGhanim',
      predictions: {
        year1Startups: '30-40',
        avgFunding: '10-15M USD',
        sectors: ['AI', 'Fintech', 'Healthtech', 'E-commerce'],
        jobsCreated: '500-800',
      },
    },
  },
];

// Intelligence Insights Generated from Cross-Platform Analysis
export const techFundInsights: ScenarioInsight[] = [
  {
    id: 'insight-1',
    time: '9:30 AM',
    timestamp: 30,
    type: 'validation',
    title: 'Initiative Validated: Market Reacts Positively',
    description: 'Stock market surge confirms initiative credibility. $85M market cap added to tech sector within 30 minutes.',
    platforms: ['government', 'stock'],
  },
  {
    id: 'insight-2',
    time: '3:00 PM',
    timestamp: 360,
    type: 'gap',
    title: 'SENTIMENT GAP DETECTED',
    description: 'Major disconnect: Official/TV sentiment 92-100% positive, Twitter only 60% positive. Public trust concerns identified.',
    platforms: ['tv', 'twitter', 'government'],
  },
  {
    id: 'insight-3',
    time: '6:00 PM',
    timestamp: 540,
    type: 'warning',
    title: 'INFORMATION GAP: Public Unclear on Application',
    description: 'Radio calls reveal public doesn\'t know how to apply. Government needs to release application guidelines urgently.',
    platforms: ['radio', 'government'],
  },
  {
    id: 'insight-4',
    time: '11:30 AM',
    timestamp: 150,
    type: 'correlation',
    title: 'Digital News Raises Transparency Questions',
    description: 'Healthy scrutiny from journalists. Questions align with Twitter concerns about selection process fairness.',
    platforms: ['digital-news', 'twitter'],
  },
  {
    id: 'insight-5',
    time: 'Day 2, 10:00 AM',
    timestamp: 1500,
    type: 'success',
    title: 'Expert Consensus: Good Initiative',
    description: 'Cross-platform expert analysis converges: Initiative well-structured, execution will be key. 30-40 startups Year 1 realistic.',
    platforms: ['podcasts', 'print', 'digital-news'],
  },
];

// Actionable Recommendations
export const techFundRecommendations = [
  {
    audience: 'Government',
    actions: [
      'Release detailed application guidelines within 48 hours',
      'Address transparency concerns proactively in public statement',
      'Establish clear, objective selection criteria',
      'Create FAQ page answering common questions from radio/social',
    ],
  },
  {
    audience: 'Investors',
    actions: [
      'Tech sector momentum confirmed - safe to invest',
      'Focus on companies in AI, fintech, healthtech sectors',
      'Market validated initiative with $85M cap increase',
      'Monitor fund recipients for investment opportunities',
    ],
  },
  {
    audience: 'Startups',
    actions: [
      'Prepare applications immediately',
      'Have backup funding plans (competition will be high)',
      'Realistic to expect $10-15M funding per startup',
      'Focus on sectors: AI, Fintech, Digital Services, Healthtech',
    ],
  },
  {
    audience: 'Media',
    actions: [
      'Continue investigative coverage on selection process',
      'Track fund outcomes and accountability',
      'Interview successful and unsuccessful applicants',
      'Compare Kuwait results with UAE/Saudi similar programs',
    ],
  },
];

export const getScenarioSummary = () => {
  return {
    title: '$500M Technology Fund Announcement',
    duration: '1.5 days',
    platforms: 8,
    events: techFundScenario.length,
    insights: techFundInsights.length,
    keyMetrics: {
      marketCapAdded: '$85M',
      tweetsAnalyzed: '52,430+',
      tvSegments: 12,
      sentimentGap: '32%', // 92% vs 60%
      informationGapDetected: true,
      timeAdvantage: '2 hours', // Gov 9am, TV 11am
    },
  };
};

