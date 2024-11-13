<!-- src/App.vue -->
<template>
  <div>
    <nav>
      <ul>
        <li><router-link to="/">Главная</router-link></li>
        <li v-if="user === 'admin'"><router-link to="/analytics">Аналитика</router-link></li>
        <li v-if="!user"><router-link to="/login">Вход</router-link></li>
        <li v-if="user" @click="logout" class="logout-button">Выйти</li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { computed } from 'vue';
import { useUserStore } from './stores/UserStore';

export default {
  setup() {
    const userStore = useUserStore();
    const user = computed(() => userStore.user);

    const logout = () => {
      userStore.logout();
    };

    return {
      user,
      logout,
    };
  },
};
</script>

<style scoped>
nav ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  gap: 10px;
}

nav ul li {
  display: inline;
}

.logout-button {
  cursor: pointer;
  color: red;
}
</style>
