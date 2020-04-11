<template>
	<div class="container mt-3 mb-5">
		<h3 class="text-center text-success">
			Play the game
		</h3>
		<div class="mt-4 row">
			<app-hexagon class="col-md-4"
				:data="hexSetting[0]"
				:selected="selectedNumber"
				:style="{visibility: selectedHex.indexOf('left') >= 0 ? 'visible':'hidden'}"
			></app-hexagon>
			<app-hexagon class="col-md-4"
				:data="hexSetting[1]"
				:selected="selectedNumber"
				:style="{visibility: selectedHex.indexOf('middle') >= 0 ? 'visible':'hidden'}"
			></app-hexagon>
			<app-hexagon class="col-md-4"
				:data="hexSetting[2]"
				:selected="selectedNumber"
				:style="{visibility: selectedHex.indexOf('right') >= 0 ? 'visible':'hidden'}"
			></app-hexagon>
		</div>
		<div v-if="!isSelected">
			<div class="text-center">
				<h5>Choose your hexagons for testing</h5>
			</div>
			<div class="text-center mt-3">
				<div class="form-check form-check-inline">
					<input
						id="hex-left"
						type="checkbox"
						class="form-check-input"
						v-model="selectedHex"
						value="left"
					>
					<label for="hex-left" class="form-check-label">Left</label>
				</div>
				<div class="form-check form-check-inline">
					<input
						id="hex-middle"
						type="checkbox"
						class="form-check-input"
						v-model="selectedHex"
						value="middle"
					>
					<label for="hex-middle" class="form-check-label">Middle</label>
				</div>
				<div class="form-check form-check-inline">
					<input
						id="hex-right"
						type="checkbox"
						class="form-check-input"
						v-model="selectedHex"
						value="right"
					>
					<label for="hex-right" class="form-check-label">Right</label>
				</div>
				<div class="text-center">
					<div v-if="selectedHex.length === 0" class="badge badge-danger">
						Select at least one hexagon
					</div>
				</div>
				<div class="text-center">
					<button
						class="btn btn-outline-success mt-4"
						@click="() => { isSelected = true;}"
						:disabled="selectedHex.length === 0"
					>OK</button>
				</div>
			</div>
		</div>
		<div v-else>
			<div class="row">
				<div class="col-md-3 app--dice">
					<app-dice v-if="number1" :index="0" :number="number1" class="m-3"></app-dice>
					<app-dice v-if="number2" :index="1" :number="number2" class="m-3"></app-dice>
				</div>
				<div class="col-md-6 app--data">
					<table class="table" style="table">
						<tr>
							<th>Product</th>
							<td><span v-if="product">{{ product }}</span></td>
						</tr>
						<tr>
							<th>Turn</th>
							<td><span v-if="turn > 0">{{ turn }}</span></td>
						</tr>
					</table>
				</div>
				<div class="col-md-3 app--dice">
				</div>
			</div>
			<div class="text-center mt-3">
				<div
					v-if="result"
					class="alert alert-danger">
					The {{ result }} hexagon is the winner!
				</div>
				<button
					v-if="demoAutoOption=='0' && !result"
					class="btn btn-outline-success"
					@click="handlePlay"
				>
					{{ step===1 ? 'Roll dice' : 'Calculate product' }}
				</button>
				<button
					v-if="demoAutoOption=='1' && !result"
					class="btn btn-outline-success"
					@click="handleToggleTimer"
				>
					{{ !isStart ? 'Start' :
						(timer ? 'Pause' : 'Resume')
					}}
				</button>
				<button
					v-if="result"
					class="btn btn-outline-dark"
					@click="handleReset"
				>
					Reset
				</button>
				<br>
				<app-demo-auto-option
					class="mt-1"
					:option="demoAutoOption"
					@changeOption="demoAutoOption=$event"
				></app-demo-auto-option>
			</div>
		</div>
	</div>
</template>

<script>
import Hexagon from './Hexagon.vue';
import DemoAutoOption from '../../common/DemoAutoOption.vue';
import Dice from '../../common/Dice.vue';
import { throwDiceOnce } from './utils';

