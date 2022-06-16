// user.js
import axios from "axios";

// Actions
const LOGIN = "user/LOGIN";
const LOGOUT = "user/LOGOUT";

const initialState = {
  user: null,
  is_login: false,
};

// Action Creators
export function logInUser(user) {
  return { type: LOGIN, user };
}
export function logOutUser(user) {
  return { type: LOGOUT, user };
}

// middlewares
const url = "http://3.34.45.167";
// "http://3.34.200.72";

export const signupDB = (email, nickname, password) => {
  return async function (dispatch, getState) {
    await axios
      .post(url + "/users/signup", {
        userId: email,
        nickName: nickname,
        password: password,
      })
      .then((user) => {
        window.alert("회원가입이 완료되었습니다.");
        window.location.assign("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        window.alert("회원가입에 실패했습니다! 다시 시도해주세요");
        console.log(errorCode, errorMessage);
      });
  };
};

export const loginDB = (email, password) => {
  return async function (dispatch) {
    await axios
      .post(url + "/users/auth", {
        userId: email,
        password: password,
      })
      .then((user) => {
        localStorage.setItem("token", user.data.token);
        localStorage.setItem("userId", email);
        localStorage.setItem("nickName", user.data.nickName)
        dispatch(
          logInUser({
            userId: email,
          })
        )
        window.alert(`${user.data.nickName}님 환영합니다!`)
        window.location.assign("/")
      }).catch((error) => {
        console.log(error)
        const errorCode = error.code;
        const errorMessage = error.message;
        if (error.response.status === 400) {
          window.alert("아이디/비밀번호를 잘못 입력했습니다")
        }
        console.log(errorCode, errorMessage)
      })
  }
}

export const logoutDB = () => {
  return function (dispatch) {
    localStorage.clear();
    dispatch(logOutUser());
    window.location.assign("/");
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN:
      state.user = { ...action.user };
      state.is_login = true;
      return state;
    case LOGOUT:
      state.user = {};
      state.is_login = false;
      return state;
    default:
      return state;
  }
}
