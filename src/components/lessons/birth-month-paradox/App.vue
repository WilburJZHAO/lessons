<template>
    <div>
        <div v-if="selectedOption === -1">
            <app-title-static>
                Birth Month Paradox
            </app-title-static>
            <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
                <app-options :options="options" @selectOption="selectedOption=$event"></app-options>
            </transition>
        </div>

        <div class="container-fluid" v-else>
            <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
                <app-top-nav @backToMenu="selectedOption = $event">Birth Month Paradox</app-top-nav>
            </transition>

            <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
                <app-five-person-demonstration v-if="selectedOption === 1"></app-five-person-demonstration>
                <app-vary-the-group-size-and-the-number-of-trials v-else-if="selectedOption === 2"></app-vary-the-group-size-and-the-number-of-trials>
                <app-many-trials-fast v-else-if="selectedOption === 3"></app-many-trials-fast>
                <app-birthday-paradox v-else-if="selectedOption === 4"></app-birthday-paradox>
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
    import FivePersonDemonstration from './FivePersonDemonstration.vue';
    import VaryTheGroupSizeAndTheNumberOfTrials from './VaryTheGroupSizeAndTheNumberOfTrials.vue';
    import ManyTrialsFast from './ManyTrialsFast.vue';
    import BirthdayParadox from './BirthdayParadox.vue';
    export default {
        components: {
            // appTitle: Title,
            appTitleStatic: TitleStatic,
            appTopNav: TopNav,
            appOptions: Options,
            // appBottomNav: BottomNav,
            appFivePersonDemonstration: FivePersonDemonstration,
            appVaryTheGroupSizeAndTheNumberOfTrials: VaryTheGroupSizeAndTheNumberOfTrials,
            appManyTrialsFast: ManyTrialsFast,
            appBirthdayParadox: BirthdayParadox,
        },
        data: function() {
            return {
                options: [
                    { id: 1, title: 'Five person demonstration' },
                    { id: 2, title: 'Vary the group size and the number of trials' },
                    { id: 3, title: 'Many trials fast' },
                    { id: 4, title: 'Birthday paradox' },
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
