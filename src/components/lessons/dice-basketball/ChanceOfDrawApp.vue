<template>
	<div>
		<div class="container mt-3 mb-5">
			<div class="app--title mb-3">
				<h4 class="text-success">
					Chance of a draw - {{ trialNumber }} games
				</h4>
				<h4 class="text-success">
					Game {{ numberTried }}
				</h4>
			</div>
			<div class="row mb-2">
				<div class="col-12 col-md-3 col-sm-4 app--tally-table">
					<div class="app--tally-table-item app--tally-table-title mb-2">
						<span class="badge badge-dark" style="transform: translateX(50%)">
							Diff
						</span>
						<span class="badge badge-dark">Tally</span>
					</div>
					<ul class="list-group" v-if="isStart===true">
						<li v-for="(item, index) in tallyTable"
							:key="index"
							class="list-group-item app--tally-table-item"
							:class="index%2===0 ? 'list-group-item-dark' : ''"
						>
							<span>{{ item.diff }}</span>
							<span>{{ item.tally }}</span>
						</li>
					</ul>
				</div>	<!-- end of Tally table -->

				<div class="col-12 col-md-9 col-sm-8">
					<div class="app--tally-graph-container pt-3">
						<div class="app--tally-graph-stat p-2">
							<span class="float-left font-weight-bold" v-if="occurrenceOfDraw>0">
								Draws: {{ occurrenceOfDraw }}&nbsp;&nbsp;&nbsp;
								{{ occurrenceOfDraw }} draw{{ occurrenceOfDraw > 1 ? 's' : ''}} ({{ occurrencePercent }}%) 1 in every {{ occurrenceInHowmanyGames }}
							</span>
							<span class="badge badge-success float-right">Max: {{ maxDiff }}</span>
						</div>
						<div class="app--tally-graph app--tally-graph-full" v-if="isFullGraph===true">
							<div v-for="(item, index) in tallyTable"
							:key="index"
							class="app--tally-graph-bar"
							:style="{height: item.tally*unit + 'px'}">
								<div class="app--tally-graph-index" v-if="index===0 || index===60 || index === 120">
									<div class="app--tally-graph-index-mark">|</div>
									<div class="app--tally-graph-index-num">{{ index }}</div>
								</div>
							</div>
						</div>	<!-- Tally full graph -->
						<div class="app--tally-graph app--tally-graph-simple" v-if="isFullGraph===false">
							<div v-for="index in 21"
							:key="index"
							class="app--tally-graph-bar"
							:style="{height: tallyTable[index-1].tally*unit + 'px'}">
								<div class="app--tally-graph-index" v-if="index===1 || index===11 || index === 21">
									<div class="app--tally-graph-index-mark">|</div>
									<div class="app--tally-graph-index-num">{{ index-1 }}</div>
								</div>
							</div>
						</div>	<!-- Tally simple graph -->
					</div>
				</div>
			</div>
					<div class="app-tally-game-container">
						<table class="table">
							<thead>
								<tr>
									<th></th>
									<th>3P</th>
									<th>2P</th>
									<th>1P</th>
									<th>Total</th>
									<th>Diff</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th><span class="app--team-name">Team </span>A</th>
									<td><span v-if="demoAutoOption==='0'">{{ teamAScoreArr[0]}}</span></td>
									<td><span v-if="demoAutoOption==='0'">{{ teamAScoreArr[1]}}</span></td>
									<td><span v-if="demoAutoOption==='0'">{{ teamAScoreArr[2]}}</span></td>
									<td>
										<span v-if="teamATotalScore > 0 && demoAutoOption==='0'">{{ teamATotalScore }}</span>
									</td>
									<td class="text-danger">
										<span v-if="diff>=0 && demoAutoOption==='0'">{{ diff }}</span>
									</td>
								</tr>
								<tr>
									<th><span class="app--team-name">Team </span>B</th>
									<td><span v-if="demoAutoOption==='0'">{{ teamBScoreArr[0]}}</span></td>
									<td><span v-if="demoAutoOption==='0'">{{ teamBScoreArr[1]}}</span></td>
									<td><span v-if="demoAutoOption==='0'">{{ teamBScoreArr[2]}}</span></td>
									<td>
										<span v-if="teamBTotalScore > 0 && demoAutoOption==='0'">{{ teamBTotalScore }}</span>
									</td>
									<td>
										<input type="checkbox" id="full-graph" class="form-check-input"
											v-model="isFullGraph">
										<label for="full-graph" class="form-check-label"
											style="font-size: 13px;">Full graph</label>
									</td>
								</tr>
							</tbody>
						</table>
					</div>	<!-- Score table -->
			<div class="app--action text-center">
				<h5 class="text-danger text-center" :style="{visibility: isEnd ? 'visible' : 'hidden' }">Finished</h5>
				<button class="btn btn-outline-success" v-if="!isEnd && demoAutoOption==='0'" @click="handleSetNextGame">
					{{ isStart ? "Next game" : "First game"}}
				</button>
				<button class="btn btn-outline-success" v-if="!isEnd && demoAutoOption==='1'" @click="handleToggleTimer">
					{{ !isAutoStart ? "Start" : (timer ? "Pause" : "Resume") }}
				</button>
				<button class="btn btn-outline-dark" v-if="isEnd" @click="handleReset">Reset</button>
				<app-demo-auto-option class="mt-1" @changeOption="demoAutoOption=$event" :option="demoAutoOption"></app-demo-auto-option>
			</div>
			<div>
				<app-change-rule @changeRule="isChangeRule=$event" :isStart="isStart"></app-change-rule>
			</div>
		</div>
	</div>
