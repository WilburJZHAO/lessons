<template>
	<div class="container mt-4 mb-5">
		<h3 class="text-success text-center">
			Which arrangement is the best?<br>
			<span v-if="numberOfGames != 1" class="small">{{ numberOfGames }} trials</span>
		</h3>
		<p class="text-dark text-center">
			{{ gameRule.boxes }} counters {{ gameRule.boxes }} boxes
		</p>
		<div class="app--arrangement-box">
			<div class="app--counters">
				<div v-for="index in Number(gameRule.boxes)" :key="index">
					<app-counter :counter="index" ref="countersRef"></app-counter>
				</div>
			</div>
			<div class="app--boxes">
				<div v-for="index in Number(gameRule.boxes)" :key="index">
					<app-counter-box :boxName="boxNames[index-1]"></app-counter-box>
				</div>
			</div>
			<div class="text-danger text-center" v-if="!isSet">Drag the counters into the boxes</div>
		</div>
		<div class="app--rules">
			<h5 class="text-success" v-if="sortedArrangement.length > 0">Arrangement: {{ sortedArrangement.join('') }}</h5>
			<h5 class="text-success">Remove a counter above if the roll is:</h5>
			<div class="app--rules-boxes">
				<div v-for="(rule, index) in ruleArray" :key="index">
					<app-rule-box :ruleNumber="rule.join(', ')"></app-rule-box>
				</div>
			</div>
		</div>
		<div class="app--game-stat mt-3 row">
			<div class="app--game-stat-data col-sm-8">
				<table class="table table-bordered" style="table-layout: fixed">
					<tr>
						<th>Game {{ gameCounts > 0 ? gameCounts : '' }}</th>
						<td v-if="numberOfGames == 1">{{ rollCounts > 0 ?
								rollCounts +' roll' + (rollCounts===1 ? '' : 's') :
								''}}</td>
						<td v-else>{{ tempRollCounts > 0 ? tempRollCounts + ' rolls' : ''}}</td>
					</tr>
					<tr>
						<th>Average</th>
						<td>{{ averageRollCounts > 0 ? averageRollCounts.toFixed(2) : ''}}</td>
					</tr>
				</table>
			</div>
			<div class="app--game-dice col-sm-4">
				<div class="badge badge-info">
					{{ gameRule.diceFaces }}-face dice
				</div>
				<div v-if="diceNumber > 0 && numberOfGames == 1" class="mt-3">
					<app-dice :diceNumber="diceNumber"></app-dice>
				</div>
			</div>
		</div>
		<div class="app-action mt-3">
			<button
				class="btn btn-outline-success"
				:disabled="!isSet"
				v-if="!isStart"
				@click="handleStart">
				Start game
			</button>
			<button
				class="btn btn-outline-success"
				v-if="isStart && !isEnd && numberOfGames == 1 && demoAutoOption === '0'"
				@click="handlePlayOnce"
			>
				{{rollDiceMessage}}
			</button>
			<button
				class="btn btn-outline-success"
				v-if="numberOfGames > 1 && isStart && !isEnd && demoAutoOption === '0'"
				@click="handlePlayOneGame"
			>
				Play one game
			</button>
			<button
				class="btn btn-outline-success"
				v-if="isStart && isSet && !isEnd && demoAutoOption === '1'"
				@click="handleToggleTimer"
			>
				{{ timer ? "Pause" : "Resume" }}
			</button>
			<button
				class="btn btn-outline-dark"
				v-if="numberOfGames > 1 && isEnd"
				@click="handleReset"
			>
				Reset
			</button>
			<app-demo-auto-option
				class="mt-1"
				@changeOption="demoAutoOption=$event"
				v-if="isSet"
				:option = "demoAutoOption">
			</app-demo-auto-option>
		</div>
	</div>
</template>

<script>
import interact from 'interactjs';
import Counter from './Counter.vue';
import CounterBox from './CounterBox.vue';
import RuleBox from './RuleBox.vue';
import DemoAutoOption from './DemoAutoOption.vue';
import Dice from './Dice.vue';
import { sortArray, throwDice } from './utils';
import { calculateTimerInterval } from "../../common/utils";

