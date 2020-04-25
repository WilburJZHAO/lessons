<template>
  <div class="container mt-3">
    <h3 class="lesson-subheading">Systematically test all 2 digit numbers</h3>
    <hr class="subheading-speartor" />
    <div class="row">
      <div class="col-md-4 d-flex justify-content-around">
        <div class="flex-grow-1 mr-2">
          <h5>{{ digitList[0].length }} digit list</h5>
          <ul class="list-group" id="list1">
            <li
              class="list-group-item"
              :class="
                number === digitCombLeft && numberIndex !== -1 ? 'active' : ''
              "
              v-for="(number, index) in digitList"
              :key="`list1-${index}`"
            >{{ number }}</li>
          </ul>
          <div class="text-center">
            <div class="badge badge-dark">{{ digitList.length }}</div>
          </div>
        </div>
        <div>
          <h5>Combine with</h5>
          <ul class="list-group">
            <li
              class="list-group-item list-group-item-primary"
              :class="
                number === digitCombRight && numberIndex !== -1 ? 'active' : ''
              "
              v-for="(number, index) in combineWith"
              :key="`list2-${index}`"
            >{{ number }}</li>
          </ul>
          <div class="text-center">
            <div class="badge badge-primary">{{ combineWith.length }}</div>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="d-flex justify-content-around">
          <div class="w-100">
            <h5>Possible {{ digits }} digit list</h5>
            <ul class="list-group" id="list3">
              <li
                class="list-group-item list-group-item-danger"
                :class="item.num === numberInput ? 'active' : ''"
                v-for="(item, index) in possibleDigitList"
                :key="`list3-${index}`"
                style="cursor: pointer;"
                @click="handleClickNumber(item.num)"
              >{{ item.num }}</li>
            </ul>
            <div class="text-center">
              <div class="badge badge-danger">{{ possibleDigitList.length }}</div>
            </div>
          </div>
          <div class="flex-shrink-1 mx-2">
            <h5>Test</h5>
            <div>Division by {{ digits }}</div>
          </div>
          <div class="w-100">
            <h5>{{ digits }} digit list</h5>
            <ul class="list-group" id="list4">
              <li
                class="list-group-item list-group-item-warning"
                :class="item.num === numberInput ? 'active' : ''"
                v-for="(item, index) in possibleDigitList"
                :key="`list4-${index}`"
              >
                <span
                  :style="{
                    visibility: item.canbeDivided ? 'visible' : 'hidden'
                  }"
                >{{ item.num }}</span>
              </li>
            </ul>
            <div class="text-center">
              <div class="badge badge-warning">{{ numberOfDivision }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mb-3"></div>
    <div style="max-width: 300px; margin: 0 auto;">
      <input type="text" class="form-control" v-model="numberInput" @input="handleInputNumber" />
    </div>
    <div class="text-center">
      <label>To test: Enter a number or click on any multi-digit number in a list</label>
    </div>
    <div class="mb-3"></div>
    <div class="text-center">
      <button v-if="finished" class="btn btn-outline-dark" @click="handleReset">Reset</button>
      <button
        v-else
        class="btn btn-outline-success"
        @click="handleNextPlaceValue"
      >Press for next place value</button>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      digitList: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      combineWith: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      numberInput: "",
      finished: false
    };
  },
  computed: {
    digits() {
      return this.digitList[0].length + 1;
    },
    possibleDigitList() {
      const combArr = [];
      const division = this.digitList[0].length + 1;
      let num1, num2;
      for (let i = 0; i < this.digitList.length; i++) {
        num1 = this.digitList[i];
        for (let j = 0; j < this.combineWith.length; j++) {
          num2 = this.combineWith[j];
          if (num1.indexOf(num2) === -1) {
            combArr.push({
              num: num1 + num2,
              canbeDivided: Number(num1 + num2) % this.digits === 0
            });
          }
        }
      }
      return combArr;
    },
    digitCombLeft() {
      if (this.numberInput.length === this.digits) {
        return this.numberInput.substring(0, this.numberInput.length - 1);
      } else {
        return "";
      }
    },
    digitCombRight() {
      if (this.numberInput.length === this.digits) {
        return this.numberInput.substring(this.numberInput.length - 1);
      } else {
        return "";
      }
    },
    numberIndex() {
      return this.possibleDigitList.findIndex(
        item => item.num === this.numberInput
      );
    },
    numberOfDivision() {
      let num = 0;
      this.possibleDigitList.forEach(item => {
        if (item.canbeDivided) {
          num++;
        }
      });
      return num;
    }
  },
  watch: {
    numberInput(value) {
      if (this.numberIndex === -1) {
        return;
      }
      const elList1 = document.getElementById("list1");
      const elList4 = document.getElementById("list4");
      elList1.scrollTop =
        (this.digitList.indexOf(this.digitCombLeft) / this.digitList.length) *
          elList1.scrollHeight -
        75;

      elList4.scrollTop =
        (this.numberIndex / this.possibleDigitList.length) *
          elList4.scrollHeight -
        75;
      // console.log(elList1.scrollHeight);
    }
  },
  methods: {
    handleNextPlaceValue() {
      const nextDigitList = [];
      this.possibleDigitList.forEach(item => {
        if (item.canbeDivided) {
          nextDigitList.push(item.num);
        }
      });
      this.digitList = nextDigitList;
      this.numberInput = "";
      if (this.digits === 10) {
        this.finished = true;
      }
    },
    handleReset() {
      this.digitList = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
      this.finished = false;
      this.numberInput = "";
    },
    handleClickNumber(e) {
      this.numberInput = e;
    },
    handleInputNumber(e) {
      if (this.numberIndex === -1) {
        return;
      }
      // console.log(this.numberInput);
      const elList3 = document.getElementById("list3");
      elList3.scrollTop =
        (this.numberIndex / this.possibleDigitList.length) *
          elList3.scrollHeight -
        75;
    }
  }
};
</script>

<style scoped>
.list-group {
  height: 422px;
  overflow: auto;
}
.list-group-item {
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>
