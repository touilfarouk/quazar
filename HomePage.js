import products from './productsData.js';
import ProductDialog from './ProductDialog.js';

const HomePage = {
  components: {
    ProductDialog
  },
  template: `
    <q-page>
      <div class="page-inner">
        <!-- Top intro removed so carousel can occupy the full viewport -->

        <!-- Home carousel (placeholder images) -->
        <div class="home-carousel q-mb-xl">
          <q-carousel v-model="slide" animated swipeable control-type="flat" autoplay="4000" height="320">
            <q-carousel-slide v-for="(src, index) in slides" :name="index.toString()" :key="index" :img-src="src">
              <div class="slide-caption text-white">
                <div class="text-h6">Handmade & Cozy</div>
                <div class="text-subtitle2">Fundraiser by Glen Forest — December to January</div>
              </div>
            </q-carousel-slide>
          </q-carousel>

          <!-- Hero overlay (from provided template) -->
          <div class="hero-overlay container">
          </div>

          <div class="carousel-dots row justify-center q-mt-sm" ref="dotsContainer">
            <div
              v-for="(src, index) in slides"
              :key="'dot-'+index"
              class="dot"
              :class="{ active: Number(slide) === index }"
              @click="slide = index.toString()"
              @mouseenter="onDotEnter(index, $event)"
              @mouseleave="onDotLeave"
            ></div>

            <div v-if="hoverIndex !== null" class="dot-preview" :style="{ left: previewX + 'px' }">
              <q-img :src="slides[hoverIndex]" class="dot-thumb" ratio="16/10" />
            </div>
          </div>
        </div>

        
        <div class="row q-col-gutter-lg q-mb-xl">
          <div class="col-12">
            <div class="products-grid" id="home-products">
              <q-card v-for="p in products" :key="p.id" class="product-card">
                <div v-if="p.badge" class="product-badge">{{ p.badge }}</div>
                <q-btn round dense flat icon="favorite_border" class="product-fav" @click.stop="toggleFavorite(p)" :class="{ 'text-negative': isFavorite(p) }" />
                <img :src="p.img" :alt="p.name" class="product-image" style="padding: 5px;" />
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
          </div>
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
      // products list
      products,
      dialogOpen: false,
      selectedProduct: null,

      // carousel (picsum.photos seeded placeholders)
      slides: [
        'img/slide1.png',
        'img/slide2.png',
        'img/slide3.png',
        'img/slider4.png'
      ],
      slide: '0',
      // hover thumbnail
      hoverIndex: null,
      previewX: 0,
      favorites: []
    }
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
    toggleFavorite(p) {
      p._fav = !p._fav;
    },
    isFavorite(p) { return !!p._fav; },
    onDotEnter(index, event) {
      this.hoverIndex = index;
      const container = this.$refs.dotsContainer;
      if (container && event.currentTarget) {
        const containerRect = container.getBoundingClientRect();
        const dotRect = event.currentTarget.getBoundingClientRect();
        this.previewX = dotRect.left - containerRect.left + dotRect.width / 2;
      }
    },
    onDotLeave() {
      this.hoverIndex = null;
    },
    scrollToProducts() {
      const el = document.getElementById('home-products');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
};

export default HomePage;