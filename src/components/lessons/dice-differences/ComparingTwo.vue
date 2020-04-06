<template>
    <div>
        <div v-if="!next" class="container mt-4 mb-5">
            <div class="top">
                <div class="row justify-content-end">
                    <label class="col-sm-5 label1" >Enter the number of trials:</label>
                    <div class="col-sm-4">
                        <input type="number" min="1" max="10000" class="roll1" oninput="value=value.replace('.','');if(value>10000)value=10000;if(value<1)value=null"  v-model="trails">
                    </div>
                </div>
                <div class="row justify-content-end">
                    <label class="col-sm-4" style="font-weight: bold">Range is 1 to 10000</label>
                </div>
            </div>
            <div class="top" style="margin-top: 10px;">
                <div class="row justify-content-end">
                    <div class="col-3"><label disabled class="zone1 noborder" style="color: #0067d2; line-height: 50px; height:50px; font-size: 25px" >Cell:</label></div>
                    <input disabled class="zone2 noborder" value="0">
                    <input disabled class="zone2 noborder" value="1">
                    <input disabled class="zone2 noborder" value="2">
                    <input disabled class="zone2 noborder" value="3">
                    <input disabled class="zone2 noborder" value="4">
                    <input disabled class="zone2 noborder" value="5">
                </div>
                <div class="row justify-content-end">
                    <div class="col-4"><label class="zone1 noborder" style="color: #0067d2; line-height: 50px; height:50px; font-size: 25px" >Number of prisoners:</label></div>
                    <input type="number" min="0"  max="9" @keyup="CheckNums" @blur="hideInputPrompt" @focus="displayInputPrompt" onfocus="this.select()" maxlength="1" class="zone2 border" v-model="num1" oninput="value=value.replace('.',''); if(value>9)value=value.substr(-1);else if(value==0) value=0 ;else if (value >= 1) value=value.replace(/\b(0+)/gi,'')">
                    <input type="number" min="0"  max="9" @keyup="CheckNums" @blur="hideInputPrompt" class="zone2 border" @focus="displayInputPrompt" onfocus="this.select()" v-model="num2" oninput="value=value.replace('.',''); if(value>9)value=value.substr(-1);else if(value==0) value=0 ;else if (value >= 1) value=value.replace(/\b(0+)/gi,'')">
                    <input type="number" min="0"  max="9" @keyup="CheckNums" @blur="hideInputPrompt" @focus="displayInputPrompt" onfocus="this.select()" maxlength="1" class="zone2 border" v-model="num3" oninput="value=value.replace('.',''); if(value>9)value=value.substr(-1);else if(value==0) value=0 ;else if (value >= 1) value=value.replace(/\b(0+)/gi,'')">
                    <input type="number" min="0"  max="9" @keyup="CheckNums" @blur="hideInputPrompt" @focus="displayInputPrompt" onfocus="this.select()" maxlength="1" class="zone2 border" v-model="num4" oninput="value=value.replace('.',''); if(value>9)value=value.substr(-1);else if(value==0) value=0 ;else if (value >= 1) value=value.replace(/\b(0+)/gi,'')">
                    <input type="number" min="0"  max="9" @keyup="CheckNums" @blur="hideInputPrompt" @focus="displayInputPrompt" onfocus="this.select()" maxlength="1" class="zone2 border" v-model="num5" oninput="value=value.replace('.',''); if(value>9)value=value.substr(-1);else if(value==0) value=0 ;else if (value >= 1) value=value.replace(/\b(0+)/gi,'')">
                    <input type="number" min="0"  max="9" @keyup="CheckNums" @blur="hideInputPrompt" @focus="displayInputPrompt" onfocus="this.select()" maxlength="1" class="zone2 border" v-model="num6" oninput="value=value.replace('.',''); if(value>9)value=value.substr(-1);else if(value==0) value=0 ;else if (value >= 1) value=value.replace(/\b(0+)/gi,'')">
                </div>
            </div>

            <div class="top" style="margin-top: 10px; border: none">
                <div  class="row justify-content-end" style="height: 30px; color: red; font-size: 20px">
                    <div v-if="prompt1"  v-text="ShowPrompt"></div>
                    <div v-else style="color: red; font-size: 20px;" v-text="ErrorPrompt"></div>

                </div>

            </div>

            <div class="top" style="margin-top: 10px;">
                <div class="row justify-content-end">
                    <div class="col-3"><label disabled class="zone1 noborder" style="color: #0067d2; line-height: 50px; height:50px; font-size: 25px" >Cell:</label></div>
                    <input disabled class="zone2 noborder" value="0">
                    <input disabled class="zone2 noborder" value="1">
                    <input disabled class="zone2 noborder" value="2">
                    <input disabled class="zone2 noborder" value="3">
                    <input disabled class="zone2 noborder" value="4">
                    <input disabled class="zone2 noborder" value="5">
                </div>
                <div class="row justify-content-end">
                    <div class="col-4"><label class="zone1 noborder" style="color: #0067d2; line-height: 50px; height:50px; font-size: 25px" >Number of prisoners:</label></div>
                    <input type="number" min="0"  max="9" @keyup="CheckNums1" @blur="hideInputPrompt1" @focus="displayInputPrompt1" onfocus="this.select()" maxlength="1" class="zone2 border" v-model="num7" oninput="value=value.replace('.',''); if(value>9)value=value.substr(-1);else if(value==0) value=0 ;else if (value >= 1) value=value.replace(/\b(0+)/gi,'')">
                    <input type="number" min="0"  max="9" @keyup="CheckNums1" @blur="hideInputPrompt1" class="zone2 border" @focus="displayInputPrompt1" onfocus="this.select()" v-model="num8" oninput="value=value.replace('.',''); if(value>9)value=value.substr(-1);else if(value==0) value=0 ;else if (value >= 1) value=value.replace(/\b(0+)/gi,'')">
                    <input type="number" min="0"  max="9" @keyup="CheckNums1" @blur="hideInputPrompt1" @focus="displayInputPrompt1" onfocus="this.select()" maxlength="1" class="zone2 border" v-model="num9" oninput="value=value.replace('.',''); if(value>9)value=value.substr(-1);else if(value==0) value=0 ;else if (value >= 1) value=value.replace(/\b(0+)/gi,'')">
                    <input type="number" min="0"  max="9" @keyup="CheckNums1" @blur="hideInputPrompt1" @focus="displayInputPrompt1" onfocus="this.select()" maxlength="1" class="zone2 border" v-model="num10" oninput="value=value.replace('.',''); if(value>9)value=value.substr(-1);else if(value==0) value=0 ;else if (value >= 1) value=value.replace(/\b(0+)/gi,'')">
                    <input type="number" min="0"  max="9" @keyup="CheckNums1" @blur="hideInputPrompt1" @focus="displayInputPrompt1" onfocus="this.select()" maxlength="1" class="zone2 border" v-model="num11" oninput="value=value.replace('.',''); if(value>9)value=value.substr(-1);else if(value==0) value=0 ;else if (value >= 1) value=value.replace(/\b(0+)/gi,'')">
                    <input type="number" min="0"  max="9" @keyup="CheckNums1" @blur="hideInputPrompt1" @focus="displayInputPrompt1" onfocus="this.select()" maxlength="1" class="zone2 border" v-model="num12" oninput="value=value.replace('.',''); if(value>9)value=value.substr(-1);else if(value==0) value=0 ;else if (value >= 1) value=value.replace(/\b(0+)/gi,'')">
                </div>
            </div>

            <div  class="top" style="margin-top: 10px; border: none">
                <div class="row justify-content-end"  style="height: 30px;  color: red; font-size: 20px" >
                    <div v-if="prompt2" v-text="ShowPrompt"></div>
                    <div v-else style="color: red; font-size: 20px;" v-text="ErrorPrompt1"></div>
                </div>
                <div class="row justify-content-end">
                    <button style="margin-top: 8px;" class="btn btn-outline-success" @click="CheckError">OK</button>
                </div>
            </div>
        </div>

        <div v-else class="container mt-4 mb-5">
            <div class="top" style="border: none">
                <div class="row justify-content-center">
                    <label class="col-sm-5 label1" >Number of trials: {{numberoftrials}}</label>
                    <label class="col-sm-5 label1" >{{trails}} trials</label>
                </div>
            </div>
            <div class="top">
                <div class="row justify-content-end">
                    <label class="col-sm-5 label1"></label>
                    <div class="col-sm-3">
                        <label style="margin-top: 5px; text-align: center;font-size: 25px; color: #0067d2"> Strategy 1:</label>
                    </div>
                    <div class="col-sm-3">
                        <label style="margin-top: 5px; text-align: center;font-size: 25px; color: red"> Strategy 2:</label>
                    </div>
                </div>
                <div class="row justify-content-end">
                    <label class="col-sm-5 label1" >Average:</label>
                    <div class="col-sm-3">
                        <input class="roll1" style="width: 150px" disabled v-model="Average1">
                    </div>
                    <div class="col-sm-3">
                        <input class="roll1" style="width: 150px" disabled v-model="Average2">
                    </div>
                </div>
                <div class="row justify-content-end">
                    <label class="col-sm-5 label1">Minimum:</label>
                    <div class="col-sm-3">
                        <input class="roll1" style="width: 150px" disabled v-model="Minimum1">
                    </div>
                    <div class="col-sm-3">
                        <input class="roll1" style="width: 150px" disabled v-model="Minimum2">
                    </div>
                </div>
                <div class="row justify-content-end">
                    <label class="col-sm-5 label1" >Maximum:</label>
                    <div class="col-sm-3">
                        <input class="roll1" style="width: 150px" disabled v-model="Maximum1">
                    </div>
                    <div class="col-sm-3">
                        <input class="roll1" style="width: 150px" disabled v-model="Maximum2">
                    </div>
                </div>
            </div>
            <div class="top" style="margin-top: 10px;">
                <div class="row justify-content-end">
                    <div class="col-3"><label disabled class="zone1 noborder" style="line-height: 50px; height:50px; font-size: 25px" >Cell:</label></div>
                    <input disabled class="zone2 noborder" value="0">
                    <input disabled class="zone2 noborder" value="1">
                    <input disabled class="zone2 nobo   rder" value="2">
                    <input disabled class="zone2 noborder" value="3">
                    <input disabled class="zone2 noborder" value="4">
                    <input disabled class="zone2 noborder" value="5">
                </div>
                <div class="row justify-content-end">
                    <div class="col-4"><label disabled class="zone1 noborder" style="color: #0067d2; line-height: 50px; height:50px; font-size: 25px" >Strategy 1:</label></div>
                    <input  type="number"  :disabled="disabled"  min="0"  max="9" maxlength="1" onfocus="this.select()" class="zone2 noborder1" oninput="value=value.replace('.',''); if(value>9)value=value.substr(-1);else if(value==0) value=0 ;else if (value >= 1) value=value.replace(/\b(0+)/gi,'')" v-model="num1">
                    <input  type="number"  :disabled="disabled" min="0"  max="9" maxlength="1" onfocus="this.select()" oninput="value=value.replace('.',''); if(value>9)value=value.substr(-1);else if(value==0) value=0 ;else if (value >= 1) value=value.replace(/\b(0+)/gi,'')" class="zone2 noborder1" v-model="num2">
                    <input  type="number"  :disabled="disabled" min="0"  max="9" maxlength="1" onfocus="this.select()" oninput="value=value.replace('.',''); if(value>9)value=value.substr(-1);else if(value==0) value=0 ;else if (value >= 1) value=value.replace(/\b(0+)/gi,'')" class="zone2 noborder1" v-model="num3">
                    <input  type="number"  :disabled="disabled" min="0"  max="9" maxlength="1" onfocus="this.select()" oninput="value=value.replace('.',''); if(value>9)value=value.substr(-1);else if(value==0) value=0 ;else if (value >= 1) value=value.replace(/\b(0+)/gi,'')" class="zone2 noborder1" v-model="num4">
                    <input  type="number"  :disabled="disabled" min="0"  max="9" maxlength="1" onfocus="this.select()" oninput="value=value.replace('.',''); if(value>9)value=value.substr(-1);else if(value==0) value=0 ;else if (value >= 1) value=value.replace(/\b(0+)/gi,'')" class="zone2 noborder1" v-model="num5">
                    <input type="number"  :disabled="disabled" min="0"  max="9" maxlength="1" onfocus="this.select()" oninput="value=value.replace('.',''); if(value>9)value=value.substr(-1);else if(value==0) value=0 ;else if (value >= 1) value=value.replace(/\b(0+)/gi,'')" class="zone2 noborder1" v-model="num6">
                </div>
                <div class="row justify-content-end">
                    <div class="col-4"><label disabled class="zone1 noborder" style="color: red; line-height: 50px; height:50px; font-size: 25px" >Strategy 2:</label></div>
                    <input  type="number"  :disabled="disabled"  min="0"  max="9" maxlength="1" onfocus="this.select()" oninput="value=value.replace('.',''); if(value>9)value=value.substr(-1);else if(value==0) value=0 ;else if (value >= 1) value=value.replace(/\b(0+)/gi,'')"  class="zone2 noborder2" v-model="num7">
                    <input  type="number"  :disabled="disabled"  min="0"  max="9" maxlength="1" onfocus="this.select()" oninput="value=value.replace('.',''); if(value>9)value=value.substr(-1);else if(value==0) value=0 ;else if (value >= 1) value=value.replace(/\b(0+)/gi,'')"  class="zone2 noborder2" v-model="num8">
                    <input  type="number"  :disabled="disabled"  min="0"  max="9" maxlength="1" onfocus="this.select()" oninput="value=value.replace('.',''); if(value>9)value=value.substr(-1);else if(value==0) value=0 ;else if (value >= 1) value=value.replace(/\b(0+)/gi,'')"  class="zone2 noborder2" v-model="num9">
                    <input  type="number"  :disabled="disabled"  min="0"  max="9" maxlength="1" onfocus="this.select()" oninput="value=value.replace('.',''); if(value>9)value=value.substr(-1);else if(value==0) value=0 ;else if (value >= 1) value=value.replace(/\b(0+)/gi,'')"  class="zone2 noborder2" v-model="num10">
                    <input  type="number"  :disabled="disabled"  min="0"  max="9" maxlength="1" onfocus="this.select()" oninput="value=value.replace('.',''); if(value>9)value=value.substr(-1);else if(value==0) value=0 ;else if (value >= 1) value=value.replace(/\b(0+)/gi,'')"  class="zone2 noborder2" v-model="num11">
                    <input  type="number"  :disabled="disabled"  min="0"  max="9" maxlength="1" onfocus="this.select()" oninput="value=value.replace('.',''); if(value>9)value=value.substr(-1);else if(value==0) value=0 ;else if (value >= 1) value=value.replace(/\b(0+)/gi,'')"  class="zone2 noborder2" v-model="num12">
                </div>
            </div>

            <div v-if="!reset1" class="top" style="margin-top: 20px; border: none">
                <div class="row justify-content-end">
                    <div v-if="!disabled" style="color: red; font-size: 20px; margin-right: 15px;margin-top: 3px">{{resetwords}}</div>
                    <button class="btn btn-outline-success" style="margin-right: 20px" @click="playDemo" v-bind:style="{visibility: !playDemoGame ? 'hidden' : 'visible' }">Play Demo</button>
                    <div v-if="!disabled" style="color: red; font-size: 20px; margin-right: 15px;margin-top: 3px">{{resetwords1}}</div>

                    <button class="btn btn-outline-success"  style="margin-right: 30px" @click="playAuto" v-if="playAutoGame">{{PlayAutoWord}}</button>
                </div>
            </div>
            <div v-else class="top" style="margin-top: 20px; border: none">
                <div class="row justify-content-center" style="margin-top: 20px;">
                    <button  class="btn btn-outline-success" @click="Reset">Finished! Tap here to reset</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                numberoftrials:0,
                Average1:null,
                Average11:null,
                Average2:null,
                Average22:null,
                Minimum1:null,
                Maximum1:null,
                Minimum2:null,
                Maximum2:null,
                trails: null,
                strategy: 1,
                PlayAutoWord:"Play Auto",
                next: false,
                prompt1:true,
                prompt2:true,
                inputPrompt:false,
                ErrorPrompt: "",
                Error1: 2,
                Error: 2,
                ErrorPrompt1: "",
                playDemoGame:true,
                playAutoGame:true,
                maxPrisoners: 9,
                disabled:true,
                num1: 0,
                num2: 0,
                num3: 0,
                num4: 0,
                num5: 0,
                num6: 0,
                num7: 0,
                num8: 0,
                num9: 0,
                num10: 0,
                num11: 0,
                num12: 0,
                maxPrisoners1: 9,
                nums1:[],
                nums2:[],
                reset1:false,
                resetwords:"Change the number of prisoners or",
                resetwords1:"or",
            }
        },
        watch:{
            next(value){
                if (value){
                    this.nums1.push(this.num1);
                    this.nums1.push(this.num2);
                    this.nums1.push(this.num3);
                    this.nums1.push(this.num4);
                    this.nums1.push(this.num5);
                    this.nums1.push(this.num6);
                    this.nums2.push(this.num7);
                    this.nums2.push(this.num8);
                    this.nums2.push(this.num9);
                    this.nums2.push(this.num10);
                    this.nums2.push(this.num11);
                    this.nums2.push(this.num12);
                }
            },
            numberoftrials(value){
                if (value >= this.trails){
                    this.stop = true;
                    this.reset1 = true;
                    this.PlayAutoWord = "Play Auto";
                }
            }
        },
        computed:{
            ShowPrompt(){
              if (this.prompt1) {
                return "Add or remove prisoners from the cells.";
              }
              if (this.prompt2) {
                return "Add or remove prisoners from the cells.";
              }
            },
        },
        methods:{
            CheckError(){
                this.prompt1 = false;
                this.prompt2 = false;


                let sum1 = Number.parseInt(this.num1)+ Number.parseInt(this.num2) + Number.parseInt(this.num3) + Number.parseInt(this.num4) + Number.parseInt(this.num5) + Number.parseInt(this.num6);
                let sum2 = Number.parseInt(this.num7)+ Number.parseInt(this.num8) + Number.parseInt(this.num9) + Number.parseInt(this.num10) + Number.parseInt(this.num11) + Number.parseInt(this.num12);

                if (this.Error1 == 1) {
                  let overfill = sum1 - this.maxPrisoners;
                  let overfillString = this.numToString(overfill).toLowerCase();
                  this.ErrorPrompt = "Please remove at least " + overfillString + " prisoner" + (overfill === 1 ? '' : 's') + ". The maximum is nine.";
                }
                else if (this.Error1 == 2) {
                  this.ErrorPrompt = "Place at least one prisoner in a cell.";
                }

                if (this.Error == 1) {
                  let overfill = sum2 - this.maxPrisoners1;
                  let overfillString = this.numToString(overfill).toLowerCase();
                  this.ErrorPrompt1 = "Please remove at least " + overfillString + " prisoner" + (overfill === 1 ? '' : 's') + ". The maximum is nine.";
                }
                else if (this.Error == 2) {
                  this.ErrorPrompt1 = "Place at least one prisoner in a cell.";
                }
                else {
                    this.ErrorPrompt1 = "";
                    if(this.Error1 == 0){
                        if (this.trails > 0) {
                            this.next = true;
                        }
                        else {
                          this.ErrorPrompt = "";
                          this.ErrorPrompt1 = "Enter the number of trials (1-100000)";
                        }
                    }
                }
            },
            sleep: function(ms){
                return new Promise(resolve=>{
                    setTimeout(resolve,ms)
                })
            },
            setnums(){
                this.nums1[0] = this.num1;
                this.nums1[1] = this.num2;
                this.nums1[2] = this.num3;
                this.nums1[3] = this.num4;
                this.nums1[4] = this.num5;
                this.nums1[5] = this.num6;
                this.nums2[0] = this.num7;
                this.nums2[1] = this.num8;
                this.nums2[2] = this.num9;
                this.nums2[3] = this.num10;
                this.nums2[4] = this.num11;
                this.nums2[5] = this.num12;
            },

            playDemo(){
                if (!this.disabled){
                    this.setnums();
                    if (this.nums1.reduce((a,b)=>Number.parseInt(a)+Number.parseInt(b)) > 9){
                        this.resetwords = "Enter a smaller number for strategy 1";
                        this.resetwords1 = "";
                        return;
                    } else if (this.nums1.reduce((a,b)=>Number.parseInt(a)+Number.parseInt(b)) == 0) {
                        this.resetwords = "Enter at least one prisoner for strategy 1";
                        this.resetwords1 = "";
                        return;
                    }
                    if (this.nums2.reduce((a,b)=>Number.parseInt(a)+Number.parseInt(b)) > 9){
                        this.resetwords = "Enter a smaller number for strategy 2";
                        this.resetwords1 = "";
                        return;
                    } else if (this.nums2.reduce((a,b)=>Number.parseInt(a)+Number.parseInt(b)) == 0) {
                        this.resetwords = "Enter at least one prisoner for strategy 2";
                        this.resetwords1 = "";
                        return;
                    }
                }
                this.disabled = true;
                this.playDemoGame = false;
                this.playAutoGame = false;

                this.loop1();
                this.loop2();
                this.numberoftrials += 1;
                this.playDemoGame = true;
                this.playAutoGame = true;
            },
            playAuto:async function(){
                if (!this.disabled){
                    this.setnums();
                    if (this.nums1.reduce((a,b)=>Number.parseInt(a)+Number.parseInt(b)) > 9){
                        this.resetwords = "Enter a smaller number for strategy 1";
                        this.resetwords1 = "";
                        return;
                    } else if (this.nums1.reduce((a,b)=>Number.parseInt(a)+Number.parseInt(b))  == 0) {
                        this.resetwords = "Enter at least one prisoner for strategy 1";
                        this.resetwords1 = "";
                        return;
                    }
                    if (this.nums2.reduce((a,b)=>Number.parseInt(a)+Number.parseInt(b))  > 9){
                        this.resetwords = "Enter a smaller number for strategy 2";
                        this.resetwords1 = "";
                        return;
                    } else if (this.nums2.reduce((a,b)=> Number.parseInt(a)+Number.parseInt(b)) == 0) {
                        this.resetwords = "Enter at least one prisoner for strategy 2";
                        this.resetwords1 = "";
                        return;
                    }
                }

                this.disabled = true;
                if(this.PlayAutoWord == "Play Auto") {
                    this.PlayAutoWord = "Pause";
                    this.playDemoGame = false;
                    var temple = await this.sleep(250);
                    this.stop = false;
                    while (!this.stop && this.numberoftrials < this.trails) {
                        if (this.trails <= 100){
                            var temple1 = await this.sleep(100);
                            this.loop1();
                            this.loop2();
                            this.numberoftrials += 1;
                        }else if (this.trails <= 3000) {
                            var temple1 = await this.sleep(2);
                            this.loop1();
                            this.loop2();
                            this.numberoftrials += 1;

                        }else if (this.trails <= 10000) {
                            // var temple = await this.sleep(2);
                            // this.loop1();
                            // this.loop2();
                            // this.numberoftrials += 1;
                            var j = 1;
                            for (let i = 1; i <= 10; i++) {
                                    var temple1 = await this.sleep(1000);
                                    while(j <= 1000 && this.PlayAutoWord == "Pause"){
                                        this.loop1();
                                        this.loop2();
                                        if(this.numberoftrials< this.trails){
                                            this.numberoftrials += 1;
                                        }
                                        j += 1;
                                    }
                                    j = 1

                                }

                        }
                    }
                } else if(this.PlayAutoWord == "Pause"){
                    this.stop = true;
                    this.playDemoGame = true;
                    this.PlayAutoWord = "Play Auto";
                    this.playAutoGame = true;
                }
            },
            loop1(){
                let p = 0;
                while(this.nums1.reduce((a,b) =>Number.parseInt(a)+Number.parseInt(b)) > 0){
                    let random1 = Math.floor(Math.random()*36)+1;
                    random1 = this.diceDifference(random1);
                    if (this.nums1[random1] > 0){
                        this.nums1[random1] -= 1;
                    }
                    p += 1;
                }
                if (this.numberoftrials == 0){
                    this.Maximum1 = p;
                    this.Minimum1 = p;
                    this.Average1 = p;
                    this.Average11 = p;
                } else {
                    this.Maximum1 = this.Maximum1 > p ? this.Maximum1 : p;
                    this.Minimum1 = this.Minimum1 < p ? this.Minimum1 : p;
                    this.Average11 = ((this.Average11 * this.numberoftrials + p) / (this.numberoftrials + 1));
                    this.Average1 = this.Average11.toFixed(2);
                }
                this.nums1[0] = this.num1;
                this.nums1[1] = this.num2;
                this.nums1[2] = this.num3;
                this.nums1[3] = this.num4;
                this.nums1[4] = this.num5;
                this.nums1[5] = this.num6;
            },
            loop2(){
                let p = 0;
                while(this.nums2.reduce((a,b) =>Number.parseInt(a)+Number.parseInt(b)) > 0){
                    let random1 = Math.floor(Math.random()*36)+1;
                    random1 = this.diceDifference(random1);
                    if (this.nums2[random1] > 0){
                        this.nums2[random1] -= 1;
                    }
                    p += 1;
                }
                if (this.numberoftrials == 0){
                    this.Maximum2 = p;
                    this.Minimum2 = p;
                    this.Average2 = p;
                    this.Average22 = p;
                } else {
                    this.Maximum2 = this.Maximum2 > p ? this.Maximum2 : p;
                    this.Minimum2 = this.Minimum2 < p ? this.Minimum2 : p;
                    this.Average22 = ((this.Average22 * this.numberoftrials + p) / (this.numberoftrials + 1));
                    this.Average2 = this.Average22.toFixed(2);
                }
                this.nums2[0] = this.num7;
                this.nums2[1] = this.num8;
                this.nums2[2] = this.num9;
                this.nums2[3] = this.num10;
                this.nums2[4] = this.num11;
                this.nums2[5] = this.num12;
            },
            Reset(){
                this.disabled = false;
                this.reset1 = false;
                this.numberoftrials = 0;
                this.Average1 = null;
                this.Average11 = null;
                this.Minimum1 = null;
                this.Maximum1 = null;
                this.Average2 = null;
                this.Average22 = null;
                this.Minimum2 = null;
                this.Maximum2 = null;
                this.playDemoGame = true;
                this.playAutoGame = true;
                this.PlayAutoWord = "Play Auto";
            },
            diceDifference(random){
                if (random < 7){
                    return 0;
                }else if (random < 17) {
                    return 1;
                }else if (random < 25) {
                    return 2;
                }else if (random < 31) {
                    return 3;
                }else if (random < 35) {
                    return 4;
                }else{
                    return 5;
                }
            },
            displayInputPrompt(){
                this.prompt1 = true;
            },
            displayInputPrompt1(){
                this.prompt2 = true;
            },
            hideInputPrompt(){
                this.prompt1 =false;
            },
            hideInputPrompt1(){
                this.prompt2 =false;
            },

            numToString(num) {
                switch (num) {
                    case 1:
                        return "One";
                    case 2:
                        return "Two";
                    case 3:
                        return "Three";
                    case 4:
                        return "Four";
                    case 5:
                        return "Five";
                    case 6:
                        return "Six";
                    case 7:
                        return "Seven";
                    case 8:
                        return "Eight";
                    case 9:
                        return "Nine";
                    default:
                        return num.toString();
                }
            },

            CheckNums(){
              if (this.num1 > 0 || this.num2 > 0 ||  this.num3 > 0|| this.num4 > 0|| this.num5 > 0|| this.num6 > 0){
                  let sum = Number.parseInt(this.num1) + Number.parseInt(this.num2) + Number.parseInt(this.num3) + Number.parseInt(this.num4) + Number.parseInt(this.num5) + Number.parseInt(this.num6);
                  if ( sum > 9 ){
                      this.Error1 = 1;
                      let overfill = sum - this.maxPrisoners;
                      let overfillString = this.numToString(overfill).toLowerCase();
                      this.ErrorPrompt = "Please remove at least " + overfillString + " prisoner" + (overfill === 1 ? '' : 's') + ". The maximum is nine.";
                    }
                  else if (9 == sum){
                      this.Error1 = 0;
                      this.ErrorPrompt = "Nine prisoners have been placed in the cells. Software maximum reached.";
                  }
                  else{
                      if (sum == 1) {
                        this.ErrorPrompt = "One prisoner has been placed in the cells.";
                      }
                      else {
                        this.ErrorPrompt = this.numToString(sum) + " prisoners have been placed in the cells.";
                      }
                      this.Error1 = 0;
                  }
              }
              else {
                  this.Error1 = 2;
                  this.ErrorPrompt = "Enter at least one prisoner.";
              }
              this.prompt1 = false;
            },

            CheckNums1(){
              if (this.num7 > 0 || this.num8 > 0 ||  this.num9 > 0|| this.num10 > 0|| this.num11 > 0|| this.num12 > 0){
                  let sum = Number.parseInt(this.num7)+ Number.parseInt(this.num8) + Number.parseInt(this.num9) + Number.parseInt(this.num10) + Number.parseInt(this.num11) + Number.parseInt(this.num12);
                  if ( sum > 9 ){
                      this.Error = 1;
                      let overfill = sum - this.maxPrisoners1;
                      let overfillString = this.numToString(overfill).toLowerCase();
                      this.ErrorPrompt1 = "Please remove at least " + overfillString + " prisoner" + (overfill === 1 ? '' : 's') + ". The maximum is nine.";
                    }
                  else if (9 == sum){
                      this.Error = 0;
                      this.ErrorPrompt1 = "Nine prisoners have been placed in the cells. Software maximum reached.";
                  }
                  else{
                      if (sum == 1) {
                        this.ErrorPrompt1 = "One prisoner has been placed in the cells.";
                      }
                      else {
                        this.ErrorPrompt1 = this.numToString(sum) + " prisoners have been placed in the cells.";
                      }
                      this.Error = 0;
                  }
              }else{
                  // 1 : all input numbers are 0
                  this.Error1 = 2;
                  this.ErrorPrompt = "Enter at least one prisoner.";
                  // this.inputPrompt = true;
              }
              this.prompt2 = false;
            },

        },
        name: "PlayGames"
    }
</script>

<style scoped>
    .roll1{
        margin-top: 5px;
        text-align: right;
        font-weight: bold;
        min-width: 80px;
    }
    .top{
        max-width: 800px;
        margin: 0 auto;
        border: 2px solid gainsboro;
    }
    .label1{
        text-align: right;
        color: #961100;
        font-size: 25px;
    }
    .zone1{
        font-size: 35px;
        height:60px;
        padding: 0;
        width: 100%;
        text-align: right;
    }
    .noborder{
        border: none;
        color: #961100;;
    }
    .noborder1{
        border: none;
        color: black;
        background-color: #78ecff
    }
    .noborder2{
        border: none;
        color: black;
        background-color: #FF78AE
    }
    .border{
        border: 2px solid gainsboro;
    }
    .zone2{
        font-size: 25px;
        height:50px;
        width: 50px;
        padding: 0;
        text-align: center;
        margin-right: 15px;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button{
        -webkit-appearance: none !important;
        margin: 0;
    }

</style>