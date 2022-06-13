const express = require("express");
const router = express.Router();
const Comments = require('../schema/comment');
const authMiddleware = require("../middleware/auth-middleware");

router.get('/', async (req, res) => {
  const { postId } = req.body;
  const comments = await Comments.find({ postId: postId });
  const [ filteredcomments ] = comments.filter((inpost) => inpost.postId === postId);
  res.json(
    filteredcomments,
  );
});

router.post('/', authMiddleware, async function (req, res) {
  const { userId, nickname } = res.locals.user; // 미들웨어에서 서버에 저장한 userId와 nickname 값 분해 할당
  const { content, commentId, postId, createdAt } = req.body;
  try {
    await Comments.create({ content, nickname, userId, postId, commentId, createdAt })
    res.status(200).send({
      result: "success",
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
  const existComments = await Comments.find({ commentId: commentId });;
 
  if (existComments.length && (String(existComments[0].userId) === String(userId))) {
    await Comments.deleteOne({ commentId: commentId });
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
  const { changeval } = req.body;
  
  const existComments = await Comments.find({ commentId: commentId });
  if (!changeval.length) {
    res.json({'msg': '수정 내용을 입력해주세요'})
    return;
  } else if (existComments.length && (String(existComments[0].userId) === String(userId))) {
      await Comments.updateOne({ commentId: commentId }, { $set: { content: changeval } });
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