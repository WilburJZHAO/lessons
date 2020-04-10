<template>
    <div>
        <div v-if="selectedOption === -1">
            <app-title-static>
                Take Away Tiles
            </app-title-static>
            <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
                <app-options :options="options" @selectOption="selectedOption=$event"></app-options>
            </transition>
        </div>

        <div class="container-fluid" v-else>
            <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
                <app-top-nav @backToMenu="selectedOption = $event">Take Away Tiles</app-top-nav>
            </transition>

            <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
                <app-take-away-puzzle v-if="selectedOption === 1"></app-take-away-puzzle>
                <app-place-and-try v-else-if="selectedOption === 2"></app-place-and-try>
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
    import TakeAwayPuzzle from './TakeAwayPuzzle';
    import PlaceAndTry from './PlaceAndTry.vue';
    import TestingAll from './TestingAll.vue';

    export default {
        components: {
            // appTitle: Title,
            appTitleStatic: TitleStatic,
            appTopNav: TopNav,
            appOptions: Options,
            // appBottomNav: BottomNav,
            appTakeAwayPuzzle: TakeAwayPuzzle,
            appPlaceAndTry: PlaceAndTry,
            appTestingAll: TestingAll
        },
        data: function() {
            return {
                options: [
                    { id: 1, title: "'Take Away Tiles' puzzle" },
                    { id: 2, title: 'Place and try' },
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
