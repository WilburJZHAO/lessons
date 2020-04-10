<template>
  <div class="input--container">
    <h3
      class="text-center text-success mb-5"
    >{{ cookieNumber }} cookies: Minimum of {{ chipNumber }} chocolate chips</h3>
    <div class="text-center">
      <h5 class="text-danger">Choose the number of cookies...</h5>
      <div class="form-check form-check-inline mb-5 pr-3" v-for="n in 9" :key="n">
        <input
          type="radio"
          class="form-check-input"
          name="cookieNumber"
          :id="`cookie-value${n+1}`"
          :value="n+1"
          v-model="cookieNumber"
        />
        <label :for="`cookie-value${n+1}`" class="form-check-label">{{ n+1 }}</label>
      </div>
      <h5 class="text-danger">Choose the number of chips...</h5>
      <div class="form-check form-check-inline mb-5 pr-3" v-for="n in 9" :key="n+10">
        <input
          type="radio"
          class="form-check-input"
          name="chipNumber"
          :id="`chip-value${n+1}`"
          :value="n+1"
          v-model="chipNumber"
        />
        <label :for="`chip-value${n+1}`" class="form-check-label">{{ n+1 }}</label>
      </div>
      <p class="text-danger text-center">Select cookie and chip numbers then...</p>
      <div class="text-center">
        <button class="btn btn-outline-success" @click="handleSetCookie">Set cookies</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["originalCookieSet"],
  data: function() {
    return {
      cookieNumber: this.originalCookieSet
        ? this.originalCookieSet.cookieNumber
        : 2,
      chipNumber: this.originalCookieSet ? this.originalCookieSet.chipNumber : 2
    };
  },
  methods: {
    handleSetCookie() {
      this.$emit("setCookie", {
        cookieNumber: this.cookieNumber,
        chipNumber: this.chipNumber
      });
    }
  }
};
</script>

<style scoped>
</style>