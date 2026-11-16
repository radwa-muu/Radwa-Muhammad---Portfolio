import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { SocialPost } from '../utils/portfolioData';
import { useHorizontalSwipe } from '../hooks/useSwipeGesture';

interface CompanyProfileSectionProps {
  onOpenLightbox?: (post: SocialPost) => void;
}

interface BilingualProfilePageMeta {
  num: string;
  labelEn: string;
  labelAr: string;
  titleEn: string;
  titleAr: string;
  copyEn: string;
  copyAr: string;
  arImg: string;
  enImg: string;
}

interface SingleProfilePageMeta {
  num: string;
  labelEn: string;
  labelAr: string;
  titleEn: string;
  titleAr: string;
  copyEn: string;
  copyAr: string;
  imageUrl: string;
}

const CARAVAGGIO_PAGES: BilingualProfilePageMeta[] = [
  {
    num: '01',
    labelEn: 'Cover',
    labelAr: 'الغلاف',
    titleEn: 'Caravaggio Studio Profile — Cover',
    titleAr: 'الملف التعريفي لـ كارافاجيو — الغلاف',
    copyEn: 'Caravaggio Studio Profile — Editorial Renaissance identity introducing a behind-the-scenes creative & engineering partner.',
    copyAr: 'الملف التعريفي لـ ستوديو كارافاجيو — تقديم هوية فنية متكاملة لشريك الإبداع والتطوير خلف الكواليس.',
    arImg: '/assets/aistudio/caravaggio_ar-01.jpg',
    enImg: '/assets/aistudio/caravaggio_en-01.jpg',
  },
  {
    num: '02',
    labelEn: 'About',
    labelAr: 'عنّا',
    titleEn: 'About Caravaggio',
    titleAr: 'ما لا تعلمه عن كارافاجيو',
    copyEn: 'Caravaggio is a behind-the-scenes studio whose team chose to stay in the shadows so marketing agencies can shine in the spotlight—the steady hand mastering design, content, and code.',
    copyAr: 'كارافاجيو هو ستوديو احترافي، اختار فريقه أن يعمل في الظل ليجعل شركات التسويق تتألق في الضوء، بما يعني أننا اليد الخفية التي تتقن تفاصيل التصميم والمحتوى والبرمجة، لنصنع نجاحًا يُنسب إليك أولاً.',
    arImg: '/assets/aistudio/caravaggio_ar-02.jpg',
    enImg: '/assets/aistudio/caravaggio_en-02.jpg',
  },
  {
    num: '03',
    labelEn: 'Vision',
    labelAr: 'الرؤية',
    titleEn: 'Caravaggio Vision',
    titleAr: 'ما هي رؤية كارافاجيو',
    copyEn: 'To be the constant support working backstage—making it easier for marketing agencies to strengthen their presence with clients and achieve results bigger than they imagined.',
    copyAr: 'أن يكون السند الموجود دائمًا خلف الكواليس، الذي يُسهل على شركات التسويق عملها، حتى يقوى حضورها أمام عملائها وحتى تصل إلى نجاح أكبر من الذي كانت تتخيله.',
    arImg: '/assets/aistudio/caravaggio_ar-03.jpg',
    enImg: '/assets/aistudio/caravaggio_en-03.jpg',
  },
  {
    num: '04',
    labelEn: 'Mission',
    labelAr: 'الرسالة',
    titleEn: 'Caravaggio Mission',
    titleAr: 'رسالة كارافاجيو',
    copyEn: 'We stand by agencies whenever they need us, handling details small and large so they stay focused on the bigger picture. We stay in the background, but our hearts are with every achievement that comes to light.',
    copyAr: 'رسالتنا بسيطة، وهي أن نكون الفريق الذي يُساند شركات التسويق وقت الحاجة، ويُشاركها التفاصيل الصغيرة والكبيرة، ويُسهل لها الطريق حتى تُركز هي على صورتها الكبيرة أمام عملائها. نعمل في الخلف، لكن قلوبنا دائمًا مع كل إنجاز يظهر في الأمام.',
    arImg: '/assets/aistudio/caravaggio_ar-04.jpg',
    enImg: '/assets/aistudio/caravaggio_en-04.jpg',
  },
  {
    num: '05',
    labelEn: 'Values',
    labelAr: 'القيم',
    titleEn: 'Caravaggio Values',
    titleAr: 'قيّم كارافاجيو',
    copyEn: '• We Work in the Shadows So You Can Shine.\n• Partners and Friends, Not Just Service Providers.\n• We Care About the Little Details Because They Change Everything.\n• We Listen First, Then Create.\n• We Move Lightly So Your Presence Is Clearer and Stronger.',
    copyAr: '• نعمل في الظل لنمنحك الضوء.\n• نكون شركاء وأصدقاء، ليس مجرّد مزوّدي خدمة.\n• نهتم بأدق التفاصيل لأنها تصنع الفارق.\n• ننصت أولاً، لنبدع لاحقًا.\n• نسير بخفة تجعل حضورك أمام عملائك أوضح وأسهل.',
    arImg: '/assets/aistudio/caravaggio_ar-05.jpg',
    enImg: '/assets/aistudio/caravaggio_en-05.jpg',
  },
  {
    num: '06',
    labelEn: 'Services',
    labelAr: 'الخدمات',
    titleEn: 'What We Do in Caravaggio',
    titleAr: 'خدمات كارافاجيو',
    copyEn: '• Graphic Designers Who Shape Your Visual Identity So It Lasts.\n• UI/UX Designers Who Make the Path Between You and Your Audience Simple.\n• Copywriters & Content Creators Who Tell Your Story as If It Were Their Own.\n• Developers Who Build the Strong Backbone Everything Stands On.',
    copyAr: '• مصمم جرافيك يرسم ملامحك لتبقى في الذاكرة.\n• مصمم UI/UX يسهّل الطريق بينك وبين جمهورك.\n• كاتب محتوى يكتب قصتك كأنها قصته.\n• مبرمج يبني أساسًا صلبًا يقف عليه كل هذا الجمال.',
    arImg: '/assets/aistudio/caravaggio_ar-06.jpg',
    enImg: '/assets/aistudio/caravaggio_en-06.jpg',
  },
  {
    num: '07',
    labelEn: 'Closing',
    labelAr: 'الختام',
    titleEn: 'Partnership Closing',
    titleAr: 'شكرًا لكم على المشاهدة',
    copyEn: "We'd be glad to see this partnership move forward and ready to support your success from day one. We look forward to having you on board soon.",
    copyAr: 'يسعدنا أن نرى هذه الشراكة تتحقق، ونحن جاهزون لدعم نجاحكم من اليوم الأول. نتطلع لانضمامكم إلينا قريبًا.',
    arImg: '/assets/aistudio/caravaggio_ar-07.jpg',
    enImg: '/assets/aistudio/caravaggio_en-07.jpg',
  },
];

