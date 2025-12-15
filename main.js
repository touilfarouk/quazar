// Import required modules
const { createApp } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

// Import NavBar component
const NavBar = {
  template: `
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleMobileMenu"
          class="q-mr-sm"
        />
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Mon App Quasar
        </q-toolbar-title>

        <div class="gt-sm">
          <q-tabs v-model="currentTab" inline-label>
            <q-route-tab
              name="home"
              icon="home"
              label="Accueil"
              to="/"
              exact
            />
            <q-route-tab
              name="about"
              icon="info"
              label="À propos"
              to="/about"
            />
          </q-tabs>
        </div>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="white" icon="fab fa-github" />
          <q-btn round dense flat color="white" icon="fab fa-twitter" />
          <q-btn round dense flat color="white" icon="fab fa-linkedin" />
        </div>
      </q-toolbar>

      <!-- Mobile Menu -->
      <q-drawer
        v-model="mobileMenuOpen"
        :width="200"
        :breakpoint="600"
        bordered
        overlay
        side="left"
        @hide="closeMobileMenu"
      >
        <q-scroll-area class="fit">
          <q-list padding>
            <q-item
              v-ripple
              clickable
              to="/"
              exact
              @click="closeMobileMenu"
            >
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>
              <q-item-section>Accueil</q-item-section>
            </q-item>

            <q-item
              v-ripple
              clickable
              to="/about"
              @click="closeMobileMenu"
            >
              <q-item-section avatar>
                <q-icon name="info" />
              </q-item-section>
              <q-item-section>À propos</q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>
    </q-header>
  `,
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
    this.currentTab = this.$route?.name || 'home';
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
      if (this.windowWidth > 599) {
        this.closeMobileMenu();
      }
    }
  }
};

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
          <div class="col-12 col-md-4">
            <q-card class="my-card">
              <q-card-section>
                <div class="text-h6">Fonctionnalité 1</div>
                <q-separator class="q-my-sm" />
                <div class="text-body1">
                  Découvrez nos fonctionnalités avancées conçues pour vous simplifier la vie.
                </div>
              </q-card-section>
              <q-card-actions>
                <q-btn flat color="primary" label="En savoir plus" />
              </q-card-actions>
            </q-card>
          </div>
          
          <div class="col-12 col-md-4">
            <q-card class="my-card">
              <q-card-section>
                <div class="text-h6">Fonctionnalité 2</div>
                <q-separator class="q-my-sm" />
                <div class="text-body1">
                  Profitez d'une expérience utilisateur fluide et intuitive sur tous vos appareils.
                </div>
              </q-card-section>
              <q-card-actions>
                <q-btn flat color="primary" label="En savoir plus" />
              </q-card-actions>
            </q-card>
          </div>
          
          <div class="col-12 col-md-4">
            <q-card class="my-card">
              <q-card-section>
                <div class="text-h6">Fonctionnalité 3</div>
                <q-separator class="q-my-sm" />
                <div class="text-body1">
                  Sécurisez vos données avec nos solutions de cryptage de pointe.
                </div>
              </q-card-section>
              <q-card-actions>
                <q-btn flat color="primary" label="En savoir plus" />
              </q-card-actions>
            </q-card>
          </div>
        </div>
        
        <div class="row justify-center q-mt-xl">
          <div class="col-12 col-md-8 text-center">
            <h2 class="text-h4 q-mb-md">Prêt à commencer ?</h2>
            <p class="text-body1 q-mb-lg">Rejoignez dès aujourd'hui des milliers d'utilisateurs satisfaits.</p>
            <q-btn 
              color="primary" 
              size="lg" 
              label="Créer un compte"
              icon-right="arrow_forward"
              class="q-px-xl"
            />
          </div>
        </div>
      </div>
    </q-page>
  `
};

const AboutPage = {
  data() {
    return {
      teamMembers: [
        {
          name: 'Jean Dupont',
          role: 'CEO & Fondateur',
          photo: 'https://randomuser.me/api/portraits/men/32.jpg',
          social: [
            { icon: 'fab fa-linkedin', color: 'primary' },
            { icon: 'fab fa-twitter', color: 'info' }
          ]
        },
        {
          name: 'Marie Martin',
          role: 'Directrice Technique',
          photo: 'https://randomuser.me/api/portraits/women/44.jpg',
          social: [
            { icon: 'fab fa-linkedin', color: 'primary' },
            { icon: 'fab fa-github', color: 'dark' }
          ]
        },
        {
          name: 'Thomas Bernard',
          role: 'Responsable Design',
          photo: 'https://randomuser.me/api/portraits/men/22.jpg',
          social: [
            { icon: 'fab fa-dribbble', color: 'pink' },
            { icon: 'fab fa-behance', color: 'blue' }
          ]
        },
        {
          name: 'Sophie Leroy',
          role: 'Chef de Projet',
          photo: 'https://randomuser.me/api/portraits/women/68.jpg',
          social: [
            { icon: 'fab fa-linkedin', color: 'primary' },
            { icon: 'fab fa-twitter', color: 'info' }
          ]
        }
      ]
    };
  },
  template: `
    <q-page padding>
      <div class="q-pa-md">
        <div class="text-center q-mb-xl">
          <h1 class="text-h3 text-weight-bold text-primary q-mb-md">À propos de nous</h1>
          <p class="text-h6 text-grey-8">Notre histoire, notre mission et notre engagement</p>
        </div>
        
        <div class="row items-center q-mb-xl">
          <div class="col-12 col-md-6">
            <h2 class="text-h4 q-mb-md">Notre Histoire</h2>
            <p class="text-body1 q-mb-md">
              Fondée en 2023, notre entreprise s'est rapidement imposée comme un acteur clé dans son domaine. 
              Notre parcours est marqué par l'innovation et l'engagement envers l'excellence.
            </p>
            <p class="text-body1">
              Nous croyons en la puissance de la technologie pour transformer les entreprises et améliorer 
              la vie des gens. Notre équipe passionnée travaille sans relâche pour offrir des solutions 
              qui font la différence.
            </p>
          </div>
          <div class="col-12 col-md-6 q-pa-md">
            <q-img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
              :ratio="16/9"
              class="rounded-borders shadow-3"
            >
              <div class="absolute-full flex flex-center bg-transparent">
                <q-icon name="play_circle_filled" size="64px" color="white" class="cursor-pointer" />
              </div>
            </q-img>
          </div>
        </div>
        
        <div class="row q-col-gutter-lg q-mb-xl">
          <div class="col-12">
            <h2 class="text-h4 text-center q-mb-lg">Notre Équipe</h2>
            <div class="row justify-center">
              <div class="col-12 col-sm-6 col-md-3 q-pa-sm" v-for="(member, index) in teamMembers" :key="index">
                <q-card class="text-center">
                  <q-img :src="member.photo" :ratio="1" class="member-photo" />
                  <q-card-section>
                    <div class="text-h6">{{ member.name }}</div>
                    <div class="text-subtitle2 text-grey-7">{{ member.role }}</div>
                    <div class="q-mt-sm">
                      <q-btn 
                        v-for="(social, sIndex) in member.social" 
                        :key="sIndex"
                        flat 
                        round 
                        dense 
                        :icon="social.icon" 
                        :color="social.color"
                        class="q-mx-xs"
                      />
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center q-mt-xl">
          <q-btn 
            color="primary" 
            label="Découvrir nos services"
            icon-right="arrow_forward"
            size="lg"
            class="q-px-xl"
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


