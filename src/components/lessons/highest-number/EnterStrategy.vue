<template>
  <div class="container-fluid mt-3">
    <h3 class="text-success text-center mb-3">Enter a strategy for testing</h3>

    <div class="d-flex justify-content-center mb-3">
      <app-select-strategy :strategies="strategies" @selectStrategy="handleSelectStrategy"></app-select-strategy>
    </div>
    <div class="d-flex justify-content-center">
      <div class="d-flex" style="overflow:auto;">
        <div>
          <h5 class="text-center">First card</h5>
          <div v-for="num in 6" :key="`firstcard${num}`" class="mb-2">
            <div class="text-danger text-center">{{ num }}</div>
            <div class="d-flex">
              <div
                class="app--num-box app--first-num-box"
                @click="handleSetFirstCard({ num, pos: 0 })"
              >{{ currentStrategy[num] === 0 ? num : "" }}</div>
              <div
                class="app--num-box app--first-num-box"
                @click="handleSetFirstCard({ num, pos: 1 })"
              >{{ currentStrategy[num] === 1 ? num : "" }}</div>
              <div
                class="app--num-box app--first-num-box"
                @click="handleSetFirstCard({ num, pos: 2 })"
              >{{ currentStrategy[num] === 2 ? num : "" }}</div>
            </div>
          </div>
        </div>
        <div class="ml-5">
          <h5 class="pl-3">Second card</h5>
          <div v-for="firstNum in 6" :key="`secondrow${firstNum}`" class="d-flex mb-2">
            <div v-for="secondNum in 6" :key="`secondcard${secondNum}`">
              <div v-if="secondNum !== firstNum" class="mx-2">
                <div class="text-primary text-center">{{ secondNum }}</div>
                <div class="d-flex">
                  <div
                    class="app--num-box app--second-num-box"
                    :class="
                      currentStrategy[firstNum] === 0
                        ? 'app--first-num-card'
                        : currentStrategy[`${firstNum}${secondNum}`] === 0
                        ? 'app--second-num-card'
                        : ''
                    "
                    @click="
                      handleSetSecondCard({ firstNum, secondNum, pos: 0 })
                    "
                  >
                    {{
                    currentStrategy[firstNum] === 0
                    ? firstNum
                    : currentStrategy[`${firstNum}${secondNum}`] === 0
                    ? secondNum
                    : ""
                    }}
                  </div>
                  <div
                    class="app--num-box app--second-num-box"
                    @click="
                      handleSetSecondCard({ firstNum, secondNum, pos: 1 })
                    "
                    :class="
                      currentStrategy[firstNum] === 1
                        ? 'app--first-num-card'
                        : currentStrategy[`${firstNum}${secondNum}`] === 1
                        ? 'app--second-num-card'
                        : ''
                    "
                  >
                    {{
                    currentStrategy[firstNum] === 1
                    ? firstNum
                    : currentStrategy[`${firstNum}${secondNum}`] === 1
                    ? secondNum
                    : ""
                    }}
                  </div>
                  <div
                    class="app--num-box app--second-num-box"
                    @click="
                      handleSetSecondCard({ firstNum, secondNum, pos: 2 })
                    "
                    :class="
                      currentStrategy[firstNum] === 2
                        ? 'app--first-num-card'
                        : currentStrategy[`${firstNum}${secondNum}`] === 2
                        ? 'app--second-num-card'
                        : ''
                    "
                  >
                    {{
                    currentStrategy[firstNum] === 2
                    ? firstNum
                    : currentStrategy[`${firstNum}${secondNum}`] === 2
                    ? secondNum
                    : ""
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center align-items-center mt-3">
      <button class="btn btn-outline-dark mx-2" @click="handleClearStrategy">Clear all strategies</button>
      <button
        class="btn btn-outline-success mx-2"
        :disabled="filledNum < 60"
        @click="handleSaveStrategy"
      >Save</button>
      <div class="mx-2 app--fillnum-box">{{ filledNum }}</div>
      <div class="mx-2">60</div>
    </div>
    <div class="text-center text-danger my-2">{{ message }}</div>
  </div>
</template>

<script>
import _ from "lodash";
import { randomStrategy } from "./utils";
import SelectStrategy from "./SelectStrategy.vue";

export default {
  components: {
    appSelectStrategy: SelectStrategy
  },
  props: ["strategies"],
  data: function() {
    return {
      selectedStrategyId: 1,
      currentStrategy: null,
      message: ""
    };
  },
  computed: {
    filledNum() {
      let num = 0;
      // const selectedStrategy = this.strategies[this.selectedStrategyId - 1]
      //   .strategy;
      for (let key in this.currentStrategy) {
        if (key.toString().length === 1 && this.currentStrategy[key] !== null) {
          num += 5;
        }
        if (key.toString().length > 1 && this.currentStrategy[key] !== null) {
          num++;
        }
      }
      return num;
    }
    // currentStrategy() {
    //   return this.strategies[this.selectedStrategyId - 1].strategy;
    // }
  },
  methods: {
    handleSetFirstCard(e) {
      this.clearMessage();
      const { num, pos } = e;
      this.currentStrategy[num] = pos;
      for (let key in this.currentStrategy) {
        const strKey = key.toString();
        if (
          strKey.length > 1 &&
          strKey[0] == num &&
          this.currentStrategy[strKey] === pos
        ) {
          this.currentStrategy[strKey] = null;
        }
      }
    },
    handleSetSecondCard(e) {
      this.clearMessage();
      const { firstNum, secondNum, pos } = e;
      if (this.currentStrategy[firstNum] === pos) {
        return;
      }
      const key = firstNum.toString() + secondNum.toString();
      this.currentStrategy[key] = pos;
    },
    handleSelectStrategy(e) {
      this.clearMessage();
      this.selectedStrategyId = e;
      this.currentStrategy = _.cloneDeep(
        this.strategies[this.selectedStrategyId - 1].strategy
      );
      this.showStrategy = false;
    },
    handleClearStrategy() {
      this.clearMessage();
      this.selectedStrategyId = 1;
      this.currentStrategy = _.cloneDeep(
        this.strategies[this.selectedStrategyId - 1].strategy
      );
      localStorage.setItem("appStrategies", JSON.stringify(this.strategies));
      this.$emit("clearStrategy");
    },
    handleSaveStrategy() {
      // console.log(this.currentStrategy);
      if (this.hasDuplicateStrategy()) {
        this.message = "Strategy already entered";
        return;
      }
      const length = this.strategies.length;
      this.selectedStrategyId = length + 1;
      this.strategies.push({
        id: length + 1,
        name: `Strategy${length + 1}`,
        strategy: this.currentStrategy
      });
      localStorage.setItem("appStrategies", JSON.stringify(this.strategies));
      this.message = "Strategy entered";
    },
    hasDuplicateStrategy() {
      for (let i = 0; i < this.strategies.length; i++) {
        if (_.isEqual(this.strategies[i].strategy, this.currentStrategy)) {
          return true;
        }
      }
      return false;
    },
    clearMessage() {
      this.message = "";
    }
  },
  created() {
    this.currentStrategy = _.cloneDeep(
      this.strategies[this.selectedStrategyId - 1].strategy
    );
  }
};
</script>

<style scoped>
.app--num-box {
  width: 30%;
  min-width: 40px;
  height: 40px;
  border: 1px solid #ccc;
  margin: 2px;
  overflow-x: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
.app--first-num-box {
  background-color: #caff70;
  color: #e18b6b;
}
.app--second-num-box {
  background-color: #e18b6b;
}
.app--first-num {
  color: #e18b6b;
}
.app--second-num {
  color: #81beff;
}
.app--first-num-card {
  background-color: white;
  color: #e18b6b;
}
.app--second-num-card {
  background-color: white;
  color: #81beff;
}
.app--fillnum-box {
  border: 1px solid #000;
  background-color: #e18b6b;
  width: 25px;
  height: 100%;
  display: flex;
  justify-content: center;
}
</style>
