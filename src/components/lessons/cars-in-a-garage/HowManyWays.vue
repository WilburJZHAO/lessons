<template>
  <div>
    <transition
      appear
      appear-class="app-appear"
      appear-active-class="app-appear-active"
    >
      <div class="container mt-4 mb5">
        <div class="row">
          <div v-if="isSet" id="hide" class="chain-text">
            <h4>Enter the number of cars:</h4>
            <b>Range is 2 to 4</b>
            <br /><br />
            <input
              type="number"
              id="carNum"
              v-on:click="checkNum()"
              v-on:input="checkNum()"
              style=" text-align: center"
            />
            <br /><br />
            <button
              id="ok"
              v-on:click="init()"
              disabled
              class="btn btn-outline-success"
            >
              OK
            </button>
            <div
              style="margin-top: 10px"
              v-if="alertMessage"
              :class="isAlert ? 'alert alert-success' : 'alert alert-danger'"
            >
              {{ alertMessage }}
            </div>
          </div>

          <div :style="{ visibility: isSet ? 'hidden' : 'visible' }">
            <div>
              <h4>
                {{ text }}
              </h4>
              <h5 class="text-success">
                Drag the car to car park to make different solutions.
              </h5>
              <div
                      v-if="!isSet"
                style="width: 30%"
                :style="{ visibility: alertMessage ? 'visible' : 'hidden' }"
                :class="isAlert ? 'alert alert-success' : 'alert alert-danger'"
              >
                {{ alertMessage }}
              </div>
              <div
                style="width: 80%;background-color: transparent;text-align: center;"
                id="dragArea"
              >
                <table style="width: 100%; height: 120px;">
                  <tr>
                    <td class="carPark" @dblclick="disappear($event)">
                      <div class="drag-drop" id="y1" ref="myDraggable">
                        <img
                          v-if="isBlueCar"
                          id="blueCar"
                          src="../../../assets/cars-in-a-garage/bluecar.png"
                          style="position: center;"
                        />
                      </div>
                    </td>
                    <td style="width: 5%"></td>
                    <td class="carPark" @dblclick="disappear($event)">
                      <div class="drag-drop" id="y2" ref="myDraggable2">
                        <img
                          v-if="isYellowCar"
                          src="../../../assets/cars-in-a-garage/yellowcar.png"
                          id="yellowCar"
                        />
                      </div>
                    </td>
                    <td style="width: 5%"></td>
                    <td
                      class="carPark"
                      @dblclick="disappear($event)"
                      :style="{
                        visibility:
                          parseInt(carNumber) === 3 || parseInt(carNumber) === 4
                            ? 'visible'
                            : 'hidden'
                      }"
                    >
                      <div class="drag-drop" id="y3" ref="myDraggable3">
                        <img
                          v-if="isGreenCar"
                          src="../../../assets/cars-in-a-garage/grencar.png"
                          id="greenCar"
                        />
                      </div>
                    </td>
                    <td style="width: 5%"></td>
                    <td
                      class="carPark"
                      @dblclick="disappear($event)"
                      :style="{
                        visibility:
                          parseInt(carNumber) === 4 ? 'visible' : 'hidden'
                      }"
                    >
                      <div class="drag-drop" id="y4" ref="myDraggable4">
                        <img
                          v-if="isPinkCar"
                          src="../../../assets/cars-in-a-garage/pinkcar.png"
                          id="pinkCar"
                        />
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
              <table id="resultTable" style="width: 80%;">
                <tr>
                  <td
                    class="dropzone text-center"
                    style="border-bottom: black solid;"
                    ref="dropzonePlace"
                    id="dropzone1"
                  >
                    <div class="dropzone-drop" id="dropzone-drop1"></div>
                  </td>
                  <td style="width: 5%"></td>
                  <td
                    class="dropzone"
                    style="background-size: 100%;border-bottom: black solid; text-align: center"
                    id="dropzone2"
                    ref="dropzonePlace2"
                  >
                    <div class="dropzone-drop" id="dropzone-drop2"></div>
                  </td>
                  <td style="width: 5%"></td>
                  <td
                    class="dropzone"
                    style="background-size: 100%;border-bottom: black solid; text-align: center;"
                    :style="{
                      visibility:
                        parseInt(carNumber) === 3 || parseInt(carNumber) === 4
                          ? 'visible'
                          : 'hidden'
                    }"
                    id="dropzone3"
                    ref="dropzonePlace3"
                  >
                    <div class="dropzone-drop" id="dropzone-drop3"></div>
                  </td>
                  <td style="width: 5%"></td>
                  <td
                    class="dropzone"
                    style="background-size: 100%;border-bottom: black solid; text-align: center"
                    :style="{
                      visibility:
                        parseInt(carNumber) === 4 ? 'visible' : 'hidden'
                    }"
                    id="dropzone4"
                    ref="dropzonePlace4"
                  >
                    <div class="dropzone-drop" id="dropzone-drop4"></div>
                  </td>
                </tr>
              </table>
