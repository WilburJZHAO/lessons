<template>
    <div>
        <transition appear appear-class="app-appear" appear-active-class="app-appear-active">
            <div class="container mt-4 mb5">
                <div class="row">
                    <!-- Left part -->
                    <div class="col-12 col-md-6 app--lesson-left">
                        <div>

                            <h5 class="text-success">Double click on a square, or drag to move queen.</h5>
                            <div class="row queen"  style="height: 50px" ref="queenDragPlace">
                                <div v-bind:class="class1"></div>
                                <div v-bind:class="class2" id="drag2"></div>
                                <div v-bind:class="class3" id="drag3"></div>
                                <div v-bind:class="class4" id="drag4"></div>
                                <div v-bind:class="class5" id="drag5"></div>
                                <div v-bind:class="class6" id="drag6"></div>

                            </div>
                            <div class="couldNotDrag">
                                <input type="radio" id="one" value="1" v-model="queenNum" @change="changeQueenSize">
                                <label for="one" class="queensNum">&nbsp 1</label>
                                <input type="radio" id="two" value="2" v-model="queenNum"   @change="changeQueenSize">
                                <label for="two" class="queensNum">&nbsp 2</label>
                                <input type="radio" id="three" value="3" v-model="queenNum"  @change="changeQueenSize">
                                <label for="three" class="queensNum">&nbsp 3</label>
                                <input type="radio" id="four" value="4" v-model="queenNum"  @change="changeQueenSize">
                                <label for="four" class="queensNum">&nbsp 4</label>
                                <input type="radio" id="five" value="5" v-model="queenNum"  @change="changeQueenSize">
                                <label for="five" class="queensNum">&nbsp 5</label>
                                <input type="radio" id="six" value="6" v-model="queenNum"  @change="changeQueenSize">
                                <label for="six" class="queensNum"> &nbsp 6</label>
                            </div>
                            <select v-model="gridSize" @change="changeBoardSize()" class="couldNotDrag">
                                <option disabled value="8">Boardsize</option>
                                <option value="2">2x2 board</option>
                                <option value="3">3x3 board</option>
                                <option value="4">4x4 board</option>
                                <option value="5">5x5 board</option>
                                <option value="6">6x6 board</option>
                                <option value="7">7x7 board</option>
                                <option value="8">8x8 board</option>
                            </select>
                            <br>
                            <input type = "checkbox" v-model="checkedBox" id="checkbox" @change="changeTableAttr" class="couldNotDrag">
                            <label for="checkbox" class="couldNotDrag">Show uncovered squares</label>
                            <table class="boardTable" v-bind:class="tableAttr">
                                <tbody ref="tbody" @dblclick="removeQueen($event)">
                                <tr>
                                    <td><div class="addImg"></div></td><td><div class="addImg"></div></td><td v-bind:class="classDiv3"><div class="addImg"></div></td><td v-bind:class="classDiv4"><div class="addImg"></div></td><td v-bind:class="classDiv5"><div class="addImg"></div></td><td v-bind:class="classDiv6"><div class="addImg"></div></td><td v-bind:class="classDiv7"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td>
                                </tr>
                                <tr>
                                    <td><div class="addImg"></div></td><td><div class="addImg"></div></td><td v-bind:class="classDiv3"><div class="addImg"></div></td><td v-bind:class="classDiv4"><div class="addImg"></div></td><td v-bind:class="classDiv5"><div class="addImg"></div></td><td v-bind:class="classDiv6"><div class="addImg"></div></td><td v-bind:class="classDiv7"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td>
                                </tr>
                                <tr>
                                    <td v-bind:class="classDiv3"><div class="addImg"></div></td><td v-bind:class="classDiv3"><div class="addImg"></div></td><td v-bind:class="classDiv3"><div class="addImg"></div></td><td v-bind:class="classDiv4"><div class="addImg"></div></td><td v-bind:class="classDiv5"><div class="addImg"></div></td><td v-bind:class="classDiv6"><div class="addImg"></div></td><td v-bind:class="classDiv7"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td>
                                </tr>
                                <tr>
                                    <td v-bind:class="classDiv4"><div class="addImg"></div></td><td v-bind:class="classDiv4"><div class="addImg"></div></td><td v-bind:class="classDiv4"><div class="addImg"></div></td><td v-bind:class="classDiv4"><div class="addImg"></div></td><td v-bind:class="classDiv5"><div class="addImg"></div></td><td v-bind:class="classDiv6"><div class="addImg"></div></td><td v-bind:class="classDiv7"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td>
                                </tr>
                                <tr>
                                    <td v-bind:class="classDiv5"><div class="addImg"></div></td><td v-bind:class="classDiv5"><div class="addImg"></div></td><td v-bind:class="classDiv5"><div class="addImg"></div></td><td v-bind:class="classDiv5"><div class="addImg"></div></td><td v-bind:class="classDiv5"><div class="addImg"></div></td><td v-bind:class="classDiv6"><div class="addImg"></div></td><td v-bind:class="classDiv7"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td>
                                </tr>
                                <tr>
                                    <td v-bind:class="classDiv6"><div class="addImg"></div></td><td v-bind:class="classDiv6"><div class="addImg"></div></td><td v-bind:class="classDiv6"><div class="addImg"></div></td><td v-bind:class="classDiv6"><div class="addImg"></div></td><td v-bind:class="classDiv6"><div class="addImg"></div></td><td v-bind:class="classDiv6"><div class="addImg"></div></td><td v-bind:class="classDiv7"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td>
                                </tr>
                                <tr>
                                    <td v-bind:class="classDiv7"><div class="addImg"></div></td><td v-bind:class="classDiv7"><div class="addImg"></div></td><td v-bind:class="classDiv7"><div class="addImg"></div></td><td v-bind:class="classDiv7"><div class="addImg"></div></td><td v-bind:class="classDiv7"><div class="addImg"></div></td><td v-bind:class="classDiv7"><div class="addImg"></div></td><td v-bind:class="classDiv7"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td>
                                </tr>
                                <tr>
                                    <td v-bind:class="classDiv8"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td><td v-bind:class="classDiv8"><div class="addImg"></div></td>
                                </tr>
                                </tbody>
                            </table>
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
                            <h5 class="text-success">
                            To place the minimum number of queens so that all squares are covered.
                        </h5>
                        <p> <span style="font-size: 115%;" class="badge badge-dark">{{queenNum}}</span>Number of queens</p>
                        <p> <span style="font-size: 115%;" class="badge badge-dark">{{square}}</span>Squares covered</p>
                            <p><span style="font-size: 115%;" class="badge badge-dark">{{squareUncovered}}</span>Squares uncovered </p>




                            <table>
                                <tbody class="table-active tableRes">
                                <tr>
                                    <td>#Queens</td>
                                    <td>Max covered</td>
                                </tr>
                                <tr>
                                    <td>1
                                    </td>
                                    <td>{{res1}}</td>
                                </tr>
                                <tr v-if="show2">
                                    <td>2
                                    </td>
                                    <td>{{res2}}</td>
                                </tr>
                                <tr v-if="show3">
                                    <td>3
                                    </td>
                                    <td>{{res3}}</td>
                                </tr>
                                <tr v-if="show4">
                                    <td>4
                                    </td>
                                    <td>{{res4}}</td>
                                </tr>
                                <tr v-if="show5">
                                    <td>5
                                    </td>
                                    <td>{{res5}}</td>
                                </tr>
                                <tr v-if="show6">
                                    <td>6
                                    </td>
                                    <td>{{res6}}</td>
                                </tr>
                                </tbody>
                            </table>
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
        name: "ChessQueens",
        data: function () {
            return{
                gridSize:8,
                gridHTML:"",
                queenHTML:"",
                queenNum : 1,
                square:0,
                squareUncovered:64,

                class1:'startDrop',
                class2:'hiddenImg',
                class3:'hiddenImg',
                class4:'hiddenImg',
                class5:'hiddenImg',
                class6:'hiddenImg',

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

                checkedBox : []
            }

        },
        created:function(){
            //this.changeBoardSize()
            //this.changeQueenSize()
            },
        mounted:function(){

            this.initQueenDraggable()
            this.initDroppedArea()
            this.initBoardDraggable()


            //this.initDropArea(this.$refs.testDiv)
        },

        methods:{
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
                        this.initInteract(ele[j].children[0])
                        this.disabledDraggable(ele[j].children[0])
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

            removeQueen: function(event){
                var cur = event.target
                var queen = this.$refs.queenDragPlace
                var queenChildren = queen.children

                if(cur.classList == "addImg"||cur.classList=="addImg covered"){
                    if(queenChildren[0].classList == 'hiddenImg'){
                        queenChildren[0].classList = 'startDrop'
                        cur.classList = "hiddenImg"
                        this.initInteract3(queenChildren[0])
                        //this.disabledDraggable(cur)

                    }else if(queenChildren[1].classList == 'hiddenImg'){
                        queenChildren[1].classList = 'startDrop'
                        cur.classList = "hiddenImg"
                        this.initInteract3(queenChildren[1])

                    }else if(queenChildren[2].classList == 'hiddenImg'){
                        queenChildren[2].classList = 'startDrop'
                        cur.classList = "hiddenImg"
                        this.initInteract3(queenChildren[2])

                    }else if(queenChildren[3].classList == 'hiddenImg'){
                        queenChildren[3].classList = 'startDrop'
                        cur.classList = "hiddenImg"
                        this.initInteract3(queenChildren[3])

                    }else if(queenChildren[4].classList == 'hiddenImg'){
                        queenChildren[4].classList = 'startDrop'
                        cur.classList = "hiddenImg"
                        this.initInteract3(queenChildren[4])

                    }else if(queenChildren[5].classList == 'hiddenImg'){
                        queenChildren[5].classList = 'startDrop'
                        cur.classList = "hiddenImg"
                        this.initInteract3(queenChildren[5])

                    }
                    //if()
                }else {
                    if(cur.classList == "hiddenImg covered"){
                        if (queenChildren[0].classList == 'startDrop') {
                            queenChildren[0].classList = 'hiddenImg'
                            cur.classList = "addImg"
                            this.initInteract3(cur)
                        } else if (queenChildren[1].classList == 'startDrop') {
                            queenChildren[1].classList = 'hiddenImg'
                            cur.classList = "addImg"
                            this.initInteract3(cur)
                        } else if (queenChildren[2].classList == 'startDrop') {
                            queenChildren[2].classList = 'hiddenImg'
                            cur.classList = "addImg"
                            this.initInteract3(cur)
                        } else if (queenChildren[3].classList == 'startDrop') {
                            queenChildren[3].classList = 'hiddenImg'
                            cur.classList = "addImg"
                            this.initInteract3(cur)
                        } else if (queenChildren[4].classList == 'startDrop') {
                            queenChildren[4].classList = 'hiddenImg'
                            cur.classList = "addImg"
                            this.initInteract3(cur)
                        } else if (queenChildren[5].classList == 'startDrop') {
                            queenChildren[5].classList = 'hiddenImg'
                            cur.classList = "addImg"
                            this.initInteract3(cur)
                        } else {
                        }
                    }

                    else if (cur.children[0]!=null&&cur.children[0].classList== "addImg"||cur.children[0].classList== "addImg covered") {

                    } else {

                        //click on to append a queen
                        if (queenChildren[0].classList == 'startDrop') {
                            queenChildren[0].classList = 'hiddenImg'
                            cur.children[0].classList = "addImg"
                            this.initInteract3(cur.children[0])
                        } else if (queenChildren[1].classList == 'startDrop') {
                            queenChildren[1].classList = 'hiddenImg'
                            cur.children[0].classList = "addImg"
                            this.initInteract3(cur.children[0])
                        } else if (queenChildren[2].classList == 'startDrop') {
                            queenChildren[2].classList = 'hiddenImg'
                            cur.children[0].classList = "addImg"
                            this.initInteract3(cur.children[0])
                        } else if (queenChildren[3].classList == 'startDrop') {
                            queenChildren[3].classList = 'hiddenImg'
                            cur.children[0].classList = "addImg"
                            this.initInteract3(cur.children[0])
                        } else if (queenChildren[4].classList == 'startDrop') {
                            queenChildren[4].classList = 'hiddenImg'
                            cur.children[0].classList = "addImg"
                            this.initInteract3(cur.children[0])
                        } else if (queenChildren[5].classList == 'startDrop') {
                            queenChildren[5].classList = 'hiddenImg'
                            cur.children[0].classList = "addImg"
                            this.initInteract3(cur.children[0])
                        } else {
                        }

                    }
                }
                this.removeCovered()
            },
            initQueenDraggable:function(){
                var parent = this.$refs.queenDragPlace
                var children = parent.children
                for(var i=0;i<children.length;i++){
                    this.initInteract(children[i])
                }
            },
            initQueenDraggableReset:function(){
                var parent = this.$refs.queenDragPlace
                var children = parent.children
                for(var i=0;i<children.length;i++){
                    this.initInteract3(children[i])
                }
            },
            initInteract3: function(selector){
                interact(selector).draggable(true)
            },
            initDroppedArea:function(){
                var parent = this.$refs.tbody
                var childrenDropPlace = parent.children
                for(var i=0;i<childrenDropPlace.length;i++){
                    var childrenTd = childrenDropPlace[i].children
                    for(var j=0;j<childrenTd.length;j++){
                        this.initDropArea(childrenTd[j])
                    }
                }

            },
            changeQueenSize:function(){
                var queenNum = this.queenNum
                this.class1="startDrop";
                this.class2='startDrop';
                this.class3='startDrop';
                this.class4='startDrop';
                this.class5='startDrop';
                this.class6='startDrop';

                this.show2 = false
                this.show3 = false
                this.show4 = false
                this.show5 = false
                this.show6 = false
                if(queenNum==1){
                    this.class2='hiddenImg';
                    this.class3='hiddenImg';
                    this.class4='hiddenImg';
                    this.class5='hiddenImg';
                    this.class6='hiddenImg';
                }
                else if(queenNum==2){
                    this.class3='hiddenImg';
                    this.class4='hiddenImg';
                    this.class5='hiddenImg';
                    this.class6='hiddenImg';
                    this.show2 = true
                }else if(queenNum==3){
                    this.class4='hiddenImg';
                    this.class5='hiddenImg';
                    this.class6='hiddenImg';
                    this.show2 = true
                    this.show3 = true
                }else if(queenNum==4){
                    this.class5='hiddenImg';
                    this.class6='hiddenImg';
                    this.show2 = true
                    this.show3 = true
                    this.show4 = true
                }else if(queenNum==5){
                    this.class6='hiddenImg';
                    this.show2 = true
                    this.show3 = true
                    this.show4 = true
                    this.show5 = true
                }else if(queenNum == 6){
                    this.show2 = true
                    this.show3 = true
                    this.show4 = true
                    this.show5 = true
                    this.show6 = true
                }
                this.reset()



            },
            changeBoardSize: function () {
                this.changeQueenSize()
                this.classDiv3 = ''
                this.classDiv4 = ''
                this.classDiv5 = ''
                this.classDiv6 = ''
                this.classDiv7 = ''
                this.classDiv8 = ''
                var count = this.gridSize
                while(count<8){
                    if(count==7){
                        this.classDiv8 = "hiddenImg"
                    }
                    else if(count==6){
                        this.classDiv7 = "hiddenImg"
                    }else if(count==5){
                        this.classDiv6 = "hiddenImg"
                    }else if(count==4){
                        this.classDiv5 = "hiddenImg"
                    }else if(count==3){
                        this.classDiv4 = "hiddenImg"
                    }
                    else if(count==2){
                        this.classDiv3 = "hiddenImg"
                    }
                    count++
                }
                this.square = 0
                this.squareUncovered = this.gridSize * this.gridSize

            },

            initInteract: function(selector) {
                this.isTrue = false;
                /*
                interact(selector)
                    .on('click', event => event.stopImmediatePropagation(), { capture: true })*/
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
                    //onstart:this.start,
                    // call this function on every dragmove event
                    onmove: this.dragMoveListener,
                    // call this function on every dragend event
                    onend: this.onDragEnd
                });
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

            ondrop:function (event) {


                var dropZone = event.target
                var drag = event.relatedTarget
                if(dropZone.children[0].classList!="addImg"&&dropZone.children[0].classList!="addImg covered")
                {
                    drag.classList = "hiddenImg"
                    dropZone.children[0].classList = "addImg"
                    this.initInteract3(dropZone.children[0])
                    this.disabledDraggable(drag)
                    this.removeCovered()
                }
                //dropZone.classList = "addImg"

            },
            initDropArea: function (selector) {
                interact(selector).dropzone({
                    // only accept elements matching this CSS selector
                    accept: '.startDrop,#drag2,#drag3,#drag4,#drag5,#drag6,.addImg',
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




            removeCovered: function () {
                var countM = 0
                var body = this.$refs.tbody
                var trow = body.children
                var arr1 = []
                var arr2 = []
                for(var aa=0;aa<trow.length;aa++){
                    var mrow = trow[aa].children
                    for(var bb=0;bb<mrow.length;bb++){
                        if(mrow[bb].children[0].classList=="addImg"||mrow[bb].children[0].classList=="addImg covered"){
                            arr1.push(aa)
                            arr2.push(bb)
                            countM++
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

                var arrCount = 0
                while(arr1.length>arrCount) {
                    var count = arr2[arrCount]
                    var count2 = arr1[arrCount]
                    for (var l = 0; l < trow.length; l++) {
                        mrow = trow[l].children
                        for (var j = 0; j < mrow.length; j++) {

                            if (j == count && mrow[j].classList != "hiddenImg drop-active") {
                                mrow[j].children[0].classList.add("covered")
                                mrow[j].classList.add("coveredTD")
                            } else if (j + l == count + count2 || j - count == l - count2) {
                                if (mrow[j].classList != "hiddenImg drop-active") {
                                    mrow[j].children[0].classList.add("covered")
                                    mrow[j].classList.add("coveredTD")
                                }
                            }else if(l==count2){
                                mrow[j].children[0].classList.add("covered")
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
                        if(mrow[n].children[0].classList=="hiddenImg covered"||mrow[n].children[0].classList=="addImg covered"){
                            this.square += 1;
                        }
                    }
                }
                this.squareUncovered = this.gridSize*this.gridSize - this.square

                var queenPlace = this.$refs.queenDragPlace
                var queenChildren = queenPlace.children



                if(countM==0){
                    this.res1 = null
                    this.res2 = null
                    this.res3 = null
                    this.res4 = null
                    this.res5 = null
                    this.res6 = null
                }
                if(countM==1){
                    this.res1 = this.square
                    this.res2 = null
                    this.res3 = null
                    this.res4 = null
                    this.res5 = null
                    this.res6 = null
                }else if(countM==2){
                    this.res2 = this.square
                    this.res3 = null
                    this.res4 = null
                    this.res5 = null
                    this.res6 = null
                }else if(countM==3){
                    this.res3 = this.square
                    this.res4 = null
                    this.res5 = null
                    this.res6 = null
                }else if(countM==4){
                    this.res4 = this.square

                    this.res5 = null
                    this.res6 = null
                }else if(countM==5){
                    this.res5 = this.square
                    this.res6 = null
                }else if(countM==6){
                    this.res6 = this.square
                }
            },
            reset:function () {
                this.res1 = null
                this.res2 = null
                this.res3 = null
                this.res4 = null
                this.res5 = null
                this.res6 = null
                this.initQueenDraggableReset()
                var body = this.$refs.tbody
                var trow = body.children

                for(var aa=0;aa<trow.length;aa++){
                    var mrow = trow[aa].children
                    for(var bb=0;bb<mrow.length;bb++){
                        if(mrow[bb].children[0].classList=="addImg"||mrow[bb].children[0].classList=="addImg covered"){
                            mrow[bb].children[0].classList = "hiddenImg"
                            mrow[bb].classList.remove("coveredTD")
                            this.removeQueenChange()
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
    .table2.boardTable >>> td{
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        font-size: 35px;
        height: 40px;
        width: 40px;
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
        height: 40px;
        width: 40px;
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
        height:40px;
        width: 40px;
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
        height:40px;
        width: 40px;
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
        height:40px;
        width: 40px;
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
    .queen >>> div{
        background: url("../../../assets/queen.png");
        background-size: 35px 35px;
        height: 35px;
        width: 35px;
        margin-left:15px;
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


</style>