<template>
	<div class="container mt-4 mb-5">
		<h4 class="text text-success text-center mb-4">
			{{ numberOfScoops }} scoops, {{ numberOfFlavours }} flavours,
			{{ allowRepeat ? "" : "no"}} repeats allowed
		</h4>
		<div class="row">
			<div class="col-12 col-md-8 mb-4">
				<div class="app--ice-cream">
					<div class="app--ice-cream-flavours">

					<div class="app--img-flavours">
						<div
							class="mb-3"
							v-for="(flavour, index) in flavoursAvailable"
							:key="index">
							<span class="badge badge-danger">{{ flavour.imgIndex }} </span>
							<img
								:src="flavour.imgSrc"
								:data-imgIndex="flavour.imgIndex"
								:data-index="flavour.index"
								class="ml-2"
								@click="handleSelectFlavour"
							>
						</div>
						<button class="btn btn-outline-secondary mt-2" @click="handleClear">Clear</button>
					</div>

					<div class="app-img-cup">
						<div
							v-for="(flavour, index) in flavoursSelected"
							:key="index"
							:style="{zIndex: 100-index*10, transform: 'translateY(' + (35-index*6) + '%)' } "   >
							<img class="mr-1"
								:src="flavour.imgSrc"
							/>
							<span class="badge badge-danger">{{ flavour.imgIndex }}</span>
						</div>

						<img src="@/assets/cup.jpg" width="82" />
					</div>

				</div>
				<div class="app--ice-cream-combination">
					<div
						class="text text-danger"
						v-if="iceCreamExist">
						This ice cream has already been made
					</div>
					<div class="app--ice-cream-combination-record">
						<p><span class="badge badge-danger">{{combinationsList.length}}</span>&nbsp;recorded</p>
						<p class="text text-success" v-if="iceCreamAllFound" >All ice creams are found. Please explain.</p>
					</div>
						<ul class="list-group">
							<li class="list-group-item"
								v-for="(combination, index) in combinationsList"
								:key="index">
								{{ combination }}
							</li>
						</ul>
					</div>
				</div>
				<div class="app--action mt-3 mb-3">
					<button
						class="btn btn-outline-success btn-lg mb-3"
						v-if="demoAutoOption==='0'"
						@click="handleNext"
					>
						Show next ice cream
					</button>
					<button
						class="btn btn-outline-success btn-lg mb-3"
						v-if="demoAutoOption==='1'"
						@click="handleToggleTimer"
					>
					{{ timer ? "Pause" : "Start" }}
					</button>
					<div>
						<div class="form-check form-check-inline">
							<input type="radio" name="demoAutoOption" value="0" class="form-check-input" id="radio-demo" v-model="demoAutoOption">
							<label for="radio-demo" class="form-check-label">Demo</label>
							<input type="radio" name="demoAutoOption" value="1" class="ml-2 form-check-input" id="radio-auto" v-model="demoAutoOption">
							<label for="radio-auto" class="form-check-label">Auto</label>
						</div>
					</div>
				</div>
			</div>

			<div class="col-12 col-md-4 app--ice-cream-number">
				<h6 class="text text-success">Enter the number of possible flavours</h6>
				<div v-for="(num, index) in numberOfPossibleFlavours" :key="index"
					class="form-group row">
					<div class="col-10 col-md-8">
						<input
							type="number"
							class="form-control"
							v-model="numberOfPossibleFlavoursInput[index]"
							:disabled="answerSaw ||
								(numberOfPossibleFlavoursInputCheck[index] &&
								numberOfPossibleFlavours[index] == numberOfPossibleFlavoursInput[index])"
								@focus="() => {
									numberOfPossibleFlavoursInputCheck = numberOfPossibleFlavoursInputCheck.map((el, idx) => {
										if(idx == index) {
											return false;
										} else {
											return el;
										}
									})
								}">
					</div>
					<div class="col-2 col-md-4" style="display: flex; align-items: center">
						<i
							class="fas fa-check text-success"
							v-if="!answerSaw && numberOfPossibleFlavoursInputCheck[index] &&
								numberOfPossibleFlavoursInput[index] &&
								numberOfPossibleFlavours[index] == numberOfPossibleFlavoursInput[index]" ></i>
						<i
							class="fas fa-times text-danger"
							v-if="!answerSaw && numberOfPossibleFlavoursInputCheck[index] &&
								numberOfPossibleFlavoursInput[index] &&
								numberOfPossibleFlavours[index] != numberOfPossibleFlavoursInput[index]" ></i>
					</div>
				</div>
				<div class="row">
					<div class="col-10 col-md-8 text-center">
						<img src="@/assets/cup.jpg" />
					</div>
				</div>
				<div class="row mt-3">
					<h6 class="text text-success">
						Calculate the number of possible ice creams
					</h6>
					<div class="col-10 col-md-8">
						<input
							type="number"
							class="form-control"
							v-model="totalNumberOfIceCreamInput"
							:disabled="answerSaw || (totalNumberOfIceCreamInputCheck && totalNumberOfIceCream == totalNumberOfIceCreamInput)"
							@focus="() => { totalNumberOfIceCreamInputCheck = false; }">
					</div>

					<div class="col-2 col-md-4" style="display: flex; align-items: center">
						<i
							class="fas fa-check text-success"
							v-if="!answerSaw && totalNumberOfIceCreamInputCheck &&
								totalNumberOfIceCreamInput &&
								totalNumberOfIceCream == totalNumberOfIceCreamInput"
						></i>
						<i
							class="fas fa-times text-danger"
							v-if="!answerSaw && totalNumberOfIceCreamInputCheck &&
								totalNumberOfIceCreamInput &&
								totalNumberOfIceCream != totalNumberOfIceCreamInput"
						></i>
					</div>
					<div class="col-12 text-center mt-3" style="display: flex; justify-content: space-around">
						<button
							class="btn btn-outline-success"
							@click="handleCheckInput"
							:disabled="answerSaw">Check</button>
						<button
							class="btn btn-outline-danger"
							@click="handleSeeAnswer"
							:disabled="answerSaw">Answer</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getLetterIndex } from './utils';
