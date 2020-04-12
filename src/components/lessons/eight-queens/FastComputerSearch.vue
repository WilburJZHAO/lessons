<template>
    <div>
        <transition appear appear-class="app-appear" appear-active-class="app-appear-active">
            <div class="container mt-4 mb5">
                <h3 class="lesson-subheading mt-4">Fast computer search</h3>
                <hr class="subheading-separator">
                <div class="row">
                    <!-- Left part -->
                    <div class="col-12 col-md-6 app--lesson-left">
                        <div>

                            <h5 class="text-success">{{instruction}}</h5>

                            <div class="row">
                                <div class="queen" ref="queenDragPlace">
                                    <div v-bind:class="class1" id="drag1" v-if="classOne"></div>
                                    <div v-else class="blindClass" >{{classOneValue}}</div>

                                    <div v-bind:class="class2" id="drag2" v-if="classTwo"></div>
                                    <div v-else class="blindClass" >{{classTwoValue}}</div>
                                    <div v-bind:class="class3" id="drag3" v-if="classThree"></div>
                                    <div v-else class="blindClass">{{classThreeValue}}</div>
                                    <div v-bind:class="class4" id="drag4" v-if="classFour"></div>
                                    <div v-else class="blindClass">{{classFourValue}}</div>
                                    <div v-bind:class="class5" id="drag5" v-if="classFive"></div>
                                    <div v-else class="blindClass">{{classFiveValue}}</div>
                                    <div v-bind:class="class6" id="drag6" v-if="classSix"></div>
                                    <div v-else class="blindClass" >{{classSixValue}}</div>
                                    <div v-bind:class="class7" id="drag7" v-if="classSeven"></div>
                                    <div v-else class="blindClass" >{{classSevenValue}}</div>
                                    <div v-bind:class="class8" id="drag8" v-if="classEight"></div>
                                    <div v-else class="blindClass">{{classEightValue}}</div>

                                </div>
                                <div>
                                    <table class="boardTable" v-bind:class="tableAttr">
                                        <tbody ref="tbody" >
                                        <tr ref="one">
                                            <td><div class="addImg"></div></td><td><div class="addImg"></div></td><td v-bind:class="classDiv3"><div class="addImg"></div></td><td v-bind:class="classDiv4"><div class="addImg"></div></td><td v-bind:class="classDiv5"><div class="addImg"></div></td><td v-bind:class="classDiv6"><div class="addImg"></div></td><td v-bind:class="classDiv7"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td>
                                        </tr>
                                        <tr ref="two">
                                            <td><div class="addImg"></div></td><td><div class="addImg"></div></td><td v-bind:class="classDiv3"><div class="addImg"></div></td><td v-bind:class="classDiv4"><div class="addImg"></div></td><td v-bind:class="classDiv5"><div class="addImg"></div></td><td v-bind:class="classDiv6"><div class="addImg"></div></td><td v-bind:class="classDiv7"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td>
                                        </tr>
                                        <tr ref="three">
                                            <td v-bind:class="classDiv3"><div class="addImg"></div></td><td v-bind:class="classDiv3"><div class="addImg"></div></td><td v-bind:class="classDiv3"><div class="addImg"></div></td><td v-bind:class="classDiv4"><div class="addImg"></div></td><td v-bind:class="classDiv5"><div class="addImg"></div></td><td v-bind:class="classDiv6"><div class="addImg"></div></td><td v-bind:class="classDiv7"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td>
                                        </tr>
                                        <tr ref="four">
                                            <td v-bind:class="classDiv4"><div class="addImg"></div></td><td v-bind:class="classDiv4"><div class="addImg"></div></td><td v-bind:class="classDiv4"><div class="addImg"></div></td><td v-bind:class="classDiv4"><div class="addImg"></div></td><td v-bind:class="classDiv5"><div class="addImg"></div></td><td v-bind:class="classDiv6"><div class="addImg"></div></td><td v-bind:class="classDiv7"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td>
                                        </tr>
                                        <tr ref="five">
                                            <td v-bind:class="classDiv5"><div class="addImg"></div></td><td v-bind:class="classDiv5"><div class="addImg"></div></td><td v-bind:class="classDiv5"><div class="addImg"></div></td><td v-bind:class="classDiv5"><div class="addImg"></div></td><td v-bind:class="classDiv5"><div class="addImg"></div></td><td v-bind:class="classDiv6"><div class="addImg"></div></td><td v-bind:class="classDiv7"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td>
                                        </tr>
                                        <tr ref="six">
                                            <td v-bind:class="classDiv6"><div class="addImg"></div></td><td v-bind:class="classDiv6"><div class="addImg"></div></td><td v-bind:class="classDiv6"><div class="addImg"></div></td><td v-bind:class="classDiv6"><div class="addImg"></div></td><td v-bind:class="classDiv6"><div class="addImg"></div></td><td v-bind:class="classDiv6"><div class="addImg"></div></td><td v-bind:class="classDiv7"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td>
                                        </tr>
                                        <tr ref="seven">
                                            <td v-bind:class="classDiv7"><div class="addImg"></div></td><td v-bind:class="classDiv7"><div class="addImg"></div></td><td v-bind:class="classDiv7"><div class="addImg"></div></td><td v-bind:class="classDiv7"><div class="addImg"></div></td><td v-bind:class="classDiv7"><div class="addImg"></div></td><td v-bind:class="classDiv7"><div class="addImg"></div></td><td v-bind:class="classDiv7"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td>
                                        </tr>
                                        <tr ref="eight">
                                            <td v-bind:class="classDiv8"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div>
                                    <div class="blindClassChange"><div v-bind:class="greenOrRed"></div></div>
                                    <div class="blindClassChange"><div v-bind:class="greenOrRed"></div></div>
                                    <div class="blindClassChange"><div v-bind:class="greenOrRed"></div></div>
                                    <div class="blindClassChange"><div v-bind:class="greenOrRed"></div></div>
                                    <div class="blindClassChange"><div v-bind:class="greenOrRed"></div></div>
                                    <div class="blindClassChange"><div v-bind:class="greenOrRed"></div></div>
                                    <div class="blindClassChange"><div v-bind:class="greenOrRed"></div></div>
                                    <div class="blindClassChange"><div v-bind:class="greenOrRed"></div></div>
                                </div>
                            </div>

                            <br>

                            <div class="row">
                                <div style="margin-right: 20px">
                                    <button @click="playDemo" class="btn btn-outline-success btn-lg" v-if="button1">{{PlayAuto}}</button>
                                </div>
                                <button @click="playAuto" class="btn btn-outline-success btn-lg" v-if="button2">{{PlayAuto2}}</button>
                                <div>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <p class="alert alert-danger" v-if="alert">{{alertText}}

                                </p>
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
                            <ol @click="changeGridValue" id="solutionsField" name="uniqueRes" ref="olRefT" v-html="uniqueSolutionsHTML" style="height: 250px;text-align: left;font-size:15px;border:white 0px;overflow-y:scroll" size="20" class="style-select">

                            </ol>

                            <br>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>

    export default {
        name: "FastComputerSearch",
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




                countOfSolutions:0,
                uniqueSolutionsHTML:"<br>",

                resSet : new Set(),

                instruction:"",

                countOfReached:0,
                countOfSteps:0,
                countNow:0,
                countMove:0,

                alertText:"All possibilities tested.",

                alert : false,

                button1:true,
                button2:true,

                terminate:false,

                PlayAuto:"Play Demo",
                PlayAuto2:"Play Auto",

                greenOrRed:"blindCircleNone"

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

        watch: {
          uniqueSolutionsHTML() {
            this.$nextTick( function() {
              const solutionsField = document.getElementById("solutionsField");
              solutionsField.scrollTop = solutionsField.scrollHeight;
            });
          }
        },

        /* This is to cancel the infinite promise loop if "play auto" is active when you quit.
          Tt's not perfect but can't see a better fix at the moment - causes one round of silent
          warnings instead of never-ending warnings! */
        beforeDestroy: function () {
          this.terminate = true;
          this.terminate2 = true;
        },

        methods:{
            appendGrid:function(){
                this.alert = false
                var parent;
                if(this.countOfReached==0){
                    parent = this.$refs.one
                } else if(this.countOfReached==1){
                    parent = this.$refs.two
                } else if(this.countOfReached==2){
                    parent = this.$refs.three
                }else if(this.countOfReached==3){
                    parent = this.$refs.four
                }else if(this.countOfReached==4){
                    parent = this.$refs.five
                }else if(this.countOfReached==5){
                    parent = this.$refs.six
                }else if(this.countOfReached==6){
                    parent = this.$refs.seven
                }else if(this.countOfReached==7){
                    parent = this.$refs.eight
                }

                if(this.countOfReached<8) {
                    var countOfCovered = 0
                    var childrenOfParent = parent.children
                    for (var i = 0; i < childrenOfParent.length; i++) {
                        childrenOfParent[i].children[0].classList = "hiddenImg"
                        if (childrenOfParent[i].classList == "") {
                            //childrenOfParent[i].children[0].classList = "addImg"
                            //childrenOfParent[i].classList = "imageOrange"
                            break;
                        } else {
                            countOfCovered++;
                        }
                    }
                }
                if(this.countOfReached==0&&countOfCovered==8){
                    this.terminate = true
                    this.terminate2 = true
                    this.button1 = false
                    this.PlayAuto2 = "Reset"
                }
                if(countOfCovered==8||this.countOfReached==8){
                    this.alert=true

                    this.showQueen(this.countOfReached-1)
                    this.countMove--
                    this.countOfReached--
                    this.clearOneLine(this.countOfReached)
                    var m = this.countOfReached
                    if(m>=-1&&m<=6){
                        this.clearTheOtherLine(m+1)}
                }
                else {
                    childrenOfParent[this.countNow].children[0].classList ="addImg"
                    if(childrenOfParent[this.countNow].classList == "" ){
                        childrenOfParent[i].classList = "imageOrange"

                        this.hideQueen(this.countOfReached,this.countNow+1)
                        if(this.countOfReached==7){
                            this.checkIsCaptured()
                        }
                        this.removeCovered()
                        this.countOfReached++;
                        this.countNow++
                        this.countNow = 0;

                        if(countOfCovered==7){

                        }
                    }
                    else{

                        this.hideQueen(this.countOfReached,this.countNow+1)

                        this.countNow++

                    }


                }
                this.countMove++;


            },
            showQueen:function(i){
                if(i==0){
                    this.classOne = true
                } else if(i==1){
                    this.classTwo = true
                }else if(i==2){
                    this.classThree = true
                }else if(i==3){
                    this.classFour= true
                }else if(i==4){
                    this.classFive = true
                }else if(i==5){
                    this.classSix = true
                }else if(i==6){
                    this.classSeven = true
                }else if(i==7){
                    this.classEight = true
                }
            },
            hideQueen:function(i,j){
                if(i==0){
                    this.classOne = false
                    this.classOneValue = j
                } else if(i==1){
                    this.classTwo = false
                    this.classTwoValue = j
                }else if(i==2){
                    this.classThree = false
                    this.classThreeValue = j
                }else if(i==3){
                    this.classFour= false
                    this.classFourValue = j
                }else if(i==4){
                    this.classFive = false
                    this.classFiveValue = j
                }else if(i==5){
                    this.classSix = false
                    this.classSixValue = j
                }else if(i==6){
                    this.classSeven = false
                    this.classSevenValue = j
                }else if(i==7){
                    this.classEight = false
                    this.classEightValue = j
                }
            },

            sleep: function(ms){
                return new Promise(resolve=>{
                    setTimeout(resolve,ms)
                })
            },
            playAuto:async function(){
                if(this.PlayAuto2=="Play Auto"){
                    this.button1 = false
                    this.terminate2 = false
                    this.PlayAuto2 = "Pause"
                    while(this.terminate2 == false){
                        var temple=await this.sleep(500);
                        this.playDemo()
                    }
                }else if(this.PlayAuto2=="Reset"){
                    this.reset()
                }else{
                    this.terminate2 = true
                    this.PlayAuto2 = "Play Auto"
                    this.button1 = true

                }
            },
            playDemo: async function(){
                if(this.PlayAuto=="Play Demo") {
                    this.greenOrRed = "blindCircleGreen"
                    //this.button1 = false
                    this.terminate = false
                    this.PlayAuto = "Pause"
                    while(this.terminate == false){
                        //var temple=await this.sleep(500);
                        this.appendGrid()
                    }
                }
                else{
                    this.button1 = true
                    this.terminate = true
                    this.PlayAuto = "Play Demo"
                }

            },

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

                if(this.countMove==0) {
                    var cur = event.target
                    var parent = cur.parentNode

                    if (cur.classList != "addImg" && cur.tagName == "TD") {
                        var childrenList = parent.children

                        var countMM = 0
                        for (var i = 0; i < childrenList.length; i++) {
                            countMM ++;
                            if(childrenList[i] == cur){
                                this.countMove = countMM
                            }
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
                            this.classOneValue += 1;
                            if (childrenList[j].children[0].classList == "addImg") {
                                break;

                            }
                        }
                        //this.checkIsCaptured(event,this.classOneValue-1,0)
                    }
                    if (this.countOfSteps == 0) {
                        this.tableAttr = "table2"
                    }
                    this.removeCovered()
                }


            },

            clearOneLine:function(count){
                if(count==0){
                    parent = this.$refs.one
                }
                else if(count==1){
                    parent = this.$refs.two
                } else if(count==2){
                    parent = this.$refs.three
                }else if(count==3){
                    parent = this.$refs.four
                }else if(count==4){
                    parent = this.$refs.five
                }else if(count==5){
                    parent = this.$refs.six
                }else if(count==6){
                    parent = this.$refs.seven
                }else if(count==7){
                    parent = this.$refs.eight
                }
                var childrens = parent.children
                for(var i=0;i<childrens.length;i++){
                    childrens[i].classList.remove("coveredTD")
                    if(childrens[i].children[0].classList == "addImg"){
                        childrens[i].children[0].classList = "hiddenImg"
                    }
                }
                this.removeCovered()

            },
            clearTheOtherLine:function(count){
                var parent
                if(count==0){
                    parent = this.$refs.one
                    this.clearTheOtherLine(count+1)
                }
                else  if(count==1){
                    parent = this.$refs.two
                    this.clearTheOtherLine(count+1)
                } else if(count==2){
                    parent = this.$refs.three
                    this.clearTheOtherLine(count+1)
                }else if(count==3){
                    parent = this.$refs.four
                    this.clearTheOtherLine(count+1)
                }else if(count==4){
                    parent = this.$refs.five
                    this.clearTheOtherLine(count+1)
                }else if(count==5){
                    parent = this.$refs.six
                    this.clearTheOtherLine(count+1)
                }else if(count==6){
                    parent = this.$refs.seven
                    this.clearTheOtherLine(count+1)
                }else if(count==7){
                    parent = this.$refs.eight
                }
                var childrens = parent.children
                for(var i=0;i<childrens.length;i++){
                    childrens[i].classList = ""

                    if(childrens[i].children[0].classList == "addImg"){
                        childrens[i].children[0].classList = "hiddenImg"
                    }
                }
                this.removeCovered()

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
                this.checkIsCaptured()

            },


            checkIsCaptured:function(){
                //m==lie
                //n==hang
                var res = this.classOneValue+""+this.classTwoValue+""+this.classThreeValue+""+this.classFourValue+this.classFiveValue+""+this.classSixValue+""+this.classSevenValue+""+this.classEightValue ;

                if(!this.resSet.has(res)){
                    this.terminate = true

                    this.PlayAuto = "Play Demo"
                    this.uniqueSolutionsHTML += "<li value='"+this.classOneValue+""+this.classTwoValue+""+this.classThreeValue+""+this.classFourValue+this.classFiveValue+""+this.classSixValue+""+this.classSevenValue+""+this.classEightValue+"'>"+res+"</li>"
                    this.resSet.add(res);
                    this.countOfSolutions ++;
                }





            },

            removeCovered: function () {
                var countM = 0
                var body = this.$refs.tbody
                var trow = body.children
                var arr1 = []
                var arr2 = []
                for(var aa=0;aa<trow.length;aa++){
                    var mrow = trow[aa].children
                    for(var bb=0;bb<mrow.length;bb++){
                        if(mrow[bb].children[0].classList=="addImg"){
                            arr1.push(aa)
                            arr2.push(bb)
                            countM++
                        }
                        else{
                            if(mrow[bb].classList != null){
                                mrow[bb].classList.remove("coveredTD")
                            }
                        }
                    }
                }

                var arrCount = 0
                while(arr1.length>arrCount) {
                    var count = arr2[arrCount]
                    var count2 = arr1[arrCount]
                    for (var l = 0; l < trow.length; l++) {
                        mrow = trow[l].children
                        for (var j = 0; j < mrow.length; j++) {

                            if (j == count && mrow[j].classList != "hiddenImg drop-active") {
                                mrow[j].classList.add("coveredTD")
                            } else if (j + l == count + count2 || j - count == l - count2) {
                                if (mrow[j].classList != "hiddenImg drop-active") {
                                    mrow[j].classList.add("coveredTD")
                                }
                            }else if(l==count2){
                                mrow[j].classList.add("coveredTD")
                            }
                        }
                    }
                    arrCount++
                }
                this.square = 0
                for(var len = 0;len<trow.length;len++){
                    mrow = trow[len].children
                    for(var n=0;n<this.gridSize;n++){
                        if(mrow[n].classList=="coveredTD"||mrow[n].children[0].classList=="addImg"){
                            this.square += 1;
                        }
                    }
                }
                this.squareUncovered = this.gridSize*this.gridSize - this.square

                var queenPlace = this.$refs.queenDragPlace


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



            resetOne:function(){
                this.classOne = true
                this.classTwo = true
                this.classThree = true
                this.classFour = true
                this.classFive = true
                this.classSix = true
                this.classSeven = true
                this.classEight = true


                var body = this.$refs.tbody
                var trow = body.children

                for(var aa=0;aa<trow.length;aa++){
                    var mrow = trow[aa].children
                    for(var bb=0;bb<mrow.length;bb++){
                        if(mrow[bb].children[0].classList=="addImg"){
                            mrow[bb].children[0].classList = "hiddenImg"
                        }
                        else{
                            if(mrow[bb].classList != null){
                                mrow[bb].classList.remove("coveredTD")
                            }
                        }
                    }
                }
                this.countNow = 0;
                this.countMove = 0;
                this.countOfReached = 1;
                this.countOfSteps = 0
            },



            reset:function () {
                this.greenOrRed = "blindCircleNone"
                this.classOne = true
                this.classTwo = true
                this.classThree = true
                this.classFour = true
                this.classFive = true
                this.classSix = true
                this.classSeven = true
                this.classEight = true


                var body = this.$refs.tbody
                var trow = body.children

                for(var aa=0;aa<trow.length;aa++){
                    var mrow = trow[aa].children
                    for(var bb=0;bb<mrow.length;bb++){
                        if(mrow[bb].children[0].classList=="addImg"){
                            mrow[bb].children[0].classList = "hiddenImg"
                        }
                        else{
                            if(mrow[bb].classList != null){
                                mrow[bb].classList.remove("coveredTD")
                            }
                        }
                    }
                }
                this.countNow = 0;
                this.countMove = 0;
                this.countOfReached = 1;
                this.countOfSteps = 0
                this.button1 = true;
                this.button2 = true
                this.terminate = false
                this.PlayAuto = "Play Demo"
                this.tableAttr = "table1"
                this.PlayAuto2 = "Play Auto"
                this.alert = false

                //this.countOfSolutions = 0

            },


        }
    }
</script>

<style scoped>
    .gridTd{

    }
    .boardTable{

    }
    .table2.boardTable >>> td{
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
    .imageOrange{
        background: orange;
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