// Create the Vue application
const app = createApp({
  template: `
    <q-layout view="hHh lpR fFf">
      <nav-bar />
      <q-page-container>
        <router-view></router-view>
      </q-page-container>
    </q-layout>
  `,
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
    this.currentTab = this.$route?.name || 'home';
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
      if (this.windowWidth > 599) {
        this.closeMobileMenu();
      }
    }
  }
});

// Register components globally
app.component('NavBar', NavBar);
app.component('HomePage', HomePage);
app.component('AboutPage', AboutPage);

// Configure and use Quasar
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
  plugins: {}
});
// Create and configure router
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { 
      path: '/', 
      component: { template: '<home-page />' },
      name: 'home',
      meta: { title: 'Accueil' }
    },
    { 
      path: '/about', 
      component: { template: '<about-page />' },
      name: 'about',
      meta: { title: 'À propos' }
    },
    { 
      path: '/:pathMatch(.*)*', 
      redirect: '/' 
    }
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

// Update document title on route change
router.beforeEach((to, from, next) => {
  document.title = to.meta?.title ? `${to.meta.title} | Mon App Quasar` : 'Mon App Quasar';
  next();
});

// Use router
app.use(router);

// Configure app
app.use(router);
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

// Mount the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const vm = app.mount('#q-app');
  
  // Enable devtools in development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    app.config.devtools = true;
    app.config.performance = true;
    console.log('Vue devtools enabled');
  }
  
  console.log('Application Quasar chargée avec succès!');
  return vm;
});