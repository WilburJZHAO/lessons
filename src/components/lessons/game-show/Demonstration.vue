<template>
  <div class="container mt-3 mb-5">
    <h3 class="text-center text-success mb-4">Demonstration</h3>

    <div style="display: flex; flex-direction: row">
      <div>
        <table>
          <tr>
            <td>
              <h4 class="text-success">
                <b id="error" v-if="isWin===0" style="">Please click on a prize box to begin: </b>
                <b v-if="isWin===1" style="color: greenyellow">You Win!</b>
                <b v-if="isWin===2" style="color: red">Bad luck!</b>
              </h4>
            </td>
            <td>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<!--              <button-->
<!--                name="Reset"-->
<!--                @click="resetAll()"-->
<!--                class="btn btn-outline-success"-->
<!--                id="resetBt"-->
<!--              >-->
<!--                Reset-->
<!--              </button>-->
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div style="height: 20px"></div>

    <div class="row col-sm-12 boxStyle ">
      <div class=" col-sm-3 keepDistance labelStyle offset-sm-1">
        <div id="box0"
             style="zoom:300%; text-align: center; background: #f4ffec"
             @click="boxesClick(1)">Box 1</div>
        <label style="margin-left: 20%" id="label0"><h3 id="h3" style="visibility: hidden">My Choice</h3></label>
      </div>
      <div class=" col-sm-3 keepDistance labelStyle offset-sm-1">
        <div
               id="box1"
               style="zoom:300%; text-align: center;  background: #f4ffec"
               readonly
               @click="boxesClick(2)">Box 2</div>
        <label style="margin-left: 20%" id="label1"><h3> </h3></label>
      </div>
      <div class=" col-sm-3 keepDistance labelStyle offset-sm-1">
        <div
        id="box2"
        style="zoom:300%; text-align: center;  background: #f4ffec"
        @click="boxesClick(3)">Box 3</div>

        <label style="margin-left: 20%" id="label2"><h3> </h3></label>
      </div>
    </div>

    <div class="col-sm-12 row" style="margin-top:30px;">
      <div v-if="!isSet" style="width: 60%"></div>
      <div :style="{visibility: isSet ? 'visible' : 'hidden' }" style="width: 60%">
        <table style="width: 100%">
          <tr>
            <td style="width: 70%">
              <label id="changeMind"
                ><h5>
                  Box {{ emptyNum + 1 }} is empty! Would you change your mind?
                </h5></label
              >
            </td>
            <td>
              <button
                class="btn btn-outline-success"
                style="margin-right: 3px;"
                id="btnYes"
                @click="btnYes()"
              >
                Yes
              </button>
              &nbsp;&nbsp;&nbsp;
              <button
                class="btn btn-outline-success"
                id="btnNo"
                @click="btnNo()"
              >
                No
              </button>
            </td>
          </tr>
        </table>
      </div>
      <div id="gameNum" style="width: 40%; text-align: right">
        <label
          ><h5>{{ gameNum }} game played!</h5></label
        >
      </div>
    </div>

    <div class="row col-sm-12" style="margin-top:20px;zoom:200%;">
      <div class="col-sm-8 " style="text-align: right">
        <table style="text-align: center;">
          <tr>
            <td style="width: 50%"></td>
            <td style="width: 25%">Wins</td>
            <td style="width: 25%">Losses</td>
          </tr>
          <tr>
            <td>Changed your mind</td>
            <td>
                {{changedWins}}
            </td>
            <td style="color: red">
              {{changedLosses}}
            </td>
          </tr>
          <tr>
            <td>Did't change mind</td>
            <td>
              {{unchangedWins}}
            </td>

            <td style="color: red">
                {{unchangedLosses}}
            </td>
          </tr>
        </table>
      </div>

      <div class="col-sm-12">
        <div class="col-sm-6 offset-sm-5" style="zoom: 50%">
          <button
            v-if="isNext"
            class="btn btn-outline-success"
            style="margin-top:30px;"
            @click="reset()"
          >
            Click for next game
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      gameStart: false,
      arr: new Array(3),
      emptyNum: -1,
      ifChange: true,
      playNum: -1,
      gameNum: 0,
      changedWins: 0,
      changedLosses: 0,
      unchangedWins: 0,
      unchangedLosses: 0,
      finalNum: -1,
      isWin: 0,
      isSet: false,
      isNext: false
    };
  },
  mounted: function() {},
  methods: {
    boxesClick(num) {
      if (this.gameStart) {
        return;
      }
      document.getElementById("h3").removeAttribute("style");
      document.getElementById("h3").innerHTML="";
      if (num == 1) {
        document.getElementById("label0").innerHTML = "<h3>My Choice</h3>";
        this.gameStart = true;
        this.arr.push(0);
        this.playNum = 0;
      } else if (num == 2) {
        document.getElementById("label1").innerHTML = "<h3>My Choice</h3>";
        this.gameStart = true;
        this.arr.push(1);
        this.playNum = 1;
      } else if (num == 3) {
        document.getElementById("label2").innerHTML = "<h3>My Choice</h3>";
        this.gameStart = true;
        this.arr.push(2);
        this.playNum = 2;
      }

      this.finalNum = Math.floor(Math.random() * 3);

      this.arr.push(this.finalNum);
      this.arr.push(this.playNum);

      this.checkEmpty();

      this.isSet = true;
    },
    checkEmpty() {
      this.emptyNum = this.getNumNoRepeat();
      let tempId = "label" + this.emptyNum;
      document.getElementById(tempId).innerHTML = "<h3>Empty</h3>";
      for (let i = 0; i < this.arr.length; i++) {
        this.arr.pop();
      }
      this.arr.push(this.emptyNum);
    },

    getNumNoRepeat() {
      let maxTimes = 250;
      do {
        let num1 = Math.floor(Math.random() * 3);
        if (this.arr.indexOf(num1) == -1) {
          return num1;
        }
        maxTimes--;
      } while (maxTimes);
    },

    btnYes() {
      this.ifChange = true;
      let tempId5 = "label" + this.playNum;
      document.getElementById(tempId5).innerHTML = "";
      let maxTimes = 250;
      do {
        let num2 = Math.floor(Math.random() * 3);
        if (this.arr.indexOf(num2) == -1 && num2 != this.playNum) {
          this.playNum = num2;
          let tempId4 = "label" + this.playNum;
          document.getElementById(tempId4).innerHTML = "<h3>My Choice</h3>";
          break;
        }
        maxTimes--;
      } while (maxTimes);
      this.checkPrice();
    },

    btnNo() {
      this.ifChange = false;
      this.checkPrice();
    },

    checkPrice() {
      let tempId1 = "box" + this.finalNum;
      document.getElementById(tempId1).innerHTML = "Prize";
      document.getElementById(tempId1).style.backgroundColor = "red";
      document.getElementById(tempId1).style.color = "yellow";
      this.isSet = false;
      this.gameNum += 1;
      if (this.finalNum == this.playNum) {
        this.isWin = 1;
        if (this.ifChange) {
          this.changedWins += 1;
        } else {
          this.unchangedWins += 1;
        }
      } else {
        this.isWin = 2;
        if (this.ifChange) {
          this.changedLosses += 1;
        } else {
          this.unchangedLosses += 1;
        }
      }
      this.isNext = true;
    },
    reset() {
      this.isWin = 0;
      this.gameStart = false;
      this.emptyNum = -1;
      this.ifChange = true;
      this.playNum = -1;
      this.isSet = false;
      this.gameStart= false;
      this.isNext= false;
      document.getElementById("label0").innerHTML = "<h3 id=\"h3\" style=\"visibility: hidden\">My Choice</h3>";
      document.getElementById("label1").innerHTML = "";
      document.getElementById("label2").innerHTML = "";
      document.getElementById("box0").innerHTML = "Box 1";
      document.getElementById("box0").style.backgroundColor = "#f4ffec";
      document.getElementById("box0").style.color = "black";
      document.getElementById("box1").innerHTML = "Box 2";
      document.getElementById("box1").style.backgroundColor = "#f4ffec";
      document.getElementById("box1").style.color = "black";
      document.getElementById("box2").innerHTML = "Box 3";
      document.getElementById("box2").style.backgroundColor = "#f4ffec";
      document.getElementById("box2").style.color = "black";
      this.finalNum = -1;
      for (let i = 0; i < this.arr.length; i++) {
        this.arr.pop();
      }
    },
    // resetAll() {
    //   this.reset();
    //   this.gameNum = 0;
    //   this.changedWins = 0;
    //   this.changedLosses = 0;
    //   this.unchangedWins = 0;
    //   this.unchangedLosses = 0;
    // }
  },

  name: "Demonstration"
};
</script>

<style scoped></style>