const DROOB_PAGES: BilingualProfilePageMeta[] = [
  {
    num: '01',
    labelEn: 'Cover',
    labelAr: 'الغلاف',
    titleEn: 'Droob Golden Trading — Profile Cover',
    titleAr: 'الملف التعريفي لشركة الدروب الذهبية — الغلاف',
    copyEn: 'Bilingual corporate profile introducing Droob Golden Trading Company for heavy trucks, vehicles, and spare parts.',
    copyAr: 'الغلاف الرسمي للملف التعريفي لشركة الدروب الذهبية للتجارة المتخصصة في المركبات وقطع غيار الشاحنات.',
    enImg: '/assets/aistudio/prof_droob_en_1.jpg',
    arImg: '/assets/aistudio/prof_droob_ar_1.jpg',
  },
  {
    num: '02',
    labelEn: 'About & Growth',
    labelAr: 'عن الشركة',
    titleEn: 'Two Decades of Excellence (Est. 2001 → 2024 Expansion)',
    titleAr: 'عن الشركة والتوسع الإقليمي (منذ 2001 ← 2024)',
    copyEn: 'Founded in 2001 and expanded into Saudi Arabia in 2024, building on a strong regional footprint across Egypt, Yemen, and Oman.',
    copyAr: 'انطلقت رحلتنا منذ 2001، وتوسعت عملياتنا نحو المملكة العربية السعودية في 2024 تعزيزًا لحضورنا في مصر واليمن وعُمان.',
    enImg: '/assets/aistudio/prof_droob_en_2.jpg',
    arImg: '/assets/aistudio/prof_droob_ar_2.jpg',
  },
  {
    num: '03',
    labelEn: 'Vision & Mission',
    labelAr: 'الرؤية والرسالة',
    titleEn: 'Our Vision & Message',
    titleAr: 'رؤيتنا ورسالتنا',
    copyEn: 'Leading innovation in vehicle trading and heavy transport spare parts while delivering reliable quality and attentive customer service.',
    copyAr: 'الريادة والابتكار في بيع وشراء المركبات وتوريد قطع غيار النقل الثقيل بأعلى معايير الجودة وخدمة العملاء.',
    enImg: '/assets/aistudio/prof_droob_en_3.jpg',
    arImg: '/assets/aistudio/prof_droob_ar_3.jpg',
  },
  {
    num: '04',
    labelEn: 'Core Values',
    labelAr: 'القيم الأساسية',
    titleEn: '10 Pillars of Corporate Values',
    titleAr: 'قيمنا الجوهرية العشرة',
    copyEn: 'Exceeding quality expectations, customer-first responsiveness, timely fair pricing, trusted long-term partnerships, and continuous improvement.',
    copyAr: 'الالتزام بالجودة، أولوية احتياجات العميل، التسليم في الوقت المحدد بأسعار عادلة، والشراكات طويلة الأمد المبنية على الثقة.',
    enImg: '/assets/aistudio/prof_droob_en_4.jpg',
    arImg: '/assets/aistudio/prof_droob_ar_4.jpg',
  },
  {
    num: '05',
    labelEn: 'Products',
    labelAr: 'منتجاتنا',
    titleEn: 'Our Products Portfolio',
    titleAr: 'قسم المنتجات والتوريدات',
    copyEn: 'Dedicated catalog section showcasing heavy truck components and OEM/aftermarket vehicle spare parts.',
    copyAr: 'قسم مخصص لاستعراض تشكيلة قطع غيار الشاحنات الثقيلة والمركبات عالية الجودة.',
    enImg: '/assets/aistudio/prof_droob_en_5.jpg',
    arImg: '/assets/aistudio/prof_droob_ar_5.jpg',
  },
  {
    num: '06',
    labelEn: 'Customers',
    labelAr: 'عملاؤنا',
    titleEn: 'Our Customers & Partners',
    titleAr: 'شركاء النجاح والعملاء',
    copyEn: 'Dedicated partner showcase highlighting logistics fleets and transport enterprises served across the region.',
    copyAr: 'قسم استعراض قاعدة عملاء الشركة من أساطيل النقل والشركات التجارية في الخليج والمنطقة.',
    enImg: '/assets/aistudio/prof_droob_en_6.jpg',
    arImg: '/assets/aistudio/prof_droob_ar_6.jpg',
  },
  {
    num: '07',
    labelEn: 'Conclusion',
    labelAr: 'الخاتمة',
    titleEn: 'Your Comprehensive Transport Partner',
    titleAr: 'شريكك الموثوق في كل رحلة',
    copyEn: 'Positioned not merely as a supplier, but as a symbol of trust, quality, and reliability across heavy and light transport.',
    copyAr: 'تأكيد الهوية المؤسسية كشريك موثوق يضمن أفضل قطع الغيار بأفضل الأسعار وفي الوقت المناسب للنقل الثقيل والخفيف.',
    enImg: '/assets/aistudio/prof_droob_en_7.jpg',
    arImg: '/assets/aistudio/prof_droob_ar_7.jpg',
  },
  {
    num: '08',
    labelEn: 'Contact',
    labelAr: 'التواصل',
    titleEn: 'Official Contact Channels — Riyadh, Al Sulay',
    titleAr: 'طرق التواصل — الرياض، حي السلي',
    copyEn: 'Direct B2B communication channels: Droob.com.sa • info@droob.com.sa • Riyadh, Al Sulay.',
    copyAr: 'بيانات التواصل الرسمية في حي السلي بالرياض والموقع الإلكتروني والبريد الرسمي.',
    enImg: '/assets/aistudio/prof_droob_en_8.jpg',
    arImg: '/assets/aistudio/prof_droob_ar_8.jpg',
  },
];

const HAYAM_PAGES: SingleProfilePageMeta[] = [
  {
    num: '01',
    labelEn: 'Cover',
    labelAr: 'الغلاف',
    titleEn: 'Podcast With Hayam Al-Barir — Cover',
    titleAr: 'بودكاست مع هيام البرير — من القلب للقلب',
    copyEn: 'Opening identity slide introducing the Sudanese entrepreneurial and humanitarian podcast platform.',
    copyAr: 'غلاف الملف التعريفي: «من القلب للقلب، صوتٌ يُضيء دروب البدايات..» لتقديم رسالة البودكاست الإنسانية.',
    imageUrl: '/assets/aistudio/prof_hayam_1.jpg',
  },
  {
    num: '02',
    labelEn: 'About',
    labelAr: 'عن البودكاست',
    titleEn: 'About the Podcast Initiative',
    titleAr: 'عن بودكاست «مع هيام البرير»',
    copyEn: 'Born from post-war resilience to prove the road does not end at loss—it restarts with inspiring Sudanese founders.',
    copyAr: 'منصة إنسانية وُلدت من رحم المعاناة لتنقل قصص سودانيين تحدّوا الظروف ونجحوا في إعادة بناء مشاريعهم من الصفر.',
    imageUrl: '/assets/aistudio/prof_hayam_2.jpg',
  },
  {
    num: '03',
    labelEn: 'Vision & Values',
    labelAr: 'الرؤية والقيم',
    titleEn: 'Vision, Mission & Core Values',
    titleAr: 'رؤيتنا ورسالتنا وقيمنا',
    copyEn: 'Delivering honest, heartfelt stories without exaggeration while serving as a bridge connecting small projects to their community.',
    copyAr: 'تقديم محتوى صادق وبسيط يجمع بين العفوية والعمق، ودعم المشاريع الصغيرة ومنحها صوتًا يُسمع وحضورًا يُرى.',
    imageUrl: '/assets/aistudio/prof_hayam_3.jpg',
  },
  {
    num: '04',
    labelEn: 'Roadmap Intro',
    labelAr: 'المرحلتان',
    titleEn: 'Two Phases, One Shared Purpose',
    titleAr: 'مرحلتان هدفهما واحد..',
    copyEn: 'Editorial chapter divider transitioning into the two structured execution phases of the show.',
    copyAr: 'فاصل بصري يمهّد للخطة التشغيلية للبودكاست عبر مرحلتين متكاملتين لتمكين رواد الأعمال.',
    imageUrl: '/assets/aistudio/prof_hayam_4.jpg',
  },
  {
    num: '05',
    labelEn: '2 Phases',
    labelAr: 'تفاصيل المراحل',
    titleEn: 'Phase 1 (Success Stories) & Phase 2 (Small Business Support)',
    titleAr: 'المرحلة الأولى: قصص النجاح • المرحلة الثانية: دعم المشاريع',
    copyEn: 'Phase 1 hosts resilient Sudanese entrepreneurs; Phase 2 conducts field visits to document and promote home-based & emerging stores.',
    copyAr: 'المرحلة الأولى تستضيف تجارب النجاح الواقعية، والثانية تزور أصحاب المشاريع الصغيرة وتوثق منتجاتهم وتقدم دعاية مجانية.',
    imageUrl: '/assets/aistudio/prof_hayam_5.jpg',
  },
  {
    num: '06',
    labelEn: 'Partnership',
    labelAr: 'كن شريكًا',
    titleEn: 'Be a Partner in the Message',
    titleAr: 'كن شريكًا في الرسالة..',
    copyEn: 'Invitation divider addressing institutional sponsors and community supporters.',
    copyAr: 'دعوة موجهة للشركات والمؤسسات للانضمام كشركاء أثر في مسيرة البودكاست.',
    imageUrl: '/assets/aistudio/prof_hayam_6.jpg',
  },
  {
    num: '07',
    labelEn: 'Sponsorship',
    labelAr: 'أشكال الرعاية',
    titleEn: 'Sponsorship Tiers & Partnership Benefits',
    titleAr: 'أشكال الرعاية ومزايا الشراكة',
    copyEn: 'Financial, in-kind, and media sponsorships paired with sponsor logo placement, dedicated segments, and community goodwill.',
    copyAr: 'ثلاثة مسارات للرعاية (مالية، عينية، إعلامية) مع مزايا تشمل ظهور الشعار وتخصيص فقرات تعريفية وتعزيز الصورة الإيجابية للراعي.',
    imageUrl: '/assets/aistudio/prof_hayam_7.jpg',
  },
  {
    num: '08',
    labelEn: 'Impact',
    labelAr: 'نصنع الأمل',
    titleEn: 'Together We Create Hope',
    titleAr: 'معًا نصنع الأمل',
    copyEn: 'Emotional closing pitch turning storytelling into real encouragement and tangible societal recovery.',
    copyAr: 'رسالة ختامية ملهمة تحوّل القصص إلى إلهام، والدعم إلى إنجاز، والصوت البسيط إلى رسالة تُحدث فرقًا حقيقيًا.',
    imageUrl: '/assets/aistudio/prof_hayam_8.jpg',
  },
  {
    num: '09',
    labelEn: 'Closing',
    labelAr: 'الختام',
    titleEn: 'Thank You for Watching',
    titleAr: 'شكرًا على المشاهدة',
    copyEn: 'Final brand closing frame.',
    copyAr: 'الشريحة الختامية لهوية بودكاست «مع هيام البرير».',
    imageUrl: '/assets/aistudio/prof_hayam_9.jpg',
  },
];

