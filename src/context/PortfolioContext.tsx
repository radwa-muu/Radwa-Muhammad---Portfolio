import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
  SocialPost,
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

export interface EditablePortfolioData {
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

const STORAGE_KEY = 'radwa_portfolio_editable_v1';

const DEFAULT_DATA: EditablePortfolioData = {
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

function mergeSavedWithDefaults(parsed: Partial<EditablePortfolioData>): EditablePortfolioData {
  const mergedCampaigns = parsed.socialCampaigns
    ? { ...DEFAULT_DATA.socialCampaigns, ...parsed.socialCampaigns }
    : DEFAULT_DATA.socialCampaigns;

  const LEGACY_TO_HD_IMAGE_MAP: Record<string, string> = {
    '/assets/cropped/wh_1.webp': '/assets/aistudio/1915590e-ed41-4da8-b79a-4c6672bfe413_2717de62.jpg',
    '/assets/hd/wh_1.webp': '/assets/aistudio/1915590e-ed41-4da8-b79a-4c6672bfe413_2717de62.jpg',
    '/assets/cropped/wh_2.webp': '/assets/aistudio/9d6bb8c5-e7d2-4c0f-9ae4-573662f3d418_8fe325c5.jpg',
    '/assets/hd/wh_2.webp': '/assets/aistudio/9d6bb8c5-e7d2-4c0f-9ae4-573662f3d418_8fe325c5.jpg',
    '/assets/cropped/wh_3.webp': '/assets/aistudio/8b2c844b-cbd5-4232-b7d9-8265de955850_ee37f58e.jpg',
    '/assets/hd/wh_3.webp': '/assets/aistudio/8b2c844b-cbd5-4232-b7d9-8265de955850_ee37f58e.jpg',
    '/assets/cropped/zd_2.webp': '/assets/aistudio/7f3aed8d-f08a-44c1-aebf-1446d7d58672_e7737933.jpg',
    '/assets/hd/zd_2.webp': '/assets/aistudio/7f3aed8d-f08a-44c1-aebf-1446d7d58672_e7737933.jpg',
    '/assets/cropped/zd_1.webp': '/assets/aistudio/image_2308e5c6.webp',
    '/assets/cropped/zd_3.webp': '/assets/aistudio/image_56af5d47.webp',
    '/assets/cropped/fr_1.webp': '/assets/aistudio/f4d31248-dd5b-4466-a5ad-cb8150a91c6d_326f2431.jpg',
    '/assets/cropped/fr_2.webp': '/assets/aistudio/5f61fe28-f7aa-4a75-83e7-2a26cd7f4032_dc1975f7.jpg',
    '/assets/cropped/fr_3.webp': '/assets/aistudio/a57834cc-a837-4aa0-90fe-53024ae9eead_cfff6cfe.jpg',
    '/assets/cropped/cm_1.webp': '/assets/aistudio/341b26dc-b50a-48eb-a626-59e82248730b_86aa8a98.jpg',
    '/assets/cropped/cm_2.webp': '/assets/aistudio/3cdac1f6-7f50-4e1b-bf83-aa836ebcb95f_77186b26.jpg',
    '/assets/cropped/cm_3.webp': '/assets/aistudio/17c0d76d-df4e-46f1-bcc5-6f78458a1927_bf0e51fb.jpg',
    '/assets/cropped/mm_23feb.webp': '/assets/aistudio/7cbcbfef-04bd-4390-aa23-05d07971c793_4809510e.jpg',
    '/assets/cropped/mm_24feb.webp': '/assets/aistudio/900d418d-bde3-4871-b7d2-f93bf28ac290_eee3611c.jpg',
    '/assets/cropped/mm_25feb.webp': '/assets/aistudio/134740a9-e7eb-4612-b7e0-6bf6815171d1_08729667.jpg',
    '/assets/cropped/mm_26feb.webp': '/assets/aistudio/0fef113b-aaa0-46d4-a607-66b26ff547a9_e9705921.jpg',
    '/assets/cropped/mm_28feb.webp': '/assets/aistudio/988b152b-8783-44aa-b300-703da3591df2_d48b60a3.jpg',
  };

  const normalizeCachedAssetUrl = (url?: string): string | undefined => {
    if (!url) return url;
    if (LEGACY_TO_HD_IMAGE_MAP[url]) return LEGACY_TO_HD_IMAGE_MAP[url];
    if (url.startsWith('/assets/') && url.endsWith('.png')) {
      return url.replace(/\.png$/i, '.webp');
    }
    return url;
  };

  const normalizedCampaigns = Object.fromEntries(
    Object.entries(mergedCampaigns).map(([key, camp]) => {
      const defaultCamp = DEFAULT_DATA.socialCampaigns[key];
      const normalizedPosts = Array.isArray(camp.posts)
        ? camp.posts.map((post) => {
            const defaultPost = defaultCamp?.posts.find((dp) => dp.id === post.id);
            const isDefaultAistudioAsset = Boolean(defaultPost?.imageUrl?.startsWith('/assets/aistudio/'));
            const isUserUploadedDataUrl = Boolean(post.imageUrl?.startsWith('data:'));
            const upgradedImageUrl =
              normalizeCachedAssetUrl(post.imageUrl) ||
              (isDefaultAistudioAsset && !isUserUploadedDataUrl
                ? defaultPost!.imageUrl
                : post.imageUrl);

            const hasUserUploadedCarousel = Boolean(
              post.carouselImages?.some((u) => u.startsWith('data:'))
            );
            const shouldUpgradeCarousel =
              Boolean(defaultPost?.carouselImages?.length) &&
              (!post.carouselImages ||
                post.carouselImages.length === 0 ||
                (defaultPost!.carouselImages![0]?.startsWith('/assets/aistudio/') &&
                  !hasUserUploadedCarousel));

            const hasUserUploadedSlides = Boolean(
              post.slides?.some((s) => s.imageUrl?.startsWith('data:'))
            );

            const hasUnquotedLegacyHook =
              defaultPost &&
              post.hookAr &&
              defaultPost.hookAr === `«${post.hookAr}»`;

            return {
              ...post,
              imageUrl: upgradedImageUrl,
              hookAr: hasUnquotedLegacyHook ? defaultPost.hookAr : post.hookAr,
              fullCaptionAr: post.fullCaptionAr ?? defaultPost?.fullCaptionAr,
              carouselImages: shouldUpgradeCarousel
                ? defaultPost!.carouselImages
                : post.carouselImages,
              peekImages: shouldUpgradeCarousel ? defaultPost!.peekImages : post.peekImages,
              slidesCount: shouldUpgradeCarousel
                ? defaultPost!.slidesCount
                : post.slidesCount ?? defaultPost?.slidesCount,
              metaInfoEn:
                post.metaInfoEn === 'Carousel' && defaultPost?.metaInfoEn
                  ? defaultPost.metaInfoEn
                  : post.metaInfoEn,
              slides:
                defaultPost?.slides &&
                !hasUserUploadedSlides &&
                (!post.slides ||
                  post.slides.some((s) => !s.imageUrl || !s.imageUrl.startsWith('/assets/aistudio/')))
                  ? defaultPost.slides
                  : post.slides ?? defaultPost?.slides,
            };
          })
        : defaultCamp?.posts || [];

      let orderedPosts = normalizedPosts;
      if (key === 'filmrent') {
        const ids = normalizedPosts.map((p) => p.id);
        if (ids.join(',') === 'fr-1,fr-2,fr-3') {
          orderedPosts = [normalizedPosts[0], normalizedPosts[2], normalizedPosts[1]];
        }
      } else if (key === 'creativemark') {
        const ids = normalizedPosts.map((p) => p.id);
        if (ids.join(',') === 'cm-1,cm-2,cm-3') {
          orderedPosts = [normalizedPosts[1], normalizedPosts[0], normalizedPosts[2]];
        }
      } else if (key === 'elhoofy') {
        const ids = normalizedPosts.map((p) => p.id);
        if (ids.join(',') === 'eh-1,eh-2,eh-3') {
          orderedPosts = [normalizedPosts[0], normalizedPosts[2], normalizedPosts[1]];
        }
      }

      return [
        key,
        {
          ...camp,
          brandNameEn:
            key === 'elhoofy' && camp.brandNameEn === 'DR. AHMED EL-HOOFY'
              ? 'DR. Ahmed'
              : camp.brandNameEn,
          campaignLabelEn: camp.campaignLabelEn === 'The brand' ? 'The client' : camp.campaignLabelEn,
          campaignLabelAr: camp.campaignLabelAr === 'العلامة' ? 'العميل' : camp.campaignLabelAr,
          brandUrl: camp.brandUrl || defaultCamp?.brandUrl,
          posts: orderedPosts,
        },
      ];
    })
  );

  const normalizedVideoScripts = (() => {
    if (!Array.isArray(parsed.videoScripts)) return DEFAULT_DATA.videoScripts;
    const savedById = new Map(parsed.videoScripts.map((s) => [s.id, s]));
    const needsSylvanNumMigration =
      savedById.get('vid-s1')?.videoNum === '01' && savedById.get('vid-s2')?.videoNum === '02';

    const merged = DEFAULT_DATA.videoScripts.map((defScript) => {
      const saved = savedById.get(defScript.id);
      if (!saved) return defScript;
      const wasPlaceholderWithoutVideo = !saved.videoSrc && Boolean(defScript.videoSrc);
      const wasLegacyOrHeavyW3 =
        defScript.id === 'vid-w3' &&
        (saved.videoSrc ===
          '/assets/aistudio/____-__-_____-___-_____-____-______-_________-webbo_Erp-erp-______________cc422833.mp4' ||
          saved.videoSrc ===
            '/assets/aistudio/_______-_________-___-________-___ERP_-________________-____________-____________-_________-________-_____-Webbo-Technology-Services_1_96cf52d6.mp4');
      if (wasPlaceholderWithoutVideo || wasLegacyOrHeavyW3) {
        return {
          ...defScript,
        };
      }
      const migratedSylvanPatch =
        needsSylvanNumMigration && (defScript.id === 'vid-s1' || defScript.id === 'vid-s2')
          ? {
              videoNum: defScript.videoNum,
              titleEn: defScript.titleEn,
              titleAr: defScript.titleAr,
            }
          : {};
      return {
        ...defScript,
        ...saved,
        ...migratedSylvanPatch,
        videoSrc: saved.videoSrc || defScript.videoSrc,
        posterImg: saved.posterImg || defScript.posterImg,
        editorNotesAr: saved.editorNotesAr ?? defScript.editorNotesAr,
      };
    });
    // Preserve any user-created custom scripts beyond defaults
    const defaultIds = new Set(DEFAULT_DATA.videoScripts.map((s) => s.id));
    const extras = parsed.videoScripts.filter((s) => !defaultIds.has(s.id));
    return [...merged, ...extras];
  })();

  const normalizedSelectedWork = Array.isArray(parsed.selectedWork)
    ? parsed.selectedWork.map((item) => {
        if (item.number === '03' && item.targetId === 'contact') {
          return { ...item, targetId: 'motion-scripts' };
        }
        if (item.number === '04' && item.targetId === 'contact') {
          return { ...item, targetId: 'company-profile' };
        }
        if (item.number === '06' && item.targetId === 'contact') {
          return { ...item, targetId: 'marketing-plan' };
        }
        return item;
      })
    : DEFAULT_DATA.selectedWork;

  return {
    hero: { ...DEFAULT_DATA.hero, ...(parsed.hero || {}) },
    about: { ...DEFAULT_DATA.about, ...(parsed.about || {}) },
    services: Array.isArray(parsed.services) ? parsed.services : DEFAULT_DATA.services,
    clients: Array.isArray(parsed.clients) ? parsed.clients : DEFAULT_DATA.clients,
    selectedWork: normalizedSelectedWork,
    socialCampaigns: normalizedCampaigns,
    videoScripts: normalizedVideoScripts,
    contentStrategy: parsed.contentStrategy
      ? {
          ...DEFAULT_DATA.contentStrategy,
          ...parsed.contentStrategy,
          pillars: Array.isArray(parsed.contentStrategy.pillars)
            ? parsed.contentStrategy.pillars
            : DEFAULT_DATA.contentStrategy.pillars,
          workflow: Array.isArray(parsed.contentStrategy.workflow)
            ? parsed.contentStrategy.workflow
            : DEFAULT_DATA.contentStrategy.workflow,
        }
      : DEFAULT_DATA.contentStrategy,
    testimonials: (() => {
      const legacyIds = new Set(['rev-niesta', 'rev-asas', 'rev-webbo', 'rev-romarin']);
      if (!Array.isArray(parsed.testimonials) || parsed.testimonials.length === 0) {
        return DEFAULT_DATA.testimonials;
      }
      // Upgrade previously seeded text-only defaults cleanly to the real chat screenshots while preserving user uploads/custom entries
      const hasOnlyLegacyDefaults = parsed.testimonials.every(
        (t) => legacyIds.has(t.id) && !t.screenshotUrl
      );
      if (hasOnlyLegacyDefaults) {
        return DEFAULT_DATA.testimonials;
      }
      const nonLegacyUserEntries = parsed.testimonials.filter((t) => !legacyIds.has(t.id) || Boolean(t.screenshotUrl));
      const existingIds = new Set(nonLegacyUserEntries.map((t) => t.id));
      const missingDefaults = DEFAULT_DATA.testimonials.filter((def) => !existingIds.has(def.id));
      return [...missingDefaults, ...nonLegacyUserEntries];
    })(),
    contact: {
      ...DEFAULT_DATA.contact,
      ...(parsed.contact || {}),
      socialLinks: (() => {
        const savedLinks = parsed.contact?.socialLinks;
        if (!Array.isArray(savedLinks) || savedLinks.length === 0) {
          return DEFAULT_DATA.contact.socialLinks;
        }
        const hasLegacyLinkedinOrEmpty = savedLinks.some(
          (s) => s.id === 'soc-linkedin' || !s.url
        );
        if (hasLegacyLinkedinOrEmpty) {
          return DEFAULT_DATA.contact.socialLinks;
        }
        return savedLinks;
      })(),
    },
  };
}

interface PortfolioContextValue {
  data: EditablePortfolioData;
  isEditMode: boolean;
  setIsEditMode: (v: boolean) => void;
  updateHero: (patch: Partial<HeroData>) => void;
  updateAbout: (patch: Partial<AboutData>) => void;
  updateService: (id: string, patch: Partial<ServiceItem>) => void;
  updateClient: (id: string, patch: Partial<ClientItem>) => void;
  addClient: (client: ClientItem) => void;
  deleteClient: (id: string) => void;
  updateSelectedWork: (index: number, patch: Partial<SelectedWorkItem>) => void;
  updateCampaign: (campaignId: string, patch: Partial<SocialCampaign>) => void;
  addCampaign: (campaign: SocialCampaign) => void;
  deleteCampaign: (campaignId: string) => void;
  updatePost: (campaignId: string, postId: string, patch: Partial<SocialPost>) => void;
  addPost: (campaignId: string, post: SocialPost) => void;
  deletePost: (campaignId: string, postId: string) => void;
  updateScript: (scriptId: string, patch: Partial<VideoScript>) => void;
  updateStrategy: (patch: Partial<StrategyData>) => void;
  updateStrategyPillar: (index: number, patch: Partial<StrategyPillar>) => void;
  updateStrategyWorkflow: (index: number, patch: Partial<StrategyData['workflow'][0]>) => void;
  updateTestimonial: (id: string, patch: Partial<TestimonialItem>) => void;
  addTestimonial: (item: TestimonialItem) => void;
  deleteTestimonial: (id: string) => void;
  updateSocialLink: (id: string, patch: Partial<SocialLinkItem>) => void;
  updateContact: (patch: Partial<ContactData>) => void;
  resetAllData: () => void;
  exportJson: () => void;
  importJson: (jsonStr: string) => boolean;
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<EditablePortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return mergeSavedWithDefaults(JSON.parse(saved));
      }
    } catch {
      // ignore invalid JSON
    }
    return DEFAULT_DATA;
  });

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore storage quota errors gracefully
    }
  }, [data]);

  const updateHero = useCallback((patch: Partial<HeroData>) => {
    setData((prev) => ({ ...prev, hero: { ...prev.hero, ...patch } }));
  }, []);

  const updateAbout = useCallback((patch: Partial<AboutData>) => {
    setData((prev) => ({ ...prev, about: { ...prev.about, ...patch } }));
  }, []);

  const updateService = useCallback((id: string, patch: Partial<ServiceItem>) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    }));
  }, []);

  const updateClient = useCallback((id: string, patch: Partial<ClientItem>) => {
    setData((prev) => ({
      ...prev,
      clients: prev.clients.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    }));
  }, []);

  const addClient = useCallback((client: ClientItem) => {
    setData((prev) => ({
      ...prev,
      clients: [...prev.clients, client],
    }));
  }, []);

  const deleteClient = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      clients: prev.clients.filter((c) => c.id !== id),
    }));
  }, []);

  const updateSelectedWork = useCallback((index: number, patch: Partial<SelectedWorkItem>) => {
    setData((prev) => ({
      ...prev,
      selectedWork: prev.selectedWork.map((item, idx) => (idx === index ? { ...item, ...patch } : item)),
    }));
  }, []);

  const updateCampaign = useCallback((campaignId: string, patch: Partial<SocialCampaign>) => {
    setData((prev) => {
      const target = prev.socialCampaigns[campaignId];
      if (!target) return prev;
      return {
        ...prev,
        socialCampaigns: {
          ...prev.socialCampaigns,
          [campaignId]: { ...target, ...patch },
        },
      };
    });
  }, []);

  const addCampaign = useCallback((campaign: SocialCampaign) => {
    setData((prev) => ({
      ...prev,
      socialCampaigns: {
        ...prev.socialCampaigns,
        [campaign.id]: campaign,
      },
    }));
  }, []);

  const deleteCampaign = useCallback((campaignId: string) => {
    setData((prev) => {
      const next = { ...prev.socialCampaigns };
      delete next[campaignId];
      return { ...prev, socialCampaigns: next };
    });
  }, []);

  const updatePost = useCallback((campaignId: string, postId: string, patch: Partial<SocialPost>) => {
    setData((prev) => {
      const camp = prev.socialCampaigns[campaignId];
      if (!camp) return prev;
      return {
        ...prev,
        socialCampaigns: {
          ...prev.socialCampaigns,
          [campaignId]: {
            ...camp,
            posts: camp.posts.map((p) => (p.id === postId ? { ...p, ...patch } : p)),
          },
        },
      };
    });
  }, []);

  const addPost = useCallback((campaignId: string, post: SocialPost) => {
    setData((prev) => {
      const camp = prev.socialCampaigns[campaignId];
      if (!camp) return prev;
      return {
        ...prev,
        socialCampaigns: {
          ...prev.socialCampaigns,
          [campaignId]: {
            ...camp,
            posts: [...camp.posts, post],
          },
        },
      };
    });
  }, []);

  const deletePost = useCallback((campaignId: string, postId: string) => {
    setData((prev) => {
      const camp = prev.socialCampaigns[campaignId];
      if (!camp) return prev;
      return {
        ...prev,
        socialCampaigns: {
          ...prev.socialCampaigns,
          [campaignId]: {
            ...camp,
            posts: camp.posts.filter((p) => p.id !== postId),
          },
        },
      };
    });
  }, []);

  const updateScript = useCallback((scriptId: string, patch: Partial<VideoScript>) => {
    setData((prev) => ({
      ...prev,
      videoScripts: prev.videoScripts.map((s) => (s.id === scriptId ? { ...s, ...patch } : s)),
    }));
  }, []);

  const updateStrategy = useCallback((patch: Partial<StrategyData>) => {
    setData((prev) => ({
      ...prev,
      contentStrategy: { ...prev.contentStrategy, ...patch },
    }));
  }, []);

  const updateStrategyPillar = useCallback((index: number, patch: Partial<StrategyPillar>) => {
    setData((prev) => ({
      ...prev,
      contentStrategy: {
        ...prev.contentStrategy,
        pillars: prev.contentStrategy.pillars.map((p, i) => (i === index ? { ...p, ...patch } : p)),
      },
    }));
  }, []);

  const updateStrategyWorkflow = useCallback(
    (index: number, patch: Partial<StrategyData['workflow'][0]>) => {
      setData((prev) => ({
        ...prev,
        contentStrategy: {
          ...prev.contentStrategy,
          workflow: prev.contentStrategy.workflow.map((w, i) => (i === index ? { ...w, ...patch } : w)),
        },
      }));
    },
    []
  );

  const updateTestimonial = useCallback((id: string, patch: Partial<TestimonialItem>) => {
    setData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    }));
  }, []);

  const addTestimonial = useCallback((item: TestimonialItem) => {
    setData((prev) => ({
      ...prev,
      testimonials: [...prev.testimonials, item],
    }));
  }, []);

  const deleteTestimonial = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((t) => t.id !== id),
    }));
  }, []);

  const updateSocialLink = useCallback((id: string, patch: Partial<SocialLinkItem>) => {
    setData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        socialLinks: prev.contact.socialLinks.map((s) => (s.id === id ? { ...s, ...patch } : s)),
      },
    }));
  }, []);

  const updateContact = useCallback((patch: Partial<ContactData>) => {
    setData((prev) => ({
      ...prev,
      contact: { ...prev.contact, ...patch },
    }));
  }, []);

  const resetAllData = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setData(DEFAULT_DATA);
  }, []);

  const exportJson = useCallback(() => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `radwa-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [data]);

  const importJson = useCallback((jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      setData(mergeSavedWithDefaults(parsed));
      return true;
    } catch {
      return false;
    }
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        data,
        isEditMode,
        setIsEditMode,
        updateHero,
        updateAbout,
        updateService,
        updateClient,
        addClient,
        deleteClient,
        updateSelectedWork,
        updateCampaign,
        addCampaign,
        deleteCampaign,
        updatePost,
        addPost,
        deletePost,
        updateScript,
        updateStrategy,
        updateStrategyPillar,
        updateStrategyWorkflow,
        updateTestimonial,
        addTestimonial,
        deleteTestimonial,
        updateSocialLink,
        updateContact,
        resetAllData,
        exportJson,
        importJson,
      }}
    >
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

export function compressImageFile(file: File, maxDim = 1200): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(ev.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/webp', 0.85));
      };
      img.onerror = reject;
      img.src = ev.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
