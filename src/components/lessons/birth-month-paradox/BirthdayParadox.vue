<template>
    <div class="container mt-3 mb-5">
        <h3 class="text-center text-success mb-4">Birthday paradox</h3>
        <div style="height: 10px"></div>
        <div class="container mt-4 mb-5" v-if="!isSet" style="width: 60%">
            <div class="form-group row">
                <label class="col-sm-6">
                    Enter the number of trials (1 to 10000)
                </label>
                <div class="col-sm-6">
                    <input type="number"
                           class="form-control"
                           required
                           v-model="displayTrial"
                    >
                    <div class="badge badge-danger mt-2"
                         v-bind:style="{visibility: isChecked2 ? 'hidden' : 'visible' }">
                        Invalid input
                    </div>
                </div>
            </div>

            <div class="form-group row">
                <label class="col-sm-6">
                    Enter the group size (2 to 100)
                </label>
                <div class="col-sm-6">
                    <input type="number"
                           class="form-control"
                           required
                           v-model="groupSize"
                    >
                    <div class="badge badge-danger mt-2"
                         v-bind:style="{visibility: isChecked1 ? 'hidden' : 'visible' }">
                        Invalid input
                    </div>
                </div>
            </div>


            <div class="form-action text-center">
                <button class="btn btn-outline-success" @click="okBtn" type="submit">OK</button>
            </div>
        </div>
        <div class="text-center">
            <div class="" style="width: 100%;" :style="{visibility: isSet? 'visible' : 'hidden'}">
                <table style="text-align: center; width: 50%; margin-left: 25%">
                    <tr>
                        <td style="width: 40%; text-align: left">Group size</td>
                        <td style="width: 40%;"><input style="text-align: right; width:100%" class="inputNumber" disabled type="text" id="inputGroupSize" v-model="groupSize" /></td>
                        <td style="width: 20%"></td>
                    </tr>
                    <tr>
                        <td style="width: 40%; text-align: left">Trial</td>
                        <td><input style="text-align: right; width:100%" class="inputNumber" disabled type="text" id="inputTrial" v-model="trials" /></td>
                        <td style="text-align: right">{{displayTrial}} trails</td>
                    </tr>
                    <tr>
                        <td style="width: 40%; text-align: left">Matched</td>
                        <td><input style="text-align: right; width:100%" class="inputNumber" disabled type="text" id="inputMatched" v-model="match" /></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td style="width: 40%; text-align: left">Percentage matched</td>
                        <td> <input style="text-align: right; width:100%" class="inputNumber" disabled type="text" id="inputPercentage" v-model="percentageMatch" /></td>
                        <td></td>
                    </tr>
                </table>

                <div id="controller" class="text-center" style="margin-top: 20px;">
                    <div>
                        <button class="btn btn-outline-success" v-if="!finished && demoAutoOption === '0'" @click="executeManually">
                            {{ isStart ? "Tap here for next game" : "Tap here for first game" }}
                        </button>
                        <button class="btn btn-outline-success" v-if="!finished && demoAutoOption === '1'" @click="startGameAuto">
                            {{
                            !isAutoStart
                            ? "Tap here to begin"
                            : timer
                            ? "Tap here to pause"
                            : "Tap here to resume"
                            }}
                        </button>
                        <button class="btn btn-outline-dark" v-if="finished" @click="resetII()">
                            Click here to reset
                        </button>&nbsp;&nbsp;&nbsp;
                        <app-demo-auto-option class="mt-1" @changeOption="demoAutoOption = $event" :option="demoAutoOption"></app-demo-auto-option>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import DemoAutoOption from "./DemoAutoOption.vue";
    import {
        isBirthDayMatch
    } from "./utils";

    export default {
        components: {
            appDemoAutoOption: DemoAutoOption
        },
        data: function() {
            return {
                match: 0,
                displayTrial: "",
                percentageMatch: "",
                birthdays: [],
                isSet: false,
                pressOK: false,
                time: 0,
                finished: false,
                timer: null,
                isStart: false,
                demoAutoOption: "1",
                trial: 1,
                trials: 0,
                groupSize: "",
                isAutoStart: false,
                isChecked1: true,
                isChecked2: true,
            };
        },
        computed: {
            timerInterval() {
                if (this.displayTrial <= 600) {
                    return 50;
                } else if (this.displayTrial <= 5000) {
                    return 10;
                } else if (this.displayTrial <= 10000) {
                    return 0.5;
                } else {
                    return 0.1;
                }
            },

            forTime() {
                if (this.displayTrial <= 200) {
                    return 1;
                } else if (this.displayTrial <= 10000) {
                    return 2;
                } else if (this.displayTrial <= 20000) {
                    return 4;
                } else if (this.displayTrial <= 30000) {
                    return 6;
                } else if (this.displayTrial <= 50000) {
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
        methods: {
            okBtn() {
                this.isChecked1 = true;
                this.isChecked2 = true;
                if(this.groupSize < 2 || this.groupSize > 100 || this.displayTrial < 1 || this.displayTrial > 10000){
                    if (this.groupSize < 2 || this.groupSize > 100 ) {
                        this.isChecked1 = false;
                    }
                    if(this.displayTrial < 1 || this.displayTrial > 10000){
                        this.isChecked2 = false;
                    }
                }else{
                    this.isSet = true;
                }


            },
            startGameAuto() {
                if (this.isAutoStart === false) this.isAutoStart = true;
                if (this.timer) {
                    clearInterval(this.timer);
                    this.timer = null;
                } else {
                    this.timer = setInterval(this.startGame, this.timerInterval);
                }
            },
            startGame() {
                let times = this.forTime;
                for (let i = 0; i < times; i++) {
                    this.executeManually();
                    if (this.trial >= this.displayTrial) {
                        break;
                    }
                }
            },
            executeManually() {
                if (this.isStart === false) this.isStart = true;
                this.pressOK = true;
                this.birthdays = [];
                for(let i = 0; i < this.groupSize; i++){
                    //Random birth month
                    let month = Math.floor(Math.random() * 12) + 1;
                    let maxDay = 30;
                    if(month === 2)
                        maxDay = 28;
                    if(month === 1 || month === 3 || month === 5 || month === 5 || month === 8 || month === 10 || month === 12)
                        maxDay = 31;

                    let day = Math.floor(Math.random() * maxDay) + 1;
                    this.birthdays.push({month: month, day: day});
                }

                if(isBirthDayMatch(this.birthdays)){
                    this.match ++;
                }
                this.percentageMatch = (this.match * 100 / this.trial).toFixed(2);
                if (this.trial >= this.displayTrial) {
                    this.finished = true;
                    this.trials++;
                    return;
                }
                this.trial++;
                this.trials++;
            },
            resetII() {
                this.match = 0;
                this.trial = 1;
                this.percentageMatch = "";
                this.birthdays = [];
                this.pressOK = false;
                this.finished = false;
                this.timer = null;
                this.isStart = false;
                this.isAutoStart = false;
                this.trials = 0;
                document.getElementById("error").innerHTML = "Please enter the group size and trial to begin";
            },
        },
        destroyed() {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        },
        name: "BirthdayParadox"
    }
</script>

<style scoped>

</style>