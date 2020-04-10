<template>
    <div>
        <transition appear appear-class="app-appear" appear-active-class="app-appear-active">
            <div class="container mt-4 mb5">
                <div class="row">
                    <!-- Left part -->
                    <div class="col-12 col-md-6 app--lesson-left">
                        <div>

                            <h5 class="text-success">Click on the board to move queen. Left side to remove queen</h5>

                            <div class="row">
                                <div class="queen" ref="queenDragPlace">
                                    <div v-bind:class="class1" id="drag1" v-if="classOne"></div>
                                    <div v-else class="blindClass" @click="showQueen1($event)">{{classOneValue}}</div>

                                    <div v-bind:class="class2" id="drag2" v-if="classTwo"></div>
                                    <div v-else class="blindClass" @click="showQueen2($event)">{{classTwoValue}}</div>
                                    <div v-bind:class="class3" id="drag3" v-if="classThree"></div>
                                    <div v-else class="blindClass"  @click="showQueen3($event)">{{classThreeValue}}</div>
                                    <div v-bind:class="class4" id="drag4" v-if="classFour"></div>
                                    <div v-else class="blindClass" @click="showQueen4($event)">{{classFourValue}}</div>
                                    <div v-bind:class="class5" id="drag5" v-if="classFive"></div>
                                    <div v-else class="blindClass" @click="showQueen5($event)">{{classFiveValue}}</div>
                                    <div v-bind:class="class6" id="drag6" v-if="classSix"></div>
                                    <div v-else class="blindClass" @click="showQueen6($event)">{{classSixValue}}</div>
                                    <div v-bind:class="class7" id="drag7" v-if="classSeven"></div>
                                    <div v-else class="blindClass" @click="showQueen7($event)">{{classSevenValue}}</div>
                                    <div v-bind:class="class8" id="drag8" v-if="classEight"></div>
                                    <div v-else class="blindClass"  @click="showQueen8($event)">{{classEightValue}}</div>

                                </div>
                                <div>
                                <table class="boardTable" v-bind:class="tableAttr">
                                <tbody ref="tbody" >
                                <tr @click="trOne($event)" ref="one">
                                    <td><div class="addImg"></div></td><td><div class="addImg"></div></td><td v-bind:class="classDiv3"><div class="addImg"></div></td><td v-bind:class="classDiv4"><div class="addImg"></div></td><td v-bind:class="classDiv5"><div class="addImg"></div></td><td v-bind:class="classDiv6"><div class="addImg"></div></td><td v-bind:class="classDiv7"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td>
                                </tr>
                                <tr @click="trTwo($event)" ref="two">
                                    <td><div class="addImg"></div></td><td><div class="addImg"></div></td><td v-bind:class="classDiv3"><div class="addImg"></div></td><td v-bind:class="classDiv4"><div class="addImg"></div></td><td v-bind:class="classDiv5"><div class="addImg"></div></td><td v-bind:class="classDiv6"><div class="addImg"></div></td><td v-bind:class="classDiv7"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td>
                                </tr>
                                <tr @click="trThree($event)" ref="three">
                                    <td v-bind:class="classDiv3"><div class="addImg"></div></td><td v-bind:class="classDiv3"><div class="addImg"></div></td><td v-bind:class="classDiv3"><div class="addImg"></div></td><td v-bind:class="classDiv4"><div class="addImg"></div></td><td v-bind:class="classDiv5"><div class="addImg"></div></td><td v-bind:class="classDiv6"><div class="addImg"></div></td><td v-bind:class="classDiv7"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td>
                                </tr>
                                <tr @click="trFour($event)" ref="four">
                                    <td v-bind:class="classDiv4"><div class="addImg"></div></td><td v-bind:class="classDiv4"><div class="addImg"></div></td><td v-bind:class="classDiv4"><div class="addImg"></div></td><td v-bind:class="classDiv4"><div class="addImg"></div></td><td v-bind:class="classDiv5"><div class="addImg"></div></td><td v-bind:class="classDiv6"><div class="addImg"></div></td><td v-bind:class="classDiv7"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td>
                                </tr>
                                <tr @click="trFive($event)" ref="five">
                                    <td v-bind:class="classDiv5"><div class="addImg"></div></td><td v-bind:class="classDiv5"><div class="addImg"></div></td><td v-bind:class="classDiv5"><div class="addImg"></div></td><td v-bind:class="classDiv5"><div class="addImg"></div></td><td v-bind:class="classDiv5"><div class="addImg"></div></td><td v-bind:class="classDiv6"><div class="addImg"></div></td><td v-bind:class="classDiv7"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td>
                                </tr>
                                <tr @click="trSix($event)" ref="six">
                                    <td v-bind:class="classDiv6"><div class="addImg"></div></td><td v-bind:class="classDiv6"><div class="addImg"></div></td><td v-bind:class="classDiv6"><div class="addImg"></div></td><td v-bind:class="classDiv6"><div class="addImg"></div></td><td v-bind:class="classDiv6"><div class="addImg"></div></td><td v-bind:class="classDiv6"><div class="addImg"></div></td><td v-bind:class="classDiv7"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td>
                                </tr>
                                <tr @click="trSeven($event)" ref="seven">
                                    <td v-bind:class="classDiv7"><div class="addImg"></div></td><td v-bind:class="classDiv7"><div class="addImg"></div></td><td v-bind:class="classDiv7"><div class="addImg"></div></td><td v-bind:class="classDiv7"><div class="addImg"></div></td><td v-bind:class="classDiv7"><div class="addImg"></div></td><td v-bind:class="classDiv7"><div class="addImg"></div></td><td v-bind:class="classDiv7"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td>
                                </tr>
                                <tr @click="trEight($event)" ref="eight">
                                    <td v-bind:class="classDiv8"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td>
                                </tr>
                                </tbody>
                            </table>
                                </div>
                                <div>
                                    <div class="blindClassChange"><div v-bind:class="greenOrRed1"></div></div>
                                    <div class="blindClassChange"><div v-bind:class="greenOrRed2"></div></div>
                                    <div class="blindClassChange"><div v-bind:class="greenOrRed3"></div></div>
                                    <div class="blindClassChange"><div v-bind:class="greenOrRed4"></div></div>
                                    <div class="blindClassChange"><div v-bind:class="greenOrRed5"></div></div>
                                    <div class="blindClassChange"><div v-bind:class="greenOrRed6"></div></div>
                                    <div class="blindClassChange"><div v-bind:class="greenOrRed7"></div></div>
                                    <div class="blindClassChange"><div v-bind:class="greenOrRed8"></div></div>
                                </div>
                            </div>
                            <br>






                            <div class="app--lesson-action" >

                            </div>

                            <div class="tt--solutions mb-5 row" style="padding-bottom: 30px">
                                <div class="mr-3 tt--solutions-count">

                                </div>

                                <div class="app--lesson-action">

                                </div>
                            </div>
                            <div>

                            </div>


                        </div>
                    </div>

                    <!-- Right part -->
                    <div class="col-12 col-md-6 app--lesson-right" style="overflow: visible;">

                        <div class="tt-right-box">
                            <h5 class="text-success">To place 8 queens so that none can capture each other</h5>
                            <p>
                                <span style="font-size: 115%;" class="badge badge-dark">{{ countOfSolutions }}</span> Solutions
                            </p>
                            <ol  ref="olRefT" name="uniqueRes" @click="changeGridValue($event)" v-html="uniqueSolutionsHTML" style="max-height: 500px;text-align: left;font-size:15px;border:white 0px;overflow-y:scroll" size="20" class="style-select">

                            </ol>

                            <br>
                            <button @click="reset" class="btn btn-outline-success btn-lg">Clear board</button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import interact from "interactjs";
    import img from "../../../assets/queen.jpeg"

    export default {
        name: "PlayEightQueens",
        data: function () {
            return{
                gridSize:8,
                gridHTML:"",
                queenHTML:"",
                queenNum : 1,
                square:0,
                squareUncovered:64,

                class1:'startDrop',
                class2:'startDrop',
                class3:'startDrop',
                class4:'startDrop',
                class5:'startDrop',
                class6:'startDrop',
                class7:'startDrop',
                class8:'startDrop',

                classDiv3:"",
                classDiv4:"",
                classDiv5:"",
                classDiv6:"",
                classDiv7:"",
                classDiv8:"",

                show2 : false,
                show3: false,
                show4: false,
                show5: false,
                show6: false,

                res1:null,
                res2:null,
                res3:null,
                res4:null,
                res5:null,
                res6:null,

                tableAttr:"table1",

                checkedBox : [],

                classOne : true,
                classTwo:true,
                classThree:true,
                classFour:true,
                classFive:true,
                classSix:true,
                classSeven:true,
                classEight:true,

                classOneValue:0,
                classTwoValue:0,
                classThreeValue:0,
                classFourValue:0,
                classFiveValue:0,
                classSixValue:0,
                classSevenValue:0,
                classEightValue:0,


                greenOrRed1:"blindCircleNone",
                greenOrRed2:"blindCircleNone",
                greenOrRed3:"blindCircleNone",
                greenOrRed4:"blindCircleNone",
                greenOrRed5:"blindCircleNone",
                greenOrRed6:"blindCircleNone",
                greenOrRed7:"blindCircleNone",
                greenOrRed8:"blindCircleNone",

                countOfSolutions:0,
                uniqueSolutionsHTML:"<br>",

                resSet : new Set()

            }

        },
        created:function(){
            //this.changeBoardSize()
            //this.changeQueenSize()
        },
        mounted:function(){

            this.initBoardDraggable()
            //this.initDropArea(this.$refs.testDiv)
        },

        methods:{
            changeGridValue:function(event) {
                if(event.target.tagName=="LI") {
                    var refOLt = this.$refs.olRefT
                    var olChildren = refOLt.children
                    for (var i = 0; i < olChildren.length; i++) {
                        var m = olChildren[i]
                        m.classList = ""
                    }

                    var value = event.target.value.toString()

                    var res = value.split("")

                    this.reset()
                    event.target.classList = "add"

                    this.greenOrRed1 = "blindCircleGreen";
                    this.greenOrRed2 = "blindCircleGreen";
                    this.greenOrRed3 = "blindCircleGreen";
                    this.greenOrRed4 = "blindCircleGreen";
                    this.greenOrRed5 = "blindCircleGreen";
                    this.greenOrRed6 = "blindCircleGreen";
                    this.greenOrRed7 = "blindCircleGreen";
                    this.greenOrRed8 = "blindCircleGreen";

                    this.classOne = false;
                    this.classTwo = false;
                    this.classThree = false;
                    this.classFour = false;
                    this.classFive = false;
                    this.classSix = false;
                    this.classSeven = false;
                    this.classEight = false;

                    this.classOneValue = res[0]
                    this.classTwoValue = res[1]
                    this.classThreeValue = res[2]
                    this.classFourValue = res[3]
                    this.classFiveValue = res[4]
                    this.classSixValue = res[5]
                    this.classSevenValue = res[6]
                    this.classEightValue = res[7]

                    var body = this.$refs.tbody
                    var trow = body.children

                    for (var aa = 0; aa < trow.length; aa++) {
                        var mrow = trow[aa].children
                        var target = res[aa] - 1
                        for (var bb = 0; bb < mrow.length; bb++) {
                            if (target == bb) {
                                mrow[bb].children[0].classList = "addImg"
                            }
                        }
                    }
                }
            },
            trOne:function(event){
                var cur = event.target
                var parent = cur.parentNode

                if(cur.classList!="addImg"&&cur.tagName=="TD") {
                    var childrenList = parent.children
                    for (var i = 0; i < childrenList.length; i++) {
                        if (childrenList[i].children[0].classList == "addImg") {
                            childrenList[i].children[0].classList.remove("addImg")
                            childrenList[i].children[0].classList.add("hiddenImg")
                        }
                    }
                    if (this.classOne == true) {
                        this.classOne = false
                    }
                    cur.children[0].classList = "addImg"

                    this.classOneValue = 0;
                    for (var j = 0; j < childrenList.length; j++) {
                        this.classOneValue+=1;
                        if (childrenList[j].children[0].classList == "addImg") {
                            break;

                        }
                    }
                    this.greenOrRed1 = "blindCircleGreen"
                    this.checkIsCaptured(event,this.classOneValue-1,0)
                }


            },
            trTwo:function(event){
                var cur = event.target
                var parent = cur.parentNode

                if(cur.classList!="addImg"&&cur.tagName=="TD") {
                    var childrenList = parent.children
                    for (var i = 0; i < childrenList.length; i++) {
                        if (childrenList[i].children[0].classList == "addImg") {
                            childrenList[i].children[0].classList.remove("addImg")
                            childrenList[i].children[0].classList.add("hiddenImg")
                        }
                    }
                    if (this.classTwo == true) {
                        this.classTwo = false
                    }
                    cur.children[0].classList = "addImg"

                    this.classTwoValue = 0;
                    for (var j = 0; j < childrenList.length; j++) {
                        this.classTwoValue+=1;
                        if (childrenList[j].children[0].classList == "addImg") {
                            break;

                        }
                    }
                    this.greenOrRed2 = "blindCircleGreen"
                    this.checkIsCaptured(event,this.classTwoValue-1,1)

                }


            },
            trThree:function(event){
                var cur = event.target
                var parent = cur.parentNode

                if(cur.classList!="addImg"&&cur.tagName=="TD") {
                    var childrenList = parent.children
                    for (var i = 0; i < childrenList.length; i++) {
                        if (childrenList[i].children[0].classList == "addImg") {
                            childrenList[i].children[0].classList.remove("addImg")
                            childrenList[i].children[0].classList.add("hiddenImg")
                        }
                    }
                    if (this.classThree == true) {
                        this.classThree = false
                    }
                    cur.children[0].classList = "addImg"

                    this.classThreeValue = 0;
                    for (var j = 0; j < childrenList.length; j++) {
                        this.classThreeValue+=1;
                        if (childrenList[j].children[0].classList == "addImg") {
                            break;

                        }
                    }
                    this.greenOrRed3 = "blindCircleGreen"
                    this.checkIsCaptured(event,this.classThreeValue-1,2)

                }


            },
            trFour:function(event){
                var cur = event.target
                var parent = cur.parentNode

                if(cur.classList!="addImg"&&cur.tagName=="TD") {
                    var childrenList = parent.children
                    for (var i = 0; i < childrenList.length; i++) {
                        if (childrenList[i].children[0].classList == "addImg") {
                            childrenList[i].children[0].classList.remove("addImg")
                            childrenList[i].children[0].classList.add("hiddenImg")
                        }
                    }
                    if (this.classFour == true) {
                        this.classFour = false
                    }
                    cur.children[0].classList = "addImg"

                    this.classFourValue = 0;
                    for (var j = 0; j < childrenList.length; j++) {
                        this.classFourValue+=1;
                        if (childrenList[j].children[0].classList == "addImg") {
                            break;

                        }
                    }
                    this.greenOrRed4 = "blindCircleGreen"
                    this.checkIsCaptured(event,this.classFourValue-1,3)

                }


            },
            trFive:function(event){
                var cur = event.target
                var parent = cur.parentNode

                if(cur.classList!="addImg"&&cur.tagName=="TD") {
                    var childrenList = parent.children
                    for (var i = 0; i < childrenList.length; i++) {
                        if (childrenList[i].children[0].classList == "addImg") {
                            childrenList[i].children[0].classList.remove("addImg")
                            childrenList[i].children[0].classList.add("hiddenImg")
                        }
                    }
                    if (this.classFive == true) {
                        this.classFive = false
                    }
                    cur.children[0].classList = "addImg"

                    this.classFiveValue = 0;
                    for (var j = 0; j < childrenList.length; j++) {
                        this.classFiveValue+=1;
                        if (childrenList[j].children[0].classList == "addImg") {
                            break;

                        }
                    }
                    this.greenOrRed5 = "blindCircleGreen"
                    this.checkIsCaptured(event,this.classFiveValue-1,4)

                }


            },
            trSix:function(event){
                var cur = event.target
                var parent = cur.parentNode

                if(cur.classList!="addImg"&&cur.tagName=="TD") {
                    var childrenList = parent.children
                    for (var i = 0; i < childrenList.length; i++) {
                        if (childrenList[i].children[0].classList == "addImg") {
                            childrenList[i].children[0].classList.remove("addImg")
                            childrenList[i].children[0].classList.add("hiddenImg")
                        }
                    }
                    if (this.classSix == true) {
                        this.classSix = false
                    }
                    cur.children[0].classList = "addImg"

                    this.classSixValue = 0;
                    for (var j = 0; j < childrenList.length; j++) {
                        this.classSixValue+=1;
                        if (childrenList[j].children[0].classList == "addImg") {
                            break;

                        }
                    }
                    this.greenOrRed6 = "blindCircleGreen"
                    this.checkIsCaptured(event,this.classSixValue-1,5)

                }


            },
            trSeven:function(event){
                var cur = event.target
                var parent = cur.parentNode

                if(cur.classList!="addImg"&&cur.tagName=="TD") {
                    var childrenList = parent.children
                    for (var i = 0; i < childrenList.length; i++) {
                        if (childrenList[i].children[0].classList == "addImg") {
                            childrenList[i].children[0].classList.remove("addImg")
                            childrenList[i].children[0].classList.add("hiddenImg")
                        }
                    }
                    if (this.classSeven == true) {
                        this.classSeven = false
                    }
                    cur.children[0].classList = "addImg"

                    this.classSevenValue = 0;
                    for (var j = 0; j < childrenList.length; j++) {
                        this.classSevenValue+=1;
                        if (childrenList[j].children[0].classList == "addImg") {
                            break;

                        }
                    }
                    this.greenOrRed7 = "blindCircleGreen"
                    this.checkIsCaptured(event,this.classSevenValue-1,6)

                }


            },
            trEight:function(event){
                var cur = event.target
                var parent = cur.parentNode

                if(cur.classList!="addImg"&&cur.tagName=="TD") {
                    var childrenList = parent.children
                    for (var i = 0; i < childrenList.length; i++) {
                        if (childrenList[i].children[0].classList == "addImg") {
                            childrenList[i].children[0].classList.remove("addImg")
                            childrenList[i].children[0].classList.add("hiddenImg")
                        }
                    }
                    if (this.classEight== true) {
                        this.classEight = false
                    }
                    cur.children[0].classList = "addImg"

                    this.classEightValue = 0;
                    for (var j = 0; j < childrenList.length; j++) {
                        this.classEightValue+=1;
                        if (childrenList[j].children[0].classList == "addImg") {
                            break;

                        }
                    }
                    this.greenOrRed8 = "blindCircleGreen"
                    this.checkIsCaptured(event,this.classEightValue-1,7)

                }


            },

            showQueen1:function(){
                this.classOne= true
                var parent = this.$refs.one
                var childrenList = parent.children
                for (var i = 0; i < childrenList.length; i++) {
                    if (childrenList[i].children[0].classList == "addImg") {
                        childrenList[i].children[0].classList.remove("addImg")
                        childrenList[i].children[0].classList.add("hiddenImg")
                    }
                }
                this.greenOrRed1 = "blindCircleNone"
                this.checkIsCaptured()

            },
            showQueen2:function(){
                this.classTwo= true
                var parent = this.$refs.two
                var childrenList = parent.children
                for (var i = 0; i < childrenList.length; i++) {
                    if (childrenList[i].children[0].classList == "addImg") {
                        childrenList[i].children[0].classList.remove("addImg")
                        childrenList[i].children[0].classList.add("hiddenImg")
                    }
                }
                this.greenOrRed2 = "blindCircleNone"
                this.checkIsCaptured()

            },
            showQueen3:function(){
                this.classThree = true
                var parent = this.$refs.three
                var childrenList = parent.children
                for (var i = 0; i < childrenList.length; i++) {
                    if (childrenList[i].children[0].classList == "addImg") {
                        childrenList[i].children[0].classList.remove("addImg")
                        childrenList[i].children[0].classList.add("hiddenImg")
                    }
                }
                this.greenOrRed3 = "blindCircleNone"
                this.checkIsCaptured()


            },
            showQueen4:function(){
                this.classFour= true
                var parent = this.$refs.four
                var childrenList = parent.children
                for (var i = 0; i < childrenList.length; i++) {
                    if (childrenList[i].children[0].classList == "addImg") {
                        childrenList[i].children[0].classList.remove("addImg")
                        childrenList[i].children[0].classList.add("hiddenImg")
                    }
                }
                this.greenOrRed4 = "blindCircleNone"
                this.checkIsCaptured()


            },
            showQueen5:function(){
                this.classFive= true
                var parent = this.$refs.five
                var childrenList = parent.children
                for (var i = 0; i < childrenList.length; i++) {
                    if (childrenList[i].children[0].classList == "addImg") {
                        childrenList[i].children[0].classList.remove("addImg")
                        childrenList[i].children[0].classList.add("hiddenImg")
                    }
                }
                this.greenOrRed5 = "blindCircleNone"
                this.checkIsCaptured()


            },
            showQueen6:function(){
                this.classSix= true
                var parent = this.$refs.six
                var childrenList = parent.children
                for (var i = 0; i < childrenList.length; i++) {
                    if (childrenList[i].children[0].classList == "addImg") {
                        childrenList[i].children[0].classList.remove("addImg")
                        childrenList[i].children[0].classList.add("hiddenImg")
                    }
                }
                this.greenOrRed6 = "blindCircleNone"
                this.checkIsCaptured()


            },
            showQueen7:function(){
                this.classSeven= true
                var parent = this.$refs.seven
                var childrenList = parent.children
                for (var i = 0; i < childrenList.length; i++) {
                    if (childrenList[i].children[0].classList == "addImg") {
                        childrenList[i].children[0].classList.remove("addImg")
                        childrenList[i].children[0].classList.add("hiddenImg")
                    }
                }
                this.greenOrRed7 = "blindCircleNone"
                this.checkIsCaptured()

            },
            showQueen8:function(){
                this.classEight= true
                var parent = this.$refs.eight
                var childrenList = parent.children
                for (var i = 0; i < childrenList.length; i++) {
                    if (childrenList[i].children[0].classList == "addImg") {
                        childrenList[i].children[0].classList.remove("addImg")
                        childrenList[i].children[0].classList.add("hiddenImg")
                    }
                }
                this.greenOrRed8 = "blindCircleNone"
                this.checkIsCaptured()

            },

            checkIsCaptured:function(){
                //m==lie
                //n==hang
                var countL = 0;
                var body = this.$refs.tbody
                var tr = body.children
                if(this.greenOrRed1!="blindCircleNone"){
                    this.greenOrRed1 = "blindCircleGreen"
                    countL ++;
                }if(this.greenOrRed2!="blindCircleNone"){
                    this.greenOrRed2 = "blindCircleGreen"
                    countL ++;
                }if(this.greenOrRed3!="blindCircleNone"){
                    this.greenOrRed3 = "blindCircleGreen"
                    countL ++;
                }if(this.greenOrRed4!="blindCircleNone"){
                    this.greenOrRed4 = "blindCircleGreen"
                    countL ++;
                }if(this.greenOrRed5!="blindCircleNone"){
                    this.greenOrRed5 = "blindCircleGreen"
                    countL ++;
                }if(this.greenOrRed6!="blindCircleNone"){
                    this.greenOrRed6 = "blindCircleGreen"
                    countL ++;
                }if(this.greenOrRed7!="blindCircleNone"){
                    this.greenOrRed7 = "blindCircleGreen"
                    countL ++;
                }if(this.greenOrRed8!="blindCircleNone"){
                    this.greenOrRed8 = "blindCircleGreen"
                    countL ++;
                }
                var arrm = []
                var arrn = []
                for(var i=0;i<tr.length;i++){
                    var td = tr[i].children
                    for(var j=0;j<td.length;j++){
                        var cur = td[j]
                        if(cur.children[0].classList=="addImg"){
                            arrm.push(j)
                            arrn.push(i)
                        }
                    }
                }
                var countM = 0
                for(var l=0;l<arrm.length;l++) {
                    var m = arrm[l]
                    var n = arrn[l]
                    for (i = 0; i < tr.length; i++) {
                        td = tr[i].children
                        for (var j = 0; j < td.length; j++) {
                            cur = td[j]
                            if (cur.children[0].classList == "addImg") {
                                if (j == m || n - i == m - j || i + j == n + m) {
                                    if (j != m || i != n) {
                                        this.alertRed(n)
                                        this.alertRed(i)
                                        countM++;
                                    }

                                }
                            }
                        }
                    }
                }

                if(countM==0&&countL==8){
                    var res = this.classOneValue+""+this.classTwoValue+""+this.classThreeValue+""+this.classFourValue+this.classFiveValue+""+this.classSixValue+""+this.classSevenValue+""+this.classEightValue ;

                    if(!this.resSet.has(res)){
                    this.uniqueSolutionsHTML += "<li value='"+this.classOneValue+""+this.classTwoValue+""+this.classThreeValue+""+this.classFourValue+this.classFiveValue+""+this.classSixValue+""+this.classSevenValue+""+this.classEightValue+"'>"+res+"</li>"
                    this.resSet.add(res);
                    this.countOfSolutions ++;
                    }


                }


            },
            alertRed: function(i){
                i = i+1
                if(i==1){
                    this.greenOrRed1 = "blindCircleRed"

                }else if(i==2){
                    this.greenOrRed2 = "blindCircleRed"
                }else if(i==3){
                    this.greenOrRed3 = "blindCircleRed"
                }else if(i==4){
                    this.greenOrRed4 = "blindCircleRed"
                }else if(i==5){
                    this.greenOrRed5 = "blindCircleRed"
                }else if(i==6){
                    this.greenOrRed6 = "blindCircleRed"
                }else if(i==7){
                    this.greenOrRed7 = "blindCircleRed"
                }else if(i==8){
                    this.greenOrRed8 = "blindCircleRed"
                }
            },






            changeTableAttr: function(){
                if(this.tableAttr =="table1"){
                    this.tableAttr = "table2"
                }else this.tableAttr = "table1"
            },
            initBoardDraggable:function(){
                var cur = this.$refs.tbody
                var elementRow = cur.children
                for(var i=0;i<elementRow.length;i++){
                    var ele = elementRow[i].children
                    for(var j=0;j<ele.length;j++){
                        ele[j].children[0].classList = "hiddenImg"
                    }
                }
            },
            removeQueenChange:function(){
                var queen = this.$refs.queenDragPlace
                var queenChildren = queen.children



                if(queenChildren[0].classList == 'hiddenImg'){
                    queenChildren[0].classList = 'startDrop'
                }else if(queenChildren[1].classList == 'hiddenImg'){
                    queenChildren[1].classList = 'startDrop'
                }else if(queenChildren[2].classList == 'hiddenImg'){
                    queenChildren[2].classList = 'startDrop'
                }else if(queenChildren[3].classList == 'hiddenImg'){
                    queenChildren[3].classList = 'startDrop'
                }else if(queenChildren[4].classList == 'hiddenImg'){
                    queenChildren[4].classList = 'startDrop'
                }else if(queenChildren[5].classList == 'hiddenImg'){
                    queenChildren[5].classList = 'startDrop'
                }
                //if()
            },







            reset:function () {
                var refOL = this.$refs.olRefT;
                var olChildren = refOL.children
                for(var i=0;i<olChildren.length;i++){
                    var m = olChildren[i]
                    m.classList = ""
                }
                this.classOne = true
                this.classTwo = true
                this.classThree = true
                this.classFour = true
                this.classFive = true
                this.classSix = true
                this.classSeven = true
                this.classEight = true

                this.greenOrRed1="blindCircleNone";
                this.greenOrRed2= "blindCircleNone";
                this.greenOrRed3="blindCircleNone";
                this.greenOrRed4="blindCircleNone";
                this.greenOrRed5="blindCircleNone";
                this.greenOrRed6="blindCircleNone";
                this.greenOrRed7="blindCircleNone";
                this.greenOrRed8="blindCircleNone"
                var body = this.$refs.tbody
                var trow = body.children

                for(var aa=0;aa<trow.length;aa++){
                    var mrow = trow[aa].children
                    for(var bb=0;bb<mrow.length;bb++){
                        if(mrow[bb].children[0].classList=="addImg"){
                            mrow[bb].children[0].classList = "hiddenImg"
                        }
                        else{
                            if(mrow[bb].children[0].classList!=null){
                                mrow[bb].children[0].classList.remove("covered")
                            }if(mrow[bb].classList != null){
                                mrow[bb].classList.remove("coveredTD")
                            }
                        }
                    }
                }
                this.square = 0
                this.squareUncovered = this.gridSize*this.gridSize
            },


        }
    }
