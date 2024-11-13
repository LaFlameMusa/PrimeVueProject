<!-- src/components/HomePage.vue -->
<template>
  <div class="home-page">
    <h2>Список товаров</h2>
    <div class="actions" v-if="isAdmin">
      <button class="add-button" @click="openAddProduct">Добавить товар</button>
      <button class="analytics-button" @click="goToAnalytics">Посмотреть аналитику</button>
    </div>

    <div v-if="products.length" class="product-list">
      <div v-for="product in products" :key="product.id" class="product-card">
        <div class="product-card-content">
          <h3>{{ product.name }}</h3>
          <p class="product-description">{{ product.description }}</p>
          <p class="product-type">Тип товара: <strong>{{ product.type }}</strong></p>
          <p class="product-price">Цена: <strong>{{ product.price }} ₽</strong></p>
        </div>
        <div class="product-card-actions" v-if="isAdmin">
          <button class="edit-button" @click="editProduct(product)">Редактировать</button>
          <button class="delete-button" @click="deleteProduct(product.id)">Удалить</button>
        </div>
        <div class="product-interactions">
          <button class="buy-button" @click="buyProduct(product.id)">Купить</button>
          <button class="like-button" @click="likeProduct(product.id)">Нравится</button>
          <button class="dislike-button" @click="dislikeProduct(product.id)">Не нравится</button>
        </div>
      </div>
    </div>
    
    <p v-else>Товаров пока нет.</p>

    <ProductForm v-if="showForm" :product="currentProduct" @save="saveProduct" @close="closeForm" />
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useProductStore } from '../stores/ProductStore';
import { useUserStore } from '../stores/UserStore';
import ProductForm from './ProductForm.vue';

export default {
  name: 'HomePage',
  components: { ProductForm },
  setup() {
    const productStore = useProductStore();
    const userStore = useUserStore();
    const router = useRouter();
    const showForm = ref(false);
    const currentProduct = ref(null);

    const isAdmin = computed(() => userStore.user === 'admin');
    const products = computed(() => productStore.products);

    const goToAnalytics = () => {
      router.push({ name: 'Analytics' });
    };

    const openAddProduct = () => {
      currentProduct.value = { id: null, name: '', description: '', type: '', price: null };
      showForm.value = true;
    };

    const editProduct = (product) => {
      currentProduct.value = { ...product };
      showForm.value = true;
    };

    const saveProduct = (product) => {
      if (product.id) {
        productStore.updateProduct(product);
      } else {
        product.id = Date.now();
        productStore.addProduct(product);
      }
      closeForm();
    };

    const deleteProduct = (id) => {
      productStore.deleteProduct(id);
    };

    // Обработчики для кнопок "Купить", "Нравится", "Не нравится"
    const buyProduct = (id) => {
      productStore.incrementPurchases(id);
    };

    const likeProduct = (id) => {
      productStore.incrementLikes(id);
    };

    const dislikeProduct = (id) => {
      productStore.incrementDislikes(id);
    };

    const closeForm = () => {
      showForm.value = false;
      currentProduct.value = null;
    };

    return {
      isAdmin,
      products,
      showForm,
      currentProduct,
      openAddProduct,
      editProduct,
      saveProduct,
      deleteProduct,
      buyProduct,
      likeProduct,
      dislikeProduct,
      goToAnalytics,
      closeForm,
    };
  },
};
</script>








<style scoped>
.home-page {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.home-page h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.add-button,
.analytics-button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-button {
  background-color: #42a5f5;
  color: white;
}

.add-button:hover {
  background-color: #1e88e5;
}

.analytics-button {
  background-color: #66bb6a;
  color: white;
}

.analytics-button:hover {
  background-color: #43a047;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.product-card {
  width: 100%;
  max-width: 250px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  background-color: #ffffff;
}

.product-card-content {
  flex: 1;
}

.product-card h3 {
  font-size: 1.2em;
  color: #333;
  margin: 0 0 10px;
}

.product-description {
  font-size: 0.9em;
  color: #555;
  margin-bottom: 10px;
}

.product-type,
.product-price {
  font-size: 1em;
  color: #333;
  margin: 5px 0;
}

.product-card-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.edit-button,
.delete-button {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  color: white;
}

.edit-button {
  background-color: #42a5f5;
}

.edit-button:hover {
  background-color: #1e88e5;
}

.delete-button {
  background-color: #e53935;
}

.delete-button:hover {
  background-color: #d32f2f;
}


.product-interactions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.buy-button {
  background-color: #4caf50;
  color: white;
}

.like-button {
  background-color: #42a5f5;
  color: white;
}

.dislike-button {
  background-color: #f44336;
  color: white;
}
</style>
