const {Schema, model, Types}= require('mongoose');
const formatDate = require('../utils/helper');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: date => formatDate(date)
    },
});

const thoughtSchema = new Schema (
    {
        throughText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: date => formatDate(date)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);


thoughtSchema.virtual('reactionCount').get(()=> this.reactions.length);

const Thoughts = model('Thoughts', thoughtSchema);

module.exports = Thoughts;