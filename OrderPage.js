import products from './productsData.js';

const OrderPage = {
  template: `
    <q-page padding>
      <div class="q-pa-md" style="max-width: 900px; margin: 0 auto;">
        <q-card style="border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); margin-top: 30px;">
          <q-separator />

          <!-- Form Section -->
          <q-card-section class="q-pa-lg">
            <div class="order-form">
              <!-- Personal Information -->
              <div class="q-mb-lg">
                <div class="text-h6 text-weight-medium q-mb-md" style="color: #374151;">
                  <q-icon name="person" class="q-mr-sm" color="primary" />
                  Personal Information
                </div>
                <div class="q-gutter-md">
                  <q-input 
                    outlined
                    v-model="form.parentName" 
                    label="Parent Name *" 
                    :rules="[ val => !!val || 'Required field' ]"
                  >
                    <template v-slot:prepend>
                      <q-icon name="person" color="grey-6" />
                    </template>
                  </q-input>

                  <q-input 
                    outlined
                    v-model="form.contact" 
                    label="Email or Phone *" 
                    type="email" 
                    :rules="[ val => !!val || 'Required field' ]"
                  >
                    <template v-slot:prepend>
                      <q-icon name="contact_mail" color="grey-6" />
                    </template>
                  </q-input>

                  <div class="row q-col-gutter-md">
                    <div class="col-12 col-sm-6">
                      <q-input 
                        outlined
                        v-model="form.studentName" 
                        label="Student's Name"
                      >
                        <template v-slot:prepend>
                          <q-icon name="school" color="grey-6" />
                        </template>
                      </q-input>
                    </div>
                    <div class="col-12 col-sm-6">
                      <q-input 
                        outlined
                        v-model="form.grade" 
                        label="Grade"
                      >
                        <template v-slot:prepend>
                          <q-icon name="grade" color="grey-6" />
                        </template>
                      </q-input>
                    </div>
                  </div>
                </div>
              </div>

              <q-separator class="q-my-lg" />

              <!-- Product Selection -->
              <div class="q-mb-lg">
                <div class="text-h6 text-weight-medium q-mb-md" style="color: #374151;">
                  <q-icon name="shopping_cart" class="q-mr-sm" color="primary" />
                  Product Selection
                </div>
                <div class="q-gutter-md">
                  <q-select 
                    outlined
                    v-model="form.productId" 
                    :options="productOptions" 
                    label="Choose a Product *" 
                    emit-value 
                    map-options 
                    :rules="[ val => !!val || 'Please select a product' ]"
                  >
                    <template v-slot:prepend>
                      <q-icon name="inventory_2" color="grey-6" />
                    </template>
                  </q-select>

                  <!-- Product Preview -->
                  <div v-if="selectedProduct" class="q-pa-md" style="background: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">
                    <div class="row items-center q-gutter-md">
                      <q-img 
                        :src="selectedProduct.img" 
                        style="width: 80px; height: 80px; border-radius: 8px; object-fit: cover;"
                      />
                      <div style="flex: 1;">
                        <div class="text-subtitle1 text-weight-medium">{{ selectedProduct.name }}</div>
                        <div class="text-caption text-grey-7">{{ selectedProduct.description }}</div>
                        <div class="text-h6 text-weight-bold q-mt-xs" style="color: #d97706;">
                          {{ '$' + selectedProduct.price }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row q-col-gutter-md">
                    <div class="col-12 col-sm-6">
                      <q-input 
                        outlined
                        v-model.number="form.quantity" 
                        type="number" 
                        label="Quantity" 
                        min="1"
                      >
                        <template v-slot:prepend>
                          <q-icon name="add_shopping_cart" color="grey-6" />
                        </template>
                      </q-input>
                    </div>
                    <div class="col-12 col-sm-6">
                      <q-input 
                        outlined
                        v-model="form.color" 
                        label="Color Preference"
                      >
                        <template v-slot:prepend>
                          <q-icon name="palette" color="grey-6" />
                        </template>
                      </q-input>
                    </div>
                  </div>

                  <q-input 
                    outlined
                    type="textarea" 
                    v-model="form.notes" 
                    label="Notes / Comments" 
                    rows="3"
                  >
                    <template v-slot:prepend>
                      <q-icon name="notes" color="grey-6" />
                    </template>
                  </q-input>
                </div>
              </div>

              <q-separator class="q-my-lg" />

              <!-- Order Summary -->
              <div v-if="selectedProduct" class="q-mb-lg">
                <div class="text-h6 text-weight-medium q-mb-md" style="color: #374151;">
                  <q-icon name="receipt" class="q-mr-sm" color="primary" />
                  Order Summary
                </div>
                <div class="q-pa-md" style="background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); border-radius: 8px;">
                  <div class="row justify-between q-mb-sm">
                    <span class="text-body1">Product:</span>
                    <span class="text-body1 text-weight-medium">{{ selectedProduct.name }}</span>
                  </div>
                  <div class="row justify-between q-mb-sm">
                    <span class="text-body1">Unit Price:</span>
                    <span class="text-body1 text-weight-medium">{{ '$' + selectedProduct.price }}</span>
                  </div>
                  <div class="row justify-between q-mb-sm">
                    <span class="text-body1">Quantity:</span>
                    <span class="text-body1 text-weight-medium">{{ form.quantity }}</span>
                  </div>
                  <q-separator class="q-my-sm" />
                  <div class="row justify-between">
                    <span class="text-h6 text-weight-bold">Total:</span>
                    <span class="text-h6 text-weight-bold" style="color: #d97706;">
                      {{ '$' + (selectedProduct.price * form.quantity).toFixed(2) }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="row q-gutter-md justify-end">
                <q-btn 
                  outline
                  label="Download Summary" 
                  color="grey-7" 
                  @click="downloadSummary"
                  icon="download"
                  class="q-px-lg"
                />
                <q-btn 
                  unelevated
                  label="Send Order via Email" 
                  color="primary" 
                  @click="submitOrder"
                  icon-right="send"
                  class="q-px-lg"
                  size="md"
                  :loading="submitting"
                  :disable="submitting"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </q-page>
  `,
  data() {
    return {
      products,
      form: {
        parentName: '',
        contact: '',
        studentName: '',
        grade: '',
        productId: null,
        quantity: 1,
        color: '',
        notes: ''
      },
      submitting: false
    };
  },
  computed: {
    productOptions() {
      return this.products.map(p => ({ label: `${p.name} — $${p.price}`, value: p.id }));
    },
    selectedProduct() {
      return this.products.find(p => p.id === this.form.productId);
    }
  },
  methods: {
    validate() {
      if (!this.form.parentName || !this.form.contact || !this.form.productId) {
        this.$q.notify({ 
          color: 'negative', 
          message: 'Please fill in all required fields', 
          icon: 'error',
          position: 'top'
        });
        return false;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (this.form.contact.includes('@') && !emailRegex.test(this.form.contact)) {
        this.$q.notify({ 
          color: 'negative', 
          message: 'Please enter a valid email address', 
          icon: 'error',
          position: 'top'
        });
        return false;
      }
      
      return true;
    },
    async submitOrder() {
      if (!this.validate()) return;
      
      this.submitting = true;
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const p = this.selectedProduct;
        const total = (p.price * this.form.quantity).toFixed(2);
        const subject = encodeURIComponent(`Order: ${p.name}`);
        const lines = [];
        lines.push(`ORDER DETAILS`);
        lines.push(`================`);
        lines.push(``);
        lines.push(`Product: ${p.name}`);
        lines.push(`Unit Price: $${p.price}`);
        lines.push(`Quantity: ${this.form.quantity}`);
        lines.push(`Total: $${total}`);
        lines.push(``);
        lines.push(`CUSTOMER INFORMATION`);
        lines.push(`================`);
        lines.push(`Parent: ${this.form.parentName}`);
        lines.push(`Contact: ${this.form.contact}`);
        lines.push(`Student: ${this.form.studentName || '[not provided]'}`);
        lines.push(`Grade: ${this.form.grade || '[not provided]'}`);
        lines.push(`Color Preference: ${this.form.color || '[not provided]'}`);
        if (this.form.notes) {
          lines.push(``);
          lines.push(`NOTES`);
          lines.push(`================`);
          lines.push(this.form.notes);
        }
        const body = encodeURIComponent(lines.join('\n'));
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
        
        this.$q.notify({ 
          color: 'positive', 
          message: 'Email client opened. Please send the email.', 
          icon: 'check_circle',
          position: 'top'
        });
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
    },
    downloadSummary() {
      if (!this.form.productId) { 
        this.$q.notify({ 
          color: 'negative', 
          message: 'Please select a product', 
          icon: 'error',
          position: 'top'
        }); 
        return; 
      }
      const p = this.selectedProduct;
      const total = (p.price * this.form.quantity).toFixed(2);
      const content = [];
      content.push(`ORDER SUMMARY`);
      content.push(`================`);
      content.push(`Date: ${new Date().toLocaleString()}`);
      content.push(``);
      content.push(`Product: ${p.name}`);
      content.push(`Unit Price: $${p.price}`);
      content.push(`Quantity: ${this.form.quantity}`);
      content.push(`Total: $${total}`);
      content.push(``);
      content.push(`CUSTOMER INFORMATION`);
      content.push(`================`);
      content.push(`Parent: ${this.form.parentName}`);
      content.push(`Contact: ${this.form.contact}`);
      content.push(`Student: ${this.form.studentName || '[not provided]'}`);
      content.push(`Grade: ${this.form.grade || '[not provided]'}`);
      content.push(`Color Preference: ${this.form.color || '[not provided]'}`);
      if (this.form.notes) {
        content.push(``);
        content.push(`NOTES`);
        content.push(`================`);
        content.push(this.form.notes);
      }

      const blob = new Blob([content.join('\n')], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `order-${p.name.replace(/\s+/g,'_')}-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      
      this.$q.notify({ 
        color: 'positive', 
        message: 'Order summary downloaded successfully', 
        icon: 'download_done',
        position: 'top'
      });
    }
  }
};

export default OrderPage;