import Combinatorics from 'js-combinatorics';
export default {
	props: ['numberOfFlavours', 'numberOfScoops', 'allowRepeat'],
	data: function() {
		return {
			flavoursAvailable: [],	// All available flavours array
			flavoursSelected: [],		// Flavours selected array
			iceCreamMade: [],		// Made ice cream array
			combinationsList: [],		// All combinations made array
			totalNumberOfIceCream: 0,	// Total number of ice creams
			totalNumberOfIceCreamInput: null,		// User's input for total number of ice creams
			totalNumberOfIceCreamInputCheck: false,  // If user's input for total number of ice creams is checked.
			numberOfPossibleFlavours: [],	// Number of each flavour
			numberOfPossibleFlavoursInput: [],	// User's input for the number of each flavour
			numberOfPossibleFlavoursInputCheck: [],	// If user's input for the number of each flavour is checked
			answerSaw: false,		// If answer is displayed
			iceCreamAllFound: false,		// If all combinations are found
			iceCreamExist: false,	// If one ice cream(combination) already exists
			foundOne: false,		// Right after an ice cream is found, set it to true, when clicking clear, set it to false
			demoAutoOption: "0",		// demoAutOption = "0" - Demo, demoAutoOption = "1" - Auto
			combinationCtr: null,		// A combination creator generated by Combinatorics
			timer: null
		}
	},
	watch: {
		demoAutoOption(value) {
			if(value === "0") {
				clearInterval(this.timer);
				this.timer = null;
			}
		}
	},
	methods: {
		createFlavourObj(index) {	// index is starting from 1
			return {
				img: `flavour-${index}.jpg`,
				index,
				imgIndex: getLetterIndex(index),
				imgSrc: require(`../../../assets/flavour-${index}.jpg`)
			}
		},
		setFlavoursAvailable() {
			this.flavoursAvailable.splice(0, this.flavoursAvailable.length);
			for(let i = 1; i <= Number(this.numberOfFlavours); i++) {
				const flavourObj = this.createFlavourObj(i);
				this.flavoursAvailable.push(flavourObj);
			}
		},
		setFlavoursSelected() {
			for(let i = this.flavoursSelected.length-1, k=0; i>=0; i--, k++) {
				this.flavoursSelected[i].zIndex = k*10;
				this.flavoursSelected[i].transformY = k*15 + 5;	// Calculate each image's z-index and transformY property
			}
		},
		setNumberOfPossibleFlavours() {	// Calculate the number of possibility for each flavour
			this.numberOfPossibleFlavours.splice(0, this.numberOfPossibleFlavours.length);
			let possibleNum = Number(this.numberOfFlavours);
			if( this.allowRepeat ) {
				for(let i = 1; i <= Number(this.numberOfScoops); i++) {
					this.numberOfPossibleFlavours.unshift(possibleNum);
				}
			} else {
				for(let i = 1; i <= Number(this.numberOfScoops); i++) {
					if(possibleNum <= 0) {
						this.numberOfPossibleFlavours.unshift(0);
					} else {
						this.numberOfPossibleFlavours.unshift(possibleNum);
						possibleNum--;
					}
				}
			}
		},
		setTotalNumberOfIceCream() {	// Calculate the total number of possibilities
			let totalNumber = 1;
			if(this.numberOfPossibleFlavours || this.numberOfPossibleFlavours.length === 0) {
				this.totalNumberOfIceCream = 1;
			}
			for(let i=0; i<this.numberOfPossibleFlavours.length; i++) {
				if(this.numberOfPossibleFlavours[i] > 0) {
					totalNumber *= this.numberOfPossibleFlavours[i];
				}
			}
			this.totalNumberOfIceCream = totalNumber;
		},
		setNumberOfPossibleFlavoursInputCheck(index = -1) {	// Check users input
			this.numberOfPossibleFlavoursInputCheck.splice(0, this.numberOfPossibleFlavoursInputCheck.length);
			for(let i=0; i<this.numberOfPossibleFlavours.length; i++) {
				if(this.numberOfPossibleFlavoursInput[i] && i !== index) {
					this.numberOfPossibleFlavoursInputCheck[i] = true;
				} else {
					this.numberOfPossibleFlavoursInputCheck[i] = false;
				}
			}
		},
		getCurrentCombination(flavoursSelected) {	// Get the current combination
			const combination = [];
			for(let flavour of flavoursSelected) {
				combination.push(flavour.imgIndex);
			}
			return combination.join();
		},
		setCombinationsList(flavoursSelected) {		// Add a combination to combinations list
			const combinationStr = this.getCurrentCombination(flavoursSelected);
			this.combinationsList = [...this.combinationsList, combinationStr ];
		},
		handleCheckInput() {
			this.setNumberOfPossibleFlavoursInputCheck();
			this.totalNumberOfIceCreamInputCheck = true;
		},
		handleSeeAnswer() {
			this.numberOfPossibleFlavoursInput = this.numberOfPossibleFlavours;
			this.totalNumberOfIceCreamInput = this.totalNumberOfIceCream;
			this.answerSaw = true;
		},

		handleSelectFlavour(e) {
			if(this.iceCreamAllFound) return;
			if(this.foundOne) return;
			const imgIndex = e.target.getAttribute('data-imgIndex');
			const index =Number(e.target.getAttribute('data-index'));

			if(!this.allowRepeat) {
				this.flavoursAvailable = this.flavoursAvailable.filter((flavour) => {
					return flavour.imgIndex !== imgIndex;
				});
			}

			this.flavoursSelected.unshift( this.createFlavourObj(index) );
			this.setFlavoursSelected();

			if(this.flavoursAvailable.length === 0 || this.flavoursSelected.length === Number(this.numberOfScoops)) {
				this.foundOne = true;
				const combination = this.getCurrentCombination(this.flavoursSelected);
				if(this.combinationsList.indexOf(combination) !== -1) {	// Check if the combination exists
					this.iceCreamExist = true;
					return;
				}
				this.iceCreamExist = false;
				this.setCombinationsList(this.flavoursSelected);
			}

			if(this.totalNumberOfIceCream === this.combinationsList.length) {
				this.iceCreamAllFound = true;
			}
		},

		handleClear() {
			this.iceCreamExist = false;
			this.foundOne = false;
			this.setFlavoursAvailable();
			if(this.flavoursSelected) {
				this.flavoursSelected.splice(0, this.flavoursSelected.length);
			}
		},

		setNextFlavours() {
			let nextFlavoursSelected, nextCombination;
			do {
				nextFlavoursSelected = this.combinationCtr.next();
				if(!nextFlavoursSelected) break;	// 如果到达最后一个元素，则停止
				// 如果还有接下来的元素 则先检查是否已经在combinationsList里
				nextCombination = this.getCurrentCombination(nextFlavoursSelected);
			} while(nextFlavoursSelected && this.combinationsList.indexOf(nextCombination) !== -1 )

			if(nextFlavoursSelected) {
				nextFlavoursSelected.forEach((value, index) => {
					this.flavoursSelected[index] = value;
				});
				// this.flavoursSelected = nextFlavoursSelected;
				this.setFlavoursSelected();
				this.setCombinationsList(this.flavoursSelected);
				this.foundOne = true;
			} else {
				this.iceCreamAllFound = true;
			}
		},

		handleNext() {
			if(this.iceCreamAllFound) return;
			// console.log(this.flavoursAvailable, this.numberOfScoops, this.allowRepeat);
			// console.log(this.combinationsList);
			// console.log(iceCream);
			// this.setFlavoursAvailable();
			this.handleClear();
			this.setNextFlavours();
		},
		handleToggleTimer() {
			this.setFlavoursAvailable();
			if(this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			} else {
				this.timer = setInterval(this.setNextFlavours, 700);
			}
		}

	},
	created() {
		this.setFlavoursAvailable();
		this.setNumberOfPossibleFlavours();
		this.setTotalNumberOfIceCream();
		this.setNumberOfPossibleFlavoursInputCheck();
		if(this.allowRepeat) {
			this.combinationCtr = Combinatorics.baseN(this.flavoursAvailable, this.numberOfScoops);
		} else if (this.numberOfScoops > this.numberOfFlavours) {
			this.combinationCtr = Combinatorics.permutation(this.flavoursAvailable);
		} else {
			this.combinationCtr = Combinatorics.permutation(this.flavoursAvailable, this.numberOfScoops);
		}
	}
}
</script>

