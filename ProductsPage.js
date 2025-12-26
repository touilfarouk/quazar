import products from './productsData.js';
import ProductDialog from './ProductDialog.js';

const ProductsPage = {
  components: {
    ProductDialog
  },
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
        <product-dialog 
          v-model="dialogOpen" 
          :product="selectedProduct"
          @order-sent="handleOrderSent"
        />
      </div>
    </q-page>
  `,
  data() {
    return {
      products,
      dialogOpen: false,
      selectedProduct: null
    };
  },
  methods: {
    formatPrice(p) { return p ? `$${p}` : ''; },
    openDetails(p) {
      this.selectedProduct = p;
      this.dialogOpen = true;
    },
    handleOrderSent(orderData) {
      this.$q.notify({
        color: 'positive',
        message: `Order placed for ${orderData.product.name}`,
        icon: 'check_circle',
        position: 'top'
      });
    },
    toggleFavorite(p) { p._fav = !p._fav; },
    isFavorite(p) { return !!p._fav; }
  }
};

export default ProductsPage;