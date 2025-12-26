import products from './productsData.js';

const OrderPage = {
  template: `
    <q-page padding>
      <div class="q-pa-md" style="max-width: 900px; margin: 0 auto;">
        <q-card>
          <q-card-section>
            <div class="text-h5 text-weight-bold">Passer une commande</div>
            <div class="text-caption q-mt-sm">Remplissez le formulaire ci-dessous et envoyez la commande par email.</div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <div class="order-form">
              <q-input dense v-model="form.parentName" label="Parent Name" :rules="[ val => !!val || 'Requis' ]" />
              <q-input dense v-model="form.contact" label="Email or Phone" type="email" :rules="[ val => !!val || 'Requis' ]" class="q-mt-sm" />
              <q-input dense v-model="form.studentName" label="Student's Name" class="q-mt-sm" />
              <q-input dense v-model="form.grade" label="Grade" class="q-mt-sm" />

              <q-select dense v-model="form.productId" :options="productOptions" label="Produit" emit-value map-options class="q-mt-sm" :rules="[ val => !!val || 'Choisissez un produit' ]" />

              <div class="row q-gutter-sm q-mt-sm items-center">
                <div style="flex: 1">
                  <q-input dense v-model.number="form.quantity" type="number" label="Quantité" min="1" />
                </div>
                <div style="flex: 1">
                  <q-input dense v-model="form.color" label="Color Preference" />
                </div>
              </div>

              <q-input dense type="textarea" v-model="form.notes" label="Notes / Commentaires" class="q-mt-sm" />

              <div class="row q-mt-md">
                <q-btn label="Envoyer par email" color="primary" @click="submitOrder" />
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
      }
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
        this.$q.notify({ color: 'negative', message: 'Veuillez remplir les champs obligatoires', icon: 'error' });
        return false;
      }
      return true;
    },
    submitOrder() {
      if (!this.validate()) return;
      const p = this.selectedProduct;
      const subject = encodeURIComponent(`Commande: ${p.name}`);
      const lines = [];
      lines.push(`Produit: ${p.name}`);
      lines.push(`Prix: $${p.price}`);
      lines.push(`Quantité: ${this.form.quantity}`);
      lines.push(`Parent: ${this.form.parentName}`);
      lines.push(`Contact: ${this.form.contact}`);
      lines.push(`Étudiant: ${this.form.studentName || '[non fourni]'}`);
      lines.push(`Grade: ${this.form.grade || '[non fourni]'}`);
      lines.push(`Couleur: ${this.form.color || '[non fourni]'}`);
      if (this.form.notes) lines.push('Notes: ' + this.form.notes);
      const body = encodeURIComponent(lines.join('\n'));
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    },
    downloadSummary() {
      if (!this.form.productId) { this.$q.notify({ color: 'negative', message: 'Veuillez choisir un produit', icon: 'error' }); return; }
      const p = this.selectedProduct;
      const content = [];
      content.push(`Commande - ${new Date().toLocaleString()}`);
      content.push(`Produit: ${p.name}`);
      content.push(`Prix: $${p.price}`);
      content.push(`Quantité: ${this.form.quantity}`);
      content.push(`Parent: ${this.form.parentName}`);
      content.push(`Contact: ${this.form.contact}`);
      content.push(`Étudiant: ${this.form.studentName || '[non fourni]'}`);
      content.push(`Grade: ${this.form.grade || '[non fourni]'}`);
      content.push(`Couleur: ${this.form.color || '[non fourni]'}`);
      if (this.form.notes) content.push('Notes: ' + this.form.notes);

      const blob = new Blob([content.join('\n')], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `commande-${p.name.replace(/\s+/g,'_')}.txt`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }
  }
};

export default OrderPage;
