import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faSearch,
  faAngleDown,
  faAngleUp,
} from '@fortawesome/free-solid-svg-icons';

import '@/index.css';
import router from '@/router';
import App from '@/App.vue';

library.add(faSearch);
library.add(faAngleDown);
library.add(faAngleUp);

const pinia = createPinia();

const app = createApp(App);

app.use(pinia);
app.use(router);
app.component('fa-icon', FontAwesomeIcon);

app.mount('#app');
