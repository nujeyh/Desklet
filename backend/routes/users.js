const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrpyt = require("bcrypt");
require("dotenv").config();

const {User, postUsersSchema} = require("../schemas/user");

router.post("/auth", async (req, res) => {
  try{
  const { userId, password } = req.body;
  console.log(userId, password)

  const user = await User.findOne({userId}).exec();
  console.log(user)
  
  // || password !== user.password
  if (!user) {
      res.status(401).send({
      errorMessage: "아이디가 잘못 됐습니다.",
    });
    return;
  } else {
    const hashedPassword = bcrpyt.compareSync(password, user.password);
    console.log("해쉬 패스워드:", hashedPassword);
    if(hashedPassword) {
      const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET_KEY);
      console.log(token, userId);
      res.status(200).send({
        result: "success",
        token,
        nickName: user.nickName
      });
    } else {
      res.status(400).send({ msg: "비밀번호가 다릅니다."})
    }
  }
}catch(err) {
  console.log(err)
  if(err) {
    throw err;
  }
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

  const hash = bcrpyt.hashSync(password, 10);
  const user = new User({ userId, password: hash, nickName });
  user.save();

  res.status(200).send({
    result: "success",
  });
});

module.exports = router;