<template>
    <div>
        <transition appear appear-class="app-appear" appear-active-class="app-appear-active">
            <div class="container mt-3">
                <h3 class="lesson-subheading">Testing all combinations</h3>
                <hr class="subheading-separator">
                <div class="row">
                    <!-- Left part -->
                    <div class="col-12 col-md-6 app--lesson-left">
                        <div>

                            <table>
                                <tr>
                                    <td class="dropzone" ref="dropzonePlace" id="dropzone1">
                                        <div style='text-align: center;margin: 0;border: #7f8c8d 1px solid;border-radius: 0.4vw;height: 95%;' class="dropzone-drop">{{dropzone1}}</div>
                                    </td>
                                    <td class="functionzone">
                                        +
                                    </td>
                                    <td class="dropzone" id="dropzone2" ref="dropzonePlace2">
                                        <div style='text-align: center;margin: 0;border: #7f8c8d 1px solid;border-radius: 0.4vw;height: 95%;' class="dropzone-drop">{{dropzone2}}</div>
                                    </td>
                                    <td class="functionzone">
                                        -
                                    </td>
                                    <td class="dropzone" id="dropzone3" ref="dropzonePlace3">
                                        <div style='text-align: center;margin: 0;border: #7f8c8d 1px solid;border-radius: 0.4vw;height: 95%;' class="dropzone-drop">{{dropzone3}}</div>
                                    </td>
                                    <td class="functionzone">
                                        =
                                    </td>
                                    <td class="dropzone" id="dropzone4" ref="dropzonePlace4">
                                        <div style='text-align: center;margin: 0;border: #7f8c8d 1px solid;border-radius: 0.4vw;height: 95%;' class="dropzone-drop">{{dropzone4}}</div>
                                    </td>

                                </tr>
                            </table>

                            <div style="width: 100%;background-color: transparent;text-align: left" id="dragArea">
                                <div style="display: inline-block;" v-if="appear">
                                    <div class="drag-drop" id="y1" ref="myDraggable" @dblclick="disappear($event)">1</div></div>
                                <div style="display: inline-block;" v-if="appear2"><div class="drag-drop" id="y2" ref="myDraggable2" @dblclick="disappear($event)">2</div></div>
                                <div style="display: inline-block" v-if="appear3"><div class="drag-drop" id="y3" ref="myDraggable3" @dblclick="disappear($event)">3</div></div>
                                <div style="display: inline-block" v-if="appear4"><div class="drag-drop" id="y4" ref="myDraggable4" @dblclick="disappear($event)">4</div></div>
                                <div style="display: inline-block" v-if="appear5"><div class="drag-drop" id="y5" ref="myDraggable5" @dblclick="disappear($event)">5</div></div>
                                <div style="display: inline-block" v-if="appear6"><div class="drag-drop" id="y6" ref="myDraggable6" @dblclick="disappear($event)">6</div></div>
                                <div style="display: inline-block" v-if="appear7"><div class="drag-drop" id="y7" ref="myDraggable7" @dblclick="disappear($event)">7</div></div>
                                <div style="display: inline-block" v-if="appear8"><div class="drag-drop" id="y8" ref="myDraggable8" @dblclick="disappear($event)">8</div></div>
                                <div style="display: inline-block" v-if="appear9"><div class="drag-drop" id="y9" ref="myDraggable9" @dblclick="disappear($event)">9</div></div>
                            </div>
                            <div class="app--lesson-action">
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
                            <div class="tt--solutions mb-5" style="padding-bottom: 30px">
                                <div class="mr-3 tt--solutions-count">
                                    <p>
                                        <span style="font-size: 115%;" class="badge badge-dark">{{ countOfSolutions }}</span> Solutions
                                    </p>
                                    <p>
                                        <span style="font-size: 115%;" class="badge badge-dark">{{ countOfFound }}</span> Count
                                    </p>
                                    <button
                                            type="submit"
                                            class="btn btn-outline-success btn-lg"
                                            :disabled="finish" @click="reset">Reset</button>
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
                            <p>
                                <span style="font-size: 115%;" class="badge badge-dark">{{ uniqueSolutions }}</span> Unique solutions found
                            </p>
                            <form>
                            <select id="solutionsField" name="uniqueRes" @change="changeGridValue($event)" v-html="uniqueSolutionsHTML" style="text-align: left;font-size:15px;border:white 0px;overflow-y:scroll" size="15" class="style-select">
                            </select>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import global from './ChangeNumbers'
    import interact from "interactjs";

    export default {
        data:function(){
            return{
                cardNumbers: [],

                appear : false,
                appear2 : false,
                appear3 : false,
                appear4 : false,
                appear5 : false,
                appear6 : false,
                appear7 : false,
                appear8 : false,
                appear9 : false,

                dropzone1:null,
                dropzone2:null,
                dropzone3:null,
                dropzone4:null,

                countOfSolutions:0,
                countOfFound:0,
                uniqueSolutions:0,
                uniqueSolutionsHTML:"<br>",

                setRes: new Set(),

                playAuto1 : "Play Auto",
                set1 : new Set,
                res : new Set,
                countM:0,
                switcher:false,

                finish: true,

                resSet : new Set(),

            }
        },
        created: function () {
            let cardNumbers = global.methods.numberReturn().slice(0);
            this.mapNumberDisappear()
            for(var i=0; i < cardNumbers.length; i++){
                var current = Number(cardNumbers[i])
                this.mapNumbersAppear(current)
            }
            this.cardNumbers = cardNumbers.slice(0); // save card numbers for later use
        },

        watch: {
          uniqueSolutionsHTML() {
            this.$nextTick( function() {
              const solutionsField = document.getElementById("solutionsField");
              solutionsField.scrollTop = solutionsField.scrollHeight;
            });
          }
        },

        methods:{

          initReset: function () {
              if(this.appear==true){
                  this.$refs.myDraggable.classList="drag-drop"
              }if(this.appear2==true){
                  this.$refs.myDraggable2.classList="drag-drop"
              }if(this.appear3==true){
                  this.$refs.myDraggable3.classList="drag-drop"
              }if(this.appear4==true){
                  this.$refs.myDraggable4.classList="drag-drop"
              }if(this.appear5==true){
                  this.$refs.myDraggable5.classList="drag-drop"
              }if(this.appear6==true){
                  this.$refs.myDraggable6.classList="drag-drop"
              }if(this.appear7==true){
                  this.$refs.myDraggable7.classList="drag-drop"
              }if(this.appear8==true){
                  this.$refs.myDraggable8.classList="drag-drop"
              }if(this.appear9==true){
                  this.$refs.myDraggable9.classList="drag-drop"
              }
          },

            changeGridValue: function(event){
                var value = event.target.value
                this.addToGridChange(value)
            },
            addToGridChange:function(num){
                var res = num.split("")
                this.dropzone1 = res[0]
                this.dropzone2 = res[1]
                this.dropzone3 = res[2]
                this.dropzone4 = res[3]
                this.initReset()
                this.changeColor(res[0])
                this.changeColor(res[1])
                this.changeColor(res[2])
                this.changeColor(res[3])
            },
            changeColor:function(i){
                if(i==1){
                    this.$refs.myDraggable.classList.remove("drag-drop")
                    this.$refs.myDraggable.classList.add("dropped")
                }else if(i==2){
                    this.$refs.myDraggable2.classList.remove("drag-drop")
                    this.$refs.myDraggable2.classList.add("dropped")
                }else if(i==3){
                    this.$refs.myDraggable3.classList.remove("drag-drop")
                    this.$refs.myDraggable3.classList.add("dropped")
                }else if(i==4){
                    this.$refs.myDraggable4.classList.remove("drag-drop")
                    this.$refs.myDraggable4.classList.add("dropped")
                }else if(i==5){
                    this.$refs.myDraggable5.classList.remove("drag-drop")
                    this.$refs.myDraggable5.classList.add("dropped")
                }else if(i==6){
                    this.$refs.myDraggable6.classList.remove("drag-drop")
                    this.$refs.myDraggable6.classList.add("dropped")
                }else if(i==7){
                    this.$refs.myDraggable7.classList.remove("drag-drop")
                    this.$refs.myDraggable7.classList.add("dropped")
                }else if(i==8){
                    this.$refs.myDraggable8.classList.remove("drag-drop")
                    this.$refs.myDraggable8.classList.add("dropped")
                }else if(i==9){
                    this.$refs.myDraggable9.classList.remove("drag-drop")
                    this.$refs.myDraggable9.classList.add("dropped")
                }
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
                }
            },
            sleep: function(ms){
                return new Promise(resolve=>{
                    setTimeout(resolve,ms)
                })
            },

            playAuto: async function(set1,res){
                this.switcher = false;
                var setCount = this.countM
                while(setCount<this.set1.length){

                    this.addToGrid(this.set1,this.res)
                    var resFunction = this.generateFunction()
                    if(this.resSet.has(resFunction)){

                    }else{
                        var temple=await this.sleep(30);
                        this.check()
                        this.resSet.add(resFunction)

                    }
                    this.countM++
                    setCount = this.countM
                    if(this.switcher==true ){
                        break;
                    }
                }
                if(this.countM==this.set1.length){
                    this.finish = false
                }
            },
            playDemo: function(){
                this.addToGrid(this.set1,this.res)
                var resFunction = this.generateFunction()
                while(this.resSet.has(resFunction)){
                    this.countM++
                    this.addToGrid(this.set1,this.res)
                    resFunction = this.generateFunction()
                }

                    this.resSet.add(resFunction)
                    this.check()

                this.countM++

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
                this.initReset()
                if(i==0) {

                    this.disabledDraggable(this.$refs.dropzonePlace.children[0])
                    this.disabledDraggable(this.$refs.dropzonePlace2.children[0])
                    this.disabledDraggable(this.$refs.dropzonePlace3.children[0])
                    this.disabledDraggable(this.$refs.dropzonePlace4.children[0])

                    this.disableDraggble()


                    this.set1 = []
                    this.res = new Set()

                    if (this.dropzone1 != null) {
                        this.res.add(Number(this.dropzone1))
                    }
                    if (this.dropzone2 != null) {
                        this.res.add(Number(this.dropzone2))
                    }
                    if (this.dropzone3 != null) {
                        this.res.add(Number(this.dropzone3))
                    }
                    if (this.dropzone4 != null) {
                        this.res.add(Number(this.dropzone4))
                    }
                    var newR = []

                    for (var l = 0; l < this.cardNumbers.length; l++) {
                        var cur = this.cardNumbers[l];
                        if (this.res.has(cur)) {

                        } else {
                            newR.push(cur)
                        }
                    }


                    this.permutation(0, newR, this.set1)

                }
                if(event.target.id=="auto"){
                    this.switcher = false;
                    if(this.playAuto1=="Pause"){
                        this.switcher = true;
                        this.playAuto1="Play Auto"
                    }
                    else{
                        this.playAuto1 = "Pause"
                        this.playAuto(this.set1,this.res)

                    }}
                else{
                    this.playDemo()
                }


            },

            disappear: function(event){
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
                    cur.classList.remove("dropped")
                    cur.classList.add("drag-drop")
                    this.initInteract3(cur)
                }
            },

            mapNumberDisappear: function(){
                return{
                    appear : false,
                    appear2 : false,
                    appear3 : false,
                    appear4 : false,
                    appear5 : false,
                    appear6 : false,
                    appear7 : false,
                    appear8 : false,
                    appear9 : false,
                }
            },
            mapNumbersAppear: function (i) {
                if(i==1){
                    this.appear = true;
                }
                if(i==2){
                    this.appear2 = true;
                }
                if(i==3){
                    this.appear3 = true;
                }
                if(i==4){
                    this.appear4 = true;
                }if(i==5){
                    this.appear5 = true;
                }
                if(i==6){
                    this.appear6 = true;
                }if(i==7){
                    this.appear7 = true;
                }
                if(i==8){
                    this.appear8 = true;
                }
                if(i==9){
                    this.appear9 = true;
                }
            },
            initStart:function(){
                if(this.appear==true){
                    this.initInteract(this.$refs.myDraggable)
                }if(this.appear2==true){
                    this.initInteract(this.$refs.myDraggable2)
                }if(this.appear3==true){
                    this.initInteract(this.$refs.myDraggable3)
                }if(this.appear4==true){
                    this.initInteract(this.$refs.myDraggable4)
                }if(this.appear5==true){
                    this.initInteract(this.$refs.myDraggable5)
                }if(this.appear6==true){
                    this.initInteract(this.$refs.myDraggable6)
                }if(this.appear7==true){
                    this.initInteract(this.$refs.myDraggable7)
                }if(this.appear8==true){
                    this.initInteract(this.$refs.myDraggable8)
                }if(this.appear9==true){
                    this.initInteract(this.$refs.myDraggable9)
                }
            },
            initInteract: function(selector) {

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
                        (parseFloat(target.getAttribute("data-x")) || this.screenX) +
                        event.dx,
                    y =
                        (parseFloat(target.getAttribute("data-y")) || this.screenY) +
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
            ondrop: function(event){


                var draggableElement = event.relatedTarget;
                var dropzoneElement = event.target;



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
                    }
                    else {

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
                }

            },
            disableDraggble: function(){
                if(this.appear==true){
                    this.disabledDraggable(this.$refs.myDraggable)
                }if(this.appear2==true){
                    this.disabledDraggable(this.$refs.myDraggable2)
                }if(this.appear3==true){
                    this.disabledDraggable(this.$refs.myDraggable3)
                }if(this.appear4==true){
                    this.disabledDraggable(this.$refs.myDraggable4)
                }if(this.appear5==true){
                    this.disabledDraggable(this.$refs.myDraggable5)
                }if(this.appear6==true){
                    this.disabledDraggable(this.$refs.myDraggable6)
                }if(this.appear7==true){
                    this.disabledDraggable(this.$refs.myDraggable7)
                }if(this.appear8==true){
                    this.disabledDraggable(this.$refs.myDraggable8)
                }if(this.appear9==true){
                    this.disabledDraggable(this.$refs.myDraggable9)
                }
            },

            generateFunction: function(){
                var str = this.dropzone1 + "+" + this.dropzone2 + "-" + this.dropzone3 + "=" + this.dropzone4
                return str;
            },

            check: function(){
                if(this.dropzone1>0&&this.dropzone2>0&&this.dropzone3>0&&this.dropzone4>0){

                    this.countOfFound ++;
                    this.checkNumber();
                }

            },
            checkNumber: function(){
                if(Number(this.dropzone1) + Number(this.dropzone2) - Number(this.dropzone3) === Number(this.dropzone4)){
                    this.countOfSolutions++;
                    var res = this.generateFunction();
                    if(!this.setRes.has(res)){
                        this.setRes.add(res)
                        this.uniqueSolutions++;
                        this.uniqueSolutionsHTML += "<option value='"+this.dropzone1+""+this.dropzone2+""+this.dropzone3+""+this.dropzone4+"'>"+res+"</option>"
                    }
                }
            },

            reset: function () {
                this.resSet = new Set()
                this.finish = true

                this.dropzone1=null;
                this.dropzone2=null;
                this.dropzone3=null;
                this.dropzone4=null;

                this.playAuto1 =  "Play Auto";
                this.set1 = new Set();
                this.res = new Set();
                this.countM = 0;
                this.switcher = false;

                this.countOfSolutions = 0;
                this.countOfFound = 0;
                this.uniqueSolutions = 0;
                this.uniqueSolutionsHTML = "<br>";
                this.setRes = new Set();
            },
        },
        name: "TestingAll"
    }
</script>

<style scoped>
    .dropzone{
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
        font-size: 35px;
        height:45px;
        width: 45px;
        padding: 0;
        margin: 5px;

    }
    .functionzone{
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
        font-size: 35px;
        height: 40px;
        width: 40px;
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
        font-size: 30px
    }
    .style-select{
        -webkit-appearance: none;

        overflow: hidden;
        width: 240px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
    }
</style>