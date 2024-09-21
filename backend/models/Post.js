import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    heading: { type: String, required: true },
    name: { type: String, required: true },
    blog: { type: String, required: true }
});

export const Posts = mongoose.model('Posts', postSchema);


