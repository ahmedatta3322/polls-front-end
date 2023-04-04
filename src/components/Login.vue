<template>
  <div class="login">
    <form @submit.prevent="login">
      <input v-model="username" placeholder="username" />
      <br />
      <br />
      <input v-model="password" placeholder="password" type="password" />
      <br />
      <br />
      <button type="button" @click="login">Login</button>
      <button type="button" @click="register">Register</button>
    </form>
    <a v-if="isAdmin" href="/login" class="nav-link">User Login</a>
    <a v-else href="/adminlogin" class="nav-link">Admin Login</a>
  </div>
</template>
<script>
import { useAuthStore } from '../stores/auth'
import '../assets/css/login.css'
import { useToast } from 'vue-toast-notification'

export default {
  props: {
    isAdmin: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        await useAuthStore().userLogin(this.username, this.password)
        if (useAuthStore().isAuthenticated) {
          if (useAuthStore().isAdminAuthenticated && this.isAdmin) {
            this.$router.push('/adminportal')
          } else {
            this.$router.push('/publicportal')
          }
        }
      } catch (err) {
        if (err.response.status === 401) {
          useToast().error('Invalid username or password')
        } else {
          useToast().error('Something went wrong')
        }
      }
    },
    async register() {
      try {
        await useAuthStore().userRegister(this.username, this.password)
        if (useAuthStore().isAuthenticated) {
          if (useAuthStore().isAdminAuthenticated && this.isAdmin) {
            this.$router.push('/adminportal')
          } else {
            this.$router.push('/publicportal')
          }
        }
      } catch (err) {
        if (err.response.status === 400) {
          useToast().error('Username already exists')
        } else {
          useToast().error('Something went wrong')
        }
      }
    }
  }
}
</script>
