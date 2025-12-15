// Reusable Vue Components

// Demo Component
const DemoComponent = {
  template: `
    <div class="card">
      <div class="card-section">
        <div class="text-h6">Quasar Reactivity Demo</div>
        <div class="text-caption">
          Live update using Vue reactivity
        </div>
      </div>

      <div class="card-section">
        <!-- Reactive Text Input -->
        <input
          class="input"
          :value="name"
          @input="$emit('update:name', $event.target.value)"
          placeholder="Type your name"
        />

        <div class="mt-md">
          Typed value: <strong>{{ name || '—' }}</strong>
        </div>

        <!-- Buttons -->
        <div class="row mt-md">
          <button
            class="btn btn-primary"
            @click="$emit('increment')"
          >
            Click me
          </button>

          <button
            class="btn btn-negative"
            @click="$emit('reset')"
          >
            Reset
          </button>
        </div>

        <!-- Reactive Counter -->
        <div class="text-subtitle1">
          Button clicked:
          <strong>{{ counter }}</strong> times
        </div>

        <!-- Contact Form Toggle -->
        <div class="separator"></div>
        <div class="mt-md">
          <button
            class="btn btn-secondary"
            @click="$emit('show-contact')"
          >
            <span class="material-icons">contact_mail</span>
            Contact Us
          </button>
        </div>
      </div>
    </div>
  `,
  props: {
    name: String,
    counter: Number
  },
  emits: ['show-contact', 'increment', 'reset', 'update:name']
};

// Contact Form Component
const ContactFormComponent = {
  template: `
    <div class="card">
      <div class="card-section">
        <div class="text-h6">Contact Us</div>
        <div class="text-caption">
          We'd love to hear from you
        </div>
      </div>

      <div class="card-section">
        <input
          class="input"
          v-model="formData.name"
          placeholder="Your Name *"
        />
        
        <input
          class="input"
          type="email"
          v-model="formData.email"
          placeholder="Email *"
        />
        
        <input
          class="input"
          v-model="formData.subject"
          placeholder="Subject *"
        />
        
        <textarea
          class="input textarea"
          v-model="formData.message"
          placeholder="Message *"
        ></textarea>

        <div class="row">
          <button
            class="btn btn-primary"
            @click="submitForm"
            :disabled="!isFormValid"
          >
            Send Message
          </button>
          <button
            class="btn btn-negative"
            @click="clearForm"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  `,
  props: {
    initialData: {
      type: Object,
      default: () => ({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    }
  },
  emits: ['submit', 'clear'],
  setup(props, { emit }) {
    const { ref, computed } = Vue;
    
    const formData = ref({ ...props.initialData });
    
    const isFormValid = computed(() => {
      return formData.value.name && 
             formData.value.email && 
             formData.value.subject && 
             formData.value.message;
    });
    
    const submitForm = () => {
      if (isFormValid.value) {
        emit('submit', { ...formData.value });
      }
    };
    
    const clearForm = () => {
      formData.value = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };
      emit('clear');
    };
    
    return {
      formData,
      isFormValid,
      submitForm,
      clearForm
    };
  }
};

// Navigation Component
const NavigationComponent = {
  template: `
    <div v-if="showBack" style="margin-top: 16px;">
      <button
        class="btn btn-negative"
        @click="$emit('back')"
      >
        <span class="material-icons">arrow_back</span>
        Back to Demo
      </button>
    </div>
  `,
  props: {
    showBack: Boolean
  },
  emits: ['back']
};

// Export components for use in main app
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    DemoComponent,
    ContactFormComponent,
    NavigationComponent
  };
} else {
  // Browser environment - attach to window
  window.AppComponents = {
    DemoComponent,
    ContactFormComponent,
    NavigationComponent
  };
}
