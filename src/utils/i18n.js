// i18n.js – All translations for Arabic and English

const translations = {
  // ─── NAVBAR ───────────────────────────────────────────────
  navbar: {
    links: {
      ar: ["خدماتنا", "أعمالنا", "لماذا نحن", "تواصل"],
      en: ["Services", "Portfolio", "Why Us", "Contact"],
    },
    cta: { ar: "اطلب الآن", en: "Order Now" },
  },

  // ─── HERO ─────────────────────────────────────────────────
  hero: {
    h1_1: { ar: "We make it", en: "We make it" },
    h1_2: { ar: "better", en: "better" },
    desc: {
      ar: "من الهوية البصرية إلى الطباعة الاحترافية — نجمع بين الإبداع والتقنية لنقدم منتجاً يستحق الفخر.",
      en: "From brand identity to professional printing — we combine creativity and technology to deliver products you'll be proud of.",
    },
    ctaPrimary: { ar: "اطلب الآن", en: "Order Now" },
    ctaSecondary: { ar: "شاهد أعمالنا", en: "View Our Work" },
    // Hero visual card
    cardLabel: { ar: "بطاقة أعمال", en: "Business Card" },
    cardName: { ar: "محمد الأحمد", en: "Mohammad Ahmad" },
    cardRole: { ar: "مدير تسويق", en: "Marketing Manager" },
    badge: { ar: "✦ جودة مضمونة", en: "✦ Guaranteed Quality" },
  },

  // ─── MARQUEE ──────────────────────────────────────────────
  marquee: {
    items: {
      ar: ["طباعة رقمية", "تصميم جرافيك", "هوية بصرية", "لافتات", "بطاقات أعمال", "طباعة ملابس", "بوسترات", "شعارات"],
      en: ["Digital Printing", "Graphic Design", "Brand Identity", "Signage", "Business Cards", "Apparel Printing", "Posters", "Logos"],
    },
  },

  // ─── SERVICES ─────────────────────────────────────────────
  services: {
    tag: { ar: "خدماتنا", en: "Our Services" },
    title: { ar: "كل ما تحتاجه في مكان واحد", en: "Everything You Need in One Place" },
    sub: {
      ar: "من التصميم إلى التسليم — نغطي كل احتياجاتك التجارية والشخصية.",
      en: "From design to delivery — we cover all your business and personal needs.",
    },
    cta: { ar: "اطلب الآن", en: "Order Now" },
    items: [
      {
        name: { ar: "تصميم جرافيك", en: "Graphic Design" },
        desc: {
          ar: "هوية بصرية، شعارات، وتصاميم إبداعية تعكس علامتك التجارية بشكل احترافي.",
          en: "Brand identity, logos, and creative designs that professionally reflect your brand.",
        },
        tag: { ar: "الأكثر طلباً", en: "Most Popular" },
      },
      {
        name: { ar: "طباعة رقمية", en: "Digital Printing" },
        desc: {
          ar: "طباعة عالية الجودة على مختلف الأحجام والخامات بأسرع وقت ممكن.",
          en: "High-quality printing on various sizes and materials in the fastest time possible.",
        },
        tag: { ar: "سريع", en: "Fast" },
      },
      {
        name: { ar: "لافتات وإعلانات", en: "Signage & Ads" },
        desc: {
          ar: "لافتات خارجية وداخلية، بانرات وإعلانات ضخمة بألوان زاهية ومقاومة.",
          en: "Indoor and outdoor signage, banners, and large-scale ads with vibrant, durable colors.",
        },
        tag: { ar: "خارجي", en: "Outdoor" },
      },
      {
        name: { ar: "طباعة ملابس", en: "Apparel Printing" },
        desc: {
          ar: "طباعة على تيشيرتات، هوديز، وجاكيتات بتقنيات متعددة ونتائج مبهرة.",
          en: "Printing on t-shirts, hoodies, and jackets using multiple techniques with stunning results.",
        },
        tag: { ar: "مخصص", en: "Custom" },
      },
    ],
  },

  // ─── PORTFOLIO ────────────────────────────────────────────
  portfolio: {
    tag: { ar: "أعمالنا", en: "Our Work" },
    title: { ar: "معرض المشاريع المنجزة", en: "Completed Projects Gallery" },
    sub: {
      ar: "نفخر بتقديم أعمال تعكس مستوى الاحترافية والإبداع الذي نؤمن به.",
      en: "We take pride in delivering work that reflects the professionalism and creativity we believe in.",
    },
    viewDetails: { ar: "عرض التفاصيل", en: "View Details" },
    viewMore: { ar: "عرض المزيد", en: "View More" },
    viewLess: { ar: "عرض أقل", en: "View Less" },
    filterAll: { ar: "الكل", en: "All" },
    cats: {
      ar: ["الكل", "تصميم", "طباعة", "لافتات", "ملابس"],
      en: ["All", "Design", "Printing", "Signage", "Apparel"],
    },
    // Cat mapping for filtering (Arabic cat keys)
    catMap: { "تصميم": "Design", "طباعة": "Printing", "لافتات": "Signage", "ملابس": "Apparel" },
    items: [
      { title: { ar: "هوية بصرية متكاملة", en: "Complete Brand Identity" }, cat: { ar: "تصميم", en: "Design" } },
      { title: { ar: "بانر إعلاني 3×1 متر", en: "3×1m Advertising Banner" }, cat: { ar: "طباعة", en: "Printing" } },
      { title: { ar: "بطاقات أعمال فاخرة", en: "Premium Business Cards" }, cat: { ar: "طباعة", en: "Printing" } },
      { title: { ar: "لافتة محل تجاري", en: "Store Signage" }, cat: { ar: "لافتات", en: "Signage" } },
      { title: { ar: "مطبوعات مؤسسية", en: "Corporate Prints" }, cat: { ar: "تصميم", en: "Design" } },
      { title: { ar: "طباعة تيشيرتات", en: "T-Shirt Printing" }, cat: { ar: "ملابس", en: "Apparel" } },
    ],
  },

  // ─── PORTFOLIO MOCKS (inner text) ─────────────────────────
  portfolioMocks: {
    specialOffer: { ar: "عرض خاص", en: "Special Offer" },
    discount: { ar: "خصم 30% على الطباعة", en: "30% Off Printing" },
    contactNow: { ar: "تواصل الآن", en: "Contact Now" },
    name: { ar: "محمد الأحمد", en: "Mohammad Ahmad" },
    role: { ar: "مدير تسويق", en: "Marketing Manager" },
    storeHours: { ar: "مفتوح 9ص – 9م", en: "Open 9AM – 9PM" },
    digitalPrint: { ar: "طباعة رقمية", en: "Digital Print" },
  },

  // ─── WHY US ───────────────────────────────────────────────
  why: {
    tag: { ar: "لماذا نحن", en: "Why Us" },
    title: { ar: "نفرق بالجودة والسرعة", en: "We Stand Out in Quality & Speed" },
    sub: {
      ar: "نجمع بين الإبداع والتقنية والخدمة الممتازة لنقدم لك تجربة لا مثيل لها.",
      en: "We combine creativity, technology, and excellent service to give you an unmatched experience.",
    },
    items: [
      { title: { ar: "جودة مضمونة", en: "Guaranteed Quality" }, body: { ar: "أحدث تقنيات الطباعة وأجود الخامات لنتائج تفوق التوقعات في كل مشروع.", en: "Latest printing technology and finest materials for results that exceed expectations on every project." } },
      { title: { ar: "تسليم سريع", en: "Fast Delivery" }, body: { ar: "نلتزم بالمواعيد ونقدم خدمة تسليم خلال 24 ساعة عند الطلب.", en: "We meet deadlines and offer 24-hour delivery service on request." } },
      { title: { ar: "أسعار منافسة", en: "Competitive Prices" }, body: { ar: "أفضل الأسعار في السوق مع الحفاظ على أعلى معايير الجودة دائماً.", en: "Best market prices while maintaining the highest quality standards." } },
      { title: { ar: "تصميم مخصص", en: "Custom Design" }, body: { ar: "فريقنا الإبداعي يعمل معك لتحقيق رؤيتك بشكل يعكس هويتك تماماً.", en: "Our creative team works with you to realize your vision in a way that perfectly reflects your identity." } },
      { title: { ar: "دعم متواصل", en: "Ongoing Support" }, body: { ar: "نحن هنا قبل وأثناء وبعد تنفيذ مشروعك — خدمة عملاء احترافية.", en: "We're here before, during, and after your project — professional customer service." } },
      { title: { ar: "خامات صديقة", en: "Eco-Friendly Materials" }, body: { ar: "أحبار وخامات صديقة للبيئة لأننا نؤمن بمسؤوليتنا تجاه مجتمعنا.", en: "Eco-friendly inks and materials because we believe in our responsibility to our community." } },
    ],
  },

  // ─── PROCESS ──────────────────────────────────────────────
  process: {
    tag: { ar: "كيف نعمل", en: "How We Work" },
    title: { ar: "أربع خطوات بسيطة", en: "Four Simple Steps" },
    sub: {
      ar: "من الفكرة إلى المنتج النهائي بكل سلاسة.",
      en: "From idea to final product, seamlessly.",
    },
    steps: [
      { n: { ar: "١", en: "1" }, label: { ar: "تواصل معنا", en: "Contact Us" }, desc: { ar: "شاركنا فكرتك عبر واتساب أو النموذج", en: "Share your idea via WhatsApp or the form" } },
      { n: { ar: "٢", en: "2" }, label: { ar: "التصميم", en: "Design" }, desc: { ar: "فريقنا يعد التصميم المناسب لك", en: "Our team prepares the perfect design for you" } },
      { n: { ar: "٣", en: "3" }, label: { ar: "الموافقة", en: "Approval" }, desc: { ar: "تراجع وتوافق قبل الطباعة", en: "Review and approve before printing" } },
      { n: { ar: "٤", en: "4" }, label: { ar: "التسليم", en: "Delivery" }, desc: { ar: "نطبع ونسلم بأعلى جودة", en: "We print and deliver with top quality" } },
    ],
  },

  // ─── CONTACT ──────────────────────────────────────────────
  contact: {
    tag: { ar: "تواصل معنا", en: "Contact Us" },
    title: { ar: "هل لديك مشروع؟", en: "Have a Project?" },
    sub: {
      ar: "تواصل معنا وسنسعد بمساعدتك في تحقيق رؤيتك.",
      en: "Get in touch and we'll be happy to help you realize your vision.",
    },
    infoLabels: {
      location: { ar: "الموقع", en: "Location" },
      phone: { ar: "الهاتف", en: "Phone" },
      email: { ar: "البريد", en: "Email" },
      hours: { ar: "ساعات العمل", en: "Working Hours" },
    },
    infoValues: {
      location: { ar: "عقابا، فلسطين", en: "Aqaba, Palestine" },
      hours: { ar: "السبت – الخميس، 9ص – 9م", en: "Saturday – Thursday, 9AM – 9PM" },
    },
    form: {
      nameLabel: { ar: "الاسم الكامل", en: "Full Name" },
      namePlaceholder: { ar: "أدخل اسمك", en: "Enter your name" },
      contactInfoLabel: { ar: "البريد أو الهاتف", en: "Email or Phone" },
      contactInfoPlaceholder: { ar: "أدخل بريدك أو رقم هاتفك", en: "Enter your email or phone" },
      msgLabel: { ar: "رسالتك", en: "Your Message" },
      msgPlaceholder: { ar: "اشرح لنا ما تحتاجه...", en: "Tell us what you need..." },
      submit: { ar: "إرسال الرسالة", en: "Send Message" },
      whatsapp: { ar: "واتساب", en: "WhatsApp" },
      success: {
        ar: "✓ تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.",
        en: "✓ Your message was sent successfully! We'll contact you soon.",
      },
      error: {
        ar: "حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.",
        en: "An error occurred while sending. Please try again.",
      },
      sending: {
        ar: "جاري الإرسال...",
        en: "Sending...",
      },
      required: {
        ar: "يرجى تعبئة جميع الحقول المطلوبة",
        en: "Please fill in all required fields",
      },
    },
  },

  // ─── FOOTER ───────────────────────────────────────────────
  footer: {
    contactUs: { ar: "تواصل معنا", en: "Contact Us" },
    quickLinks: { ar: "روابط سريعة", en: "Quick Links" },
    logoDesc: {
      ar: "مطبعة وتصميم جرافيك احترافية في عقابا، فلسطين. نحول أفكارك إلى واقع مطبوع.",
      en: "Professional printing & graphic design studio in Aqaba, Palestine. We turn your ideas into printed reality.",
    },
    location: { ar: "عقابا، فلسطين", en: "Aqaba, Palestine" },
    copyright: {
      ar: "© 2026 ALORA Graphic. جميع الحقوق محفوظة.",
      en: "© 2026 ALORA Graphic. All rights reserved.",
    },
    links: {
      ar: [
        { label: "خدماتنا", id: "services" },
        { label: "أعمالنا", id: "portfolio" },
        { label: "لماذا نحن", id: "why" },
        { label: "تواصل", id: "contact" },
        { label: "اطلب خدمة", id: "request" },
      ],
      en: [
        { label: "Services", id: "services" },
        { label: "Portfolio", id: "portfolio" },
        { label: "Why Us", id: "why" },
        { label: "Contact", id: "contact" },
        { label: "Request Service", id: "request" },
      ],
    },
    langToggle: { ar: "English", en: "العربية" },
  },

  // ─── REQUEST PAGE ─────────────────────────────────────────
  request: {
    badge: { ar: "طلب خدمة جديدة", en: "New Service Request" },
    title: { ar: "أخبرنا بما تحتاجه", en: "Tell Us What You Need" },
    sub: {
      ar: "سيتواصل معك فريقنا خلال ساعات قليلة بعرض سعر مفصّل.",
      en: "Our team will contact you within a few hours with a detailed quote.",
    },
    serviceType: { ar: "اختر نوع الخدمة", en: "Choose Service Type" },
    services: {
      ar: ["تصميم جرافيك", "طباعة رقمية", "لافتات", "طباعة ملابس", "بطاقات أعمال", "هوية بصرية"],
      en: ["Graphic Design", "Digital Printing", "Signage", "Apparel Printing", "Business Cards", "Brand Identity"],
    },
    nameLabel: { ar: "الاسم الكامل", en: "Full Name" },
    namePlaceholder: { ar: "أدخل اسمك", en: "Enter your name" },
    contactInfoLabel: { ar: "البريد أو الهاتف", en: "Email or Phone" },
    contactInfoPlaceholder: { ar: "أدخل بريدك أو رقم هاتفك", en: "Enter your email or phone" },
    qtyLabel: { ar: "الكمية", en: "Quantity" },
    qtyPlaceholder: { ar: "اختر الكمية", en: "Select quantity" },
    qtyOptions: {
      ar: ["50 قطعة", "100 قطعة", "250 قطعة", "500 قطعة", "كمية مخصصة"],
      en: ["50 pieces", "100 pieces", "250 pieces", "500 pieces", "Custom quantity"],
    },
    budgetLabel: { ar: "الميزانية", en: "Budget" },
    budgetPlaceholder: { ar: "اختر النطاق", en: "Select range" },
    budgetOptions: {
      ar: ["أقل من 100₪", "100 – 300₪", "300 – 600₪", "600 – 1000₪", "أكثر من 1000₪"],
      en: ["Under 100₪", "100 – 300₪", "300 – 600₪", "600 – 1000₪", "Over 1000₪"],
    },
    detailsLabel: { ar: "تفاصيل الطلب", en: "Order Details" },
    detailsPlaceholder: { ar: "اشرح لنا ما تحتاجه بالتفصيل...", en: "Describe what you need in detail..." },
    submit: { ar: "إرسال الطلب", en: "Submit Request" },
    whatsapp: { ar: "واتساب", en: "WhatsApp" },
    success: {
      ar: "✓ تم إرسال طلبك بنجاح! سنتواصل معك قريباً لمناقشة التفاصيل.",
      en: "✓ Your request was sent successfully! We'll contact you soon.",
    },
    error: {
      ar: "حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.",
      en: "An error occurred while sending. Please try again.",
    },
    sending: {
      ar: "جاري الإرسال...",
      en: "Sending...",
    },
    required: {
      ar: "يرجى تعبئة جميع الحقول المطلوبة (الاسم، البريد/الهاتف، التفاصيل)",
      en: "Please fill in all required fields (name, contact info, details)",
    },
    infoNote: {
      ar: "يتم مراجعة الطلبات خلال ساعات العمل (9ص – 9م). سنرسل لك تأكيداً وسعراً تفصيلياً عبر واتساب أو الهاتف.",
      en: "Requests are reviewed during working hours (9AM – 9PM). We'll send you a confirmation and detailed quote via WhatsApp or phone.",
    },
  },
};

