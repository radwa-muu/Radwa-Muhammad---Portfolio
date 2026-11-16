import React, { createContext, useContext } from 'react';
import {
  SERVICES_TIMELINE,
  CLIENTS_DATA,
  SELECTED_WORK_ITEMS,
  SOCIAL_CAMPAIGNS,
  VIDEO_SCRIPTS,
  CONTENT_STRATEGY_DATA,
  DEFAULT_TESTIMONIALS,
  DEFAULT_SOCIAL_LINKS,
  ServiceItem,
  ClientItem,
  SocialCampaign,
  VideoScript,
  TestimonialItem,
  SocialLinkItem,
} from '../utils/portfolioData';

export interface SelectedWorkItem {
  number: string;
  titleEn: string;
  titleAr: string;
  targetId: string;
}

export interface StrategyPillar {
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
}

export interface StrategyData {
  brandNameEn: string;
  brandNameAr: string;
  subEn: string;
  subAr: string;
  sectionSubtitleEn: string;
  sectionSubtitleAr: string;
  pillars: StrategyPillar[];
  workflow: Array<{
    stepTitleEn: string;
    stepTitleAr: string;
    descEn: string;
    descAr: string;
  }>;
}

export interface AboutData {
  introEn: string;
  descEn: string;
  introAr: string;
  descAr: string;
}

export interface HeroData {
  titleEn: string;
  titleAr: string;
  subtitle: string;
  ctaLabel: string;
}

export interface ContactData {
  badgeEn: string;
  badgeAr: string;
  ctaEn: string;
  ctaAr: string;
  missionEn: string;
  missionAr: string;
  email: string;
  signOffEn: string;
  signOffAr: string;
  signOffRole: string;
  socialLinks: SocialLinkItem[];
}

export interface PortfolioData {
  hero: HeroData;
  about: AboutData;
  services: ServiceItem[];
  clients: ClientItem[];
  selectedWork: SelectedWorkItem[];
  socialCampaigns: Record<string, SocialCampaign>;
  videoScripts: VideoScript[];
  contentStrategy: StrategyData;
  testimonials: TestimonialItem[];
  contact: ContactData;
}

const DEFAULT_DATA: PortfolioData = {
  hero: {
    titleEn: 'PORTFOLIO',
    titleAr: 'ملـف أعمــالي',
    subtitle: 'RADWA MUHAMMAD | CONTENT MARKETER',
    ctaLabel: 'Explore Selected Work | نماذج الأعمال',
  },
  about: {
    introEn: 'Content Marketer with 3 years of experience in content creation, content strategy, and marketing strategy.',
    descEn:
      'I combine creative thinking with strategic planning to develop ideas and content that reflect each brand’s identity, align with its goals, and meet its audience’s needs, from strategy development and concept creation to content preparation and execution.',
    introAr: 'مسوّقة محتوى بخبرة 3 سنوات في صناعة المحتوى، واستراتيجيات المحتوى والتسويق.',
    descAr:
      'أجمع بين التفكير الإبداعي والتخطيط الاستراتيجي لتطوير أفكار ومحتوى تعكس هوية كل علامة تجارية، وتتوافق مع أهدافها واحتياجات جمهورها، بدءًا من بناء الاستراتيجية وتطوير الفكرة، وصولًا إلى إعداد المحتوى وتجهيزه للتنفيذ.',
  },
  services: SERVICES_TIMELINE,
  clients: CLIENTS_DATA,
  selectedWork: SELECTED_WORK_ITEMS,
  socialCampaigns: SOCIAL_CAMPAIGNS,
  videoScripts: VIDEO_SCRIPTS,
  contentStrategy: {
    ...CONTENT_STRATEGY_DATA,
    sectionSubtitleEn: 'Data-backed storytelling, channel distribution, and customer retention architectures.',
    sectionSubtitleAr: 'هندسة سرد المحتوى القائم على دراسة الجمهور، وبناء الثقة، وزيادة المبيعات والولاء للعلامة التجارية.',
    workflow: [
      {
        stepTitleEn: '01. RESEARCH & AUDIT',
        stepTitleAr: 'دراسة السوق والمنافسين',
        descEn: 'Analyzing competitor messaging, audience search queries, and seasonal natural remedy demand in Egypt.',
        descAr: 'تحليل لغة المنافسين، ورصد الأسئلة الأكثر بحثًا عن المنتجات الطبيعية، وتحديد فجوات المحتوى.',
      },
      {
        stepTitleEn: '02. CONTENT CALENDAR & FORMATS',
        stepTitleAr: 'جدولة النشر وتنوع القوالب',
        descEn: 'Structured 30-day editorial calendar blending educational reels, interactive carousels, and client before/after posts.',
        descAr: 'جدول شهري يوازن بين ريلز التوعية السريعة، وكاروسيل الاستخدامات، ومنشورات التقييمات وقصص العملاء.',
      },
      {
        stepTitleEn: '03. PERFORMANCE & CONVERSION',
        stepTitleAr: 'قياس الأثر وزيادة التحويلات',
        descEn: 'Directing social traffic to landing pages, monitoring DM consultation conversions, and optimizing hooks.',
        descAr: 'توجيه التفاعل لرسائل الصفحة والطلب الفوري، ومراجعة معدلات التحويل وتطوير الخطافات الافتتاحية.',
      },
    ],
  },
  testimonials: DEFAULT_TESTIMONIALS,
  contact: {
    badgeEn: 'AVAILABLE FOR STRATEGIC PROJECTS & CONTENT CREATION',
    badgeAr: 'متاحة للمشاريع الاستراتيجية',
    ctaEn: "LET'S CREATE COMPELLING CONTENT TOGETHER",
    ctaAr: 'لنصنع معًا محتوى استثنائيًا يبني علامتك',
    missionEn:
      'Combining creative storytelling with commercial strategic planning to build brands that capture attention and drive sustainable business growth.',
    missionAr:
      'أجمع بين التفكير الإبداعي والتخطيط الاستراتيجي لتطوير أفكار ومحتوى يعكس هوية كل علامة تجارية ويتوافق مع أهدافها وطموحاتها السوقية.',
    email: 'radwa.work30@gmail.com',
    signOffEn: 'RADWA MUHAMMAD',
    signOffAr: 'رضـــوى محمــــد',
    signOffRole: 'CONTENT MARKETER • مسوّقة محتوى',
    socialLinks: DEFAULT_SOCIAL_LINKS,
  },
};

interface PortfolioContextValue {
  data: PortfolioData;
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <PortfolioContext.Provider value={{ data: DEFAULT_DATA }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export function usePortfolio(): PortfolioContextValue {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return ctx;
}
