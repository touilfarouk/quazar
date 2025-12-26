// NavBar Component
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
            <img src="img/brouwn10.png" alt="logo">
          </q-avatar>
          {{ $t('app.title') }}
        </q-toolbar-title>

        <div class="gt-sm">
          <q-tabs v-model="currentTab" inline-label class="text-white">
            <q-route-tab
              name="home"
              icon="home"
              :label="$t('app.home')"
              to="/"
              exact
            />
            <q-route-tab
              name="products"
              icon="store"
              :label="$t('app.products')"
              to="/products"
            />
            <q-route-tab
              name="order"
              icon="shopping_cart"
              :label="$t('app.order')"
              to="/order"
            />
            <q-route-tab
              name="about"
              icon="info"
              :label="$t('app.about')"
              to="/about"
            />
          </q-tabs>
        </div>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="white" icon="fab fa-github" />
          <q-btn round dense flat color="white" icon="fab fa-twitter" />
          <q-btn round dense flat color="white" icon="fab fa-linkedin" />
          <q-btn 
            round 
            dense 
            flat 
            color="white" 
            icon="language" 
            @click="showLanguageDialog"
          />
        </div>
      </q-toolbar>

      <!-- Mobile Menu -->
      <q-drawer
        v-model="mobileMenuOpen"
        :width="220"
        show-if-above="600"
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
              class="text-primary"
            >
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>
              <q-item-section>{{ $t('app.home') }}</q-item-section>
            </q-item>

            <q-item
              v-ripple
              clickable
              to="/products"
              @click="closeMobileMenu"
              class="text-primary"
            >
              <q-item-section avatar>
                <q-icon name="store" />
              </q-item-section>
              <q-item-section>{{ $t('app.products') }}</q-item-section>
            </q-item>

            <q-item
              v-ripple
              clickable
              to="/order"
              @click="closeMobileMenu"
              class="text-primary"
            >
              <q-item-section avatar>
                <q-icon name="shopping_cart" />
              </q-item-section>
              <q-item-section>{{ $t('app.order') }}</q-item-section>
            </q-item>

            <q-item
              v-ripple
              clickable
              to="/about"
              @click="closeMobileMenu"
              class="text-primary"
            >
              <q-item-section avatar>
                <q-icon name="info" />
              </q-item-section>
              <q-item-section>{{ $t('app.about') }}</q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <!-- Language Selection Dialog -->
      <q-dialog v-model="languageDialogOpen" position="bottom">
        <q-card style="min-width: 300px;">
          <q-card-section>
            <div class="text-h6">{{ $t('navbar.language') }}</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-list>
              <q-item 
                v-for="locale in supportedLocales" 
                :key="locale"
                clickable 
                @click="changeLanguage(locale)"
                :class="{ 'text-primary': currentLocale === locale }"
              >
                <q-item-section>
                  <q-item-label>{{ getLanguageName(locale) }}</q-item-label>
                </q-item-section>
                <q-item-section side v-if="currentLocale === locale">
                  <q-icon name="check" color="primary" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-dialog>
    </header>
  `,
  data() {
    return {
      currentTab: 'home',
      mobileMenuOpen: false,
      windowWidth: window.innerWidth,
      languageDialogOpen: false
    };
  },
  computed: {
    currentLocale() {
      return this.$i18n.locale;
    },
    supportedLocales() {
      return ['en', 'fr', 'ar'];
    }
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
    },
    showLanguageDialog() {
      this.languageDialogOpen = true;
    },
    changeLanguage(locale) {
      this.$i18n.locale = locale;
      localStorage.setItem('user-locale', locale);
      this.languageDialogOpen = false;
      
      // Apply RTL/LTR direction
      document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = locale;
    },
    getLanguageName(locale) {
      const names = {
        en: 'English',
        fr: 'Français',
        ar: 'العربية'
      };
      return names[locale] || locale;
    }
  }
};

export default NavBar;