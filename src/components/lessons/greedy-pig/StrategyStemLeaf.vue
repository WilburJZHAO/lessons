<template>
  <div class="container" style="margin-bottom: 1rem;">
    <div class="row">
      <h6 class="col text-center" :style="{ visibility: strategy2 ? 'visible' : 'hidden' }">
        Quit after {{ strategy2 ? strategy2.value : strategy1.value }}
        {{ strategy2 ? strategy2.type : strategy1.type }}
      </h6>
      <h6 class="col-.5 text-primary app--stem">{{ killerDice }}</h6>
      <h6 class="col text-center">Quit after {{ strategy1.value }} {{ strategy1.type }}</h6>
    </div>
    <div>
      <div v-for="(data, index) in stemLeafData1" :key="index" class="row">
        <div
          class="col text-danger text-right app--leaf-data"
          ref="leaf-data"
          :style="{ visibility: strategy2 ? 'visible' : 'hidden' }"
          style="overflow: auto; padding-right: 0;"
        >
          <div
            v-if="status===2"
            style="padding-right: 4px;"
          >{{ stemLeafData2 && stemLeafData2[index].leaf.reverse().join(",") }}</div>
          <div
            v-if="status===3 || status === 4"
            :style="{width: stemLeafData2 && stemLeafData2[index].leaf.length*5+'px'}"
            style="float:right;background-color: #DC3545; height: 100%; padding-right: 0; border-left: 1px solid #aaa; border-top: 1px solid #aaa; border-bottom: 1px solid #aaa"
          ></div>
        </div>
        <div class="app--stem col-.5">{{ data.stem }}</div>

        <div
          class="col text-primary app--leaf-data"
          style="overflow: auto; padding-left: 0;"
          ref="leaf-data"
        >
          <div v-if="status===2" style="padding-left: 4px;">{{ data.leaf.join(",") }}</div>
          <div
            v-if="status===3 || status === 4"
            :style="{width: data.leaf.length*5+'px'}"
            style="background-color: #007BFF; height: 100%; padding-left: 0; border-right: 1px solid #aaa; border-top: 1px solid #aaa; border-bottom: 1px solid #aaa"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "points1",
    "points2",
    "killerDice",
    "strategy1",
    "strategy2",
    "status"
  ],
  computed: {
    stemLeafData1() {
      return this.getStemLeafData(this.points1);
    },
    stemLeafData2() {
      if (!this.points2) return null;
      return this.getStemLeafData(this.points2);
    }
  },
  watch: {
    points1() {
      this.$refs["leaf-data"].forEach(el => {
        if (this.isOverflow(el)) {
          this.$emit("overflow", "0");
        }
      });
    }
  },
  methods: {
    getStemLeafData(points) {
      const stemLeaf = [
        { stem: 0, leaf: [] },
        { stem: 1, leaf: [] },
        { stem: 2, leaf: [] },
        { stem: 3, leaf: [] },
        { stem: 4, leaf: [] },
        { stem: 5, leaf: [] },
        { stem: 6, leaf: [] },
        { stem: 7, leaf: [] },
        { stem: 8, leaf: [] },
        { stem: 9, leaf: [] },
        { stem: 10, leaf: [] },
        { stem: 11, leaf: [] },
        { stem: ">", leaf: [] }
      ];
      for (let i = 0; i < points.length; i++) {
        const stemNum = Math.floor(points[i] / 10);
        const leafNum = points[i] % 10;
        if (stemNum <= 11) {
          stemLeaf[stemNum].leaf.push(leafNum);
        } else {
          stemLeaf[12].leaf.push(leafNum);
        }
      }
      return stemLeaf;
    },
    isOverflow(element) {
      // return element.scrollWidth > element.clientWidth;
      // console.log(element.children[0].scrollWidth);
      // console.log(element.clientWidth);
      return element.children[0].scrollWidth >= element.clientWidth;
    }
  }
};
</script>

<style scoped>
.app--stem {
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #aaa;
}
</style>
