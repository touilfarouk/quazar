const { createI18n } = VueI18n;

const messages = {
  en: {
    app: {
      title: 'My Quasar App',
      home: 'Home',
      about: 'About'
    },
    navbar: {
      language: 'Language',
      github: 'GitHub',
      twitter: 'Twitter',
      linkedin: 'LinkedIn'
    },
    home: {
      heading: 'Welcome to My Quasar App',
      subheading: 'Discover our calendar components',
      datePickerTitle: 'Date picker',
      datePickerLabel: 'Choose a date',
      timePickerTitle: 'Time picker',
      timePickerLabel: 'Choose a time',
      dateTimePickerTitle: 'Date and time picker',
      dateTimePickerLabel: 'Date and time',
      selectedDate: 'Selected date:',
      noDate: 'No date selected',
      close: 'Close',
      now: 'Now'
    }
  },
  fr: {
    app: {
      title: 'Mon App Quasar',
      home: 'Accueil',
      about: 'À propos'
    },
    navbar: {
      language: 'Langue',
      github: 'GitHub',
      twitter: 'Twitter',
      linkedin: 'LinkedIn'
    },
    home: {
      heading: 'Bienvenue sur Mon App Quasar',
      subheading: 'Découvrez nos composants de calendrier',
      datePickerTitle: 'Sélecteur de date',
      datePickerLabel: 'Choisir une date',
      timePickerTitle: 'Sélecteur d\'heure',
      timePickerLabel: 'Choisir une heure',
      dateTimePickerTitle: 'Sélecteur de date et heure',
      dateTimePickerLabel: 'Date et heure',
      selectedDate: 'Date sélectionnée :',
      noDate: 'Aucune date sélectionnée',
      close: 'Fermer',
      now: 'Maintenant'
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
