<template>
    <div class="mt-3">
        <h3 class="lesson-subheading">Experimental distribution of dice differences</h3>
        <hr class="subheading-separator">
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
            <div class="top" style="margin-top: 10px; border: none">
                <div class="row justify-content-end">
                    <div v-if="error" style="color: red; font-size: 25px; margin-top: 10px"> Enter the number of trials </div>
                </div>
                <div class="row justify-content-end">
                    <button style="margin-top: 8px;" class="btn btn-outline-success" @click="CheckError">OK</button>
                </div>
            </div>
        </div>
        <div :style="{visibility: !next ? 'hidden' : 'visible' }" class="container mt-4 mb-5">
            <div class="top" style="border: none">
                <div class="row justify-content-center">
                    <label class="col-sm-5 label1" >Number of trials: {{numberoftrials}}</label>
                    <label class="col-sm-5 label1" >{{trails}} trials</label>
                </div>
            </div>
            <div class="top" style="border: none;margin-top: 20px; min-height: 500px">
                <div class="row justify-content-center">
                    <div ref="graph" style="min-width: 600px;min-height: 350px; border: 2px solid gray;">
                        <app-bar-chart v-if="ShowGraph"
                                       :points=nums
                                       :show-y-axis="false"
                                       :width="600"
                                       :height="350"
                        ></app-bar-chart>
                    </div>
                    <div class="label2" :style="{left: positionLeft - 148 + 'px',top: positionTop + 'px'}">Tally: </div>
                    <div class="label2" :style="{left: positionLeft - 148 + 'px',top: positionTop + 50 + 'px'}">Dice Difference: </div>
                    <div v-for="i in 6" :key="i">
                        <div class="axis" :style="{left: positionLeft - 100 + 100*i + 'px', top: positionTop + 'px'}">{{nums[i-1]}}</div>
                    </div>
                    <div v-for="j in 6" :key="j+6">
                        <div class="axis1" :style="{left: positionLeft - 100 + 100*j + 'px',top: positionTop + 50 + 'px'}" v-text="j-1"></div>
                    </div>
                </div>
            </div>
            <div class="top" style="margin-top: -20px; border: none">
                <div class="row justify-content-center">
                    <div v-if="!reset">
                        <button class="btn btn-outline-success" style="margin-right: 30px" @click="playDemo" v-bind:style="{visibility: (!playDemoGame || !next) ? 'hidden' : 'visible' }">Play Demo</button>
                        <button class="btn btn-outline-success"  style="margin-right: 30px" @click="playAuto" v-if="playAutoGame">{{PlayAutoWord}}</button>
                    </div>
                    <div v-else>
                        <button class="btn btn-outline-success"  style="margin-right: 30px" @click="Reset" >Finished! Reset</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BarChart from 'pure-vue-chart';
    export default {
        data() {
            return {
                positionTop: null,
                positionLeft:null,
                numberoftrials:0,
                trails: null,
                stop:true,
                error:false,
                next:false,
                reset:false,
                playDemoGame:true,
                PlayAutoWord:"Play Auto",
                playAutoGame:true,
                nums:[0,0,0,0,0,0],
            }
        },
        watch:{
            numberoftrials(value) {
                if(value >= this.trails) {
                    this.stop = true;
                    this.reset = true;
                    this.PlayAutoWord = "Play Auto";

                }
            },
            next(value){
              if (value){
                  this.positionTop = this.$refs.graph.offsetTop + 197;
                  this.positionLeft = this.$refs.graph.getBoundingClientRect().left;
              }
            },

        },
        mounted(){
            // this.positionTop = this.$refs.graph.offsetTop + 350 + 28;
            // this.positionLeft = this.$refs.graph.getBoundingClientRect().left;
            const that = this;
            window.onresize = function temp() {
                that.positionLeft = that.$refs.graph.getBoundingClientRect().left;
                that.positionTop =  that.$refs.graph.offsetTop + 350 + 28;

            };

        },
        destroyed(){
            // window.removeEventListener("resize");
        },
        methods:{
            CheckError(){
              if (this.trails > 0) this.next = true;
              else this.error = true;
            },
            sleep: function(ms){
                return new Promise(resolve=>{
                    setTimeout(resolve,ms)
                })
            },
            playDemo(){
                this.playDemoGame = false;
                this.playAutoGame = false;
                var random1 = Math.floor(Math.random()*6)+1;
                var random2 = Math.floor(Math.random()*6)+1;
                this.numberoftrials += 1;
                this.difference = Math.abs(random1 - random2);
                this.$set(this.nums,this.difference,this.nums[this.difference] + 1);
                this.playDemoGame = true;
                this.playAutoGame = true;
            },
            playAuto:async function(){
                if(this.PlayAutoWord == "Play Auto") {
                    this.PlayAutoWord = "Pause";
                    this.playDemoGame = false;
                    var temple = await this.sleep(250);
                    this.stop = false;
                    while (!this.stop && this.numberoftrials < this.trails) {
                        if (this.trails <= 50){
                            var temple = await this.sleep(100);
                        }else if (this.trails <= 100){
                            var temple = await this.sleep(50);
                        }else if (this.trails <= 1000) {
                            var temple = await this.sleep(20);
                        }else if (this.trails <= 10000) {
                            var temple = await this.sleep(2);
                        }
                        var random1 = Math.floor(Math.random() * 6) + 1;
                        var random2 = Math.floor(Math.random() * 6) + 1;
                        this.numberoftrials += 1;
                        this.difference = Math.abs(random1 - random2);
                        this.$set(this.nums,this.difference,this.nums[this.difference] + 1);
                    }
                } else if(this.PlayAutoWord == "Pause"){
                    this.stop = true;
                    this.playDemoGame = true;
                    this.PlayAutoWord = "Play Auto";
                    this.playAutoGame = true;
                }
            },
            Reset(){
                this.numberoftrials = 0;
                this.nums=[0,0,0,0,0,0];
                this.reset = false;
                this.playDemoGame = true;
                this.PlayAutoWord = "Play Auto";
                this.playAutoGame = true;
                this.stop = true;

            },
        },
        computed:{
            ShowGraph(){
                return this.nums.reduce((a,b) => a + b) > 0;
            }
        },
        components: {
            appBarChart: BarChart,
        },
        name: "Experimental"
    }
</script>

<style scoped>
    .label1{
        text-align: right;
        color: #610214;
        font-size: 22px;
    }
    .roll1{
        margin-top: 5px;
        text-align: right;
        font-weight: bold;
        min-width: 150px;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button{
        -webkit-appearance: none !important;
        margin: 0;
    }
    .top{
        max-width: 800px;
        margin: 0 auto;
        border: 2px solid gainsboro;
    }

    .label2{
        font-size: 18px;
        position: absolute;
        text-align: right;
        height: 30px;
        border:none;
        color: #0094c5;
        width: 135px;
    }
    .axis{
        font-size: 18px;
        position: absolute;
        width: 98px;
        height: 30px;
        border: 1px solid gray;
        text-align: center;
        margin-right: 3px;
    }
    .axis1{
        font-size: 18px;
        position: absolute;
        width: 98px;
        height: 30px;
        text-align: center;
        margin-right: 3px;
        color: brown;
    }
</style>