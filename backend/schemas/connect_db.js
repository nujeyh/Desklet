const mongoose = require("mongoose");
require('dotenv').config();

const connect = () => {
  mongoose
  .connect(process.env.MONGO_URI, { ignoreUndefined: true })
  .catch(err => console.error("db 연결이 되지 않았습니다."));      
};

module.exports = connect;