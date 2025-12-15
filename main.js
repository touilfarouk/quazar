// Main Vue Application
const { createApp, ref } = Vue;

// Application State Management
const useAppState = () => {
  // Demo state
  const name = ref("");
  const counter = ref(0);
  
  // Navigation state
  const showContactForm = ref(false);
  
  // Contact form state
  const contactData = ref({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Demo actions
  const increment = () => {
    counter.value++;
  };

  const reset = () => {
    name.value = "";
    counter.value = 0;
  };

  // Navigation actions
  const toggleContactForm = () => {
    showContactForm.value = !showContactForm.value;
  };
  
  // Contact form actions
  const handleContactSubmit = (formData) => {
    console.log('Contact form submitted:', formData);
    alert('Message sent! (Check console for details)');
    clearContactForm();
  };
  
  const clearContactForm = () => {
    contactData.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  };

  return {
    // State
    name,
    counter,
    showContactForm,
    contactData,
    
    // Actions
    increment,
    reset,
    toggleContactForm,
    handleContactSubmit,
    clearContactForm
  };
};

// Main App Component
const AppComponent = {
  setup() {
    const appState = useAppState();
    
    return {
      ...appState
    };
  },
  
  template: `
    <div class="app">
      <!-- Demo Component -->
      <DemoComponent
        v-if="!showContactForm"
        v-model:name="name"
        :counter="counter"
        @show-contact="toggleContactForm"
        @increment="increment"
        @reset="reset"
      />

      <!-- Contact Form Component -->
      <ContactFormComponent
        v-else
        :initial-data="contactData"
        @submit="handleContactSubmit"
        @clear="clearContactForm"
      />

      <!-- Navigation Component -->
      <NavigationComponent
        :show-back="showContactForm"
        @back="toggleContactForm"
      />
    </div>
  `
};

// Create and mount the application
const app = createApp(AppComponent);

// Register components
app.component('DemoComponent', window.AppComponents.DemoComponent);
app.component('ContactFormComponent', window.AppComponents.ContactFormComponent);
app.component('NavigationComponent', window.AppComponents.NavigationComponent);

// Mount the app
app.mount("#app");

// Global error handling
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue Error:', err);
  console.error('Component:', vm);
  console.error('Info:', info);
};

// Development warnings - using URL parameter for development mode
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('dev') === 'true' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  app.config.devtools = true;
  console.log('Vue devtools enabled');
}
