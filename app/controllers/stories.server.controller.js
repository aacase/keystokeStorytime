'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Story = mongoose.model('Story'),
	nodemailer = require('nodemailer'),

	_ = require('lodash');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'aaronnodemailer@gmail.com',
        pass: 'W%skippy1738'
    }
});

/**
 * Create a Story
 */
exports.create = function(req, res) {
	var story = new Story(req.body);
	story.user = req.user;

	story.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(story);
	var mailOptions = {
	    from: 'Aaron Case ✔ <aacase@gmail.com>', // sender address
	    to: req.user.email, // list of receivers
	    subject: 'Your Story From Keystoke Storytime!', // Subject line
	    text: story.content+" "+story.content2+ " "+story.content3, // plaintext body
	    html: "<h1>Here's that kickass story you made on Keystoke Storytime!</h1>\
	    <p>"+story.content+"</p>\
	    <p>"+story.content2+"</p>\
	    <p>"+story.content3+"</p>"// html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        console.log(error);
	    }else{
	        console.log('Message sent: ' + info.response);
	    }
	});
		}
	});

};

/**
 * Show the current Story
 */
exports.read = function(req, res) {
	res.jsonp(req.story);
};

/**
 * Update a Story
 */
exports.update = function(req, res) {
	var story = req.story ;

	story = _.extend(story , req.body);

	story.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(story);
		}
	});
};

/**
 * Delete an Story
 */
exports.delete = function(req, res) {
	var story = req.story ;

	story.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(story);
		}
	});
};

/**
 * List of Stories
 */
exports.list = function(req, res) { Story.find().sort('-created').populate('user', 'displayName').exec(function(err, stories) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(stories);
		}
	});
};

/**
 * Story middleware
 */
exports.storyByID = function(req, res, next, id) { Story.findById(id).populate('user', 'displayName').exec(function(err, story) {
		if (err) return next(err);
		if (! story) return next(new Error('Failed to load Story ' + id));
		req.story = story ;
		next();
	});
};

/**
 * Story authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.story.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};