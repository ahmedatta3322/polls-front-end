<template>
  <div class="header">
    <h1>Polls System</h1>
    <button @click="logout" class="logout">Logout</button>
  </div>
</template>
<script>
import { useAuthStore } from '../stores/auth'
import '../assets/css/header.css'
export default {
  methods: {
    logout() {
      if (useAuthStore().isAdminAuthenticated && useAuthStore().loginAsAdmin) {
        useAuthStore().adminLogout()
        return this.$router.push('/adminlogin')
      } else {
        useAuthStore().userLogout()
        return this.$router.push('/login')
      }
    }
  }
}
</script>
