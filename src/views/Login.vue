<script setup>
import Login from '../components/Login.vue'
</script>
<template>
  <div class="public">
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
<style scoped>
.public {
  display: flex;
  place-items: center;
  place-content: center;
  width: 30vw;
  grid-column-start: 2;
  grid-column-end: 3; 
}


</style>
