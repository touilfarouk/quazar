// AboutPage Component
const AboutPage = {
  template: `
    <q-page padding>
      <div class="q-pa-md">
        <div class="text-center q-mb-xl">
          <h1 class="text-h3 text-weight-bold text-primary q-mb-md">À propos de nous</h1>
          <p class="text-h6 text-grey-8">Découvrez notre équipe et notre mission</p>
        </div>
        <div class="text-center">
          <p class="text-body1 q-mb-lg">
            Nous sommes une équipe passionnée qui construit des applications incroyables avec Quasar Framework.
          </p>
          <q-btn color="primary" label="Retour à l'accueil" to="/" />
        </div>
      </div>
    </q-page>
  `
};

export default AboutPage;