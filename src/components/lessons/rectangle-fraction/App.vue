<template>
    <div>
        <div v-if="selectedOption === -1">
            <app-title-static>
                Rectangle Fractions
            </app-title-static>
            <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
                <app-options :options="options" @selectOption="selectedOption=$event"></app-options>
            </transition>
        </div>

        <div class="container-fluid" v-else>
            <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
                <app-top-nav @backToMenu="selectedOption = $event">Rectangle Fractions</app-top-nav>
            </transition>

            <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
                <app-how-many-rows v-if="selectedOption === 1"></app-how-many-rows>
                <app-show-the-fraction v-else-if="selectedOption === 2"></app-show-the-fraction>
                <app-adding-fraction v-else-if="selectedOption === 3"></app-adding-fraction>
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
    import AddingFraction from './AddingFraction.vue';
    import HowManyRows from './HowManyRows.vue';
    import ShowTheFraction from './ShowTheFraction.vue';
    export default {
        components: {
            // appTitle: Title,
            appTitleStatic: TitleStatic,
            appTopNav: TopNav,
            appOptions: Options,
            // appBottomNav: BottomNav,
            appAddingFraction: AddingFraction,
            appHowManyRows: HowManyRows,
            appShowTheFraction: ShowTheFraction,
        },
        data: function() {
            return {
                options: [
                    { id: 1, title: 'How many rows and columns?' },
                    { id: 2, title: 'Show the fraction' },
                    { id: 3, title: 'Adding fractions'},
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
