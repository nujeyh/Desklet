import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import moment from "moment";

////////////
// Action //
////////////

const ADD_POST = "ADD_POST";
const GET_POST_LIST = "GET_POST_LIST";
const GET_POST_ONE = "GET_POST_ONE";

////////////////////
// Action Creator //
////////////////////

const addPost = createAction(ADD_POST, (post) => ({ post }));
const getPostList = createAction(GET_POST_LIST, (postList) => ({ postList }));
const getPostOne = createAction(GET_POST_ONE, (postOne) => ({ postOne }));

///////////////////
// Initial State //
///////////////////

const initialState = {
  postOne: {
    postId: "",
    createdAt: "",
    title: "",
    content: "",
    nickName: "",
    imgUrl: "",
  },
  postList: [
    {
      postId: "",
      createdAt: "",
      title: "",
      content: "",
      nickName: "",
      imgUrl: "",
    },
  ],
};

////////////////
// Middleware //
////////////////

// 게시물 업로드
export const addPostDB = (formData) => {
  return async function (dispatch, getState) {
    const _post = {
      ...initialState.postOne,
      formData,
      createdAt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };
    console.log(_post);
    await axios.post("http://localhost:5001/posts", {
      data: { ..._post },
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        dispatch(addPost({ ..._post }))
      })
      .catch((error) => {
        console.log(error)
      })
  }
}


// 게시물 모두 불러오기 | GET
export const getPostListDB = () => async (dispatch) => {
  try {
    const { data } = await axios.get("http://localhost:5001/posts");
    dispatch(getPostList(data));
  } catch (error) {
    alert("오류가 발생했습니다. 다시 시도해주세요.");
    console.log(error);
  }
};

// 게시글 하나 불러오기 | GET
export const getPostOneDB = (postId) => async (dispatch) => {
  try {
    const { data } = await axios.get("http://localhost:5001/posts/" + postId);
    dispatch(getPostOne(data));
  } catch (error) {
    alert("오류가 발생했습니다. 다시 시도해주세요.");
    console.log(error);
  }
};

/////////////
// Reducer //
/////////////

export default handleActions(
  {
    [ADD_POST]: (state, action) => {
      produce(state, (draft) => {
        draft.postList.unshift(action.payload.post)
      })
    },
    [GET_POST_LIST]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.postList = payload.postList;
      }),

    [GET_POST_ONE]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.postOne = payload.postOne;
      }),
  },
  initialState
);

const actionCreators = {
  getPostListDB,
  getPostList,
};

export { actionCreators };
