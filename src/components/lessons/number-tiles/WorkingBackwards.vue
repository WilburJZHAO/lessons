<template>
    <div>
        <transition appear appear-class="app-appear" appear-active-class="app-appear-active">
            <div class="container mt-4 mb5">
                <h3 class="lesson-subheading">Working backwards</h3>
                <hr class="subheading-separator">
                <div class="row">
                    <!-- Left part -->
                    <div class="col-12 col-md-6 app--lesson-left">
                        <div>
                            <h6 class="text-success">
                                To work backwards: Drag the numbers to the top line. Or generate a three digit Sum list from the possibilities options, then select from the Sum list. Then click button to test.
                            </h6>

                            <table>
                                <tr>

                                    <td class="functionzone"></td>
                                    <td class="dropzone" ref="dropzonePlace" id="dropzone1">
                                        <div style='text-align: center;margin: 0;border: #7f8c8d 1px solid;border-radius: 0.4vw;height: 95%;color: #00008B;' class="dropzone-drop">{{dropzone1}}</div>
                                    </td>

                                    <td class="dropzone" id="dropzone2" ref="dropzonePlace2">
                                        <div style='text-align: center;margin: 0;border: #7f8c8d 1px solid;border-radius: 0.4vw;height: 95%;color: #00008B' class="dropzone-drop">{{dropzone2}}</div>
                                    </td>

                                    <td class="dropzone" id="dropzone3" ref="dropzonePlace3">
                                        <div style='text-align: center;margin: 0;border: #7f8c8d 1px solid;border-radius: 0.4vw;height: 95%;color: #00008B' class="dropzone-drop">{{dropzone3}}</div>
                                    </td>

                                </tr>
                                <tr>
                                    <td class="functionzone">+</td>
                                    <td class="dropzone" id="dropzone4" ref="dropzonePlace4">
                                        <div style='text-align: center;margin: 0;border: #7f8c8d 1px solid;border-radius: 0.4vw;height: 95%;color: #00008B' class="dropzone-drop">{{dropzone4}}</div>
                                    </td>

                                    <td class="dropzone" id="dropzone5" ref="dropzonePlace5">
                                        <div style='text-align: center;margin: 0;border: #7f8c8d 1px solid;border-radius: 0.4vw;height: 95%;color: #00008B' class="dropzone-drop">{{dropzone5}}</div>
                                    </td>

                                    <td class="dropzone" id="dropzone6" ref="dropzonePlace6">
                                        <div style='text-align: center;margin: 0;border: #7f8c8d 1px solid;border-radius: 0.4vw;height: 95%;color: #00008B' class="dropzone-drop">{{dropzone6}}</div>
                                    </td>
                                </tr>
                                <tr style="border-top: black solid 2px;">
                                    <td class="functionzone"></td>
                                    <td class="dropzone" id="dropzone7" ref="dropzonePlace7">
                                        <div style='text-align: center;margin: 0;border: #7f8c8d 1px solid;border-radius: 0.4vw;height: 95%;color: #DC143C' class="dropzone-drop">{{dropzone7}}</div>
                                    </td>

                                    <td class="dropzone" id="dropzone8" ref="dropzonePlace8">
                                        <div style='text-align: center;margin: 0;border: #7f8c8d 1px solid;border-radius: 0.4vw ;height: 95%;color: #DC143C' class="dropzone-drop">{{dropzone8}}</div>
                                    </td>

                                    <td class="dropzone" id="dropzone9"  ref="dropzonePlace9">
                                        <div style='text-align: center;margin: 0;border: #7f8c8d 1px solid;border-radius: 0.4vw;height: 95%;color: #DC143C' class="dropzone-drop">{{dropzone9}}</div>
                                    </td>
                                </tr>


                            </table>

                            <div style="width: 100%;background-color: transparent;text-align: left" id="dragArea">
                                <div style="display: inline-block;">
                                    <div class="drag-drop" id="y1" ref="myDraggable" @dblclick="disappear($event)" >1</div></div>
                                <div style="display: inline-block;"><div class="drag-drop" id="y2" ref="myDraggable2" @dblclick="disappear($event)" >2</div></div>
                                <div style="display: inline-block"><div class="drag-drop" id="y3" ref="myDraggable3" @dblclick="disappear($event)" >3</div></div>
                                <div style="display: inline-block"><div class="drag-drop" id="y4" ref="myDraggable4" @dblclick="disappear($event)" >4</div></div>
                                <div style="display: inline-block"><div class="drag-drop" id="y5" ref="myDraggable5" @dblclick="disappear($event)">5</div></div>
                                <div style="display: inline-block"><div class="drag-drop" id="y6" ref="myDraggable6" @dblclick="disappear($event)">6</div></div>
                                <div style="display: inline-block"><div class="drag-drop" id="y7" ref="myDraggable7" @dblclick="disappear($event)">7</div></div>
                                <div style="display: inline-block"><div class="drag-drop" id="y8" ref="myDraggable8" @dblclick="disappear($event)">8</div></div>
                                <div style="display: inline-block"><div class="drag-drop" id="y9" ref="myDraggable9" @dblclick="disappear($event)">9</div></div>
                            </div>

                            <div class="app--lesson-action" >
                                <button
                                        type="submit"
                                        class="btn btn-outline-success btn-lg"
                                        id = "auto"
                                        v-if="finish"
                                        @click="playTheGame(countM,switcher,set1,res,$event)" >{{playAuto1}}</button>
                                <button
                                        type="submit"
                                        class="btn btn-outline-success btn-lg"
                                        id = "demo"
                                        v-if="finish"
                                        @click="playTheGame(countM,switcher,set1,res,$event)">Play Demo</button>
                            </div>

                            <div class="tt--solutions mb-5 row" style="padding-bottom: 30px">
                                <div class="mr-3 tt--solutions-count">
                                    <p>
                                        <span style="font-size: 115%;" class="badge badge-dark">{{ countOfSolutions }}</span> Solutions
                                    </p>
                                    <p>
                                        <span style="font-size: 115%;" class="badge badge-dark">{{ countOfFound }}</span> Count
                                    </p>
                                </div>
                                <div class="alert alert-danger" v-if="shouldAlert">Please drag three number tiles to the top line</div>

                                <div class="app--lesson-action">


                                    <button
                                            type="submit"
                                            class="btn btn-outline-success btn-lg"
                                            @click="reset">Reset</button>
                                </div>
                            </div>
                            <div>

                            </div>


                        </div>
                    </div>

                    <!-- Right part -->
                    <div class="col-12 col-md-6 app--lesson-right" style="overflow: visible;">
                        <div class="tt-right-box"></div>

                        <div class="row">
                            <div>
                            <p>
                                <span style="font-size: 115%;" class="badge badge-dark">{{ uniqueSolutions }}</span> Unique solutions found
                            </p>
                            <ol ref="olRefT" name="uniqueRes" @click="changeGridValue($event)" v-html="uniqueSolutionsHTML" style="text-align: left;font-size:15px;border:white 0px;overflow-y:scroll;max-height: 420px;" size="6" class="style-select">

                            </ol>
                            </div>
                            <div>
                                <p style="">
                                    Sum to<span style="font-size: 115%;" class="badge badge-dark">{{ sumOfDigit }}</span>
                                </p>
                                <div class="row" style="margin-bottom: 20px">
                                    <ol ref="olRef" style="max-height:420px;width: 40%;overflow-y:scroll;margin-right: 10%;font-weight: bold;font-size: 15px;text-align: center;" size="20" v-html="threeSumHTML" class="styled" @click="addGridValue($event)">

                                    </ol>
                                    <div style="width: 50%">
                                        <div style="width: 100%;border: solid grey 2px;text-align: center;">{{numberCount}}</div>

                                        <h6 class="text-success" style="text-align: center">Possibilities</h6>
                                        <div class="form-check" @change="threeSum()"><input type="radio" name="p" value="8" id="check8" class="form-check-input circle" checked v-model="sumOfDigit"><label for="check8" class="form-check-label entry-label">8</label></div>
                                        <div class="form-check" @change="threeSum()"><input type="radio" name="p" value="9" id="check9" class="form-check-input circle" v-model="sumOfDigit"><label for="check9" class="form-check-label entry-label">9</label></div>
                                        <div class="form-check" @change="threeSum()"><input type="radio" name="p" value="10" id="check10" class="form-check-input circle" v-model="sumOfDigit"><label for="check10" class="form-check-label entry-label">10</label></div>
                                        <div class="form-check" @change="threeSum()"><input type="radio" name="p" value="11" id="check11" class="form-check-input circle" v-model="sumOfDigit"><label for="check11" class="form-check-label entry-label">11</label></div>
                                        <div class="form-check" @change="threeSum()"><input type="radio" name="p" value="12" id="check12" class="form-check-input circle" v-model="sumOfDigit"><label for="check12" class="form-check-label entry-label">12</label></div>
                                        <div class="form-check" @change="threeSum()"><input type="radio" name="p" value="13" id="check13" class="form-check-input circle" v-model="sumOfDigit"><label for="check13" class="form-check-label entry-label">13</label></div>
                                        <div class="form-check" @change="threeSum()"><input type="radio" name="p" value="14" id="check14" class="form-check-input circle" v-model="sumOfDigit"><label for="check14" class="form-check-label entry-label">14</label></div>
                                        <div class="form-check" @change="threeSum()"><input type="radio" name="p" value="15" id="check15" class="form-check-input circle" v-model="sumOfDigit"><label for="check15" class="form-check-label entry-label">15</label></div>
                                        <div class="form-check" @change="threeSum()"><input type="radio" name="p" value="16" id="check16" class="form-check-input circle" v-model="sumOfDigit"><label for="check16" class="form-check-label entry-label">16</label></div>
                                        <div class="form-check" @change="threeSum()"><input type="radio" name="p" value="17" id="check17" class="form-check-input circle" v-model="sumOfDigit"><label for="check17" class="form-check-label entry-label">17</label></div>
                                        <div class="form-check" @change="threeSum()"><input type="radio" name="p" value="18" id="check18" class="form-check-input circle" v-model="sumOfDigit"><label for="check18" class="form-check-label entry-label">18</label></div>
                                        <div class="form-check" @change="threeSum()"><input type="radio" name="p" value="19" id="check19" class="form-check-input circle" v-model="sumOfDigit"><label for="check19" class="form-check-label entry-label">19</label></div>
                                        <div class="form-check" @change="threeSum()"><input type="radio" name="p" value="20" id="check20" class="form-check-input circle" v-model="sumOfDigit"><label for="check20" class="form-check-label entry-label">20</label></div>
                                        <div class="form-check" @change="threeSum()"><input type="radio" name="p" value="21" id="check21" class="form-check-input circle" v-model="sumOfDigit"><label for="check21" class="form-check-label entry-label">21</label></div>
                                        <div class="form-check" @change="threeSum()"><input type="radio" name="p" value="22" id="check22" class="form-check-input circle" v-model="sumOfDigit"><label for="check22" class="form-check-label entry-label">22</label></div>

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
    //import $ from 'jQuery';
    import interact from "interactjs";
    //import $ from "jquery";
    export default {
        data: function () {
            var set1 = new Set()
            return {
                countOfSolutions: 0,
                countOfFound: 0,
                isTrue: true,
                dropzone1:null,
                dropzone2:null,
                dropzone3:null,
                dropzone4:null,
                dropzone5:null,
                dropzone6:null,
                dropzone7:null,
                dropzone8:null,
                dropzone9:null,
                uniqueSolutions:0,
                uniqueSolutionsHTML:"<br>",
                countM:0,
                playAuto1:"Play Auto",
                switcher:false,
                set1:[],
                res:new Set(),
                mapRes: new Set(),
                finish: true,
                shouldAlert:false,

                sumOfDigit:13,
                numberCount:0,

                threeSumHTML: "",

            }
        },
        mounted: function(){
            let myDraggble = this.$refs.myDraggable;
            let myDraggble2 = this.$refs.myDraggable2;
            let myDraggble3 = this.$refs.myDraggable3;
            let myDraggble4 = this.$refs.myDraggable4;
            let myDraggble5 = this.$refs.myDraggable5;
            let myDraggble6 = this.$refs.myDraggable6;
            let myDraggble7= this.$refs.myDraggable7;
            let myDraggble8 = this.$refs.myDraggable8;
            let myDraggble9= this.$refs.myDraggable9;

            this.initInteract(myDraggble)
            this.initInteract(myDraggble2)
            this.initInteract(myDraggble3)
            this.initInteract(myDraggble4)
            this.initInteract(myDraggble5)
            this.initInteract(myDraggble6)
            this.initInteract(myDraggble7)
            this.initInteract(myDraggble8)
            this.initInteract(myDraggble9)

            let dragzone = this.$refs.dropzonePlace7;
            this.initDropArea(dragzone)
            this.initDropArea(this.$refs.dropzonePlace8);
            this.initDropArea(this.$refs.dropzonePlace9);


            this.initInteract2(this.$refs.dropzonePlace7.children[0])
            this.initInteract2(this.$refs.dropzonePlace8.children[0])
            this.initInteract2(this.$refs.dropzonePlace9.children[0])


            this.disabledDraggable(this.$refs.dropzonePlace7.children[0])
            this.disabledDraggable(this.$refs.dropzonePlace8.children[0])
            this.disabledDraggable(this.$refs.dropzonePlace9.children[0])

            this.threeSum()

        },
        methods: {
            enableAll: function(){
                let myDraggble = this.$refs.myDraggable;
                let myDraggble2 = this.$refs.myDraggable2;
                let myDraggble3 = this.$refs.myDraggable3;
                let myDraggble4 = this.$refs.myDraggable4;
                let myDraggble5 = this.$refs.myDraggable5;
                let myDraggble6 = this.$refs.myDraggable6;
                let myDraggble7= this.$refs.myDraggable7;
                let myDraggble8 = this.$refs.myDraggable8;
                let myDraggble9= this.$refs.myDraggable9;
                this.initInteract3(myDraggble)
                this.initInteract3(myDraggble2)
                this.initInteract3(myDraggble3)
                this.initInteract3(myDraggble4)
                this.initInteract3(myDraggble5)
                this.initInteract3(myDraggble6)
                this.initInteract3(myDraggble7)
                this.initInteract3(myDraggble8)
                this.initInteract3(myDraggble9)

                myDraggble.classList = "drag-drop"
                myDraggble2.classList = "drag-drop"
                myDraggble3.classList = "drag-drop"
                myDraggble4.classList = "drag-drop"
                myDraggble5.classList = "drag-drop"
                myDraggble6.classList = "drag-drop"
                myDraggble7.classList = "drag-drop"
                myDraggble8.classList = "drag-drop"
                myDraggble9.classList = "drag-drop"

            },
            addGridValue:function(event){
                this.reset()
                this.enableAll()
                var m = event.target
                if(m.tagName=="LI") {
                    m.classList = "add"
                    var cur = event.target.value
                    cur = cur.toString()
                    var res = cur.split("")


                    this.dropzone7 = res[0]
                    this.dropzone8 = res[1]
                    this.dropzone9 = res[2]

                    this.changeGridAndBox(res[0])
                    this.changeGridAndBox(res[1])
                    this.changeGridAndBox(res[2])
                    this.initInteract3(this.$refs.dropzonePlace7.children[0])
                    this.initInteract3(this.$refs.dropzonePlace8.children[0])
                    this.initInteract3(this.$refs.dropzonePlace9.children[0])
                }



            },
            changeGridAndBox:function(i){
                if(i==1){
                    this.$refs.myDraggable.classList = "dropped"
                    this.disabledDraggable(this.$refs.myDraggable)
                }else if(i==2){
                    this.$refs.myDraggable2.classList = "dropped"
                    this.disabledDraggable(this.$refs.myDraggable2)
                }else if(i==3){
                    this.$refs.myDraggable3.classList = "dropped"
                    this.disabledDraggable(this.$refs.myDraggable3)
                }else if(i==4){
                    this.$refs.myDraggable4.classList = "dropped"
                    this.disabledDraggable(this.$refs.myDraggable4)
                }else if(i==5){
                    this.$refs.myDraggable5.classList = "dropped"
                    this.disabledDraggable(this.$refs.myDraggable5)
                }else if(i==6){
                    this.$refs.myDraggable6.classList = "dropped"
                    this.disabledDraggable(this.$refs.myDraggable6)
                }else if(i==7){
                    this.$refs.myDraggable7.classList = "dropped"
                    this.disabledDraggable(this.$refs.myDraggable7)
                }else if(i==8){
                    this.$refs.myDraggable8.classList = "dropped"
                    this.disabledDraggable(this.$refs.myDraggable8)
                }else if(i==9){
                    this.$refs.myDraggable9.classList = "dropped"
                    this.disabledDraggable(this.$refs.myDraggable9)
                }
            },
            threeSum:function(){
                this.numberCount = 0
                this.threeSumHTML = ""
                var cur = [1,2,3,4,5,6,7,8,9]
                for(var i=0;i<cur.length;i++) {
                    for (var j = 0; j < cur.length; j++) {
                        for (var k = 0; k < cur.length; k++) {
                            if (cur[i] + cur[j] + cur[k] ==this.sumOfDigit && i != j && i != k && j != k) {
                                this.threeSumHTML += "<li value='"+cur[i]+cur[j]+cur[k]+"'>" + cur[i] + cur[j] + cur[k] + "</li>"
                                this.numberCount++;
                            }


                        }
                    }
                }
            },
            changeGridValue: function(event){
                if(event.target.tagName=="LI"){
                    var refOLt = this.$refs.olRefT
                    var olChildren = refOLt.children
                    for(var i=0;i<olChildren.length;i++){
                        var m = olChildren[i]
                        m.classList = ""
                    }
                    event.target.classList = "add"
                    var value = event.target.value.toString()
                    this.addToGridChange(value)}
            },
            addToGridChange:function(num){
                var res = num.split("")
                this.dropzone1 = res[0]
                this.dropzone2 = res[1]
                this.dropzone3 = res[2]
                this.dropzone4 = res[3]
                this.dropzone5 = res[4]
                this.dropzone6 = res[5]
                this.dropzone7 = res[6]
                this.dropzone8 = res[7]
                this.dropzone9 = res[8]
            },
            initReset:function(){
                this.$refs.myDraggable.classList = "dropped"
                this.$refs.myDraggable2.classList = "dropped"
                this.$refs.myDraggable3.classList ="dropped"
                this.$refs.myDraggable4.classList = "dropped"
                this.$refs.myDraggable5.classList = "dropped"
                this.$refs.myDraggable6.classList = "dropped"
                this.$refs.myDraggable7.classList = "dropped"
                this.$refs.myDraggable8.classList = "dropped"
                this.$refs.myDraggable9.classList = "dropped"

            },
            addToGrid(set1,res){
                var count = 0;
                var arr = this.set1[this.countM]
                if(!this.res.has(this.dropzone1*1)){
                    this.dropzone1 = arr[count]
                    count++
                }
                if(!this.res.has(this.dropzone2*1)){
                    this.dropzone2 = arr[count]
                    count++
                }if(!this.res.has(this.dropzone3*1)){
                    this.dropzone3 = arr[count]
                    count++
                }if(!this.res.has(this.dropzone4*1)){
                    this.dropzone4 = arr[count]
                    count++
                }if(!this.res.has(this.dropzone5*1)){
                    this.dropzone5 = arr[count]
                    count++
                }if(!this.res.has(this.dropzone6*1)){
                    this.dropzone6 = arr[count]
                    count++
                }if(!this.res.has(this.dropzone7*1)){
                    this.dropzone7 = arr[count]
                    count++
                }if(!this.res.has(this.dropzone8*1)){
                    this.dropzone8 = arr[count]
                    count++
                }if(!this.res.has(this.dropzone9*1)) {
                    this.dropzone9 = arr[count]
                    count++
                }
            },
            sleep: function(ms){
                return new Promise(resolve=>{
                    setTimeout(resolve,ms)
                })
            },
            disappear: function(){
                var cur = event.target
                var curVal = cur.innerHTML
                if(cur.classList=="dropped"){
                    if(this.dropzone1==curVal){
                        this.dropzone1 = null
                        this.disabledDraggable(this.$refs.dropzonePlace.children[0])


                    }
                    else if(this.dropzone2==curVal){
                        this.dropzone2 = null
                        this.disabledDraggable(this.$refs.dropzonePlace2.children[0])
                    }
                    else if(this.dropzone3==curVal){
                        this.dropzone3 = null
                        this.disabledDraggable(this.$refs.dropzonePlace3.children[0])

                    }
                    else if(this.dropzone4==curVal){
                        this.dropzone4 = null
                        this.disabledDraggable(this.$refs.dropzonePlace4.children[0])

                    }
                    else if(this.dropzone5==curVal){
                        this.dropzone5 = null
                        this.disabledDraggable(this.$refs.dropzonePlace5.children[0])

                    }else if(this.dropzone6==curVal){
                        this.dropzone6 = null
                        this.disabledDraggable(this.$refs.dropzonePlace6.children[0])

                    }else if(this.dropzone7==curVal){
                        this.dropzone7 = null
                        this.disabledDraggable(this.$refs.dropzonePlace7.children[0])

                    }else if(this.dropzone8==curVal){
                        this.dropzone8 = null
                        this.disabledDraggable(this.$refs.dropzonePlace8.children[0])

                    }else if(this.dropzone9==curVal){
                        this.dropzone9 = null
                        this.disabledDraggable(this.$refs.dropzonePlace9.children[0])

                    }
                    cur.classList.remove("dropped")
                    cur.classList.add("drag-drop")
                    this.initInteract3(cur)
                }
            },
            playAuto: async function(set1,res){
                this.switcher = false;
                var setCount = this.countM
                while(setCount<this.set1.length){
                    var temple=await this.sleep(30);
                    this.addToGrid(this.set1,this.res)
                    this.countM++
                    this.check()
                    setCount = this.countM
                    if(this.switcher==true ){
                        break;
                    }

                }
                if(this.set1.length==this.countM){
                    this.finish = false;
                }
            },
            playDemo: function(){
                this.addToGrid(this.set1,this.res)
                this.countM++
                this.check()
                if(this.set1.length==this.countM){
                    this.finish = false;
                }
            },

            permutation: function(count,res,set1) {
                if(count==res.length-1){
                    let ress= []
                    for(var i=0;i<res.length;i++){
                        ress[i] = res[i]
                    }
                    set1.push(ress)
                }
                else{
                    for(var j =count;j<res.length;j++){
                        this.swap(count,j,res)
                        this.permutation(count+1,res,set1)
                        this.swap(count,j,res)
                    }

                }
            },
            swap: function(i,j,res){
                var temp = res[i];
                res[i] = res[j]
                res[j] = temp
            },
            playTheGame: function(i,switcher,set1,res,event){
                if(this.dropzone7==null||this.dropzone8==null||this.dropzone9==null){
                    this.shouldAlert = true
                }
                else {
                    this.shouldAlert = false

                    if (i == 0) {
                        this.disabledDraggable(this.$refs.dropzonePlace7.children[0])
                        this.disabledDraggable(this.$refs.dropzonePlace8.children[0])
                        this.disabledDraggable(this.$refs.dropzonePlace9.children[0])

                        let myDraggble = this.$refs.myDraggable;
                        let myDraggble2 = this.$refs.myDraggable2;
                        let myDraggble3 = this.$refs.myDraggable3;
                        let myDraggble4 = this.$refs.myDraggable4;
                        let myDraggble5 = this.$refs.myDraggable5;
                        let myDraggble6 = this.$refs.myDraggable6;
                        let myDraggble7 = this.$refs.myDraggable7;
                        let myDraggble8 = this.$refs.myDraggable8;
                        let myDraggble9 = this.$refs.myDraggable9;
                        this.disabledDraggable(myDraggble)
                        this.disabledDraggable(myDraggble2)
                        this.disabledDraggable(myDraggble3)
                        this.disabledDraggable(myDraggble4)
                        this.disabledDraggable(myDraggble5)
                        this.disabledDraggable(myDraggble6)
                        this.disabledDraggable(myDraggble7)
                        this.disabledDraggable(myDraggble8)
                        this.disabledDraggable(myDraggble9)

                        this.set1 = []
                        this.res = new Set()

                        if (this.dropzone1 != null) {
                            this.res.add(this.dropzone1 * 1)
                        }
                        if (this.dropzone2 != null) {
                            this.res.add(this.dropzone2 * 1)
                        }
                        if (this.dropzone3 != null) {
                            this.res.add(this.dropzone3 * 1)
                        }
                        if (this.dropzone4 != null) {
                            this.res.add(this.dropzone4 * 1)
                        }
                        if (this.dropzone5 != null) {
                            this.res.add(this.dropzone5 * 1)
                        }
                        if (this.dropzone6 != null) {
                            this.res.add(this.dropzone6 * 1)
                        }
                        if (this.dropzone7 != null) {
                            this.res.add(this.dropzone7 * 1)
                        }
                        if (this.dropzone8 != null) {
                            this.res.add(this.dropzone8 * 1)
                        }
                        if (this.dropzone9 != null) {
                            this.res.add(this.dropzone9 * 1)
                        }

                        var newR = []
                        for (var l = 0; l < 9; l++) {
                            var cur = l + 1;
                            if (this.res.has(cur)) {

                            } else {
                                newR.push(cur)
                            }
                        }

                        this.permutation(0, newR, this.set1)

                    }
                    if (event.target.id == "auto") {
                        //alert(set1.length)
                        this.switcher = false;
                        if (this.playAuto1 == "Pause") {
                            this.switcher = true;
                            this.playAuto1 = "Play Auto"
                        } else {
                            this.playAuto1 = "Pause"

                            this.playAuto(this.set1, this.res)

                        }
                    } else {
                        this.playDemo()
                    }
                }


            },
            reset: function(){
                var refOL = this.$refs.olRef;
                var olChildren = refOL.children
                for(var i=0;i<olChildren.length;i++){
                    var m = olChildren[i]
                    m.classList = ""
                }
                var refOLt = this.$refs.olRefT
                olChildren = refOLt.children
                for(i=0;i<olChildren.length;i++){
                    m = olChildren[i]
                    m.classList = ""
                }
                this.finish = true;
                this.countOfSolutions = 0,
                    this.countOfFound = 0,

                    this.countM=0,
                    this.playAuto1 = "Play Auto",
                    this.switcher = false,
                    this.set1 = [],
                    this.res = new Set()

                this.dropzone1 = null
                this.dropzone2 = null
                this.dropzone3 = null
                this.dropzone4 = null
                this.dropzone5 = null
                this.dropzone6 = null
                this.dropzone7 = null
                this.dropzone8 = null
                this.dropzone9 = null

                let myDraggble = this.$refs.myDraggable;
                let myDraggble2 = this.$refs.myDraggable2;
                let myDraggble3 = this.$refs.myDraggable3;
                let myDraggble4 = this.$refs.myDraggable4;
                let myDraggble5 = this.$refs.myDraggable5;
                let myDraggble6 = this.$refs.myDraggable6;
                let myDraggble7= this.$refs.myDraggable7;
                let myDraggble8 = this.$refs.myDraggable8;
                let myDraggble9= this.$refs.myDraggable9;

                this.initInteract3(myDraggble)
                this.initInteract3(myDraggble2)
                this.initInteract3(myDraggble3)
                this.initInteract3(myDraggble4)
                this.initInteract3(myDraggble5)
                this.initInteract3(myDraggble6)
                this.initInteract3(myDraggble7)
                this.initInteract3(myDraggble8)
                this.initInteract3(myDraggble9)

                if(this.$refs.myDraggable.classList=="dropped"){
                    this.$refs.myDraggable.classList.remove("dropped")
                    this.$refs.myDraggable.classList.add("drag-drop")
                }
                if(this.$refs.myDraggable2.classList=="dropped"){
                    this.$refs.myDraggable2.classList.remove("dropped")
                    this.$refs.myDraggable2.classList.add("drag-drop")
                }if(this.$refs.myDraggable3.classList=="dropped"){
                    this.$refs.myDraggable3.classList.remove("dropped")
                    this.$refs.myDraggable3.classList.add("drag-drop")
                }if(this.$refs.myDraggable4.classList=="dropped"){
                    this.$refs.myDraggable4.classList.remove("dropped")
                    this.$refs.myDraggable4.classList.add("drag-drop")
                }if(this.$refs.myDraggable5.classList=="dropped"){
                    this.$refs.myDraggable5.classList.remove("dropped")
                    this.$refs.myDraggable5.classList.add("drag-drop")
                }if(this.$refs.myDraggable6.classList=="dropped"){
                    this.$refs.myDraggable6.classList.remove("dropped")
                    this.$refs.myDraggable6.classList.add("drag-drop")
                }if(this.$refs.myDraggable7.classList=="dropped"){
                    this.$refs.myDraggable7.classList.remove("dropped")
                    this.$refs.myDraggable7.classList.add("drag-drop")
                }if(this.$refs.myDraggable8.classList=="dropped"){
                    this.$refs.myDraggable8.classList.remove("dropped")
                    this.$refs.myDraggable8.classList.add("drag-drop")
                }if(this.$refs.myDraggable9.classList=="dropped"){
                    this.$refs.myDraggable9.classList.remove("dropped")
                    this.$refs.myDraggable9.classList.add("drag-drop")
                }
                this.disabledDraggable(this.$refs.dropzonePlace7.children[0])
                this.disabledDraggable(this.$refs.dropzonePlace8.children[0])
                this.disabledDraggable(this.$refs.dropzonePlace9.children[0])


                if(this.$refs.dropzonePlace.classList=="dropzone dropped-2"){
                    this.$refs.dropzonePlace.classList.remove("dropped-2")
                }if(this.$refs.dropzonePlace2.classList=="dropzone dropped-2"){
                    this.$refs.dropzonePlace2.classList.remove("dropped-2")
                }if(this.$refs.dropzonePlace3.classList=="dropzone dropped-2"){
                    this.$refs.dropzonePlace3.classList.remove("dropped-2")
                }if(this.$refs.dropzonePlace4.classList=="dropzone dropped-2"){
                    this.$refs.dropzonePlace4.classList.remove("dropped-2")
                }if(this.$refs.dropzonePlace5.classList=="dropzone dropped-2"){
                    this.$refs.dropzonePlace5.classList.remove("dropped-2")
                }if(this.$refs.dropzonePlace6.classList=="dropzone dropped-2"){
                    this.$refs.dropzonePlace6.classList.remove("dropped-2")
                }if(this.$refs.dropzonePlace7.classList=="dropzone dropped-2"){
                    this.$refs.dropzonePlace7.classList.remove("dropped-2")
                }if(this.$refs.dropzonePlace8.classList=="dropzone dropped-2"){
                    this.$refs.dropzonePlace8.classList.remove("dropped-2")
                }if(this.$refs.dropzonePlace9.classList=="dropzone dropped-2"){
                    this.$refs.dropzonePlace9.classList.remove("dropped-2")
                }
                /*
                if(this.$refs.dropzonePlace.parentNode.classList=="dropzone dropped-2 drop-active"){
                    draggableElement.parentNode.classList.remove("dropped-2")
                }

                 */


            },


            check: function(){
                if(this.dropzone1>0&&this.dropzone2>0&&this.dropzone3>0&&this.dropzone4>0&&this.dropzone5>0&&this.dropzone6>0&&this.dropzone7>0&&this.dropzone8>0&&this.dropzone9>0){
                    this.countOfFound ++;
                    this.checkNumber();
                }

            },
            checkNumber: function(){
                if(this.dropzone1*100+this.dropzone2*10+this.dropzone3*1+this.dropzone4*100+this.dropzone5*10+this.dropzone6*1-this.dropzone7*100-this.dropzone8*10-this.dropzone9*1==0){
                    this.countOfSolutions++;
                    var res = this.generateFunction();
                    if(!this.mapRes.has(res[0])){
                        this.uniqueSolutions++;
                        this.uniqueSolutionsHTML += "<li value='"+this.dropzone1+""+this.dropzone2+""+this.dropzone3+""+this.dropzone4+this.dropzone5+""+this.dropzone6+""+this.dropzone7+""+this.dropzone8+""+this.dropzone9+"'>"+res[0]+"</li>"
                        this.mapRes.add(res[0])
                        this.mapRes.add(res[1])
                    }
                }
            },
            generateFunction: function(){
                var str = this.dropzone1 +""+this.dropzone2+""+this.dropzone3+"+"+this.dropzone4+""+this.dropzone5+""+this.dropzone6+"="+this.dropzone7+""+this.dropzone8+""+this.dropzone9
                var str2 = this.dropzone4+""+this.dropzone5+""+this.dropzone6+"+"+this.dropzone1 +""+this.dropzone2+""+this.dropzone3+"="+this.dropzone7+""+this.dropzone8+""+this.dropzone9
                var resList = []
                resList.push(str)
                resList.push(str2)
                return resList;
            },
            enableDrag: function(event){
                var cur = event.target
                if(cur.classList=="dropped"){

                }
            },
            initInteract: function(selector) {
                this.isTrue = false;
                interact(selector).draggable({
                    // enable inertial throwing
                    inertia: true,
                    // keep the element within the area of it's parent
                    //restrict: {
                    //restriction: "parent",
                    //endOnly: true,
                    //elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
                    // },
                    // enable autoScroll
                    autoScroll: true,
                    onstart:this.start,
                    // call this function on every dragmove event
                    onmove: this.dragMoveListener,
                    // call this function on every dragend event
                    onend: this.onDragEnd
                });
            },
            initInteract2: function(selector) {
                this.isTrue = false;
                interact(selector).draggable({
                    // enable inertial throwing
                    inertia: true,
                    // keep the element within the area of it's parent
                    //restrict: {
                    //restriction: "parent",
                    //endOnly: true,
                    //elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
                    // },
                    // enable autoScroll
                    autoScroll: true,
                    onstart:this.start,
                    // call this function on every dragmove event
                    onmove: this.dragMoveListener,
                    // call this function on every dragend event
                    onend: this.onDragEnd
                });
            },
            initInteract3: function(selector){
                interact(selector).draggable(true)
            },
            disabledDraggable: function(selector){
                interact(selector).draggable(false)
            },
            dragMoveListener: function(event) {
                var target = event.target,
                    // keep the dragged position in the data-x/data-y attributes
                    x =
                        (parseFloat(target.getAttribute("data-x")) || 0) +
                        event.dx,
                    y =
                        (parseFloat(target.getAttribute("data-y")) || 0) +
                        event.dy;

                // translate the element
                target.style.webkitTransform = target.style.transform =
                    "translate(" + x + "px, " + y + "px)";

                // update the posiion attributes
                target.setAttribute("data-x", x);
                target.setAttribute("data-y", y);
            },
            onDragEnd: function(event) {
                var target = event.target;
                // update the state
                this.screenX = target.getBoundingClientRect().left;
                this.screenY = target.getBoundingClientRect().top;
                this.screenX = 0;
                this.screenY = 0;
                target.style.webkitTransform = target.style.transform =
                    "translate(" + 0 + "px, " + 0 + "px)";
                target.setAttribute("data-x", 0);
                target.setAttribute("data-y", 0);
            },
            enable1: function(i){
                if(i==1){
                    this.initInteract3(this.$refs.myDraggable)
                    this.$refs.myDraggable.classList.add("drag-drop")
                    this.$refs.myDraggable.classList.remove("dropped")
                }
                else if(i==2){
                    this.initInteract3(this.$refs.myDraggable2)
                    this.$refs.myDraggable2.classList.add("drag-drop")
                    this.$refs.myDraggable2.classList.remove("dropped")
                }
                else if(i==3){
                    this.initInteract3(this.$refs.myDraggable3)
                    this.$refs.myDraggable3.classList.add("drag-drop")
                    this.$refs.myDraggable3.classList.remove("dropped")
                }
                else if(i==4){
                    this.initInteract3(this.$refs.myDraggable4)
                    this.$refs.myDraggable4.classList.add("drag-drop")
                    this.$refs.myDraggable4.classList.remove("dropped")
                }
                else if(i==5){
                    this.initInteract3(this.$refs.myDraggable5)
                    this.$refs.myDraggable5.classList.add("drag-drop")
                    this.$refs.myDraggable5.classList.remove("dropped")
                }
                else if(i==6){
                    this.initInteract3(this.$refs.myDraggable6)
                    this.$refs.myDraggable6.classList.add("drag-drop")
                    this.$refs.myDraggable6.classList.remove("dropped")
                }
                else if(i==7){
                    this.initInteract3(this.$refs.myDraggable7)
                    this.$refs.myDraggable7.classList.add("drag-drop")
                    this.$refs.myDraggable7.classList.remove("dropped")
                }
                else if(i==8){
                    this.initInteract3(this.$refs.myDraggable8)
                    this.$refs.myDraggable8.classList.add("drag-drop")
                    this.$refs.myDraggable8.classList.remove("dropped")
                }
                else if(i==9){
                    this.initInteract3(this.$refs.myDraggable9)
                    this.$refs.myDraggable9.classList.add("drag-drop")
                    this.$refs.myDraggable9.classList.remove("dropped")
                }
            },
            enable2:function(dropPlace,number){
                if(dropPlace=="dropzone1"){
                    this.dropzone1 = number
                }
                else if(dropPlace=="dropzone2"){
                    this.dropzone2 = number
                }
                else if(dropPlace=="dropzone3"){
                    this.dropzone3 = number
                }
                else if(dropPlace=="dropzone4"){
                    this.dropzone4 = number
                }else if(dropPlace=="dropzone5"){
                    this.dropzone5 = number
                }else if(dropPlace=="dropzone6"){
                    this.dropzone6 = number
                }else if(dropPlace=="dropzone7"){
                    this.dropzone7 = number
                }else if(dropPlace=="dropzone8"){
                    this.dropzone8 = number
                }else if(dropPlace=="dropzone9"){
                    this.dropzone9 = number
                }

            },
            enable3:function(dropPlace){
                if(dropPlace=="dropzone1"){
                    this.dropzone1 = null
                }
                else if(dropPlace=="dropzone2"){
                    this.dropzone2 = null
                }
                else if(dropPlace=="dropzone3"){
                    this.dropzone3 = null
                }
                else if(dropPlace=="dropzone4"){
                    this.dropzone4 = null
                }else if(dropPlace=="dropzone5"){
                    this.dropzone5 = null
                }else if(dropPlace=="dropzone6"){
                    this.dropzone6 = null
                }else if(dropPlace=="dropzone7"){
                    this.dropzone7 = null
                }else if(dropPlace=="dropzone8"){
                    this.dropzone8 = null
                }else if(dropPlace=="dropzone9"){
                    this.dropzone9 = null
                }

            },
            ondrop: function(event){


                var draggableElement = event.relatedTarget;
                var dropzoneElement = event.target;

                dropzoneElement.classList.add("dropped-2")
                if(draggableElement.parentNode.classList=="dropzone dropped-2 drop-active"){
                    draggableElement.parentNode.classList.remove("dropped-2")
                }

                var dropzoneName = dropzoneElement.id
                var text = draggableElement.innerHTML


                if(draggableElement.classList=="dropzone-drop"){
                    if (dropzoneName == "dropzone1") {
                        if (dropzoneElement.children[0].innerHTML != "") {
                            let previous = dropzoneElement.children[0].innerHTML
                            //this.enable1(previous)
                            this.enable2(draggableElement.parentNode.id,previous)
                        }
                        else{
                            this.initInteract3(dropzoneElement.children[0])
                            this.enable3(draggableElement.parentNode.id)
                            this.disabledDraggable(draggableElement)

                        }
                        this.dropzone1 = text;

                    } else if (dropzoneName == "dropzone2") {
                        if (dropzoneElement.children[0].innerHTML != "") {
                            let previous = dropzoneElement.children[0].innerHTML
                            this.enable2(draggableElement.parentNode.id,previous)
                        }
                        else{
                            this.initInteract3(dropzoneElement.children[0])
                            this.enable3(draggableElement.parentNode.id)
                            this.disabledDraggable(draggableElement)
                        }
                        this.dropzone2 = text;
                    } else if (dropzoneName == "dropzone3") {
                        if (dropzoneElement.children[0].innerHTML != "") {
                            let previous = dropzoneElement.children[0].innerHTML
                            this.enable2(draggableElement.parentNode.id,previous)
                        }
                        else{
                            this.initInteract3(dropzoneElement.children[0])
                            this.enable3(draggableElement.parentNode.id)
                            this.disabledDraggable(draggableElement)


                        }
                        this.dropzone3 = text;
                    } else if (dropzoneName == "dropzone4") {
                        if (dropzoneElement.children[0].innerHTML != "") {
                            let previous = dropzoneElement.children[0].innerHTML
                            this.enable2(draggableElement.parentNode.id,previous)
                        }
                        else{
                            this.initInteract3(dropzoneElement.children[0])
                            this.enable3(draggableElement.parentNode.id)
                            this.disabledDraggable(draggableElement)

                        }
                        this.dropzone4 = text;
                    } else if (dropzoneName == "dropzone5") {

                        if (dropzoneElement.children[0].innerHTML != "") {
                            let previous = dropzoneElement.children[0].innerHTML
                            this.enable2(draggableElement.parentNode.id,previous)
                        }
                        else{
                            this.initInteract3(dropzoneElement.children[0])
                            this.enable3(draggableElement.parentNode.id)
                            this.disabledDraggable(draggableElement)

                        }

                        this.dropzone5 = text;
                    } else if (dropzoneName == "dropzone6") {
                        if (dropzoneElement.children[0].innerHTML != "") {
                            let previous = dropzoneElement.children[0].innerHTML
                            this.enable2(draggableElement.parentNode.id,previous)
                        }
                        else{
                            this.initInteract3(dropzoneElement.children[0])
                            this.enable3(draggableElement.parentNode.id)
                            this.disabledDraggable(draggableElement)

                        }
                        this.dropzone6 = text;
                    } else if (dropzoneName == "dropzone7") {
                        if (dropzoneElement.children[0].innerHTML != "") {
                            let previous = dropzoneElement.children[0].innerHTML
                            this.enable2(draggableElement.parentNode.id,previous)
                        }
                        else{
                            this.initInteract3(dropzoneElement.children[0])
                            this.enable3(draggableElement.parentNode.id)
                            this.disabledDraggable(draggableElement)

                        }
                        this.dropzone7 = text;
                    } else if (dropzoneName == "dropzone8") {
                        if (dropzoneElement.children[0].innerHTML != "") {
                            let previous = dropzoneElement.children[0].innerHTML
                            this.enable2(draggableElement.parentNode.id,previous)
                        }
                        else{
                            this.initInteract3(dropzoneElement.children[0])
                            this.enable3(draggableElement.parentNode.id)
                            this.disabledDraggable(draggableElement)

                        }

                        this.dropzone8 = text;
                    } else if (dropzoneName == "dropzone9") {
                        if (dropzoneElement.children[0].innerHTML != "") {
                            let previous = dropzoneElement.children[0].innerHTML
                            this.enable2(draggableElement.parentNode.id,previous)
                        }
                        else{
                            this.initInteract3(dropzoneElement.children[0])
                            this.enable3(draggableElement.parentNode.id)
                            this.disabledDraggable(draggableElement)

                        }
                        this.dropzone9 = text;
                    } else {

                    }
                    //this.initInteract2(dropzoneElement.children[0])

                }
                else {


                    draggableElement.classList.remove('drag-drop')
                    draggableElement.classList.add('dropped')
                    if (dropzoneName == "dropzone1") {
                        if (dropzoneElement.children[0].innerHTML != "") {
                            let previous = dropzoneElement.children[0].innerHTML
                            this.enable1(previous)
                        }
                        this.dropzone1 = text;

                    } else if (dropzoneName == "dropzone2") {
                        if (dropzoneElement.children[0].innerHTML != "") {
                            let previous = dropzoneElement.children[0].innerHTML
                            this.enable1(previous)
                        }
                        this.dropzone2 = text;
                    } else if (dropzoneName == "dropzone3") {
                        if (dropzoneElement.children[0].innerHTML != "") {
                            let previous = dropzoneElement.children[0].innerHTML
                            this.enable1(previous)
                        }
                        this.dropzone3 = text;
                    } else if (dropzoneName == "dropzone4") {
                        if (dropzoneElement.children[0].innerHTML != "") {
                            let previous = dropzoneElement.children[0].innerHTML
                            this.enable1(previous)
                        }
                        this.dropzone4 = text;
                    } else if (dropzoneName == "dropzone5") {

                        if (dropzoneElement.children[0].innerHTML != "") {
                            let previous = dropzoneElement.children[0].innerHTML
                            this.enable1(previous)
                        }

                        this.dropzone5 = text;
                    } else if (dropzoneName == "dropzone6") {
                        if (dropzoneElement.children[0].innerHTML != "") {
                            let previous = dropzoneElement.children[0].innerHTML
                            this.enable1(previous)
                        }
                        this.dropzone6 = text;
                    } else if (dropzoneName == "dropzone7") {
                        if (dropzoneElement.children[0].innerHTML != "") {
                            let previous = dropzoneElement.children[0].innerHTML
                            this.enable1(previous)
                        }
                        this.dropzone7 = text;
                    } else if (dropzoneName == "dropzone8") {
                        if (dropzoneElement.children[0].innerHTML != "") {
                            let previous = dropzoneElement.children[0].innerHTML
                            this.enable1(previous)
                        }
                        this.dropzone8 = text;
                    } else if (dropzoneName == "dropzone9") {
                        if (dropzoneElement.children[0].innerHTML != "") {
                            let previous = dropzoneElement.children[0].innerHTML
                            this.enable1(previous)
                        }
                        this.dropzone9 = text;
                    } else {

                    }
                    this.initInteract3(dropzoneElement.children[0])
                    this.disabledDraggable(draggableElement)

                    this.isTrue = true;
                }

                this.check()
                //draggableElement.setAttribute('onclick','enableDrag(event)')

                //parent.removeChild(draggableElement)
                //parent.appendChild(node)
                //event.relatedTarget.textContent = 'Dropped'

            },

            initDropArea: function (selector) {
                interact(selector).dropzone({
                    // only accept elements matching this CSS selector
                    accept: '#y1,#y2,#y3,#y4,#y5,#y6,#y7,#y8,#y9,.dropzone-drop',
                    // Require a 75% element overlap for a drop to be possible
                    overlap: 0.75,

                    // listen for drop related events:

                    ondropactivate: function (event) {
                        // add active dropzone feedback
                        event.target.classList.add('drop-active')
                    },
                    ondragenter: function (event) {
                        var draggableElement = event.relatedTarget;
                        var dropzoneElement = event.target;


                        // feedback the possibility of a drop
                        dropzoneElement.classList.add('drop-target')
                        //draggableElement.classList.add('can-drop')
                        //draggableElement.textContent = 'Dragged in'
                    },
                    ondragleave: function (event) {
                        // remove the drop feedback style
                        event.target.classList.remove('drop-target')
                        //event.relatedTarget.classList.remove('can-drop')
                        //event.relatedTarget.textContent = 'Dragged out'
                    },
                    ondrop: this.ondrop,
                    ondropdeactivate: function (event) {
                        // remove active dropzone feedback
                        event.target.classList.remove('drop-active')
                        event.target.classList.remove('drop-target')
                    }
                });
            },
        },
        name: "WorkingBackwards",

        watch:{
            countOfSolutions:{
                set: function () {
                    return 1;
                }
            }
        }
    }

