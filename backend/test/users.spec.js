const app = require('../index.js');
const request = require("supertest");

//회원가입
describe("Post users/signup", () => {

  const signup = (email, nickName, password) => {
    return request(app)
      .post("/users/signup")
      .send({
        userId: email,
        nickName: nickName,
        password: password
      });
  }

  describe("given a userId, password and nickName", () => {

    test('Check undefined should status 400', async () => {
      const res = await signup(undefined, undefined, "12311qwer");
      expect(res.status).toBe(400);
    });

    test('Check wrong *userId* form: status 400', async () => {
        const res = await signup("test9il.com", "tes1t11dd123", "12311qwer");
        expect(res.status).toBe(400);
    });

    test('Check wrong *password* form: status 400', async () => {
        const res = await signup("tes@aw@a@t9il.com", "tss1t11dd123", "123@!qwer");
        expect(res.status).toBe(400);
    });    

    test('Check wrong *nickName* form: status 400', async () => {
      const res = await signup("tes@t9ilco.m", "tss1t11dd123", "12134qwe1r");
      expect(res.status).toBe(400);
    });    
  });

  describe("duplicated signup test", () => {

    test('duplicated *userId*: status 400', async () => {
        const res = await signup("test9@email.com", "tes1t11123", "12134qwe1r");
        expect(res.status).toBe(400);
    });

    test('duplicated *nickName*: status 400', async () => {
      const res = await signup("test1239@email.com", "tes1t11123", "12134qwe1r");
      expect(res.status).toBe(400);
    });    
  });
});

//로그인
describe("Post users/auth", () => {

  const logIn = (email, password) => {
    return request(app)
      .post("/users/auth")
      .send({
        userId: email,
        password: password
      });
  }

  describe("Given a userId and password", () => {

    test('duplicated *userId*: status 200', async () => {
        const res = await logIn("test1123@email.com", "1234qwer");
        expect(res.status).toBe(200);
    });

    test('Check undefined: status 400', async () => {
      const res = await logIn(undefined, "12134qwe1r");
      expect(res.status).toBe(400);
    });

    test('Check mismatched userId & password: status 401', async () => {
      const res = await logIn("t1s1239@email.com", "12134qwe1r");
      expect(res.status).toBe(401);
    });    
  });


});
