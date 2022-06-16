const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

require("dotenv").config();

const {User, postUsersSchema} = require("../schemas/user.js");

router.post("/auth", async (req, res) => {
  const { userId, password } = req.body;

  const user = await User.findOne({ userId, password }).exec();

  if (!user || password !== user.password) {
    return res.status(400).send({
      errorMessage: "아이디 또는 패스워드가 잘못됐습니다.",
    });
  }

  const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET_KEY);

  res.status(200).send({
    result: "success",
    token,
    nickName: user.nickName
  });
});

router.post("/signup", async (req, res) => {
  try {
    var {
      userId,
      nickName,
      password,
    } = await postUsersSchema.validateAsync(req.body);
  } catch (err) {
    return res.status(400).send({
      errorMessage: '입력조건이 맞지 않습니다.'
    })
  };

  const oldUser = await User.find({ $or: [{ userId }, { nickName }], });

  if (oldUser.length) {
    return res.status(400).send({
      errorMessage: '중복된 이메일 또는 닉네임입니다.',
    });
  }

  try{
    const user = new User({ userId, password, nickName });
    user.save();
  } catch {
    return res.status(400).send({
      errorMessage: 'DataBase오류로 등록되지 않았습니다.'
    })    
  }

  res.status(200).send({
    result: "success",
  });
});

module.exports = router;