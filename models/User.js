const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    googleId: String,
    facebookId: String,
    linkedinId: String,
    email: String,
    profilePhoto: String,
    website: String,
    uploadPhoto: String,
    password: String,
    bio: String,
    commnunity: [{
        type: Schema.Types.ObjectId,
        ref: 'community'
    }],
    saved: [{
        type: Schema.Types.ObjectId,
        ref: 'saved'
    }],
    notification: [{
        type: Schema.Types.ObjectId,
        ref: 'notification'
    }],
    post: [{
        type: Schema.Types.ObjectId,
        ref: 'blogPost'
    }],
    joinedDate: String,
    follower: Number,
    following: Number,
    credential: String,
    location: String,
    work: String,
    education: String
});

mongoose.model('users', userSchema);

module.exports = userSchema;