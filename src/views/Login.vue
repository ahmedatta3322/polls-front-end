<script setup>
import Login from '../components/Login.vue'
import "../assets/css/login.css"
</script>
<template>
  <div class="login-vue">
    <Login :isAdmin="isAdmin" />
  </div>
</template>
<script>
export default {
  data () {
    return {
      isAdmin: false
    }
  },
  mounted () {
    if (this.$route.path === '/adminportal' || this.$route.path === '/adminlogin') {
      this.isAdmin = true
    }
  },
  }
</script>