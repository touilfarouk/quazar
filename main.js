// Import required modules
const { createApp, defineComponent } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

// Import utilities
import { setupLazyLoading, debounce, seo } from './utils.js';

// Import components
import NavBar from './NavBar.js';
import HomePage from './HomePage.js';
import AboutPage from './AboutPage.js';
import ProductsPage from './ProductsPage.js';
import OrderPage from './OrderPage.js';

// Import i18n
import i18n from './i18n.js';

// Define routes
const routes = [
  { 
    path: '/', 
    component: HomePage,
    name: 'home',
    meta: { title: 'Accueil' }
  },
  { 
    path: '/about', 
    component: AboutPage,
    name: 'about',
    meta: { title: 'À propos' }
  },
  { 
    path: '/products', 
    component: ProductsPage,
    name: 'products',
    meta: { title: 'Produits' }
  },
  { 
    path: '/order', 
    component: OrderPage,
    name: 'order',
    meta: { title: 'Commander' }
  },
  { 
    path: '/:pathMatch(.*)*', 
    redirect: '/' 
  }
];

// Create and configure router
const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// Create the Vue application
const app = createApp({
  template: `
    <q-layout view="hHh lpR fFf">
      <nav-bar />
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  `
});

// Register components globally
app.component('nav-bar', NavBar);

// Configure Quasar
app.use(Quasar, {
  config: {
    brand: {
      primary: '#2E7D32', // green 700
      secondary: '#26A69A',
      accent: '#66BB6A', // soft green accent
      dark: '#1d1d1d',
      positive: '#21BA45',
      negative: '#C10015',
      info: '#31CCEC',
      warning: '#F2C037'
    }
  }
});

// Use router
app.use(router);

// Use i18n
app.use(i18n);

// Update document title and SEO on route change
router.beforeEach((to, from, next) => {
  const title = to.meta?.title || 'Home';
  document.title = `${title} | crochetyou.can.do`;
  
  // Update SEO meta tags
  const descriptions = {
    home: 'Handmade crocheted hats and accessories for Glen Forest PTO fundraiser. Available December to January.',
    products: 'Browse our collection of handmade crocheted hats and accessories. Cozy, warm, and stylish products for a good cause.',
    order: 'Place your order for handmade crocheted products. Support Glen Forest PTO while staying cozy this winter.',
    about: 'Learn about Glen Forest PTO and our mission to support our school community through fundraising initiatives.'
  };
  
  seo.setMetaDescription(descriptions[to.name] || descriptions.home);
  seo.setCanonicalUrl(window.location.origin + (to.path === '/' ? '' : to.path));
  
  next();
});

// Mount the app and initialize performance optimizations
const appInstance = app.mount('#q-app');

// Initialize lazy loading after app is mounted
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    setupLazyLoading();
  });
} else {
  setTimeout(setupLazyLoading, 100);
}

// Performance monitoring
if (process.env.NODE_ENV === 'development') {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'measure') {
        console.log(`${entry.name}: ${entry.duration.toFixed(2)}ms`);
      }
    }
  });
  observer.observe({ entryTypes: ['measure'] });
}

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}