</script>

<style scoped>
    .dropzone{
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
        font-size: 35px;
        height:55px;
        width: 55px;
        padding: 0;
        margin: 5px;

    }
    .functionzone{
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
        font-size: 35px;
        height: 55px;
        width: 55px;
        padding: 0;
        margin: 1vw;
        text-align: center;
    }
    .drag-drop{
        -ms-touch-action: none;
        touch-action: none;
        background:#4e4 ;
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
        font-size: 25px;
        height: 45px;
        width: 45px;
        margin-right: 10px;
        margin-top:10px ;
        margin-bottom: 10px;
        border: solid 1px #7f8c8d;
        border-radius: 0.4vw;
        text-align: center;
    }
    .drag-drop:hover{
        background: #eeeeee;
    }
    .drop-active {
        border-color: #aaa;
    }

    .drop-target {
        background-color: #4e4;
    //border-style: solid;
    }
    .dropped{
        background:#eeeeee;
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
        font-size: 25px;
        height: 45px;
        width: 45px;
        margin-right: 10px;
        margin-top:10px ;
        margin-bottom: 10px;
        border: solid 1px #7f8c8d;
        border-radius: 0.4vw;
        text-align: center;
    }
    .dropped{
        color:#7f8c8d;
    }
    .dropzone-drop{
        touch-action: none;
        -ms-touch-action: none;
    }
    .dropped-2{

    }
    .style-select{
        -webkit-appearance: none;

        overflow: hidden;
        width: 240px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
    }
    .entry-label {
        cursor: pointer;
        margin-top: -3px;
        padding-left: 40px;
        user-select: none;
        -moz-user-select: none;
        color: #545556;
        font-family: "Open Sans", sans-serif;
        font-size: 15px;
        font-weight: bold;

    }
    .circle {
        border: 2px solid #545556;
        border-radius: 50%;
        cursor: pointer;
        height: 20px;
        position: absolute;
        transition: border-color 300ms;
        width: 20px;
    }
    .entry:nth-child(2) {
        left: 8px;
        top: 8px;
    }
    .entry:nth-child(4) {
        left: 8px;
        top: 58px;
    }
    .entry:nth-child(6) {
        left: 8px;
        top: 108px;
    }
    select.styled {
        vertical-align: top;
        text-overflow: ellipsis;
        display: inline-block;

        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;

        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;

        -webkit-box-shadow: 0 1px 2px rgba(0,0,0,0.3);
        -moz-box-shadow: 0 1px 2px rgba(0,0,0,0.3);
        box-shadow: 0 1px 2px rgba(0,0,0,0.3);
    }
    select.styled:-moz-focusring,
    option.styled:-moz-focusring {
        color: transparent !important;
        text-shadow: 0 0 0 #000 !important;
    }
    select.styled::-ms-expand {
        display: none;
    }
    select.styled,
    select.styled option {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
        border: none;
        padding-left: 5px;
        border: 1px solid #fff;
        background: #ffffff;
    }
    select:focus.styled, option:focus.styled {
        outline: 1px solid white;
        border: 1px solid #ccc;
        -webkit-box-shadow: inset 0 1px 2px rgba(0,0,0,0.2);
        -moz-box-shadow: inset 0 1px 2px rgba(0,0,0,0.2);
        box-shadow: inset 0 1px 2px rgba(0,0,0,0.2);
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