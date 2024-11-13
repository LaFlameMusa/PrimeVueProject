// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from './stores/UserStore';
import HomePage from './components/HomePage.vue';
import AnalyticsPage from './components/AnalyticsPage.vue';
import LoginPage from './components/LoginPage.vue';

const routes = [
  { path: '/', component: HomePage, name: 'Home' },
  { path: '/analytics', component: AnalyticsPage, name: 'Analytics', meta: { requiresAdmin: true } },
  { path: '/login', component: LoginPage, name: 'Login' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Проверка прав доступа перед каждым переходом на маршрут
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.meta.requiresAdmin && userStore.user !== 'admin') {
    next('/login'); // Перенаправляем на вход, если нет прав
  } else {
    next();
  }
});

export default router;
