<template>
    <div>
        <div v-if="selectedOption === -1">
            <app-title-static>
                Fay's Nines
            </app-title-static>
            <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
                <app-options :options="options" @selectOption="selectedOption=$event"></app-options>
            </transition>
        </div>

        <div class="container-fluid" v-else>
            <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
                <app-top-nav @backToMenu="selectedOption = $event">Fay's Nines</app-top-nav>
            </transition>

            <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
                <app-puzzle v-if="selectedOption === 1"></app-puzzle>
                <app-working-backwards v-else-if="selectedOption === 2"></app-working-backwards>
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
    import Puzzle from './Puzzle.vue'
    import TestingAll from './TestingAll.vue';
    import WorkingBackwards from "./WorkingBackwards.vue";

    export default {
        components: {
            // appTitle: Title,
            appTitleStatic: TitleStatic,
            appTopNav: TopNav,
            appOptions: Options,
            // appBottomNav: BottomNav,
            appPuzzle: Puzzle,
            appWorkingBackwards: WorkingBackwards,
            appTestingAll: TestingAll
        },
        data: function() {
            return {
                options: [
                    { id: 1, title: "Play the puzzle" },
                    { id: 2, title: 'Working backwards' },
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
