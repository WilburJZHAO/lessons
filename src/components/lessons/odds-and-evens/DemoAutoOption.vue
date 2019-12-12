<template>
	<div>
		<div class="form-check form-check-inline">
			<input 
				type="radio" 
				name="demoAutoOption" 
				value="0" 
				class="form-check-input" 
				id="radio-demo" 
				v-model="demoAutoOption"
				@change="handleChangeOption">
			<label for="radio-demo" class="form-check-label">Demo</label>
			<input 
				type="radio" 
				name="demoAutoOption" 
				value="1" 
				class="ml-2 form-check-input" 
				id="radio-auto" 
				v-model="demoAutoOption"
				@change="handleChangeOption">
			<label for="radio-auto" class="form-check-label">Auto</label>
		</div>
	</div>
</template>

<script>
export default {
	props: ['option'],
	data: function() {
		return {
			demoAutoOption: this.option ? this.option : '0'
		}
	},
	methods: {
		handleChangeOption() {
			this.$emit('changeOption', this.demoAutoOption);
		}
	}
}
</script>

<style scoped>

</style>
