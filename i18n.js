const { createI18n } = VueI18n;

const messages = {
  en: {
    app: {
      title: 'crochetyou.can.do',
      home: 'Home',
      products: 'Products',
      order: 'Order',
      about: 'About'
    },
    navbar: {
      language: 'Language',
      github: 'GitHub',
      twitter: 'Twitter',
      linkedin: 'LinkedIn',
      menu: 'Menu'
    },
    home: {
      heroTitle: 'Premium Leather Shoes',
      heroSubtitle: 'Crafted with excellence, designed for comfort',
      buyNow: 'Buy Now',
      ourCollection: 'Our Collection'
    },
    products: {
      title: 'Our Products',
      see: 'View',
      order: 'Order',
      addToCart: 'Add to Cart',
      bestSeller: 'Best Seller',
      new: 'New',
      limited: 'Limited Edition',
      popular: 'Popular',
      trending: 'Trending',
      premium: 'Premium',
      summer: 'Summer',
      versatile: 'Versatile'
    },
    order: {
      title: 'Place Order',
      parentName: 'Parent Name',
      contact: 'Email or Phone',
      studentName: 'Student\'s Name',
      grade: 'Grade',
      color: 'Color Preference',
      close: 'Close',
      sendOrder: 'Send Order'
    },
    about: {
      title: 'About Us',
      description: 'Premium leather shoes crafted with excellence.'
    }
  },
  fr: {
    app: {
      title: 'crochetyou.can.do',
      home: 'Accueil',
      products: 'Produits',
      order: 'Commander',
      about: 'À propos'
    },
    navbar: {
      language: 'Langue',
      github: 'GitHub',
      twitter: 'Twitter',
      linkedin: 'LinkedIn',
      menu: 'Menu'
    },
    home: {
      heroTitle: 'Chaussures Premium en Cuir',
      heroSubtitle: 'Fabriquées avec excellence, conçues pour le confort',
      buyNow: 'Acheter maintenant',
      ourCollection: 'Notre Collection'
    },
    products: {
      title: 'Nos Produits',
      see: 'Voir',
      order: 'Commander',
      addToCart: 'Ajouter au panier',
      bestSeller: 'Meilleure vente',
      new: 'Nouveau',
      limited: 'Édition limitée',
      popular: 'Populaire',
      trending: 'Tendance',
      premium: 'Premium',
      summer: 'Été',
      versatile: 'Versatile'
    },
    order: {
      title: 'Commande',
      parentName: 'Nom du parent',
      contact: 'Email ou téléphone',
      studentName: 'Nom de l\'étudiant',
      grade: 'Niveau',
      color: 'Préférence de couleur',
      close: 'Fermer',
      sendOrder: 'Envoyer la commande'
    },
    about: {
      title: 'À propos',
      description: 'Chaussures en cuir premium fabriquées avec excellence.'
    }
  },
  ar: {
    app: {
      title: 'تطبيقي كوزار',
      home: 'الرئيسية',
      about: 'حول'
    },
    navbar: {
      language: 'اللغة',
      github: 'جيتهاب',
      twitter: 'تويتر',
      linkedin: 'لينكدإن'
    },
    home: {
      heading: 'مرحبًا بكم في تطبيقي كوزار',
      subheading: 'اكتشفوا مكونات التقويم لدينا',
      datePickerTitle: 'منتقي التاريخ',
      datePickerLabel: 'اختر تاريخًا',
      timePickerTitle: 'منتقي الوقت',
      timePickerLabel: 'اختر وقتًا',
      dateTimePickerTitle: 'منتقي التاريخ والوقت',
      dateTimePickerLabel: 'التاريخ والوقت',
      selectedDate: 'التاريخ المحدد:',
      noDate: 'لم يتم اختيار تاريخ',
      close: 'إغلاق',
      now: 'الآن'
    }
  }
};

const supportedLocales = Object.keys(messages);

const applyLocaleDirection = (locale) => {
  document.documentElement.lang = locale;
  document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
};

const applyQuasarLocale = (locale) => {
  if (!window.Quasar || !window.Quasar.lang) {
    return;
  }

  if (locale === 'fr' && window.Quasar.lang.fr) {
    window.Quasar.lang.set(window.Quasar.lang.fr);
    return;
  }

  if (locale === 'ar' && window.Quasar.lang.ar) {
    window.Quasar.lang.set(window.Quasar.lang.ar);
    return;
  }

  if (window.Quasar.lang.enUS) {
    window.Quasar.lang.set(window.Quasar.lang.enUS);
  }
};

const resolveStartingLocale = () => {
  const stored = localStorage.getItem('user-locale');
  if (stored && supportedLocales.includes(stored)) {
    return stored;
  }

  const navigatorLocale = (navigator.language || navigator.userLanguage || '').split('-')[0];
  if (supportedLocales.includes(navigatorLocale)) {
    return navigatorLocale;
  }

  return 'fr';
};

const initialLocale = resolveStartingLocale();

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: initialLocale,
  fallbackLocale: 'en',
  messages
});

applyLocaleDirection(initialLocale);
applyQuasarLocale(initialLocale);

const setLocale = (locale) => {
  if (!supportedLocales.includes(locale)) {
    return;
  }

  i18n.global.locale.value = locale;
  localStorage.setItem('user-locale', locale);
  applyLocaleDirection(locale);
  applyQuasarLocale(locale);
};

export { setLocale, supportedLocales, messages };
export default i18n;
