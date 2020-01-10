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
            <b>Range is 3 to 5</b>
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
                {{ carString }}
              </h4>
              <h5 class="text-success">
                Drag the car to car park to make different solutions.
              </h5>
              <select
                id="selectSentence"
                style="width:auto;font-size: 16px"
                v-model="selected"
                v-on:change="createGarageChange($event)"
              >
                <option v-bind:value="Challenges"
                  >Please select your challenge</option
                >
              </select>
              <br /><br />
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
                    <td class="carPark" @dblclick="disappear($event)">
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
                          parseInt(carNumber) === 4 || parseInt(carNumber) === 5
                            ? 'visible'
                            : 'hidden'
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
                    <td style="width: 5%"></td>
                    <td
                      class="carPark"
                      @dblclick="disappear($event)"
                      :style="{
                        visibility:
                          parseInt(carNumber) === 5 ? 'visible' : 'hidden'
                      }"
                    >
                      <div class="drag-drop" id="y5" ref="myDraggable5">
                        <img
                          v-if="isRedCar"
                          src="../../../assets/cars-in-a-garage/redCar.png"
                          id="redCar"
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
                        parseInt(carNumber) === 4 || parseInt(carNumber) === 5
                          ? 'visible'
                          : 'hidden'
                    }"
                    id="dropzone4"
                    ref="dropzonePlace4"
                  >
                    <div class="dropzone-drop" id="dropzone-drop4"></div>
                  </td>
                  <td style="width: 5%"></td>
                  <td
                    class="dropzone"
                    style="background-size: 100%;border-bottom: black solid; text-align: center"
                    :style="{
                      visibility:
                        parseInt(carNumber) === 5 ? 'visible' : 'hidden'
                    }"
                    id="dropzone5"
                    ref="dropzonePlace5"
                  >
                    <div class="dropzone-drop" id="dropzone-drop5"></div>
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
                            @click="getRightOrder()"
                            :disabled="
                    value === '' ||
                      (parseInt(carNumber) === 3
                        ? isBlueCar || isGreenCar || isYellowCar
                        : parseInt(carNumber) === 4
                        ? isBlueCar || isGreenCar || isYellowCar || isPinkCar
                        : isBlueCar ||
                          isGreenCar ||
                          isYellowCar ||
                          isPinkCar ||
                          isRedCar)
                  "
                            style="margin-right: 30px"
                    >
                      OK
                    </button>
                    <button
                            v-if="!isFinish"
                            type="submit"
                            class="btn btn-outline-success btn-lg"
                            @click="getAllSolutions()"
                            :disabled="value === ''"
                    >
                      List all solutions
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
      carDisplay0: "",
      carDisplay1: "",
      carDisplay2: "",
      carDisplay3: "",
      carDisplay4: "",
      value: "",
      previousRandom: -1,
      previousRandom2: -1,
      switcher: 0,
      gameNum: 1,
      result: [],
      carNumber: "",
      countOfSolutions: 0,
      count: 1,
      countOfFound: 0,
      carString: "",
      isTrue: true,
      dropzone1: null,
      Challenges: "",
      dropzone2: null,
      dropzone3: null,
      dropzone4: null,
      dropzone5: null,
      dropzone6: null,
      dropzone7: null,
      dropzone8: null,
      dropzone9: null,
      isEqual: false,
      isAlert: false,
      alertMessage: "",
      text: "",
      isSet: true,
      isBlueCar: true,
      isGreenCar: true,
      isPinkCar: true,
      isYellowCar: true,
      isRedCar: true,
      isFinish: false,
      uniqueSolutions: 0,
      uniqueSolutionsHTML: "<br>",
      selected: "",
      mapThreeOption: new Map([
        [0, 1],
        [1, 1],
        [2, 1],
        [3, 0],
        [4, 2],
        [5, 0],
        [6, 2],
        [7, 2]
      ]),
      mapCarname: new Map([
        [0, "blueCar"],
        [1, "yellowCar"],
        [2, "greenCar"],
        [3, "pinkCar"],
        [4, "redCar"]
      ]),
      mapFourOption: new Map([
        [0, 1],
        [1, 2],
        [2, 0],
        [3, 1],
        [4, 2],
        [5, 0],
        [6, 3],
        [7, 3]
      ]),
      mapFiveOption: new Map([
        [0, 1],
        [1, 3],
        [2, 2],
        [3, 2],
        [4, 1],
        [5, 0],
        [6, 4],
        [7, 4]
      ]),
      mapCarDiv: new Map([
        [
          0,
          '<img v-if="isBlueCar" src="../../../assets/cars-in-a-garage/bluecar.png" id="blueCar"/>'
        ],
        [
          1,
          '<img v-if="isBlueCar" src="../../../assets/cars-in-a-garage/yellowcar.png" id="yellowCar"/>'
        ],
        [
          2,
          '<img v-if="isBlueCar" src="../../../assets/cars-in-a-garage/grencar.png" id="greenCar"/>'
        ],
        [
          3,
          '<img v-if="isBlueCar" src="../../../assets/cars-in-a-garage/pinkcar.png" id="pinkCar"/>'
        ],
        [
          4,
          '<img v-if="isBlueCar" src="../../../assets/cars-in-a-garage/redCar.png" id="redCar"/>'
        ]
      ]),
      setRes: new Set()
    };
  },
  mounted: function() {},
  updated: function() {
    this.$nextTick(function() {
      this.value = document.getElementById("selectSentence").value;
      if (document.getElementById("selectSentence").selectedIndex >= 0) {
        this.carString = document.getElementById("selectSentence")[
          document.getElementById("selectSentence").selectedIndex
        ].text;
      }
    });
  },
  methods: {
    init: function() {
      this.carDisplay0 = document.getElementById("y1").innerHTML;
      this.carDisplay1 = document.getElementById("y2").innerHTML;
      this.carDisplay2 = document.getElementById("y3").innerHTML;
      this.carDisplay3 = document.getElementById("y4").innerHTML;
      this.carDisplay4 = document.getElementById("y5").innerHTML;
      (this.mapCarDiv = new Map([
        [0, this.carDisplay0],
        [1, this.carDisplay1],
        [2, this.carDisplay2],
        [3, this.carDisplay3],
        [4, this.carDisplay4]
      ])),
        (this.isAlert = false);
      this.carNumber = document.getElementById("carNum").value;
      if (this.carNumber <= 5 && this.carNumber >= 3) {
        this.alertMessage = "";
        this.isSet = false;
        this.generatorRandom();
        if (this.gameNum === 1) {
          let dragzone = this.$refs.dropzonePlace;
          this.initDropArea(dragzone);
          this.initDropArea(this.$refs.dropzonePlace2);
          this.initDropArea(this.$refs.dropzonePlace3);
          this.initDropArea(this.$refs.dropzonePlace4);
          this.initDropArea(this.$refs.dropzonePlace5);

          let myDraggble = this.$refs.myDraggable;
          let myDraggble2 = this.$refs.myDraggable2;
          let myDraggble3 = this.$refs.myDraggable3;
          let myDraggble4 = this.$refs.myDraggable4;
          let myDraggble5 = this.$refs.myDraggable5;

          this.initInteract(myDraggble);
          this.initInteract(myDraggble2);
          this.initInteract(myDraggble3);
          this.initInteract(myDraggble4);
          this.initInteract(myDraggble5);

          this.initInteract2(this.$refs.dropzonePlace.children[0]);
          this.initInteract2(this.$refs.dropzonePlace2.children[0]);
          this.initInteract2(this.$refs.dropzonePlace3.children[0]);
          this.initInteract2(this.$refs.dropzonePlace4.children[0]);
          this.initInteract2(this.$refs.dropzonePlace5.children[0]);
        }
      } else {
        this.alertMessage = "Number of trials is outside range";
      }
    },
    createGarageChange() {
      for (let i = 1; i <= 24; i++) {
        this.$refs[i][0].innerHTML = "";
      }
      this.count = 1;
      this.result = [];
      this.isAlert = false;
      this.alertMessage = "";
      this.isFinish = false;
    },
    generatorRandom() {
      let i = this.carNumber;
      var sentence = "";
      if (i == 3) {
        var mapSentence = new Set();
        while (mapSentence.size < 10) {
          let randomNum = Math.floor(Math.random() * 3);
          let randomTwo = Math.floor(Math.random() * 8);
          var Num = randomNum.toString() + randomTwo.toString();
          if (!mapSentence.has(Num)) {
            mapSentence.add(Num);
            var se = this.sentenceGenerator(i, randomNum, randomTwo);
            var nummm = [];
            nummm.push(randomNum);
            nummm.push(randomTwo);
            sentence += '<option value="' + Num + '">' + se + "</option>";
          }
        }
      } else if (i == 4) {
        mapSentence = new Set();
        while (mapSentence.size < 11) {
          let randomNum = Math.floor(Math.random() * 4);
          let randomTwo = Math.floor(Math.random() * 8);
          Num = randomNum.toString() + randomTwo.toString();
          if (!mapSentence.has(Num)) {
            mapSentence.add(Num);
            se = this.sentenceGenerator(i, randomNum, randomTwo);
            sentence += '<option value="' + Num + '">' + se + "</option>";
          }
        }
      } else if (i == 5) {
        mapSentence = new Set();
        while (mapSentence.size < 22) {
          let randomNum = Math.floor(Math.random() * 4);
          let randomTwo = Math.floor(Math.random() * 8);
          let randomFour = Math.floor(Math.random() * 5);
          let randomFive = Math.floor(Math.random() * 8);
          let randomThree = Math.random();
          if (randomThree > 0.5) {
            while (randomFour == randomNum) {
              randomFour = Math.floor(Math.random() * 5);
            }
            while (
              this.mapFiveOption.get(randomFive) ==
              this.mapFiveOption.get(randomTwo)
            ) {
              randomFive = Math.floor(Math.random() * 8);
            }
            Num =
              randomNum.toString() +
              randomTwo.toString() +
              randomFour.toString() +
              randomFive.toString();
          } else {
            Num = randomNum.toString() + randomTwo.toString();
          }

          if (!mapSentence.has(Num)) {
            mapSentence.add(Num);
            if (randomThree > 0.5) {
              se = this.sentenceGenerator(i, randomNum, randomTwo) + " and ";
              se += this.sentenceGenerator(i, randomFour, randomFive);
            } else {
              se = this.sentenceGenerator(i, randomNum, randomTwo);
            }
            sentence += '<option value="' + Num + '">' + se + "</option>";
          }
        }
      }
      document.getElementById("selectSentence").innerHTML += sentence;
    },
    sentenceGenerator(carNumber, i, j) {
      if (carNumber == 3) {
        let randomNum = i;
        let randomTwo = j;
        var carString = "";
        if (randomNum == 0) {
          carString = "Blue car is";
        } else if (randomNum == 1) {
          carString = "Yellow car is";
        } else if (randomNum == 2) {
          carString = "Green car is";
        }
        if (randomTwo == 0) {
          carString += " second from the left.";
        } else if (randomTwo == 1) {
          carString += " second from the right.";
        } else if (randomTwo == 2) {
          carString += " in the middle.";
        } else if (randomTwo == 3) {
          carString += " third from the right.";
        } else if (randomTwo == 4) {
          carString += " third from the left.";
        } else if (randomTwo == 5) {
          carString += " first from the left.";
        } else if (randomTwo == 6) {
          carString += " first from the right.";
        } else if (randomTwo == 7) {
          carString += " at the ends.";
        }
      } else if (carNumber == 4) {
        let randomNum = i;
        let randomTwo = j;
        carString = "";
        if (randomNum == 0) {
          carString = "Blue car is";
        } else if (randomNum == 1) {
          carString = "Yellow car is";
        } else if (randomNum == 2) {
          carString = "Green car is";
        } else if (randomNum == 3) {
          carString = "Pink car is";
        }
        if (randomTwo == 0) {
          carString += " second from the left.";
        } else if (randomTwo == 1) {
          carString += " second from the right.";
        } else if (randomTwo == 2) {
          carString += " first from the left";
        } else if (randomTwo == 3) {
          carString += " third from the right.";
        } else if (randomTwo == 4) {
          carString += " third from the left.";
        } else if (randomTwo == 5) {
          carString += " first from the left.";
        } else if (randomTwo == 6) {
          carString += " first from the right.";
        } else if (randomTwo == 7) {
          carString += " at the ends.";
        }
      } else if (carNumber == 5) {
        carString = "";
        if (i == 0) {
          carString += "Blue car";
        } else if (i == 1) {
          carString += "Yellow car";
        } else if (i == 2) {
          carString += "Green car";
        } else if (i == 3) {
          carString += "Pink car";
        } else if (i == 4) {
          carString += "Red car";
        }
        if (j == 0) {
          carString += " is fourth from the right";
        } else if (j == 1) {
          carString += " is second from the right";
        } else if (j == 2) {
          carString += " is third from the right";
        } else if (j == 3) {
          carString += " is third from the left";
        } else if (j == 4) {
          carString += " is second from the left";
        } else if (j == 5) {
          carString += " is first from the left";
        } else if (j == 6) {
          carString += " is first from the right";
        } else if (j == 7) {
          carString += " is at the ends";
        }
      }
      return carString;
    },
    checkNum: function() {
      let carNumber = document.getElementById("carNum").value;
      if (carNumber === "") {
        document.getElementById("ok").setAttribute("disabled", "true");
      } else {
        document.getElementById("ok").removeAttribute("disabled");
      }
    },
    getAllSolutions() {
      this.isAlert = true;
      this.alertMessage = "All solutions have been listed!"
      this.isEqual = false;
      let count = this.carNumber;
      this.result = [];
      this.count = 1;
      if (count == 3) {
        let arr = [0, 1, 2];
        this.permutation(arr, 0);
      }
      if (count == 4) {
        let arr = [0, 1, 2, 3];
        this.permutation(arr, 0);
      }
      if (count == 5) {
        let arr = [0, 1, 2, 3, 4];
        this.permutation(arr, 0);
      }
    },
    permutation(arr, j) {
      var car3 = "";
      var car4 = "";
      if (j === arr.length && arr.length === 3) {
        var car0 = this.mapCarDiv.get(arr[0]);
        var result = car0;
        var car1 = this.mapCarDiv.get(arr[1]);
        result += car1;
        var car2 = this.mapCarDiv.get(arr[2]);
        result += car2;
        var location = this.mapThreeOption.get(
          document.getElementById("selectSentence").value.slice(1, 2) * 1
        );
        var res = "";
        let id1 = this.mapCarname.get(arr[0]);
        let id2 = this.mapCarname.get(arr[1]);
        let id3 = this.mapCarname.get(arr[2]);
        res += id1;
        res += id2;
        res += id3;
        if (
          arr[location] ===
          document.getElementById("selectSentence").value.slice(0, 1) * 1
        ) {
          if (this.count != 1) {
            for (let i = 0; i < this.result.length; i++) {
              if (
                this.result[i] ===
                "<div style='border: 1px solid; width: 85%; text-align: center'>" +
                  result +
                  "</div>"
              ) {
                this.isEqual = true;
              }
            }
            if (!this.isEqual) {
              this.result.push(
                "<div style='border: 1px solid; width: 85%; text-align: center'>" +
                  result +
                  "</div>"
              );
              this.$refs[this.count][0].innerHTML =
                "<div style='border: 1px solid; width: 85%; text-align: center'>" +
                result +
                "</div>";
              this.count++;
            }
          } else {
            this.result.push(
              "<div style='border: 1px solid; width: 85%; text-align: center'>" +
                result +
                "</div>"
            );
            this.$refs[this.count][0].innerHTML =
              "<div style='border: 1px solid; width: 85%; text-align: center'>" +
              result +
              "</div>";
            this.count++;
          }
          if (this.result.length == 2) {
            this.isFinish = true;
            return;
          }
        }
      } else if (j === arr.length && arr.length === 4) {
        car0 = this.mapCarDiv.get(arr[0]);
        result = car0;
        car1 = this.mapCarDiv.get(arr[1]);
        result += car1;
        car2 = this.mapCarDiv.get(arr[2]);
        result += car2;
        var car3 = this.mapCarDiv.get(arr[3]);
        result += car3;
        location = this.mapFourOption.get(
          document.getElementById("selectSentence").value.slice(1, 2) * 1
        );
        // alert("arr location1="+arr[location]+"; location="+location);
        //         alert("location2"+document.getElementById("selectSentence").value.slice(0, 1) * 1);
        if (
          arr[location] ===
          document.getElementById("selectSentence").value.slice(0, 1) * 1
        ) {
          if (this.count != 1) {
            for (let i = 0; i < this.result.length; i++) {
              // alert("result="+"<div style='border: 1px solid; width: 85%; text-align: center'>" +
              //         result +
              //         "</div>");
              // alert(this.result[i]);
              // alert("<div style='border: 1px solid; width: 85%; text-align: center'>" +
              //         result +
              //         "</div>");
              if (
                this.result[i] ===
                "<div style='border: 1px solid; width: 85%; text-align: center'>" +
                  result +
                  "</div>"
              ) {
                this.isEqual = true;
              }
            }
            if (!this.isEqual) {
              this.result[this.count - 1] =
                "<div style='border: 1px solid; width: 85%; text-align: center'>" +
                result +
                "</div>";
              this.$refs[this.count][0].innerHTML =
                "<div style='border: 1px solid; width: 85%; text-align: center'>" +
                result +
                "</div>";
              this.count++;
            }
          } else {
            this.result[this.count - 1] =
              "<div style='border: 1px solid; width: 85%; text-align: center'>" +
              result +
              "</div>";
            this.$refs[this.count][0].innerHTML =
              "<div style='border: 1px solid; width: 85%; text-align: center'>" +
              result +
              "</div>";
            this.count++;
          }
          if (this.result.length === 6) {
            this.isFinish = true;
            return;
          }
        }
      } else if (j === arr.length && arr.length === 5) {
        car0 = this.mapCarDiv.get(arr[0]);
        result = car0;
        car1 = this.mapCarDiv.get(arr[1]);
        result += car1;
        car2 = this.mapCarDiv.get(arr[2]);
        result += car2;
        car3 = this.mapCarDiv.get(arr[3]);
        result += car3;
        car4 = this.mapCarDiv.get(arr[4]);
        result += car4;
        location = this.mapFiveOption.get(
          document.getElementById("selectSentence").value.slice(1, 2) * 1
        );

        if (document.getElementById("selectSentence").value.length === 2) {
          if (
            arr[location] ===
            document.getElementById("selectSentence").value.slice(0, 1) * 1
          ) {
            if (this.count != 1) {
              for (let i = 0; i < this.result.length; i++) {
                // alert("result="+"<div style='border: 1px solid; width: 85%; text-align: center'>" +
                //         result +
                //         "</div>");
                // alert(this.result[i]);
                // alert("<div style='border: 1px solid; width: 85%; text-align: center'>" +
                //         result +
                //         "</div>");
                if (
                  this.result[i] ===
                  "<div style='border: 1px solid; width: 85%; text-align: center'>" +
                    result +
                    "</div>"
                ) {
                  this.isEqual = true;
                }
              }
              if (!this.isEqual) {
                this.result[this.count - 1] =
                  "<div style='border: 1px solid; width: 85%; text-align: center'>" +
                  result +
                  "</div>";
                this.$refs[this.count][0].innerHTML =
                  "<div style='border: 1px solid; width: 85%; text-align: center'>" +
                  result +
                  "</div>";
                this.count++;
              }
            } else {
              this.result[this.count - 1] =
                "<div style='border: 1px solid; width: 85%; text-align: center'>" +
                result +
                "</div>";
              this.$refs[this.count][0].innerHTML =
                "<div style='border: 1px solid; width: 85%; text-align: center'>" +
                result +
                "</div>";
              this.count++;
            }
            if (this.result.length === 24) {
              this.isFinish = true;
              return;
            }
          }
        }

        if (document.getElementById("selectSentence").value.length === 4) {
          let location1 = this.mapFiveOption.get(
            document.getElementById("selectSentence").value.slice(3, 4) * 1
          );
          if (
            arr[location] ===
              document.getElementById("selectSentence").value.slice(0, 1) * 1 &&
            arr[location1] ===
              document.getElementById("selectSentence").value.slice(2, 3) * 1
          ) {
            if (this.count != 1) {
              for (let i = 0; i < this.result.length; i++) {
                // alert("result="+"<div style='border: 1px solid; width: 85%; text-align: center'>" +
                //         result +
                //         "</div>");
                // alert(this.result[i]);
                // alert("<div style='border: 1px solid; width: 85%; text-align: center'>" +
                //         result +
                //         "</div>");
                if (
                  this.result[i] ===
                  "<div style='border: 1px solid; width: 85%; text-align: center'>" +
                    result +
                    "</div>"
                ) {
                  this.isEqual = true;
                }
              }
              if (!this.isEqual) {
                this.result[this.count - 1] =
                  "<div style='border: 1px solid; width: 85%; text-align: center'>" +
                  result +
                  "</div>";
                this.$refs[this.count][0].innerHTML =
                  "<div style='border: 1px solid; width: 85%; text-align: center'>" +
                  result +
                  "</div>";
                this.count++;
              }
            } else {
              this.result[this.count - 1] =
                "<div style='border: 1px solid; width: 85%; text-align: center'>" +
                result +
                "</div>";
              this.$refs[this.count][0].innerHTML =
                "<div style='border: 1px solid; width: 85%; text-align: center'>" +
                result +
                "</div>";
              this.count++;
            }
          }
          if (this.result.length === 6) {
            this.isFinish = true;
            return;
          }
        }
      } else {
        for (let i = j; i < arr.length; i++) {
          let a = arr[i];
          arr[i] = arr[j];
          arr[j] = a;
          this.permutation(arr, j + 1);
          arr[j] = arr[i];
          arr[i] = a;
        }
      }
    },
    getRightOrder() {
      var res = "";
      var trueID = "";
      var curLocation = "";
      var curId = "";
      var trueID1 = "";
      let count = this.carNumber;

      var id1 = document.getElementById("dropzone1").children[0].children[0].id;
      var id2 = document.getElementById("dropzone2").children[0].children[0].id;
      var id3 = document.getElementById("dropzone3").children[0].children[0].id;

      if (count == 3) {
        res = "";
        res += id1;
        res += id2;
        res += id3;
        curLocation = this.mapThreeOption.get(
          document.getElementById("selectSentence").value.slice(1, 2) * 1
        );
        curId = this.mapCarname.get(
          document.getElementById("selectSentence").value.slice(0, 1) * 1
        );

        if (curLocation == 0) {
          trueID = id1;
        } else if (curLocation == 1) {
          trueID = id2;
        } else trueID = id3;
        if (curId == trueID) {
          this.okClicked();
        } else if (curId != trueID) {
          this.isAlert = false;
          this.alertMessage = "The solution is not correct!";
        }
      }
      if (count == 4) {
        let id4 = document.getElementById("dropzone4").children[0].children[0]
          .id;
        res = "";
        res += id1;
        res += id2;
        res += id3;
        res += id4;
        curLocation = this.mapFourOption.get(
          document.getElementById("selectSentence").value.slice(1, 2) * 1
        );
        curId = this.mapCarname.get(
          document.getElementById("selectSentence").value.slice(0, 1) * 1
        );
        if (curLocation == 0) {
          trueID = id1;
        } else if (curLocation == 1) {
          trueID = id2;
        } else if (curLocation == 2) {
          trueID = id3;
        } else trueID = id4;
        if (curId == trueID) {
          this.okClicked();
        } else if (curId != trueID) {
          this.isAlert = false;
          this.alertMessage = "The solution is not correct!";
        }
      }
      if (count == 5) {
        let id4 = document.getElementById("dropzone4").children[0].children[0]
          .id;
        let id5 = document.getElementById("dropzone5").children[0].children[0]
          .id;
        res = "";
        res += id1;
        res += id2;
        res += id3;
        res += id4;
        res += id5;
        if (document.getElementById("selectSentence").value.length === 2) {
          curLocation = this.mapFiveOption.get(
            document.getElementById("selectSentence").value.slice(1, 2) * 1
          );
          curId = this.mapCarname.get(
            document.getElementById("selectSentence").value.slice(0, 1) * 1
          );
          if (curLocation == 0) {
            trueID = id1;
          } else if (curLocation == 1) {
            trueID = id2;
          } else if (curLocation == 2) {
            trueID = id3;
          } else if (curLocation == 3) {
            trueID = id4;
          } else {
            trueID = id5;
          }
          if (curId == trueID) {
            this.okClicked();
          } else if (curId != trueID) {
            this.isAlert = false;
            this.alertMessage = "The solution is not correct!";
          }
        }
        if (document.getElementById("selectSentence").value.length === 4) {
          curLocation = this.mapFiveOption.get(
            document.getElementById("selectSentence").value.slice(1, 2) * 1
          );
          curId = this.mapCarname.get(
            document.getElementById("selectSentence").value.slice(0, 1) * 1
          );
          let curLocation1 = this.mapFiveOption.get(
            document.getElementById("selectSentence").value.slice(3, 4) * 1
          );
          let curId1 = this.mapCarname.get(
            document.getElementById("selectSentence").value.slice(2, 3) * 1
          );
          if (curLocation == 0) {
            trueID = id1;
          } else if (curLocation == 1) {
            trueID = id2;
          } else if (curLocation == 2) {
            trueID = id3;
          } else if (curLocation == 3) {
            trueID = id4;
          } else {
            trueID = id5;
          }
          if (curLocation1 == 0) {
            trueID1 = id1;
          } else if (curLocation1 == 1) {
            trueID1 = id2;
          } else if (curLocation1 == 2) {
            trueID1 = id3;
          } else if (curLocation1 == 3) {
            trueID1 = id4;
          } else {
            trueID1 = id5;
          }
          if (curId == trueID && curId1 == trueID1) {
            this.okClicked();
          } else if (curId != trueID || curId1 != trueID1) {
            this.isAlert = false;
            this.alertMessage = "The solution is not correct!";
          }
        }
      }
    },
    okClicked() {
      var a = document.getElementById("dropzone1").children[0].innerHTML;
      var b = document.getElementById("dropzone2").children[0].innerHTML;
      var c = document.getElementById("dropzone3").children[0].innerHTML;
      var d = document.getElementById("dropzone4").children[0].innerHTML;
      var g = document.getElementById("dropzone5").children[0].innerHTML;
      var e = a + b + c + d + g;
      for (let i = 0; i < this.result.length; i++) {
        var f =
          this.result[i][0] +
          this.result[i][1] +
          this.result[i][2] +
          this.result[i][3] +
          this.result[i][4];
        if (e === f) {
          this.isAlert = false;
          this.alertMessage = "This solution has already exist!";
          return;
        }
      }
      this.isAlert = false;
      this.$refs[this.count][0].innerHTML =
        "<div style='border: 1px solid; width: 85%; text-align: center'>" +
        a +
        b +
        c +
        d +
        g +
        "</div>";
      this.result.push([a, b, c, d, g]);
      if (this.carNumber == 3) {
        this.alertMessage = "Correct! There are 2 ways in total.";
      }
      if (this.carNumber == 4) {
        this.alertMessage = "Correct! There are 6 ways in total.";
      }
      if (this.carNumber == 5) {
        if (document.getElementById("selectSentence").value.length === 4) {
          this.alertMessage = "Correct! There are 6 ways in total.";
        } else {
          this.alertMessage = "Correct! There are 24 ways in total.";
        }
      }
      this.isAlert = true;
      this.count++;
      if (this.carNumber == 3) {
        if (parseInt(this.count - 1) === 2) {
          this.alertMessage = "All 2 ways found!";
          this.isAlert = true;
          this.isFinish = true;
        }
      }
      if (this.carNumber == 4) {
        if (parseInt(this.count - 1) === 6) {
          this.alertMessage = "All 6 ways found!";
          this.isAlert = true;
          this.isFinish = true;
        }
      }
      if (this.carNumber == 5) {
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
      this.$refs.myDraggable5.classList = "dropped";
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
      } else if (i == 5) {
        this.$refs.myDraggable5.classList.remove("drag-drop");
        this.$refs.myDraggable5.classList.add("dropped");
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
        } else if (curVal === "y5") {
          document.getElementById("redCar").remove();
          this.isRedCar = true;
          this.disabledDraggable(this.$refs.dropzonePlace5.children[0]);
        }

        cur.classList.remove("dropped");
        cur.classList.add("drag-drop");
        this.initInteract3(cur);
      }
    },
    reset: function() {
      if(this.carNumber == 3 || this.carNumber == 4){
        for (let i = 1; i < 11; i++) {
          document.getElementById("selectSentence").remove(1);
        }
      }else{
        for (let i = 1; i < 23; i++) {
          document.getElementById("selectSentence").remove(1);
        }
      }
      for (let i = 1; i < document.getElementById("selectSentence").length; i++) {
        document.getElementById("selectSentence").remove(1);
      }
      this.Challenges = "";
      this.selected = "";
      this.gameNum++;
      this.isSet = true;
      this.isFinish = false;
      this.disabledDraggable(this.$refs.dropzonePlace.children[0])
      this.disabledDraggable(this.$refs.dropzonePlace2.children[0])
      this.disabledDraggable(this.$refs.dropzonePlace3.children[0])
      this.disabledDraggable(this.$refs.dropzonePlace4.children[0])
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
      if (this.carNumber == 5) {
        document.getElementById("dropzone-drop1").innerHTML = "";
        document.getElementById("dropzone-drop2").innerHTML = "";
        document.getElementById("dropzone-drop3").innerHTML = "";
        document.getElementById("dropzone-drop4").innerHTML = "";
        document.getElementById("dropzone-drop5").innerHTML = "";
      }

      this.isYellowCar = true;
      this.isBlueCar = true;
      this.isPinkCar = true;
      this.isGreenCar = true;
      this.isRedCar = true;

      this.dropzone1 = null;
      this.dropzone2 = null;
      this.dropzone3 = null;
      this.dropzone4 = null;
      this.dropzone5 = null;

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
      if (this.$refs.myDraggable5.classList == "dropped") {
        this.initInteract3(this.$refs.myDraggable5)
        this.$refs.myDraggable5.classList.remove("dropped");
        this.$refs.myDraggable5.classList.add("drag-drop");
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
      } else if (i == "redCar") {
        this.isRedCar = true;
        this.initInteract3(this.$refs.myDraggable5);
        this.$refs.myDraggable5.classList.add("drag-drop");
        this.$refs.myDraggable5.classList.remove("dropped");
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
      } else if (dropPlace == "dropzone5") {
        this.dropzone5 = number;
        document.getElementById(
          "dropzone5"
        ).children[0].innerHTML = this.dropzone5;
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
      } else if (dropPlace == "dropzone5") {
        this.dropzone5 = null;
        document.getElementById("dropzone5").children[0].innerHTML = "";
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
        } else if (dropzoneName == "dropzone5") {
          if (dropzoneElement.children[0].innerHTML != "") {
            let previous = dropzoneElement.children[0].innerHTML;
            this.enable2(draggableElement.parentNode.id, previous);
          } else {
            this.initInteract3(dropzoneElement.children[0]);
            this.enable3(draggableElement.parentNode.id);
            this.disabledDraggable(draggableElement);
          }
          this.dropzone5 = text;
          document.getElementById(
            "dropzone5"
          ).children[0].innerHTML = this.dropzone5;
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
        } else if (draggableElement.children[0].id === "redCar") {
          this.isRedCar = false;
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
        } else if (dropzoneName == "dropzone5") {
          if (dropzoneElement.children[0].innerHTML != "") {
            let previous = dropzoneElement.children[0].children[0].id;
            this.enable1(previous);
          }
          this.dropzone5 = text;
          document.getElementById(
            "dropzone5"
          ).children[0].innerHTML = this.dropzone5;
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
        accept: "#y1,#y2,#y3,#y4,#y5,.dropzone-drop",
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
  name: "ParkingChallenges",
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
  background: #f4ffec;
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
  width: 16%;
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
#pinkCar,
#redCar {
  width: 80%;
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
  width: 100%;
}
</style>
