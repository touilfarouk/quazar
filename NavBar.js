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
              class="text-white"
            />
            <q-route-tab
              name="products"
              icon="store"
              label="Produits"
              to="/products"
              class="text-white"
            />
            <q-route-tab
              name="order"
              icon="shopping_cart"
              label="Commander"
              to="/order"
              class="text-white"
            />
            <q-route-tab
              name="about"
              icon="info"
              label="À propos"
              to="/about"
              class="text-white"
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
              <q-item-section>Accueil</q-item-section>
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
              <q-item-section>Produits</q-item-section>
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
              <q-item-section>Commander</q-item-section>
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

export default NavBar;