<template>
  <div>
    <h4 class="text-center">Card draw</h4>
    <h6 class="text-center text-dark">Using cards Ace to 6</h6>
    <div
      class="d-flex justify-content-center my-4 py-4"
      style="min-height: 195px; border: 1px solid #ccc; background-color: rgb(40,167,69)"
    >
      <div v-if="card" style="border: 1px solid #444;">
        <img
          :src="
          card &&
            require(`@/assets/highest-number/${card.suit}${card.number}.jpg`)
        "
          alt="card"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["card"]
};
</script>

<style scoped></style>
