// src/stores/productStore.js
import { defineStore } from 'pinia';

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [],
  }),
  actions: {
    addProduct(product) {
      product.purchases = 0;
      product.likes = 0;
      product.dislikes = 0;
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
    incrementPurchases(productId) {
      const product = this.products.find((p) => p.id === productId);
      if (product) product.purchases++;
    },
    incrementLikes(productId) {
      const product = this.products.find((p) => p.id === productId);
      if (product) product.likes++;
    },
    incrementDislikes(productId) {
      const product = this.products.find((p) => p.id === productId);
      if (product) product.dislikes++;
    },
  },
});
