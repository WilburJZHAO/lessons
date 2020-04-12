<template>
    <div>
        <transition appear appear-class="app-appear" appear-active-class="app-appear-active">
            <div class="container mt-3 mb-5">
                <h3 class="lesson-subheading">Play finals</h3>
                <hr class="subheading-separator">
                <div class="row">
                    <!-- Left part -->
                    <div class="col-12 col-md-6 app--lesson-left">
                        <div>





                            <div class="app--lesson-action">
                                <table>
                                    <tbody>
                                    <tr>
                                        <td v-bind:class="td1">1</td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                    </tr>
                                    <tr>
                                        <td v-bind:class="td2">4</td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                    </tr>
                                    <tr>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td v-bind:class="td3">{{content1}}</td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                    </tr>
                                    <tr>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td v-bind:class="td4">{{content2}}</td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                    </tr>
                                    <tr>
                                        <td v-bind:class="td5">2</td>
                                        <td class="disappear"></td>
                                        <td class="disappear" ></td>
                                        <td class="disappear"></td>
                                        <td v-bind:class="td15">{{content5}}</td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                    </tr>
                                    <tr>
                                        <td v-bind:class="td6">3</td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td v-bind:class="td16">{{content6}}</td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                    </tr>
                                    <tr>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td ></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td v-bind:class="td19">{{content9}}</td>
                                        <td></td>
                                        <td v-bind:class="td21" style="border-bottom: white">{{content11}}</td>
                                    </tr>
                                    <tr>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td ></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td v-bind:class="td20">{{content10}}</td>
                                        <td></td>
                                        <td v-bind:class="td21" style="border-top: white">{{content12}}</td>
                                    </tr>
                                    <tr>
                                        <td v-bind:class="td9">5</td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td v-bind:class="td17">{{content7}}</td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                    </tr>
                                    <tr>
                                        <td v-bind:class="td10">8</td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td v-bind:class="td18">{{content8}}</td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                    </tr>
                                    <tr>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td v-bind:class="td11">{{content3}}</td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                    </tr>
                                    <tr>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td v-bind:class="td12">{{content4}}</td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                    </tr>
                                    <tr>
                                        <td v-bind:class="td13">6</td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                    </tr>
                                    <tr>
                                        <td v-bind:class="td14">7</td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                        <td class="disappear"></td>
                                    </tr>


                                    </tbody>
                                </table>


                            </div>
                            <div class="tt--solutions mb-5" style="padding-bottom: 30px">

                                <div class="mr-3 tt--solutions-count">
                                    <button class="btn btn-outline-success" style="margin-right: 30px" @click="playDemo" v-if="playDemoGame">Play Demo</button>

                                    <button class="btn btn-outline-success" @click="playAuto" v-if="playAutoGame">{{PlayAutoWord}}</button>

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
                            <p v-if="appear">
                                <span style="font-size: 115%;" class="badge badge-dark">{{ vs1 }}</span> vs  <span style="font-size: 115%;" class="badge badge-dark">{{vs2}}</span>
                            </p>
                            <div class="row" style="height: 70px;width: 350px;">
                                <div v-html="diceOne" style="margin-right: 100px;margin-left: 15px;" v-bind:class="diceOneClass"></div>
                                <div v-html="diceTwo"></div>
                            </div>
                            <div class="row" style="height: 40px;width: 350px;">
                                <div v-html="diceThree" style="margin-right: 100px;margin-left: 15px;"></div>
                                <div v-html="diceFour"></div>
                            </div>

                            <table style="width: 350px;">
                                <tbody>
                                <tr v-bind:class="teamC1">
                                    <td>1</td>
                                    <td>{{team1}}</td>
                                    <td>{{win1}}</td>
                                </tr>
                                <tr v-bind:class="teamC2">
                                    <td>2</td>
                                    <td>{{team2}}</td>
                                    <td>{{win2}}</td>
                                </tr>
                                <tr v-bind:class="teamC3">
                                    <td>3</td>
                                    <td>{{team3}}</td>
                                    <td>{{win3}}</td>
                                </tr>
                                <tr v-bind:class="teamC4">
                                    <td>4</td>
                                    <td>{{team4}}</td>
                                    <td>{{win4}}</td>

                                </tr>
                                <tr v-bind:class="teamC5">
                                    <td>5</td>
                                    <td>{{team5}}</td>
                                    <td>{{win5}}</td>

                                </tr>
                                <tr  v-bind:class="teamC6">
                                    <td>6</td>
                                    <td>{{team6}}</td>
                                    <td>{{win6}}</td>

                                </tr>
                                <tr v-bind:class="teamC7">
                                    <td>7</td>
                                    <td>{{team7}}</td>
                                    <td>{{win7}}</td>

                                </tr>
                                <tr v-bind:class="teamC8">
                                    <td>8</td>
                                    <td>{{team8}}</td>
                                    <td>{{win8}}</td>

                                </tr>
                                </tbody>
                            </table>
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
        name: "PlayFinals",
        data:function () {
            return{
                td1: "appear",
                td2: "appear",
                td3:"appear",
                td4:"appear",
                td5: "appear",
                td6: "appear",
                td7:"appear",
                td8:"appear",
                td9: "appear",
                td10: "appear",
                td11:"appear",
                td12:"appear",
                td13: "appear",
                td14:"appear",
                td15:"appear",
                td16: "appear",
                td17: "appear",
                td18:"appear",
                td19:"appear",
                td20:"appear",
                td21:"appear",

                count:0,

                vs1:"",
                vs2:"",

                resTeam1:[],
                resTeam2:[],
                resTeam3:[],

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
                content12:"",


                team1:"",
                team2:"",
                team3:"",
                team4:"",
                team5:"",
                team6:"",
                team7:"",
                team8:"",

                teamC1:"teamStyle",
                teamC2:"teamStyle",
                teamC3:"teamStyle",
                teamC4:"teamStyle",
                teamC5:"teamStyle",
                teamC6:"teamStyle",
                teamC7:"teamStyle",
                teamC8:"teamStyle",

                appear : false,
                playDemoGame:true,
                playAutoGame:true,

                diceOne:"",
                diceTwo:"",
                diceThree:"",
                diceFour:"",

                PlayAutoWord:"Play Auto",
                pause: false,

                win1:"",
                win2:"",
                win3:"",
                win4:"",
                win5:"",
                win6:"",
                win7:"",
                win8:"",


            }

        },
        mounted:function(){
            var finalTeam = global.methods.returnFinalTeam()
            this.team1 = finalTeam[0]
            this.team2 = finalTeam[1]
            this.team3 = finalTeam[2]
            this.team4 = finalTeam[3]
            this.team5 = finalTeam[4]
            this.team6 = finalTeam[5]
            this.team7 = finalTeam[6]
            this.team8 = finalTeam[7]

        },
        methods:{
            reset:function(){
                this.td1= "appear";
                this.td2= "appear";
                this.td3= "appear";
                this.td4= "appear";
                this.td5= "appear";
                this.td6= "appear";
                this.td7= "appear";
                this.td8= "appear";
                this.td9= "appear";
                this.td10= "appear";
                this.td11= "appear";
                this.td12= "appear";
                this.td13= "appear";
                this.td14= "appear";
                this.td15= "appear";
                this.td16= "appear";
                this.td17= "appear";
                this.td18 = "appear";
                this.td19= "appear";
                this.td20= "appear";
                this.td21= "appear";

                this.count = 0;


                this.vs1 = "";
                this.vs2 = "";



                this.content1 = "";
                this.content2="";
                this.content3 = "";
                this.content4="";
                this.content5 = "";
                this.content6="";
                this.content7 = "";
                this.content8="";
                this.content9 = "";
                this.content10="";
                this.content11= "";
                this.content12="";


                this.team1 = "";
                this.team2 = "";
                this.team3 = "";
                this.team4 = "";
                this.team5 = "";
                this.team6 = "";
                this.team7 = "";
                this.team8 = "";

                this.teamC1 ="teamStyle";
                this.teamC2 ="teamStyle";
                this.teamC3 ="teamStyle";
                this.teamC4 ="teamStyle";
                this.teamC5 ="teamStyle";
                this.teamC6 ="teamStyle";
                this.teamC7 ="teamStyle";
                this.teamC8 ="teamStyle";

                this.appear = false;
                this.playDemoGame = true;
                this.playAutoGame = true;

                this.diceOne = "";
                this.diceTwo = "";

                this.PlayAutoWord = "Play Auto";
                this.pause= false;

                this.diceOneClass = "diceOneClass"
            },
            sleep: function(ms){
                return new Promise(resolve=>{
                    setTimeout(resolve,ms)
                })
            },

            playDemo:async function () {
                if(this.PlayAutoWord=="Play Auto")
                {this.PlayAutoGame = false;}

                var finalTeam = global.finalTeam
                var switcher;
                if(this.count==0){
                    this.diceOne = ""
                    this.diceTwo = ""
                    this.appear = true
                    switcher = await this.randomTwoNumbers(finalTeam[0],finalTeam[3],0,3)

                    if (switcher==true){
                        this.td1="appear green colorOne"
                        this.td2 = "appear red colorTwo"
                        this.content1 = 4
                        this.content5 = 1
                        this.td3 = "appear colorTwo"
                        this.td15 = "appear colorOne"



                    }else if(switcher==false) {
                        this.td2="appear green colorTwo"
                        this.td1 = "appear red colorOne "
                        this.content5 = 4
                        this.content1 = 1
                        this.td15 = "appear colorTwo"
                        this.td3 = "appear colorOne"

                    }
                }else if(this.count==1){
                    this.diceOne = ""
                    this.diceTwo = ""
                    switcher =await this.randomTwoNumbers(finalTeam[1],finalTeam[2],1,2)

                    if (switcher==true){


                        this.td5 = "appear green colorThree"
                        this.td6 = "appear red colorFour"
                        this.content3 = 3
                        this.content7 = 2
                        this.td11 = "appear colorFour"
                        this.td17 = "appear colorThree"


                    }else {
                        this.td6 = "appear green colorFour"
                        this.td5 = "appear red colorThree"
                        this.content7 = 3
                        this.content3 = 2
                        this.td11 = "appear colorThree"
                        this.td17 = "appear colorFour"

                    }
                }else if(this.count==2){
                    this.diceOne = ""
                    this.diceTwo = ""
                    switcher = await this.randomTwoNumbers(finalTeam[4],finalTeam[7],4,7)
                    if(switcher==true){
                        this.td9 = "appear green colorFive"
                        this.td10 = "appear kickOut colorSix"
                        this.content2 = 5
                        this.teamC8 = "teamStyle kickOut"
                        this.td4 = "appear colorFive"
                    }else {
                        this.td10 = "appear green colorSix"
                        this.td9 = "appear kickOut colorFive"
                        this.content2 = 8
                        this.teamC5 = "teamStyle kickOut"
                        this.td4 = "appear colorSix"

                    }

                }else if(this.count==3){
                    this.diceOne = ""
                    this.diceTwo = ""
                    switcher =await this.randomTwoNumbers(finalTeam[5],finalTeam[6],5,6)
                    if(switcher==true){
                        this.td13 = "appear green colorSeven"
                        this.td14 = "appear kickOut colorEight"
                        this.content4 = 6
                        this.teamC7 = "teamStyle kickOut"
                        this.td12 = "appear colorSeven"
                    }else{
                        this.td14 = "appear green colorEight"
                        this.td13 = "appear kickOut colorSeven"
                        this.content4 = 7
                        this.teamC6 = "teamStyle kickOut"
                        this.td12 = "appear colorEight"

                    }
                }else if(this.count==4){
                    this.diceOne = ""
                    this.diceTwo = ""
                    var a = this.content1
                    var b = this.content2
                    switcher =await this.randomTwoNumbers(finalTeam[a-1],finalTeam[b-1],a-1,b-1)
                    if(switcher==true){
                        this.content8 = this.content1

                        this.kickOutTeam(b)
                        this.td3 += " green"
                        this.td4 += " kickOut"

                    }else {
                        this.content8 = this.content2
                        this.kickOutTeam(a)
                        this.td4 += " green"
                        this.td3 += " kickOut"
                    }
                    if(this.content8==1){
                        this.td18 = "appear colorOne"
                    }
                    else if(this.content8==4){
                        this.td18 = "appear colorTwo"
                    }else if(this.content8 ==5){
                        this.td18 = "appear colorFive"
                    }
                    else if(this.content8 ==8){
                        this.td18 = "appear colorSix"

                    }
                }else if(this.count ==5){
                    this.diceOne = ""
                    this.diceTwo = ""
                    var a = this.content3
                    var b = this.content4
                    switcher =await this.randomTwoNumbers(finalTeam[a-1],finalTeam[b-1],a-1,b-1)
                    if(switcher==true){
                        this.content6 = this.content3
                        this.td11 += " green"
                        this.td12 += " kickOut"
                        this.kickOutTeam(b)

                    }else {
                        this.kickOutTeam(a)

                        this.content6 = this.content4
                        this.td12 += " green"
                        this.td11 += " kickOut"
                    }
                    if(this.content6==2){
                        this.td16 = "appear colorThree"
                    }
                    else if(this.content6==3){
                        this.td16 = "appear colorFour"
                    }else if(this.content6 ==6){
                        this.td16 = "appear colorSeven"
                    }
                    else if(this.content6 ==7){
                        this.td16 = "appear colorEight"

                    }
                }else if(this.count==6){
                    this.diceOne = ""
                    this.diceTwo = ""
                    var a = this.content5
                    var b = this.content6
                    switcher =await this.randomTwoNumbers(finalTeam[a-1],finalTeam[b-1],a-1,b-1)
                    if(switcher==true){
                        this.kickOutTeam(b)

                        this.content9 = this.content5
                        this.td15 += " green"
                        this.td16 += " kickOut"
                    }else {
                        this.kickOutTeam(a)

                        this.content9 = this.content6
                        this.td16 += " green"
                        this.td15 += " kickOut"
                    }
                    if(this.content9==1){
                        this.td19 = "appear colorOne"
                    }
                    else if(this.content9==4){
                        this.td19 = "appear colorTwo"
                    }else if(this.content9 ==5){
                        this.td19 = "appear colorFive"
                    }
                    else if(this.content9 ==8){
                        this.td19 = "appear colorSix"
                    }else if(this.content9==2){
                        this.td19 = "appear colorThree"
                    }
                    else if(this.content9==3){
                        this.td19= "appear colorFour"
                    }else if(this.content9 ==6){
                        this.td19 = "appear colorSeven"
                    }
                    else if(this.content9 ==7){
                        this.td19 = "appear colorEight"

                    }

                }else if(this.count == 7){
                    this.diceOne = ""
                    this.diceTwo = ""
                    var a = this.content7
                    var b = this.content8
                    switcher =await this.randomTwoNumbers(finalTeam[a-1],finalTeam[b-1],a-1,b-1)
                    if(switcher==true){
                        this.kickOutTeam(b)

                        this.content10 = this.content7
                        this.td17 = "appear green"
                        this.td18 = "appear kickOut"
                    }else {
                        this.kickOutTeam(a)

                        this.content10 = this.content8
                        this.td18 = "appear green"
                        this.td17 = "appear kickOut"
                    }
                    if(this.content10==1){
                        this.td20 = "appear colorOne"
                    }
                    else if(this.content10==4){
                        this.td20 = "appear colorTwo"
                    }else if(this.content10 ==5){
                        this.td20 = "appear colorFive"
                    }
                    else if(this.content10 ==8){
                        this.td20 = "appear colorSix"
                    }else if(this.content10==2){
                        this.td20 = "appear colorThree"
                    }
                    else if(this.content10==3){
                        this.td20= "appear colorFour"
                    }else if(this.content10 ==6){
                        this.td20 = "appear colorSeven"
                    }
                    else if(this.content10 ==7){
                        this.td20 = "appear colorEight"

                    }


                }else if(this.count==8){
                    this.diceOne = ""
                    this.diceTwo = ""
                    var a = this.content9
                    var b = this.content10
                    switcher =await this.randomTwoNumbers(finalTeam[a-1],finalTeam[b-1],a-1,b-1)
                    if(switcher==true){
                        this.kickOutTeam(b)
                        this.TeamWins(a)

                        this.content11 = this.content9
                        this.td19 += " green"
                        this.td20 += " kickOut"
                    }else {
                        this.kickOutTeam(a)
                        this.TeamWins(b)

                        this.content11 = this.content10
                        this.td20 += " green"
                        this.td19 += " kickOut"
                    }
                    if(this.content11==1){
                        this.td21 = "appear colorOne"
                    }
                    else if(this.content11==4){
                        this.td21 = "appear colorTwo"
                    }else if(this.content11 ==5){
                        this.td21 = "appear colorFive"
                    }
                    else if(this.content11 ==8){
                        this.td21 = "appear colorSix"
                    }else if(this.content11==2){
                        this.td21 = "appear colorThree"
                    }
                    else if(this.content11==3){
                        this.td21= "appear colorFour"
                    }else if(this.content11 ==6){
                        this.td21 = "appear colorSeven"
                    }
                    else if(this.content11 ==7){
                        this.td21 = "appear colorEight"

                    }

                    this.content12 = "wins"
                    this.playAutoWord = "reset"

                    this.playDemoGame = false
                }else if(this.count==9){


                }
                this.playAutoGame = true
                this.count++


            },
            playAuto:async function(){
                if(this.PlayAutoWord=="Play Auto") {
                    this.pause = false
                    this.PlayAutoWord = "Pause"
                    //this.playDemoGame = false
                    while (this.count <= 8) {
                        if(this.pause == true){break;}
                        var temple = await this.sleep(1500);
                        this.playDemo()
                    }
                    if(this.count>=8){
                        this.playAutoWord = "reset"

                        this.playDemoGame = false
                    }

                }
                else if(this.PlayAutoWord =="Pause"){
                    this.PlayAutoWord = "Play Auto";
                    this.pause = true
                }
                else if(this.PlayAutoWord == "reset"){
                    this.reset()
                }
            },
            randomTwoNumbers: async function (teamName1, teamName2,i,j) {
                this.playDemoGame = false
                this.PlayAutoGame = false
                this.diceThree = ""
                this.diceFour = ""

                this.vs1 = teamName1
                this.vs2 = teamName2
                var random1 = 0;
                var random2 = 0;
                if(pickedGlobal.methods.returnPicked()==0){
                    this.diceOneClass = "diceOneClass"

                    random1 = Math.floor(Math.random()*6)+1
                    random2 = Math.floor(Math.random()*6)+1

                    var html1 = this.diceGenerator(random1)
                    if(random1==random2){
                        if(random1>3){
                            random2 = random1-1
                        }else {
                            random2 = random1+1
                        }
                    }
                    var html2 = this.diceGenerator(random2)
                    var temple=await this.sleep(500);
                    this.diceOne = html1
                    var temple=await this.sleep(500);
                    this.diceTwo = html2}
                else {
                    var number = (pickedGlobal.methods.returnPicked())*(i-j)
                    var randomNumber = Math.floor(200*Math.random())+1
                    var html = this.diceGenerator(randomNumber)
                    var m1 = 100 - number
                    var m2 = m1+1
                    this.diceThree = "<div>("+1+"~"+m1+")</div>"
                    this.diceFour = "<div>("+m2+"~"+200+")</div>"
                    var temple=await this.sleep(500);
                    this.diceOne = html
                    this.diceOneClass = "diceTwoClass"
                    random1 = randomNumber
                    if(randomNumber<=m1)
                        random2 = 0;
                    else random2 = 10000;

                }
                if(this.PlayAutoWord =="Play Auto"){
                    this.playDemoGame = true}
                this.playAutoGame = true
                if(this.count>=8){
                    this.PlayAutoWord = "reset"
                }

                return random1>random2
            },
            kickOutTeam:function (i) {
                if(i==1){
                    this.teamC1 = "teamStyle kickOut"
                }else if(i==2){
                    this.teamC2 = "teamStyle kickOut"
                }else if(i==3){
                    this.teamC3 = "teamStyle kickOut"
                }else if(i==4){
                    this.teamC4 = "teamStyle kickOut"
                }else if(i==5){
                    this.teamC5 = "teamStyle kickOut"
                }else if(i==6){
                    this.teamC6 = "teamStyle kickOut"
                }else if(i==7){
                    this.teamC7 = "teamStyle kickOut"
                }else if(i==8){
                    this.teamC8 = "teamStyle kickOut"
                }

            },
            TeamWins:function (i) {
                if(i==1){
                    this.teamC1 = "teamStyle wins"
                    this.win1 = 1
                }else if(i==2){
                    this.teamC2 = "teamStyle wins"
                    this.win2 = 1
                }else if(i==3){
                    this.teamC3 = "teamStyle wins"
                    this.win3 = 1
                }else if(i==4){
                    this.teamC4 = "teamStyle wins"
                    this.win4 = 1
                }else if(i==5){
                    this.teamC5 = "teamStyle wins"
                    this.win5 = 1
                }else if(i==6){
                    this.teamC6 = "teamStyle wins"
                    this.win6 = 1
                }else if(i==7){
                    this.teamC7 = "teamStyle wins"
                    this.win7 = 1
                }else if(i==8){
                    this.teamC8 = "teamStyle wins"
                    this.win8 = 1
                }

            },

            diceGenerator:function (i) {
                var percentage = pickedGlobal.methods.returnPicked()
                if(percentage==0){
                    var htmlContent = ""
                    if(i==1){
                        htmlContent ="<table class='dice'><tbody><tr><td class=\"disappearDice\"></td><td class=\"disappearDice\"></td><td class=\"disappearDice\"></td></tr><tr><td class=\"disappearDice\"></td><td class=\"diceCircle\"></td><td class=\"disappearDice\"></td></tr>\n" +
                            "                            <tr><td class=\"disappearDice\"></td><td class=\"disappearDice\"></td><td class=\"disappearDice\"></td></tr>\n" +
                            "                            </tbody></table>"
                    }

                    else if(i==2){
                        htmlContent = '<table class=\'dice\'><tbody><tr><td class="diceCircle"></td><td class="disappearDice"></td><td class="disappearDice"></td></tr><tr><td><div class="disappearDice"></div></td><td class="disappearDice"></td><td><div class="disappearDice"></div></td></tr><tr><td class="disappearDice"></td><td class="disappearDice"></td><td class="diceCircle"></td></tr></tbody></table>'

                    }
                    else if(i==3){
                        htmlContent = '<table class=\'dice\'><tbody><tr><td class="diceCircle"></td><td class="disappearDice"></td><td class="disappearDice"></td></tr><tr><td><div class="disappearDice"></div></td><td><div class="diceCircle"></div></td><td><div class="disappearDice"></div></td></tr><tr><td class="disappearDice"></td><td class="disappearDice"></td><td class="diceCircle"></td></tr></tbody></table>'
                    }
                    else if(i==4){
                        htmlContent = '<table class=\'dice\'><tbody><tr><td><div class="diceCircle"></div></td><td class="disappearDice"></td><td><div class="diceCircle"></div></td></tr><tr><td class="disappearDice"></td><td class="disappearDice"></td><td class="disappearDice"></td></tr><tr><td><div class="diceCircle"></div></td><td class="disappearDice"></td><td><div class="diceCircle"></div></td></tr></tbody></table>'
                    }
                    else if(i==5){
                        htmlContent ='<table class=\'dice\'><tbody><tr><td><div class="diceCircle"></div></td><td class="disappearDice"></td><td><div class="diceCircle"></div></td></tr><tr><td class="disappearDice"></td><td><div class="diceCircle"></div></td><td class="disappearDice"></td></tr><tr><td><div class="diceCircle"></div></td><td class="disappearDice"></td><td><div class="diceCircle"></div></td></tr></tbody></table>'
                    }else if(i==6){
                        htmlContent = '<table class=\'dice\'><tbody><tr><td><div class="diceCircle"></div></td><td><div class="disappearDice"></div></td><td><div class="diceCircle"></div></td></tr><tr><td class="diceCircle"></td><td class="disappearDice"></td><td class="diceCircle"></td></tr><tr><td><div class="diceCircle"></div></td><td><div class="disappearDice"></div></td><td><div class="diceCircle"></div></td></tr></tbody></table>'
                    }
                }else {

                    htmlContent = '<div class=\'dice\'>' +i+'</div>'
                }
                return htmlContent
            }

        }
    }
