const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrpyt = require("bcrypt");
require("dotenv").config();

const {User, postUsersSchema} = require("../schemas/user");

router.post("/auth", async (req, res) => {
  try{
    var { userId, password } = req.body;
  } catch {
    return res.status(402).send({
      errorMessage: "잘못된 입렵입니다.",
    });    
  }

  const user = await User.findOne({userId}).exec();
  
  if (!user) {
    return res.status(401).send({
      errorMessage: "아이디나 비밀번호가 잘못 됐습니다.",
    });
  } 

  console.log("입력 pw: ", password);
  console.log("DB pw: ", user.password);    

  const hashedPassword = bcrpyt.compareSync(password, user.password);

  console.log("해싱pw비교: ", hashedPassword);

  if (hashedPassword) {
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET_KEY);
    return res.status(200).send({
      result: "success",
      token,
      nickName: user.nickName
    });
  } else {
    return res.status(400).send({ 
      errorMessage: "아이디나 비밀번호가 잘못 됐습니다."
    });
  }

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
    const hash = bcrpyt.hashSync(password, 10);
    const user = new User({ userId, password: hash, nickName });
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