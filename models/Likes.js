const mongooose = require('mongoose');
const { Schema } = mongooose;

const LikesSchema = new Schema({
    count: {
        type: Number,
        default: 0
    },
    userliked: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'blogPost'
    },
    dateLiked: {
        type: String,
        default: months[date.getMonth()] + '  ' + date.getDate() + ' , ' + date.getFullYear() 
    },
});

const Likes = mongooose.model('like', LikesSchema);

module.exports = Likes;