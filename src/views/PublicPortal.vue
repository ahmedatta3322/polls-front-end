<script setup>
import Header from '../components/Header.vue'
import PollCard from '../components/PollCard.vue'
import Pagination from '../components/Pagination.vue'
import { usePollStore } from '../stores/polls.js'
import { useToast } from 'vue-toast-notification'
import '../assets/css/public.css'
</script>
<template>
  <div class="public">
    <Header />
    <div class="card-container">
      <div class="card-row" v-for="poll in polls" :key="poll.id">
        <PollCard :poll="poll" :is-public="true" />
      </div>
      <Pagination
        v-if="totalPages > 1"
        :currentPage="currentPage"
        :totalPages="totalPages"
        @change-page="changePage"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'PublicPortal',
  components: {
    Header,
    PollCard,
    Pagination
  },
  data() {
    return {
      polls: [],
      totalPages: 0,
      currentPage: 1
    }
  },
  methods: {
    loadPolls() {
      usePollStore()
        .getPolls(this.currentPage)
        .then(() => {
          this.polls = usePollStore().polls.data.results
          this.totalPages = (usePollStore().polls.data.count / 15).toFixed(0)
        })
        .catch(() => {
          const toast = useToast()
          toast.error("Couldn't load polls")
        })
    },
    changePage(page) {
      this.currentPage = page
      this.loadPolls()
    }
  },
  mounted() {
    this.loadPolls()
  }
}
</script>

<style scoped></style>
