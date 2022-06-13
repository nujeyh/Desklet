const express = require("express");
const router = express.Router();
const Comments = require('../schemas/comment');
const authMiddleware = require("../middlewares/auth-middleware");

router.get('/', async (req, res) => {
  const { postId } = req.body;
  const comments = await Comments.find({ postId: postId });
  const [ filteredcomments ] = comments.filter((inpost) => inpost.postId === postId);
  res.json(
    filteredcomments,
  );
});

router.post('/', authMiddleware, async function (req, res) {
  const { userId, nickName } = res.locals.user; // 미들웨어에서 서버에 저장한 userId와 nickName 값 분해 할당
  const { content, postId } = req.body;

  const createdAt = new Date().toLocaleString();

  try {
    await Comments.create({ content, nickName, userId, postId, createdAt })
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
  const existComments = await Comments.findOne({ _id: commentId });;
 
  if (existComments.length && (String(existComments[0].userId) === String(userId))) {
    await Comments.deleteOne({ _id: commentId });
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
  const existComments = await Comments.find({ _id: commentId });

  if (!changeval.length) {
    res.json({'msg': '수정 내용을 입력해주세요'})
    return;
  } else if (existComments.length && (String(existComments[0].userId) === String(userId))) {
      await Comments.updateOne({ _id: commentId }, { $set: { content: changeval } });
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