/**
 * Get a translation value.
 * @param {string} path – dot-separated path, e.g. "navbar.cta"
 * @param {string} lang – "ar" or "en"
 */
export function t(path, lang) {
  const keys = path.split(".");
  let val = translations;
  for (const k of keys) {
    val = val?.[k];
    if (val === undefined) return path; // fallback: show key
  }
  return resolve(val, lang);
}

/** Recursively resolve {ar, en} objects throughout a value */
function resolve(val, lang) {
  if (val === null || val === undefined) return val;
  // If it's a simple {ar, en} leaf
  if (typeof val === "object" && !Array.isArray(val) && (val.ar !== undefined || val.en !== undefined)) {
    // Check if ar/en values are simple (string/array) — it's a leaf
    const v = val[lang] ?? val.ar;
    if (typeof v === "string" || Array.isArray(v)) return v;
    // Otherwise it might be a deeper structure, still resolve
    return v;
  }
  // If it's an array, resolve each element
  if (Array.isArray(val)) {
    return val.map(item => resolve(item, lang));
  }
  // If it's an object (but not a leaf), resolve all values
  if (typeof val === "object") {
    const out = {};
    for (const k of Object.keys(val)) {
      out[k] = resolve(val[k], lang);
    }
    return out;
  }
  return val;
}

/**
 * Get a raw translation object (for arrays, nested items, etc.)
 */
export function tRaw(path) {
  const keys = path.split(".");
  let val = translations;
  for (const k of keys) {
    val = val?.[k];
    if (val === undefined) return undefined;
  }
  return val;
}

export default translations;
