<template>
  <div class="container mt-3">
    <h3 class="text-success text-center">Change the killer dice</h3>
    <div
      class="d-flex justify-content-center mt-5"
      :style="{ visibility: myKillerDice>=1 && myKillerDice <=6 ? 'visible' : 'hidden' }"
      autofocus
    >
      <app-dice :number="myKillerDice" :index="0"></app-dice>
    </div>
    <div class="d-flex justify-content-center mt-3">
      <input
        type="text"
        class="form-control text-center"
        style="width: 100px; "
        v-model.number="myKillerDice"
        @keypress="handleCheckInput"
      />
    </div>
    <div class="text-center text-danger my-3">Enter the killer dice number(1-6)</div>
    <div class="text-center">
      <button class="btn btn-outline-success" @click="handleSetKiller" :disabled="!validDice">OK</button>
    </div>
  </div>
</template>

<script>
import Dice from "../../common/Dice.vue";
export default {
  components: {
    appDice: Dice
  },
  props: ["killerDice"],
  data: function() {
    return {
      myKillerDice: this.killerDice
    };
  },
  computed: {
    validDice() {
      return (
        typeof this.myKillerDice === "number" &&
        this.myKillerDice >= 1 &&
        this.myKillerDice <= 6
      );
    }
  },
  methods: {
    handleCheckInput(e) {
      if (e.charCode < 49 || e.charCode > 54) {
        e.preventDefault();
      }
      if (e.target.value.length > 1) {
        e.preventDefault();
      }
      this.myKillerDice = e.target.value;
    },
    handleSetKiller() {
      this.$emit("setKiller", this.myKillerDice);
    }
  },
  mounted() {
    // document.addEventListener("keypress", e => {
    //   if (e.charCode >= 49 && e.charCode <= 54) {
    //     this.myKillerDice = Number(e.key);
    //   }
    // });
  }
};
</script>

<style scoped></style>
