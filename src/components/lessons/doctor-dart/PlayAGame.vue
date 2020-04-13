<template>
    <div>
        <div class="container mt-4 mb-5">
        <h3 class="lesson-subheading">Play one game</h3>
        <hr class="subheading-separator">
            <div class="row">
                <div class="col-12 col-md-6">
                    <div v-if="IsOk" class="row tips" >Can you score {{score}} ?</div>
                    <div v-if="IsOk">
                        <div class="row">
                            <div class="square n9" :class="{Hidden1: AvailableNums.includes(1)}" @click="SelectNums(9,1)">9</div>
                            <div class="square n11" :class="{Hidden1: AvailableNums.includes(2)}" @click="SelectNums(11,2)">11</div>
                            <div class="square n8" :class="{Hidden1: AvailableNums.includes(3)}" @click="SelectNums(8,3)">8</div>
                        </div>

                        <div class="row">
                            <div class="square n11" :class="{Hidden1: AvailableNums.includes(4)}" @click="SelectNums(11,4)">11</div>
                            <div class="square n8" :class="{Hidden1: AvailableNums.includes(5)}" @click="SelectNums(8,5)">8</div>
                            <div class="square n10" :class="{Hidden1: AvailableNums.includes(6)}" @click="SelectNums(10,6)">10</div>
                        </div>
                        <div class="row">
                            <div class="square n8" :class="{Hidden1: AvailableNums.includes(7)}" @click="SelectNums(8,7)">8</div>
                            <div class="square n10" :class="{Hidden1: AvailableNums.includes(8)}" @click="SelectNums(10,8)">10</div>
                            <div class="square n9" :class="{Hidden1: AvailableNums.includes(9)}" @click="SelectNums(9,9)">9</div>
                        </div>
                        <button style="margin-top: 20px; margin-left: 210px" class="btn btn-outline-success" @click="Reset">Reset</button>
                    </div>
                    <div v-else>
                        <div class="row">
                            <div class="square n9" >9</div>
                            <div class="square n11" >11</div>
                            <div class="square n8">8</div>
                        </div>

                        <div class="row">
                            <div class="square n11" >11</div>
                            <div class="square n8" >8</div>
                            <div class="square n10">10</div>
                        </div>
                        <div class="row">
                            <div class="square n8" >8</div>
                            <div class="square n10">10</div>
                            <div class="square n9">9</div>
                        </div>
                    </div>

                </div>

                <div class="col-12 col-md-6">
                    <div v-if="IsOk===false">
                        <form @submit.prevent="handleInput">
                            <div class="form-group">
                                <label for="length-input" class="col" style="font-size: 25px; margin-bottom: 20px">Enter target score(1-99)</label>
                                <div class="col-sm-7">
                                    <input
                                            type="number"
                                            id="length-input"
                                            class="form-control"
                                            min="1"
                                            max="99"
                                            required
                                            v-model="score"
                                    >
                                </div>
                                <div class="form-action text-center">
                                    <button style="margin-top: 35px;" class="btn btn-outline-success" type="submit">OK</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div v-else>
                        <div class="row" style="font-size: 25px; margin-bottom: 50px;"> Attempt {{Attempt}}</div>
                        <div class="row block1">
                            <label class="col-sm-3 label1">1 x 1st</label>
                            <input disabled class="col-sm-2" style="margin-right: 5px; text-align: center;color: red; font-size: 25px;" v-model="SelectedNums[0]">
                            <input disabled class="col-sm-2" style="text-align: center;font-size: 25px;" :value="SelectedNums[0]*1 || null">
                        </div>
                        <div class="row block1">
                            <label class="col-sm-3 label1">2 x 2nd</label>
                            <input disabled class="col-sm-2 " style="margin-right: 5px;text-align: center;color: red;font-size: 25px;" v-model="SelectedNums[1]">
                            <input disabled class="col-sm-2 " style="text-align: center;font-size: 25px;" :value="SelectedNums[1]*2 || null">
                        </div>
                        <div class="row block1">
                            <label class="col-sm-3 label1">3 x 3rd</label>
                            <input disabled class="col-sm-2 " style="margin-right: 5px;text-align: center;color: red;font-size: 25px;" v-model="SelectedNums[2]">
                            <input disabled class="col-sm-2 " style="text-align: center;font-size: 25px;" :value="SelectedNums[2]*3 || null">
                        </div>
                        <div class="row block1">
                            <label class="col-sm-3 label1"></label>
                            <label class="col-sm-2 label1" style="margin-right: 5px">Score</label>
                            <input  disabled class="col-sm-2 " style="text-align: center;font-size: 25px;" :value="(SelectedNums[0]*1 + SelectedNums[1]*2 + SelectedNums[2]*3) || null">
                        </div>
                        <div v-if="Prompt" style="color: red; font-size: 25px; margin-top: 40px" @click="GoBack" v-text="ShowPrompt"></div>

                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                IsOk:false,
                score: null,
                isInputting: true,
                AvailableNums:[],
                SelectedNums:[],
                Attempt: 1,
                Prompt: false,
                Reached: false,
            }
        },
        methods:{
            Reset(){
                if (this.SelectedNums.length > 0){
                    this.SelectedNums = [];
                    this.AvailableNums = [];
                    this.Prompt = false;
                    this.Attempt += 1;
                }
            },
            handleInput() {
                this.IsOk = true;
                this.isInputting = false;
            },
            SelectNums(num,index){
                if (this.SelectedNums.length < 3) {
                    if ([1,2,3].includes(index) || this.AvailableNums.includes(index - 3)){
                        this.AvailableNums.push(index);
                        this.SelectedNums.push(num);
                    }
                    if (this.SelectedNums.length === 3) {
                        this.Prompt = true;
                    }
                }
            },
            GoBack(){
                if (this.score == this.SelectedNums[0]*1 + this.SelectedNums[1]*2 + this.SelectedNums[2]*3){
                    this.IsOk = false;
                    this.score = null;
                    this.isInputting = true;
                    this.AvailableNums = [];
                    this.SelectedNums = [];
                    this.Attempt = 1;
                    this.Prompt = false;
                    this.Reached = false;
                }

            },
        },
        computed:{
            ShowPrompt(){
                if (this.score < this.SelectedNums[0]*1 + this.SelectedNums[1]*2 + this.SelectedNums[2]*3){
                    return "The tally is too big. Click on the reset button for a new attempt."
                }else if (this.score > this.SelectedNums[0]*1 + this.SelectedNums[1]*2 + this.SelectedNums[2]*3){
                    return "The tally is too small. Click on the reset button for a new attempt."
                }else{
                    this.Reached = true;
                    return "Target reached !  New target ";
                }
            },
        },
        name: "PlayAGame"
    }
</script>

<style scoped>
    .square {
        font-size: 44px;
        width: 99px;
        height: 99px;
        margin: 2px;
        text-align:center;
        line-height:95px;
        border: 2px solid gainsboro;
    }
    .label1{
        font-size: 25px;
    }
    .block1{
       text-align:right;
        margin-bottom: 10px;
    }
    .tips{
       font-size: 25px;
        margin-bottom: 10px;
    }
    .n9{
        background-color: cornflowerblue;
    }
    .n11{
        background-color: coral;
    }
    .n10{
        background-color: fuchsia;
    }
    .n8{
        background-color: #ecd717;
    }
    .Hidden1{
        visibility: hidden;
    }
</style>