const express = require("express");
const router = express.Router();
const Comment = require('../schemas/comment');
const authMiddleware = require("../middlewares/auth-middleware");

router.get('/:postId', async (req, res) => {
  const { postId } = req.params;
  const comments = await Comment.find({ postId: postId });
  res.send({
     comments : comments
  });
});

router.post('/', authMiddleware, async function (req, res) {
  const { userId, nickName } = res.locals.user; // 미들웨어에서 서버에 저장한 userId와 nickName 값 분해 할당
  const { content, postId } = req.body;

  const createdAt = new Date().toLocaleString();

  try {
    const comment = new Comment({ content, nickName, userId, postId, createdAt });
    await comment.save();
    res.status(200).send({
      result: "success",
      _id: comment._id,
      createdAt: comment.createdAt
    });
  } catch (err) {
    return res.status(400).send({
      errorMessage: '댓글 작성에 실패하였습니다.',
    });
  };
});

router.delete('/:commentId', authMiddleware, async function (req, res) {
  const { userId } = res.locals.user;
  const { commentId } = req.params;
  console.log('commentId 값: ', req.params)
  console.log('userId 값: ', userId)
  const existComments = await Comment.findOne({ _id: commentId });
  console.log(existComments)
  if (existComments != '' && (String(existComments.userId) === String(userId))) {
    await Comment.deleteOne({ _id: commentId });
    res.status(200).send({
      result: "success",
    });
  } else {
    return res.status(400).send({
      errorMessage: '잘못된 접근입니다.',
    });
  };
});

router.put('/:commentId', authMiddleware, async function (req, res) {
  const { userId } = res.locals.user;
  const { commentId } = req.params;
  const { data } = req.body;
  console.log('req.body 값: ', req.body)
  const existComments = await Comment.find({ _id: commentId });

  if (!data.length) {
    res.json({'msg': '수정 내용을 입력해주세요'})
    return;
  } else if (existComments.length && (String(existComments[0].userId) === String(userId))) {
      await Comment.updateOne({ _id: commentId }, { $set: { content: data } });
      res.status(200).send({
      result: "success",
    });
  } else {
      return res.status(400).send({
      errorMessage: '잘못된 접근입니다.',
    });
  };
});

module.exports = router;