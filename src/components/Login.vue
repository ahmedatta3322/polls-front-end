<template>
  <a v-if="!isAdmin" href="/adminlogin" class="nav-link">Admin Login</a>
  <a v-else href="/login" class="nav-link">User Login</a>
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
  </div>
</template>
<script>
import { useAuthStore } from "../stores/auth";
export default {
  props: {
    isAdmin: {
      type: Boolean,
      required: true,
    },
  },
  data: () => {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      const auth_status = useAuthStore().userLogin(this.username, this.password);
      auth_status.then(() => {
        if (useAuthStore().isAuthenticated) {
          // print all props of this object
          console.log(Object.values(this) , this.isAdmin);
          if (useAuthStore().isAdminAuthenticated && this.isAdmin) {
            this.$router.push("/adminportal");
          } else {
            this.$router.push("/publicportal");
          }
        }
      }).catch((err) => {
        alert("Invalid username or password");
      });
      return auth_status;
    },
    register() {
      const register_status = useAuthStore().userRegister(this.username, this.password);
      register_status.then(() => {
        if (useAuthStore().isAuthenticated) {
          this.$router.push("/publicportal");
        }
      }).catch((err) => {
        alert("Username already exists");
      });
      return register_status;
    },
  },
};
</script>
<style scoped>
.nav-link{
  position: absolute;
  right: 0;
  top: 0;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  background-color: #f5f5f5;
  cursor: pointer;
  text-decoration: none;
  color: black;
  z-index: 20;
}
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30vw;
  height: auto;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  padding: 20px;

}
.login h1 {
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 20px;
}

.login input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

.login button {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  background-color: #f5f5f5;
  cursor: pointer;
  margin-top: 10px;
}

.login button:hover {
  background-color: #ccc;
}

.login button:active {
  background-color: #aaa;
}

.login button:focus {
  background-color: #aaa;
}

.login button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}


</style>