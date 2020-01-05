<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form name="form" @submit.prevent="handleValidateAccessCode">
        <div class="form-group">
          <input
            type="hidden"
            class="form-control"
            name="accessURL"
            v-validate="'required'"
            v-model="validateAccessCodeEntity.accessURL"
          />
          <div
            class="alert alert-danger"
            role="alert"
            v-if="errors.has('accessURL')"
          >Access URL is required!</div>
        </div>

        <div class="form-group">
          <label for="accessCode">Access Code</label>
          <input
            type="text"
            class="form-control"
            name="accessCode"
            v-model="validateAccessCodeEntity.accessCode"
            v-validate="'required'"
          />
          <div
            class="alert alert-danger"
            role="alert"
            v-if="errors.has('accessCode')"
          >Access Code is required!</div>
        </div>
        <div class="form-group">
          <button class="btn btn-success btn-block" :disabled="loading">
            <span class="spinner-border spinner-border-sm" v-show="loading"></span>
            <span>Submit</span>
          </button>
        </div>
        <div class="form-group">
          <div class="alert alert-danger" role="alert" v-if="message">{{ message }}</div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import ValidateAccessCodeEntity from "../../models/validateAccessCodeEntity";

export default {
  name: "validateAccessCode",
  computed: {
    validated() {
      const validateAccessCodeEntity = this.$store.state.auth
        .validateAccessCodeEntity;
      return (
        validateAccessCodeEntity != undefined &&
        validateAccessCodeEntity.access_url == this.$route.query.redirect
      );
    }
  },
  data() {
    return {
      validateAccessCodeEntity: new ValidateAccessCodeEntity(
        "",
        window.location.origin + this.$route.query.redirect
      ),
      loading: false,
      message: "",
      redirect: this.$route.query.redirect ? this.$route.query.redirect : "/"
    };
  },
  mounted() {
    if (this.validated) {
      this.$router.push("/");
    }
  },
  methods: {
    async handleValidateAccessCode() {
      this.loading = true;
      await this.$validator.validateAll();

      if (this.errors.any()) {
        this.loading = false;
        return;
      }

      if (
        this.validateAccessCodeEntity.accessCode &&
        this.validateAccessCodeEntity.accessURL
      ) {
        this.$store
          .dispatch("auth/validateAccessCode", this.validateAccessCodeEntity)
          .then(
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
