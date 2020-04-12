<template>
	<div class="container mt-3 mb-5">
		<h3 class="lesson-subheading">Show the number</h3>
		<hr class="subheading-separator">
		<div class="row">
			<div class="col-md-6 pb-4">
				<app-plugboard
					@setDigit="totalDigit=$event"
					@setPlugboardNumber="plugboardNumberSet=$event"
					:plugboardNumber="plugboardNumber"
					:isDisable="plugboardDisable"
					:isRadioDisable="plugboardRadioDisable"
					:numberToCheck="numberToCheck"
					:isCreatingNewNumber="isCreatingNewNumber"
				></app-plugboard>
				<app-plugboard-input
					@setInputNumber="inputNumberSet=$event"
					:totalDigit="totalDigit"
					:inputNumber="inputNumber"
					:isDisable="inputDisable"
					:numberToCheck="numberToCheck"
					:isCreatingNewNumber="isCreatingNewNumber"
				></app-plugboard-input>
			</div>
			<div class="col-md-6">
				<div style="display: flex; align-items: flex-start;">
					<app-calculator
						:calNumber="calNumber"
						:isDisable="calDisable"
						:numberToCheck="numberToCheck"
						:isCreatingNewNumber="isCreatingNewNumber"
					></app-calculator>
					<app-spelling-help
						@setSpelling="handleSetSpelling"
						:isDisable="spellingHelpDisable"
					></app-spelling-help>
				</div>
				<br>
				<app-spelling-board
					:spellingNumber="spellingNumber"
					:isDisable="spellingDisable"
					:numberToCheck="numberToCheck"
					:spelling="spelling"
					@setSpellingWord="spelling = $event"
					:isCreatingNewNumber="isCreatingNewNumber"
				></app-spelling-board>
				<br>
				<div class="text-center" style="display: flex; justify-content: space-around;">
					<button
						class="btn btn-outline-success"
						@click="handleCreateNewNumber"
					>New number</button>
					<button
						class="btn btn-outline-dark"
						@click="handleCheck"
					>
						OK
					</button>
				</div>
				<div v-if="number!==null" class=" mt-2 alert alert-danger">
					Show this number in all the ways
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Plugboard from './Plugboard.vue';
import PlugboardInput from './PlugboardInput.vue';
import Calculator from './Calculator.vue';
import SpellingBoard from './SpellingBoard.vue';
import SpellingHelp from './SpellingHelp.vue';
import { pickRandomNumber } from './utils';

export default {
	components: {
		appPlugboard: Plugboard,
		appCalculator: Calculator,
		appSpellingBoard: SpellingBoard,
		appSpellingHelp: SpellingHelp,
		appPlugboardInput: PlugboardInput
	},
	data: function() {
		return {
			totalDigit: null,	// 位数 1 - 5
			number: null,
			numberToCheck: null,
			form: null,	// The form of number(1, 2, 3 or 4), 1-plugboard 2-input 3-calculator 4-spelling
			plugboardNumber: null,	// 根据form需要对不同形式的数赋值。
			inputNumber: null,
			calNumber: null,
			spellingNumber: null,

			plugboardRadioDisable: false,
			plugboardDisable: true,
			inputDisable: true,
			calDisable: true,
			spellingDisable: true,
			spellingHelpDisable: true,
			spelling: '',
			isCreatingNewNumber: false,

			inputNumberSet: null,
			plugboardNumberSet: null
		}
	},
	methods: {
		init() {
			this.plugboardNumber = null;
			this.inputNumber = null;
			this.calNumber = null;
			this.spellingNumber = null;
			this.numberToCheck = null;
			this.plugboardRadioDisable = false
			this.plugboardDisable = true;
			this.inputDisable = true;
			this.calDisable = true;
			this.spellingDisable = true;
			this.spellingHelpDisable = true;
		},
		handleCreateNewNumber() {
			// totalDigit - 1, 1 10^0 - 9 10^1-1
			// 2               10 10^1 - 99  10^2-1
			// 3               100 10^2 - 999  10^3-1
			// 4               1000 10^3 - 9999  10^4-1
			// 5               10000 10^4 - 99999  10^5-1
			this.init();
			let mathRandom = Math.random();
			let min = Math.pow(10, this.totalDigit-1);
			let max = Math.pow(10, this.totalDigit);
			this.number = pickRandomNumber(min, max);
			this.form = pickRandomNumber(1, 5);
			this.plugboardRadioDisable = true;
			this.plugboardDisable = false;
			this.inputDisable = false;
			this.calDisable = false;
			this.spellingDisable = false;
			this.spellingHelpDisable = false;
			this.isCreatingNewNumber = true;
			switch(this.form) {
				case 1:
					this.plugboardNumber = this.number;
					this.plugboardDisable = true;
					break;
				case 2:
					this.inputNumber = this.number;
					this.inputDisable = true;
					break;
				case 3:
					this.calNumber = this.number;
					this.calDisable = true;
					break;
				case 4:
					this.spellingNumber = this.number;
					this.spellingDisable = true;
					this.spellingHelpDisable = true;
					break;
				default:
					return;
			}
		},
		handleCheck() {
			if(this.number) {
				this.numberToCheck = this.number;
			//	this.plugboardNumber = this.number;
			}
			this.isCreatingNewNumber = false;
		},
		handleSetSpelling($event) {
			this.spelling += ` ${$event}`;
		}
	}
}
</script>

<style scoped>

</style>
