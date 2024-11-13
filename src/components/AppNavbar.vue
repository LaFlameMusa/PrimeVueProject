
<!-- src/components/AppNavbar.vue -->
<template>
  <nav>
    <ul>
      <li><router-link to="/">Главная</router-link></li>
      <li><router-link to="/analytics">Аналитика</router-link></li>
    </ul>
  </nav>
</template>


<script>
export default {
  name: 'AppNavbar', // Изменили имя компонента
};
</script>

<style scoped>
nav ul {
  list-style-type: none;
  padding: 0;
 
}
nav ul li {
  display: inline;
  margin-right: 10px;
}
</style>
