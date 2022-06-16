// const app = require('../index.js');
const app = require("./users.js");
const request = require("supertest");

describe("Post users/signup", () => {

  describe("given a userId, password and nickName", () => {





    // 정보값 undefined로 넘기기
    test('give undefined value should respond errorMessage "입력조건이 맞지 않습니다."', async () => {

      const res = await request(app)
        .post("/users/signup")
        .send({
          userId: undefined,
          nickName: undefined,
          password: "12134qwe1r"
        })

      expect(res.body.errorMessage).toBe('입력조건이 맞지 않습니다.');
    });


    test('duplicated signup should respond 400 status code', async () => {

      const res = await request(app)
        .post("/users/signup")
        .send({
          userId: "test9@email.com",
          nickName: "tes1t11123",
          password: "12134qwe1r"
        })

      expect(res.statusCode).toBe(400);
    });

    // //userId - email schema type check
    test('userId는 이메일 형식을 가져야한다. ID + "@" + 도메인+ "." + (com, net)', () => {
      expect(false).toEqual(false);
    });





    // nickName - type check
    // test('userId는 이메일 형식을 가져야한다. ID + "@" + 도메인+ "." + (com, net)', () => {
    //   expect(false).toEqual(false);
    // });

  })

//   describe("when the userId, password, and nickName ", () => {

//     test('userId는 이메일 형식을 가져야한다. ID + "@" + 도메인+ "." + (com, net)', () => {
//       expect(false).toEqual(false);
//     });

//   })

  
//   test('테스트가 실패하는 상황', () => {
//     expect(true).toEqual(true);
//   });


});

// describe("POST users/auth", () => {

//   // test('로그인 요청시 일치하는 토큰을 줘야한다.', async ()=>{
//   //   const res = await supertest(users).post("/auth");
//   // });

// });
require("mongoose").disconnect();