<br>
              <div class="tt--solutions mb-5">
                <div class="mr-3 tt--solutions-count">
                  <p>
                    <button
                      v-if="!isFinish"
                      type="submit"
                      class="btn btn-outline-success btn-lg"
                      @click="okClicked()"
                      :disabled="
                        parseInt(carNumber) === 2
                          ? isBlueCar || isYellowCar
                          : parseInt(carNumber) === 3
                          ? isBlueCar || isGreenCar || isYellowCar
                          : isBlueCar || isGreenCar || isYellowCar || isPinkCar
                      "
                    >
                      OK
                    </button>
                    <button
                      v-if="isFinish"
                      type="submit"
                      class="btn btn-outline-success btn-lg"
                      @click="reset"
                    >
                      Reset
                    </button>
                  </p>
                  <p>
                    <span style="font-size: 115%;" class="badge badge-dark">{{
                      count - 1
                    }}</span>
                    Solutions
                  </p>
                </div>
              </div>
              <div>
                <table id="displayResult">
                  <tr v-for="i in 8">
                    <td v-for="j in 3" :ref="(i - 1) * 3 + j"></td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import interact from "interactjs";
export default {
  head: {
    script: [
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"
      }
    ]
  },
  data: function() {
    return {
      gameNum: 1,
      result: [],
      carNumber: "",
      countOfSolutions: 0,
      count: 1,
      countOfFound: 0,
      isTrue: true,
      dropzone1: null,
      dropzone2: null,
      dropzone3: null,
      dropzone4: null,
      dropzone5: null,
      dropzone6: null,
      dropzone7: null,
      dropzone8: null,
      dropzone9: null,
      isAlert: false,
      alertMessage: "",
      text: "",
      isSet: true,
      isBlueCar: true,
      isGreenCar: true,
      isPinkCar: true,
      isYellowCar: true,
      isFinish: false,
      uniqueSolutions: 0,
      uniqueSolutionsHTML: "<br>",

      setRes: new Set()
    };
  },
  methods: {
    init: function() {
      this.isAlert = false;
      this.carNumber = document.getElementById("carNum").value;
      if (this.carNumber <= 4 && this.carNumber >= 2) {
        this.alertMessage = "";
        this.isSet = false;
        if (this.gameNum === 1) {
          let myDraggble = this.$refs.myDraggable;
          let myDraggble2 = this.$refs.myDraggable2;
          let myDraggble3 = this.$refs.myDraggable3;
          let myDraggble4 = this.$refs.myDraggable4;

          this.initInteract(myDraggble);
          this.initInteract(myDraggble2);
          this.initInteract(myDraggble3);
          this.initInteract(myDraggble4);

          this.initInteract2(this.$refs.dropzonePlace.children[0]);
          this.initInteract2(this.$refs.dropzonePlace2.children[0]);
          this.initInteract2(this.$refs.dropzonePlace3.children[0]);
          this.initInteract2(this.$refs.dropzonePlace4.children[0]);
        }
        if (parseInt(this.carNumber) === 2) {
          this.text = "Two ways to park the cars.";
        } else if (parseInt(this.carNumber) === 3) {
          this.text = "Six ways to park the cars.";
        } else if (parseInt(this.carNumber) === 4) {
          this.text = "Twenty-four ways to park the cars.";
        }
        if (this.gameNum === 1) {
          let dragzone = this.$refs.dropzonePlace;
          this.initDropArea(dragzone);
          this.initDropArea(this.$refs.dropzonePlace2);
          this.initDropArea(this.$refs.dropzonePlace3);
          this.initDropArea(this.$refs.dropzonePlace4);
        }
      } else {
        this.alertMessage = "Number of trials is outside range";
      }
    },
    checkNum: function() {
      let carNumber = document.getElementById("carNum").value;
      if (carNumber === "") {
        document.getElementById("ok").setAttribute("disabled", "true");
      } else {
        document.getElementById("ok").removeAttribute("disabled");
      }
    },
    okClicked() {
      var a = document.getElementById("dropzone1").children[0].innerHTML;
      var b = document.getElementById("dropzone2").children[0].innerHTML;
      var c = document.getElementById("dropzone3").children[0].innerHTML;
      var d = document.getElementById("dropzone4").children[0].innerHTML;
      var e = a + b + c + d;
      for (let i = 0; i < this.result.length; i++) {
        var f =
          this.result[i][0] +
          this.result[i][1] +
          this.result[i][2] +
          this.result[i][3];
        if (e === f) {
          this.isAlert = false;
          this.alertMessage = "This solution has already exist!";
          return;
        }
      }
      this.alertMessage = "";
      this.$refs[this.count][0].innerHTML =
        "<div style='border: 1px solid; width: 85%; text-align: center'>" +
        a +
        b +
        c +
        d +
        "</div>";
      this.result.push([a, b, c, d]);
      this.count++;
      if (this.carNumber == 2) {
        if (parseInt(this.count - 1) === 2) {
          this.alertMessage = "All 2 ways found!";
          this.isAlert = true;
          this.isFinish = true;
        }
      }
      if (this.carNumber == 3) {
        if (parseInt(this.count - 1) === 6) {
          this.alertMessage = "All 6 ways found!";
          this.isAlert = true;
          this.isFinish = true;
        }
      }
      if (this.carNumber == 4) {
        if (parseInt(this.count - 1) === 24) {
          this.alertMessage = "All 24 ways found!";
          this.isAlert = true;
          this.isFinish = true;
        }
      }
    },
    initReset: function() {
      this.$refs.myDraggable.classList = "dropped";
      this.$refs.myDraggable2.classList = "dropped";
      this.$refs.myDraggable3.classList = "dropped";
      this.$refs.myDraggable4.classList = "dropped";
    },
    changeColor: function(i) {
      if (i == 1) {
        this.$refs.myDraggable.classList.remove("drag-drop");
        this.$refs.myDraggable.classList.add("dropped");
      } else if (i == 2) {
        this.$refs.myDraggable2.classList.remove("drag-drop");
        this.$refs.myDraggable2.classList.add("dropped");
      } else if (i == 3) {
        this.$refs.myDraggable3.classList.remove("drag-drop");
        this.$refs.myDraggable3.classList.add("dropped");
      } else if (i == 4) {
        this.$refs.myDraggable4.classList.remove("drag-drop");
        this.$refs.myDraggable4.classList.add("dropped");
      }
    },

    disappear: function(event) {
      var cur = event.target.children[0];
      var curVal = cur.id;
      if (cur.classList == "dropped") {
        if (curVal === "y1") {
          document.getElementById("blueCar").remove();
          this.isBlueCar = true;
          this.disabledDraggable(this.$refs.dropzonePlace.children[0]);
        } else if (curVal === "y2") {
          document.getElementById("yellowCar").remove();
          this.isYellowCar = true;
          this.disabledDraggable(this.$refs.dropzonePlace2.children[0]);
        } else if (curVal === "y3") {
          document.getElementById("greenCar").remove();
          this.isGreenCar = true;
          this.disabledDraggable(this.$refs.dropzonePlace3.children[0]);
        } else if (curVal === "y4") {
          document.getElementById("pinkCar").remove();
          this.isPinkCar = true;
          this.disabledDraggable(this.$refs.dropzonePlace4.children[0]);
        }

        cur.classList.remove("dropped");
        cur.classList.add("drag-drop");
        this.initInteract3(cur);
      }
    },

    reset: function() {


      this.disabledDraggable(this.$refs.dropzonePlace.children[0])
      this.disabledDraggable(this.$refs.dropzonePlace2.children[0])
      this.disabledDraggable(this.$refs.dropzonePlace3.children[0])
      this.disabledDraggable(this.$refs.dropzonePlace4.children[0])

      this.result = [];
      this.gameNum++;
        this.isSet = true;


      this.isFinish = false;
      if (this.carNumber == 2) {
        document.getElementById("dropzone-drop1").innerHTML = "";
        document.getElementById("dropzone-drop2").innerHTML = "";
      }
      if (this.carNumber == 3) {
        document.getElementById("dropzone-drop1").innerHTML = "";
        document.getElementById("dropzone-drop2").innerHTML = "";
        document.getElementById("dropzone-drop3").innerHTML = "";
      }
      if (this.carNumber == 4) {
        document.getElementById("dropzone-drop1").innerHTML = "";
        document.getElementById("dropzone-drop2").innerHTML = "";
        document.getElementById("dropzone-drop3").innerHTML = "";
        document.getElementById("dropzone-drop4").innerHTML = "";
      }

      this.isYellowCar = true;
      this.isBlueCar = true;
      this.isPinkCar = true;
      this.isGreenCar = true;

      this.dropzone1 = null;
      this.dropzone2 = null;
      this.dropzone3 = null;
      this.dropzone4 = null;

      if (this.$refs.myDraggable.classList == "dropped") {
        this.initInteract3(this.$refs.myDraggable)
        this.$refs.myDraggable.classList.remove("dropped");
        this.$refs.myDraggable.classList.add("drag-drop");

      }
      if (this.$refs.myDraggable2.classList == "dropped") {
        this.initInteract3(this.$refs.myDraggable2)
        this.$refs.myDraggable2.classList.remove("dropped");
        this.$refs.myDraggable2.classList.add("drag-drop");
      }
      if (this.$refs.myDraggable3.classList == "dropped") {
        this.initInteract3(this.$refs.myDraggable3)
        this.$refs.myDraggable3.classList.remove("dropped");
        this.$refs.myDraggable3.classList.add("drag-drop");
      }
      if (this.$refs.myDraggable4.classList == "dropped") {
        this.initInteract3(this.$refs.myDraggable4)
        this.$refs.myDraggable4.classList.remove("dropped");
        this.$refs.myDraggable4.classList.add("drag-drop");
      }
      this.isAlert = false;
      this.alertMessage = "";
      for (let i = 1; i <= 24; i++) {
        this.$refs[i][0].innerHTML = "";
      }
      this.count = 1;
      this.carNumber = "";
    },

    enableDrag: function(event) {
      var cur = event.target;
      if (cur.classList == "dropped") {
      }
    },
    initInteract: function(selector) {
      this.isTrue = false;
      interact(selector).draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        //restrict: {
        //restriction: "parent",
        //endOnly: true,
        //elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        // },
        // enable autoScroll
        autoScroll: true,
        onstart: this.start,
        // call this function on every dragmove event
        onmove: this.dragMoveListener,
        // call this function on every dragend event
        onend: this.onDragEnd
      });
    },
    initInteract2: function(selector) {
      this.isTrue = false;
      interact(selector).draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        //restrict: {
        //restriction: "parent",
        //endOnly: true,
        //elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        // },
        // enable autoScroll
        autoScroll: true,
        onstart: this.start,
        // call this function on every dragmove event
        onmove: this.dragMoveListener,
        // call this function on every dragend event
        onend: this.onDragEnd
      });
    },
    initInteract3: function(selector) {
      interact(selector).draggable(true);
    },
    disabledDraggable: function(selector) {
      interact(selector).draggable(false);
    },
    dragMoveListener: function(event) {
      var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx,
        y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

      // translate the element
      target.style.webkitTransform = target.style.transform =
        "translate(" + x + "px, " + y + "px)";

      // update the posiion attributes
      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);
    },
    onDragEnd: function(event) {
      var target = event.target;
      // update the state
      this.screenX = target.getBoundingClientRect().left;
      this.screenY = target.getBoundingClientRect().top;
      this.screenX = 0;
      this.screenY = 0;
      target.style.webkitTransform = target.style.transform =
        "translate(" + 0 + "px, " + 0 + "px)";
      target.setAttribute("data-x", 0);
      target.setAttribute("data-y", 0);
    },
    enable1: function(i) {
      if (i == "blueCar") {
        this.isBlueCar = true;
        this.initInteract3(this.$refs.myDraggable);
        this.$refs.myDraggable.classList.add("drag-drop");
        this.$refs.myDraggable.classList.remove("dropped");
      } else if (i == "yellowCar") {
        this.isYellowCar = true;
        this.initInteract3(this.$refs.myDraggable2);
        this.$refs.myDraggable2.classList.add("drag-drop");
        this.$refs.myDraggable2.classList.remove("dropped");
      } else if (i == "greenCar") {
        this.isGreenCar = true;
        this.initInteract3(this.$refs.myDraggable3);
        this.$refs.myDraggable3.classList.add("drag-drop");
        this.$refs.myDraggable3.classList.remove("dropped");
      } else if (i == "pinkCar") {
        this.isPinkCar = true;
        this.initInteract3(this.$refs.myDraggable4);
        this.$refs.myDraggable4.classList.add("drag-drop");
        this.$refs.myDraggable4.classList.remove("dropped");
      }
    },
    enable2: function(dropPlace, number) {
      if (dropPlace == "dropzone1") {
        this.dropzone1 = number;
        document.getElementById(
          "dropzone1"
        ).children[0].innerHTML = this.dropzone1;
      } else if (dropPlace == "dropzone2") {
        this.dropzone2 = number;
        document.getElementById(
          "dropzone2"
        ).children[0].innerHTML = this.dropzone2;
      } else if (dropPlace == "dropzone3") {
        this.dropzone3 = number;
        document.getElementById(
          "dropzone3"
        ).children[0].innerHTML = this.dropzone3;
      } else if (dropPlace == "dropzone4") {
        this.dropzone4 = number;
        document.getElementById(
          "dropzone4"
        ).children[0].innerHTML = this.dropzone4;
      }
    },
    enable3: function(dropPlace) {
      if (dropPlace == "dropzone1") {
        this.dropzone1 = null;
        document.getElementById("dropzone1").children[0].innerHTML = "";
      } else if (dropPlace == "dropzone2") {
        this.dropzone2 = null;
        document.getElementById("dropzone2").children[0].innerHTML = "";
      } else if (dropPlace == "dropzone3") {
        this.dropzone3 = null;
        document.getElementById("dropzone3").children[0].innerHTML = "";
      } else if (dropPlace == "dropzone4") {
        this.dropzone4 = null;
        document.getElementById("dropzone4").children[0].innerHTML = "";
      }
    },
    ondrop: function(event) {
      var draggableElement = event.relatedTarget;
      var dropzoneElement = event.target;
      var dropzoneName = dropzoneElement.id;
      var text = draggableElement.innerHTML;

      if (draggableElement.classList == "dropzone-drop") {
        if (dropzoneName == "dropzone1") {
          if (dropzoneElement.children[0].innerHTML != "") {
            let previous = dropzoneElement.children[0].innerHTML;
            //this.enable1(previous)
            this.enable2(draggableElement.parentNode.id, previous);
          } else {
            this.initInteract3(dropzoneElement.children[0]);
            this.enable3(draggableElement.parentNode.id);
            this.disabledDraggable(draggableElement);
          }
          this.dropzone1 = text;
          document.getElementById(
            "dropzone1"
          ).children[0].innerHTML = this.dropzone1;
        } else if (dropzoneName == "dropzone2") {
          if (dropzoneElement.children[0].innerHTML != "") {
            let previous = dropzoneElement.children[0].innerHTML;
            this.enable2(draggableElement.parentNode.id, previous);
          } else {
            this.initInteract3(dropzoneElement.children[0]);
            this.enable3(draggableElement.parentNode.id);
            this.disabledDraggable(draggableElement);
          }
          this.dropzone2 = text;
          document.getElementById(
            "dropzone2"
          ).children[0].innerHTML = this.dropzone2;
        } else if (dropzoneName == "dropzone3") {
          if (dropzoneElement.children[0].innerHTML != "") {
            let previous = dropzoneElement.children[0].innerHTML;
            this.enable2(draggableElement.parentNode.id, previous);
          } else {
            this.initInteract3(dropzoneElement.children[0]);
            this.enable3(draggableElement.parentNode.id);
            this.disabledDraggable(draggableElement);
          }
          this.dropzone3 = text;
          document.getElementById(
            "dropzone3"
          ).children[0].innerHTML = this.dropzone3;
        } else if (dropzoneName == "dropzone4") {
          if (dropzoneElement.children[0].innerHTML != "") {
            let previous = dropzoneElement.children[0].innerHTML;
            this.enable2(draggableElement.parentNode.id, previous);
          } else {
            this.initInteract3(dropzoneElement.children[0]);
            this.enable3(draggableElement.parentNode.id);
            this.disabledDraggable(draggableElement);
          }
          this.dropzone4 = text;
          document.getElementById(
            "dropzone4"
          ).children[0].innerHTML = this.dropzone4;
        }
      } else {
        draggableElement.classList.remove("drag-drop");
        draggableElement.classList.add("dropped");
        if (draggableElement.children[0].id === "blueCar") {
          this.isBlueCar = false;
        } else if (draggableElement.children[0].id === "greenCar") {
          this.isGreenCar = false;
        } else if (draggableElement.children[0].id === "yellowCar") {
          this.isYellowCar = false;
        } else if (draggableElement.children[0].id === "pinkCar") {
          this.isPinkCar = false;
        }
        if (dropzoneName == "dropzone1") {
          if (dropzoneElement.children[0].innerHTML != "") {
            let previous = dropzoneElement.children[0].children[0].id;
            this.enable1(previous);
          }
          this.dropzone1 = text;
          document.getElementById(
            "dropzone1"
          ).children[0].innerHTML = this.dropzone1;
        } else if (dropzoneName == "dropzone2") {
          if (dropzoneElement.children[0].innerHTML != "") {
            let previous = dropzoneElement.children[0].children[0].id;
            this.enable1(previous);
          }
          this.dropzone2 = text;
          document.getElementById(
            "dropzone2"
          ).children[0].innerHTML = this.dropzone2;
        } else if (dropzoneName == "dropzone3") {
          if (dropzoneElement.children[0].innerHTML != "") {
            let previous = dropzoneElement.children[0].children[0].id;
            this.enable1(previous);
          }
          this.dropzone3 = text;
          document.getElementById(
            "dropzone3"
          ).children[0].innerHTML = this.dropzone3;
        } else if (dropzoneName == "dropzone4") {
          if (dropzoneElement.children[0].innerHTML != "") {
            let previous = dropzoneElement.children[0].children[0].id;
            this.enable1(previous);
          }
          this.dropzone4 = text;
          document.getElementById(
            "dropzone4"
          ).children[0].innerHTML = this.dropzone4;
        }
        this.initInteract3(dropzoneElement.children[0]);
        this.disabledDraggable(draggableElement);
        this.isTrue = true;
      }
      //draggableElement.setAttribute('onclick','enableDrag(event)')
      //parent.removeChild(draggableElement)
      //parent.appendChild(node)
      //event.relatedTarget.textContent = 'Dropped'
    },

    initDropArea: function(selector) {
      interact(selector).dropzone({
        // only accept elements matching this CSS selector
        accept: "#y1,#y2,#y3,#y4,.dropzone-drop",
        // Require a 75% element overlap for a drop to be possible
        overlap: 0.75,

        // listen for drop related events:

        ondropactivate: function(event) {
          // add active dropzone feedback
          event.target.classList.add("drop-active");
        },
        ondragenter: function(event) {
          var draggableElement = event.relatedTarget;
          var dropzoneElement = event.target;

          // feedback the possibility of a drop
          dropzoneElement.classList.add("drop-target");
          //draggableElement.classList.add('can-drop')
          //draggableElement.textContent = 'Dragged in'
        },
        ondragleave: function(event) {
          // remove the drop feedback style
          event.target.classList.remove("drop-target");
          //event.relatedTarget.classList.remove('can-drop')
          //event.relatedTarget.textContent = 'Dragged out'
        },
        ondrop: this.ondrop,
        ondropdeactivate: function(event) {
          // remove active dropzone feedback
          event.target.classList.remove("drop-active");
          event.target.classList.remove("drop-target");
        }
      });
    }
  },
  name: "HowManyWays",

  watch: {
    countOfSolutions: {
      set: function() {
        return 1;
      }
    }
  }
};
</script>