export default {
	components: {
		appCounter: Counter,
		appCounterBox: CounterBox,
		appRuleBox: RuleBox,
		appDemoAutoOption: DemoAutoOption,
		appDice: Dice
	},
	props: ['gameRule', 'numberOfGames'],
	data: function() {
		return {
			boxNames: ['A', 'B', 'C', 'D', 'E'],
			canDropHere: false,
			arrangement: [],
			arrangementWatch: [],
			isSet: false,		// If arrangement is set
			isStart: false,		// If the lesson started running
			isEnd: false,		// If the lesson ends
			isAutoStart: false,		// If auto running started
			demoAutoOption: "0",	// 0 - demo, 1 - auto
			timer: null,
			counterToMove: null,	// The current counter selected
			isSameCounter: false,	// If the current counter selected is the same as the previous one
			diceNumber: null,	// dice number
			gameCounts: 0,		// How many games are played
			rollCounts: 0,		// How many rolls are played in one game
			tempRollCounts: 0,
			totalRollCounts: 0,		//  How many rolls are played in total
			averageRollCounts: 0,  // Average roll counts in many games
			isOneGameEnd: false,		// If one game ends,

			rollDiceMessage: "Roll dice",
		}
	},
	computed: {
		ruleArray() {
			const ruleArray = [];
			for(let key in this.gameRule.rule) {
				ruleArray.push(this.gameRule.rule[key]);
			}
			return ruleArray;
		},
		sortedArrangement() {
			return sortArray(this.arrangement);
		},
		timerInterval() {
			return calculateTimerInterval(this.numberOfGames);
		}
	},
	watch: {
		sortedArrangement(value) {
			if(value.length === Number(this.gameRule.boxes)) {
				this.isSet = true;
			} else {
				this.isSet = false;
			}
		},
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
		setDraggable() {
			interact('.app--one-counter').draggable({
				inertia: false,
				modifiers: [	// keep the element within the area of its parent
					interact.modifiers.restrict({
						restriction: '.app--arrangement-box',
						endOnly: true
					})
				],
				autoScroll: true,
				onstart: this.handleOnDragStart,
				onmove: this.handleOnDragMove,
				onend: this.handleOnDragEnd
			});
		},
		unsetDraggable() {
			interact('.app--one-counter').unset();
		},
		handleOnDragStart(e) {
			// console.log('drag start', e.target.textContent);
			// e.target.style.webkitTransform =
			// e.target.style.transform =
			// 		'translate(0, 0)';
			// e.target.removeAttribute('data-x');
			// e.target.removeAttribute('data-y');
			if(e.target.textContent === this.counterToMove) {
				this.isSameCounter = true;
			} else {
				this.isSameCounter = false;
			}
			this.counterToMove = e.target.textContent;
			// e.target.style.webkitTransform =
			// e.target.style.transform =
			// 		'translate(0, 0)';
			// e.target.removeAttribute('data-x');
			// e.target.removeAttribute('data-y');
			e.target.classList.add('app--counter-selected');
		},
		handleOnDragMove(e) {
			var target = e.target;
			// keep the dragged position in the data-x/data-y attributes
			var x = (parseFloat(target.getAttribute('data-x')) || 0) + e.dx;
			var y = (parseFloat(target.getAttribute('data-y')) || 0) + e.dy;
			// console.log(e.dx, ':' ,e.dy);
			// translate the element
			target.style.webkitTransform =
				target.style.transform =
					'translate(' + x + 'px, ' + y + 'px)'
				// update the posiion attributes
			target.setAttribute('data-x', x);
			target.setAttribute('data-y', y);
		},
		handleOnDragEnd(e) {
			// console.log('drag end');
			e.target.classList.remove('app--counter-selected');
			if(!this.canDropHere) {		// counter 回到原位
				e.target.style.webkitTransform =
				e.target.style.transform =
						'translate(0, 0)';
				e.target.removeAttribute('data-x');
				e.target.removeAttribute('data-y');
				// console.log(e.relatedTarget);	// null
				if(this.counterToMove) {
					this.arrangement[this.counterToMove-1] = null;
				}
				this.arrangement = [...this.arrangement];
				this.arrangementWatch = [...this.arrangement];
			} else {	// counter 落在box中
				// console.log(e.relatedTarget);
				this.arrangement[this.counterToMove-1] = e.relatedTarget.textContent;
				this.arrangement = [...this.arrangement];
				this.arrangementWatch = [...this.arrangement];
			}
		},
		setDropzone() {
			interact('.app--one-counter-box').dropzone({
				accept: '.app--counter-selected',
				overlap: 0.8,
				ondropactivate: this.handleOnDropActivate,
				ondragenter: this.handleOnDragEnter,
				ondragleave: this.handleOnDragLeave,
				ondrop: this.handleOnDrop,
				ondropdeactivate: this.handleOndropdeactivate
			})
		},
		unsetDropzone() {
			interact('.app--one-counter-box').unset();
		},
		handleOnDropActivate(e) {
			// console.log('drop activate');
		},
		handleOnDragEnter(e) {
			// console.log('drag enter', e.target.textContent);
			this.canDropHere = true;
			// if(this.isSameCounter) {
			// 	this.removeCounterFromArrangement(e.target.textContent);
			// }
		},
		handleOnDragLeave(e) {
			// console.log('drag leave', e.target.textContent);
			this.canDropHere = false;
			// this.canSetArrangement = false;
			// this.removeCounterFromArrangement(e.target.textContent);
		},
		handleOnDrop(e) {
			// console.log('drop');
			this.canDropHere = false;
			// let
			// 	selectedCounter = e.relatedTarget.textContent,
			// 	targetBox = e.target.textContent;
			// 	console.log(e.target.textContent, e.relatedTarget.textContent);
				// this.removeCounterFromArrangement(targetBox);
				// this.addCounterToArrangement(targetBox);
		},
		handleOnDropdeactivate(e) {
			// console.log('drop deactivate');
		},
		handleStart() {
			this.isStart = true;
			this.unsetDraggable();
			this.unsetDropzone();
			// this.setOriginalPosition();
			if(this.numberOfGames == 1) {
				this.gameCounts++;
			}
			if(this.demoAutoOption === '1') {	// 'Demo' option
				// this.handlePlayOnce();
				this.handleToggleTimer();
			}
		},

		handlePlayOnce() {
			// console.log(this.$refs.counterItem);
			let indexToRemove;
			if(!this.isStart) this.isStart = true;
			this.checkOneGameEnd();
			if(this.isOneGameEnd) {
				this.startNewGame();
				//this.rollDiceMessage = 'Roll dice';
			} else {
				this.rollDice();
				indexToRemove = this.checkRemoveCounter();
				if(indexToRemove !== -1) {
					this.handleRemoveCounter(indexToRemove);
				}
			}
			if (this.checkOneGameEnd()) {
				this.rollDiceMessage = 'Next game';
			}
			else {
				this.rollDiceMessage = 'Roll dice';
			}

		},
		handlePlayOneGame() {
			let indexToRemove;
			if(!this.isStart) this.isStart = true;
			while(true) {
				this.checkOneGameEnd();
				if(this.isOneGameEnd) {
					// console.log(this.rollCounts);
					this.startNewGame();
					break;
				}
				this.rollDice();
				indexToRemove = this.checkRemoveCounter();
				this.arrangementWatch[indexToRemove] = null;
				if(this.gameCounts >= this.numberOfGames) {
					this.isEnd = true;
					break;
				}
			}
		},
		rollDice() {	// Roll a dice
			this.diceNumber = throwDice(this.gameRule.diceFaces);
			this.rollCounts++;
		},
		checkRemoveCounter() {	// Check if the counter can be removed, return the boxName where a counter should be removed
			let removedBox, counterIndexToRemove;
			for(let key in this.gameRule.rule) {
				if(this.gameRule.rule[key].indexOf(this.diceNumber) !== -1) {
					removedBox = this.boxNames[key-1];
					// return removedBox;
					break;
				}
			}
			return this.arrangementWatch.indexOf(removedBox);
		},
		handleRemoveCounter(index) {	// Remove the counter of index and put it to its original position
			if(index > -1) {
				// console.log(index);
				this.arrangementWatch[index] = null;
				// console.log(this.$refs.countersRef[index]);
				this.$refs.countersRef[index].$el.setAttribute('style', 'transform: translate(0, 0)');
			}
		},
		checkOneGameEnd() {
			const filteredArrangement = this.arrangementWatch.filter((item) => {
				return item !== null;
			});
			if(filteredArrangement.length === 0) {
				this.isOneGameEnd = true;
				return true;
			} else {
				this.isOneGameEnd = false;
				return false;
			}
		},
		startNewGame() {
			this.tempRollCounts = this.rollCounts;
			this.totalRollCounts += this.rollCounts;
			this.averageRollCounts = this.totalRollCounts / (this.numberOfGames == 1 ? this.gameCounts : this.gameCounts+1 );
			this.gameCounts++;
			this.rollCounts = 0;
			this.arrangementWatch = [...this.arrangement];
			let counters = this.$refs.countersRef;
			for(let i = 1; i <= counters.length; i++) {
				let x = counters[i-1].$el.getAttribute('data-x');
				let y = counters[i-1].$el.getAttribute('data-y');
				this.$refs.countersRef[i-1].$el.setAttribute('style', `transform: translate(${x}px, ${y}px)`);
			}
		},
		handleToggleTimer() {
			if(!this.isAutoStart) {
				this.isAutoStart = true;
			}
			if(this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			} else {
				if(this.numberOfGames == 1) {
				this.timer = setInterval(this.handlePlayOnce, 800);
				} else {
					this.timer = setInterval(this.handlePlayOneGame, this.timerInterval);
				}
			}
		},
		handleReset() {
			this.arrangement = [];
			this.arrangementWatch = [];
			this.averageRollCounts = 0;
			this.counterToMove = null;
			this.demoAutoOption = "1";
			this.diceNumber = null;
			this.gameCounts = 0;
			this.isEnd = false;
			this.isOneGameEnd = false;
			this.isSameCounter = false;
			this.isSet = false;
			this.isStart = false;
			this.rollCounts = this.tempRollCounts = this.totalRollCounts = 0;
			this.timer = null;
			let counters = this.$refs.countersRef;
			for(let i = 1; i <= counters.length; i++) {
				this.$refs.countersRef[i-1].$el.setAttribute('style', `transform: translate(0, 0)`);
				this.$refs.countersRef[i-1].$el.setAttribute('data-x', '0');
				this.$refs.countersRef[i-1].$el.setAttribute('data-y', '0');
			}
			this.setDraggable();
			this.setDropzone();
		}
	},
	created() {
		if(this.numberOfGames > 1) {
			this.demoAutoOption = '1';
		}
	},
	mounted() {
		this.setDraggable();
		this.setDropzone();
	},
	destroyed() {
		this.unsetDraggable();
		this.unsetDropzone();
	}
}
</script>

<style scoped>
.app--counters, .app--boxes, .app--rules-boxes {
	display: flex;
	justify-content: center;
}
.app-action {
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
