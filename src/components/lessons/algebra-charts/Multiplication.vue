<template>
    <div>
        <transition appear appear-class="app-appear" appear-active-class="app-appear-active">
            <div class="container mt-4 mb5">
                <h3 class="lesson-subheading">Multiplication</h3>
                <hr class="subheading-separator">
                <div class="row" style="max-width: 100%">
                    <!-- Left part -->
                    <div class="col-12 col-md-6 app--lesson-left" style="max-width: 50%">
                        <div style="text-align: left;max-width: 70%">
                            <h5>Choose the grid size</h5>
                            <select id="gridSize" style="width:10vw;font-size: 1.5vw" v-model="selected" v-on:change="generateTable()">
                                <option v-for="option in options" v-bind:value="option.value">
                                    {{ option.text }}
                                </option>
                            </select> &nbsp;
                            <br><br>
                            <h5>Choose the difficulty level</h5>
                            <select id="select1" style="width:10vw; font-size: 1.5vw" v-model="selected1" v-on:change="generateTable()">
                                <option v-for="s1 in options1" v-bind:value="s1.value">
                                    {{ s1.text }}
                                </option>
                            </select>
                            <br><br>
                            <input type="checkbox" name="myRadio" v-on:change="a()" id="ccc"> Graph time taken
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <button v-if="resetNow === false" v-on:click="check()" id="ok" class="btn btn-outline-success" style="margin: auto">
                                Check
                            </button>
                            <button v-if="resetNow === true" v-on:click="reset()" id="rs" class="btn btn-outline-success" style="margin: auto">
                                Reset
                            </button>
                            <br><br>
                            <h5>Complete this multiplication grid</h5>
                            <h6 class="mb-3">(type <i>x2</i> to get <i>x<sup>2</sup></i>)</h6>
                            <div v-if="alertMessage" :class="isAlert?'alert alert-success':'alert alert-danger'">
                                {{ alertMessage }}
                            </div>
                            <table id="tableAdd" style="color: #004488; text-align: center; vertical-align: center; visibility: visible; border: #7f8c8d solid;background: white;">
                                <tr v-for="i in selected + 1">
                                    <td v-for="j in selected + 1" :style="
                                      (j === 1 && i !== 1)||(i===1&&j!==1)
                                        ? 'width: 6vw; height: 5vw; background: rgba(165, 220, 255, 1)'
                                        : 'width: 6vw; height: 5vw;'">
                                        <b v-if="i===1&&j===1"><span style="color: black; font-size: 1.4rem">X</span></b>
                                        <b v-else-if="(i===1&&j===c[0]+1) && randomIndex ==='r'">{{generate(i,j)}}</b>
                                        <b v-else-if="(j===1&&i===r[0]+1) && randomIndex ==='c'">{{generate(i,j)}}</b>
                                        <b v-else-if="i===r[0]+1&&j===c[0]+1">{{generate(i,j)}}</b>
                                        <b v-else-if="i===r[0]+1&&j===c[1]+1">{{generate(i,j)}}</b>
                                        <b v-else-if="i===r[1]+1&&j===c[1]+1">{{generate(i,j)}}</b>
                                        <b v-else-if="i===r[1]+1&&j===c[2]+1">{{generate(i,j)}}</b>
                                        <b v-else-if="i===r[2]+1&&j===c[2]+1">{{generate(i,j)}}</b>
                                        <b v-else-if="i===r[2]+1&&j===c[3]+1">{{generate(i,j)}}</b>
                                        <b v-else-if="i===r[3]+1&&j===c[3]+1">{{generate(i,j)}}</b>
                                        <b v-else-if="i===r[3]+1&&j===c[4]+1">{{generate(i,j)}}</b>
                                        <b v-else-if="i===r[4]+1&&j===c[4]+1">{{generate(i,j)}}</b>
                                        <b v-else-if="i===r[4]+1&&j===c[5]+1">{{generate(i,j)}}</b>
                                        <b v-else-if="i===r[5]+1&&j===c[5]+1">{{generate(i,j)}}</b>
                                        <b v-else-if="i===1&&j!==1"><input :ref="(i*10+j)" v-model="inputNum[i*10+j]" v-on:input="checkNum(i, j, re(i, j, inputNum[i*10+j]))" type="text" style='width: 6vw; height: 5vw;background: rgba(165, 220, 255, 1); border: 0px' /></b>
                                        <b v-else-if="j===1&&i!==1"><input :ref="(i*10+j)" v-model="inputNum[i*10+j]" v-on:input="checkNum(i, j, re(i, j, inputNum[i*10+j]))" type="text" style='width: 6vw; height: 5vw;background: rgba(165, 220, 255, 1); border: 0px' /></b>
                                        <b v-else><input :ref="(i*10+j)" v-model="inputNum[i*10+j]" v-on:input="checkNum(i, j, re(i, j, inputNum[i*10+j]))" type="text" style='width: 6vw; height: 5vw; border: 0px' /></b>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <!-- Right part -->
                    <div class="col-12 col-md-6 app--lesson-right" ref="qqq" style="padding-left: 200px;overflow: visible; max-width: 50%">
                        <div>
                            <div style="max-width: 15%;font-size: 1vw;color: #0f0f0f;position: relative">
                                <br /><br /><br /><br /><br /><br /><br /><br /><br />
                                <div id="container" :style="{visibility: isChecked? 'visible': 'hidden'}" style="min-width: 500px; height: 400px; margin: 0 auto;">
                                    <div>
                                        <h5>Graph</h5>
                                        <highcharts-container :defOptions="ops" :styles="sty"></highcharts-container>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
   import HighchartsContainer from './HighchartsComponent.vue';
    export default {
        components: {
            HighchartsContainer
        },
        data: function() {
            return {
                tbl_rows: 3,
                isChecked: false,
                tbl_columns: 3,
                selected: "",
                selected1: "",
                alertMessage: "",
                resetNow: false,
                isAlert: false,
                cur: [],
                inputNum: [],
                startTime: "",
                options: [{
                    text: "3 by 3",
                    value: 3
                },
                    {
                        text: "4 by 4",
                        value: 4
                    },
                    {
                        text: "5 by 5",
                        value: 5
                    },

                ],
                options1: [{
                    text: "Level 1",
                    value: "l1"
                },
                    {
                        text: "Level 2",
                        value: "l2"
                    },
                    {
                        text: "Level 3",
                        value: "l3"
                    },
                    {
                        text: "Expert",
                        value: "l4"
                    },
                ],
                arrSimpleOne: [],
                arrSimpleTwo: [],
                arrSimpleThree: [],
                arrSimpleFour: [],
                randomTable: [],
                r: [],
                c: [],
                crtNum: 0,
                checkRow: [],
                checkCol: [],
                checkVal: [],
                correctNum: [],
                randomIndex: "",
                n: 0,
                sty: {
                    width: 500,
                    height: 400,
                },
                ops: {
                    title: {
                        text: 'Graph Time Taken',
                        x: -20 // center
                    },
                    chart: {
                        type: 'column'
                    },
                    xAxis: {
                        title: {
                            text: "Series"
                        },
                        categories: [],
                    },
                    yAxis: {

                        title: {
                            text: 'Seconds'
                        },
                        // lines
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    tooltip: {
                        valueSuffix: 'S' // Unit
                    },
                    legend: {
                        enabled: false //
                    },
                    credits: {
                        enabled: false // Copyright infor
                    },
                    series: [{
                        name: 'Time',
                        data: [],
                    }]
                }
            }
        },
        created() {
            this.selected = this.options[0].value;
            this.selected1 = this.options1[0].value;
        },
        mounted: function() {
          // disable spellcheck in all input boxes
          let inputFields = document.getElementsByTagName("input");
          for(var i = 0; i < inputFields.length; i++){
              inputFields[i].setAttribute("spellcheck", "false");
          }

            this.start();
        },
        methods: {
            start() {
                document
                    .getElementById("tableAdd")
                    .rows[0].cells[0].setAttribute("style", "width: 6vw; height: 5vw; background: #ffeaa5");
                this.generateTable();
            },
            randomsort() {
                return Math.random() > .5 ? -1 : 1;
            },
            generateTable: function() {
                for (let i = 0; i < this.checkRow.length; i++) {
                    let index = this.checkRow[i] * 10 + this.checkCol[i];
                    this.$refs[index][0].classList.remove("red");
                    this.$refs[index][0].classList.remove("g");
                }
                let a = Math.random() * 10;
                this.randomIndex = "";
                if (a > 5) {
                    this.randomIndex = "c";
                } else {
                    this.randomIndex = "r";
                }
                this.startTime = "";
                this.checkVal = [];
                this.checkRow = [];
                this.checkCol = [];
                this.correctNum = [];
                this.alertMessage = "";
                this.resetNow = false;
                this.isAlert = false;
                this.inputNum = [];
                var i = this.selected;
                this.arrSimpleOne = [];
                this.arrSimpleTwo = [];
                this.arrSimpleThree = [];
                this.arrSimpleFour = [];
                this.r = [];
                this.c = [];

                for (let s = 0; s < i; s++) {
                    this.r.push(s + 1);
                    this.c.push(s + 1);

                }
                this.r.sort(this.randomsort);
                this.c.sort(this.randomsort);

                if (this.selected1 === "l1") {
                    for (var m = 0; m < i; m++) {
                        var random = Math.floor(Math.random() * 10) - 5;
                        var random2 = Math.floor(Math.random() * 10) - 5;
                        var random3 = 1;
                        var random4 = 1;
                        this.arrSimpleOne.push(random);
                        this.arrSimpleTwo.push(random2);
                        this.arrSimpleThree.push(random3);
                        this.arrSimpleFour.push(random4);
                    }

                } else if (this.selected1 === "l2") {

                    for (m = 0; m < i; m++) {
                        random = Math.floor(Math.random() * 10) - 5;
                        random2 = Math.floor(Math.random() * 10) - 5;
                        random3 = Math.floor(Math.random() * 4) + 1;
                        random4 = Math.floor(Math.random() * 4) + 1;
                        this.arrSimpleOne.push(random);
                        this.arrSimpleTwo.push(random2);
                        this.arrSimpleThree.push(random3);
                        this.arrSimpleFour.push(random4);
                    }
                } else if (this.selected1 === "l3") {

                    for (m = 0; m < i; m++) {
                        random = Math.floor(Math.random() * 10) - 5;
                        random2 = Math.floor(Math.random() * 10) - 5;
                        random3 = Math.floor(Math.random() * 8) - 3;
                        if (random3 === 0) {
                            random3 = Math.floor(Math.random() * 4) + 1;
                        }
                        random4 = Math.floor(Math.random() * 8) - 3;
                        if (random4 === 0) {
                            random4 = Math.floor(Math.random() * 4) + 1;
                        }
                        this.arrSimpleOne.push(random);
                        this.arrSimpleTwo.push(random2);
                        this.arrSimpleThree.push(random3);
                        this.arrSimpleFour.push(random4);
                    }
                } else if (this.selected1 === "l4") {
                    for (m = 0; m < i; m++) {
                        random = Math.floor(Math.random() * 10) - 5;
                        random2 = Math.floor(Math.random() * 10) - 5;
                        random3 = 1;
                        random4 = 1;
                        this.arrSimpleOne.push(random);
                        this.arrSimpleTwo.push(random2);
                        this.arrSimpleThree.push(random3);
                        this.arrSimpleFour.push(random4);
                    }
                }
            },
            check: function() {
                this.correctNum = [];
                this.alertMessage = "";
                this.isAlert = false;
                for (var i = 0; i < this.checkVal.length; i++) {
                    var index = this.checkRow[i] * 10 + this.checkCol[i];
                    if (this.checkRow[i] === 1) {
                        if (this.isEqual(this.checkVal[i], this.arrSimpleOne[this.checkCol[i] - 2], this.arrSimpleThree[this.checkCol[i] - 2], 0)) {
                            if (this.$refs[index][0].classList.value === "red") {
                                this.$refs[index][0].classList.replace("red", "g");
                            } else {
                                this.$refs[index][0].classList.add("g");
                            }
                            this.correctNum[i] = "g";

                        } else {
                            if (this.$refs[index][0].classList.value === "g") {
                                this.$refs[index][0].classList.replace("g", "red");
                            } else {
                                this.$refs[index][0].classList.add("red");
                            }
                            this.correctNum[i] = "red";
                        }
                    } else if (this.checkCol[i] === 1) {
                        if (this.isEqual(this.checkVal[i], this.arrSimpleTwo[this.checkRow[i] - 2], this.arrSimpleFour[this.checkRow[i] - 2], 0)) {
                            if (this.$refs[index][0].classList.value === "red") {
                                this.$refs[index][0].classList.replace("red", "g");
                            } else {
                                this.$refs[index][0].classList.add("g");
                            }
                            this.correctNum[i] = "g";
                        } else {
                            if (this.$refs[index][0].classList.value === "g") {
                                this.$refs[index][0].classList.replace("g", "red");
                            } else {
                                this.$refs[index][0].classList.add("red");
                            }
                            this.correctNum[i] = "red";
                        }
                    } else {
                        if (this.isEqual(this.checkVal[i], this.arrSimpleOne[this.checkCol[i] - 2] * this.arrSimpleTwo[this.checkRow[i] - 2], this.arrSimpleThree[this.checkCol[i] - 2] * this.arrSimpleTwo[this.checkRow[i] - 2] + this.arrSimpleFour[this.checkRow[i] - 2] * this.arrSimpleOne[this.checkCol[i] - 2], this.arrSimpleThree[this.checkCol[i] - 2] * this.arrSimpleFour[this.checkRow[i] - 2])) {
                            if (this.$refs[index][0].classList.value === "red") {
                                this.$refs[index][0].classList.replace("red", "g");
                            } else {
                                this.$refs[index][0].classList.add("g");
                            }
                            this.correctNum[i] = "g";
                        } else {
                            if (this.$refs[index][0].classList.value === "g") {
                                this.$refs[index][0].classList.replace("g", "red");
                            } else {
                                this.$refs[index][0].classList.add("red");
                            }
                            this.correctNum[i] = "red";
                        }
                    }
                }
                var l = this.selected * this.selected;
                var count = 0;
                if (this.correctNum.length === l) {

                    for (let a = 0; a < this.correctNum.length; a++) {
                        if (this.correctNum[a] === "g") {
                            count++;
                        }
                    }
                    if (count === l) {
                        this.alertMessage = "All entries are correct";
                        this.isAlert = true;
                        this.resetNow = true;
                        this.n = this.n + 1;
                        let nn = this.n.toString();
                        let xaxis = "Series " + nn;
                        this.ops.xAxis.categories.push(xaxis);

                        var end = new Date().getTime();
                        var secDuration = Math.round((end - this.startTime) / 1000);
                        this.ops.series[0].data.push(secDuration);

                    } else {
                        let nnn = l - count;
                        if(nnn === 1){
                            this.alertMessage =
                                "All entries are checked. There is 1 error.";
                        }else{
                            this.alertMessage =
                                "All entries are checked. There are " +
                                nnn +
                                " errors.";
                        }
                    }
                } else {
                    for (let a = 0; a < this.correctNum.length; a++) {
                        if (this.correctNum[a] === "red") {
                            count++;
                        }
                    }
                    if(count === 1){
                        this.alertMessage =
                            "All entries are checked. There is 1 error.";
                    }else if(count > 1){
                        this.alertMessage =
                            "All entries are checked. There are " +
                            count +
                            " errors.";
                    }else{
                        this.isAlert = true;
                        this.alertMessage = "All entries correct";
                    }
                }
            },
            re: function(r, c, num) {
                this.inputNum[r * 10 + c] = num.replace(/\s/g, '');
                this.inputNum[r * 10 + c] = num.replace('x2', 'x²');
                num = this.inputNum[r * 10 + c];
                return num;
            },
            checkNum: function(r, c, num) {
                if (this.startTime === "") {
                    this.startTime = new Date().getTime();
                }
                if (num === "") {
                    return;
                } else {
                    //alert(num);
                    let v = num.replace(/\s/g, '');
                    //alert(v);
                    for (var i = 0; i < this.checkRow.length; i++) {
                        if (this.checkRow[i] === r && this.checkCol[i] === c) {
                            let index = r * 10 + c;
                            this.$refs[index][0].classList.remove("red");
                            this.$refs[index][0].classList.remove("g");
                            this.checkVal[i] = v;
                            return;
                        }
                    }
                    this.checkRow.push(r);
                    this.checkCol.push(c);
                    this.checkVal.push(v);
                }
            },
            reset: function() {
                this.alertMessage = "";
                this.isChecked = false;
                document.getElementById("ccc").checked = false;
                for (var i = 0; i < this.checkRow.length; i++) {
                    let index = this.checkRow[i] * 10 + this.checkCol[i];
                    this.$refs[index][0].classList.remove("red");
                    this.$refs[index][0].classList.remove("g");
                }
                this.generateTable();
            },
            isEqual: function(s, a, b, c) {
                let m = s.substring(0, 1);
                let f = 0;
                let bb = 0;
                let e = 0;
                let t = [];
                if (a === 0) {
                    t[0] = 0;
                }
                if (b === 0) {
                    t[1] = 0;
                }
                if (c === 0) {
                    t[2] = 0;
                }
                if (m === "-") {
                    f = -1;
                } else {
                    f = 1;
                }
                if (s.substring(s.length - 1, s.length) === "x") {
                    e = parseInt(s.substring(0, s.length - 1));
                    t[0] = 0;
                    t[1] = e;
                }
                for (let i = 0; i < s.length; i++) {
                    let c = s.substring(i, i + 1);
                    if (c === "x") {
                        if (i < s.length - 1) {
                            let n = s.substring(i + 1, i + 2);
                            if (n === "²") {
                                if (bb === 0)
                                    t[2] = f;
                                else
                                    t[2] = bb;
                                bb = 0;
                                i++;
                            } else {
                                if (bb === 0) {
                                    bb = f;
                                }
                                t[1] = bb;
                                bb = 0;
                            }
                        } else {
                            if (bb === 0) {
                                bb = f;
                            }
                            t[1] = bb;
                            bb = 0;
                        }
                    } else if (c === "+") {
                        t[0] = bb;
                        f = 1;
                        bb = 0;
                    } else if (c === "-") {
                        t[0] = bb;
                        f = -1;
                        bb = 0;
                    } else {
                        e = parseInt(c);
                        bb = bb * 10 + e * f;
                        if (i === s.length - 1) {
                            t[0] = bb;
                        }
                    }
                }
                return t[0] === a && t[1] === b && t[2] === c;
            },
            a: function() {
                this.isChecked = document.getElementById("ccc").checked === true;
            },
            generate: function(i, j) {
                var val1 = 0;
                var val2 = 0;
                var val3 = 0;
                var res = "";
                if (i === 1) {
                    val1 = 0;
                    val2 = this.arrSimpleThree[j - 2];
                    if (val2 === 0) {

                    } else if (val2 > 1 && val1 !== 0) {
                        res += "+" + val2 + "x";
                    } else if (val2 === 1) {
                        res += "x";
                    } else if (val2 === -1) {
                        res += "-x";
                    } else {
                        res += val2 + "x";
                    }
                    val3 = this.arrSimpleOne[j - 2];
                    if (val3 === 0) {

                    } else if (val3 > 0) {
                        res += "+" + val3;
                    } else {
                        res += val3;
                    }
                } else {
                    if (j === 1) {
                        val1 = 0;
                        val2 = this.arrSimpleFour[i - 2];
                        if (val2 === 0) {

                        } else if (val2 > 1 && val1 !== 0) {
                            res += "+" + val2 + "x";
                        } else if (val2 === 1) {
                            res += "x";
                        } else if (val2 === -1) {
                            res += "-x";
                        } else {
                            res += val2 + "x";
                        }

                        val3 = this.arrSimpleTwo[i - 2];
                        if (val3 === 0) {

                        } else if (val3 > 0) {
                            res += "+" + val3;
                        } else {
                            res += val3;
                        }
                    } else {
                        val1 = this.arrSimpleThree[j - 2] * this.arrSimpleFour[i - 2];
                        if (val1 === 0) {
                            val1 = "";
                        } else if (val1 === 1) {
                            res += "x²";
                        } else if (val1 === -1) {
                            res += "-x²";
                        } else {
                            res += val1 + "x²";
                        }
                        val2 = this.arrSimpleThree[j - 2] * this.arrSimpleTwo[i - 2] + this.arrSimpleFour[i - 2] * this.arrSimpleOne[j - 2];
                        if (val2 === 0) {

                        } else if (val2 > 1 && val1 !== 0) {
                            res += "+" + val2 + "x";
                        } else if (val2 === 1) {

                            res += "+x";
                        } else if (val2 === -1) {

                            res += "-x";
                        } else {
                            res += val2 + "x";
                        }
                        val3 = this.arrSimpleTwo[i - 2] * this.arrSimpleOne[j - 2];
                        if (val3 === 0) {

                        } else if (val3 > 0) {
                            res += "+" + val3;
                        } else {
                            res += val3;
                        }
                    }
                }
                return res;
            },
        },
    };
</script>

<style scoped>
    .g {
        color: #35b247;
    }

    .red {
        color: brown;
    }

    td {
        border: #7f8c8d solid;
        width: 6vw;
        height: 5vw;
        overflow:hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
        font-size: 19px;
        padding-left: 0px;
        padding-right: 0px;
    }

    .hide {
        visibility: hidden;
    }

    .appear {
        visibility: visible;
    }

    input {
        text-align: center;
    }
</style>