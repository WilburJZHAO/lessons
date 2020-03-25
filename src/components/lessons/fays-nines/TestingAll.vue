<template>
    <div>
        <transition appear appear-class="app-appear" appear-active-class="app-appear-active">
            <div class="container mt-4 mb5">
                <div class="row">
                    <!-- Left part -->
                    <div class="col-12 col-md-6 app--lesson-left">
                        <div>
                            <h5 class="text-warning">
                                Note: This simulation takes significant time.
                            </h5>

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
                                    <td class="functionzone"></td>
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
                                <tr >
                                    <td class="functionzone">+</td>
                                    <td class="dropzone" id="dropzone7" ref="dropzonePlace7">
                                        <div style='text-align: center;margin: 0;border: #7f8c8d 1px solid;border-radius: 0.4vw;height: 95%;color: #00008B' class="dropzone-drop">{{dropzone7}}</div>
                                    </td>

                                    <td class="dropzone" id="dropzone8" ref="dropzonePlace8">
                                        <div style='text-align: center;margin: 0;border: #7f8c8d 1px solid;border-radius: 0.4vw ;height: 95%;color: #00008B' class="dropzone-drop">{{dropzone8}}</div>
                                    </td>

                                    <td class="dropzone" id="dropzone9"  ref="dropzonePlace9">
                                        <div style='text-align: center;margin: 0;border: #7f8c8d 1px solid;border-radius: 0.4vw;height: 95%;color: #00008B' class="dropzone-drop">{{dropzone9}}</div>
                                    </td>
                                </tr>
                                <tr style="border-top: black solid 2px;">
                                    <td class="functionzone"></td>
                                    <td class="functionzone" style="color: red;">9</td>
                                    <td class="functionzone" style="color: red;" >9</td>
                                    <td class="functionzone" style="color: red;">9</td>

                                </tr>


                            </table>


                            <div style="width: 100%;background-color: transparent;text-align: left" id="dragArea">
                                <div style="display: inline-block;">
                                    <div class="drag-drop" id="y1" ref="myDraggable" >1</div></div>
                                <div style="display: inline-block;"><div class="drag-drop" id="y2" ref="myDraggable2" @click="enableDrag($event)">2</div></div>
                                <div style="display: inline-block"><div class="drag-drop" id="y3" ref="myDraggable3" >3</div></div>
                                <div style="display: inline-block"><div class="drag-drop" id="y4" ref="myDraggable4" >4</div></div>
                                <div style="display: inline-block"><div class="drag-drop" id="y5" ref="myDraggable5">5</div></div>
                                <div style="display: inline-block"><div class="drag-drop" id="y6" ref="myDraggable6">6</div></div>
                                <div style="display: inline-block"><div class="drag-drop" id="y7" ref="myDraggable7">7</div></div>
                                <div style="display: inline-block"><div class="drag-drop" id="y8" ref="myDraggable8">8</div></div>
                                <div style="display: inline-block"><div class="drag-drop" id="y9" ref="myDraggable9">9</div></div>
                            </div>

                            <div class="app--lesson-action" >
                                <button
                                        type="submit"
                                        class="btn btn-outline-success btn-lg"
                                        id = "auto"
                                        @click="playTheGame(countM,switcher,set1,res,$event)" >{{playAuto1}}</button>
                                <button
                                        type="submit"
                                        class="btn btn-outline-success btn-lg"
                                        id = "demo"
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
                        <div>
                            <p>
                                <span style="font-size: 115%;" class="badge badge-dark">{{ uniqueSolutions }}</span> Unique solutions found
                            </p>

                            <select name="uniqueRes" @change="changeGridValue($event)" v-html="uniqueSolutionsHTML" style="text-align: left;font-size:15px;border:white 0px;overflow-y:scroll" size="20" class="style-select">

                            </select>
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


            }
        },
        mounted: function(){


        },
        methods: {
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
                this.dropzone5 = res[4]
                this.dropzone6 = res[5]
                this.dropzone7 = res[6]
                this.dropzone8 = res[7]
                this.dropzone9 = res[8]
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
            },
            playDemo: function(){
                this.addToGrid(this.set1,this.res)
                this.countM++
                this.check()
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

                if(i==0) {

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
                if(event.target.id=="auto"){
                    //alert(set1.length)
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
            reset: function(){
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
                if(this.dropzone1*100+this.dropzone2*10+this.dropzone3*1+this.dropzone4*100+this.dropzone5*10+this.dropzone6*1+this.dropzone7*100+this.dropzone8*10+this.dropzone9*1==999){
                    this.countOfSolutions++;
                    var res = this.generateFunction();
                    if(!this.mapRes.has(res))
                        this.uniqueSolutions++;
                    this.uniqueSolutionsHTML += "<option value='"+this.dropzone1+""+this.dropzone2+""+this.dropzone3+""+this.dropzone4+this.dropzone5+""+this.dropzone6+""+this.dropzone7+""+this.dropzone8+""+this.dropzone9+"'>"+res+"</option>"
                    this.mapRes.add(res)
                }
            },
            generateFunction: function(){
                var str = this.dropzone1 +""+this.dropzone2+""+this.dropzone3+"+"+this.dropzone4+""+this.dropzone5+""+this.dropzone6+"+"+this.dropzone7+""+this.dropzone8+""+this.dropzone9 + " = 999"
                return str;
            },
            enableDrag: function(event){
                var cur = event.target
                if(cur.classList=="dropped"){

                }
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
                else if(i=7){
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

        },
        name: "TestingAll",

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
        background: #eeeeee;
    }

</style>