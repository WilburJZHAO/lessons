<template>
    <div>
        <div v-if="selectedOption === -1">
            <app-title-static>
                Goldbach's Conjecture
            </app-title-static>
            <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
                <app-options :options="options" @selectOption="selectedOption=$event"></app-options>
            </transition>
        </div>

        <div class="container-fluid" v-else>
            <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
                <app-top-nav @backToMenu="selectedOption = $event">Goldbach's Conjecture</app-top-nav>
            </transition>

            <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
                <app-enter-your-number v-if="selectedOption === 1"></app-enter-your-number>
                <app-search-range v-else-if="selectedOption === 2"></app-search-range>
                <app-a-listof-primes v-else-if="selectedOption === 3"></app-a-listof-primes>
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
    import AListofPrimes from './AListofPrimes.vue';
    import EnterYourNumber from './EnterYourNumber.vue';
    import SearchRange from './SearchRange.vue';
    export default {
        components: {
            // appTitle: Title,
            appTitleStatic: TitleStatic,
            appTopNav: TopNav,
            appOptions: Options,
            // appBottomNav: BottomNav,
            appSearchRange: SearchRange,
            appEnterYourNumber: EnterYourNumber,
            appAListofPrimes: AListofPrimes,
        },
        data: function() {
            return {
                options: [
                    { id: 1, title: 'Enter your number' },
                    { id: 2, title: 'Enter your number and search range' },
                    { id: 3, title: 'Display a list of primes' },
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