</template>

<script>
import ChangeRule from './ChangeRule.vue';
import DemoAutoOption from './DemoAutoOption.vue';
import { throwDiceOnce, throwDiceThree } from './utils';
import { calculateTimerInterval } from '../../common/utils';
export default {
	props: ['trialNumber'],
	components: {
		appChangeRule: ChangeRule,
		appDemoAutoOption: DemoAutoOption
	},
	data: function() {
		return {
			isStart: false,
			isEnd: false,
			isChangeRule: false,
			demoAutoOption: "1",
			timer: null,
			isAutoStart: false,
			numberTried: 0,
			tallyTable: [],
			isFullGraph: false,
			teamAScoreArr: [],	// teamA's score array
			teamBScoreArr: []		// teamB's score array
		}
	},
	computed: {
		teamATotalScore() {
			if(this.teamAScoreArr.length === 0) {
				return 0;
			}
			return this.teamAScoreArr[0]*3 + this.teamAScoreArr[1]*2 + this.teamAScoreArr[2];
		},
		teamBTotalScore() {
			if(this.teamBScoreArr.length === 0) {
				return 0;
			}
			return this.teamBScoreArr[0]*3 + this.teamBScoreArr[1]*2 + this.teamBScoreArr[2];
		},
		diff() {
			if(this.teamATotalScore >0 && this.teamBTotalScore > 0 ) {
				return Math.abs(this.teamATotalScore - this.teamBTotalScore);
			} else {
				return -1;
			}
		},
		occurrenceOfDraw() {
			if(this.tallyTable.length === 0) {
				return 0;
			}
			return this.tallyTable[0].tally;
		},
		occurrencePercent() {
			return ((this.occurrenceOfDraw / this.numberTried)*100).toFixed(3);
		},
		occurrenceInHowmanyGames() {
			return (this.numberTried/this.occurrenceOfDraw).toFixed(1);
		},
		maxDiff() {
			let maxDiff = 0;
			for(let i=0; i<this.tallyTable.length; i++) {
				if(this.tallyTable[i].tally > 0 && this.tallyTable[i].diff > maxDiff) {
					maxDiff = this.tallyTable[i].diff;
				}
			}
			return maxDiff;
		},
		timerInterval() {
			return calculateTimerInterval(this.trialNumber);
		},
		unit() {
			if(this.trialNumber<=100) {
				return 10;
			} else if(this.trialNumber <=1000) {
				return 5;
			} else if(this.trialNumber <=5000) {
				return 1;
			} else if(this.trialNumber <=10000) {
				return 0.5;
			} else if(this.trialNumber <=50000) {
				return 0.4;
			} else {
				return 0.2;
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
		initTallyTable() {
			for(let i = 0; i<=120; i++) {
				// i - the difference between team A and team B's points
				// 0 - the minimum difference(draw)
				// 120 - the maximum difference(144 - 24)
				this.tallyTable.push({
					diff: i,
					tally: 0
				})
			}
		},
		calculateBallsInOneGame() {
			if(this.isChangeRule) {	// If rule is changed
				// Get number of balls for each point in each quarter
				let numberForQ1 = throwDiceThree();
				let numberForQ2 = throwDiceThree();
				let numberForQ3 = throwDiceThree();
				let numberForQ4 = throwDiceThree();
				// Calculate total numbers of balls for 3 point, 2 point and 1 point
				let numberFor3Point = numberForQ1[0] + numberForQ2[0] + numberForQ3[0] + numberForQ4[0];
				let numberFor2Point = numberForQ1[1] + numberForQ2[1] + numberForQ3[1] + numberForQ4[1];
				let numberFor1Point = numberForQ1[2] + numberForQ2[2] + numberForQ3[2] + numberForQ4[2];
				// Calculate total score of a game
				return [numberFor3Point, numberFor2Point, numberFor1Point];
			} else {	// If rule is not changed
				// Throw dice four times for each quarter to get total numbers of balls for 3 point, 2 point and 1 point
				let numberFor3Point = throwDiceOnce() + throwDiceOnce() + throwDiceOnce() + throwDiceOnce();
				let numberFor2Point = throwDiceOnce() + throwDiceOnce() + throwDiceOnce() + throwDiceOnce();
				let numberFor1Point = throwDiceOnce() + throwDiceOnce() + throwDiceOnce() + throwDiceOnce();

				return [numberFor3Point, numberFor2Point, numberFor1Point];
			}
		},
		handleReset() {
			this.isEnd = false;
			this.numberTried = 0;
			this.tallyTable = [];
			this.initTallyTable();
		},
		handleSetNextGame() {
			if(!this.isStart) this.isStart = true;
			this.teamAScoreArr = this.calculateBallsInOneGame();
			this.teamBScoreArr = this.calculateBallsInOneGame();
			// let diff = Math.abs(this.teamATotalScore - this.teamBTotalScore);
			let index = this.tallyTable.findIndex((el) => {
				return el.diff === this.diff;
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
		}
	},
	created() {
		this.initTallyTable();
	},
	destroyed() {
		if(this.timer) {
			clearInterval(this.timer);
		}
	}
}
</script>

<style scoped>

.app--title {
	display: flex;
	justify-content: space-between;
}
.app--tally-table {
	height: 650px;
	overflow-y: scroll;
	/* position: relative; */
}
/* .app--tally-table-title {
	position: absolute;
	top: 0;
} */
.app--tally-table-item {
	display: flex;
	justify-content: space-around;
}
.app--tally-graph-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 650px;
	position: relative;
}
.app--tally-graph-stat {
	width: 100%;
	/* display: flex;
	justify-content: space-around; */
}
.app--tally-graph {
	display: flex;
	align-items:flex-end;
	margin: 0 auto;
	width: 100%;
	border: 1px solid #555;
	border-bottom: none;
	height: 100%;
}
.app--tally-graph-bar {
	background-color: blue;
	border: 1px solid #000;
	border-bottom: none;
	position: relative;
}
.app--tally-graph-full .app--tally-graph-bar {
	width: 0.83%;
}
.app--tally-graph-simple .app--tally-graph-bar {
	width: 5%;
}
.app--tally-graph-index {
	width: 100%;
	position: absolute;
	bottom: -28px;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.app--tally-graph-index-mark {
	height: 10px;
	overflow: hidden;
}
.app-tally-game-container {
	margin-top: 3rem;
}
@media only screen and (max-width: 576px) {
	.app--title {
		flex-direction: column;
	}
	.app--team-name {
		display: none;
	}
}
</style>

