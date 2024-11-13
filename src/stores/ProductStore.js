// src/stores/productStore.js
import { defineStore } from 'pinia';

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [],  // Массив для хранения продуктов
  }),
  actions: {
    addProduct(product) {
      this.products.push(product);
    },
    updateProduct(updatedProduct) {
      const index = this.products.findIndex((p) => p.id === updatedProduct.id);
      if (index !== -1) {
        this.products.splice(index, 1, updatedProduct);
      }
    },
    deleteProduct(productId) {
      this.products = this.products.filter((product) => product.id !== productId);
    },
  },
});
