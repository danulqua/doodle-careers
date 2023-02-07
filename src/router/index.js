import { createRouter, createWebHashHistory } from 'vue-router';

import HomePage from '@/pages/HomePage.vue';
import JobsResultsPage from '@/pages/JobsResultsPage.vue';
import JobDetails from '@/pages/JobDetails.vue';

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
  {
    path: '/jobs/results/:id',
    name: 'JobDetails',
    component: JobDetails,
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return {
      top: 0,
      left: 0,
      behavior: 'smooth',
    };
  },
});
