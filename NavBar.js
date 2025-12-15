// NavBar Component
const NavBar = {
  template: `
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="text-weight-bold">
          Mon App Quasar
        </q-toolbar-title>

        <!-- Desktop Navigation -->
        <div class="gt-sm">
          <q-tabs v-model="activeTab" active-color="white" indicator-color="yellow-8" dense inline-label>
            <q-route-tab 
              to="/" 
              name="home"
              label="Accueil" 
              icon="home"
              exact
              class="q-mx-sm"
            />
            <q-route-tab 
              to="/about" 
              name="about"
              label="À propos" 
              icon="info"
              class="q-mx-sm"
            />
          </q-tabs>
        </div>

        <!-- Mobile Menu Button -->
        <q-btn
          flat
          dense
          round
          icon="menu"
          class="lt-md"
          @click="mobileMenuOpen = !mobileMenuOpen"
          aria-label="Menu"
        />
      </q-toolbar>

      <!-- Mobile Navigation -->
      <q-drawer
        v-model="mobileMenuOpen"
        side="right"
        overlay
        bordered
        class="bg-primary text-white"
        :width="200"
      >
        <q-list>
          <q-item 
            v-ripple
            clickable
            to="/"
            exact
            active-class="text-yellow-8"
            @click="mobileMenuOpen = false"
            class="q-pa-md"
          >
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <q-item-section>Accueil</q-item-section>
          </q-item>
          
          <q-separator color="white-20" />
          
          <q-item 
            v-ripple
            clickable
            to="/about"
            active-class="text-yellow-8"
            @click="mobileMenuOpen = false"
            class="q-pa-md"
          >
            <q-item-section avatar>
              <q-icon name="info" />
            </q-item-section>
            <q-item-section>À propos</q-item-section>
          </q-item>
        </q-list>
      </q-drawer>
    </q-header>
  `,
  data() {
    return {
      activeTab: 'home',
      mobileMenuOpen: false,
      windowWidth: window.innerWidth
    };
  },
  watch: {
    '$route'(to) {
      this.activeTab = to.name || 'home';
    }
  },
  created() {
    this.activeTab = this.$route.name || 'home';
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth > 599) {
        this.mobileMenuOpen = false;
      }
    }
  }
};

export default NavBar;
const navbarStylesId = 'navbar-styles';
if (!document.getElementById(navbarStylesId)) {
  const styleElement = document.createElement('style');
  styleElement.id = navbarStylesId;
  styleElement.textContent = `
    .navbar {
      background-color: #1976d2;
      color: white;
      padding: 0.5rem 1rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .navbar-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .navbar-brand {
      font-size: 1.5rem;
      font-weight: bold;
    }
    
    .nav-links {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    
    .nav-links li {
      margin-left: 1.5rem;
    }
    
    .nav-links a {
      color: white;
      text-decoration: none;
      display: flex;
      align-items: center;
      padding: 0.5rem 0;
      border-bottom: 2px solid transparent;
      transition: all 0.3s ease;
    }
    
    .nav-links a:hover,
    .nav-links a.active {
      border-bottom-color: white;
      opacity: 0.9;
    }
    
    .nav-links .material-icons {
      margin-right: 0.5rem;
      font-size: 1.2rem;
    }
  `;
  document.head.appendChild(styleElement);
}

// Export the component
window.NavBar = NavBar;
