<template>
    <div class="container mt-3 mb-5">
        <h3 class="text-center text-success mb-4">Enter your number and search range</h3>

        <div style="display: flex; flex-direction: row">
            <div>
                <table>
                    <tr>
                        <td>
                            <h4 class="text-success">
                                <b id="error" style="">Please enter numbers to begin</b>
                            </h4>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div style="height: 20px"></div>


        <div class="row">
            <div class="col-md-6 pb-4">
                <div style="margin-left: 20px;">
                    <label id="instruction" class="instructionLabel">Enter an even number greater than 2</label>
                </div>
                <div style="display: flex; flex-direction: row">
                    <div style="margin: 20px; flex-direction: column; align-content: flex-end">
                        <div>
                            <label class="inputLabel">Start:</label>
                        </div>
                        <div>
                            <label class="inputLabel">Finish: </label>
                        </div>
                    </div>
                    <div style="display:flex; margin: 20px; flex-direction: column; align-content: flex-start">
                        <div style="align-self: flex-end">
                            <input class="inputNumber" v-model="enterNum" type="text" id="inputStart" />
                        </div>
                        <div style="align-self: flex-end">
                            <input class="inputNumber" v-model="enterNum2" type="text" id="inputFinish" />
                        </div>
                        <div style="text-align: center; margin-top: 20px">
                            <input :style="{visibility: !pressOK ? 'visible' : 'hidden' }" class="btn btn-outline-success" type="button" id="buttonOk" value="OK" @click="okClicked()">
                        </div>
                    </div>
                </div>
                <div style="margin-left: 20px;">
                    <label id="instructionDetail" class="instructionLabel" style="color:grey">Every even number, greater than two, can be written as the sum of two primes</label>
                </div>
                <div v-if="pressOK" id="controller" style="display:flex; flex-direction: row; margin-left: 20px; margin-top: 5px;">
                    <div style="margin-left: 25%">
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
            </div>

            <div class="col-md-6">
                <div class="table-wrapper-scroll-y" id="scroller" v-if="isSet">
                    <table id="mainTable" v-if="isSet" class="table table-bordered table-striped" style="text-align: center">
                        <thead>
                        <tr>
                            <th style="text-align: center" scope="col">Number</th>
                            <th style="text-align: center" colspan="2">Pairs</th>
                        </tr>
                        <tr v-for="i in isSet ? pairs.length : 0">
                            <td style="color: brown"><b>
                                {{ index[i - 1][0] ? parseInt(index[i - 1][1]) : "" }}</b>
                            </td>
                            <td>{{ pairs[i - 1][0] }}</td>
                            <td>{{ pairs[i - 1][1] }}</td>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import DemoAutoOption from "./DemoAutoOption.vue";
    import {
        getPrimes,
        getPairs
    } from "./utils";

    export default {
        components: {
            appDemoAutoOption: DemoAutoOption
        },
        data: function() {
            return {
                enterNum: "",
                enterNum2: "",
                firstNum: "",
                displayNum: [],
                pairs: [],
                pair: [],
                isSet: false,
                pressOK: false,
                index: [],
                time: 0,
                display: [0],
                finished: false,
                timer: null,
                isStart: false,
                isAutoStart: false,
                demoAutoOption: "1",
                gameNum: "",
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
        updated: function() {
            this.$nextTick(function() {
                var div = document.getElementById('scroller');
                div.scrollTop = div.scrollHeight;
            })
        },
        methods: {
            okClicked() {
                if (
                    this.enterNum === "" ||
                    parseInt(this.enterNum) % 2 !== 0 ||
                    parseInt(this.enterNum) <= 2 || parseInt(this.enterNum2) % 2 !== 0 || parseInt(this.enterNum2) <= 2
                ) {
                    document.getElementById("error").innerHTML =
                        "Please enter even numbers greater than 2";
                    return;
                } else if (
                    parseInt(this.enterNum2) > parseInt(this.enterNum) + 100
                ) {
                    let errText = "Please enter the second number smaller than " + (parseInt(this.enterNum) + 100);
                    document.getElementById("error").innerHTML =
                        errText;
                    return;
                } else if(parseInt(this.enterNum2) < parseInt(this.enterNum)){
                    document.getElementById("error").innerHTML =
                    "Please enter the second number greater than the first number";
                    return;
                } else {
                    this.pressOK = true;
                    this.gameNum = parseInt(this.enterNum);
                }
            },
            startGameAuto() {
                this.isAutoStart = true;
                if (this.timer) {
                    clearInterval(this.timer);
                    this.timer = null;
                } else {
                    this.timer = setInterval(this.startManually, 50);
                }
            },
            startManually() {
                document.getElementById("error").innerHTML =
                    "Please enter a number to begin";
                this.isStart = true;
                this.index = [];
                if (this.time === 0) {
                    this.firstNum = this.gameNum;
                }
                let n = parseInt(this.gameNum);
                let primes = getPrimes(n);
                this.pair = getPairs(n, primes);
                for (let i = 0; i < this.pair.length; i++) {
                    this.pairs.push(this.pair[i]);
                }
                this.display.push(this.pairs.length);
                this.displayNum.push([this.gameNum]);
                for (let i = 0; i < this.pairs.length; i++) {
                    this.index.push(false);
                }
                for (let i = 0; i < this.display.length; i++) {
                    this.index[this.display[i]] = [true, this.displayNum[i]];
                }
                this.isSet = true;
                if (parseInt(this.gameNum) === parseInt(this.enterNum2)) {

                    this.finished = true;
                }
                this.gameNum = parseInt(this.gameNum) + 2;

            },
            reset() {
                this.enterNum = "";
                this.enterNum2 = "";
                this.firstNum = "";
                this.displayNum = [];
                this.pairs = [];
                this.pair = [];
                this.isSet = false;
                this.index = [];
                this.time = 0;
                this.display = [0];
                this.pressOK = false;
                this.finished = false;
                this.timer = null;
                this.isStart = false;
                this.isAutoStart = false;
                this.demoAutoOption = "1";
                this.gameNum = "";
                document.getElementById("error").innerHTML =
                    "Please enter a number to begin";
            }
        },
        destroyed() {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        },
        name: "SearchRange"
    };
</script>

<style scoped>
    .table-wrapper-scroll-y {
        display: block;
        max-height: 600px;
        overflow: auto;
        -ms-overflow-style: -ms-autohiding-scrollbar;
    }
</style>