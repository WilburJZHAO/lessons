<template>
    <div class="mt-3">
        <h3 class="lesson-subheading">Play many games</h3>
          <hr class="subheading-separator">
        <div v-if="!next" class="container mt-4 mb-5">
            <div class="top">
                <div class="row justify-content-end">
                    <label class="col-sm-5 label1" >Enter the number of trials:</label>
                    <div class="col-sm-4">
                        <input type="number" min="1" max="10000" class="roll1" oninput="value=value.replace('.','');if(value>10000)value=10000;if(value<1)value=null"  v-model="trails">
                    </div>
                </div>
                <div class="row justify-content-end">
                    <label class="col-sm-4" style="font-weight: bold">Range is 1 to {{ legify(10000) }}</label>
                </div>
            </div>
            <div class="top" style="margin-top: 10px;">
                <div class="row justify-content-end">
                    <div class="col-3"><label disabled class="zone1 noborder" style="color: #0067d2; line-height: 50px; height:50px; font-size: 25px" >Cell:</label></div>
                    <input disabled class="zone2 noborder" value="0">
                    <input disabled class="zone2 noborder" value="1">
                    <input disabled class="zone2 noborder" value="2">
                    <input disabled class="zone2 noborder" value="3">
                    <input disabled class="zone2 noborder" value="4">
                    <input disabled class="zone2 noborder" value="5">
                </div>
                <div class="row justify-content-end">
                    <div class="col-4"><label class="zone1 noborder" style="color: #0067d2; line-height: 50px; height:50px; font-size: 25px" >Number of prisoners:</label></div>
                    <input type="number" min="0"  max="9" @keyup="CheckNums" @focus="displayInputPrompt" onfocus="this.select()" maxlength="1" class="zone2 border" v-model="num1" oninput="value=value.replace('.',''); if(value>9)value=value.substr(-1);else if(value==0) value=0 ;else if (value >= 1) value=value.replace(/\b(0+)/gi,'')">
                    <input type="number" min="0"  max="9" @keyup="CheckNums" class="zone2 border" @focus="displayInputPrompt" onfocus="this.select()" v-model="num2" oninput="value=value.replace('.',''); if(value>9)value=value.substr(-1);else if(value==0) value=0 ;else if (value >= 1) value=value.replace(/\b(0+)/gi,'')">
                    <input type="number" min="0"  max="9" @keyup="CheckNums" @focus="displayInputPrompt" onfocus="this.select()" maxlength="1" class="zone2 border" v-model="num3" oninput="value=value.replace('.',''); if(value>9)value=value.substr(-1);else if(value==0) value=0 ;else if (value >= 1) value=value.replace(/\b(0+)/gi,'')">
                    <input type="number" min="0"  max="9" @keyup="CheckNums" @focus="displayInputPrompt" onfocus="this.select()" maxlength="1" class="zone2 border" v-model="num4" oninput="value=value.replace('.',''); if(value>9)value=value.substr(-1);else if(value==0) value=0 ;else if (value >= 1) value=value.replace(/\b(0+)/gi,'')">
                    <input type="number" min="0"  max="9" @keyup="CheckNums" @focus="displayInputPrompt" onfocus="this.select()" maxlength="1" class="zone2 border" v-model="num5" oninput="value=value.replace('.',''); if(value>9)value=value.substr(-1);else if(value==0) value=0 ;else if (value >= 1) value=value.replace(/\b(0+)/gi,'')">
                    <input type="number" min="0"  max="9" @keyup="CheckNums" @focus="displayInputPrompt" onfocus="this.select()" maxlength="1" class="zone2 border" v-model="num6" oninput="value=value.replace('.',''); if(value>9)value=value.substr(-1);else if(value==0) value=0 ;else if (value >= 1) value=value.replace(/\b(0+)/gi,'')">
                </div>
            </div>

            <div class="top" style="margin-top: 10px; border: none">
                <div class="row justify-content-end">
                    <div v-if="inputPrompt" style="color: red; font-size: 25px; margin-top: 10px" v-text="ShowPrompt"></div>
                    <div v-else style="color: red; font-size: 25px; margin-top: 10px" v-text="ErrorPrompt"></div>
                </div>
                <div class="row justify-content-end">
                    <button style="margin-top: 8px;" class="btn btn-outline-success" @click="CheckError">OK</button>
                </div>
            </div>
        </div>

        <div v-else class="container mt-4 mb-5">
            <div class="top" style="border: none">
                <div class="row justify-content-center">
                    <label class="col-sm-5 label1" >Trials completed: {{ legify(numberoftrials)}}</label>
                    <label class="col-sm-5 label1" >Total trials: {{legify(trails)}}</label>
                </div>
            </div>
            <div class="top">
                <div class="row justify-content-end">
                    <label class="col-sm-5 label1" ></label>
                    <div class="col-sm-4">
                        <label style="margin-top: 5px; text-align: center;font-size: 25px; color: #0067d2"> Strategy 1:</label>
                    </div>
                </div>
                <div class="row justify-content-end">
                    <label class="col-sm-5 label1" >Average:</label>
                    <div class="col-sm-4">
                        <input  class="roll1" disabled v-model="Average">
                    </div>
                </div>
                <div class="row justify-content-end">
                    <label class="col-sm-6 label1">Minimum:</label>
                    <div class="col-sm-4">
                        <input class="roll1" disabled v-model="Minimum">
                    </div>
                </div>
                <div class="row justify-content-end">
                    <label class="col-sm-5 label1" >Maximum:</label>
                    <div class="col-sm-4">
                        <input class="roll1" disabled v-model="Maximum">

                    </div>
                </div>
            </div>
            <div class="top" style="margin-top: 10px;">
                <div class="row justify-content-end">
                    <div class="col-3"><label disabled class="zone1 noborder" style="line-height: 50px; height:50px; font-size: 25px" >Cell:</label></div>
                    <input disabled class="zone2 noborder" value="0">
                    <input disabled class="zone2 noborder" value="1">
                    <input disabled class="zone2 noborder" value="2">
                    <input disabled class="zone2 noborder" value="3">
                    <input disabled class="zone2 noborder" value="4">
                    <input disabled class="zone2 noborder" value="5">
                </div>
                <div class="row justify-content-end">
                    <div class="col-4"><label disabled class="zone1 noborder" style="color: #0067d2; line-height: 50px; height:50px; font-size: 25px" >Strategy 1:</label></div>
                    <input disabled class="zone2 noborder1" v-model="num1">
                    <input disabled class="zone2 noborder1" v-model="num2">
                    <input disabled class="zone2 noborder1" v-model="num3">
                    <input disabled class="zone2 noborder1" v-model="num4">
                    <input disabled class="zone2 noborder1" v-model="num5">
                    <input disabled class="zone2 noborder1" v-model="num6">
                </div>
            </div>
            <div v-if="!reset1" class="top" style="margin-top: 20px; border: none">
                <div class="row justify-content-end">
                    <button class="btn btn-outline-success" style="margin-right: 30px" @click="playDemo" v-bind:style="{visibility: !playDemoGame ? 'hidden' : 'visible' }">Play Demo</button>

                    <button class="btn btn-outline-success"  style="margin-right: 30px" @click="playAuto" v-if="playAutoGame">{{PlayAutoWord}}</button>
                </div>
            </div>
            <div v-else class="top" style="margin-top: 20px; border: none">
                <div class="row justify-content-center" style="margin-top: 20px;">
                    <button  class="btn btn-outline-success" @click="Reset">Finished! Reset</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { legify } from "../../common/utils.js";
    export default {
        data() {
            return {
                numberoftrials:0,
                Average:null,
                Average1:null,
                Minimum:null,
                Maximum:null,
                trails: null,
                strategy: 1,
                stop:true,
                reset1:false,
                PlayAutoWord:"Play Auto",
                next: false,
                inputPrompt: true,
                ErrorPrompt: "",
                Error1: 2,
                playDemoGame:true,
                playAutoGame:true,
                maxPrisoners: 9,
                num1: 0,
                num2: 0,
                num3: 0,
                num4: 0,
                num5: 0,
                num6: 0,
                nums:[],
            }
        },
        watch:{
            next(value){
                if (value){
                    this.nums.push(this.num1);
                    this.nums.push(this.num2);
                    this.nums.push(this.num3);
                    this.nums.push(this.num4);
                    this.nums.push(this.num5);
                    this.nums.push(this.num6);
                }
            },
            numberoftrials(value){
                if (value == this.trails){
                    this.reset1 = true;
                }
            }
        },
        computed:{
            ShowPrompt(){
              if (this.inputPrompt){
                return "Add or remove prisoners from the cells.";
              }
            },
        },
        methods:{
            legify,
            CheckError(){
                this.inputPrompt = false;
                let sum = Number.parseInt(this.num1)+ Number.parseInt(this.num2) + Number.parseInt(this.num3) + Number.parseInt(this.num4) + Number.parseInt(this.num5) + Number.parseInt(this.num6);

                if (this.Error1 == 1) {
                  let overfill = sum - this.maxPrisoners;
                  let overfillString = this.numToString(overfill).toLowerCase();
                  this.ErrorPrompt = "Please remove at least " + overfillString + " prisoner" + (overfill === 1 ? '' : 's') + ". The maximum is nine.";
                }
                else if (this.Error1 == 2) {
                  this.ErrorPrompt = "Place at least one prisoner in a cell.";
                }
                else {
                    if(this.trails > 0){
                        this.next = true;
                    }else{
                        this.ErrorPrompt = "Enter the number of trials";
                    }
                }
            },
            Reset(){
                this.reset1 = false;
                this.numberoftrials = 0;
                this.Average = null;
                this.Average1 = null;
                this.Minimum = null;
                this.Maximum = null;
                this.playDemoGame = true;
                this.playAutoGame = true;
                this.PlayAutoWord = "Play Auto";
            },
            sleep: function(ms){
                return new Promise(resolve=>{
                    setTimeout(resolve,ms)
                })
            },
            playDemo(){
                this.playDemoGame = false;
                this.playAutoGame = false;

                this.loop();

                this.playDemoGame = true;
                this.playAutoGame = true;
            },
            playAuto:async function(){
                if(this.PlayAutoWord == "Play Auto") {
                    this.PlayAutoWord = "Pause";
                    this.playDemoGame = false;
                    var temple = await this.sleep(250);
                    this.stop = false;
                    while (!this.stop && this.numberoftrials < this.trails) {
                        if (this.trails <= 100){
                            var temple = await this.sleep(100);
                            this.loop();
                        }else if (this.trails <= 1000) {
                            var temple = await this.sleep(20);
                            this.loop();
                        }else if (this.trails <= 3000) {
                            var temple = await this.sleep(2);
                            this.loop();
                        }else{
                            this.loop()
                        }
                    }
                } else if(this.PlayAutoWord == "Pause"){
                    this.stop = true;
                    this.playDemoGame = true;
                    this.PlayAutoWord = "Play Auto";
                    this.playAutoGame = true;
                }
            },
            loop(){
                let p = 0;
                while(this.nums.reduce((a,b) => Number.parseInt(a)+Number.parseInt(b)) > 0){
                    let random1 = Math.floor(Math.random()*36)+1;
                    random1 = this.diceDifference(random1);
                    if (this.nums[random1] > 0){
                        this.nums[random1] -= 1;
                    }
                    p += 1;
                }
                if (this.numberoftrials == 0){
                    this.Maximum = p;
                    this.Minimum = p;
                    this.Average = p;
                    this.Average1 = p;
                } else {
                    this.Maximum = this.Maximum > p ? this.Maximum : p;
                    this.Minimum = this.Minimum < p ? this.Minimum : p;
                    this.Average1 = ((this.Average1 * this.numberoftrials + p) / (this.numberoftrials + 1));
                    this.Average = this.Average1.toFixed(2);
                }
                this.nums[0] = this.num1;
                this.nums[1] = this.num2;
                this.nums[2] = this.num3;
                this.nums[3] = this.num4;
                this.nums[4] = this.num5;
                this.nums[5] = this.num6;
                this.numberoftrials += 1;
            },
            diceDifference(random){
                if (random < 7){
                    return 0;
                }else if (random < 17) {
                    return 1;
                }else if (random < 25) {
                    return 2;
                }else if (random < 31) {
                    return 3;
                }else if (random < 35) {
                    return 4;
                }else{
                    return 5;
                }
            },
            displayInputPrompt(){
                this.inputPrompt = true;
            },
            numToString(num) {
                switch (num) {
                    case 1:
                        return "One";
                    case 2:
                        return "Two";
                    case 3:
                        return "Three";
                    case 4:
                        return "Four";
                    case 5:
                        return "Five";
                    case 6:
                        return "Six";
                    case 7:
                        return "Seven";
                    case 8:
                        return "Eight";
                    case 9:
                        return "Nine";
                    default:
                        return num.toString();
                }
            },
            CheckNums(){
              if (this.num1 > 0 || this.num2 > 0 ||  this.num3 > 0|| this.num4 > 0|| this.num5 > 0|| this.num6 > 0){
                  let sum = Number.parseInt(this.num1)+ Number.parseInt(this.num2) + Number.parseInt(this.num3) + Number.parseInt(this.num4) + Number.parseInt(this.num5) + Number.parseInt(this.num6);
                  if ( sum > 9 ){
                      this.Error1 = 1;
                      let overfill = sum - this.maxPrisoners;
                      let overfillString = this.numToString(overfill).toLowerCase();
                      this.ErrorPrompt = "Please remove at least " + overfillString + " prisoner" + (overfill === 1 ? '' : 's') + ". The maximum is nine.";
                    }
                  else if (9 == sum){
                      this.Error1 = 0;
                      this.ErrorPrompt = "Nine prisoners have been placed in the cells. Software maximum reached.";
                  }
                  else{
                      if (sum == 1) {
                        this.ErrorPrompt = "One prisoner has been placed in the cells.";
                      }
                      else {
                        this.ErrorPrompt = this.numToString(sum) + " prisoners have been placed in the cells.";
                      }
                      this.Error1 = 0;
                  }
              }else{
                  // 1 : all input numbers are 0
                  this.Error1 = 2;
                  this.ErrorPrompt = "Enter at least one prisoner.";
                  // this.inputPrompt = true;
              }
              this.inputPrompt = false;
            },
        },
        name: "PlayGames"
    }
</script>

<style scoped>
    .roll1{
        margin-top: 5px;
        text-align: right;
        font-weight: bold;
        min-width: 150px;
    }
    .top{
        max-width: 800px;
        margin: 0 auto;
        border: 2px solid gainsboro;
    }
    .label1{
        text-align: right;
        color: #610214;
        font-size: 25px;
    }
    .zone1{
        font-size: 35px;
        height:60px;
        padding: 0;
        width: 100%;
        text-align: right;
    }
    .noborder{
        border: none;
        color: brown;
    }
    .noborder1{
        border: none;
        color: black;
        background-color: #78ecff
    }
    .border{
        border: 2px solid gainsboro;
    }
    .zone2{
        font-size: 25px;
        height:50px;
        width: 50px;
        padding: 0;
        text-align: center;
        margin-right: 15px;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button{
        -webkit-appearance: none !important;
        margin: 0;
    }

</style>