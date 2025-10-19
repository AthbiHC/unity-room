// Real-time data simulation engine

import { platforms, kseCompanies, twitterAccounts, newspapers, tvChannels } from './kuwaitData';

export interface PlatformMetrics {
  platformId: string;
  volume: number; // items processed per minute
  sentiment: number; // -1 to 1
  uptime: number; // 0 to 1
  latency: number; // ms
  accuracy: number; // 0 to 1
  activeNow: boolean;
  lastUpdate: string;
}

export interface ContentItem {
  id: string;
  platformId: string;
  timestamp: Date;
  title: string;
  titleArabic?: string;
  source: string;
  sentiment: number;
  type: 'news' | 'social' | 'financial' | 'official';
  urgent: boolean;
}

export interface Alert {
  id: string;
  timestamp: Date;
  title: string;
  description: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  platforms: string[];
}

// Sample content templates
const contentTemplates = {
  tv: [
    { title: 'Breaking: Parliament session on economic reforms', titleArabic: 'عاجل: جلسة البرلمان حول الإصلاحات الاقتصادية', urgent: true },
    { title: 'Minister discusses digital transformation strategy', titleArabic: 'الوزير يناقش استراتيجية التحول الرقمي', urgent: false },
    { title: 'Oil prices impact on Kuwait economy analyzed', titleArabic: 'تحليل تأثير أسعار النفط على الاقتصاد الكويتي', urgent: false },
    { title: 'New infrastructure projects announced', titleArabic: 'الإعلان عن مشاريع بنية تحتية جديدة', urgent: true },
  ],
  government: [
    { title: 'KUNA: New commercial licensing regulations', titleArabic: 'كونا: لوائح ترخيص تجارية جديدة', urgent: true },
    { title: 'Central Bank announces interest rate decision', titleArabic: 'البنك المركزي يعلن قرار سعر الفائدة', urgent: true },
    { title: 'Ministry of Health: New health initiative', titleArabic: 'وزارة الصحة: مبادرة صحية جديدة', urgent: false },
    { title: 'Parliament approves budget amendments', titleArabic: 'البرلمان يوافق على تعديلات الميزانية', urgent: true },
  ],
  twitter: [
    { title: '@almessryoon: Discussing economic outlook for Q4', titleArabic: 'نناقش التوقعات الاقتصادية للربع الرابع', urgent: false },
    { title: '@MOIKuwait: Traffic updates for major roads', titleArabic: 'تحديثات المرور للطرق الرئيسية', urgent: false },
    { title: '#Kuwait trending: Citizens debate new policy', titleArabic: 'مواطنون يناقشون السياسة الجديدة', urgent: false },
    { title: '@qabas: Breaking news alert shared', titleArabic: 'تنبيه أخبار عاجلة', urgent: true },
  ],
  'digital-news': [
    { title: 'Al Qabas: Investigation into public procurement', titleArabic: 'القبس: تحقيق في المشتريات العامة', urgent: false },
    { title: 'Kuwait Times: Tech sector shows growth', titleArabic: 'كويت تايمز: قطاع التكنولوجيا يظهر نمواً', urgent: false },
    { title: 'Al Rai: Analysis of banking sector performance', titleArabic: 'الراي: تحليل أداء القطاع المصرفي', urgent: false },
    { title: 'Arab Times: Startups secure funding', titleArabic: 'عرب تايمز: شركات ناشئة تحصل على تمويل', urgent: false },
  ],
  podcasts: [
    { title: 'Business Q8: Interview with NBK CEO', titleArabic: 'بزنس الكويت: مقابلة مع رئيس NBK', urgent: false },
    { title: 'Startup Kuwait: Success story of local founder', titleArabic: 'ستارت اب الكويت: قصة نجاح مؤسس محلي', urgent: false },
    { title: 'Market Pulse: Stock market weekly review', titleArabic: 'نبض السوق: مراجعة البورصة الأسبوعية', urgent: false },
  ],
  radio: [
    { title: 'Marina FM: Listener calls on traffic issues', titleArabic: 'مارينا: اتصالات المستمعين حول مشاكل المرور', urgent: false },
    { title: 'Kuwait FM: Morning show discusses education', titleArabic: 'الكويت اف ام: برنامج صباحي يناقش التعليم', urgent: false },
    { title: 'Radio Kuwait: News bulletin update', titleArabic: 'إذاعة الكويت: تحديث نشرة الأخبار', urgent: false },
  ],
  print: [
    { title: 'Al Qabas Print: Front page - Economic reform package', titleArabic: 'القبس المطبوعة: الصفحة الأولى - حزمة إصلاح اقتصادي', urgent: false },
    { title: 'Official Gazette: New decree on investment', titleArabic: 'الجريدة الرسمية: مرسوم جديد حول الاستثمار', urgent: true },
  ],
  stock: [
    { title: 'NBK rises 2.3% on strong earnings', titleArabic: 'NBK يرتفع 2.3٪ على أرباح قوية', urgent: false },
    { title: 'Zain announces dividend distribution', titleArabic: 'زين تعلن توزيع أرباح', urgent: true },
    { title: 'Tech sector outperforms market average', titleArabic: 'قطاع التكنولوجيا يتفوق على متوسط السوق', urgent: false },
  ],
};

