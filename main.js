// Import required modules
const { createApp, defineComponent } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

// Import components
import NavBar from './NavBar.js';

// Define page components
const HomePage = {
  template: `
    <q-page padding>
      <div class="q-pa-md">
        <div class="text-center q-mb-xl">
          <h1 class="text-h3 text-weight-bold text-primary q-mb-md">Bienvenue sur Mon App Quasar</h1>
          <p class="text-h6 text-grey-8">Découvrez notre plateforme innovante</p>
        </div>
        <div class="row q-col-gutter-lg">
          <div class="col-12 col-md-4" v-for="n in 3" :key="n">
            <q-card class="my-card">
              <q-card-section>
                <div class="text-h6">Fonctionnalité {{ n }}</div>
                <q-separator class="q-my-sm" />
                <div class="text-body1">
                  Description de la fonctionnalité {{ n }} avec des détails intéressants.
                </div>
              </q-card-section>
              <q-card-actions>
                <q-btn flat color="primary" label="En savoir plus" />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </q-page>
  `
};

const AboutPage = {
  template: `
    <q-page padding>
      <div class="q-pa-md">
        <div class="text-center q-mb-xl">
          <h1 class="text-h3 text-weight-bold text-primary q-mb-md">À propos de nous</h1>
          <p class="text-h6 text-grey-8">Découvrez notre équipe et notre mission</p>
        </div>
        <div class="text-center">
          <p class="text-body1 q-mb-lg">
            Nous sommes une équipe passionnée qui construit des applications incroyables avec Quasar Framework.
          </p>
          <q-btn color="primary" label="Retour à l'accueil" to="/" />
        </div>
      </div>
    </q-page>
  `
};

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