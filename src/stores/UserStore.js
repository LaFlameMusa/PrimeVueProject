// src/stores/userStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('userStore', () => {
  const user = ref(null); // Статус пользователя: null, 'admin', 'client'

  const login = (username, password) => {
    if (username === 'admin' && password === 'admin') {
      user.value = 'admin';
      return true;
    } else if (username === '123' && password === '123') {
      user.value = 'client';
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    user.value = null;
  };

  return {
    user,
    login,
    logout,
  };
});
