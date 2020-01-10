<template>
    <div>
        <div v-if="selectedOption === -1">
            <app-title-static>
                Cars In A Garage
            </app-title-static>
            <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
                <app-options :options="options" @selectOption="selectedOption=$event"></app-options>
            </transition>
        </div>

        <div class="container-fluid" v-else>
            <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
                <app-top-nav @backToMenu="selectedOption = $event">Cars In A Garage</app-top-nav>
            </transition>

            <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
                <app-how-many-ways v-if="selectedOption === 1"></app-how-many-ways>
                <app-parking-challenges v-else-if="selectedOption === 2"></app-parking-challenges>
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
    import HowManyWays from './HowManyWays.vue';
    import ParkingChallenges from './ParkingChallenges.vue';
    export default {
        components: {
            // appTitle: Title,
            appTitleStatic: TitleStatic,
            appTopNav: TopNav,
            appOptions: Options,
            // appBottomNav: BottomNav,
            appHowManyWays: HowManyWays,
            appParkingChallenges: ParkingChallenges,
        },
        data: function() {
            return {
                options: [
                    { id: 1, title: 'How Many Ways' },
                    { id: 2, title: 'Parking Challenges' },
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
