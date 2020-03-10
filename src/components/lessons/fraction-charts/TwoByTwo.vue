<template>
    <div>
        <transition appear appear-class="app-appear" appear-active-class="app-appear-active">
            <div class="container mt-4 mb5" style="max-width: 100%">
                <div class="row" style="max-width: 100%; padding-left: 8%;">
                    <!-- Left part -->
                    <div class="col-12 col-md-6 app--lesson-left" style="max-width: 50%">
                        <div style="text-align: left;max-width: 70%">
                            <h3>Complete the fraction chart</h3><br>
                            <br>
                            <div v-if="alertMessage" :class="isAlert?'alert alert-success':'alert alert-danger'">
                                {{ alertMessage }}
                            </div>

                            <table id="tableAdd" class="col-lg-12 col-md-10 col-sm-6" style="color: #0067d2;text-align: center; align-items: center; visibility: visible; border: #7f8c8d solid;background: white;">
                                <tr v-for="i in selected + 1">
                                    <td v-for="j in selected + 1" :style="
                                      (j === 1 && i !== 1)||(i===1&&j!==1)
                                        ? 'width: 8vw; height: 8vw; background: #e6ffe7;'
                                        : 'width: 8vw; height: 8vw;'">
                                        <b v-if="i===1&&j===1">of</b>

                                        <b v-else-if="(i===1&&j===c[0]+1) && randomIndex ==='r' ">
                                            {{arrSimpleThree[j-2]}}
                                        </b>
                                        <b v-else-if="(j===1&&i===r[0]+1) && randomIndex ==='c'">
                                            <div style='border-bottom: #0f0f0f solid;margin: 0 auto;width: 3.5vw; height: 3.5vw; '>{{arrSimpleTwo[i - 2]}}</div>
                                            <div style='border-top: #0f0f0f solid;margin: 0 auto;width: 3.5vw; height: 3.5vw; '>{{root[i - 2]}}</div>
                                        </b>
                                        <b v-else-if="i===r[0]+1&&j===c[0]+1 && h">
                                            {{arrSimpleThree[j-2]/root[i-2]*arrSimpleTwo[i-2]}}
                                        </b>
                                        <b v-else-if="i===r[0]+1&&j===c[1]+1 && h">
                                            {{arrSimpleThree[j-2]/root[i-2]*arrSimpleTwo[i-2]}}
                                        </b>
                                        <b v-else-if="i===r[1]+1&&j===c[1]+1 && h">
                                            {{arrSimpleThree[j-2]/root[i-2]*arrSimpleTwo[i-2]}}
                                        </b>
                                        <b v-else-if="i===r[1]+1&&j===c[2]+1 && h">
                                            {{arrSimpleThree[j-2]/root[i-2]*arrSimpleTwo[i-2]}}
                                        </b>
                                        <b v-else-if="i===1&&j!==1">
                                            <input :ref="(i*10+j)" v-model="inputNum[i*10+j]" v-on:input="checkNum((i*10+j), inputNum[i*10+j])" type="text" style='width: 4vw; height: 4vw;border: 0px' />
                                        </b>
                                        <b v-else-if="j===1&&i!==1">
                                            <div style='border-bottom: #0f0f0f solid;margin: 0 auto;width: 3.5vw;height:3.5vw;border-top: #0f0f0f 1px solid; border-left:#0f0f0f 1px solid; border-right: #0f0f0f 1px solid;'>
                                            <input :ref="(i*100+j*10+1)" v-model="inputNum[i*100+j*10+1]" v-on:input="checkNum((i*100+j*10+1), inputNum[i*100+j*10+1])" type="text" style='width: 3.5vw; height: 3.5vw;border: 0px' />
                                            </div>
                                            <div style='border-top: #0f0f0f solid;margin: 0 auto;width: 3.5vw;height:3.5vw;border-bottom: #0f0f0f 1px solid; border-left:#0f0f0f 1px solid; border-right: #0f0f0f 1px solid;'>
                                                <input :ref="(i*100+j*10+2)" v-model="inputNum[i*100+j*10+2]" v-on:input="checkNum((i*100+j*10+2), inputNum[i*100+j*10+2])" type="text" style='width: 3.5vw; height: 3.5vw;border: 0px' />
                                            </div>
                                        </b>
                                        <b v-else>
                                            <input :ref="(i*10+j)" v-model="inputNum[i*10+j]" v-on:input="checkNum((i*10+j), inputNum[i*10+j])" type="text" style='width: 4vw; height: 4vw;border: 0px;' />
                                        </b>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <!-- Right part -->
                    <div class="col-12 col-md-6 app--lesson-right" ref="qqq" style="padding-left: 10px;overflow: visible; max-width: 50%">

                        <div><br><br>
                            <div style="font-size: 1vw;color: #0f0f0f;position: relative">
                                <br />
                                <button v-if="resetNow === false && h" v-on:click="check()" id="ok" class="btn btn-outline-success" style="margin: auto">
                                    Check
                                </button>
                                <button v-if="resetNow === true && h" v-on:click="reset()" id="rs" class="btn btn-outline-success" style="margin: auto">
                                    Reset
                                </button>
                                <br /><br />
                                <button id="checkedBox" class="btn btn-outline-success" v-on:click="generateList()" style="margin: auto; width: 150px">
                                    Change fractions
                                </button>
                            </div>
                            <br><br>
                            <div style="width: auto" :style="{visibility: isChecked ? 'visible': 'hidden'}">
                                <div id="checkedDiv"  style="background-color: aliceblue">
                                    <p style="font-size: 2vw;color: #0f0f0f;margin-left: 0;text-align: left">1 is ...</p>
                                    <div class="row table" style="margin-left: 0;">
                                        <table class="ckboxTable">
                                            <tr v-for="i in 4">
                                                <td v-for="j in 4"><div :style="{visibility: ((i!==4||j<=2)&& isChecked === true) ? 'visible':'hidden'}"><label><input :ref="ckboxValue[4*(i-1)+(j-1)]" type="checkbox" :checked="i===1&&j<4"> {{ckboxValue[4*(i-1)+(j-1)]}}  {{ckboxWord[4*(i-1)+(j-1)]}}  </label></div></td>
                                            </tr>
                                        </table>
                                        <button id="checkedBoxGenerate" class="btn btn-outline-success" v-on:click="generateTable()" style="margin: auto">OK</button>
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
    export default {
        data: function() {
            return {
                tbl_rows: 2,
                tbl_columns: 2,
                selected: "",
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
                ],
                arrSimpleOne: [],
                arrSimpleTwo: [],
                arrSimpleThree: [],
                root: [],
                randomTable: [],
                r: [],
                c: [],
                crtNum: 0,
                checkNume: [],
                checkDemo: [],
                checkValNume: [],
                checkV: [],
                checkR: [],
                checkValDemo: [],
                correctNum: [],
                randomIndex: "",
                ckboxValue: [2,3,4,5,6,7,8,9,10,12,15,16,18,20],
                ckboxWord: ['halves', 'thirds', 'quarters', 'fifths', 'sixths', 'sevenths', 'eighths', 'ninths', 'tenths', 'twelfths', 'fifteenths', 'sixteenths', 'eighteenths', 'twentieths'],
                isChecked: false,
                h: true,
            };
        },
        created() {
            this.selected = this.options[0].value;
        },
        mounted: function() {
            this.start();
        },
        methods: {
            start() {
                document
                    .getElementById("tableAdd")
                    .rows[0].cells[0].setAttribute("style", "width: 8vw; height: 8vw; background: #ffeaa5");

                this.generateTable();
            },
            randomsort() {
                return Math.random() > .5 ? -1 : 1;
            },
            generateTable: function() {
                for (let i = 0; i < this.checkV.length; i++) {
                    let indexDemo = this.checkR[i];
                    this.$refs[indexDemo][0].classList.remove("red");
                    this.$refs[indexDemo][0].classList.remove("g");
                }
                for (let i = 0; i < this.checkDemo.length; i++) {
                    let indexDemo = this.checkDemo[i];
                    let indexNume=indexDemo-1;
                    this.$refs[indexDemo][0].classList.remove("red");
                    this.$refs[indexDemo][0].classList.remove("g");
                    this.$refs[indexNume][0].classList.remove("red");
                    this.$refs[indexNume][0].classList.remove("g");
                }

                this.startTime = "";
                let a=Math.random()*10;
                this.randomIndex = "";
                if(a>5){
                    this.randomIndex="c";
                }else{
                    this.randomIndex = "r";
                }
                this.checkValDemo = [];
                this.checkValNume = [];
                this.checkDemo = [];
                this.checkNume = [];
                this.correctNum = [];
                this.checkV = [];
                this.checkR = [];
                this.correctNum1 = [];
                this.alertMessage = "";
                this.resetNow = false;
                this.isAlert = false;
                this.inputNum = [];
                this.arrSimpleOne = [];
                this.arrSimpleTwo = [];
                this.arrSimpleThree = [];
                this.root = [];

                this.r = [];
                this.c = [];
                for (let s = 0; s < 2; s++) {
                    this.r.push(s + 1);
                    this.c.push(s + 1);
                }
                this.r.sort(this.randomsort);
                this.c.sort(this.randomsort);
                let switcher = this.getCheckedNumbers();
                if (switcher < 2) {
                    this.alertMessage = "Please select more than two options";
                    this.h = false;
                }
                else {
                    this.h = true;
                    this.isChecked = false;
                    this.shuffle(this.arrSimpleOne);
                    this.root = [];
                    this.root.push(this.arrSimpleOne.pop());
                    this.root.push(this.arrSimpleOne.pop());
                    let temp = this.lcm(this.root[0],this.root[1]);
                    for (let i = 0; i < 2; i++) {
                        let random2 = Math.floor(Math.random() * this.root[i] / 2) + 1;
                        let random3 = (Math.floor(Math.random() * 5) + 1) * temp;
                        if(this.purify(random2, this.root[i]) !== (random2 * this.root[i])){
                            random2 = 1;
                            this.arrSimpleTwo.push(random2);
                            this.arrSimpleThree.push(random3);
                        }
                    }
                    if(this.arrSimpleThree[0] === this.arrSimpleThree[1] || this.purify(this.root[0],this.arrSimpleTwo[0]) === this.purify(this.root[1],this.arrSimpleTwo[1])){
                        this.generateTable();
                    }
                }

            },
            lcm: function(x, y){
                return x*y/this.gcd(x,y);
            },
            gcd: function(x, y){
                let max,min,temp;
                max = x > y ? x : y ;
                min = x < y ? x : y ;
                while( max % min ){
                    temp = max % min;
                    max = min;
                    min = temp;
                }
                return min;
            },

            shuffle: function(arr){
                for(let i=0;i<arr.length;i++){
                    let random = Math.floor(Math.random()*arr.length);
                    let temp = arr[random];
                    arr[random] = arr[i];
                    arr[i] = temp;
                }
            },
            getCheckedNumbers: function(){
                this.arrSimpleOne = [];
                let count = 0;
                for(let i = 0; i < this.ckboxValue.length; i++){
                    let cur = this.$refs[this.ckboxValue[i]][0].checked;
                    if(cur ===true){
                        count++;
                        this.arrSimpleOne.push(this.ckboxValue[i]);
                    }
                }

                return count;
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
                this.correctNum1 = [];
                this.alertMessage = "";
                this.isAlert = false;
                for (let i = 0; i < this.checkV.length; i++) {
                    let index = this.checkR[i];
                    let a = index - Math.floor(index/10)*10;
                    if (Math.floor(index/10) === 1) {
                        if (this.checkV[i] === this.arrSimpleThree[a-2]) {
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

                        if (this.checkV[i] === (this.arrSimpleThree[a-2]/this.root[Math.floor(index/10)-2]*this.arrSimpleTwo[Math.floor(index/10)-2])) {
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
                for (let i = 0; i < this.checkValDemo.length; i++) {
                        var indexDemo = this.checkDemo[i];
                        var indexNume = this.checkNume[i];
                        var r=Math.floor(indexDemo/100);
                        var c=Math.floor(indexDemo/10)-r*10;
                        if (c === 1) {
                            let result=this.purify(this.root[r - 2], this.arrSimpleTwo[r - 2]);
                            let result1 = this.purify(this.checkValDemo[i], this.checkValNume[i]);
                            if (result1[0][1] === result[0][1] && result1[0][0] === result[0][0]) {
                                if (this.$refs[indexDemo][0].classList.value === "red" && this.$refs[indexNume][0].classList.value === "red") {
                                    this.$refs[indexDemo][0].classList.replace("red", "g");
                                    this.$refs[indexNume][0].classList.replace("red", "g");
                                } else {
                                    this.$refs[indexDemo][0].classList.add("g");
                                    this.$refs[indexNume][0].classList.add("g");
                                }
                                this.correctNum1[i] = "g";

                            } else {
                                if (this.$refs[indexDemo][0].classList.value === "g" && this.$refs[indexNume][0].classList.value === "g") {
                                    this.$refs[indexDemo][0].classList.replace("g", "red");
                                    this.$refs[indexNume][0].classList.replace("g", "red");
                                } else {
                                    this.$refs[indexDemo][0].classList.add("red");
                                    this.$refs[indexNume][0].classList.add("red");
                                }
                                this.correctNum1[i] = "red";
                            }
                        }

                }
                let l = this.selected * this.selected;
                let count = 0;
                    if (this.correctNum.length + this.correctNum1.length === l) {
                        for (let a = 0; a < l; a++) {
                            if (this.correctNum[a] === "g") {
                                count++;
                            }
                            if (this.correctNum1[a] === "g") {
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
                        for (let a = 0; a < this.correctNum1.length; a++) {
                            if (this.correctNum1[a] === "red") {
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
                    if(r>10 && r<100){
                        for (let i = 0; i < this.checkV.length; i++) {
                            if (this.checkR[i] === r) {
                                this.checkV.splice(i, 1);
                                this.checkR.splice(i, 1);
                                let index = r;
                                this.$refs[index][0].classList.remove("red");
                                this.$refs[index][0].classList.remove("g");
                                return;
                            }
                        }
                    }
                    if(r-Math.floor(r/10)*10===1){
                        for (let i = 0; i < this.checkNume.length; i++) {
                            if (this.checkNume[i] === r) {
                                this.checkNume.splice(i, 1);
                                this.checkValNume.splice(i, 1);
                                this.checkDemo.splice(i, 1);
                                this.checkValDemo.splice(i, 1);
                                let y=r+1;
                                this.$refs[r][0].classList.remove("red");
                                this.$refs[r][0].classList.remove("g");
                                this.$refs[y][0].classList.remove("red");
                                this.$refs[y][0].classList.remove("g");
                                this.inputNum[y] = "";
                                return;
                            }
                        }
                    }
                    if(r-Math.floor(r/10)*10===2){
                        for (let i = 0; i < this.checkDemo.length; i++) {
                            if (this.checkDemo[i] === r) {
                                this.checkNume.splice(i, 1);
                                this.checkValNume.splice(i, 1);
                                this.checkDemo.splice(i, 1);
                                this.checkValDemo.splice(i, 1);
                                let y=r-1;
                                this.$refs[r][0].classList.remove("red");
                                this.$refs[r][0].classList.remove("g");
                                this.$refs[y][0].classList.remove("red");
                                this.$refs[y][0].classList.remove("g");
                                this.inputNum[y] = "";
                                return;
                            }
                        }
                    }
                } else {
                    if(Math.floor(r/100) !== 0){
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
                    }else{
                        if(r>10 && r<100){
                            for (let i = 0; i < this.checkV.length; i++) {
                                if (this.checkR[i] === r) {
                                    let index = r;
                                    this.$refs[index][0].classList.remove("red");
                                    this.$refs[index][0].classList.remove("g");
                                    this.checkV[i] = parseInt(num);
                                    return;
                                }
                            }
                            this.checkR.push(r);
                            this.checkV.push(parseInt(num));
                        }
                    }

                }
            },
            reset: function() {
                this.alertMessage = "";
                for (let i = 0; i < this.checkV.length; i++) {
                    let indexDemo = this.checkR[i];
                    this.$refs[indexDemo][0].classList.remove("red");
                    this.$refs[indexDemo][0].classList.remove("g");
                }
                for (let i = 0; i < this.checkDemo.length; i++) {
                    let indexDemo = this.checkDemo[i];
                    let indexNume=indexDemo-1;
                    this.$refs[indexDemo][0].classList.remove("red");
                    this.$refs[indexDemo][0].classList.remove("g");
                    this.$refs[indexNume][0].classList.remove("red");
                    this.$refs[indexNume][0].classList.remove("g");
                }
                this.generateTable();
            },
            generateList: function(){
                this.isChecked = this.isChecked === false;
            }
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
    #tableAdd td {
        width: 8vw;
        height: 8vw;
        overflow:hidden;
        border: #7f8c8d solid;
        font-size: 1.5rem;
        padding: 5px;
    }

    #tableAdd input {
        padding: 0px;
        border: white;
        background: transparent;
        text-align: center;
        font-size: 30px;
        width: 3.5vw;
        height: 3.5vw;
    }
    #tableAdd div{
        text-align: center;
        line-height: 3.5vw;
    }
    .ckboxTable td{
        border-color: transparent;
    }
    .ckboxTable div{
        text-align: left;
        vertical-align: middle;
    }
    .ckboxTable input[type='checkbox']{
        vertical-align: middle;
        width: auto;
        height: auto;
    }
</style>