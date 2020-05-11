<template>
  <div>
    <transition appear appear-class="app-appear" appear-active-class="app-appear-active">
      <div class="container mt-3">
        <h3 class="lesson-subheading">Change the numbers</h3>
        <hr class="subheading-separator" />
        <div class="row">
          <div class="col-12 app--lesson-action">
            <div>
              <h5
                class="text-success"
              >Click on tile to select. Click again to deselect. Red tiles are selected.</h5>

              <div style="width: 100%;background-color: transparent;text-align: left" id="dragArea">
                <div style="display: inline-block;">
                  <div class="drag-drop" id="y1" ref="myDraggable" @click="addOrCancel($event)">1</div>
                </div>
                <div style="display: inline-block;">
                  <div class="drag-drop" id="y2" ref="myDraggable2" @click="addOrCancel($event)">2</div>
                </div>
                <div style="display: inline-block">
                  <div class="drag-drop" id="y3" ref="myDraggable3" @click="addOrCancel($event)">3</div>
                </div>
                <div style="display: inline-block">
                  <div class="drag-drop" id="y4" ref="myDraggable4" @click="addOrCancel($event)">4</div>
                </div>
                <div style="display: inline-block">
                  <div class="drag-drop" id="y5" ref="myDraggable5" @click="addOrCancel($event)">5</div>
                </div>
                <div style="display: inline-block">
                  <div class="drag-drop" id="y6" ref="myDraggable6" @click="addOrCancel($event)">6</div>
                </div>
                <div style="display: inline-block">
                  <div class="drag-drop" id="y7" ref="myDraggable7" @click="addOrCancel($event)">7</div>
                </div>
                <div style="display: inline-block">
                  <div class="drag-drop" id="y8" ref="myDraggable8" @click="addOrCancel($event)">8</div>
                </div>
                <div style="display: inline-block">
                  <div class="drag-drop" id="y9" ref="myDraggable9" @click="addOrCancel($event)">9</div>
                </div>
              </div>
              <div class="app--lesson-action"></div>
              <div class="tt--solutions mb-5" style="padding-bottom: 30px">
                <div class="mr-3 tt--solutions-count">
                  <button
                    type="submit"
                    class="btn btn-outline-success btn-lg mr-5"
                    @click="handleSave"
                  >Save and Return</button>
                  <button type="submit" class="btn btn-outline-dark btn-lg" @click="reset">Reset</button>

                  <p class="alert-danger alert" v-if="alertIf">{{alert}}</p>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
var numbers = [3, 4, 5, 6, 7];
export default {
  numbers,
  data: function() {
    return {
      alert: "",
      alertIf: false
    };
  },
  created: function() {},
  mounted: function() {
    for (var i = 0; i < numbers.length; i++) {
      this.initColor(numbers[i]);
    }
  },
  methods: {
    numberReturn: function() {
      return numbers;
    },
    initColor: function(i) {
      if (i == 1) {
        this.$refs.myDraggable.classList = "selected";
      } else if (i == 2) {
        this.$refs.myDraggable2.classList = "selected";
      } else if (i == 3) {
        this.$refs.myDraggable3.classList = "selected";
      } else if (i == 4) {
        this.$refs.myDraggable4.classList = "selected";
      } else if (i == 5) {
        this.$refs.myDraggable5.classList = "selected";
      } else if (i == 6) {
        this.$refs.myDraggable6.classList = "selected";
      } else if (i == 7) {
        this.$refs.myDraggable7.classList = "selected";
      } else if (i == 8) {
        this.$refs.myDraggable8.classList = "selected";
      } else if (i == 9) {
        this.$refs.myDraggable9.classList = "selected";
      }
    },
    addOrCancel: function($event) {
      var cur = event.target;
      var value = cur.innerHTML * 1;

      if (cur.classList == "selected") {
        if (numbers.length >= 5) {
          this.alertIf = false;
          cur.classList = "drag-drop";
          this.removeByValue(value);
        } else {
          this.alertIf = true;
          this.alert = "At least 4 tiles must be selected!";
        }
      } else if (cur.classList == "drag-drop") {
        this.alertIf = false;
        cur.classList = "selected";
        numbers.push(value);
        numbers.sort(function(a, b) {
          return a - b;
        });
      }
    },
    removeByValue: function(val) {
      for (var i = 0; i < numbers.length; i++) {
        if (numbers[i] == val) {
          numbers.splice(i, 1);
          break;
        }
      }
    },
    reset: function() {
      numbers = [3, 4, 5, 6, 7];
      this.alertIf = false;
      this.$refs.myDraggable.classList = "drag-drop";
      this.$refs.myDraggable2.classList = "drag-drop";
      this.$refs.myDraggable3.classList = "drag-drop";
      this.$refs.myDraggable4.classList = "drag-drop";
      this.$refs.myDraggable5.classList = "drag-drop";
      this.$refs.myDraggable6.classList = "drag-drop";
      this.$refs.myDraggable7.classList = "drag-drop";
      this.$refs.myDraggable8.classList = "drag-drop";
      this.$refs.myDraggable9.classList = "drag-drop";
      for (var i = 0; i < numbers.length; i++) {
        this.initColor(numbers[i]);
      }
    },
    handleSave() {
      this.$emit("backToMenu", -1);
    }
  },
  name: "ChangeNumbers"
};
</script>

<style scoped>
.selected {
  color: white;
  background: #cc3333;
  -ms-touch-action: none;
  touch-action: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-size: 25px;
  height: 45px;
  width: 45px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: solid 1px #7f8c8d;
  border-radius: 0.4vw;
  text-align: center;
}
.dropzone {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-size: 35px;
  height: 45px;
  width: 45px;
  padding: 0;
  margin: 5px;
}
.functionzone {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-size: 35px;
  height: 40px;
  width: 40px;
  padding: 0;
  margin: 1vw;
  text-align: center;
}
.drag-drop {
  -ms-touch-action: none;
  touch-action: none;
  background: #4e4;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-size: 25px;
  height: 45px;
  width: 45px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: solid 1px #7f8c8d;
  border-radius: 0.4vw;
  text-align: center;
}
.drag-drop:hover {
  background: #eeeeee;
}
.drop-active {
  border-color: #aaa;
}

.drop-target {
  background-color: #4e4;
  /* //border-style: solid; */
}
.dropped {
  background: #eeeeee;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-size: 25px;
  height: 45px;
  width: 45px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: solid 1px #7f8c8d;
  border-radius: 0.4vw;
  text-align: center;
}
.dropped {
  color: #7f8c8d;
}
.dropzone-drop {
  touch-action: none;
  -ms-touch-action: none;
  font-size: 30px;
}
</style>