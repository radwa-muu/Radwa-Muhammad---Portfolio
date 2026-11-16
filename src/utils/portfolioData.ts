/**
 * Detailed content repository for Radwa Muhammad's Portfolio
 * Exactly matching the attached PDF & media files
 */

export interface ServiceItem {
  id: string;
  number: string;
  titleEn: string;
  titleAr: string;
  position: 'top' | 'bottom';
  descEn: string;
  descAr: string;
}

export interface ClientItem {
  id: string;
  nameEn: string;
  nameAr: string;
  subEn?: string;
  subAr?: string;
  iconType: 'scales' | 'medianesta' | 'sylvan' | 'alsawah' | 'worldhunter' | 'doctor' | 'zeldar' | 'mimimo' | 'bitweave';
}

export interface SocialPost {
  id: string;
  brandId: string;
  dateBadge: string;
  titleEn: string;
  titleAr: string;
  hookEn: string;
  hookAr: string;
  fullCaptionAr?: string;
  imageUrl?: string;
  carouselImages?: string[];
  peekImages?: string[];
  slidesCount?: number;
  initialSlideIndex?: number;
  slides?: Array<{
    slideNumber: number;
    title: string;
    description: string;
    imageUrl?: string;
  }>;
  engagement?: string;
  gradientBg: string;
  emojiIcon: string;
  metaInfoEn: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
  metaInfoAr: string;
  creativeDirectionAr?: string;
}

export interface SocialCampaign {
  id: string;
  brandNameEn: string;
  brandNameAr: string;
  campaignLabelEn: string;
  campaignLabelAr: string;
  campaignEn: string;
  campaignAr: string;
  roleLabelEn: string;
  roleLabelAr: string;
  roleEn: string;
  roleAr: string;
  subInfoEn?: string;
  subInfoAr?: string;
  pageButtonTextEn: string;
  pageButtonTextAr: string;
  brandUrl?: string;
  posts: SocialPost[];
}

export interface VideoScript {
  id: string;
  clientId: 'gamal' | 'shahin' | 'sylvan' | 'webbo' | 'medianesta-scripts' | 'medianesta-1' | 'medianesta-2' | 'worldhunter-motion' | 'asas-al-sharq' | 'wavesart' | 'bitweave';
  videoNum: string;
  duration: string;
  titleEn: string;
  titleAr: string;
  quoteEn: string;
  quoteAr: string;
  summaryEn: string;
  summaryAr: string;
  categoryEn: string;
  categoryAr: string;
  videoSrc?: string; // Real MP4 path for Gamal
  posterImg?: string;
  aiGenerated?: boolean;
  scriptFullAr: string;
  scriptFullEn: string;
  visualDirectionAr: string;
  editorNotesAr?: string;
}

export const SERVICES_TIMELINE: ServiceItem[] = [
  {
    id: 's1',
    number: '01',
    titleEn: 'Content Strategy\n& Planning',
    titleAr: 'استراتيجية وتخطيط المحتوى',
    position: 'top',
    descEn: 'Building robust strategic plans aligned with business targets and target audience personas.',
    descAr: 'بناء خطط استراتيجية مدروسة تتماشى مع أهداف البزنس واحتياجات الجمهور المستهدف بدقة.'
  },
  {
    id: 's2',
    number: '02',
    titleEn: 'Creative Ideation\n& Concepts',
    titleAr: 'ابتكار أفكار وتطوير\nالمفاهيم الإبداعية',
    position: 'top',
    descEn: 'Creating unconventional angles and catchy marketing concepts that stick in the audience mind.',
    descAr: 'ابتكار زوايا غير تقليدية ومفاهيم تسويقية تعلق بالأذهان وتلفت الانتباه من الثانية الأولى.'
  },
  {
    id: 's3',
    number: '03',
    titleEn: 'Video Scripts &\nShooting Plans',
    titleAr: 'كتابة سيناريوهات\nوخطط التصوير',
    position: 'top',
    descEn: 'Writing TikTok & Reel scripts with visual camera direction, pacing, and talent instructions.',
    descAr: 'كتابة سكربتات تيك توك وريلز مع التوجيه البصري وحركات الكاميرا وتوجيه الممثلين.'
  },
  {
    id: 's4',
    number: '04',
    titleEn: 'Company\nProfile Writing',
    titleAr: 'كتابة الملف التعريفي للشركات',
    position: 'top',
    descEn: 'Crafting corporate profiles that articulate mission, company story, and unique value proposition.',
    descAr: 'صياغة بروفايل احترافي يبرز قصة الشركة ورسالتها وقيمتها المضافة للعملاء والمستثمرين.'
  },
  {
    id: 's5',
    number: '05',
    titleEn: 'Marketing Plans',
    titleAr: 'الخطط التسويقية',
    position: 'bottom',
    descEn: 'Developing comprehensive marketing campaigns and seasonal roadmaps with KPI monitoring.',
    descAr: 'تطوير خطط تسويقية شاملة للحملات والمواسم مع توزيع القنوات وقياس النتائج.'
  },
  {
    id: 's6',
    number: '06',
    titleEn: 'Social Media\nContent Writing',
    titleAr: 'كتابة محتوى السوشيال ميديا',
    position: 'bottom',
    descEn: 'Writing interactive posts and carousels with compelling hooks tailored to each platform culture.',
    descAr: 'كتابة منشورات وكاروسيلات تفاعلية ذات هوك قوي وصياغة تلائم لغة كل منصة.'
  },
  {
    id: 's7',
    number: '07',
    titleEn: 'Brand Voice\nDevelopment',
    titleAr: 'تطوير الهوية الصوتية\nللعلامة التجارية',
    position: 'bottom',
    descEn: 'Defining tone of voice and persona across all client touchpoints for consistent identity.',
    descAr: 'تحديد النبرة والشخصية الكلامية للعلامة التجارية لتكون متسقة ومميزة في جميع نقاط الاتصال.'
  },
  {
    id: 's8',
    number: '08',
    titleEn: 'Website &\nProduct Copywriting',
    titleAr: 'كتابة محتوى المواقع\nوأوصاف المنتجات',
    position: 'bottom',
    descEn: 'High-converting landing page copy and persuasive product descriptions optimized for action.',
    descAr: 'كتابة نصوص صفحات الهبوط وأوصاف المنتجات بأسلوب مقنع ومحفز للتحويل والشراء.'
  }
];

export const SERVICES_DATA = SERVICES_TIMELINE;

export const CLIENTS_DATA: ClientItem[] = [
  {
    id: 'gamal',
    nameEn: 'GAMAL ABDEL NASSER',
    nameAr: 'جمال عبد الناصر',
    subEn: 'Lawyer',
    subAr: 'محامي',
    iconType: 'scales'
  },
  {
    id: 'medianesta',
    nameEn: 'Medianesta',
    nameAr: 'ميديانيستا',
    iconType: 'medianesta'
  },
  {
    id: 'sylvan',
    nameEn: 'SYLVAN',
    nameAr: 'سيلفان',
    iconType: 'sylvan'
  },
  {
    id: 'alsawah',
    nameEn: 'AL SAWAH GROUP',
    nameAr: 'مجموعة السواح',
    subEn: 'FOR REAL ESTATE AND TOURISM SERVICE',
    subAr: 'للاستثمار العقاري والخدمات السياحية',
    iconType: 'alsawah'
  },
  {
    id: 'worldhunter',
    nameEn: 'WORLD HUNTER',
    nameAr: 'الصياد العالمي',
    iconType: 'worldhunter'
  },
  {
    id: 'doctor',
    nameEn: 'Prof. Dr. Ahmed El-Houfy',
    nameAr: 'أحمد الحوفي',
    subEn: 'Professor Doctor',
    subAr: 'الأستاذ الدكتور',
    iconType: 'doctor'
  },
  {
    id: 'zeldar',
    nameEn: 'ZEL ELDAR',
    nameAr: 'ظل الدار',
    iconType: 'zeldar'
  },
  {
    id: 'mimimo',
    nameEn: 'Mimi Mo',
    nameAr: 'ميمي مو',
    subEn: 'Made with love • Worn with joy',
    iconType: 'mimimo'
  },
  {
    id: 'bitweave',
    nameEn: 'bitweave',
    nameAr: 'بت ويف',
    subEn: 'DIGITAL SOLUTIONS',
    subAr: 'حلول رقمية',
    iconType: 'bitweave'
  }
];

export const SELECTED_WORK_ITEMS = [
  { number: '01', titleEn: 'Social Media Content', titleAr: 'محتوى السوشيال ميديا', targetId: 'social-media-content' },
  { number: '02', titleEn: 'Scripts', titleAr: 'السكربتات', targetId: 'scripts' },
  { number: '03', titleEn: 'Scripts for Motion Videos', titleAr: 'سكربتات فيديوهات الموشن', targetId: 'motion-scripts' },
  { number: '04', titleEn: 'Company Profile Content', titleAr: 'محتوى الملف التعريفي للشركات', targetId: 'company-profile' },
  { number: '05', titleEn: 'Content Strategy', titleAr: 'استراتيجية المحتوى', targetId: 'content-strategy' },
  { number: '06', titleEn: 'Marketing Plan & Marketing Strategy', titleAr: 'الخطة التسويقية والاستراتيجية التسويقية', targetId: 'marketing-plan' }
];

