<template>
  <pulse-loader v-if="loader" color="#36D7B7" size="16px" />
  <div class="login" v-else>
    <form @submit="login">
      <input v-model="username" placeholder="username" required />
      <br />
      <br />
      <input v-model="password" placeholder="password" type="password" required />
      <br />
      <br />
      <button type="submit">Login</button>
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
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  components: {
    PulseLoader
  },
  props: {
    isAdmin: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      username: '',
      password: '',
      loader: false
    }
  },
  methods: {
    async login(e) {
      e.preventDefault()
      this.loader = true
      try {
        await useAuthStore().userLogin(this.username, this.password)
        if (useAuthStore().isAuthenticated) {
          this.loader = false
          if (useAuthStore().isAdminAuthenticated && this.isAdmin) {
            this.$router.push('/adminportal')
          } else {
            this.$router.push('/publicportal')
          }
        }
      } catch (err) {
        this.loader = false
        if (err.response.status === 401) {
          useToast().error('Invalid username or password')
        } else {
          useToast().error('Something went wrong')
        }
      }
    },
    async register(e) {
      // get the form to report validation errors
      const form = e.target.form
      if (!form.checkValidity()) {
        // if the form is invalid, submit it. The browser will
        // display native HTML5 errors.
        form.reportValidity()
        return
      }
      this.loader = true
      try {
        await useAuthStore().userRegister(this.username, this.password)
        if (useAuthStore().isAuthenticated) {
          this.loader = false
          if (useAuthStore().isAdminAuthenticated && this.isAdmin) {
            this.$router.push('/adminportal')
          } else {
            this.$router.push('/publicportal')
          }
        }
      } catch (err) {
        if (err.response.status === 400) {
          this.loader = false
          useToast().error('Username already exists')
        } else {
          this.loader = false
          useToast().error('Something went wrong')
        }
      }
    }
  }
}
</script>
