<template>
	<div class="container mt-4 mb-5">
		<h3 class="lesson-subheading">Demonstration Game</h3>
		<hr class="subheading-separator">
		<div class="row">
			<div class="col-12 col-sm-6 app--rules">
				<h3 class="text-center text-success mb-3">Dice Rules</h3>
				<div class="app--dice-rules">
					<div v-if="numberOfAnimals===2">
						<p class="text-center font-weight-bold">Giraffe 1, 2 or 3</p>
						<p class="text-center font-weight-bold">Horse 4, 5 or 6</p>
						<p>&nbsp;</p>
					</div>
					<div v-else-if="numberOfAnimals === 3">
						<p class="text-center font-weight-bold">Giraffe 1 or 2</p>
						<p class="text-center font-weight-bold">Horse 3 or 4</p>
						<p class="text-center font-weight-bold">Duck 5 or 6</p>
					</div>
					<div v-else></div>
				</div>
				<div class="form-check form-check-inline d-flex justify-content-center">
					<input
						class="form-check-input"
						type="radio"
						name="numberOfAnimals"
						:value="2"
						v-model="numberOfAnimals"
						id="2-animals"
						:disabled="stepIndex!==0"
					>
					<label for="2-animals" class="form-check-label mr-3">
						2 Animals
					</label>
					<input
						class="form-check-input"
						type="radio"
						name="numberOfAnimals"
						:value="3"
						v-model="numberOfAnimals"
						id="3-animals"
						:disabled="stepIndex!==0"
					>
					<label for="3-animals" class="form-check-label">
						3 Animals
					</label>
				</div>
				<div class="app--action mt-3">
					<div class="badge badge-danger" v-if="stepIndex===0">Change the number of animals or</div>
					<button class="btn btn-outline-success mt-1" @click="handleClick">
						{{ steps[stepIndex] }}
					</button>
				</div>
				<div class="app--dice d-flex justify-content-center mt-5" v-if="diceNumber>0">
					<app-dice :number="diceNumber" :index="0"></app-dice>
				</div>
			</div>
			<div class="col-12 col-sm-6 app--picture">
				<h4 class="app--picture-name font-weight-bold">
					{{ animalDrawn[0] ? animalDrawn[0].name+'-' : ''}}{{ animalDrawn[1] ? animalDrawn[1].name+'-' : ''}}{{ animalDrawn[2] ? animalDrawn[2].name : ''}}
				</h4>
				<app-animal-picture :animalDrawn="animalDrawn"></app-animal-picture>
			</div>
		</div>
	</div>
</template>

<script>
import { throwDiceOnce } from './utils';
import duckBody from '@/assets/duck-body.jpg';
import duckHead from '@/assets/duck-head.jpg';
import duckLeg from '@/assets/duck-leg.jpg';
import giraffeBody from '@/assets/giraffe-body.jpg';
import giraffeHead from '@/assets/giraffe-head.jpg';
import giraffeLeg from '@/assets/giraffe-leg.jpg';
import horseBody from '@/assets/horse-body.jpg';
import horseHead from '@/assets/horse-head.jpg';
import horseLeg from '@/assets/horse-leg.jpg';

import AnimalPicture from './AnimalPicture.vue';
import Dice from './Dice.vue';
export default {
	components: {
		appAnimalPicture: AnimalPicture,
		appDice: Dice
	},
	data: function() {
		return {
			numberOfAnimals: 3,
			status: 0,
			diceNumber: 0,
			animals: {
				giraffe: {	// Giraffe
					head: { name:'Gir', src: giraffeHead },
					body: { name:'a', src: giraffeBody },
					leg: { name:'ffe', src: giraffeLeg },
				},
				horse: {	// horse
					head: { name:'H', src: horseHead },
					body: { name:'or', src: horseBody },
					leg: { name:'se', src: horseLeg },
				},
				duck: {	// duck
					head: { name:'D', src: duckHead },
					body: { name:'u', src: duckBody },
					leg: { name:'ck', src: duckLeg },
				}
			},
			steps: [
				"Throw dice for the animal head",
				"Draw the head",
				"Throw dice for the animal body",
				"Draw the body",
				"Throw dice for the animal legs",
				"Draw the legs",
				"Reset"
			],
			stepIndex: 0,
			animalDrawn: []
		}
	},
	computed: {
		rules() {
			if(this.numberOfAnimals === 2) {
				return [
					this.animals.giraffe,
					this.animals.giraffe,
					this.animals.giraffe,
					this.animals.horse,
					this.animals.horse,
					this.animals.horse,
				];
			} else if(this.numberOfAnimals === 3) {
				return [
					this.animals.giraffe,
					this.animals.giraffe,
					this.animals.horse,
					this.animals.horse,
					this.animals.duck,
					this.animals.duck
				];
			} else {
				return [];
			}
		},
		partDrawn() {
			switch(this.stepIndex) {
				case 1:
					return 'head';
				case 3:
					return 'body';
				case 5:
					return 'leg';
				default:
					return null;
			}
		}
	},
	methods: {
		handleClick() {
			if(this.stepIndex === 6) {
				this.animalDrawn = [];
				this.stepIndex = 0;
				this.diceNumber = 0;	// Reset the game
			} else {
				if(this.stepIndex%2 === 0) {
					this.diceNumber = throwDiceOnce();	// Throw dice
				} else {
					this.animalDrawn.push(this.rules[this.diceNumber-1][this.partDrawn]);	// Draw a part of the animal
				}
				this.stepIndex++;
			}
		}
	}
}
</script>

<style scoped>
.app--action {
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
