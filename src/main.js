// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import { createPinia } from 'pinia';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

const app = createApp(App);
app.use(router);
app.use(createPinia());  // Подключаем Pinia
app.use(PrimeVue);
app.mount('#app');
