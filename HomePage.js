import products from './productsData.js';

const HomePage = {
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

        <!-- Feature Cards -->
        <div class="feature-cards-container q-mb-xl">
          <div class="row q-col-gutter-lg">
            <div class="col-12 col-md-4">
              <div class="feature-card gradient-1">
                <div class="feature-icon">
                  <i class="fas fa-shipping-fast"></i>
                </div>
                <div class="feature-content">
                  <h4>{{ $t('home.features.fastDelivery.title') }}</h4>
                  <p>{{ $t('home.features.fastDelivery.description') }}</p>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-4">
              <div class="feature-card gradient-2">
                <div class="feature-icon">
                  <i class="fas fa-shield-alt"></i>
                </div>
                <div class="feature-content">
                  <h4>{{ $t('home.features.quality.title') }}</h4>
                  <p>{{ $t('home.features.quality.description') }}</p>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-4">
              <div class="feature-card gradient-3">
                <div class="feature-icon">
                  <i class="fas fa-headset"></i>
                </div>
                <div class="feature-content">
                  <h4>{{ $t('home.features.support.title') }}</h4>
                  <p>{{ $t('home.features.support.description') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="row q-col-gutter-lg q-mb-xl">
          <div class="col-12">
            <div class="products-grid" id="home-products">
              <q-card v-for="p in products" :key="p.id" class="product-card">
                <div v-if="p.badge" class="product-badge">{{ p.badge }}</div>
                <q-btn round dense flat icon="favorite_border" class="product-fav" @click.stop="toggleFavorite(p)" :class="{ 'text-negative': isFavorite(p) }" />
                <img :src="p.img" :alt="p.name" class="product-image" />
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
      // products list
      products,
      dialogOpen: false,
      selectedProduct: null,
      order: {
        parentName: '',
        contact: '',
        studentName: '',
        grade: '',
        color: ''
      },

      // carousel (picsum.photos seeded placeholders)
      slides: [
        'https://picsum.photos/seed/cozy/1200/480',
        'https://picsum.photos/seed/handmade/1200/480',
        'https://picsum.photos/seed/fundraiser/1200/480'
      ],
      slide: '0',
      // hover thumbnail
      hoverIndex: null,
      previewX: 0
    }
  },
  methods: {
    formatPrice(p) { return p ? `$${p}` : ''; },
    openDetails(p) {
      this.selectedProduct = p;
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