import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { SocialPost } from '../utils/portfolioData';
import { useHorizontalSwipe } from '../hooks/useSwipeGesture';

interface ContentStrategySectionProps {
  onOpenLightbox?: (post: SocialPost) => void;
}

interface StrategySlideMeta {
  num: string;
  labelEn: string;
  labelAr: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  imageUrl: string;
}

interface StrategyCaseStudy {
  id: string;
  badgeEn: string;
  totalSlidesCount: number;
  clientEn: string;
  clientAr: string;
  aboutEn: string;
  aboutAr: string;
  scopeEn: string;
  scopeAr: string;
  highlights: Array<{
    tag: string;
    titleEn: string;
    titleAr: string;
    detailAr: string;
  }>;
  slides: StrategySlideMeta[];
}

const STRATEGY_STUDIES: StrategyCaseStudy[] = [
  {
    id: 'dar-al-ashab',
    badgeEn: '60 SLIDES DECK',
    totalSlidesCount: 60,
    clientEn: 'DAR AL-ASHAB',
    clientAr: 'براند دار العشب',
    aboutEn:
      'An Egyptian natural herbal brand offering 100% pure blends in convenient teabags (“فتلة”) backed by a full guarantee.',
    aboutAr:
      'براند مصري متخصص في خلطات الأعشاب الطبيعية 100% في صورة أكياس “فتلة” سهلة الاستخدام مع ضمان استرجاع كامل.',
    scopeEn:
      'Built a complete 60-slide go-to-market content strategy covering brand positioning, audience personas, and Month 1 publishing.',
    scopeAr:
      'إعداد استراتيجية محتوى متكاملة من 60 شريحة تشمل التموضع، وتحليل الجمهور، وخطة النشر الكاملة للشهر الأول.',
    highlights: [
      {
        tag: 'SMART KPIs',
        titleEn: '3,000 Followers & 50 Sales / 90d',
        titleAr: '3,000 متابع و50 مبيعة في 90 يوم',
        detailAr: 'الوصول لمعدل تفاعل 5% وجمع 20 تقييمًا حقيقيًا + نشر 20 قطعة محتوى توعوي خلال أول 60 يوم.',
      },
      {
        tag: 'PERSONAS & TOV',
        titleEn: '5 Buyer Personas • 7 TOV Rules',
        titleAr: '5 شخصيات جمهور و7 قواعد لنبرة الصوت',
        detailAr: 'نبرة بسيطة وودودة بالعامية المصرية تبني الثقة في الطب البديل وتُبرز سهولة الفتلة وضمان الاسترجاع.',
      },
      {
        tag: 'CHANNEL & CALENDAR',
        titleEn: '8 Pillars • 20-Post Month 1 Plan',
        titleAr: '8 محاور وخطة نشر 20 بوست للشهر الأول',
        detailAr: 'توزيع الأدوار بين فيسبوك، إنستجرام، تيك توك، وواتساب كقناة تحويل رئيسية مع مراجعة أسبوعية وربع سنوية.',
      },
    ],
    slides: [
      {
        num: '01',
        labelEn: 'Cover',
        labelAr: 'الغلاف',
        titleEn: 'Dar Al-Ashab — Strategy Cover',
        titleAr: 'غلاف استراتيجية المحتوى — دار العشب',
        descEn: 'Full 60-slide content strategy deck built for Dar Al-Ashab launch in the Egyptian market.',
        descAr: 'استراتيجية محتوى متكاملة من 60 شريحة لإطلاق براند دار العشب وبناء الثقة في السوق المصري.',
        imageUrl: '/assets/aistudio/strat_ashab_1.jpg',
      },
      {
        num: '02',
        labelEn: 'Brand Story',
        labelAr: 'عن البراند',
        titleEn: 'About Dar Al-Ashab & Product Edge',
        titleAr: 'عن دار العشب وميزة المنتج',
        descEn: 'Positioning 100% pure imported herbs in ready teabags with full money-back guarantee.',
        descAr: 'تقديم خلطات أعشاب طبيعية 100% في صورة فتلة جاهزة مع ضمان استرجاع كامل لبناء الثقة من اليوم الأول.',
        imageUrl: '/assets/aistudio/strat_ashab_2.jpg',
      },
      {
        num: '03',
        labelEn: 'SWOT',
        labelAr: 'تحليل SWOT',
        titleEn: 'SWOT Matrix & Market Opportunity',
        titleAr: 'تحليل SWOT والفرص التنافسية',
        descEn: 'Mapping purity strengths, trust-building hurdles, online market gap, and competitor threats.',
        descAr: 'تحليل نقاط القوة والضعف والفرص والتهديدات مع خطط عملية لتحويل الثقة والأمان لميزة تنافسية.',
        imageUrl: '/assets/aistudio/strat_ashab_3.jpg',
      },
      {
        num: '04',
        labelEn: 'SMART Goals',
        labelAr: 'الأهداف الذكية',
        titleEn: '5 Measurable 60–90 Day SMART Goals',
        titleAr: '5 أهداف SMART قابلة للقياس',
        descEn: 'Concrete targets: 3,000 followers, 5% ER, first 50 sales batch, 20 reviews, and 20 educational pieces.',
        descAr: 'أهداف محددة بمدة زمنية تشمل 3,000 متابع، 5% معدل تفاعل، أول 50 عملية بيع، 20 تجربة عميل، و20 بوست تعليمي.',
        imageUrl: '/assets/aistudio/strat_ashab_4.jpg',
      },
      {
        num: '05',
        labelEn: 'Persona',
        labelAr: 'شخصية العميل',
        titleEn: 'Buyer Persona Deep Dive (Mariam Muhammad)',
        titleAr: 'دراسة تفصيلية لشخصية المشتري (مريم محمد)',
        descEn: 'Demographics, pain points, digital habits, fears around chemicals, and purchase drivers.',
        descAr: 'تحليل الديموجرافيك ونقاط الألم والسلوكيات الرقمية ودوافع الشراء لبناء رسائل محتوى مخصصة.',
        imageUrl: '/assets/aistudio/strat_ashab_5.jpg',
      },
      {
        num: '06',
        labelEn: '8 Pillars',
        labelAr: 'محاور المحتوى',
        titleEn: '8 Strategic Content Pillars',
        titleAr: 'محاور المحتوى الثمانية',
        descEn: 'Educational, Problem-Solution, Social Proof, Brand Storytelling, Sales, Lifestyle, FAQ & Myths vs Facts.',
        descAr: 'توزيع متوازن بين التعليمي، المشكلة والحل، تجارب العملاء، القصة، المبيعات، العادات الصحية، الأسئلة وتصحيح المفاهيم.',
        imageUrl: '/assets/aistudio/strat_ashab_6.jpg',
      },
      {
        num: '07',
        labelEn: 'Platforms',
        labelAr: 'المنصات',
        titleEn: 'Platform Roles & Funnel Architecture',
        titleAr: 'خريطة المنصات ومسار التحويل',
        descEn: 'Defining distinct roles for Instagram (branding), Facebook (direct sales), WhatsApp (conversion), Website (SEO) & TikTok (reach).',
        descAr: 'تحديد دور كل منصة بدقة بين بناء الوعي على إنستجرام وتيك توك، والبيع المباشر على فيسبوك وواتساب.',
        imageUrl: '/assets/aistudio/strat_ashab_7.jpg',
      },
      {
        num: '08',
        labelEn: 'Calendar',
        labelAr: 'خطة النشر',
        titleEn: 'Month 1 Weekly Publishing Calendar',
        titleAr: 'خطة المحتوى الأسبوعية — الشهر الأول',
        descEn: 'Week 1 (Storytelling + Awareness) through Week 4 with format, pillar, hook idea & target persona.',
        descAr: 'جدول نشر تفصيلي للشهر الأول يحدد نوع التصميم أو الريل ومحور المحتوى والفكرة والجمهور المستهدف.',
        imageUrl: '/assets/aistudio/strat_ashab_8.jpg',
      },
    ],
  },
  {
    id: 'dr-loay-clinics',
    badgeEn: '39 SLIDES DECK',
    totalSlidesCount: 39,
    clientEn: 'DR. LOAY CLINICS',
    clientAr: 'عيادات د. لؤي للأسنان',
    aboutEn:
      'Academic-led dental and cosmetic clinics in Cairo and Assiut specializing in orthodontics and jaw rehabilitation.',
    aboutAr:
      'عيادات متخصصة في طب وتجميل الأسنان وإعادة تأهيل الفكين في القاهرة وأسيوط وفق بروتوكولات أكاديمية عالية.',
    scopeEn:
      'Developed a 39-slide growth strategy uniting Cairo & Assiut branches and targeting Class A and Gulf medical tourists.',
    scopeAr:
      'إعداد استراتيجية نمو من 39 شريحة لتعزيز حضور فرع القاهرة واستهداف عملاء Class A والسياحة العلاجية من الخليج.',
    highlights: [
      {
        tag: 'COMPETITORS & EXPANSION',
        titleEn: '5 Competitors • Cairo & Gulf Growth',
        titleAr: 'تحليل 5 منافسين وخطة توسع القاهرة والخليج',
        detailAr: 'مقارنة شاملة لمراكز كبرى بالقاهرة مع خطة لتفعيل سناب شات وSEO ومنصات الحجز أونلاين لجذب الوافدين.',
      },
      {
        tag: 'SMART TARGETS',
        titleEn: '200 New Clients • +50% Class A',
        titleAr: '200 عميل جديد و+50% حجوزات Class A',
        detailAr: 'رفع التفاعل +50%، زيادة الحجز الإلكتروني +30%، نمو +5,000 متابع، وبيع 300 باقة علاجية في 3 أشهر.',
      },
      {
        tag: 'TOV & CONTENT MIX',
        titleEn: 'Friendly-Expert TOV • 5 Formats',
        titleAr: 'نبرة ودودة غير متكلفة و5 مسارات محتوى',
        detailAr: 'نبرة “لطيف ومهني” توازن بين المكانة الأكاديمية للدكتور وطمأنة المريض عبر محتوى تعليمي وتوعوي وتحفيزي.',
      },
    ],
    slides: [
      {
        num: '01',
        labelEn: 'Cover',
        labelAr: 'الغلاف',
        titleEn: 'Dr. Loay Clinics — Strategy Cover',
        titleAr: 'غلاف استراتيجية المحتوى — عيادات د. لؤي',
        descEn: 'Comprehensive 39-slide digital & content strategy uniting Cairo and Assiut dental branches.',
        descAr: 'استراتيجية محتوى من 39 شريحة لتعزيز الحضور الرقمي وبناء الثقة لعيادات د. لؤي في القاهرة وأسيوط.',
        imageUrl: '/assets/aistudio/strat_loay_1.jpg',
      },
      {
        num: '02',
        labelEn: 'Competitors',
        labelAr: 'المنافسون',
        titleEn: '5-Clinic Competitive Benchmark',
        titleAr: 'تحليل 5 منافسين في طب الأسنان',
        descEn: 'Benchmarking Dr. Karim Makady, Dr. Alaa Ayman, Dr. Mohamed Ibrahim, Cure Dental & Roshdy Clinic.',
        descAr: 'دراسة نقاط القوة والضعف ونبرة الصوت لدى 5 عيادات منافسة لاستغلال فجوات المحتوى التفاعلي.',
        imageUrl: '/assets/aistudio/strat_loay_2.jpg',
      },
      {
        num: '03',
        labelEn: 'SWOT',
        labelAr: 'تحليل SWOT',
        titleEn: 'SWOT & Actionable Expansion Roadmap',
        titleAr: 'تحليل SWOT وخطط مواجهة التحديات',
        descEn: 'Leveraging academic prestige & full-jaw specialization while solving Cairo branch visibility & online booking.',
        descAr: 'استثمار الخبرة الأكاديمية والتخصص الدقيق لمعالجة تحديات فرع القاهرة واستهداف فئة Class A والسياحة العلاجية.',
        imageUrl: '/assets/aistudio/strat_loay_3.jpg',
      },
      {
        num: '04',
        labelEn: 'SMART Goals',
        labelAr: 'الأهداف الذكية',
        titleEn: '6 Quarterly SMART Objectives',
        titleAr: '6 أهداف SMART بجدول زمني محدد',
        descEn: '+200 clients, +50% engagement, +30% online bookings, +50% Class A/Gulf leads, +5,000 followers & 300 bundles.',
        descAr: 'أهداف محددة تشمل 200 عميل جديد، رفع الحجز أونلاين 30%، زيادة 5,000 متابع، وبيع 300 باقة عروض.',
        imageUrl: '/assets/aistudio/strat_loay_4.jpg',
      },
      {
        num: '05',
        labelEn: 'Persona',
        labelAr: 'شخصية المريض',
        titleEn: 'Class A & Medical Tourist Personas',
        titleAr: 'شخصية العميل (أحمد محمد / نورا نايف / خالد)',
        descEn: 'Profiling local Class A decision-makers alongside Gulf & expat dental patients seeking trusted quality.',
        descAr: 'دراسة 3 شخصيات رئيسية تشمل عملاء Class A بالقاهرة والوافدين من الخليج الباحثين عن جودة موثوقة.',
        imageUrl: '/assets/aistudio/strat_loay_5.jpg',
      },
      {
        num: '06',
        labelEn: 'Content Ideas',
        labelAr: 'أفكار المحتوى',
        titleEn: '5 Core Content Pillars & Execution Ideas',
        titleAr: 'مصفوفة أفكار المحتوى الخمسة',
        descEn: 'Educational comparisons, service intro videos, seasonal offers, interactive polls & before/after proof.',
        descAr: 'أفكار عملية موزعة على 5 تصنيفات: تعليمي، توعوي، تسويقي، تفاعلي، وتحفيزي بحالات قبل وبعد.',
        imageUrl: '/assets/aistudio/strat_loay_6.jpg',
      },
    ],
  },
  {
    id: 'dr-shimaa-clinic',
    badgeEn: '41 SLIDES DECK',
    totalSlidesCount: 41,
    clientEn: 'DR. SHIMAA CLINIC',
    clientAr: 'عيادة د. شيماء الشافعي',
    aboutEn:
      'A multi-specialty dermatology, laser, aesthetics, and clinical nutrition center based in Suez.',
    aboutAr:
      'مركز متكامل للجلدية والليزر والتجميل والتغذية العلاجية بالسويس يضم تجهيزات حديثة وخدمات متعددة الفئات.',
    scopeEn:
      'Crafted a 41-slide omnichannel strategy tailoring distinct personas, KPIs, and tone of voice across 6 departments.',
    scopeAr:
      'بناء استراتيجية من 41 شريحة توظّف شخصيات العملاء وأهداف النمو ونبرة الصوت المخصصة لكل قسم داخل العيادة.',
    highlights: [
      {
        tag: '9 COMPETITORS',
        titleEn: 'Full Suez & Nearby Cities Benchmarking',
        titleAr: 'تحليل 9 منافسين وخطة التوسع الإقليمي',
        detailAr: 'رصد نقاط قوة وضعف 9 مراكز تجميل وتغذية مع خطط لجذب عملاء الشروق ومدينتي والتجمع والعبور.',
      },
      {
        tag: 'DEPARTMENTAL KPIs',
        titleEn: '+50% ER • 5 Departmental Targets',
        titleAr: '+50% تفاعل وأهداف مخصصة لكل قسم',
        detailAr: 'نمو استشارات التغذية +20%، تنظيف البشرة +15%، ترطيب الشعر +30%، وتفعيل حجوزات التجميل النسائي من 0 إلى 10.',
      },
      {
        tag: '6 TOV PROFILES',
        titleEn: 'Custom Tone per Clinical Specialty',
        titleAr: '6 نبرات صوت متخصصة لكل قسم طبي',
        detailAr: 'نبرة مرحة للتغذية، ودودة لليزر، حنونة للبشرة، فخمة متخصصة للتجميل، واثقة للشعر، وحماسية للعروض.',
      },
    ],
    slides: [
      {
        num: '01',
        labelEn: 'Cover',
        labelAr: 'الغلاف',
        titleEn: 'Dr. Shimaa El-Shafee — Strategy Cover',
        titleAr: 'غلاف استراتيجية المحتوى — عيادة د. شيماء الشافعي',
        descEn: '41-slide omnichannel content strategy tailored to 6 clinical & aesthetic departments.',
        descAr: 'استراتيجية محتوى من 41 شريحة مصممة لخدمة 6 أقسام طبية وتجميلية تحت هوية واحدة.',
        imageUrl: '/assets/aistudio/strat_shimaa_1.jpg',
      },
      {
        num: '02',
        labelEn: 'Competitors',
        labelAr: 'المنافسون',
        titleEn: '9-Center Competitive Landscape Audit',
        titleAr: 'دراسة 9 مراكز ومنافسين في السوق',
        descEn: 'Auditing InShape, Davinci, Nouvel Âge, SPS, Dr. Mona Atwa & local Suez clinics across TOV, ads, and trust.',
        descAr: 'تحليل تفصيلي لتسعة مراكز منافسة من حيث نوع المحتوى والالتزام بالنشر ونبرة الصوت واستغلال الريلز.',
        imageUrl: '/assets/aistudio/strat_shimaa_2.jpg',
      },
      {
        num: '03',
        labelEn: 'SWOT',
        labelAr: 'تحليل SWOT',
        titleEn: 'SWOT Diagnosis & Mitigation Plans',
        titleAr: 'تحليل SWOT والحلول التكتيكية',
        descEn: 'Expanding reach beyond Suez to Madinaty/El-Sherouk/Tagamoa while amplifying patient reviews & certifications.',
        descAr: 'معالجة نقاط الضعف عبر إبراز الاعتمادات وتجارب العملاء والتوسع الجغرافي نحو المدن الجديدة القريبة.',
        imageUrl: '/assets/aistudio/strat_shimaa_3.jpg',
      },
      {
        num: '04',
        labelEn: 'SMART Goals',
        labelAr: 'الأهداف الذكية',
        titleEn: '5 Departmental SMART Growth KPIs',
        titleAr: '5 أهداف SMART للنمو في كل قسم',
        descEn: '+50% engagement, +20% nutrition consults, +15% skincare, +30% hair hydration & 0→10 feminine aesthetics monthly.',
        descAr: 'أهداف كمية واضحة خلال 2-3 أشهر تشمل التفاعل والاستشارات وجلسات البشرة والشعر والتجميل النسائي.',
        imageUrl: '/assets/aistudio/strat_shimaa_4.jpg',
      },
      {
        num: '05',
        labelEn: 'Persona',
        labelAr: 'شخصيات العملاء',
        titleEn: '4 Distinct Personas (Mariam, Radwa, Adam, Maher)',
        titleAr: '4 شخصيات عملاء مستهدفة بدقة',
        descEn: 'Teen skincare, 18–25 nutrition/wellness (Radwa Al-Arabi), men’s fitness & aesthetics, with tailored fears & hooks.',
        descAr: 'تحليل نفسي ورقمي لأربع شرائح مختلفة تشمل التغذية والعناية بالبشرة للشباب والسيدات.',
        imageUrl: '/assets/aistudio/strat_shimaa_5.jpg',
      },
      {
        num: '06',
        labelEn: 'Department TOV',
        labelAr: 'نبرة الصوت',
        titleEn: '6-Department Tailored Tone of Voice',
        titleAr: 'خريطة نبرة الصوت لـ 6 أقسام',
        descEn: 'Playful nutrition, friendly laser, caring skin, luxurious aesthetics, confident hair & enthusiastic seasonal offers.',
        descAr: 'تخصيص نبرة الخطاب لكل قسم بما يلائم حساسية الخدمة وطبيعة الجمهور المستهدف.',
        imageUrl: '/assets/aistudio/strat_shimaa_6.jpg',
      },
      {
        num: '07',
        labelEn: 'Content Matrix',
        labelAr: 'أفكار المحتوى',
        titleEn: '6-Category Content Pillars & Reels Angles',
        titleAr: 'مصفوفة أفكار المحتوى الستة',
        descEn: 'Educational seasonal care, device explainers, bundled promos, Q&A polls, before/after results & funny nutrition memes.',
        descAr: 'تنوع متكامل بين التعليمي والتوعوي والتسويقي والتفاعلي والتحفيزي والترفيهي عبر ميمز وريلز جذابة.',
        imageUrl: '/assets/aistudio/strat_shimaa_7.jpg',
      },
    ],
  },
];

