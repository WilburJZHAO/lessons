<template>
    <div class="container mt-3 mb-5">
        <h3 class="lesson-subheading">Display a list of primes</h3>
        <hr class="subheading-separator">

        <div style="display: flex; flex-direction: row">
            <div>
                <table>
                    <tr>
                        <td>
                            <h4 class="text-success">
                                <b id="error" style="">Please the button to begin</b>
                            </h4>
                        </td>
                        <td>
                            &nbsp;&nbsp;&nbsp;
                            <button
                                    name="okBtn"
                                    @click="onShowPrimeClicked()"
                                    class="btn btn-outline-success"
                                    id="controlBtn"
                                    v-if="!isSet"
                            >
                                Show the first {{legify(15000)}} prime numbers
                            </button>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div style="height: 20px"></div>
            <div>
            <div :style="{visibility: isSet? 'visible':'hidden'}" class="table-wrapper-scroll-y" style="max-height: 500px;" id = "tableDiv">
                <table  id = 'mainTable' class="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th style="text-align: center" scope="col" >Number</th>
                        <th style="text-align: center" colspan="10">Pairs</th>
                    </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import { getPrimes } from "./utils";
    import { legify } from "../../common/utils.js";

    export default {
        data: function() {
            return {
                displayNum: [],
                isSet: false,
                index: [],
                time: 0,
                display: [0],
                primes:[],
            };
        },
        mounted: function() {},
        watch: {
            finished(value) {
                if (value === true && this.timer) {
                    clearInterval(this.timer);
                    this.timer = null;
                }
            },
        },
        methods: {
            legify,
            onShowPrimeClicked () {
                document.getElementById("error").innerHTML = "Please wait.....";
                var start = new Date().getTime();
                let primes = getPrimes(163842);
                let count = 1;
                while (primes.length >= 200){ //To make faster.....
                    let a = document.getElementById("mainTable").innerHTML + '<tr>'
                        + '<td style = "text-align: right; color: red" >' + legify(count) + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '</tr>' + '<tr>'
                        + '<td style = "text-align: right; color: red" >' + legify(parseInt(count+10)) + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '</tr>' + '<tr>'
                        + '<td style = "text-align: right; color: red" >' + legify(parseInt(count+20)) + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '</tr>' + '<tr>'
                        + '<td style = "text-align: right; color: red" >' + legify(parseInt(count+30)) + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '</tr>' + '<tr>'
                        + '<td style = "text-align: right; color: red" >' + legify(parseInt(count+40)) + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '</tr>' + '<tr>'
                        + '<td style = "text-align: right; color: red" >' + legify(parseInt(count+50)) + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '</tr>' + '<tr>'
                        + '<td style = "text-align: right; color: red" >' + legify(parseInt(count+60)) + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '</tr>' + '<tr>'
                        + '<td style = "text-align: right; color: red" >' + legify(parseInt(count+70)) + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '</tr>' + '<tr>'
                        + '<td style = "text-align: right; color: red" >' + legify(parseInt(count+80)) + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '</tr>' + '<tr>'
                        + '<td style = "text-align: right; color: red" >' + legify(parseInt(count+90)) + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '</tr>' + '<tr>'
                        + '<td style = "text-align: right; color: red" >' + legify(parseInt(count+100)) + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '</tr>' + '<tr>'
                        + '<td style = "text-align: right; color: red" >' + legify(parseInt(count+110)) + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '</tr>' + '<tr>'
                        + '<td style = "text-align: right; color: red" >' + legify(parseInt(count+120)) + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '</tr>' + '<tr>'
                        + '<td style = "text-align: right; color: red" >' + legify(parseInt(count+130)) + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '</tr>' + '<tr>'
                        + '<td style = "text-align: right; color: red" >' + legify(parseInt(count+140)) + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '</tr>' + '<tr>'
                        + '<td style = "text-align: right; color: red" >' + legify(parseInt(count+150)) + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '</tr>' + '<tr>'
                        + '<td style = "text-align: right; color: red" >' + legify(parseInt(count+160)) + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '</tr>' + '<tr>'
                        + '<td style = "text-align: right; color: red" >' + legify(parseInt(count+170)) + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '</tr>' + '<tr>'
                        + '<td style = "text-align: right; color: red" >' + legify(parseInt(count+180)) + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '</tr>' + '<tr>'
                        + '<td style = "text-align: right; color: red" >' + legify(parseInt(count+190)) + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '<td style = "text-align: right;">' + primes.shift() + '</td>'
                        + '</tr>';

                    document.getElementById("mainTable").innerHTML = a;
                    count += 200;
                }

                var end = new Date().getTime();
                var time = end - start;
                document.getElementById("error").innerHTML = "Finished!!";
                document.getElementById('error').innerHTML='That took ' + time + ' milliseconds to calculate and display';
                this.isSet=true;
            }
        },
        name: "AListofPrimes"
    }
</script>

<style scoped>
    .table-wrapper-scroll-y {
        display: block;
        max-height: 600px;
        overflow: auto;
        -ms-overflow-style: -ms-autohiding-scrollbar;
    }
</style>
