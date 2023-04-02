import { defineStore } from 'pinia'
import axios from 'axios'
export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    isAuthenticated: false,
    isAdminAuthenticated: false,
    loginAsAdmin: false
  }),
  actions: {
    async userLogin(username, password) {
      this.isAuthenticated = await axios.post('http://localhost:8000/api/login/', {
        username: username,
        password: password
      })
      if (this.isAuthenticated.status == 200) {
        sessionStorage.setItem('access_token', this.isAuthenticated.data.access)
        sessionStorage.setItem('refresh_token', this.isAuthenticated.data.refresh)
        this.isAdminAuthenticated = this.isAuthenticated.data.is_staff
        this.isAuthenticated = true
      } else {
        this.isAuthenticated = false
        alert('Invalid Credentials')
      }
    },
    async verifyAuth() {
      let token = sessionStorage.getItem('access_token')
      if (token) {
        this.isAuthenticated = (
          await axios.post('http://localhost:8000/api/verify/', { token: token })
        ).status
        if (this.isAuthenticated == 200) {
          this.isAuthenticated = true
        } else {
          this.isAuthenticated = false
        }
      } else {
        this.isAuthenticated = false
      }
    },
    async userRegister(username, password) {
      this.isAuthenticated = await axios.post('http://localhost:8000/api/register/', {
        username: username,
        password: password
      })
      if (this.isAuthenticated.status == 201) {
        sessionStorage.setItem('access_token', this.isAuthenticated.data.access_token)
        sessionStorage.setItem('refresh_token', this.isAuthenticated.data.refresh_token)
        this.isAuthenticated = true
      } else {
        this.isAuthenticated = false
      }
    },
    adminLogin() {
      this.isAdminAuthenticated = true
    },
    adminLogout() {
      this.isAdminAuthenticated = false
    },
    verifyAdminAuth(isauth) {
      this.isAdminAuthenticated = isauth
    }
  }
})
