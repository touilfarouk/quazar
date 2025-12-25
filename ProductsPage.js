import products from './productsData.js';

const ProductsPage = {
  template: `
    <q-page padding class="products-page">
      <div class="q-pa-md">
        <div class="products-hero text-center q-mb-lg hero-bg">
          <q-img src="img/brouwn.png" ratio="16/6" class="hero-image">
            <div class="hero-inner">
              <h2 class="text-h4 text-weight-bold" style="color: white; text-shadow: 0 2px 6px rgba(0,0,0,0.6)">Cozy for a cause</h2>
              <p class="text-subtitle1" style="color: rgba(255,255,255,0.95); text-shadow: 0 1px 4px rgba(0,0,0,0.5)">Crocheted hats and accessories — handmade. Available December to January. Fundraiser by Glen Forest.</p>
              <div class="q-mt-md">
                <q-btn color="white" text-color="primary" label="Voir les produits" @click="$router.push('/products')" class="btn-primary-hero" />
              </div>
            </div>
          </q-img>
        </div>

        <div class="products-grid">
          <q-card v-for="p in products" :key="p.id" class="product-card">
            <q-img :src="p.img" :alt="p.name" class="product-image" ratio="16/10" />
            <q-card-section class="product-body">
              <div class="product-title">{{ p.name }}</div>
              <div class="text-caption q-mt-xs">{{ p.description }}</div>
              <div class="row items-center q-mt-sm justify-between">
                <div class="product-price">{{ formatPrice(p.price) }}</div>
                <div>
                  <q-btn dense flat color="primary" label="Voir" @click="openDetails(p)" />
                  <q-btn dense color="secondary" label="Commander" @click="openDetails(p)" class="q-ml-sm" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Product Details / Order Dialog -->
        <q-dialog v-model="dialogOpen" persistent>
          <q-card style="min-width: 320px; max-width: 560px;">
            <q-card-section class="row items-start">
              <div style="flex: 1 1 40%;">
                <q-img :src="selectedProduct?.img" ratio="1" class="q-mr-md" />
              </div>
              <div style="flex: 1 1 60%;">
                <div class="text-h6">{{ selectedProduct?.name }}</div>
                <div class="text-caption q-mt-xs">{{ selectedProduct?.description }}</div>
                <div class="product-price q-mt-md">{{ formatPrice(selectedProduct?.price || '') }}</div>

                <div class="q-mt-md">
                  <q-input dense v-model="order.parentName" label="Parent Name" />
                  <q-input dense v-model="order.contact" label="Email or Phone" class="q-mt-sm" />
                  <q-input dense v-model="order.studentName" label="Student's Name" class="q-mt-sm" />
                  <q-input dense v-model="order.grade" label="Grade" class="q-mt-sm" />
                  <q-input dense v-model="order.color" label="Color Preference" class="q-mt-sm" />
                </div>
              </div>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Fermer" color="primary" v-close-popup @click="closeDialog" />
              <q-btn color="primary" label="Envoyer la commande" @click="sendOrderEmail" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </q-page>
  `,
  data() {
    return {
      products,
      dialogOpen: false,
      selectedProduct: null,
      order: {
        parentName: '',
        contact: '',
        studentName: '',
        grade: '',
        color: ''
      }
    };
  },
  methods: {
    formatPrice(p) { return p ? `$${p}` : ''; },
    openDetails(p) {
      this.selectedProduct = p;
      // reset order fields
      this.order = { parentName: '', contact: '', studentName: '', grade: '', color: '' };
      this.dialogOpen = true;
    },
    closeDialog() {
      this.dialogOpen = false;
      this.selectedProduct = null;
    },
    sendOrderEmail() {
      if (!this.selectedProduct) return;
      const subject = encodeURIComponent(`Commande: ${this.selectedProduct.name}`);
      const bodyLines = [];
      bodyLines.push(`Produit: ${this.selectedProduct.name}`);
      bodyLines.push(`Prix: $${this.selectedProduct.price}`);
      bodyLines.push(`Parent: ${this.order.parentName || '[non fourni]'}`);
      bodyLines.push(`Contact: ${this.order.contact || '[non fourni]'}`);
      bodyLines.push(`Étudiant: ${this.order.studentName || '[non fourni]'}`);
      bodyLines.push(`Grade: ${this.order.grade || '[non fourni]'}`);
      bodyLines.push(`Couleur: ${this.order.color || '[non fourni]'}`);
      const body = encodeURIComponent(bodyLines.join("\n"));
      const mailto = `mailto:?subject=${subject}&body=${body}`;
      window.location.href = mailto;
      this.closeDialog();
    }
  }
};

export default ProductsPage;
