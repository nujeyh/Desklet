const jwt = require("jsonwebtoken");
const {User, Object} = require("../schemas/user.js");

module.exports = (req, res, next) => {
    console.log("미들웨어 들어왔습니다========================");

    const { authorization } = req.headers; 

    console.log(authorization);

    const [tokenType, tokenValue] = authorization.split(" ");

    console.log("토큰타입: ", tokenType);
    console.log("토큰값: ",tokenValue);

    if (tokenType !== 'Bearer') {
      return res.status(401).send({
          errorMessage: "로그인이 필요한 기능입니다.",
      });
    }

    try {
      const { userId } = jwt.verify(tokenValue, "test");
      console.log(userId);

      User.findOne({ userId }).exec().then((user) => {
          res.locals.user = user;
          next();
      });
    } catch (error) {
      return res.status(401).send({
          errorMessage: "로그인이 필요한 기능입니다.",
      });
    }
};
