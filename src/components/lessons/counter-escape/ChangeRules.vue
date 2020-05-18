<template>
  <div class="container mt-3 mb-5">
    <h3 class="lesson-subheading">Change the rules</h3>
    <hr class="subheading-separator" />
    <form @submit="handleSetRule">
      <div class="app--set-rules">
        <div class="form-group row">
          <label class="col-md-6" for="number-dice-faces">Enter the number of dice faces (2-12)</label>
          <div class="col-md-6">
            <input
              type="number"
              id="number-dice-faces"
              class="form-control"
              v-model="gameRule.diceFaces"
              min="2"
              max="12"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="number-boxes" class="col-md-6">Enter the number of boxes (2-5)</label>
          <div class="col-md-6">
            <input
              type="number"
              id="number-boxes"
              class="form-control"
              v-model="gameRule.boxes"
              min="2"
              max="5"
            />
          </div>
        </div>
      </div>
      <div class="app--select-dice-rules" v-if="numberOfBoxes >= 2 && numberOfBoxes <= 5">
        <div v-for="box in numberOfBoxes" :key="box" class="row p-1">
          <div
            class="col-sm-2 app--rule-number text-info font-weight-bold"
          >{{ gameRule.rule[box] && sortedRule[box].join(',') }}</div>
          <div class="col-sm-10 app--select-one-dice-rule">
            <div class="badge badge-danger mr-3">{{ boxNames[box-1] }}</div>
            <div
              v-for="dice in numberOfDiceFaces"
              :key="dice"
              class="form-check app--form-check mr-3"
            >
              <label :for="box + '-' + dice">
                <input
                  type="radio"
                  :ref="box + '-' + dice"
                  :id="box + '-' + dice"
                  :name="'dice'+dice"
                  class="form-check-input"
                  :value="box"
                  :data-dice="dice"
                  :data-box="box"
                  :checked="gameRule.rule[box] && gameRule.rule[box].indexOf(dice)>=0"
                  @change="handleCheckBox"
                />
                {{ dice }}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center">
        <div
          :style="{ visibility: validation.isValid ? 'hidden':'visible'}"
          class="badge badge-danger"
        >{{ validation.text }}</div>
      </div>
      <div class="app--actions p-3">
        <button class="btn btn-outline-success" type="submit">OK</button>
        <button class="btn btn-outline-danger" type="button" @click="handleReset">Reset</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      // diceFaces: 6,
      // boxes: 3,
      boxNames: ["A", "B", "C", "D", "E"],
      validation: {
        isValid: true,
        text: ""
      },
      face: null
    };
  },
  props: ["gameRule"],
  computed: {
    numberOfDiceFaces() {
      if (
        !Number.isInteger(Number(this.gameRule.diceFaces)) ||
        Number(this.gameRule.diceFaces) < 2
      ) {
        return 2;
      }
      if (Number(this.gameRule.diceFaces) > 12) {
        return 12;
      }
      return Number(this.gameRule.diceFaces);
    },
    numberOfBoxes() {
      if (!Number.isInteger(Number(this.gameRule.boxes))) {
        return 0;
      }
      return Number(this.gameRule.boxes);
    },
    sortedRule() {
      const sortedRule = {};
      for (let key in this.gameRule.rule) {
        let ruleValue = this.gameRule.rule[key].sort((prev, next) => {
          if (prev < next) {
            return -1;
          }
          if (prev > next) {
            return 1;
          }
          return 0;
        });
        sortedRule[key] = ruleValue;
      }
      return sortedRule;
    }
  },
  watch: {
    numberOfDiceFaces(value, prevValue) {
      if (value >= prevValue) {
        return;
      }
      for (let key in this.gameRule.rule) {
        this.gameRule.rule[key] = this.gameRule.rule[key].filter(
          num => num <= value
        );
        // let index = this.gameRule.rule[key].indexOf(prevValue);
        // console.log(index);
        // if (index !== -1) {
        //   this.gameRule.rule[key].splice(index, 1);
        // }
      }
    },
    numberOfBoxes(value) {
      // 如果number of boxes的值增加， 则gameRule.rule对象要相应地增加一条新数组。
      // 相反，如果number of boxex的值减少，则gameRule.rule对象要相应将末尾的数组删除。
      // console.log(value, prevValue);
      // console.log(this.ruleLength);
      const numberOfValue = Number(value);
      const ruleLength = this.getRuleLength();
      if (numberOfValue > ruleLength) {
        // console.log(this.ruleLength);
        const diff = numberOfValue - ruleLength;

        for (let i = 1; i <= diff; i++) {
          // let addedProperty = ruleLength + i;
          // console.log(addedProperty);
          this.gameRule.rule = {
            ...this.gameRule.rule,
            [ruleLength + i]: []
          };
          //this.gameRule.rule[ruleLength + i] = [];
        }
      }
      if (numberOfValue < ruleLength) {
        const numberOfValue = Number(value);
        /// const numberOfRuleLength = ruleLength;
        const diff = ruleLength - numberOfValue;
        for (let i = 1; i <= diff; i++) {
          delete this.gameRule.rule[ruleLength - i + 1];
          this.gameRule.rule = { ...this.gameRule.rule };
        }
      }
    }
  },
  methods: {
    getRuleLength() {
      // Return the last index of the rule
      // e.g. gameRule.rule = {
      //			1: [1],
      //			2: [2, 3],
      //			3: [4, 5, 6]
      //		};
      // getRuleLength() will return 3.
      const keys = Object.keys(this.gameRule.rule);
      // console.log(keys);
      if (keys.length === 0) return 0;
      return Number(keys[keys.length - 1]);
    },
    handleCheckBox(e) {
      // When clicking on the radio, change the rule correspondingly
      const box = Number(e.target.getAttribute("data-box"));
      const dice = Number(e.target.getAttribute("data-dice"));
      for (let key in this.gameRule.rule) {
        let index = this.gameRule.rule[key].indexOf(dice);
        if (index !== -1) {
          this.gameRule.rule[key].splice(index, 1);
        }
      }
      // console.log('dice', e.target.getAttribute('data-dice'));
      // console.log('box', e.target.getAttribute('data-box'));
      this.gameRule.rule[box].push(dice);
    },
    handleReset() {
      this.gameRule.diceFaces = 6;
      this.gameRule.boxes = 3;
      this.gameRule.rule = {
        1: [1],
        2: [2, 3],
        3: [4, 5, 6]
      };
      this.validation = {
        isValid: true,
        text: ""
      };
    },

    handleSetRule(e) {
      e.preventDefault();
      // for(let i=1; i<=this.numberOfDiceFaces; i++) {
      // console.log(i);
      // console.log(e.target['dice'+i].value);
      // }
      if (!this.checkRule()) {
        return;
      }
      this.$emit("backToMenu", -1);
    },

    checkRule() {
      // Check if user's selection is valid
      const { rule } = this.gameRule;
      for (let key in rule) {
        if (rule[key].length === 0) {
          this.validation = {
            isValid: false,
            text: `Put a dice-face number into box ${this.boxNames[key - 1]}`
          };
          return false;
        }
      }

      for (let dice = 1; dice <= this.numberOfDiceFaces; dice++) {
        // console.log(dice);
        let hasDice = false;
        for (let key in rule) {
          // console.log(rule[key].indexOf(dice));
          if (rule[key].indexOf(dice) !== -1) {
            hasDice = true;
          }
        }

        if (!hasDice) {
          this.validation = {
            isValid: false,
            text: `Put dice-face ${dice} into a box`
          };
          return false;
        }
      }
      this.validation = {
        isValid: true,
        text: ""
      };
      return true;
    }
  },
  destroyed() {
    if (!this.checkRule()) {
      this.gameRule.diceFaces = 6;
      this.gameRule.boxes = 3;
      this.gameRule.rule = {
        1: [1],
        2: [2, 3],
        3: [4, 5, 6]
      };
    }
  }
};
</script>

<style scoped>
.app--set-rules {
  max-width: 650px;
  margin: 0 auto;
}
.app--select-dice-rules {
  width: auto;
  margin: 0 auto;
}
.app--rule-number {
  text-align: right;
}
.app--select-one-dice-rule {
  display: flex;
  align-items: center;
}
.app--form-check {
  transform: translateY(15%);
}
.app--actions {
  max-width: 650px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}
@media only screen and (max-width: 576px) {
  .app--rule-number {
    text-align: left;
  }
}
</style>
