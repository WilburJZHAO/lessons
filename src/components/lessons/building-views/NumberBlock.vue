<template>
  <div
    v-if="number!== undefined && !hasCheck"
    class="app--number-block app--number-draggable hidden"
    :class="'app--number-block' + number"
    :data-solid="solid"
    @mouseenter="handleShowHidden"
    @mouseleave="handleHide"
  >
    <div v-if="hidden && !showHidden" class="app--hidden-number">{{ number }}</div>
    <div
      v-if="hidden && showHidden"
      class="app--hidden-number"
      :class="'app--number-block' + hiddenNumber"
    >
      <div :style="{ visibility: noDisplayHiddenNumber ? 'hidden' :'visible' }">{{ hiddenNumber }}</div>
    </div>
    <div v-else>
      <div :style="{ visibility: noDisplay ? 'hidden' :'visible' }">{{number}}</div>
    </div>
  </div>
  <div v-else-if="hasCheck===true" class="app--number-block app--number-fill">
    <i v-if="number===-1" class="fas fa-times text-danger"></i>
    <div v-else class="app--number-block" :class="'app--number-block' + number">{{ number }}</div>
  </div>
  <div v-else class="app--number-block app--number-dropzone app--number-fill"></div>
</template>

<script>
export default {
  props: [
    "number",
    "hasCheck",
    "hidden",
    "solid",
    "hasXRay",
    "noDisplay",
    "hiddenNumber",
    "noDisplayHiddenNumber"
  ],
  data: function() {
    return {
      showHidden: false
    };
  },
  methods: {
    handleShowHidden() {
      console.log("show hidden");
      const isSolid = this.$el.getAttribute("data-solid");
      // console.log(this.$el.getAttribute("data-solid"));
      if (this.hasXRay && !isSolid) {
        this.showHidden = true;
        this.$el.classList.remove("hidden");
        this.$el.classList.add("hover-effect");
      }
      // console.log(this.$el.classList);
    },
    handleHide() {
      console.log("hide");
      if (this.hasXRay) {
        this.showHidden = false;
        this.$el.classList.add("hidden");
        this.$el.classList.remove("hover-effect");
      }
      // console.log(this.$el.classList);
    }
  }
};
</script>

<style>
.app--number-block {
  font-size: 35px;
  font-weight: 600;
  border: 1px solid black;
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3c2e28;
}
.app--number-fill {
  width: 42px;
  height: 42px;
  background-color: #eee;
  border: 1px solid #555;
  margin: 1px;
}
.app--number-draggable {
  touch-action: none;
}
/* .app--number-dropzone {
	border: 1px solid #000; 

} */
.app--number-draggable-positioned {
  touch-action: none;
}

.app--number-block0 {
  color: #763898;
  color: #001fce;
  background-color: #edf55a;
}
.app--number-block1 {
  color: #f8ef00;
  color: black;
  background-color: #ccc;
}
.app--number-block2 {
  color: #00aae9;
  color: black;
  background-color: #d33011;
}
.app--number-block3 {
  color: #e993ab;
  color: #b5210e;
  background-color: #88fa4b;
}
.app--number-block4 {
  color: #d4211a;
  color: #60fdf8;
  background-color: #6c1308;
}
.app--number-block5 {
  color: #007cc2;
  color: #191905;
  background-color: #f8fb36;
}
.app--number-block6 {
  color: #35b247;
  color: #dc2511;
  background-color: #35881d;
}
.app--number-block7 {
  color: #e8008b;
  color: #000000;
  background-color: #5efbfb;
}
.app--number-block8 {
  color: #ef9f92;
  color: #f7f12f;
  background-color: #153c4b;
}
.app--number-block9 {
  color: #70c4cb;
  color: #fff735;
  background-color: #0022eb;
}
.app--hidden-number {
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
}
.hidden .app--hidden-number {
  display: none;
}
.hover-effect {
  background-color: #fff;
}
</style>