export const SOCIAL_CAMPAIGNS: Record<string, SocialCampaign> = {
  mimimo: {
    id: 'mimimo',
    brandNameEn: 'MIMI MO',
    brandNameAr: 'ميـــمي مو',
    campaignLabelEn: 'The campaign',
    campaignLabelAr: 'الحملة',
    campaignEn: 'A teaser campaign launching a new innerwear line for boys aged 7 to 13.',
    campaignAr: 'حملة تشويقية لإطلاق خط جديد من الملابس الداخلية للأولاد من 7 إلى 13 سنة.',
    roleLabelEn: 'My role',
    roleLabelAr: 'دوري',
    roleEn: 'Wrote the posts and the design direction for the designer explaining how to execute each visual.',
    roleAr: 'كتابة المنشورات، وكتابة التوجيه الإبداعي للمصمم لتنفيذ التصاميم.',
    pageButtonTextEn: 'View the brand page (Facebook)',
    pageButtonTextAr: 'صفحة البراند (فيسبوك)',
    brandUrl: 'https://www.facebook.com/share/19eSeeGX3Y/?mibextid=wwXIfr',
    posts: [
      {
        id: 'mm-1',
        brandId: 'mimimo',
        dateBadge: '23 FEB',
        titleEn: 'Guess What’s Coming? Baby Boss Phase',
        titleAr: 'تفتكري إيه جديدنا؟',
        hookEn: 'Something in between, just like a Baby Boss.. made it a bit easier for you..',
        hookAr: '«جديد "MiMi Mo" لا هو صغير أوي، ولا هو كبير أوي، هو حاجة في النص زي الـ "Baby Boss" كده بالظبط، سهلناها عليكِ شوية..»',
        imageUrl: '/assets/aistudio/7cbcbfef-04bd-4390-aa23-05d07971c793_4809510e.jpg',
        gradientBg: 'from-[#ea580c] via-[#c2410c] to-[#7c2d12]',
        emojiIcon: '👶💼',
        metaInfoEn: '23 FEB • Teaser Launch',
        metaInfoAr: '23 فبراير • منشور تشويقي',
        creativeDirectionAr: 'تصميم يبرز شخصية كرتونية لطفل ببدلة رسمية ونظرة مرحة وذكية تشبه Baby Boss.'
      },
      {
        id: 'mm-2',
        brandId: 'mimimo',
        dateBadge: '24 FEB',
        titleEn: 'Not Every Age is the Same: The Confusing Phase',
        titleAr: 'مش كل سن زي التاني',
        hookEn: 'At this age, the boy is neither an infant needing care every two hours, nor an adult who can bear just any fabric..',
        hookAr: '«في سِن الولد فيه مبيبقاش صغير محتاج عناية كل ساعتين، ولا كبير يقدر يستحمل أيّ لبس وخلاص..»',
        imageUrl: '/assets/aistudio/900d418d-bde3-4871-b7d2-f93bf28ac290_eee3611c.jpg',
        gradientBg: 'from-[#0284c7] via-[#0369a1] to-[#075985]',
        emojiIcon: '👦👔',
        metaInfoEn: '24 FEB • Relatable Problem',
        metaInfoAr: '24 فبراير • تحديد الفئة العمرية',
        creativeDirectionAr: 'مقارنة بصرية بين طفل رضيع وطفل في سن المدرسة الابتدائية لإبراز الفجوة في مقاسات السوق.'
      },
      {
        id: 'mm-3',
        brandId: 'mimimo',
        dateBadge: '25 FEB',
        titleEn: 'Next Mission: Comfort & Durability',
        titleAr: 'المهمة القادمة محتاجة خطة محكمة..',
        hookEn: 'What bothers your son most in clothes at this age? Loose elastic bands or pilling fabric?',
        hookAr: '«تفتكري إيه أكتر حاجة بتضايق ابنك في هدومه في السن ده؟ هل الأستك الّي بيفك؟ ولا الخامة الّي بتبدأ توبر وتضايقه؟»',
        imageUrl: '/assets/aistudio/134740a9-e7eb-4612-b7e0-6bf6815171d1_08729667.jpg',
        gradientBg: 'from-[#d97706] via-[#b45309] to-[#78350f]',
        emojiIcon: '💼🕶️',
        metaInfoEn: '25 FEB • Quality Pain-point',
        metaInfoAr: '25 فبراير • استطلاع تفاعلي',
        creativeDirectionAr: 'التركيز على تفاصيل الخياطة الناعمة والمطاط الطبيعي غير الضاغط مع حقيبة مهمات سرية.'
      },
      {
        id: 'mm-4',
        brandId: 'mimimo',
        dateBadge: '26 FEB',
        titleEn: 'Growing Up: Sizes & Confident Colors',
        titleAr: 'البيبي كبر واحتياجاته كبرت معاه',
        hookEn: 'How many different sizes do you expect in the new line? And will the colors be soft or bold?',
        hookAr: '«تفتكري اللاين الجديد فيه كام مقاس مختلف، وهل تتوقعي ألوانه هتكون هادية ولا جريئة؟»',
        imageUrl: '/assets/aistudio/0fef113b-aaa0-46d4-a607-66b26ff547a9_e9705921.jpg',
        gradientBg: 'from-[#2563eb] via-[#1d4ed8] to-[#1e40af]',
        emojiIcon: '🦸‍♂️🌟',
        metaInfoEn: '26 FEB • Product Anticipation',
        metaInfoAr: '26 فبراير • تشويق للألوان والمقاسات',
        creativeDirectionAr: 'شخصية الطفل مرتدياً رداء بطل خارق أزرق، لتعزيز فكرة القوة والثقة بالنفس.'
      },
      {
        id: 'mm-5',
        brandId: 'mimimo',
        dateBadge: '28 FEB',
        titleEn: 'Official Launch: Boys 7 to 13 Years',
        titleAr: 'معدات البطل بقت جاهزة',
        hookEn: 'Today we officially announce the new MiMi Mo line dedicated to big heroes aged 7 to 13 years.',
        hookAr: '«النهاردة بنعلن رسميًا عن انطلاق لاين "MiMi Mo" الجديد المخصص للأبطال الكبار من سن (7 لـ 13 سنة).»',
        imageUrl: '/assets/aistudio/988b152b-8783-44aa-b300-703da3591df2_d48b60a3.jpg',
        gradientBg: 'from-[#059669] via-[#047857] to-[#064e3b]',
        emojiIcon: '🚀✨',
        metaInfoEn: '28 FEB • Launch Reveal',
        metaInfoAr: '28 فبراير • الإعلان الرسمي',
        creativeDirectionAr: 'كشف المنتج النهائي في بيئة أنيقة مع عبوة فاخرة وشعار MiMi Mo المذهب أمام المرآة.'
      }
    ]
  },

  medianesta: {
    id: 'medianesta',
    brandNameEn: 'MEDIANESTA',
    brandNameAr: 'ميـــديانيستا',
    campaignLabelEn: 'The platform',
    campaignLabelAr: 'المنصة',
    campaignEn: 'A Saudi platform connecting clients with freelancers, and the other way around.',
    campaignAr: 'منصة سعودية تربط العملاء بالمستقلين، والعكس.',
    roleLabelEn: 'My role',
    roleLabelAr: 'دوري',
    roleEn: 'Responsible for all of the content.',
    roleAr: 'مسؤولة عن المحتوى بالكامل.',
    subInfoEn: 'Three Instagram carousels, each one a multi-slide visual stack',
    subInfoAr: 'ثلاثة منشورات متعددة الشرائح على إنستغرام (كاروسيل تفاعلي)',
    pageButtonTextEn: 'View on Instagram',
    pageButtonTextAr: 'صفحة البراند على إنستغرام',
    brandUrl: 'https://www.instagram.com/medianesta_ksa?psln=dnowZm9ncGxrZzVx',
    posts: [
      {
        id: 'med-1',
        brandId: 'medianesta',
        dateBadge: '45-DAY PLAN | خطة الـ45 يومًا',
        titleEn: 'The 45-Day Plan: From Unknown Freelancer to In-Demand Pro',
        titleAr: 'خطة الـ 45 يومًا: من فريلانسر مغمور إلى محترف يُطلب بالاسم',
        hookEn: 'In this carousel we gave you the blueprint to transform from someone searching for gigs into a sought-after professional on Medianesta..',
        hookAr: '«في هذا الكاروسيل عطيناك الزبدة عشان تتحوّل من شخص يدوّر على شغل، إلى مُحترف العملاء يدوّرون عليه في ميديانيستا..»',
        imageUrl: '/assets/cropped/med_08.webp',
        carouselImages: [
          '/assets/cropped/med_08.webp',
          '/assets/cropped/med_09.webp',
          '/assets/cropped/med_10.webp',
          '/assets/cropped/med_11.webp',
          '/assets/cropped/med_12.webp'
        ],
        slidesCount: 5,
        slides: [
          { slideNumber: 1, title: 'خطة الـ 45 يومًا: من فريلانسر مغمور إلى محترف يُطلب بالاسم', description: 'الخطة العملية لبناء البروفايل، جذب أول عميل، وتأسيس سمعة مستدامة في السوق السعودي.', imageUrl: '/assets/cropped/med_08.webp' },
          { slideNumber: 2, title: 'المرحلة الأولى: تهيئة البروفايل (الأيام 1-15)', description: 'عرض الخدمات بصياغة بيعية مباشرة تسلط الضوء على القيمة المضافة وليس فقط الأدوات.', imageUrl: '/assets/cropped/med_09.webp' },
          { slideNumber: 3, title: 'المرحلة الثانية: استهداف المشاريع النوعية (الأيام 16-30)', description: 'كيفية كتابة Proposal مخصص يحل مشكلة العميل ويجذب رده في دقائق.', imageUrl: '/assets/cropped/med_10.webp' },
          { slideNumber: 4, title: 'المرحلة الثالثة: تحويل العميل إلى شريك دائم (الأيام 31-45)', description: 'استراتيجيات ما بعد التسليم، تقييمات الـ 5 نجوم، وطلب الإحالات.', imageUrl: '/assets/cropped/med_11.webp' },
          { slideNumber: 5, title: 'الخلاصة والخطوة التالية', description: 'ابدأ الآن التسجيل في منصة ميديانيستا لتنفيذ خطتك خطوة بخطوة.', imageUrl: '/assets/cropped/med_12.webp' }
        ],
        gradientBg: 'from-[#065f46] via-[#047857] to-[#022c22]',
        emojiIcon: '📈⭐',
        metaInfoEn: '5 slides • Career Transformation',
        metaInfoAr: '5 شرائح تعليمية • إنستغرام كاروسيل'
      },
      {
        id: 'med-2',
        brandId: 'medianesta',
        dateBadge: 'WINNING PROPOSALS | العرض القوي',
        titleEn: 'Writing an Irresistible Proposal for Saudi Clients',
        titleAr: 'الصياغة القوية لـ Proposal يصعب رفضه من العميل السعودي',
        hookEn: 'The Saudi client looks for someone who provides peace of mind and understands their unique business dilemma..',
        hookAr: '«العميل السعودي يدوّر على الشخص اللي يريّح باله، واللي فاهم مشكلته، عشان يقدر يعطيه قيمة حقيقية في النهاية.. سوي Save للبوست.»',
        imageUrl: '/assets/cropped/med_05.webp',
        carouselImages: [
          '/assets/cropped/med_05.webp',
          '/assets/cropped/med_06.webp',
          '/assets/cropped/med_07.webp'
        ],
        slidesCount: 3,
        slides: [
          { slideNumber: 1, title: 'الصياغة القوية لـ Proposal يصعّب رفضه', description: 'إذا عندك تصميم، برمجة، تسويق، أو كتابة محتوى.. الصيغة التي تجلب موافقة العميل السعودي.', imageUrl: '/assets/cropped/med_05.webp' },
          { slideNumber: 2, title: 'هذا شكل الـ Proposal اللي يصيد العميل...', description: 'نموذج تطبيقي عملي يبدأ بمشكلة العميل، ويقترح الحل، ويثبت القيمة المضافة مع جدول زمني محكم.', imageUrl: '/assets/cropped/med_06.webp' },
          { slideNumber: 3, title: 'العميل السعودي يدوّر على الشخص اللي يريّح باله..', description: 'سوي Save للبوست عشان ترجع لهذي الصيغة مرة ثانية وابدأ التقديم على ميديانيستا.', imageUrl: '/assets/cropped/med_07.webp' }
        ],
        gradientBg: 'from-[#0d9488] via-[#0f766e] to-[#115e59]',
        emojiIcon: '🤝💼',
        metaInfoEn: '3 slides • Proposal Masterclass',
        metaInfoAr: '3 شرائح احترافية • دليل العروض'
      },
      {
        id: 'med-3',
        brandId: 'medianesta',
        dateBadge: 'SERVICE DESCRIPTIONS | وصف الخدمات',
        titleEn: 'Great At What You Do But Hate Writing Service Descriptions?',
        titleAr: 'فنان في شغلك بس تكره حوسة كتابة "وصف الخدمة"؟',
        hookEn: 'Your craft is your capital, do not let writing two lines hold you back from growing your income..',
        hookAr: '«مهارتك هي رأس مالك، لا تخلي "كتابة سطرين" تعطلك عن زيادة دخلك.. أنت بس سجّل وميديانيستا تكمل عنك.»',
        imageUrl: '/assets/cropped/med_01.webp',
        carouselImages: [
          '/assets/cropped/med_01.webp',
          '/assets/cropped/med_02.webp',
          '/assets/cropped/med_04.webp'
        ],
        slidesCount: 3,
        slides: [
          { slideNumber: 1, title: 'فنان في شغلك بس تكره حوسة كتابة "وصف الخدمة"؟', description: 'مهارتك هي رأس مالك، لا تخلي "كتابة سطرين" تعطلك عن زيادة دخلك.', imageUrl: '/assets/cropped/med_01.webp' },
          { slideNumber: 2, title: 'كم مرة تراجعت عن التسجيل بمنصة عمل حر عشان هالسبب؟', description: 'أنت (مبرمج، مصمم، أو مهندس) طبيعي إنك تحب تشتغل بيدك وتكره تضيع وقتك في التفكير بكلمات تسويقية تقنع العميل.', imageUrl: '/assets/cropped/med_02.webp' },
          { slideNumber: 3, title: 'بـ "ميديانيستا" وفرنا لك "المُسوق السري"..', description: 'أداة ذكاء اصطناعي مدمجة داخل المنصة تصيغ وترتب لك وصف خدماتك بكلمات احترافية وجذابة في ثوانٍ معدودة.', imageUrl: '/assets/cropped/med_04.webp' }
        ],
        gradientBg: 'from-[#1e40af] via-[#1e3a8a] to-[#172554]',
        emojiIcon: '✍️🔥',
        metaInfoEn: '3 slides • High-Conversion Copy',
        metaInfoAr: '3 شرائح عملية • كتابة وصف الخدمات'
      }
    ]
  },

  worldhunter: {
    id: 'worldhunter',
    brandNameEn: 'WORLD HUNTER',
    brandNameAr: 'الصـــياد العالمي',
    campaignLabelEn: 'The client',
    campaignLabelAr: 'العميل',
    campaignEn: 'A seafood restaurant chain in Saudi Arabia with three branches, run by Egyptian owners.',
    campaignAr: 'سلسلة مطاعم متخصصة في الأسماك والمأكولات البحرية في السعودية، بثلاثة فروع، يملكها مصريون.',
    roleLabelEn: 'My role',
    roleLabelAr: 'دوري',
    roleEn: 'Fully responsible for the content, briefed the designer, and sometimes made the base images with AI.',
    roleAr: 'مسؤولة عن المحتوى بالكامل، وإعداد التوجيه للمصمم، وتنفيذ الصور الأساسية بالذكاء الاصطناعي أحيانًا.',
    pageButtonTextEn: 'View the brand page',
    pageButtonTextAr: 'صفحة البراند',
    brandUrl: 'https://www.facebook.com/share/1EdwpD1Tt3/?mibextid=wwXIfr',
    posts: [
      {
        id: 'wh-1',
        brandId: 'worldhunter',
        dateBadge: '6 MAR',
        titleEn: 'Ramadan Feast Platter at Half Price',
        titleAr: 'صينية لمة رمضان بنص السعر: صينية تملى العين',
        hookEn: 'Mid-month arrived and gatherings became sweeter, so the Ramadan gathering platter became half price..',
        hookAr: '«وصلنا نص الشهر واللمة زادت حلاتها، وعشان كذا صينية "لمة رمضان" صارت بنص السعر..»',
        fullCaptionAr: `وصلنا نص الشهر واللمة زادت حلاتها، وعشان كذا صينية "لمة رمضان" صارت بنص السعر 🤩

كل الي تحبه السفرة في صينية واحدة وبـ 175 ريال بس..

وش داخل الصينية ؟
(كيلو دنيس مشوي + طاجن فياجرا "جمبري وسبيط" + 10 حبات جمبري + نص كيلو فيليه + 6 مشروبات + سمبوسة + أرز + سلطات).

لحّقوا العرض قبل زحمة العشر الأواخر ✋🏻

للطلب تواصلوا معنا على :
0596699459
0553380773

📍 فروعنا :
- فرع حي المربع شارع الأمير، فيصل بن تركي بجوار "لولو ماركت" (مغلق لمدة أسبوع لأعمال الصيانة، ولكن نستقبل طلباتكم بـ فرع الخليج)
- فرع حي الخليج شارع الشيخ حسن بن حسين، أمام "الحمراء مول"

#سلسلة_مطاعم_الصياد_العالمي #أسماك #سي_فود #مطاعم_الرياض`,
        imageUrl: '/assets/aistudio/1915590e-ed41-4da8-b79a-4c6672bfe413_2717de62.jpg',
        aspectRatio: 'portrait',
        gradientBg: 'from-[#7c2d12] via-[#451a03] to-[#292524]',
        emojiIcon: '🥘🏮',
        metaInfoEn: 'SAR 175 • Al-Khaleej Branch',
        metaInfoAr: 'بـ 175 ريال • حي الخليج، شارع الشيخ حسن بن حسين'
      },
      {
        id: 'wh-2',
        brandId: 'worldhunter',
        dateBadge: '4 APR',
        titleEn: 'Captain Salama Anchors at Al-Khaleej Branch',
        titleAr: 'الريس سلامة وصل فرع الخليج: صيدة تبيض الوجه',
        hookEn: 'Captain Salama docked this time at Al-Khaleej branch bringing a feast to be proud of and customizable offers..',
        hookAr: '«الريس سلامة رسى هالمرة بـ فرع الخليج، وجاب معاه صيدة تبيض الوجه وعرض تفصّله على كيفك..»',
        fullCaptionAr: `الريس سلامة رسى هالمرة بـ فرع الخليج، وجاب معاه صيدة تبيض الوجه وعرض تفصّله على كيفك..

لأول مرة في "الصياد العالمي"، الريس يقولك الصيد صيدك والمزاج مزاجك، خُذ الي يشتهيه قلبك من هذا العرض الراهي :
- كيلو جمبري كبير (بوري ردة، دنيس زيت وليمون، قاروص سنجاري، بلطي ردة).
- كيلو سمك من اختيارك إنت.
- طبق أرز عائلي كبير.
- تشكيلة مقبلات تظبط السفرة.

العرض كامل بـ 149 ريال بس..

تنبيه :
العرض حصري في فرع حي الخليج بس، وساري حتى نفاذ الكمية.

لحق قبل لا يفوتك..
للطلب والاستفسار : 0553380773
📍 الموقع : حي الخليج، شارع الشيخ حسن بن حسين، أمام الحمراء مول.`,
        imageUrl: '/assets/aistudio/9d6bb8c5-e7d2-4c0f-9ae4-573662f3d418_8fe325c5.jpg',
        aspectRatio: 'portrait',
        engagement: '462 reactions, 41 comments',
        gradientBg: 'from-[#1e3a8a] via-[#172554] to-[#0f172a]',
        emojiIcon: '⚓🦞',
        metaInfoEn: 'SAR 149 • 462 reactions, 41 comments',
        metaInfoAr: 'بـ 149 ريال • 462 تفاعل، 41 تعليق'
      },
      {
        id: 'wh-3',
        brandId: 'worldhunter',
        dateBadge: '8 APR',
        titleEn: 'Captain Calls: Do Not Miss Out On The Catch',
        titleAr: 'الريس ينااااديكم: زحمة فرع الخليج عشان صيدة الريس',
        hookEn: 'Catch it before it ends.. all the rush at Al-Khaleej branch these days is for the Captain’s Fresh Catch..',
        hookAr: '«يا تلحقون، يا ما تلحقون.. زحمة فرع الخليج هاليومين كلها عشان "صيدة الريس"..»',
        fullCaptionAr: `يا تلحقون، يا ما تلحقون 🏃..

زحمة فرع الخليج هاليومين كلها عشان "صيدة الريس"، والكمية جالسة تنقص أسرع مما تتخيلون، لإن العرض يخليك ولأول مرة إنت الي تختار سمكتك بنفسك وتفصّل وجبتك على مزاجك :
• كيلو جمبري كبير (مشوي أو مقلي).
• كيلو سمك (من اختيارك إنت).
• طبق أرز عائلي كبير يبيض الوجه.
• مقبلات مشكلة.

العرض الكامل بـ 149 ريال،
وإذا تبوا تروّقون لحالكم، "نص العرض" بـ 79 ريال جاهز لكم 😉

الريس سلامة يقول لكم : لا تخلّون العرض يفوتكم وتندمون بعد، في انتظار طلباتكم..

📌 تنبيه : العرض حصري في فرع حي الخليج بس، وساري حتى نفاذ الكمية.

للطلب والاستفسار : 0553380773
الموقع : حي الخليج، شارع الشيخ حسن بن حسين، أمام الحمراء مول.`,
        imageUrl: '/assets/aistudio/8b2c844b-cbd5-4232-b7d9-8265de955850_ee37f58e.jpg',
        aspectRatio: 'portrait',
        gradientBg: 'from-[#b91c1c] via-[#991b1b] to-[#450a0a]',
        emojiIcon: '🦐🔥',
        metaInfoEn: 'Full 149 SAR / Half 79 SAR',
        metaInfoAr: 'كامل 149 ريال / نص العرض 79 ريال'
      }
    ]
  },

  zeldar: {
    id: 'zeldar',
    brandNameEn: 'ZEL ELDAR',
    brandNameAr: 'ظـــل الــــدار',
    campaignLabelEn: 'The client',
    campaignLabelAr: 'العميل',
    campaignEn: 'A Saudi showroom for custom-made furniture, with its own factory.',
    campaignAr: 'معرض سعودي لتفصيل الأثاث، ولها مصنعها الخاص.',
    roleLabelEn: 'My role',
    roleLabelAr: 'دوري',
    roleEn: 'Fully responsible for the content, briefed the designer, and sometimes made the base images with AI.',
    roleAr: 'مسؤولة عن المحتوى بالكامل، وإعداد التوجيه للمصمم، وتنفيذ الصور الأساسية بالذكاء الاصطناعي أحيانًا.',
    pageButtonTextEn: 'View the brand page',
    pageButtonTextAr: 'صفحة البراند',
    brandUrl: 'https://www.facebook.com/share/1CETvu4Ct2/?mibextid=wwXIfr',
    posts: [
      {
        id: 'zd-1',
        brandId: 'zeldar',
        dateBadge: 'THE EMPTY CORNER | الزاوية الفارغة',
        titleEn: 'An Empty Corner? How We Transformed It with Only 4 Pieces',
        titleAr: 'زاوية فارغة؟ كيف حولنا شكلها بـ 4 قطع بس؟',
        hookEn: 'Sometimes a tiny space in your home becomes your ultimate peaceful sanctuary, it just needs the right arrangement..',
        hookAr: '«مرات مساحة صغيرة في بيتك تكون هي "الركن الهادي" حقك، بس تحتاج اللي يرتبها صح..»',
        fullCaptionAr: `مرات مساحة صغيرة في بيتك تكون هي "الركن الهادي" حقك، بس تحتاج الي يرتبها صح..

في هذا المشروع، استلمنا زاوية فارغة تمامًا، وبدل ما نزحمها، اكتفينا بـ 4 تفاصيل أساسية من تنفيذ مصنعنا -ظل الدار- :
• كراسي مخمل مريحة بلون جريء.
• ستارة ناعمة توزع الإضاءة بشكل مريح للعين.
• طاولة خدمة تلم الجلسة.

والسر كله في اللوحة الجدارية الي سحبت العين..
(متاح تفصيل أي تصميم للوحات بخاطرك، مو شرط تتقيد بالي في السوق).

عشان إنتم تستاهلون الزين، جهزنا لكم :
• خصم 30% على جميع أعمالنا بمناسبة الافتتاح.
• ضمان 5 سنوات.
• فريق يجي ياخذ المقاسات ويعاين المكان مجانًا.

زورو معرضنا وخلّونا نسولف عن مساحتكم،
أو تواصلوا معنا واتساب للرد السريع :
0532731309`,
        imageUrl: '/assets/aistudio/image_2308e5c6.webp',
        carouselImages: [
          '/assets/aistudio/image_2308e5c6.webp',
          '/assets/aistudio/image_3d264a81.webp',
          '/assets/aistudio/image_b0de5473.webp'
        ],
        aspectRatio: 'portrait',
        slidesCount: 3,
        slides: [
          { slideNumber: 1, title: 'زاوية فارغة: قبل التنفيذ', description: 'تتوقعون كيف حولنا شكلها بـ 4 قطع بس من تنفيذ مصنعنا؟', imageUrl: '/assets/aistudio/image_2308e5c6.webp' },
          { slideNumber: 2, title: 'تفاصيل التحول بـ 4 قطع', description: 'كرسيين مخمل بلون جريء + طاولة خدمة برخام طبيعي + ستارة ناعمة تكسر جمود الجدار + لوحة جدارية تعطي روح للمكان.', imageUrl: '/assets/aistudio/image_3d264a81.webp' },
          { slideNumber: 3, title: 'التفاصيل تصنع الفرق', description: 'خصم 30% على جميع أعمال التفصيل بمناسبة الافتتاح • ضمان 5 سنوات • معاينة وقياس مجاني • تنفيذ سريع.', imageUrl: '/assets/aistudio/image_b0de5473.webp' }
        ],
        gradientBg: 'from-[#334155] via-[#1e293b] to-[#0f172a]',
        emojiIcon: '🛋️📐',
        metaInfoEn: '31 Mar, 3 slides',
        metaInfoAr: '31 مارس • 3 شرائح • تقسيط تمارا وتابي'
      },
      {
        id: 'zd-2',
        brandId: 'zeldar',
        dateBadge: 'TAILORING | التفصيل',
        titleEn: 'Why Settle for Ready-Made? Custom Tailoring Now at 30% Off',
        titleAr: 'ليش ترضى بالأثاث الجاهز؟ والتفصيل الخاص صار بـ خصم 30%',
        hookEn: 'Custom furniture always gives you the proud result that fits your space to the millimeter, but cost used to hold you back..',
        hookAr: '«دوم تفصيل الأثاث يعطيك نتيجة تبيّض الوجه وتناسب مساحتك بالملّي، بس التكلفة كانت تخليك تتردد..»',
        fullCaptionAr: `دوم تفصيل الأثاث يعطيك نتيجة تبيّض الوجه وتناسب مساحتك بالملّي، بس التكلفة كانت تخليك تتردد..

بس حنا كسرنا هذي القاعدة بـ عرض الـ 30% الي بنوفّره الحين بمناسبة الافتتاح، يعني تقدر تشتري أثاث مُفصّل باللون والمقاس الي بخاطرك، وبسعر ينافس الجاهز 🤩👌🏻

لا تتنازل عن ذوقك، احجز معاينتك المجانية الحين لرفع المقاسات عبر الواتساب :
0532731309`,
        imageUrl: '/assets/aistudio/7f3aed8d-f08a-44c1-aebf-1446d7d58672_e7737933.jpg',
        aspectRatio: 'portrait',
        gradientBg: 'from-[#78350f] via-[#451a03] to-[#292524]',
        emojiIcon: '🪡✨',
        metaInfoEn: '1 Apr, single post',
        metaInfoAr: '1 أبريل • خصم 30% • التفصيل الخاص'
      },
      {
        id: 'zd-3',
        brandId: 'zeldar',
        dateBadge: 'FABRICS | الأقمشة',
        titleEn: 'Sofa Looks Stunning, But Ruined After 2 Months? The Secret is Fabric!',
        titleAr: 'شكل الكنب يجنن، بس بعد شهرين خرب؟ السر في القماش!',
        hookEn: 'Many get fooled by fabric looks in showrooms, only to discover it stains easily or feels uncomfortable at home..',
        hookAr: '«كثير ينخدعون بشكل القماش في المعرض، ولما يوصل البيت يكتشفون إنه يتوسخ بسرعة أو متعب في الجلوس..»',
        fullCaptionAr: `كثير ينخدعون بشكل القماش في المعرض، ولما يوصل البيت يكتشفون إنه يتوسخ بسرعة أو متعب في الجلوس..

عشان كذا، اختيار الخامة هو أهم قرار تاخذه؛ ولأننا في ظل الدار نترجم ذوقك لواقع، مستشارينا -دوم- معك خطوة بخطوة عشان تختار القماش الي يجمّل مساحتك ويريحك بالاستخدام.

لا تنسى تحفظ البوست عشان ترجع له وقت ما تقرر تفصّل كنبك الجديد 🤍`,
        imageUrl: '/assets/aistudio/image_56af5d47.webp',
        carouselImages: [
          '/assets/aistudio/image_56af5d47.webp',
          '/assets/aistudio/image_0233f014.webp',
          '/assets/aistudio/image_5d66cf4b.webp',
          '/assets/aistudio/image_49099b0e.webp'
        ],
        aspectRatio: 'portrait',
        slidesCount: 4,
        slides: [
          { slideNumber: 1, title: 'شكل الكنب يجنن، بس بعد شهرين خرب؟ السر في القماش', description: 'دليلك لاختيار خامة الكنب المناسبة لاستخدام بيتك قبل التفصيل.', imageUrl: '/assets/aistudio/image_56af5d47.webp' },
          { slideNumber: 2, title: 'المخمل والبوكليه: عنوان الفخامة', description: 'يعطي المكان رُقي "فندقي" وملمس ناعم، مثالي جدًا للمجالس الرسمية وغرف الاستقبال.', imageUrl: '/assets/aistudio/image_0233f014.webp' },
          { slideNumber: 3, title: 'الكتان Linen: عملي ومريح', description: 'عملي، مريح ويتحمل "الحوادث" اليومية، يعطي المكان إحساس بالدفء والهدوء، ممتاز لغرف المعيشة.', imageUrl: '/assets/aistudio/image_5d66cf4b.webp' },
          { slideNumber: 4, title: 'اختيار القماش الصح يريّحك سنين', description: 'احفظ البوست لترتيبك الجاي.', imageUrl: '/assets/aistudio/image_49099b0e.webp' }
        ],
        gradientBg: 'from-[#14532d] via-[#052e16] to-[#022c22]',
        emojiIcon: '🧵🌿',
        metaInfoEn: '15 Apr, 4 slides',
        metaInfoAr: '15 أبريل • 4 شرائح • دليل الأقمشة'
      }
    ]
  },

  filmrent: {
    id: 'filmrent',
    brandNameEn: 'FILM RENT',
    brandNameAr: 'فيلـــمرنت',
    campaignLabelEn: 'The client',
    campaignLabelAr: 'العميل',
    campaignEn: 'A Saudi company specializing in camera equipment rental, inside and outside Riyadh.',
    campaignAr: 'جهة سعودية متخصصة في تأجير معدات التصوير، داخل الرياض وخارجها.',
    roleLabelEn: 'My role',
    roleLabelAr: 'دوري',
    roleEn: 'Fully responsible for the content.',
    roleAr: 'مسؤولة عن المحتوى بالكامل.',
    pageButtonTextEn: 'View the brand page',
    pageButtonTextAr: 'صفحة البراند',
    brandUrl: 'https://www.instagram.com/film_rent?mdxt=ajJ3aHIwd3B6cW42',
    posts: [
      {
        id: 'fr-1',
        brandId: 'filmrent',
        dateBadge: 'LENSES | العدسات',
        titleEn: 'Essential Lenses Every Filmmaker Needs',
        titleAr: '٣ عدسات لا غنى عنها لكل مصوّر',
        hookEn: 'If you want to elevate your photography level, you must have these lenses in your kit..',
        hookAr: '«إذا ودّك ترفع مستواك في التصوير، لازم يكون عندك هالعدسات 🤍»',
        fullCaptionAr: 'إذا ودّك ترفع مستواك في التصوير، لازم يكون عندك هالعدسات 🤍',
        imageUrl: '/assets/aistudio/f4d31248-dd5b-4466-a5ad-cb8150a91c6d_326f2431.jpg',
        carouselImages: [
          '/assets/aistudio/f4d31248-dd5b-4466-a5ad-cb8150a91c6d_326f2431.jpg',
          '/assets/aistudio/82f2f041-4637-4fc1-988d-cbdd375c0128_e913832e.jpg',
          '/assets/aistudio/9743c542-24ca-4622-953e-f5a528084970_8cd9a65d.jpg',
          '/assets/aistudio/c3db4805-9b2d-4ae9-9298-e403a8feb730_9a0083f4.jpg'
        ],
        aspectRatio: 'portrait',
        slidesCount: 4,
        slides: [
          {
            slideNumber: 1,
            title: '٣ عدسات لا غنى عنها لكل مصوّر',
            description: 'إذا ودّك ترفع مستواك في التصوير، لازم يكون عندك هالعدسات — متوفرة للإيجار عبر FILMRENT.NET (0551218518).',
            imageUrl: '/assets/aistudio/f4d31248-dd5b-4466-a5ad-cb8150a91c6d_326f2431.jpg'
          },
          {
            slideNumber: 2,
            title: 'عدسة 50mm - f/1.8',
            description: 'مثالية البورتريه والعزل الخرافي.',
            imageUrl: '/assets/aistudio/82f2f041-4637-4fc1-988d-cbdd375c0128_e913832e.jpg'
          },
          {
            slideNumber: 3,
            title: 'عدسة 24-70mm - f/2.8',
            description: 'عدسة مرنة لكل المناسبات.',
            imageUrl: '/assets/aistudio/9743c542-24ca-4622-953e-f5a528084970_8cd9a65d.jpg'
          },
          {
            slideNumber: 4,
            title: 'عدسة 70-200mm - f/2.8',
            description: 'الأفضل لتصوير الأحداث والتفاصيل عن بعد.',
            imageUrl: '/assets/aistudio/c3db4805-9b2d-4ae9-9298-e403a8feb730_9a0083f4.jpg'
          }
        ],
        gradientBg: 'from-[#475569] via-[#334155] to-[#1e293b]',
        emojiIcon: '📷🔍',
        metaInfoEn: '8 Mar, 4 slides',
        metaInfoAr: '8 مارس • 4 شرائح • معدات تصوير'
      },
      {
        id: 'fr-3',
        brandId: 'filmrent',
        dateBadge: 'THE CAMERA | الكاميرا',
        titleEn: 'Canon EOS R6 Mark II: Every Shot Counted',
        titleAr: 'كل مشهد محسوب: Canon EOS R6 Mark II',
        hookEn: 'At 40 fps with 5-axis in-body stabilization, Canon EOS R6 Mark II captures the moment before you anticipate it..',
        hookAr: '«بـ 40 فريم في الثانية، وتثبيت صورة 5 محاور، Canon EOS R6 Mark II تعيش الحدث قبلك، و تحفظه بدون أي هزّة أو ضياع .»',
        fullCaptionAr: 'بـ 40 فريم في الثانية، وتثبيت صورة 5 محاور، Canon EOS R6 Mark II تعيش الحدث قبلك، و تحفظه بدون أي هزّة أو ضياع .',
        imageUrl: '/assets/aistudio/a57834cc-a837-4aa0-90fe-53024ae9eead_cfff6cfe.jpg',
        aspectRatio: 'portrait',
        gradientBg: 'from-[#1e1b4b] via-[#0f172a] to-[#020617]',
        emojiIcon: '📸⚡',
        metaInfoEn: '15 Aug, single post',
        metaInfoAr: '15 أغسطس • منشور أحادي • كانون R6 مارك 2'
      },
      {
        id: 'fr-2',
        brandId: 'filmrent',
        dateBadge: 'YOUR FIELD | مجالك',
        titleEn: 'What Do You Shoot? Your Photography Field',
        titleAr: 'تصور إيش؟! ما هو مجالك في التصوير؟',
        hookEn: 'Every photographer specializes in one or more types of photography, so what is your field?',
        hookAr: '«كل مصوّر متخصص في نوع أو أكثر من التصوير فما هو مجالك في التصوير ؟»',
        fullCaptionAr: 'كل مصوّر متخصص في نوع أو أكثر من التصوير فما هو مجالك في التصوير ؟',
        imageUrl: '/assets/aistudio/5f61fe28-f7aa-4a75-83e7-2a26cd7f4032_dc1975f7.jpg',
        carouselImages: [
          '/assets/aistudio/5f61fe28-f7aa-4a75-83e7-2a26cd7f4032_dc1975f7.jpg',
          '/assets/aistudio/989f4a16-2754-4263-a629-c3aef62cb614_0cd8d6cf.jpg'
        ],
        aspectRatio: 'portrait',
        slidesCount: 2,
        slides: [
          {
            slideNumber: 1,
            title: 'تصور إيش؟!',
            description: 'كل مصوّر متخصص في نوع أو أكثر من التصوير فما هو مجالك في التصوير؟ (0551218518 • FILMRENT.NET).',
            imageUrl: '/assets/aistudio/5f61fe28-f7aa-4a75-83e7-2a26cd7f4032_dc1975f7.jpg'
          },
          {
            slideNumber: 2,
            title: 'فوتو - فيديو - سينمائي',
            description: 'معدات وكاميرات وإضاءات احترافية لجميع تخصصات التصوير الفوتوغرافي والفيديو والسينمائي.',
            imageUrl: '/assets/aistudio/989f4a16-2754-4263-a629-c3aef62cb614_0cd8d6cf.jpg'
          }
        ],
        gradientBg: 'from-[#6b21a8] via-[#581c87] to-[#3b0764]',
        emojiIcon: '🎬💜',
        metaInfoEn: '11 Jul, 2 slides, 76 likes, 21 comments',
        metaInfoAr: '11 يوليو • شريحتان • 76 إعجاب، 21 تعليق'
      }
    ]
  },

  creativemark: {
    id: 'creativemark',
    brandNameEn: 'CREATIVE MARK',
    brandNameAr: 'كريتيـــف مارك',
    campaignLabelEn: 'The client',
    campaignLabelAr: 'العميل',
    campaignEn: 'A company that helps foreigners set up their businesses in Saudi Arabia.',
    campaignAr: 'شركة تساعد الأجانب على تأسيس شركاتهم في السعودية.',
    roleLabelEn: 'My role',
    roleLabelAr: 'دوري',
    roleEn: 'Fully responsible for the content, and gave the designer the references.',
    roleAr: 'مسؤولة عن المحتوى بالكامل، وإعداد المراجع للمصمم.',
    pageButtonTextEn: 'View the brand page',
    pageButtonTextAr: 'صفحة البراند',
    brandUrl: 'https://www.instagram.com/creative_mark.co?exln=azgzM2trdWtpcmVs',
    posts: [
      {
        id: 'cm-2',
        brandId: 'creativemark',
        dateBadge: 'IN HINDI | بالهندية',
        titleEn: '100% Foreign Ownership in Saudi Arabia',
        titleAr: 'بالهندية: सऊदी अरब में आपकी कंपनी 100% विदेशी स्वामित्व वाली है',
        hookEn: 'Have you ever thought about starting your company in Saudi Arabia?',
        hookAr: '«क्या आपने कभी सऊदी अरब में अपनी कंपनी शुरू करने के बारे में सोचा है ?»',
        fullCaptionAr: `क्या आपने कभी सऊदी अरब में अपनी कंपनी शुरू करने के बारे में सोचा है ?
- यदि आपका जवाब हां है, तो अब अवसर है, क्योंकि किंगडम द्वारा प्रदान की गई सुविधाओं के साथ, आप सऊदी अरब में 100% विदेशी स्वामित्व के साथ अपनी कंपनी स्थापित कर सकते हैं।

विविध क्षेत्रों में निवेश करें, जैसे : (प्रौद्योगिकी, पर्यटन, ई-कॉमर्स, नवीकरणीय ऊर्जा, आदि) और विज़न 2030 द्वारा समर्थित रणनीतिक लाभों का आनंद लें, जो प्रमुख अवसरों के द्वार खोलता है।

आपको बस निर्णय लेना है, और हम हर कदम पर आपका समर्थन करने के लिए मौजूद हैं 🤍

अधिक जानकारी के लिए हमसे संपर्क करें :
- वेबसाइट : www.creativemark1.com
- ईमेल : info@creativemark1.com
- व्हाट्सएप : wa.me/966575270141

#الشركات_الصغيرة #Creative_Mark #الشركات_الصغيرة_و_المتوسطة #الاقتصاد_السعودي #رؤية_2030 #فرص_استثمارية #مشاريع_ناشئة`,
        imageUrl: '/assets/aistudio/3cdac1f6-7f50-4e1b-bf83-aa836ebcb95f_77186b26.jpg',
        aspectRatio: 'portrait',
        gradientBg: 'from-[#15803d] via-[#166534] to-[#14532d]',
        emojiIcon: '🤝🇮🇳',
        metaInfoEn: '21 May, single post',
        metaInfoAr: '21 مايو • منشور باللغة الهندية'
      },
      {
        id: 'cm-1',
        brandId: 'creativemark',
        dateBadge: 'SETUP STEPS | خطوات التأسيس',
        titleEn: 'Setting Up Your Company in Saudi Arabia in Simple Steps',
        titleAr: 'تأسيس شركتك في السعودية يبدأ بخطوات بسيطة',
        hookEn: 'Establishing your company in Saudi Arabia starts with simple, guided steps..',
        hookAr: '«تأسيس شركتك في السعودية يبدأ بخطوات بسيطة»',
        fullCaptionAr: `تأسيس شركتك في السعودية يبدأ بخطوات بسيطة:

1️⃣ تحديد نوع الشركة
هل ستؤسس شركة ذات مسؤولية محدودة أو شركة مساهمة أو شركة فردية؟ حيث أنّ الخيار الصحيح يبدأ بتحديد نوع الشركة التي تناسبك.

2️⃣ إعداد خطة عمل واضحة
احرص على وضع خطة عمل مدروسة تحدد أهدافك الاستراتيجية ومواردك المالية.

3️⃣ التسجيل في الغرف التجارية
بعد تحديد النوع يجب أن تسجل شركتك في الغرف التجارية للحصول على الهوية التجارية.

4️⃣ تقديم الأوراق المطلوبة
قم بتجهيز المستندات اللازمة مثل (العقود، التراخيص، والسجلات القانونية) لتقديمها إلى الجهات المعنية.

5️⃣ الحصول على التراخيص اللازمة
بناءً على نوع نشاطك تحتاج إلى الحصول على التراخيص من الهيئات الحكومية المختصة.

احصل على استشارة مجانية:
📞 +966575270141
🌐 www.creativemark1.com`,
        imageUrl: '/assets/aistudio/341b26dc-b50a-48eb-a626-59e82248730b_86aa8a98.jpg',
        carouselImages: [
          '/assets/aistudio/341b26dc-b50a-48eb-a626-59e82248730b_86aa8a98.jpg',
          '/assets/aistudio/ba25da59-07cf-4a88-8ac2-ff516ace50e5_5011b56e.jpg',
          '/assets/aistudio/ee536b5a-d031-4cf9-a29e-966247e4724a_c3bdfd91.jpg',
          '/assets/aistudio/f3630092-1e65-4e96-9344-3030cf50dfb3_f9a50388.jpg',
          '/assets/aistudio/fd009b57-47ca-4bc0-914f-e85916d92d82_93d0c919.jpg',
          '/assets/aistudio/f06a1ab2-74bf-4bf1-9115-6102802ab637_2ba41346.jpg'
        ],
        aspectRatio: 'portrait',
        slidesCount: 6,
        slides: [
          {
            slideNumber: 1,
            title: 'تأسيس شركتك في السعودية يبدأ بخطوات بسيطة',
            description: 'دليل تأسيس الشركات في المملكة خطوة بخطوة مع كريتيف مارك.',
            imageUrl: '/assets/aistudio/341b26dc-b50a-48eb-a626-59e82248730b_86aa8a98.jpg'
          },
          {
            slideNumber: 2,
            title: 'تحديد نوع الشركة',
            description: 'هل ستؤسس شركة ذات مسؤولية محدودة أو شركة مساهمة أو شركة فردية؟ حيث أنّ الخيار الصحيح يبدأ بتحديد نوع الشركة التي تناسبك.',
            imageUrl: '/assets/aistudio/ba25da59-07cf-4a88-8ac2-ff516ace50e5_5011b56e.jpg'
          },
          {
            slideNumber: 3,
            title: 'إعداد خطة عمل واضحة',
            description: 'احرص على وضع خطة عمل مدروسة تحدد أهدافك الاستراتيجية ومواردك المالية.',
            imageUrl: '/assets/aistudio/ee536b5a-d031-4cf9-a29e-966247e4724a_c3bdfd91.jpg'
          },
          {
            slideNumber: 4,
            title: 'التسجيل في الغرف التجارية',
            description: 'بعد تحديد النوع يجب أن تسجل شركتك في الغرف التجارية للحصول على الهوية التجارية.',
            imageUrl: '/assets/aistudio/f3630092-1e65-4e96-9344-3030cf50dfb3_f9a50388.jpg'
          },
          {
            slideNumber: 5,
            title: 'تقديم الأوراق المطلوبة',
            description: 'قم بتجهيز المستندات اللازمة مثل (العقود، التراخيص، والسجلات القانونية) لتقديمها إلى الجهات المعنية.',
            imageUrl: '/assets/aistudio/fd009b57-47ca-4bc0-914f-e85916d92d82_93d0c919.jpg'
          },
          {
            slideNumber: 6,
            title: 'الحصول على التراخيص اللازمة',
            description: 'بناءً على نوع نشاطك تحتاج إلى الحصول على التراخيص من الهيئات الحكومية المختصة.',
            imageUrl: '/assets/aistudio/f06a1ab2-74bf-4bf1-9115-6102802ab637_2ba41346.jpg'
          }
        ],
        gradientBg: 'from-[#0369a1] via-[#075985] to-[#0c4a6e]',
        emojiIcon: '🏢🇸🇦',
        metaInfoEn: 'Carousel, 6 slides',
        metaInfoAr: 'كاروسيل • 6 شرائح • خطوات التأسيس الرسمي'
      },
      {
        id: 'cm-3',
        brandId: 'creativemark',
        dateBadge: 'VISION 2030 | رؤية 2030',
        titleEn: 'Your Company: Part of Saudi Vision 2030',
        titleAr: 'شركتك: جزء من رؤية السعودية 2030',
        hookEn: 'Setting up your company in Saudi Arabia is not just a profit opportunity, it is an active contribution to an economic future..',
        hookAr: '«تأسيس شركتك في السعودية ليس فقط فرصة للربح، بل هو أيضًا مساهمة فعلية في بناء مستقبل اقتصادي متنوع و مستدام..»',
        fullCaptionAr: `تأسيس شركتك في السعودية ليس فقط فرصة للربح، بل هو أيضًا مساهمة فعلية في بناء مستقبل اقتصادي متنوع و مستدام..

حيث أنّ رؤية السعودية 2030 تسعى إلى :
- نقل المعرفة من خلال جذب الخبرات العالمية و توطينها
- تمكين الكفاءات عبر خلق فرص عمل و تدريب للشباب السعودي
- تنمية الاقتصاد المحلي عن طريق دعم القطاعات غير النفطية و رفع مساهمة القطاع الخاص

و هنا يأتي دورك كمستثمر أو رائد أعمال، و يأتي دورنا أيضًا لنساعدك في تأسيس شركتك بطريقة تحقق أهدافك و تدعم مستهدفات الرؤية في نفس الوقت 👌🏻

للمزيد من المعلومات، تواصل معنا على :
• الموقع الإلكتروني :
www.creativemark1.com
• البريد الإلكتروني :
info@creativemark1.com
• واتساب :
wa.me/966575270141

#الاقتصاد_السعودي #رؤية_2030 #فرص_استثمارية #Creative_Mark #رؤية_2030 #وزارة_الاستثمار`,
        imageUrl: '/assets/aistudio/17c0d76d-df4e-46f1-bcc5-6f78458a1927_bf0e51fb.jpg',
        aspectRatio: 'portrait',
        engagement: '557 reactions, 99 comments',
        gradientBg: 'from-[#1e3a8a] via-[#1e40af] to-[#1d4ed8]',
        emojiIcon: '🇸🇦✨',
        metaInfoEn: '24 Jun, 557 reactions, 99 comments',
        metaInfoAr: '24 يونيو • 557 تفاعل، 99 تعليق'
      }
    ]
  },

  elhoofy: {
    id: 'elhoofy',
    brandNameEn: 'DR. Ahmed',
    brandNameAr: 'د. أحمد نبيل الحوفي',
    campaignLabelEn: 'The client',
    campaignLabelAr: 'العميل',
    campaignEn: 'A general surgeon who specializes more deeply in bariatric and obesity surgeries.',
    campaignAr: 'جراح عام، ومتخصص بشكل أكبر في جراحات وعمليات السمنة.',
    roleLabelEn: 'My role',
    roleLabelAr: 'دوري',
    roleEn: 'Responsible for all of the content.',
    roleAr: 'مسؤولة عن كتابة المحتوى بالكامل.',
    pageButtonTextEn: 'View on Instagram',
    pageButtonTextAr: 'صفحة الدكتور على إنستغرام',
    brandUrl: 'https://www.instagram.com/dr.ahmednabilelhoofy?mdxt=MXBrbnczYTZvand1cA==',
    posts: [
      {
        id: 'eh-1',
        brandId: 'elhoofy',
        dateBadge: '3 FACTORS | 3 عوامل',
        titleEn: '3 Factors That Determine the Treatment Plan',
        titleAr: 'حجمه وموقعه ونوعه: 3 عوامل بتحدد خطة العلاج',
        hookEn: 'When you discover a tumor in your body, there are 3 essential factors we need to evaluate to set the right treatment plan..',
        hookAr: '«لما بتكتشفي إن في ورم في جسمك، في ٣ عوامل أساسية لازم نعرفها علشان نحدد خطة العلاج المناسبة ليكي..»',
        fullCaptionAr: `لما بتكتشفي إن في ورم في جسمك، في ٣ عوامل أساسية لازم نعرفها علشان نحدد خطة العلاج المناسبة ليكي :

١- حجم الورم : لو الورم صغير، بيكون أسهل في الاستئصال و علاجه أسرع .
أما لو كان كبير، ممكن يتطلب علاجات تانية زيّ الجراحة أو الكيماوي .

٢- موقع الورم : مكان الورم بيأثر في العلاج، يعني لو الورم في مكان حساس زيّ الأعضاء المهمة أو بالقرب من الأوعية الدموية، بيحتاج تدخل دقيق .

٣- نوع الورم : هل الورم حميد أو خبيث ؟
لو حميد العلاج بيكون بسيط و في أغلب الحالات بيتم استئصاله بسهولة .
أما لو خبيث فـ بيكون محتاج علاج أكثر شمولية مثل : (الجراحة مع العلاج الكيميائي أو الإشعاعي) .`,
        imageUrl: '/assets/aistudio/61f83079-cdcb-4b04-a18f-385cb212ef44_e59ec856.jpg',
        aspectRatio: 'square',
        gradientBg: 'from-[#0e4d64] via-[#0a3647] to-[#061e29]',
        emojiIcon: '🩺🔬',
        metaInfoEn: '26 Mar, single post',
        metaInfoAr: '26 مارس • منشور توعوي'
      },
      {
        id: 'eh-3',
        brandId: 'elhoofy',
        dateBadge: 'STRIKE OF HOPE | بضربة أمل',
        titleEn: 'Defeat the Tumor With a Strike of Hope',
        titleAr: 'اهزم الورم بضربة أمل',
        hookEn: 'The pancreas works like the silent engine of your body without you feeling it, until warning signs tell you to move fast..',
        hookAr: '«البنكرياس زيّ المحرك الصامت في جسمك، بيشتغل من غير ما تحس بيه، لكن لو الورم قرر يهاجمه، الموضوع بيبقى زيّ فيلم أكشن..»',
        fullCaptionAr: `البنكرياس زيّ المحرك الصامت في جسمك، بيشتغل من غير ما تحس بيه، لكن لو الورم قرر يهاجمه، الموضوع بيبقى زيّ فيلم أكشن محتاج بطل ينقذ الموقف..

أورام البنكرياس مش حاجة سهلة، ممكن تحس بألم في بطنك يجي فجأة، أو جسمك يبدأ يديك إشارات، زيّ : (التعب الغريب أو اصفرار العين)، و ده معناه إنك لازم تتحرك بسرعة .

بس يا ترى مين البطل اليّ هينزل المعركة دي و يطلع منها منتصر ؟
- الإجابة هي : دكتور أحمد نبيل الحوفي، جراح عام مش بس عنده خبرة طويلة، لكن كمان بيعرف يضرب الورم في مقتل بأحدث التقنيات .

يلا مستني، الحق نفسك قبل فوات الأوان 🫡
للاستفسار :
01026970980
01017437486
01116844422`,
        imageUrl: '/assets/aistudio/19f17b67-81f0-4a23-9a9e-478168ccd271_357993d9.jpg',
        aspectRatio: 'square',
        gradientBg: 'from-[#0f5257] via-[#0b3942] to-[#1a0b0f]',
        emojiIcon: '✊💛',
        metaInfoEn: '2 Apr, single post',
        metaInfoAr: '2 أبريل • منشور توعوي'
      },
      {
        id: 'eh-2',
        brandId: 'elhoofy',
        dateBadge: '3 FACES | 3 وشوش للورم',
        titleEn: 'A Tumor Has 3 Faces You Need to Know',
        titleAr: 'الورم ليه 3 وشوش لازم تبقى عارفهم كويس',
        hookEn: 'Tumors can affect anyone, young or old — what matters is knowing the 3 faces they take so you can act at the right moment..',
        hookAr: '«الأورام حاجة ممكن تصيب أيّ حد فينا، (ست أو راجل)، (صغير أو كبير) المهم تعرف إن ليها 3 وشوش لازم تبقى عارفهم كويس..»',
        fullCaptionAr: `الأورام حاجة ممكن تصيب أيّ حد فينا، (ست أو راجل)، (صغير أو كبير) المهم تعرف إن ليها 3 وشوش لازم تبقى عارفهم كويس .

- أول وش : هو الورم الحميد، ده زيّ الضيف الهادي، موجود بس مش بيدمر، ممكن تشيله في أيّ وقت و تخلّص منه بسهولة .

- تاني وش : الورم ما قبل الخبيث، هنا بيبدأ يحط رجل على الخط الأحمر، مش خبيث لسه بس لو اتساب كده هيتقلب، و ده معناه إنك لازم تتحرك فورًا .

- تالت وش : ده اليّ ميترحمش، "الورم الخبيث" اليّ بيعلن الحرب على جسمك و بيحاول يآخد كل حاجة لو ملحقتوش في الوقت الصح .

بس مهما كان الورم ده لابس قناع مين من التلاتة، فيه حاجة واحدة خليك متأكد منها إنّ لسه فيه أمل توقفه، و السلاح بتاعك هو إنك تاخد قرارك و تروح لجراح شاطر ينقذ الموقف
و مفيش أشطر الدكتور أحمد نبيل الحوفي 👌🏻 .

كلمنا النهاردة، و خلّي الورم ده يبقى ذكرى قديمة، لإ إنت أقوى منه ❤️

لتفاصيل أكثر :
01026970980
01017437486
01116844422`,
        imageUrl: '/assets/aistudio/f26da8cd-04b3-4661-980e-8c590325183e_5f09a3b4.jpg',
        aspectRatio: 'square',
        gradientBg: 'from-[#0e4d64] via-[#134e5e] to-[#08242e]',
        emojiIcon: '🎭🩺',
        metaInfoEn: '31 Mar, single post',
        metaInfoAr: '31 مارس • منشور توعوي'
      }
    ]
  }
};

