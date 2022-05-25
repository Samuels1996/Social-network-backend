const {Schema, model} = require('mongoose');

const userSchema = new Schema(
    { 
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please fill a valid email address']
        },

        thoughts: [
            {type: Schema.Types.ObjectId,
            ref: 'Thoughts'}
        ],

        friends: [
            {type: Schema.Types.ObjectId,
            ref: 'Users'}
        ]
    }, 
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
);

userSchema.virtual('friendCount').get(()=> this.friends.length);

const Users = model('Users', userSchema);

module.exports = Users;