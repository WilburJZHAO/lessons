<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6">
        <div class="d-flex justify-content-between">
          <div class="pr-3 flex-grow-1" style="width: 70%;">
            <table class="table table-bordered text-center">
              <tr>
                <td rowspan="2"></td>
                <th>In</th>
                <th class="text-primary">Out</th>
              </tr>
              <tr>
                <th>x</th>
                <th class="text-primary">y</th>
              </tr>
              <tr v-for="i in 10" :key="i">
                <td style="width:25px; !important">#{{i}}</td>
                <td style="width:50%;">
                  <span
                    v-if="ruleArr[i-1] && ruleArr[i-1].blank !=='in'"
                  >{{ruleArr[i-1] && ruleArr[i-1].in}}</span>
                  <span v-if="ruleArr[i-1] && ruleArr[i-1].blank ==='in'" class="d-flex">
                    <input
                      type="text"
                      class="form-control text-center"
                      v-model.number="input[i-1]"
                      :disabled="ruleArr[i-1].check===true"
                    />
                    <i
                      class="fas fa-check text-success"
                      :style="{visibility: ruleArr[i-1].check===true ? 'visible' : 'hidden'}"
                    ></i>
                  </span>
                </td>
                <td class="text-primary" style="width:50%;">
                  <span
                    v-if="ruleArr[i-1] && ruleArr[i-1].blank !=='out'"
                  >{{ruleArr[i-1] && ruleArr[i-1].out}}</span>
                  <span v-if="ruleArr[i-1] && ruleArr[i-1].blank ==='out'" class="d-flex">
                    <input
                      type="text"
                      class="form-control text-center"
                      v-model.number="input[i-1]"
                      :disabled="ruleArr[i-1].check===true"
                    />
                    <i
                      class="fas fa-check text-success"
                      :style="{visibility: ruleArr[i-1].check===true ? 'visible' : 'hidden'}"
                    ></i>
                  </span>
                </td>
              </tr>
            </table>
          </div>
          <div>
            <div class="text-center mb-3">
              <button
                class="btn btn-outline-dark btn-block"
                @click="handleNewRule"
                :disabled="status===1"
              >New rule</button>
            </div>
            <div class="text-center mb-3">
              <button
                class="btn btn-outline-success btn-block"
                @click="handleCheck"
                :disabled="status===0"
              >Check values</button>
            </div>
            <div class="text-center mb-3">
              <button
                class="btn btn-outline-success btn-block"
                @click="handleAnswer"
                :disabled="status===0 || status===2"
              >Show answers</button>
            </div>
            <div class="text-center">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  id="level1"
                  :value="1"
                  v-model="level"
                  :disabled="status===1"
                />
                <label class="form-check-label" for="level1">Level 1</label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  id="level2"
                  :value="2"
                  v-model="level"
                  :disabled="status===1"
                />
                <label class="form-check-label" for="level2">Level 2</label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  id="level3"
                  :value="3"
                  v-model="level"
                  :disabled="status===1"
                />
                <label class="form-check-label" for="level3">Level 3</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <h5 class="text-center mb-3">Type your rule in words</h5>
        <textarea v-model="ruleWordsInput" rows="3" class="form-control mb-4"></textarea>
        <div style="min-height: 50px;">
          <div v-if="ruleWords && status===2">
            <h6>One way of writing the rule is:</h6>
            <p>{{ ruleWords }}</p>
          </div>
        </div>
        <h5 class="text-center mt-3 mb-3">Type your rule using symbols</h5>
        <div class="d-flex">
          <input
            type="text"
            v-model="ruleFormationInput"
            class="form-control mb-4"
            :disabled="ruleFormationCheck"
          />
          <i
            class="fas fa-check text-success"
            :style="{visibility: ruleFormationCheck ?'visible':'hidden'}"
          ></i>
        </div>
        <div style="min-height: 50px;">
          <div v-if="ruleFormation && status===2">
            <h6>One way of writing the rule in symbols is:</h6>
            <p>{{ ruleFormation }}</p>
          </div>
        </div>
        <div v-if="status===1" class="alert alert-danger">Fill in the table or write your rule</div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  generateRule,
  generateFormation,
  generateRuleArray,
  generateWords,
  converStr
} from "./utils";
export default {
  data: function() {
    return {
      rule: {},
      ruleArr: [],
      ruleFormation: "",
      ruleWords: "",
      status: 0,
      // 0 - ready for start
      // 1 - rule generated
      // 2- answer displayed
      ruleWordsInput: "",
      ruleFormationInput: "",
      ruleFormationCheck: null,
      level: 1,
      input: []
    };
  },
  methods: {
    handleNewRule() {
      this.rule = generateRule(this.level);
      this.ruleArr = generateRuleArray(this.rule);
      this.ruleFormation = generateFormation(this.rule);
      this.ruleWords = generateWords(this.rule);
      this.status = 1;
      this.ruleWordsInput = "";
      this.ruleFormationInput = "";
      this.input = [];
      this.ruleFormationCheck = null;
    },
    handleAnswer() {
      this.status = 2;
    },
    handleCheck() {
      for (let i = 0; i < this.ruleArr.length; i++) {
        if (this.ruleArr[i].blank === "out") {
          if (this.ruleArr[i].out === this.input[i]) {
            this.ruleArr[i].check = true;
          } else {
            this.ruleArr[i].check = false;
          }
        }
        if (this.ruleArr[i].blank === "in") {
          if (this.ruleArr[i].in === this.input[i]) {
            this.ruleArr[i].check = true;
          } else {
            this.ruleArr[i].check = false;
          }
        }
      }

      this.ruleFormationCheck =
        converStr(this.ruleFormationInput) === converStr(this.ruleFormation);
    }
  }
};
</script>

<style scoped></style>