// Generate realistic metrics for each platform
export const generatePlatformMetrics = (): Record<string, PlatformMetrics> => {
  const metrics: Record<string, PlatformMetrics> = {};
  
  platforms.forEach(platform => {
    const baseVolume = {
      tv: 78, // segments per minute
      government: 12,
      stock: 200, // updates per minute
      twitter: 850, // tweets per minute
      'digital-news': 25,
      podcasts: 2,
      radio: 15,
      print: 3,
    }[platform.id] || 10;
    
    const baseAccuracy = {
      tv: 0.95,
      government: 0.99,
      stock: 0.98,
      twitter: 0.92,
      'digital-news': 0.94,
      podcasts: 0.95,
      radio: 0.93,
      print: 0.96,
    }[platform.id] || 0.93;

    metrics[platform.id] = {
      platformId: platform.id,
      volume: baseVolume + (Math.random() * 10 - 5), // +/- 5
      sentiment: Math.random() * 0.4 + 0.5, // 0.5 to 0.9 (mostly positive)
      uptime: 0.995 + Math.random() * 0.005, // 99.5% to 100%
      latency: Math.random() * 500 + 100, // 100-600ms
      accuracy: baseAccuracy + (Math.random() * 0.02 - 0.01), // +/- 1%
      activeNow: Math.random() > 0.1, // 90% active
      lastUpdate: new Date().toISOString(),
    };
  });
  
  return metrics;
};

