"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "ar" | "fr" | "ur" | "es" | "hi" | "de"

interface LanguageContextType {
  currentLanguage: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    // Navigation
    home: "Home",
    courses: "Courses",
    research: "Research",
    blog: "Blog",
    videos: "Videos",
    discussions: "Discussions",
    community: "Community",
    about: "About",
    contact: "Contact",
    volunteer: "Volunteer",
    donate: "Donate",
    login: "Login",
    signup: "Sign Up",
    logout: "Logout",
    dashboard: "Dashboard",
    profile: "Profile",
    settings: "Settings",
    admin_dashboard: "Admin Dashboard",
    newsletter: "Newsletter",
    transparency: "Transparency",
    privacy_policy: "Privacy Policy",
    terms_of_service: "Terms of Service",
    help_center: "Help Center",
    contact_us: "Contact Us",
    get_started: "Get Started",
    toggle_navigation: "Toggle navigation",

    // About Section - Sara's Story
    about_website: "About the Website",
    welcome_to_oasis: "🌿 Welcome to Oasis of Knowledge",
    founder_intro:
      "Hi, my name is Sara Skouri, and I'm the founder of Oasis of Knowledge. I'm a senior in high school, and this platform is the space I've always dreamed of creating.",
    why_built_platform:
      "I built Oasis of Knowledge because I believe that science and knowledge should not be trapped behind language barriers. Today, over 95% of academic and scientific content is in English — and that leaves millions of bright minds around the world struggling to access it.",
    exclusion_problem:
      "I've seen how students, researchers, and curious learners — especially from developing countries — are excluded from opportunities simply because they don't speak English fluently. I believe that's not fair.",
    knowledge_belongs:
      "🌍 Knowledge belongs to humanity. It should be free, open, and accessible to all — no matter your language, background, or location. Whether you speak Arabic, French, English, or another language, this platform is for you.",
    platform_purpose:
      "That's why I created Oasis of Knowledge — a multilingual, collaborative space where we can share, translate, and grow together. Here, we are not just users — we are builders. Each of us is part of the journey. This is our collective oasis for learning, discovery, and connection.",
    lets_build_together: "Let's bring knowledge home.\nLet's build this — together. 💫",
    note_title: "Note 🛠️",
    work_in_progress:
      "As I build Oasis of Knowledge, you may notice that some numbers, content, or sections are temporary or not fully real yet. That's simply because I'm still in the process of creating this platform — and sometimes, when you're working alone, you have to add placeholders to make things work.",
    explore_and_grow:
      "Please feel free to explore, share ideas, and grow with me. Every part of this site is a work in progress, just like learning itself. 🌱",
    with_love: "— With love,\nSara Skouri",

    // Home Page
    oasis_of_knowledge: "Oasis of Knowledge",
    platform_description:
      "A multilingual platform for research, learning, and knowledge sharing. Join our global community of learners and researchers.",
    explore_courses: "Explore Courses",
    browse_research: "Browse Research",
    research_papers: "Research Papers",
    active_users: "Active Users",
    certificates_issued: "Certificates Issued",
    explore_categories: "Explore Categories",
    categories_description: "Discover knowledge across various fields and disciplines",
    platform_features: "Platform Features",
    structured_courses: "Structured Courses",
    courses_description: "Learn with comprehensive courses and earn certificates",
    research_description: "Access thousands of academic papers and research",
    community_description: "Connect with researchers and learners worldwide",
    gamification: "Gamification",
    gamification_description: "Earn points, badges, and unlock achievements",
    join_community: "Join Our Global Community",
    join_description:
      "Start your learning journey today and connect with thousands of researchers and learners worldwide.",
    support_platform: "Support Platform",

    // Categories
    stem: "STEM",
    medicine_biology: "Medicine & Biology",
    psychology: "Psychology & Sociology",
    philosophy: "Philosophy",
    politics: "Politics & Global Affairs",
    history: "History",

    // Common UI Elements
    loading: "Loading...",
    search: "Search",
    filter: "Filter",
    sort: "Sort",
    submit: "Submit",
    cancel: "Cancel",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    view: "View",
    share: "Share",
    download: "Download",
    upload: "Upload",
    next: "Next",
    previous: "Previous",
    back: "Back",
    continue: "Continue",
    finish: "Finish",
    close: "Close",
    open: "Open",

    // Help Center
    help_center_title: "Help Center",
    help_center_subtitle:
      "Welcome to the Oasis of Knowledge Help Center! We're here to help you get the most out of our platform. Below you'll find answers to common questions and guides to help you navigate our multilingual research hub.",
    contact_support: "Contact Support",
    contact_support_desc: "Get direct help from our support team",
    community_support: "Community Support",
    community_support_desc: "Get help from our community members",
    join_community: "Join Community",
    privacy_security: "Privacy & Security",
    privacy_security_desc: "Learn about our privacy and security policies",
    frequently_asked_questions: "Frequently Asked Questions",
    help_categories: "Help Categories",
    need_more_help: "Need More Help?",
    need_more_help_desc: "If you can't find what you're looking for, please reach out to us. We're happy to assist!",
    connect_linkedin: "Connect on LinkedIn",
    guide: "Guide",

    // FAQ Questions and Answers
    faq_language_switch: "How do I switch between languages?",
    faq_language_switch_answer:
      "Use the language selector (globe icon) at the top right of the page to choose from any of our supported languages including English, Arabic, French, Urdu, Spanish, Hindi, and German.",
    faq_contribute_content: "Can I contribute content or translations?",
    faq_contribute_content_answer:
      "Currently, contributions are by invitation only. However, we're working on features that will allow community members to contribute. Stay tuned for updates!",
    faq_report_problem: "How do I report a problem or bug?",
    faq_report_problem_answer:
      "Please use our Contact Us page to send us details about any issues you experience. Include as much detail as possible to help us resolve the issue quickly.",
    faq_data_safety: "Is my data safe?",
    faq_data_safety_answer:
      "Yes, we take your privacy and data security very seriously. All data is encrypted and stored securely. For more details, please see our Privacy Policy.",
    faq_free_platform: "Is the platform free to use?",
    faq_free_platform_answer:
      "Yes, Oasis of Knowledge is completely free to use. We believe knowledge should be accessible to everyone regardless of their financial situation.",
    faq_offline_access: "Can I access content offline?",
    faq_offline_access_answer:
      "Currently, our platform requires an internet connection. We're working on offline capabilities for future releases.",

    // Help Categories
    getting_started: "Getting Started",
    getting_started_desc: "Learn the basics of using our platform",
    research_learning: "Research & Learning",
    research_learning_desc: "Find and access educational content",
    community_help: "Community",
    community_help_desc: "Connect and collaborate with others",
    technical_support: "Technical Support",
    technical_support_desc: "Troubleshoot technical issues",

    // Help Articles
    how_to_create_account: "How to Create an Account",
    how_to_create_account_content: "Step-by-step guide to creating your account",
    platform_navigation: "Platform Navigation",
    platform_navigation_content: "Learn how to navigate through different sections",
    language_switching: "Language Switching",
    language_switching_content: "How to change your preferred language",
    searching_research: "Searching for Research",
    searching_research_content: "Tips for finding relevant research papers",
    enrolling_courses: "Enrolling in Courses",
    enrolling_courses_content: "How to enroll and participate in courses",
    tracking_progress: "Tracking Your Progress",
    tracking_progress_content: "Monitor your learning journey",
    joining_discussions: "Joining Discussions",
    joining_discussions_content: "How to participate in community discussions",
    contributing_content: "Contributing Content",
    contributing_content_content: "Guidelines for content contribution",
    volunteer_opportunities: "Volunteer Opportunities",
    volunteer_opportunities_content: "Ways to help and volunteer",
    troubleshooting: "Troubleshooting",
    troubleshooting_content: "Common issues and solutions",
    browser_compatibility: "Browser Compatibility",
    browser_compatibility_content: "Supported browsers and requirements",
    mobile_access: "Mobile Access",
    mobile_access_content: "Using the platform on mobile devices",

    // Courses
    all_courses: "All Courses",
    my_courses: "My Courses",
    course_categories: "Course Categories",
    enroll_now: "Enroll Now",
    course_duration: "Duration",
    course_level: "Level",
    course_instructor: "Instructor",
    course_students: "Students",
    course_rating: "Rating",
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",

    // Blog
    latest_posts: "Latest Posts",
    read_more: "Read More",
    published_on: "Published on",
    written_by: "Written by",
    blog_categories: "Categories",
    featured_posts: "Featured Posts",

    // Community
    community_guidelines: "Community Guidelines",
    join_discussion: "Join Discussion",
    start_discussion: "Start Discussion",
    community_members: "Community Members",
    active_discussions: "Active Discussions",

    // Footer
    quick_links: "Quick Links",
    support: "Support",
    legal: "Legal",
    all_rights_reserved: "All rights reserved",

