<template>
	<div class="mt-3 mb-5">
		<app-lesson-title
			:title="'Goal Distrubution'"
			:trialNumber="trialNumber"
			:numberTried="numberTried"
		>
		</app-lesson-title>
		<div class="row mb-5">
			<div class="col-12 col-md-3 col-sm-4 app--tally-table-container">
				<app-tally-table
					:tallyTable="tallyTable"
					:title="{col1: 'Goal', col2: 'Freq'}"
				>
				</app-tally-table>
			</div>
			<div class="col-12 col-md-9 col-sm-8">
				<div class="app--tally-graph-stat p-2">
					<span class="badge badge-danger" v-if="minGoals > 0">Min: {{ minGoals}}</span>
					<span class="badge badge-success" v-if="maxGoals > 0">Max: {{ maxGoals }}</span>
				</div>
					<app-tally-graph :tallyTable="tallyTable" :trialNumber="trialNumber" :heightUnit="heightUnit"></app-tally-graph>
			</div>
		</div>
		<div class="app--action text-center">
			<h5 class="text-danger text-center" :style="{visibility: isEnd ? 'visible' : 'hidden' }">Finished</h5>
			<button class="btn btn-outline-success" v-if="!isEnd && demoAutoOption==='0'" @click="handleSetNextGame">
				{{ isStart ? "Play next game" : "Play first game"}}
			</button>
			<button class="btn btn-outline-success" v-if="!isEnd && demoAutoOption==='1'" @click="handleToggleTimer">
				{{ !isAutoStart ? "Start" : (timer ? "Pause" : "Resume") }}
			</button>
			<button class="btn btn-outline-dark" v-if="isEnd" @click="handleReset">Reset</button>
			<app-demo-auto-option class="mt-1" @changeOption="demoAutoOption=$event" :option="demoAutoOption"></app-demo-auto-option>
			<div>
				<app-change-rule @changeRule="isChangeRule=$event" :isDisable="isStart"></app-change-rule>
			</div>
		</div>
	</div>
</template>

<script>
import LessonTitle from './LessonTitle.vue';
import TallyTable from './TallyTable.vue';
import TallyGraph from './TallyGraph.vue';
import ChangeRule from './ChangeRule.vue';
import DemoAutoOption from './DemoAutoOption';
import { throwDiceOnce, throwDiceTwo, getTimerInterval } from './utils';
import { calculateTimerInterval } from "../../common/utils";

export default {
	props: ['trialNumber'],
	components: {
		appLessonTitle: LessonTitle,
		appChangeRule: ChangeRule,
		appDemoAutoOption: DemoAutoOption,
		appTallyTable: TallyTable,
		appTallyGraph: TallyGraph
	},
	data: function() {
		return {
			isStart: false,
			isEnd: false,
			isChangeRule: false,
			demoAutoOption: "1",
			timer: null,
			timerInterval: null,
			isAutoStart: false,
			numberTried: 0,
			tallyTable: []
		}
	},
	computed: {
		reversedTallyTable() {
			const tallyTableCopy = [...this.tallyTable];
			return tallyTableCopy.reverse();
		},
		maxGoals() {
			const index = this.reversedTallyTable.findIndex((el) => {
				return el.tally > 0;
			});
			if(index === -1) return 0;
			return this.reversedTallyTable[index].unit;
		},
		minGoals() {
			const index = this.tallyTable.findIndex((el) => {
				return el.tally > 0;
			});
			if(index === -1) return 0;
			return this.tallyTable[index].unit;
		},
		heightUnit() {
			if(this.trialNumber<=100) {
				return 15;
			} else if(this.trialNumber <=1000) {
				return 5;
			} else if(this.trialNumber <=5000) {
				return 1;
			} else if(this.trialNumber <=10000) {
				return 0.5;
			} else if(this.trialNumber <=50000) {
				return 0.3;
			} else {
				return 0.05;
			}
		}
	},
	watch: {
		demoAutoOption(value) {
			if(value==='0' && this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
		},
		isEnd(value) {
			if(value === true && this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
		}
	},
	methods: {
		calculateGoalsOneGame() {	// Calculate goals in a game
			if(this.isChangeRule) {
				return throwDiceTwo()[0] + throwDiceTwo()[0] + throwDiceTwo()[0] + throwDiceTwo()[0];
			} else {
				return throwDiceOnce() + throwDiceOnce() + throwDiceOnce() + throwDiceOnce();
			}
		},
		handleReset() {
			this.isStart = false;
			this.isEnd = false;
			this.numberTried = 0;
			this.tallyTable = [];
			this.initTallyTable();
		},
		handleSetNextGame() {
			if(!this.isStart) this.isStart = true;
			let goals = this.calculateGoalsOneGame();
			let index = this.tallyTable.findIndex((el) => {
				return el.unit === goals;
			});
			this.tallyTable[index].tally++;

			this.numberTried++;
			if(this.numberTried >= this.trialNumber) {
				this.isEnd = true;
			}
		},
		handleToggleTimer() {
			if(!this.isAutoStart) this.isAutoStart = true;
			if(this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			} else {
				this.timer = setInterval(this.handleSetNextGame, this.timerInterval);
			}
		},
		initTallyTable() {
			for(let i=4; i<=24; i++) {
				// 4 - the possible minimum goals in a game, 4*1 = 4
				// 24 - the possible maximum goals in a game, 4*6 = 24
				if(i%2===0) {
					this.tallyTable.push({
						unit: i,
						tally: 0,
						mark: true
					});
				} else {
					this.tallyTable.push({
						unit: i,
						tally: 0,
						mark: false
					});
				}
			}
		}
	},
	created() {
		this.initTallyTable();
		this.timerInterval = calculateTimerInterval(this.trialNumber);
	},
	destroyed() {
		if(this.timer) {
			clearInterval(this.timer);
		}
	}
}
</script>

<style scoped>
.app--tally-table-container {
	height: 650px;
	overflow-y: scroll;
}
.app--tally-graph-container {
	min-height: 690px;
}
.app--tally-graph-stat {
	width: 100%;
	display: flex;
	justify-content: space-around;
}
.app--action {
	transform: translateY(15%);
}
</style>
