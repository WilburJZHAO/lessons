<template>
  <div class="container mt-3">
    <h3 class="lesson-subheading">Draw a spirolateral</h3>
    <hr class="subheading-separator" />
    <div class="row">
      <div class="col-md-9">
        <h6 :style="{ visibility: status === 0 ? 'hidden' : 'visible' }">
          Order {{ order }}
          <span v-if="currentRepeats > 0">Repeats: {{ currentRepeats }}</span>
        </h6>
        <app-board
          :order="order"
          :currentOrder="currentOrder"
          :status="status"
          :drawGrid="true"
          :id="1"
          :rule="'LLL'"
          :reset="true"
          :active="true"
          @drawSuccess="handleDrawSuccess"
          @drawFailure="handleDrawFailure"
          @drawing="isDrawing=$event"
        ></app-board>
        <div class="mb-3"></div>
        <div class="text-center" v-if="status ===1 || status===2">
          <button
            class="btn btn-outline-success"
            @click="handleDrawing"
            v-if="demoAutoOption === '0'"
          >Draw next line</button>
          <button
            class="btn btn-outline-success"
            @click="handleToggleTimer"
            v-if="demoAutoOption === '1'"
          >
            {{
            status === 1
            ? "Start"
            : timer
            ? "Pause"
            : "Resume"
            }}
          </button>
          <app-demo-auto-option @changeOption="demoAutoOption = $event" :option="demoAutoOption"></app-demo-auto-option>
        </div>
        <div v-if="status===3" class="text-center">
          <div
            class="text-danger"
          >Order {{ order }} {{ orderEntered ? 'already entered in' : 'added to'}} the list</div>
          <button class="btn btn-outline-success" @click="handleNext">Next spirolateral</button>
        </div>
        <div class="mb-3"></div>
      </div>
      <div class="col-md-3 d-flex flex-column" style="height: 80vh;">
        <div class="flex-grow-1">
          <table class="table text-center">
            <thead>
              <tr>
                <th>Order</th>
                <th>Repeats</th>
              </tr>
            </thead>
            <tbody style="overflow: auto; max-height: 500px;">
              <tr v-for="(el, index) in gameData" :key="index">
                <td>{{ el.order }}</td>
                <td>{{ el.repeats }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="status === 0">
          <input
            type="text"
            class="form-control"
            v-model.number="order"
            @keypress="handleCheckInput"
          />
          <div class="text-danger">Enter the order number (1 to 100)</div>
          <div class="mt-2 text-center">
            <button
              class="btn btn-outline-success"
              :disabled="!validOrderInput"
              @click="handleOk"
            >OK</button>
          </div>
        </div>
        <div v-else class="text-center">
          <button class="btn btn-outline-success" @click="handleNew">New</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Board from "./Board.vue";
import DemoAutoOption from "../../common/DemoAutoOption.vue";
export default {
  components: {
    appBoard: Board,
    appDemoAutoOption: DemoAutoOption
  },
  data: function() {
    return {
      order: "",
      currentOrder: 0,
      gameData: [],
      status: 0,
      // 0 - not started, 1 - order is inputed, ready to start, 2 - is drawing, 3 - finished
      demoAutoOption: "0",
      timer: null,
      orderEntered: false,
      isDrawing: false
    };
  },
  watch: {
    demoAutoOption(value) {
      if (value === "0" && this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    status(value) {
      if (value === 3 && this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  },
  computed: {
    validOrderInput() {
      if (this.order >= 1 && this.order <= 100) {
        return true;
      }
      return false;
    },
    currentRepeats() {
      if (!this.order) {
        return 0;
      }
      return Math.floor(this.currentOrder / this.order);
    },
    timerInterval() {
      if (this.order >= 1 && this.order <= 10) {
        return 100;
      } else if (this.order > 10 && this.order <= 30) {
        return 50;
      } else if (this.order > 30 && this.order <= 70) {
        return 10;
      } else {
        return 1;
      }
    }
  },
  methods: {
    handleCheckInput(e) {
      const { charCode } = e;
      if (!(charCode >= 48 && charCode <= 57)) {
        e.preventDefault();
      }
    },

    handleOk() {
      this.status = 1;
    },
    handleNew() {
      this.order = "";
      this.currentOrder = 0;
      this.status = 0;
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    handleDrawing() {
      if (this.status === 1) {
        this.status = 2;
      }
      if (this.isDrawing) {
        return;
      }
      this.currentOrder++;
    },
    handleToggleTimer() {
      if (!this.timer) {
        this.timer = setInterval(this.handleDrawing, 100);
      } else {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    handleDrawSuccess() {
      const foundIndex = this.gameData.findIndex(
        data => data.order === this.order
      );
      this.status = 3;
      if (foundIndex >= 0) {
        this.orderEntered = true;
        return;
      }
      this.orderEntered = false;
      this.gameData.push({
        order: this.order,
        repeats: this.currentRepeats
      });
    },
    handleDrawFailure() {
      const foundIndex = this.gameData.findIndex(
        data => data.order === this.order
      );
      this.status = 3;
      if (foundIndex >= 0) {
        this.orderEntered = true;
        return;
      }
      this.orderEntered = false;
      this.gameData.push({
        order: this.order,
        repeats: "Off the grid"
      });
    },
    handleNext() {
      this.status = 0;
      this.order = "";
      this.currentOrder = 0;
      this.isDrawing = false;
    }
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
};
</script>

<style scoped>
</style>
