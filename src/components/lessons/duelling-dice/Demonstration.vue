<template>
    <div class="container mt-3 mb-5">
        <h3 class="lesson-subheading mt-4">Demonstration</h3>
        <hr class="subheading-separator">
        <div v-if="!isSet">
            <div style="height: 20px"></div>
            <div class="text-center">
                <label for="description" class="col-sm-4" id="description">Select your dice (2, 3, or 4): </label>
            </div>
            <div style="margin-left: 43%">
                <div>
                    <div class="col-sm-12">
                        <input type="checkbox" @click="diceChoose('red')">&nbsp;
                        <label class="theRed">Red</label>
                    </div>
                    <div class="col-sm-12">
                        <input type="checkbox" @click="diceChoose('blue')">&nbsp;
                        <label class="theBlue">Blue</label>
                    </div>
                    <div class="col-sm-12">
                        <input type="checkbox" @click="diceChoose('green')">&nbsp;
                        <label class="theGreen">Green</label>
                    </div>
                    <div class="col-sm-12">
                        <input type="checkbox" @click="diceChoose('black')">&nbsp;
                        <label class="theBlack">Black</label>
                    </div>
                    <button class="btn btn-outline-success" style="margin-top:10px" @click="startGame()">Start game</button>
                    <label id="outOfRange" style="color: red; margin-left: 10px"></label>
                </div>
            </div>
        </div>
        <div class="row" v-if="isSet">
            <div class="col-md-6 pb-4">
                <table class="resultTable" style="width: 90%; text-align: center">
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Wins</td>
                        <td>% Wins</td>
                    </tr>
                    <tr v-if="isRed" style="color: red">
                        <td>{{isRedWin?"Wins":""}}{{isDraw?"Draw":""}}</td>
                        <td><input class="theRed" style="width: 80%; background: #fff7f2; border: 0px; text-align: center" v-model="redNumber" readonly id="redPlayNum"></td>
                        <td style="text-align: left">Red</td>
                        <td><input class="theRed" style="width: 80%; background: #ebffe8; border: 0px; text-align: center" v-model="redWinNumber" readonly id="redWinNum"></td>
                        <td><input class="theRed" style="width: 80%; background: #ebffe8; border: 0px; text-align: center" v-model="redWinPercentage" readonly id="redWinPercentage"></td>
                    </tr>
                    <tr v-if="isBlue" style="color: blue">
                        <td>{{isBlueWin?"Wins":""}}{{isDraw?"Draw":""}}</td>
                        <td><input class="theBlue" style="width: 80%; background: #fff7f2; border: 0px; text-align: center" v-model="blueNumber" readonly id="bluePlayNum"></td>
                        <td style="text-align: left">Blue</td>
                        <td><input class="theBlue" style="width: 80%; background: #ebffe8; border: 0px; text-align: center" v-model="blueWinNumber" readonly id="blueWinNum"></td>
                        <td><input class="theBlue" style="width: 80%; background: #ebffe8; border: 0px; text-align: center" v-model="blueWinPercentage" readonly id="blueWinPercentage"></td>
                    </tr>
                    <tr v-if="isGreen" style="color: green">
                        <td>{{isGreenWin?"Wins":""}}{{isDraw?"Draw":""}}</td>
                        <td><input class="theGreen" style="width: 80%; background: #fff7f2; border: 0px; text-align: center" v-model="greenNumber" readonly id="greenPlayNum"></td>
                        <td style="text-align: left">Green</td>
                        <td><input class="theGreen" style="width: 80%; background: #ebffe8; border: 0px; text-align: center" v-model="greenWinNumber" readonly id="greenWinNum"></td>
                        <td><input class="theGreen" style="width: 80%; background: #ebffe8; border: 0px; text-align: center" v-model="greenWinPercentage" readonly id="greenWinPercentage"></td>
                    </tr>
                    <tr v-if="isBlack" style="color: black">
                        <td>{{isBlackWin?"Wins":""}}{{isDraw?"Draw":""}}</td>
                        <td><input class="theBlack" style="width: 80%; background: #fff7f2; border: 0px; text-align: center" v-model="blackNumber" readonly id="blackPlayNum"></td>
                        <td style="text-align: left">Black</td>
                        <td><input class="theBlack" style="width: 80%; background: #ebffe8; border: 0px; text-align: center" v-model="blackWinNumber" readonly id="blackWinNum"></td>
                        <td><input class="theBlack" style="width: 80%; background: #ebffe8; border: 0px; text-align: center" v-model="blackWinPercentage" readonly id="blackWinPercentage"></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td colspan="3">Draws are ignored</td>
                    </tr>
                </table>
            </div>
            <div class="col-md-6">
                <table class="resultTable" style="width: 100%; text-align: center">
                    <tr>
                        <td :colspan="gameRule.diceFaces">{{gameRule.diceFaces}} faces</td>
                    </tr>
                    <tr v-if="isRed" style="color: red">
                        <td v-for="i in gameRule.diceFaces" style="">{{gameRule.redDiceFace[i]}}</td>
                    </tr>
                    <tr v-if="isBlue" style="color: blue">
                        <td v-for="i in gameRule.diceFaces">{{gameRule.blueDiceFace[i]}}</td>
                    </tr>
                    <tr v-if="isGreen" style="color: green">
                        <td v-for="i in gameRule.diceFaces">{{gameRule.greenDiceFace[i]}}</td>
                    </tr>
                    <tr v-if="isBlack" style="color: black">
                        <td v-for="i in gameRule.diceFaces">{{gameRule.blackDiceFace[i]}}</td>
                    </tr>
                    <tr>
                        <td :colspan="gameRule.diceFaces">Game {{gameCount}}</td>
                    </tr>

                </table>
            </div>
        </div>
        <div class="text-center" v-if="isSet">
            <button id="startManuallyBtn" class="btn btn-outline-success" v-if="!finished && demoAutoOption === '0'" @click="startManually">
                {{ isStart ? "Next game" : "First game" }}
            </button>
            <button id="startManually2Btn" class="btn btn-outline-success" v-if="!finished && demoAutoOption === '2'" @click="getWinner">
                Tally scores
            </button>
            <button id="startAutoBtn"  class="btn btn-outline-success" v-if="!finished && demoAutoOption === '1'" @click="startGameAuto">
                {{
                !isAutoStart
                ? "Start"
                : timer
                ? "Pause"
                : "Resume"
                }}
            </button>
            <button class="btn btn-outline-dark" v-if="finished" @click="reset()">
                Reset
            </button>
            <app-demo-auto-option class="mt-1" @changeOption="demoAutoOption = $event" :isDemoStart="isDemoStart" :option="demoAutoOption"></app-demo-auto-option>
        </div>
    </div>