export const VIDEO_SCRIPTS: VideoScript[] = [
  // المحامي جمال عبد الناصر (with REAL user video attachments!)
  {
    id: 'vid-g1',
    clientId: 'gamal',
    videoNum: '01',
    duration: '0:47',
    titleEn: 'Lawyer Gamal Abdel Nasser — Video 01',
    titleAr: 'المحامي جمال عبد الناصر — فيديو 01',
    quoteEn: 'If someone hits your car and decides to flee',
    quoteAr: 'لو حد خبط عربيتك وقرر ان يزوغ',
    summaryEn: 'Immediate legal steps to preserve rights and request surveillance footage in hit-and-run incidents.',
    summaryAr: 'الإجراء القانوني المباشر لحفظ حقك وتفريغ كاميرات المراقبة المحيطة بالحادث.',
    categoryEn: 'Legal Consultation & Accident Protocol',
    categoryAr: 'استشارة قانونية وتأمين حوادث',
    videoSrc: '/assets/aistudio/okIWvoJEHB2C2gRUfvEAEFEBMYDIaLQEpf2Q6U_60e9cf7c.mp4',
    posterImg: '/assets/aistudio/script_g1_poster.jpg',
    scriptFullAr: `لو حد خبط عربيتك وقرر إن يزوغ الموضوع ويهرب، تعمل إيه؟
أول حاجة صور الحادثة بسرعة، أي خدش، أي كسر، وكل زاوية من المكان صورها، لأن الصور دي هتساعدك جداً.
تاني حاجة اتصل بالشرطة فوراً، واطلب إن هم يعملوا محضر رسمي، بحيث إن المحضر ده هو اللي هيثبت إن الطرف التاني هو الغلطان، وكمان هتحتاجه لو الموضوع وصل لمرحلة قانونية.
تالت حاجة حاول تحل الموضوع ودي، يعني لو الطرف التاني متعاون وفر وقت ومصاريف واتفقوا على تسوية مباشرة.
ولو رفض يدفع مش مشكلة، بالمحضر الرسمي اللي معاك تقدر ترفع قضية تعويض مدني، والتعويض هيغطي أي إصلاحات وأي خساير تانية.
في النهاية ما تسكتش على حقك، وخليك دايماً جاهز تتصرف صح، ولو محتاج نصيحة أو استشارة أنا موجود.`,
    scriptFullEn: `What to do if someone hits your car and flees?
1. Photograph the scene immediately: every scratch, dent, and surrounding angle.
2. Call the police and file an official report to establish fault and preserve liability.
3. Try an amicable settlement if cooperative; otherwise use the official report for civil compensation.
Never compromise your rights, and consult early.`,
    visualDirectionAr: 'لقطة متوسطة للمحامي أمام مكتبه، زووم تدريجي وتحديد النصوص القانونية على الشاشة مع مؤثرات التحذير والتوجيه.'
  },
  {
    id: 'vid-g2',
    clientId: 'gamal',
    videoNum: '02',
    duration: '1:31',
    titleEn: 'Lawyer Gamal Abdel Nasser — Video 02',
    titleAr: 'المحامي جمال عبد الناصر — فيديو 02',
    quoteEn: 'Spraying water on the street and water law penalties',
    quoteAr: 'القايمة / بالمايه: رش الشارع بالمية وقانون الموارد المائية',
    summaryEn: 'Water conservation law: 10 strict legal penalties for street washing or unauthorized water connection.',
    summaryAr: 'قانون الموارد المائية والري: 10 عقوبات رادعة للتعدي على المياه أو رش الشارع وتوصيل المياه بدون ترخيص.',
    categoryEn: 'Public Property & Municipal Laws',
    categoryAr: 'أحكام وقوانين الموارد المائية',
    videoSrc: '/assets/aistudio/osbrnAfqo4IguNjbIfAlQ9FEchIzRQi5DADjCf_1f125568.mp4',
    posterImg: '/assets/aistudio/script_g2_poster.jpg',
    scriptFullAr: `فكرة إنك ترش الشارع بالمايه أو توصل مايه لحد من غير تصريح كانت بتعدي زمان..
لكن دلوقتي ممكن تكون سبب في حبسك! طب ليه؟
لأن قانون المايه حط 10 عقوبات صارمة لأي تعدي على المايه، هدرها أو العبث بالبنية التحتية، وده جزء من مجهود الدولة للحفاظ على كل نقطة مايه.
من أبرز العقوبات:
- حبس 6 شهور + غرامة 20,000 جنيه لرش المايه في الشارع!
- حبس سنتين + غرامة 100,000 جنيه لتوصيل المايه بدون تصريح.
- غرامة 100,000 جنيه لإتلاف أي مرافق مائية.
- غرامة 50,000 جنيه لأي اعتراض أو تعطيل لمشروعات المايه.
- حبس 6 شهور + غرامة 3,000 جنيه عن كل يوم تعطيل لأي جهة تؤخر إنشاء مرفق مائي.
- حبس + غرامة تصاعدية لأي موظف يوصل المايه بدون مستند رسمي.
- غرامة من 5,000 لـ 20,000 جنيه على مقدمين الخدمة المخالفين لشروط الترخيص.
- عقوبة مشددة لأي شخص ينشر معلومة مغلوطة عن مرفق مائي: غرامة لا تقل عن 50,000 ولا تزيد عن 500,000 جنيه لكل من يروج شائعات تضر المرافق.
القانون الجديد بيعتبر إن المايه حق عام، والتعدي عليها مش مخالفة.. لا دي جريمة تتطلب المحاسبة! فخلي بالك، لأن الجهل بالقانون عمره ما كان حماية.`,
    scriptFullEn: `Washing the street or hooking up unauthorized water used to pass overlooked, but now it can lead to jail time under the Egyptian Water Resources Act.
10 stringent penalties safeguard public water infrastructure, ranging up to 100k EGP and imprisonment.
Ignorance of the law is never an excuse.`,
    visualDirectionAr: 'إضاءة دافئة، عرض أرقام الغرامات بدقة بجوار المتحدث لتسليط الضوء على خطورة المخالفة والتوعية المجتمعية.'
  },
  {
    id: 'vid-g3',
    clientId: 'gamal',
    videoNum: '03',
    duration: '1:19',
    titleEn: 'Lawyer Gamal Abdel Nasser — Video 03',
    titleAr: 'المحامي جمال عبد الناصر — فيديو 03',
    quoteEn: 'Did you know divorce costs more than just alimony?',
    quoteAr: 'تعرف ان الطلاق مش بس بيكلفك نفقة',
    summaryEn: 'Comprehensive financial liabilities in divorce: Mut’a alimony, marriage duration calculation, and state loan fund provisions.',
    summaryAr: 'التكاليف القانونية الحقيقية وما يترتب على قضايا الطلاق من نفقة المتعة ومدد الزواج وصندوق الأسرة.',
    categoryEn: 'Family Law & Marital Rights',
    categoryAr: 'أحوال شخصية وقضايا أسرة',
    videoSrc: '/assets/aistudio/ocHBZToRgiREEOGEF8ATeQIDngsUcNYBaDfimq_d44e68ae.mp4',
    posterImg: '/assets/aistudio/script_g3_poster.jpg',
    scriptFullAr: `تعرف إن الطلاق مش بس بيكلفك نفقة شهرية أو قايمة بس؟
لا.. أنت عندك كمان في نفقة اسمها نفقة المتعة، واللي القانون الجديد نظمها بالتفصيل، واللي ممكن توصل لأرقام كبيرة جداً!
نفقة المتعة هي مبلغ بيتحدد للمطلقة تعويضاً لها عن الطلاق وفقد الحياة الزوجية.
واللي بيحدد قيمتها مش بس القاضي، لا كمان مدة الزواج ودخل الزوج بياثروا فيها جداً:
- مثلاً لو مدة الزواج عدت الـ 10 سنين، نفقة المتعة ممكن توصل لـ 210,000 جنيه.
- ولو كانت المدة من 6 لـ 10 سنين فالأحكام بتبقى أقل شوية، لو يكن حوالي 125,000 جنيه.
- ولو كانت ست سنين بالضبط ممكن الحكم يوصل لـ 36,000 جنيه.
وده كله بيكون الحد الأدنى، لأن في أحكام كتير جداً بتطلع بأرقام أكبر من كده بكتير على حسب دخل الزوج ومستواه الاجتماعي.
ولو في حالة إن الزوج مش مقتدر مالياً أو دخله ضعيف، وقتها الدولة بتوفر للزوجة قرض طويل الأجل عشان الزوجة تاخد كل مستحقاتها وما تتاخرش، ببساطة الزوجة بتاخد نفقتها فوراً والدولة بترجع تدي فرصة للزوج يسدد المبلغ على مدى طويل.
فقبل ما تفكر في الطلاق، لازم تكون عارف جداً إن القانون بيضمن للزوجة حقوق كبيرة جداً، مش بس نفقة شهرية زي الأول.`,
    scriptFullEn: `Did you know divorce costs far more than basic monthly support?
Under current Egyptian family law, 'Mut'a' compensation is determined by duration and husband's income, often reaching over 200k EGP for 10+ year marriages.
State social funds also advance payments to spouses, ensuring immediate collection.`,
    visualDirectionAr: 'تركيز على لغة الجسد الهادئة والرزينة، مع ظهور مبالغ التعويض بجانب المتحدث لإيضاح الأبعاد المالية الواقعية للقرار.'
  },

  // المحامي محمود شاهين MAHMOUD SHAHIN (Scripts Page 2)
  {
    id: 'vid-m1',
    clientId: 'shahin',
    videoNum: '01',
    duration: '1:31',
    titleEn: 'Lawyer Mahmoud Shahin — Video 01 (Blank Trust Receipt Acquittal)',
    titleAr: 'المحامي محمود شاهين — فيديو 01 (براءة في قضية إيصال أمانة على بياض)',
    quoteEn: 'Signed a blank trust receipt and got sentenced? How forensics proved forgery',
    quoteAr: 'إيصال أمانة على بياض وحكم بالحبس ٣ سنين يتحول لبراءة',
    summaryEn: 'Real case breakdown: compelling presentation of the original receipt and proving post-signature fill-in via forensics.',
    summaryAr: 'قضية حقيقية: كيف حوّلنا حكم حبس ٣ سنوات بسبب إيصال أمانة على بياض إلى براءة بالطعن بالتزوير.',
    categoryEn: 'Criminal Defense & Commercial Trust Receipts',
    categoryAr: 'قضايا جنائية وإيصالات الأمانة',
    videoSrc: '/assets/aistudio/oMEFeYQgQEAFOEmy8MR2hgfjXKDVBBHI5gqo2E_c82a34ca.mp4',
    posterImg: '/assets/aistudio/script_m1_poster.jpg',
    scriptFullAr: `أحد عملاء مكتبنا كانت حياته هتتدمر بسبب إيصال أمانة مَلا على بياض لشخص ما، لكن بفضل الله تم قلب الموازين.. إيه اللي حصل؟
العميل ده جالي مرعوب بيقولي يا أستاذ محمود أنا مضيت إيصالات أمانة على بياض، واختلفت أنا وهو فحطلي مبالغ كبيرة جداً ومش حقيقية وأنا ما أقدرش أدفعها، ورفع عليا قضية وحُكمت عليا بالحبس.. أنا كده بقى خلاص داخل الحبس ولا إيه؟ شوفلي حل أرجوك!
قلتله اهدى ما تقلقش، القانون بيحميك ومش هتتحبس، لأن ملء البيانات اللي حصل بعد التوقيع ده بيعتبر في حكم التزوير أمام المحاكم الجنائية.
وبالفعل عملنا إجراء وألزمنا الخصم في أول جلسة بتقديم أصل الإيصال، وبعد ما تم تقديمه فوراً تم الطعن عليه بالتزوير.
وقد كان.. استجابت المحكمة وحولت أوراق القضية للطب الشرعي، وهناك في أبحاث التزييف والتزوير تم استكتاب المتهم، وأُثبت إنه تم ملء صلب الإيصال في تاريخ لاحق على التوقيع، بل وبخط إيد مغاير عن الإيد الموقعة على الإيصال!
والحمد لله تم الحكم ببراءة المتهم وطلع زي الشعر من العجين بعد ما كان واخد حبس ثلاث سنين.
انت كمان لو ماضي إيصالات أمانة على بياض وخايف لتستخدم ضدك جنائياً، تواصل معانا وهنقولك الحل الأمثل لحالتك. واستنونا في اللي جاي هنوضحلكم حالات تانية كتير: زي ماذا لو ما كانش الخصم قدم الأصل قدام المحكمة، أو كنت كتبت جزء من الإيصال وجزء تاني ما كتبتوش، وماذا عن إيصالات الأمانة اللي بتكون شرط لقبولك في الوظيفة.`,
    scriptFullEn: `One of our office clients nearly had his life ruined over a blank trust receipt signed for someone—yet by God's grace we flipped the verdict completely from 3 years in prison to full acquittal.
Filling in amounts after a signature legally constitutes forgery before criminal courts. By demanding the original receipt at the first hearing and submitting a forgery challenge to Forensics (Al-Tibb Al-Shar'i), experts proved the body was filled out later and in a different handwriting—securing full acquittal.`,
    visualDirectionAr: 'لقطة ثابتة للمحامي بفيست أسود وكرافتة فيروزي بمكتبه أمام الميزان القانوني، نبرة واثقة وسرد قصصي تشويقي للحالة من الخوف للبراءة.',
    editorNotesAr: 'عرض نصوص صفراء بارزة للكلمات المفتاحية (على بياض، الطعن بالتزوير، براءة)، وتأثيرات حركة سريعة مع كل نقطة تحول في القضية.'
  },
  {
    id: 'vid-m2',
    clientId: 'shahin',
    videoNum: '02',
    duration: '1:45',
    titleEn: 'Lawyer Mahmoud Shahin — Video 02 (Two Immediate Eviction Cases)',
    titleAr: 'المحامي محمود شاهين — فيديو 02 (حالتان للطرد الفوري في قانون الإيجار الجديد)',
    quoteEn: 'Warning: Two cases where you can be evicted immediately before contract end',
    quoteAr: 'تحذير: ممكن تُطرد فورا قبل انتهاء مدة عقدك في القانون الجديد',
    summaryEn: 'Explaining the two statutory cases for summary eviction before the 5 or 7-year grace period expires.',
    summaryAr: 'توضيح الحالتين اللتين يجوز فيهما للمالك طرد المستأجر فورًا أمام قاضي الأمور المستعجلة قبل انتهاء المدة الانتقالية.',
    categoryEn: 'Real Estate & Tenancy Law',
    categoryAr: 'قانون الإيجارات والمنازعات العقارية',
    videoSrc: '/assets/aistudio/o4enQDIujgDtAQAAQwTICm10ioFgjeKEsN5jfQ_9c5daa6f.mp4',
    posterImg: '/assets/aistudio/script_m2_poster.jpg',
    scriptFullAr: `تحذير: ممكن تتطرد قبل حتى ما تخلص مدة عقدك في القانون الجديد!
ممكن تكون فاكر إنك مأمن مكانك مدة الخمس أو سبع سنين، بس في حالتين لو حصلوا القانون الجديد بيقولك إنك ممكن تتطرد فوراً حتى لو لسه ما خلصتش.
ركز معايا كويس قوي:
- الحالة الأولى: لو سبت شقتك أو محلك مقفول مدة أكثر من سنة من غير سبب مقبول، زي شغل في محافظة تانية أو بره مصر مثبت بعقد أو مستند، أو لظروف مرضية مثبتة بتقارير رسمية. لو المالك قدر يثبت إنك سايب المكان فاضي ممكن يرفع قضية وياخد حكم بالطرد فوراً!
- أما الحالة التانية: فلو ثبت إنك عندك مكان تاني جاهز تسكن فيه أو تشتغل منه؛ يعني إنك تكون سايب شقتك القديمة اللي بإيجار قديم علشان إيجارها قليل وإنت عندك شقة ملك أو شقة إيجار تاني بس مش مستخدمه، هنا القانون بيسمح للمالك إنه يطرد المستأجر فوراً.
المهم هنا إنك مش هتقعد في المحاكم سنين زي القانون القديم؛ القانون الجديد سهلها وخلاها عند قاضي الأمور الوقتية أو المستعجلة، يعني موضوع الطرد هيتنفذ وبسرعة!
في الفيديوهات الجاية إن شاء الله هنشرحلك حاجات أكثر عن قانون الإيجارات الجديد.`,
    scriptFullEn: `Warning: You could face immediate eviction before your 5- or 7-year transitional contract expires under the new Old Rent law!
Case 1: Leaving the apartment or shop closed for over one year without an officially documented excuse (such as distant work or medical reports).
Case 2: Owning or holding another ready residence or commercial space while keeping the old low-rent unit idle. Matters go directly to the Summary Matters Judge for rapid enforcement.`,
    visualDirectionAr: 'إشارة تحذير واضحة باليد مع عدّ الحالتين بالأصابع أمام علم مصر وميزان العدالة على مكتب المحامي.',
    editorNotesAr: 'تلوين الكلمات التحذيرية (تحذير، بالطرد فوراً، قاضي الأمور المستعجلة) وإضافة انتقالات سريعة عند بدء كل حالة.'
  },
  {
    id: 'vid-m3',
    clientId: 'shahin',
    videoNum: '03',
    duration: '1:36',
    titleEn: 'Lawyer Mahmoud Shahin — Video 03 (New Old-Rent Law Summary)',
    titleAr: 'المحامي محمود شاهين — فيديو 03 (ملخص قانون الإيجار القديم الجديد)',
    quoteEn: 'Parliament approved the new Old Rent law — key timelines simplified',
    quoteAr: 'البرلمان وافق على قانون الإيجار القديم الجديد: السكن ٧ سنين وغير السكن ٥',
    summaryEn: 'Quick legal breakdown of Law 49/1977 & 136/1981 amendments, 7-year and 5-year contract expiration rules.',
    summaryAr: 'ملخص مبسط وسريع للقانون الجديد للإيجار القديم: من يشملهم، ومدد انتهاء السكني والتجاري، وتاريخ التطبيق.',
    categoryEn: 'Legislative Updates & Property Rights',
    categoryAr: 'التشريعات الجديدة وحقوق الملاك والمستأجرين',
    videoSrc: '/assets/aistudio/oQjFEYuW9itLDq6VkoaOPz9KpHEQBiwI7sABA__1__3e655506.mp4',
    posterImg: '/assets/aistudio/script_m3_poster.jpg',
    scriptFullAr: `خد بالك، البرلمان وافق على قانون الإيجار القديم بشكله الجديد، قانون ملايين الناس كانت مستنياه، بس هل بقى عرفت بيقول إيه؟ خليني أبسطهالك في نقط سريعة:
أولاً: مين اللي القانون هيتطبق عليه؟
أي وحدة إيجار قديمة سواء كانت سكنية أو غير سكنية (زي المحلات والعيادات) المؤجرة لأشخاص طبيعيين، وده بناءً على القوانين القديمة رقم 49 لسنة 1977 و136 لسنة 1981.
طيب العقود هتنتهي إمتى؟
- الشقق السكنية هتنتهي بعد 7 سنين من تطبيق القانون الجديد.
- المحلات والعيادات والمكاتب (غير السكني) هتنتهي بعد 5 سنين من تطبيق القانون الجديد.
يعني خلاص بعد المدد دي العقود هتنتهي وما فيش تمديد زي زمان.
طيب سؤال: هل ينفع ينهوا العقد ده قبل كده؟
الإجابة: آه ينفع، لو المالك والمستأجر اتفقوا إنهم ينهوا العقد قبل المدة دي برضاهم مفيش أي مشكلة.
طيب القانون ده هيتطبق إمتى؟ القانون ده هيتم تطبيقه من تاريخ نشره في الجريدة الرسمية بشكل رسمي.
استنوا معايا في الفيديوهات الجاية هنوضح أبعاد القانون الجديد بالتفصيل وإزاي ممكن نطلب وحدة بديلة من الدولة.`,
    scriptFullEn: `Parliament has officially approved the new Old Rent law framework—a bill millions have awaited. Here are the key points simplified:
Applies to residential and commercial units rented to natural persons under Laws 49/1977 and 136/1981.
Residential contracts terminate 7 years after enactment; commercial units terminate after 5 years—no automatic renewals—unless landlord and tenant mutually agree earlier.`,
    visualDirectionAr: 'لقطة قريبة بالبدلة الرسمية والماج على المكتب، استخدام لغة جسد واضحة ومرتبة مع ترقيم النقاط على الشاشة.',
    editorNotesAr: 'عرض أرقام القوانين (49 لسنة 1977، 136 لسنة 1981) ومدد العقود (7 سنين، 5 سنين) بخط أبيض بارز على خلفية داكنة.'
  },

  // معرض سيلفان SYLVAN (Scripts Page 3) — WITH REAL VIDEOS
  {
    id: 'vid-s2',
    clientId: 'sylvan',
    videoNum: '01',
    duration: '0:36',
    titleEn: 'SYLVAN — Video 01 (National Day & Waterproof Parquet)',
    titleAr: 'سيلفان — فيديو 01 (عزنا بطبعنا واختبار مقاومة الباركيه للماء)',
    quoteEn: 'Pour water with zero worry — looks brand new every day',
    quoteAr: 'عزنا بطبعنا / مع باركيه سيلفن لا تشيل هم',
    summaryEn: 'Live showroom demonstration pouring a full glass of water onto parquet flooring to prove water & scratch resistance.',
    summaryAr: 'تجربة حية بسكب الماء مباشرة على باركيه سيلفان لإثبات مقاومته للماء وسهولة التنظيف وتحمله لحركة الأطفال.',
    categoryEn: 'Live Product Proof & Durability',
    categoryAr: 'اختبار مقاومة الماء والجودة',
    videoSrc: '/assets/aistudio/6289250265464918450_7e53bde6.mp4',
    posterImg: '/assets/aistudio/script_s1_poster.jpg',
    scriptFullAr: `الموديل (يسكب كوب ماء كاملاً على أرضية الباركيه داخل المعرض وسط ألواح العينات، ثم يمر بين عرض ألواح الباركيه والـ SPC):
"مع باركيه سيلفن لا تشيل هم.. خاماتنا ضد المويه، وتنظيفها مريح جداً، وتبقى تلمع طول الوقت كأنها جديدة!
يتحمل الحركة ولعب الأطفال ويحافظ على شكله، وهذا اللي نراهن عليه في كل قطعة نقدمها لك.
أرضية فخمة وعملية وما أشيل همها.. هذا هو الطلب الصعب اللي الكل يدور عليه!
اختار اللي يجمل بيتك وتمتع بعروضنا القوية هالفترة. تواصلوا معنا اليوم وحياكم الله."`,
    scriptFullEn: `Talent pours a glass of water directly onto the showroom parquet:
"With Sylvan parquet, zero worries—our surfaces are waterproof, effortless to clean, and stay shining like brand new! Heavy traffic and kids' play won't wear it down. Luxury and practicality together—visit our showroom and enjoy our seasonal offers."`,
    visualDirectionAr: 'البداية بلقطة مباشرة للموديل يسكب كوب الماء على الباركيه، ثم تحرك سلس بجانب ألواح الباركيه العمودية مع ملامستها وإبراز قسم الـ SPC في نهاية المقطع.',
    editorNotesAr: 'وضع بادج اليوم الوطني (عزنا بطبعنا) أعلى يمين الكادر، تصميم كروت بنقوش تراثية خضراء وحمراء للنصوص التوضيحية مع مؤثرات صوتية خفيفة متناغمة مع إيقاع اليوم الوطني.'
  },
  {
    id: 'vid-s1',
    clientId: 'sylvan',
    videoNum: '02',
    duration: '0:47',
    titleEn: 'SYLVAN — Video 02 (15% Cashback on Curtains)',
    titleAr: 'سيلفان — فيديو 02 (15% كاش باك حقيقي على الستائر)',
    quoteEn: 'News worth riyals: 15% real cashback on Sylvan curtain fabrics',
    quoteAr: 'عندي لكم خبر يندفع فيه ريالات: ١٥٪ كاش باك يبرد الخاطر',
    summaryEn: 'Showcasing premium curtain fabrics at Sylvan showroom with an instant 15% cash-back offer on invoice close.',
    summaryAr: 'استعراض أقمشة الستائر في معرض سيلفان مع عرض كاش باك 15% حقيقي عند إغلاق الفاتورة.',
    categoryEn: 'Retail Offer & Curtain Showroom',
    categoryAr: 'عروض الستائر والأقمشة',
    videoSrc: '/assets/aistudio/2138530902602655861_4a0d03de.mp4',
    posterImg: '/assets/aistudio/script_s2_poster.jpg',
    scriptFullAr: `الموديل (واقفاً خلف ستاند عينات الستائر وممسكاً بنقود ورقية ثم يمر بيده على الستائر الطويلة في المعرض):
"عندي لكم خبر يندفع فيه ريالات.. لكن مو أنتم تدفعون! سيلفين هي اللي بترجعلكم كاش باك يبرد الخاطر!
اختر الستائر اللي تعجبك، وسيلفين بترجعلك 15% كاش باك على نوع الأقمشة؛ مو كوبون ولا بعدين ولا نقاط.. لا لا، فلوس حقيقية ترجعلك وإنت تقفل فاتورتك!
وعلى فكرة، أقمشة سيلفين ما تحتاج إقناع؛ لأنك من لمسة راح تعرف الفرق بينها وبين أي قماش ثاني.
لكن لا تنسون العرض مو دايم، ومثل ما يقول: اللي يبكر يريح واللي يتأخر بيندم!
اختار سيلفين لأن بيتك يستاهل، وفلوسك معهم لها قيمة أكثر. تواصلوا معنا اليوم وحياكم الله."`,
    scriptFullEn: `Talent stands behind curtain swatches before walking alongside floor-to-ceiling drapes in the showroom:
"I have news worth riyals—except YOU don't pay, Sylvan pays you back! Pick the curtains you love and get 15% real cash back on fabrics right at invoice checkout—no coupons, no points, real cash back. Touch Sylvan fabrics once and feel the difference."`,
    visualDirectionAr: 'الموديل يطل من خلف ستاند الأقمشة وهو ممسك بريالات، ثم انتقال بمشية ناعمة بجانب الستائر المنسدلة الطويلة، ثم يفتح نسيج قماش الستارة أمام الكاميرا لإبراز الملمس والنعومة.',
    editorNotesAr: 'كتابة هوك البداية بتيبوجرافي متدرج الحجم فوق الشاشة (عندي لكم خبر)، إظهار شارة "15% كاش باك" بخط سعودي واضح مع شطب "مو كوبون / ولا بعدين / ولا نقاط"، والختام بشعار سيلفان وأرقام التواصل.'
  },
  {
    id: 'vid-s3',
    clientId: 'sylvan',
    videoNum: '03',
    duration: '0:37',
    titleEn: 'SYLVAN — Video 03 (WPC Doors Craftsmanship & Details)',
    titleAr: 'سيلفان — فيديو 03 (أبواب WPC وجودة التفاصيل المخفية)',
    quoteEn: 'We use the door all day — quality engineered in every hinge & edge',
    quoteAr: 'الباب شي نستخدمه طول اليوم وجمالها ما يتغير',
    summaryEn: 'Close inspection of Sylvan WPC doors: door edge finishing, lock hardware, hinges, and showroom experience in Riyadh.',
    summaryAr: 'استعراض جودة أبواب سيلفان من الحافة والكالون والمفصلات، مع دعوة لزيارة معرض الرياض للعروض الحصرية.',
    categoryEn: 'WPC Doors & Architectural Quality',
    categoryAr: 'أبواب WPC وتفاصيل الجودة',
    videoSrc: '/assets/aistudio/2681927376372174094_43214016.mp4',
    posterImg: '/assets/aistudio/script_s3_poster.jpg',
    scriptFullAr: `الموديل (يفتح باب خشبي فاخر بسلاسة تامة بيد واحدة، ثم ينتقل لقسم WPC DOORS مشيراً إلى الحافة والكالون والمفصلات):
"الباب شيء نستخدمه طول اليوم، وأبواب سيلفين جودتها تتحمل وجمالها ما يتغير!
في أبواب سيلفين كل تفصيلة مدروسة: حفة الأبواب، الكالون، أو حتى المفصلات؛ لأن اللي ما ينشاف هو اللي يفرق معك على المدى البعيد.
هذا مو كلام.. هذا الشيء اللي تحسه كل مرة لما تقفل الباب وتفتحه!
تعال وشوف الخامات بيدك في معرضنا في الرياض، وعندنا عروض حصرية تستاهل الزيارة."`,
    scriptFullEn: `Talent opens an interior door smoothly before walking through the WPC Doors gallery pointing to edges, locks, and hinges:
"A door is something you use all day, and Sylvan doors are crafted so durability and beauty never fade. Every detail—door edging, locks, and hinges—is engineered for long-term use. Feel the quality yourself in our Riyadh showroom."`,
    visualDirectionAr: 'لقطة افتتاحية على مقبض الباب أثناء فتحه ثم كادر أوسع للموديل، بعدها الانتقال لصف أبواب الـ WPC مع إشارة واضحة باليد نحو إطار الباب والكالون والمفصلات وختام في وسط الصالة.',
    editorNotesAr: 'إطار مزخرف بنقش تراثي رفيع أعلى وأسفل الفيديو، عرض الجمل في شرائط خضراء أنيقة مع مؤثر حركة وومضة زوم عند فتح الباب وإظهار شارة "عروض حصرية" باللون الأخضر.'
  },

  // ويبو للتكنولوجيا WEBBO TECHNOLOGY (Scripts Page 4) — WITH REAL VIDEOS
  {
    id: 'vid-w1',
    clientId: 'webbo',
    videoNum: '01',
    duration: '0:53',
    titleEn: 'Webbo Technology — Video 01 (ERP Assists Accountants)',
    titleAr: 'ويبو للتكنولوجيا — فيديو 01 (هل الـ ERP بديل عن المحاسب؟)',
    quoteEn: 'Many accountants think ERP replaces them — in reality it is your #1 assistant',
    quoteAr: 'محاسبين كتير فاكرين إن الـ ERP هيغطي على شغلهم.. لكنه المساعد الأول ليك',
    summaryEn: 'Addressing accountants’ fear of ERP systems and showing how automation eliminates manual data entry so they focus on strategy.',
    summaryAr: 'طمأنة المحاسبين وتوضيح أن نظام ERP من ويبو أداة تساعد المحاسب على التحليل واتخاذ القرارات بدل ضياع الوقت في الإدخال اليدوي.',
    categoryEn: 'ERP Awareness for Accountants',
    categoryAr: 'توعية المحاسبين وأنظمة ERP',
    videoSrc: '/assets/aistudio/____-__-ERP-System-____-_______-_-_erp-_______a92cba7c.mp4',
    posterImg: '/assets/aistudio/script_w1_poster.jpg',
    scriptFullAr: `محاسبين كتير فاكرين إن الـ ERP هيغطي على شغلهم، بس الحقيقة مختلفة تماماً:
الـ ERP مش بديل عنك، بالعكس ده هيكون كمان المساعد الأول ليك!
يعني بدل ما تضيع وقتك في إدخال البيانات يدوي وتقعد تدور على فواتيرك القديمة، لا إنت كمان ممكن تراجع الأرقام بالأيام وساعتها كل حاجة هتكون منظمة ومتاحة بضغطة زرار واحدة!
وبدل ما تفضل غرقان في الورق والمراجعات الكتير، لا إنت كمان تقدر تركز على الحاجات اللي تفرق بجد؛ زي تحليل البيانات، تحسين التقارير المالية، اتخاذ قرارات استراتيجية تخلي شركتك أقوى.
لو عايز تعرف إزاي الـ ERP ممكن يخليك محاسب أقوى وأسرع وأكثر دقة، جربه بنفسك؛ هتلاقيه مش بس بيساعدك لا ده كمان بيفتحلك مجالات جديدة في شغلك!
الـ ERP سيستم مش منافس، بالعكس ده شريك نجاح. لو محتاج تعرف تفاصيل أكتر ابعتلنا أو سيب استفسارك في كومنت.`,
    scriptFullEn: `Many accountants worry that an ERP system will replace their job—but the truth is completely different: ERP is not your replacement, it is your #1 assistant! Instead of spending hours on manual data entry and hunting for old invoices, everything is organized in one click so you can focus on financial analysis and strategic decisions.`,
    visualDirectionAr: 'افتتاحية بالأبيض والأسود لإبراز الفكرة الشائعة ثم انتقال مفاجئ للألوان الدافئة عند كشف الحقيقة، مع B-Roll لكتابة سريعة على اللابتوب وشخصية محاسب بآلة حاسبة.',
    editorNotesAr: 'تمييز الكلمات الرئيسية بكبسولات أرجوانية في الكابشن + أيقونات فيكتور متحركة للبيانات والقرارات وشعار Webbo أعلى الشاشة.'
  },
  {
    id: 'vid-w2',
    clientId: 'webbo',
    videoNum: '02',
    duration: '0:46',
    titleEn: 'Webbo Technology — Video 02 (Traditional Chaos vs Webbo ERP)',
    titleAr: 'ويبو للتكنولوجيا — فيديو 02 (فوضى الإدارة التقليدية مقابل Webbo ERP)',
    quoteEn: 'What happens when you run your business the traditional way?',
    quoteAr: 'إيه اللي بيحصل لما بتدير أعمالك بالطريقة التقليدية؟',
    summaryEn: 'Contrasting paper chaos and delayed decisions with real-time sales, inventory, HR sync, and instant alerts in Webbo ERP.',
    summaryAr: 'مقارنة بين تأخر القرارات وضياع الأوراق في الإدارة التقليدية وبين سرعة المتابعة الفورية والربط الشامل في نظام ويبو ERP.',
    categoryEn: 'Business Automation & Control',
    categoryAr: 'أتمتة العمليات والربط الشامل',
    videoSrc: '/assets/aistudio/____-__-_____-___-_____-____-______-_________-webbo_Erp-erp-______________cc422833.mp4',
    posterImg: '/assets/aistudio/script_w2_poster.jpg',
    scriptFullAr: `إيه اللي بيحصل لما بتدير أعمالك بالطريقة التقليدية؟
فعلاً زي ما جه في بالك: إن القرارات هتتأخر، والفوضى هتفضل مستمرة.. عارف ليه؟ لأن العمليات اليدوية بتتطلب وقت، وده طبعاً بياخر القرارات المهمة، وكمان الأوراق الضايعة والمستندات اللي مش لاقيها أكيد بتعطلك!
لكن لما إنت هتستخدم Webbo ERP، كل حاجة بتكون أسهل؛ يعني هتلاقي تقارير دقيقة وكمان متابعة فورية للمبيعات والمخزون، والقرارات بتتاخد في لحظتها!
لأن الـ ERP سيستم بيحللك مشاكل المخزون والفواتير تلقائياً، لإنه بيبعتلك إشعارات تنبيه للمخزون وللطلبات بشكل تلقائي، فكل حاجة هتكون تحت السيطرة، وكل شيء بسهولة بيربط ما بين المبيعات والموارد البشرية.
الاختيار واضح: خلي قراراتك أذكى وأسرع مع Webbo ERP System، وابدأ في تحسين شغلك من النهاردة.`,
    scriptFullEn: `What happens when you manage your business manually? Delayed decisions, lost paperwork, and mounting chaos. With Webbo ERP, you get accurate reports, real-time sales & inventory tracking, automatic low-stock alerts, and seamless linking between sales and HR so every decision happens on time.`,
    visualDirectionAr: 'البداية ببالون استفهام كرتوني فوق المتحدث ثم فلاش ولقطة B-Roll لمدير محاصر بالأوراق المبعثرة، تليها العودة لمكتب مرتب وأيقونات منظمة للمبيعات والمخزون.',
    editorNotesAr: 'صوت نقرة إصبع للانتقال بين الفوضى والنظام، إظهار عنوان Webbo ERP أخضر أعلى الشاشة عند بدء شرح الحل، وأيقونات متحركة للتقارير والربط.'
  },
  {
    id: 'vid-w3',
    clientId: 'webbo',
    videoNum: '03',
    duration: '1:01',
    titleEn: 'Webbo Technology — Video 03 (ERP Team Training & Certification)',
    titleAr: 'ويبو للتكنولوجيا — فيديو 03 (تدريب فريقك على نظام ERP وشهادات معتمدة)',
    quoteEn: 'Adopted an ERP system, but your team still struggles to master it?',
    quoteAr: 'هل شركتك بدأت تستخدم نظام ERP بس فريقك لسه مش متمكن منه؟',
    summaryEn: 'Highlighting Webbo’s hands-on ERP training programs with real workflow simulations, ongoing support, and certified credentials.',
    summaryAr: 'كيف يضمن التدريب العملي والمحاكاة الواقعية والدعم المستمر في ويبو استفادة فريقك من كل مميزات نظام الـ ERP.',
    categoryEn: 'ERP Implementation & Team Training',
    categoryAr: 'تدريب الفرق وتأهيل الشركات',
    videoSrc: '/assets/aistudio/webbo_video_03_erp_training.mp4',
    posterImg: '/assets/aistudio/webbo_video_03_poster.jpg',
    scriptFullAr: `هل شركتك بدأت تستخدم نظام ERP بس فريقك لسه مش متمكن منه؟
دي مشكلة كبيرة، ومعناها كده إنك مش بتستفيد من كل إمكانيات النظام!
هنا بيجي دور التدريب.. بس خلي بالك إن ضروري التدريب يكون صح، لأن التدريب الصح هو اللي هيضمنلك إن فريقك يستخدم كل مميزات النظام بأفضل طريقة، ويوفرلك وقت وكمان مجهود وهيقللك الأخطاء!
علشان كده إحنا هنا في ويبو بنوفر برامج تدريب متكاملة سواء لشركات أو لأفراد، بنقدم فيه:
رقم 1: تدريب عملي على استخدام النظام في كل الأقسام.
رقم 2: محاكاة لمشاكل واقعية في شغلك اليومي.
رقم 3: هيبقى في طبعاً دعم مستمر للإجابة على أي استفسار بعد التدريب.
ومن مميزات التدريب عندنا هنا في ويبو إنك بعد ما بتخلص تدريب بتاخد شهادة معتمدة بتثبت كفاءتك، وكمان شركتك بتاخد شهادة بتؤكد جاهزيتها لاستخدام أنظمة الـ ERP بفاعلية.
فلو عايز شركتك تستفيد من أنظمة الـ ERP لأقصى درجة، يبقى لازم يكون عندك فريق جاهز ومتدرب كويس. تواصل معانا دلوقتي واحجز تدريب!`,
    scriptFullEn: `Has your company adopted an ERP system while your team still isn't confident using it? Proper training ensures your staff masters every module, saving time and cutting errors. Webbo provides hands-on departmental training, real-world scenario simulations, ongoing support, and certified credentials for individuals and companies.`,
    visualDirectionAr: 'إضاءة نيون أرجوانية على الخلفية الرخامية، ظهور B-Roll لموظف متوتر أمام اللابتوب ثم جلسة تدريب جماعية وشارات شهادة واعتماد.',
    editorNotesAr: 'تمييز الأرقام 1 و2 و3 بأرقام فيكتور ضخمة بجانب المتحدث، وأيقونة ساعة ومؤشر انخفاض الأخطاء وشهادة معتمدة.'
  },

  // ========================================================
  // SECTION 03: MOTION SCRIPTS — MEDIANESTA PAGE 1 (01-03)
  // ========================================================
  {
    id: 'vid-med-1',
    clientId: 'medianesta-1',
    videoNum: '01',
    duration: '1:16',
    titleEn: 'Medianesta — Video 01 (Client Hiring Journey)',
    titleAr: 'ميديانيستا — فيديو 01 (توظيف المحترف المناسب لأعمالك)',
    quoteEn: 'Hiring the right professional to get your tasks done is easier than ever',
    quoteAr: 'في زحمة الأعمال.. توظيف المحترف المناسب صار أسهل من أي وقت',
    summaryEn: 'Step-by-step explainer showing clients how to register, browse services, post custom projects, pay securely, and receive deliverables.',
    summaryAr: 'فيديو موشن جرافيك يشرح رحلة العميل على ميديانيستا من إنشاء الحساب واختيار الخدمة أو نشر مشروع حتى الاستلام الآمن.',
    categoryEn: 'Motion Explainer • Platform Onboarding',
    categoryAr: 'موشن جرافيك • رحلة العميل',
    videoSrc: '/assets/aistudio/motion_med_01.mp4',
    posterImg: '/assets/aistudio/motion_med_01_poster.jpg',
    scriptFullAr: `في زحمة الأعمال، توظيف المحترف المناسب لإنجاز مهامك أصبح أسهل من أي وقت مضى.
ابدأ تجربتك بإنشاء حسابك كمشتري في ثوانٍ معدودة، سواء كفرد أو كمنشأة، مع توثيق سريع يضمن أمان البدايات.
في المنصة يوفر لك التصفح الذكي مرونة عالية لاستكشاف التصنيفات ومئات الخدمات الجاهزة التي تلبي احتياجاتك بدقة.
وفي حالة عدم إيجاد الخدمة المطلوبة، يمكنك إضافة مشروعك الخاص وسنتولى نحن مهمة إيجاد المحترفين لك، أو التواصل المباشر عبر مساحة المحادثة المدمجة.
وبعد الاتفاق، تتيح لك المنصة عملية الدفع بخطوات آمنة وموثوقة، وتبقى كل التفاصيل تحت سيطرتك وصولاً للحظة الاستلام الآمن وحفظ الروابط في أرشيف حسابك.
سجّل الآن بمنصة ميديانيستا، وابدأ بإنجاز أعمالك بأعلى جودة.`,
    scriptFullEn: `Hiring the right professional on Medianesta is easier than ever: create your individual or business account in seconds, browse categories or post a custom project, chat directly, pay securely, and track every milestone through final archived delivery.`,
    visualDirectionAr: 'حركة 3D ناعمة لشاشات المنصة الفعلية داخل إطار تابلت أنيق، مع مؤشر تفاعلي يوضح كل خطوة من التسجيل وحتى الدفع وأرشيف التسليم.'
  },
  {
    id: 'vid-med-2',
    clientId: 'medianesta-1',
    videoNum: '02',
    duration: '0:51',
    titleEn: 'Medianesta — Video 02 (Create a Professional Account)',
    titleAr: 'ميديانيستا — فيديو 02 (البداية الصحيحة وإنشاء حساب محترف)',
    quoteEn: 'The right start on Medianesta only takes a few minutes',
    quoteAr: 'البداية الصحيحة على ميديانيستا لا تأخذ من وقتك سوى دقائق',
    summaryEn: 'Walkthrough for freelancers registering on Medianesta, verifying phone numbers via SMS/WhatsApp, and crafting a standout bio.',
    summaryAr: 'شرح عملي لخطوات تسجيل المستقل وتوثيق رقم الهاتف وصياغة النبذة التعريفية والمسمى الوظيفي لجذب العملاء.',
    categoryEn: 'Motion Explainer • Freelancer Onboarding',
    categoryAr: 'موشن جرافيك • تسجيل المحترفين',
    videoSrc: '/assets/aistudio/motion_med_02.mp4',
    posterImg: '/assets/aistudio/motion_med_02_poster.jpg',
    scriptFullAr: `البداية الصحيحة على ميديانيستا لا تأخذ من وقتك سوى دقائق.
اضغط على إنشاء حساب، اختر الانضمام كمحترف، وحدد نوع حسابك سواء كنت فرداً أو صاحب منشأة.
أدخل بياناتك الأساسية، ووافق على الشروط، ثم وثّق رقم هاتفك بالرمز عبر واتساب أو SMS لتفعيل حسابك فوراً.
وهنا الخطوة الأهم: انتبه لتفاصيل ملفك الشخصي، لأن العميل يقرأ النبذة والمسمى الوظيفي قبل أن يوظفك، فاكتبها بوضوح.
ملفك الآن يعبر عن مهاراتك.. احفظ التعديلات واستعد لإقناع أول عميل لك.`,
    scriptFullEn: `Getting started as a pro takes only minutes: choose freelancer account, select individual or business, verify your phone via OTP, and craft a sharp job title and bio so clients trust your expertise before hiring.`,
    visualDirectionAr: 'دوران شاشات واجهة التسجيل وخطوات التوثيق وإبراز خانات المسمى الوظيفي والنبذة التعريفية.'
  },
  {
    id: 'vid-med-3',
    clientId: 'medianesta-1',
    videoNum: '03',
    duration: '0:52',
    titleEn: 'Medianesta — Video 03 (Building Your Portfolio Gallery)',
    titleAr: 'ميديانيستا — فيديو 03 (معرض أعمالك هو سلاحك الأقوى)',
    quoteEn: 'Clients trust what they see — your portfolio is your strongest weapon',
    quoteAr: 'العميل يثق بما يراه، ومعرض أعمالك هو سلاحك الأقوى لإقناعه',
    summaryEn: 'Demonstrating how freelancers upload new portfolio projects, write persuasive descriptions, and share project links with clients.',
    summaryAr: 'شرح طريقة إضافة عمل جديد في معرض الأعمال واختيار صورة الغلاف الجذابة ونسخ رابط المشروع لمشاركته مع العملاء.',
    categoryEn: 'Motion Explainer • Portfolio Showcase',
    categoryAr: 'موشن جرافيك • معرض الأعمال',
    videoSrc: '/assets/aistudio/motion_med_03.mp4',
    posterImg: '/assets/aistudio/motion_med_03_poster.jpg',
    scriptFullAr: `العميل يثق بما يراه، ومعرض أعمالك هو سلاحك الأقوى لإقناعه.
من ملفك الشخصي اضغط على إضافة عمل جديد، اكتب عنواناً واضحاً لمشروعك، حدد التصنيف، واشرح تفاصيل إنجازك في الوصف ليفهم العميل قيمة عملك.
ثم اضغط على التالي وارفع صورة غلاف تخطف العين، وأضف صور المشروع أو فيديو يعرض إبداعك بأفضل جودة ممكنة.
مشروعك الآن معروض باحترافية.. انسخ رابط العمل وشاركه مع عملائك لتبدأ في حصد الطلبات.`,
    scriptFullEn: `Clients trust what they see. Add a new project from your profile, define its category and value-driven description, upload an eye-catching cover and crisp media, then share your professional portfolio link to convert leads.`,
    visualDirectionAr: 'استعراض نموذج إضافة العمل ورفع ملفات الوسائط وصولاً لعرض صفحة المشروع النهائية وزر نسخ الرابط.'
  },

  // ========================================================
  // SECTION 03: MOTION SCRIPTS — MEDIANESTA PAGE 2 (04-06)
  // ========================================================
  {
    id: 'vid-med-4',
    clientId: 'medianesta-2',
    videoNum: '04',
    duration: '0:45',
    titleEn: 'Medianesta — Video 04 (Bank Setup & Profit Withdrawal)',
    titleAr: 'ميديانيستا — فيديو 04 (إضافة الحساب البنكي وسحب الأرباح)',
    quoteEn: 'Completed your projects? Now it is time to withdraw your earnings',
    quoteAr: 'أنجزت مشاريعك بنجاح؟ حان وقت سحب أرباحك',
    summaryEn: 'Simple walkthrough on linking an international/local bank account via IBAN, uploading bank certificate, and requesting payouts.',
    summaryAr: 'شرح خطوات ربط الحساب البنكي وإدخال الآيبان ورفع الشهادة البنكية لتوثيق الحساب وطلب سحب الأرباح بضغطة زر.',
    categoryEn: 'Motion Explainer • Financial Payouts',
    categoryAr: 'موشن جرافيك • سحب الأرباح',
    videoSrc: '/assets/aistudio/motion_med_04.mp4',
    posterImg: '/assets/aistudio/motion_med_04_poster.jpg',
    scriptFullAr: `أنجزت مشاريعك بنجاح؟ حان وقت سحب أرباحك.
من صفحة الرصيد اضغط على إضافة حساب بنكي، ولأن ميديانيستا تدعمك أينما كنت، حدد دولتك أولاً لتتمكن من ربط بنكك المحلي وسحب أموالك بسهولة تامة.
أدخل رقم الآيبان الخاص بك بدقة، وارفع صورة الشهادة البنكية لضمان وصول أموالك لحسابك بأمان.
بمجرد الضغط على حفظ ستتم مراجعة بياناتك سريعاً وتوثيقها لتصبح حالة الحساب "تم الموافقة".. اطلب سحب أرباحك بضغطة زر.`,
    scriptFullEn: `Ready to cash out your earnings? Select your country, enter your IBAN accurately, upload your bank certificate for security review, wait for quick approval, and withdraw profits in one click.`,
    visualDirectionAr: 'تركيز بصري على صفحة الرصيد وحقول نموذج الحساب البنكي وتغير شارة الحالة إلى "تم الموافقة".'
  },
  {
    id: 'vid-med-5',
    clientId: 'medianesta-2',
    videoNum: '05',
    duration: '0:58',
    titleEn: 'Medianesta — Video 05 (Account Security & Verification)',
    titleAr: 'ميديانيستا — فيديو 05 (أمان الحساب والتحقق المزدوج للبيانات)',
    quoteEn: 'The security of your account is our top priority',
    quoteAr: 'أمان حسابك هو أولويتنا القصوى.. وحماية مزدوجة لبياناتك الحساسة',
    summaryEn: 'Detailing dual OTP protection when updating passwords, email addresses, mobile numbers, and usernames inside Medianesta.',
    summaryAr: 'استعراض منظومة الأمان الصارمة في ميديانيستا عند تغيير كلمة المرور أو البريد الإلكتروني أو رقم الجوال واسم المستخدم.',
    categoryEn: 'Motion Explainer • Security & Trust',
    categoryAr: 'موشن جرافيك • أمان الحساب',
    videoSrc: '/assets/aistudio/motion_med_05.mp4',
    posterImg: '/assets/aistudio/motion_med_05_poster.jpg',
    scriptFullAr: `أمان حسابك هو أولويتنا القصوى.
لذلك عند تعديل بياناتك الحساسة مثل كلمة المرور، ستحتاج أولاً لإثبات هويتك عبر رمز تحقق يصلك للبريد أو الواتساب.
وعند رغبتك في تغيير البريد الإلكتروني، نرسل رمزاً لرقمك القديم ثم رمزاً آخر لبريدك الجديد حمايةً مزدوجة تمنع أي محاولة لاختراق حسابك.
وينطبق نفس مستوى الأمان الصارم عند تحديث رقم الجوال أو اسم المستخدم. ميديانيستا تمنحك تحكماً كاملاً ودرعاً منيعاً يحمي خصوصيتك على مدار الساعة.`,
    scriptFullEn: `Your account security comes first. Every sensitive change—password, email, phone number, or username—is shielded by dual OTP checks across your trusted channels to stop unauthorized access 24/7.`,
    visualDirectionAr: 'انتقالات سلسة بين تبويبات الإعدادات ونوافذ رمز التحقق لإبراز الحماية المزدوجة في كل تعديل.'
  },
  {
    id: 'vid-med-6',
    clientId: 'medianesta-2',
    videoNum: '06',
    duration: '0:45',
    titleEn: 'Medianesta — Video 06 (Dispute Resolution & Support)',
    titleAr: 'ميديانيستا — فيديو 06 (حماية الحقوق وحل الخلافات عبر الدعم)',
    quoteEn: 'Do not worry — your rights and funds are always protected inside Medianesta',
    quoteAr: 'لا تقلق.. حقوقك دائماً محفوظة وأموالك في أمان تام داخل المنصة',
    summaryEn: 'Showing buyers and pros how to report an order issue and collaborate directly with Medianesta support via live chat.',
    summaryAr: 'توضيح خطوات الإبلاغ عن مشكلة في الطلب وتدخل فريق دعم ميديانيستا عبر المحادثة المباشرة لحل النزاع بحيادية وسرعة.',
    categoryEn: 'Motion Explainer • Dispute Protection',
    categoryAr: 'موشن جرافيك • حماية الحقوق والدعم',
    videoSrc: '/assets/aistudio/motion_med_06.mp4',
    posterImg: '/assets/aistudio/motion_med_06_poster.jpg',
    scriptFullAr: `ماذا تفعل إذا واجهت أي خلاف مع المحترف؟
لا تقلق، حقوقك دائماً محفوظة.. كل ما عليك فعله من صفحة الطلب: اضغط فقط على الإبلاغ عن مشكلة، ثم وضح سبب الخلاف والتفاصيل بدقة وأرسل البلاغ بنقرة واحدة.
وفوراً سيتواصل معك فريق دعم ميديانيستا عبر المحادثة المباشرة للتدخل الفعال وحل النزاع بكل حيادية وسرعة.
تأكد دائماً أن أموالك في أمان تام داخل المنصة، وفريقنا متواجد دائماً لضمان راحتك.`,
    scriptFullEn: `Encountered an issue on an order? Click Report an Issue directly from the order page, explain the details, and Medianesta's support team steps in immediately via live chat for fast, neutral resolution.`,
    visualDirectionAr: 'إبراز زر الإبلاغ عن مشكلة باللون الأحمر ثم انتقال مباشر لمحادثة الدعم الفني المباشرة.'
  },

  // ========================================================
  // SECTION 03: MOTION SCRIPTS — WORLD HUNTER (3 PORTRAIT)
  // ========================================================
  {
    id: 'vid-wh-1',
    clientId: 'worldhunter-motion',
    videoNum: '01',
    duration: '0:17',
    titleEn: 'World Hunter — Motion 01 (Port Said Meal 25 SAR)',
    titleAr: 'الصياد العالمي — موشن 01 (غدوة بورسعيدية بـ 25 ريال)',
    quoteEn: 'Port Said Feast + Free Shrimp Kofta — Now 25 SAR instead of 45 SAR',
    quoteAr: 'غدوة بورسعيدية + كفتة الجمبري هدية بسعر ٢٥ ريال بدل ٤٥ ريال',
    summaryEn: 'Fast-paced 9:16 promotional motion offer for Al-Manfouha branch highlighting price drop from 45 SAR to 25 SAR.',
    summaryAr: 'فيديو موشن إعلاني سريع لعرض فرع المنفوحة: غدوة بورسعيدية مع كفتة الجمبري هدية بـ 25 ريال فقط.',
    categoryEn: 'Motion Ad • Branch Offer Promo',
    categoryAr: 'موشن إعلاني • عروض الفروع',
    videoSrc: '/assets/aistudio/motion_wh_01.mp4',
    posterImg: '/assets/aistudio/motion_wh_01_poster.jpg',
    scriptFullAr: `غدوة بورسعيدية + كفتة الجمبري هدية بسعر 25 ريال بدل 45 ريال!
فرع المنفوحة يناديكم..
للطلب تواصلوا معنا على: 0510128013
فروعنا: حي المنفوحة - الرياض.`,
    scriptFullEn: `Port Said meal + free shrimp kofta for only 25 SAR (down from 45 SAR) exclusively at World Hunter Al-Manfouha branch, Riyadh.`,
    visualDirectionAr: 'خلفية مائدة مربعات بلمسة مصرية دافئة، نزول أطباق السمك وكفتة الجمبري بشارة هدية، شطب السعر القديم 45 وانطلاق السعر الجديد 25 ريال.'
  },
  {
    id: 'vid-wh-2',
    clientId: 'worldhunter-motion',
    videoNum: '02',
    duration: '0:45',
    titleEn: 'World Hunter — Motion 02 (Eid Joy Seafood Bundles)',
    titleAr: 'الصياد العالمي — موشن 02 (بهجة العيد تتكون من 4 باقات)',
    quoteEn: 'Eid joy crafted with 4 signature seafood bundles starting at 75 SAR',
    quoteAr: 'بهجة العيد تتكون من: سالمون وجمبري بترفلاي وقاروص ودنيس بعروض العيد',
    summaryEn: 'Showcase reel presenting 4 Eid seafood combos (109 SAR, 149 SAR, 75 SAR, 75 SAR) with dynamic floating price tags.',
    summaryAr: 'موشن جرافيك يستعرض 4 عروض متكاملة لعيد الفطر تجمع السالمون والجمبري البترفلاي والقاروص والدنيس السنجاري مع أطباق هدية.',
    categoryEn: 'Motion Ad • Seasonal Eid Campaign',
    categoryAr: 'موشن إعلاني • حملة عروض العيد',
    videoSrc: '/assets/aistudio/motion_wh_02.mp4',
    posterImg: '/assets/aistudio/motion_wh_02_poster.jpg',
    scriptFullAr: `بهجة العيد تتكون من:
1. سالمون بالزبدة + إسباجتي كريمة (هدية) بسعر 109 ريال.
2. جمبري بترفلاي + كيلو جامبو مقلي (هدية) بسعر 149 ريال.
3. كنوز البحر القاروص + كبسة سمك فيليه (هدية) بسعر 75 ريال.
4. كيلو دنيس سنجاري + طاجن أرز الشيف بسعر 75 ريال.
للطلب تواصلوا معنا: 0596699459 / 0553380773.`,
    scriptFullEn: `Eid Joy Seafood Bundles from World Hunter: four generous festive meal deals with complimentary dishes starting from 75 SAR to 149 SAR across Riyadh branches.`,
    visualDirectionAr: 'تصميم أزرق شبكي بحري مع كروت زجاجية عائمة تنساب عرضياً لعرض كل باقة مع علامة + وصورة الأطباق والسعر داخل معيّن واضح.'
  },
  {
    id: 'vid-wh-3',
    clientId: 'worldhunter-motion',
    videoNum: '03',
    duration: '0:15',
    titleEn: 'World Hunter — Motion 03 (Save 80 SAR Jumbo Combo)',
    titleAr: 'الصياد العالمي — موشن 03 (وفّر 80 ريال في قلب المنفوحة)',
    quoteEn: 'Save 80 SAR: 1kg Jumbo Shrimp + Creamy Casserole for 99 SAR',
    quoteAr: 'وفر 80 ريال.. كيلو جمبري جامبو + طاجن جمبري بالكريمة بسعر 99 ريال بدل 180 ريال',
    summaryEn: 'High-impact 15s flash promo featuring savings counter and strike-through 180 SAR -> 99 SAR price reveal.',
    summaryAr: 'فيديو موشن خاطف (15 ثانية) يبرز التوفير المباشر (80 ريال) لعرض الجمبري الجامبو وطاجن الكريمة بـ 99 ريال في فرع المنفوحة.',
    categoryEn: 'Motion Ad • Flash Discount Reel',
    categoryAr: 'موشن إعلاني • عرض توفير سريع',
    videoSrc: '/assets/aistudio/motion_wh_03.mp4',
    posterImg: '/assets/aistudio/motion_wh_03_poster.jpg',
    scriptFullAr: `وفر 80 ريال!
كيلو جمبري جامبو + طاجن جمبري بالكريمة بسعر 99 ريال بدل 180 ريال.. في قلب المنفوحة.
للطلب: 0510128013 — حي المنفوحة، الرياض.`,
    scriptFullEn: `Save 80 SAR in the heart of Al-Manfouha: 1kg Jumbo Shrimp + Creamy Shrimp Casserole for 99 SAR (was 180 SAR).`,
    visualDirectionAr: 'افتتاحية برقم "وفر 80 ريال" وإظهار المكونات داخل إطارات متقطعة تتحول فوراً لعرض السعر 99 ريال ثم شعار الصياد العالمي.'
  },

  // ========================================================
  // SECTION 03: MOTION SCRIPTS — BITWEAVE (1 LANDSCAPE)
  // ========================================================
  {
    id: 'vid-bw-1',
    clientId: 'bitweave',
    videoNum: '01',
    duration: '0:58',
    titleEn: 'Bitweave — Corporate Motion Brand Story',
    titleAr: 'بت ويف — الفيديو التعريفي وقصة نجاح الشركة',
    quoteEn: 'Every great success starts with a small dream — and our dream became reality',
    quoteAr: 'كل نجاح يبدأ بحلم صغير.. وحلمنا أصبح واقع في بت ويف',
    summaryEn: 'Full corporate motion graphics story tracing Bitweave’s journey from 2020 launch to 2024 Egypt HQ, 8 core digital services, and client roster.',
    summaryAr: 'سكربت الفيديو التعريفي الكامل لشركة Bitweave: رحلة التأسيس منذ 2020 حتى افتتاح مقر مصر 2024، وخدمات التسويق والبرمجة الثماني، وشعارات شركاء النجاح.',
    categoryEn: 'Corporate Motion Script • Brand Story',
    categoryAr: 'موشن جرافيك تعريفي • قصة علامة',
    videoSrc: '/assets/aistudio/motion_bw_01.mp4',
    posterImg: '/assets/aistudio/motion_bw_01_poster.jpg',
    scriptFullAr: `كل نجاح يبدأ بحلم صغير، وحلمنا أصبح واقع.
في 2020 بدأنا بفكرة صغيرة، وكان حلمنا أن نصنع فرقاً حقيقياً في مجالنا: التسويق الرقمي.
خطوة بخطوة، بدأنا في مساعدة عملائنا على تحقيق أهدافهم من بداية الخدمات البسيطة إلى الخدمات المبتكرة.
وكان عام 2024 هو نقطة التحول بالنسبة لنا؛ حيث افتتحت شركة Bitweave أول مقر لها في مصر.
واليوم نحن أكثر من مجرد شركة تقدم خدمات، بل نحن شريك نجاح لكل من لديه فكرة طموحة:
إدارة صفحات السوشيال ميديا، تصميم وبرمجة المواقع، فيديوهات الموشن جرافيك، تنفيذ جميع الخدمات الإعلانية، برمجة وتنفيذ أنظمة الشركات، التعاقد مع البلوجرز، التعليق الصوتي بجميع اللهجات، وجميع خدمات المونتاج.
قصتنا بدأت بحلمنا، وحلمكم هو المحطة التالية، ونعدكم بأننا سوف نحقق لكم جميع أهدافكم وأحلامكم.
تواصلوا معنا الآن عبر الواتساب أو زوروا موقعنا bitweave.io.. شركة Bitweave للتسويق الإلكتروني.`,
    scriptFullEn: `Every success begins with a small dream. Founded in 2020 in digital marketing and expanding to our Egypt HQ in 2024, Bitweave evolved into a full-service growth partner across 8 capabilities—from web engineering and ERP to social media, motion graphics, and influencer campaigns.`,
    visualDirectionAr: 'مشهد افتتاحي لمقر الشركة البنفسجي ثم تقويم 2020 وخريطة مصر المضيئة عند 2024، يليها شبكة 8 أيقونات متصلة بخط زمني بنفسجي متحرك وشعارات العملاء ثم الخاتمة بالشعار الرسمي.',
    editorNotesAr: 'تزامن الخط الزمني البنفسجي المتحرك مع انتقالات المشاهد الثمانية، إبراز خريطة مصر وشعارات العملاء بخلفية نظيفة فاتحة، وختام أنيق بالشعار والموقع.'
  },

  // ========================================================
  // SECTION 02: SCRIPTS — MEDIANESTA (2 PORTRAIT REELS)
  // ========================================================
  {
    id: 'vid-med-s1',
    clientId: 'medianesta-scripts',
    videoNum: '01',
    duration: '0:55',
    titleEn: 'Medianesta — Script 01 (The Packaging Secret)',
    titleAr: 'ميديانيستا — سكربت 01 (السر في الـ Packaging وزيادة المبيعات)',
    quoteEn: 'Sales lower than competitors selling the exact same product? The secret is packaging',
    quoteAr: 'مبيعاتك أقل من المنافسين اللي يبيعون نفس منتجك؟ السر كله في الـ Packaging',
    summaryEn: 'Live-actor Reel explaining how professional packaging transforms customer perception and why hiring a packaging designer on Medianesta elevates conversions.',
    summaryAr: 'سكربت ريل تفاعلي يوضح لأصحاب المتاجر والمنتجات أثر تصميم التغليف الاحترافي على قرار الشراء وسهولة توظيف مصمم تغليف عبر ميديانيستا.',
    categoryEn: 'Live-Actor Reel • Brand Growth',
    categoryAr: 'سكربت ريل • تطوير المبيعات والتغليف',
    videoSrc: '/assets/aistudio/script_med_01.mp4',
    posterImg: '/assets/aistudio/script_med_01_poster.jpg',
    scriptFullAr: `مبيعاتك أقل من المنافسين اللي يبيعون نفس منتجك؟ تعال أقولك ليش..
السر كله في الـ Packaging!
تغليف المنتج هو أول انطباع ياخذه العميل عنك قبل ما يجرب منتجك أصلاً.. لو شكله احترافي ومرتب، العميل بيثق فيك وبيدفع وهو مطمن، والعكس صحيح.
عشان كذا لا تستهين أبداً بتصميم التغليف، وادخل على منصة ميديانيستا، واختر مصمم تغليف محترف يطلع منتجك بأفضل صورة تزيد مبيعاتك.`,
    scriptFullEn: `Selling the exact same product as competitors yet getting fewer sales? The secret is Packaging! Packaging creates your customer's very first impression—head over to Medianesta and hire a specialist packaging designer to elevate your brand.`,
    visualDirectionAr: 'لقطة مباشرة للمتحدث بأسلوب حواري سريع مع إبراز عينات تغليف وتفاصيل الهوية البصرية على الشاشة وعناصر تيبوجرافي توضيحية.'
  },
  {
    id: 'vid-med-s2',
    clientId: 'medianesta-scripts',
    videoNum: '02',
    duration: '1:08',
    titleEn: 'Medianesta — Script 02 (Full-Time Hiring vs Pro Freelancer)',
    titleAr: 'ميديانيستا — سكربت 02 (صداع التوظيف مقابل المحترف بضغطة زر)',
    quoteEn: 'How many weeks did you waste on interviews when a single click solves it?',
    quoteAr: 'كم أسبوع ضيعت في مقابلات التوظيف.. ميديانيستا تختصر عليك كل هذا الصداع بضغطة زر',
    summaryEn: 'Addressing business owners on the hidden cost and delays of traditional hiring compared to booking vetted creative talent per project on Medianesta.',
    summaryAr: 'مقارنة ذكية بين استنزاف الوقت والتكاليف الثابتة في التوظيف التقليدي وبين مرونة اختيار مستقلين محترفين حسب الحاجة على ميديانيستا.',
    categoryEn: 'Live-Actor Reel • Business Efficiency',
    categoryAr: 'سكربت ريل • حلول التوظيف والعمل الحر',
    videoSrc: '/assets/aistudio/script_med_02.mp4',
    posterImg: '/assets/aistudio/script_med_02_poster.jpg',
    scriptFullAr: `كم أسبوع ضيعت في مقابلات التوظيف عشان تلقى مصمم أو كاتب محتوى يناسب شغلك؟
وبالأخير تتحمل رواتب والتزامات شهرية حتى لو ما عندك ضغط شغل طول الشهر!
عشان كذا منصة ميديانيستا تختصر عليك كل هذا الصداع بضغطة زر.. تدخل تشوف أعمال المحترفين، تختار الأنسب لمشروعك، وتستلم شغلك باحترافية وفي وقتك.`,
    scriptFullEn: `How many weeks have you wasted in hiring interviews and fixed monthly payrolls? Medianesta removes the headache in one click—browse vetted portfolios, book the right specialist per project, and get results on schedule.`,
    visualDirectionAr: 'حوار مباشر أمام الكاميرا بإيقاع عملي متسارع مع نصوص بارزة تقارن بين التوظيف التقليدي والعمل الحر الاحترافي.'
  },

  // ========================================================
  // SECTION 03: MOTION SCRIPTS — ASAS AL-SHARQ (3 PORTRAIT)
  // ========================================================
  {
    id: 'vid-asas-1',
    clientId: 'asas-al-sharq',
    videoNum: '01',
    duration: '0:30',
    titleEn: 'Asas Al-Sharq — Motion 01 (Complete Commercial Setup Bundle)',
    titleAr: 'أساس الشرق — موشن 01 (باقة التأسيس التجاري الشاملة)',
    quoteEn: 'Why waste time on paperwork when you can receive your company turnkey?',
    quoteAr: 'ليش تضيع وقتك في الإجراءات وأنت تقدر تستلم شركتك جاهزة؟',
    summaryEn: 'Promotional 9:16 motion explainer for Asas Al-Sharq highlighting their all-inclusive commercial company formation package covering all government fees.',
    summaryAr: 'فيديو موشن جرافيك ترويجي يبرز باقة التأسيس التجاري الشاملة من أساس الشرق واستلام الشركة جاهزة بسعر تنافسي شامل الرسوم الحكومية.',
    categoryEn: 'Motion Ad • Commercial Company Formation',
    categoryAr: 'موشن إعلاني • تأسيس الشركات التجارية',
    videoSrc: '/assets/aistudio/motion_asas_01.mp4',
    posterImg: '/assets/aistudio/motion_asas_01_poster.jpg',
    scriptFullAr: `ليش تضيع وقتك في الإجراءات وأنت تقدر تستلم شركتك جاهزة؟
باقة التأسيس التجاري الشاملة من أساس الشرق للاستشارات الإدارية العليا..
ننجز عنك كافة خطوات التأسيس والتراخيص من البداية حتى استلام شركتك بالكامل، بسعر تنافسي شامل لكل الرسوم الحكومية.`,
    scriptFullEn: `Why spend weeks navigating registrations when you can receive your company ready for business? Asas Al-Sharq's Complete Commercial Setup Bundle handles every licensing step at a competitive rate inclusive of all government fees.`,
    visualDirectionAr: 'تصميم موشن رأسي 9:16 بألوان الهوية المؤسسية مع إبراز عناصر التأسيس التجاري وشارة "شامل لكل الرسوم الحكومية" وشعار أساس الشرق.'
  },
  {
    id: 'vid-asas-2',
    clientId: 'asas-al-sharq',
    videoNum: '02',
    duration: '1:06',
    titleEn: 'Asas Al-Sharq — Motion 02 (Professional Companies Formation in KSA)',
    titleAr: 'أساس الشرق — موشن 02 (تأسيس الشركات المهنية في السعودية)',
    quoteEn: 'Professional company setup follows clear regulatory pillars: licensing, articles, and specialty permits',
    quoteAr: 'تأسيس الشركات المهنية في السعودية: الاعتماد المهني، عقد التأسيس، والتراخيص النوعية',
    summaryEn: 'Educational motion breakdown of Saudi Arabia’s regulatory framework for engineering, interior design, and technical supervision firms in 3 structured steps.',
    summaryAr: 'فيديو موشن تثقيفي يشرح التحول التنظيمي لتأسيس الشركات المهنية في المملكة (الاستشارات الهندسية، التصميم والديكور، الإشراف الفني) عبر ثلاث مراحل واضحة.',
    categoryEn: 'Motion Explainer • Regulatory Advisory',
    categoryAr: 'موشن توعوي • تأسيس الشركات المهنية',
    videoSrc: '/assets/aistudio/motion_asas_02.mp4',
    posterImg: '/assets/aistudio/motion_asas_02_poster.jpg',
    scriptFullAr: `تأسيس الشركات المهنية في السعودية اليوم يشهد تغيراً تنظيمياً كبيراً يفتح آفاقاً جديدة لقطاعات الاستشارات الهندسية، التصميم والديكور، والإشراف الفني.
ولكي تنطلق بشكل نظامي وسليم، هناك ثلاث خطوات أساسية:
01 الاعتماد المهني.
02 عقد التأسيس المهني.
03 التراخيص النوعية.
في أساس الشرق نرافقك في كل خطوة لتبدأ شركتك المهنية بثقة وقوة نظامية.`,
    scriptFullEn: `Establishing professional firms in Saudi Arabia across engineering consultancy, interior design, and technical supervision requires three pillars: 01 Professional Accreditation, 02 Professional Articles of Association, and 03 Specialty Licenses—guided end-to-end by Asas Al-Sharq.`,
    visualDirectionAr: 'عرض موشن إنفوجرافيك متدرج للأرقام 01 و02 و03 بأسلوب مؤسسي رصين ورسوم توضيحية للقطاعات الهندسية والمهنية.'
  },
  {
    id: 'vid-asas-3',
    clientId: 'asas-al-sharq',
    videoNum: '03',
    duration: '0:40',
    titleEn: 'Asas Al-Sharq — Motion 03 (Economical Setup Bundle)',
    titleAr: 'أساس الشرق — موشن 03 (باقة التأسيس الاقتصادية)',
    quoteEn: 'Every great success story begins with a well-calculated first step',
    quoteAr: 'كل قصة نجاح عظيمة بدأت بخطوة مدروسة.. باقة التأسيس الاقتصادية',
    summaryEn: 'Targeted motion ad presenting Asas Al-Sharq’s economical company setup package for services, agriculture, and industrial sectors inclusive of government fees.',
    summaryAr: 'موشن إعلاني يسلط الضوء على باقة التأسيس الاقتصادية الموجهة لقطاعات الخدمات والزراعة والصناعة شاملةً الرسوم الحكومية.',
    categoryEn: 'Motion Ad • Economical Setup Package',
    categoryAr: 'موشن إعلاني • باقة التأسيس الاقتصادية',
    videoSrc: '/assets/aistudio/motion_asas_03.mp4',
    posterImg: '/assets/aistudio/motion_asas_03_poster.jpg',
    scriptFullAr: `كل قصة نجاح عظيمة بدأت بخطوة مدروسة..
وسواء كان مشروعك في قطاعات الخدمات، الزراعة، أو الصناعة؛ نوفر لك في أساس الشرق باقة التأسيس الاقتصادية شاملةً الرسوم الحكومية، لتنطلق باستثمارك على أسس نظامية راسخة وتكلفة مدروسة.`,
    scriptFullEn: `Every great success story starts with a well-calculated step. Tailored for service, agricultural, and industrial ventures, Asas Al-Sharq's Economical Setup Bundle includes all government fees to launch your enterprise confidently.`,
    visualDirectionAr: 'انتقالات أيقونية تمثل قطاعات الخدمات والزراعة والصناعة مع إبراز مزايا الباقة الاقتصادية ووسائل التواصل في الختام.'
  },

  // ========================================================
  // SECTION 03: MOTION SCRIPTS — WAVES ART (3 PORTRAIT; AI VIDEO IN CENTER)
  // ========================================================
  {
    id: 'vid-waves-1',
    clientId: 'wavesart',
    videoNum: '01',
    duration: '0:25',
    titleEn: 'Waves Art — Motion 01 (Riyadh Free Delivery Promo)',
    titleAr: 'ويفز آرت — موشن 01 (توصيل مجاني لأهل الرياض في شهر الخير)',
    quoteEn: 'People of Riyadh, zero-SAR shipping with no conditions or minimums',
    quoteAr: 'يا أهل الرياض لكم كل الدلال.. بمناسبة شهر الخير شحنكم بـ 0 ريال',
    summaryEn: 'Seasonal Ramadan promotional motion graphic offering unconditional free shipping across all Riyadh neighborhoods on one or more artworks.',
    summaryAr: 'فيديو موشن رمضاني يبرز عرض الشحن المجاني (0 ريال) لكافة أحياء الرياض بدون شروط أو قيود على لوحة واحدة أو أكثر.',
    categoryEn: 'Motion Ad • Seasonal Riyadh Promo',
    categoryAr: 'موشن إعلاني • عرض الرياض المجاني',
    videoSrc: '/assets/aistudio/motion_waves_01.mp4',
    posterImg: '/assets/aistudio/motion_waves_01_poster.jpg',
    scriptFullAr: `يا أهل الرياض لكم كل الدلال..
بمناسبة شهر الخير، شحنكم بـ 0 ريال!
سواء لوحة واحدة أو أكثر، فـ توصيلك مجاني لكل أحياء العاصمة.
بدون شروط، وبدون قيود.. دلالنا لأهل الرياض ما له حدود.
اطلبوا الحين لا يفوتكم العرض — ويفز آرت (wavesart-sa.com).`,
    scriptFullEn: `People of Riyadh, enjoy zero-SAR delivery during Ramadan across all capital neighborhoods—whether ordering one canvas or more, with zero conditions or restrictions.`,
    visualDirectionAr: 'خلفية بتدرج الفيروزي والأخضر الخاص بهوية ويفز آرت مع هلال وزخارف إسلامية وأيقونات الإطارات ودراجة التوصيل السريع وصولاً للشعار.'
  },
  {
    id: 'vid-waves-3',
    clientId: 'wavesart',
    videoNum: '02',
    duration: '0:26',
    titleEn: 'Waves Art — Motion 02 (Turn Shipping Costs Into Wall Art)',
    titleAr: 'ويفز آرت — موشن 02 (استثمري مصاريف التوصيل في لوحة فنية)',
    quoteEn: 'Why pay for delivery when you can add more art to your home instead?',
    quoteAr: 'ليش تدفعين توصيل وأنتِ تقدرين تزيدين بمصاري التوصيل فن؟',
    summaryEn: 'AI-crafted vertical reel reframing the 400 SAR free Kingdom-wide shipping threshold as a smart home-decor upgrade.',
    summaryAr: 'فيديو ريل مُنتَج بالذكاء الاصطناعي (AI) يشجع العميلات على رفع قيمة السلة إلى 400 ريال للحصول على توصيل مجاني وسريع لكافة أنحاء المملكة.',
    categoryEn: 'AI Motion Reel • Conversion Offer',
    categoryAr: 'فيديو AI • عرض التوصيل المجاني',
    videoSrc: '/assets/aistudio/motion_waves_03.mp4',
    posterImg: '/assets/aistudio/motion_waves_03_poster.jpg',
    aiGenerated: true,
    scriptFullAr: `ليش تدفعين توصيل وأنتِ تقدرين تزيدين بمصاري التوصيل فن؟
الحسبة بسيطة وما تبي لها تفكير:
وصّلي طلبك للـ 400 ريال، والتوصيل لأي مكان في المملكة مننا هدية!
يعني طلبك رح يوصلك مجاناً وبسرعة قياسية.
وفّري قروش التوصيل وبيهم زيدي بيتك فن.. ويفز آرت، يوصلك الزين مجاناً.`,
    scriptFullEn: `Why pay for shipping when you can turn that cost into extra art for your walls? Reach 400 SAR and get fast, complimentary delivery anywhere in Saudi Arabia from Waves Art.`,
    visualDirectionAr: 'مشاهد سينمائية دافئة مُولّدة بالذكاء الاصطناعي مع واجهة تطبيق تفاعلية ولحظة استلام اللوحات على باب المنزل وتعليقها في المجلس.'
  },
  {
    id: 'vid-waves-2',
    clientId: 'wavesart',
    videoNum: '03',
    duration: '0:21',
    titleEn: 'Waves Art — Motion 03 (0 SAR Shipping Above 400 SAR)',
    titleAr: 'ويفز آرت — موشن 03 (شحن مجاني عند الوصول لـ 400 ريال)',
    quoteEn: 'Reach 400 SAR and your shipping drops to 0 SAR anywhere in the Kingdom',
    quoteAr: 'وصلّي طلبك للـ 400 ريال.. مبارك عليك شحنك صار 0 ريال لكل المملكة',
    summaryEn: 'Dynamic threshold-meter motion reel showing cart value unlocking 0 SAR nationwide delivery and elevated interior art wall styling.',
    summaryAr: 'فيديو موشن يوضح بمؤشر تفاعلي وصول الطلب إلى 400 ريال لتفعيل التوصيل المجاني لجميع مناطق المملكة وتزيين البيت باللوحات.',
    categoryEn: 'Motion Ad • Nationwide Shipping Threshold',
    categoryAr: 'موشن إعلاني • توصيل مجاني للمملكة',
    videoSrc: '/assets/aistudio/motion_waves_02.mp4',
    posterImg: '/assets/aistudio/motion_waves_02_poster.jpg',
    scriptFullAr: `وصلّي طلبك للـ 400 ريال..
مبارك عليك، شحنك صار 0 ريال!
يعني وين ما كنتِ بالمملكة طلبك يوصلك مجاناً، لأننا في شهر الخير وفّرنا عليك قيمة التوصيل.
الحين زيدي بيتك فن ولا تخلّي العرض يفوتك.. ويفز آرت.`,
    scriptFullEn: `Take your order to 400 SAR and unlock 0 SAR shipping nationwide across the Kingdom—add timeless wall art to your space while the seasonal offer lasts.`,
    visualDirectionAr: 'عدّاد دائري تفاعلي يتحول من 80 إلى 400 ريال فـ 0 ريال شحن، يليها استعراض خريطة السعودية وديكور لوحات رمضاني دافئ.'
  }
];

