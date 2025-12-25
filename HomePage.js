const HomePage = {
  template: `
    <q-page padding>
      <div class="q-pa-md">
        <div class="text-center q-mb-xl">
          <h1 class="text-h3 text-weight-bold text-primary q-mb-md">Bienvenue sur Mon App Quasar</h1>
          <p class="text-h6 text-grey-8">Découvrez nos composants de calendrier</p>
        </div>
        
        <div class="row q-col-gutter-lg q-mb-xl">
          <!-- Date Picker -->
          <div class="col-12 col-md-6">
            <q-card class="my-card">
              <q-card-section>
                <div class="text-h6">Sélecteur de date</div>
                <q-separator class="q-my-sm" />
                <div class="q-pa-md">
                  <div class="q-gutter-md" style="max-width: 300px">
                    <q-input
                      filled
                      v-model="date"
                      label="Choisir une date"
                    >
                      <template v-slot:prepend>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="date" mask="YYYY/MM/DD">
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Fermer" color="primary" flat />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>

          <!-- Time Picker -->
          <div class="col-12 col-md-6">
            <q-card class="my-card">
              <q-card-section>
                <div class="text-h6">Sélecteur d'heure</div>
                <q-separator class="q-my-sm" />
                <div class="q-pa-md">
                  <div class="q-gutter-md" style="max-width: 300px">
                    <q-input
                      filled
                      v-model="time"
                      label="Choisir une heure"
                    >
                      <template v-slot:prepend>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time v-model="time" mask="HH:mm">
                              <div class="row items-center justify-end q-gutter-sm">
                                <q-btn label="Maintenant" color="primary" flat @click="setCurrentTime" />
                                <q-btn v-close-popup label="Fermer" color="primary" flat />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>

          <!-- Combined Date & Time Picker -->
          <div class="col-12">
            <q-card class="my-card">
              <q-card-section>
                <div class="text-h6">Sélecteur de date et heure</div>
                <q-separator class="q-my-sm" />
                <div class="q-pa-md">
                  <div class="row q-gutter-md">
                    <div class="col-12 col-md-4">
                      <q-input
                        filled
                        v-model="dateTime.date"
                        label="Date et heure"
                        class="q-mb-md"
                      >
                        <template v-slot:prepend>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                              <q-date v-model="dateTime.date" mask="YYYY/MM/DD" :options="futureDatesOnly">
                                <div class="row items-center justify-end">
                                  <q-btn v-close-popup label="Fermer" color="primary" flat />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                        <template v-slot:append>
                          <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale" @before-show="updateProxy">
                              <q-time v-model="proxyDate" mask="YYYY/MM/DD HH:mm" format24h>
                                <div class="row items-center justify-end q-gutter-sm">
                                  <q-btn label="Maintenant" color="primary" flat @click="setDateTimeNow" />
                                  <q-btn v-close-popup label="Fermer" color="primary" flat />
                                </div>
                              </q-time>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                  </div>
                  <div class="text-body2 q-mt-sm">
                    <p>Date sélectionnée: {{ formattedDateTime }}</p>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </q-page>
  `,
  data() {
    return {
      date: '',
      time: '',
      dateTime: {
        date: '',
        time: ''
      },
      proxyDate: ''
    }
  },
  computed: {
    formattedDateTime() {
      if (!this.dateTime.date) return 'Aucune date sélectionnée';
      const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      return new Date(this.dateTime.date + ' ' + (this.dateTime.time || '00:00')).toLocaleDateString('fr-FR', options);
    }
  },
  methods: {
    setCurrentTime() {
      const now = new Date();
      this.time = now.getHours().toString().padStart(2, '0') + ':' + 
                 now.getMinutes().toString().padStart(2, '0');
    },
    updateProxy() {
      this.proxyDate = this.dateTime.date + ' ' + (this.dateTime.time || '00:00');
    },
    setDateTimeNow() {
      const now = new Date();
      this.dateTime.date = now.toISOString().split('T')[0].replace(/-/g, '/');
      this.dateTime.time = now.getHours().toString().padStart(2, '0') + ':' + 
                          now.getMinutes().toString().padStart(2, '0');
      this.proxyDate = this.dateTime.date + ' ' + this.dateTime.time;
    },
    futureDatesOnly(date) {
      return date >= new Date().toISOString().split('T')[0].replace(/-/g, '/');
    }
  },
  watch: {
    proxyDate(val) {
      const [date, time] = val.split(' ');
      this.dateTime.date = date;
      this.dateTime.time = time || '00:00';
    }
  }
};

export default HomePage;