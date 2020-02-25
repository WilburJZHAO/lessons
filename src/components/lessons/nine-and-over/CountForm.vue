<template>
  <div class="app--form pl-2">
    <form>
      <div class="form-group ml-2">
        <label class="col-form-label">Starting number</label>
        <input type="number" class="form-control" v-model.number="startingNumber" />
        <div
          class="badge badge-danger"
          v-if="startingNumber && Number(startingNumber) > maxStartingNumber"
        >Number is outside range</div>
      </div>
      <div class="form-check">
        <input
          type="radio"
          class="form-check-input"
          name="direction"
          id="form-direction-forwards"
          :value="1"
          v-model="direction"
        />
        <label for="form-direction-forwards" class="form-check-label">Counting forwards</label>
      </div>
      <div class="form-check">
        <input
          type="radio"
          class="form-check-input"
          name="direction"
          id="form-direction-backwards"
          :value="-1"
          v-model="direction"
        />
        <label for="form-direction-backwards" class="form-check-label">Counting backwards</label>
      </div>
      <h6 class="mt-2">Counting by</h6>
      <div class="app--form-countingby">
        <div v-for="i in 12" :key="i" class="form-check">
          <input
            type="radio"
            class="form-check-input"
            name="countingBy"
            :id="`form-countingby-${i}`"
            :value="i"
            v-model="countingBy"
          />
          <label :for="`form-countingby-${i}`" class="form-check-label">{{i}}s</label>
        </div>
      </div>
      <div class="text-center mt-3">
        <button
          class="btn btn-outline-success"
          @click="handleSetCounting"
          :disabled="!isValidinput"
        >OK</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ["totalDigit"],
  data: function() {
    return {
      startingNumber: null,
      direction: 1, // 1 - forwards(+), -1 - backwards(-)
      countingBy: 1
    };
  },
  computed: {
    maxStartingNumber() {
      if (!this.totalDigit) return 0;
      return Math.pow(10, this.totalDigit) - 1;
    },
    isValidinput() {
      let startingNumber = Number(this.startingNumber);
      if (
        startingNumber !== null &&
        this.direction &&
        this.countingBy &&
        startingNumber >= 0 &&
        startingNumber < this.maxStartingNumber &&
        this.startingNumber + this.direction * this.countingBy <
          this.maxStartingNumber &&
        this.startingNumber + this.direction * this.countingBy > 0
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    handleSetCounting(e) {
      e.preventDefault();
      this.$emit("setCounting", {
        startingNumber: this.startingNumber,
        direction: this.direction,
        countingBy: this.countingBy
      });
    }
  }
};
</script>

<style scoped>
.app--form-countingby {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(3rem, 1fr));
  gap: 0.5rem;
}
</style>
