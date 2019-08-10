const mongoose = require('mongoose');
const { Schema } = mongoose; 

const BlogPostSchema = new Schema({
    title: String,
    content: {
        type: Schema.Types.ObjectId,
        ref: 'content'
    },
    upvote: {
        type: Schema.Types.ObjectId,
        ref:'upvote'
    },
    downvote: {
        type: Schema.Types.ObjectId,
        ref:'downvote'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref:'user'
    },
    link: {
        url: String
    },
    dateCreated: Date,
    videoURL: String,
    community: {
        type: Schema.Types.ObjectId,
        ref: 'community'
    }
});

const BlogPost = mongoose.model('blogPost', BlogPostSchema);

module.exports = BlogPost;