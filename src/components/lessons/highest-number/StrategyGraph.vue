<template>
  <div>
    <h5>{{strategyName}}</h5>
    <div class="d-flex app--graph-container">
      <div>
        <div v-for="num in 6" :key="`firstcard${num}`">
          <div class="d-flex" style="color: red;">
            <div class="app--num-box">{{ strategy[num] === 0 ? num : ''}}</div>
            <div class="app--num-box">{{ strategy[num] === 1 ? num : ''}}</div>
            <div class="app--num-box">{{ strategy[num] === 2 ? num : ''}}</div>
          </div>
        </div>
      </div>
      <div>
        <div v-for="firstNum in 6" :key="`secondrow${firstNum}`" class="d-flex">
          <div v-for="secondNum in 6" :key="`secondcard${secondNum}`">
            <div v-if="secondNum !== firstNum" class="ml-1">
              <div class="d-flex">
                <div
                  class="app--num-box app--second-num-box"
                  :class="
                      strategy[firstNum] === 0
                        ? 'app--first-num-card'
                        : strategy[`${firstNum}${secondNum}`] === 0
                        ? 'app--second-num-card'
                        : ''
                    "
                >
                  {{
                  strategy[firstNum] === 0
                  ? firstNum
                  : strategy[`${firstNum}${secondNum}`] === 0
                  ? secondNum
                  : ""
                  }}
                </div>
                <div
                  class="app--num-box app--second-num-box"
                  :class="
                      strategy[firstNum] === 1
                        ? 'app--first-num-card'
                        : strategy[`${firstNum}${secondNum}`] === 1
                        ? 'app--second-num-card'
                        : ''
                    "
                >
                  {{
                  strategy[firstNum] === 1
                  ? firstNum
                  : strategy[`${firstNum}${secondNum}`] === 1
                  ? secondNum
                  : ""
                  }}
                </div>
                <div
                  class="app--num-box app--second-num-box"
                  :class="
                      strategy[firstNum] === 2
                        ? 'app--first-num-card'
                        : strategy[`${firstNum}${secondNum}`] === 2
                        ? 'app--second-num-card'
                        : ''
                    "
                >
                  {{
                  strategy[firstNum] === 2
                  ? firstNum
                  : strategy[`${firstNum}${secondNum}`] === 2
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
</template>

<script>
export default {
  props: ["strategy", "strategyName"]
};
</script>

<style scoped>
.app--num-box {
  width: 30%;
  min-width: 20px;
  height: 25px;
  border: 1px solid #333;
  margin: 2px;
  overflow-x: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  font-size: 8px;
  font-weight: bold;
}
.app--first-num-card {
  color: red;
}
.app--second-num-card {
  color: blue;
}

@media only screen and (max-width: 576px) {
  .app--graph-container {
    overflow: auto;
  }
}
</style>