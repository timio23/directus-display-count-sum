<template>
	
	<div v-if="calculatedValue">
		{{ prefix }}{{ calculatedValue }}{{ suffix }}
	</div>
	<value-null v-else />
</template>

<script>
import { ref } from 'vue';
export default {
	props: {
		value: {
			type: Object,
			default: null,
		},
		column: {
			type: String,
			default: null,
		},
		sum: {
			type: Boolean,
			default: false,
		},
		prefix: {
			type: String,
			default: null,
		},
		suffix: {
			type: String,
			default: null,
		},
	},
	setup(props) {

		const calculatedValue = ref(0);
		
		if(props.sum){
			props.value.forEach(item => {
				let columns = props.column.split('.');
				columns.forEach(col => {
					item = item[col];
				});
				calculatedValue.value = calculatedValue.value + parseFloat(item);
			});
		} else {
			calculatedValue.value = props.value.length;
		}

		return { calculatedValue };
	},
};
</script>
