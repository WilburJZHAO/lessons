<template>
    <div>
        <transition appear appear-class="app-appear" appear-active-class="app-appear-active">
            <div class="container mt-3 mb-5">
                <h3 class="lesson-subheading">Percentage advantage</h3>
                <hr class="subheading-separator">
                <div class="row">
                    <!-- Left part -->
                    <div class="col-12 col-md-6 app--lesson-left">
                        <div>
                            <div class="app--lesson-action">
                                <div class="text-success">
                                    <h4 class="text-dark">Please click to choose the percentage, then click back button to go back.</h4>
                                    <h5 class="text-success" >
                                        Explanation:
                                    </h5>
                                    <h6 class="text-success">Teams higher on the ladder deserve an advantage over teams below them.</h6>
                                    <h6>For example: if you enter 2%, then assume a 2% advantage for every place difference on the ladder</h6>
                                    <h6>This means:</h6>
                                    <h6>If Team 1 plays Team 2 they get a 2% advantage.</h6>
                                    <h6>If Team 1 plays Team 5 they get a 8% advantage.</h6>
                                    <h6>If Team 4 plays Team 7 they get a 6% advantage.</h6>
                                    <h6>If Team 2 plays Team 8 they get a 12% advantage.</h6>

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
                        <div class="tt-right-box" @change="submit">

                            <input type="radio" id="0" value="0" v-model="picked">
                            <label for="0">0%</label>
                            <br>
                            <input type="radio" id="1" value="1" v-model="picked">
                            <label for="1">1%</label>
                            <br>
                            <input type="radio" id="2" value="2" v-model="picked">
                            <label for="2">2%</label>
                            <br>
                            <input type="radio" id="3" value="3" v-model="picked">
                            <label for="3">3%</label>
                            <br>
                            <input type="radio" id="4" value="4" v-model="picked">
                            <label for="4">4%</label>
                            <br>
                            <input type="radio" id="5" value="5" v-model="picked">
                            <label for="5">5%</label>
                            <br>
                            <input type="radio" id="6" value="6" v-model="picked">
                            <label for="6">6%</label>
                            <br>
                            <input type="radio" id="7" value="7" v-model="picked">
                            <label for="7">7%</label>
                            <br>
                            <input type="radio" id="8" value="8" v-model="picked">
                            <label for="8">8%</label>
                            <br>
                            <input type="radio" id="9" value="9" v-model="picked">
                            <label for="9">9%</label>
                            <br>
                            <input type="radio" id="10" value="10" v-model="picked">
                            <label for="10">10%</label>
                            <br>
                            <input type="radio" id="11" value="11" v-model="picked">
                            <label for="11">11%</label>
                            <br>
                            <input type="radio" id="12" value="12" v-model="picked">
                            <label for="12">12%</label>
                            <br>
                            <input type="radio" id="13" value="13" v-model="picked">
                            <label for="13">13%</label>
                            <br>
                            <input type="radio" id="14" value="14" v-model="picked">
                            <label for="14">14%</label>
                            <br>
                        </div>

                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    var p = 0;
    export default {
        p,
        name: "PercentageAdvantage",
        data:function () {
            return{
                picked:p,
            }
        },
        mounted:function(){
        },
        methods:{
            submit:function () {
                p = this.picked
            },
            returnPicked:function () {
                return p;
            },
            backToMenu() {

            }
        }
    }
</script>

<style scoped>

</style>