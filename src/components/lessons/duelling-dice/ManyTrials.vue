<template>
    <div class="container mt-3 mb-5">
        <h3 class="text-center text-success mb-4">Many trials</h3>
        <div v-if="!isSet" class="container">
            <div class="text-center">
                <div class="row">
                    <label class="col-form-label col-sm-6">
                        Enter the number of trials(100 - 10000):
                    </label>
                    <div class="col-sm-6">
                        <input type="number" class="form-control" v-model="trialNum" required> <label id="input" style="color: red; margin-left: 10px"></label>
                    </div>
                </div>
            </div>
            <div style="height: 20px"></div>
            <div style="margin-left: 10%">
                <label for="description" class="col-sm-4" id="description">Select your dice (2, 3, or 4): </label>
            </div>
            <div style="margin-left: 12%">
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
        <div class="row" v-if="isSet">
            <div class="col-md-6 pb-4">
                <table class="resultTable" style="margin-left: 15%; width: 70%; text-align: center">
                    <tr>
                        <td></td>
                        <td>Wins</td>
                        <td>% Wins</td>
                    </tr>
                    <tr v-if="isRed" style="color: red">
                        <td style="text-align: left">Red</td>
                        <td><input class="theRed" style="width: 80%; background: #ebffe8; border: 0px; text-align: center" v-model="redWinNumber" readonly id="redWinNum"></td>
                        <td><input class="theRed" style="width: 80%; background: #ebffe8; border: 0px; text-align: center" v-model="redWinPercentage" readonly id="redWinPercentage"></td>
                    </tr>
                    <tr v-if="isBlue" style="color: blue">
                        <td style="text-align: left">Blue</td>
                        <td><input class="theBlue" style="width: 80%; background: #ebffe8; border: 0px; text-align: center" v-model="blueWinNumber" readonly id="blueWinNum"></td>
                        <td><input class="theBlue" style="width: 80%; background: #ebffe8; border: 0px; text-align: center" v-model="blueWinPercentage" readonly id="blueWinPercentage"></td>
                    </tr>
                    <tr v-if="isGreen" style="color: green">
                        <td style="text-align: left">Green</td>
                        <td><input class="theGreen" style="width: 80%; background: #ebffe8; border: 0px; text-align: center" v-model="greenWinNumber" readonly id="greenWinNum"></td>
                        <td><input class="theGreen" style="width: 80%; background: #ebffe8; border: 0px; text-align: center" v-model="greenWinPercentage" readonly id="greenWinPercentage"></td>
                    </tr>
                    <tr v-if="isBlack" style="color: black">
                        <td style="text-align: left">Black</td>
                        <td><input class="theBlack" style="width: 80%; background: #ebffe8; border: 0px; text-align: center" v-model="blackWinNumber" readonly id="blackWinNum"></td>
                        <td><input class="theBlack" style="width: 80%; background: #ebffe8; border: 0px; text-align: center" v-model="blackWinPercentage" readonly id="blackWinPercentage"></td>
                    </tr>
                    <tr>
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
                        <td :colspan="gameRule.diceFaces/2">Game {{count}}</td>
                        <td :colspan="gameRule.diceFaces/2">Trials {{trialNum}}</td>
                    </tr>

                </table>
            </div>
        </div>
        <div class="text-center" v-if="isSet">
            <button class="btn btn-outline-success" v-if="!finished && demoAutoOption === '0'" @click="startManually">
                {{ isStart ? "Next game" : "First game" }}
            </button>
            <button class="btn btn-outline-success" v-if="!finished && demoAutoOption === '1'" @click="startGameAuto">
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
            <app-demo-auto-option class="mt-1" @changeOption="demoAutoOption = $event" :option="demoAutoOption"></app-demo-auto-option>
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
                redWinPercentage: "",
                blueWinPercentage: "",
                greenWinPercentage: "",
                blackWinPercentage: "",
                count: 0,
                gameCount: 0,
                timer: null,
                trialNum: "",
                isSet: false,
                isDraw: false,
                finished: false,
                isStart: false,
                isAutoStart: false,
                isRed: false,
                isBlue: false,
                isGreen: false,
                isBlack: false,
                isRedWin: false,
                isBlueWin: false,
                isGreenWin: false,
                isBlackWin: false,
            };
        },
        computed: {
            isValidInput() {
                if (!this.trialNum ||
                    isNaN(Number(this.trialNum)) ||
                    this.trialNum < 100 ||
                    this.trialNum > 10000) {
                    return false;
                }
                return true;
            },
            timerInterval() {
                if (this.trialNum <= 600) {
                    return 50;
                } else if (this.trialNum <= 5000) {
                    return 10;
                } else if (this.trialNum <= 10000) {
                    return 0.5;
                } else {
                    return 0.1;
                }
            },

            forTime() {
                if (this.trialNum <= 200) {
                    return 1;
                } else if (this.trialNum <= 10000) {
                    return 2;
                } else if (this.trialNum <= 20000) {
                    return 4;
                } else if (this.trialNum <= 30000) {
                    return 6;
                } else if (this.trialNum <= 50000) {
                    return 10;
                } else {
                    return 20;
                }
            }
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
                if (!this.isValidInput) {
                    document.getElementById("outOfRange").innerHTML = "Number of trials out of range!";
                } else if (this.activatedDices.length < 2) {
                    document.getElementById("outOfRange").innerHTML = "Please select more than 2 dices!";
                } else {
                    document.getElementById("outOfRange").innerHTML = "";
                    this.isSet = true;
                }
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
                    this.timer = setInterval(this.startGames, this.timerInterval);
                }
            },

            startGames() {
                let times = this.forTime;
                for (let i = 0; i < times; i++) {
                    this.startManually();
                    if (parseInt(this.count) === parseInt(this.trialNum)) {
                        break;
                    }
                }
            },
            startManually() {
                this.isDraw = false;
                this.isStart = true;
                this.count++;
                this.gameCount++;
                let winDices = [];
                this.isRedWin = false;
                this.isGreenWin = false;
                this.isBlueWin = false;
                this.isBlackWin = false;
                this.diceNumandCol = [];

                if (this.isRed) {
                    this.redNumber = this.gameRule.redDiceFace[this.generateRandom(this.gameRule.diceFaces)];
                    this.diceNumandCol.push([this.redNumber, "red"]);
                }
                if (this.isBlue) {
                    this.blueNumber = this.gameRule.blueDiceFace[this.generateRandom(this.gameRule.diceFaces)];
                    this.diceNumandCol.push([this.blueNumber, "blue"]);
                }
                if (this.isGreen) {
                    this.greenNumber = this.gameRule.greenDiceFace[this.generateRandom(this.gameRule.diceFaces)];
                    this.diceNumandCol.push([this.greenNumber, "green"]);
                }
                if (this.isBlack) {
                    this.blackNumber = this.gameRule.blackDiceFace[this.generateRandom(this.gameRule.diceFaces)];
                    this.diceNumandCol.push([this.blackNumber, "black"]);
                }
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
                    this.gameCount--;
                    this.isDraw = true;
                }
                if(this.count === 0){
                    this.redWinPercentage = (this.redWinNumber * 100).toFixed(1) + "%";
                    this.blackWinPercentage = (this.blackWinNumber * 100).toFixed(1) + "%";
                    this.greenWinPercentage = (this.greenWinNumber * 100).toFixed(1) + "%";
                    this.blueWinPercentage = (this.blueWinNumber * 100).toFixed(1) + "%";
                }else{
                    this.redWinPercentage = (this.redWinNumber * 100 / this.gameCount).toFixed(1) + "%";
                    this.blackWinPercentage = (this.blackWinNumber * 100 / this.gameCount).toFixed(1) + "%";
                    this.greenWinPercentage = (this.greenWinNumber * 100 / this.gameCount).toFixed(1) + "%";
                    this.blueWinPercentage = (this.blueWinNumber * 100 / this.gameCount).toFixed(1) + "%";
                }
                if (parseInt(this.count) === parseInt(this.trialNum)) {
                    this.finished = true;
                }

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
            },
            reset() {
                this.redNumber = "";
                this.blueNumber = "";
                this.greenNumber = "";
                this.blackNumber = "";
                this.redWinNumber = 0;
                this.blueWinNumber = 0;
                this.greenWinNumber = 0;
                this.blackWinNumber = 0;
                this.redWinPercentage = "";
                this.blueWinPercentage = "";
                this.greenWinPercentage = "";
                this.blackWinPercentage = "";
                this.count = 0;
                this.timer = null;
                this.finished = false;
                this.isStart = false;
                this.isAutoStart = false;
                this.isRedWin = false;
                this.isBlueWin = false;
                this.isGreenWin = false;
                this.isBlackWin = false;
            }
        },
        destroyed() {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        },
        name: "ManyTrials"
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