export const CONTENT_STRATEGY_DATA = {
  brandNameEn: 'DAR AL-ASHAB',
  brandNameAr: 'دار العشب',
  subEn: 'Natural herbal remedies brand, Egypt',
  subAr: 'علامة مصرية متخصصة في مستحضرات الأعشاب الطبيعية والزيوت العلاجية',
  pillars: [
    { titleEn: 'Educational Heritage', titleAr: 'التأصيل المعرفي والتوعية الطبية', descEn: 'Establishing authority through science-backed herbal remedies.', descAr: 'تقديم محتوى تثقيفي مدعوم بالدراسات العلمية لفوائد الأعشاب المصرية الأصيلة.' },
    { titleEn: 'Lifestyle & Wellness', titleAr: 'نمط الحياة والوقاية اليومية', descEn: 'Daily rituals integrating natural health solutions into modern routines.', descAr: 'عادات يومية سهلة لدمج المشروبات والزيوت الطبيعية في الروتين المنزلي.' },
    { titleEn: 'Customer Trust & Testimonials', titleAr: 'تجارب العملاء والمصداقية', descEn: 'Real stories and transformations with laboratory quality certifications.', descAr: 'قصص نجاح موثقة وفحوصات معملية تؤكد نقاء المكونات وخلوها من الكيماويات.' }
  ]
};

