const mongoose = require('mongoose');
const { Schema } = mongoose;

const communityCreateSchema = new Schema({
    title: String,
    group: String,
    blogPost: [{
        type: Schema.Types.ObjectId
    }],
    img: String,
    member: {
        type: Number,
        default: 0
    },
    description: String
});

const Community =  mongoose.model('community', communityCreateSchema);

module.exports = Community;

