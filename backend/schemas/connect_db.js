const mongoose = require("mongoose");

const connect = () => {
  mongoose
  .connect("mongodb://localhost:27017/Desklet", { ignoreUndefined: true }) // 27017은 mongodb의 기본 포트다.
      .catch(err => console.error("db 연결이 되지 않았습니다."));
};

module.exports = connect;