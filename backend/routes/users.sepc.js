const users = require('./users.js');
const app = require("../app.js");
const request = require("supertest");


test('userId는 이메일 형식을 가져야한다. ID + @ + 도메인+ (.com, .net)', () => {
    expect(isEmail('이메일이 아니에요')).toEqual(false);
});

test('테스트가 실패하는 상황', () => {
    expect(isEmail('my-email@domain.com')).toEqual(true);
});

test('테스트가 성공하는 상황', () => {
  expect(isEmail('이메일이 아니에요')).toEqual(false);
});

test('테스트가 실패하는 상황', () => {
  expect(isEmail('my-email@domain.com')).toEqual(true);
});

test('테스트가 성공하는 상황', () => {
  expect(isEmail('이메일이 아니에요')).toEqual(false);
});

test('테스트가 실패하는 상황', () => {
  expect(isEmail('my-email@domain.com')).toEqual(true);
});

