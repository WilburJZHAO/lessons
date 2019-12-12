<template>
    <div>
        <div class="container mt-4 mb-5">
            <div class="row justify-content-md-center">
                <input class="zone" type="number" min="1" max="16" v-model="num1" oninput="value=value.replace('.','');if(value>16)value=16;if(value<1)value=null">
                <input class="zone" type="number" min="1" max="16" v-model="num2" oninput="value=value.replace('.','');if(value>16)value=16;if(value<1)value=null">
                <input class="zone" type="number"  min="1" max="16" v-model="num3" oninput="value=value.replace('.','');if(value>16)value=16;if(value<1)value=null">

                <!--<input class="zone" type="number" min="1" max="16" v-model="num2" >-->
                <!--<input class="zone" type="number"  min="1" max="16" v-model="num3">-->
            </div>
            <div class="row justify-content-md-center">
                <input class="zone" type="number" min="1" max="16" v-model="num4" oninput="value=value.replace('.','');if(value>16)value=16;if(value<1)value=null" >
                <input class="zone" type="number" min="1" max="16" v-model="num5" oninput="value=value.replace('.','');if(value>16)value=16;if(value<1)value=null">
                <input class="zone" type="number"  min="1" max="16" v-model="num6" oninput="value=value.replace('.','');if(value>16)value=16;if(value<1)value=null">
            </div>
            <div class="row justify-content-md-center">
                <input class="zone" type="number" min="1" max="16" v-model="num7" oninput="value=value.replace('.','');if(value>16)value=16;if(value<1)value=null" >
                <input class="zone" type="number" min="1" max="16" v-model="num8" oninput="value=value.replace('.','');if(value>16)value=16;if(value<1)value=null">
                <input class="zone" type="number"  min="1" max="16" v-model="num9" oninput="value=value.replace('.','');if(value>16)value=16;if(value<1)value=null">
            </div>
            <div class="row justify-content-md-center">
                <div class="badge badge-secondary mt-2">
                    Enter a number (1-16)
                </div>
            </div>
            <div class="row justify-content-md-center">
                <button style="margin-top: 8px;" @click="reset" class="btn btn-outline-success">Reset</button>
            </div>
            <div class="row">
                <div style="position: relative; min-width: 976px; min-height: 500px">
                    <img  src="@/assets/tree.png" >
                    <span style="font-size: 20px; position: absolute; top: 125px; left: 142px;">{{num1}}</span>
                    <span style="font-size: 20px; position: absolute; top: 125px; left: 475px;">{{num2}}</span>
                    <span style="font-size: 20px; position: absolute; top: 125px; left: 808px;">{{num3}}</span>
                    <span style="font-size: 20px; position: absolute; top: 257px; left: 28px;">{{num4}}</span>
                    <span style="font-size: 20px; position: absolute; top: 257px; left: 140px;">{{num2}}</span>
                    <span style="font-size: 20px; position: absolute; top: 257px; left: 252px;">{{num3}}</span>
                    <span style="font-size: 20px; position: absolute; top: 257px; left: 364px;">{{num1}}</span>
                    <span style="font-size: 20px; position: absolute; top: 257px; left: 476px;">{{num5}}</span>
                    <span style="font-size: 20px; position: absolute; top: 257px; left: 588px;">{{num3}}</span>
                    <span style="font-size: 20px; position: absolute; top: 257px; left: 700px;">{{num1}}</span>
                    <span style="font-size: 20px; position: absolute; top: 257px; left: 812px;">{{num2}}</span>
                    <span style="font-size: 20px; position: absolute; top: 257px; left: 924px;">{{num6}}</span>
                    <span style="font-size: 20px; position: absolute; top: 347px; left: -10px;">{{num7}}</span>
                    <span style="font-size: 20px; position: absolute; top: 347px; left: 28px;">{{num2}}</span>
                    <span style="font-size: 20px; position: absolute; top: 347px; left: 66px;">{{num3}}</span>
                    <span style="font-size: 20px; position: absolute; top: 347px; left: 104px;">{{num4}}</span>
                    <span style="font-size: 20px; position: absolute; top: 347px; left: 142px;">{{num5}}</span>
                    <span style="font-size: 20px; position: absolute; top: 347px; left: 180px;">{{num3}}</span>
                    <span style="font-size: 20px; position: absolute; top: 347px; left: 218px;">{{num4}}</span>
                    <span style="font-size: 20px; position: absolute; top: 347px; left: 256px;">{{num2}}</span>
                    <span style="font-size: 20px; position: absolute; top: 347px; left: 294px;">{{num6}}</span>
                    <span style="font-size: 20px; position: absolute; top: 347px; left: 332px;">{{num4}}</span>
                    <span style="font-size: 20px; position: absolute; top: 347px; left: 370px;">{{num5}}</span>
                    <span style="font-size: 20px; position: absolute; top: 347px; left: 408px;">{{num3}}</span>
                    <span style="font-size: 20px; position: absolute; top: 347px; left: 440px;">{{num1}}</span>
                    <span style="font-size: 20px; position: absolute; top: 347px; left: 476px;">{{num8}}</span>
                    <span style="font-size: 20px; position: absolute; top: 347px; left: 514px;">{{num3}}</span>
                    <span style="font-size: 20px; position: absolute; top: 347px; left: 552px;">{{num1}}</span>
                    <span style="font-size: 20px; position: absolute; top: 347px; left: 590px;">{{num5}}</span>
                    <span style="font-size: 20px; position: absolute; top: 347px; left: 628px;">{{num6}}</span>
                    <span style="font-size: 20px; position: absolute; top: 347px; left: 666px;">{{num4}}</span>
                    <span style="font-size: 20px; position: absolute; top: 347px; left: 704px;">{{num2}}</span>
                    <span style="font-size: 20px; position: absolute; top: 347px; left: 742px;">{{num6}}</span>
                    <span style="font-size: 20px; position: absolute; top: 347px; left: 780px;">{{num1}}</span>
                    <span style="font-size: 20px; position: absolute; top: 347px; left: 818px;">{{num5}}</span>
                    <span style="font-size: 20px; position: absolute; top: 347px; left: 856px;">{{num6}}</span>
                    <span style="font-size: 20px; position: absolute; top: 347px; left: 888px;">{{num1}}</span>
                    <span style="font-size: 20px; position: absolute; top: 347px; left: 926px;">{{num2}}</span>
                    <span style="font-size: 20px; position: absolute; top: 347px; left: 964px;">{{num9}}</span>
                    <div  v-for="i in 27" :key="i">
                        <div class="smallblock" v-bind:style="{left: 37.5*(i-1) - 15 + 'px'}" v-cloak>{{Total(i)}}</div>
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
                widthInputPrompt: false,
                num1: null,
                num2: null,
                num3: null,
                num4: null,
                num5: null,
                num6: null,
                num7: null,
                num8: null,
                num9: null,
            }
        },
        // watch:{
        //     num1(value){
        //         if (value > 16 ){
        //             alert("Enter a number (1-16)");
        //         }
        //     },
        //
        // },
        methods:{
            displayWidthInputPrompt() {
                this.widthInputPrompt = true;
            },
            hideWidthInputPrompt() {
                this.widthInputPrompt = false;
            },
            reset(){
                this.num1 = 9;
                this.num2 = 11;
                this.num3 = 8;
                this.num4 = 11;
                this.num5 = 8;
                this.num6 = 10;
                this.num7 = 8;
                this.num8 = 10;
                this.num9 = 9;
            },
        },
        computed:{
            Total(){
                return function (i) {
                    if (this.num1 > 0 & this.num2 > 0& this.num3 > 0 &this.num4 > 0& this.num5 > 0 & this.num6 > 0 &this.num7 > 0 &this.num8 > 0 & this.num9 > 0){
                        switch (i) {
                            case 1:
                                return Number.parseInt(this.num1)+ Number.parseInt(Number.parseInt(this.num4) * 2 )+ Number.parseInt(this.num7 * 3);
                            case 2:
                                return Number.parseInt(this.num1 )+ Number.parseInt(this.num4 * 2 )+ Number.parseInt(this.num2 * 3);
                            case 3:
                                return Number.parseInt(this.num1 )+ Number.parseInt(this.num4 * 2 )+ Number.parseInt(this.num3 * 3);
                            case 4:
                                return Number.parseInt(this.num1 )+ Number.parseInt(this.num2 * 2 )+ Number.parseInt(this.num4 * 3);
                            case 5:
                                return Number.parseInt(this.num1 )+ Number.parseInt(this.num2 * 2 )+ Number.parseInt(this.num5 * 3);
                            case 6:
                                return Number.parseInt(this.num1 )+ Number.parseInt(this.num2 * 2 )+ Number.parseInt(this.num3 * 3);
                            case 7:
                                return Number.parseInt(this.num1 )+ Number.parseInt(this.num3 * 2 )+ Number.parseInt(this.num4 * 3);
                            case 8:
                                return Number.parseInt(this.num1 )+ Number.parseInt(this.num3 * 2 )+ Number.parseInt(this.num2 * 3);
                            case 9:
                                return Number.parseInt(this.num1 )+ Number.parseInt(this.num4 * 2 )+ Number.parseInt(this.num6 * 3);
                            case 10:
                                return Number.parseInt(this.num2 )+ Number.parseInt(this.num1 * 2 )+ Number.parseInt(this.num4 * 3);
                            case 11:
                                return Number.parseInt(this.num2 )+ Number.parseInt(this.num1 * 2 )+ Number.parseInt(this.num5 * 3);
                            case 12:
                                return Number.parseInt(this.num2 )+ Number.parseInt(this.num1 * 2 )+ Number.parseInt(this.num3 * 3);
                            case 13:
                                return Number.parseInt(this.num2 )+ Number.parseInt(this.num5 * 2 )+ Number.parseInt(this.num1 * 3);
                            case 14:
                                return Number.parseInt(this.num2 )+ Number.parseInt(this.num5 * 2 )+ Number.parseInt(this.num8 * 3);
                            case 15:
                                return Number.parseInt(this.num2 )+ Number.parseInt(this.num5 * 2 )+ Number.parseInt(this.num3 * 3);
                            case 16:
                                return Number.parseInt(this.num2 )+ Number.parseInt(this.num3 * 2 )+ Number.parseInt(this.num1 * 3);
                            case 17:
                                return Number.parseInt(this.num2 )+ Number.parseInt(this.num3 * 2 )+ Number.parseInt(this.num5 * 3);
                            case 18:
                                return Number.parseInt(this.num2 )+ Number.parseInt(this.num3 * 2 )+ Number.parseInt(this.num6 * 3);
                            case 19:
                                return Number.parseInt(this.num3 )+ Number.parseInt(this.num1 * 2 )+ Number.parseInt(this.num4 * 3);
                            case 20:
                                return Number.parseInt(this.num3 )+ Number.parseInt(this.num1 * 2 )+ Number.parseInt(this.num2 * 3);
                            case 21:
                                return Number.parseInt(this.num3 )+ Number.parseInt(this.num1 * 2 )+ Number.parseInt(this.num6 * 3);
                            case 22:
                                return Number.parseInt(this.num3 )+ Number.parseInt(this.num2 * 2 )+ Number.parseInt(this.num1 * 3);
                            case 23:
                                return Number.parseInt(this.num3 )+ Number.parseInt(this.num2 * 2 )+ Number.parseInt(this.num5 * 3);
                            case 24:
                                return Number.parseInt(this.num3 )+ Number.parseInt(this.num2 * 2 )+ Number.parseInt(this.num6 * 3);
                            case 25:
                                return Number.parseInt(this.num3 )+ Number.parseInt(this.num6 * 2 )+ Number.parseInt(this.num1 * 3);
                            case 26:
                                return Number.parseInt(this.num3 )+ Number.parseInt(this.num6 * 2 )+ Number.parseInt(this.num2 * 3);
                            case 27:
                                return Number.parseInt(this.num3 )+ Number.parseInt(this.num6 * 2 )+ Number.parseInt(this.num9 * 3);
                        }
                    }

                }
            },
        },
        name: "DesignYourOwn",
    }
</script>

<style scoped>
    .zone{
        font-size: 35px;
        height:60px;
        width: 70px;
        padding: 0;
        margin: 5px;
        text-align: center;
        border-color: black;
    }
    .smallblock{
        font-size: 18px; position: absolute; top: 400px;
        width: 30px;
        height: 30px;
        border: 2px solid black;
        text-align: center;
        color:red;
    }
</style>