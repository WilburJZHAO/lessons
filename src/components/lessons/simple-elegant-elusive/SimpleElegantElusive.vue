<template>
  <div>
    <transition
      appear
      appear-class="app-appear"
      appear-active-class="app-appear-active"
    >
      <div class="container mt-4 mb5">
        <div class="row" style="max-width: 100%; width: 100%;">
          <!-- Left part -->
          <div class="col-md-6 pb-4" style="max-width: 40%">
            <div style="text-align: left;max-width: 100%">
              <h5
                v-if="isActive1"
                :style="{ color: pointsCheck ? 'black' : 'red' }"
              >
                {{ message }}
              </h5>
              <h5
                v-else-if="isActive2"
                :style="{ color: multiplierCheck ? 'black' : 'red' }"
              >
                {{ message }}
              </h5>
              <h5 v-else>{{ message }}</h5>
              <br />
              <div id="input">
                <label style="width: 80px">Points</label>
                <input
                  type="number"
                  id="pointsInput"
                  v-on:click="checkPointsInput()"
                  v-on:input="checkPointsInput()"
                  style="margin-left: 20px; text-align: center"
                />
                <br /><br />
                <label style="width: 80px">Multiplier</label>
                <input
                  type="number"
                  id="multiplierInput"
                  v-on:click="checkMultiplierInput()"
                  v-on:input="checkMultiplierInput()"
                  style="margin-left: 20px; text-align: center"
                />
                <br /><br />
                <button
                  class="btn btn-outline-success"
                  id="okBtn"
                  disabled
                  v-on:click="clickOk()"
                >
                  OK
                </button>
              </div>
              <button
                class="btn btn-outline-success"
                id="inputData4"
                style="padding-left:0px;padding-right: 0px;visibility: hidden; width: 100px;"
                v-on:click="clickDrawLine()"
              >
                Draw the line</button
              ><br />
              <button
                class="btn btn-outline-success"
                id="inputData5"
                style="padding-left:0px;padding-right: 0px;visibility: hidden; width: 100px;"
                v-on:click="clickReSet()"
              >
                Reset
              </button>
            </div>
          </div>
          <!-- Right part -->
          <div
            class="col-md-6"
            ref="qqq"
            style="overflow: visible; max-width: 60%"
          >
            <div
              id="ccc"
              style="margin-left: 0px; width: 600px; height: 320px;"
            >
              <div>
                <canvas class="canvas" id="canvas1" width="600" height="320" />
                <canvas class="canvas" id="canvas2" width="600" height="320" />
                <canvas class="canvas" id="canvas11" width="600" height="320" />
              </div>
            </div>
          </div>
          <!-- Bottom part -->
          <div style="margin-top: 20px; width: 100%; height: 240px;">
            <table width="100%">
              <tr>
                <th>
                  <label id="smallCycleLabel1" style="visibility: hidden;"
                    >11</label
                  >
                </th>
                <th>
                  <label id="smallCycleLabel2" style="visibility: hidden;"
                    >11</label
                  >
                </th>
                <th>
                  <label id="smallCycleLabel3" style="visibility: hidden;"
                    >11</label
                  >
                </th>
                <th>
                  <label id="smallCycleLabel4" style="visibility: hidden;"
                    >11</label
                  >
                </th>
              </tr>
              <tr>
                <td>
                  <div id="smallCycle1" style="visibility: hidden;">
                    <canvas class="canvas1" id="canvas3" />
                    <canvas class="canvas1" id="canvas4" />
                  </div>
                </td>
                <td>
                  <div id="smallCycle2" style="visibility: hidden">
                    <canvas class="canvas1" id="canvas5" />
                    <canvas class="canvas1" id="canvas6" />
                  </div>
                </td>
                <td>
                  <div id="smallCycle3" style="visibility: hidden">
                    <canvas class="canvas1" id="canvas7" />
                    <canvas class="canvas1" id="canvas8" />
                  </div>
                </td>
                <td>
                  <div id="smallCycle4" style="visibility: hidden">
                    <canvas class="canvas1" id="canvas9" />
                    <canvas class="canvas1" id="canvas10" />
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      c: "",
      q: "",
      p: "",

      c1: "",
      q1: "",
      c2: "",
      q2: "",
      c3: "",
      q3: "",
      c4: "",
      q4: "",
      message: "",
      points: 0,
      multiplier: 0,
      degree: 0,
      pointsCheck: false,
      multiplierCheck: false,
      isActive1: false,
      isActive2: false,
      pointsArray: [],
      smallCycleArray1: [],
      centerX: 300,
      centerY: 160,
      radius: 150,
      smallCenterX: 150,
      smallCenterY: 80,
      smallCycleRadius: 60,
      smallCycleNum: 0,
      cycleNumber: 1,
      counter: 0
    };
  },
  created() {},
  mounted: function() {
    this.start();
  },
  methods: {
    start() {
      this.message = "Enter the number of points and multiplier";
      this.c = document.getElementById("canvas1").getContext("2d");
      this.q = document.getElementById("canvas2").getContext("2d");
      this.p = document.getElementById("canvas11").getContext("2d");

      this.c1 = document.getElementById("canvas3").getContext("2d");
      this.q1 = document.getElementById("canvas4").getContext("2d");
      this.c2 = document.getElementById("canvas5").getContext("2d");
      this.q2 = document.getElementById("canvas6").getContext("2d");
      this.c3 = document.getElementById("canvas7").getContext("2d");
      this.q3 = document.getElementById("canvas8").getContext("2d");
      this.c4 = document.getElementById("canvas9").getContext("2d");
      this.q4 = document.getElementById("canvas10").getContext("2d");

      this.drawCircle(this.c);
      this.drawCircle1(this.c1);
      this.drawCircle1(this.c2);
      this.drawCircle1(this.c3);
      this.drawCircle1(this.c4);
    },
    drawCircle: function(circle) {
      circle.beginPath();
      circle.arc(
        this.centerX,
        this.centerY,
        this.radius,
        0,
        Math.PI * 2,
        false
      );
      circle.strokeStyle = "red";
      circle.lineWidth = 2;
      circle.closePath();
      circle.stroke();
    },
    drawCircle1: function(circle) {
      circle.beginPath();
      circle.arc(
        this.smallCenterX,
        this.smallCenterY,
        this.smallCycleRadius,
        0,
        Math.PI * 2,
        false
      );
      circle.strokeStyle = "red";
      circle.lineWidth = 3;
      circle.closePath();
      circle.stroke();
    },
    checkPointsInput: function() {
      this.isActive1 = true;
      this.isActive2 = false;
      this.message = "Enter the points (2-30)";
      let tempPoints = document.getElementById("pointsInput").value;
      if (tempPoints === "") {
        this.pointsCheck = false;
        return;
      }
      tempPoints = parseInt(tempPoints);
      if (tempPoints < 2 || tempPoints > 30) {
        this.message = "Enter the number of points in the circle (2-30)";
        this.pointsCheck = false;
        document.getElementById("okBtn").setAttribute("disabled", "true");
        return;
      }
      this.pointsCheck = true;
      if (this.pointsCheck && this.multiplierCheck) {
        document.getElementById("okBtn").removeAttribute("disabled");
      }
      this.points = tempPoints;
    },
    checkMultiplierInput: function() {
      this.isActive2 = true;
      this.isActive1 = false;
      this.message = "Enter the multiplier (1-29)";
      let tempMultiplier = document.getElementById("multiplierInput").value;
      if (this.pointsCheck) {
        this.message =
          "Enter the number of multiplier in the circle (1-" +
          (this.points - 1) +
          ")";
      }
      if (tempMultiplier === "") {
        this.multiplierCheck = false;
        return;
      }
      tempMultiplier = parseInt(tempMultiplier);

      if (tempMultiplier < 1 || tempMultiplier >= this.points) {
        if (this.pointsCheck) {
          this.message =
            "Enter the number of multiplier in the circle (1-" +
            (this.points - 1) +
            ")";
        } else {
          this.message = "Enter the number of multiplier in the circle (1-29)";
        }
        document.getElementById("okBtn").setAttribute("disabled", "true");
        this.multiplierCheck = false;
        return;
      }
      this.multiplierCheck = true;
      if (this.pointsCheck && this.multiplierCheck) {
        document.getElementById("okBtn").removeAttribute("disabled");
      }
      this.multiplier = tempMultiplier;
    },
    clickOk: function() {
      if (this.pointsCheck === false || this.multiplierCheck === false) {
        this.message = "Enter the number of points and multiplier";
        return;
      }
      document.getElementById("input").style.visibility = "hidden";

      this.degree = 360 / this.points;
      for (let i = 0; i < this.points; i++) {
        this.pointsSetUp(this.degree * i, i);
      }
      this.chooseSmallCycle();
      this.message = "";
      document.getElementById("inputData4").style.visibility = "visible";
    },
    pointsSetUp: function(angle, index) {
      angle = angle + 90;
      let radians = (angle / 180) * Math.PI;
      let endX = this.centerX + this.radius * Math.cos(radians);
      let endY = this.centerY - this.radius * Math.sin(radians);
      endX = Math.round(endX); // reduce deviation
      endY = Math.round(endY);
      let tempCoordinate = new this.coordinate(endX, endY);
      this.pointsArray.push(tempCoordinate);
      this.drawPoints(endX, endY, index);
    },
    coordinate: function(x, y) {
      this.x = x;
      this.y = y;
    },
    drawPoints: function(x, y, index) {
      index += 1;
      this.p.beginPath();
      this.p.arc(x, y, 2, 0, Math.PI * 2, false);
      this.p.strokeStyle = "red";
      this.p.lineWidth = 2;
      this.p.closePath();
      this.p.stroke();
      this.p.font = "14px Arial";
      this.p.fillStyle = "";
      this.p.fillText(index, x + 1, y + 1);
    },
    chooseSmallCycle: function() {
      let tempOrder = this.smallCycleNum % 4;
      switch (tempOrder) {
        case 0:
          this.q1.clearRect(0, 0, this.q1.canvas.width, this.q1.canvas.height);
          document.getElementById("smallCycle1").style.visibility = "visible";
          this.cycleNumber = 1;
          for (let i = 0; i < this.points; i++) {
            this.pointsForSmallCycle(this.degree * i);
          }
          let tempContets1 = this.multiplier + " on " + this.points;
          document.getElementById("smallCycleLabel1").style.visibility =
            "visible";
          document.getElementById("smallCycleLabel1").innerHTML = tempContets1;
          break;
        case 1:
          this.q2.clearRect(0, 0, this.q2.canvas.width, this.q2.canvas.height);
          document.getElementById("smallCycle2").style.visibility = "visible";
          this.cycleNumber = 2;
          for (let i = 0; i < this.points; i++) {
            this.pointsForSmallCycle(this.degree * i);
          }
          let tempContets2 = this.multiplier + " on " + this.points;
          document.getElementById("smallCycleLabel2").style.visibility =
            "visible";
          document.getElementById("smallCycleLabel2").innerHTML = tempContets2;
          break;
        case 2:
          this.q3.clearRect(0, 0, this.q3.canvas.width, this.q3.canvas.height);
          document.getElementById("smallCycle3").style.visibility = "visible";
          this.cycleNumber = 3;
          for (let i = 0; i < this.points; i++) {
            this.pointsForSmallCycle(this.degree * i);
          }
          let tempContets3 = this.multiplier + " on " + this.points;
          document.getElementById("smallCycleLabel3").style.visibility =
            "visible";
          document.getElementById("smallCycleLabel3").innerHTML = tempContets3;
          break;
        case 3:
          this.q4.clearRect(0, 0, this.q4.canvas.width, this.q4.canvas.height);
          document.getElementById("smallCycle4").style.visibility = "visible";
          this.cycleNumber = 4;
          for (let i = 0; i < this.points; i++) {
            this.pointsForSmallCycle(this.degree * i);
          }
          let tempContets4 = this.multiplier + " on " + this.points;
          document.getElementById("smallCycleLabel4").style.visibility =
            "visible";
          document.getElementById("smallCycleLabel4").innerHTML = tempContets4;
          break;
        default:
          break;
      }
    },
    pointsForSmallCycle: function(angle) {
      angle = angle + 90;
      let radians = (angle / 180) * Math.PI;
      let endX = this.smallCenterX + this.smallCycleRadius * Math.cos(radians);
      let endY = this.smallCenterY - this.smallCycleRadius * Math.sin(radians);
      endX = Math.round(endX); // reduce deviation
      endY = Math.round(endY);
      let tempCoordinate = new this.coordinate(endX, endY);
      this.smallCycleArray1.push(tempCoordinate);
    },
    clickDrawLine: function() {
      this.q.beginPath();
      this.q.moveTo(
        this.pointsArray[this.counter].x,
        this.pointsArray[this.counter].y
      );
      let token = ((this.counter + 1) * this.multiplier - 1) % this.points;
      this.q.lineTo(this.pointsArray[token].x, this.pointsArray[token].y);
      this.q.closePath();
      this.q.stroke();
      this.drawSmallCycle();
      let tempShow =
        this.counter +
        1 +
        " x " +
        this.multiplier +
        " remainder " +
        (token + 1);
      this.message = tempShow;
      this.counter++;
      if (this.counter === this.pointsArray.length) {
        document.getElementById("inputData4").style.visibility = "hidden";
        document.getElementById("inputData5").style.visibility = "visible";
        this.smallCycleNum++;
      }
    },
    drawSmallCycle: function() {
      switch (this.cycleNumber) {
        case 1:
          this.q1.beginPath();
          this.q1.moveTo(
            this.smallCycleArray1[this.counter].x,
            this.smallCycleArray1[this.counter].y
          );
          let token1 = ((this.counter + 1) * this.multiplier - 1) % this.points;
          this.q1.lineTo(
            this.smallCycleArray1[token1].x,
            this.smallCycleArray1[token1].y
          );

          this.q1.closePath();
          this.q1.stroke();
          break;
        case 2:
          this.q2.beginPath();
          this.q2.moveTo(
            this.smallCycleArray1[this.counter].x,
            this.smallCycleArray1[this.counter].y
          );
          let token2 = ((this.counter + 1) * this.multiplier - 1) % this.points;
          this.q2.lineTo(
            this.smallCycleArray1[token2].x,
            this.smallCycleArray1[token2].y
          );
          this.q2.closePath();
          this.q2.stroke();
          break;
        case 3:
          this.q3.beginPath();
          this.q3.moveTo(
            this.smallCycleArray1[this.counter].x,
            this.smallCycleArray1[this.counter].y
          );
          let token3 = ((this.counter + 1) * this.multiplier - 1) % this.points;
          this.q3.lineTo(
            this.smallCycleArray1[token3].x,
            this.smallCycleArray1[token3].y
          );
          this.q3.closePath();
          this.q3.stroke();
          break;
        case 4:
          this.q4.beginPath();
          this.q4.moveTo(
            this.smallCycleArray1[this.counter].x,
            this.smallCycleArray1[this.counter].y
          );
          let token4 = ((this.counter + 1) * this.multiplier - 1) % this.points;
          this.q4.lineTo(
            this.smallCycleArray1[token4].x,
            this.smallCycleArray1[token4].y
          );
          this.q4.closePath();
          this.q4.stroke();
          break;
        default:
          break;
      }
    },
    clickReSet: function() {
      this.q.clearRect(0, 0, this.q.canvas.width, this.q.canvas.height);
      this.p.clearRect(0, 0, this.p.canvas.width, this.p.canvas.height);
      document.getElementById("inputData5").style.visibility = "hidden";
      document.getElementById("input").style.visibility = "visible";
      this.pointsCheck = false;
      this.multiplierCheck = false;
      this.isActive1 = false;
      this.isActive2 = false;
      this.counter = 0;
      this.points = 0;
      this.multiplier = 0;
      this.degree = 0;
      this.pointsArray.splice(0, this.pointsArray.length);
      this.smallCycleArray1.splice(0, this.smallCycleArray1.length);
      document.getElementById("pointsInput").value = "";
      document.getElementById("multiplierInput").value = "";
      this.message = "Enter the number of points and multiplier";
    }
  }
};
</script>

<style scoped>
#ccc .canvas {
  width: 100%;
  height: auto;
  position: absolute;
}
.canvas1 {
  width: 19.1%;
  height: auto;
  position: absolute;
}
.red {
  color: brown;
}
td {
  width: 25%;
  height: 150px;
}
td div {
  width: 100%;
  height: 100%;
}
tr {
  width: 100%;
}
th {
  height: 30px;
  text-align: center;
}
</style>
