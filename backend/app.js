const app = require("./index.js");
const port = 3000;

app.listen(port, () => {
  console.log(port, "포트로 서버가 켜졌습니다.");
});