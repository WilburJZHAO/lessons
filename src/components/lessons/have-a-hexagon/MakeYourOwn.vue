<template>
  <div class="container mt-3 mb-5">
    <h3 class="lesson-subheading">Make your own hexagon</h3>
    <hr class="subheading-separator">
    <div class="mt-4 row">
      <app-hexagon class="col-md-4" :data="hexLeft" :selected="[]"></app-hexagon>
      <app-hexagon class="col-md-4" :data="hexMiddle" :selected="[]"></app-hexagon>
      <app-hexagon class="col-md-4" :data="hexRight" :selected="[]"></app-hexagon>
    </div>
    <div class="app--set-hexagon">
      <div class="app--set-hexagon-row">
        <div class="app--set-hexagon-label">Left</div>
        <div class="app--set-hexagon-input" v-for="(number, index) in hexLeft" :key="index">
          <input
            type="number"
            min="1"
            max="36"
            class="form-control"
            :class="{
              'is-invalid': !hexSettingCheck[0][index].valid
            }"
            v-model.number="hexLeft[index]"
          />
        </div>
      </div>
      <div class="app--set-hexagon-row">
        <div class="app--set-hexagon-label">Middle</div>
        <div class="app--set-hexagon-input" v-for="(number, index) in hexMiddle" :key="index">
          <input
            type="number"
            min="1"
            max="36"
            class="form-control"
            :class="{
              'is-invalid': !hexSettingCheck[1][index].valid
            }"
            v-model.number="hexMiddle[index]"
          />
        </div>
      </div>
      <div class="app--set-hexagon-row">
        <div class="app--set-hexagon-label">Right</div>
        <div class="app--set-hexagon-input" v-for="(number, index) in hexRight" :key="index">
          <input
            type="number"
            min="1"
            max="36"
            class="form-control"
            :class="{
              'is-invalid': !hexSettingCheck[2][index].valid
            }"
            v-model.number="hexRight[index]"
          />
        </div>
      </div>
    </div>
    <div
      class="text-primary text-center"
    >Note: Number should be the product of any two natural numbers from 1 to 6 and can be used once only.</div>
    <div class="app--action mt-3">
      <button class="btn btn-outline-success" @click="handleSetting">OK</button>
      <button class="btn btn-outline-dark" @click="handleRestore">Restore</button>
    </div>
    <div class="text-center mt-2" v-if="invalidMessage">
      <div class="badge badge-danger">{{ invalidMessage }}</div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import Hexagon from "./Hexagon.vue";

export default {
  components: {
    appHexagon: Hexagon
  },
  props: ["hexSetting"],
  data: function() {
    return {
      hexLeft: [],
      hexMiddle: [],
      hexRight: [],
      invalidMessage: "",
      hexSettingCheck: [],
      ownHexSetting: null
    };
  },
  methods: {
    handleSetting() {
      if (!this.checkInputHexagon()) {
        this.invalidMessage =
          "There's invalid number, please check your input!";
        return;
      }
      this.$emit("setHexSetting", this.ownHexSetting);
      this.$emit("backToMenu", -1);
    },
    handleRestore() {
      // this.hexSetting[0][0] = 8;
      this.hexLeft = [8, 9, 10, 12, 15, 16];
      this.hexMiddle = [1, 2, 3, 4, 5, 6];
      this.hexRight = [18, 20, 24, 25, 30, 36];
      this.invalidMessage = "";
      // this.hexLeft = [...this.hexSetting[0]];
      // this.hexMiddle = [...this.hexSetting[1]];
      // this.hexRight = [...this.hexSetting[2]];
      this.ownHexSetting[0] = this.hexLeft;
      this.ownHexSetting[1] = this.hexMiddle;
      this.ownHexSetting[2] = this.hexRight;
      this.initHexSettingCheck();
    },
    checkInputHexagon() {
      const numberList = [
        1,
        2,
        3,
        4,
        5,
        6,
        8,
        9,
        10,
        12,
        15,
        16,
        18,
        20,
        24,
        25,
        30,
        36
      ];
      // const checkList = [...this.hexLeft, ...this.hexMiddle, ...this.hexRight];
      // for (let i = 0; i < numberList.length; i++) {
      //   if (checkList.indexOf(numberList[i]) === -1) {
      //     return false;
      //   }
      // }
      // console.log("check");
      this.initHexSettingCheck();
      for (let i = 0; i < this.hexSettingCheck.length; i++) {
        for (let j = 0; j < this.hexSettingCheck[i].length; j++) {
          // Check if the input number is the product of 1 - 6.
          if (numberList.indexOf(this.hexSettingCheck[i][j].number) === -1) {
            this.hexSettingCheck[i][j].valid = false;
          }

          // Check if there is duplicate input
          for (let ii = 0; ii < this.hexSettingCheck.length; ii++) {
            for (let jj = 0; jj < this.hexSettingCheck[ii].length; jj++) {
              if (
                this.hexSettingCheck[i][j].number ===
                  this.hexSettingCheck[ii][jj].number &&
                !(i === ii && j === jj)
              ) {
                this.hexSettingCheck[i][j].valid = false;
                this.hexSettingCheck[ii][jj].valid = false;
              }
            }
          }
        }
      }

      this.hexSettingCheck = [...this.hexSettingCheck];
      for (let i = 0; i < this.hexSettingCheck.length; i++) {
        for (let j = 0; j < this.hexSettingCheck[i].length; j++) {
          if (!this.hexSettingCheck[i][j].valid) {
            return false;
          }
        }
      }

      return true;
    },
    initHexSettingCheck() {
      for (let i = 0; i < this.ownHexSetting.length; i++) {
        this.hexSettingCheck[i] = [];
        let hex = this.ownHexSetting[i];
        for (let j = 0; j < hex.length; j++) {
          this.hexSettingCheck[i].push({
            number: hex[j],
            valid: true
          });
        }
      }
    }
  },
  created() {
    this.ownHexSetting = _.cloneDeep(this.hexSetting);
    this.initHexSettingCheck();
    this.hexLeft = this.ownHexSetting[0];
    this.hexMiddle = this.ownHexSetting[1];
    this.hexRight = this.ownHexSetting[2];
  }
};
</script>

<style scoped>
.app--set-hexagon-row {
  display: flex;
  margin-bottom: 1rem;
}
.app--set-hexagon-label {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;
  width: 35px;
}
.app--set-hexagon-input {
  flex: 1;
  margin-left: 1rem;
}
.app--action {
  display: flex;
  justify-content: space-around;
  max-width: 400px;
  margin: 0 auto;
}

@media only screen and (max-width: 425px) {
  .app--set-hexagon-label {
    font-size: 12px;
    width: 30px;
  }
  .app--set-hexagon-input {
    margin-left: 0;
  }
}
</style>
