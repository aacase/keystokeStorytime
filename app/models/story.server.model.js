'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Story Schema
 */
var StorySchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Story name',
		trim: true
	},
	firstName: {
		type: String,
		default: '',
		required: 'Please fill in your first name',
		trim: true
	},
	dog: {
		type: String,
		default: '',
		required: 'Please fill a dog name',
		trim: true
	},
	superHero: {
		type: String,
		default: '',
		required: 'Please fill in a superhero name',
		trim: true
	},
	continent: {
		type: String,
		default: '',
		required: 'Please Pick a continent',
		trim: true
	},
	content: {
		type: String,
		default:'',
		trim: true
	},
	content2:{
		type:String,
		default: '',
		trim: true
	},
	content3:{
		type:String,
		default: '',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Story', StorySchema);