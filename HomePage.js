// HomePage Component
const HomePage = {
  template: `
    <q-page padding>
      <div class="q-pa-md">
        <div class="text-center q-mb-xl">
          <h1 class="text-h3 text-weight-bold text-primary q-mb-md">Bienvenue sur Mon App Quasar</h1>
          <p class="text-h6 text-grey-8">Découvrez notre plateforme innovante</p>
        </div>
        <div class="row q-col-gutter-lg">
          <div class="col-12 col-md-4" v-for="n in 3" :key="n">
            <q-card class="my-card">
              <q-card-section>
                <div class="text-h6">Fonctionnalité {{ n }}</div>
                <q-separator class="q-my-sm" />
                <div class="text-body1">
                  Description de la fonctionnalité {{ n }} avec des détails intéressants.
                </div>
              </q-card-section>
              <q-card-actions>
                <q-btn flat color="primary" label="En savoir plus" />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </q-page>
  `
};

export default HomePage;