</script>

<style scoped>
    td.appear{
        text-align: center;
        width: 35px;
        height: 35px;
        border: black 1px solid;
        margin: 5px;
        font-size: 25px;
        font-weight: bold;
    }
    .disappear{
        width: 35px;
        height: 35px;

        margin: 5px;
    }
    .green{
        background: #A1D4AD;
    }
    .red{
        background: #aaaaaa;
    }
    .kickOut{
        background: red;
    }
    .teamStyle{
        border: black solid;
        width: 100%;
    }
    .teamStyle td{
        border:black solid;
        padding :10px;
        margin:3px;
        border-radius: 3px;

    }
    /deep/ .dice {

        width: 60px;
        height:60px;
        background-color: yellow;
        border-radius: 10px;
        text-align: center;
        font-size: 30px;

    }
    /deep/ .diceCircle{
        border-radius:10px;
        background: black;
        width: 20px;
        height: 20px;


    }
    /deep/ .disappearDice >>> td{
        width: 20px;
        height:20px
    }
    /deep/ .wins{
        background-color:green;
    }
    /deep/ .diceOneClass{

        margin-right: 100px;margin-left: 15px;
    }
    /deep/ .diceTwoClass{
        padding-left:100px
    }
    /deep/ .colorOne{
        color:orange;
    }
    /deep/ .colorTwo{
        color:purple;
    }
    /deep/ .colorThree{
        color:blue;
    }
    /deep/ .colorFour{
        color: #223254;
    }
    /deep/ .colorFive{
        color: #00008B;
    }
    /deep/ .colorSix{
        color:darkslategrey;
    }
    /deep/ .colorSeven{
        color:darkslateblue;
    }
    /deep/ .colorEight{
        color:sienna;
    }


</style>