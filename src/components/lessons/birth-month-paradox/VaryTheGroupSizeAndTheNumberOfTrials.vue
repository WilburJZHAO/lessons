<template>
    <div class="container mt-3 mb-5">
        <h3 class="text-center text-success mb-4">Vary the group size and the number of trials</h3>

        <div style="height: 10px"></div>
        <div class="container mt-4 mb-5" v-if="!isSet" style="width: 50%">
            <div class="form-group row">
                <label class="col-sm-6">
                    Enter the number of trials (1 to 100)
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
                    Enter the group size (2 to 12)
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
        <div class="row">
            <div class="col-md-6 pb-4" :style="{visibility: isSet? 'visible' : 'hidden'}">
                <table style="text-align: center">
                    <tr>
                        <td style="width: 40%; text-align: left">Group size</td>
                        <td style="width: 40%;"><input style="text-align: right;" class="inputNumber" disabled type="text" id="inputGroupSize" v-model="groupSize" /></td>
                        <td style="width: 20%"></td>
                    </tr>
                    <tr>
                        <td style="width: 40%; text-align: left">Trial</td>
                        <td><input style="text-align: right;" class="inputNumber" disabled type="text" id="inputTrial" v-model="trials" /></td>
                        <td style="text-align: right">{{displayTrial}} Trails</td>
                    </tr>
                    <tr>
                        <td style="width: 40%; text-align: left">Matched</td>
                        <td><input style="text-align: right;" class="inputNumber" disabled type="text" id="inputMatched" v-model="match" /></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td style="width: 40%; text-align: left">Percentage matched</td>
                        <td> <input style="text-align: right;" class="inputNumber" disabled type="text" id="inputPercentage" v-model="percentageMatch" /></td>
                        <td></td>
                    </tr>
                </table>

                <div id="controller" style="margin-left: 20%; margin-top: 20px;">
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
                        </button>
                        <app-demo-auto-option class="mt-1" @changeOption="demoAutoOption = $event" :option="demoAutoOption"></app-demo-auto-option>
                    </div>
                </div>
            </div>

            <div class="col-md-6" :style="{visibility: pressOK? 'visible' : 'hidden'}">
                <div class="table-wrapper-scroll-y" id="scroller" style="width: 80%">
                    <table id='tblResult' class="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th style="text-align: center">Results</th>
                        </tr>
                        <tr v-for="i in displayHeight">
                            <td style="text-align: right; height: 50px"></td>
                        </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import DemoAutoOption from "./DemoAutoOption.vue";
    import {
        isMatch
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
                birthMonths: [],
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
                displayHeight: 1,
                isAutoStart: false,
                isChecked1: true,
                isChecked2: true,
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
            okBtn() {
                this.isChecked1 = true;
                this.isChecked2 = true;
                if(this.groupSize < 2 || this.groupSize > 12 || this.displayTrial < 1 || this.displayTrial > 100){
                    if (this.groupSize < 2 || this.groupSize > 12 ) {
                        this.isChecked1 = false;
                    }
                    if(this.displayTrial < 1 || this.displayTrial > 100){
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
                    this.timer = setInterval(this.executeManually, 100);
                }
            },
            executeManually() {
                if (this.isStart === false) this.isStart = true;
                this.pressOK = true;
                this.birthMonths = [];
                for (let i = 0; i < this.groupSize; i++) {
                    let rand = Math.floor(Math.random() * 12) + 1;
                    this.birthMonths.push(rand);
                }
                if (isMatch(this.birthMonths)) {
                    this.match++;
                    this.birthMonths.push('match');
                }
                document.getElementById('tblResult').rows[this.trial].cells[0].innerHTML = this.birthMonths.join(', ');
                this.percentageMatch = (this.match * 100 / this.trial).toFixed(2);

                if (this.trial >= this.displayTrial) {
                    this.finished = true;
                    this.trials++;
                    return;
                }
                this.trial++;
                this.trials++;
                this.displayHeight++;
            },
            resetII() {
                this.match = 0;
                this.trial = 1;
                this.percentageMatch = "";
                this.birthMonths = [];
                this.pressOK = false;
                this.finished = false;
                this.timer = null;
                this.isStart = false;
                this.isAutoStart = false;
                this.trials = 0;
                this.displayHeight = 1;
                document.getElementById('tblResult').rows[1].cells[0].innerHTML = "";
                document.getElementById("error").innerHTML = "Please enter the group size and trial to begin";
            },
        },
        destroyed() {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        },
        name: "VaryTheGroupSizeAndTheNumberOfTrials"
    }
</script>

<style scoped>
    .table-wrapper-scroll-y {
        display: block;
        max-height: 400px;
        overflow: auto;
        -ms-overflow-style: -ms-autohiding-scrollbar;
    }
</style>