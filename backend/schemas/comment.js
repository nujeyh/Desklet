const mongoose = require('mongoose');
const {Schema} = mongoose;

const commentSchema = new Schema 
    ({
      postId: {
        type: String,
        required: true,
        trim: true,
      },
      userId: {
        type: String,
        required: true,
        trim: true,
      },
      content: {
        type: String,
        required: true,
        trim: true,
      },
      nickname: {
        type: String,
        required: true,
        trim: true,
      },
      commentId: {
        type: String,
        required: true,
        trim: true,
      },
      createdAt: {
        type: String,
        required: true,
        trim: true,
      },
    },
    {
      timestamps: true,
    }
  );

const Comments = mongoose.model('Comments', commentSchema);
module.exports = Comments;