</template>

<script>
    import DemoAutoOption from "./DemoAutoOption.vue";
    export default {
        components: {
            appDemoAutoOption: DemoAutoOption
        },
        props: ["gameRule"],
        data: function() {
            return {
                activatedDices: [],
                diceNumandCol: [],
                redNumber: "",
                blueNumber: "",
                greenNumber: "",
                blackNumber: "",
                demoAutoOption: "1",
                redWinNumber: 0,
                blueWinNumber: 0,
                greenWinNumber: 0,
                blackWinNumber: 0,
                gameCount: 0,
                redWinPercentage: "",
                blueWinPercentage: "",
                greenWinPercentage: "",
                blackWinPercentage: "",
                count: 0,
                timer: null,
                outTime: 0,
                isSet: false,
                finished: false,
                isStart: false,
                isDemoStart: false,
                isAutoStart: false,
                isRed: false,
                isBlue: false,
                isGreen: false,
                isBlack: false,
                isRedWin: false,
                isBlueWin: false,
                isGreenWin: false,
                isBlackWin: false,
                isDraw: false,
                a: [],
            };
        },
        watch: {
            demoAutoOption(value) {
                if (value === "0" && this.timer) {
                    clearInterval(this.timer);
                    this.timer = null;
                }
            },
            finished(value) {
                if (value === true && this.timer) {
                    clearInterval(this.timer);
                    this.timer = null;
                }
            },
        },
        mounted: function() {},
        updated: function() {},
        computed: {
            timerInterval() {
                let i = 0;
                if(this.isRed){
                    i++;
                }
                if(this.isBlue){
                    i++;
                }
                if(this.isGreen){
                    i++;
                }
                if(this.isBlack){
                    i++;
                }
                if(i===2){
                    return 1800;
                } else if(i===3){
                    return 2400;
                } else{
                    return 3000;
                }
            },
        },
        methods: {
            diceChoose(dice) {
                if (dice === "red") {
                    this.isRed = !this.isRed;
                }
                if (dice === "blue") {
                    this.isBlue = !this.isBlue;
                }
                if (dice === "green") {
                    this.isGreen = !this.isGreen;
                }
                if (dice === "black") {
                    this.isBlack = !this.isBlack;
                }
                for (let i = 0; i < this.activatedDices.length; i++) {
                    if (this.activatedDices[i] === dice) {
                        this.activatedDices.splice(i, 1);
                        return;
                    }
                }

                this.activatedDices.push(dice);
            },
            startGame() {
                if (this.activatedDices.length < 2) {
                    document.getElementById("outOfRange").innerHTML = "Please select at least 2 dice!";
                    return;
                }
                document.getElementById("outOfRange").innerHTML = "";
                this.isSet = true;
            },
            generateRandom(num) {
                //from 0 - num
                return Math.round(Math.random() * (num - 1)) + 1;
            },
            startGameAuto() {
                this.isAutoStart = true;
                if (this.timer) {
                    clearInterval(this.timer);
                    this.timer = null;
                } else {
                    this.startManually();
                    this.timer = setInterval(this.startManually, this.timerInterval);
                }
            },
            setRedNumber(){
                this.redNumber = this.gameRule.redDiceFace[this.generateRandom(this.gameRule.diceFaces)];
                this.diceNumandCol.push([this.redNumber, "red"]);
            },
            setBlueNumber(){
                this.blueNumber = this.gameRule.blueDiceFace[this.generateRandom(this.gameRule.diceFaces)];
                this.diceNumandCol.push([this.blueNumber, "blue"]);
            },
            setGreenNumber(){
                this.greenNumber = this.gameRule.greenDiceFace[this.generateRandom(this.gameRule.diceFaces)];
                this.diceNumandCol.push([this.greenNumber, "green"]);
            },
            setBlackNumber(){
                this.blackNumber = this.gameRule.blackDiceFace[this.generateRandom(this.gameRule.diceFaces)];
                this.diceNumandCol.push([this.blackNumber, "black"]);
            },
            setDiceNumberFinish(){
                document.getElementById("startManuallyBtn").removeAttribute("disabled");
                this.demoAutoOption="2";
            },
            getWinner(){
                this.isDraw = false;
                let winDices = [];
                let winner = this.biggestNum(this.diceNumandCol);
                for (let i = 0; i < this.diceNumandCol.length; i++) {
                    if (parseInt(this.diceNumandCol[i][0]) === parseInt(winner[0])) {
                        winDices.push(this.diceNumandCol[i]);
                    }
                }
                if (winDices.length === 1) {
                    if (winDices[0][1] === "red") {
                        this.redWinNumber++;
                        this.isRedWin = true;
                    }
                    if (winDices[0][1] === "blue") {
                        this.blueWinNumber++;
                        this.isBlueWin = true;
                    }
                    if (winDices[0][1] === "green") {
                        this.greenWinNumber++;
                        this.isGreenWin = true;
                    }
                    if (winDices[0][1] === "black") {
                        this.blackWinNumber++;
                        this.isBlackWin = true;
                    }
                }else{
                    this.count--;
                    this.isDraw = true;
                }
                if(this.count === 0){
                    this.redWinPercentage = (this.redWinNumber * 100).toFixed(1) + "%";
                    this.blackWinPercentage = (this.blackWinNumber * 100).toFixed(1) + "%";
                    this.greenWinPercentage = (this.greenWinNumber * 100).toFixed(1) + "%";
                    this.blueWinPercentage = (this.blueWinNumber * 100).toFixed(1) + "%";
                }else{
                    this.redWinPercentage = (this.redWinNumber * 100 / this.count).toFixed(1) + "%";
                    this.blackWinPercentage = (this.blackWinNumber * 100 / this.count).toFixed(1) + "%";
                    this.greenWinPercentage = (this.greenWinNumber * 100 / this.count).toFixed(1) + "%";
                    this.blueWinPercentage = (this.blueWinNumber * 100 / this.count).toFixed(1) + "%";
                }
                this.gameCount = this.count;
                if(this.demoAutoOption === "2") {
                    this.demoAutoOption="0";

                }
                this.isDemoStart = false;
            },
            startManually() {
                this.isDraw = false;
                this.isStart = true;
                this.isDemoStart = true;
                this.isDemoStart = true;
                this.isRedWin = false;
                this.isGreenWin = false;
                this.isBlueWin = false;
                this.isBlackWin = false;
                this.diceNumandCol = [];
                this.redNumber = "";
                this.blueNumber = "";
                this.greenNumber = "";
                this.blackNumber = "";
                if(this.demoAutoOption === "0"){
                    document.getElementById("startManuallyBtn").setAttribute("disabled", "true");
                }
                let outTime = 0;
                let redOutTime = 0;
                let blueOutTime = 0;
                let greenOutTime = 0;
                let blackOutTime = 0;
                let getWinnerTime = 0;
                if(!this.isDraw){
                    this.count++;
                }
                if(this.isRed){
                    redOutTime = outTime;
                    if(this.isBlue||this.isGreen||this.isBlack){
                        outTime= outTime + 600;
                    }
                }
                if(this.isBlue){
                    blueOutTime = outTime;
                    if(this.isGreen||this.isBlack){
                        outTime= outTime + 600;
                    }
                }
                if(this.isGreen){
                    greenOutTime = outTime;
                    if(this.isBlack){
                        outTime= outTime + 600;
                    }
                }
                if(this.isBlack){
                    blackOutTime = outTime;
                }
                getWinnerTime = outTime + 600;
                if (this.isRed) {
                    setTimeout(this.setRedNumber, redOutTime);
                }
                if (this.isBlue) {
                    setTimeout(this.setBlueNumber, blueOutTime);
                }
                if (this.isGreen) {
                    setTimeout(this.setGreenNumber, greenOutTime);
                }
                if (this.isBlack) {
                    setTimeout(this.setBlackNumber, blackOutTime);
                }
                if(this.demoAutoOption === "0") {
                    setTimeout(this.setDiceNumberFinish, outTime);
                }else{
                    setTimeout(this.getWinner, getWinnerTime);
                }
                return true;
            },
            biggestNum(array) {
                let tempN = 0;
                let color = "";
                for (let i = 0; i < array.length; i++) {
                    if (array[i][0] >= tempN) {
                        tempN = array[i][0];
                        color = array[i];
                    }
                }
                return color;
            }
        },
        destroyed() {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        },
        name: "Demonstration"
    }
</script>

<style scoped>
    .theRed {
        color: red;
    }

    .theBlue {
        color: blue;
    }

    .theGreen {
        color: green;
    }

    .theBlack {
        color: black;
    }

    .resultTable {
        font-size: 20px;
        font-weight: bold;
    }

    td {
        height: 50px;
    }
</style>
