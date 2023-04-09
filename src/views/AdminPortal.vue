<script setup>
import { usePollStore } from '../stores/polls.js'
import CreateForm from '../components/CreateForm.vue'
import Pagination from '../components/Pagination.vue'
import Header from '../components/Header.vue'
import EditForm from '../components/EditForm.vue'
import '../assets/css/admin.css'
import { toggleFormUtil } from '../utils.js'
import { useAuthStore } from '../stores/auth'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
</script>
<template>
  <pulse-loader v-if="loader" color="#3B8070" size="20px" />
  <div class="admin-portal" v-else>
    <Header />
    <h1>Admin Portal</h1>
    <div class="polls">
      <div class="action-buttons">
        <input type="button" value="Create Poll" @click="createPoll" class="create-button" />
        <input
          type="button"
          value="Charts"
          @click="() => $router.push('/admincharts')"
          class="charts-button"
        />
      </div>

      <div class="poll" v-for="poll in polls" :key="poll.id">
        <h2 id="poll-id">{{ poll.id }}</h2>
        <h2 id="question">{{ poll.question }}</h2>
        <h2 id="expiration-date">{{ poll.expiration_date }}</h2>
        <div class="choices">
          <div class="choice" v-for="choice in poll.choices" :key="choice.id" id="choice">
            <h3 id="choice-inner-text">{{ choice.choice_text }}</h3>
            <div class="votes">
              <h3 class="num-votes">{{ choice.votes_count }} votes</h3>
            </div>
          </div>
        </div>
        <input type="button" value="Edit Poll" @click="editPoll" class="edit-button" />
        <input type="button" value="Delete Poll" @click="deletePoll" class="delete-button" />
      </div>
      <Pagination
        v-if="totalPages > 1"
        :currentPage="currentPage"
        :totalPages="totalPages"
        @change-page="changePage"
      ></Pagination>
    </div>
    <CreateForm class="create-form" @cancel-poll="cancelPoll"></CreateForm>
    <EditForm
      class="edit-form"
      :poll="selectedPoll"
      @cancel-poll="cancelPoll"
      v-if="renderEditForm"
    ></EditForm>
  </div>
</template>
<script>
import { useToast } from 'vue-toast-notification'
export default {
  components: {
    CreateForm,
    Pagination,
    Header,
    EditForm,
    PulseLoader
  },
  data() {
    return {
      polls: [],
      totalPages: 0,
      currentPage: 1,
      selectedPoll: null,
      renderEditForm: false,
      renderCreateForm: false,
      loader: true
    }
  },
  methods: {
    changePage(page) {
      this.currentPage = page
      this.loadPolls()
    },
    toggleForm() {
      if (this.renderCreateForm) {
        return toggleFormUtil()
      } else if (this.renderEditForm) {
        return toggleFormUtil(true)
      }
    },
    loadPolls() {
      this.loader = true
      usePollStore()
        .getPolls(this.currentPage)
        .then(() => {
          this.polls = usePollStore().polls.data.results
          this.totalPages = (usePollStore().polls.data.count / 15).toFixed(0)
          this.loader = false
        })
        .catch(() => {
          this.loader = false
          const toast = useToast()
          toast.error("Couldn't load polls")
        })
    },
    editPoll(event) {
      this.renderEditForm = true
      this.renderCreateForm = false
      this.selectedPoll = event.target.parentElement
      setTimeout(() => {
        this.toggleForm()
      }, 100)
    },
    deletePoll() {
      this.selectedPoll = document.getElementById('poll-id').innerText
      this.loader = true
      usePollStore()
        .deletePoll(this.selectedPoll)
        .then(() => {
          this.loadPolls()
          this.loader = false
        })
        .catch(() => {
          this.loader = false
          const toast = useToast()
          toast.error("Couldn't delete poll , you are not the owner or poll is expired")
        })
    },
    createPoll() {
      this.renderCreateForm = true
      this.renderEditForm = false
      this.toggleForm()
    },
    cancelPoll() {
      this.loadPolls()
      this.renderCreateForm = false
      this.renderEditForm = false
    }
  },
  mounted() {
    this.loadPolls()
    useAuthStore().loginAsAdmin = true
  }
}
</script>
