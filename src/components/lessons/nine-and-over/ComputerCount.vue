<template>
	<div class="container mt-3 mb-5">
		<h3 class="lesson-subheading">Computer counts</h3>
		<hr class="subheading-separator">
		<div class="row">
			<div class="col-md-6 pb-4">
				<app-plugboard
					@setDigit="totalDigit=$event"
					:plugboardNumber="countingSet ? countingSet.startingNumber: null"
					:isRadioDisable="countingSet ? true : false"
					:isDisable="true"
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
						<div v-if="isFinish" class="alert alert-danger mt-3">Finished</div>
						<div class="text-center mt-3">
							<p>Write speed per second</p>
							<div class="form-check">
								<input
									type="radio"
									class="form-check-input"
									v-model="speed"
									id="speed-1"
									:value="1"
								>
								<label for="speed-1" class="form-check-label"> 1 </label>
							</div>

							<div class="form-check">
								<input
									type="radio"
									class="form-check-input"
									v-model="speed"
									id="speed-2"
									:value="2"
								>
								<label for="speed-2" class="form-check-label"> 2 </label>
							</div>
							<div class="form-check">
								<input
									type="radio"
									class="form-check-input"
									v-model="speed"
									id="speed-5"
									:value="5"
								>
								<label for="speed-5" class="form-check-label"> 5 </label>
							</div>
							<div class="form-check">
								<input
									type="radio"
									class="form-check-input"
									v-model="speed"
									id="speed-10"
									:value="10"
								>
								<label for="speed-10" class="form-check-label"> 10 </label>
							</div>
						</div>
						<div class="text-center mt-3 app--action">
							<button
								v-if="!isFinish && demoAutoOption == '0'"
								class="btn btn-outline-success"
								@click="handleNextNumber">
								{{ isStart ? "Next number" : "Start" }}
							</button>
							<button
								v-if="!isFinish && demoAutoOption == '1'"
								class="btn btn-outline-success"
								@click="handleToggleTimer">
								{{ !isStart ? "Start" :
									( timer ? "Pause" : "Resume")
								}}
							</button>
							<button v-if="isFinish" class="btn btn-outline-dark" @click="handleStartAgain">Reset</button>
						</div>
						<div class="mt-1 mb-3 text-center">
							<app-demo-auto-option
								:option="demoAutoOption"
								@changeOption="demoAutoOption=$event">
							</app-demo-auto-option>
						</div>
						<div class="text-center">
							<button class="btn btn-outline-dark ml-3" @click="handleStartAgain">Start again</button>
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
import DemoAutoOption from '../../common/DemoAutoOption.vue';
import { legify } from "../../common/utils.js";

export default {
	components: {
		appPlugboard: Plugboard,
		appCalculator: Calculator,
		appSpellingBoard: SpellingBoard,
		appPlugboardInput: PlugboardInput,
		appCountForm: CountForm,
		appDemoAutoOption: DemoAutoOption
	},
	data: function() {
		return {
			totalDigit: null,
			countingSet: null,
			isFinish: false,
			isStart: false,
			demoAutoOption: '0',
			timer: null,
			speed: 1,
			appStartingNumber: null
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
		},
		demoAutoOption(value) {
			if(value=='0') {
				clearInterval(this.timer);
				this.timer = null;
			}
		},
		isFinish(value) {
			if(value) {
				clearInterval(this.timer);
				this.timer = null;
			}
		},
		speed(value, prevValue) {
			if(value !== prevValue && this.timer) {
				clearInterval(this.timer);
				this.timer = setInterval(this.handleNextNumber, 1/this.speed*1000);
			}
		}
	},
	methods: {
		legify,
		handleNextNumber() {
			if(!this.isStart) {
				this.isStart = true;
			}
			let nextNumber = this.countingSet.startingNumber + this.countingSet.direction * this.countingSet.countingBy;
			if(nextNumber >= this.maxNumber || nextNumber <= 0) {
				this.isFinish = true;
			}
			if(nextNumber <= this.maxNumber && nextNumber >= 0) {
				this.countingSet.startingNumber = nextNumber;
			}
		},
		handleToggleTimer() {
			if(this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			} else {
				this.timer = setInterval(this.handleNextNumber, 1/this.speed*1000);
			}
		},
		handleStartAgain() {
			this.countingSet = null;
			this.isFinish = false;
			this.isStart = false;
			this.speed = 1;
			if(this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
		}
	},
	destroyed() {
		clearInterval(this.timer);
	}
}
</script>

<style scoped>

</style>