// Generate random content items
export const generateContentItems = (count: number = 10): ContentItem[] => {
  const items: ContentItem[] = [];
  const platformIds = platforms.map(p => p.id);
  
  for (let i = 0; i < count; i++) {
    const platformId = platformIds[Math.floor(Math.random() * platformIds.length)];
    const templates = contentTemplates[platformId as keyof typeof contentTemplates] || [];
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    if (!template) continue;
    
    const type = {
      tv: 'news',
      government: 'official',
      stock: 'financial',
      twitter: 'social',
      'digital-news': 'news',
      podcasts: 'news',
      radio: 'news',
      print: 'official',
    }[platformId] as ContentItem['type'];
    
    items.push({
      id: `${platformId}-${Date.now()}-${i}`,
      platformId,
      timestamp: new Date(Date.now() - Math.random() * 3600000), // Last hour
      title: template.title,
      titleArabic: template.titleArabic,
      source: getRandomSource(platformId),
      sentiment: Math.random() * 2 - 1, // -1 to 1
      type,
      urgent: template.urgent && Math.random() > 0.7,
    });
  }
  
  return items.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

// Get random source name for platform
const getRandomSource = (platformId: string): string => {
  switch (platformId) {
    case 'tv':
      return tvChannels[Math.floor(Math.random() * tvChannels.length)].name;
    case 'government':
      return Math.random() > 0.5 ? 'KUNA' : 'Ministry';
    case 'stock':
      return kseCompanies[Math.floor(Math.random() * Math.min(5, kseCompanies.length))].ticker;
    case 'twitter':
      return twitterAccounts[Math.floor(Math.random() * Math.min(10, twitterAccounts.length))].handle;
    case 'digital-news':
      return newspapers.filter(n => n.type === 'digital')[Math.floor(Math.random() * 4)].name;
    case 'podcasts':
      return 'Business Q8';
    case 'radio':
      return 'Marina FM';
    case 'print':
      return 'Al Qabas Print';
    default:
      return 'Unknown';
  }
};

// Generate alerts based on cross-platform analysis
export const generateAlerts = (): Alert[] => {
  const alerts: Alert[] = [];
  
  const alertTemplates = [
    {
      title: 'Sentiment Gap Detected',
      description: 'TV coverage 85% positive, Twitter only 58% positive. Public sentiment diverging from official narrative.',
      type: 'warning' as const,
      platforms: ['tv', 'twitter'],
    },
    {
      title: 'Stock Market Spike',
      description: 'NBK stock up 3.2% in last 15 minutes. No official announcement yet - investigating.',
      type: 'info' as const,
      platforms: ['stock'],
    },
    {
      title: 'Breaking News Correlation',
      description: 'Government announcement on KUNA now appearing on TV channels. 12-minute delay tracked.',
      type: 'success' as const,
      platforms: ['government', 'tv'],
    },
    {
      title: 'Trending Topic Alert',
      description: '#EconomicReform trending with 15K+ tweets in last hour. Mixed sentiment detected.',
      type: 'info' as const,
      platforms: ['twitter'],
    },
    {
      title: 'Cross-Platform Validation',
      description: 'Policy announcement validated across Government + Stock Market + TV. High confidence.',
      type: 'success' as const,
      platforms: ['government', 'stock', 'tv'],
    },
  ];
  
  // Generate 2-3 random alerts
  const numAlerts = Math.floor(Math.random() * 2) + 2;
  for (let i = 0; i < numAlerts; i++) {
    const template = alertTemplates[Math.floor(Math.random() * alertTemplates.length)];
    alerts.push({
      id: `alert-${Date.now()}-${i}`,
      timestamp: new Date(Date.now() - Math.random() * 1800000), // Last 30 mins
      ...template,
    });
  }
  
  return alerts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

// System-wide statistics
export interface SystemStats {
  totalPlatforms: number;
  activePlatforms: number;
  totalCost: number;
  totalVolume: number; // items per day
  avgSentiment: number;
  avgAccuracy: number;
  avgUptime: number;
  layerBreakdown: {
    truth: { platforms: number; cost: number };
    speed: { platforms: number; cost: number };
    depth: { platforms: number; cost: number };
  };
}

export const generateSystemStats = (metrics: Record<string, PlatformMetrics>): SystemStats => {
  const metricsArray = Object.values(metrics);
  const activePlatforms = metricsArray.filter(m => m.activeNow).length;
  
  const layerBreakdown = {
    truth: { 
      platforms: platforms.filter(p => p.layer === 'truth').length,
      cost: platforms.filter(p => p.layer === 'truth').reduce((sum, p) => sum + p.cost, 0),
    },
    speed: {
      platforms: platforms.filter(p => p.layer === 'speed').length,
      cost: platforms.filter(p => p.layer === 'speed').reduce((sum, p) => sum + p.cost, 0),
    },
    depth: {
      platforms: platforms.filter(p => p.layer === 'depth').length,
      cost: platforms.filter(p => p.layer === 'depth').reduce((sum, p) => sum + p.cost, 0),
    },
  };
  
  return {
    totalPlatforms: platforms.length,
    activePlatforms,
    totalCost: platforms.reduce((sum, p) => sum + p.cost, 0),
    totalVolume: Math.floor(metricsArray.reduce((sum, m) => sum + m.volume, 0) * 60 * 24), // per day
    avgSentiment: metricsArray.reduce((sum, m) => sum + m.sentiment, 0) / metricsArray.length,
    avgAccuracy: metricsArray.reduce((sum, m) => sum + m.accuracy, 0) / metricsArray.length,
    avgUptime: metricsArray.reduce((sum, m) => sum + m.uptime, 0) / metricsArray.length,
    layerBreakdown,
  };
};

// Simulation class for continuous updates
export class DataSimulator {
  private metrics: Record<string, PlatformMetrics>;
  private content: ContentItem[];
  private alerts: Alert[];
  private updateInterval: number;
  private intervalId?: number;
  
  constructor(updateInterval: number = 2000) {
    this.metrics = generatePlatformMetrics();
    this.content = generateContentItems(20);
    this.alerts = generateAlerts();
    this.updateInterval = updateInterval;
  }
  
  start(onUpdate: (data: { metrics: Record<string, PlatformMetrics>; content: ContentItem[]; alerts: Alert[] }) => void) {
    this.intervalId = window.setInterval(() => {
      // Update metrics slightly
      Object.keys(this.metrics).forEach(platformId => {
        const m = this.metrics[platformId];
        m.volume += (Math.random() - 0.5) * 2;
        m.sentiment += (Math.random() - 0.5) * 0.05;
        m.sentiment = Math.max(-1, Math.min(1, m.sentiment));
        m.latency += (Math.random() - 0.5) * 50;
        m.latency = Math.max(50, Math.min(1000, m.latency));
        m.lastUpdate = new Date().toISOString();
        
        // Occasionally toggle active status
        if (Math.random() > 0.95) {
          m.activeNow = !m.activeNow;
        }
      });
      
      // Add new content item occasionally
      if (Math.random() > 0.7) {
        const newItems = generateContentItems(1);
        this.content = [...newItems, ...this.content].slice(0, 50); // Keep last 50
      }
      
      // Add new alert occasionally
      if (Math.random() > 0.9) {
        const newAlerts = generateAlerts();
        if (newAlerts.length > 0) {
          this.alerts = [newAlerts[0], ...this.alerts].slice(0, 10); // Keep last 10
        }
      }
      
      onUpdate({
        metrics: this.metrics,
        content: this.content,
        alerts: this.alerts,
      });
    }, this.updateInterval);
  }
  
  stop() {
    if (this.intervalId !== undefined) {
      clearInterval(this.intervalId);
    }
  }
  
  getMetrics() {
    return this.metrics;
  }
  
  getContent() {
    return this.content;
  }
  
  getAlerts() {
    return this.alerts;
  }
}

