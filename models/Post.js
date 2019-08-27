const mongoose = require('mongoose');
const { Schema } = mongoose; 
const date = new Date();
const months = ["January", "Feburary", "March","April", "May", "June", "July", "August", "September", "Octuber", "November", "December"];
const BlogPostSchema = new Schema({
    title: String,
    content: String,
    likes: [{
        type: Schema.Types.ObjectId,
        ref:'like'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref:'users'
    },
    link: {
        url: String
    },
    dateCreated: {
        type: String,
        default: months[date.getMonth()] + '  ' + date.getDate() + ' , ' + date.getFullYear() 
    },
    videoURL: String,
    community: {
        type: Schema.Types.ObjectId,
        ref: 'community'
    }
});

const BlogPost = mongoose.model('blogPost', BlogPostSchema);

module.exports = BlogPost;