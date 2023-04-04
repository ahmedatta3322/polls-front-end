import { defineStore } from 'pinia'
import axios from 'axios'
export const usePollStore = defineStore({
  id: 'polls',
  state: () => ({
    polls: {},
    isCreated: false,
    poll: {},
    dailyVotes: {}
  }),
  actions: {
    async getPolls(page) {
      this.polls = await axios.get(
        `https://ahmedatta3322.pythonanywhere.com/api/poll/list/?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
          }
        }
      )
    },
    async editPoll(id, poll) {
      await axios.put(`https://ahmedatta3322.pythonanywhere.com/api/poll/update/${id}/`, poll, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
        }
      })
    },
    async getPoll(id) {
      this.poll = await axios.get(`https://ahmedatta3322.pythonanywhere.com/api/poll/view/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
        }
      })
    },
    async createPoll(poll) {
      this.isCreated = await axios
        .post('https://ahmedatta3322.pythonanywhere.com/api/poll/create/', poll, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
          }
        })
        .then(() => {
          return true
        })
        .catch(() => {
          return false
        })
    },
    async deletePoll(id) {
      await axios.delete(`https://ahmedatta3322.pythonanywhere.com/api/poll/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
        }
      })
    },
    async getVotesDaily() {
      this.dailyVotes = await axios.get(
        `https://ahmedatta3322.pythonanywhere.com/api/votes/daily`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
          }
        }
      )
    }
  }
})
