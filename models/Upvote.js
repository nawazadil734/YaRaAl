const mongooose = require('mongoose');
const { Schema } = mongooose;

const UpvoteSchema = new Schema({
    count: {
        type: Number,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'blogPost'
    }
});

const Upvotes = mongooose.model('like', UpvoteSchema);

module.exports = Upvotes;