export interface TestimonialItem {
  id: string;
  quoteAr: string;
  quoteEn: string;
  clientNameAr: string;
  clientNameEn: string;
  roleAr: string;
  roleEn: string;
  projectScopeAr: string;
  projectScopeEn: string;
  marketLabel: string;
  screenshotUrl: string;
}

export const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'chat-hue-recognition',
    quoteAr:
      'رضوى حصلت على موظف مثالي لأول ١٥ يوم عمل لها، ودي أسرع موظف يحصل عليها قبل النصف الأول من الشهر، مجتهدة جدًا وشاطرة وإضافة قوية — مبروك يا رضوى شاطرة ومنظمة.',
    quoteEn:
      'Awarded Employee of the Month within her first 15 days — the fastest recognition achieved before mid-month, praised for dedication, clarity, and organization.',
    clientNameAr: 'فريق العمل — HUE',
    clientNameEn: 'HUE Team Recognition',
    roleAr: 'إشادة إدارية • Taha Esmail & Asmaa',
    roleEn: 'Taha Esmail & Asmaa — Work Chat',
    projectScopeAr: 'موظف مثالي لأول ١٥ يوم عمل',
    projectScopeEn: 'Fastest Recognition • Work Chat',
    marketLabel: 'TEAM CHAT',
    screenshotUrl: '/assets/aistudio/0a3e5a7b-d879-4bc6-9437-f5dda20ca547_a3c29660.jpg',
  },
  {
    id: 'chat-script-sheet',
    quoteAr: 'ممتاز جداااا يا رضوى حبيت الصياغة والتنسيق جدااا 💜👏',
    quoteEn: '“Excellent work Radwa, loved the wording and clean script structure.”',
    clientNameAr: 'رأي عميل — تسليم السكربت',
    clientNameEn: 'Client Script Feedback',
    roleAr: 'مراجعة مباشرة على الشيت',
    roleEn: 'Direct WhatsApp Review',
    projectScopeAr: 'الصياغة والتنسيق',
    projectScopeEn: 'Script Wording & Structure',
    marketLabel: 'CLIENT CHAT',
    screenshotUrl: '/assets/aistudio/33d0b435-4ed1-4b24-9408-5511b1fe951e_10444d33.jpg',
  },
  {
    id: 'chat-website-script',
    quoteAr:
      'ما شاء الله لسه شايف الاسكربت مظبوط بالحرف وكأنك اللي مصممة الموقع تسلم إيدك يا رضوى.',
    quoteEn:
      '“Just reviewed the script—spot on down to every detail, as if you designed the website yourself.”',
    clientNameAr: 'رأي عميل — سكربت الموقع',
    clientNameEn: 'Website Script Review',
    roleAr: 'تقييم دقة المحتوى وفهم التجربة',
    roleEn: 'Client WhatsApp Feedback',
    projectScopeAr: 'دقة الصياغة وتجربة المستخدم',
    projectScopeEn: 'UX-Aligned Scriptwriting',
    marketLabel: 'CLIENT CHAT',
    screenshotUrl: '/assets/aistudio/d53e66df-e215-484f-8669-a72198d86835_5fbfdf95.jpg',
  },
];

