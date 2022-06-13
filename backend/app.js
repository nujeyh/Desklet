const express = require("express");
const connect_MongoDB = require("./schema/connect_db");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");

const app = express();
const port = 3000;

connect_MongoDB(); //DB 연결

app.use(express.static("static"));
app.use(express.json()); // json형태의 데이터를 parsing하여 사용할 수 있게 만듦.
app.use(express.urlencoded({extended:false}));
app.use("/users", [usersRouter]);
app.use("/posts", [postsRouter]);
app.use("/comments", [commentsRouter]);

app.listen(port, () => {
  console.log(port, "포트로 서버가 켜졌습니다.");
});