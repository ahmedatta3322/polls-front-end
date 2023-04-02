<script setup>
import Header from "../components/Header.vue";
import PollCard from "../components/PollCard.vue";
import Pagination from "../components/Pagination.vue";
import {usePollStore} from "../stores/polls.js";
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
  name: "PublicPortal",
  components: {
    Header,
    PollCard,
    Pagination,
  },
  data() {
    
    return {
      polls: [],
      totalPages: 0,
      currentPage: 1,
    };
  },
  methods: {
    loadPolls() {
      usePollStore().getPolls(this.currentPage).then(() => {
        this.polls = usePollStore().polls.data.results
        this.totalPages = (usePollStore().polls.data.count / 15).toFixed(0)
      });
      

  },
    changePage(page) {
      this.currentPage = page;
      this.loadPolls();
      console.log(this.currentPage);
    }
},
  mounted() {
    this.loadPolls();
  },
};
</script>


<style scoped>
.public {
  width: 100vw;
  height: 92vh;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100vh;
}

.card-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;

}

.card-container-header {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.card-row {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
</style>
