<template>
    <div>
        <div v-if="selectedOption === -1">
            <app-title-static>
                Fraction Charts
            </app-title-static>
            <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
                <app-options :options="options" @selectOption="selectedOption=$event"></app-options>
            </transition>
        </div>

        <div class="container-fluid" v-else>
            <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
                <app-top-nav @backToMenu="selectedOption = $event">Fraction Charts</app-top-nav>
            </transition>

            <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
                <app-two-by-two v-if="selectedOption === 1"></app-two-by-two>
                <app-three-by-three v-else-if="selectedOption === 2"></app-three-by-three>
            </transition>
        </div>
<!--        <transition appear appear-class="options-appear" appear-active-class="options-appear-active">-->
<!--            <app-bottom-nav></app-bottom-nav>-->
<!--        </transition>-->

    </div>
</template>

<script>
    import TitleStatic from '../../layout/TitleStatic.vue';
    import TopNav from '../../layout/TopNav.vue';
    import Options from '../../layout/Options.vue';
    import TwoByTwo from "./TwoByTwo";
    import ThreeByThree from "./ThreeByThree";

    export default {
        components: {
           // appTitle: Title,
            appTitleStatic: TitleStatic,
            appTopNav: TopNav,
            appOptions: Options,
           // appBottomNav: BottomNav,
            appTwoByTwo: TwoByTwo,
            appThreeByThree: ThreeByThree,
        },
        data: function() {
            return {
                options: [
                    { id: 1, title: 'Two by two grid' },
                    { id: 2, title: 'Three by three grid' },
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
