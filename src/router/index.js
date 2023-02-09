import { createRouter, createWebHashHistory } from 'vue-router';

import HomePage from '@/pages/HomePage.vue';
import JobsResultsPage from '@/pages/JobsResultsPage.vue';
import JobDetails from '@/pages/JobDetailsPage.vue';
import TeamsPage from '@/pages/TeamsPage.vue';

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
  {
    path: '/teams',
    name: 'JobDetails',
    component: TeamsPage,
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
