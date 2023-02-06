import { createRouter, createWebHashHistory } from 'vue-router';

import HomePage from '@/pages/HomePage.vue';
import JobsResultsPage from '@/pages/JobsResultsPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/jobs/results',
    name: 'JobsResults',
    component: JobsResultsPage,
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
