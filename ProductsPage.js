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
            <div v-if="p.badge" class="product-badge">{{ p.badge }}</div>
            <q-btn round dense flat icon="favorite_border" class="product-fav" @click.stop="toggleFavorite(p)" :class="{ 'text-negative': isFavorite(p) }" />
            <q-img :src="p.img" :alt="p.name" class="product-image" ratio="16/10" style="padding: 5px;" />
            <q-card-section class="product-info">
              <div>
                <div class="product-name">{{ p.name }}</div>
                <div class="product-description">{{ p.description }}</div>
                <div class="product-meta">
                  <div class="stars">
                    <span v-for="n in Math.round(p.rating || 0)" :key="n">★</span>
                    <span v-for="n in (5 - Math.round(p.rating || 0))" :key="'e'+n">☆</span>
                  </div>
                  <div class="rating-count">{{ p.rating ? p.rating.toFixed(1) : '' }}</div>
                </div>
              </div>
              <div class="row items-center q-mt-sm justify-between">
                <div class="product-price">{{ formatPrice(p.price) }}</div>
                <div style="min-width: 140px;">
                  <q-btn dense flat color="primary" label="Voir" @click="openDetails(p)" />
                  <q-btn dense color="primary" label="Commander" @click="openDetails(p)" class="btn-add-cart q-ml-sm" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Product Details / Order Dialog -->
        <q-dialog v-model="dialogOpen" persistent transition-show="scale" transition-hide="scale">
          <q-card style="min-width: 380px; max-width: 650px; border-radius: 12px;">
            <!-- Close button -->
            <q-btn
              flat
              round
              dense
              icon="close"
              class="absolute-top-right q-ma-sm"
              style="z-index: 10;"
              @click="closeDialog"
            />

            <!-- Product Image Section -->
            <q-card-section class="q-pa-md" style="background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);">
              <div class="row justify-center">
                <q-img 
                  :src="selectedProduct?.img" 
                  ratio="1" 
                  class="dialog-product-img" 
                  style="object-fit: cover; object-position: 50% 50%; padding: 12px; border-radius: 12px; background: white; box-shadow: 0 4px 12px rgba(0,0,0,0.1); max-width: 280px;"
                />
              </div>
            </q-card-section>

            <!-- Product Info Section -->
            <q-card-section class="q-pa-lg">
              <div class="text-h5 text-weight-bold q-mb-xs" style="color: #1a202c;">
                {{ selectedProduct?.name }}
              </div>
              
              <div v-if="selectedProduct?.badge" class="q-mb-sm">
                <q-badge color="primary" :label="selectedProduct.badge" />
              </div>

              <div class="text-body2 text-grey-7 q-mb-md" style="line-height: 1.6;">
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
                    <span style="color: #fbbf24; font-size: 18px;">★</span>
                  </div>
                </div>
              </div>

              <!-- Order Form -->
              <div class="q-pa-md" style="background: #f9fafb; border-radius: 8px;">
                <div class="text-subtitle1 text-weight-medium q-mb-md" style="color: #374151;">
                  Order Information
                </div>

                <div class="q-gutter-md">
                  <q-input 
                    outlined 
                    v-model="order.parentName" 
                    label="Parent Name *" 
                    dense
                    :rules="[val => !!val || 'Required field']"
                  >
                    <template v-slot:prepend>
                      <q-icon name="person" />
                    </template>
                  </q-input>

                  <q-input 
                    outlined 
                    v-model="order.contact" 
                    label="Email or Phone *" 
                    dense
                    :rules="[val => !!val || 'Required field']"
                  >
                    <template v-slot:prepend>
                      <q-icon name="contact_mail" />
                    </template>
                  </q-input>

                  <q-input 
                    outlined 
                    v-model="order.studentName" 
                    label="Student's Name *" 
                    dense
                    :rules="[val => !!val || 'Required field']"
                  >
                    <template v-slot:prepend>
                      <q-icon name="school" />
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
                          <q-icon name="grade" />
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
                          <q-icon name="palette" />
                        </template>
                      </q-input>
                    </div>
                  </div>
                </div>
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
                label="Send Order" 
                color="primary" 
                @click="sendOrderEmail"
                class="q-px-lg"
                icon-right="send"
              />
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
    },
    toggleFavorite(p) { p._fav = !p._fav; },
    isFavorite(p) { return !!p._fav; }
  }
};

export default ProductsPage;