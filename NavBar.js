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
            <img src="img/icon-192.svg" alt="logo">
          </q-avatar>
          crochetyou.can.do
        </q-toolbar-title>

        <div class="gt-sm">
          <q-tabs v-model="currentTab" inline-label class="text-white">
            <q-route-tab
              name="home"
              icon="home"
              label="Home"
              to="/"
              exact
            />
            <q-route-tab
              name="products"
              icon="store"
              label="Products"
              to="/products"
            />
            <q-route-tab
              name="order"
              icon="shopping_cart"
              label="Order"
              to="/order"
            />
            <q-route-tab
              name="about"
              icon="info"
              label="About"
              to="/about"
            />
          </q-tabs>
        </div>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <!-- Theme toggle (light / dark) -->
          <q-btn
            round
            dense
            flat
            color="white"
            :icon="dark ? 'light_mode' : 'dark_mode'"
            aria-label="Toggle theme"
            @click="toggleDarkMode"
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
              <q-item-section>Home</q-item-section>
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
              <q-item-section>Products</q-item-section>
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
              <q-item-section>Order</q-item-section>
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
              <q-item-section>About</q-item-section>
            </q-item> 
          </q-list>
        </q-scroll-area>
      </q-drawer>


    </header>
  `,
  data() {
    return {
      currentTab: 'home',
      mobileMenuOpen: false,
      windowWidth: window.innerWidth,
      dark: false

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

    // Initialize theme pref from localStorage or Quasar
    const storedDark = localStorage.getItem('dark');
    if (storedDark !== null) {
      const val = storedDark === '1';
      if (this.$q && this.$q.dark && this.$q.dark.set) {
        this.$q.dark.set(val);
      }
      // Keep a page-level class in sync (works regardless of Quasar availability)
      document.documentElement.classList.toggle('dark', val);
      this.dark = val;
    } else if (this.$q && this.$q.dark && typeof this.$q.dark.isActive !== 'undefined') {
      this.dark = !!this.$q.dark.isActive;
      // Keep page-level class in sync
      document.documentElement.classList.toggle('dark', this.dark);
    }
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
    toggleDarkMode() {
      const newVal = !this.dark;
      if (this.$q && this.$q.dark && this.$q.dark.set) {
        this.$q.dark.set(newVal);
      }
      // Always also keep a page-level class in sync so plain CSS matches
      document.documentElement.classList.toggle('dark', newVal);
      this.dark = newVal;
      localStorage.setItem('dark', newVal ? '1' : '0');
    }

  }
};

export default NavBar;