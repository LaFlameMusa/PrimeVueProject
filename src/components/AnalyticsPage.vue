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

      <!-- Накопительный график (Area Chart) для общего количества товаров -->
      <div class="chart-container">
        <h3>Накопительное количество товаров</h3>
        <Chart type="line" :data="areaChartData" :options="areaChartOptions" />
      </div>

      <!-- Линейный график (Line Chart) средней цены товаров по типам -->
      <div class="chart-container">
        <h3>Средняя цена товаров по типам (Линейный график)</h3>
        <Chart type="line" :data="lineChartData" />
      </div>

      <!-- Радарная диаграмма (Radar Chart) для распределения товаров по типам -->
      <div class="chart-container">
        <h3>Сравнение типов товаров</h3>
        <Chart type="radar" :data="radarChartData" />
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
          borderColor: '#ffffff',
          borderWidth: 1,
        },
      ],
    }));

    // Средняя цена товаров по типам
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

    // Данные для графика средней цены товаров по типам
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

    // Накопительный график (Area Chart) для общего количества товаров
    const areaChartData = computed(() => ({
      labels: Object.keys(productTypeCounts.value),
      datasets: [
        {
          label: 'Общее количество',
          data: Object.values(productTypeCounts.value),
          backgroundColor: 'rgba(66, 165, 245, 0.2)',
          borderColor: '#42A5F5',
          fill: true,
          tension: 0.4,
        },
      ],
    }));

    const areaChartOptions = {
      plugins: {
        filler: {
          propagate: true,
        },
      },
    };

    // Линейный график (Line Chart) средней цены товаров по типам
    const lineChartData = computed(() => ({
      labels: Object.keys(averagePriceByType.value),
      datasets: [
        {
          label: 'Средняя цена',
          data: Object.values(averagePriceByType.value),
          borderColor: '#FFA726',
          backgroundColor: 'rgba(255, 167, 38, 0.2)',
          fill: true,
          tension: 0.4,
        },
      ],
    }));

    // Радарная диаграмма (Radar Chart) для распределения товаров по типам
    const radarChartData = computed(() => ({
      labels: Object.keys(productTypeCounts.value),
      datasets: [
        {
          label: 'Количество товаров',
          data: Object.values(productTypeCounts.value),
          backgroundColor: 'rgba(66, 165, 245, 0.2)',
          borderColor: '#42A5F5',
          pointBackgroundColor: '#42A5F5',
        },
        {
          label: 'Средняя цена',
          data: Object.values(averagePriceByType.value),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: '#FF6384',
          pointBackgroundColor: '#FF6384',
        },
      ],
    }));

    return {
      productTypeChartData,
      averagePriceChartData,
      areaChartData,
      areaChartOptions,
      lineChartData,
      radarChartData,
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
