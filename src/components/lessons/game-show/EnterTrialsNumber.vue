<template>
    <div>
        <div class="app--enter-number form-group row mt-5">
            <label for="trial-numbers" class="col-form-label col-sm-6">
                Enter the number of trials (100 to {{legify(100000)}}):
            </label>
            <div class="col-sm-6">
                <input type="number" class="form-control" v-model="trialNum" required>
            </div>
            <div class="form-action col-6 offset-sm-6 offset-4 mt-3">
                <button
                        :disabled="!isValidInput"
                        class="btn btn-outline-success btn-lg"
                        @click="handleAcceptTrialNumber"
                >OK</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { legify } from "../../common/utils.js";
    export default {
        data: function() {
            return {
                trialNum: null
            }
        },
        computed: {
            isValidInput() {
                if( !this.trialNum ||
                    isNaN(Number(this.trialNum)) ||
                    this.trialNum < 100 ||
                    this.trialNum > 100000 ) {
                    return false;
                }
                return true;
            }
        },
        methods: {
            legify,
            handleAcceptTrialNumber() {
                this.$emit('acceptTrialNumber', this.trialNum);
            }
        }
    }
</script>

<style scoped>
    .app--enter-number {
        max-width: 700px;
        margin: 0 auto;
    }
</style>