</script>

<style scoped>
    .gridTd{

    }
    .boardTable{

    }
    .table1.boardTable >>> td{
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        font-size: 35px;
        height: 35px;
        width: 35px;
        padding: 0;
        margin: 5px;
        border: black 1px solid;
    }
    .table1.boardTable >>>tr:nth-child(odd) td:nth-child(odd) {

        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        font-size: 35px;

        padding: 0;
        margin: 5px;
        border: black 1px solid;
        background-color:#aaaaaa;
    }
    .table1.boardTable >>> tr:nth-child(even) td:nth-child(even){
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        font-size: 35px;

        padding: 0;
        margin: 5px;
        border:black 1px solid;
        background-color:#aaaaaa;

    }
    .table1.boardTable >>> tr:nth-child(odd) td:nth-child(even){
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        font-size: 35px;
        padding: 0;
        margin: 5px;
        border:black 1px solid;
        background-color:white;

    }
    .table1.boardTable >>> tr:nth-child(even) td:nth-child(odd){
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        font-size: 35px;
        height:30px;

        padding: 0;
        margin: 5px;
        border:black 1px solid;
        background-color:white;

    }
    .table1 .boardTable >>> td{
        border: black 1px solid;
    }
    .queensNum{
        padding-right: 20px;
    }
    .startDrop{
        background: url("../../../assets/queen.png");
        background-size: 35px 35px;
        height: 35px;
        width: 35px;
        margin-right:15px;
    }

    .queen{
        background-color: white;
    }
    .table tbody >>> .drop-active {
    //border-color: #cccccc;
    }
    .table tbody >>> .drop-target {
        background-color: #cccccc;
    //border-style: solid;
    }
    .hiddenImg{
        visibility: hidden;
        width: 100%;
        height: 100%;
    }
    .addImg{
        background: url("../../../assets/queen.png") no-repeat;
        background-size: 30px 30px;
        width: 30px;
        height: 30px;
        position: center;
    }
    .boardTable div{

        margin:auto
    }
    .elementClass{
        width: 37px;
        height: 37px;
    }
    .covered{
        -ms-touch-action: none;
        touch-action: none;
        visibility: visible;
    }
    .tableRes td{
        border: white solid 1px;
        padding-left:20px;
        padding-right: 20px;
        text-align: center;
    }
    .coveredTD{
        background: #A1D4AD;
    }
    .startDrop{
        -ms-touch-action: none;
        touch-action: none;
    }
    .couldNotDrag{
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .blindClass{
        height: 35px;
        width: 35px;
        margin-right:15px;
        text-align:  center;
    }
    .blindClassChange{
        margin-left: 5px;
        height: 25px;
        width: 15px;
    }
    .blindCircleRed{
        height:15px;
        width: 15px;
        -moz-border-radius: 7px;
        border-radius: 7px;
        background: red;
        margin-top: 10px;

    }
    .blindCircleGreen{
        height:15px;
        width: 15px;
        -moz-border-radius: 7px;
        border-radius: 7px;
        background: green;
        margin-top: 10px;
    }
    .blindCircleNone{
        height:15px;
        width: 15px;
        -moz-border-radius: 7px;
        border-radius: 7px;
        background: white;
        margin-top: 10px;
    }
    .style-select{
        -webkit-appearance: none;

        overflow: hidden;
        width: 240px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
    }
    ol{
        list-style-type:
                none;
        text-align: left;
        padding-left: 0;
    }
    /deep/ li{
        padding-left: 0;
    }


    /deep/ .add{
        background: #aaaaaa
    ;
    }


</style>