const StrategyCaseStudyBlock: React.FC<{
  study: StrategyCaseStudy;
  index: number;
  onOpenLightbox?: (post: SocialPost) => void;
}> = ({ study, onOpenLightbox }) => {
  const [slideIdx, setSlideIdx] = useState(0);
  const current = study.slides[slideIdx];
  const totalShown = study.slides.length;
  const paddedIndex = String(slideIdx + 1).padStart(2, '0');
  const paddedTotal = String(totalShown).padStart(2, '0');
  const swipe = useHorizontalSwipe(
    () => setSlideIdx((prev) => (prev - 1 + totalShown) % totalShown),
    () => setSlideIdx((prev) => (prev + 1) % totalShown)
  );

  const handleOpenDeckLightbox = () => {
    if (!onOpenLightbox) return;
    const post: SocialPost = {
      id: `strategy-${study.id}`,
      brandId: 'strategy',
      dateBadge: study.badgeEn,
      titleEn: `${study.clientEn} — CONTENT STRATEGY`,
      titleAr: `استراتيجية المحتوى — ${study.clientAr}`,
      hookEn: study.aboutEn,
      hookAr: study.aboutAr,
      fullCaptionAr: [
        `${study.clientAr} (${study.totalSlidesCount} شريحة)`,
        study.aboutAr,
        study.scopeAr,
        study.highlights.map((h) => `• ${h.titleAr}: ${h.detailAr}`).join('\n'),
      ].join('\n\n'),
      imageUrl: current.imageUrl,
      carouselImages: study.slides.map((s) => s.imageUrl),
      aspectRatio: 'landscape',
      slidesCount: study.slides.length,
      initialSlideIndex: slideIdx,
      slides: study.slides.map((s, idx) => ({
        slideNumber: idx + 1,
        title: `${s.titleEn} | ${s.titleAr}`,
        description: `${s.descEn}\n${s.descAr}`,
        imageUrl: s.imageUrl,
      })),
      gradientBg: 'from-[#292524] via-[#1c1917] to-[#0c0a09]',
      emojiIcon: '📊',
      metaInfoEn: `${study.totalSlidesCount} Slides Deck • Key Excerpts`,
      metaInfoAr: `عرض تقديمي ${study.totalSlidesCount} شريحة`,
    };
    onOpenLightbox(post);
  };

  return (
    <section className="py-10 sm:py-14 px-4 sm:px-8 lg:px-10 relative overflow-x-clip">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Header Block: Centered title + 2 centered top-lined info columns */}
        <div className="mb-8 lg:mb-9">
          <div className="text-center mb-6 lg:mb-8">
            <div className="w-fit max-w-full mx-auto relative select-none text-center cursor-default interactive-lockup">
              <h3
                style={{ fontSize: 'clamp(36px, calc(4.3 * var(--vw, 1vw)), 62px)' }}
                className="font-displayEn font-normal uppercase tracking-[0.02em] leading-[0.86] text-heading-linear sm:whitespace-nowrap"
              >
                {study.clientEn}
              </h3>
              <p
                dir="rtl"
                style={{
                  fontSize: 'clamp(22px, calc(3.1 * var(--vw, 1vw)), 44px)',
                  textShadow: '0 8px 20px rgba(0, 0, 0, 0.9)',
                }}
                className="font-amiri font-bold text-white leading-none text-center -mt-[0.30em] sm:-mt-[0.38em]"
              >
                {study.clientAr}
              </p>
            </div>
          </div>

          {/* 2 Concise Top-Lined Columns */}
          <div data-layout-grid className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
            <div className="border-t border-white/20 pt-3.5 px-2 sm:px-2.5 sm:-mx-2.5 pb-2.5 rounded-b-lg space-y-2 interactive-panel">
              <div className="flex flex-wrap items-baseline gap-1.5 text-[15px]">
                <span className="font-body-plex font-bold text-white">The brand</span>
                <span className="text-white/35">|</span>
                <span dir="rtl" className="font-body-plex font-normal text-[#9C9393]">
                  العلامة
                </span>
              </div>
              <p className="font-body-plex text-[14.5px] sm:text-[15px] text-white/90 leading-[1.45] text-left">
                {study.aboutEn}
              </p>
              <p
                dir="rtl"
                className="font-body-plex text-[14.5px] sm:text-[15px] text-[#E9DEDE]/85 leading-[1.6] text-right"
              >
                {study.aboutAr}
              </p>
            </div>

            <div className="border-t border-white/20 pt-3.5 px-2 sm:px-2.5 sm:-mx-2.5 pb-2.5 rounded-b-lg space-y-2 interactive-panel">
              <div className="flex flex-wrap items-baseline gap-1.5 text-[15px]">
                <span className="font-body-plex font-bold text-white">Strategy scope</span>
                <span className="text-white/35">|</span>
                <span dir="rtl" className="font-body-plex font-normal text-[#9C9393]">
                  نطاق العمل
                </span>
              </div>
              <p className="font-body-plex text-[14.5px] sm:text-[15px] text-white/90 leading-[1.45] text-left">
                {study.scopeEn}
              </p>
              <p
                dir="rtl"
                className="font-body-plex text-[14.5px] sm:text-[15px] text-[#E9DEDE]/85 leading-[1.6] text-right"
              >
                {study.scopeAr}
              </p>
            </div>
          </div>
        </div>

        {/* 3 Key Highlights Strip — Open hairline editorial layout */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 sm:mb-9">
          {study.highlights.map((item, idx) => (
            <div
              key={idx}
              className="border-t border-white/15 hover:border-[#b81d33]/65 active:border-[#dc2626] hover:-translate-y-1 active:-translate-y-1 transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] pt-3.5 space-y-1.5 text-center"
            >
              <div className="flex items-center justify-between gap-2 text-[11px] font-body-plex font-semibold tabular-nums tracking-[0.12em] uppercase text-white/50">
                <span>{item.tag}</span>
                <span className="text-[#ef4444]/90 font-bold">0{idx + 1}</span>
              </div>
              <h4 className="font-body-plex font-semibold text-[14.5px] text-white leading-snug text-center">
                {item.titleEn}
              </h4>
              <p
                dir="rtl"
                className="font-body-plex text-[13.5px] text-[#E9DEDE]/80 leading-[1.6] text-center"
              >
                {item.titleAr}
              </p>
            </div>
          ))}
        </div>

        {/* Stepper Bar above Slide Stage */}
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mb-5">
          <p className="font-body-plex text-[14.5px] sm:text-[15px] text-white/85 text-center sm:text-left">
            Explore key strategy chapters or click slide to zoom <span className="text-white/40">|</span>{' '}
            <span className="text-[#E9DEDE]/85">تصفح محاور الاستراتيجية أو اضغط للتكبير</span>
          </p>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setSlideIdx((prev) => (prev - 1 + totalShown) % totalShown)}
              className="w-11 h-11 sm:w-9 sm:h-9 rounded-full border border-white/25 hover:border-[#b81d33] hover:bg-[#68101C]/45 flex items-center justify-center text-white transition-colors duration-300 ease-out cursor-pointer"
              aria-label={`Previous slide in ${study.clientEn}`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="px-4 py-1.5 rounded-full border border-white/15 bg-black/50 text-xs font-body-plex tabular-nums text-white/90 flex items-center gap-2">
              <span className="text-[#ef4444] font-bold">{paddedIndex}</span>
              <span className="text-white/35">/</span>
              <span className="text-white/60">{paddedTotal}</span>
              <span className="text-white/35">•</span>
              <span className="text-white/85">{current.labelEn}</span>
            </div>

            <button
              type="button"
              onClick={() => setSlideIdx((prev) => (prev + 1) % totalShown)}
              className="w-11 h-11 sm:w-9 sm:h-9 rounded-full border border-white/25 hover:border-[#b81d33] hover:bg-[#68101C]/45 flex items-center justify-center text-white transition-colors duration-300 ease-out cursor-pointer"
              aria-label={`Next slide in ${study.clientEn}`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center 16:9 Strategy Deck Previewer */}
        <div className="max-w-5xl mx-auto">
          <div className="relative group/deck">
            <button
              type="button"
              onClick={() => {
                if (!swipe.shouldSuppressClick()) handleOpenDeckLightbox();
              }}
              onTouchStart={swipe.onTouchStart}
              onTouchEnd={swipe.onTouchEnd}
              className="swipe-deck touch-card w-full aspect-video rounded-[8px] overflow-hidden bg-[#0e0a09] shadow-lg ring-1 ring-white/12 group-hover/deck:ring-[#b81d33]/80 active:ring-[#dc2626] group-hover/deck:-translate-y-1.5 group-active/deck:-translate-y-1.5 transition-[transform,border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer relative flex items-center justify-center"
              aria-label={`Zoom ${current.titleEn}`}
            >
              <img
                key={current.imageUrl}
                src={current.imageUrl}
                alt={`${study.clientEn} — ${current.titleEn}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain bg-[#0c0908] slide-fade-enter"
              />

              {/* Top Overlay Badges */}
              <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-black/85 border border-white/15 font-body-plex tabular-nums text-[11px] font-semibold text-white tracking-wider">
                  {study.clientEn} • SLIDE {paddedIndex}/{paddedTotal}
                </span>
                <span className="w-8 h-8 rounded-full bg-black/85 border border-white/15 flex items-center justify-center text-white/85 group-hover/deck:bg-[#68101C] group-hover/deck:text-white transition-colors duration-300 ease-out">
                  <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>
          </div>

          {/* Active Slide Caption Strip */}
          <div key={`strat-cap-${current.num}`} className="mt-4 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 px-1 slide-fade-enter">
            <div className="space-y-0.5 text-left">
              <p className="font-displayEn text-[20px] sm:text-[22px] text-white tracking-wide leading-none">
                {current.num}. {current.titleEn}
              </p>
              <p className="font-body-plex text-[13.5px] text-white/65">{current.descEn}</p>
            </div>
            <div dir="rtl" className="space-y-0.5 text-right">
              <p className="font-body-plex font-bold text-[16px] sm:text-[17px] text-white leading-snug">
                {current.titleAr}
              </p>
              <p className="font-body-plex text-[13.5px] text-[#E9DEDE]/75">{current.descAr}</p>
            </div>
          </div>

          {/* Chapter Pill Selector Strip */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {study.slides.map((slide, idx) => {
              const isActive = idx === slideIdx;
              return (
                <button
                  key={slide.num}
                  type="button"
                  onClick={() => setSlideIdx(idx)}
                  className={`px-3.5 py-2 min-h-[40px] rounded-full border text-xs font-body-plex transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-out cursor-pointer inline-flex items-center gap-1.5 ${
                    isActive
                      ? 'border-[#b81d33] bg-[#68101C]/55 text-white shadow-[0_0_16px_rgba(184,29,51,0.35)]'
                      : 'border-white/15 bg-white/[0.03] text-white/65 hover:text-white hover:border-white/40'
                  }`}
                >
                  <span className="font-body-plex tabular-nums font-bold text-[11.5px]">{slide.num}</span>
                  <span>{slide.labelEn}</span>
                  <span className="text-white/30">|</span>
                  <span dir="rtl">{slide.labelAr}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom-Right Pill Outline Interactive Deck CTA */}
        <div className="flex justify-center sm:justify-end pt-8 sm:pt-9">
          <button
            type="button"
            onClick={handleOpenDeckLightbox}
            className="interactive-btn px-5 sm:px-6 py-2.5 min-h-[44px] rounded-full border border-white/55 hover:border-[#b81d33] hover:bg-[#68101C]/45 text-white/95 cursor-pointer inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-body-plex text-[14px] sm:text-[14.5px] sm:whitespace-nowrap text-center"
          >
            <span>Browse Full Strategy ({study.totalSlidesCount} Slides)</span>
            <span className="text-white/45">|</span>
            <span dir="rtl" className="text-[#E9DEDE]">
              تصفح الاستراتيجية كاملة
            </span>
            <Maximize2 className="w-3.5 h-3.5 text-white/70" />
          </button>
        </div>
      </div>
    </section>
  );
};

export const ContentStrategySection: React.FC<ContentStrategySectionProps> = ({
  onOpenLightbox,
}) => {
  return (
    <>
      {/* ======================================================== */}
      {/* Section 05 Cover: CONTENT STRATEGY                       */}
      {/* ======================================================== */}
      <section
        id="content-strategy"
        className="scroll-mt-20 py-10 sm:py-14 px-4 sm:px-8 lg:px-10 relative overflow-x-clip flex flex-col justify-center items-center"
      >
        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center text-center select-none cursor-default interactive-lockup">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3">
            <span className="w-12 sm:w-16 h-[1px] bg-white/25 divider-line origin-right" />
            <span className="text-[38px] sm:text-[48px] font-displayEn font-normal text-white tracking-[0.06em] leading-none block">
              05
            </span>
            <span className="w-12 sm:w-16 h-[1px] bg-white/25 divider-line origin-left" />
          </div>

          <h2
            className="font-displayEn font-normal uppercase tracking-[0.02em] leading-[0.86] text-heading-linear sm:whitespace-nowrap"
            style={{ fontSize: 'clamp(40px, calc(9.6 * var(--vw, 1vw)), 146px)' }}
          >
            CONTENT STRATEGY
          </h2>
          <p
            dir="rtl"
            className="font-amiri font-bold text-white leading-none text-center -mt-[0.26em] sm:-mt-[0.36em]"
            style={{
              fontSize: 'clamp(28px, calc(5.8 * var(--vw, 1vw)), 84px)',
              textShadow: '0 10px 24px rgba(0, 0, 0, 0.9)',
            }}
          >
            استراتيجية المحتوى
          </p>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3 Full Content Strategy Case Studies + Slide Decks       */}
      {/* ======================================================== */}
      {STRATEGY_STUDIES.map((study, idx) => (
        <StrategyCaseStudyBlock
          key={study.id}
          study={study}
          index={idx}
          onOpenLightbox={onOpenLightbox}
        />
      ))}
    </>
  );
};
