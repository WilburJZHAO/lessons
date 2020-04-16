<template>
  <div class="app--plugboard-container">
    <div class="app--plugboard">
      <div v-for="i in 5" :key="i" class="app--plugboard-col-label">
        <div class="app--plugboard-label">
          <div class="app--plugboard-check">
            <label :for="`plugboard-digit-${digitalLabel[i-1].id}`">{{digitalLabel[i-1].digit}}</label>
            <input
              type="radio"
              name="digit"
              :id="`plugboard-digit-${digitalLabel[i-1].id}`"
              :value="5-i+1"
              :disabled="isRadioDisable"
              v-model="totalDigit"
              @change="handleChangeDigit"
            />
          </div>
        </div>
        <!-- Label input -->

        <div class="app--plugboard-col mt-2 pt-2">
          <div v-for="j in 10" :key="j" class="app--plugboard-plug">
            <div
              class="app--plugboard-plug-item"
              :class="{ 'item-disabled': (6-i) > totalDigit }"
              :data-digit="6-i"
              :data-number="10-j"
              :ref="`plugItems${6-i}`"
              @click="handleRecordNumber"
            >
              <i
                class="fas fa-check text-success"
                v-if="numberToCheck && numberToCheckArr[i-(6-totalDigit)]==10-j && numberToCheckArr[i-(6-totalDigit)]==plugboardNumberArr[i-(6-totalDigit)]"
              ></i>
              <!-- 个位：ref=plugItems1 ，十位：ref=plugItems2 ... 万位：ref=plugItems5 -->
              <!-- 0 - plugItemsN[9-0], 1 - plugItems[9-1] ... n - plugItems[9-n] -->
            </div>
          </div>
        </div>

        <!-- <div class="app--plugboard-number mt-2">
					<input
						class="app--plugboard-number-input"
						type="number" :min="0" :max="9"
						v-model="digital[i-1]"
						:disabled="(6-i) > totalDigit"
					>
        </div>-->
      </div>
      <div class="app--plugboard-col-marker pt-2">
        <div>
          <br />
          <br />
        </div>
        <div v-for="k in 10" :key="k" class="app--plugboard-marker text-primary">{{10-k}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { legify } from "../../common/utils.js";
export default {
  props: [
    "plugboardNumber",
    "form",
    "isDisable",
    "isRadioDisable",
    "countingSet",
    "inputDigit",
    "numberToCheck",
    "isCreatingNewNumber"
  ],
  data: function() {
    return {
      totalDigit: 3,
      digitalLabel: [
        { id: 1, digit: legify(10000) + 's' },
        { id: 2, digit: legify(1000) + 's' },
        { id: 3, digit: legify(100) + 's' },
        { id: 4, digit: legify(10) + 's' },
        { id: 5, digit: legify(1) + 's' }
      ],
      // isDisable: false,	// If the board is disabled
      // isRadioDisable: false,	// If radio button is disabled
      plugboardNumberArr: null, // plugboardNumber in array form
      numberToCheckArr: null
    };
  },
  watch: {
    isCreatingNewNumber(value, prevValue) {
      if (prevValue === false && value === true) {
        this.plugboardNumberArr = new Array(this.totalDigit);
      }
    },
    inputDigit(value) {
      if (value) {
        this.totalDigit = value;
      }
    },
    numberToCheck(value) {
      // let number = Number(value);
      // console.log(number);
      if (value === null || value === undefined) {
        this.numberToCheckArr = new Array(this.totalDigit);
      } else {
        this.numberToCheckArr = value.toString().split(""); // Convert to array
        if (this.numberToCheckArr.length < this.totalDigit) {
          this.numberToCheckArr.reverse();
          for (let i = 0; i < this.totalDigit; i++) {
            if (!this.numberToCheckArr[i]) {
              this.numberToCheckArr[i] = 0;
            }
          }
          this.numberToCheckArr.reverse();
        }
      }
      // console.log(this.numberToCheckArr);
    },
    plugboardNumber(value, prevValue) {
      // let number;
      // if(value===null) {
      // 	number = null;
      // } else {
      // 	number = Number(value);
      // }
      let number = Number(value);
      // console.log(number);
      if (value === null || value === undefined) {
        this.plugboardNumberArr = new Array(this.totalDigit);
      } else {
        this.plugboardNumberArr = value.toString().split(""); // convert to array
        // e.g. 352 -> [3, 5, 2]
        if (this.plugboardNumberArr.length < this.totalDigit) {
          // 如果实际数字的位数小于总位数，则在前面补0以达到指定位数
          // e.g. 12 -> [0, 0, 1, 2] (totalDigit = 4)
          this.plugboardNumberArr.reverse();
          for (let i = 0; i < this.totalDigit; i++) {
            if (!this.plugboardNumberArr[i]) {
              this.plugboardNumberArr[i] = 0;
            }
          }
          this.plugboardNumberArr.reverse();
        }
      }
      for (let i = 0; i < this.plugboardNumberArr.length; i++) {
        // 根据数字对plugboard对应的圆上色以反映该数字
        let refPlugItems = this.$refs[
          "plugItems" + (this.plugboardNumberArr.length - i)
        ];
        refPlugItems.forEach(item => {
          item.classList.remove("item-clicked");
        });
        if (refPlugItems[9 - this.plugboardNumberArr[i]]) {
          refPlugItems[9 - this.plugboardNumberArr[i]].classList.add(
            "item-clicked"
          );
        }
      }
    }
  },
  methods: {
    handleChangeDigit(e) {
      // console.log(this.totalDigit);
      this.$emit("setDigit", this.totalDigit);
    },
    handleRecordNumber(e) {
      if (this.isDisable) return;
      const digit = e.target.getAttribute("data-digit");
      const number = e.target.getAttribute("data-number");
      const plugItems = this.$refs["plugItems" + digit];
      const plugItemClicked = plugItems[9 - number];
      if (plugItemClicked.classList.contains("item-disabled")) {
        return;
      }
      plugItems.forEach(item => {
        item.classList.remove("item-clicked");
      });
      plugItemClicked.classList.add("item-clicked");
      // console.log(digit, number);
      // console.log(plugItemClicked);
      this.plugboardNumberArr[this.plugboardNumberArr.length - digit] = number;
      this.plugboardNumberArr = [...this.plugboardNumberArr];
      // console.log(this.plugboardNumberArr);
      // console.log(Number(this.plugboardNumberArr.join('')));
      // this.plugboardNumber = Number(this.plugboardNumberArr.join(''));
      this.$emit(
        "setPlugboardNumber",
        Number(this.plugboardNumberArr.join(""))
      );
      // Emit the number made by plugboard
    }
  },
  created() {
    this.$emit("setDigit", this.totalDigit);
    this.plugboardNumberArr = new Array(this.totalDigit);
    this.numberToCheckArr = new Array(this.totalDigit);
  }
};
</script>

<style scoped>
.app--plugboard {
  display: flex;
}
.app--plugboard-col-label {
  width: 18%;
}

.app--plugboard-check {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.app--plugboard-check label {
  width: 100%;
  text-align: center;
}
.app--plugboard-col {
  background-color: red;
}
.app--plugboard-plug {
  display: flex;
  justify-content: center;
  height: 50px;
}
.app--plugboard-plug .item-disabled {
  background-color: red;
}
.app--plugboard-plug .item-clicked {
  background-color: yellow;
}
.app--plugboard-plug-item {
  width: 40px;
  height: 40px;
  border: 1px solid #000;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.app--plugboard-number {
  display: flex;
  justify-content: center;
  align-items: center;
}
.app--plugboard-number-input {
  width: 60%;
  height: 30px;
  border: 1px solid #000;
  display: flex;
  justify-content: center;
  padding-left: 12%;
}

.app--plugboard-col-marker {
  width: 10%;
}
.app--plugboard-marker {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
