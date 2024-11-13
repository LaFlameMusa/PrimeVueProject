<!-- src/components/ProductForm.vue -->
<template>
    <div class="modal">
      <div class="modal-content">
        <h3>{{ product.id ? 'Редактировать товар' : 'Добавить товар' }}</h3>
        
        <!-- Название товара -->
        <label>
          Название:
          <input type="text" v-model="formData.name" :class="{ 'error': errors.name }" />
          <span v-if="errors.name" class="error-message">Название обязательно</span>
        </label>
  
        <!-- Описание товара -->
        <label>
          Описание:
          <textarea v-model="formData.description" :class="{ 'error': errors.description }"></textarea>
          <span v-if="errors.description" class="error-message">Описание обязательно</span>
        </label>
  
        <!-- Тип товара -->
        <label>
          Тип товара:
          <select v-model="formData.type" :class="{ 'error': errors.type }">
            <option value="" disabled>Выберите тип</option>
            <option value="Обувь">Обувь</option>
            <option value="Одежда">Одежда</option>
            <option value="Белье">Белье</option>
            <option value="Другое">Другое</option>
          </select>
          <span v-if="errors.type" class="error-message">Тип товара обязателен</span>
        </label>
  
        <!-- Цена товара -->
        <label>
          Цена:
          <input type="number" v-model="formData.price" :class="{ 'error': errors.price }" />
          <span v-if="errors.price" class="error-message">Цена обязательна и должна быть больше 0</span>
        </label>
  
        <div class="modal-actions">
          <button @click="handleSave">Сохранить</button>
          <button @click="$emit('close')">Отмена</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, watch } from 'vue';
  
  export default {
    name: 'ProductForm',
    props: {
      product: {
        type: Object,
        required: true,
      },
    },
    setup(props, { emit }) {
      const formData = ref({ name: '', description: '', type: '', price: null });
      const errors = ref({ name: false, description: false, type: false, price: false });
  
      const validateForm = () => {
        errors.value.name = !formData.value.name;
        errors.value.description = !formData.value.description;
        errors.value.type = !formData.value.type;
        errors.value.price = !formData.value.price || formData.value.price <= 0;
  
        return !errors.value.name && !errors.value.description && !errors.value.type && !errors.value.price;
      };
  
      const handleSave = () => {
        if (validateForm()) {
          emit('save', { ...props.product, ...formData.value });
        }
      };
  
      watch(
        () => props.product,
        (newProduct) => {
          formData.value = { ...newProduct };
        },
        { immediate: true }
      );
  
      return {
        formData,
        errors,
        handleSave,
      };
    },
  };
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 400px;
    width: 100%;
  }
  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
  }
  input, select, textarea {
    width: 100%;
    margin-top: 8px;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ddd;
  }
  input.error, select.error, textarea.error {
    border-color: red;
  }
  .error-message {
    color: red;
    font-size: 0.9em;
  }
  button {
    cursor: pointer;
  }
  </style>
  