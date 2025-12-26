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