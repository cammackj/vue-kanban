var models = require('../config/constants').models
let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId
let Comments = require('./comment')

var schema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String },
	created: { type: Number, default: Date.now() },
	// Relations
	creatorId: { type: ObjectId, ref: models.user.name, required: true },
	boardId: { type: ObjectId, ref: models.board, required: true },
	listId: { type: ObjectId, ref: models.list, required: true },
	index: { type: Number, required: true }
});

schema.pre('remove', next => {
	Comments.remove({ taskId: this._id }).exec();
	next();
})

module.exports = mongoose.model(models.task.name, schema);