import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { SocialPost } from '../utils/portfolioData';
import { useHorizontalSwipe } from '../hooks/useSwipeGesture';

interface MarketingPlanSectionProps {
  onOpenLightbox?: (post: SocialPost) => void;
}

interface PlanSlideMeta {
  num: string;
  labelEn: string;
  labelAr: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  imageUrl: string;
}

interface MarketingPlanCaseStudy {
  id: string;
  deckType: 'Marketing Strategy' | 'Marketing Plan';
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
  slides: PlanSlideMeta[];
}

const MARKETING_PLANS: MarketingPlanCaseStudy[] = [
  {
    id: 'niesta-strategy',
    deckType: 'Marketing Strategy',
    totalSlidesCount: 83,
    clientEn: 'NIESTA DESIGN',
    clientAr: 'شركة نييستا للتشطيبات والديكور',
    aboutEn:
      'A modern Egyptian turnkey interior design and architectural finishing firm serving Cairo, Alexandria, and the North Coast.',
    aboutAr:
      'شركة مصرية متخصصة في التصميم الداخلي والتشطيب المتكامل، تقدم حلولًا عصرية شفافة في القاهرة والإسكندرية والساحل الشمالي.',
    scopeEn:
      'Built an 83-slide marketing strategy covering construction benchmarks, STP positioning, 7Ps mix, SOSTAC, and 70/20/10 execution.',
    scopeAr:
      'إعداد استراتيجية تسويقية شاملة من 83 شريحة تضم بحث السوق (55 مليار$) وSTP والمزيج التسويقي 7Ps ونموذج SOSTAC وخطة الـ 6 أشهر.',
    highlights: [
      {
        tag: 'MARKET & STP',
        titleEn: '$55B Market • Clear Positioning',
        titleAr: 'دراسة سوق الـ 55 مليار$ وصياغة التموضع',
        detailAr:
          'رصد فرص التوسع في رأس الحكمة والعلمين مع تقسيم الجمهور بالـ STP وصياغة جملة التموضع الرسمي في الجودة والشفافية.',
      },
      {
        tag: 'SOSTAC & 7Ps',
        titleEn: '7Ps Marketing Mix • 6-Month SMART Plan',
        titleAr: 'المزيج التسويقي 7Ps وأهداف 6 أشهر',
        detailAr:
          'تفصيل العناصر السبعة للخدمة مع خطة تحويلية لمدة 6 أشهر تعتمد على الإثبات البصري للواقع مقابل التصميم 3D.',
      },
      {
        tag: 'BUDGET & CONTENT',
        titleEn: '70/20/10 Content • 60/30/10 Ad Split',
        titleAr: 'قاعدة المحتوى 70/20/10 وتوزيع الإعلانات',
        detailAr:
          'تخصيص 70% لمحتوى بناء الثقة و20% للتفاعل و10% للعروض، مع تقسيم ميزانية الإعلانات 60% جذب عملاء و30% وعي و10% إعادة استهداف.',
      },
    ],
    slides: [
      {
        num: '01',
        labelEn: 'Cover',
        labelAr: 'الغلاف',
        titleEn: 'Niesta — 83-Slide Marketing Strategy Cover',
        titleAr: 'غلاف الاستراتيجية التسويقية لشركة نييستا',
        descEn: 'Full 83-slide strategic blueprint for turnkey finishing & interior architecture.',
        descAr: 'استراتيجية تسويقية متكاملة من 83 شريحة لتطوير الحضور الرقمي ورفع مبيعات التشطيبات الفاخرة.',
        imageUrl: '/assets/aistudio/mplan_niesta_1.jpg',
      },
      {
        num: '02',
        labelEn: 'Brand Edge',
        labelAr: 'عن الشركة',
        titleEn: 'Company Overview & Turnkey Value Proposition',
        titleAr: 'عن نييستا وعرض القيمة المضافة',
        descEn: 'Highlighting stress-free turnkey delivery backed by strict supervision and transparent costing.',
        descAr: 'تسليط الضوء على تجربة التشطيب بدون توتر عبر إشراف هندسي متكامل ووضوح كامل في التكلفة.',
        imageUrl: '/assets/aistudio/mplan_niesta_2.jpg',
      },
      {
        num: '03',
        labelEn: 'Market Stats',
        labelAr: 'بحث السوق',
        titleEn: 'Executive Summary & Market Dynamics ($55B)',
        titleAr: 'ملخص بحث السوق وديناميكيات القطاع',
        descEn: 'Analyzing Cairo vs. Alex vs. North Coast seasonality, pricing tiers, and New Cities investment.',
        descAr: 'تحليل حجم سوق الإنشاءات، وفروقات التسعير الإقليمية، وزخم الطلب في الساحل والمدن الجديدة.',
        imageUrl: '/assets/aistudio/mplan_niesta_3.jpg',
      },
      {
        num: '04',
        labelEn: 'Sector SWOT',
        labelAr: 'تحليل القطاع',
        titleEn: 'Overall Interior Finishing Market SWOT',
        titleAr: 'تحليل SWOT الشامل لسوق التشطيبات',
        descEn: 'Mapping macro demand drivers against inflation, raw material volatility, and labor gaps.',
        descAr: 'دراسة نقاط القوة والضعف والفرص والتهديدات على مستوى سوق التشطيب والديكور في مصر.',
        imageUrl: '/assets/aistudio/mplan_niesta_4.jpg',
      },
      {
        num: '05',
        labelEn: 'Positioning',
        labelAr: 'التموضع',
        titleEn: 'Official Brand Positioning Statement',
        titleAr: 'جملة التموضع الرسمية للعلامة التجارية',
        descEn: 'Separating Niesta from inconsistent contractors through transparent pricing and refined execution.',
        descAr: 'التموضع الواضح لنييستا كشريك تشطيب حديث يضمن الشفافية وجودة التنفيذ على عكس المقاولات التقليدية.',
        imageUrl: '/assets/aistudio/mplan_niesta_5.jpg',
      },
      {
        num: '06',
        labelEn: 'SOSTAC',
        labelAr: 'نموذج SOSTAC',
        titleEn: 'SOSTAC Strategic Framework',
        titleAr: 'منهجية SOSTAC الاستراتيجية',
        descEn: 'Situation, Objectives, Strategy, Tactics, Action & Control tailored to the construction lifecycle.',
        descAr: 'تطبيق مراحل SOSTAC الست من تحليل الوضع الراهن وحتى آليات الرقابة والقياس.',
        imageUrl: '/assets/aistudio/mplan_niesta_6.jpg',
      },
      {
        num: '07',
        labelEn: 'Niesta SWOT',
        labelAr: 'SWOT الشركة',
        titleEn: 'Niesta Internal & Competitive SWOT Matrix',
        titleAr: 'تحليل SWOT الداخلي لشركة نييستا',
        descEn: 'Leveraging engineering precision and clear communication to win high-ticket residential contracts.',
        descAr: 'تحديد المزايا التنافسية الداخلية ومعالجة التحديات التسويقية لبناء ثقة الملاك.',
        imageUrl: '/assets/aistudio/mplan_niesta_7.jpg',
      },
      {
        num: '08',
        labelEn: '70/20/10 Rule',
        labelAr: 'قاعدة المحتوى',
        titleEn: '70/20/10 Content Distribution Architecture',
        titleAr: 'قاعدة توزيع المحتوى 70 - 20 - 10',
        descEn: 'Balancing trust-building before/after proof, interactive guidance, and direct conversion offers.',
        descAr: 'هيكلة المحتوى بنسبة 70% بناء ثقة وتوعية، 20% تفاعل، و10% عروض بيعية مباشرة.',
        imageUrl: '/assets/aistudio/mplan_niesta_8.jpg',
      },
    ],
  },
  {
    id: 'april-arabia-plan',
    deckType: 'Marketing Plan',
    totalSlidesCount: 45,
    clientEn: 'APRIL ARABIA',
    clientAr: 'أبريل أرابيا للأزياء المحتشمة',
    aboutEn:
      'A modest fashion & abaya e-commerce brand with 10+ years of craft, accessible pricing, and a regional Gulf growth horizon.',
    aboutAr:
      'براند عبايات وأزياء محتشمة بخبرة تتجاوز 10 سنوات، يتميز بتنوع المقاسات والأقمشة المريحة ومتجر إلكتروني نشط.',
    scopeEn:
      'Engineered a 45-slide marketing plan featuring UX/SEO store auditing, competitor benchmarking, 5 SMART targets, and ad splits.',
    scopeAr:
      'بناء خطة تسويقية من 45 شريحة تشمل تدقيق المتجر والحسابات، تحليل المنافسين، و5 أهداف SMART وخطط الإعلانات والنشر.',
    highlights: [
      {
        tag: 'E-STORE & SOCIAL AUDIT',
        titleEn: 'Website UX, SEO & Page Optimization',
        titleAr: 'تدقيق المتجر الإلكتروني وحسابات التواصل',
        detailAr:
          'رصد الثغرات التقنية في المتجر وتنسيق الهوية البصرية لرفع جودة تجربة التسوق وتسهيل إتمام الطلب أونلاين.',
      },
      {
        tag: '5 SMART TARGETS',
        titleEn: '100 Monthly Orders • 1% → 3% CR',
        titleAr: '100 طلب شهريًا ومضاعفة التحويل إلى 3%',
        detailAr:
          'رفع التفاعل 30%، الوصول لـ +5,000 متابع من الخليج خلال 6 أشهر، وخفض شكاوى العملاء 40% بأتمتة الردود.',
      },
      {
        tag: 'CONTENT & AD SPLIT',
        titleEn: '6 Content Formats • 40/25/20/10/5 Ads',
        titleAr: '6 محاور محتوى وتوزيع مدروس للميزانية',
        detailAr:
          'الجمع بين الإعلانات التحويلية (40%) وإعادة الاستهداف (20%) والتعاون مع المؤثرين في الموضة المحتشمة (10%).',
      },
    ],
    slides: [
      {
        num: '01',
        labelEn: 'Cover',
        labelAr: 'الغلاف',
        titleEn: 'April Arabia — 45-Slide Marketing Plan Cover',
        titleAr: 'غلاف الخطة التسويقية — أبريل أرابيا',
        descEn: 'Actionable e-commerce & modest fashion growth roadmap built on the SOSTAC methodology.',
        descAr: 'خطة تسويقية شاملة من 45 شريحة لتوسيع مبيعات المتجر الإلكتروني والنمو في السوق الخليجي.',
        imageUrl: '/assets/aistudio/mplan_april_1.jpg',
      },
      {
        num: '02',
        labelEn: 'SOSTAC',
        labelAr: 'الهيكل العام',
        titleEn: 'SOSTAC Framework Blueprint',
        titleAr: 'هيكل خطة العمل بمنهجية SOSTAC',
        descEn: 'Structuring the audit, measurable KPIs, digital tactics, and execution schedule.',
        descAr: 'خارطة الطريق من تحليل الأوضاع الحالية إلى التنفيذ والرقابة الدورية.',
        imageUrl: '/assets/aistudio/mplan_april_2.jpg',
      },
      {
        num: '03',
        labelEn: 'Store Audit',
        labelAr: 'فحص المتجر',
        titleEn: 'E-Store UX, Catalog & SEO Audit',
        titleAr: 'تدقيق تجربة المستخدم في المتجر الإلكتروني',
        descEn: 'Diagnosing product upload gaps, checkout friction, and Arabic/Gulf SEO visibility.',
        descAr: 'تقييم تفصيلي لسرعة المتجر، ترتيب الأقسام، ووصف المنتجات وتحسين الظهور في محركات البحث.',
        imageUrl: '/assets/aistudio/mplan_april_3.jpg',
      },
      {
        num: '04',
        labelEn: 'Social Audit',
        labelAr: 'فحص الصفحات',
        titleEn: 'Facebook (~12.6K) & Instagram Engagement Review',
        titleAr: 'مراجعة حسابات فيسبوك وإنستجرام',
        descEn: 'Pinpointing why engagement lagged behind follower size and fixing posting cadence & bio structure.',
        descAr: 'تحليل أسباب انخفاض التفاعل مقارنة بحجم المتابعين واقتراح تحسينات فورية للتنسيق والمحتوى.',
        imageUrl: '/assets/aistudio/mplan_april_4.jpg',
      },
      {
        num: '05',
        labelEn: 'SWOT',
        labelAr: 'تحليل SWOT',
        titleEn: 'Full SWOT Matrix & Competitive Edge',
        titleAr: 'مصفوفة SWOT وخطة مواجهة التهديدات',
        descEn: 'Highlighting 10-year expertise, inclusive sizing up to 120kg, and competitive 650–1,300 EGP pricing.',
        descAr: 'استثمار الخبرة وتوفر المقاسات الكبيرة والأسعار التنافسية لمضاعفة المبيعات والتوسع الخليجي.',
        imageUrl: '/assets/aistudio/mplan_april_5.jpg',
      },
      {
        num: '06',
        labelEn: 'SMART Goals',
        labelAr: 'الأهداف الذكية',
        titleEn: '5 Measurable SMART Objectives Matrix',
        titleAr: 'جدول الأهداف الخمسة SMART',
        descEn: '100 orders/mo, +30% ER, 1%→3% conversion rate, +5,000 Gulf followers & -40% complaint latency.',
        descAr: 'تحديد دقيق للمعايير القياسية والإجراءات المطلوبة والمدة الزمنية لكل هدف تسويقي.',
        imageUrl: '/assets/aistudio/mplan_april_6.jpg',
      },
      {
        num: '07',
        labelEn: 'Content Plan',
        labelAr: 'استراتيجية المحتوى',
        titleEn: '6-Pillar Content Mix & Audience Angles',
        titleAr: 'مصفوفة المحتوى وتوزيع المحاور',
        descEn: 'Blending styling Reels, customer UGC proof, interactive polls, and seasonal Eid bundles.',
        descAr: 'تنوع متكامل بين ريلز تنسيق الإطلالات وتجارب العميلات والعروض الترويجية الموسمية.',
        imageUrl: '/assets/aistudio/mplan_april_7.jpg',
      },
      {
        num: '08',
        labelEn: 'Action Plan',
        labelAr: 'خطة التنفيذ',
        titleEn: 'Dated Rollout & Ownership Action Table',
        titleAr: 'الجدول الزمني لتنفيذ الخطة',
        descEn: 'Step-by-step operational table assigning store fixes, content batching, and conversion campaigns.',
        descAr: 'جدول المهام والمسؤوليات من تحديث المتجر وإطلاق الحملات حتى القياس والتحسين المستمر.',
        imageUrl: '/assets/aistudio/mplan_april_8.jpg',
      },
    ],
  },
  {
    id: 'ghazali-real-estate',
    deckType: 'Marketing Plan',
    totalSlidesCount: 62,
    clientEn: 'AL-GHAZALI',
    clientAr: 'شركة الغزالي العقارية',
    aboutEn:
      'A Saudi real estate developer founded in 2015 with over 5,000 delivered residential units across Jeddah neighborhoods.',
    aboutAr:
      'مطور عقاري سعودي تأسس عام 2015، نجح في تطوير وتسليم أكثر من 5,000 وحدة سكنية واستثمارية في مدينة جدة.',
    scopeEn:
      'Authored a 62-slide marketing plan auditing digital channels, 4 Saudi developers, 75/20/5 content architecture, and dated schedules.',
    scopeAr:
      'إعداد خطة تسويقية من 62 شريحة تشمل تدقيق الموقع والحسابات، ودراسة 4 مطورين منافسين، واستراتيجية 75/20/5 للوصول لجدة ومكة.',
    highlights: [
      {
        tag: 'DIGITAL AUDIT & BENCHMARK',
        titleEn: 'Web UX • 4 Saudi Competitors Audited',
        titleAr: 'تدقيق المنصات وتحليل 4 منافسين بالسعودية',
        detailAr:
          'مقارنة معيارية مع العجلان ريفيرا والديار العربية ولافيدا وداركو مع توصيات لصفحات مشاريع 107 والواحة 110.',
      },
      {
        tag: 'SAUDI TARGETING',
        titleEn: 'Jeddah & Makkah Segments (Ages 25–45)',
        titleAr: 'استهداف جدة ومكة وتطوير الهوية السعودية',
        detailAr:
          'خطة للتوسع خارج جدة نحو مكة وبناء الثقة لدى الباحثين عن التملك السكني والاستثمار العقاري المضمون.',
      },
      {
        tag: 'CONTENT & ADS SPLIT',
        titleEn: '75/20/5 Content • 80/10/10 Ad Budget',
        titleAr: 'قاعدة محتوى 75/20/5 وإعلانات 80/10/10',
        detailAr:
          'تخصيص 75% محتوى تسويقي ومعماري و20% قيمة مضافة و5% تفاعلي، مع تركيز 80% من الإعلانات على جمع بيانات المهتمين.',
      },
    ],
    slides: [
      {
        num: '01',
        labelEn: 'Cover',
        labelAr: 'الغلاف',
        titleEn: 'Al-Ghazali Real Estate — 62-Slide Marketing Plan',
        titleAr: 'غلاف خطة التسويق — شركة الغزالي العقارية',
        descEn: 'Comprehensive 62-slide real estate marketing plan tailored for Jeddah and Makkah expansion.',
        descAr: 'خطة تسويقية من 62 شريحة لتعزيز الحضور الرقمي ورفع مبيعات المشاريع السكنية في المملكة.',
        imageUrl: '/assets/aistudio/mplan_ghazali_1.jpg',
      },
      {
        num: '02',
        labelEn: 'SOSTAC',
        labelAr: 'نموذج SOSTAC',
        titleEn: 'SOSTAC Real Estate Roadmap',
        titleAr: 'تطبيق نموذج SOSTAC العقاري',
        descEn: 'Mapping channel audits, lead generation goals, Saudi investor positioning, and KPI tracking.',
        descAr: 'منهجية متكاملة تربط تدقيق القنوات الحالية بخطط توليد العملاء المحتملين وإتمام الحجوزات.',
        imageUrl: '/assets/aistudio/mplan_ghazali_2.jpg',
      },
      {
        num: '03',
        labelEn: 'Brand Audit',
        labelAr: 'تدقيق الهوية',
        titleEn: 'Brand Narrative & Trust Signals Review',
        titleAr: 'تقييم عرض القيمة وسجل المشاريع',
        descEn: 'Repositioning Al-Ghazali’s 5,000+ delivered units and post-2015 reliability at the heart of every page.',
        descAr: 'إبراز سجل الإنجازات وتاريخ التأسيس كأقوى نقاط الثقة في تجربة تصفح الموقع والحسابات.',
        imageUrl: '/assets/aistudio/mplan_ghazali_3.jpg',
      },
      {
        num: '04',
        labelEn: 'Competitors',
        labelAr: 'المنافسون',
        titleEn: 'Saudi Developer Benchmark (Al-Ajlan, Darco, Al-Dyar, LaVida)',
        titleAr: 'دراسة 4 مطورين عقاريين منافسين',
        descEn: 'Dissecting competitor websites, social proof storytelling, and property video walkthroughs.',
        descAr: 'تحليل تجربة المواقع والحسابات الرقمية لدى أبرز المنافسين لاستخلاص فرص التميز السريعة.',
        imageUrl: '/assets/aistudio/mplan_ghazali_4.jpg',
      },
      {
        num: '05',
        labelEn: 'SWOT',
        labelAr: 'تحليل SWOT',
        titleEn: 'Real Estate SWOT Diagnosis',
        titleAr: 'تحليل SWOT لشركة الغزالي العقارية',
        descEn: 'Solving irregular digital publishing and SEO gaps while leveraging unit quality and longevity.',
        descAr: 'مقارنة نقاط القوة والخبرة بضعف الظهور الرقمي ورسم فرص التوسع نحو مكة وجذب المستثمرين.',
        imageUrl: '/assets/aistudio/mplan_ghazali_5.jpg',
      },
      {
        num: '06',
        labelEn: '75/20/5 Rule',
        labelAr: 'قاعدة المحتوى',
        titleEn: '75/20/5 Real Estate Content Strategy',
        titleAr: 'توزيع المحتوى 75 - 20 - 5',
        descEn: 'Structuring project tours, investment insights, and community polls across Instagram, X & TikTok.',
        descAr: '75% جولات ومميزات الوحدات، 20% نصائح شراء وتمويل عقاري، و5% تفاعل مباشر مع الجمهور.',
        imageUrl: '/assets/aistudio/mplan_ghazali_6.jpg',
      },
      {
        num: '07',
        labelEn: 'Targeting',
        labelAr: 'الجمهور',
        titleEn: 'Buyer Segmentation & Geo-Targeting (Ages 25–45)',
        titleAr: 'تحديد الجمهور المستهدف والاستهداف الجغرافي',
        descEn: 'Defining messaging for Saudi families and real estate investors across Jeddah and Makkah.',
        descAr: 'تقسيم الشرائح حسب العمر والقدرة الشرائية والاهتمام بالتملك أو الاستثمار في جدة ومكة.',
        imageUrl: '/assets/aistudio/mplan_ghazali_7.jpg',
      },
      {
        num: '08',
        labelEn: 'Action Plan',
        labelAr: 'الجدول الزمني',
        titleEn: 'Dated October Action Plan & Production Schedule',
        titleAr: 'جدول التنفيذ والمواعيد التفصيلي',
        descEn: 'Coordinating site updates, ad account setup, on-site property video shoots, and daily monitoring.',
        descAr: 'خطة مهام مؤرخة تشمل تحديث الموقع، تصوير العقارات بالفيديو، وإطلاق حملات الاختبار.',
        imageUrl: '/assets/aistudio/mplan_ghazali_8.jpg',
      },
    ],
  },
  {
    id: 'muallimi-restaurants',
    deckType: 'Marketing Plan',
    totalSlidesCount: 52,
    clientEn: 'AL-MUALLIMI',
    clientAr: 'مطاعم كبدة المعلمي',
    aboutEn:
      'An iconic Hijazi culinary restaurant chain in Jeddah established in 1980, famed for open-kitchen kebda and authentic local dining.',
    aboutAr:
      'سلسلة مطاعم شعبية عريقة في جدة منذ عام 1980، متخصصة في الكبدة والأكلات الحجازية بأسلوب الطهي المكشوف المباشر.',
    scopeEn:
      'Produced a 52-slide growth plan auditing social/TikTok/Google Maps, 4 Hijazi competitors, 70/20/10 content, and KSA expansion.',
    scopeAr:
      'بناء خطة تسويقية من 52 شريحة تغطي تدقيق السوشيال والخرائط، ودراسة 4 منافسين، وقاعدة 70/20/10 للانطلاق من جدة لمدن المملكة.',
    highlights: [
      {
        tag: 'OMNICHANNEL AUDIT',
        titleEn: 'IG • TikTok • Website & Google Maps Audit',
        titleAr: 'تدقيق السوشيال ميديا والموقع وخرائط جوجل',
        detailAr:
          'تحليل نقاط التحسين في الفيديوهات القصيرة وسهولة الطلب عبر الموقع وتعزيز المراجعات في خرائط جوجل.',
      },
      {
        tag: 'HERITAGE POSITIONING',
        titleEn: 'Since 1980 • Open-Kitchen Authenticity',
        titleAr: 'تراث منذ 1980 وشفافية المطبخ المكشوف',
        detailAr:
          'استثمار العراقة الحجازية والطهي اللحظي أمام العميل في مواجهة 4 سلاسل مطاعم منافسة في جدة.',
      },
      {
        tag: '70/20/10 EXECUTION',
        titleEn: '70/20/10 Content & Ad Rule • Ages 19–60',
        titleAr: 'استراتيجية 70/20/10 واستهداف جدة (19–60)',
        detailAr:
          'تركيز على ريلز المطبخ الحي والأصالة الحجازية مع جدول نشر وتنفيذ يومي لرفع الزيارات والطلبات.',
      },
    ],
    slides: [
      {
        num: '01',
        labelEn: 'Cover',
        labelAr: 'الغلاف',
        titleEn: 'Al-Muallimi Restaurants — 52-Slide Marketing Plan',
        titleAr: 'غلاف خطة تسويق مطاعم المعلمي',
        descEn: 'Elevating an authentic 1980 Hijazi food heritage into a high-performing modern digital brand.',
        descAr: 'خطة تسويقية من 52 شريحة لنقل عراقة مطاعم المعلمي منذ 1980 إلى حضور رقمي متصدر في جدة.',
        imageUrl: '/assets/aistudio/mplan_muallimi_1.jpg',
      },
      {
        num: '02',
        labelEn: 'SOSTAC',
        labelAr: 'منهجية العمل',
        titleEn: 'SOSTAC Hospitality Framework',
        titleAr: 'تطبيق منهجية SOSTAC للمطاعم',
        descEn: 'Connecting local footfall growth, online ordering UX, and viral short-form video storytelling.',
        descAr: 'ربط تجربة المطعم المباشرة مع الطلب عبر الموقع ومحتوى الفيديو القصير على تيك توك وإنستجرام.',
        imageUrl: '/assets/aistudio/mplan_muallimi_2.jpg',
      },
      {
        num: '03',
        labelEn: 'IG Audit',
        labelAr: 'فحص إنستجرام',
        titleEn: 'Instagram Visual Identity & Feed Audit',
        titleAr: 'تقييم حساب إنستجرام والهوية البصرية',
        descEn: 'Upgrading feed consistency, food photography standards, and highlighting the 1980 legacy.',
        descAr: 'توصيات عملية لتوحيد الهوية اللونية وتصوير الأطباق الساخنة وإبراز تاريخ التأسيس في البايو.',
        imageUrl: '/assets/aistudio/mplan_muallimi_3.jpg',
      },
      {
        num: '04',
        labelEn: 'Web Audit',
        labelAr: 'فحص الموقع',
        titleEn: 'Website UX, Menu Navigation & Order Flow Review',
        titleAr: 'تدقيق الموقع الإلكتروني وتجربة الطلب',
        descEn: 'Simplifying dish discovery, branch selection, and direct conversion paths.',
        descAr: 'تحليل واجهة الموقع وسرعة الوصول لقائمة الطعام والفروع لتقليل تسرب الزوار وتحفيز الطلب.',
        imageUrl: '/assets/aistudio/mplan_muallimi_4.jpg',
      },
      {
        num: '05',
        labelEn: 'SWOT',
        labelAr: 'تحليل SWOT',
        titleEn: 'Al-Muallimi Restaurants SWOT Analysis',
        titleAr: 'تحليل SWOT لمطاعم كبدة المعلمي',
        descEn: 'Turning open-kitchen transparency and customization into unstoppable competitive differentiation.',
        descAr: 'تحويل خبرة 45 عامًا والمطبخ المفتوح والطلب حسب رغبة العميل إلى ميزة تتفوق على المنافسين.',
        imageUrl: '/assets/aistudio/mplan_muallimi_5.jpg',
      },
      {
        num: '06',
        labelEn: '70/20/10 Rule',
        labelAr: 'المحتوى',
        titleEn: '70/20/10 Hospitality Content & Ads Split',
        titleAr: 'قاعدة 70 - 20 - 10 للمحتوى والإعلانات',
        descEn: '70% sensory kitchen storytelling, 20% interactive dining polls, and 10% irresistible meal offers.',
        descAr: '70% محتوى حي وترويجي، 20% تفاعلي مع رواد المطعم، و10% عروض وجبات سريعة التحويل.',
        imageUrl: '/assets/aistudio/mplan_muallimi_6.jpg',
      },
      {
        num: '07',
        labelEn: 'Audience',
        labelAr: 'الجمهور',
        titleEn: 'Jeddah Demographic & Taste Targeting (Ages 19–60)',
        titleAr: 'تحليل الجمهور المستهدف في جدة',
        descEn: 'Reaching families, youth dining groups, and loyal lovers of authentic Hijazi breakfast & dinner.',
        descAr: 'استهداف شرائح جدة من سن 19 إلى 60 مع التمهيد للانتشار نحو مدن سعودية جديدة.',
        imageUrl: '/assets/aistudio/mplan_muallimi_7.jpg',
      },
      {
        num: '08',
        labelEn: 'Schedule',
        labelAr: 'خطة التنفيذ',
        titleEn: 'Dated Marketing Rollout Schedule',
        titleAr: 'خطة التنفيذ والجدول الزمني',
        descEn: 'Sequenced activation covering Google Maps optimization, Reels filming, and paid geo-fenced ads.',
        descAr: 'مراحل العمل اليومية والأسبوعية لتنشيط التفاعل وتطوير الحملات الممولة المحيطة بالفروع.',
        imageUrl: '/assets/aistudio/mplan_muallimi_8.jpg',
      },
    ],
  },
  {
    id: 'unitax-elevators',
    deckType: 'Marketing Plan',
    totalSlidesCount: 54,
    clientEn: 'UNITAX ELEVATORS',
    clientAr: 'شركة مصاعد يوني تاكس',
    aboutEn:
      'A Saudi elevator engineering firm backed by 25+ years of technical team experience in installation, maintenance, and modernization.',
    aboutAr:
      'شركة سعودية متخصصة في تركيب وصيانة وتحديث المصاعد، تمتلك فريقًا هندسيًا بخبرة تتجاوز 25 عامًا مع توسع مؤسسي منذ 2022.',
    scopeEn:
      'Created a 54-slide B2B/B2C plan covering website & blog audits, competitor benchmarking, 60/30/10 content, and CPL/CLV KPIs.',
    scopeAr:
      'بناء خطة تسويقية من 54 شريحة تشمل تدقيق الموقع والمدونة، وتحليل المنافسين، وقاعدة محتوى 60/30/10 ومؤشرات القياس CPL وCLV.',
    highlights: [
      {
        tag: 'WEBSITE & SEO AUDIT',
        titleEn: 'Site Speed, Blog & Snapchat Launch',
        titleAr: 'تطوير الموقع وتفعيل المدونة وسناب شات',
        detailAr:
          'تحسين عرض خدمات التركيب والصيانة والتحديث وربط Google Analytics وClarity لفهم رحلة عملاء العقار والمقاولات.',
      },
      {
        tag: 'COMPETITOR BENCHMARK',
        titleEn: 'Audited Builtech & Saudi Elevator Peers',
        titleAr: 'تحليل المنافسين وإبراز خبرة الـ 25 عامًا',
        detailAr:
          'استثمار خبرة الفريق وخدمات ما بعد البيع والالتزام بالهوية السعودية للتفوق في مشاريع الأبراج والفلل.',
      },
      {
        tag: 'B2B / B2C FUNNEL',
        titleEn: '60/30/10 Content • 70/20/10 Ads • CPL KPIs',
        titleAr: 'محتوى 60/30/10 وإعلانات 70/20/10',
        detailAr:
          'استهداف المطورين وملاك المباني (+30 سنة) في المملكة مع تتبع تكلفة العميل المحتمل CPL والقيمة الدائمة CLV.',
      },
    ],
    slides: [
      {
        num: '01',
        labelEn: 'Cover',
        labelAr: 'الغلاف',
        titleEn: 'Unitax Elevator Company — 54-Slide Marketing Plan',
        titleAr: 'غلاف خطة تسويق شركة مصاعد يوني تاكس',
        descEn: 'Industrial B2B and residential B2C digital growth plan anchored on trust and safety standards.',
        descAr: 'خطة تسويقية من 54 شريحة لبناء الثقة وتوليد عقود التركيب والصيانة والتحديث في السوق السعودي.',
        imageUrl: '/assets/aistudio/mplan_unitax_1.jpg',
      },
      {
        num: '02',
        labelEn: 'SOSTAC',
        labelAr: 'نموذج SOSTAC',
        titleEn: 'SOSTAC Engineering Services Framework',
        titleAr: 'هيكل خطة العمل بمنهجية SOSTAC',
        descEn: 'Aligning digital visibility, technical trust signals, and lead-generation funnels.',
        descAr: 'تنظيم محاور التقييم والأهداف والتنفيذ والرقابة لخدمات المصاعد والصيانة الدورية.',
        imageUrl: '/assets/aistudio/mplan_unitax_2.jpg',
      },
      {
        num: '03',
        labelEn: 'Site Audit',
        labelAr: 'فحص الموقع',
        titleEn: 'Website Services & Technical UX Audit',
        titleAr: 'تدقيق الموقع الإلكتروني وعرض الخدمات',
        descEn: 'Highlighting 25+ years of expertise and clarifying installation vs. modernization service pages.',
        descAr: 'تطوير صفحات التركيب والصيانة والتحديث وتقوية إثبات الكفاءة الهندسية أمام شركات المقاولات.',
        imageUrl: '/assets/aistudio/mplan_unitax_3.jpg',
      },
      {
        num: '04',
        labelEn: 'Competitors',
        labelAr: 'المنافسون',
        titleEn: 'Competitive Benchmark (Builtech Saudi)',
        titleAr: 'دراسة المنافسين (شركة بلتك وغيرها)',
        descEn: 'Analyzing competitor digital presence to outperform on responsive quotes and educational trust.',
        descAr: 'مقارنة نقاط القوة والضعف لدى المنافسين واستثمار مرونة الخدمة وسرعة الاستجابة كميزة فارقة.',
        imageUrl: '/assets/aistudio/mplan_unitax_4.jpg',
      },
      {
        num: '05',
        labelEn: 'SWOT',
        labelAr: 'تحليل SWOT',
        titleEn: 'Unitax Elevators SWOT Analysis',
        titleAr: 'تحليل SWOT لشركة يوني تاكس للمصاعد',
        descEn: 'Leveraging 25+ years of team mastery and after-sales support to overcome inconsistent social presence.',
        descAr: 'توظيف الخبرة الميدانية وخدمة ما بعد البيع والانتشار السعودي لتعويض نقص التواجد الاجتماعي.',
        imageUrl: '/assets/aistudio/mplan_unitax_5.jpg',
      },
      {
        num: '06',
        labelEn: '60/30/10 Rule',
        labelAr: 'قاعدة المحتوى',
        titleEn: '60/30/10 Content Strategy Ratio',
        titleAr: 'قاعدة المحتوى 60 - 30 - 10',
        descEn: '60% service showcases & safety guarantees, 30% elevator care education, 10% contract & inspection offers.',
        descAr: '60% محتوى تعريفي وتسويقي بالخدمات، 30% إرشادات أمان وصيانة، و10% عروض العقود والمعاينات.',
        imageUrl: '/assets/aistudio/mplan_unitax_6.jpg',
      },
      {
        num: '07',
        labelEn: 'Audience',
        labelAr: 'الجمهور',
        titleEn: 'B2B Developers & Villa Owners Targeting (30+)',
        titleAr: 'استهداف المطورين وملاك العقارات (+30 سنة)',
        descEn: 'Precision targeting across Saudi residential, commercial towers, and contracting decision-makers.',
        descAr: 'تحديد خصائص صُناع القرار من شركات المقاولات وأصحاب المباني في مختلف مناطق المملكة.',
        imageUrl: '/assets/aistudio/mplan_unitax_7.jpg',
      },
      {
        num: '08',
        labelEn: 'Action Plan',
        labelAr: 'الجدول الزمني',
        titleEn: 'Execution Timeline, Analytics Tracking & KPIs',
        titleAr: 'جدول التنفيذ والربط التحليلي ومؤشرات KPI',
        descEn: 'Connecting GA4, Clarity, GTM & Search Console before launching tracked lead-generation campaigns.',
        descAr: 'ربط أدوات التحليل والبيكسل وإنشاء سناب شات وإطلاق الحملات مع متابعة دقيقة لـ CPL وCLV.',
        imageUrl: '/assets/aistudio/mplan_unitax_8.jpg',
      },
    ],
  },
];

