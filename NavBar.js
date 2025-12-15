// NavBar Component
const NavBar = {
  template: `
    <nav class="navbar">
      <div class="navbar-container">
        <div class="navbar-brand">Quasar</div>
        <ul class="nav-links">
          <li><a href="#" @click.prevent="navigate('home')" :class="{ 'active': activeTab === 'home' }">
            <span class="material-icons">home</span> Accueil
          </a></li>
          <li><a href="#" @click.prevent="navigate('about')" :class="{ 'active': activeTab === 'about' }">
            <span class="material-icons">info</span> À propos
          </a></li>
        </ul>
      </div>
    </nav>
  `,
  data() {
    return {
      activeTab: 'home'
    };
  },
  methods: {
    navigate(tab) {
      this.activeTab = tab;
      this.$emit('navigate', tab);
    }
  }
};

// Add styles if not already added
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
