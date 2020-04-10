<template>
    <div>
        <div v-if="selectedOption === -1">
            <app-title-static>
                Truth Tiles 2
            </app-title-static>
            <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
                <app-options :options="options" @selectOption="selectedOption=$event"></app-options>
            </transition>
        </div>

        <div class="container-fluid" v-else>
            <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
                <app-top-nav @backToMenu="selectedOption = $event">Truth Tiles 2</app-top-nav>
            </transition>

            <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
                <app-puzzle v-if="selectedOption === 1"></app-puzzle>
                <app-testing-strategies v-else-if="selectedOption === 2"></app-testing-strategies>
                <app-testing-all v-else-if="selectedOption === 3"></app-testing-all>
                <app-change-numbers v-else-if="selectedOption === 4"></app-change-numbers>
            </transition>
        </div>
        <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
            <app-bottom-nav></app-bottom-nav>
        </transition>
    </div>
</template>

<script>
    import TitleStatic from '../../layout/TitleStatic.vue';
    import TopNav from '../../layout/TopNav.vue';
    import BottomNav from '../../layout/BottomNav.vue';
    import Options from '../../layout/Options.vue';
    import Puzzle from './Puzzle2.vue';
    import TestingStrategies from "./TestingStrategies";
    import TestingAll from "./TestingAll";
    import ChangeingNumbers from "./ChangeNumbers";

    export default {
        components: {
            // appTitle: Title,
            appTitleStatic: TitleStatic,
            appTopNav: TopNav,
            appOptions: Options,
            appBottomNav: BottomNav,
            appPuzzle: Puzzle,
            appTestingStrategies: TestingStrategies,
            appTestingAll: TestingAll,
            appChangeNumbers: ChangeingNumbers
        },
        data: function() {
            return {
                options: [
                    { id: 1, title: "'Truth Tiles 2' puzzle" },
                    { id: 2, title: 'Testing Strategies' },
                    { id: 3, title: 'Testing all combinations'},
                    { id: 4, title: 'Change the numbers'}
                ],
                selectedOption: -1,
            }
        }
    }
</script>

<style scoped>
    .table td {
        vertical-align: baseline;
    }

    #app-canvas {
        width: 100%;
        border: 1px solid #eee;
    }

</style>