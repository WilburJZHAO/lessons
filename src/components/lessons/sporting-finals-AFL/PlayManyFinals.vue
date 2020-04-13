<template>
    <div>
        <transition appear appear-class="app-appear" appear-active-class="app-appear-active">
            <div class="container mt-3 mb-5">
                <h3 class="lesson-subheading">Play many finals</h3>
                <hr class="subheading-separator">
                <div class="row">
                    <!-- Left part -->
                    <div class="col-12 col-md-6 app--lesson-left">
                        <div>
                            <div class="app--lesson-action">
                                <div>
                                <h5 class="text-success" >
                                    Enter the number of trials:<input v-model="numberOfTiles" placeholder="number" class="input-group" v-bind:disabled="disableInput">
                                </h5>
                                    <h6 class="text-success">Range is 1 to 16000</h6>
                                    <div v-if="appear">
                                        <button class="btn btn-outline-success" style="margin-right: 30px" @click="oneTrial" v-if="playDemoGame">Play Demo</button>

                                        <button class="btn btn-outline-success"  v-if="playAutoGame" @click="playAuto">{{AutoWord}}</button>
                                    </div>
                                    <div v-else>
                                        <button class="btn btn-outline-success" @click="submitTrials">OK</button>
                                    </div>
                                    <br>
                                    <div class="alert alert-danger" v-if="alert">{{alertWords}}</div>
                                </div>





                            </div>

                            <div class="tt--solutions mb-5" style="padding-bottom: 30px">

                                <div class="mr-3 tt--solutions-count" >


                                </div>
                            </div>
                            <div>

                            </div>


                        </div>
                    </div>

                    <!-- Right part -->
                    <div class="col-12 col-md-6 app--lesson-right" style="overflow: visible;">
                        <div class="tt-right-box"></div>
                        <div>

                            <table>
                                <tbody>
                                <tr>
                                <tr>
                                    <td class="originalTB">
                                        {{team1}}
                                    </td>
                                    <td ><div class="changedTB">
                                        {{team1T}}</div>
                                    </td>
                                    <td>
                                    <div class="changedTB">
                                        {{team1P}}%
                                    </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="originalTB">
                                        {{team2}}
                                    </td>
                                    <td ><div class="changedTB">
                                        {{team2T}}</div>
                                    </td>
                                    <td>
                                        <div class="changedTB">
                                            {{team2P}}%
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="originalTB">
                                        {{team3}}
                                    </td>
                                    <td ><div class="changedTB">
                                        {{team3T}}</div>
                                    </td>
                                    <td>
                                        <div class="changedTB">
                                            {{team3P}}%
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="originalTB">
                                        {{team4}}
                                    </td>
                                    <td ><div class="changedTB">
                                        {{team4T}}</div>
                                    </td>
                                    <td>
                                        <div class="changedTB">
                                            {{team4P}}%
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="originalTB">
                                        {{team5}}
                                    </td>
                                    <td ><div class="changedTB">
                                        {{team5T}}</div>
                                    </td>
                                    <td>
                                        <div class="changedTB">
                                            {{team5P}}%
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="originalTB">
                                        {{team6}}
                                    </td>
                                    <td ><div class="changedTB">
                                        {{team6T}}</div>
                                    </td>
                                    <td>
                                        <div class="changedTB">
                                            {{team6P}}%
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="originalTB">
                                        {{team7}}
                                    </td>
                                    <td ><div class="changedTB">
                                        {{team7T}}</div>
                                    </td>
                                    <td>
                                        <div class="changedTB">
                                            {{team7P}}%
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="originalTB">
                                        {{team8}}
                                    </td>
                                    <td ><div class="changedTB">
                                        {{team8T}}</div>
                                    </td>
                                    <td>
                                        <div class="changedTB">
                                            {{team8P}}%
                                        </div>
                                    </td>
                                </tr>
                                <tr v-if="appear">
                                    <td class="originalTB">{{numberOfTiles}} trials</td>

                                    <td><div class="changedTwo">Total</div></td>
                                    <td><div class="changedTB">{{totalCount}}</div></td>
                                </tr>

                                </tbody>
                            </table>
                            <div v-if="appear">
                            {{advantages}}% advantages</div>


                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import global from "./EnterTeams"
    import pickedGlobal from "./PercentageAdvantage"
    export default {
        name: "PlayManyFinals",
        data:function () {
            return{
                appear: false,
                disappear: true,
                numberOfTiles:"",
                alert : false,
                alertWords:"Please enter the number of trials(1 to 16000)",
                playAutoGame:true,
                playDemoGame : true,

                team1:"",
                team1T:0,
                team1P:0,
                team2:"",
                team2T:0,
                team2P:0,
                team3:"",
                team3T:0,
                team3P:0,
                team4:"",
                team4T:0,
                team4P:0,
                team5:"",
                team5T:0,
                team5P:0,
                team6:"",
                team6T:0,
                team6P:0,
                team7:"",
                team7T:0,
                team7P:0,
                team8:"",
                team8T:0,
                team8P:0,
                totalCount:0,

                AutoWord:"Play Auto",

                content1:"",
                content2:"",
                content3:"",
                content4:"",
                content5:"",
                content6:"",
                content7:"",
                content8:"",
                content9:"",
                content10:"",
                content11:"",

                disableInput:false,

                count :0,

                advantages:pickedGlobal.methods.returnPicked(),

                pause: false,




            }

        },
        mounted: function(){
            var teams = global.methods.returnFinalTeam()
            this.team1 = teams[0]
            this.team2 = teams[1]
            this.team3 = teams[2]
            this.team4 = teams[3]
            this.team5 = teams[4]
            this.team6 = teams[5]
            this.team7 = teams[6]
            this.team8 = teams[7]

        },
        methods:{
            submitTrials: function () {
                if(isNaN(this.numberOfTiles)==true){
                    this.alert = true
                }else{
                    if(this.numberOfTiles*1>16000||this.numberOfTiles<1){
                        this.alert = true
                    }else{
                        this.appear = true
                        this.disappear = false
                        this.AutoWord = "Play Auto"
                        this.disableInput = true
                    }
                }
            },
            playAuto:async function(){
                if(this.AutoWord=="Play Auto") {
                    this.pause = false
                    this.AutoWord = "Pause"
                    var sleepNumber = 1 / this.numberOfTiles * 5000
                    if(sleepNumber>250){
                        sleepNumber = 250
                    }
                    while (this.totalCount < this.numberOfTiles) {
                        if(this.pause == true)
                            break;

                        var temple = await this.sleep(sleepNumber);
                        this.oneTrial()
                    }
                    if(this.totalCount==this.numberOfTiles){
                        this.AutoWord = "Reset"
                        this.playDemoGame = false
                    }
                }
                else if(this.AutoWord=="Pause"){
                    this.pause = true
                    this.AutoWord = "Play Auto"
                }
                else if(this.AutoWord=="Reset"){
                    this.reset()
                }
            },
            reset:function(){
                this.appear = false;
                this.disappear= true;
                this.numberOfTiles = "";
                this.alert = false;
                this.alertWords= "Please enter the number of trials(1 to 16000)";
                this.playAutoGame= true;
                this.playDemoGame = true;
                this.team1= "";
                this.team1T=0;
                this.team1P=0;
                this.team2= "";
                this.team2T= 0;
                this.team2P= 0;
                this.team3="";
                this.team3T=0;
                this.team3P = 0;
                this.team4="";
                this.team4T=0;
                this.team4P=0;
                this.team5="";
                this.team5T=0;
                this.team5P=0;
                this.team6="";
                this.team6T=0;
                this.team6P=0;
                this.team7="";
                this.team7T=0;
                this.team7P=0;
                this.team8="";
                this.team8T=0;
                this.team8P=0;
                this.totalCount=0;

                this.AutoWord="Play Auto";

                this.content1="";
                this.content2="";
                this.content3="";
                this.content4="";
                this.content5="";
                this.content6="";
                this.content7="";
                this.content8="";
                this.content9="";
                this.content10="";
                this.content11="";

                this.disableInput=false;

                this.count = 0;

                this.advantages = pickedGlobal.methods.returnPicked();

                this.pause = false;

            },
            sleep: function(ms){
                return new Promise(resolve=>{
                    setTimeout(resolve,ms)
                })
            },
            playDemo:function () {
                var switcher;
                if(this.count==0){
                    switcher = this.randomTwoNumbers(1,4)
                    if (switcher==true){
                        this.content1 = 4
                        this.content5 = 1

                    }else if(switcher==false) {
                        this.content5 = 4
                        this.content1 = 1

                    }
                }else if(this.count==1){
                    switcher =this.randomTwoNumbers(2,3)

                    if (switcher==true){
                        this.content3 = 3
                        this.content7 = 2
                    }else {
                        this.content7 = 3
                        this.content3 = 2
                    }
                }else if(this.count==2){
                    switcher = this.randomTwoNumbers(5,8)
                    if(switcher==true){
                        this.content2 = 5
                    }else {
                        this.content2 = 8
                    }

                }else if(this.count==3){
                    switcher =this.randomTwoNumbers(6,7)
                    if(switcher==true){
                        this.content4 = 6
                    }else{
                        this.content4 = 7
                    }
                }else if(this.count==4){

                    switcher =this.randomTwoNumbers(this.content1,this.content2)
                    if(switcher==true){
                        this.content8 = this.content1


                    }else {
                        this.content8 = this.content2
                    }
                }else if(this.count ==5){
                    switcher =this.randomTwoNumbers(this.content3,this.content4)
                    if(switcher==true){
                        this.content6 = this.content3

                    }else {
                        this.content6 = this.content4

                    }
                }else if(this.count==6){

                    switcher =this.randomTwoNumbers(this.content5,this.content6)
                    if(switcher==true){
                        this.content9 = this.content5
                    }else {
                        this.content9 = this.content6
                    }

                }else if(this.count == 7){
                    switcher =this.randomTwoNumbers(this.content7,this.content8)
                    if(switcher==true){
                        this.content10 = this.content7
                    }else {
                        this.content10 = this.content8
                    }

                }else if(this.count==8){
                    switcher =this.randomTwoNumbers(this.content9,this.content10)
                    if(switcher==true){
                        this.content11 = this.content9
                    }else {
                        this.content11 = this.content10
                    }

                    this.calculateAll(this.content11)

                }
                this.count++


            },
            oneTrial: function(){

                while(this.count<=8){

                    this.playDemo()
                }

                this.count = 0
            },
            calculateAll:function(i){

                this.totalCount ++;


                if(i==1){
                    this.team1T ++;
                }else if(i==2){
                    this.team2T++;
                }else if(i==3){
                    this.team3T++;
                }else if(i==4){
                    this.team4T++;
                }else if(i==5){
                    this.team5T++;
                }else if(i==6){
                    this.team6T++;
                }else if(i==7){
                    this.team7T++;
                }else if(i==8){
                    this.team8T++;
                }
                this.team1P = ((this.team1T/this.totalCount)*100).toFixed(2)
                this.team2P =((this.team2T/this.totalCount)*100).toFixed(2)
                this.team3P =((this.team3T/this.totalCount)*100).toFixed(2)
                this.team4P =((this.team4T/this.totalCount)*100).toFixed(2)
                this.team5P =((this.team5T/this.totalCount)*100).toFixed(2)
                this.team6P =((this.team6T/this.totalCount)*100).toFixed(2)
                this.team7P =((this.team7T/this.totalCount)*100).toFixed(2)
                this.team8P =((this.team8T/this.totalCount)*100).toFixed(2)



            },
            randomTwoNumbers: function (i,j) {
                var pickedRatio = pickedGlobal.methods.returnPicked()
                var finalRatio =((i-j)*pickedRatio/100)/2

                var random1 = Math.random()


                return random1>0.5+finalRatio
            },

        }
    }
</script>

<style scoped>
    .inp :focus, .inp :focus input{
        background: #eeeeee;
        outline: none;

    }
    .inp :hover{
        background-color:#eeeeee;

    }
    .app--lesson-action input{
        -webkit-appearance: none;
        width: 80%;
        border: 0;
        font-family: inherit;
        padding: 12px 0;
        height: 30px;
        font-size: 16px;
        font-weight: 500;
        border-bottom: 2px solid #C8CCD4;
        background: none;
        border-radius: 0;
        color: #223254;
        transition: all .15s ease;
    }
    .originalTB{
        color: #CC3333;
        width: 130px;
        height: 50px;
        text-align: center;
        font-weight: bold;
    }
    .changedTB{
        border:black solid 1px;
        width: 80px;
        height: 50px;
        margin: 5px;
        text-align: center;
    }
    .changedTwo{
        padding-top:11px;
        width: 80px;
        height: 50px;
        margin: 5px;
        text-align: center;
        border:white solid 1px;
    }

</style>