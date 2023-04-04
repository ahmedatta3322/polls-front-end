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
      this.isAuthenticated = await axios.post(
        'http://ahmedatta3322.pythonanywhere.com/api/login/',
        {
          username: username,
          password: password
        }
      )
      if (this.isAuthenticated.status == 200) {
        sessionStorage.setItem('access_token', this.isAuthenticated.data.access)
        sessionStorage.setItem('refresh_token', this.isAuthenticated.data.refresh)
        this.isAdminAuthenticated = this.isAuthenticated.data.is_staff
        this.isAuthenticated = true
      } else {
        this.isAuthenticated = false
        let message = this.isAuthenticated.data.detail
        $toast.error(message)
      }
    },
    async verifyAuth() {
      let token = sessionStorage.getItem('access_token')
      if (token) {
        this.isAuthenticated = (
          await axios.post('http://ahmedatta3322.pythonanywhere.com/api/verify/', { token: token })
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
      this.isAuthenticated = await axios.post(
        'http://ahmedatta3322.pythonanywhere.com/api/register/',
        {
          username: username,
          password: password,
          is_staff: true
        }
      )
      if (this.isAuthenticated.status == 201) {
        sessionStorage.setItem('access_token', this.isAuthenticated.data.access_token)
        sessionStorage.setItem('refresh_token', this.isAuthenticated.data.refresh_token)
        this.isAuthenticated = true
        this.isAdminAuthenticated = true
      } else {
        this.isAuthenticated = false
      }
    },
    adminLogin() {
      this.isAdminAuthenticated = true
    },
    adminLogout() {
      this.isAdminAuthenticated = false
      sessionStorage.removeItem('access_token')
      sessionStorage.removeItem('refresh_token')
    },
    userLogout() {
      this.isAuthenticated = false
      sessionStorage.removeItem('access_token')
      sessionStorage.removeItem('refresh_token')
    },
    verifyAdminAuth(isauth) {
      this.isAdminAuthenticated = isauth
    }
  }
})
