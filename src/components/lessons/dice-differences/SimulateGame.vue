<template>
    <div>
        <div v-if="!next" class="container mt-4 mb-5">
            <div class="row justify-content-md-center">
                <div class="col-4"><input disabled class="zone1 noborder" value="Cell:"></div>
                <input disabled class="zone noborder" value="0">
                <input disabled class="zone noborder" value="1">
                <input disabled class="zone noborder" value="2">
                <input disabled class="zone noborder" value="3">
                <input disabled class="zone noborder" value="4">
                <input disabled class="zone noborder" value="5">
            </div>
            <div class="row justify-content-md-center">
                <div class="col-4"><input disabled class="zone1 noborder" value="Number of prisoners:"></div>
                <input type="number" min="0"  max="9" @keyup="CheckNums" @focus="displayInputPrompt" maxlength="1" class="zone" v-model="num1" oninput="value=value.replace('.',''); if(value>9)value=value.substr(-1);else if(value==0) value=0 ;else if (value >= 1) value=value.replace(/\b(0+)/gi,'')">
                <input type="number" min="0"  max="9" @keyup="CheckNums" @focus="displayInputPrompt" maxlength="1" class="zone" v-model="num2" oninput="value=value.replace('.',''); if(value>9)value=value.substr(-1);else if(value==0) value=0 ;else if (value >= 1) value=value.replace(/\b(0+)/gi,'')">
                <input type="number" min="0"  max="9" @keyup="CheckNums" @focus="displayInputPrompt" maxlength="1" class="zone" v-model="num3" oninput="value=value.replace('.',''); if(value>9)value=value.substr(-1);else if(value==0) value=0 ;else if (value >= 1) value=value.replace(/\b(0+)/gi,'')">
                <input type="number" min="0"  max="9" @keyup="CheckNums" @focus="displayInputPrompt" maxlength="1" class="zone" v-model="num4" oninput="value=value.replace('.',''); if(value>9)value=value.substr(-1);else if(value==0) value=0 ;else if (value >= 1) value=value.replace(/\b(0+)/gi,'')">
                <input type="number" min="0"  max="9" @keyup="CheckNums" @focus="displayInputPrompt" maxlength="1" class="zone" v-model="num5" oninput="value=value.replace('.',''); if(value>9)value=value.substr(-1);else if(value==0) value=0 ;else if (value >= 1) value=value.replace(/\b(0+)/gi,'')">
                <input type="number" min="0"  max="9" @keyup="CheckNums" @focus="displayInputPrompt" maxlength="1" class="zone" v-model="num6" oninput="value=value.replace('.',''); if(value>9)value=value.substr(-1);else if(value==0) value=0 ;else if (value >= 1) value=value.replace(/\b(0+)/gi,'')">
            </div>
            <div class="row justify-content-md-center">
                <div class="col-4"></div>
                <div v-if="inputPromp" style="color: red; font-size: 25px; margin-top: 40px" v-text="ShowPromp"></div>
                <div v-else style="color: red; font-size: 25px; margin-top: 40px" v-text="ErrorPromp"></div>
            </div>
            <div class="row justify-content-md-center">
                <div class="col-4"></div>
                <button style="margin-top: 8px;" class="btn btn-outline-success" @click="CheckError">OK</button>
            </div>
        </div>
        <div v-else  class="container mt-4 mb-5">
            <div class="top">
                <div class="row justify-content-end">
                    <label class="col-sm-5 label1" >Number of rolls:</label>
                    <div class="col-sm-4">
                        <input class="roll1" disabled v-model="numberofrolls">
                    </div>
                </div>
                <div class="row justify-content-end">
                    <label class="col-sm-6 label1">Number of prisoners left:</label>
                    <div class="col-sm-4">
                        <input class="roll1" disabled v-model="prisonersLeft">
                    </div>
                </div>
                <div class="row justify-content-end">
                    <label class="col-sm-5 label1" >Difference:</label>
                    <div class="col-sm-4">
                        <input class="roll1" disabled v-model="difference">

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
                    <div class="col-4"><label disabled class="zone1 noborder" style="color: #0067d2; line-height: 50px; height:50px; font-size: 25px" >Number of prisoners:</label></div>
                    <input disabled class="zone2 noborder1" v-model="num1">
                    <input disabled class="zone2 noborder1" v-model="num2">
                    <input disabled class="zone2 noborder1" v-model="num3">
                    <input disabled class="zone2 noborder1" v-model="num4">
                    <input disabled class="zone2 noborder1" v-model="num5">
                    <input disabled class="zone2 noborder1" v-model="num6">
                </div>
            </div>
            <div class="top" style="margin-top: 20px; border: none">
                <div class="row justify-content-end">
                    <button class="btn btn-outline-success" style="margin-right: 30px" @click="playDemo" v-bind:style="{visibility: !playDemoGame ? 'hidden' : 'visible' }">Play Demo</button>

                    <button class="btn btn-outline-success"  style="margin-right: 30px" @click="playAuto" v-if="playAutoGame">{{PlayAutoWord}}</button>
                </div>
            </div>

            <div class="top" style="margin-top: 20px; border: none">

                <div class="row" style="height: 70px;width: 600px;">
                    <div v-html="diceOne" style="margin-right: 100px;margin-left: 15px;"></div>
                    <div v-html="diceTwo" style="margin-right: 100px;margin-left: 15px;"></div>
                    <div style="margin-top: 20px;">
                        <button v-if="remove" class="btn btn-outline-success" @click="SubtractPrisoners">{{RemoveWord}}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // Promp: "Enter the number of prisoners (0-9)",
                inputPromp: true,
                numberofrolls: null,
                difference: null,
                MaxPrisoner: 9,
                remove:false,
                prisonersLeft: null,
                ErrorPromp: "",
                Error1: 2,
                playDemoGame:true,
                playAutoGame:true,
                next: false,
                PlayAutoWord:"Play Auto",
                RemoveWord:"Tap here to remove prisoner",
                strategy: 1,
                diceOne:"",
                diceTwo:"",
                stop: true,
                num1: 0,
                num2: 0,
                num3: 0,
                num4: 0,
                num5: 0,
                num6: 0,
                nums: [],
            }
        },
        watch:{
            prisonersLeft(value) {
                if(value == 0) {
                    this.remove = true;
                    this.stop = true;
                    this.playDemoGame = false;
                    this.playAutoGame = false;
                    this.RemoveWord = "All released, Tap here to reset";
                }
            }
        },
        methods:{
            displayInputPrompt(){
              this.inputPromp = true;
            },
            sleep: function(ms){
                return new Promise(resolve=>{
                    setTimeout(resolve,ms)
                })
            },
            playAuto:async function(){
                if(this.PlayAutoWord == "Play Auto") {
                    this.playDemoGame = false;
                    this.PlayAutoWord = "Pause";
                    // also sleep here to aviod problems cause by quick switch bewteen `play auto` and `pause`
                    var temple = await this.sleep(1500);
                    // stop must be set to false after sleep
                    this.stop = false;
                    while (!this.stop) {
                        this.diceOne = "";
                        this.diceTwo = "";
                        var random1 = Math.floor(Math.random() * 6) + 1;
                        var random2 = Math.floor(Math.random() * 6) + 1;
                        var html1 = this.diceGenerator(random1);
                        var html2 = this.diceGenerator(random2);
                        var temple = await this.sleep(500);
                        this.diceOne = html1;
                        var temple = await this.sleep(500);
                        this.diceTwo = html2;
                        if (this.numberofrolls === null) {
                            this.numberofrolls = 1;
                        } else {
                            this.numberofrolls += 1;
                        }
                        this.difference = Math.abs(random1 - random2);
                        this.SubtractPrisoners();
                        var temple = await this.sleep(1500);
                    }
                } else if(this.PlayAutoWord == "Pause"){
                    this.stop = true;
                    this.playDemoGame = true;
                    this.PlayAutoWord = "Play Auto";

                }
            },
            playDemo: async function (){
                this.diceOne = ""
                this.diceTwo = ""
                this.playDemoGame = false;
                this.playAutoGame = false;
                var random1 = Math.floor(Math.random()*6)+1;
                var random2 = Math.floor(Math.random()*6)+1;
                var html1 = this.diceGenerator(random1);
                var html2 = this.diceGenerator(random2);
                var temple=await this.sleep(500);
                this.diceOne = html1;
                var temple=await this.sleep(500);
                this.diceTwo = html2;

                if (this.numberofrolls === null) {
                    this.numberofrolls = 1;
                }else{
                    this.numberofrolls += 1;
                }
                this.difference = Math.abs(random1 - random2);
                if (this.CheckPrisoner(this.difference)){
                    this.remove = true;
                }else{
                    this.playDemoGame = true;
                    this.playAutoGame = true;
                }
            },
            CheckPrisoner(num){
                switch (num) {
                    case 0:
                        return this.num1 > 0;
                    case 1:
                        return this.num2 > 0;
                    case 2:
                        return this.num3 > 0;
                    case 3:
                        return this.num4 > 0;
                    case 4:
                        return this.num5 > 0;
                    case 5:
                        return this.num6 > 0;
                }
            },
            SubtractPrisoners(){
                this.playAutoGame = true;
                if (this.PlayAutoWord == "Pause"){
                    this.playDemoGame = false;
                } else {
                    this.playDemoGame = true;
                }
                if (this.prisonersLeft == 0){
                    // reset
                    this.numberofrolls = null
                    this.difference = null
                    this.remove = false
                    this.PlayAutoWord = "Play Auto"
                    this.RemoveWord = "Tap here to remove prisoner"
                    this.diceOne = ""
                    this.diceTwo = ""
                    this.playAutoGame = true;
                    this.playDemoGame = true;
                    this.stop = true;
                    this.num1 = this.nums[0]
                    this.num2 = this.nums[1]
                    this.num3 = this.nums[2]
                    this.num4 = this.nums[3]
                    this.num5 = this.nums[4]
                    this.num6 = this.nums[5]
                    this.prisonersLeft = Number.parseInt(this.num1) + Number.parseInt(this.num2) + Number.parseInt(this.num3) + Number.parseInt(this.num4) + Number.parseInt(this.num5) + Number.parseInt(this.num6);
                }else {
                    switch (this.difference) {
                        case 0:
                            if (this.num1 > 0) {
                                this.num1 -= 1;
                                this.prisonersLeft -= 1;
                                this.remove = false;
                            }
                            break;
                        case 1:
                            if (this.num2 > 0) {
                                this.num2 -= 1;
                                this.prisonersLeft -= 1;
                                this.remove = false;
                            }
                            break;
                        case 2:
                            if (this.num3 > 0) {
                                this.num3 -= 1;
                                this.prisonersLeft -= 1;
                                this.remove = false;
                            }
                            break;
                        case 3:
                            if (this.num4 > 0) {
                                this.num4 -= 1;
                                this.prisonersLeft -= 1;
                                this.remove = false;
                            }
                            break;
                        case 4:
                            if (this.num5 > 0) {
                                this.num5 -= 1;
                                this.prisonersLeft -= 1;
                                this.remove = false;
                            }
                            break;
                        case 5:
                            if (this.num6 > 0) {
                                this.num6 -= 1;
                                this.prisonersLeft -= 1;
                                this.remove = false;
                            }
                            break;
                    }
                }
            },
            CheckError(){
                this.inputPromp = false;
                if (this.Error1 == 1) this.ErrorPromp = "Enter a smaller number for strategy "+this.strategy;
                else if (this.Error1 == 2) this.ErrorPromp = "Enter at least one prisoner for strategy " + this.strategy;
                else {
                    this.prisonersLeft = Number.parseInt(this.num1) + Number.parseInt(this.num2) + Number.parseInt(this.num3) + Number.parseInt(this.num4) + Number.parseInt(this.num5) + Number.parseInt(this.num6);
                    this.nums.push(this.num1);
                    this.nums.push(this.num2);
                    this.nums.push(this.num3);
                    this.nums.push(this.num4);
                    this.nums.push(this.num5);
                    this.nums.push(this.num6);
                    this.next = true;
                }
            },
            CheckNums(){
              if (this.num1 > 0 || this.num2 > 0 ||  this.num3 > 0|| this.num4 > 0|| this.num5 > 0|| this.num6 > 0){
                  let sum = Number.parseInt(this.num1)+ Number.parseInt(this.num2) + Number.parseInt(this.num3) + Number.parseInt(this.num4) + Number.parseInt(this.num5) + Number.parseInt(this.num6);
                  if ( 9 < sum ){
                      // 1 : sum of input numbers are biger than MaxPrisoner
                      this.Error1 = 1;
                      this.ErrorPromp = "Enter a smaller number for strategy "+this.strategy;
                  }else if (9 == sum){
                      this.Error1 = 0;
                      this.ErrorPromp = "All "+ this.MaxPrisoner +" prisoners have been entered for strategy "+this.strategy;
                  }else{
                      this.ErrorPromp = this.convertNum(sum)+" prisoners have been entered for strategy "+this.strategy;
                      this.Error1 = 0;
                  }
              }else{
                  // 1 : all input numbers are 0
                  this.Error1 = 2;
                  this.ErrorPromp = "Enter at least one prisoner for strategy " + this.strategy;
                  // this.inputPromp = true;
              }
              this.inputPromp = false;
            },
            diceGenerator:function (i) {
                    var htmlContent = ""
                    if(i==1){
                        htmlContent ="<table class='dice'><tbody><tr><td class=\"disappearDice\"></td><td class=\"disappearDice\"></td><td class=\"disappearDice\"></td></tr><tr><td class=\"disappearDice\"></td><td class=\"diceCircle\"></td><td class=\"disappearDice\"></td></tr>\n" +
                            "                            <tr><td class=\"disappearDice\"></td><td class=\"disappearDice\"></td><td class=\"disappearDice\"></td></tr>\n" +
                            "                            </tbody></table>"
                    }

                    else if(i==2){
                        htmlContent = '<table class=\'dice\'><tbody><tr><td class="disappearDice"></td><td class="disappearDice"></td><td class="disappearDice"></td></tr><tr><td><div class="diceCircle"></div></td><td class="disappearDice"></td><td><div class="diceCircle"></div></td></tr><tr><td class="disappearDice"></td><td class="disappearDice"></td><td class="disappearDice"></td></tr></tbody></table>'

                    }
                    else if(i==3){
                        htmlContent = '<table class=\'dice\'><tbody><tr><td class="disappearDice"></td><td class="disappearDice"></td><td class="disappearDice"></td></tr><tr><td><div class="diceCircle"></div></td><td><div class="diceCircle"></div></td><td><div class="diceCircle"></div></td></tr><tr><td class="disappearDice"></td><td class="disappearDice"></td><td class="disappearDice"></td></tr></tbody></table>'
                    }
                    else if(i==4){
                        htmlContent = '<table class=\'dice\'><tbody><tr><td><div class="diceCircle"></div></td><td class="disappearDice"></td><td><div class="diceCircle"></div></td></tr><tr><td class="disappearDice"></td><td class="disappearDice"></td><td class="disappearDice"></td></tr><tr><td><div class="diceCircle"></div></td><td class="disappearDice"></td><td><div class="diceCircle"></div></td></tr></tbody></table>'
                    }
                    else if(i==5){
                        htmlContent ='<table class=\'dice\'><tbody><tr><td><div class="diceCircle"></div></td><td class="disappearDice"></td><td><div class="diceCircle"></div></td></tr><tr><td class="disappearDice"></td><td><div class="diceCircle"></div></td><td class="disappearDice"></td></tr><tr><td><div class="diceCircle"></div></td><td class="disappearDice"></td><td><div class="diceCircle"></div></td></tr></tbody></table>'
                    }else if(i==6){
                        htmlContent = '<table class=\'dice\'><tbody><tr><td><div class="diceCircle"></div></td><td><div class="diceCircle"></div></td><td><div class="diceCircle"></div></td></tr><tr><td class="disappearDice"></td><td class="disappearDice"></td><td class="disappearDice"></td></tr><tr><td><div class="diceCircle"></div></td><td><div class="diceCircle"></div></td><td><div class="diceCircle"></div></td></tr></tbody></table>'
                    }
                return htmlContent
            },
            convertNum(num) {
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
                }
            }
        },
        computed:{
            ShowPromp(){
                if (this.inputPromp){
                    return "Enter the number of prisoners (0-" + (this.MaxPrisoner - this.num1 - this.num2 - this.num3 - this.num4 - this.num5 - this.num6) +")";
                }
            },
        },
        name: "SimulateGame"
    }
