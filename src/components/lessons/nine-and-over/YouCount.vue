<template>
	<div class="container mt-3 mb-5">
		<h3 class="lesson-subheading">You count</h3>
		<hr class="subheading-separator">
		<div class="row">
			<div class="col-md-6 pb-4">
				<app-plugboard
					@setDigit="totalDigit=$event"
					@setPlugboardNumber="handleSettingNumber"
					:plugboardNumber="countingSet ? countingSet.startingNumber: null"
					:isRadioDisable="countingSet ? true : false"
					:isDisable="!countingSet ? true : false"
					:countingSet="countingSet"
				/>
				<app-plugboard-input
					:totalDigit="totalDigit"
					:inputNumber="countingSet ? countingSet.startingNumber : null"
					:isDisable="true"
					:countingSet="countingSet"
				></app-plugboard-input>
			</div>
			<div class="col-md-6">
				<div style="display: flex; align-items: flex-start;">
					<app-calculator
						:calNumber="countingSet ? countingSet.startingNumber : null"
						:isDisable="true"
						:countingSet="countingSet"
					></app-calculator>
					<div v-if="countingSet===null" >
						<app-count-form
							@setCounting="countingSet=$event"
							:totalDigit="totalDigit"
							:countingSet="countingSet"
						></app-count-form>
					</div>
					<div v-else class="pl-3" >
						<div>
							Started counting from {{ legify(appStartingNumber) }}
							<br>
							Counting by {{countingSet.countingBy }}s
						</div>
						<div class="alert alert-danger mt-3">
							{{ isFinish ? "Finished!" : "Move the plug to count" }}
						</div>
						<div class="text-center mt-3">
							<button class="btn btn-outline-dark" @click="handleStartAgain">Start again</button>
						</div>
					</div>
				</div>
				<br>
				<app-spelling-board
					:spellingNumber="countingSet ? countingSet.startingNumber : null"
					:isDisable="true"
					:countingSet="countingSet"
				></app-spelling-board>
			</div>
		</div>
	</div>
</template>

<script>
import Plugboard from './Plugboard.vue';
import PlugboardInput from './PlugboardInput.vue';
import Calculator from './Calculator.vue';
import SpellingBoard from './SpellingBoard.vue';
import CountForm from './CountForm.vue';
import correctChoiceSound from '@/assets/correct-choice.wav';
import { legify } from "../../common/utils.js";


export default {
	components: {
		appPlugboard: Plugboard,
		appCalculator: Calculator,
		appSpellingBoard: SpellingBoard,
		appPlugboardInput: PlugboardInput,
		appCountForm: CountForm
	},
	data: function() {
		return {
			totalDigit: null,
			countingSet: null,
			isFinish: false,
			appStartingNumber: null,
			correctChoiceSound: null
		}
	},
	computed: {
		maxNumber() {
			if(!this.totalDigit) return 0;
			return Math.pow(10, this.totalDigit)-1;
		},
	},
	watch: {
		countingSet(value, prevValue) {
			if(!prevValue && value) {
				this.appStartingNumber = this.countingSet.startingNumber;
			}
		}
	},
	methods: {
		legify,
		handleSettingNumber($event) {
			const { direction, countingBy, startingNumber } = this.countingSet;
			if(startingNumber + direction*countingBy === $event) {
				this.countingSet.startingNumber = $event;
				this.correctChoiceSound.play();
				if ( $event === this.maxNumber ||
				    $event === 0 ||
						$event + direction*countingBy > this.maxNumber ||
						$event + direction*countingBy < 0) {
					this.isFinish = true;
				}
			}

		},
		handleStartAgain() {
			this.countingSet = null;
			this.isFinish = false;
		}
	},
	mounted() {
		this.correctChoiceSound = new Audio(correctChoiceSound);
	}
}
</script>

<style scoped>

</style>
