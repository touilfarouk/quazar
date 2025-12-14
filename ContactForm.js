const ContactForm = {
  template: `
    <q-card class="q-pa-md" style="width: 420px">
      <q-card-section>
        <div class="text-h6">Contact Us</div>
        <div class="text-caption text-grey">
          We'd love to hear from you
        </div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="submitForm" class="q-gutter-md">
          <!-- Name Input -->
          <q-input
            outlined
            v-model="form.name"
            label="Your Name *"
            hint="Enter your full name"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type your name']"
          />

          <!-- Email Input -->
          <q-input
            outlined
            type="email"
            v-model="form.email"
            label="Email *"
            hint="Enter your email address"
            lazy-rules
            :rules="[
              val => val && val.length > 0 || 'Please type your email',
              val => val && val.includes('@') || 'Please enter a valid email'
            ]"
          />

          <!-- Subject Input -->
          <q-input
            outlined
            v-model="form.subject"
            label="Subject *"
            hint="What is this about?"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Please enter a subject']"
          />

          <!-- Message Textarea -->
          <q-input
            outlined
            type="textarea"
            v-model="form.message"
            label="Message *"
            hint="Tell us more..."
            rows="4"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Please enter your message']"
          />

          <!-- Action Buttons -->
          <div class="row q-mt-md">
            <q-btn
              label="Send Message"
              type="submit"
              color="primary"
              :loading="submitting"
            />
            <q-btn
              label="Clear"
              type="button"
              color="negative"
              flat
              class="q-ml-sm"
              @click="clearForm"
            />
          </div>
        </q-form>
      </q-card-section>

      <!-- Success Notification -->
      <q-dialog v-model="showSuccess">
        <q-card>
          <q-card-section>
            <div class="text-h6">Message Sent!</div>
          </q-card-section>
          <q-card-section>
            Thank you for contacting us. We'll get back to you soon!
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-card>
  `,
  setup() {
    const form = window.Vue.ref({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    const submitting = window.Vue.ref(false);
    const showSuccess = window.Vue.ref(false);

    const submitForm = async () => {
      submitting.value = true;
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', form.value);
      
      submitting.value = false;
      showSuccess.value = true;
      clearForm();
    };

    const clearForm = () => {
      form.value = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };
    };

    return {
      form,
      submitting,
      showSuccess,
      submitForm,
      clearForm
    };
  }
};
