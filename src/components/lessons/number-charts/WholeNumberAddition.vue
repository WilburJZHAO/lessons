<template>
    <div>
        <transition appear appear-class="app-appear" appear-active-class="app-appear-active">
            <div class="container mt-4 mb5">
                <div class="row" style="max-width: 100%">
                    <!-- Left part -->
                    <div class="col-12 col-md-6 app--lesson-left" style="width: 70%">
                        <div style="text-align: left;max-width: 70%">
                            <h3>Choose the grid size</h3><br>
                            <select id="gridSize" style="width:10vw;font-size: 1.5vw" v-model="selected" v-on:change="generateTable()">
                                <option v-for="option in options" v-bind:value="option.value">
                                    {{ option.text }}
                                </option>
                            </select><br><br>
                            <h5>Complete the addition grid (0 to 999)</h5><br>
                            <div v-if="alertMessage" :class="isAlert?'alert alert-success':'alert alert-danger'">
                                {{ alertMessage }}
                            </div>
                            <table v-if="selected2==='add'" id="tableAdd"  style="color: #0067d2;text-align: center;visibility: visible; border: #7f8c8d solid;background: white;">
                                <tr v-for="i in selected + 1">
                                    <td v-for="j in selected + 1" :style="
                                      (j == 1 && i != 1)||(i==1&&j!=1)
                                        ? 'width: 3vw; height: 3vw; background: #e6ffe7'
                                        : 'width: 3vw; height: 3vw;'">
                                        <b v-if="i==1&&j==1">+</b>
                                        <b v-else-if="i==1&&j==c[0]+1">{{arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==r[0]+1&&j==c[0]+1">{{arrSimpleTwo[i-2]+arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==r[0]+1&&j==c[1]+1">{{arrSimpleTwo[i-2]+arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==r[1]+1&&j==c[1]+1">{{arrSimpleTwo[i-2]+arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==r[1]+1&&j==c[2]+1">{{arrSimpleTwo[i-2]+arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==r[2]+1&&j==c[2]+1">{{arrSimpleTwo[i-2]+arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==r[2]+1&&j==c[3]+1">{{arrSimpleTwo[i-2]+arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==r[3]+1&&j==c[3]+1">{{arrSimpleTwo[i-2]+arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==r[3]+1&&j==c[4]+1">{{arrSimpleTwo[i-2]+arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==r[4]+1&&j==c[4]+1">{{arrSimpleTwo[i-2]+arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==r[4]+1&&j==c[5]+1">{{arrSimpleTwo[i-2]+arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==r[5]+1&&j==c[5]+1">{{arrSimpleTwo[i-2]+arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==r[5]+1&&j==c[6]+1">{{arrSimpleTwo[i-2]+arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==r[6]+1&&j==c[6]+1">{{arrSimpleTwo[i-2]+arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==r[6]+1&&j==c[7]+1">{{arrSimpleTwo[i-2]+arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==r[7]+1&&j==c[7]+1">{{arrSimpleTwo[i-2]+arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==r[7]+1&&j==c[8]+1">{{arrSimpleTwo[i-2]+arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==r[8]+1&&j==c[8]+1">{{arrSimpleTwo[i-2]+arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==r[8]+1&&j==c[9]+1">{{arrSimpleTwo[i-2]+arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==r[9]+1&&j==c[9]+1">{{arrSimpleTwo[i-2]+arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==r[9]+1&&j==c[10]+1">{{arrSimpleTwo[i-2]+arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==1&&j!=1"><input :ref="(i*10+j)" v-model="inputNum[i*10+j]" v-on:input="checkNum(i, j, inputNum[i*10+j])" type="text" style='width: 3vw; height: 3vw;background: #e6ffe7;border: 0px' /></b>
                                        <b v-else-if="j==1&&i!=1"><input :ref="(i*10+j)" v-model="inputNum[i*10+j]" v-on:input="checkNum(i, j, inputNum[i*10+j])" type="text" style='width: 3vw; height: 3vw;background: #e6ffe7;border: 0px' /></b>
                                        <b v-else><input :ref="(i*10+j)" v-model="inputNum[i*10+j]" v-on:input="checkNum(i, j, inputNum[i*10+j])" type="text" style='width: 3vw; height: 3vw; border: 0px' /></b>
                                    </td>
                                </tr>
                            </table>
                            <table v-if="selected2==='multiply'" id="tableMul" style="color: #0067d2;text-align: center;visibility: visible; border: #7f8c8d solid;background: white;">
                                <tr v-for="i in selected + 1">
                                    <td v-for="j in selected + 1" :style="
                                      (j == 1 && i != 1)||(i==1&&j!=1)
                                        ? 'width: 3vw; height: 3vw; background: #e6ffe7'
                                        : 'width: 3vw; height: 3vw;'">
                                        <b v-if="i==1&&j==1">x</b>
                                        <b v-else-if="i==1&&j==c[0]+1">{{arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==r[0]+1&&j==c[0]+1">{{arrSimpleTwo[i-2]*arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==r[0]+1&&j==c[1]+1">{{arrSimpleTwo[i-2]*arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==r[1]+1&&j==c[1]+1">{{arrSimpleTwo[i-2]*arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==r[1]+1&&j==c[2]+1">{{arrSimpleTwo[i-2]*arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==r[2]+1&&j==c[2]+1">{{arrSimpleTwo[i-2]*arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==r[2]+1&&j==c[3]+1">{{arrSimpleTwo[i-2]*arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==r[3]+1&&j==c[3]+1">{{arrSimpleTwo[i-2]*arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==r[3]+1&&j==c[4]+1">{{arrSimpleTwo[i-2]*arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==r[4]+1&&j==c[4]+1">{{arrSimpleTwo[i-2]*arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==r[4]+1&&j==c[5]+1">{{arrSimpleTwo[i-2]*arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==r[5]+1&&j==c[5]+1">{{arrSimpleTwo[i-2]*arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==r[5]+1&&j==c[6]+1">{{arrSimpleTwo[i-2]*arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==r[6]+1&&j==c[6]+1">{{arrSimpleTwo[i-2]*arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==r[6]+1&&j==c[7]+1">{{arrSimpleTwo[i-2]*arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==r[7]+1&&j==c[7]+1">{{arrSimpleTwo[i-2]*arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==r[7]+1&&j==c[8]+1">{{arrSimpleTwo[i-2]*arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==r[8]+1&&j==c[8]+1">{{arrSimpleTwo[i-2]*arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==r[8]+1&&j==c[9]+1">{{arrSimpleTwo[i-2]*arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==r[9]+1&&j==c[9]+1">{{arrSimpleTwo[i-2]*arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==r[9]+1&&j==c[10]+1">{{arrSimpleTwo[i-2]*arrSimpleOne[j-2]}}</b>
                                        <b v-else-if="i==1&&j!=1"><input :ref="(i*10+j)" v-model="inputNum[i*10+j]" v-on:input="checkNum(i, j, inputNum[i*10+j])" style='width: 3vw; height: 3vw;background: #e6ffe7;border: 0px' /></b>
                                        <b v-else-if="j==1&&i!=1"><input :ref="(i*10+j)" v-model="inputNum[i*10+j]" v-on:input="checkNum(i, j, inputNum[i*10+j])" style='width: 3vw; height: 3vw;background: #e6ffe7;border: 0px' /></b>
                                        <b v-else><input :ref="(i*10+j)" v-model="inputNum[i*10+j]" v-on:input="checkNum(i, j, inputNum[i*10+j])" style='width: 3vw; height: 3vw; border: 0px' /></b>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <!-- Right part -->
                    <div class="col-12 col-md-6 app--lesson-right" ref="qqq" style="padding-left: 200px; overflow: visible; max-width: 30%">
                        <div>
                            <div style="font-size: 1vw;color: #0f0f0f;position: relative">
                                <h5>Choose the difficulty level</h5>
                                <select id="select1" style="width:10vw; font-size: 1.5vw" v-model="selected1" v-on:change="generateTable()">
                                    <option v-for="s1 in options1" v-bind:value="s1.value">
                                        {{ s1.text }}
                                    </option>
                                </select>
                                <br /><br />
                                <h5>Choose the operation</h5>
                                <select id="select2" style="width:10vw;font-size: 1.5vw" v-model="selected2" v-on:change="generateTable()">
                                    <option v-for="s2 in options2" v-bind:value="s2.value">
                                        {{ s2.text }}
                                    </option>
                                </select>
                                <br />
                                <br />
                                <br />
                                <br />
                                <button v-if="resetNow === false" v-on:click="check()" id="ok" class="btn btn-outline-success" style="margin: auto">
                                    Check
                                </button>
                                <button v-if="resetNow === true" v-on:click="reset()" id="rs" class="btn btn-outline-success" style="margin: auto">
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                tbl_rows: 2,
                tbl_columns: 2,
                selected: "",
                selected1: "",
                selected2: "",
                alertMessage: "",
                startTime: "",
                resetNow: false,
                isAlert: false,
                cur: [],
                inputNum: [],
                options: [{
                    text: "2 by 2",
                    value: 2
                },
                    {
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
                    {
                        text: "6 by 6",
                        value: 6
                    },
                    {
                        text: "7 by 7",
                        value: 7
                    },
                    {
                        text: "8 by 8",
                        value: 8
                    },
                    {
                        text: "9 by 9",
                        value: 9
                    },
                    {
                        text: "10 by 10",
                        value: 10
                    }
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
                        text: "Expert",
                        value: "expert"
                    }
                ],
                options2: [{
                    text: "Addition",
                    value: "add"
                },
                    {
                        text: "Multiplication",
                        value: "multiply"
                    }
                ],
                arrSimpleOne: [],
                arrSimpleTwo: [],
                randomTable: [],
                r: [],
                c: [],
                crtNum: 0,
                checkRow: [],
                checkCol: [],
                checkVal: [],
                correctNum: [],
            };
        },
        created() {
            this.selected = this.options[0].value;
            this.selected1 = this.options1[0].value;
            this.selected2 = this.options2[0].value;
        },
        mounted: function() {
            this.start();
        },
        methods: {
            start() {
                document
                    .getElementById("tableAdd")
                    .rows[0].cells[0].setAttribute("style", "width: 3vw; height: 3vw; background: #ffeaa5");

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
                this.r = [];
                this.c = [];

                for (let s = 0; s < i; s++) {
                    this.r.push(s + 1);
                    this.c.push(s + 1);

                }
                this.r.sort(this.randomsort);
                this.c.sort(this.randomsort);
                if (this.selected1 === "l1") {
                    if (this.selected2 === "add") {
                        for (var m = 0; m < i; m++) {
                            var random = Math.floor(Math.random() * 10) + 1;
                            var random2 = Math.floor(Math.random() * 10) + 1;
                            this.arrSimpleOne.push(random);
                            this.arrSimpleTwo.push(random2);
                        }

                    } else {
                        for (m = 0; m < i; m++) {
                            random = Math.floor(Math.random() * 5) + 1;
                            random2 = Math.floor(Math.random() * 5) + 1;
                            this.arrSimpleOne.push(random);
                            this.arrSimpleTwo.push(random2);
                        }
                    }
                } else if (this.selected1 === "l2") {
                    if (this.selected2 === "add") {
                        for (m = 0; m < i; m++) {
                            random = Math.floor(Math.random() * 100) + 1;
                            random2 = Math.floor(Math.random() * 100) + 1;
                            this.arrSimpleOne.push(random);
                            this.arrSimpleTwo.push(random2);
                        }
                    } else {
                        for (m = 0; m < i; m++) {
                            random = Math.floor(Math.random() * 10) + 1;
                            random2 = Math.floor(Math.random() * 10) + 1;
                            this.arrSimpleOne.push(random);
                            this.arrSimpleTwo.push(random2);
                        }
                    }
                } else if (this.selected1 === "expert") {
                    if (this.selected2 === "add") {
                        for (m = 0; m < i; m++) {
                            random = Math.floor(Math.random() * 100) - 50;
                            random2 = Math.floor(Math.random() * 100) - 50;
                            this.arrSimpleOne.push(random);
                            this.arrSimpleTwo.push(random2);
                        }
                    } else {
                        for (m = 0; m < i; m++) {
                            random = Math.floor(Math.random() * 12) - 5;
                            random2 = Math.floor(Math.random() * 12) - 5;
                            if (random === 0) random++;
                            if (random2 === 0) random2++;
                            this.arrSimpleOne.push(random);
                            this.arrSimpleTwo.push(random2);
                        }
                    }
                }
            },
            check: function() {
                this.correctNum = [];
                this.alertMessage = "";
                this.isAlert = false;
                if (this.selected2 === "add") {
                    for (var i = 0; i < this.checkVal.length; i++) {
                        var index = this.checkRow[i] * 10 + this.checkCol[i];
                        if (this.checkRow[i] === 1) {
                            if (this.checkVal[i] === (this.arrSimpleOne[this.checkCol[i] - 2])) {
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
                            if (this.checkVal[i] === (this.arrSimpleTwo[this.checkRow[i] - 2])) {
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
                            if (this.checkVal[i] === ((this.arrSimpleOne[this.checkCol[i] - 2]) + (this.arrSimpleTwo[this.checkRow[i] - 2]))) {
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
                            var end = new Date().getTime();
                            var secDuration = Math.round((end - this.startTime) / 1000);
                            this.isAlert = true;
                            this.alertMessage = "All entries are correct. Completion time: "+ secDuration +" seconds";
                            this.resetNow = true;
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


                }

                if (this.selected2 === "multiply") {
                    l = this.selected * this.selected;
                    for (i = 0; i < this.checkVal.length; i++) {
                        index = this.checkRow[i] * 10 + this.checkCol[i];
                        if (this.checkRow[i] === 1) {
                            if (this.checkVal[i] === (this.arrSimpleOne[this.checkCol[i] - 2])) {
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
                            if (this.checkVal[i] === (this.arrSimpleTwo[this.checkRow[i] - 2])) {
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
                            if (this.checkVal[i] === ((this.arrSimpleOne[this.checkCol[i] - 2]) * (this.arrSimpleTwo[this.checkRow[i] - 2]))) {
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
                    l = this.selected * this.selected;
                    var countA = 0;
                    if (this.correctNum.length === l) {

                        for (let a = 0; a < this.correctNum.length; a++) {
                            if (this.correctNum[a] === "g") {
                                countA++;
                            }
                        }
                        if (countA === l) {
                            let end = new Date().getTime();
                            let secDuration = Math.round((end - this.startTime) / 1000);
                            this.alertMessage = "All entries are correct. Completion time: "+ secDuration +" seconds";
                            this.resetNow = true;
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
                            this.alertMessage = "All entries correct";
                        }
                    }
                }


            },
            checkNum: function(r, c, num) {
                if (this.startTime === "") {
                    this.startTime = new Date().getTime();
                }
                if (num == "") {
                    return;
                } else {
                    for (var i = 0; i < this.checkRow.length; i++) {

                        if (this.checkRow[i] == r && this.checkCol[i] == c) {
                            let index = r * 10 + c;
                            this.$refs[index][0].classList.remove("red");
                            this.$refs[index][0].classList.remove("g");
                            this.checkVal[i] = parseInt(num);
                            return;
                        }
                    }
                    this.checkRow.push(r);
                    this.checkCol.push(c);
                    this.checkVal.push(parseInt(num));
                }


            },
            reset: function() {
                this.alertMessage = "";
                for (var i = 0; i < this.checkRow.length; i++) {
                    let index = this.checkRow[i] * 10 + this.checkCol[i];
                    this.$refs[index][0].classList.remove("red");
                    this.$refs[index][0].classList.remove("g");
                }
                this.generateTable();
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
        padding: 0px;
        width: 3vw;
        height: 3vw;
        font-size: 24px;
    }

    input {
        text-align: center;
    }
</style>