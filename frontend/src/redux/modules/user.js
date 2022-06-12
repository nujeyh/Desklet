// user.js
import axios from "axios";
import { setCookie } from "./Cookie";

// Actions

const ACCOUNT = "user/ACCOUNT";
const LOGIN = "user/LOGIN";
const LOGOUT = "user/LOGOUT";

const initialState = {
    user: null,
    is_login: false,
}

// Action Creators
export function accountUser(user) {
    return { type: ACCOUNT, user }
}
export function logInUser(user) {
    return { type: LOGIN, user }
}
export function logOutUser(user) {
    return { type: LOGOUT, user }
}

// middlewares
export const signupDB = (email, nickname, password) => {
    return async function (dispatch, getState) {
        await axios.post("http://15.165.160.107:3000/users/signup",
            {
                userId: email,
                nickName: nickname,
                password: password,
            }
        )
            .then((user) => {
                console.log(user)
                window.alert("회원가입이 완료되었습니다.")
                window.location.assign("/login")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                window.alert("회원가입에 실패했습니다! 다시 시도해주세요")
                console.log(errorCode, errorMessage)
            })
    }
}

export const loginDB = (email, password) => {
    return async function (dispatch) {
        await axios.post("http://15.165.160.107:3000/users/auth", {
            userId: email,
            password: password,
        })
            .then((user) => {
                console.log(user)
                const token = user.data.token
                setCookie("token", token)
                localStorage.setItem("userId", user.data.userId);
                localStorage.setItem("is_login", true);
                dispatch(
                    logInUser({
                        userId: email,
                    })
                )
                window.alert(`${user.data.nickName}님 환영합니다.`)
                window.location.assign("/")
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                window.alert("로그인에 실패했습니다! 다시 시도해주세요요");
                console.log(errorCode, errorMessage)
            })
    }
}


// export const logoutFB = () => {
//     return function (dispatch) {
//         auth.signOut().then(() => {
//             dispatch(logOutUser());
//         })
//     }
// }

// export const loginCheckFB = () => {
//     return function (dispatch) {
//         auth.onAuthStateChanged((user) => {
//             if (user) {
//                 dispatch(logInUser({
//                     name: user.displayName,
//                     user_id: user.email,
//                     uid: user.uid
//                 }))
//             } else {
//                 dispatch(logOutUser())
//             }
//         })
//     }
// }

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case LOGIN:
            state.user = { ...action.user }
            console.log(state.user)
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