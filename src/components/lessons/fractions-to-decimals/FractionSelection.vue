<template>
  <div>
    <div v-if="editMode">
      <div class="form-check" v-for="(el, index) in fractionSelection" :key="index">
        <input
          type="checkbox"
          class="form-check-input"
          :id="index"
          v-model="fractionSelection[index].selected"
        />
        <label :for="index" class="form-check-label">{{ el.number}} {{ el.words}}</label>
      </div>
      <div class="my-3 text-center">
        <button class="btn btn-outline-success" @click="handleOk">OK</button>
      </div>
    </div>
    <div v-else>
      <div class="text-danger">1 is ...</div>
      <div v-for="(el, index) in fractionSelection" :key="index">
        <span v-if="el.selected === true" class="text-danger">
          {{ fractionSelection[index].number}}
          {{ fractionSelection[index].words}}
        </span>
      </div>
      <div class="my-3 text-center">
        <button class="btn btn-outline-success" @click="editMode = true">Change fractions</button>
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
    handleOk() {
      this.editMode = false;
      this.$emit("fractionChange", true);
    }
  }
};
</script>

<style scoped>
</style>