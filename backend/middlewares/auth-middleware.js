const jwt = require("jsonwebtoken");
const {User, Object} = require("../schemas/user.js");

module.exports = (req, res, next) => {
    const { authorization } = req.headers; 

    const [tokenType, tokenValue] = authorization.split(" ");

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
      console.log("유저가 없습니다");

      return res.status(401).send({
          errorMessage: "로그인이 필요한 기능입니다.",
      });
    }
};