const MarketingPlanCaseStudyBlock: React.FC<{
  plan: MarketingPlanCaseStudy;
  index: number;
  onOpenLightbox?: (post: SocialPost) => void;
}> = ({ plan, index, onOpenLightbox }) => {
  const [slideIdx, setSlideIdx] = useState(0);
  const current = plan.slides[slideIdx];
  const totalShown = plan.slides.length;
  const paddedIndex = String(slideIdx + 1).padStart(2, '0');
  const paddedTotal = String(totalShown).padStart(2, '0');
  const swipe = useHorizontalSwipe(
    () => setSlideIdx((prev) => (prev - 1 + totalShown) % totalShown),
    () => setSlideIdx((prev) => (prev + 1) % totalShown)
  );

  const handleOpenDeckLightbox = () => {
    if (!onOpenLightbox) return;
    const post: SocialPost = {
      id: `mplan-${plan.id}`,
      brandId: 'marketing-plan',
      dateBadge: `${plan.deckType.toUpperCase()} • ${plan.totalSlidesCount} SLIDES`,
      titleEn: `${plan.clientEn} — ${plan.deckType.toUpperCase()}`,
      titleAr: `${plan.deckType === 'Marketing Strategy' ? 'الاستراتيجية التسويقية' : 'الخطة التسويقية'} — ${plan.clientAr}`,
      hookEn: plan.aboutEn,
      hookAr: plan.aboutAr,
      fullCaptionAr: [
        `${plan.clientAr} (${plan.totalSlidesCount} شريحة)`,
        plan.aboutAr,
        plan.scopeAr,
        plan.highlights.map((h) => `• ${h.titleAr}: ${h.detailAr}`).join('\n'),
      ].join('\n\n'),
      imageUrl: current.imageUrl,
      carouselImages: plan.slides.map((s) => s.imageUrl),
      aspectRatio: 'landscape',
      slidesCount: plan.slides.length,
      initialSlideIndex: slideIdx,
      slides: plan.slides.map((s, idx) => ({
        slideNumber: idx + 1,
        title: `${s.titleEn} | ${s.titleAr}`,
        description: `${s.descEn}\n${s.descAr}`,
        imageUrl: s.imageUrl,
      })),
      gradientBg: 'from-[#292524] via-[#1c1917] to-[#0c0a09]',
      emojiIcon: '📈',
      metaInfoEn: `${plan.totalSlidesCount} Slides Deck • Key Excerpts`,
      metaInfoAr: `عرض تقديمي ${plan.totalSlidesCount} شريحة`,
    };
    onOpenLightbox(post);
  };

  return (
    <section id={`project-plan-${plan.id}`} className="scroll-mt-24 py-10 sm:py-14 px-4 sm:px-8 lg:px-10 relative overflow-x-clip">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Header Block: Centered title + 2 concise top-lined info columns */}
        <div className="mb-8 lg:mb-9">
          <div className="text-center mb-6 lg:mb-8">
            <div className="w-fit max-w-full mx-auto relative select-none text-center cursor-default interactive-lockup">
              <h3
                style={{ fontSize: 'clamp(36px, calc(4.4 * var(--vw, 1vw)), 64px)' }}
                className="font-displayEn font-normal uppercase tracking-[0.02em] leading-[0.86] text-heading-linear sm:whitespace-nowrap"
              >
                {plan.clientEn}
              </h3>
              <p
                dir="rtl"
                style={{
                  fontSize: 'clamp(22px, calc(3.1 * var(--vw, 1vw)), 44px)',
                  textShadow: '0 8px 20px rgba(0, 0, 0, 0.9)',
                }}
                className="font-amiri font-bold text-white leading-none text-center -mt-[0.30em] sm:-mt-[0.38em]"
              >
                {plan.clientAr}
              </p>
            </div>
          </div>

          <div data-layout-grid className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
            <div className="border-t border-white/20 pt-3.5 px-2 sm:px-2.5 sm:-mx-2.5 pb-2.5 rounded-b-lg space-y-2 interactive-panel">
              <div className="flex flex-wrap items-baseline gap-1.5 text-[16px]">
                <span className="font-body-plex font-bold text-white">The brand</span>
                <span className="text-white/40">|</span>
                <span dir="rtl" className="font-body-plex font-normal text-[#BDB5B5]">
                  العلامة
                </span>
              </div>
              <p className="font-body-plex text-[16px] text-[#F5F2F1] leading-[1.6] text-left">
                {plan.aboutEn}
              </p>
              <p
                dir="rtl"
                className="font-body-plex text-[16px] text-[#E9DEDE] leading-[1.7] text-right"
              >
                {plan.aboutAr}
              </p>
            </div>

            <div className="border-t border-white/20 pt-3.5 px-2 sm:px-2.5 sm:-mx-2.5 pb-2.5 rounded-b-lg space-y-2 interactive-panel">
              <div className="flex flex-wrap items-baseline gap-1.5 text-[16px]">
                <span className="font-body-plex font-bold text-white">Plan scope</span>
                <span className="text-white/40">|</span>
                <span dir="rtl" className="font-body-plex font-normal text-[#BDB5B5]">
                  نطاق العمل
                </span>
              </div>
              <p className="font-body-plex text-[16px] text-[#F5F2F1] leading-[1.6] text-left">
                {plan.scopeEn}
              </p>
              <p
                dir="rtl"
                className="font-body-plex text-[16px] text-[#E9DEDE] leading-[1.7] text-right"
              >
                {plan.scopeAr}
              </p>
            </div>
          </div>
        </div>

        {/* 3 Key Strategic Highlights Strip — Open hairline editorial layout */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 sm:mb-9">
          {plan.highlights.map((item, idx) => (
            <div
              key={idx}
              className="border-t border-white/15 hover:border-[#b81d33]/65 active:border-[#dc2626] hover:-translate-y-1 active:-translate-y-1 transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] pt-3.5 space-y-1.5 text-center"
            >
              <div className="flex items-center justify-between gap-2 text-[11px] font-body-plex font-semibold tabular-nums tracking-[0.12em] uppercase text-[#BDB5B5]">
                <span>{item.tag}</span>
                <span className="text-[#ef4444] font-bold">0{idx + 1}</span>
              </div>
              <h4 className="font-body-plex font-semibold text-[16px] sm:text-[15px] text-white leading-snug text-center">
                {item.titleEn}
              </h4>
              <p
                dir="rtl"
                className="font-body-plex text-[15px] text-[#E9DEDE] leading-[1.65] text-center"
              >
                {item.titleAr}
              </p>
            </div>
          ))}
        </div>

        {/* Stepper Bar above Slide Deck Stage */}
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mb-5">
          <p className="font-body-plex text-[16px] sm:text-[15px] text-[#F5F2F1] leading-[1.55] text-center sm:text-left">
            Explore key plan chapters or click slide to zoom <span className="text-white/45">|</span>{' '}
            <span className="text-[#E9DEDE]">تصفح محاور الخطة التسويقية أو اضغط للتكبير</span>
          </p>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setSlideIdx((prev) => (prev - 1 + totalShown) % totalShown)}
              className="w-11 h-11 sm:w-9 sm:h-9 rounded-full border border-white/25 hover:border-[#b81d33] hover:bg-[#68101C]/45 flex items-center justify-center text-white transition-colors duration-300 ease-out cursor-pointer"
              aria-label={`Previous slide in ${plan.clientEn}`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="px-4 py-1.5 rounded-lg border border-white/15 bg-black/50 text-xs font-body-plex tabular-nums text-white/95 flex items-center gap-2">
              <span className="text-[#ef4444] font-bold">{paddedIndex}</span>
              <span className="text-white/40">/</span>
              <span className="text-[#BDB5B5]">{paddedTotal}</span>
              <span className="text-white/40">•</span>
              <span className="text-white/95">{current.labelEn}</span>
            </div>

            <button
              type="button"
              onClick={() => setSlideIdx((prev) => (prev + 1) % totalShown)}
              className="w-11 h-11 sm:w-9 sm:h-9 rounded-full border border-white/25 hover:border-[#b81d33] hover:bg-[#68101C]/45 flex items-center justify-center text-white transition-colors duration-300 ease-out cursor-pointer"
              aria-label={`Next slide in ${plan.clientEn}`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Natural-Aspect Marketing Plan Slide Previewer (Zero Cropping for Wide & Tall Slides) */}
        <div className="max-w-5xl mx-auto">
          <div className="relative group/deck">
            <button
              type="button"
              onClick={() => {
                if (!swipe.shouldSuppressClick()) handleOpenDeckLightbox();
              }}
              onTouchStart={swipe.onTouchStart}
              onTouchEnd={swipe.onTouchEnd}
              className="swipe-deck touch-card w-full min-h-[220px] rounded-[8px] overflow-hidden bg-[#0c0908] shadow-lg ring-1 ring-white/12 group-hover/deck:ring-[#b81d33]/80 active:ring-[#dc2626] group-hover/deck:-translate-y-1.5 group-active/deck:-translate-y-1.5 transition-[transform,border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer relative flex items-center justify-center"
              aria-label={`Zoom ${current.titleEn}`}
            >
              <img
                key={current.imageUrl}
                src={current.imageUrl}
                alt={`${plan.clientEn} — ${current.titleEn}`}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[70vh] object-contain bg-[#0c0908] slide-fade-enter"
              />

              <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                <span className="px-3 py-1 rounded-md bg-black/85 border border-white/15 font-body-plex tabular-nums text-[11px] font-semibold text-white tracking-wider">
                  {plan.clientEn} • SLIDE {paddedIndex}/{paddedTotal}
                </span>
                <span className="w-8 h-8 rounded-full bg-black/85 border border-white/15 flex items-center justify-center text-white/85 group-hover/deck:bg-[#68101C] group-hover/deck:text-white transition-colors duration-300 ease-out">
                  <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>
          </div>

          <div key={`mplan-cap-${current.num}`} className="mt-4 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 px-1 slide-fade-enter">
            <div className="space-y-1 text-left">
              <p className="font-displayEn text-[20px] sm:text-[22px] text-white tracking-wide leading-none">
                {current.num}. {current.titleEn}
              </p>
              <p className="font-body-plex text-[16px] sm:text-[15px] text-[#E9DEDE] leading-[1.6]">{current.descEn}</p>
            </div>
            <div dir="rtl" className="space-y-1 text-right">
              <p className="font-body-plex font-bold text-[17px] text-white leading-snug">
                {current.titleAr}
              </p>
              <p className="font-body-plex text-[16px] sm:text-[15px] text-[#E9DEDE] leading-[1.7]">{current.descAr}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {plan.slides.map((slide, idx) => {
              const isActive = idx === slideIdx;
              return (
                <button
                  key={slide.num}
                  type="button"
                  onClick={() => setSlideIdx(idx)}
                  className={`px-3.5 py-2 min-h-[40px] rounded-lg border text-xs font-body-plex transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-out cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'border-[#b81d33] bg-[#68101C]/55 text-white shadow-[0_0_16px_rgba(184,29,51,0.35)]'
                      : 'border-white/15 bg-white/[0.03] text-[#BDB5B5] hover:text-white hover:border-white/40'
                  }`}
                >
                  <span className="font-body-plex tabular-nums font-bold text-[11.5px]">{slide.num}</span>
                  <span>{slide.labelEn}</span>
                  <span className="text-white/35">|</span>
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
            <span>
              Browse Full {plan.deckType} ({plan.totalSlidesCount} Slides)
            </span>
            <span className="text-white/45">|</span>
            <span dir="rtl" className="text-[#E9DEDE]">
              {plan.deckType === 'Marketing Strategy'
                ? 'تصفح الاستراتيجية كاملة'
                : 'تصفح الخطة التسويقية كاملة'}
            </span>
            <Maximize2 className="w-3.5 h-3.5 text-white/70" />
          </button>
        </div>
      </div>
    </section>
  );
};

export const MarketingPlanSection: React.FC<MarketingPlanSectionProps> = ({
  onOpenLightbox,
}) => {
  return (
    <>
      {/* ======================================================== */}
      {/* Section 06 Cover: MARKETING PLAN & STRATEGY              */}
      {/* ======================================================== */}
      <section
        id="marketing-plan"
        className="scroll-mt-20 py-10 sm:py-14 px-4 sm:px-8 lg:px-10 relative overflow-x-clip flex flex-col justify-center items-center"
      >
        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center text-center select-none cursor-default interactive-lockup">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3">
            <span className="w-12 sm:w-16 h-[1px] bg-white/25 divider-line origin-right" />
            <span className="text-[38px] sm:text-[48px] font-displayEn font-normal text-white tracking-[0.06em] leading-none block">
              06
            </span>
            <span className="w-12 sm:w-16 h-[1px] bg-white/25 divider-line origin-left" />
          </div>

          <h2
            className="font-displayEn font-normal uppercase tracking-[0.02em] leading-[0.86] text-heading-linear lg:whitespace-nowrap"
            style={{ fontSize: 'clamp(34px, calc(6.8 * var(--vw, 1vw)), 102px)' }}
          >
            MARKETING PLAN & STRATEGY
          </h2>
          <p
            dir="rtl"
            className="font-amiri font-bold text-white leading-none text-center -mt-[0.24em] sm:-mt-[0.36em]"
            style={{
              fontSize: 'clamp(22px, calc(4.4 * var(--vw, 1vw)), 66px)',
              textShadow: '0 10px 24px rgba(0, 0, 0, 0.9)',
            }}
          >
            الخطط والاستراتيجيات التسويقية
          </p>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5 Complete Marketing Strategy & Plan Case Studies        */}
      {/* ======================================================== */}
      {MARKETING_PLANS.map((plan, idx) => (
        <MarketingPlanCaseStudyBlock
          key={plan.id}
          plan={plan}
          index={idx}
          onOpenLightbox={onOpenLightbox}
        />
      ))}
    </>
  );
};
