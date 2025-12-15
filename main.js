// Import required modules
const { createApp, defineComponent } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

// Import components
import NavBar from './NavBar.js';
import HomePage from './HomePage.js';
import AboutPage from './AboutPage.js';


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
      primary: '#1976d2',
      secondary: '#26A69A',
      accent: '#9C27B0',
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

// Update document title on route change
router.beforeEach((to, from, next) => {
  document.title = to.meta?.title ? `${to.meta.title} | Mon App Quasar` : 'Mon App Quasar';
  next();
});

// Mount the app
app.mount('#q-app');