<style scoped>
.app--ice-cream-flavours {
	flex: 1;
	display: flex;
	justify-content: space-between;
	position: relative;
	height: 600px;
}
.app--ice-cream-flavours img {
	cursor: pointer;
}
.app--ice-cream-flavours button {
	position: absolute;
	bottom: 0;
	left: 8%;
}

.app--ice-cream-combination {
	flex: 1;
}
/* .app--ice-cream-combination-record {
} */
.app--ice-cream-combination ul {
	height: auto !important;
	max-height: 600px;
	overflow-y: scroll;
}
.app--ice-cream {
	display: flex;
}
.app-img-cup {
	position: absolute;
	right: 15px;
	bottom: 0;
	display: flex;
	flex-direction: column;
}

/* .app--ice-cream-number {
} */

@media only screen and (max-width: 992px) {
	.app--ice-cream-flavours {
		flex: 2
	}
}

@media only screen and (max-width: 576px) {
	.app--ice-cream {
		padding: 0;
	}
	.app--ice-cream-flavours {
		height: 500px;
	}
	.app--img-flavours img {
		width: 50%;
		height: auto;
	}
	.app-img-cup {
		transform: translateX(20%);
	}
	.app-img-cup img {
		width: 50%;
		height: auto;
	}
	.list-group-item {
		padding-left: 5px;
	}
}
</style>
