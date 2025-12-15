// Create Vue application
const { createApp } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

// Define page components
const HomePage = {
  template: `
    <q-page padding>
      <div class="q-pa-md">
        <h4 class="text-h4 q-mb-md">Bienvenue sur notre site</h4>
        <p class="text-body1">Contenu de la page d'accueil. Vous pouvez ajouter plus de contenu ici.</p>
        <div class="q-mt-lg">
          <q-btn 
            color="primary" 
            label="En savoir plus" 
            icon-right="arrow_forward"
            @click="$router.push('/about')"
          />
        </div>
      </div>
    </q-page>
  `
};

const AboutPage = {
  template: `
    <q-page padding>
      <div class="q-pa-md">
        <h4 class="text-h4 q-mb-md">À propos de nous</h4>
        <p class="text-body1">Découvrez notre entreprise et notre équipe.</p>
        <div class="row q-col-gutter-md q-mt-md">
          <div class="col-12 col-md-6">
            <q-card class="q-mb-md">
              <q-card-section>
                <div class="text-h6">Notre Mission</div>
                <div class="text-subtitle2 q-mb-sm">Fournir les meilleurs services</div>
                <p>Nous nous engageons à offrir des solutions de qualité à nos clients.</p>
              </q-card-section>
              <q-separator />
              <q-card-actions>
                <q-btn flat color="primary" label="Contactez-nous" icon="email" />
              </q-card-actions>
            </q-card>
          </div>
          <div class="col-12 col-md-6">
            <q-card>
              <q-card-section>
                <div class="text-h6">Notre Vision</div>
                <p>Devenir le leader de notre secteur en innovant constamment.</p>
              </q-card-section>
              <q-separator />
              <q-card-actions>
                <q-btn flat color="primary" label="En savoir plus" icon="info" />
              </q-card-actions>
            </q-card>
          </div>
        </div>
        <div class="q-mt-lg">
          <q-btn 
            color="primary" 
            label="Retour à l'accueil" 
            icon="home"
            outline
            @click="$router.push('/')"
          />
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
  // Redirect any unknown paths to home
  { 
    path: '/:pathMatch(.*)*', 
    redirect: '/' 
  }
];


// Create and mount the application
const app = createApp({
  data() {
    return {
      currentTab: 'home',
      mobileMenuOpen: false,
      windowWidth: window.innerWidth
    };
  },
  watch: {
    '$route'(to) {
      this.currentTab = to.name || 'home';
      this.closeMobileMenu();
    }
  },
  created() {
    this.currentTab = this.$route.name || 'home';
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false;
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth > 599) { // xs breakpoint (600px and up)
        this.closeMobileMenu();
      }
    }
  }
});

// Use Quasar
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
  },
  lang: Quasar.lang.fr
});

// Create and configure router
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

// Update document title on route change
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} | Mon App Quasar` : 'Mon App Quasar';
  next();
});

// Use router
app.use(router);

// Mount the app
app.mount('#q-app');

// Enable devtools in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  app.config.devtools = true;
  app.config.performance = true;
  console.log('Vue devtools enabled');
}

console.log('Application Quasar chargée avec succès!');