// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import AnalyticsPage from './components/AnalyticsPage.vue';

const routes = [
  { path: '/', component: HomePage, name: 'Home' },
  { path: '/analytics', component: AnalyticsPage, name: 'Analytics', props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
