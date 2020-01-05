<template>
  <div class="jumbotron jumbotron-fluid app--title">
    <div class="container">
      <div class="row">
        <transition
          appear
          appear-class="image-appear"
          appear-active-class="image-appear-active"
        >
          <div
            class="col-12 col-sm-6 col-md-6 col-lg-4 app--title-img-container"
          >
            <router-link to="/">
              <img class="img-fluid" src="@/assets/logo.png" />
            </router-link>
          </div>
        </transition>
        <transition
          appear
          appear-class="header-appear"
          appear-active-class="header-appear-active"
        >
          <h1
            class="col-12 col-sm-6 col-md-6 col-lg-8 display-4 text-center"
            style="transform: translateY(10%);"
          >
            <slot></slot>
          </h1>
        </transition>
      </div>
      <nav class="navbar navbar-expand navbar-light">
        <div class="navbar-nav ml-auto" v-if="!currentUser">
          <li class="nav-item">
            <a :href="subscribeLink" class="nav-link">
              <i class="fas fa-user-plus" /> Subscribe
            </a>
          </li>
          <li class="nav-item">
            <a href="/login" class="nav-link">
              <i class="fas fa-sign-in-alt" /> Login
            </a>
          </li>
        </div>

        <div class="navbar-nav ml-auto" v-if="currentUser">
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="fas fa-user" /> {{ currentUser.name }}
            </a>
          </li>
          <li class="nav-item">
            <a href class="nav-link" @click="logOut">
              <i class="fas fa-sign-out-alt" /> LogOut
            </a>
          </li>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import { subscribeLink } from "../../services/config";

export default {
  data: function() {
    return {
      subscribeLink: subscribeLink
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.app--title .app--title-img-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.app--title .container {
  margin-bottom: 0.5rem;
}

.header-appear {
  opacity: 0;
}
.header-appear-active {
  transition: all 1s;
  transition-delay: 0.3s;
}
.image-appear {
  opacity: 0;
  transform: translateY(-200px);
}
.image-appear-active {
  transition: all 0.5s;
}
</style>
