<template>
    <div>
        <div v-if="selectedOption === -1">
            <app-title-static>
                Charts Strategies
            </app-title-static>
            <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
                <app-options :options="options" @selectOption="selectedOption=$event"></app-options>
            </transition>
        </div>
        <div class="container-fluid" v-else>
            <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
                <app-top-nav @backToMenu="selectedOption = $event">Charts Strategies</app-top-nav>
            </transition>

            <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
                <app-addition v-if="selectedOption === 1"></app-addition>
                <app-multiplication v-else-if="selectedOption === 2"></app-multiplication>
            </transition>
        </div>
    </div>
</template>

<script>
    import TitleStatic from '../../layout/TitleStatic.vue';
    import TopNav from '../../layout/TopNav.vue';
    import Options from '../../layout/Options.vue';
    import Addition from './Addition.vue'
    import Multiplication from "./Multiplication";

    export default {
        components: {
            appTitleStatic: TitleStatic,
            appTopNav: TopNav,
            appOptions: Options,
            appAddition: Addition,
            appMultiplication: Multiplication,
        },
        data: function() {
            return {
                options: [
                    { id: 1, title: 'Addition' },
                    { id: 2, title: 'Multiplication' },
                ],
                selectedOption: -1,
            }
        }
    }
</script>

<style>
    .tt--right-box {
        margin-bottom: 3rem;
    }
    .tt--right-row {
        display: flex;
    }


</style>
