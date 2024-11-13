<!-- src/components/AnalyticsPage.vue -->
<template>
  <div class="analytics-page">
    <h2>Аналитика товаров</h2>
    <div class="charts">
      <div class="chart-container">
        <h3>Количество товаров по типам</h3>
        <Chart type="bar" :data="productTypeChartData" />
      </div>
      <div class="chart-container">
        <h3>Средняя цена товаров по типам</h3>
        <Chart type="doughnut" :data="averagePriceChartData" />
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

    const productTypeCounts = computed(() => {
      const counts = { Обувь: 0, Одежда: 0, Белье: 0, Другое: 0 };
      productStore.products.forEach((product) => {
        if (counts[product.type] !== undefined) counts[product.type]++;
      });
      return counts;
    });

    const productTypeChartData = computed(() => ({
      labels: Object.keys(productTypeCounts.value),
      datasets: [
        {
          label: 'Количество товаров',
          data: Object.values(productTypeCounts.value),
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#FF6384'],
          borderColor: '#ffffff',
          borderWidth: 1,
        },
      ],
    }));

    const averagePriceByType = computed(() => {
      const sums = { Обувь: 0, Одежда: 0, Белье: 0, Другое: 0 };
      const counts = { Обувь: 0, Одежда: 0, Белье: 0, Другое: 0 };

      productStore.products.forEach((product) => {
        if (sums[product.type] !== undefined) {
          sums[product.type] += product.price;
          counts[product.type]++;
        }
      });

      const averages = {};
      for (const type in sums) {
        averages[type] = counts[type] ? sums[type] / counts[type] : 0;
      }

      return averages;
    });

    const averagePriceChartData = computed(() => ({
      labels: Object.keys(averagePriceByType.value),
      datasets: [
        {
          label: 'Средняя цена',
          data: Object.values(averagePriceByType.value),
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#FF6384'],
          borderColor: '#ffffff',
          borderWidth: 1,
        },
      ],
    }));

    return {
      productTypeChartData,
      averagePriceChartData,
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
  max-width: 800px;
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
