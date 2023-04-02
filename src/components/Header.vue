<template>
  <div class="header">
    <h1>Polls System</h1>
    <button @click="logout" class="logout">Logout</button>
  </div>

</template>
<script>
export default {
  methods: {
    logout() {
      sessionStorage.removeItem("access_token");
      return this.$router.push("/login");
    },
  },
};
</script>
<style scoped>
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 7vh;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ccc;
  padding: 0 20px;
  z-index: 20;
  box-sizing: border-box;
}
.header h1 {
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;
}
.header button {
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  background-color: #f5f5f5;
  cursor: pointer;
}
.header button:hover {
  background-color: #ccc;
}
</style>
