<template>
    <div class="container mt-3 mb-5">
    <h3 class="lesson-subheading">Five person demonstration</h3>
    <hr class="subheading-separator">

        <div style="display: flex; flex-direction: row">
            <div>
                <table>
                    <tr>
                        <td>
                            <h4 class="text-success">
                                Start
                            </h4>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div style="height: 20px"></div>

        <div class="row">
            <div class="col-md-6 pb-4">
                <table style="text-align: center">
                    <tr>
                        <td style="width: 40%; text-align: left">Group size</td>
                        <td style="width: 40%;"><input style="text-align: right;" class="inputNumber" disabled type="text" id="inputGroupSize" value="5" /></td>
                        <td style="width: 20%"></td>
                    </tr>
                    <tr>
                        <td style="width: 40%; text-align: left">Trial</td>
                        <td><input style="text-align: right;" class="inputNumber" disabled type="text" id="inputTrial" v-model="displayTrial" /></td>
                        <td style="text-align: right">10 Trials</td>
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
                            {{ isStart ? "Play one game" : "Play one game" }}
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

                <table id='tblResult' class="table table-bordered table-striped" style="width: 50%;">
                    <thead>
                    <tr>
                        <th style="text-align: center">Results</th>
                    </tr>
                    <tr v-for="i in 10">
                        <td style="text-align: right; height: 50px"></td>
                    </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>


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
        data: function () {
            return {
                match: 0,
                displayTrial: 0,
                percentageMatch: "",
                birthMonths: [],
                isSet: false,
                pressOK: false,
                index: [],
                time: 0,
                finished: false,
                timer: null,
                isStart: false,
                isAutoStart: false,
                demoAutoOption: "1",
                trial: 1,
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
        mounted: function () {
        },
        updated: function () {
        },
        methods: {
            startGameAuto() {
                this.isAutoStart = true;
                if (this.timer) {
                    clearInterval(this.timer);
                    this.timer = null;
                } else {
                    this.timer = setInterval(this.executeManually, 200);
                }
            },
            executeManually() {
                this.birthMonths = [];
                for (let i = 0; i < 5; i++) {
                    let rand = Math.floor(Math.random() * 12) + 1;
                    this.birthMonths.push(rand);
                }
                if (isMatch(this.birthMonths)) {
                    this.match++;
                    this.birthMonths.push('match');
                }
                document.getElementById('tblResult').rows[this.trial].cells[0].innerHTML = this.birthMonths.join(',');
                this.percentageMatch = (this.match * 100 / this.trial).toFixed(2);
                if (this.trial >= 10) {
                    this.finished = true;
                }
                this.trial++;
                this.displayTrial++;
            },
            reset() {
                this.match= 0;
                this.trial= 1;
                this.percentageMatch= "";
                this.birthMonths= [];
                this.isSet= false;
                this.pressOK= false;
                this.index= [];
                this.time= 0;
                this.finished= false;
                this.timer= null;
                this.isStart= false;
                this.isAutoStart = false;
                this.displayTrial= 0;
                for (let i = 0; i < 11; i++) {
                    document.getElementById('tblResult').rows[i+1].cells[0].innerHTML = "";
                }
            },
        },
        destroyed() {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        },
        name: "FivePersonDemonstration"
    }
</script>

<style scoped>

</style>