<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <!-- Login with your Maths300 account -->
      <form name="form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="text"
            class="form-control"
            name="email"
            v-model="user.email"
            v-validate="'required'"
          />
          <div
            class="alert alert-danger"
            role="alert"
            v-if="errors.has('email')"
          >
            Email is required!
          </div>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            name="password"
            v-model="user.password"
            v-validate="'required'"
          />
          <div
            class="alert alert-danger"
            role="alert"
            v-if="errors.has('password')"
          >
            Password is required!
          </div>
        </div>
        <div class="form-group">
          <button class="btn btn-success btn-block" :disabled="loading">
            <span
              class="spinner-border spinner-border-sm"
              v-show="loading"
            ></span>
            <span>Login</span>
          </button>
        </div>
        <div class="form-group">
          <div class="alert alert-danger" role="alert" v-if="message">
            {{ message }}
          </div>
        </div>
      </form>
      <a class="btn btn-link" :href="validateAccessCodeLink" role="button"
        >I hava an access code</a
      >
    </div>
  </div>
</template>

<script>
import User from "../../models/user";

export default {
  name: "login",
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  data() {
    return {
      user: new User("", ""),
      loading: false,
      message: "",
      redirect: this.$route.query.redirect ? this.$route.query.redirect : "/",
      validateAccessCodeLink:
        "/validateAccessCode?redirect=" + this.$route.query.redirect
    };
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      await this.$validator.validateAll();

      if (this.errors.any()) {
        this.loading = false;
        return;
      }

      if (this.user.email && this.user.password) {
        this.$store.dispatch("auth/login", this.user).then(
          () => {
            this.$router.push(this.redirect);
          },
          error => {
            this.loading = false;
            this.message = error.data.message;
          }
        );
      }
    }
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>