    // Other common translations
    welcome: "Welcome",
    description: "Description",
    category: "Category",
    date: "Date",
    author: "Author",
    tags: "Tags",
    comments: "Comments",
    likes: "Likes",
    views: "Views",
    featured: "Featured",
    popular: "Popular",
    recent: "Recent",
    trending: "Trending",
  },

  ar: {
    // Navigation
    home: "الرئيسية",
    courses: "الدورات",
    research: "البحث",
    blog: "المدونة",
    videos: "الفيديوهات",
    discussions: "المناقشات",
    community: "المجتمع",
    about: "حول",
    contact: "اتصل",
    volunteer: "تطوع",
    donate: "تبرع",
    login: "تسجيل الدخول",
    signup: "إنشاء حساب",
    logout: "تسجيل الخروج",
    dashboard: "لوحة التحكم",
    profile: "الملف الشخصي",
    settings: "الإعدادات",
    admin_dashboard: "لوحة الإدارة",
    newsletter: "النشرة الإخبارية",
    transparency: "الشفافية",
    privacy_policy: "سياسة الخصوصية",
    terms_of_service: "شروط الخدمة",
    help_center: "مركز المساعدة",
    contact_us: "اتصل بنا",
    get_started: "ابدأ الآن",
    toggle_navigation: "تبديل التنقل",

    // About Section - Sara's Story
    about_website: "حول الموقع",
    welcome_to_oasis: "🌿 مرحباً بكم في واحة المعرفة",
    founder_intro:
      "مرحباً، اسمي سارة سكوري، وأنا مؤسسة واحة المعرفة. أنا طالبة في السنة الأخيرة من المدرسة الثانوية، وهذه المنصة هي المساحة التي طالما حلمت بإنشائها.",
    why_built_platform:
      "بنيت واحة المعرفة لأنني أؤمن بأن العلم والمعرفة يجب ألا يكونا محاصرين خلف حواجز اللغة. اليوم، أكثر من 95% من المحتوى الأكاديمي والعلمي باللغة الإنجليزية — وهذا يترك ملايين العقول المشرقة حول العالم تكافح للوصول إليه.",
    exclusion_problem:
      "لقد رأيت كيف يتم استبعاد الطلاب والباحثين والمتعلمين الفضوليين — خاصة من البلدان النامية — من الفرص لمجرد أنهم لا يتحدثون الإنجليزية بطلاقة. أعتقد أن هذا ليس عدلاً.",
    knowledge_belongs:
      "🌍 المعرفة تنتمي للإنسانية. يجب أن تكون مجانية ومفتوحة ومتاحة للجميع — بغض النظر عن لغتك أو خلفيتك أو موقعك. سواء كنت تتحدث العربية أو الفرنسية أو الإنجليزية أو أي لغة أخرى، فهذه المنصة لك.",
    platform_purpose:
      "لهذا السبب أنشأت واحة المعرفة — مساحة متعددة اللغات وتعاونية حيث يمكننا المشاركة والترجمة والنمو معاً. هنا، لسنا مجرد مستخدمين — نحن بناة. كل واحد منا جزء من الرحلة. هذه واحتنا الجماعية للتعلم والاكتشاف والتواصل.",
    lets_build_together: "لنجلب المعرفة إلى البيت.\nلنبني هذا — معاً. 💫",
    note_title: "ملاحظة 🛠️",
    work_in_progress:
      "بينما أبني واحة المعرفة، قد تلاحظون أن بعض الأرقام أو المحتوى أو الأقسام مؤقتة أو ليست حقيقية تماماً بعد. هذا ببساطة لأنني ما زلت في عملية إنشاء هذه المنصة — وأحياناً، عندما تعمل وحدك، عليك إضافة عناصر نائبة لجعل الأشياء تعمل.",
    explore_and_grow:
      "يرجى الاستكشاف بحرية ومشاركة الأفكار والنمو معي. كل جزء من هذا الموقع هو عمل قيد التطوير، تماماً مثل التعلم نفسه. 🌱",
    with_love: "— بالحب،\nسارة سكوري",

    // Home Page
    oasis_of_knowledge: "واحة المعرفة",
    platform_description:
      "منصة متعددة اللغات للبحث والتعلم ومشاركة المعرفة. انضم إلى مجتمعنا العالمي من المتعلمين والباحثين.",
    explore_courses: "استكشف الدورات",
    browse_research: "تصفح البحوث",
    research_papers: "الأوراق البحثية",
    active_users: "المستخدمون النشطون",
    certificates_issued: "الشهادات الممنوحة",
    explore_categories: "استكشف الفئات",
    categories_description: "اكتشف المعرفة عبر مختلف المجالات والتخصصات",
    platform_features: "ميزات المنصة",
    structured_courses: "دورات منظمة",
    courses_description: "تعلم من خلال دورات شاملة واحصل على شهادات",
    research_description: "الوصول إلى آلاف الأوراق الأكاديمية والبحوث",
    community_description: "تواصل مع الباحثين والمتعلمين حول العالم",
    gamification: "التلعيب",
    gamification_description: "اكسب نقاط وشارات وافتح الإنجازات",
    join_community: "انضم إلى مجتمعنا العالمي",
    join_description: "ابدأ رحلة التعلم اليوم وتواصل مع آلاف الباحثين والمتعلمين حول العالم.",
    support_platform: "ادعم المنصة",

    // Categories
    stem: "العلوم والتكنولوجيا",
    medicine_biology: "الطب والأحياء",
    psychology: "علم النفس والاجتماع",
    philosophy: "الفلسفة",
    politics: "السياسة والشؤون العالمية",
    history: "التاريخ",

    // Common UI Elements
    loading: "جاري التحميل...",
    search: "بحث",
    filter: "تصفية",
    sort: "ترتيب",
    submit: "إرسال",
    cancel: "إلغاء",
    save: "حفظ",
    edit: "تعديل",
    delete: "حذف",
    view: "عرض",
    share: "مشاركة",
    download: "تحميل",
    upload: "رفع",
    next: "التالي",
    previous: "السابق",
    back: "رجوع",
    continue: "متابعة",
    finish: "إنهاء",
    close: "إغلاق",
    open: "فتح",

    // Help Center
    help_center_title: "مركز المساعدة",
    help_center_subtitle:
      "مرحباً بكم في مركز مساعدة واحة المعرفة! نحن هنا لمساعدتكم في الاستفادة القصوى من منصتنا. ستجدون أدناه إجابات على الأسئلة الشائعة وأدلة لمساعدتكم في التنقل عبر مركز البحث متعدد اللغات.",
    contact_support: "اتصل بالدعم",
    contact_support_desc: "احصل على مساعدة مباشرة من فريق الدعم",
    community_support: "دعم المجتمع",
    community_support_desc: "احصل على المساعدة من أعضاء مجتمعنا",
    join_community: "انضم للمجتمع",
    privacy_security: "الخصوصية والأمان",
    privacy_security_desc: "تعرف على سياسات الخصوصية والأمان",
    frequently_asked_questions: "الأسئلة الشائعة",
    help_categories: "فئات المساعدة",
    need_more_help: "تحتاج مساعدة إضافية؟",
    need_more_help_desc: "إذا لم تجد ما تبحث عنه، يرجى التواصل معنا. نحن سعداء لمساعدتك!",
    connect_linkedin: "تواصل عبر لينكد إن",
    guide: "دليل",

    // FAQ Questions and Answers
    faq_language_switch: "كيف أقوم بتبديل اللغات؟",
    faq_language_switch_answer:
      "استخدم محدد اللغة (أيقونة الكرة الأرضية) في أعلى يمين الصفحة للاختيار من بين أي من اللغات المدعومة بما في ذلك الإنجليزية والعربية والفرنسية والأردية والإسبانية والهندية والألمانية.",
    faq_contribute_content: "هل يمكنني المساهمة بالمحتوى أو الترجمات؟",
    faq_contribute_content_answer:
      "حالياً، المساهمات بالدعوة فقط. ومع ذلك، نحن نعمل على ميزات ستسمح لأعضاء المجتمع بالمساهمة. ترقبوا التحديثات!",
    faq_report_problem: "كيف أبلغ عن مشكلة أو خطأ؟",
    faq_report_problem_answer:
      "يرجى استخدام صفحة اتصل بنا لإرسال تفاصيل حول أي مشاكل تواجهها. قم بتضمين أكبر قدر من التفاصيل لمساعدتنا في حل المشكلة بسرعة.",
    faq_data_safety: "هل بياناتي آمنة؟",
    faq_data_safety_answer:
      "نعم، نحن نأخذ خصوصيتك وأمان بياناتك على محمل الجد. جميع البيانات مشفرة ومخزنة بأمان. لمزيد من التفاصيل، يرجى الاطلاع على سياسة الخصوصية.",
    faq_free_platform: "هل المنصة مجانية الاستخدام؟",
    faq_free_platform_answer:
      "نعم، واحة المعرفة مجانية تماماً للاستخدام. نحن نؤمن أن المعرفة يجب أن تكون متاحة للجميع بغض النظر عن وضعهم المالي.",
    faq_offline_access: "هل يمكنني الوصول للمحتوى دون اتصال بالإنترنت؟",
    faq_offline_access_answer:
      "حالياً، تتطلب منصتنا اتصالاً بالإنترنت. نحن نعمل على إمكانيات الوصول دون اتصال للإصدارات المستقبلية.",

    // Help Categories
    getting_started: "البدء",
    getting_started_desc: "تعلم أساسيات استخدام منصتنا",
    research_learning: "البحث والتعلم",
    research_learning_desc: "العثور على المحتوى التعليمي والوصول إليه",
    community_help: "المجتمع",
    community_help_desc: "التواصل والتعاون مع الآخرين",
    technical_support: "الدعم التقني",
    technical_support_desc: "حل المشاكل التقنية",

    // Help Articles
    how_to_create_account: "كيفية إنشاء حساب",
    how_to_create_account_content: "دليل خطوة بخطوة لإنشاء حسابك",
    platform_navigation: "التنقل في المنصة",
    platform_navigation_content: "تعلم كيفية التنقل عبر الأقسام المختلفة",
    language_switching: "تبديل اللغة",
    language_switching_content: "كيفية تغيير لغتك المفضلة",
    searching_research: "البحث عن الأبحاث",
    searching_research_content: "نصائح للعثور على الأوراق البحثية ذات الصلة",
    enrolling_courses: "التسجيل في الدورات",
    enrolling_courses_content: "كيفية التسجيل والمشاركة في الدورات",
    tracking_progress: "تتبع تقدمك",
    tracking_progress_content: "راقب رحلة التعلم الخاصة بك",
    joining_discussions: "الانضمام للمناقشات",
    joining_discussions_content: "كيفية المشاركة في مناقشات المجتمع",
    contributing_content: "المساهمة بالمحتوى",
    contributing_content_content: "إرشادات للمساهمة بالمحتوى",
    volunteer_opportunities: "فرص التطوع",
    volunteer_opportunities_content: "طرق المساعدة والتطوع",
    troubleshooting: "حل المشاكل",
    troubleshooting_content: "المشاكل الشائعة والحلول",
    browser_compatibility: "توافق المتصفح",
    browser_compatibility_content: "المتصفحات المدعومة والمتطلبات",
    mobile_access: "الوصول عبر الهاتف المحمول",
    mobile_access_content: "استخدام المنصة على الأجهزة المحمولة",

    // Courses
    all_courses: "جميع الدورات",
    my_courses: "دوراتي",
    course_categories: "فئات الدورات",
    enroll_now: "سجل الآن",
    course_duration: "المدة",
    course_level: "المستوى",
    course_instructor: "المدرس",
    course_students: "الطلاب",
    course_rating: "التقييم",
    beginner: "مبتدئ",
    intermediate: "متوسط",
    advanced: "متقدم",

    // Blog
    latest_posts: "أحدث المنشورات",
    read_more: "اقرأ المزيد",
    published_on: "نُشر في",
    written_by: "كتبه",
    blog_categories: "الفئات",
    featured_posts: "المنشورات المميزة",

    // Community
    community_guidelines: "إرشادات المجتمع",
    join_discussion: "انضم للمناقشة",
    start_discussion: "ابدأ مناقشة",
    community_members: "أعضاء المجتمع",
    active_discussions: "المناقشات النشطة",

    // Footer
    quick_links: "روابط سريعة",
    support: "الدعم",
    legal: "قانوني",
    all_rights_reserved: "جميع الحقوق محفوظة",

    // Other common translations
    welcome: "مرحباً",
    description: "الوصف",
    category: "الفئة",
    date: "التاريخ",
    author: "المؤلف",
    tags: "العلامات",
    comments: "التعليقات",
    likes: "الإعجابات",
    views: "المشاهدات",
    featured: "مميز",
    popular: "شائع",
    recent: "حديث",
    trending: "رائج",
  },

  fr: {
    // Navigation
    home: "Accueil",
    courses: "Cours",
    research: "Recherche",
    blog: "Blog",
    videos: "Vidéos",
    discussions: "Discussions",
    community: "Communauté",
    about: "À propos",
    contact: "Contact",
    volunteer: "Bénévolat",
    donate: "Faire un don",
    login: "Connexion",
    signup: "S'inscrire",
    logout: "Déconnexion",
    dashboard: "Tableau de bord",
    profile: "Profil",
    settings: "Paramètres",
    admin_dashboard: "Tableau de bord admin",
    newsletter: "Newsletter",
    transparency: "Transparence",
    privacy_policy: "Politique de confidentialité",
    terms_of_service: "Conditions d'utilisation",
    help_center: "Centre d'aide",
    contact_us: "Nous contacter",
    get_started: "Commencer",
    toggle_navigation: "Basculer la navigation",

    // About Section - Sara's Story
    about_website: "À Propos du Site",
    welcome_to_oasis: "🌿 Bienvenue à l'Oasis de la Connaissance",
    founder_intro:
      "Salut, je m'appelle Sara Skouri, et je suis la fondatrice de l'Oasis de la Connaissance. Je suis en terminale, et cette plateforme est l'espace dont j'ai toujours rêvé de créer.",
    why_built_platform:
      "J'ai construit l'Oasis de la Connaissance parce que je crois que la science et la connaissance ne devraient pas être piégées derrière des barrières linguistiques. Aujourd'hui, plus de 95% du contenu académique et scientifique est en anglais — et cela laisse des millions d'esprits brillants à travers le monde lutter pour y accéder.",
    exclusion_problem:
      "J'ai vu comment les étudiants, chercheurs et apprenants curieux — surtout des pays en développement — sont exclus des opportunités simplement parce qu'ils ne parlent pas anglais couramment. Je crois que ce n'est pas juste.",
    knowledge_belongs:
      "🌍 La connaissance appartient à l'humanité. Elle devrait être gratuite, ouverte et accessible à tous — peu importe votre langue, origine ou localisation. Que vous parliez arabe, français, anglais ou une autre langue, cette plateforme est pour vous.",
    platform_purpose:
      "C'est pourquoi j'ai créé l'Oasis de la Connaissance — un espace multilingue et collaboratif où nous pouvons partager, traduire et grandir ensemble. Ici, nous ne sommes pas seulement des utilisateurs — nous sommes des constructeurs. Chacun de nous fait partie du voyage. C'est notre oasis collective pour l'apprentissage, la découverte et la connexion.",
    lets_build_together: "Ramenons la connaissance à la maison.\nConstruisons cela — ensemble. 💫",
    note_title: "Note 🛠️",
    work_in_progress:
      "Alors que je construis l'Oasis de la Connaissance, vous pourriez remarquer que certains chiffres, contenus ou sections sont temporaires ou pas encore entièrement réels. C'est simplement parce que je suis encore en train de créer cette plateforme — et parfois, quand on travaille seul, il faut ajouter des éléments temporaires pour faire fonctionner les choses.",
    explore_and_grow:
      "N'hésitez pas à explorer, partager des idées et grandir avec moi. Chaque partie de ce site est un travail en cours, tout comme l'apprentissage lui-même. 🌱",
    with_love: "— Avec amour,\nSara Skouri",

    // Home Page
    oasis_of_knowledge: "Oasis de la Connaissance",
    platform_description:
      "Une plateforme multilingue pour la recherche, l'apprentissage et le partage des connaissances. Rejoignez notre communauté mondiale d'apprenants et de chercheurs.",
    explore_courses: "Explorer les Cours",
    browse_research: "Parcourir la Recherche",
    research_papers: "Articles de Recherche",
    active_users: "Utilisateurs Actifs",
    certificates_issued: "Certificats Délivrés",
    explore_categories: "Explorer les Catégories",
    categories_description: "Découvrez la connaissance à travers divers domaines et disciplines",
    platform_features: "Fonctionnalités de la Plateforme",
    structured_courses: "Cours Structurés",
    courses_description: "Apprenez avec des cours complets et obtenez des certificats",
    research_description: "Accédez à des milliers d'articles académiques et de recherches",
    community_description: "Connectez-vous avec des chercheurs et apprenants du monde entier",
    gamification: "Gamification",
    gamification_description: "Gagnez des points, des badges et débloquez des réalisations",
    join_community: "Rejoignez Notre Communauté Mondiale",
    join_description:
      "Commencez votre parcours d'apprentissage aujourd'hui et connectez-vous avec des milliers de chercheurs et d'apprenants dans le monde entier.",
    support_platform: "Soutenir la Plateforme",

    // Categories
    stem: "STEM",
    medicine_biology: "Médecine et Biologie",
    psychology: "Psychologie et Sociologie",
    philosophy: "Philosophie",
    politics: "Politique et Affaires Mondiales",
    history: "Histoire",

    // Common UI Elements
    loading: "Chargement...",
    search: "Rechercher",
    filter: "Filtrer",
    sort: "Trier",
    submit: "Soumettre",
    cancel: "Annuler",
    save: "Sauvegarder",
    edit: "Modifier",
    delete: "Supprimer",
    view: "Voir",
    share: "Partager",
    download: "Télécharger",
    upload: "Téléverser",
    next: "Suivant",
    previous: "Précédent",
    back: "Retour",
    continue: "Continuer",
    finish: "Terminer",
    close: "Fermer",
    open: "Ouvrir",

    // Help Center
    help_center_title: "Centre d'aide",
    help_center_subtitle:
      "Bienvenue au Centre d'aide d'Oasis de la Connaissance ! Nous sommes là pour vous aider à tirer le meilleur parti de notre plateforme. Vous trouverez ci-dessous des réponses aux questions courantes et des guides pour vous aider à naviguer dans notre hub de recherche multilingue.",
    contact_support: "Contacter le support",
    contact_support_desc: "Obtenez une aide directe de notre équipe de support",
    community_support: "Support communautaire",
    community_support_desc: "Obtenez de l'aide des membres de notre communauté",
    join_community: "Rejoindre la communauté",
    privacy_security: "Confidentialité et sécurité",
    privacy_security_desc: "Apprenez-en plus sur nos politiques de confidentialité et de sécurité",
    frequently_asked_questions: "Questions fréquemment posées",
    help_categories: "Catégories d'aide",
    need_more_help: "Besoin d'aide supplémentaire ?",
    need_more_help_desc:
      "Si vous ne trouvez pas ce que vous cherchez, n'hésitez pas à nous contacter. Nous sommes heureux de vous aider !",
    connect_linkedin: "Se connecter sur LinkedIn",
    guide: "Guide",

    // FAQ Questions and Answers
    faq_language_switch: "Comment changer de langue ?",
    faq_language_switch_answer:
      "Utilisez le sélecteur de langue (icône globe) en haut à droite de la page pour choisir parmi nos langues supportées : anglais, arabe, français, ourdou, espagnol, hindi et allemand.",
    faq_contribute_content: "Puis-je contribuer du contenu ou des traductions ?",
    faq_contribute_content_answer:
      "Actuellement, les contributions se font uniquement sur invitation. Cependant, nous travaillons sur des fonctionnalités qui permettront aux membres de la communauté de contribuer. Restez à l'écoute !",
    faq_report_problem: "Comment signaler un problème ou un bug ?",
    faq_report_problem_answer:
      "Veuillez utiliser notre page de contact pour nous envoyer les détails de tout problème que vous rencontrez. Incluez autant de détails que possible pour nous aider à résoudre le problème rapidement.",
    faq_data_safety: "Mes données sont-elles sécurisées ?",
    faq_data_safety_answer:
      "Oui, nous prenons votre confidentialité et la sécurité de vos données très au sérieux. Toutes les données sont cryptées et stockées en sécurité. Pour plus de détails, consultez notre Politique de confidentialité.",
    faq_free_platform: "La plateforme est-elle gratuite ?",
    faq_free_platform_answer:
      "Oui, Oasis de la Connaissance est entièrement gratuite. Nous croyons que la connaissance devrait être accessible à tous, quelle que soit leur situation financière.",
    faq_offline_access: "Puis-je accéder au contenu hors ligne ?",
    faq_offline_access_answer:
      "Actuellement, notre plateforme nécessite une connexion Internet. Nous travaillons sur des capacités hors ligne pour les futures versions.",

    // Help Categories
    getting_started: "Commencer",
    getting_started_desc: "Apprenez les bases de l'utilisation de notre plateforme",
    research_learning: "Recherche et apprentissage",
    research_learning_desc: "Trouvez et accédez au contenu éducatif",
    community_help: "Communauté",
    community_help_desc: "Connectez-vous et collaborez avec d'autres",
    technical_support: "Support technique",
    technical_support_desc: "Résolvez les problèmes techniques",

    // Help Articles
    how_to_create_account: "Comment créer un compte",
    how_to_create_account_content: "Guide étape par étape pour créer votre compte",
    platform_navigation: "Navigation sur la plateforme",
    platform_navigation_content: "Apprenez à naviguer dans les différentes sections",
    language_switching: "Changement de langue",
    language_switching_content: "Comment changer votre langue préférée",
    searching_research: "Recherche de recherches",
    searching_research_content: "Conseils pour trouver des articles de recherche pertinents",
    enrolling_courses: "S'inscrire aux cours",
    enrolling_courses_content: "Comment s'inscrire et participer aux cours",
    tracking_progress: "Suivre vos progrès",
    tracking_progress_content: "Surveillez votre parcours d'apprentissage",
    joining_discussions: "Rejoindre les discussions",
    joining_discussions_content: "Comment participer aux discussions communautaires",
    contributing_content: "Contribuer du contenu",
    contributing_content_content: "Directives pour la contribution de contenu",
    volunteer_opportunities: "Opportunités de bénévolat",
    volunteer_opportunities_content: "Façons d'aider et de faire du bénévolat",
    troubleshooting: "Dépannage",
    troubleshooting_content: "Problèmes courants et solutions",
    browser_compatibility: "Compatibilité des navigateurs",
    browser_compatibility_content: "Navigateurs supportés et exigences",
    mobile_access: "Accès mobile",
    mobile_access_content: "Utilisation de la plateforme sur appareils mobiles",

    // Courses
    all_courses: "Tous les cours",
    my_courses: "Mes cours",
    course_categories: "Catégories de cours",
    enroll_now: "S'inscrire maintenant",
    course_duration: "Durée",
    course_level: "Niveau",
    course_instructor: "Instructeur",
    course_students: "Étudiants",
    course_rating: "Note",
    beginner: "Débutant",
    intermediate: "Intermédiaire",
    advanced: "Avancé",

    // Blog
    latest_posts: "Derniers articles",
    read_more: "Lire plus",
    published_on: "Publié le",
    written_by: "Écrit par",
    blog_categories: "Catégories",
    featured_posts: "Articles en vedette",

    // Community
    community_guidelines: "Directives communautaires",
    join_discussion: "Rejoindre la discussion",
    start_discussion: "Commencer une discussion",
    community_members: "Membres de la communauté",
    active_discussions: "Discussions actives",

    // Footer
    quick_links: "Liens rapides",
    support: "Support",
    legal: "Légal",
    all_rights_reserved: "Tous droits réservés",

    // Other common translations
    welcome: "Bienvenue",
    description: "Description",
    category: "Catégorie",
    date: "Date",
    author: "Auteur",
    tags: "Tags",
    comments: "Commentaires",
    likes: "J'aime",
    views: "Vues",
    featured: "En vedette",
    popular: "Populaire",
    recent: "Récent",
    trending: "Tendance",
  },

  ur: {
    // Navigation
    home: "گھر",
    courses: "کورسز",
    research: "تحقیق",
    blog: "بلاگ",
    videos: "ویڈیوز",
    discussions: "بحث",
    community: "کمیونٹی",
    about: "کے بارے میں",
    contact: "رابطہ",
    volunteer: "رضاکار",
    donate: "عطیہ",
    login: "لاگ ان",
    signup: "سائن اپ",
    logout: "لاگ آؤٹ",
    dashboard: "ڈیش بورڈ",
    profile: "پروفائل",
    settings: "سیٹنگز",
    admin_dashboard: "ایڈمن ڈیش بورڈ",
    newsletter: "نیوز لیٹر",
    transparency: "شفافیت",
    privacy_policy: "رازداری کی پالیسی",
    terms_of_service: "خدمات کی شرائط",
    help_center: "مدد کا مرکز",
    contact_us: "ہم سے رابطہ کریں",
    get_started: "شروع کریں",
    toggle_navigation: "نیویگیشن ٹوگل کریں",

    // About Section - Sara's Story
    about_website: "ویب سائٹ کے بارے میں",
    welcome_to_oasis: "🌿 علم کے نخلستان میں خوش آمدید",
    founder_intro:
      "ہیلو، میرا نام سارہ سکوری ہے، اور میں علم کے نخلستان کی بانی ہوں۔ میں ہائی سکول کی آخری کلاس میں ہوں، اور یہ پلیٹ فارم وہ جگہ ہے جس کا میں نے ہمیشہ خواب دیکھا ہے۔",
    why_built_platform:
      "میں نے علم کا نخلستان اس لیے بنایا کہ میرا یقین ہے کہ سائنس اور علم کو زبان کی رکاوٹوں میں قید نہیں ہونا چاہیے۔ آج، 95% سے زیادہ تعلیمی اور سائنسی مواد انگریزی میں ہے — اور یہ دنیا بھر کے لاکھوں روشن دماغوں کو اس تک رسائی کے لیے جدوجہد کرنے پر مجبور کرتا ہے۔",
    exclusion_problem:
      "میں نے دیکھا ہے کہ کیسے طلباء، محققین، اور متجسس سیکھنے والے — خاص طور پر ترقی پذیر ممالک سے — صرف اس وجہ سے مواقع سے محروم رہ جاتے ہیں کہ وہ انگریزی روانی سے نہیں بولتے۔ میرا خیال ہے کہ یہ منصفانہ نہیں ہے۔",
    knowledge_belongs:
      "🌍 علم انسانیت کا ہے۔ یہ مفت، کھلا، اور سب کے لیے قابل رسائی ہونا چاہیے — آپ کی زبان، پس منظر، یا مقام سے قطع نظر۔ چاہے آپ عربی، فرانسیسی، انگریزی، یا کوئی اور زبان بولتے ہوں، یہ پلیٹ فارم آپ کے لیے ہے۔",
    platform_purpose:
      "اسی لیے میں نے علم کا نخلستان بنایا — ایک کثیر لسانی، تعاونی جگہ جہاں ہم مل کر شیئر کر سکتے ہیں، ترجمہ کر سکتے ہیں، اور بڑھ سکتے ہیں۔ یہاں، ہم صرف صارف نہیں ہیں — ہم تعمیر کنندہ ہیں۔ ہم میں سے ہر ایک اس سفر کا حصہ ہے۔ یہ سیکھنے، دریافت، اور رابطے کے لیے ہمارا اجتماعی نخلستان ہے۔",
    lets_build_together: "آئیے علم کو گھر لے آئیں۔\nآئیے اسے مل کر بنائیں۔ 💫",
    note_title: "نوٹ 🛠️",
    work_in_progress:
      "جب میں علم کا نخلستان بنا رہی ہوں، تو آپ محسوس کر سکتے ہیں کہ کچھ نمبرز، مواد، یا حصے عارضی ہیں یا ابھی مکمل طور پر حقیقی نہیں ہیں۔ یہ صرف اس لیے ہے کہ میں ابھی بھی اس پلیٹ فارم کو بنانے کے عمل میں ہوں — اور کبھی کبھی، جب آپ اکیلے کام کر رہے ہوتے ہیں، تو آپ کو چیزوں کو کام کرنے کے لیے placeholder شامل کرنے پڑتے ہیں۔",
    explore_and_grow:
      "براہ کرم آزادانہ طور پر تلاش کریں، خیالات شیئر کریں، اور میرے ساتھ بڑھیں۔ اس سائٹ کا ہر حصہ کام جاری ہے، بالکل سیکھنے کی طرح۔ 🌱",
    with_love: "— محبت کے ساتھ،\nسارہ سکوری",

    // Home Page
    oasis_of_knowledge: "علم کا نخلستان",
    platform_description:
      "تحقیق، سیکھنے، اور علم کے اشتراک کے لیے ایک کثیر لسانی پلیٹ فارم۔ سیکھنے والوں اور محققین کی ہماری عالمی کمیونٹی میں شامل ہوں۔",
    explore_courses: "کورسز دیکھیں",
    browse_research: "تحقیق براؤز کریں",
    research_papers: "تحقیقی مقالات",
    active_users: "فعال صارفین",
    certificates_issued: "جاری کردہ سرٹیفکیٹس",
    explore_categories: "اقسام دیکھیں",
    categories_description: "مختلف شعبوں اور مضامین میں علم دریافت کریں",
    platform_features: "پلیٹ فارم کی خصوصیات",
    structured_courses: "منظم کورسز",
    courses_description: "جامع کورسز کے ساتھ سیکھیں اور سرٹیفکیٹ حاصل کریں",
    research_description: "ہزاروں تعلیمی مقالات اور تحقیق تک رسائی حاصل کریں",
    community_description: "دنیا بھر کے محققین اور سیکھنے والوں سے جڑیں",
    gamification: "گیمیفیکیشن",
    gamification_description: "پوائنٹس، بیجز حاصل کریں اور کامیابیاں کھولیں",
    join_community: "ہماری عالمی کمیونٹی میں شامل ہوں",
    join_description: "آج ہی اپنا سیکھنے کا سفر شروع کریں اور دنیا بھر کے ہزاروں محققین اور سیکھنے والوں سے جڑیں۔",
    support_platform: "پلیٹ فارم کی حمایت کریں",

    // Categories
    stem: "STEM",
    medicine_biology: "طب اور حیاتیات",
    psychology: "نفسیات اور سماجیات",
    philosophy: "فلسفہ",
    politics: "سیاست اور عالمی معاملات",
    history: "تاریخ",

    // Common UI Elements
    loading: "لوڈ ہو رہا ہے...",
    search: "تلاش",
    filter: "فلٹر",
    sort: "ترتیب",
    submit: "جمع کریں",
    cancel: "منسوخ",
    save: "محفوظ کریں",
    edit: "ترمیم",
    delete: "حذف",
    view: "دیکھیں",
    share: "شیئر",
    download: "ڈاؤن لوڈ",
    upload: "اپ لوڈ",
    next: "اگلا",
    previous: "پچھلا",
    back: "واپس",
    continue: "جاری رکھیں",
    finish: "ختم",
    close: "بند",
    open: "کھولیں",

    // Help Center
    help_center_title: "مدد کا مرکز",
    help_center_subtitle:
      "علم کے نخلستان کے مدد کے مرکز میں خوش آمدید! ہم یہاں آپ کو ہمارے پلیٹ فارم سے زیادہ سے زیادہ فائدہ اٹھانے میں مدد کرنے کے لیے ہیں۔ ذیل میں آپ کو عام سوالات کے جوابات اور ہمارے کثیر لسانی تحقیقی مرکز میں نیویگیٹ کرنے میں مدد کے لیے گائیڈز ملیں گے۔",
    contact_support: "سپورٹ سے رابطہ",
    contact_support_desc: "ہماری سپورٹ ٹیم سے براہ راست مدد حاصل کریں",
    community_support: "کمیونٹی سپورٹ",
    community_support_desc: "ہماری کمیونٹی کے ممبران سے مدد حاصل کریں",
    join_community: "کمیونٹی میں شامل ہوں",
    privacy_security: "رازداری اور سیکیورٹی",
    privacy_security_desc: "ہماری رازداری اور سیکیورٹی پالیسیوں کے بارے میں جانیں",
    frequently_asked_questions: "اکثر پوچھے جانے والے سوالات",
    help_categories: "مدد کی اقسام",
    need_more_help: "مزید مدد چاہیے؟",
    need_more_help_desc:
      "اگر آپ کو جو چاہیے وہ نہیں مل رہا، تو براہ کرم ہم سے رابطہ کریں۔ ہم آپ کی مدد کرنے میں خوش ہیں!",
    connect_linkedin: "لنکڈ ان پر جڑیں",
    guide: "گائیڈ",

    // FAQ Questions and Answers
    faq_language_switch: "میں زبانوں کے درمیان کیسے تبدیل کروں؟",
    faq_language_switch_answer:
      "صفحے کے اوپری دائیں حصے میں زبان کے انتخاب کنندہ (گلوب آئیکن) کا استعمال کریں تاکہ ہماری معاون زبانوں میں سے کوئی بھی منتخب کر سکیں جن میں انگریزی، عربی، فرانسیسی، اردو، ہسپانوی، ہندی، اور جرمن شامل ہیں۔",
    faq_contribute_content: "کیا میں مواد یا ترجمے میں حصہ ڈال سکتا ہوں؟",
    faq_contribute_content_answer:
      "فی الوقت، شراکت صرف دعوت پر ہے۔ تاہم، ہم ایسی خصوصیات پر کام کر رہے ہیں جو کمیونٹی کے ممبران کو حصہ ڈالنے کی اجازت دیں گی۔ اپڈیٹس کے لیے منتظر رہیں!",
    faq_report_problem: "میں کسی مسئلے یا بگ کی اطلاع کیسے دوں؟",
    faq_report_problem_answer:
      "براہ کرم ہمارے رابطہ کے صفحے کا استعمال کریں تاکہ آپ جن مسائل کا سامنا کر رہے ہیں ان کی تفصیلات بھیج سکیں۔ مسئلے کو جلدی حل کرنے میں ہماری مدد کے لیے زیادہ سے زیادہ تفصیلات شامل کریں۔",
    faq_data_safety: "کیا میرا ڈیٹا محفوظ ہے؟",
    faq_data_safety_answer:
      "جی ہاں، ہم آپ کی رازداری اور ڈیٹا کی سیکیورٹی کو بہت سنجیدگی سے لیتے ہیں۔ تمام ڈیٹا انکرپٹ شدہ اور محفوظ طریقے سے اسٹور کیا جاتا ہے۔ مزید تفصیلات کے لیے، براہ کرم ہماری رازداری کی پالیسی دیکھیں۔",
    faq_free_platform: "کیا یہ پلیٹ فارم استعمال کرنے کے لیے مفت ہے؟",
    faq_free_platform_answer:
      "جی ہاں، علم کا نخلستان استعمال کرنے کے لیے مکمل طور پر مفت ہے۔ ہمارا یقین ہے کہ علم ہر ایک کے لیے قابل رسائی ہونا چاہیے، چاہے ان کی مالی صورتحال کچھ بھی ہو۔",
    faq_offline_access: "کیا میں آف لائن مواد تک رسائی حاصل کر سکتا ہوں؟",
    faq_offline_access_answer:
      "فی الوقت، ہمارے پلیٹ فارم کو انٹرنیٹ کنکشن کی ضرورت ہے۔ ہم مستقبل کی ریلیزز کے لیے آف لائن صلاحیات پر کام کر رہے ہیں۔",

    // Help Categories
    getting_started: "شروعات",
    getting_started_desc: "ہمارے پلیٹ فارم کے استعمال کی بنیادی باتیں سیکھیں",
    research_learning: "تحقیق اور سیکھنا",
    research_learning_desc: "تعلیمی مواد تلاش کریں اور اس تک رسائی حاصل کریں",
    community_help: "کمیونٹی",
    community_help_desc: "دوسروں کے ساتھ جڑیں اور تعاون کریں",
    technical_support: "تکنیکی سپورٹ",
    technical_support_desc: "تکنیکی مسائل حل کریں",

    // Help Articles
    how_to_create_account: "اکاؤنٹ کیسے بنائیں",
    how_to_create_account_content: "اپنا اکاؤنٹ بنانے کے لیے قدم بہ قدم گائیڈ",
    platform_navigation: "پلیٹ فارم نیویگیشن",
    platform_navigation_content: "مختلف حصوں میں کیسے نیویگیٹ کریں سیکھیں",
    language_switching: "زبان تبدیل کرنا",
    language_switching_content: "اپنی پسندیدہ زبان کیسے تبدیل کریں",
    searching_research: "تحقیق تلاش کرنا",
    searching_research_content: "متعلقہ تحقیقی مقالات تلاش کرنے کے لیے تجاویز",
    enrolling_courses: "کورسز میں داخلہ",
    enrolling_courses_content: "کورسز میں داخلہ لینے اور حصہ لینے کا طریقہ",
    tracking_progress: "اپنی پیش قدمی کا تعین",
    tracking_progress_content: "اپنے سیکھنے کے سفر کی نگرانی کریں",
    joining_discussions: "بحث میں شامل ہونا",
    joining_discussions_content: "کمیونٹی کی بحث میں کیسے حصہ لیں",
    contributing_content: "مواد میں حصہ ڈالنا",
    contributing_content_content: "مواد کی شراکت کے لیے رہنمائی",
    volunteer_opportunities: "رضاکارانہ مواقع",
    volunteer_opportunities_content: "مدد اور رضاکارانہ کام کے طریقے",
    troubleshooting: "مسائل حل کرنا",
    troubleshooting_content: "عام مسائل اور حل",
    browser_compatibility: "براؤزر مطابقت",
    browser_compatibility_content: "معاون براؤزرز اور ضروریات",
    mobile_access: "موبائل رسائی",
    mobile_access_content: "موبائل ڈیوائسز پر پلیٹ فارم کا استعمال",

    // Courses
    all_courses: "تمام کورسز",
    my_courses: "میرے کورسز",
    course_categories: "کورس کی اقسام",
    enroll_now: "ابھی داخلہ لیں",
    course_duration: "مدت",
    course_level: "سطح",
    course_instructor: "انسٹرکٹر",
    course_students: "طلباء",
    course_rating: "ریٹنگ",
    beginner: "ابتدائی",
    intermediate: "درمیانی",
    advanced: "اعلیٰ",

    // Blog
    latest_posts: "تازہ ترین پوسٹس",
    read_more: "مزید پڑھیں",
    published_on: "شائع ہوا",
    written_by: "لکھا گیا",
    blog_categories: "اقسام",
    featured_posts: "نمایاں پوسٹس",

    // Community
    community_guidelines: "کمیونٹی کے رہنمائی اصول",
    join_discussion: "بحث میں شامل ہوں",
    start_discussion: "بحث شروع کریں",
    community_members: "کمیونٹی کے ممبران",
    active_discussions: "فعال بحث",

    // Footer
    quick_links: "فوری لنکس",
    support: "سپورٹ",
    legal: "قانونی",
    all_rights_reserved: "تمام حقوق محفوظ ہیں",

    // Other common translations
    welcome: "خوش آمدید",
    description: "تفصیل",
    category: "قسم",
    date: "تاریخ",
    author: "مصنف",
    tags: "ٹیگز",
    comments: "تبصرے",
    likes: "پسند",
    views: "مناظر",
    featured: "نمایاں",
    popular: "مقبول",
    recent: "حالیہ",
    trending: "رجحان",
  },

  es: {
    // Navigation
    home: "Inicio",
    courses: "Cursos",
    research: "Investigación",
    blog: "Blog",
    videos: "Videos",
    discussions: "Discusiones",
    community: "Comunidad",
    about: "Acerca de",
    contact: "Contacto",
    volunteer: "Voluntario",
    donate: "Donar",
    login: "Iniciar Sesión",
    signup: "Registrarse",
    logout: "Cerrar Sesión",
    dashboard: "Panel",
    profile: "Perfil",
    settings: "Configuración",
    admin_dashboard: "Panel de Administración",
    newsletter: "Boletín",
    transparency: "Transparencia",
    privacy_policy: "Política de Privacidad",
    terms_of_service: "Términos de Servicio",
    help_center: "Centro de Ayuda",
    contact_us: "Contáctanos",
    get_started: "Comenzar",
    toggle_navigation: "Alternar navegación",

    // About Section - Sara's Story
    about_website: "Acerca del Sitio Web",
    welcome_to_oasis: "🌿 Bienvenido al Oasis del Conocimiento",
    founder_intro:
      "Hola, mi nombre es Sara Skouri, y soy la fundadora del Oasis del Conocimiento. Estoy en mi último año de secundaria, y esta plataforma es el espacio que siempre soñé crear.",
    why_built_platform:
      "Construí el Oasis del Conocimiento porque creo que la ciencia y el conocimiento no deberían estar atrapados detrás de barreras idiomáticas. Hoy, más del 95% del contenido académico y científico está en inglés — y eso deja a millones de mentes brillantes alrededor del mundo luchando por acceder a él.",
    exclusion_problem:
      "He visto cómo estudiantes, investigadores y aprendices curiosos — especialmente de países en desarrollo — son excluidos de oportunidades simplemente porque no hablan inglés con fluidez. Creo que eso no es justo.",
    knowledge_belongs:
      "🌍 El conocimiento pertenece a la humanidad. Debería ser gratuito, abierto y accesible para todos — sin importar tu idioma, origen o ubicación. Ya sea que hables árabe, francés, inglés u otro idioma, esta plataforma es para ti.",
    platform_purpose:
      "Por eso creé el Oasis del Conocimiento — un espacio multilingüe y colaborativo donde podemos compartir, traducir y crecer juntos. Aquí, no somos solo usuarios — somos constructores. Cada uno de nosotros es parte del viaje. Este es nuestro oasis colectivo para el aprendizaje, el descubrimiento y la conexión.",
    lets_build_together: "Llevemos el conocimiento a casa.\nConstruyamos esto — juntos. 💫",
    note_title: "Nota 🛠️",
    work_in_progress:
      "Mientras construyo el Oasis del Conocimiento, puedes notar que algunos números, contenido o secciones son temporales o aún no completamente reales. Eso es simplemente porque todavía estoy en el proceso de crear esta plataforma — y a veces, cuando trabajas solo, tienes que agregar marcadores de posición para hacer que las cosas funcionen.",
    explore_and_grow:
      "Por favor, siéntete libre de explorar, compartir ideas y crecer conmigo. Cada parte de este sitio es un trabajo en progreso, al igual que el aprendizaje mismo. 🌱",
    with_love: "— Con amor,\nSara Skouri",

    // Home Page
    oasis_of_knowledge: "Oasis del Conocimiento",
    platform_description:
      "Una plataforma multilingüe para investigación, aprendizaje e intercambio de conocimientos. Únete a nuestra comunidad global de estudiantes e investigadores.",
    explore_courses: "Explorar Cursos",
    browse_research: "Explorar Investigación",
    research_papers: "Artículos de Investigación",
    active_users: "Usuarios Activos",
    certificates_issued: "Certificados Emitidos",
    explore_categories: "Explorar Categorías",
    categories_description: "Descubre conocimiento en varios campos y disciplinas",
    platform_features: "Características de la Plataforma",
    structured_courses: "Cursos Estructurados",
    courses_description: "Aprende con cursos integrales y obtén certificados",
    research_description: "Accede a miles de artículos académicos e investigaciones",
    community_description: "Conéctate con investigadores y estudiantes de todo el mundo",
    gamification: "Gamificación",
    gamification_description: "Gana puntos, insignias y desbloquea logros",
    join_community: "Únete a Nuestra Comunidad Global",
    join_description:
      "Comienza tu viaje de aprendizaje hoy y conéctate con miles de investigadores y estudiantes de todo el mundo.",
    support_platform: "Apoyar la Plataforma",

    // Categories
    stem: "STEM",
    medicine_biology: "Medicina y Biología",
    psychology: "Psicología y Sociología",
    philosophy: "Filosofía",
    politics: "Política y Asuntos Globales",
    history: "Historia",

    // Common UI Elements
    loading: "Cargando...",
    search: "Buscar",
    filter: "Filtrar",
    sort: "Ordenar",
    submit: "Enviar",
    cancel: "Cancelar",
    save: "Guardar",
    edit: "Editar",
    delete: "Eliminar",
    view: "Ver",
    share: "Compartir",
    download: "Descargar",
    upload: "Subir",
    next: "Siguiente",
    previous: "Anterior",
    back: "Atrás",
    continue: "Continuar",
    finish: "Finalizar",
    close: "Cerrar",
    open: "Abrir",

    // Help Center
    help_center_title: "Centro de Ayuda",
    help_center_subtitle:
      "¡Bienvenido al Centro de Ayuda del Oasis del Conocimiento! Estamos aquí para ayudarte a aprovechar al máximo nuestra plataforma. A continuación encontrarás respuestas a preguntas comunes y guías para ayudarte a navegar por nuestro centro de investigación multilingüe.",
    contact_support: "Contactar Soporte",
    contact_support_desc: "Obtén ayuda directa de nuestro equipo de soporte",
    community_support: "Soporte Comunitario",
    community_support_desc: "Obtén ayuda de los miembros de nuestra comunidad",
    join_community: "Unirse a la Comunidad",
    privacy_security: "Privacidad y Seguridad",
    privacy_security_desc: "Aprende sobre nuestras políticas de privacidad y seguridad",
    frequently_asked_questions: "Preguntas Frecuentes",
    help_categories: "Categorías de Ayuda",
    need_more_help: "¿Necesitas más ayuda?",
    need_more_help_desc: "Si no puedes encontrar lo que buscas, por favor contáctanos. ¡Estamos felices de ayudar!",
    connect_linkedin: "Conectar en LinkedIn",
    guide: "Guía",

    // FAQ Questions and Answers
    faq_language_switch: "¿Cómo cambio entre idiomas?",
    faq_language_switch_answer:
      "Usa el selector de idioma (ícono del globo) en la parte superior derecha de la página para elegir entre cualquiera de nuestros idiomas compatibles incluyendo inglés, árabe, francés, urdu, español, hindi y alemán.",
    faq_contribute_content: "¿Puedo contribuir contenido o traducciones?",
    faq_contribute_content_answer:
      "Actualmente, las contribuciones son solo por invitación. Sin embargo, estamos trabajando en características que permitirán a los miembros de la comunidad contribuir. ¡Mantente atento a las actualizaciones!",
    faq_report_problem: "¿Cómo reporto un problema o error?",
    faq_report_problem_answer:
      "Por favor usa nuestra página de Contacto para enviarnos detalles sobre cualquier problema que experimentes. Incluye tantos detalles como sea posible para ayudarnos a resolver el problema rápidamente.",
    faq_data_safety: "¿Están seguros mis datos?",
    faq_data_safety_answer:
      "Sí, tomamos tu privacidad y la seguridad de tus datos muy en serio. Todos los datos están encriptados y almacenados de forma segura. Para más detalles, por favor consulta nuestra Política de Privacidad.",
    faq_free_platform: "¿Es gratuita la plataforma?",
    faq_free_platform_answer:
      "Sí, el Oasis del Conocimiento es completamente gratuito de usar. Creemos que el conocimiento debe ser accesible para todos sin importar su situación financiera.",
    faq_offline_access: "¿Puedo acceder al contenido sin conexión?",
    faq_offline_access_answer:
      "Actualmente, nuestra plataforma requiere una conexión a internet. Estamos trabajando en capacidades sin conexión para futuras versiones.",

    // Help Categories
    getting_started: "Comenzando",
    getting_started_desc: "Aprende los conceptos básicos de usar nuestra plataforma",
    research_learning: "Investigación y Aprendizaje",
    research_learning_desc: "Encuentra y accede a contenido educativo",
    community_help: "Comunidad",
    community_help_desc: "Conecta y colabora con otros",
    technical_support: "Soporte Técnico",
    technical_support_desc: "Resuelve problemas técnicos",

    // Help Articles
    how_to_create_account: "Cómo Crear una Cuenta",
    how_to_create_account_content: "Guía paso a paso para crear tu cuenta",
    platform_navigation: "Navegación de la Plataforma",
    platform_navigation_content: "Aprende cómo navegar por las diferentes secciones",
    language_switching: "Cambio de Idioma",
    language_switching_content: "Cómo cambiar tu idioma preferido",
    searching_research: "Buscando Investigación",
    searching_research_content: "Consejos para encontrar artículos de investigación relevantes",
    enrolling_courses: "Inscribirse en Cursos",
    enrolling_courses_content: "Cómo inscribirse y participar en cursos",
    tracking_progress: "Seguir tu Progreso",
    tracking_progress_content: "Monitorea tu viaje de aprendizaje",
    joining_discussions: "Unirse a Discusiones",
    joining_discussions_content: "Cómo participar en discusiones comunitarias",
    contributing_content: "Contribuir Contenido",
    contributing_content_content: "Pautas para la contribución de contenido",
    volunteer_opportunities: "Oportunidades de Voluntariado",
    volunteer_opportunities_content: "Formas de ayudar y ser voluntario",
    troubleshooting: "Solución de Problemas",
    troubleshooting_content: "Problemas comunes y soluciones",
    browser_compatibility: "Compatibilidad del Navegador",
    browser_compatibility_content: "Navegadores compatibles y requisitos",
    mobile_access: "Acceso Móvil",
    mobile_access_content: "Usar la plataforma en dispositivos móviles",

    // Courses
    all_courses: "Todos los Cursos",
    my_courses: "Mis Cursos",
    course_categories: "Categorías de Cursos",
    enroll_now: "Inscribirse Ahora",
    course_duration: "Duración",
    course_level: "Nivel",
    course_instructor: "Instructor",
    course_students: "Estudiantes",
    course_rating: "Calificación",
    beginner: "Principiante",
    intermediate: "Intermedio",
    advanced: "Avanzado",

    // Blog
    latest_posts: "Últimas Publicaciones",
    read_more: "Leer Más",
    published_on: "Publicado el",
    written_by: "Escrito por",
    blog_categories: "Categorías",
    featured_posts: "Publicaciones Destacadas",

    // Community
    community_guidelines: "Pautas de la Comunidad",
    join_discussion: "Unirse a la Discusión",
    start_discussion: "Iniciar Discusión",
    community_members: "Miembros de la Comunidad",
    active_discussions: "Discusiones Activas",

    // Footer
    quick_links: "Enlaces Rápidos",
    support: "Soporte",
    legal: "Legal",
    all_rights_reserved: "Todos los derechos reservados",

    // Other common translations
    welcome: "Bienvenido",
    description: "Descripción",
    category: "Categoría",
    date: "Fecha",
    author: "Autor",
    tags: "Etiquetas",
    comments: "Comentarios",
    likes: "Me gusta",
    views: "Vistas",
    featured: "Destacado",
    popular: "Popular",
    recent: "Reciente",
    trending: "Tendencia",
  },

  hi: {
    // Navigation
    home: "होम",
    courses: "कोर्स",
    research: "अनुसंधान",
    blog: "ब्लॉग",
    videos: "वीडियो",
    discussions: "चर्चा",
    community: "समुदाय",
    about: "के बारे में",
    contact: "संपर्क",
    volunteer: "स्वयंसेवक",
    donate: "दान करें",
    login: "लॉगिन",
    signup: "साइन अप",
    logout: "लॉगआउट",
    dashboard: "डैशबोर्ड",
    profile: "प्रोफाइल",
    settings: "सेटिंग्स",
    admin_dashboard: "एडमिन डैशबोर्ड",
    newsletter: "न्यूज़लेटर",
    transparency: "पारदर्शिता",
    privacy_policy: "गोपनीयता नीति",
    terms_of_service: "सेवा की शर्तें",
    help_center: "सहायता केंद्र",
    contact_us: "हमसे संपर्क करें",
    get_started: "शुरू करें",
    toggle_navigation: "नेवीगेशन टॉगल करें",

    // About Section - Sara's Story
    about_website: "वेबसाइट के बारे में",
    welcome_to_oasis: "🌿 ज्ञान के नखलिस्तान में आपका स्वागत है",
    founder_intro:
      "नमस्ते, मेरा नाम सारा स्कूरी है, और मैं ज्ञान के नखलिस्तान की संस्थापक हूं। मैं हाई स्कूल की अंतिम कक्षा में हूं, और यह प्लेटफॉर्म वह स्थान है जिसे बनाने का मैंने हमेशा सपना देखा है।",
    why_built_platform:
      "मैंने ज्ञान का नखलिस्तान इसलिए बनाया क्योंकि मेरा मानना है कि विज्ञान और ज्ञान को भाषा की बाधाओं में फंसा नहीं होना चाहिए। आज, 95% से अधिक शैक्षणिक और वैज्ञानिक सामग्री अंग्रेजी में है — और यह दुनिया भर के लाखों प्रतिभाशाली दिमागों को इसे एक्सेस करने के लिए संघर्ष करने पर मजबूर करता है।",
    exclusion_problem:
      "मैंने देखा है कि कैसे छात्र, शोधकर्ता, और जिज्ञासु शिक्षार्थी — विशेष रूप से विकासशील देशों से — केवल इसलिए अवसरों से वंचित रह जाते हैं क्योंकि वे अंग्रेजी धाराप्रवाह नहीं बोलते। मेरा मानना है कि यह उचित नहीं है।",
    knowledge_belongs:
      "🌍 ज्ञान मानवता का है। यह मुफ्त, खुला, और सभी के लिए सुलभ होना चाहिए — आपकी भाषा, पृष्ठभूमि, या स्थान की परवाह किए बिना। चाहे आप अरबी, फ्रेंच, अंग्रेजी, या कोई अन्य भाषा बोलते हों, यह प्लेटफॉर्म आपके लिए है।",
    platform_purpose:
      "इसीलिए मैंने ज्ञान का नखलिस्तान बनाया — एक बहुभाषी, सहयोगी स्थान जहां हम साझा कर सकते हैं, अनुवाद कर सकते हैं, और एक साथ बढ़ सकते हैं। यहां, हम केवल उपयोगकर्ता नहीं हैं — हम निर्माता हैं। हम में से हर एक इस यात्रा का हिस्सा है। यह सीखने, खोज, और संपर्क के लिए हमारा सामूहिक नखलिस्तान है।",
    lets_build_together: "आइए ज्ञान को घर ले आएं।\nआइए इसे एक साथ बनाएं। 💫",
    note_title: "नोट 🛠️",
    work_in_progress:
      "जब मैं ज्ञान का नखलिस्तान बना रही हूं, तो आप देख सकते हैं कि कुछ संख्याएं, सामग्री, या अनुभाग अस्थायी हैं या अभी तक पूरी तरह से वास्तविक नहीं हैं। यह केवल इसलिए है क्योंकि मैं अभी भी इस प्लेटफॉर्म को बनाने की प्रक्रिया में हूं — और कभी-कभी, जब आप अकेले काम कर रहे होते हैं, तो आपको चीजों को काम करने के लिए प्लेसहोल्डर जोड़ने पड़ते हैं।",
    explore_and_grow:
      "कृपया स्वतंत्र रूप से अन्वेषण करें, विचार साझा करें, और मेरे साथ बढ़ें। इस साइट का हर हिस्सा एक काम प्रगति पर है, बिल्कुल सीखने की तरह। 🌱",
    with_love: "— प्रेम के साथ,\nसारा स्कूरी",

    // Home Page
    oasis_of_knowledge: "ज्ञान का नखलिस्तान",
    platform_description:
      "अनुसंधान, सीखने, और ज्ञान साझाकरण के लिए एक बहुभाषी प्लेटफॉर्म। शिक्षार्थियों और शोधकर्ताओं के हमारे वैश्विक समुदाय में शामिल हों।",
    explore_courses: "कोर्स एक्सप्लोर करें",
    browse_research: "अनुसंधान ब्राउज़ करें",
    research_papers: "अनुसंधान पत्र",
    active_users: "सक्रिय उपयोगकर्ता",
    certificates_issued: "जारी किए गए प्रमाणपत्र",
    explore_categories: "श्रेणियां एक्सप्लोर करें",
    categories_description: "विभिन्न क्षेत्रों और विषयों में ज्ञान की खोज करें",
    platform_features: "प्लेटफॉर्म की विशेषताएं",
    structured_courses: "संरचित कोर्स",
    courses_description: "व्यापक कोर्स के साथ सीखें और प्रमाणपत्र अर्जित करें",
    research_description: "हजारों शैक्षणिक पत्रों और अनुसंधान तक पहुंच प्राप्त करें",
    community_description: "दुनिया भर के शोधकर्ताओं और शिक्षार्थियों से जुड़ें",
    gamification: "गेमिफिकेशन",
    gamification_description: "अंक, बैज अर्जित करें और उपलब्धियां अनलॉक करें",
    join_community: "हमारे वैश्विक समुदाय में शामिल हों",
    join_description: "आज ही अपनी सीखने की यात्रा शुरू करें और दुनिया भर के हजारों शोधकर्ताओं और शिक्षार्थियों से जुड़ें।",
    support_platform: "प्लेटफॉर्म का समर्थन करें",

    // Categories
    stem: "STEM",
    medicine_biology: "चिकित्सा और जीव विज्ञान",
    psychology: "मनोविज्ञान और समाजशास्त्र",
    philosophy: "दर्शन",
    politics: "राजनीति और वैश्विक मामले",
    history: "इतिहास",

    // Common UI Elements
    loading: "लोड हो रहा है...",
    search: "खोजें",
    filter: "फिल्टर",
    sort: "क्रमबद्ध करें",
    submit: "जमा करें",
    cancel: "रद्द करें",
    save: "सेव करें",
    edit: "संपादित करें",
    delete: "हटाएं",
    view: "देखें",
    share: "साझा करें",
    download: "डाउनलोड",
    upload: "अपलोड",
    next: "अगला",
    previous: "पिछला",
    back: "वापस",
    continue: "जारी रखें",
    finish: "समाप्त",
    close: "बंद करें",
    open: "खोलें",

    // Help Center
    help_center_title: "सहायता केंद्र",
    help_center_subtitle:
      "ज्ञान के नखलिस्तान सहायता केंद्र में आपका स्वागत है! हम यहाँ आपको हमारे प्लेटफॉर्म का अधिकतम लाभ उठाने में मदद करने के लिए हैं। नीचे आपको सामान्य प्रश्नों के उत्तर और हमारे बहुभाषी अनुसंधान केंद्र में नेविगेट करने में मदद के लिए गाइड मिलेंगे।",
    contact_support: "सपोर्ट से संपर्क करें",
    contact_support_desc: "हमारी सपोर्ट टीम से सीधी मदद प्राप्त करें",
    community_support: "समुदायिक सहायता",
    community_support_desc: "हमारे समुदाय के सदस्यों से मदद प्राप्त करें",
    join_community: "समुदाय में शामिल हों",
    privacy_security: "गोपनीयता और सुरक्षा",
    privacy_security_desc: "हमारी गोपनीयता और सुरक्षा नीतियों के बारे में जानें",
    frequently_asked_questions: "अक्सर पूछे जाने वाले प्रश्न",
    help_categories: "सहायता श्रेणियां",
    need_more_help: "और मदद चाहिए?",
    need_more_help_desc: "यदि आपको जो चाहिए वह नहीं मिल रहा, तो कृपया हमसे संपर्क करें। हम आपकी मदद करने में खुश हैं!",
    connect_linkedin: "लिंक्डइन पर जुड़ें",
    guide: "गाइड",

    // FAQ Questions and Answers
    faq_language_switch: "मैं भाषाओं के बीच कैसे स्विच करूं?",
    faq_language_switch_answer:
      "पेज के ऊपरी दाएं हिस्से में भाषा चयनकर्ता (ग्लोब आइकन) का उपयोग करें ताकि हमारी समर्थित भाषाओं में से कोई भी चुन सकें जिनमें अंग्रेजी, अरबी, फ्रेंच, उर्दू, स्पेनिश, हिंदी और जर्मन शामिल हैं।",
    faq_contribute_content: "क्या मैं सामग्री या अनुवाद में योगदान दे सकता हूं?",
    faq_contribute_content_answer:
      "वर्तमान में, योगदान केवल निमंत्रण द्वारा हैं। हालांकि, हम ऐसी सुविधाओं पर काम कर रहे हैं जो समुदाय के सदस्यों को योगदान देने की अनुमति देंगी। अपडेट के लिए बने रहें!",
    faq_report_problem: "मैं किसी समस्या या बग की रिपोर्ट कैसे करूं?",
    faq_report_problem_answer:
      "कृपया हमारे संपर्क पेज का उपयोग करें ताकि आप जिन समस्याओं का सामना कर रहे हैं उनकी विस्तृत जानकारी भेज सकें। समस्या को जल्दी हल करने में हमारी मदद के लिए जितनी अधिक जानकारी संभव हो शामिल करें।",
    faq_data_safety: "क्या मेरा डेटा सुरक्षित है?",
    faq_data_safety_answer:
      "हां, हम आपकी गोपनीयता और डेटा सुरक्षा को बहुत गंभीरता से लेते हैं। सभी डेटा एन्क्रिप्टेड और सुरक्षित रूप से संग्रहीत है। अधिक विवरण के लिए, कृपया हमारी गोपनीयता नीति देखें।",
    faq_free_platform: "क्या यह प्लेटफॉर्म उपयोग के लिए मुफ्त है?",
    faq_free_platform_answer:
      "हां, ज्ञान का नखलिस्तान उपयोग के लिए पूरी तरह से मुफ्त है। हमारा मानना है कि ज्ञान सभी के लिए सुलभ होना चाहिए, चाहे उनकी वित्तीय स्थिति कुछ भी हो।",
    faq_offline_access: "क्या मैं ऑफलाइन सामग्री तक पहुंच सकता हूं?",
    faq_offline_access_answer:
      "वर्तमान में, हमारे प्लेटफॉर्म को इंटरनेट कनेक्शन की आवश्यकता है। हम भविष्य की रिलीज़ के लिए ऑफलाइन क्षमताओं पर काम कर रहे हैं।",

    // Help Categories
    getting_started: "शुरुआत",
    getting_started_desc: "हमारे प्लेटफॉर्म का उपयोग करने की मूल बातें सीखें",
    research_learning: "अनुसंधान और सीखना",
    research_learning_desc: "शैक्षिक सामग्री खोजें और उस तक पहुंचें",
    community_help: "समुदाय",
    community_help_desc: "दूसरों के साथ जुड़ें और सहयोग करें",
    technical_support: "तकनीकी सहायता",
    technical_support_desc: "तकनीकी समस्याओं का समाधान करें",

    // Help Articles
    how_to_create_account: "खाता कैसे बनाएं",
    how_to_create_account_content: "अपना खाता बनाने के लिए चरणबद्ध गाइड",
    platform_navigation: "प्लेटफॉर्म नेवीगेशन",
    platform_navigation_content: "विभिन्न अनुभागों में कैसे नेविगेट करें सीखें",
    language_switching: "भाषा स्विचिंग",
    language_switching_content: "अपनी पसंदीदा भाषा कैसे बदलें",
    searching_research: "अनुसंधान खोजना",
    searching_research_content: "प्रासंगिक अनुसंधान पत्र खोजने के लिए सुझाव",
    enrolling_courses: "कोर्स में नामांकन",
    enrolling_courses_content: "कोर्स में नामांकन और भाग लेने का तरीका",
    tracking_progress: "अपनी प्रगति ट्रैक करना",
    tracking_progress_content: "अपनी सीखने की यात्रा की निगरानी करें",
    joining_discussions: "चर्चा में शामिल होना",
    joining_discussions_content: "समुदायिक चर्चा में कैसे भाग लें",
    contributing_content: "सामग्री में योगदान",
    contributing_content_content: "सामग्री योगदान के लिए दिशानिर्देश",
    volunteer_opportunities: "स्वयंसेवी अवसर",
    volunteer_opportunities_content: "मदद और स्वयंसेवा के तरीके",
    troubleshooting: "समस्या निवारण",
    troubleshooting_content: "सामान्य समस्याएं और समाधान",
    browser_compatibility: "ब्राउज़र संगतता",
    browser_compatibility_content: "समर्थित ब्राउज़र और आवश्यकताएं",
    mobile_access: "मोबाइल पहुंच",
    mobile_access_content: "मोबाइल डिवाइस पर प्लेटफॉर्म का उपयोग",

    // Courses
    all_courses: "सभी कोर्स",
    my_courses: "मेरे कोर्स",
    course_categories: "कोर्स श्रेणियां",
    enroll_now: "अभी नामांकन करें",
    course_duration: "अवधि",
    course_level: "स्तर",
    course_instructor: "प्रशिक्षक",
    course_students: "छात्र",
    course_rating: "रेटिंग",
    beginner: "शुरुआती",
    intermediate: "मध्यम",
    advanced: "उन्नत",

    // Blog
    latest_posts: "नवीनतम पोस्ट",
    read_more: "और पढ़ें",
    published_on: "प्रकाशित",
    written_by: "द्वारा लिखित",
    blog_categories: "श्रेणियां",
    featured_posts: "फीचर्ड पोस्ट",

    // Community
    community_guidelines: "समुदायिक दिशानिर्देश",
    join_discussion: "चर्चा में शामिल हों",
    start_discussion: "चर्चा शुरू करें",
    community_members: "समुदाय के सदस्य",
    active_discussions: "सक्रिय चर्चाएं",

    // Footer
    quick_links: "त्वरित लिंक",
    support: "सहायता",
    legal: "कानूनी",
    all_rights_reserved: "सभी अधिकार सुरक्षित",

    // Other common translations
    welcome: "स्वागत है",
    description: "विवरण",
    category: "श्रेणी",
    date: "दिनांक",
    author: "लेखक",
    tags: "टैग",
    comments: "टिप्पणियां",
    likes: "पसंद",
    views: "दृश्य",
    featured: "फीचर्ड",
    popular: "लोकप्रिय",
    recent: "हाल का",
    trending: "ट्रेंडिंग",
  },

  de: {
    // Navigation
    home: "Startseite",
    courses: "Kurse",
    research: "Forschung",
    blog: "Blog",
    videos: "Videos",
    discussions: "Diskussionen",
    community: "Gemeinschaft",
    about: "Über uns",
    contact: "Kontakt",
    volunteer: "Freiwilliger",
    donate: "Spenden",
    login: "Anmelden",
    signup: "Registrieren",
    logout: "Abmelden",
    dashboard: "Dashboard",
    profile: "Profil",
    settings: "Einstellungen",
    admin_dashboard: "Admin-Dashboard",
    newsletter: "Newsletter",
    transparency: "Transparenz",
    privacy_policy: "Datenschutzrichtlinie",
    terms_of_service: "Nutzungsbedingungen",
    help_center: "Hilfezentrum",
    contact_us: "Kontaktieren Sie uns",
    get_started: "Loslegen",
    toggle_navigation: "Navigation umschalten",

    // About Section - Sara's Story
    about_website: "Über die Website",
    welcome_to_oasis: "🌿 Willkommen in der Oase des Wissens",
    founder_intro:
      "Hallo, mein Name ist Sara Skouri, und ich bin die Gründerin der Oase des Wissens. Ich bin im letzten Jahr der Oberstufe, und diese Plattform ist der Raum, den ich schon immer schaffen wollte.",
    why_built_platform:
      "Ich habe die Oase des Wissens gebaut, weil ich glaube, dass Wissenschaft und Wissen nicht hinter Sprachbarrieren gefangen sein sollten. Heute sind über 95% der akademischen und wissenschaftlichen Inhalte auf Englisch — und das lässt Millionen brillanter Köpfe auf der ganzen Welt darum kämpfen, darauf zuzugreifen.",
    exclusion_problem:
      "Ich habe gesehen, wie Studenten, Forscher und neugierige Lernende — besonders aus Entwicklungsländern — von Möglichkeiten ausgeschlossen werden, einfach weil sie nicht fließend Englisch sprechen. Ich glaube, das ist nicht fair.",
    knowledge_belongs:
      "🌍 Wissen gehört der Menschheit. Es sollte kostenlos, offen und für alle zugänglich sein — egal welche Sprache, Herkunft oder Standort Sie haben. Ob Sie Arabisch, Französisch, Englisch oder eine andere Sprache sprechen, diese Plattform ist für Sie.",
    platform_purpose:
      "Deshalb habe ich die Oase des Wissens geschaffen — einen mehrsprachigen, kollaborativen Raum, wo wir teilen, übersetzen und gemeinsam wachsen können. Hier sind wir nicht nur Nutzer — wir sind Erbauer. Jeder von uns ist Teil der Reise. Das ist unsere kollektive Oase für Lernen, Entdeckung und Verbindung.",
    lets_build_together: "Lasst uns das Wissen nach Hause bringen.\nLasst uns das gemeinsam aufbauen. 💫",
    note_title: "Hinweis 🛠️",
    work_in_progress:
      "Während ich die Oase des Wissens aufbaue, könnten Sie bemerken, dass einige Zahlen, Inhalte oder Abschnitte vorläufig oder noch nicht vollständig real sind. Das liegt einfach daran, dass ich noch dabei bin, diese Plattform zu erstellen — und manchmal, wenn man alleine arbeitet, muss man Platzhalter hinzufügen, damit die Dinge funktionieren.",
    explore_and_grow:
      "Bitte erkunden Sie frei, teilen Sie Ideen und wachsen Sie mit mir. Jeder Teil dieser Website ist ein work in progress, genau wie das Lernen selbst. 🌱",
    with_love: "— Mit Liebe,\nSara Skouri",

    // Home Page
    oasis_of_knowledge: "Oase des Wissens",
    platform_description:
      "Eine mehrsprachige Plattform für Forschung, Lernen und Wissensaustausch. Treten Sie unserer globalen Gemeinschaft von Lernenden und Forschern bei.",
    explore_courses: "Kurse Erkunden",
    browse_research: "Forschung Durchsuchen",
    research_papers: "Forschungsarbeiten",
    active_users: "Aktive Nutzer",
    certificates_issued: "Ausgestellte Zertifikate",
    explore_categories: "Kategorien Erkunden",
    categories_description: "Entdecken Sie Wissen in verschiedenen Bereichen und Disziplinen",
    platform_features: "Plattform-Features",
    structured_courses: "Strukturierte Kurse",
    courses_description: "Lernen Sie mit umfassenden Kursen und erhalten Sie Zertifikate",
    research_description: "Zugang zu Tausenden von akademischen Arbeiten und Forschung",
    community_description: "Verbinden Sie sich mit Forschern und Lernenden weltweit",
    gamification: "Gamification",
    gamification_description: "Verdienen Sie Punkte, Abzeichen und schalten Sie Erfolge frei",
    join_community: "Treten Sie Unserer Globalen Gemeinschaft Bei",
    join_description:
      "Beginnen Sie heute Ihre Lernreise und verbinden Sie sich mit Tausenden von Forschern und Lernenden weltweit.",
    support_platform: "Plattform Unterstützen",

    // Categories
    stem: "STEM",
    medicine_biology: "Medizin und Biologie",
    psychology: "Psychologie und Soziologie",
    philosophy: "Philosophie",
    politics: "Politik und Weltgeschehen",
    history: "Geschichte",

    // Common UI Elements
    loading: "Lädt...",
    search: "Suchen",
    filter: "Filtern",
    sort: "Sortieren",
    submit: "Senden",
    cancel: "Abbrechen",
    save: "Speichern",
    edit: "Bearbeiten",
    delete: "Löschen",
    view: "Ansehen",
    share: "Teilen",
    download: "Herunterladen",
    upload: "Hochladen",
    next: "Weiter",
    previous: "Zurück",
    back: "Zurück",
    continue: "Fortfahren",
    finish: "Beenden",
    close: "Schließen",
    open: "Öffnen",

    // Help Center
    help_center_title: "Hilfezentrum",
    help_center_subtitle:
      "Willkommen im Hilfezentrum der Oase des Wissens! Wir sind hier, um Ihnen zu helfen, das Beste aus unserer Plattform herauszuholen. Unten finden Sie Antworten auf häufige Fragen und Anleitungen, die Ihnen beim Navigieren durch unser mehrsprachiges Forschungszentrum helfen.",
    contact_support: "Support kontaktieren",
    contact_support_desc: "Erhalten Sie direkte Hilfe von unserem Support-Team",
    community_support: "Community-Support",
    community_support_desc: "Erhalten Sie Hilfe von unseren Community-Mitgliedern",
    join_community: "Der Gemeinschaft beitreten",
    privacy_security: "Datenschutz und Sicherheit",
    privacy_security_desc: "Erfahren Sie mehr über unsere Datenschutz- und Sicherheitsrichtlinien",
    frequently_asked_questions: "Häufig gestellte Fragen",
    help_categories: "Hilfe-Kategorien",
    need_more_help: "Benötigen Sie weitere Hilfe?",
    need_more_help_desc: "Wenn Sie nicht finden, wonach Sie suchen, kontaktieren Sie uns bitte. Wir helfen gerne!",
    connect_linkedin: "Auf LinkedIn verbinden",
    guide: "Anleitung",

    // FAQ Questions and Answers
    faq_language_switch: "Wie wechsle ich zwischen Sprachen?",
    faq_language_switch_answer:
      "Verwenden Sie den Sprachauswähler (Globus-Symbol) oben rechts auf der Seite, um aus unseren unterstützten Sprachen zu wählen, einschließlich Englisch, Arabisch, Französisch, Urdu, Spanisch, Hindi und Deutsch.",
    faq_contribute_content: "Kann ich Inhalte oder Übersetzungen beitragen?",
    faq_contribute_content_answer:
      "Derzeit sind Beiträge nur auf Einladung möglich. Wir arbeiten jedoch an Funktionen, die es Community-Mitgliedern ermöglichen, beizutragen. Bleiben Sie dran für Updates!",
    faq_report_problem: "Wie melde ich ein Problem oder einen Fehler?",
    faq_report_problem_answer:
      "Bitte verwenden Sie unsere Kontaktseite, um uns Details über alle Probleme zu senden, die Sie erleben. Fügen Sie so viele Details wie möglich hinzu, um uns zu helfen, das Problem schnell zu lösen.",
    faq_data_safety: "Sind meine Daten sicher?",
    faq_data_safety_answer:
      "Ja, wir nehmen Ihre Privatsphäre und Datensicherheit sehr ernst. Alle Daten sind verschlüsselt und sicher gespeichert. Für weitere Details siehe bitte unsere Datenschutzrichtlinie.",
    faq_free_platform: "Ist die Plattform kostenlos zu nutzen?",
    faq_free_platform_answer:
      "Ja, die Oase des Wissens ist völlig kostenlos zu nutzen. Wir glauben, dass Wissen für alle zugänglich sein sollte, unabhängig von ihrer finanziellen Situation.",
    faq_offline_access: "Kann ich offline auf Inhalte zugreifen?",
    faq_offline_access_answer:
      "Derzeit benötigt unsere Plattform eine Internetverbindung. Wir arbeiten an Offline-Funktionen für zukünftige Versionen.",

    // Help Categories
    getting_started: "Erste Schritte",
    getting_started_desc: "Lernen Sie die Grundlagen der Nutzung unserer Plattform",
    research_learning: "Forschung und Lernen",
    research_learning_desc: "Finden und greifen Sie auf Bildungsinhalte zu",
    community_help: "Gemeinschaft",
    community_help_desc: "Verbinden und arbeiten Sie mit anderen zusammen",
    technical_support: "Technischer Support",
    technical_support_desc: "Lösen Sie technische Probleme",

    // Help Articles
    how_to_create_account: "Wie man ein Konto erstellt",
    how_to_create_account_content: "Schritt-für-Schritt-Anleitung zur Erstellung Ihres Kontos",
    platform_navigation: "Plattform-Navigation",
    platform_navigation_content: "Lernen Sie, wie Sie durch verschiedene Bereiche navigieren",
    language_switching: "Sprachwechsel",
    language_switching_content: "Wie Sie Ihre bevorzugte Sprache ändern",
    searching_research: "Forschung suchen",
    searching_research_content: "Tipps zum Finden relevanter Forschungsartikel",
    enrolling_courses: "In Kurse einschreiben",
    enrolling_courses_content: "Wie man sich in Kurse einschreibt und teilnimmt",
    tracking_progress: "Fortschritt verfolgen",
    tracking_progress_content: "Überwachen Sie Ihre Lernreise",
    joining_discussions: "An Diskussionen teilnehmen",
    joining_discussions_content: "Wie man an Community-Diskussionen teilnimmt",
    contributing_content: "Inhalte beitragen",
    contributing_content_content: "Richtlinien für Inhaltsbeiträge",
    volunteer_opportunities: "Freiwilligenmöglichkeiten",
    volunteer_opportunities_content: "Wege zu helfen und sich freiwillig zu engagieren",
    troubleshooting: "Fehlerbehebung",
    troubleshooting_content: "Häufige Probleme und Lösungen",
    browser_compatibility: "Browser-Kompatibilität",
    browser_compatibility_content: "Unterstützte Browser und Anforderungen",
    mobile_access: "Mobiler Zugang",
    mobile_access_content: "Nutzung der Plattform auf mobilen Geräten",

    // Courses
    all_courses: "Alle Kurse",
    my_courses: "Meine Kurse",
    course_categories: "Kurs-Kategorien",
    enroll_now: "Jetzt einschreiben",
    course_duration: "Dauer",
    course_level: "Level",
    course_instructor: "Dozent",
    course_students: "Studenten",
    course_rating: "Bewertung",
    beginner: "Anfänger",
    intermediate: "Fortgeschritten",
    advanced: "Experte",

    // Blog
    latest_posts: "Neueste Beiträge",
    read_more: "Mehr lesen",
    published_on: "Veröffentlicht am",
    written_by: "Geschrieben von",
    blog_categories: "Kategorien",
    featured_posts: "Hervorgehobene Beiträge",

    // Community
    community_guidelines: "Community-Richtlinien",
    join_discussion: "An Diskussion teilnehmen",
    start_discussion: "Diskussion starten",
    community_members: "Community-Mitglieder",
    active_discussions: "Aktive Diskussionen",

    // Footer
    quick_links: "Schnelle Links",
    support: "Support",
    legal: "Rechtliches",
    all_rights_reserved: "Alle Rechte vorbehalten",

    // Other common translations
    welcome: "Willkommen",
    description: "Beschreibung",
    category: "Kategorie",
    date: "Datum",
    author: "Autor",
    tags: "Tags",
    comments: "Kommentare",
    likes: "Gefällt mir",
    views: "Aufrufe",
    featured: "Hervorgehoben",
    popular: "Beliebt",
    recent: "Aktuell",
    trending: "Trending",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferred-language") as Language
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang)
    localStorage.setItem("preferred-language", lang)
  }

  const t = (key: string): string => {
    return translations[currentLanguage]?.[key] || translations.en[key] || key
  }

  return <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
