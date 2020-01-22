<template>
  <div class="app--panel">
    <div v-if="editMode === false">
      <div class="text-danger">1 is ...</div>
      <div v-for="(el, index) in fractionSelection" :key="index">
        <span v-if="el.selected === true" class="text-danger">
          {{ fractionSelection[index].number }}
          {{ fractionSelection[index].words }}
        </span>
      </div>
      <div class="mt-3 text-center">
        <button class="btn btn-outline-success" @click="handleChangeFraction">
          Change fractions
        </button>
      </div>
    </div>
    <div v-else>
      <div>
        <div
          class="form-check"
          v-for="(el, index) in fractionSelection"
          :key="index"
        >
          <input
            type="checkbox"
            class="form-check-input"
            :id="index"
            v-model="fractionSelection[index].selected"
          />
          <label :for="index" class="form-check-label"
            >{{ el.number }} {{ el.words }}</label
          >
        </div>
      </div>
      <div class="mt-3 text-center">
        <button class="btn btn-outline-success" @click="handleOk">OK</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["fractionSelection"],
  data: function() {
    return {
      editMode: false
    };
  },
  methods: {
    handleChangeFraction() {
      this.editMode = true;
      this.$emit("fractionReadyToChange");
    },
    handleOk() {
      this.editMode = false;
      this.$emit("fractionChange", true);
    }
  }
};
</script>

<style scoped>
.app--panel {
  margin: 0 auto;
}
@media only screen and (max-width: 768px) {
  .app--panel {
    width: 60%;
  }
}
</style>
