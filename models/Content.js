const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContentSchema = new Schema({
    title: String,
    body: String,
    image: String,
    url: String
});

const Content = mongoose.model('content', ContentSchema);

module.exports = Content;