</script>

<style scoped>
    .zone{
        font-size: 25px;
        height:60px;
        width: 70px;
        padding: 0;
        text-align: center;
        border-color: black;
    }
    .zone2{
        font-size: 25px;
        height:50px;
        width: 50px;
        padding: 0;
        text-align: center;
        margin-right: 15px;
        border-color: black;
    }
    .zone1{
        font-size: 25px;
        height:60px;
        padding: 0;
        width: 100%;
        text-align: right;
        border-color: black;
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
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button{
        -webkit-appearance: none !important;
        margin: 0;
    }
    .top{
        max-width: 800px;
        margin: 0 auto;
        border: 2px solid gainsboro;
    }
    .roll1{
        margin-top: 5px; color:#0067d2; text-align: right;
    }

    .label1{
        text-align: right;
        color: #610214;
        font-size: 25px;
    }
    /deep/ .dice {

        width: 60px;
        height:60px;
        background-color: yellow;
        border-radius: 10px;
        text-align: center;
        font-size: 30px;

    }
    /deep/ .diceCircle{
        border-radius:10px;
        background: black;
        width: 20px;
        height: 20px;


    }
    /deep/ .disappearDice >>> td{
        width: 20px;
        height:20px
    }
    /deep/ .diceOneClass{

        margin-right: 100px;margin-left: 15px;
    }
    /deep/ .diceTwoClass{
        padding-left:100px
    }
</style>