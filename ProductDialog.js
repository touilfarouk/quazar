// Shared Product Dialog Component
const ProductDialog = {
  template: `
    <q-dialog v-model="dialogOpen" persistent transition-show="scale" transition-hide="scale">
      <q-card :class="dialogThemeClass" style="min-width: 380px; max-width: 650px; border-radius: 12px;">
        <!-- Close button -->
        <q-btn
          flat
          round
          dense
          icon="close"
          class="absolute-top-right q-ma-sm"
          style="z-index: 10;"
          @click="closeDialog"
          aria-label="Close dialog"
        />

        <!-- Product Image Section -->
        <q-card-section class="q-pa-md dialog-header">
          <div class="row justify-center">
            <q-img 
              :src="selectedProduct?.img" 
              :alt="selectedProduct?.name || 'Product image'"
              ratio="1" 
              class="dialog-product-img" 
              style="object-fit: cover; object-position: 50% 50%; padding: 12px; border-radius: 12px; background: white; box-shadow: 0 4px 12px rgba(0,0,0,0.1); max-width: 280px;"
              loading="lazy"
            />
          </div>
        </q-card-section>

        <!-- Product Info Section -->
        <q-card-section class="q-pa-lg">
          <div class="text-h5 text-weight-bold q-mb-xs dialog-title">
            {{ selectedProduct?.name }}
          </div>
          
          <div v-if="selectedProduct?.badge" class="q-mb-sm">
            <q-badge color="primary" :label="selectedProduct.badge" />
          </div>

          <div class="text-body2 q-mb-md dialog-desc" style="line-height: 1.6;">
            {{ selectedProduct?.description }}
          </div>

          <q-separator class="q-my-md" />

          <div class="row items-center justify-between q-mb-lg">
            <div>
              <div class="text-caption text-grey-6">Price</div>
              <div class="text-h4 text-weight-bold" style="color: #d97706;">
                {{ formatPrice(selectedProduct?.price || '') }}
              </div>
            </div>
            <div v-if="selectedProduct?.rating" class="text-right">
              <div class="text-caption text-grey-6">Rating</div>
              <div class="row items-center">
                <span class="text-h6 text-weight-bold q-mr-xs">{{ selectedProduct.rating.toFixed(1) }}</span>
                <span style="color: #fbbf24; font-size: 18px;" aria-hidden="true">★</span>
              </div>
            </div>
          </div>

          <!-- Order Form -->
          <div :style="formStyle" class="q-pa-md order-form">
            <div class="text-subtitle1 text-weight-medium q-mb-md dialog-form-title">
              Order Details
            </div>

            <form @submit.prevent="submitOrder" class="order-form">
              <div class="q-gutter-md">
                <q-input 
                  outlined 
                  v-model="order.parentName" 
                  label="Parent / Guardian Name *" 
                  dense
                  :rules="[val => !!val || 'Required field']"
                  aria-required="true"
                >
                  <template v-slot:prepend>
                    <q-icon name="person" aria-hidden="true" />
                  </template>
                </q-input>

                <q-input 
                  outlined 
                  v-model="order.contact" 
                  label="Email or Phone *" 
                  dense
                  type="text"
                  :rules="[val => !!val || 'Required field', contactRule]"
                  aria-required="true"
                >
                  <template v-slot:prepend>
                    <q-icon name="contact_mail" aria-hidden="true" />
                  </template>
                </q-input>

                <q-input 
                  outlined 
                  v-model="order.studentName" 
                  label="Recipient Name *" 
                  dense
                  :rules="[val => !!val || 'Required field']"
                  aria-required="true"
                >
                  <template v-slot:prepend>
                    <q-icon name="school" aria-hidden="true" />
                  </template>
                </q-input>

                <div class="row q-col-gutter-sm">
                  <div class="col-6">
                    <q-input 
                      outlined 
                      v-model="order.grade" 
                      label="Grade" 
                      dense
                    >
                      <template v-slot:prepend>
                        <q-icon name="grade" aria-hidden="true" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-6">
                    <q-input 
                      outlined 
                      v-model="order.color" 
                      label="Color Preference" 
                      dense
                    >
                      <template v-slot:prepend>
                        <q-icon name="palette" aria-hidden="true" />
                      </template>
                    </q-input>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </q-card-section>

        <!-- Actions -->
        <q-card-actions align="right" class="q-pa-md q-pt-none">
          <q-btn 
            flat 
            label="Cancel" 
            color="grey-7" 
            @click="closeDialog"
            class="q-px-lg"
          />
          <q-btn 
            unelevated
            label="Place Order" 
            color="primary" 
            @click="submitOrder"
            class="q-px-lg"
            icon-right="send"
            :loading="submitting"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  `,
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    product: {
      type: Object,
      default: null
    }
  },
  emits: ['update:modelValue', 'order-sent'],
  data() {
    return {
      order: {
        parentName: '',
        contact: '',
        studentName: '',
        grade: '',
        color: ''
      },
      submitting: false
    };
  },
  computed: {
    dialogOpen: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    },
    selectedProduct() {
      return this.product;
    },
    isDark() {
      return !!(this.$q && this.$q.dark && this.$q.dark.isActive) || document.documentElement.classList.contains('dark');
    },
    dialogThemeClass() {
      return this.isDark ? 'dialog-dark' : 'dialog-light';
    },
    headerStyle() {
      return this.isDark ? { background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)' } : { background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' };
    },
    formStyle() {
      return this.isDark ? { background: '#0f1720', borderRadius: '8px', color: '#e5e7eb' } : { background: '#f9fafb', borderRadius: '8px', color: '#374151' };
    }
  },
  watch: {
    product: {
      handler(newProduct) {
        if (newProduct) {
          this.resetOrder();
        }
      },
      immediate: true
    }
  },
  methods: {
    formatPrice(price) {
      return price ? `$${price}` : '';
    },
    resetOrder() {
      this.order = {
        parentName: '',
        contact: '',
        studentName: '',
        grade: '',
        color: ''
      };
      this.submitting = false;
    },
    closeDialog() {
      this.dialogOpen = false;
      this.resetOrder();
    },
    // Validation helper used by the template rules (keeps regex out of the template string)
    contactRule(val) {
      if (!val) return true;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\+?[0-9\s\-()]{7,}$/;

      if (val.includes('@')) {
        return emailRegex.test(val) || 'Please enter a valid email address';
      }

      return phoneRegex.test(val) || 'Please enter a valid phone number';
    },
    validateOrder() {
      if (!this.order.parentName || !this.order.contact || !this.order.studentName) {
        this.$q.notify({
          color: 'negative',
          message: 'Please fill in all required fields',
          icon: 'error',
          position: 'top'
        });
        return false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\+?[0-9\s\-()]{7,}$/;
      const contact = (this.order.contact || '').trim();

      if (contact.includes('@')) {
        if (!emailRegex.test(contact)) {
          this.$q.notify({ color: 'negative', message: 'Please enter a valid email address', icon: 'error', position: 'top' });
          return false;
        }
      } else {
        if (!phoneRegex.test(contact)) {
          this.$q.notify({ color: 'negative', message: 'Please enter a valid phone number', icon: 'error', position: 'top' });
          return false;
        }
      }

      return true;
    },
    async submitOrder() {
      if (!this.validateOrder() || !this.selectedProduct) return;
      
      this.submitting = true;
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const subject = encodeURIComponent(`Order: ${this.selectedProduct.name}`);
        const bodyLines = [
          `ORDER DETAILS`,
          `================`,
          ``,
          `Product: ${this.selectedProduct.name}`,
          `Price: $${this.selectedProduct.price}`,
          ``,
          `CUSTOMER INFORMATION`,
          `================`,
          `Parent: ${this.order.parentName}`,
          `Contact: ${this.order.contact}`,
          `Student: ${this.order.studentName}`,
          `Grade: ${this.order.grade || 'Not provided'}`,
          `Color Preference: ${this.order.color || 'Not provided'}`
        ];
        const body = encodeURIComponent(bodyLines.join('\n'));
        const mailto = `mailto:?subject=${subject}&body=${body}`;
        
        window.location.href = mailto;
        
        this.$q.notify({
          color: 'positive',
          message: 'Order prepared successfully! Email client opened.',
          icon: 'check_circle',
          position: 'top'
        });
        
        this.$emit('order-sent', {
          product: this.selectedProduct,
          order: { ...this.order }
        });
        
        this.closeDialog();
      } catch (error) {
        this.$q.notify({
          color: 'negative',
          message: 'An error occurred. Please try again.',
          icon: 'error',
          position: 'top'
        });
      } finally {
        this.submitting = false;
      }
    }
  }
};

export default ProductDialog;
