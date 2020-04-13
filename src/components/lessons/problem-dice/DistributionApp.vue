<template>
	<div class="app--container mt-3 mb-5">
		<div class="app--graph mb-3">
			<div class="app--dice-graph"></div>
			<div class="app--diff-graph">
				<app-diff-graph
					:diceDiffArr="diceDiffArr"
					:trialNumber="trialNumber"
				></app-diff-graph>
			</div>
		</div>

		<div class="app--dice-diff mt-5 mb-3">
			<div class="app--dice-diff-label font-weight-bold text-primary">Dice diff<span class="app--hide-wording">erence</span>:</div>
			<div class="app--dice-diff-data">
				<div class="app--dice-diff-data-single font-weight-bold text-center" v-for="num in [0, 1, 2, 3, 4, 5]" :key="num">
					{{ num }}
				</div>
			</div>
		</div>

		<div class="app--game mb-3">
			<div class="app--game-label font-weight-bold text-primary">
				<!-- <table class="table table-sm table-borderless" style="border: none; !important">
					<tr>
						<th class="text-primary">Player A:</th>
					</tr>
					<tr>
						<th class="text-primary">Player B:</th>
					</tr>
				</table>  -->
			</div>
			<div class="app--game-data">
				<div class="app--game-data-winning">
					<table class="table table-sm table-borderless table-responsive-sm" style="table-layout:fixed;">
						<tr>
							<th></th>
							<th></th>
							<th>
								<span v-if="trialNumber > 0" class="app--game-data-tried font-weight-bold">
									{{ trialNumber }} trials
								</span>
							</th>
						</tr>
						<tr>
							<th></th>
							<th></th>
							<th>
								<span v-if="triedNumber > 0" class="app--game-data-tried font-weight-bold">
									Trial {{ triedNumber }}
								</span>
							</th>
						</tr>
					</table>
					<!-- {{ playAWinsNumber }}&nbsp;&nbsp;{{ playAWinsPercent + '%' }}<br>
					{{ playBWinsNumber }}&nbsp;&nbsp;{{ playBWinsPercent + '%' }} -->
				</div>

			</div>
		</div>

		<div class="app--action">
			<button
				class="btn btn-outline-success"
				v-if="demoAutoOption === '1' && isEnd === false"
				@click="handleToggleTimer"
			>
				{{isStart ? (
					timer ? "Pause" : "Resume"
				)  :"Start auto" }}
			</button>
			<button
				class="btn btn-outline-success"
				v-if="demoAutoOption === '0' && isEnd === false"
				@click="handleNextMove"
			>
				Next move
			</button>
			<button
				class="btn btn-outline-dark"
				v-if="isEnd===true"
				@click="handleReset"
			>
				Reset
			</button>
			<app-demo-auto-option
				class="mt-1"
				@changeOption="demoAutoOption=$event"
				:option="demoAutoOption">
			</app-demo-auto-option>
		</div>
	</div>
</template>

<script>
import DiffGraph from './DiffGraph.vue';
import DemoAutoOption from './DemoAutoOption.vue';
import { throwDice } from './utils';

export default {
	props: ['trialNumber'],
	components: {
		appDiffGraph: DiffGraph,
		appDemoAutoOption: DemoAutoOption
	},
	data: function() {
		return {
			demoAutoOption: "1",
			diceDiffArr: [0, 0, 0, 0, 0, 0],
			triedNumber: 0,
			dice1: null,
			dice2: null,
			timer: null,
			isStart: false,
			isEnd: false
		}
	},
	computed: {
		timerInterval() {
			if(!this.trialNumber) return 600;
			if(this.trialNumber <= 100) {
				return 300
			} else if(this.trialNumber <= 1000) {
				return 100
			} else if(this.trialNumber <= 5000) {
				return 80
			} else {
				return 50;
			}
		}
	},
	watch: {
		demoAutoOption(value) {
			if(value==='0') {
				clearInterval(this.timer);
				this.timer = null;
			}
		},
		triedNumber(value) {
			if(this.trialNumber && this.triedNumber >= this.trialNumber) {
				this.isEnd = true;
				clearInterval(this.timer);
				this.timer = null;
			}
		}
	},
	methods: {
		handleNextMove() {
			if(!this.isStart) this.isStart = true;
			this.dice1 = throwDice();
			this.dice2 = throwDice();
			const diffIndex = Math.abs(this.dice1 - this.dice2);
			const newDiff = this.diceDiffArr[diffIndex]+1;
			this.diceDiffArr.splice(diffIndex, 1, newDiff);
			this.triedNumber++;

		},
		handleToggleTimer() {
			if(this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			} else {
				this.timer = setInterval(this.handleNextMove, this.timerInterval);
			}
		},
		handleReset() {
			this.diceDiffArr = [0, 0, 0, 0, 0, 0];
			this.triedNumber = 0;
			this.dice1 = null;
			this.dice2 = null;
			this.isStart = false;
			this.isEnd = false;
		}
	},
	destroyed() {
		clearInterval(this.timer);
	}
}
</script>

<style scoped>
.app--container {
	max-width: 750px;
	margin: 0 auto;
}
.app--graph, .app--dice-diff, .app--player, .app--game {
	display: flex;
}
.app--dice-graph {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
}
.app--dice-diff-label, .app--player-label, .app--game-label {
	flex: 1;
	text-align: right;
	transform: translateX(-15%);
}
.app--diff-graph, .app--dice-diff-data, .app--player-data, .app--game-data {
	flex: 3;
	display: flex;
	justify-content: space-between;
}
.app--game-data-winning {
	flex: 1;
	padding: 0 15px;
}
.app--game-data-tried {
	flex: 1;
}
.app--dice-diff-data-single, .app--player-data-single {
	flex: 1;
	display: flex;
	justify-content: center;
	margin:0 5px;
}
.app--player-data, .app--dice-diff-data {
	padding-right: 10px;
}
.app--player-data-single {
	border: 1px solid #333;
}
.app--player-set {
	cursor: pointer;
}

.app--action {
	display: flex;
	flex-direction: column;
	align-items: center;
}

@media only screen and (max-width: 425px)  {
	.app--hide-wording {
		display: none;
	}
}
</style>
