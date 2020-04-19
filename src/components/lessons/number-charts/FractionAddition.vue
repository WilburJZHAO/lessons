<template>
    <div>
        <transition appear appear-class="app-appear" appear-active-class="app-appear-active">
            <div class="container mt-4 mb5">
                <h3 class="lesson-subheading">Fraction addition</h3>
                <hr class="subheading-separator">
                <div class="row" style="max-width: 100%">
                    <!-- Left part -->
                    <div class="col-12 col-md-6 app--lesson-left" style="max-width: 50%">
                        <div style="text-align: left;max-width: 70%">
                            <h3>Choose the grid size</h3><br>
                            <select id="gridSize" style="width:10vw;font-size: 1.5vw" v-model="selected" v-on:change="generateTable()">
                                <option v-for="option in options" v-bind:value="option.value">
                                    {{ option.text }}
                                </option>
                            </select><br><br>
                            <h5>Complete the fraction addition grid(0 to 99)</h5><br>
                            <div v-if="alertMessage" :class="isAlert?'alert alert-success':'alert alert-danger'">
                                {{ alertMessage }}
                            </div>

                            <table id="tableAdd"  style="color: #004488; text-align: center; align-items: center; visibility: visible; border: #7f8c8d solid;background: white;">
                                <tr v-for="i in selected + 1">
                                    <td v-for="j in selected + 1" :style="
                                      (j == 1 && i != 1)||(i==1&&j!=1)
                                        ? 'width: 4vw; height: 4vw; background: rgba(165, 220, 255, 1);'
                                        : 'width: 4vw; height: 4vw;'">
                                        <b v-if="i==1&&j==1"><span style="color: black; font-size: 3rem">+</span></b>

                                        <b v-else-if="i==1&&j==c[0]+1">
                                            <div style='border-bottom: #0f0f0f solid;margin: 0 auto;width: 3.5vw; height: 3.5vw;'>{{arrSimpleThree[j-2]}}</div>
                                            <div style='border-top: #0f0f0f solid;margin: 0 auto;width: 3.5vw; height: 3.5vw; '>{{arrSimpleOne[j-2]}}</div>
                                        </b>
                                        <b v-else-if="i==r[0]+1&&j==c[0]+1">
                                            <div style='border-bottom: #0f0f0f solid;margin: 0 auto;width: 3.5vw; height: 3.5vw;'> {{purify(arrSimpleOne[j-2]*arrSimpleTwo[i-2], arrSimpleOne[j-2]*arrSimpleFour[i-2]+arrSimpleTwo[i-2]*arrSimpleThree[j-2])[0][0]}}</div>
                                            <div style='border-top: #0f0f0f solid;margin: 0 auto;width: 3.5vw; height: 3.5vw;'>{{purify(arrSimpleOne[j-2]*arrSimpleTwo[i-2], arrSimpleOne[j-2]*arrSimpleFour[i-2]+arrSimpleTwo[i-2]*arrSimpleThree[j-2])[0][1]}}</div>
                                        </b>
                                        <b v-else-if="i==r[0]+1&&j==c[1]+1">
                                            <div style='border-bottom: #0f0f0f solid;margin: 0 auto;width: 3.5vw; height: 3.5vw;'> {{purify(arrSimpleOne[j-2]*arrSimpleTwo[i-2], arrSimpleOne[j-2]*arrSimpleFour[i-2]+arrSimpleTwo[i-2]*arrSimpleThree[j-2])[0][0]}}</div>
                                            <div style='border-top: #0f0f0f solid;margin: 0 auto;width: 3.5vw; height: 3.5vw;'>{{purify(arrSimpleOne[j-2]*arrSimpleTwo[i-2], arrSimpleOne[j-2]*arrSimpleFour[i-2]+arrSimpleTwo[i-2]*arrSimpleThree[j-2])[0][1]}}</div>
                                        </b>
                                        <b v-else-if="i==r[1]+1&&j==c[1]+1">
                                            <div style='border-bottom: #0f0f0f solid;margin: 0 auto;width: 3.5vw; height: 3.5vw;'> {{purify(arrSimpleOne[j-2]*arrSimpleTwo[i-2], arrSimpleOne[j-2]*arrSimpleFour[i-2]+arrSimpleTwo[i-2]*arrSimpleThree[j-2])[0][0]}}</div>
                                            <div style='border-top: #0f0f0f solid;margin: 0 auto;width: 3.5vw; height: 3.5vw;'>{{purify(arrSimpleOne[j-2]*arrSimpleTwo[i-2], arrSimpleOne[j-2]*arrSimpleFour[i-2]+arrSimpleTwo[i-2]*arrSimpleThree[j-2])[0][1]}}</div>
                                        </b>
                                        <b v-else-if="i==r[1]+1&&j==c[2]+1">
                                            <div style='border-bottom: #0f0f0f solid;margin: 0 auto;width: 3.5vw; height: 3.5vw;'> {{purify(arrSimpleOne[j-2]*arrSimpleTwo[i-2], arrSimpleOne[j-2]*arrSimpleFour[i-2]+arrSimpleTwo[i-2]*arrSimpleThree[j-2])[0][0]}}</div>
                                            <div style='border-top: #0f0f0f solid;margin: 0 auto;width: 3.5vw; height: 3.5vw;'>{{purify(arrSimpleOne[j-2]*arrSimpleTwo[i-2], arrSimpleOne[j-2]*arrSimpleFour[i-2]+arrSimpleTwo[i-2]*arrSimpleThree[j-2])[0][1]}}</div>
                                        </b>
                                        <b v-else-if="i==r[2]+1&&j==c[2]+1">
                                            <div style='border-bottom: #0f0f0f solid;margin: 0 auto;width: 3.5vw; height: 3.5vw;'> {{purify(arrSimpleOne[j-2]*arrSimpleTwo[i-2], arrSimpleOne[j-2]*arrSimpleFour[i-2]+arrSimpleTwo[i-2]*arrSimpleThree[j-2])[0][0]}}</div>
                                            <div style='border-top: #0f0f0f solid;margin: 0 auto;width: 3.5vw; height: 3.5vw;'>{{purify(arrSimpleOne[j-2]*arrSimpleTwo[i-2], arrSimpleOne[j-2]*arrSimpleFour[i-2]+arrSimpleTwo[i-2]*arrSimpleThree[j-2])[0][1]}}</div>
                                        </b>
                                        <b v-else-if="i==r[2]+1&&j==c[3]+1">
                                            <div style='border-bottom: #0f0f0f solid;margin: 0 auto;width: 3.5vw; height: 3.5vw;'> {{purify(arrSimpleOne[j-2]*arrSimpleTwo[i-2], arrSimpleOne[j-2]*arrSimpleFour[i-2]+arrSimpleTwo[i-2]*arrSimpleThree[j-2])[0][0]}}</div>
                                            <div style='border-top: #0f0f0f solid;margin: 0 auto;width: 3.5vw; height: 3.5vw;'>{{purify(arrSimpleOne[j-2]*arrSimpleTwo[i-2], arrSimpleOne[j-2]*arrSimpleFour[i-2]+arrSimpleTwo[i-2]*arrSimpleThree[j-2])[0][1]}}</div>
                                        </b>
                                        <b v-else-if="i==r[3]+1&&j==c[3]+1">
                                            <div style='border-bottom: #0f0f0f solid;margin: 0 auto;width: 3.5vw; height: 3.5vw;'> {{purify(arrSimpleOne[j-2]*arrSimpleTwo[i-2], arrSimpleOne[j-2]*arrSimpleFour[i-2]+arrSimpleTwo[i-2]*arrSimpleThree[j-2])[0][0]}}</div>
                                            <div style='border-top: #0f0f0f solid;margin: 0 auto;width: 3.5vw; height: 3.5vw;'>{{purify(arrSimpleOne[j-2]*arrSimpleTwo[i-2], arrSimpleOne[j-2]*arrSimpleFour[i-2]+arrSimpleTwo[i-2]*arrSimpleThree[j-2])[0][1]}}</div>
                                        </b>
                                        <b v-else-if="i==r[3]+1&&j==c[4]+1">
                                            <div style='border-bottom: #0f0f0f solid;margin: 0 auto;width: 3.5vw; height: 3.5vw;'> {{purify(arrSimpleOne[j-2]*arrSimpleTwo[i-2], arrSimpleOne[j-2]*arrSimpleFour[i-2]+arrSimpleTwo[i-2]*arrSimpleThree[j-2])[0][0]}}</div>
                                            <div style='border-top: #0f0f0f solid;margin: 0 auto;width: 3.5vw; height: 3.5vw;'>{{purify(arrSimpleOne[j-2]*arrSimpleTwo[i-2], arrSimpleOne[j-2]*arrSimpleFour[i-2]+arrSimpleTwo[i-2]*arrSimpleThree[j-2])[0][1]}}</div>
                                        </b>
                                        <b v-else-if="i==r[4]+1&&j==c[4]+1">
                                            <div style='border-bottom: #0f0f0f solid;margin: 0 auto;width: 3.5vw; height: 3.5vw;'> {{purify(arrSimpleOne[j-2]*arrSimpleTwo[i-2], arrSimpleOne[j-2]*arrSimpleFour[i-2]+arrSimpleTwo[i-2]*arrSimpleThree[j-2])[0][0]}}</div>
                                            <div style='border-top: #0f0f0f solid;margin: 0 auto;width: 3.5vw; height: 3.5vw;'>{{purify(arrSimpleOne[j-2]*arrSimpleTwo[i-2], arrSimpleOne[j-2]*arrSimpleFour[i-2]+arrSimpleTwo[i-2]*arrSimpleThree[j-2])[0][1]}}</div>
                                        </b>
                                        <b v-else-if="i==1&&j!=1">
                                            <div style='border-bottom: #0f0f0f solid;margin: 0 auto;width: 3.5vw; height:3.5vw; border-top: #0f0f0f 1px solid; border-left:#0f0f0f 1px solid; border-right: #0f0f0f 1px solid; '>
                                            <input :ref="(i*100+j*10+1)" v-model="inputNum[i*100+j*10+1]" v-on:input="checkNum((i*100+j*10+1), inputNum[i*100+j*10+1])" type="text" style='width: 3.5vw; height: 3.5vw;border: 1px' />
                                            </div>
                                            <div style='border-top: #0f0f0f solid;margin: 0 auto;width: 3.5vw;height:3.5vw; border-bottom: #0f0f0f 1px solid; border-left:#0f0f0f 1px solid; border-right: #0f0f0f 1px solid;'>
                                                <input :ref="(i*100+j*10+2)" v-model="inputNum[i*100+j*10+2]" v-on:input="checkNum((i*100+j*10+2), inputNum[i*100+j*10+2])" type="text" style='width: 3.5vw; height: 3.5vw;border: 1px' />
                                            </div>
                                        </b>
                                        <b v-else-if="j==1&&i!=1">
                                            <div style='border-bottom: #0f0f0f solid;margin: 0 auto;width: 3.5vw;height:3.5vw;border-top: #0f0f0f 1px solid; border-left:#0f0f0f 1px solid; border-right: #0f0f0f 1px solid;'>
                                            <input :ref="(i*100+j*10+1)" v-model="inputNum[i*100+j*10+1]" v-on:input="checkNum((i*100+j*10+1), inputNum[i*100+j*10+1])" type="text" style='width: 3.5vw; height: 3.5vw;border: 1px' />
                                            </div>
                                            <div style='border-top: #0f0f0f solid;margin: 0 auto;width: 3.5vw;height:3.5vw;border-bottom: #0f0f0f 1px solid; border-left:#0f0f0f 1px solid; border-right: #0f0f0f 1px solid;'>
                                                <input :ref="(i*100+j*10+2)" v-model="inputNum[i*100+j*10+2]" v-on:input="checkNum((i*100+j*10+2), inputNum[i*100+j*10+2])" type="text" style='width: 3.5vw; height: 3.5vw;border: 1px' />
                                            </div>
                                        </b>
                                        <b v-else>
                                            <div style='border-bottom: #0f0f0f solid;margin: 0 auto;width: 3.5vw;height:3.5vw; border-top: #0f0f0f 1px solid; border-left:#0f0f0f 1px solid; border-right: #0f0f0f 1px solid;'>
                                            <input :ref="(i*100+j*10+1)" v-model="inputNum[i*100+j*10+1]" v-on:input="checkNum((i*100+j*10+1), inputNum[i*100+j*10+1])" type="text"  />
                                            </div>
                                            <div style='border-top: #0f0f0f solid;margin: 0 auto;width: 3.5vw;height:3.5vw; border-bottom: #0f0f0f 1px solid; border-left: #0f0f0f 1px solid; border-right: #0f0f0f 1px solid;'>
                                                <input :ref="(i*100+j*10+2)" v-model="inputNum[i*100+j*10+2]" v-on:input="checkNum((i*100+j*10+2), inputNum[i*100+j*10+2])" type="text" />
                                            </div>
                                        </b>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <!-- Right part -->
                    <div class="col-12 col-md-6 app--lesson-right" ref="qqq" style="padding-left: 200px; overflow: visible; max-width: 50%">
                        <div class="tt-right-box"></div>
                        <div>
                            <div style="font-size: 1vw;color: #0f0f0f;position: relative">
                                <h5>Choose the difficulty level</h5>
                                <select id="select1" style="width:10vw; font-size: 1.5vw" v-model="selected1" v-on:change="generateTable()">
                                    <option v-for="s1 in options1" v-bind:value="s1.value">
                                        {{ s1.text }}
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
                startTime: "",
                alertMessage: "",
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

                arrSimpleOne: [],
                arrSimpleTwo: [],
                arrSimpleThree: [],
                arrSimpleFour: [],
                randomTable: [],
                r: [],
                c: [],
                crtNum: 0,
                checkNume: [],
                checkDemo: [],
                checkValNume: [],
                checkValDemo: [],
                correctNum: [],
            };
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
                    .rows[0].cells[0].setAttribute("style", "width: 4vw; height: 4vw; background: #ffeaa5");

                this.generateTable();
            },
            randomsort() {
                return Math.random() > .5 ? -1 : 1;
            },
            generateTable: function() {
                for (let i = 0; i < this.checkDemo.length; i++) {
                    let indexDemo = this.checkDemo[i];
                    let indexNume = indexDemo-1;
                    this.$refs[indexDemo][0].classList.remove("red");
                    this.$refs[indexDemo][0].classList.remove("g");
                    this.$refs[indexNume][0].classList.remove("red");
                    this.$refs[indexNume][0].classList.remove("g");
                }
                this.startTime = "";
                var easy= [2,3,4,5,5,2,3,4];
                var dif= [2,3,4,5,6,7,8,7,6,5];
                var expert= [3,4,5,6,7,8,9,8,7,6,5,2,7,8];
                easy.sort(this.randomsort);
                dif.sort(this.randomsort);
                expert.sort(this.randomsort);
                this.checkValDemo = [];
                this.checkValNume = [];
                this.checkDemo = [];
                this.checkNume = [];
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
                    for(var m=0;m<i;m++){
                        var random = easy.pop();
                        var random2 = easy.pop();
                        var random3 = Math.floor(Math.random()*random/2)+1;
                        var random4 = Math.floor(Math.random()*random2/2)+1;
                        this.arrSimpleOne.push(random);
                        this.arrSimpleTwo.push(random2);
                        this.arrSimpleThree.push(random3);
                        this.arrSimpleFour.push(random4);
                    }
                } else if (this.selected1 === "l2") {
                    for(m=0;m<i;m++){
                        random = dif.pop();
                        random2 = dif.pop();
                        random3 = Math.floor(Math.random()*random/2)+1;
                        random4 = Math.floor(Math.random()*random2/2)+1;
                        this.arrSimpleOne.push(random);
                        this.arrSimpleTwo.push(random2);
                        this.arrSimpleThree.push(random3);
                        this.arrSimpleFour.push(random4);
                    }
                } else if (this.selected1 === "expert") {
                    for(m=0;m<i;m++){
                        random = expert.pop();
                        random2 = expert.pop();
                        random3 = Math.floor(Math.random()*random/2)+1;
                        random4 = Math.floor(Math.random()*random2/2)+1;
                        this.arrSimpleOne.push(random);
                        this.arrSimpleTwo.push(random2);
                        this.arrSimpleThree.push(random3);
                        this.arrSimpleFour.push(random4);
                    }
                }

            },
            purify: function(mother ,son) {

                var x, y;
                var temp = [];
                var j = 2;
                mother = mother *100;
                son = son*100;
                while (j <= son && j <= mother) {
                    x = son / j;
                    y = mother / j;
                    ++j;
                    if ((x + '').indexOf('.') === -1 && (y + '').indexOf('.') === -1) {
                        son = x;
                        mother = y;
                        j = 2;
                    }
                }
                temp.push([son, mother]);
                return temp;
            },
            check: function() {
                this.correctNum = [];
                this.alertMessage = "";
                this.isAlert = false;
                    for (var i = 0; i < this.checkValDemo.length; i++) {
                        var indexDemo = this.checkDemo[i];
                        var indexNume = this.checkNume[i];
                        var r=Math.floor(indexDemo/100);
                        var c=Math.floor(indexDemo/10)-r*10;
                        if (r === 1) {

                            let result=this.purify(this.arrSimpleOne[c - 2], this.arrSimpleThree[c - 2]);
                            if (this.checkValDemo[i] === result[0][1]&&this.checkValNume[i] === result[0][0]) {
                                if (this.$refs[indexDemo][0].classList.value === "red" && this.$refs[indexNume][0].classList.value === "red") {
                                    this.$refs[indexDemo][0].classList.replace("red", "g");
                                    this.$refs[indexNume][0].classList.replace("red", "g");
                                } else {
                                    this.$refs[indexDemo][0].classList.add("g");
                                    this.$refs[indexNume][0].classList.add("g");
                                }
                                this.correctNum[i] = "g";

                            } else {
                                if (this.$refs[indexDemo][0].classList.value === "g" && this.$refs[indexNume][0].classList.value === "g") {
                                    this.$refs[indexDemo][0].classList.replace("g", "red");
                                    this.$refs[indexNume][0].classList.replace("g", "red");
                                } else {
                                    this.$refs[indexDemo][0].classList.add("red");
                                    this.$refs[indexNume][0].classList.add("red");
                                }
                                this.correctNum[i] = "red";
                            }
                        } else if (c === 1) {
                            let result=this.purify(this.arrSimpleTwo[r - 2], this.arrSimpleFour[r - 2]);
                            if (this.checkValDemo[i] === result[0][1]&&this.checkValNume[i] === result[0][0]) {
                                if (this.$refs[indexDemo][0].classList.value === "red" && this.$refs[indexNume][0].classList.value === "red") {
                                    this.$refs[indexDemo][0].classList.replace("red", "g");
                                    this.$refs[indexNume][0].classList.replace("red", "g");
                                } else {
                                    this.$refs[indexDemo][0].classList.add("g");
                                    this.$refs[indexNume][0].classList.add("g");
                                }
                                this.correctNum[i] = "g";

                            } else {
                                if (this.$refs[indexDemo][0].classList.value === "g" && this.$refs[indexNume][0].classList.value === "g") {
                                    this.$refs[indexDemo][0].classList.replace("g", "red");
                                    this.$refs[indexNume][0].classList.replace("g", "red");
                                } else {
                                    this.$refs[indexDemo][0].classList.add("red");
                                    this.$refs[indexNume][0].classList.add("red");
                                }
                                this.correctNum[i] = "red";
                            }
                        } else {
                            let result=this.purify(this.arrSimpleOne[c-2]*this.arrSimpleTwo[r-2], this.arrSimpleOne[c-2]*this.arrSimpleFour[r-2]+this.arrSimpleTwo[r-2]*this.arrSimpleThree[c-2]);
                            if (this.checkValDemo[i] === result[0][1] && this.checkValNume[i] === result[0][0]) {
                                if (this.$refs[indexDemo][0].classList.value === "red" && this.$refs[indexNume][0].classList.value === "red") {
                                    this.$refs[indexDemo][0].classList.replace("red", "g");
                                    this.$refs[indexNume][0].classList.replace("red", "g");
                                } else {
                                    this.$refs[indexDemo][0].classList.add("g");
                                    this.$refs[indexNume][0].classList.add("g");
                                }
                                this.correctNum[i] = "g";

                            } else {
                                if (this.$refs[indexDemo][0].classList.value === "g" && this.$refs[indexNume][0].classList.value === "g") {
                                    this.$refs[indexDemo][0].classList.replace("g", "red");
                                    this.$refs[indexNume][0].classList.replace("g", "red");
                                } else {
                                    this.$refs[indexDemo][0].classList.add("red");
                                    this.$refs[indexNume][0].classList.add("red");
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
            },
            checkNum: function(r, num) {
                if (this.startTime === "") {
                    this.startTime = new Date().getTime();
                }
                if (num === "") {
                    return;
                } else {
                    if(r-Math.floor(r/10)*10===1){
                        for (let i = 0; i < this.checkNume.length; i++) {

                            if (this.checkNume[i] === r) {
                                let y=r+1;
                                this.$refs[r][0].classList.remove("red");
                                this.$refs[r][0].classList.remove("g");
                                this.$refs[y][0].classList.remove("red");
                                this.$refs[y][0].classList.remove("g");
                                this.checkValNume[i] = parseInt(num);
                                return;
                            }
                        }
                        this.checkNume.push(r);
                        this.checkValNume.push(parseInt(num));
                    }
                    if(r-Math.floor(r/10)*10===2){
                        for (let i = 0; i < this.checkDemo.length; i++) {

                            if (this.checkDemo[i] === r) {
                                let y=r-1;
                                this.$refs[r][0].classList.remove("red");
                                this.$refs[r][0].classList.remove("g");
                                this.$refs[y][0].classList.remove("red");
                                this.$refs[y][0].classList.remove("g");
                                this.checkValDemo[i] = parseInt(num);
                                return;
                            }
                        }
                        this.checkDemo.push(r);
                        this.checkValDemo.push(parseInt(num));
                    }

                }


            },
            reset: function() {
                this.alertMessage = "";
                for (var i = 0; i < this.checkDemo.length; i++) {
                    let indexDemo = this.checkDemo[i];
                    let indexNume=indexDemo-1;
                    this.$refs[indexDemo][0].classList.remove("red");
                    this.$refs[indexDemo][0].classList.remove("g");
                    this.$refs[indexNume][0].classList.remove("red");
                    this.$refs[indexNume][0].classList.remove("g");
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
        width: 8vw;
        height: 8vw;
        padding: 1vw;
        overflow:hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
        font-size: 24px;
    }
    b div{
        text-align: center;
        line-height: 3.5vw;
    }

    input {
        padding: 0px;
        border: white;
        background: transparent;
        text-align: center;
        font-size: 24px;
        width: 3.5vw;
        height: 3.5vw;
    }
</style>