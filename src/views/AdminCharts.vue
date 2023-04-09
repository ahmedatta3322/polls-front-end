<template>
  <div class="chart-container">
    <h1>Admin Charts</h1>
    <Bar
      id="my-chart-id"
      v-if="loaded"
      :options="chartOptions"
      :data="chartData"
      aria-label="Bar chart"
    />
  </div>
</template>

<script>
import { useToast } from 'vue-toast-notification'
import { usePollStore } from '../stores/polls'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  mounted() {
    this.dailyVotes = usePollStore()
      .getVotesDaily()
      .then(() => {
        for (let i = 0; i < usePollStore().dailyVotes.data.length; i++) {
          this.chartData.labels.push(usePollStore().dailyVotes.data[i].created_at__date)
          this.chartData.datasets[0].data.push(usePollStore().dailyVotes.data[i].id__count)
        }
        this.loaded = true
      })
      .catch(() => {
        useToast().error("Couldn't load chart")
      })
  },
  data() {
    return {
      loaded: false,
      dailyVotes: [],
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Votes',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ]
      },
      chartOptions: {
        responsive: true
      }
    }
  }
}
</script>
<style scoped>
.chart-container {
  width: 90vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
