<!-- src/components/LoginPage.vue -->
<template>
    <div class="login-page">
      <h2>Вход</h2>
      <form @submit.prevent="login">
        <label>
          Логин:
          <input type="text" v-model="username" required />
        </label>
        <label>
          Пароль:
          <input type="password" v-model="password" required />
        </label>
        <button type="submit">Войти</button>
        <p v-if="error" class="error-message">{{ error }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '../stores/UserStore';
  
  export default {
    name: 'LoginPage',
    setup() {
      const userStore = useUserStore();
      const router = useRouter();
      const username = ref('');
      const password = ref('');
      const error = ref('');
  
      const login = () => {
        const success = userStore.login(username.value, password.value);
        if (success) {
          router.push('/'); // Перенаправляем на главную страницу после входа
        } else {
          error.value = 'Неверный логин или пароль';
        }
      };
  
      return {
        username,
        password,
        error,
        login,
      };
    },
  };
  </script>
  
  <style scoped>
  .login-page {
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }
  
  .login-page h2 {
    text-align: center;
    color: #333;
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-bottom: 10px;
  }
  
  input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  button {
    padding: 10px;
    background-color: #42a5f5;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #1e88e5;
  }
  
  .error-message {
    color: red;
    font-size: 0.9em;
    text-align: center;
    margin-top: 10px;
  }
  </style>
  