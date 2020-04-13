<template>
    <div class="container mt-3 mb-5">
        <h3 class="lesson-subheading">Make many beetles</h3>
        <hr class="subheading-separator">
        <div class="container">
            <app-make-many-beetles v-if="trialNum" :trialNum="trialNum"></app-make-many-beetles>
            <app-enter-trials-number @acceptTrialNumber="trialNum=$event" v-else></app-enter-trials-number>
        </div>
    </div>
</template>

<script>
    import MakeManyBeetles from './MakeManyBeetles.vue';
    import EnterTrialsNumber from './EnterTrialsNumber.vue';
    export default {
        components: {
            appEnterTrialsNumber: EnterTrialsNumber,
            appMakeManyBeetles: MakeManyBeetles
        },
        data: function() {
            return {
                trialNum: null
            };
        }
    }
</script>

<style scoped>

</style>