export default {
	components: {
		appHexagon: Hexagon,
		appDemoAutoOption: DemoAutoOption,
		appDice: Dice
	},
	props: ['hexSetting'],
	data: function() {
		return {
			// dataLeft: [8, 9, 10, 12, 15, 16],
			// dataMiddle: [1, 2, 3, 4, 5, 6],
			// dataRight: [18, 20, 24, 25, 30, 36],
			selectedNumber: [],
			selectedHex: ['left', 'middle', 'right'],
			isSelected: false,
			isStart: false,
			demoAutoOption: '0',
			timer: null,
			number1: null,
			number2: null,
			product: null,
			turn: 0,
			step: 1,	// 1 - tap for roll dice, 2 - tap for product
			dataLeftTest: [],
			dataMiddleTest: [],
			dataRightTest: [],	// The three arrays are the copies of
			// dataLeft, dataMiddle and dataRight to test which one is winner
			result: null	// Who wins a game: 'left', 'middle' or 'right'
		}
	},
	computed: {

	},
	watch: {
		demoAutoOption(value) {
			if(value=='0') {
				clearInterval(this.timer);
				this.timer=null;
			}
		},
		result(value) {
			if(value) {
				clearInterval(this.timer);
				this.timer=null;
			}
		},
		dataLeftTest(arrValue) {
			if(this.selectedHex.indexOf('left') < 0) {
				return;
			}
			if(arrValue.length === 0) {
				this.result = 'first';
			}
		},
		dataRightTest(arrValue) {
			if(this.selectedHex.indexOf('right') < 0) {
				return;
			}
			if(arrValue.length === 0) {
				this.result = 'second';
			}
		},
		dataMiddleTest(arrValue) {
			if(this.selectedHex.indexOf('middle') < 0) {
				return;
			}
			if(arrValue.length === 0) {
				this.result = 'third';
			}
		}
	},
	methods: {
		handlePlay() {
			if(!this.isStart) this.isStart = true;
			if(this.step === 1){
				this.number1 = throwDiceOnce();
				this.number2 = throwDiceOnce();
				this.turn++;
				this.step++;
			} else if(this.step === 2) {
				this.product = this.number1 * this.number2;
				if(this.selectedNumber.indexOf(this.product) < 0) {
					this.selectedNumber.push(this.product);
				}
				let indexForLeft = this.dataLeftTest.indexOf(this.product);
				let indexForMiddle = this.dataMiddleTest.indexOf(this.product);
				let indexForRight = this.dataRightTest.indexOf(this.product);
				if(indexForLeft >= 0) {
					this.dataLeftTest.splice(indexForLeft, 1);
				}
				if(indexForMiddle >= 0) {
					this.dataMiddleTest.splice(indexForMiddle, 1);
				}
				if(indexForRight >= 0) {
					this.dataRightTest.splice(indexForRight, 1);
				}

				this.step=1;
			}
		},
		handleToggleTimer() {
			if(this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			} else {
				this.timer = setInterval(this.handlePlay, 400);
			}
		},
		handleReset() {
			this.selectedNumber = [];
			this.selectedHex = ['left', 'middle', 'right'];
			this.isSelected = false;
			this.isStart = false;
			this.timer = null;
			this.number1 = null;
			this.number2 = null;
			this.product = null;
			this.turn = 0;
			this.step = 1;
			this.dataLeftTest = [...this.hexSetting[0]];
			this.dataMiddleTest = [...this.hexSetting[1]];
			this.dataRightTest = [...this.hexSetting[2]];
			this.result = null;
		}
	},
	created() {
		this.dataLeftTest = [...this.hexSetting[0]];
		this.dataMiddleTest = [...this.hexSetting[1]];
		this.dataRightTest = [...this.hexSetting[2]];
	},
	destroyed() {
		clearInterval(this.timer);
	}
}
</script>

<style scoped>
.app--dice {
	display: flex;
	justify-content: center;
}
</style>
