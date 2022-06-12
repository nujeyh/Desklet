// user.js
import axios from "axios";

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

// export const loginFB = (user_id, user_pw) => {
//     return function (dispatch) {
//         setPersistence(auth, browserSessionPersistence)
//             .then(() => {
//                 const Auth = auth;
//                 signInWithEmailAndPassword(Auth, user_id, user_pw)
//                     .then((user) => {
//                         console.log(user)
//                         dispatch(
//                             logInUser({
//                                 user_id,
//                                 name: user.user.displayName,
//                                 uid: user.user.uid
//                             })
//                         )
//                         console.log(user.user.uid)
//                     }).catch((error) => {
//                         window.alert("아이디 또는 비밀번호가 올바르지 않습니다!");
//                         const errorCode = error.code;
//                         const errorMessage = error.message;
//                         console.log(errorCode, errorMessage)
//                     })
//             })
//             .catch((error) => {
//                 // Handle Errors here.
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 console.log(errorCode, errorMessage)
//             })
//     }
// }

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
        case ACCOUNT:
            state.user = { ...action.user };
            state.is_login = true;
            return state;
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