const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
    },
    postImage: {
        type: String,
    },
    nickName: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    postId: {
        type: Number,
    }

})

// PostSchema.virtual("postId").get(function () {
//     return this._id.toHexString();
//   });
//   PostSchema.set("toJSON", {
//     virtuals: true,
//   });

module.exports = mongoose.model('Post', PostSchema); //모델 이름 'Post' 
