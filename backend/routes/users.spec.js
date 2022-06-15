const app = require('../app.js');
const supertest = require("supertest");

// const { request } = require('express');

describe("Post users/signup", () => {

  describe("given a userId, password and nickName", () => {

    test('should respond with a 200 status code', async () => {
      const res = await request(app).post("/users/aaa").send({
        userId: "test1123@email.com",
        password: "1234qwer",
        nickName: "test1123"
      });

      expect(res.statusCode).toBe(200);
    });


    //userId - email schema type check
    test('userId는 이메일 형식을 가져야한다. ID + "@" + 도메인+ "." + (com, net)', () => {
      expect(false).toEqual(false);
    });

    //password - type check
    test('userId는 이메일 형식을 가져야한다. ID + "@" + 도메인+ "." + (com, net)', () => {
      expect(false).toEqual(false);
    });


    //nickName - type check
    test('userId는 이메일 형식을 가져야한다. ID + "@" + 도메인+ "." + (com, net)', () => {
      expect(false).toEqual(false);
    });

  })

  describe("when the userId, password, and nickName ", () => {

    test('userId는 이메일 형식을 가져야한다. ID + "@" + 도메인+ "." + (com, net)', () => {
      expect(false).toEqual(false);
    });


  })

  
  test('테스트가 실패하는 상황', () => {
    expect(true).toEqual(true);
  });

  
});

describe("POST users/auth", () => {

  // test('로그인 요청시 일치하는 토큰을 줘야한다.', async ()=>{
  //   const res = await supertest(users).post("/auth");
  // });



});