export interface SocialLinkItem {
  id: string;
  platform: 'whatsapp' | 'x' | 'instagram' | 'facebook' | 'behance';
  labelEn: string;
  labelAr: string;
  handle: string;
  url: string;
}

export const DEFAULT_SOCIAL_LINKS: SocialLinkItem[] = [
  {
    id: 'soc-whatsapp',
    platform: 'whatsapp',
    labelEn: 'WhatsApp',
    labelAr: 'واتساب',
    handle: '01207845340',
    url: 'https://wa.me/201207845340',
  },
  {
    id: 'soc-x',
    platform: 'x',
    labelEn: 'X',
    labelAr: 'إكس (تويتر)',
    handle: '@radwa_muhammedd',
    url: 'https://x.com/radwa_muhammedd?s=11',
  },
  {
    id: 'soc-instagram',
    platform: 'instagram',
    labelEn: 'Instagram',
    labelAr: 'إنستجرام',
    handle: '@radwa_muhammad',
    url: 'https://www.instagram.com/radwa_muhammad?rpxt=MTR0cnVibXFxMzNvZQ%3D%3D&utm_source=qr',
  },
  {
    id: 'soc-facebook',
    platform: 'facebook',
    labelEn: 'Facebook',
    labelAr: 'فيسبوك',
    handle: 'Radwa Muhammad',
    url: 'https://www.facebook.com/share/1AE9hWFx2N/?mibextid=wwXIfr',
  },
];

