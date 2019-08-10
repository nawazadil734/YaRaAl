const mongooose = require('mongoose');
const { Schema } = mongooose;

const DownvoteSchema = new Schema({
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

const Downvotes = mongooose.model('like', DownvoteSchema);

module.exports = Downvotes;