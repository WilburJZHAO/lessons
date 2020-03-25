<template>
    <div class="container mt-3 mb-5">
        <h3 class="text-center text-success mb-4">Change the number of dice faces</h3>
        <div style="display: flex; flex-direction: row">
            <div>
                <table>
                    <tr>
                        <td>
                            <h6 class="text-success">
                                <b id="error2">Please enter dices faces (1-6), the number of each dice face (0-20)</b>
                            </h6>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="text-center" style="margin-top: 10px">
            <div class="col-sm-12">
                <label class="col-sm-5 theFristTitle">Change the number of dice faces (1-6)</label>
                <input type="number" class="col-sm-1" id="diceFaces" style="text-align:center;" v-model="thisDiceFaces" @change="diceFacesChange">
            </div>
            <div class="col-sm-12">
                <div>
                    <div class="col-sm-12 theRed">
                        <label class="col-sm-2">Red</label>
                        <input type="number" class="col-sm-1 theRed" v-for="i in gameRule.diceFaces===6? 6: gameRule.diceFaces===5 ? 5 : gameRule.diceFaces===4 ? 4 : gameRule.diceFaces===3? 3 : gameRule.diceFaces===2 ? 2 : 1" v-model="gameRule.redDiceFace[parseInt(i)]">
                    </div>
                    <div class="col-sm-12 theBlue">
                        <label class="col-sm-2">Blue</label>
                        <input type="number" class="col-sm-1 theBlue" v-for="i in gameRule.diceFaces===6? 6: gameRule.diceFaces===5 ? 5 : gameRule.diceFaces===4 ? 4 : gameRule.diceFaces===3? 3 : gameRule.diceFaces===2 ? 2 : 1" id="blueDiceFace5" v-model="gameRule.blueDiceFace[parseInt(i)]">
                    </div>
                    <div class="col-sm-12 theGreen">
                        <label class="col-sm-2">Green</label>
                        <input type="number" class="col-sm-1 theGreen" v-for="i in gameRule.diceFaces===6? 6: gameRule.diceFaces===5 ? 5 : gameRule.diceFaces===4 ? 4 : gameRule.diceFaces===3? 3 : gameRule.diceFaces===2 ? 2 : 1" id="greenDiceFace5" v-model="gameRule.greenDiceFace[parseInt(i)]">
                    </div>
                    <div class="col-sm-12 theBlack">
                        <label class="col-sm-2">Black</label>
                        <input type="number" class="col-sm-1 theBlack" v-for="i in gameRule.diceFaces===6? 6: gameRule.diceFaces===5 ? 5 : gameRule.diceFaces===4 ? 4 : gameRule.diceFaces===3? 3 : gameRule.diceFaces===2 ? 2 : 1" id="blackDiceFace5" v-model="gameRule.blackDiceFace[parseInt(i)]">
                    </div>
                    <div class="col-sm-12">
                        <button class="col-sm-3 offset-sm-2 btn btn-outline-success" @click="restore()">Restore</button>
                        <button class="col-sm-3 btn btn-outline-success" @click="saveDice()">Save</button>
                    </div>
                    <div class="col-sm-12">
                        <label id="outOfRange" class="col-sm-5 offset-sm-2" style="color: red"></label>
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<script>
    export default {
        props: ['gameRule'],
        data: function() {
            return {
                thisDiceFaces: 6,
            };
        },
        watch: {},
        mounted: function() {this.thisDiceFaces = this.gameRule.diceFaces},
        updated: function() {},
        methods: {
            diceFacesChange(){
                if (this.thisDiceFaces < 1 || this.thisDiceFaces > 6) {
                    document.getElementById("outOfRange").innerHTML = "The number inserted is out of range!";
                } else{
                    this.gameRule.diceFaces = parseInt(this.thisDiceFaces);
                    document.getElementById("outOfRange").innerHTML = "";
                }

            },
            saveDice() {
                for (let i = 1; i < 7; i++) {
                    if (this.gameRule.redDiceFace[i] < 0 || this.gameRule.redDiceFace[i] > 20 || this.gameRule.blueDiceFace[i] < 0 || this.gameRule.blueDiceFace[i] > 20 || this.gameRule.greenDiceFace[i] < 0 || this.gameRule.greenDiceFace[i] > 20 || this.gameRule.blackDiceFace[i] < 0 || this.gameRule.blackDiceFace[i] > 20) {
                        document.getElementById("outOfRange").innerHTML = "The number inserted is out of range!";
                        return;
                    }
                }
                document.getElementById("outOfRange").innerHTML = "Saved!";
            },
            restore() {
                this.gameRule.redDiceFace = [0, 0, 1, 7, 8, 8, 9];
                this.gameRule.blueDiceFace = [0, 5, 5, 6, 6, 7, 7];
                this.gameRule.greenDiceFace = [0, 1, 2, 3, 9, 10, 11];
                this.gameRule.blackDiceFace = [0, 3, 4, 4, 5, 11, 12];
                this.gameRule.diceFaces = 6;
                this.thisDiceFaces = 6;
                document.getElementById("outOfRange").innerHTML = "Restored!";
            },
        },
        name: "ChangeTheDiceFaces"
    }
</script>

<style scoped>
    .theRed {
        color: red;
    }

    .theBlue {
        color: blue;
    }

    .theGreen {
        color: green;
    }

    .theBlack {
        color: black;
    }
</style>