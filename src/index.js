import DisplayComponent from './display.vue';
import { useStores } from '@directus/extensions-sdk';

export default {
	id: 'directus-display-count-sum',
	name: 'Count or Sum Column',
	icon: '123',
	description: 'Count the related records or display the sum of the select column',
	component: DisplayComponent,
	options: ({ editing, relations }) => {
		const relatedCollection = relations.o2m?.meta.junction_field != null?relations.m2o?.related_collection:relations.o2m?.collection;
		const junction_table = relations.o2m?.meta.junction_field != null?relations.o2m?.collection:null;
		const { useFieldsStore } = useStores();
		const fieldsStore = useFieldsStore();
		if(editing === '+'){
			var displayTemplateMeta = {
				interface: 'presentation-notice',
				options: {
					text: 'Please complete the field before attempting to configure the display.',
				},
				width: 'full',
		  	};
		} else {
			var fields = fieldsStore.getFieldsForCollection(relatedCollection);
			var field_choices = [];
			fields.forEach(field => {
				field_choices.push({
					text: field.meta.field,
					value: junction_table?`${relations.o2m.meta.junction_field}.${field.meta.field}`:field.meta.field,
				});
			});
			var displayTemplateMeta = {
				interface: 'select-dropdown',
				options: {
					choices: field_choices,
				},
				width: 'full',
			};
		}

		return [
			{
				field: 'column',
				name: 'Choose a column',
				meta: displayTemplateMeta,
			},
			{
				field: 'sum',
				type: 'boolean',
				name: 'Calulate Sum',
				meta: {
					interface: 'boolean',
					options: {
						label: 'Yes',
					},
					width: 'half',
				},
			},
			{
				field: 'prefix',
				type: 'string',
				name: 'Prefix',
				meta: {
					interface: 'input',
					options: {
						font: 'monospace',
					},
					width: 'half',
				},
			},
			{
				field: 'suffix',
				type: 'string',
				name: 'Suffix',
				meta: {
					interface: 'input',
					options: {
						font: 'monospace',
					},
					width: 'half',
				},
			},
		];
	},
	types: ['alias', 'string', 'uuid', 'integer', 'bigInteger', 'json'],
	localTypes: ['m2m', 'm2o', 'o2m', 'translations', 'm2a', 'file', 'files'],
	fields: (options) => {
		return [options.column];
	},
};
