<template>
    <div>
        <div v-if="selectedOption === -1">
            <app-title-static>
                Crosses
            </app-title-static>
            <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
                <app-options :options="options" @selectOption="selectedOption=$event"></app-options>
            </transition>
        </div>

        <div class="container-fluid" v-else>
            <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
                <app-top-nav @backToMenu="selectedOption = $event">Crosses</app-top-nav>
            </transition>

            <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
                <app-puzzle v-if="selectedOption === 1"></app-puzzle>
                <app-selecting-the-middle v-else-if="selectedOption === 2"></app-selecting-the-middle>
                <app-testing-all v-else-if="selectedOption === 3"></app-testing-all>
            </transition>
        </div>
        <!-- <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
            <app-bottom-nav></app-bottom-nav>
        </transition>
    -->
    </div>
</template>

<script>
    // import Title from '../../layout/Title.vue';
    import TitleStatic from '../../layout/TitleStatic.vue';
    import TopNav from '../../layout/TopNav.vue';
    import Options from '../../layout/Options.vue';
    import Puzzle from "./Puzzle"
    import TestingAll from './TestingAll.vue';
    import SelectingTheMiddle from "./SelectingTheMiddle";

    export default {
        components: {
            // appTitle: Title,
            appTitleStatic: TitleStatic,
            appTopNav: TopNav,
            appOptions: Options,
            // appBottomNav: BottomNav,
            appPuzzle: Puzzle,
            appSelectingTheMiddle: SelectingTheMiddle,
            appTestingAll: TestingAll
        },
        data: function() {
            return {
                options: [
                    { id: 1, title: 'Crosses puzzle' },
                    { id: 2, title: 'Selecting the middle number' },
                    { id: 3, title: 'Testing all combinations'}
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