<style scoped>
.dropzone {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 20%;
  line-height: 120px;
}
.functionzone {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-size: 35px;
  height: 55px;
  width: 55px;
  padding: 0;
  margin: 1vw;
  text-align: center;
}
.drag-drop {
  -ms-touch-action: none;
  touch-action: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 100%;
  line-height: 120px;
  text-align: center;
}
.dropped {
  -ms-touch-action: none;
  touch-action: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 100%;
  line-height: 120px;
  text-align: center;
}
.drop-active {
  border-color: #aaa;
}

.drop-target {
  background: #7fff99;
}

.dropzone-drop {
  height: 120px;
  width: 100%;
  touch-action: none;
  -ms-touch-action: none;
}
#dragArea {
  height: 120px;
}
.carPark {
  width: 20%;
  min-width: 100px;
  background-size: 100%;
  background-image: url(../../../assets/cars-in-a-garage/carParkinglocation.png);
  background-repeat: no-repeat;
  background-position: center;
}

.style-select {
  -webkit-appearance: none;

  overflow: hidden;
  width: 240px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
#blueCar,
#yellowCar,
#greenCar,
#pinkCar {
  width: 100%;
  height: auto;
  max-width: 150px;
  max-height: 150px;
  min-width: 50px;
  min-height: 50px;
}
#displayResult img {
  zoom: 40%;
}
#displayResult td {
  height: 50px;
  padding-top: 20px;
}
#displayResult {
  width: 80%;
}
</style>
