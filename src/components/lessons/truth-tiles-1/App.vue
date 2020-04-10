<template>
    <div>
        <div v-if="selectedOption === -1">
            <app-title-static>
                Truth Tiles 1
            </app-title-static>
            <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
                <app-options :options="options" @selectOption="selectedOption=$event"></app-options>
            </transition>
        </div>

        <div class="container-fluid" v-else>
            <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
                <app-top-nav @backToMenu="selectedOption = $event">Truth Tiles 1</app-top-nav>
            </transition>

            <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
                <app-puzzle v-if="selectedOption === 1"></app-puzzle>
                <app-place-and-try v-else-if="selectedOption === 2"></app-place-and-try>
                <app-testing-all v-else-if="selectedOption === 3"></app-testing-all>
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
    import Puzzle from './Puzzle.vue';
    import PlaceAndTry from "./PlaceAndTry";
    import TestingAll from "./TestingAll";

    export default {
        components: {
            // appTitle: Title,
            appTitleStatic: TitleStatic,
            appTopNav: TopNav,
            appOptions: Options,
            appBottomNav: BottomNav,
            appPuzzle: Puzzle,
            appPlaceAndTry: PlaceAndTry,
            appTestingAll: TestingAll
        },
        data: function() {
            return {
                options: [
                    { id: 1, title: "'Truth Tiles 1' puzzle" },
                    { id: 2, title: 'Place and try' },
                    { id: 3, title: 'Testing all combinations'}
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