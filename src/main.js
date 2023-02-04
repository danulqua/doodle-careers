import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

library.add(faSearch);

import '@/index.css';
import App from '@/App.vue';

const app = createApp(App);

app.component('fa-icon', FontAwesomeIcon);

app.mount('#app');