const ROMARIN_PAGES: BilingualProfilePageMeta[] = [
  {
    num: '01',
    labelEn: 'Cover',
    labelAr: 'الغلاف',
    titleEn: 'Romarin By Chef Rabbeah — Cover',
    titleAr: 'الملف التعريفي لمطعم رومارين — الغلاف',
    copyEn: 'Clean culinary identity cover introducing Romarin By Chef Rabbeah.',
    copyAr: 'غلاف الملف التعريفي لهوية مطعم «رومارين» بقيادة الشيف ربيعة مكوار.',
    enImg: '/assets/aistudio/prof_romarin_1.jpg',
    arImg: '/assets/aistudio/prof_romarin_ar_1.jpg',
  },
  {
    num: '02',
    labelEn: 'About Us',
    labelAr: 'عن المطعم',
    titleEn: 'Mobile Culinary Concept (Est. 2021 — Riyadh)',
    titleAr: 'مطبخ متنقل وتجربة طهي منذ 2021 بالرياض',
    copyEn: 'A mobile gourmet restaurant in Riyadh led by Chef Rabbeah Makwar and a specialized team of roaming chefs crafting bespoke dining experiences.',
    copyAr: 'مطعم متنقل في الرياض منذ 2021 بقيادة الشيف ربيعة مكوار وفريق من الطهاة المحترفين لتقديم تجارب غذائية استثنائية.',
    enImg: '/assets/aistudio/prof_romarin_2.jpg',
    arImg: '/assets/aistudio/prof_romarin_ar_2.jpg',
  },
  {
    num: '03',
    labelEn: 'Vision & Message',
    labelAr: 'الرؤية والرسالة',
    titleEn: 'Vision & Philosophy ("Food is a love language")',
    titleAr: 'الرؤية والرسالة — الطعام لغة حب',
    copyEn: 'Pioneering mobile culinary craftsmanship locally and internationally while honoring fresh ingredients, hygiene, and plate artistry.',
    copyAr: 'الريادة محليًا وعالميًا في خدمات الضيافة المتنقلة وتقديم أطباق مبتكرة من مكونات طازجة تحت رقابة صحية عالية.',
    enImg: '/assets/aistudio/prof_romarin_3.jpg',
    arImg: '/assets/aistudio/prof_romarin_ar_3.jpg',
  },
  {
    num: '04',
    labelEn: 'Core Values',
    labelAr: 'القيم الأساسية',
    titleEn: 'Five Culinary & Service Pillars',
    titleAr: 'قيمنا الأساسية الخمس للضيافة والجودة',
    copyEn: 'Trained service staff, organized plating, strict kitchen hygiene, punctuality, and high-speed event execution.',
    copyAr: 'طاقم خدمة محترف، تقديم منظم للأطباق، رقابة صحية دقيقة، الالتزام بالمواعيد، وسرعة الإنجاز.',
    enImg: '/assets/aistudio/prof_romarin_4.jpg',
    arImg: '/assets/aistudio/prof_romarin_ar_4.jpg',
  },
  {
    num: '05',
    labelEn: 'Services',
    labelAr: 'خدماتنا',
    titleEn: 'Six Bespoke Catering & Consulting Services',
    titleAr: 'الخدمات الست المتخصصة في التجهيز والضيافة',
    copyEn: 'Outdoor party catering, healthy nutritional meals, corporate catering contracts, private aviation dining, food consultations & menu revamps.',
    copyAr: 'كيترنق الحفلات الخارجية، الوجبات الصحية، عقود الشركات، وجبات الطيران الخاص، الاستشارات الغذائية، وتحديث قوائم الطعام.',
    enImg: '/assets/aistudio/prof_romarin_5.jpg',
    arImg: '/assets/aistudio/prof_romarin_ar_5.jpg',
  },
  {
    num: '06',
    labelEn: 'Conclusion',
    labelAr: 'الختام والتواصل',
    titleEn: 'Conclusion & Direct Booking Contact',
    titleAr: 'الخاتمة وقنوات التواصل والحجز',
    copyEn: 'Service quality pledge with direct WhatsApp and call booking details for private and corporate events.',
    copyAr: 'تعهد بتقديم خدمات تتجاوز توقعات العملاء مع رقم الحجز المباشر والبريد الإلكتروني الرسمي.',
    enImg: '/assets/aistudio/prof_romarin_6.jpg',
    arImg: '/assets/aistudio/prof_romarin_ar_6.jpg',
  },
];

