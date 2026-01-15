// AboutPage Component
const AboutPage = {
  template: `
    <q-page padding>
      <div class="q-pa-md" style="max-width: 1200px; margin: 0 auto;">
        <div class="text-center q-mb-xl">
          <h1 class="text-h3 text-weight-bold text-primary q-mb-md">About Glen Forest PTO</h1>
          <p class="text-h6 text-grey-8">Discover our mission and community reach</p>
        </div>

        <!-- About Content -->
        <div class="row q-col-gutter-lg q-mb-xl">
          <div class="col-12 col-md-6">
            <q-card flat bordered style="border-radius: 12px;">
              <q-card-section>
                <div class="text-h5 text-weight-medium q-mb-md">Our Mission</div>
                <p class="text-body1 text-grey-8" style="line-height: 1.8;">
                  Glen Forest PTO is dedicated to supporting our school community through 
                  fundraising initiatives and community engagement. Our handmade crocheted 
                  products bring warmth and comfort while raising funds for educational programs.
                </p>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-12 col-md-6">
            <q-card flat bordered style="border-radius: 12px;">
              <q-card-section>
                <div class="text-h5 text-weight-medium q-mb-md">What We Do</div>
                <p class="text-body1 text-grey-8" style="line-height: 1.8;">
                  We create beautiful, handmade crocheted hats and accessories available 
                  from December to January. Every purchase supports Glen Forest students 
                  and helps fund important school programs and activities.
                </p>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <!-- Stats Section -->
        <div class="row q-col-gutter-md q-mt-lg">
          <div class="col-12 col-sm-4">
            <q-card flat class="text-center q-pa-md" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
              <div class="text-h3 text-weight-bold text-white">50+</div>
              <div class="text-subtitle1 text-white">Locations</div>
            </q-card>
          </div>
          <div class="col-12 col-sm-4">
            <q-card flat class="text-center q-pa-md" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
              <div class="text-h3 text-weight-bold text-white">1000+</div>
              <div class="text-subtitle1 text-white">Products Sold</div>
            </q-card>
          </div>
          <div class="col-12 col-sm-4">
            <q-card flat class="text-center q-pa-md" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
              <div class="text-h3 text-weight-bold text-white">$50K+</div>
              <div class="text-subtitle1 text-white">Funds Raised</div>
            </q-card>
          </div>
        </div>

        <div class="text-center q-mt-xl">
          <q-btn color="primary" label="Back to Home" to="/" size="lg" class="q-px-xl" />
        </div>
      </div>
    </q-page>
  `,
  methods: {
  }
};

export default AboutPage;