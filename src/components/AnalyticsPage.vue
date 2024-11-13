<!-- src/components/AnalyticsPage.vue -->
<template>
  <div class="analytics-page">
    <h2>Аналитика товаров</h2>
    <div class="charts">
      <!-- Количество товаров по типам (Bar Chart) -->
      <div class="chart-container">
        <h3>Количество товаров по типам</h3>
        <Chart type="bar" :data="productTypeChartData" />
      </div>

      <!-- Средняя цена товаров по типам (Doughnut Chart) -->
      <div class="chart-container">
        <h3>Средняя цена товаров по типам</h3>
        <Chart type="doughnut" :data="averagePriceChartData" />
      </div>

      <!-- Лайки и дизлайки по товарам (Bar Chart) -->
      <div class="chart-container">
        <h3>Лайки и дизлайки по товарам</h3>
        <Chart type="bar" :data="likesDislikesChartData" />
      </div>

      <!-- Покупки товаров (Bar Chart) -->
      <div class="chart-container">
        <h3>Количество покупок по товарам</h3>
        <Chart type="bar" :data="purchasesChartData" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useProductStore } from '../stores/ProductStore';
import Chart from 'primevue/chart';

export default {
  name: 'AnalyticsPage',
  components: { Chart },
  setup() {
    const productStore = useProductStore();

    // Количество товаров по типам
    const productTypeCounts = computed(() => {
      const counts = { Обувь: 0, Одежда: 0, Белье: 0, Другое: 0 };
      productStore.products.forEach((product) => {
        if (counts[product.type] !== undefined) counts[product.type]++;
      });
      return counts;
    });

    // Данные для графика количества товаров по типам
    const productTypeChartData = computed(() => ({
      labels: Object.keys(productTypeCounts.value),
      datasets: [
        {
          label: 'Количество товаров',
          data: Object.values(productTypeCounts.value),
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#FF6384'],
        },
      ],
    }));

    // Средняя цена товаров по типам
    const averagePriceChartData = computed(() => ({
      labels: Object.keys(productTypeCounts.value),
      datasets: [
        {
          label: 'Средняя цена',
          data: productStore.products.map((product) => product.price),
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#FF6384'],
        },
      ],
    }));

    // Лайки и дизлайки
    const likesDislikesChartData = computed(() => ({
      labels: productStore.products.map((product) => product.name),
      datasets: [
        {
          label: 'Лайки',
          data: productStore.products.map((product) => product.likes),
          backgroundColor: '#42A5F5',
        },
        {
          label: 'Дизлайки',
          data: productStore.products.map((product) => product.dislikes),
          backgroundColor: '#f44336',
        },
      ],
    }));

    // Покупки товаров
    const purchasesChartData = computed(() => ({
      labels: productStore.products.map((product) => product.name),
      datasets: [
        {
          label: 'Покупки',
          data: productStore.products.map((product) => product.purchases),
          backgroundColor: '#4caf50',
        },
      ],
    }));

    return {
      productTypeChartData,
      averagePriceChartData,
      likesDislikesChartData,
      purchasesChartData,
    };
  },
};
</script>



<style scoped>
.analytics-page {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 1000px;
  margin: 0 auto;
}

.analytics-page h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.charts {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.chart-container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.chart-container h3 {
  text-align: center;
  margin-bottom: 15px;
  color: #666;
}

.chart-container canvas {
  max-width: 100%;
  height: auto;
}
</style>