export const CompanyProfileSection: React.FC<CompanyProfileSectionProps> = ({ onOpenLightbox }) => {
  const [caravaggioIdx, setCaravaggioIdx] = useState(0);
  const [droobIdx, setDroobIdx] = useState(0);
  const [romarinIdx, setRomarinIdx] = useState(0);
  const [hayamIdx, setHayamIdx] = useState(0);

  const caravaggioCurrent = CARAVAGGIO_PAGES[caravaggioIdx];
  const droobCurrent = DROOB_PAGES[droobIdx];
  const romarinCurrent = ROMARIN_PAGES[romarinIdx];
  const hayamCurrent = HAYAM_PAGES[hayamIdx];

  const caravaggioSwipe = useHorizontalSwipe(
    () => setCaravaggioIdx((prev) => (prev - 1 + CARAVAGGIO_PAGES.length) % CARAVAGGIO_PAGES.length),
    () => setCaravaggioIdx((prev) => (prev + 1) % CARAVAGGIO_PAGES.length)
  );
  const droobSwipe = useHorizontalSwipe(
    () => setDroobIdx((prev) => (prev - 1 + DROOB_PAGES.length) % DROOB_PAGES.length),
    () => setDroobIdx((prev) => (prev + 1) % DROOB_PAGES.length)
  );
  const romarinSwipe = useHorizontalSwipe(
    () => setRomarinIdx((prev) => (prev - 1 + ROMARIN_PAGES.length) % ROMARIN_PAGES.length),
    () => setRomarinIdx((prev) => (prev + 1) % ROMARIN_PAGES.length)
  );
  const hayamSwipe = useHorizontalSwipe(
    () => setHayamIdx((prev) => (prev - 1 + HAYAM_PAGES.length) % HAYAM_PAGES.length),
    () => setHayamIdx((prev) => (prev + 1) % HAYAM_PAGES.length)
  );

  const handleOpenBilingualLightbox = (
    brandKey: 'caravaggio' | 'droob' | 'romarin',
    edition: 'ar' | 'en',
    pages: BilingualProfilePageMeta[],
    activeIdx: number,
    isLandscape: boolean,
    brandEn: string,
    brandAr: string
  ) => {
    if (!onOpenLightbox) return;
    const isAr = edition === 'ar';
    const current = pages[activeIdx];
    const post: SocialPost = {
      id: `${brandKey}-${edition}-profile`,
      brandId: brandKey,
      dateBadge: isAr ? 'ARABIC PROFILE • عربي' : 'ENGLISH PROFILE • إنجليزي',
      titleEn: `${brandEn} — ${isAr ? 'Arabic Edition' : 'English Edition'}`,
      titleAr: `${brandAr} — ${isAr ? 'النسخة العربية' : 'النسخة الإنجليزية'}`,
      hookEn: current.copyEn,
      hookAr: current.copyAr,
      fullCaptionAr: pages.map((p) => `${p.num}. ${p.titleAr}\n${p.copyAr}`).join('\n\n'),
      imageUrl: isAr ? current.arImg : current.enImg,
      carouselImages: pages.map((p) => (isAr ? p.arImg : p.enImg)),
      aspectRatio: isLandscape ? 'landscape' : 'portrait',
      slidesCount: pages.length,
      initialSlideIndex: activeIdx,
      slides: pages.map((p, idx) => ({
        slideNumber: idx + 1,
        title: isAr ? p.titleAr : p.titleEn,
        description: isAr ? p.copyAr : p.copyEn,
        imageUrl: isAr ? p.arImg : p.enImg,
      })),
      gradientBg: 'from-[#292524] via-[#1c1917] to-[#0c0a09]',
      emojiIcon: '📄',
      metaInfoEn: `${pages.length} Pages • ${isAr ? 'Arabic Copy' : 'English Copy'}`,
      metaInfoAr: `${pages.length} صفحات • ${isAr ? 'النسخة العربية' : 'النسخة الإنجليزية'}`,
    };
    onOpenLightbox(post);
  };

  const handleOpenSingleLightbox = (
    brandKey: string,
    brandEn: string,
    brandAr: string,
    pages: SingleProfilePageMeta[],
    activeIdx: number
  ) => {
    if (!onOpenLightbox) return;
    const current = pages[activeIdx];
    const post: SocialPost = {
      id: `${brandKey}-profile`,
      brandId: brandKey,
      dateBadge: `${pages.length} PAGES DECK`,
      titleEn: `${brandEn} — COMPANY PROFILE`,
      titleAr: `${brandAr} — الملف التعريفي`,
      hookEn: current.copyEn,
      hookAr: current.copyAr,
      fullCaptionAr: pages.map((p) => `${p.num}. ${p.titleAr}\n${p.copyAr}`).join('\n\n'),
      imageUrl: current.imageUrl,
      carouselImages: pages.map((p) => p.imageUrl),
      aspectRatio: 'landscape',
      slidesCount: pages.length,
      initialSlideIndex: activeIdx,
      slides: pages.map((p, idx) => ({
        slideNumber: idx + 1,
        title: `${p.titleEn} | ${p.titleAr}`,
        description: `${p.copyEn}\n${p.copyAr}`,
        imageUrl: p.imageUrl,
      })),
      gradientBg: 'from-[#292524] via-[#1c1917] to-[#0c0a09]',
      emojiIcon: '📄',
      metaInfoEn: `${pages.length} Pages Profile`,
      metaInfoAr: `ملف تعريفي من ${pages.length} صفحات`,
    };
    onOpenLightbox(post);
  };

  return (
    <>
      {/* ======================================================== */}
      {/* Section 04 Cover: COMPANY PROFILE CONTENT                */}
      {/* ======================================================== */}
      <section
        id="company-profile"
        className="scroll-mt-20 py-10 sm:py-14 px-4 sm:px-8 lg:px-10 relative overflow-x-clip flex flex-col justify-center items-center"
      >
        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center text-center select-none cursor-default interactive-lockup">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3">
            <span className="w-12 sm:w-16 h-[1px] bg-white/25 divider-line origin-right" />
            <span className="text-[38px] sm:text-[48px] font-displayEn font-normal text-white tracking-[0.06em] leading-none block">
              04
            </span>
            <span className="w-12 sm:w-16 h-[1px] bg-white/25 divider-line origin-left" />
          </div>

          <h2
            className="font-displayEn font-normal uppercase tracking-[0.02em] leading-[0.86] text-heading-linear lg:whitespace-nowrap"
            style={{ fontSize: 'clamp(34px, calc(6.8 * var(--vw, 1vw)), 102px)' }}
          >
            COMPANY PROFILE CONTENT
          </h2>
          <p
            dir="rtl"
            className="font-amiri font-bold text-white leading-none text-center -mt-[0.24em] sm:-mt-[0.36em]"
            style={{
              fontSize: 'clamp(22px, calc(4.4 * var(--vw, 1vw)), 66px)',
              textShadow: '0 10px 24px rgba(0, 0, 0, 0.9)',
            }}
          >
            محتوى الملف التعريفي للشركات
          </p>
        </div>
      </section>

      {/* ======================================================== */}
      {/* Profile 01: CARAVAGGIO STUDIO (Bilingual AR + EN)        */}
      {/* ======================================================== */}
      <section className="py-10 sm:py-14 px-4 sm:px-8 lg:px-10 relative overflow-x-clip">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-8 lg:mb-9">
            <div className="text-center mb-6 lg:mb-8">
              <div className="w-fit max-w-full mx-auto relative select-none text-center cursor-default interactive-lockup">
                <h3
                  className="font-displayEn font-normal uppercase tracking-[0.02em] leading-[0.86] text-heading-linear sm:whitespace-nowrap"
                  style={{ fontSize: 'clamp(36px, calc(4.9 * var(--vw, 1vw)), 70px)' }}
                >
                  CARAVAGGIO STUDIO
                </h3>
                <p
                  dir="rtl"
                  style={{
                    fontSize: 'clamp(24px, calc(3.4 * var(--vw, 1vw)), 48px)',
                    textShadow: '0 8px 20px rgba(0, 0, 0, 0.9)',
                  }}
                  className="font-amiri font-bold text-white leading-none text-center -mt-[0.34em] sm:-mt-[0.42em]"
                >
                  ستوديو كارافاجيو
                </p>
              </div>
            </div>

            <div data-layout-grid className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
              <div className="border-t border-white/20 pt-3.5 px-2 sm:px-2.5 sm:-mx-2.5 pb-2.5 rounded-b-lg space-y-2 interactive-panel">
                <div className="flex flex-wrap items-baseline gap-1.5 text-[15px]">
                  <span className="font-body-plex font-bold text-white">The studio</span>
                  <span className="text-white/35">|</span>
                  <span dir="rtl" className="font-body-plex font-normal text-[#9C9393]">
                    الاستوديو
                  </span>
                </div>
                <p className="font-body-plex text-[14.5px] sm:text-[15px] text-white/90 leading-[1.45] text-left">
                  A creative and technical behind-the-scenes studio empowering marketing agencies across design, UX, copy, and development.
                </p>
                <p
                  dir="rtl"
                  className="font-body-plex text-[14.5px] sm:text-[15px] text-[#E9DEDE]/85 leading-[1.6] text-right"
                >
                  ستوديو إبداعي وبرمجي يعمل في الكواليس لدعم شركات التسويق في التصميم الجرافيكي وتجربة المستخدم والمحتوى والبرمجة.
                </p>
              </div>

              <div className="border-t border-white/20 pt-3.5 px-2 sm:px-2.5 sm:-mx-2.5 pb-2.5 rounded-b-lg space-y-2 interactive-panel">
                <div className="flex flex-wrap items-baseline gap-1.5 text-[15px]">
                  <span className="font-body-plex font-bold text-white">My role</span>
                  <span className="text-white/35">|</span>
                  <span dir="rtl" className="font-body-plex font-normal text-[#9C9393]">
                    دوري
                  </span>
                </div>
                <p className="font-body-plex text-[14.5px] sm:text-[15px] text-white/90 leading-[1.45] text-left">
                  Wrote the complete company profile in both Arabic and English—shaping brand story, vision, mission, values, and services.
                </p>
                <p
                  dir="rtl"
                  className="font-body-plex text-[14.5px] sm:text-[15px] text-[#E9DEDE]/85 leading-[1.6] text-right"
                >
                  كتابة محتوى الملف التعريفي للشركة بالكامل باللغتين العربية والإنجليزية، وصياغة القصة والرؤية والرسالة والقيم والخدمات.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mb-6">
            <p className="font-body-plex text-[14.5px] sm:text-[15px] text-white/85 text-center sm:text-left">
              Click any page to zoom in or flip through both editions <span className="text-white/40">|</span>{' '}
              <span className="text-[#E9DEDE]/85">اضغط للتكبير أو تصفح النسختين</span>
            </p>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setCaravaggioIdx((prev) => (prev - 1 + CARAVAGGIO_PAGES.length) % CARAVAGGIO_PAGES.length)}
                className="w-11 h-11 sm:w-9 sm:h-9 rounded-full border border-white/25 hover:border-[#b81d33] hover:bg-[#68101C]/45 flex items-center justify-center text-white transition-colors duration-300 ease-out cursor-pointer"
                aria-label="Previous Caravaggio profile page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="px-4 py-1.5 rounded-lg border border-white/15 bg-black/50 text-xs font-body-plex tabular-nums text-white/90 flex items-center gap-2">
                <span className="text-[#ef4444] font-bold">{caravaggioCurrent.num}</span>
                <span className="text-white/35">/</span>
                <span className="text-white/60">07</span>
                <span className="text-white/35">•</span>
                <span className="text-white/85">{caravaggioCurrent.labelEn}</span>
              </div>

              <button
                type="button"
                onClick={() => setCaravaggioIdx((prev) => (prev + 1) % CARAVAGGIO_PAGES.length)}
                className="w-11 h-11 sm:w-9 sm:h-9 rounded-full border border-white/25 hover:border-[#b81d33] hover:bg-[#68101C]/45 flex items-center justify-center text-white transition-colors duration-300 ease-out cursor-pointer"
                aria-label="Next Caravaggio profile page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
            <div className="flex flex-col group/prof">
              <button
                type="button"
                onClick={() => {
                  if (caravaggioSwipe.shouldSuppressClick()) return;
                  handleOpenBilingualLightbox(
                    'caravaggio',
                    'en',
                    CARAVAGGIO_PAGES,
                    caravaggioIdx,
                    false,
                    'CARAVAGGIO STUDIO',
                    'ستوديو كارافاجيو'
                  );
                }}
                onTouchStart={caravaggioSwipe.onTouchStart}
                onTouchEnd={caravaggioSwipe.onTouchEnd}
                className="swipe-deck touch-card relative aspect-[1/1.414] rounded-[6px] overflow-hidden bg-[#0e0a09] shadow-lg ring-1 ring-white/10 group-hover/prof:ring-[#b81d33]/80 active:ring-[#dc2626] group-hover/prof:-translate-y-1.5 group-active/prof:-translate-y-1.5 transition-[transform,border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer text-left"
                aria-label={`Open English Profile — ${caravaggioCurrent.titleEn}`}
              >
                <img
                  key={caravaggioCurrent.enImg}
                  src={caravaggioCurrent.enImg}
                  alt={caravaggioCurrent.titleEn}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover slide-fade-enter"
                />
                <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-md bg-black/85 border border-white/15 font-body-plex tabular-nums text-[11px] font-bold text-white tracking-wider">
                    EN EDITION • {caravaggioCurrent.num}/07
                  </span>
                  <span className="w-8 h-8 rounded-full bg-black/85 border border-white/15 flex items-center justify-center text-white/80 group-hover/prof:bg-[#68101C] group-hover/prof:text-white transition-colors duration-300 ease-out">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>

              <div key={`caravaggio-en-${caravaggioCurrent.num}`} className="mt-3.5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center slide-fade-enter">
                <span className="font-displayEn text-[21px] sm:text-[22px] text-white tracking-wide leading-none">
                  ENGLISH VERSION
                </span>
                <span className="text-white/35">|</span>
                <span className="font-body-plex text-[13.5px] text-white/65">
                  {caravaggioCurrent.titleEn}
                </span>
              </div>
            </div>

            <div className="flex flex-col group/prof">
              <button
                type="button"
                onClick={() => {
                  if (caravaggioSwipe.shouldSuppressClick()) return;
                  handleOpenBilingualLightbox(
                    'caravaggio',
                    'ar',
                    CARAVAGGIO_PAGES,
                    caravaggioIdx,
                    false,
                    'CARAVAGGIO STUDIO',
                    'ستوديو كارافاجيو'
                  );
                }}
                onTouchStart={caravaggioSwipe.onTouchStart}
                onTouchEnd={caravaggioSwipe.onTouchEnd}
                className="swipe-deck touch-card relative aspect-[1/1.414] rounded-[6px] overflow-hidden bg-[#0e0a09] shadow-lg ring-1 ring-white/10 group-hover/prof:ring-[#b81d33]/80 active:ring-[#dc2626] group-hover/prof:-translate-y-1.5 group-active/prof:-translate-y-1.5 transition-[transform,border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer text-left"
                aria-label={`Open Arabic Profile — ${caravaggioCurrent.titleAr}`}
              >
                <img
                  key={caravaggioCurrent.arImg}
                  src={caravaggioCurrent.arImg}
                  alt={caravaggioCurrent.titleAr}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover slide-fade-enter"
                />
                <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-md bg-black/85 border border-white/15 font-body-plex tabular-nums text-[11px] font-bold text-white tracking-wider">
                    النسخة العربية • {caravaggioCurrent.num}/07
                  </span>
                  <span className="w-8 h-8 rounded-full bg-black/85 border border-white/15 flex items-center justify-center text-white/80 group-hover/prof:bg-[#68101C] group-hover/prof:text-white transition-colors duration-300 ease-out">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>

              <div key={`caravaggio-ar-${caravaggioCurrent.num}`} className="mt-3.5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center slide-fade-enter">
                <span dir="rtl" className="font-body-plex font-bold text-[17px] text-white leading-none">
                  النسخة العربية
                </span>
                <span className="text-white/35">|</span>
                <span dir="rtl" className="font-body-plex text-[13.5px] text-[#E9DEDE]/75">
                  {caravaggioCurrent.titleAr}
                </span>
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mt-8 flex flex-wrap items-center justify-center gap-2">
            {CARAVAGGIO_PAGES.map((page, idx) => {
              const isActive = idx === caravaggioIdx;
              return (
                <button
                  key={page.num}
                  type="button"
                  onClick={() => setCaravaggioIdx(idx)}
                  className={`px-3.5 py-2 min-h-[40px] rounded-lg border text-xs font-body-plex transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-out cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'border-[#b81d33] bg-[#68101C]/55 text-white shadow-[0_0_16px_rgba(184,29,51,0.35)]'
                      : 'border-white/15 bg-white/[0.03] text-white/65 hover:text-white hover:border-white/40'
                  }`}
                >
                  <span className="font-body-plex tabular-nums font-bold text-[11px]">{page.num}</span>
                  <span>{page.labelEn}</span>
                  <span className="text-white/30">|</span>
                  <span dir="rtl">{page.labelAr}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap justify-center sm:justify-end gap-3 pt-8 sm:pt-10">
            <button
              type="button"
              onClick={() =>
                handleOpenBilingualLightbox(
                  'caravaggio',
                  'en',
                  CARAVAGGIO_PAGES,
                  caravaggioIdx,
                  false,
                  'CARAVAGGIO STUDIO',
                  'ستوديو كارافاجيو'
                )
              }
              className="interactive-btn px-5 sm:px-6 py-2.5 min-h-[44px] rounded-full border border-white/55 hover:border-[#b81d33] hover:bg-[#68101C]/45 text-white/95 cursor-pointer inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-body-plex text-[14px] sm:text-[14.5px] sm:whitespace-nowrap text-center"
            >
              <span>Browse English Deck</span>
              <span className="text-white/45">|</span>
              <span dir="rtl" className="text-[#E9DEDE]">تصفح النسخة الإنجليزية</span>
              <Maximize2 className="w-3.5 h-3.5 text-white/70" />
            </button>

            <button
              type="button"
              onClick={() =>
                handleOpenBilingualLightbox(
                  'caravaggio',
                  'ar',
                  CARAVAGGIO_PAGES,
                  caravaggioIdx,
                  false,
                  'CARAVAGGIO STUDIO',
                  'ستوديو كارافاجيو'
                )
              }
              className="interactive-btn px-5 sm:px-6 py-2.5 min-h-[44px] rounded-full border border-white/55 hover:border-[#b81d33] hover:bg-[#68101C]/45 text-white/95 cursor-pointer inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-body-plex text-[14px] sm:text-[14.5px] sm:whitespace-nowrap text-center"
            >
              <span>Browse Arabic Deck</span>
              <span className="text-white/45">|</span>
              <span dir="rtl" className="text-[#E9DEDE]">تصفح النسخة العربية</span>
              <Maximize2 className="w-3.5 h-3.5 text-white/70" />
            </button>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* Profile 02: DROOB GOLDEN TRADING (Bilingual EN + AR)     */}
      {/* ======================================================== */}
      <section className="py-10 sm:py-14 px-4 sm:px-8 lg:px-10 relative overflow-x-clip">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-8 lg:mb-9">
            <div className="text-center mb-6 lg:mb-8">
              <div className="w-fit max-w-full mx-auto relative select-none text-center cursor-default interactive-lockup">
                <h3
                  className="font-displayEn font-normal uppercase tracking-[0.02em] leading-[0.86] text-heading-linear sm:whitespace-nowrap"
                  style={{ fontSize: 'clamp(36px, calc(4.6 * var(--vw, 1vw)), 66px)' }}
                >
                  DROOB TRADING
                </h3>
                <p
                  dir="rtl"
                  style={{
                    fontSize: 'clamp(22px, calc(3.1 * var(--vw, 1vw)), 44px)',
                    textShadow: '0 8px 20px rgba(0, 0, 0, 0.9)',
                  }}
                  className="font-amiri font-bold text-white leading-none text-center -mt-[0.30em] sm:-mt-[0.38em]"
                >
                  شركة الدروب الذهبية للتجارة
                </p>
              </div>
            </div>

            <div data-layout-grid className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
              <div className="border-t border-white/20 pt-3.5 px-2 sm:px-2.5 sm:-mx-2.5 pb-2.5 rounded-b-lg space-y-2 interactive-panel">
                <div className="flex flex-wrap items-baseline gap-1.5 text-[15px]">
                  <span className="font-body-plex font-bold text-white">The company</span>
                  <span className="text-white/35">|</span>
                  <span dir="rtl" className="font-body-plex font-normal text-[#9C9393]">
                    الشركة
                  </span>
                </div>
                <p className="font-body-plex text-[14.5px] sm:text-[15px] text-white/90 leading-[1.45] text-left">
                  A foreign-investment trading firm founded in 2001 specializing in vehicles and heavy truck spare parts across KSA, Egypt, Yemen, and Oman.
                </p>
                <p
                  dir="rtl"
                  className="font-body-plex text-[14.5px] sm:text-[15px] text-[#E9DEDE]/85 leading-[1.6] text-right"
                >
                  شركة تجارية منذ 2001 متخصصة في بيع وشراء المركبات وتوريد قطع غيار الشاحنات مع توسع إقليمي يشمل السعودية ومصر واليمن وعُمان.
                </p>
              </div>

              <div className="border-t border-white/20 pt-3.5 px-2 sm:px-2.5 sm:-mx-2.5 pb-2.5 rounded-b-lg space-y-2 interactive-panel">
                <div className="flex flex-wrap items-baseline gap-1.5 text-[15px]">
                  <span className="font-body-plex font-bold text-white">My role</span>
                  <span className="text-white/35">|</span>
                  <span dir="rtl" className="font-body-plex font-normal text-[#9C9393]">
                    دوري
                  </span>
                </div>
                <p className="font-body-plex text-[14.5px] sm:text-[15px] text-white/90 leading-[1.45] text-left">
                  Authored the complete corporate profile in Arabic and English, structuring company history, vision, mission, core values, and B2B trust messaging.
                </p>
                <p
                  dir="rtl"
                  className="font-body-plex text-[14.5px] sm:text-[15px] text-[#E9DEDE]/85 leading-[1.6] text-right"
                >
                  كتابة المحتوى التعريفي الكامل باللغتين العربية والإنجليزية، وصياغة القصة التأسيسية والرؤية والرسالة والقيم الجوهرية للثقة المؤسسية.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mb-6">
            <p className="font-body-plex text-[14.5px] sm:text-[15px] text-white/85 text-center sm:text-left">
              Flip through both Arabic & English profile decks <span className="text-white/40">|</span>{' '}
              <span className="text-[#E9DEDE]/85">تصفح النسختين العربية والإنجليزية بالتزامن</span>
            </p>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setDroobIdx((prev) => (prev - 1 + DROOB_PAGES.length) % DROOB_PAGES.length)}
                className="w-11 h-11 sm:w-9 sm:h-9 rounded-full border border-white/25 hover:border-[#b81d33] hover:bg-[#68101C]/45 flex items-center justify-center text-white transition-colors duration-300 ease-out cursor-pointer"
                aria-label="Previous Droob profile page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="px-4 py-1.5 rounded-lg border border-white/15 bg-black/50 text-xs font-body-plex tabular-nums text-white/90 flex items-center gap-2">
                <span className="text-[#ef4444] font-bold">{droobCurrent.num}</span>
                <span className="text-white/35">/</span>
                <span className="text-white/60">08</span>
                <span className="text-white/35">•</span>
                <span className="text-white/85">{droobCurrent.labelEn}</span>
              </div>

              <button
                type="button"
                onClick={() => setDroobIdx((prev) => (prev + 1) % DROOB_PAGES.length)}
                className="w-11 h-11 sm:w-9 sm:h-9 rounded-full border border-white/25 hover:border-[#b81d33] hover:bg-[#68101C]/45 flex items-center justify-center text-white transition-colors duration-300 ease-out cursor-pointer"
                aria-label="Next Droob profile page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
            <div className="flex flex-col group/prof">
              <button
                type="button"
                onClick={() => {
                  if (droobSwipe.shouldSuppressClick()) return;
                  handleOpenBilingualLightbox(
                    'droob',
                    'en',
                    DROOB_PAGES,
                    droobIdx,
                    true,
                    'DROOB GOLDEN TRADING',
                    'شركة الدروب الذهبية للتجارة'
                  );
                }}
                onTouchStart={droobSwipe.onTouchStart}
                onTouchEnd={droobSwipe.onTouchEnd}
                className="swipe-deck touch-card relative aspect-[4/3] rounded-[6px] overflow-hidden bg-[#0e0a09] shadow-lg ring-1 ring-white/10 group-hover/prof:ring-[#b81d33]/80 active:ring-[#dc2626] group-hover/prof:-translate-y-1.5 group-active/prof:-translate-y-1.5 transition-[transform,border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer text-left"
                aria-label={`Open Droob English Profile — ${droobCurrent.titleEn}`}
              >
                <img
                  key={droobCurrent.enImg}
                  src={droobCurrent.enImg}
                  alt={droobCurrent.titleEn}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain bg-[#0c0908] slide-fade-enter"
                />
                <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-md bg-black/85 border border-white/15 font-body-plex tabular-nums text-[11px] font-bold text-white tracking-wider">
                    EN EDITION • {droobCurrent.num}/08
                  </span>
                  <span className="w-8 h-8 rounded-full bg-black/85 border border-white/15 flex items-center justify-center text-white/80 group-hover/prof:bg-[#68101C] group-hover/prof:text-white transition-colors duration-300 ease-out">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>

              <div key={`droob-en-${droobCurrent.num}`} className="mt-3.5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center slide-fade-enter">
                <span className="font-displayEn text-[21px] text-white tracking-wide leading-none">
                  ENGLISH VERSION
                </span>
                <span className="text-white/35">|</span>
                <span className="font-body-plex text-[13.5px] text-white/65">
                  {droobCurrent.titleEn}
                </span>
              </div>
            </div>

            <div className="flex flex-col group/prof">
              <button
                type="button"
                onClick={() => {
                  if (droobSwipe.shouldSuppressClick()) return;
                  handleOpenBilingualLightbox(
                    'droob',
                    'ar',
                    DROOB_PAGES,
                    droobIdx,
                    true,
                    'DROOB GOLDEN TRADING',
                    'شركة الدروب الذهبية للتجارة'
                  );
                }}
                onTouchStart={droobSwipe.onTouchStart}
                onTouchEnd={droobSwipe.onTouchEnd}
                className="swipe-deck touch-card relative aspect-[4/3] rounded-[6px] overflow-hidden bg-[#0e0a09] shadow-lg ring-1 ring-white/10 group-hover/prof:ring-[#b81d33]/80 active:ring-[#dc2626] group-hover/prof:-translate-y-1.5 group-active/prof:-translate-y-1.5 transition-[transform,border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer text-left"
                aria-label={`Open Droob Arabic Profile — ${droobCurrent.titleAr}`}
              >
                <img
                  key={droobCurrent.arImg}
                  src={droobCurrent.arImg}
                  alt={droobCurrent.titleAr}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain bg-[#0c0908] slide-fade-enter"
                />
                <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-md bg-black/85 border border-white/15 font-body-plex tabular-nums text-[11px] font-bold text-white tracking-wider">
                    النسخة العربية • {droobCurrent.num}/08
                  </span>
                  <span className="w-8 h-8 rounded-full bg-black/85 border border-white/15 flex items-center justify-center text-white/80 group-hover/prof:bg-[#68101C] group-hover/prof:text-white transition-colors duration-300 ease-out">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>

              <div key={`droob-ar-${droobCurrent.num}`} className="mt-3.5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center slide-fade-enter">
                <span dir="rtl" className="font-body-plex font-bold text-[17px] text-white leading-none">
                  النسخة العربية
                </span>
                <span className="text-white/35">|</span>
                <span dir="rtl" className="font-body-plex text-[13.5px] text-[#E9DEDE]/75">
                  {droobCurrent.titleAr}
                </span>
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mt-8 flex flex-wrap items-center justify-center gap-2">
            {DROOB_PAGES.map((page, idx) => {
              const isActive = idx === droobIdx;
              return (
                <button
                  key={page.num}
                  type="button"
                  onClick={() => setDroobIdx(idx)}
                  className={`px-3.5 py-2 min-h-[40px] rounded-lg border text-xs font-body-plex transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-out cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'border-[#b81d33] bg-[#68101C]/55 text-white shadow-[0_0_16px_rgba(184,29,51,0.35)]'
                      : 'border-white/15 bg-white/[0.03] text-white/65 hover:text-white hover:border-white/40'
                  }`}
                >
                  <span className="font-body-plex tabular-nums font-bold text-[11px]">{page.num}</span>
                  <span>{page.labelEn}</span>
                  <span className="text-white/30">|</span>
                  <span dir="rtl">{page.labelAr}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap justify-center sm:justify-end gap-3 pt-8 sm:pt-10">
            <button
              type="button"
              onClick={() =>
                handleOpenBilingualLightbox(
                  'droob',
                  'en',
                  DROOB_PAGES,
                  droobIdx,
                  true,
                  'DROOB GOLDEN TRADING',
                  'شركة الدروب الذهبية للتجارة'
                )
              }
              className="interactive-btn px-5 sm:px-6 py-2.5 min-h-[44px] rounded-full border border-white/55 hover:border-[#b81d33] hover:bg-[#68101C]/45 text-white/95 cursor-pointer inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-body-plex text-[14px] sm:text-[14.5px] sm:whitespace-nowrap text-center"
            >
              <span>Browse English Deck</span>
              <span className="text-white/45">|</span>
              <span dir="rtl" className="text-[#E9DEDE]">تصفح النسخة الإنجليزية</span>
              <Maximize2 className="w-3.5 h-3.5 text-white/70" />
            </button>

            <button
              type="button"
              onClick={() =>
                handleOpenBilingualLightbox(
                  'droob',
                  'ar',
                  DROOB_PAGES,
                  droobIdx,
                  true,
                  'DROOB GOLDEN TRADING',
                  'شركة الدروب الذهبية للتجارة'
                )
              }
              className="interactive-btn px-5 sm:px-6 py-2.5 min-h-[44px] rounded-full border border-white/55 hover:border-[#b81d33] hover:bg-[#68101C]/45 text-white/95 cursor-pointer inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-body-plex text-[14px] sm:text-[14.5px] sm:whitespace-nowrap text-center"
            >
              <span>Browse Arabic Deck</span>
              <span className="text-white/45">|</span>
              <span dir="rtl" className="text-[#E9DEDE]">تصفح النسخة العربية</span>
              <Maximize2 className="w-3.5 h-3.5 text-white/70" />
            </button>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* Profile 03: ROMARIN RESTAURANT (Bilingual EN + AR 4:3)   */}
      {/* ======================================================== */}
      <section className="py-10 sm:py-14 px-4 sm:px-8 lg:px-10 relative overflow-x-clip">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-8 lg:mb-9">
            <div className="text-center mb-6 lg:mb-8">
              <div className="w-fit max-w-full mx-auto relative select-none text-center cursor-default interactive-lockup">
                <h3
                  className="font-displayEn font-normal uppercase tracking-[0.02em] leading-[0.86] text-heading-linear sm:whitespace-nowrap"
                  style={{ fontSize: 'clamp(34px, calc(4.3 * var(--vw, 1vw)), 60px)' }}
                >
                  ROMARIN RESTAURANT
                </h3>
                <p
                  dir="rtl"
                  style={{
                    fontSize: 'clamp(22px, calc(3 * var(--vw, 1vw)), 42px)',
                    textShadow: '0 8px 20px rgba(0, 0, 0, 0.9)',
                  }}
                  className="font-amiri font-bold text-white leading-none text-center -mt-[0.30em] sm:-mt-[0.38em]"
                >
                  مطعم رومارين للشيف ربيعة
                </p>
              </div>
            </div>

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
                  A Riyadh-based mobile fine catering brand founded in 2021 by Chef Rabbeah Makwar, serving private events, corporates, and private aviation.
                </p>
                <p
                  dir="rtl"
                  className="font-body-plex text-[14.5px] sm:text-[15px] text-[#E9DEDE]/85 leading-[1.6] text-right"
                >
                  مطعم وخدمة ضيافة متنقلة تأسس في الرياض عام 2021 بقيادة الشيف ربيعة مكوار لتجهيز الحفلات الخاصة والشركات والطيران الخاص.
                </p>
              </div>

              <div className="border-t border-white/20 pt-3.5 px-2 sm:px-2.5 sm:-mx-2.5 pb-2.5 rounded-b-lg space-y-2 interactive-panel">
                <div className="flex flex-wrap items-baseline gap-1.5 text-[15px]">
                  <span className="font-body-plex font-bold text-white">My role</span>
                  <span className="text-white/35">|</span>
                  <span dir="rtl" className="font-body-plex font-normal text-[#9C9393]">
                    دوري
                  </span>
                </div>
                <p className="font-body-plex text-[14.5px] sm:text-[15px] text-white/90 leading-[1.45] text-left">
                  Authored the complete company profile in both Arabic and English—crafting Chef Rabbeah’s vision, 5 core values, and 6 specialized services.
                </p>
                <p
                  dir="rtl"
                  className="font-body-plex text-[14.5px] sm:text-[15px] text-[#E9DEDE]/85 leading-[1.6] text-right"
                >
                  كتابة الملف التعريفي الكامل باللغتين العربية والإنجليزية، وإبراز فلسفة الشيف والقيم الخمس للضيافة والخدمات الست المتخصصة.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mb-6">
            <p className="font-body-plex text-[14.5px] sm:text-[15px] text-white/85 text-center sm:text-left">
              Flip through both English & Arabic profile decks <span className="text-white/40">|</span>{' '}
              <span className="text-[#E9DEDE]/85">تصفح النسختين الإنجليزية والعربية بالتزامن</span>
            </p>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setRomarinIdx((prev) => (prev - 1 + ROMARIN_PAGES.length) % ROMARIN_PAGES.length)}
                className="w-11 h-11 sm:w-9 sm:h-9 rounded-full border border-white/25 hover:border-[#b81d33] hover:bg-[#68101C]/45 flex items-center justify-center text-white transition-colors duration-300 ease-out cursor-pointer"
                aria-label="Previous Romarin profile page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="px-4 py-1.5 rounded-lg border border-white/15 bg-black/50 text-xs font-body-plex tabular-nums text-white/90 flex items-center gap-2">
                <span className="text-[#ef4444] font-bold">{romarinCurrent.num}</span>
                <span className="text-white/35">/</span>
                <span className="text-white/60">06</span>
                <span className="text-white/35">•</span>
                <span className="text-white/85">{romarinCurrent.labelEn}</span>
              </div>

              <button
                type="button"
                onClick={() => setRomarinIdx((prev) => (prev + 1) % ROMARIN_PAGES.length)}
                className="w-11 h-11 sm:w-9 sm:h-9 rounded-full border border-white/25 hover:border-[#b81d33] hover:bg-[#68101C]/45 flex items-center justify-center text-white transition-colors duration-300 ease-out cursor-pointer"
                aria-label="Next Romarin profile page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
            <div className="flex flex-col group/prof">
              <button
                type="button"
                onClick={() => {
                  if (romarinSwipe.shouldSuppressClick()) return;
                  handleOpenBilingualLightbox(
                    'romarin',
                    'en',
                    ROMARIN_PAGES,
                    romarinIdx,
                    true,
                    'ROMARIN RESTAURANT',
                    'مطعم رومارين للشيف ربيعة'
                  );
                }}
                onTouchStart={romarinSwipe.onTouchStart}
                onTouchEnd={romarinSwipe.onTouchEnd}
                className="swipe-deck touch-card relative aspect-[4/3] rounded-[6px] overflow-hidden bg-[#0e0a09] shadow-lg ring-1 ring-white/10 group-hover/prof:ring-[#b81d33]/80 active:ring-[#dc2626] group-hover/prof:-translate-y-1.5 group-active/prof:-translate-y-1.5 transition-[transform,border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer text-left"
                aria-label={`Open Romarin English Profile — ${romarinCurrent.titleEn}`}
              >
                <img
                  key={romarinCurrent.enImg}
                  src={romarinCurrent.enImg}
                  alt={romarinCurrent.titleEn}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain bg-[#0c0908] slide-fade-enter"
                />
                <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-md bg-black/85 border border-white/15 font-body-plex tabular-nums text-[11px] font-bold text-white tracking-wider">
                    EN EDITION • {romarinCurrent.num}/06
                  </span>
                  <span className="w-8 h-8 rounded-full bg-black/85 border border-white/15 flex items-center justify-center text-white/80 group-hover/prof:bg-[#68101C] group-hover/prof:text-white transition-colors duration-300 ease-out">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>

              <div key={`romarin-en-${romarinCurrent.num}`} className="mt-3.5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center slide-fade-enter">
                <span className="font-displayEn text-[21px] text-white tracking-wide leading-none">
                  ENGLISH VERSION
                </span>
                <span className="text-white/35">|</span>
                <span className="font-body-plex text-[13.5px] text-white/65">
                  {romarinCurrent.titleEn}
                </span>
              </div>
            </div>

            <div className="flex flex-col group/prof">
              <button
                type="button"
                onClick={() => {
                  if (romarinSwipe.shouldSuppressClick()) return;
                  handleOpenBilingualLightbox(
                    'romarin',
                    'ar',
                    ROMARIN_PAGES,
                    romarinIdx,
                    true,
                    'ROMARIN RESTAURANT',
                    'مطعم رومارين للشيف ربيعة'
                  );
                }}
                onTouchStart={romarinSwipe.onTouchStart}
                onTouchEnd={romarinSwipe.onTouchEnd}
                className="swipe-deck touch-card relative aspect-[4/3] rounded-[6px] overflow-hidden bg-[#0e0a09] shadow-lg ring-1 ring-white/10 group-hover/prof:ring-[#b81d33]/80 active:ring-[#dc2626] group-hover/prof:-translate-y-1.5 group-active/prof:-translate-y-1.5 transition-[transform,border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer text-left"
                aria-label={`Open Romarin Arabic Profile — ${romarinCurrent.titleAr}`}
              >
                <img
                  key={romarinCurrent.arImg}
                  src={romarinCurrent.arImg}
                  alt={romarinCurrent.titleAr}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain bg-[#0c0908] slide-fade-enter"
                />
                <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-md bg-black/85 border border-white/15 font-body-plex tabular-nums text-[11px] font-bold text-white tracking-wider">
                    النسخة العربية • {romarinCurrent.num}/06
                  </span>
                  <span className="w-8 h-8 rounded-full bg-black/85 border border-white/15 flex items-center justify-center text-white/80 group-hover/prof:bg-[#68101C] group-hover/prof:text-white transition-colors duration-300 ease-out">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>

              <div key={`romarin-ar-${romarinCurrent.num}`} className="mt-3.5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center slide-fade-enter">
                <span dir="rtl" className="font-body-plex font-bold text-[17px] text-white leading-none">
                  النسخة العربية
                </span>
                <span className="text-white/35">|</span>
                <span dir="rtl" className="font-body-plex text-[13.5px] text-[#E9DEDE]/75">
                  {romarinCurrent.titleAr}
                </span>
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mt-8 flex flex-wrap items-center justify-center gap-2">
            {ROMARIN_PAGES.map((page, idx) => {
              const isActive = idx === romarinIdx;
              return (
                <button
                  key={page.num}
                  type="button"
                  onClick={() => setRomarinIdx(idx)}
                  className={`px-3.5 py-2 min-h-[40px] rounded-lg border text-xs font-body-plex transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-out cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'border-[#b81d33] bg-[#68101C]/55 text-white shadow-[0_0_16px_rgba(184,29,51,0.35)]'
                      : 'border-white/15 bg-white/[0.03] text-white/65 hover:text-white hover:border-white/40'
                  }`}
                >
                  <span className="font-body-plex tabular-nums font-bold text-[11px]">{page.num}</span>
                  <span>{page.labelEn}</span>
                  <span className="text-white/30">|</span>
                  <span dir="rtl">{page.labelAr}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap justify-center sm:justify-end gap-3 pt-8 sm:pt-10">
            <button
              type="button"
              onClick={() =>
                handleOpenBilingualLightbox(
                  'romarin',
                  'en',
                  ROMARIN_PAGES,
                  romarinIdx,
                  true,
                  'ROMARIN RESTAURANT',
                  'مطعم رومارين للشيف ربيعة'
                )
              }
              className="interactive-btn px-5 sm:px-6 py-2.5 min-h-[44px] rounded-full border border-white/55 hover:border-[#b81d33] hover:bg-[#68101C]/45 text-white/95 cursor-pointer inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-body-plex text-[14px] sm:text-[14.5px] sm:whitespace-nowrap text-center"
            >
              <span>Browse English Deck</span>
              <span className="text-white/45">|</span>
              <span dir="rtl" className="text-[#E9DEDE]">تصفح النسخة الإنجليزية</span>
              <Maximize2 className="w-3.5 h-3.5 text-white/70" />
            </button>

            <button
              type="button"
              onClick={() =>
                handleOpenBilingualLightbox(
                  'romarin',
                  'ar',
                  ROMARIN_PAGES,
                  romarinIdx,
                  true,
                  'ROMARIN RESTAURANT',
                  'مطعم رومارين للشيف ربيعة'
                )
              }
              className="interactive-btn px-5 sm:px-6 py-2.5 min-h-[44px] rounded-full border border-white/55 hover:border-[#b81d33] hover:bg-[#68101C]/45 text-white/95 cursor-pointer inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-body-plex text-[14px] sm:text-[14.5px] sm:whitespace-nowrap text-center"
            >
              <span>Browse Arabic Deck</span>
              <span className="text-white/45">|</span>
              <span dir="rtl" className="text-[#E9DEDE]">تصفح النسخة العربية</span>
              <Maximize2 className="w-3.5 h-3.5 text-white/70" />
            </button>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* Profile 04: PODCAST WITH HAYAM AL-BARIR (Arabic 16:9)    */}
      {/* ======================================================== */}
      <section className="py-10 sm:py-14 px-4 sm:px-8 lg:px-10 relative overflow-x-clip">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-8 lg:mb-9">
            <div className="text-center mb-6 lg:mb-8">
              <div className="w-fit max-w-full mx-auto relative select-none text-center cursor-default interactive-lockup">
                <h3
                  className="font-displayEn font-normal uppercase tracking-[0.02em] leading-[0.86] text-heading-linear sm:whitespace-nowrap"
                  style={{ fontSize: 'clamp(36px, calc(4.6 * var(--vw, 1vw)), 64px)' }}
                >
                  HAYAM AL-BARIR
                </h3>
                <p
                  dir="rtl"
                  style={{
                    fontSize: 'clamp(22px, calc(3.1 * var(--vw, 1vw)), 44px)',
                    textShadow: '0 8px 20px rgba(0, 0, 0, 0.9)',
                  }}
                  className="font-amiri font-bold text-white leading-none text-center -mt-[0.30em] sm:-mt-[0.38em]"
                >
                  بودكاست مع هيام البرير
                </p>
              </div>
            </div>

            <div data-layout-grid className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
              <div className="border-t border-white/20 pt-3.5 px-2 sm:px-2.5 sm:-mx-2.5 pb-2.5 rounded-b-lg space-y-2 interactive-panel">
                <div className="flex flex-wrap items-baseline gap-1.5 text-[15px]">
                  <span className="font-body-plex font-bold text-white">The project</span>
                  <span className="text-white/35">|</span>
                  <span dir="rtl" className="font-body-plex font-normal text-[#9C9393]">
                    المشروع
                  </span>
                </div>
                <p className="font-body-plex text-[14.5px] sm:text-[15px] text-white/90 leading-[1.45] text-left">
                  A Sudanese humanitarian and entrepreneurship podcast spotlighting resilient business builders and supporting emerging small projects.
                </p>
                <p
                  dir="rtl"
                  className="font-body-plex text-[14.5px] sm:text-[15px] text-[#E9DEDE]/85 leading-[1.6] text-right"
                >
                  مبادرة إعلامية وإنسانية سودانية تنقل قصص الصمود والنجاح في ريادة الأعمال وتدعم المشاريع الصغيرة والناشئة.
                </p>
              </div>

              <div className="border-t border-white/20 pt-3.5 px-2 sm:px-2.5 sm:-mx-2.5 pb-2.5 rounded-b-lg space-y-2 interactive-panel">
                <div className="flex flex-wrap items-baseline gap-1.5 text-[15px]">
                  <span className="font-body-plex font-bold text-white">My role</span>
                  <span className="text-white/35">|</span>
                  <span dir="rtl" className="font-body-plex font-normal text-[#9C9393]">
                    دوري
                  </span>
                </div>
                <p className="font-body-plex text-[14.5px] sm:text-[15px] text-white/90 leading-[1.45] text-left">
                  Crafted the 9-slide Arabic pitch deck—defining brand voice, two-phase roadmap, and financial/in-kind/media sponsorship packages.
                </p>
                <p
                  dir="rtl"
                  className="font-body-plex text-[14.5px] sm:text-[15px] text-[#E9DEDE]/85 leading-[1.6] text-right"
                >
                  كتابة الملف التعريفي والرعائي الكامل في 9 شرائح، وصياغة الرؤية والقيم ومرحلتي الدعم وباقات الرعاية المالية والعينية والإعلامية.
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mb-5">
            <p className="font-body-plex text-[14.5px] sm:text-[15px] text-white/85 text-center sm:text-left">
              Browse all 9 sponsorship deck slides or click to zoom <span className="text-white/40">|</span>{' '}
              <span className="text-[#E9DEDE]/85">تصفح شرائح البودكاست التسع أو اضغط للتكبير</span>
            </p>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setHayamIdx((prev) => (prev - 1 + HAYAM_PAGES.length) % HAYAM_PAGES.length)}
                className="w-11 h-11 sm:w-9 sm:h-9 rounded-full border border-white/25 hover:border-[#b81d33] hover:bg-[#68101C]/45 flex items-center justify-center text-white transition-colors duration-300 ease-out cursor-pointer"
                aria-label="Previous Hayam slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="px-4 py-1.5 rounded-lg border border-white/15 bg-black/50 text-xs font-body-plex tabular-nums text-white/90 flex items-center gap-2">
                <span className="text-[#ef4444] font-bold">{hayamCurrent.num}</span>
                <span className="text-white/35">/</span>
                <span className="text-white/60">09</span>
                <span className="text-white/35">•</span>
                <span className="text-white/85">{hayamCurrent.labelEn}</span>
              </div>

              <button
                type="button"
                onClick={() => setHayamIdx((prev) => (prev + 1) % HAYAM_PAGES.length)}
                className="w-11 h-11 sm:w-9 sm:h-9 rounded-full border border-white/25 hover:border-[#b81d33] hover:bg-[#68101C]/45 flex items-center justify-center text-white transition-colors duration-300 ease-out cursor-pointer"
                aria-label="Next Hayam slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative group/deck">
              <button
                type="button"
                onClick={() => {
                  if (hayamSwipe.shouldSuppressClick()) return;
                  handleOpenSingleLightbox(
                    'hayam-podcast',
                    'HAYAM AL-BARIR PODCAST',
                    'بودكاست مع هيام البرير',
                    HAYAM_PAGES,
                    hayamIdx
                  );
                }}
                onTouchStart={hayamSwipe.onTouchStart}
                onTouchEnd={hayamSwipe.onTouchEnd}
                className="swipe-deck touch-card w-full aspect-video rounded-[8px] overflow-hidden bg-[#0e0a09] shadow-lg ring-1 ring-white/12 group-hover/deck:ring-[#b81d33]/80 active:ring-[#dc2626] group-hover/deck:-translate-y-1.5 group-active/deck:-translate-y-1.5 transition-[transform,border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer relative flex items-center justify-center"
                aria-label={`Zoom ${hayamCurrent.titleEn}`}
              >
                <img
                  key={hayamCurrent.imageUrl}
                  src={hayamCurrent.imageUrl}
                  alt={hayamCurrent.titleAr}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain bg-[#0c0908] slide-fade-enter"
                />
                <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-md bg-black/85 border border-white/15 font-body-plex tabular-nums text-[11px] font-bold text-white tracking-wider">
                    WITH HAYAM AL-BARIR • {hayamCurrent.num}/09
                  </span>
                  <span className="w-8 h-8 rounded-full bg-black/85 border border-white/15 flex items-center justify-center text-white/85 group-hover/deck:bg-[#68101C] group-hover/deck:text-white transition-colors duration-300 ease-out">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            </div>

            <div key={`hayam-cap-${hayamCurrent.num}`} className="mt-4 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 px-1 slide-fade-enter">
              <div className="space-y-0.5 text-left">
                <p className="font-displayEn text-[20px] sm:text-[22px] text-white tracking-wide leading-none">
                  {hayamCurrent.num}. {hayamCurrent.titleEn}
                </p>
                <p className="font-body-plex text-[13.5px] text-white/65">{hayamCurrent.copyEn}</p>
              </div>
              <div dir="rtl" className="space-y-0.5 text-right">
                <p className="font-body-plex font-bold text-[16px] sm:text-[17px] text-white leading-snug">
                  {hayamCurrent.titleAr}
                </p>
                <p className="font-body-plex text-[13.5px] text-[#E9DEDE]/75">{hayamCurrent.copyAr}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {HAYAM_PAGES.map((page, idx) => {
                const isActive = idx === hayamIdx;
                return (
                  <button
                    key={page.num}
                    type="button"
                    onClick={() => setHayamIdx(idx)}
                    className={`px-3.5 py-2 min-h-[40px] rounded-lg border text-xs font-body-plex transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-out cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'border-[#b81d33] bg-[#68101C]/55 text-white shadow-[0_0_16px_rgba(184,29,51,0.35)]'
                        : 'border-white/15 bg-white/[0.03] text-white/65 hover:text-white hover:border-white/40'
                    }`}
                  >
                    <span className="font-body-plex tabular-nums font-bold text-[11px]">{page.num}</span>
                    <span>{page.labelEn}</span>
                    <span className="text-white/30">|</span>
                    <span dir="rtl">{page.labelAr}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center sm:justify-end pt-8 sm:pt-9">
            <button
              type="button"
              onClick={() =>
                handleOpenSingleLightbox(
                  'hayam-podcast',
                  'HAYAM AL-BARIR PODCAST',
                  'بودكاست مع هيام البرير',
                  HAYAM_PAGES,
                  hayamIdx
                )
              }
              className="interactive-btn px-5 sm:px-6 py-2.5 min-h-[44px] rounded-full border border-white/55 hover:border-[#b81d33] hover:bg-[#68101C]/45 text-white/95 cursor-pointer inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-body-plex text-[14px] sm:text-[14.5px] sm:whitespace-nowrap text-center"
            >
              <span>Browse Full Deck (9 Slides)</span>
              <span className="text-white/45">|</span>
              <span dir="rtl" className="text-[#E9DEDE]">تصفح العرض كاملًا</span>
              <Maximize2 className="w-3.5 h-3.5 text-white/70" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
