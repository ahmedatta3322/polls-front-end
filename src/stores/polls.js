import { defineStore } from 'pinia'
import axios from 'axios'
export const usePollStore = defineStore({
  id: 'polls',
  state: () => ({
    polls: {},
    isCreated: false,
    poll: {}
  }),
  actions: {
    async getPolls(page) {
      this.polls = await axios.get(
        `http://ahmedatta3322.pythonanywhere.com/api/poll/list/?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
          }
        }
      )
    },
    async editPoll(poll) {
      await axios.put(`http://ahmedatta3322.pythonanywhere.com/api/poll/update/${poll.id}/`, poll, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
        }
      })
    },
    async getPoll(id) {
      this.poll = await axios.get(`http://ahmedatta3322.pythonanywhere.com/api/poll/view/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
        }
      })
    },
    async createPoll(poll) {
      this.isCreated = await axios
        .post('http://ahmedatta3322.pythonanywhere.com/api/poll/create/', poll, {
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
      await axios.delete(`http://ahmedatta3322.pythonanywhere.com/api/poll/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
        }
      })
    }
  }
})
